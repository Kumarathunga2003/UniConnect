package com.uniconnect.backend.service;

import com.uniconnect.backend.dto.CompanyProfileRequest;
import com.uniconnect.backend.dto.CompanyProfileResponse;
import com.uniconnect.backend.entity.Company;
import com.uniconnect.backend.entity.Role;
import com.uniconnect.backend.entity.User;
import com.uniconnect.backend.repository.CompanyRepository;
import com.uniconnect.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CompanyProfileService {

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    public CompanyProfileService(
            CompanyRepository companyRepository,
            UserRepository userRepository
    ) {
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CompanyProfileResponse createOrUpdateProfile(
            String email,
            CompanyProfileRequest request
    ) {
        User user = findCompanyUser(email);

        Company company = companyRepository
                .findByUserEmail(email)
                .orElseGet(Company::new);

        company.setUser(user);
        company.setCompanyName(request.getCompanyName());
        company.setIndustry(request.getIndustry());
        company.setWebsite(request.getWebsite());
        company.setDescription(request.getDescription());
        company.setPhone(request.getPhone());

        Company savedCompany = companyRepository.save(company);

        return convertToResponse(savedCompany);
    }

    @Transactional(readOnly = true)
    public CompanyProfileResponse getProfile(String email) {
        findCompanyUser(email);

        Company company = companyRepository
                .findByUserEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Company profile not found")
                );

        return convertToResponse(company);
    }

    private User findCompanyUser(String email) {
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != Role.COMPANY) {
            throw new RuntimeException(
                    "Only company users can access the company profile"
            );
        }

        return user;
    }

    private CompanyProfileResponse convertToResponse(Company company) {
        return new CompanyProfileResponse(
                company.getId(),
                company.getUser().getId(),
                company.getUser().getEmail(),
                company.getCompanyName(),
                company.getIndustry(),
                company.getWebsite(),
                company.getDescription(),
                company.getPhone()
        );
    }
}