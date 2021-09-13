import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import { green, orange, red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core";

export const theme = createTheme({
  palette: {
    primary: orange,
  },
});

const root = {
  root: {
    display: "flex",
    flexDirection: "row",
  },
};
const home = {
  home__container: {
    background: "#f9f9f9",
    width: "100%",
    //padding: theme.spacing(3),
  },
  home__ad: {
    height: "30vh",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
  },
  home__bodyContainer: {
    display: "flex",
    flexDirection: "row",
    width:"95vw",
  },
  home__filterBox: {
    width:"35%",    
    paddingRight: theme.spacing(3),
  },
};

const header = {
  header__padding: theme.mixins.toolbar,
  header__container:{
    //width:"90vw",
    padding:0,
    margin: theme.spacing(0,1),

  },
  header__logo: {
    width: "100px",
    margin: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  header__search: {
    display: "flex",
    position: "relative",
    margin: theme.spacing(0),

    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },

    [theme.breakpoints.up("sm")]: {
      //marginLeft: theme.spacing(1),
      width: "100%",
    },

    transition: theme.transitions.create("width"),
    [theme.breakpoints.down("sm")]: {
      width: "40%",
      "&:hover": {
        width: "100%",
      },
    },
  },
  header__searchInput: {
    height: "30px",
    //flex: 1,
    border: "none",
    borderRadius: "2px",

    paddingLeft: theme.spacing(1.5), //text indent
  },

  header__searchIcon: {
    //padding: theme.spacing(0, 2),
    height: "30px",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cd9042",
    borderRadius: "0px",
  },

  header__nav: {
    display: "flex",
    flex:1,
    //flexGrow:0,
    //flexShrink:1,
    padding: theme.spacing(0),
    
    justifyContent: "flex-end",    
    [theme.breakpoints.down("xs")]: {
      //paddingRight:"50px",
    },
    
  },

  header__avatar: {},
};

const regionSelect={
  
}

const useStyles = makeStyles({
  ...home,
  ...header,
  ...regionSelect,
});

function UseClasses() {
  return useStyles();
}

export default UseClasses;

/*
export default {
  theme,
  header,
  home,
  root,
};
*/
