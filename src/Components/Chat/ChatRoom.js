import React, { useState } from "react";

import ChatMsg from "@mui-treasury/components/chatMsg/ChatMsg";
import {
  AppBar,
  Container,
  Typography,
  Toolbar,
  Paper,
} from "@material-ui/core";
import ChatSubmit from "./ChatSubmit";

function ChatRoom({ roomId }) {
  const messages = [
    { avatar: "", message: "123" },
    { avatar: "", message: "123" },
    { avatar: "", message: "123" },
    { avatar: "", message: "123" },
    { avatar: "", message: "123" },
    { avatar: "", message: "123" },
  ];
  return (
    <div>
      <AppBar position="static" elevation={3}>
        <Toolbar>
          <Typography variant="h6" component="div">
            聊天室
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper>
        <Container style={{ paddingTop: 5 }}>
          {messages.map((message, index) => (
            <ChatMsg
              key={index}
              side={"right"}
              avatar={message.avatar}
              messages={[message.message]}
            />
          ))}
        </Container>
        <ChatSubmit roomId={roomId} />
      </Paper>
    </div>
  );
}

export default ChatRoom;

//商品卡片可以放入訊息
//要寫個東西去抓當下那個人的所有商品
//可以同商品頁面那個一起寫
// <ChatMsg
//   side={"right"}
//   messages={[
//     <ProductCard
//       pid={product.pid}
//       title={product.title}
//       county={product.county}
//       town={product.town}
//       rating={product.rating}
//       price={product.price}
//       discribe={product.discribe}
//       thumbnail={product.thumbnail}
//     />,
//   ]}
// />;
