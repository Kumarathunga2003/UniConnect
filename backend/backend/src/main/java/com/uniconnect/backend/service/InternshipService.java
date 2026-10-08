package com.uniconnect.backend.service;

import com.uniconnect.backend.dto.InternshipRequest;
import com.uniconnect.backend.dto.InternshipResponse;
import com.uniconnect.backend.entity.Company;
import com.uniconnect.backend.entity.Internship;
import com.uniconnect.backend.repository.CompanyRepository;
import com.uniconnect.backend.repository.InternshipRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class InternshipService {

    private final InternshipRepository internshipRepository;
    private final CompanyRepository companyRepository;

    public InternshipService(
            InternshipRepository internshipRepository,
            CompanyRepository companyRepository
    ) {
        this.internshipRepository = internshipRepository;
        this.companyRepository = companyRepository;
    }

    @Transactional
    public InternshipResponse createInternship(
            String email,
            InternshipRequest request
    ) {
        Company company = findCompany(email);

        Internship internship = new Internship();
        internship.setCompany(company);
        updateFields(internship, request);

        Internship savedInternship =
                internshipRepository.save(internship);

        return convertToResponse(savedInternship);
    }

    @Transactional(readOnly = true)
    public List<InternshipResponse> getAllInternships() {
        return internshipRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public InternshipResponse getInternshipById(Integer id) {
        Internship internship = internshipRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Internship not found")
                );

        return convertToResponse(internship);
    }

    @Transactional(readOnly = true)
    public List<InternshipResponse> getCompanyInternships(
            String email
    ) {
        findCompany(email);

        return internshipRepository
                .findByCompanyUserEmailOrderByCreatedAtDesc(email)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Transactional
    public InternshipResponse updateInternship(
            Integer id,
            String email,
            InternshipRequest request
    ) {
        Internship internship = internshipRepository
                .findByIdAndCompanyUserEmail(id, email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Internship not found or access denied"
                        )
                );

        updateFields(internship, request);

        Internship updatedInternship =
                internshipRepository.save(internship);

        return convertToResponse(updatedInternship);
    }

    @Transactional
    public void deleteInternship(Integer id, String email) {
        Internship internship = internshipRepository
                .findByIdAndCompanyUserEmail(id, email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Internship not found or access denied"
                        )
                );

        internshipRepository.delete(internship);
    }

    private Company findCompany(String email) {
        return companyRepository
                .findByUserEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Company profile not found"
                        )
                );
    }

    private void updateFields(
            Internship internship,
            InternshipRequest request
    ) {
        internship.setTitle(request.getTitle());
        internship.setDescription(request.getDescription());
        internship.setLocation(request.getLocation());
        internship.setInternshipType(
                request.getInternshipType()
        );
        internship.setDeadline(request.getDeadline());
    }

    private InternshipResponse convertToResponse(
            Internship internship
    ) {
        return new InternshipResponse(
                internship.getId(),
                internship.getCompany().getId(),
                internship.getCompany().getCompanyName(),
                internship.getTitle(),
                internship.getDescription(),
                internship.getLocation(),
                internship.getInternshipType(),
                internship.getDeadline(),
                internship.getCreatedAt()
        );
    }
}