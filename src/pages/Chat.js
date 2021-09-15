import React, { useEffect, useState } from "react";
import ChatRoom from "../Components/ChatRoom";
import { firestore } from "../utils/firebase";

export default function Chat() {
  return (
    <div>
      <ChatRoom />
    </div>
  );
}
