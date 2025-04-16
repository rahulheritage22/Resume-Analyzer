package com.resume.analyzer.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resume.analyzer.dto.AnalysisResponse;
import com.resume.analyzer.dto.AnalysisUpdateRequest;
import com.resume.analyzer.dto.CreateAnalysisRequest;
import com.resume.analyzer.dto.ResumeAnalysisResponse;
import com.resume.analyzer.exception.AnalysisNotFoundException;
import com.resume.analyzer.exception.ResumeAnalyzeException;
import com.resume.analyzer.exception.ResumeNotFoundException;
import com.resume.analyzer.model.Analysis;
import com.resume.analyzer.model.Resume;
import com.resume.analyzer.repository.AnalysisRepository;
import com.resume.analyzer.repository.ResumeRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AnalysisServiceImpl implements AnalysisService {

    private final AnalysisRepository analysisRepository;
    private final ResumeRepository resumeRepository;

    public AnalysisServiceImpl(AnalysisRepository analysisRepository, ResumeRepository resumeRepository) {
        this.analysisRepository = analysisRepository;
        this.resumeRepository = resumeRepository;
    }

    @Override
    public AnalysisResponse getAnalysis(UUID id) {
        Analysis analysis = analysisRepository.findById(id)
                .orElseThrow(() -> new AnalysisNotFoundException("Analysis not found"));
        return new AnalysisResponse(analysis.getId(), analysis.getAiSummary(), analysis.getJobDescription(), analysis.getResume().getId());
    }

    @Override
    @Transactional
    public List<AnalysisResponse> getAnalysisByResumeId(UUID resumeId) {
        List<Analysis> analyses = analysisRepository.findByResumeId(resumeId);
        return analyses.stream()
                .map(a -> new AnalysisResponse(a.getId(), a.getAiSummary(), a.getJobDescription(), a.getResume().getId())).toList();
    }

    @Override
    public AnalysisResponse updateAnalysis(UUID id, AnalysisUpdateRequest request) {
        Analysis analysis = analysisRepository.findById(id)
                .orElseThrow(() -> new AnalysisNotFoundException("Analysis not found"));
        analysis.setAiSummary(request.getAiSummary());
        analysis.setJobDescription(request.getJobDescription());
        analysisRepository.save(analysis);
        return new AnalysisResponse(analysis.getId(), analysis.getAiSummary(), analysis.getJobDescription(), analysis.getResume().getId());
    }

    @Override
    public void deleteAnalysis(UUID id) {
        analysisRepository.deleteById(id);
    }

    @Override
    public AnalysisResponse createAnalysis(CreateAnalysisRequest createAnalysisRequest) {
        Analysis analysis = new Analysis();
        analysis.setAiSummary(createAnalysisRequest.getAiSummary());
        analysis.setJobDescription(createAnalysisRequest.getJobDescription());

        Resume resume = resumeRepository.findById(createAnalysisRequest.getResumeId()).orElseThrow(
                () -> new ResumeNotFoundException("Resume not found"));

        analysis.setResume(resume);
        analysis = analysisRepository.save(analysis);
        return new AnalysisResponse(analysis.getId(), analysis.getAiSummary(), analysis.getJobDescription(), analysis.getResume().getId());
    }

    private ResumeAnalysisResponse convertToResumeAnalysisResponse(String analysis) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            if (analysis.startsWith("```")) {
                analysis = analysis.replaceAll("(?s)^```(?:json)?\\s*", "") // remove starting ```
                        .replaceAll("\\s*```$", "");             // remove ending ```
            }

            return objectMapper.readValue(analysis, ResumeAnalysisResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse AI response", e);
        }
    }
}
