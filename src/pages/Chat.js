import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ChatList from "../Components/Chat/ChatList";
import ChatRoom from "../Components/Chat/ChatRoom";
import { initChat, useGetChatList } from "../utils/ChatFunction";
import { auth } from "../utils/firebase";

export default function Chat() {
  const senderUid = "eiSSRYGon0b6ZHsDb6kGDAmQDCg1";
  const reciverUid = "tA6e4vPGXHOXYmFlf4VE5yJLCwt1";

  const [userList] = useGetChatList(senderUid);
  console.log(userList);

  const [roomID, setRoomID] = useState("");
  return (
    <div>
      <Grid container>
        <Grid item md={4} xs={12}>
          <ChatList userList={userList} setRoomID={setRoomID} />
        </Grid>
        <Grid item md={8} xs={12} style={{ height: "100vh" }}>
          <Container>
            <ChatRoom roomId={roomID} />
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
