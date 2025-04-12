package com.resume.analyzer.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumeAnalysisResponse {
    @JsonProperty("MatchScore")
    private int MatchScore = 0;

    @JsonProperty("KeyStrengths")
    private List<String> KeyStrengths = new ArrayList<>();

    @JsonProperty("SkillsGap")
    private List<String> SkillsGap = new ArrayList<>();

    @JsonProperty("SuggestionsForImprovement")
    private List<String> SuggestionsForImprovement = new ArrayList<>();

    @JsonProperty("OverallAssessment")
    private String OverallAssessment = "";

    @JsonProperty("extraThingsToConsider")
    private Map<String, String> extraThingsToConsider = new HashMap<>();
}
