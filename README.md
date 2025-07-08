# 🪞 MirrorAI – Frontend

MirrorAI is an AI-powered web platform that lets users generate, customize, and collaborate on stunning presentations using text or voice. This is the frontend repository built with React and TypeScript.

---

## 🚀 Features

- 🎤 **Voice-to-Deck**: Generate presentations using speech input, powered by ultra-fast **Groq Speech models**.
- ✍️ **Smart Text Generation**: Get AI-generated content for slides using **Fetch.ai agents**.
- 🎨 **Editable Layouts**: Users can resize, move, and re-style elements for full creative control.
- 🗂️ **Boards for Organization**: Presentations are grouped into themed boards.
- 🔄 **Real-Time Collaboration**: Teams can co-edit slides simultaneously.
- 🔐 **Authentication System**: Save and download presentations after logging in.
- 🌍 **Template Sharing**: Users can publish presentations for others to remix as templates.

---

## 📦 Tech Stack

- **React + TypeScript**
- **Vite** (or Webpack, if applicable)
- **SCSS Modules**
- **Zustand / Redux** (state management)
- **Groq API** – for real-time speech recognition
- **Fetch.ai** – for intelligent text generation
- **REST API** – backend integration for auth, boards, presentations

---

## 🧠 AI Models Used

### 🎙️ Groq Speech Model
Used to convert voice input into structured prompts for AI-based presentation generation. Extremely low latency and high accuracy.

### 🤖 Fetch.ai Agents
Autonomous agents simulate smart text generation, formatting ideas into presentable slide content across various themes and styles.

---

## 📁 Folder Structure

/src
/features → presentation generation, modals, collaboration
/pages → main routing pages (workspace, login, etc.)
/shared → common UI components and utilities
/app → global configs (routes, auth guards, themes)
/entities → domain models (presentation, board, user) 

Environment Variables
Create a .env file in the root with the following:

VITE_API_BASE_URL=https://your-backend-api.com
VITE_GROQ_API_KEY=your_groq_api_key
VITE_FETCH_AI_ENDPOINT=https://your-fetch-agent-endpoint.com

📤 Deployment
This app is deployed on Vultr, and can run on any static-compatible server (e.g., Nginx, Vercel, Netlify).

🛡 License
MIT – free to use, modify, and distribute.
