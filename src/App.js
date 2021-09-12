import { Container, ThemeProvider, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Header from "./Components/Header";

import webTheme from "./Hooks/WebTheme";
import Home from "./Pages/Home";
import Layout from "./Components/Layout";
import SignIn from "./Pages/SignIn";
//import theme from "./Hooks/WebTheme";

function App() {
  //console.log(webTheme.theme);
  //const theme = WebTheme();
  //console.log(WebTheme());
  return (
    <ThemeProvider theme={webTheme.theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/signIn">
              <SignIn />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
