package com.bank.management.service;
import com.bank.management.model.User;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import java.time.Instant;
@Service
public class JwtService {
    private final JwtEncoder jwtEncoder;
    public JwtService(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }
    public String generateToken(User user) {
        Instant now = Instant.now();
        JwtClaimsSet.Builder claimsBuilder = JwtClaimsSet.builder()
                .subject(user.getUsername())
                .claim("role", user.getRole())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(60 * 60));
        if (user.getEmployeeId() != null) {
            claimsBuilder.claim("employeeId", user.getEmployeeId());
        }
        return jwtEncoder.encode(
                JwtEncoderParameters.from(
                        claimsBuilder.build()
                )
        ).getTokenValue();
    }
}