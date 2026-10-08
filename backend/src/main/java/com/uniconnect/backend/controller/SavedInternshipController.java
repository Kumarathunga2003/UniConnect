package com.uniconnect.backend.controller;
import com.uniconnect.backend.dto.InternshipResponse;
import com.uniconnect.backend.service.SavedInternshipService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
@RestController @RequestMapping("/api/students/saved-internships")
public class SavedInternshipController {
    private final SavedInternshipService service;
    public SavedInternshipController(SavedInternshipService service) { this.service = service; }
    @GetMapping public List<InternshipResponse> list(Authentication auth) { return service.list(auth.getName()); }
    @PostMapping("/{id}") public Map<String, String> save(@PathVariable Integer id, Authentication auth) { service.save(auth.getName(), id); return Map.of("message", "Internship saved"); }
    @DeleteMapping("/{id}") public Map<String, String> remove(@PathVariable Integer id, Authentication auth) { service.remove(auth.getName(), id); return Map.of("message", "Saved internship removed"); }
}
