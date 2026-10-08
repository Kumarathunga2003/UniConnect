package com.uniconnect.backend.repository;

import com.uniconnect.backend.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SkillRepository
        extends JpaRepository<Skill, Integer> {

    Optional<Skill> findByNameIgnoreCase(String name);
}