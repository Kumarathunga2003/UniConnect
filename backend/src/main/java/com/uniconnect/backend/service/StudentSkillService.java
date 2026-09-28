package com.uniconnect.backend.service;

import com.uniconnect.backend.dto.StudentSkillsRequest;
import com.uniconnect.backend.entity.Skill;
import com.uniconnect.backend.entity.Student;
import com.uniconnect.backend.repository.SkillRepository;
import com.uniconnect.backend.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class StudentSkillService {

    private final StudentRepository studentRepository;
    private final SkillRepository skillRepository;

    public StudentSkillService(
            StudentRepository studentRepository,
            SkillRepository skillRepository) {

        this.studentRepository = studentRepository;
        this.skillRepository = skillRepository;
    }

    @Transactional
    public List<String> saveSkills(
            String email,
            StudentSkillsRequest request) {

        Student student = studentRepository.findByUserEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Create your student profile first"));

        Set<Skill> skills = new HashSet<>();

        for (String skillName : request.getSkills()) {

            String cleanedName = skillName.trim();

            if (cleanedName.isEmpty()) {
                continue;
            }

            Skill skill = skillRepository
                    .findByNameIgnoreCase(cleanedName)
                    .orElseGet(() ->
                            skillRepository.save(
                                    new Skill(cleanedName)
                            )
                    );

            skills.add(skill);
        }

        if (skills.isEmpty()) {
            throw new IllegalArgumentException(
                    "Add at least one valid skill");
        }

        student.setSkills(skills);
        studentRepository.save(student);

        return skills.stream()
                .map(Skill::getName)
                .sorted()
                .toList();
    }

    @Transactional(readOnly = true)
    public List<String> getSkills(String email) {

        Student student = studentRepository.findByUserEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Student profile not found"));

        return student.getSkills()
                .stream()
                .map(Skill::getName)
                .sorted()
                .toList();
    }
}