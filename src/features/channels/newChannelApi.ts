import { createAsyncThunk } from "@reduxjs/toolkit";

export const newChannelApi = createAsyncThunk(
  "channel/create",
  async (newChannel) => {
    const response = await fetch("/api/channels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newChannel),
    });

    return await response.json();
  },
);
