import React, { useState, useEffect } from "react";
import {
  AppBar,
  Avatar,
  Badge,
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
import { getShoppingCart, getUserData } from "../utils/userFunction";

function Header() {
  const classes = webTheme();
  //授權hook
  const [user, authLoading, error] = useAuthState(auth);
  const [userData, setUserDate] = useState({});
  const [shoppingCart, setShoppingCart] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getUserData(user?.uid).then((data) => {
      setUserDate(data.data());
    });

    //購物車
    getShoppingCart(user?.uid)
      .then((snap) => {
        console.log(snap.data());
        setShoppingCart(snap.data()?.shoppingCart);
      })
      .catch((err) => console.log(err));
  }, [user]);

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
          <IconButton component="a" href={"/ShoppingCart/"+user?.uid}>
            <Badge badgeContent={shoppingCart? shoppingCart.length:0} color="secondary">
              <LocalMallIcon />
            </Badge>
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
