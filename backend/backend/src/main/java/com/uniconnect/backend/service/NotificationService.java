package com.uniconnect.backend.service;

import com.uniconnect.backend.dto.NotificationResponse;
import com.uniconnect.backend.entity.Notification;
import com.uniconnect.backend.entity.User;
import com.uniconnect.backend.repository.NotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class NotificationService {
    private final NotificationRepository repository;
    public NotificationService(NotificationRepository repository) { this.repository = repository; }
    public void create(User user, String title, String message) { Notification n = new Notification(); n.setUser(user); n.setTitle(title); n.setMessage(message); repository.save(n); }
    @Transactional(readOnly = true) public List<NotificationResponse> getAll(String email) { return repository.findByUserEmailOrderByCreatedAtDesc(email).stream().map(n -> new NotificationResponse(n.getId(), n.getTitle(), n.getMessage(), n.isRead(), n.getCreatedAt())).toList(); }
    public long unreadCount(String email) { return repository.countByUserEmailAndReadFalse(email); }
    @Transactional public void markRead(Integer id, String email) { Notification n = repository.findByIdAndUserEmail(id, email).orElseThrow(() -> new IllegalArgumentException("Notification not found")); n.setRead(true); repository.save(n); }
    @Transactional public void markAllRead(String email) { repository.findByUserEmailOrderByCreatedAtDesc(email).forEach(n -> { n.setRead(true); repository.save(n); }); }
}
