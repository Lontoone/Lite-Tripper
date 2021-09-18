import React from "react";

import ChatMsg from "@mui-treasury/components/chatMsg/ChatMsg";

function ChatRoom() {
  return (
    <div>
      <ChatMsg
        avatar={
          "https://firebasestorage.googleapis.com/v0/b/lite-tripper.appspot.com/o/ShopImg%2F1059.jpg?alt=media&token=1609a7cb-7819-49ab-a0ad-dafd8357c2cd"
        }
        messages={[
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.",
        ]}
      />
      <ChatMsg
        side={"right"}
        messages={["Of course I did. Speaking of which check this out"]}
      />
      <ChatMsg avatar={""} messages={["Im good.See u later."]} />
    </div>
  );
}

export default ChatRoom;
