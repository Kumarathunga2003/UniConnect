package com.uniconnect.backend.repository;
import com.uniconnect.backend.entity.SavedInternship;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
public interface SavedInternshipRepository extends JpaRepository<SavedInternship, Integer> {
    List<SavedInternship> findByStudentUserEmailOrderByCreatedAtDesc(String email);
    Optional<SavedInternship> findByStudentUserEmailAndInternshipId(String email, Integer internshipId);
    long countByStudentUserEmail(String email);
}
