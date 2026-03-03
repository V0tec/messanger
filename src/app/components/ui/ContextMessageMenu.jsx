import { deleteMessageApi } from "@/src/features/messages/deleteMessageApi";
import { useAppDispatch } from "@/src/shared/useAppDispatch";

export default function ContextMessageMenu({ anchorPoint, data }) {
  const dispatch = useAppDispatch();

  function handleDeleteMessage(data) {
    dispatch(
      deleteMessageApi({
        channelId: data.channelId,
        messageId: data.messageId,
      }),
    );
  }

  return (
    <div
      className="absolute bg-brand-gray flex flex-col p-2 border-white gap-2 "
      style={{ top: anchorPoint.y, left: anchorPoint.x }}
    >
      <button className="border rounded-md p-1">give up</button>
      <button
        className="border rounded-md p-1"
        onClick={() => handleDeleteMessage(data)}
      >
        delete
      </button>
    </div>
  );
}
