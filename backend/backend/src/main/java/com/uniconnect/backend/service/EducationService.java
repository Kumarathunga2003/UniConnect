package com.uniconnect.backend.service;

import com.uniconnect.backend.dto.EducationRequest;
import com.uniconnect.backend.dto.EducationResponse;
import com.uniconnect.backend.entity.Education;
import com.uniconnect.backend.entity.Student;
import com.uniconnect.backend.repository.EducationRepository;
import com.uniconnect.backend.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EducationService {

    private final EducationRepository educationRepository;
    private final StudentRepository studentRepository;

    public EducationService(
            EducationRepository educationRepository,
            StudentRepository studentRepository) {

        this.educationRepository = educationRepository;
        this.studentRepository = studentRepository;
    }

    @Transactional
    public EducationResponse addEducation(
            String email,
            EducationRequest request) {

        validateDates(request);

        Student student = studentRepository.findByUserEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Student profile not found"));

        Education education = new Education();
        education.setStudent(student);

        updateFields(education, request);

        return createResponse(
                educationRepository.save(education)
        );
    }

    @Transactional(readOnly = true)
    public List<EducationResponse> getEducation(String email) {

        return educationRepository
                .findByStudentUserEmailOrderByStartDateDesc(email)
                .stream()
                .map(this::createResponse)
                .toList();
    }

    @Transactional
    public EducationResponse updateEducation(
            Integer id,
            String email,
            EducationRequest request) {

        validateDates(request);

        Education education = findOwnedEducation(id, email);

        updateFields(education, request);

        return createResponse(
                educationRepository.save(education)
        );
    }

    @Transactional
    public void deleteEducation(Integer id, String email) {

        Education education = findOwnedEducation(id, email);
        educationRepository.delete(education);
    }

    private Education findOwnedEducation(
            Integer id,
            String email) {

        return educationRepository
                .findByIdAndStudentUserEmail(id, email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Education record not found"));
    }

    private void validateDates(EducationRequest request) {

        if (request.getStartDate() != null &&
                request.getEndDate() != null &&
                request.getEndDate()
                        .isBefore(request.getStartDate())) {

            throw new IllegalArgumentException(
                    "End date cannot be before start date");
        }
    }

    private void updateFields(
            Education education,
            EducationRequest request) {

        education.setInstitution(request.getInstitution());
        education.setDegree(request.getDegree());
        education.setFieldOfStudy(request.getFieldOfStudy());
        education.setStartDate(request.getStartDate());
        education.setEndDate(request.getEndDate());
    }

    private EducationResponse createResponse(
            Education education) {

        return new EducationResponse(
                education.getId(),
                education.getInstitution(),
                education.getDegree(),
                education.getFieldOfStudy(),
                education.getStartDate(),
                education.getEndDate()
        );
    }
}