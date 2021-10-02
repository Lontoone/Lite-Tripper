import { Container, Drawer, Box, Paper } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import ChatList from "../Components/Chat/ChatList";
import ChatRoom from "../Components/Chat/ChatRoom";
import { useGetChatList } from "../utils/ChatFunction";
import { getLoginData } from "../utils/localStorge";
import { Switch, Route } from "react-router-dom";
import ChatHeader from "../Components/Chat/ChatHeader";

const drawerWidth = 240;

export default function Chat(props) {
  const History = useHistory();
  //取得當下登入人的id，若無則空字串
  const currentUid = getLoginData()?.id || "";
  //取得聊天室清單
  const [userList, chatList] = useGetChatList(currentUid);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { window } = props;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = <ChatList userList={userList} chatList={chatList} />;

  //TODO: 一樣放grid，sm時候不見 其他時候照舊
  //判斷是否有登入
  if (getLoginData() == null) {
    alert("請先登入");
    History.push("/signin");
    return <div>轉跳中</div>;
  }
  return (
    <div>
      <Container>
        <Box>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Switch>
          {/* 當沒有輸入聊天室id */}
          <Route exact path="/Chat/">
            {/* 只有顯示聊天室的bar */}
            <ChatHeader
              handleDrawerToggle={handleDrawerToggle}
              drawerWidth={drawerWidth}
            />
            <Paper />
          </Route>
          {/* 當沒有輸入聊天室id */}
          <Route exact path="/Chat/:chatId">
            <ChatRoom
              handleDrawerToggle={handleDrawerToggle}
              drawerWidth={drawerWidth}
            />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}
