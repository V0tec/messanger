"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/features/store";
import { useState } from "react";
import CreateChannelButton from "./ui/CreateChannelButton";
import { addChannel } from "@/src/features/channels/channelsSlice";
import { closeModal } from "@/src/features/modals/modalSlice";
import { createChannelAction } from "../actions";

export default function CreateChannelModal() {
  const [userName, setUserName] = useState("");
  const [channelName, setChannelName] = useState("");
  const modal = useSelector(
    (state: RootState) => state.modals.isCreateChannelOpen,
  );
  const channels = useSelector((state: RootState) => state.channels);
  const dispatch = useDispatch();

  if (!modal) return null;

  function handleSetUserName(e: React.ChangeEvent<HTMLInputElement>) {
    setUserName(e.target.value);
  }

  function handleSetChannelName(e: React.ChangeEvent<HTMLInputElement>) {
    setChannelName(e.target.value);
  }

  async function handleSaveChanges() {
    if (!channelName.trim()) return;
    const newChannel = await createChannelAction({ name: channelName });

    dispatch(addChannel({ id: newChannel.id, name: newChannel.name }));
    dispatch(closeModal());
  }

  return (
    <div className="fixed z-999 w-screen h-screen bg-brand-gray">
      <input
        placeholder="user name"
        value={userName}
        onChange={(e) => handleSetUserName(e)}
      />
      <input
        placeholder="name"
        value={channelName}
        onChange={(e) => handleSetChannelName(e)}
      />
      <CreateChannelButton onClick={handleSaveChanges}>
        Save Changes
      </CreateChannelButton>
    </div>
  );
}
