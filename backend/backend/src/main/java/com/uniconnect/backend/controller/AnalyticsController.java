package com.uniconnect.backend.controller;
import com.uniconnect.backend.entity.ApplicationStatus;
import com.uniconnect.backend.entity.Student;
import com.uniconnect.backend.repository.*;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController @RequestMapping("/api/analytics")
@Transactional(readOnly = true)
public class AnalyticsController {
    private final InternshipApplicationRepository applications; private final InternshipRepository internships; private final StudentRepository students; private final EducationRepository education; private final SavedInternshipRepository saved;
    public AnalyticsController(InternshipApplicationRepository applications, InternshipRepository internships, StudentRepository students, EducationRepository education, SavedInternshipRepository saved) { this.applications = applications; this.internships = internships; this.students = students; this.education = education; this.saved = saved; }
    @GetMapping("/student") public Map<String, Object> student(Authentication auth) {
        String email = auth.getName(); var items = applications.findByStudentUserEmailOrderByAppliedAtDesc(email); Student s = students.findByUserEmail(email).orElse(null); int completion = 10;
        if (s != null) { completion = 20; if (filled(s.getUniversity())) completion += 15; if (filled(s.getDegreeProgram())) completion += 15; if (s.getGraduationYear() != null) completion += 10; if (filled(s.getPhone())) completion += 10; if (filled(s.getBio())) completion += 10; if (!s.getSkills().isEmpty()) completion += 10; if (!education.findByStudentUserEmailOrderByStartDateDesc(email).isEmpty()) completion += 5; if (s.getCvFileName() != null) completion += 5; }
        Map<String, Object> result = new LinkedHashMap<>(); result.put("profileCompletion", Math.min(completion, 100)); result.put("applications", items.size()); result.put("saved", saved.countByStudentUserEmail(email)); result.put("pending", items.stream().filter(x -> x.getStatus() == ApplicationStatus.PENDING).count()); result.put("interviews", items.stream().filter(x -> x.getStatus() == ApplicationStatus.INTERVIEW).count()); result.put("accepted", items.stream().filter(x -> x.getStatus() == ApplicationStatus.ACCEPTED).count()); return result;
    }
    @GetMapping("/company") public Map<String, Object> company(Authentication auth) { String email = auth.getName(); var jobs = internships.findByCompanyUserEmailOrderByCreatedAtDesc(email); var apps = applications.findByInternshipCompanyUserEmailOrderByAppliedAtDesc(email); return Map.of("internships", jobs.size(), "applications", apps.size(), "shortlisted", apps.stream().filter(x -> x.getStatus() == ApplicationStatus.SHORTLISTED).count(), "interviews", apps.stream().filter(x -> x.getStatus() == ApplicationStatus.INTERVIEW).count(), "accepted", apps.stream().filter(x -> x.getStatus() == ApplicationStatus.ACCEPTED).count()); }
    private boolean filled(String value) { return value != null && !value.isBlank(); }
}
