import { makeStyles } from "@material-ui/core";
import React from "react";
import Header from "./Header";

const useStyle = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      padding: theme.spacing(3),
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
        {/*防止導覽列擋住內容的空間 */}
        <div className={classes.toolbar}></div>
        {/*網頁內容*/}
        {children}
      </div>
    </div>
  );
}

export default Layout;
