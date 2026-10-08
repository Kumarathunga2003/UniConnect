package com.uniconnect.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import java.time.LocalDateTime;

@Entity
@Table(name = "application_status_history")
public class ApplicationStatusHistory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Integer id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "application_id", nullable = false) @OnDelete(action = OnDeleteAction.CASCADE) private InternshipApplication application;
    @Enumerated(EnumType.STRING) @Column(nullable = false) private ApplicationStatus status;
    @CreationTimestamp @Column(name = "changed_at", updatable = false) private LocalDateTime changedAt;
    public Integer getId() { return id; }
    public InternshipApplication getApplication() { return application; }
    public void setApplication(InternshipApplication application) { this.application = application; }
    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }
    public LocalDateTime getChangedAt() { return changedAt; }
}
