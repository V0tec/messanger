"use client";
import { addChannel } from "@/src/features/channels/channelsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/features/store";
import { Channel } from "@/src/features/channels/channelsSlice";
import { useEffect, useState } from "react";
import { openModal } from "@/src/features/modals/modalSlice";
import CreateChannelButton from "./ui/CreateChannelButton";
import { setActiveChannel } from "@/src/features/activeChannelSlice/activeChannelSlice";

interface InitialChannels {
  id: string;
  name: string;
  avatar?: string | null;
}

export default function ChannelPanel({
  initialChannels,
}: {
  initialChannels: InitialChannels[];
}) {
  const dispatch = useDispatch();
  const channels = useSelector((state: RootState) => state.channels);
  const activeChannel = useSelector((state: RootState) => state.activeChannel);

  const handleAdd = () => {
    dispatch(openModal());
  };

  const handleOpen = (ch: Channel) => {
    dispatch(setActiveChannel(ch));
  };

  useEffect(() => {
    if (channels.length === 0) {
      initialChannels.forEach((ch) => {
        dispatch(addChannel({ id: ch.id, name: ch.name }));
      });
    }
  }, [initialChannels, dispatch, channels.length]);

  return (
    <div className="flex flex-col justify-start items-center w-1/2 bg-brand-gray">
      <input placeholder="search" />
      <CreateChannelButton onClick={handleAdd}>
        Create Channel
      </CreateChannelButton>
      <ul className="flex flex-col  w-full">
        {channels.map((ch: Channel) => (
          <li onClick={() => handleOpen(ch)} className="w-full" key={ch.id}>
            {ch.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
