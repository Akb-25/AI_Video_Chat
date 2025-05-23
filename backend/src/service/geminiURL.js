import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import fetch from "node-fetch"; 

dotenv.config({ path: "../../.env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getGeminiTranscript = async (prompt, audioURL) => {
  const audioBuffer = await fetch(audioURL).then((res) => res.arrayBuffer());
  console.log("Audio buffer length:", audioBuffer.byteLength);
  console.log("Audio buffer type:", typeof audioBuffer);
  const base64Audio = Buffer.from(audioBuffer).toString("base64");

  const audioPart = {
    inlineData: {
      mimeType: "audio/mp3",
      data: base64Audio,
    },
  };

  const result = await model.generateContent({
    contents: [
      { role: "user", parts: [
        { text: prompt },
        audioPart
      ] },
    ],
  });

  const response = await result.response;
  console.log(response.text());
  return response.text();
}

export const getGeminiSummary = async (prompt, transcript) => {
  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          { text: `${prompt}\n\nTranscript:\n${transcript}` }
        ],
      },
    ],
  });

  const response = await result.response;
  const text = await response.text();
  console.log(text);
  return text;
};

export const getGeminiActionItems = async (prompt, transcript) => {
  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          { text: `${prompt}\n\nTranscript:\n${transcript}` }
        ],
      },
    ],
  });

  const response = await result.response;
  const text = await response.text();
  console.log(text);
  return text;
};
export const getGeminiKeyPoints = async (prompt, transcript) => {
  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          { text: `${prompt}\n\nTranscript:\n${transcript}` }
        ],
      },
    ],
  });

  const response = await result.response;
  const text = await response.text();
  console.log(text);
  return text;
}

export const getGeminiTitle = async (prompt, transcript) => {
  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          { text: `${prompt}\n\nTranscript:\n${transcript}` }
        ],
      },
    ],
  });

  const response = await result.response;
  const text = await response.text();
  console.log(text);
  return text;
};

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// const audioUrl = "https://ohio.stream-io-cdn.com/1385529/video/recordings/default_682f18ccb50cd0eb81ec09c9-682f1902b50cd0eb81ec09e1/rec_default_682f18ccb50cd0eb81ec09c9-682f1902b50cd0eb81ec09e1_audio_1747924134124.mp3?Expires=1749134123&Signature=S9JdAf8lLeFdhXKJ88QyoJg8zrXaifdWiJ36YcrekRgpwriI9qSUuftJTSwDl3vCZBdUtEQ3JzgiFNMbPNDsUfmpbGOwglMHMCY9SBY26rJiiCd~1YwK-ZOev5wT6p91BRl5f8~wrTYgauK3-XqMqHJ-AYWBkpqpFGe06BelBRnehSbfBKns6N7Ued6ivyabY9SJVtAGZSpbKnqQXUzjsM~ZITggKzIwBW5aYL3XHckzhnPwshklPI3ysq2zbIVy~R0JxIh9i4tynjH6z2Fd35rS~D5vZWfI-D2h09BDkpuqC7XMopaXl1H~kTQoMZi8n~cfYHb9IHKpEj239IFlNA__&Key-Pair-Id=APKAIHG36VEWPDULE23Q";

// const audioBuffer = await fetch(audioUrl).then((res) => res.arrayBuffer());

// const base64Audio = Buffer.from(audioBuffer).toString("base64");

// const audioPart = {
//   inlineData: {
//     mimeType: "audio/mp3",
//     data: base64Audio,
//   },
// };

// const result = await model.generateContent({
//   contents: [
//     { role: "user", parts: [
//       { text: "Summarize the audio in a short paragraph." },
//       audioPart
//     ] },
//   ],
// });

// const response = await result.response;
// console.log(response.text());