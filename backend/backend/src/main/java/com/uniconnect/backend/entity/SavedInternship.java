package com.uniconnect.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import java.time.LocalDateTime;

@Entity
@Table(name = "saved_internships", uniqueConstraints = @UniqueConstraint(columnNames = {"student_id", "internship_id"}))
public class SavedInternship {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "student_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE) private Student student;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "internship_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE) private Internship internship;
    @CreationTimestamp @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    public Integer getId() { return id; }
    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
    public Internship getInternship() { return internship; }
    public void setInternship(Internship internship) { this.internship = internship; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
