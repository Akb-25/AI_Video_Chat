import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Calendar, FileText, ClipboardList, StickyNote } from "lucide-react";

const MeetingInfo = () => {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await axiosInstance.get(`/meetings/info/${id}`);
        setMeeting(res.data);
      } catch (err) {
        setError("Failed to load meeting details.");
      }
    };
    fetchMeeting();
  }, [id]);

  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!meeting) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen pt-20 px-6 max-w-4xl mx-auto">
      <div className="bg-base-300 rounded-xl p-6 space-y-4 shadow-lg">
        <h1 className="text-2xl font-bold">{meeting.meetingTitle || "Untitled Meeting"}</h1>
        <p className="text-zinc-500 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {new Date(meeting.meetingDate).toLocaleDateString("en-GB")}
        </p>

        <div className="mt-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5" /> Transcript
            </h2>
            <p className="text-zinc-400 mt-1 whitespace-pre-line">
              {meeting.meetingNotes?.meetingTranscript || "No transcript available."}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <StickyNote className="w-5 h-5" /> Summary
            </h2>
            <p className="text-zinc-400 mt-1 whitespace-pre-line">
              {meeting.meetingNotes?.meetingSummary || "No summary available."}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ClipboardList className="w-5 h-5" /> Action Items
            </h2>
            <p className="text-zinc-400 mt-1 whitespace-pre-line">
              {meeting.meetingNotes?.meetingActionItems || "No action items listed."}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5" /> Key Points
            </h2>
            <p className="text-zinc-400 mt-1 whitespace-pre-line">
              {meeting.meetingNotes?.meetingKeyPoints || "No key points available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingInfo;