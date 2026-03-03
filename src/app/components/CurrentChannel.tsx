"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { addMessage } from "@/src/features/messages/messagesSlice";
import { useEffect, useState } from "react";
import { channelApi } from "@/src/features/channels/channelApi";
import { useAppDispatch } from "@/src/shared/useAppDispatch";
import { newMessageApi } from "@/src/features/messages/newMessageApi";
import { messageApi } from "@/src/features/messages/messagesApi";
import ContextMessageMenu from "./ui/ContextMessageMenu";

interface initialMessages {
  content: string;
  channelId: string;
}

export default function CurrentChannel({
  initialMessages,
}: {
  initialMessages?: initialMessages;
}) {
  const dispatch = useAppDispatch();
  const activeChannel = useSelector((state: RootState) => state.activeChannel);
  const [text, setText] = useState("");
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [isContextOpen, setContextOpen] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null,
  );
  const allMessages = useSelector(
    (state: RootState) => state.message.byChannelId,
  );
  const currentMessages = activeChannel
    ? allMessages[activeChannel.id] || []
    : [];

  useEffect(() => {
    dispatch(channelApi());
  }, [dispatch]);

  function handleSendMessage() {
    if (text.trim() && activeChannel) {
      dispatch(newMessageApi({ channelId: activeChannel.id, text: text }));

      setText("");
    }
  }

  useEffect(() => {
    if (activeChannel?.id) {
      console.log("ЗАПИТ ПОВІДОМЛЕНЬ ДЛЯ:", activeChannel.id);
      dispatch(messageApi(activeChannel.id));
    }
  }, [activeChannel?.id, dispatch]);

  useEffect(() => {
    const handleContextClose = () => setContextOpen(false);
    window.addEventListener("click", handleContextClose);
    return () => window.removeEventListener("click", handleContextClose);
  }, []);

  if (activeChannel) {
    return (
      <div className="flex flex-col justify-between w-full h-screen">
        <header className="flex justify-between items-center w-full bg-brand-gray p-2">
          <img
            className="w-10 h-10 rounded-full"
            src={activeChannel.avatar || ""}
            alt=""
          />
          <h1>{activeChannel.name}</h1>
          <div>
            <button>...</button>
          </div>
        </header>
        <ul className="flex flex-col justify-end flex-1 overflow-y-auto">
          {currentMessages.map((msg) => (
            <li
              className="max-w-[70%] w-fit p-3 bg-black rounded-lg"
              key={msg.id}
              onContextMenu={(e) => {
                e.preventDefault();
                setAnchorPoint({ x: e.clientX, y: e.clientY });
                setContextOpen(true);
                setSelectedMessageId(msg.id);
              }}
            >
              <p className="text-brand-yellow">{msg.author?.login}</p>
              {msg.text}
            </li>
          ))}
        </ul>
        <div className="flex flex-row w-full">
          <textarea
            className="flex-1 p-2 bg-brand-gray outline-none resize-none shrink-0"
            placeholder="Message..."
            name=""
            id=""
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          ></textarea>
          <button onClick={handleSendMessage}>Send</button>
        </div>
        {isContextOpen && (
          <ContextMessageMenu
            anchorPoint={anchorPoint}
            data={{ channelId: activeChannel.id, messageId: selectedMessageId }}
          />
        )}
      </div>
    );
  } else {
    return (
      <div className="w-max">
        <p>choose channel</p>
      </div>
    );
  }
}
