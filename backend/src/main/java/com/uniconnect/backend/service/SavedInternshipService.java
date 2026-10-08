package com.uniconnect.backend.service;

import com.uniconnect.backend.dto.InternshipResponse;
import com.uniconnect.backend.entity.Internship;
import com.uniconnect.backend.entity.SavedInternship;
import com.uniconnect.backend.entity.Student;
import com.uniconnect.backend.repository.InternshipRepository;
import com.uniconnect.backend.repository.SavedInternshipRepository;
import com.uniconnect.backend.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class SavedInternshipService {
    private final SavedInternshipRepository savedRepository; private final StudentRepository studentRepository; private final InternshipRepository internshipRepository;
    public SavedInternshipService(SavedInternshipRepository savedRepository, StudentRepository studentRepository, InternshipRepository internshipRepository) { this.savedRepository = savedRepository; this.studentRepository = studentRepository; this.internshipRepository = internshipRepository; }
    @Transactional public void save(String email, Integer id) { if (savedRepository.findByStudentUserEmailAndInternshipId(email, id).isPresent()) return; Student student = studentRepository.findByUserEmail(email).orElseThrow(() -> new IllegalArgumentException("Student profile not found")); Internship internship = internshipRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Internship not found")); SavedInternship saved = new SavedInternship(); saved.setStudent(student); saved.setInternship(internship); savedRepository.save(saved); }
    @Transactional public void remove(String email, Integer id) { savedRepository.findByStudentUserEmailAndInternshipId(email, id).ifPresent(savedRepository::delete); }
    @Transactional(readOnly = true) public List<InternshipResponse> list(String email) { return savedRepository.findByStudentUserEmailOrderByCreatedAtDesc(email).stream().map(x -> response(x.getInternship())).toList(); }
    private InternshipResponse response(Internship i) { return new InternshipResponse(i.getId(), i.getCompany().getId(), i.getCompany().getCompanyName(), i.getTitle(), i.getDescription(), i.getLocation(), i.getInternshipType(), i.getDeadline(), i.getCreatedAt()); }
}
