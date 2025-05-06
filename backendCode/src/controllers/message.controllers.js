import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await UserActivation.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error){
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Interval server error" });
    }
};

export const getMessages = async (req, res) => {
    try{
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        
        const messages = await Message.find({
            $or:[
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getting messages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const sendMessage = async (req, res) => {
    try{

        const { text, image } = req.body;
        // const {receiverId} = req.params;
        const receiverId = "67f7f1fafeeab79dba5f0e86";
        // const senderId = req.user._id;
        const senderId = "67f7f36f662d09dc4183f5db";

        let imageUrl = "";
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
                senderId,
                receiverId,
                text,
                image: imageUrl
            });
        await newMessage.save();

        res.status(200).json(newMessage);
        
    } catch (error){
        console.log("Error in sending messages controller: ", error.message);
        res.status(500).json({ error:"Internal service given the error"});
    }
}