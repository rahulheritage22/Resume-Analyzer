package com.resume.analyzer.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumeResponse {
    private UUID id;

    @NotBlank(message = "File name cannot be blank")
    private String fileName;

    @NotBlank(message = "File type cannot be blank")
    private String fileType;

    @NotBlank(message = "Parsed text cannot be blank")
    private String parsedText; // Extracted text content

    @NotNull(message = "User cannot be null")
    private UUID userId;

    private LocalDateTime uploadedAt;
}
