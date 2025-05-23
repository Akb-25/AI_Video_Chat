# AI-Powered Video Collaboration Platform

A real-time collaborative video and text chat platform with AI-powered transcription, summarization, agenda planning, and task tracking. Built with **MongoDB, Express, React, Node.js**, and integrated with **Google Gemini API** and **Stream SDK** for seamless communication and productivity during virtual meetings.

---

## Features

- **Real-time Video & Chat**: Built using **Stream SDK** and **Socket.IO** for low-latency, peer-to-peer communication.
- **AI Transcription & Summarization**: Uses **Google Gemini API** to transcribe meeting conversations and auto-generate summaries with actionable items and key points.
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
| Object Storage | Cloudinary                |

---

## Environment Setup

Backend

Create a `.env` file in the backend directory:
```bash
PORT = 
MONGODB_PASSWORD = 
MONGO_URI = 

JWT_SECRET =
NODE_ENV = 

CLOUDINARY_ACCOUNT = 
CLOUDINARY_API_KEY = 
CLOUDINARY_SECRET = 

STEAM_API_KEY = 
STEAM_API_SECRET = 

GEMINI_API_KEY = 
```

```bash
cd backend
npm install
node index.js
```

Frontend


Create a `.env` file in frontend directory:
```bash
VITE_STREAM_API_KEY =
``` 

```bash
cd frontend
npm install
npm run dev
```
## Screenshots

<img width="960" alt="signup" src="https://github.com/user-attachments/assets/adbeef93-5641-46c6-9a16-2a711933a683" />
<img width="960" alt="login" src="https://github.com/user-attachments/assets/a0180b79-1be2-4283-b035-85107e2a3443" />
<img width="960" alt="home" src="https://github.com/user-attachments/assets/924f8385-5662-4467-82d1-84b31edcfbed" />
<img width="960" alt="text" src="https://github.com/user-attachments/assets/a4dea35a-5729-4bc1-aaf9-fd2fbbadb96e" />
<img width="960" alt="call" src="https://github.com/user-attachments/assets/c0fbfbae-2032-427e-996c-2a6513553cdd" />
<img width="960" alt="meetings" src="https://github.com/user-attachments/assets/3ae69595-6606-4b94-925a-50a73a3f17d1" />
<img width="960" alt="summary" src="https://github.com/user-attachments/assets/2f82b1f5-c3de-41d2-84a3-7ca05ed0ff73" />
<img width="960" alt="action" src="https://github.com/user-attachments/assets/283d061e-e365-4812-8a8c-139bde459d92" />





