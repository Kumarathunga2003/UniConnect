package com.uniconnect.backend.controller;

import com.uniconnect.backend.dto.ApplicationRequest;
import com.uniconnect.backend.dto.ApplicationResponse;
import com.uniconnect.backend.dto.ApplicationStatusRequest;
import com.uniconnect.backend.service.InternshipApplicationService;
import com.uniconnect.backend.dto.TimelineResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
public class InternshipApplicationController {

    private final InternshipApplicationService applicationService;

    public InternshipApplicationController(
            InternshipApplicationService applicationService
    ) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public ResponseEntity<ApplicationResponse> apply(
            @Valid @RequestBody ApplicationRequest request,
            Authentication authentication
    ) {
        ApplicationResponse response =
                applicationService.apply(
                        authentication.getName(),
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/student/my")
    public ResponseEntity<List<ApplicationResponse>>
    getStudentApplications(Authentication authentication) {
        return ResponseEntity.ok(
                applicationService.getStudentApplications(
                        authentication.getName()
                )
        );
    }

    @GetMapping("/company/my")
    public ResponseEntity<List<ApplicationResponse>>
    getCompanyApplications(Authentication authentication) {
        return ResponseEntity.ok(
                applicationService.getCompanyApplications(
                        authentication.getName()
                )
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApplicationResponse> updateStatus(
            @PathVariable Integer id,
            @Valid @RequestBody ApplicationStatusRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                applicationService.updateStatus(
                        id,
                        authentication.getName(),
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>>
    withdrawApplication(
            @PathVariable Integer id,
            Authentication authentication
    ) {
        applicationService.withdrawApplication(
                id,
                authentication.getName()
        );

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Application withdrawn successfully"
                )
        );
    }

    @GetMapping("/{id}/timeline")
    public ResponseEntity<List<TimelineResponse>> timeline(@PathVariable Integer id, Authentication authentication) {
        return ResponseEntity.ok(applicationService.getTimeline(id, authentication.getName()));
    }
}
