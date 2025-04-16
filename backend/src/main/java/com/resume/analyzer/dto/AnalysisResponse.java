package com.resume.analyzer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnalysisResponse {
    private UUID id;
    private ResumeAnalysisResponse aiSummary;
    private String jobDescription;
    private UUID resumeId;
}
