import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { channelApi } from "./channelApi";
import { newChannelApi } from "./newChannelApi";

export interface Channel {
  id: string;
  name: string;
  avatar?: string | null;
}

const initialState: Channel[] = [];

const channelsSlice = createSlice({
  name: "channelsListSlice",
  initialState: initialState,
  reducers: {
    addChannel: (state, action: PayloadAction<Channel>) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelApi.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(newChannelApi.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export const { addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
