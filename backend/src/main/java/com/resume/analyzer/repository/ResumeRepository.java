package com.resume.analyzer.repository;

import com.resume.analyzer.model.Resume;
import com.resume.analyzer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ResumeRepository extends JpaRepository<Resume, UUID> {
    List<Resume> findByUserId(UUID userId);
}
