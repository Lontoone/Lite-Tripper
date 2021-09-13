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

import ChatIcon from "@material-ui/icons/Chat";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import webTheme from "../Hooks/WebTheme";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
function Header() {
  const classes = webTheme();

  return (
    <AppBar>
      <Toolbar className={classes.header__container}>
        {/* LOGO 圖片 */}
        <img
          className={classes.header__logo}
          src="https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png"
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
          <IconButton>
            <ChatIcon />
          </IconButton>

          {/* 購物車 */}
          <IconButton>
            <LocalMallIcon />
          </IconButton>
          {/* 用戶頭相 */}
          <IconButton edge="end">
            <Avatar>123</Avatar>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
