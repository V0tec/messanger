import { createSlice } from "@reduxjs/toolkit";
import { messageApi } from "./messagesApi";
import { newMessageApi } from "./newMessageApi";
import { deleteMessageApi } from "./deleteMessageApi";

export interface Message {
  id: string;
  text: string;
  author?: { login: string };
}

export interface MessageState {
  byChannelId: {
    [channelId: string]: Message[];
  };
}

const initialState: MessageState = {
  byChannelId: {},
};

const messageSlice = createSlice({
  name: "message",
  initialState: initialState,
  reducers: {
    addMessage: (
      state: MessageState,
      action: { payload: { channelId: string; message: Message } },
    ) => {
      const { channelId, message } = action.payload;
      state.byChannelId[channelId] = [
        ...(state.byChannelId[channelId] || []),
        message,
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(messageApi.fulfilled, (state, action) => {
        const channelId = action.meta.arg;
        state.byChannelId[channelId] = action.payload.map((m: any) => ({
          id: m.id,
          text: m.content,
          author: m.author,
        }));
      })
      .addCase(newMessageApi.fulfilled, (state, action) => {
        const message = action.payload;
        const channelId = message.channelId;

        if (!state.byChannelId[channelId]) {
          state.byChannelId[channelId] = [];
        }

        state.byChannelId[channelId].push({
          id: message.id,
          text: message.content,
          author: message.author,
        });
      })
      .addCase(deleteMessageApi.fulfilled, (state, action) => {
        const { channelId, messageId } = action.meta.arg;
        state.byChannelId[channelId] = state.byChannelId[channelId].filter(
          (m) => m.id !== messageId,
        );
      });
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
