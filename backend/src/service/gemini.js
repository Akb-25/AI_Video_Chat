import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config({path:"../../.env"});

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: "Explain how AI works in a few words",
//   });
//   console.log(response.text);
// }

// await main();

function template(templateString, data) {
    let result = templateString;
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const regex = new RegExp(`{% for speaker in speakers %}(.*?)% endfor %`, "g");
            result = result.replace(regex, () => {
                let speakerString = "";
                if (Array.isArray(data[key])) {
                    data[key].forEach((speaker, index) => {
                        speakerString += `- ${speaker}${index < data[key].length - 1 ? '\\n' : ''}`;
                    });
                }
                return speakerString;
            });
        }
    }
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const regex = new RegExp(`{{ ${key} }}`, "g");
        result = result.replace(regex, data[key]);
      }
    }

    return result;
}


const promptTemplate = `Generate a transcript of the audio. Include timestamps and identify speakers.

Speakers are:
{% for speaker in speakers %}- {{ speaker }}{% if not loop.last %}\\n{% endif %}{% endfor %}

eg:
[00:00] Brady: Hello there.
[00:02] Tim: Hi Brady.

It is important to include the correct speaker names. Use the names you identified earlier. If you really don't know the speaker's name, identify them with a letter of the alphabet, eg there may be an unknown speaker 'A' and another unknown speaker 'B'.

If there is music or a short jingle playing, signify like so:
[01:02] [MUSIC] or [01:02] [JINGLE]

If you can identify the name of the music or jingle playing then use that instead, eg:
[01:02] [Firework by Katy Perry] or [01:02] [The Sofa Shop jingle]

If there is some other sound playing try to identify the sound, eg:
[01:02] [Bell ringing]

Each individual caption should be quite short, a few short sentences at most.

Signify the end of the episode with [END].

Don't use any markdown formatting, like bolding or italics.

Only use characters from the English alphabet, unless you genuinely believe foreign characters are correct.

It is important that you use the correct words and spell everything correctly. Use the context of the podcast to help.
If the hosts discuss something like a movie, book or celebrity, make sure the movie, book, or celebrity name is spelled correctly.`;

const speakers = ["John"];
const prompt = template(promptTemplate, { speakers: speakers });  // Use the simplified template function

// console.log(prompt);

async function runGeminiAnalysis() {
    
    const textPrompt = "Please summarize the conversation in this audio."; // Use a different name to avoid confusion with the templated 'prompt'

    const audioFilePath = 'C:/Users/win10/Desktop/Projects/AIVideoChat/backend/src/service/data/convo.mp3';

    console.log(`Attempting to use audio file from: ${audioFilePath}`);

    if (!fs.existsSync(audioFilePath)) {
        console.error(`Error: Audio file not found at path: ${audioFilePath}`);
        return; 
    }

    let audioFileResponse; 
    let response;
    try {
        console.log("Attempting to upload audio file...");
        audioFileResponse = await ai.files.upload({ 
            file: audioFilePath,
            config: {
                mimeType: 'audio/mp3'
            }
        });
        console.log("Audio file uploaded successfully to Files API.");
        console.log("Uploaded file details:", audioFileResponse); // Inspect this object

        if (!audioFileResponse || !audioFileResponse.uri) {
            console.error("Error: Uploaded audioFileResponse object does not contain a valid URI. Upload might have failed.");
            return;
        }

        
        const audioFilePart = {
            fileData: {
                mimeType: audioFileResponse.mimeType,
                file_uri: audioFileResponse.uri, 
            },
        };

        console.log("Calling generateContent with audio and prompt...");
        response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: [
                { text: textPrompt },
                audioFilePart,       
            ],
        });

        console.log("Gemini API response received.");
        console.log(response.text); 

    } catch (error) {
        console.error("An error occurred during Gemini API interaction:");
        console.error(error);
        if (error.response && error.response.data) {
            console.error("API Error Details:", JSON.stringify(error.response.data, null, 2));
        }
    }
    return response;
}

let response = await runGeminiAnalysis();

console.log("Gemini analysis completed.");
// const __filename = import.meta.url;
// const __dirname = path.dirname(new URL(__filename).pathname);


// const audioFilePath = path.resolve('C:\\Users\\win10\\Desktop\\Projects\\AIVideoChat\\backend\\src\\service\\data\\convo.mp3');
// const audioFile = await ai.files.upload({
//             file: audioFilePath,
//             config: {
//                 mimeType: 'audio/mp3' 
//             }
//         });

// let response = await ai.models.generateContent({
//   model: "gemini-2.0-flash",
//   contents: [prompt, audioFile],
// });

// console.log(response.text);

function timestampToSeconds(tsStr) {
  try {
    tsStr = tsStr.split('.')[0];

     parts = tsStr.split(':').map(Number);

    if (parts.length === 3) { 
      const [h, m, s] = parts;
      return h * 3600 + m * 60 + s;
    } else if (parts.length === 2) { 
      const [m, s] = parts;
      return m * 60 + s;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

function secondsToTimestamp(totalSeconds) {
  if (totalSeconds === null || totalSeconds < 0 || isNaN(totalSeconds)) {
    totalSeconds = 0; 
  }

  let hours = Math.floor(totalSeconds / 3600);
  let remainder = totalSeconds % 3600;
  let minutes = Math.floor(remainder / 60);
  let seconds = remainder % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}


function processTranscript(inputText, maxSegmentDuration) {
  let lines = inputText.trim().split('\n');
  let outputLines = [];

  let currentSegmentStartTsStr = null;
  let currentSegmentStartSeconds = null;
  let currentSpeaker = null;
  let currentTextParts = [];

  const lineRegex = new RegExp('^\\[(\\d{2}:)?\\d{2}:\\d{2}(\\.\\d+)?\\]\\s*([^:]+?):\\s*(.*)$');

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line === "") {
      continue;
    }
    let match = line.match(lineRegex);

    if (!match) {
      console.log("Line does not match regex: ", line);
      continue;
    }
    let [tsStr, speaker, text] = match;
    speaker = speaker.trim();
    text = text.trim();
    let currentSeconds = timestampToSeconds(tsStr);

    if (currentSeconds === null) {
      console.log(`Warning: Skipping line ${i + 1} due to invalid timestamp format: ${line}`);
      continue;
    }

    let startNewSegment = false;
    let reason = "";
    if (currentSpeaker === null) {
      startNewSegment = true;
      reason = "No active segment";
    } else if (speaker !== currentSpeaker) {
      startNewSegment = true;
      reason = `Speaker changed ('${speaker}' != '${currentSpeaker}')`;
    } else if (currentSegmentStartSeconds !== null && currentSeconds - currentSegmentStartSeconds > maxSegmentDuration) {
      startNewSegment = true;
      reason = `Time limit exceeded (${currentSeconds - currentSegmentStartSeconds}s > ${maxSegmentDuration}s)`;
    } else {
      reason = "Continuing segment";
    }

    if (startNewSegment) {
      if (currentSpeaker !== null) {
        let segmentText = currentTextParts.filter(part => part !== null).join(' ');
        outputLines.push(`[${currentSegmentStartTsStr}] ${currentSpeaker}: ${segmentText}`);
      }

      currentSegmentStartTsStr = secondsToTimestamp(currentSeconds);
      currentSegmentStartSeconds = currentSeconds;
      currentSpeaker = speaker;
      currentTextParts = [text];
    } else {
      if (text) {
        currentTextParts.push(text);
      }
    }
  }

  if (currentSpeaker !== null) {
    let segmentText = currentTextParts.filter(part => part !== null).join(' ');
    outputLines.push(`[${currentSegmentStartTsStr}] ${currentSpeaker}: ${segmentText}`);
  }
  return outputLines.join('\n');
}
console.log(response)
let processedTranscript = processTranscript(response.text, 30)
console.log("Processed Transcript: ", processedTranscript);
