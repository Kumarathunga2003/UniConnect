package com.uniconnect.backend.controller;

import com.uniconnect.backend.dto.CompanyProfileRequest;
import com.uniconnect.backend.dto.CompanyProfileResponse;
import com.uniconnect.backend.service.CompanyProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/companies")
public class CompanyProfileController {

    private final CompanyProfileService companyProfileService;

    public CompanyProfileController(
            CompanyProfileService companyProfileService
    ) {
        this.companyProfileService = companyProfileService;
    }

    @PutMapping("/profile")
    public ResponseEntity<CompanyProfileResponse> createOrUpdateProfile(
            @Valid @RequestBody CompanyProfileRequest request,
            Authentication authentication
    ) {
        CompanyProfileResponse response =
                companyProfileService.createOrUpdateProfile(
                        authentication.getName(),
                        request
                );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    public ResponseEntity<CompanyProfileResponse> getProfile(
            Authentication authentication
    ) {
        CompanyProfileResponse response =
                companyProfileService.getProfile(authentication.getName());

        return ResponseEntity.ok(response);
    }
}