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
import ChatRoom from "./Components/Chat/ChatRoom";
import Product from "./pages/Product";
import MyTest from "./pages/myTest";
import ShoppingCart from "./pages/ShoppingCart";
import UserPage from "./pages/UserPage";
import SellerPage from "./pages/SellerPage";
import EditProduct from "./pages/EditProduct";

function App() {
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
          {/*個人頁面 (新)*/}
          <Route exact path="/user/:uid">
            <Layout>
              <UserPage />
            </Layout>
          </Route>

          {/*賣家後台*/}
          <Route exact path="/seller/:uid">
            <Layout>
              <SellerPage />
            </Layout>
          </Route>

          {/*個人頁面*/}
          <Route exact path="/Profile/:uid">
            <Layout>
              <Profile />
            </Layout>
          </Route>
          {/*聊天室*/}
          <Route path="/Chat">
            <Layout>
              <Chat />
            </Layout>
          </Route>
          {/* 創建商品 */}
          <Route exact path="/CreateProduct">
            <Layout>
              <CreateProduct />
            </Layout>
          </Route>
          {/* 修改商品 */}
          <Route exact path="/EditProduct/:pid">
            <Layout>
              <EditProduct />
            </Layout>
          </Route>
          {/* 商品頁面 */}
          <Route exact path="/Product">
            <Layout>
              <Product />
            </Layout>
          </Route>

          {/* //TODO:付款頁面 
          <Route path="/payment">          
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          */}

          <Route exact path="/test1">
            <MyTest></MyTest>
          </Route>

          {/* 購物車 */}
          <Route exact path="/ShoppingCart/:uid">
            <Layout>
              <ShoppingCart></ShoppingCart>
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
