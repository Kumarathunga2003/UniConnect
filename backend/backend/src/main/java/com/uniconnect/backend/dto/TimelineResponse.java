package com.uniconnect.backend.dto;
import com.uniconnect.backend.entity.ApplicationStatus;
import java.time.LocalDateTime;
public record TimelineResponse(ApplicationStatus status, LocalDateTime changedAt) {}
