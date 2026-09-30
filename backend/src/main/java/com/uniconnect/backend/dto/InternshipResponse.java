package com.uniconnect.backend.dto;

import com.uniconnect.backend.entity.InternshipType;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class InternshipResponse {

    private Integer id;
    private Integer companyId;
    private String companyName;
    private String title;
    private String description;
    private String location;
    private InternshipType internshipType;
    private LocalDate deadline;
    private LocalDateTime createdAt;

    public InternshipResponse() {
    }

    public InternshipResponse(
            Integer id,
            Integer companyId,
            String companyName,
            String title,
            String description,
            String location,
            InternshipType internshipType,
            LocalDate deadline,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.companyId = companyId;
        this.companyName = companyName;
        this.title = title;
        this.description = description;
        this.location = location;
        this.internshipType = internshipType;
        this.deadline = deadline;
        this.createdAt = createdAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}