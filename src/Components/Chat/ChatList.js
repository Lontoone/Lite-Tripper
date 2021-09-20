import {
  List,
  ListItem,
  CardHeader,
  Container,
  Card,
  Avatar,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  makeStyles,
} from "@material-ui/core";
import React from "react";

import { blue, green, pink, yellow } from "@material-ui/core/colors";
import ChatCard from "./ChatCard";

const useStyle = makeStyles((theme) => ({
  chatlistbar: {
    background: pink[300],
  },
  list: {
    [theme.breakpoints.down("sm")]: {
      borderWidth: 1,
      borderColor: blue[500],
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      position: "relative",
      overflow: "auto",
      maxHeight: 100,
    },

    borderWidth: 1,
    borderColor: blue[500],
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 500,
  },
}));

function ChatList({ setRoomID, userList }) {
  const classes = useStyle();

  // GetChatList(senderUid);
  const users = [
    {
      id: "12",
      uid: "123",
      name: "123",
      photoURL: "123",
      timestamp: "123",
      text: "123",
    },
    {
      id: "123",
      uid: "123",
      name: "123",
      photoURL: "123",
      timestamp: "123",
      text: "123",
    },
    {
      id: "1",
      uid: "123",
      name: "123",
      photoURL: "123",
      timestamp: "123",
      text: "123",
    },
  ];
  return (
    <Container>
      <AppBar position="static" className={classes.chatlistbar}>
        <Toolbar>
          <Typography variant="h6" component="div">
            聊天室
          </Typography>
        </Toolbar>
      </AppBar>
      <List className={classes.list}>
        {userList.map((uid) => (
          <ChatCard uid={uid} />
        ))}
      </List>
    </Container>
  );
}

export default ChatList;