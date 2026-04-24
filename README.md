<div align="center">

# ⚡ Runtime Resume
### *AI-Powered Resume Analyzer & Job Tracking Platform*

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Puter](https://img.shields.io/badge/Puter.js-181758?style=for-the-badge&logoColor=white)](https://puter.com/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)



[📸 Screenshots](#-screenshots) · [🚀 Getting Started](#-getting-started) · [🏗️ Architecture](#️-system-architecture) · [✨ Features](#-features) · [🔮 Roadmap](#-future-roadmap)

---

</div>

## 🧠 What is Runtime Resume?

**Runtime Resume** is a full-featured, browser-based web application that solves two major pain points for modern job seekers — all in one place:

1. **Resume ATS Optimization** — Over 98% of Fortune 500 companies use Applicant Tracking Systems to auto-filter resumes before a human ever reads them. Runtime Resume analyzes your resume against a real job description and tells you exactly where you stand.

2. **Application Tracking** — Stop juggling spreadsheets. Every resume you analyze gets logged into a clean dashboard with scores, company names, and job titles — all at a glance.

Whether you're a student landing your first internship or a fresh grad hunting for your first role, Runtime Resume gives you the edge.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Secure Auth** | One-click login via Puter — no backend setup needed |
| 📄 **Resume Upload** | Drag & drop PDF upload (up to 20 MB) |
| 🧾 **Job Details Form** | Input Company Name, Job Title & full Job Description |
| 🤖 **AI Resume Analysis** | NLP-powered ATS scoring, keyword matching & improvement tips |
| 📊 **Score Breakdown** | Tone, Content, Structure & Skills — all scored individually |
| 🗂️ **Application Dashboard** | Track all your applications with visual score indicators |
| 🎨 **Modern UI** | Clean gradient card-based design, fully responsive |

---

## 📸 Screenshots

<table>
  <tr>
    <td align="center"><b>🔑 Login Page</b></td>
    <td align="center"><b>🏠 Home / Dashboard</b></td>
  </tr>
  <tr>
    <td><img src="screenshots/img.png" alt="Login Page" width="400"/></td>
    <td><img src="screenshots/img_1.png" alt="Dashboard" width="400"/></td>
  </tr>
  <tr>
    <td align="center"><b>📤 Resume Upload</b></td>
    <td align="center"><b>📈 Analysis Results</b></td>
  </tr>
  <tr>
    <td><img src="screenshots/img_2.png" alt="Upload Page" width="400"/></td>
    <td><img src="screenshots/result.png" alt="Results Page" width="400"/></td>
  </tr>
</table>


---

## 🏗️ System Architecture

Runtime Resume follows a **client-centric Single Page Application (SPA)** architecture with three principal layers:

```
┌─────────────────────────────────────────────────────────────┐
│                  PRESENTATION LAYER (React)                  │
│   Landing → Auth → Upload UI → AI Results → Dashboard       │
└────────────────────────┬────────────────────────────────────┘
                         │  REST API Calls
┌────────────────────────▼────────────────────────────────────┐
│             AUTHENTICATION LAYER (Puter.js)                  │
│        Sign-up · Login · JWT Token · Session Mgmt           │
└────────────────────────┬────────────────────────────────────┘
                         │  Resume + Job Details Payload
┌────────────────────────▼────────────────────────────────────┐
│              AI PROCESSING LAYER (NLP Engine)                │
│   Keyword Matching · ATS Scoring · Improvement Suggestions  │
└─────────────────────────────────────────────────────────────┘
```

**Data Flow:**
1. User logs in → Puter issues JWT → stored in `localStorage`
2. User uploads PDF resume + fills Job Details form
3. Frontend sends Base64-encoded resume + job data to AI engine
4. AI returns `{ atsScore, skills, suggestions }` as JSON
5. Results rendered on Analysis page + saved to Dashboard

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| **React.js** | Component-based UI, state management, routing |
| **Vite** | Lightning-fast dev server & production bundler |
| **Puter.js** | Serverless authentication & session management |
| **JavaScript ES6+** | Core app logic, async API calls, event handling |
| **HTML5 / CSS3** | Markup, gradient card layouts, responsive design |
| **FileReader API** | Client-side PDF reading & Base64 encoding |
| **Browser LocalStorage** | Lightweight auth token + application data persistence |
| **AI / NLP Engine** | Resume scoring, keyword analysis, feedback generation |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/en) (v18+)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/dakshgambhir/runtime-resume.git
cd runtime-resume

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. That's it — no `.env` file or API keys needed!

---

## 📁 Project Structure

```
runtime-resume/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AtsScoreBadge.jsx
│   │   ├── FileUpload.jsx
│   │   └── DashboardCard.jsx
│   ├── pages/               # Route-level page components
│   │   ├── Login.jsx
│   │   ├── Home.jsx
│   │   ├── Upload.jsx
│   │   ├── Results.jsx
│   │   └── Dashboard.jsx
│   ├── utils/               # Helper functions (auth, storage, API)
│   └── main.jsx             # App entry point
├── screenshots/             # README screenshots
├── index.html
├── vite.config.js
└── package.json
```

---

## 🔑 Core Code Highlights

### ATS Score Color Badge
```jsx
const AtsScoreBadge = ({ score }) => {
  const getColor = (s) => {
    if (s >= 80) return '#27ae60'; // 🟢 Strong match
    if (s >= 60) return '#f39c12'; // 🟡 Moderate match
    return '#e74c3c';              // 🔴 Weak match
  };
  return (
    <div className="ats-badge" style={{ backgroundColor: getColor(score) }}>
      <span className="score-value">{score}%</span>
      <span className="score-label">ATS Score</span>
    </div>
  );
};
```

### Puter Authentication
```js
const handleLogin = async () => {
  const user = await puter.auth.signIn();
  localStorage.setItem('auth_token', user.token);
  window.location.href = '/dashboard';
};
```

---

## 🔮 Future Roadmap

- [ ] 🗄️ **Backend + Database** — Node.js/Express + MongoDB Atlas for cross-device persistence
- [ ] 📝 **Resume Versioning** — Compare multiple resume versions against the same JD
- [ ] ✉️ **Cover Letter Generator** — AI-generated cover letters from resume + JD
- [ ] 🔗 **Job Board Integration** — Auto-fetch JDs from LinkedIn, Indeed, Naukri
- [ ] 🎤 **Interview Prep Module** — Role-specific questions + AI feedback on answers
- [ ] 🏗️ **Resume Builder** — Build ATS-optimized resumes from scratch in-app
- [ ] 📱 **Mobile App** — React Native / Flutter companion app
- [ ] 📊 **Analytics Dashboard** — ATS score trends, missing keyword insights

---


</div>
