import Meeting from "../models/meeting.model.js";
import User from "../models/user.model.js";

export const getMeetings = async (req, res) => {
    const { id } = req.params;
    console.log("👉 getMeetings hit, ID:", id);

    try {
        const meetings = await Meeting.find({ hostId: id });
        console.log("👉 Meetings found:", meetings.length);

        if (meetings.length === 0) {
        return res.status(200).json(meetings);
        }

        res.status(200).json(meetings);
    } catch (error) {
        console.log("❌ Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
    };
export const getMeetingInformation = async (req, res) => {
    const { id: meetingId } = req.params;
    try {
        const meeting = await Meeting.findById(meetingId)

        if (!meeting) {
            return res.status(404).json({ error: "Meeting not found" });
        }

        res.status(200).json(meeting);
    } catch (error) {
        console.log("Error in getting meeting information controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}