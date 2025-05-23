import Meeting from '../models/meeting.model.js';
import { meetingTranscriptPrompt, meetingActionItemsPrompt, meetingKeyPointsPrompt, meetingSummaryPrompt, meetingTitlePrompt } from '../service/prompts.js';
import { getGeminiTranscript, getGeminiSummary, getGeminiActionItems, getGeminiKeyPoints, getGeminiTitle } from '../service/geminiURL.js';
export const uploadConversation = async (req, res) => {
    const { userId, videoURL } = req.body;
    console.log('👉 uploadConversation hit, User ID:', userId);
    console.log('👉 Video URL:', videoURL);
    
    let transcript, summary, actionItems, keyPoints, title;
    let TranscriptPrompt = meetingTranscriptPrompt(["Person 1","Person 2"]);
    let SummaryPrompt = meetingSummaryPrompt;
    let ActionItemsPrompt = meetingActionItemsPrompt;
    let KeyPointsPrompt = meetingKeyPointsPrompt;
    let TitlePrompt = meetingTitlePrompt;

    console.log("Transcript Prompt:", TranscriptPrompt);
    console.log("Summary Prompt:", SummaryPrompt);
    console.log("Action Items Prompt:", ActionItemsPrompt);
    console.log("Key Points Prompt:", KeyPointsPrompt);
    console.log("Title Prompt:", TitlePrompt);
    
    try{
        console.log("Get audio transcription from model");
        console.log("Prompt to be sent is: ", meetingTranscriptPrompt)
        transcript = await getGeminiTranscript(TranscriptPrompt, videoURL);
        summary = await getGeminiSummary(SummaryPrompt, transcript);
        actionItems = await getGeminiActionItems(ActionItemsPrompt, transcript);
        keyPoints = await getGeminiKeyPoints(KeyPointsPrompt, transcript);
        title = await getGeminiTitle(TitlePrompt, summary);
        console.log("Transcript:", transcript);
        console.log("Summary:", summary);
        console.log("Action Items:", actionItems);
        console.log("Key Points:", keyPoints);
        console.log("Title:", title);
        const meeting = new Meeting({
            hostId: userId,
            meetingTitle: title,
            meetingDate: new Date(),
            meetingNotes: {
                meetingTranscript: transcript,
                meetingSummary: summary,
                meetingActionItems: actionItems,
                meetingKeyPoints: keyPoints
            }
        });
        await meeting.save();
        console.log("New meeting added:", meeting);
        res.status(200).json({ message : "Meeting is successfully added for user"});
    }catch(error){
        console.log("❌ Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    };
};
