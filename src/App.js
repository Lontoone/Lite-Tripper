import { ThemeProvider } from "@material-ui/core";
import React from "react";
import Header from "./Components/Header/Header";

import webTheme from "./Hooks/WebTheme";
//import theme from "./Hooks/WebTheme";

function App() {
  //console.log(webTheme.theme);
  //const theme = WebTheme();
  //console.log(WebTheme());
  return (
    <ThemeProvider theme={webTheme.theme}>
      <Header />
    </ThemeProvider>
  );
}

export default App;
