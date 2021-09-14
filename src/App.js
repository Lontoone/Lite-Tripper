import { Container, ThemeProvider, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

import webTheme, { theme } from "./Hooks/WebTheme";
import Home from "./Pages/Home";
import Layout from "./Components/Layout";
import SignIn from "./Pages/SignIn";
import Profile from "./Pages/Profile";
import { auth } from "./utils/firebase";
import NoFoundPage from "./Pages/NoFoundPage";
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
          {/*404 */}
          <Route exact path="/404">
            <NoFoundPage />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
