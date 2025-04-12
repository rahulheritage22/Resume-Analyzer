package com.resume.analyzer.model;

import jakarta.persistence.Basic;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Resume {
    @Id
    @GeneratedValue
    private UUID id;

    @NotBlank(message = "File name cannot be blank")
    private String fileName;

    @NotBlank(message = "File type cannot be blank")
    private String fileType;

    @Lob
    @NotBlank(message = "Parsed text cannot be blank")
    private String parsedText; // Extracted text content

    @Lob
    private String aiSummary; // AI-generated analysis

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @NotNull(message = "User cannot be null")
    private User user;

    @CreationTimestamp
    private LocalDateTime uploadedAt;
}
