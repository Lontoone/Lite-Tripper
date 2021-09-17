import { ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

import { theme } from "./Hooks/WebTheme";
import Home from "./pages/Home";
import Layout from "./Components/Layout";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import NoFoundPage from "./pages/NoFoundPage";
import Chat from "./pages/Chat";
import ProfileEdit from "./pages/ProfileEdit";
import CreateProduct from "./pages/CreateProduct";
//import theme from "./Hooks/WebTheme";

function App() {
  //console.log(webTheme.theme);
  //const theme = WebTheme();
  //console.log(WebTheme());
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          {/*首頁 */}
          <Route exact path="/">
            <Layout>
              <Home />
            </Layout>
          </Route>
          {/*登入 */}
          <Route exact path="/signIn">
            <SignIn />
          </Route>
          {/*個人頁面*/}
          <Route exact path="/Profile/:uid">
            <Layout>
              <Profile />
            </Layout>
          </Route>
          {/*聊天室*/}
          <Route exact path="/Chat/">
            <Layout>
              <Chat />
            </Layout>
          </Route>
          {/*聊天室*/}
          <Route exact path="/ProfileEdit/:uid">
            <Layout>
              <ProfileEdit />
            </Layout>
          </Route>
          {/* 創建商品 */}
          <Route exact path="/CreateProduct">
            <Layout>
              <CreateProduct/>
            </Layout>
          </Route>
          {/*若輸入其他網址會導入noFound頁面 */}
          <Route path="/*">
            <NoFoundPage />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
