package com.uniconnect.backend.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

public class StudentSkillsRequest {

    @NotEmpty(message = "Add at least one skill")
    private List<
            @Size(
                    min = 1,
                    max = 100,
                    message = "Each skill must contain 1 to 100 characters"
            )
                    String> skills;

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }
}