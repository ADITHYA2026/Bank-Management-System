package com.bank.management.controller;
import com.bank.management.dto.LoginRequest;
import com.bank.management.dto.LoginResponse;
import com.bank.management.model.User;
import com.bank.management.repository.UserRepository;
import com.bank.management.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    public AuthController(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest loginRequest) {
        authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken.unauthenticated(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        User user = userRepository
                .findByUsername(loginRequest.getUsername())
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));
        String token = jwtService.generateToken(user);
        LoginResponse response = new LoginResponse(
                token,
                user.getUsername(),
                user.getRole(),
                user.getEmployeeId()
        );
        return ResponseEntity.ok(response);
    }
}