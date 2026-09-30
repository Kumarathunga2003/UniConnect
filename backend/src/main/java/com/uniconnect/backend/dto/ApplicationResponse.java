package com.uniconnect.backend.dto;

import com.uniconnect.backend.entity.ApplicationStatus;

import java.time.LocalDateTime;

public class ApplicationResponse {

    private Integer id;
    private Integer studentId;
    private String studentName;
    private String studentEmail;
    private Integer internshipId;
    private String internshipTitle;
    private String companyName;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;

    public ApplicationResponse() {
    }

    public ApplicationResponse(
            Integer id,
            Integer studentId,
            String studentName,
            String studentEmail,
            Integer internshipId,
            String internshipTitle,
            String companyName,
            ApplicationStatus status,
            LocalDateTime appliedAt
    ) {
        this.id = id;
        this.studentId = studentId;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.internshipId = internshipId;
        this.internshipTitle = internshipTitle;
        this.companyName = companyName;
        this.status = status;
        this.appliedAt = appliedAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public Integer getInternshipId() {
        return internshipId;
    }

    public void setInternshipId(Integer internshipId) {
        this.internshipId = internshipId;
    }

    public String getInternshipTitle() {
        return internshipTitle;
    }

    public void setInternshipTitle(String internshipTitle) {
        this.internshipTitle = internshipTitle;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(LocalDateTime appliedAt) {
        this.appliedAt = appliedAt;
    }
}