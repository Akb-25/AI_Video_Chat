import mongoose from 'mongoose';
import { text } from 'express';

const meetingSchema = new mongoose.Schema({
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    meetingId: {
        type: String,
        required: true
    },
    meetingTitle: {
        type: String,
        required: false
    },
    meetingParticipants: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }],
        required: false
    },
    meetingDate: {
        type: Date,
        required: false
    },
    meetingDuration: {
        type: String,
        required: false
    },
    meetingTranscript: {
        type: String,
        required: false
    },
    meetingNotes: {
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