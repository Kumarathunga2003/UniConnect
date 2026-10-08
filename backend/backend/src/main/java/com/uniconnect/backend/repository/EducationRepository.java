package com.uniconnect.backend.repository;

import com.uniconnect.backend.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EducationRepository
        extends JpaRepository<Education, Integer> {

    List<Education> findByStudentUserEmailOrderByStartDateDesc(
            String email);

    Optional<Education> findByIdAndStudentUserEmail(
            Integer id,
            String email);
}