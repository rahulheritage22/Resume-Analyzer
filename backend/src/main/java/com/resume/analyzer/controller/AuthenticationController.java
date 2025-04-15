package com.resume.analyzer.controller;

import com.resume.analyzer.dto.AuthenticationRequest;
import com.resume.analyzer.dto.AuthenticationResponse;
import com.resume.analyzer.dto.ErrorResponse;
import com.resume.analyzer.model.User;
import com.resume.analyzer.repository.UserRepository;
import com.resume.analyzer.security.CustomUserDetailsService;
import com.resume.analyzer.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;
    private final UserRepository userRepository;

    public AuthenticationController(AuthenticationManager authenticationManager,
                                  JwtUtil jwtUtil,
                                  CustomUserDetailsService userDetailsService,
                                  UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getEmail(),
                            authenticationRequest.getPassword()
                    )
            );
        } catch (DisabledException e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(
                            LocalDateTime.now(),
                            "Account is disabled",
                            "Please contact support"
                    ));
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(
                            LocalDateTime.now(),
                            "Invalid credentials",
                            "Please check your email and password"
                    ));
        }

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getEmail());
        
        User user = userRepository.findByEmail(authenticationRequest.getEmail())
                .orElseThrow(() -> new BadCredentialsException("User not found"));

        final String jwt = jwtUtil.generateToken(userDetails.getUsername(), user.getId());
        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }
}
