package com.uniconnect.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public class StudentProfileRequest {

    @Size(max = 150, message = "University name is too long")
    private String university;

    @Size(max = 150, message = "Degree program is too long")
    private String degreeProgram;

    @Min(value = 2000, message = "Enter a valid graduation year")
    @Max(value = 2100, message = "Enter a valid graduation year")
    private Integer graduationYear;

    @Size(max = 20, message = "Phone number is too long")
    private String phone;

    @Size(max = 1000, message = "Bio cannot exceed 1000 characters")
    private String bio;

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public String getDegreeProgram() {
        return degreeProgram;
    }

    public void setDegreeProgram(String degreeProgram) {
        this.degreeProgram = degreeProgram;
    }

    public Integer getGraduationYear() {
        return graduationYear;
    }

    public void setGraduationYear(Integer graduationYear) {
        this.graduationYear = graduationYear;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}