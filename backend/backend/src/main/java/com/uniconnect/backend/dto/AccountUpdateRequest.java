package com.uniconnect.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public class AccountUpdateRequest {
    @Size(min = 2, max = 100, message = "Full name must contain 2 to 100 characters")
    private String fullName;

    @Email(message = "Enter a valid email address")
    @Size(max = 255, message = "Email address is too long")
    private String email;
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
