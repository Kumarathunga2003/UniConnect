package com.uniconnect.backend.dto;

public class CompanyProfileResponse {

    private Integer id;
    private Integer userId;
    private String email;
    private String companyName;
    private String industry;
    private String website;
    private String description;
    private String phone;

    public CompanyProfileResponse() {
    }

    public CompanyProfileResponse(
            Integer id,
            Integer userId,
            String email,
            String companyName,
            String industry,
            String website,
            String description,
            String phone
    ) {
        this.id = id;
        this.userId = userId;
        this.email = email;
        this.companyName = companyName;
        this.industry = industry;
        this.website = website;
        this.description = description;
        this.phone = phone;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}