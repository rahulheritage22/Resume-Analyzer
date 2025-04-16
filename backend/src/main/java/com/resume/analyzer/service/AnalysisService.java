package com.resume.analyzer.service;

import com.resume.analyzer.dto.AnalysisResponse;
import com.resume.analyzer.dto.AnalysisUpdateRequest;
import com.resume.analyzer.dto.CreateAnalysisRequest;
import com.resume.analyzer.dto.ResumeAnalysisResponse;

import java.util.List;
import java.util.UUID;

public interface AnalysisService {
    AnalysisResponse getAnalysis(UUID id);

    List<AnalysisResponse> getAnalysisByResumeId(UUID resumeId);

    AnalysisResponse updateAnalysis(UUID id, AnalysisUpdateRequest request);

    void deleteAnalysis(UUID id);

    AnalysisResponse createAnalysis(CreateAnalysisRequest createAnalysisRequest);
}
