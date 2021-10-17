import React, { useEffect, useState } from "react";

import ChatMsg from "@mui-treasury/components/chatMsg/ChatMsg";
import { Container, makeStyles, Paper, Box } from "@material-ui/core";
import ChatSubmit from "./ChatSubmit";
import ChatHeader from "./ChatHeader";
import { useParams } from "react-router";
import { firestore } from "../../utils/firebase";
import { getLoginData } from "../../utils/localStorge";

import { getProductById } from "../../utils/ProductFuntion";

import ProductCard from "./../ProductCard";
import ChatDialog from "./ChatDialog";
const useStyle = makeStyles((theme) => ({
  //TODO : 高度問題
  chatWindow: {
    borderWidth: 1,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    Height: 1000,
  },
}));

function ChatRoom({ handleDrawerToggle, drawerWidth }) {
  //網址參數
  const { chatId } = useParams();
  //樣式
  const classes = useStyle();
  //訊息
  const [messages, setMessages] = useState([]);
  //取得現在登入者資料
  const currentUid = getLoginData().id;
  //firebase的路徑
  const ref = firestore.collection("chat").doc(chatId);
  //接收者的id
  const [reciverid, setReciverid] = useState("");
  const [loading, setLoading] = useState(true);
  //定義進來的第一個動作
  const initChat = () => {
    //切出使用者
    const users = [chatId.substring(0, 28), chatId.substring(28, 56)];
    //確認聊天室是否存在
    ref.get().then((docSnapshot) => {
      //不存在則創立聊天室
      if (!docSnapshot.exists) {
        ref.set({
          id: chatId,
          users,
        });
      }
    });
    const reciverid = users.filter((item) => item != currentUid)[0];
    console.log("對方的uid", reciverid);
    setReciverid(reciverid);
  };
  //取得訊息(現在只有五十個)
  //TODO: 載入過去訊息?
  const getMessage = () => {
    ref
      .collection("message")
      .orderBy("time")
      .limit(50)
      .onSnapshot((snapshot) => {
        const result = snapshot.docs.map((doc) => {
          const docid = doc.id;
          return { ...doc.data(), docid };
        });

        setMessages(result);
      });
  };

  useEffect(async () => {
    await initChat();
    await getMessage();
    setLoading(false);
  }, [chatId]);

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <Container>
      <ChatHeader
        reciverid={reciverid}
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        sx={{
          display: "flex",
          "& > :not(style)": {
            width: "100%",
            height: "60vh",
          },
        }}
      >
        <Paper className={classes.chatWindow}>
          <Container style={{ paddingTop: 5 }}>
            {messages.map((message) => {
              if (message?.type === "card")
                return <ChatDialog message={message}></ChatDialog>;
              else
                return (
                  <ChatMsg
                    key={message.docid}
                    side={currentUid === message.id ? "right" : "left"}
                    avatar={message.photoURL}
                    messages={[message.text]}
                  />
                );
            })}
          </Container>
        </Paper>
      </Box>
      <Paper>
        <ChatSubmit chatId={chatId} reciverid={reciverid} />
      </Paper>
    </Container>
  );
}

export default ChatRoom;

// return message?.type !== "card" ? (
//   <ChatMsg
//     key={message.docid}
//     side={currentUid === message.id ? "right" : "left"}
//     avatar={message.photoURL}
//     messages={message.text}
//   />
// ) : (
//   <ChatMsg
//     key={message.docid}
//     side={currentUid === message.id ? "right" : "left"}
//     avatar={message.photoURL}
//     messages={[<ProductCard snapshot={card}></ProductCard>]}
//   />
// );
