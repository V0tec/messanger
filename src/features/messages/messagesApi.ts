import { createAsyncThunk } from "@reduxjs/toolkit";

export const messageApi = createAsyncThunk(
  "messages/fetchAll",
  async (channelId: string) => {
    const response = await fetch(`/api/channels/${channelId}/messages`);
    return response.json();
  },
);
