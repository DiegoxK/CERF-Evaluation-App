
# AI Language Evaluator: Instant CEFR Feedback

**AI Language Evaluator** is a full-stack web application designed to provide language learners with instant, detailed, and actionable feedback on their English writing. By leveraging a powerful Large Language Model, it acts as an on-demand AI tutor, analyzing text against the **Common European Framework of Reference for Languages (CEFR)** to help users improve their skills effectively.

This project was built from the ground up to showcase a modern, secure, and highly interactive web application that solves a real-world problem for language learners. It demonstrates advanced concepts like real-time data streaming, multi-layered API security, and complex state management.

<div>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel AI SDK"/>
  <img src="https://img.shields.io/badge/Google_Gemini-8E44AD?style=for-the-badge&logo=google-gemini&logoColor=white" alt="Google Gemini"/>
  <img src="https://img.shields.io/badge/Zod-3E67B7?style=for-the-badge&logo=zod&logoColor=white" alt="Zod"/>
  <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui"/>
  <img src="https://img.shields.io/badge/Zustand-553a1a?style=for-the-badge" alt="Zustand"/>
  <img src="https://img.shields.io/badge/Upstash-000000?style=for-the-badge&logo=upstash&logoColor=white" alt="Upstash"/>
</div>

<br/>

<img width="1360" height="768" alt="{59A07E3B-DD61-4B32-A0B6-F1C6F8A6C51E}" src="https://github.com/user-attachments/assets/4f4542fc-c60a-4f0d-88a7-116b42ff7161" />
<img width="1360" height="768" alt="{988DBFCB-FB15-4CAC-9C77-3A5373CBA030}" src="https://github.com/user-attachments/assets/ba6e9498-781d-47fa-92cb-2c524fc15f14" />
<img width="1360" height="768" alt="{EBBB7041-13C2-43F5-8A78-8DCE6685D9FB}" src="https://github.com/user-attachments/assets/92f13021-13d9-412d-8416-366a86eb018a" />

---

## ✨ Live Demo

**[Try the application live](https://cerf-evaluation.vercel.app/)**

---

## 🚀 Key Features

### For Language Learners
*   **Instant AI Evaluation:** Submit English text for a writing task and receive a comprehensive analysis in seconds.
*   **Detailed CEFR Report:** Get an overall CEFR level (A1-C2), positive highlights, and a full feedback report.
*   **Category Breakdown:** See your performance rated across **Grammar, Vocabulary, Fluency, and Cohesion**.
*   **Interactive Highlighting:** Errors and suggestions are highlighted directly in your text. Hover for detailed explanations and corrections.
*   **Persistent History:** All your past evaluations are saved to your browser's `localStorage`, allowing you to track your progress over time.
*   **Task-Based Practice:** Choose from a variety of writing prompts to keep your practice sessions focused and contextual.

### Security & Performance
*   **Real-Time Streaming:** The AI's response is streamed to the UI, providing a fast, responsive experience without long loading spinners.
*   **Multi-Layered API Security:** The evaluation endpoint is protected against abuse and bots to control costs and ensure availability.
    *   **Bot Protection:** Integrates **BotID** to block automated scripts before they can make a request.
    *   **Rate Limiting:** Uses **Upstash Redis** to limit the number of requests per user, preventing spam.
    *   **Developer Bypass:** A secret key allows for unlimited testing during development.

---

## 🛠️ Technologies & Architecture

This project is built with a modern, type-safe stack using the Next.js App Router.

*   **Framework:** **Next.js 15** (App Router)
*   **Language:** **TypeScript**
*   **AI & Streaming:** **Vercel AI SDK** (`experimental_useObject`) to stream structured JSON from the AI model directly to the UI.
*   **LLM Provider:** **OpenRouter** (utilizing the `google/gemini-flash-2.0` model).
*   **Styling:** **Tailwind CSS** with **shadcn/ui** for primitive components.
*   **State Management:** **Zustand** with `persist` middleware for both core app state and user settings.
*   **Schema Validation:** **Zod** to enforce the structure of the AI's output and validate API requests.
*   **Deployment:** **Vercel**

### Architectural Highlights

*   **Structured JSON Streaming:** The application's core innovation is its ability to stream a complex, structured JSON object from the AI in real-time. By pairing the Vercel AI SDK with a Zod schema, the app ensures the AI's output is always valid and type-safe from the server to the client, enabling a dynamic and reliable UI.
*   **Decoupled & Persistent State:** State is managed with two separate Zustand stores—one for the app's ephemeral state and another for persistent user settings. This clean separation simplifies complex features, which seamlessly passes state between components without prop drilling.
*   **Robust API Security:** All critical operations are handled on the server. The evaluation endpoint is heavily fortified with multiple layers of security to prevent automated abuse, a critical feature for an application that relies on a pay-per-use AI service.
*   **Responsive and Accessible UI:** The interface is built with Tailwind CSS and shadcn/ui, ensuring it is fully responsive and accessible across all devices.

---

## 📦 Installation & Getting Started

### Prerequisites
*   Node.js (v22.x or higher)
*   pnpm (or your preferred package manager)
*   An Upstash Redis database (for rate limiting)
*   An OpenRouter API key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/DiegoxK/CERF-Evaluation-App.git
    cd CERF-Evaluation-App
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the project root by copying the example file:
    ```bash
    cp .env.example .env
    ```
    Open `.env` and fill in all the required values (Upstash, OpenRouter, etc.).

4.  **Run the development server:**
    ```bash
    pnpm run dev
    ```

The application will be available at `http://localhost:3000`.

---

## 🔑 Environment Variables

To run this project, you need to configure the following variables in your `.env` file:

```env
# OpenRouter API Key for AI model access
OPENROUTER_API_KEY=""

# Upstash Redis credentials for rate limiting
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""

# A secret key to bypass rate limiting and bot protection during development
INTERNAL_API_SECRET=""
```

---

## 📬 Author

**Diego Suarez** - [SynthCode](https://www.synthcode.net/en/about)

*   **Email:** [diego.synthcode@gmail.com](mailto:diego.synthcode@gmail.com)
