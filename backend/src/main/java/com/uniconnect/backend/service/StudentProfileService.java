package com.uniconnect.backend.service;

import com.uniconnect.backend.dto.StudentProfileRequest;
import com.uniconnect.backend.dto.StudentProfileResponse;
import com.uniconnect.backend.entity.Role;
import com.uniconnect.backend.entity.Student;
import com.uniconnect.backend.entity.User;
import com.uniconnect.backend.repository.StudentRepository;
import com.uniconnect.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentProfileService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    public StudentProfileService(
            StudentRepository studentRepository,
            UserRepository userRepository) {

        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public StudentProfileResponse saveProfile(
            String email,
            StudentProfileRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));

        if (user.getRole() != Role.STUDENT) {
            throw new IllegalArgumentException(
                    "Only students can create a student profile");
        }

        Student student = studentRepository
                .findByUserEmail(email)
                .orElseGet(() -> {
                    Student newStudent = new Student();
                    newStudent.setUser(user);
                    return newStudent;
                });

        student.setUniversity(request.getUniversity());
        student.setDegreeProgram(request.getDegreeProgram());
        student.setGraduationYear(request.getGraduationYear());
        student.setPhone(request.getPhone());
        student.setBio(request.getBio());

        Student savedStudent = studentRepository.save(student);

        return createResponse(savedStudent);
    }

    public StudentProfileResponse getProfile(String email) {

        Student student = studentRepository.findByUserEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Student profile not found"));

        return createResponse(student);
    }

    private StudentProfileResponse createResponse(Student student) {

        User user = student.getUser();

        return new StudentProfileResponse(
                student.getId(),
                user.getFullName(),
                user.getEmail(),
                student.getUniversity(),
                student.getDegreeProgram(),
                student.getGraduationYear(),
                student.getPhone(),
                student.getBio()
        );
    }
}