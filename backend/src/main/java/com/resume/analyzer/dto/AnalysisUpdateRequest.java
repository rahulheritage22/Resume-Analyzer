package com.resume.analyzer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnalysisUpdateRequest {
    private String jobDescription;
    private ResumeAnalysisResponse aiSummary;
}
