import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { getStreamToken } from "../lib/utils";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [tokenData, setTokenData] = useState(null);
  const { authUser } = useAuthStore();
  const [isRecording, setIsRecording] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStreamToken = async () => {
      try {
        if (!authUser) return;
        const res = await getStreamToken();
        setTokenData(res);
      } catch (err) {
        toast.error("Failed to fetch stream token");
      }
    };

    fetchStreamToken();
  }, [authUser]);

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData?.token || !authUser || !callId) return;

      try {
        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);

        await callInstance.join({ create: true });

        await callInstance.update({
          settings_override: {
            recording: {
              mode: "available",
              audio_only: true,
            },
          },
        });

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        toast.error("Could not join the call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [tokenData, authUser, callId]);

  const handleStartRecording = async () => {
    try {
      await call.startRecording();
      setIsRecording(true);
      toast.success("Recording started");
    } catch (error) {
      toast.error("Failed to start recording");
    }
  };

  const handleStopRecording = async () => {
    try {
      await call.stopRecording();
      setIsRecording(false);
      let meetingData = await call.queryRecordings();
      console.log("🎥 Recordings after stop:", meetingData);
      // if (recordings.length === 0) {
      //   console.log("No recordings found");
      //   return null;
      // }
      console.log("Sorting recordings");
      let recordings = meetingData.recordings
      let latestRecording = recordings[0];

      console.log("Latest recording:", latestRecording);
      toast.success("Recording stopped");
    } catch (error) {
      toast.error("Failed to stop recording");
    }
  };

  useEffect(() => {
  return () => {
    const stopRecordingOnExit = async () => {
      if (call && isRecording) {
        try {
          await call.stopRecording();
          console.log("Recording stopped on unmount");
        } catch (err) {
          console.error("Failed to stop recording:", err);
        }
      }
    };
    stopRecordingOnExit();
  };
}, [call, isRecording]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative w-full h-full">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent
                handleStartRecording={handleStartRecording}
                handleStopRecording={handleStopRecording}
                isRecording={isRecording}
              />
              {isRecording && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full">
                  Recording
                </div>
              )}
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CallContent = ({ handleStartRecording, handleStopRecording, isRecording }) => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) {
    navigate("/");
    return null;
  }

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
      {!isRecording && (
        <button
          onClick={handleStartRecording}
          className="absolute bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Start Recording
        </button>
      )}
      {isRecording && (
        <button
          onClick={handleStopRecording}
          className="absolute bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Stop Recording
        </button>
      )}
    </StreamTheme>
  );
};

export default CallPage;