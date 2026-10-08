package com.uniconnect.backend.controller;

import com.uniconnect.backend.dto.StudentProfileRequest;
import com.uniconnect.backend.dto.StudentProfileResponse;
import com.uniconnect.backend.service.StudentProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/students/profile")
public class StudentProfileController {

    private final StudentProfileService studentProfileService;

    public StudentProfileController(
            StudentProfileService studentProfileService) {

        this.studentProfileService = studentProfileService;
    }

    @PutMapping
    public ResponseEntity<?> saveProfile(
            Authentication authentication,
            @Valid @RequestBody StudentProfileRequest request) {

        try {
            StudentProfileResponse profile =
                    studentProfileService.saveProfile(
                            authentication.getName(),
                            request
                    );

            return ResponseEntity.ok(profile);

        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", exception.getMessage())
            );
        }
    }

    @GetMapping
    public ResponseEntity<?> getProfile(
            Authentication authentication) {

        try {
            StudentProfileResponse profile =
                    studentProfileService.getProfile(
                            authentication.getName()
                    );

            return ResponseEntity.ok(profile);

        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", exception.getMessage())
            );
        }
    }
}