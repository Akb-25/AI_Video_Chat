import mongoose from "mongoose";
import dotenv from "dotenv";
import Meeting from "../models/meeting.model.js";

dotenv.config();

await mongoose.connect("mongodb+srv://25bakshay2004:kkk92t1E9M2F2za5@cluster0.jllclz3.mongodb.net/VideoChatAI?retryWrites=true&w=majority&appName=Cluster0", {
});
console.log("MongoDB connected");


const newMeeting = await Meeting.create({
  hostId: "682f5fc5ab0779f8096f501e",
  meetingId: "M12345",
  meetingTitle: "Project Kickoff",
  meetingDate: new Date(),
  meetingNotes: {
    meetingTranscript: "Full transcript of the discussion...",
    meetingSummary: "We discussed the goals and assigned initial tasks.",
    meetingActionItems: "1. Create wireframes\n2. Setup repo\n3. Assign tasks",
    meetingKeyPoints: "Kickoff, roles, deadlines",
  },
});

console.log("New meeting added:", newMeeting);
await mongoose.disconnect();