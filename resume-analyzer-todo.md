
# ✅ AI-Powered Resume Analyzer & Job Matcher - TODO Checklist

## PHASE 1: Project Setup

- [x] Initialize Spring Boot project with required dependencies
- [x] Setup Git repository and .gitignore
- [x] Configure `application.yml` (DB, AI API, file upload)
- [x] Setup PostgreSQL database
- [x] Add Flyway/Liquibase for schema migrations
- [ ] Define base entities: `User`, `Resume`, `JobDescription`, `MatchResult`, `Feedback`

## PHASE 2: Resume Upload & Parsing

- [ ] `POST /api/resume/upload` to accept PDF/DOCX
- [ ] Store file and metadata in DB
- [ ] Use Apache Tika or PDFBox to parse resume
- [ ] Store parsed text in `Resume` entity

## PHASE 3: Resume Analyzer (Spring AI Integration)

- [ ] Add Spring AI/OpenAI client
- [ ] Create prompt template for resume analysis
- [ ] Build `ResumeAnalysisService`
- [ ] `POST /api/resume/analyze` API
- [ ] Return structured ResumeSummaryDTO

## PHASE 4: Job Description Management

- [ ] `POST /api/job/upload` to upload job descriptions
- [ ] `GET /api/job/list` to list all jobs
- [ ] Store required skills and experience

## PHASE 5: Resume & JD Matching

- [ ] Implement skill-based matching algorithm
- [ ] Create prompt for scoring and reasoning
- [ ] Store match results in `MatchResult`
- [ ] `POST /api/job/match` and `GET /api/job/matches` APIs

## PHASE 6: Semantic Matching (Optional)

- [ ] Generate embeddings for resumes and JDs
- [ ] Use pgvector or Qdrant for similarity search
- [ ] Implement cosine similarity matching

## PHASE 7: Feedback Loop (Optional)

- [ ] `POST /api/feedback` API for user input
- [ ] Store feedback and connect to match results
- [ ] Build basic admin dashboard

## PHASE 8: Authentication (Optional)

- [ ] Add Spring Security and JWT login
- [ ] Create role-based access to APIs

## PHASE 9: Testing, Docker, & Deployment

- [ ] Write unit and integration tests
- [ ] Create Dockerfile and docker-compose.yml
- [ ] Deploy to cloud/Kubernetes

## Bonus Features

- [ ] AI-powered resume rewriter
- [ ] SSE/WebSocket support for streaming responses
- [ ] Email job matches to users
- [ ] Bulk JD upload via CSV

