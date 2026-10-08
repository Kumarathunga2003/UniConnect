package com.uniconnect.backend.controller;
import com.uniconnect.backend.entity.Student;
import com.uniconnect.backend.service.CvStorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;
@RestController @RequestMapping("/api/students/cv")
public class CvController {
    private final CvStorageService service;
    public CvController(CvStorageService service) { this.service = service; }
    @GetMapping("/info") public Map<String, Object> info(Authentication auth) { Student s = service.student(auth.getName()); return Map.of("available", s.getCvFileName() != null, "fileName", s.getCvOriginalName() == null ? "" : s.getCvOriginalName()); }
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE) public Map<String, String> upload(@RequestParam("file") MultipartFile file, Authentication auth) { Student s = service.upload(auth.getName(), file); return Map.of("message", "CV uploaded successfully", "fileName", s.getCvOriginalName()); }
    @GetMapping public ResponseEntity<Resource> download(Authentication auth) { Student s = service.student(auth.getName()); return file(s); }
    @DeleteMapping public Map<String, String> remove(Authentication auth) { service.remove(auth.getName()); return Map.of("message", "CV removed"); }
    private ResponseEntity<Resource> file(Student s) { return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + s.getCvOriginalName() + "\"").body(service.load(s)); }
}
