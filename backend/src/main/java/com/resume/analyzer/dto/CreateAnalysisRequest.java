package com.resume.analyzer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateAnalysisRequest {
    private UUID resumeId;
    private String jobDescription;
    private ResumeAnalysisResponse aiSummary;
}
