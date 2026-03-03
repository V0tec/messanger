import { createAsyncThunk } from "@reduxjs/toolkit";

export const channelApi = createAsyncThunk("channels/fetchAll", async () => {
  const response = await fetch("/api/channels");
  return response.json();
});
