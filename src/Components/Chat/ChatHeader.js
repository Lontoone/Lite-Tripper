import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { firestore } from "../../utils/firebase";
function ChatHeader({ reciverid }) {
  const [title, setTitle] = useState("");
  useEffect(() => {
    firestore
      .collection("users")
      .doc(reciverid)
      .get()
      .then((result) => {
        setTitle(result.data()?.name);
      });
  }, []);
  return (
    <div>
      <AppBar position="static" elevation={3}>
        <Toolbar>
          <Typography variant="h6" component="div">
            {title ? title : "聊天室"}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ChatHeader;
