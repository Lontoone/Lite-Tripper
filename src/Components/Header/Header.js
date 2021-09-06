import React from "react";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import webTheme from "../../Hooks/WebTheme";

import SearchIcon from "@material-ui/icons/Search";

function Header() {
  return (
    <AppBar>
      <Toolbar>
        {/* LOGO 圖片 */}
        <img
          style={webTheme.header.header__logo}
          src="https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png"
        ></img>

        {/* 搜尋 */}
        <Container style={webTheme.header.header__search}>
          <input
            style={webTheme.header.header__searchInput}
            type="text"
          ></input>
          <Button
            style={webTheme.header.header__searchIcon}
            variant="contained"
            color="secondary"
          >
            <SearchIcon />
          </Button>
        </Container>

        {/* 功能組 */}
        <Container style={webTheme.header.header__nav}>
          {/* 聊天室 */}
          <Button>
            <ChatIcon />
          </Button>

          {/* 購物車 */}
          <Button>
            <LocalMallIcon />
          </Button>

          {/* 用戶頭相 */}
          <Avatar>123</Avatar>

        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
