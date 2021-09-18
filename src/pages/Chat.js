import React, { useEffect, useState } from "react";
import ChatRoom from "../Components/Chat/ChatRoom";
import { initChat, GetChatList } from "../utils/ChatFunction";

export default function Chat() {
  const senderUid = "eiSSRYGon0b6ZHsDb6kGDAmQDCg1";
  const reciverUid = "tA6e4vPGXHOXYmFlf4VE5yJLCwt1";
  useEffect(() => {
    initChat(senderUid, reciverUid);
    GetChatList(senderUid);
  }, []);
  return (
    <div>
      <ChatRoom />
    </div>
  );
}
