"use client";
import { useSelector } from "react-redux";
import ChannelPanel from "../../app/components/ChannelPanel";
import CreateChannelModal from "../../app/components/CreateChannelModal";
import CurrentChannel from "../../app/components/CurrentChannel";
import FrontPanel from "../../app/components/FrontPanel";
import { Channel } from "../channels/channelsSlice";
import { RootState } from "../store";
import { useEffect } from "react";
import { useAppDispatch } from "@/src/shared/useAppDispatch";
import { setUser } from "../auth/authSlice";

interface MainAppProps {
  initialChannels: Channel[];
}

export default function MainApp({ initialChannels }: MainAppProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch("/api/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) dispatch(setUser(data));
      });
  }, []);

  return (
    <div className="flex flex-row h-screen w-full overflow-hidden">
      <CreateChannelModal />
      <FrontPanel />
      <ChannelPanel initialChannels={initialChannels} />
      <CurrentChannel />
    </div>
  );
}
