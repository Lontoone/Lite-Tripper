import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
function ChatHeader({ title }) {
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
