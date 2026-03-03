import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "./channels/channelsSlice";
import modalsReducer from "./modals/modalSlice";
import activeChannelReducer from "./activeChannelSlice/activeChannelSlice";
import messageReducer from "./messages/messagesSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    channels: channelReducer,
    modals: modalsReducer,
    activeChannel: activeChannelReducer,
    message: messageReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
