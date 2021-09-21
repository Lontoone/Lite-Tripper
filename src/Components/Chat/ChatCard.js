import {
  Avatar,
  Card,
  CardHeader,
  Container,
  ListItem,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { firestore } from "../../utils/firebase";

function ChatCard({ uid, chatId }) {
  const History = useHistory();
  const [user, setUser] = useState({ photoURL: "", name: "" });
  const getUserData = () => {
    firestore
      .collection("users")
      .doc(uid)
      .get()
      .then((docSnapshot) => {
        const { photoURL, name } = docSnapshot.data();
        setUser({ photoURL, name });
      });
  };

  //TODO: 抓出未讀訊息 送出時把訊息標示為isRead:false，在initChat時把isRead設為true
  //const getUnReadMessage = () => {};
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <ListItem
        button
        divider
        onClick={() => {
          History.push("/Chat/" + chatId);
        }}
      >
        <Container>
          <Card elevation={0}>
            <CardHeader
              avatar={<Avatar src={user.photoURL} />}
              title={user.name}
              // subheader={message.timestamp?.toDate().toLocaleDateString()}
            />
          </Card>
        </Container>
      </ListItem>
    </div>
  );
}

export default ChatCard;
