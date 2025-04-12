package com.resume.analyzer.exception;

public class ResumeAnalyzeException extends RuntimeException {
    public ResumeAnalyzeException(String message) {
        super(message);
    }

    public ResumeAnalyzeException(String message, Throwable cause) {
        super(message, cause);
    }
}
