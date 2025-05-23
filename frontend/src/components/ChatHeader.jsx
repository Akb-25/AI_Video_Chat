import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import CallButton from "../components/CallButton";
import { VideoIcon} from "lucide-react";
import toast from "react-hot-toast";
const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const {sendMessage} = useChatStore();
  const { authUser } = useAuthStore();

  const handleVideoCall = async () => {
    if (!authUser || !selectedUser) return;
    console.log(authUser._id);
    console.log(selectedUser._id);
    const callId = [authUser._id, selectedUser._id].sort().join("-");
    const callUrl = `${window.location.origin}/call/${callId}`;

    try {
      await sendMessage({
        text: `Join my video call here ${callUrl}`
      });

      toast.success("Video call link sent!");
    } catch (error) {
      console.error("Failed to send video call link:", error);
      toast.error("Failed to send video call link");
    }
  };


  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

       
        
      {/* <CallButton handleVideoCall={handleVideoCall} /> */}
        {/* <CallButton handleVideoCall={handleVideoCall} /> */}
        {/* <button onClick={() => setSelectedUser(null)}> */}
          {/* <X /> */}
        {/* </button> */}
        <button onClick={handleVideoCall} className="btn btn-success btn-sm text-white">
              <VideoIcon className="size-6" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
