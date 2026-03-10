# 🤖 AI Resume Analyzer

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/yourusername/ai-resume-analyzer/actions) [![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/yourusername/ai-resume-analyzer)

An **AI-powered resume analysis tool** that evaluates resumes for **ATS compatibility, skill match, and job description alignment**. Provides **detailed feedback, improvement suggestions, and skill highlights** to help users optimize resumes for job applications.


## ✨ Features

### 📄 Resume Upload
- Drag & drop PDF upload
- Automatic PDF → Image preview
- Secure file storage & handling

### 🧠 AI Resume Feedback
- AI analyzes strengths, weaknesses, and gaps
- Suggests **bullet point rewrites** and **keyword optimization**

### 📊 ATS Score
- Calculates **ATS compatibility**
- Provides actionable suggestions for improvement

### 🎯 Job Description Matching
- Matches resume skills to job description
- Highlights:
  - ✅ Matched skills
  - ⚠️ Missing skills
  - 📈 Job match score percentage

### 🏷 Skill Detection
- Extracts skills from resume text
- Displays as **interactive tags**
- Can visualize skill strength in charts

### 💪 Resume Strength Score
- Combines ATS + Job Match scores
- Shows overall **resume strength percentage**

### 📊 Interactive Charts
- Placeholder for **skills radar chart**
- Future: **keyword heatmaps** and **strength visualizations**

---

## 🏗 Tech Stack

| Frontend       | Backend & AI       | Storage           | Other Tools             |
|----------------|------------------|-----------------|------------------------|
| React          | Puter AI SDK      | Puter KV Storage | PDF → Image Conversion |
| TypeScript     | AI Feedback       | Puter File System| Skill Detection Engine |
| TailwindCSS    | AI Resume Rewriter|                  | Job Description Matcher|

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/ai-resume-analyzer.git
cd ai-resume-analyzer
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open in browser:

```bash
http://localhost:5173
```

---

## 📂 Project Structure

```
app
 ├── components
 │   ├── Summary.tsx         # AI Resume Summary
 │   ├── ATS.tsx             # ATS Score Component
 │   ├── JobMatch.tsx        # Job Description Match
 │   ├── Improvements.tsx    # Resume Improvement Suggestions
 │   ├── SkillTags.tsx       # Skill Tags Display
 │   └── AIRewrite.tsx       # AI Resume Rewriter
 │
 ├── routes
 │   ├── upload.tsx          # Upload Page
 │   └── resume.tsx          # Resume Review Page
 │
 ├── lib
 │   ├── skillEngine.ts      # Resume Skill Detection
 │   ├── jobMatcher.ts       # Job Description Matching
 │   └── pdf2img.ts          # PDF to Image Conversion
```

---

## 🧠 How It Works

1. **Upload Resume** → PDF converted to image
2. **Extract Text** → AI reads resume content
3. **Skill Detection** → Extracts all relevant skills
4. **Job Matching** → Compares resume skills with job description
5. **ATS Scoring** → Calculates ATS compatibility
6. **AI Feedback** → Suggests improvements & rewrites content
7. **Resume Strength** → Combines ATS & Job Match scores
8. **Interactive Charts** → Future radar charts for skills visualization

---

## 🎯 Future Improvements

- Animated **resume keyword heatmaps**
- Multi-page resume support
- AI **cover letter generator**
- **Interview prep suggestions** from AI
- Customizable **resume templates**
- Interactive **skill radar charts**
- Resume **PDF export with highlights**

---

## 👨‍💻 Author

Developed by **[Chetana Dharavathu]**  

---

## ⭐ Support

If you like this project, **give it a star ⭐ on GitHub**!

---

