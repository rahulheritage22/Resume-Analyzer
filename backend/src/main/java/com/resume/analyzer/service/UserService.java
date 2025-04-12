package com.resume.analyzer.service;

import com.resume.analyzer.dto.LoginRequest;
import com.resume.analyzer.dto.UpdateUserRequest;
import com.resume.analyzer.dto.UserRequest;
import com.resume.analyzer.dto.UserResponse;

import java.util.List;
import java.util.UUID;

public interface UserService {
    UserResponse login(LoginRequest loginRequest);

    UserResponse createUser(UserRequest user);

    List<UserResponse> getAllUsers();

    UserResponse getUserById(UUID id);

    UserResponse updateUser(UUID id, UpdateUserRequest user);

    void deleteUser(UUID id);
}
