import { makeStyles } from "@material-ui/core";
import React from "react";
import Header from "./Header";

const useStyle = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      paddingTop: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
  };
});

function Layout({ children }) {
  const classes = useStyle();
  return (
    <div>
      <Header />
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}

export default Layout;
