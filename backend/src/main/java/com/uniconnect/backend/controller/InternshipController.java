package com.uniconnect.backend.controller;

import com.uniconnect.backend.dto.InternshipRequest;
import com.uniconnect.backend.dto.InternshipResponse;
import com.uniconnect.backend.service.InternshipService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/internships")
public class InternshipController {

    private final InternshipService internshipService;

    public InternshipController(
            InternshipService internshipService
    ) {
        this.internshipService = internshipService;
    }

    @PostMapping
    public ResponseEntity<InternshipResponse> createInternship(
            @Valid @RequestBody InternshipRequest request,
            Authentication authentication
    ) {
        InternshipResponse response =
                internshipService.createInternship(
                        authentication.getName(),
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<InternshipResponse>>
    getAllInternships() {
        return ResponseEntity.ok(
                internshipService.getAllInternships()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<InternshipResponse>
    getInternshipById(@PathVariable Integer id) {
        return ResponseEntity.ok(
                internshipService.getInternshipById(id)
        );
    }

    @GetMapping("/company/my")
    public ResponseEntity<List<InternshipResponse>>
    getCompanyInternships(Authentication authentication) {
        return ResponseEntity.ok(
                internshipService.getCompanyInternships(
                        authentication.getName()
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<InternshipResponse> updateInternship(
            @PathVariable Integer id,
            @Valid @RequestBody InternshipRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                internshipService.updateInternship(
                        id,
                        authentication.getName(),
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteInternship(
            @PathVariable Integer id,
            Authentication authentication
    ) {
        internshipService.deleteInternship(
                id,
                authentication.getName()
        );

        return ResponseEntity.ok(
                Map.of("message", "Internship deleted successfully")
        );
    }
}