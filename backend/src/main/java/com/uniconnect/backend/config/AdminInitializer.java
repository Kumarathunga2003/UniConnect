package com.uniconnect.backend.config;
import com.uniconnect.backend.entity.Role;
import com.uniconnect.backend.entity.User;
import com.uniconnect.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
@Component
public class AdminInitializer implements CommandLineRunner {
    private final UserRepository users; private final PasswordEncoder encoder; private final String email; private final String password;
    public AdminInitializer(UserRepository users, PasswordEncoder encoder, @Value("${ADMIN_EMAIL:}") String email, @Value("${ADMIN_PASSWORD:}") String password) { this.users = users; this.encoder = encoder; this.email = email; this.password = password; }
    @Override public void run(String... args) { if (email == null || email.isBlank() || password == null || password.length() < 8 || users.existsByEmail(email)) return; User admin = new User(); admin.setFullName("UniConnect Administrator"); admin.setEmail(email.toLowerCase()); admin.setPassword(encoder.encode(password)); admin.setRole(Role.ADMIN); users.save(admin); }
}
