package com.uniconnect.backend.repository;

import com.uniconnect.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository
        extends JpaRepository<Student, Integer> {

    Optional<Student> findByUserEmail(String email);
}