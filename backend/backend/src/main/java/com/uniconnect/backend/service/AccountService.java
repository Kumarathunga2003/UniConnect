package com.uniconnect.backend.service;
import com.uniconnect.backend.dto.AccountUpdateRequest;
import com.uniconnect.backend.dto.PasswordChangeRequest;
import com.uniconnect.backend.entity.User;
import com.uniconnect.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.LinkedHashMap;
import java.util.Map;
@Service
public class AccountService {
    private final UserRepository users; private final PasswordEncoder encoder;
    public AccountService(UserRepository users, PasswordEncoder encoder) { this.users = users; this.encoder = encoder; }
    public Map<String, Object> get(String email) {
        User u = find(email);
        Map<String, Object> account = new LinkedHashMap<>();
        account.put("id", u.getId());
        account.put("fullName", u.getFullName());
        account.put("email", u.getEmail());
        account.put("role", u.getRole());
        account.put("createdAt", u.getCreatedAt());
        return account;
    }
    @Transactional public Map<String, Object> update(String email, AccountUpdateRequest request) { User u = find(email); if (request.getEmail() != null && !request.getEmail().equalsIgnoreCase(email) && users.existsByEmail(request.getEmail())) throw new IllegalArgumentException("Email is already registered"); if (request.getFullName() != null && !request.getFullName().isBlank()) u.setFullName(request.getFullName().trim()); if (request.getEmail() != null && !request.getEmail().isBlank()) u.setEmail(request.getEmail().trim().toLowerCase()); users.save(u); return get(u.getEmail()); }
    @Transactional public void password(String email, PasswordChangeRequest request) { User u = find(email); if (!encoder.matches(request.getCurrentPassword(), u.getPassword())) throw new IllegalArgumentException("Current password is incorrect"); if (request.getNewPassword() == null || request.getNewPassword().length() < 8) throw new IllegalArgumentException("New password must contain at least 8 characters"); u.setPassword(encoder.encode(request.getNewPassword())); users.save(u); }
    @Transactional public void deactivate(String email) { User u = find(email); u.setActive(false); users.save(u); }
    private User find(String email) { return users.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found")); }
}
