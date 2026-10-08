package com.uniconnect.backend.controller;
import com.uniconnect.backend.dto.AccountUpdateRequest;
import com.uniconnect.backend.dto.PasswordChangeRequest;
import com.uniconnect.backend.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController @RequestMapping("/api/account")
public class AccountController {
    private final AccountService service;
    public AccountController(AccountService service) { this.service = service; }
    @GetMapping public Map<String, Object> get(Authentication auth) { return service.get(auth.getName()); }
    @PutMapping public Map<String, Object> update(@Valid @RequestBody AccountUpdateRequest request, Authentication auth) { return service.update(auth.getName(), request); }
    @PutMapping("/password") public Map<String, String> password(@Valid @RequestBody PasswordChangeRequest request, Authentication auth) { service.password(auth.getName(), request); return Map.of("message", "Password updated successfully"); }
    @DeleteMapping public Map<String, String> deactivate(Authentication auth) { service.deactivate(auth.getName()); return Map.of("message", "Account deactivated"); }
}
