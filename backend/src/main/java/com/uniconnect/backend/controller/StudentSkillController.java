package com.uniconnect.backend.controller;

import com.uniconnect.backend.dto.StudentSkillsRequest;
import com.uniconnect.backend.service.StudentSkillService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students/skills")
public class StudentSkillController {

    private final StudentSkillService studentSkillService;

    public StudentSkillController(
            StudentSkillService studentSkillService) {

        this.studentSkillService = studentSkillService;
    }

    @PutMapping
    public ResponseEntity<?> saveSkills(
            Authentication authentication,
            @Valid @RequestBody StudentSkillsRequest request) {

        try {
            List<String> skills = studentSkillService.saveSkills(
                    authentication.getName(),
                    request
            );

            return ResponseEntity.ok(
                    Map.of(
                            "message", "Skills saved successfully",
                            "skills", skills
                    )
            );

        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", exception.getMessage())
            );
        }
    }

    @GetMapping
    public ResponseEntity<?> getSkills(
            Authentication authentication) {

        try {
            List<String> skills = studentSkillService.getSkills(
                    authentication.getName()
            );

            return ResponseEntity.ok(
                    Map.of("skills", skills)
            );

        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", exception.getMessage())
            );
        }
    }
}