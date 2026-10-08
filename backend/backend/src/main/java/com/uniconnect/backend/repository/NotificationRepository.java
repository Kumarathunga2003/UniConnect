package com.uniconnect.backend.repository;
import com.uniconnect.backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    List<Notification> findByUserEmailOrderByCreatedAtDesc(String email);
    Optional<Notification> findByIdAndUserEmail(Integer id, String email);
    long countByUserEmailAndReadFalse(String email);
}
