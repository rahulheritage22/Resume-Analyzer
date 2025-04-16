export interface AnalysisResponse {
    MatchScore: number;
    KeyStrengths: string[];
    SkillsGap: string[];
    SuggestionsForImprovement: string[];
    OverallAssessment: string;
}

export interface SavedAnalysis {
    id: string;
    aiSummary: AnalysisResponse;
    jobDescription: string;
    resumeId: string;
}