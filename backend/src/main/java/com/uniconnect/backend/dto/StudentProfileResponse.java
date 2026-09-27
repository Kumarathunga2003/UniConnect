package com.uniconnect.backend.dto;

public class StudentProfileResponse {

    private Integer id;
    private String fullName;
    private String email;
    private String university;
    private String degreeProgram;
    private Integer graduationYear;
    private String phone;
    private String bio;

    public StudentProfileResponse(
            Integer id,
            String fullName,
            String email,
            String university,
            String degreeProgram,
            Integer graduationYear,
            String phone,
            String bio) {

        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.university = university;
        this.degreeProgram = degreeProgram;
        this.graduationYear = graduationYear;
        this.phone = phone;
        this.bio = bio;
    }

    public Integer getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getUniversity() {
        return university;
    }

    public String getDegreeProgram() {
        return degreeProgram;
    }

    public Integer getGraduationYear() {
        return graduationYear;
    }

    public String getPhone() {
        return phone;
    }

    public String getBio() {
        return bio;
    }
}