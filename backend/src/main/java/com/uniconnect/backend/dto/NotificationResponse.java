package com.uniconnect.backend.dto;
import java.time.LocalDateTime;
public record NotificationResponse(Integer id, String title, String message, boolean read, LocalDateTime createdAt) {}
