import {
  Card,
  Container,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      backgroundColor: "#58B2DC",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    toolbar: theme.mixins.toolbar,
  };
});
function NoFoundPage() {
  const classes = useStyle();
  return (
    <div justify="contant" className={classes.container}>
      <Card>
        <Typography variant="h1">404</Typography>
        <Typography variant="h3">你找的頁面不存在</Typography>
      </Card>
    </div>
  );
}

export default NoFoundPage;
