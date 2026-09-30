package com.uniconnect.backend.repository;

import com.uniconnect.backend.entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InternshipRepository
        extends JpaRepository<Internship, Integer> {

    List<Internship> findAllByOrderByCreatedAtDesc();

    List<Internship>
    findByCompanyUserEmailOrderByCreatedAtDesc(String email);

    Optional<Internship>
    findByIdAndCompanyUserEmail(Integer id, String email);
}