import { Grid } from "@material-ui/core";
import React from "react";
import webTheme from "../Hooks/WebTheme";

function Layout({ children }) {
  return (
    
    <div style={webTheme.root.root}>
      <div >{children}</div>
    </div>
    
  );
}

export default Layout;
