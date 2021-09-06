import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: orange,
  },
});

/*
const useStyles = makeStyles((theme) => {
  return {
    ...theme,
    header__logo: {
      width: "100%",
    },
  };
});*/

const header = {
  header__logo: {
    width: "100px",
    margin: theme.spacing(1),
  },
  header__search: {
    display: "flex",
    flex:1,
    flexGrow: 1,
    margin: theme.spacing(1),
  },
  header__searchInput: {
    height: "30px",    
    flex:1,
    border: "none",
    borderRadius: "2px",
  },
  header__searchIcon: {
    padding: theme.spacing(0, 2),
    height: "30px",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cd9042",
    borderRadius: "0px",
  },
  header__nav: {
    display: "flex",
    flex:"0.1",
    padding: theme.spacing(1),
  },
};
//export default webTheme;

export default {
  theme,
  header,
};
