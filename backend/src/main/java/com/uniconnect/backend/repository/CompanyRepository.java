package com.uniconnect.backend.repository;

import com.uniconnect.backend.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Integer> {

    Optional<Company> findByUserEmail(String email);
}