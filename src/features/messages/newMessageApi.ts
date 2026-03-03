import { createAsyncThunk } from "@reduxjs/toolkit";

export const newMessageApi = createAsyncThunk(
  "messages/create",
  async (data: { channelId: string; text: string }) => {
    const response = await fetch(`/api/channels/${data.channelId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: data.text }),
    });

    return await response.json();
  },
);
