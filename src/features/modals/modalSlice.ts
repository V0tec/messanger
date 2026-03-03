import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isCreateChannelOpen: boolean;
}

const initialState: ModalState = {
  isCreateChannelOpen: false,
};

const modalSlice = createSlice({
  name: "createChannelModal",
  initialState: initialState,
  reducers: {
    openModal: (state) => {
      state.isCreateChannelOpen = true;
    },
    closeModal: (state) => {
      state.isCreateChannelOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
