
# 🤖 AI-Powered Resume Analyzer & Job Matcher

This project is a backend application built with **Spring Boot** and **Spring AI**, designed to analyze resumes and match them with job descriptions using AI-powered reasoning and similarity scoring.

---

## 🌟 Features

- Upload and parse resumes (PDF/DOCX)
- AI-based resume analysis (summary, skills, improvement suggestions)
- Upload and manage job descriptions
- AI-powered job matching with score and explanation
- Optional semantic similarity using vector search
- Feedback loop from users
- JWT authentication (optional)
- Dockerized for easy deployment

---

## 🧠 Tech Stack

- Java + Spring Boot
- Spring AI / OpenAI / LangChain4j
- PostgreSQL + pgvector
- Redis (caching)
- Apache Tika / PDFBox (resume parsing)
- Docker & Kubernetes (deployment)

---

## 📁 Project Structure (Recommended)

```
resume-analyzer/
├── src/
│   ├── main/
│   │   ├── java/com/example/resumeanalyzer/
│   │   │   ├── controller/
│   │   │   ├── service/
│   │   │   ├── model/
│   │   │   ├── repository/
│   │   │   └── config/
│   │   └── resources/
│   │       ├── application.yml
│   │       └── prompts/
├── Dockerfile
├── docker-compose.yml
├── README.md
└── resume-analyzer-todo.md
```

---

## 🚀 Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/resume-analyzer.git
   cd resume-analyzer
   ```

2. Configure `application.yml`:
   - DB settings
   - Spring AI or OpenAI API keys

3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

4. (Optional) Use Docker:
   ```bash
   docker-compose up --build
   ```

---

## ✅ TODO Checklist

Check out [`resume-analyzer-todo.md`](resume-analyzer-todo.md) for a detailed list of implementation steps.

---

## 📄 API Endpoints (Sample)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/resume/upload | Upload a resume file |
| POST   | /api/resume/analyze | Analyze a resume using AI |
| POST   | /api/job/upload | Upload a job description |
| POST   | /api/job/match | Match resume to jobs |
| GET    | /api/job/matches | Get match results |

---

## 🙌 Contributions

Feel free to fork this repo, improve it, and submit PRs. Contributions are welcome!

