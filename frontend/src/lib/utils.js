import { axiosInstance } from "./axios";

export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/messages/token");
  return response.data;
}