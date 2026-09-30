package com.uniconnect.backend.dto;

import com.uniconnect.backend.entity.ApplicationStatus;
import jakarta.validation.constraints.NotNull;

public class ApplicationStatusRequest {

    @NotNull(message = "Application status is required")
    private ApplicationStatus status;

    public ApplicationStatusRequest() {
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }
}