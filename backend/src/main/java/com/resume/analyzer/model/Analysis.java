package com.resume.analyzer.model;

import com.resume.analyzer.dto.ResumeAnalysisResponse;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Analysis {

    @Id
    @GeneratedValue
    private UUID id;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb", nullable = false)
    private ResumeAnalysisResponse aiSummary;

    @NotNull
    @Column(columnDefinition = "TEXT")
    private String jobDescription;

    @ManyToOne
    @JoinColumn(name = "resume_id", nullable = false)
    @NotNull(message = "Resume cannot be null")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Resume resume;

    @CreationTimestamp
    private LocalDateTime analyzedAt;
}
