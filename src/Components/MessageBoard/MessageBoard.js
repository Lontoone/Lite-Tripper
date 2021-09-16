import {
  List,
  ListItem,
  Avatar,
  Container,
  Typography,
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
//react
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
//firebase
import { firestore, auth } from "../../utils/firebase";

//page
import MessageSubmit from "./MessageSubmit";

function MessageBoard({ uid }) {
  //授權hook
  const [user, authLoading, error] = useAuthState(auth);
  History = useHistory();
  const [messages, setMessages] = useState([]);
  const ref = firestore
    .collection("profileComment")
    .doc(uid)
    .collection("comment");
  const getMessage = () => {
    ref
      .orderBy("timestamp")
      .get()
      .then((docSnapshot) => {
        const comments = docSnapshot.docs.map((doc) => doc.data());
        setMessages(comments);
      });
  };
  const handleDelete = (id) => {
    let result = window.confirm("確定刪除?");
    if (result) {
      ref
        .doc(id)
        .delete()
        .then(() => {
          getMessage();
        });
    } else {
      return;
    }
  };
  useEffect(() => {
    getMessage();
  }, [uid]);

  if (authLoading) {
    return <div>loading</div>;
  }
  return (
    <div>
      <List>
        {messages.length == "0" && (
          <ListItem divider button>
            <Container>
              <Card elevation={0}>
                <Typography variant="h6">
                  還沒有人留下對這個人的評論喔!
                </Typography>
              </Card>
            </Container>
          </ListItem>
        )}
        {messages.map((message) => (
          <ListItem button divider key={message.id}>
            <Container>
              <Card elevation={0}>
                {message.uid === user?.uid ? (
                  <CardHeader
                    avatar={
                      <div
                        onClick={() => {
                          History.push(/profile/ + message.uid);
                        }}
                      >
                        <Avatar src={message.photoURL} />
                      </div>
                    }
                    action={
                      <IconButton onClick={() => handleDelete(message.id)}>
                        <DeleteOutlined />
                      </IconButton>
                    }
                    title={message.name}
                    subheader={message.timestamp?.toDate().toLocaleDateString()}
                  />
                ) : (
                  <CardHeader
                    avatar={
                      <div
                        onClick={() => {
                          History.push(/profile/ + message.uid);
                        }}
                      >
                        <Avatar src={message.photoURL} />
                      </div>
                    }
                    title={message.name}
                    subheader={message.timestamp?.toDate().toLocaleDateString()}
                  />
                )}

                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    {message.text}
                  </Typography>
                </CardContent>
              </Card>
            </Container>
          </ListItem>
        ))}
        <ListItem divider>
          <MessageSubmit getMessage={getMessage} uid={uid} />
        </ListItem>
      </List>
    </div>
  );
}

export default MessageBoard;
