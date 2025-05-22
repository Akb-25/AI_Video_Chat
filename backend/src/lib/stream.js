import { StreamChat } from "stream-chat";
import dotenv from "dotenv";

dotenv.config({ path:"../.env"})
const apiKey = process.env.STEAM_API_KEY;
const apiSecret = process.env.STEAM_API_SECRET;

console.log("Stream API Key:", apiKey);
console.log("Stream API Secret:", apiSecret);

if (!apiKey || !apiSecret) {
  console.error("Stream API key or Secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);


export const generateStreamToken = (userId) => {
  try {
    console.log("Generating Stream token for user:", userId);
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
};
