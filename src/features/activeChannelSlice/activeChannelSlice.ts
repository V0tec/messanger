import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ActiveChannel {
  id: string;
  name: string;
  avatar?: string | null;
}

export type ActiveChannelState = ActiveChannel | null;

const initialState = null as ActiveChannelState;

const activeChannelSlice = createSlice({
  name: "activeChannel",
  initialState: initialState,
  reducers: {
    setActiveChannel: (state, action: PayloadAction<ActiveChannel>) => {
      return action.payload;
    },
  },
});

export const { setActiveChannel } = activeChannelSlice.actions;
export default activeChannelSlice.reducer;
