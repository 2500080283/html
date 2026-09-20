# Ch. Prudhvi Raj - Personal Developer Portfolio (Full-Stack)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

> **Student Developer**: Ch. Prudhvi Raj  
> **Student ID**: 2500080283  
> **Institution**: KL University (Koneru Lakshmaiah Education Foundation)  
> **Department**: Computer Science & Engineering (CSE)  
> **Specialization**: Front-End Development (FED) & Full-Stack Systems  
> **GitHub**: [github.com/2500080283](https://github.com/2500080283)  
> **Live Deployment**: [html-seven-pink.vercel.app](https://html-seven-pink.vercel.app)

---

## ✨ Portfolio Highlights

- ⚡ **Modern Aesthetic & Performance**: Glassmorphic UI with dynamic typing animation, smooth scrolling, and accessible contrast.
- 🌓 **Dark / Light Mode Engine**: System-preference-aware with persistent toggle, inline zero-FOUC initialization, and modern CSS custom properties.
- 📂 **Showcase of All 6 Repositories**:
  1. [**EduHub KL (`WebProject`)**](https://github.com/2500080283/WebProject): Capstone Academic Portal with attendance forecasting & 10-point SGPA/CGPA calculator.
  2. [**DevSprint (`FIRSTAPP`)**](https://github.com/2500080283/FIRSTAPP): Student Productivity Suite with Pomodoro timer & dual-mode sync engine.
  3. [**FED Curriculum Hub (`FED`)**](https://github.com/2500080283/FED): 5-module laboratory coursework with interactive mini-projects & API client lab.
  4. [**Web Lab Portal (`html`)**](https://github.com/2500080283/html): Full-stack lab collection deployed live on Vercel.
  5. [**A Little Question ♥ (`LOVE`)**](https://github.com/2500080283/LOVE): Romantic proposal experience with particle physics & response logging backend.
  6. [**UI Component Kit (`sample`)**](https://github.com/2500080283/sample): Modular design system with built-in Express mock API playground.
- 🎯 **Interactive Category Filter**: Filter projects instantly between *All*, *Full-Stack*, *Productivity*, *Academic*, and *Creative*.
- 📬 **Full-Stack Contact Engine**: Connects to an Express REST API backend (`POST /api/contact`) that stores messages in `data/messages.json` with an automatic `localStorage` offline fallback.
- 📄 **Profile & Resume Modal**: Integrated resume view with quick print/save-as-PDF support.

---

## 🛠️ Backend REST API Endpoints

The portfolio includes an Express server listening on port `3005`:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server health check and student information |
| `GET` | `/api/projects` | Dynamic JSON catalog of repositories |
| `GET` | `/api/messages` | Admin endpoint to review received contact inquiries |
| `POST` | `/api/contact` | Submits and validates contact inquiries, persisting to `data/messages.json` |

---

## 📂 File Hierarchy

```
portfolio/
├── data/
│   ├── projects.json       # Catalog of all 6 GitHub projects & metadata
│   └── messages.json       # Persistent database for contact inquiries
├── css/
│   ├── style.css           # Modern CSS layouts, glassmorphism, responsive grid
│   └── theme.css           # Light/Dark theme tokens complying with modern-web-guidance
├── js/
│   ├── app.js              # Project filters, typing animation, contact submission & modal
│   └── theme.js            # Theme toggle engine & system preference listener
├── index.html              # Main single-page portfolio layout
├── server.js               # Node.js & Express REST API server (Port 3005)
├── package.json            # Project metadata and dependencies
├── .gitignore              # Ignores node_modules
└── README.md               # Documentation and setup guide
```

---

## 🚀 How to Run Locally

### Full-Stack Mode (Node.js & Express)
```bash
# 1. Clone the repository
git clone https://github.com/2500080283/portfolio.git

# 2. Navigate into the directory
cd portfolio

# 3. Install dependencies
npm install

# 4. Start the server (runs on port 3005)
npm start
```
Visit `http://localhost:3005` in your browser.

### Standalone Static Mode
You can also open `index.html` directly in any web browser:
```bash
start index.html
```
*(When running statically without Node.js, the contact form gracefully stores messages to browser `localStorage`).*

---

&copy; 2026 Ch. Prudhvi Raj • Department of Computer Science & Engineering • KL University
