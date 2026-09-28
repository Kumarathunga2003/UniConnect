package com.uniconnect.backend.controller;

import com.uniconnect.backend.dto.EducationRequest;
import com.uniconnect.backend.dto.EducationResponse;
import com.uniconnect.backend.service.EducationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students/education")
public class EducationController {

    private final EducationService educationService;

    public EducationController(
            EducationService educationService) {

        this.educationService = educationService;
    }

    @PostMapping
    public ResponseEntity<?> addEducation(
            Authentication authentication,
            @Valid @RequestBody EducationRequest request) {

        try {
            EducationResponse response =
                    educationService.addEducation(
                            authentication.getName(),
                            request
                    );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(response);

        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", exception.getMessage())
            );
        }
    }

    @GetMapping
    public ResponseEntity<List<EducationResponse>> getEducation(
            Authentication authentication) {

        return ResponseEntity.ok(
                educationService.getEducation(
                        authentication.getName()
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEducation(
            @PathVariable Integer id,
            Authentication authentication,
            @Valid @RequestBody EducationRequest request) {

        try {
            return ResponseEntity.ok(
                    educationService.updateEducation(
                            id,
                            authentication.getName(),
                            request
                    )
            );

        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", exception.getMessage())
            );
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEducation(
            @PathVariable Integer id,
            Authentication authentication) {

        try {
            educationService.deleteEducation(
                    id,
                    authentication.getName()
            );

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "Education record deleted successfully"
                    )
            );

        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", exception.getMessage())
            );
        }
    }
}