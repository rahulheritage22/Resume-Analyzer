package com.resume.analyzer.controller;

import com.resume.analyzer.dto.JobDescriptionRequest;
import com.resume.analyzer.dto.ResumeAnalysisResponse;
import com.resume.analyzer.dto.ResumeResponse;
import com.resume.analyzer.model.Resume;
import com.resume.analyzer.service.ResumeService;
    import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/upload")
    public ResponseEntity<ResumeResponse> uploadResume(@RequestParam("file") MultipartFile file) {
        ResumeResponse savedResume = resumeService.uploadAndParseResume(file);
        return ResponseEntity.ok(savedResume);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResumeResponse> getResumeById(@PathVariable UUID id) {
        ResumeResponse resume = resumeService.getResumeById(id);
        return ResponseEntity.ok(resume);
    }

    @GetMapping("/user/me")
    public ResponseEntity<List<ResumeResponse>> getResumesByUser() {
        return ResponseEntity.ok(resumeService.getResumesByUser());
    }

    @PostMapping("/analyze/{resumeId}")
    public ResponseEntity<ResumeAnalysisResponse> analyzeResume(@PathVariable UUID resumeId, @RequestBody JobDescriptionRequest jobDescription) {
        ResumeAnalysisResponse analyzed = resumeService.analyzeResumeWithAI(resumeId, jobDescription);
        return ResponseEntity.ok(analyzed);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResume(@PathVariable UUID id) {
        resumeService.deleteResume(id);
        return ResponseEntity.noContent().build();
    }
}
