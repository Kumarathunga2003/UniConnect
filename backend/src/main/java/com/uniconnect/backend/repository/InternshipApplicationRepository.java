package com.uniconnect.backend.repository;

import com.uniconnect.backend.entity.InternshipApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InternshipApplicationRepository
        extends JpaRepository<InternshipApplication, Integer> {

    boolean existsByStudentIdAndInternshipId(
            Integer studentId,
            Integer internshipId
    );

    List<InternshipApplication>
    findByStudentUserEmailOrderByAppliedAtDesc(String email);

    List<InternshipApplication>
    findByInternshipCompanyUserEmailOrderByAppliedAtDesc(
            String email
    );

    Optional<InternshipApplication>
    findByIdAndStudentUserEmail(
            Integer id,
            String email
    );

    Optional<InternshipApplication>
    findByIdAndInternshipCompanyUserEmail(
            Integer id,
            String email
    );
}