package com.resume.analyzer.repository;

import com.resume.analyzer.model.Analysis;
import com.resume.analyzer.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AnalysisRepository extends JpaRepository<Analysis, UUID> {
    List<Analysis> findByResumeId(UUID resumeId);
}
