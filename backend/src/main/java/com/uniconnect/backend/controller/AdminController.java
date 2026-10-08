package com.uniconnect.backend.controller;
import com.uniconnect.backend.entity.Role;
import com.uniconnect.backend.entity.User;
import com.uniconnect.backend.repository.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController @RequestMapping("/api/admin")
public class AdminController {
    private final UserRepository users; private final InternshipRepository internships; private final InternshipApplicationRepository applications; private final CompanyRepository companies; private final StudentRepository students;
    public AdminController(UserRepository users, InternshipRepository internships, InternshipApplicationRepository applications, CompanyRepository companies, StudentRepository students) { this.users = users; this.internships = internships; this.applications = applications; this.companies = companies; this.students = students; }
    @GetMapping("/stats") public Map<String, Object> stats(Authentication auth) { admin(auth); return Map.of("users", users.count(), "students", students.count(), "companies", companies.count(), "internships", internships.count(), "applications", applications.count()); }
    @GetMapping("/users") public List<Map<String, Object>> users(Authentication auth) { admin(auth); return users.findAll().stream().map(this::userMap).toList(); }
    @PutMapping("/users/{id}/active") public Map<String, Object> active(@PathVariable Integer id, @RequestBody Map<String, Boolean> body, Authentication auth) { User actor = admin(auth); User target = users.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found")); if (actor.getId().equals(target.getId())) throw new IllegalArgumentException("You cannot deactivate your own admin account"); target.setActive(Boolean.TRUE.equals(body.get("active"))); users.save(target); return userMap(target); }
    @DeleteMapping("/internships/{id}") public Map<String, String> removeInternship(@PathVariable Integer id, Authentication auth) { admin(auth); internships.deleteById(id); return Map.of("message", "Internship removed"); }
    private User admin(Authentication auth) { User user = users.findByEmail(auth.getName()).orElseThrow(() -> new IllegalArgumentException("User not found")); if (user.getRole() != Role.ADMIN) throw new IllegalArgumentException("Administrator access required"); return user; }
    private Map<String, Object> userMap(User u) { Map<String, Object> map = new LinkedHashMap<>(); map.put("id", u.getId()); map.put("fullName", u.getFullName()); map.put("email", u.getEmail()); map.put("role", u.getRole()); map.put("active", u.isActive()); map.put("createdAt", u.getCreatedAt()); return map; }
}
