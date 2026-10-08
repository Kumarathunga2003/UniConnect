package com.uniconnect.backend.service;

import com.uniconnect.backend.dto.ApplicationRequest;
import com.uniconnect.backend.dto.ApplicationResponse;
import com.uniconnect.backend.dto.ApplicationStatusRequest;
import com.uniconnect.backend.entity.ApplicationStatus;
import com.uniconnect.backend.entity.Internship;
import com.uniconnect.backend.entity.InternshipApplication;
import com.uniconnect.backend.entity.Student;
import com.uniconnect.backend.repository.InternshipApplicationRepository;
import com.uniconnect.backend.repository.InternshipRepository;
import com.uniconnect.backend.repository.StudentRepository;
import com.uniconnect.backend.repository.ApplicationStatusHistoryRepository;
import com.uniconnect.backend.dto.TimelineResponse;
import com.uniconnect.backend.entity.ApplicationStatusHistory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class InternshipApplicationService {

    private final InternshipApplicationRepository applicationRepository;
    private final InternshipRepository internshipRepository;
    private final StudentRepository studentRepository;
    private final ApplicationStatusHistoryRepository historyRepository;
    private final NotificationService notificationService;

    public InternshipApplicationService(
            InternshipApplicationRepository applicationRepository,
            InternshipRepository internshipRepository,
            StudentRepository studentRepository,
            ApplicationStatusHistoryRepository historyRepository,
            NotificationService notificationService
    ) {
        this.applicationRepository = applicationRepository;
        this.internshipRepository = internshipRepository;
        this.studentRepository = studentRepository;
        this.historyRepository = historyRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public ApplicationResponse apply(
            String email,
            ApplicationRequest request
    ) {
        Student student = studentRepository
                .findByUserEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Student profile not found")
                );

        Internship internship = internshipRepository
                .findById(request.getInternshipId())
                .orElseThrow(() ->
                        new RuntimeException("Internship not found")
                );

        if (internship.getDeadline() != null
                && internship.getDeadline().isBefore(LocalDate.now())) {
            throw new RuntimeException(
                    "The application deadline has passed"
            );
        }

        boolean alreadyApplied =
                applicationRepository
                        .existsByStudentIdAndInternshipId(
                                student.getId(),
                                internship.getId()
                        );

        if (alreadyApplied) {
            throw new RuntimeException(
                    "You have already applied for this internship"
            );
        }

        InternshipApplication application =
                new InternshipApplication();

        application.setStudent(student);
        application.setInternship(internship);
        application.setStatus(ApplicationStatus.PENDING);

        InternshipApplication savedApplication =
                applicationRepository.save(application);

        saveHistory(savedApplication, ApplicationStatus.PENDING);
        notificationService.create(internship.getCompany().getUser(), "New internship application", student.getUser().getFullName() + " applied for " + internship.getTitle());

        return convertToResponse(savedApplication);
    }

    @Transactional(readOnly = true)
    public List<ApplicationResponse> getStudentApplications(
            String email
    ) {
        return applicationRepository
                .findByStudentUserEmailOrderByAppliedAtDesc(email)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ApplicationResponse> getCompanyApplications(
            String email
    ) {
        return applicationRepository
                .findByInternshipCompanyUserEmailOrderByAppliedAtDesc(
                        email
                )
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Transactional
    public ApplicationResponse updateStatus(
            Integer applicationId,
            String email,
            ApplicationStatusRequest request
    ) {
        InternshipApplication application =
                applicationRepository
                        .findByIdAndInternshipCompanyUserEmail(
                                applicationId,
                                email
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Application not found or access denied"
                                )
                        );

        application.setStatus(request.getStatus());

        InternshipApplication updatedApplication =
                applicationRepository.save(application);

        saveHistory(updatedApplication, request.getStatus());
        notificationService.create(application.getStudent().getUser(), "Application status updated", application.getInternship().getTitle() + " is now " + request.getStatus().name().replace('_', ' '));

        return convertToResponse(updatedApplication);
    }

    @Transactional(readOnly = true)
    public List<TimelineResponse> getTimeline(Integer applicationId, String email) {
        InternshipApplication application = applicationRepository.findByIdAndStudentUserEmail(applicationId, email)
                .orElseThrow(() -> new IllegalArgumentException("Application not found or access denied"));
        List<TimelineResponse> history = new ArrayList<>(historyRepository
                .findByApplicationIdOrderByChangedAtAsc(applicationId)
                .stream()
                .map(item -> new TimelineResponse(item.getStatus(), item.getChangedAt()))
                .toList());

        if (history.isEmpty()) {
            history.add(new TimelineResponse(
                    ApplicationStatus.PENDING,
                    application.getAppliedAt()
            ));

            if (application.getStatus() != ApplicationStatus.PENDING) {
                history.add(new TimelineResponse(
                        application.getStatus(),
                        application.getAppliedAt()
                ));
            }

            return history;
        }

        boolean includesInitialStatus = history.stream()
                .anyMatch(item -> item.status() == ApplicationStatus.PENDING);

        if (!includesInitialStatus) {
            history.add(0, new TimelineResponse(
                    ApplicationStatus.PENDING,
                    application.getAppliedAt()
            ));
        }

        return history;
    }

    private void saveHistory(InternshipApplication application, ApplicationStatus status) {
        ApplicationStatusHistory history = new ApplicationStatusHistory();
        history.setApplication(application); history.setStatus(status); historyRepository.save(history);
    }

    @Transactional
    public void withdrawApplication(
            Integer applicationId,
            String email
    ) {
        InternshipApplication application =
                applicationRepository
                        .findByIdAndStudentUserEmail(
                                applicationId,
                                email
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Application not found or access denied"
                                )
                        );

        applicationRepository.delete(application);
    }

    private ApplicationResponse convertToResponse(
            InternshipApplication application
    ) {
        return new ApplicationResponse(
                application.getId(),
                application.getStudent().getId(),
                application.getStudent().getUser().getFullName(),
                application.getStudent().getUser().getEmail(),
                application.getInternship().getId(),
                application.getInternship().getTitle(),
                application.getInternship()
                        .getCompany()
                        .getCompanyName(),
                application.getStatus(),
                application.getAppliedAt()
        );
    }
}
