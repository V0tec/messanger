import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteMessageApi = createAsyncThunk(
  `messages/delete`,
  async (data: { channelId: string; messageId: string }) => {
    const response = await fetch(
      `/api/channels/${data.channelId}/messages/${data.messageId}`,
      { method: "DELETE", headers: { "Content-Type": "application/json" } },
    );

    return await response.json();
  },
);
