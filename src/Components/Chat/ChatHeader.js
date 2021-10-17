import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { firestore } from "../../utils/firebase";
import { MenuOutlined } from "@material-ui/icons";
function ChatHeader({ reciverid, handleDrawerToggle, drawerWidth }) {
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
      <AppBar
        elevation={3}
        position="static"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuOutlined />
          </IconButton>
          <Typography variant="h6" component="div">
            {title ? title : "聊天室"}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ChatHeader;
