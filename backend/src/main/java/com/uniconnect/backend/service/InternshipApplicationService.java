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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class InternshipApplicationService {

    private final InternshipApplicationRepository applicationRepository;
    private final InternshipRepository internshipRepository;
    private final StudentRepository studentRepository;

    public InternshipApplicationService(
            InternshipApplicationRepository applicationRepository,
            InternshipRepository internshipRepository,
            StudentRepository studentRepository
    ) {
        this.applicationRepository = applicationRepository;
        this.internshipRepository = internshipRepository;
        this.studentRepository = studentRepository;
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

        return convertToResponse(updatedApplication);
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