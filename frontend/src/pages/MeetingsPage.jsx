import { useEffect, useState } from "react";
import { Calendar, Users, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";

const MeetingsPage = () => {
  const { authUser } = useAuthStore();
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMeetings = async () => {
      try{
        // const res = await axiosInstance.get(`/meetings/${authUser._id}`);
        const res = await axiosInstance.get(`/meetings/${authUser._id}`);
        
        console.log(authUser._id);
        console.log(res.data);

        setMeetings(res.data);
        // if (res.status != 200 || res.status != 201 || res.status != 204 ) {
        //   throw new Error("Failed to load meetings");
        // }
          // const data = await res.json();
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMeetings();
  }, [authUser._id]);

  return (
    <div className="h-screen pt-20">
      <div className="max-w-4xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">My Meetings</h1>
            <p className="mt-2 text-sm text-zinc-400">List of meetings you attended or hosted</p>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          {meetings.length === 0 ? (
            <p className="text-center text-zinc-500">No meetings found</p>
          ) : (
            <div className="space-y-4">
              {meetings.map((meeting) => (
                <div
                  key={meeting._id}
                  onClick={() => navigate(`/meetings/info/${meeting._id}`)}
                  className="cursor-pointer bg-base-200 border border-base-content/10 p-4 rounded-xl hover:shadow-lg transition"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div>
                      <h2 className="text-lg font-semibold">{meeting.meetingTitle || "Untitled Meeting"}</h2>
                      <p className="text-sm text-zinc-400 mt-1 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />{" "}
                        {new Date(meeting.meetingDate).toLocaleDateString("en-GB")}
                      </p>
                    </div>

                    {/* <div className="text-sm space-y-1 sm:text-right">
                      <p className="flex items-center gap-1 justify-end text-zinc-400">
                        <User className="w-4 h-4" />
                        Host: {meeting?.hostId?.name || "Unknown"}
                      </p>
                      <p className="flex items-center gap-1 justify-end text-zinc-400">
                        <Users className="w-4 h-4" />
                        Participants: {meeting.meetingParticipants?.length || 0}
                      </p>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingsPage;