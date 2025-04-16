package com.resume.analyzer.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resume.analyzer.dto.JobDescriptionRequest;
import com.resume.analyzer.dto.ResumeAnalysisResponse;
import com.resume.analyzer.dto.ResumeResponse;
import com.resume.analyzer.exception.ResumeAnalyzeException;
import com.resume.analyzer.exception.ResumeUploadException;
import com.resume.analyzer.model.Resume;
import com.resume.analyzer.model.User;
import com.resume.analyzer.repository.ResumeRepository;
import com.resume.analyzer.repository.UserRepository;
import com.resume.analyzer.security.SecurityUtil;
import jakarta.transaction.Transactional;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;

@Service
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final ChatModel chatModel;

    public ResumeServiceImpl(ResumeRepository resumeRepository, UserRepository userRepository, ChatModel chatModel) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
        this.chatModel = chatModel;
    }

    @Override
    public ResumeResponse uploadAndParseResume(MultipartFile file) {
        if (file.isEmpty()) {
            throw new ResumeUploadException("Please upload a valid PDF file.");
        }

        UUID userId = SecurityUtil.getCurrentUserId();
        User user = getUserById(userId);

        Resume resume = buildResume(file, user);
        resume = resumeRepository.save(resume);

        return buildResumeResponse(resume, user);
    }

    private User getUserById(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public ResumeResponse getResumeById(UUID id) {
        return resumeRepository.findById(id)
                .map(resume -> {
                    User user = resume.getUser();
                    return buildResumeResponse(resume, user);
                })
                .orElseThrow(() -> new RuntimeException("Resume not found"));
    }

    @Override
    @Transactional
    public List<ResumeResponse> getResumesByUser() {
        UUID userId = SecurityUtil.getCurrentUserId();
        List<Resume> resumes = resumeRepository.findByUserId(userId);
        List<ResumeResponse> resumeResponse = resumes.stream().map(resume -> {;
            User user = resume.getUser();
            return buildResumeResponse(resume, user);
        }).toList();

        return resumeResponse;
    }

    @Override
    public ResumeAnalysisResponse analyzeResumeWithAI(UUID resumeId, JobDescriptionRequest jobDescriptionRequest) {
        String jobDescription = jobDescriptionRequest.getJobDescription().replace("\"", "");
        checkIfJobDescriptionIsValid(jobDescription);
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));
        String analyzedText = chatModel.call(getAiPromptJson(jobDescription, resume.getParsedText()));
        resumeRepository.save(resume);
        return parseAiResponse(analyzedText);
    }

    @Override
    public void deleteResume(UUID id) {
        resumeRepository.deleteById(id);
    }

    @Override
    public Resource getPdfFile(UUID id) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        if (!resume.getFileType().equals("application/pdf")) {
            throw new RuntimeException("File is not a PDF");
        }

        return new ByteArrayResource(resume.getFileData());
    }

    private void checkIfJobDescriptionIsValid(String jobDescription) {
        String aiPrompt = getCheckIfValidJobDescriptionAiPrompt(jobDescription);
        String aiResponse = chatModel.call(aiPrompt);
        if (aiResponse.equalsIgnoreCase("No")) {
            throw new ResumeAnalyzeException("The provided job description is not valid.");
        }
    }

    private Resume buildResume(MultipartFile file, User user) {
        String parsedText = extractTextFromFile(file);
        checkIfResume(parsedText);
        Resume resume = new Resume();
        resume.setFileName(file.getOriginalFilename());
        resume.setFileType(file.getContentType());
        resume.setParsedText(parsedText);
        resume.setUser(user);
        try {
            resume.setFileData(file.getBytes());
        } catch (IOException e) {
            throw new ResumeUploadException("Could not store file data");
        }
        return resume;
    }

    private void checkIfResume(String parsedText) {
        String aiPrompt = getCheckIfResumeAiPrompt(parsedText);
        String aiResponse = chatModel.call(aiPrompt);
        if (aiResponse.equalsIgnoreCase("No")) {
            throw new ResumeAnalyzeException("The uploaded file is not a valid resume or CV.");
        }
    }

    private ResumeResponse buildResumeResponse(Resume resume, User user) {
        return new ResumeResponse(
                resume.getId(),
                resume.getFileName(),
                resume.getFileType(),
                resume.getParsedText(),
                user.getId(),
                resume.getUploadedAt()
        );
    }

    private String extractTextFromFile(MultipartFile file) {
        if (file.isEmpty() || !file.getOriginalFilename().endsWith(".pdf")) {
            throw new ResumeUploadException("Please upload a valid PDF file.");
        }

        try (InputStream inputStream = file.getInputStream(); PDDocument document = PDDocument.load(inputStream)) {
            if (document.isEncrypted()) {
                throw new ResumeUploadException("The PDF file is encrypted and cannot be read.");
            }

            PDFTextStripper pdfStripper = new PDFTextStripper();
            String text = pdfStripper.getText(document);
            text = text
                    .replace("\\r\\n", "\n")
                    .replace("\\n", "\n")
                    .replace("\\t", "\t")
                    .replace("\"","");
            return text.trim();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private ResumeAnalysisResponse parseAiResponse(String aiResponse) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            if (aiResponse.startsWith("```")) {
                aiResponse = aiResponse.replaceAll("(?s)^```(?:json)?\\s*", "") // remove starting ```
                        .replaceAll("\\s*```$", "");             // remove ending ```
            }

            return objectMapper.readValue(aiResponse, ResumeAnalysisResponse.class);
        } catch (Exception e) {
            throw new ResumeAnalyzeException("Failed to parse AI response", e);
        }
    }

    private String getCheckIfResumeAiPrompt(String resumeText) {
        return String.format("""
                Given the following text, determine whether it is a resume or CV. If it is a resume or CV, respond with 'Yes.' If it is not, respond with 'No.'
                
                Text: %s"
                
                Reply with only 'Yes' or 'No' and don't add any other text and don't add any punctuation.
                """, resumeText);
    }

    private String getCheckIfValidJobDescriptionAiPrompt(String jobDescription) {
        return String.format("""
                Given the following text, determine whether it is a valid Job Description. If it is a valid Job Description, respond with 'Yes.' If it is not, respond with 'No.'
                
                Text: %s"
                
                Reply with only 'Yes' or 'No' and don't add any other text and don't add any punctuation.
                """, jobDescription);
    }

    private String getAiPromptJson(String jobDescription, String resumeText) {
        return String.format("""
{
   "request": "Analyze the resume against the provided job description and generate the following information. Avoid using personal names or identifiers in the output. Provide the response in a structured JSON format as outlined below.",
   "input_data": {
     "job_description": "%s",
     "resume": "%s"
   },
   "output_format": {
     "MatchScore": "Provide a score indicating how well the resume aligns with the job description (out of 100).",
     "KeyStrengths": [
       "List the candidate's key strengths that match the job description, focusing on technical skills, relevant experience, and accomplishments."
     ],
     "SkillsGap": [
       "Identify any significant skills or qualifications mentioned in the job description that are missing or underrepresented in the resume."
     ],
     "SuggestionsForImprovement": [
       "Offer actionable suggestions for improving the resume, such as adding missing skills, highlighting specific achievements, or clarifying technical expertise."
     ],
     "OverallAssessment": "Provide a brief summary of how the resume matches the job description, focusing on the candidate's strengths, areas for improvement, and potential adjustments to increase alignment with the job requirements."
   },
   "response_format": {
     "MatchScore": "[score]",
     "KeyStrengths": [
       "Strength 1",
       "Strength 2",
       "Strength 3"
     ],
     "SkillsGap": [
       "Gap 1",
       "Gap 2",
       "Gap 3"
     ],
     "SuggestionsForImprovement": [
       "Improvement suggestion 1",
       "Improvement suggestion 2",
       "Improvement suggestion 3"
     ],
     "OverallAssessment": "Summary of alignment with the job description, strengths, and areas for improvement."
   }
 }
    """, jobDescription, resumeText);
    }
}
