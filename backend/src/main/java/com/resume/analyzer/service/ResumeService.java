package com.resume.analyzer.service;

import com.resume.analyzer.dto.JobDescriptionRequest;
import com.resume.analyzer.dto.ResumeAnalysisResponse;
import com.resume.analyzer.dto.ResumeResponse;
import com.resume.analyzer.model.Resume;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface ResumeService {
    ResumeResponse uploadAndParseResume(MultipartFile file);

    ResumeResponse getResumeById(UUID id);

    List<ResumeResponse> getResumesByUser();

    ResumeAnalysisResponse analyzeResumeWithAI(UUID resumeId, JobDescriptionRequest jobDescriptionRequest);

    void deleteResume(UUID id);
}
