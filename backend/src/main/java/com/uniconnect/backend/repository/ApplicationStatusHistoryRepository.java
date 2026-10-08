package com.uniconnect.backend.repository;
import com.uniconnect.backend.entity.ApplicationStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ApplicationStatusHistoryRepository extends JpaRepository<ApplicationStatusHistory, Integer> {
    List<ApplicationStatusHistory> findByApplicationIdOrderByChangedAtAsc(Integer applicationId);
}
