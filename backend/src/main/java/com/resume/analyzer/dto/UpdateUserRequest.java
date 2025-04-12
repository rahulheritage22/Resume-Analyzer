package com.resume.analyzer.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {
    @Pattern(regexp = "^[A-Za-z]+(\\s[A-Za-z]+)*$", message = "Name should only contain alphabets and a single space between words, without leading or trailing spaces")
    private String name;

    @Email(message = "Email should be valid")
    private String email;
}
