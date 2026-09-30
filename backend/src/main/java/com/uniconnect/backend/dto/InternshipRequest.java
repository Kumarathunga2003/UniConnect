package com.uniconnect.backend.dto;

import com.uniconnect.backend.entity.InternshipType;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class InternshipRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 150)
    private String title;

    private String description;

    @Size(max = 150)
    private String location;

    @NotNull(message = "Internship type is required")
    private InternshipType internshipType;

    @FutureOrPresent(message = "Deadline cannot be in the past")
    private LocalDate deadline;

    public InternshipRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public InternshipType getInternshipType() {
        return internshipType;
    }

    public void setInternshipType(InternshipType internshipType) {
        this.internshipType = internshipType;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }
}