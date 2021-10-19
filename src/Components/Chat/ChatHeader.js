import React, { useEffect, useState } from "react";
import {
  AppBar,
  makeStyles,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { firestore } from "../../utils/firebase";
import { MenuOutlined } from "@material-ui/icons";

const useStyle = makeStyles((theme) => ({
  Listbutton: {
    [theme.breakpoints.up("sm")]: {
      display: "None",
    },
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
}));
function ChatHeader({ reciverid, handleDrawerToggle, drawerWidth }) {
  const classes = useStyle(); 
  
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
            className={classes.Listbutton}
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
