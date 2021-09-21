import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ChatList from "../Components/Chat/ChatList";
import ChatRoom from "../Components/Chat/ChatRoom";
import { useGetChatList } from "../utils/ChatFunction";
import { getLoginData } from "../utils/localStorge";
import { Switch, Route } from "react-router-dom";
import ChatHeader from "../Components/Chat/ChatHeader";
export default function Chat() {
  const History = useHistory();
  //取得當下登入人的id，若無則空字串
  const currentUid = getLoginData()?.id || "";
  //取得聊天室清單
  const [userList, chatList] = useGetChatList(currentUid);
  //判斷是否有登入
  if (getLoginData() == null) {
    alert("請先登入");
    History.push("/signin");
    return <div>轉跳中</div>;
  }
  return (
    <div>
      <Grid container>
        <Grid item md={4} xs={12}>
          <ChatList userList={userList} chatList={chatList} />
        </Grid>
        <Grid item md={8} xs={12}>
          <Container>
            <Switch>
              {/* 當沒有輸入聊天室id */}
              <Route exact path="/Chat/">
                {/* 只有顯示聊天室的bar */}
                <ChatHeader />
              </Route>
              {/* 當沒有輸入聊天室id */}
              <Route exact path="/Chat/:chatId">
                <ChatRoom />
              </Route>
            </Switch>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
