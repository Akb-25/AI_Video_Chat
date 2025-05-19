# AI-Powered Video Collaboration Platform

A real-time collaborative video and text chat platform with AI-powered transcription, summarization, agenda planning, and task tracking. Built with **MongoDB, Express, React, Node.js**, and integrated with **Google Gemini API** and **Stream SDK** for seamless communication and productivity during virtual meetings.

---

## Features

- **Real-time Video & Chat**: Built using **Stream SDK** and **Socket.IO** for low-latency, peer-to-peer communication.
- **Meeting Agenda**: Set and track agenda items live during the meeting.
- **AI Transcription & Summarization**: Uses **Google Gemini API** to transcribe meeting conversations and auto-generate summaries with actionable items.
- **Task Assignment**: Assign tasks live during the meeting and track their status in real time.
- **Interactive Dashboard**: View meeting summaries, action items, and update task statuses post-meeting.

---

## Tech Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| Frontend   | React.js, Stream SDK          |
| Backend    | Node.js, Express.js           |
| Database   | MongoDB                       |
| Realtime   | Socket.IO                     |
| AI Engine  | Google Gemini API             |

---

## 🔑 Environment Setup

Create a `.env` file in the root directory:
```bash
GEMINI_API_KEY=your_google_gemini_key
MONGO_URI=your_mongodb_connection
STREAM_API_KEY=your_stream_api_key
```
Client
```bash
cd client
npm install
npm start
```
Backend
```bash
cd server
npm install
node index.js
```


