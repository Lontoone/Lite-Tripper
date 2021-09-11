import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import webTheme from "./Hooks/WebTheme";
import SignIn from "./pages/SignIn";
import Layout from "./component/Layout";
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
              <SignIn />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
