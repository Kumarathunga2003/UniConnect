package com.uniconnect.backend.controller;
import com.uniconnect.backend.dto.NotificationResponse;
import com.uniconnect.backend.service.NotificationService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
@RestController @RequestMapping("/api/notifications")
public class NotificationController {
    private final NotificationService service;
    public NotificationController(NotificationService service) { this.service = service; }
    @GetMapping public List<NotificationResponse> all(Authentication auth) { return service.getAll(auth.getName()); }
    @GetMapping("/unread-count") public Map<String, Long> count(Authentication auth) { return Map.of("count", service.unreadCount(auth.getName())); }
    @PutMapping("/{id}/read") public Map<String, String> read(@PathVariable Integer id, Authentication auth) { service.markRead(id, auth.getName()); return Map.of("message", "Notification marked as read"); }
    @PutMapping("/read-all") public Map<String, String> readAll(Authentication auth) { service.markAllRead(auth.getName()); return Map.of("message", "All notifications marked as read"); }
}
