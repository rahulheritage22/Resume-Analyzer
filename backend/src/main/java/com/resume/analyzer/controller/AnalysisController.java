package com.resume.analyzer.controller;

import com.resume.analyzer.dto.AnalysisResponse;
import com.resume.analyzer.dto.AnalysisUpdateRequest;
import com.resume.analyzer.dto.CreateAnalysisRequest;
import com.resume.analyzer.dto.ResumeAnalysisResponse;
import com.resume.analyzer.service.AnalysisService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/analysis")
public class AnalysisController {

    private final AnalysisService analysisService;

    public AnalysisController(AnalysisService analysisService) {
        this.analysisService = analysisService;
    }

    @GetMapping("/{id}")
    public AnalysisResponse getAnalysis(@PathVariable UUID id) {
        return analysisService.getAnalysis(id);
    }

    @GetMapping("/resume/{resumeId}")
    public List<AnalysisResponse> getAnalysisByResumeId(@PathVariable UUID resumeId) {
        return analysisService.getAnalysisByResumeId(resumeId);
    }

    @PostMapping
    public AnalysisResponse createAnalysis(@RequestBody CreateAnalysisRequest createAnalysisRequest) {
        return analysisService.createAnalysis(createAnalysisRequest);
    }

    @PutMapping("/{id}")
    public AnalysisResponse updateAnalysis(@PathVariable UUID id, @RequestBody AnalysisUpdateRequest request) {
        return analysisService.updateAnalysis(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteAnalysis(@PathVariable UUID id) {
        analysisService.deleteAnalysis(id);
    }
}
