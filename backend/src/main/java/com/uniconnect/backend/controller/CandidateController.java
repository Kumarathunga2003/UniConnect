package com.uniconnect.backend.controller;

import com.uniconnect.backend.dto.EducationResponse;
import com.uniconnect.backend.entity.InternshipApplication;
import com.uniconnect.backend.entity.Skill;
import com.uniconnect.backend.entity.Student;
import com.uniconnect.backend.repository.EducationRepository;
import com.uniconnect.backend.repository.InternshipApplicationRepository;
import com.uniconnect.backend.service.CvStorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/applications")
@Transactional(readOnly = true)
public class CandidateController {
    private final InternshipApplicationRepository applications;
    private final EducationRepository education;
    private final CvStorageService cvs;
    public CandidateController(InternshipApplicationRepository applications, EducationRepository education, CvStorageService cvs) { this.applications = applications; this.education = education; this.cvs = cvs; }

    @GetMapping("/{id}/candidate")
    public Map<String, Object> candidate(@PathVariable Integer id, Authentication auth) {
        Student s = owned(id, auth.getName()).getStudent();
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("studentId", s.getId()); result.put("fullName", s.getUser().getFullName()); result.put("email", s.getUser().getEmail());
        result.put("university", s.getUniversity()); result.put("degreeProgram", s.getDegreeProgram()); result.put("graduationYear", s.getGraduationYear());
        result.put("phone", s.getPhone()); result.put("bio", s.getBio()); result.put("skills", s.getSkills().stream().map(Skill::getName).sorted().toList());
        result.put("education", education.findByStudentUserEmailOrderByStartDateDesc(s.getUser().getEmail()).stream().map(e -> new EducationResponse(e.getId(), e.getInstitution(), e.getDegree(), e.getFieldOfStudy(), e.getStartDate(), e.getEndDate())).toList());
        result.put("cvAvailable", s.getCvFileName() != null);
        return result;
    }

    @GetMapping("/{id}/candidate/cv")
    public ResponseEntity<Resource> cv(@PathVariable Integer id, Authentication auth) {
        Student s = owned(id, auth.getName()).getStudent();
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + s.getCvOriginalName() + "\"").body(cvs.load(s));
    }
    private InternshipApplication owned(Integer id, String email) { return applications.findByIdAndInternshipCompanyUserEmail(id, email).orElseThrow(() -> new IllegalArgumentException("Application not found or access denied")); }
}
