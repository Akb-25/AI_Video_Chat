import mongoose from 'mongoose';
import { text } from 'express';

const meetingSchema = new mongoose.Schema({
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // meetingId: {
    //     type: String,
    //     required: true
    // },
    meetingTitle: {
        type: String,
        required: false
    },
    meetingDate: {
        type: Date,
        required: false
    },
    meetingNotes: {
        meetingTranscript: {
        type: String,
        required: false
        },
        meetingSummary: {
            type: String,
            required: false
        },
        meetingActionItems: {
            type: String,
            required: false
        },
        meetingKeyPoints: {
            type: String,
            required: false
        },
    }
})

const Meeting = mongoose.model("Meeting", meetingSchema);
export default Meeting;