import React from "react";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  IconButton,
  InputBase,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";

import { auth } from "../utils/firebase";
import ChatIcon from "@material-ui/icons/Chat";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import webTheme from "../Hooks/WebTheme";
import { useAuthState } from "react-firebase-hooks/auth";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router";

function Header() {
  const classes = webTheme();
  //授權hook
  const [user, authLoading, error] = useAuthState(auth);
  const history = useHistory();
  if (authLoading) {
    return <div></div>;
  }
  return (
    <AppBar>
      <Toolbar className={classes.header__container}>
        {/* LOGO 圖片 */}
        <img
          className={classes.header__logo}
          onClick={() => {
            history.push("/");
          }}
          src="/liteTripper_logo.png" 
        ></img>

        {/* 搜尋 */}
        <Paper component="form" className={classes.header__search}>
          <InputBase
            className={classes.header__searchInput}
            placeholder="Search"
            type="text"
            fullWidth
          ></InputBase>
          <IconButton
            type="submit"
            variant="contained"
            className={classes.header__searchIcon}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        {/* 功能組 */}
        <div className={classes.header__nav}>
          {/* 聊天室 */}
          <IconButton
            onClick={() => {
              history.push("/chat");
            }}
          >
            <ChatIcon />
          </IconButton>

          {/* 購物車 */}
          <IconButton>
            <LocalMallIcon />
          </IconButton>
          {/* 用戶頭相 */}
          <IconButton
            onClick={() => {
              history.push("/profile/" + user?.uid);
            }}
            edge="end"
          >
            <Avatar src={user?.photoURL}></Avatar>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
