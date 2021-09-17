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
    //background: "#f9f9f9",
    width: "95%",
    margin:"0 auto",
    //padding: theme.spacing(1),
  },
  home__ad: {
    height: "30vh",
    maxWidth:1280,
    margin:"0 auto",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
  },
  home__bodyContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  home__filterBox: {
    width: "30%",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  home__productList: {
    margin: 2,
    paddingTop: 2,
    paddingBottom: 2,
  },
};

const header = {
  header__padding: theme.mixins.toolbar,
  header__container: {
    //width:"90vw",
    padding: 0,
    margin: theme.spacing(0, 1),
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
    flex: 1,
    //flexGrow:0,
    //flexShrink:1,
    padding: theme.spacing(0),

    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      //paddingRight:"50px",
    },
  },

  header__avatar: {},
};


const productCard = {
  productCard__papaer: {
    minWidth: 400,
    display: "flex",
    flex:1,
    flexGrow: 1,
    
    //padding: theme.spacing(2),
    //margin: theme.spacing(2),
    maxHeight: 256,
    [theme.breakpoints.down("sm")]: {
      maxHeight: "25vh",
      maxWidth: "85vw",      
    },
    [theme.breakpoints.down("xs")]: {      
      minWidth: 10, 
      maxHeight: "60vh",     
    },
    //margin: "auto",
  },
  productCard__container: {
    display: "flex",
    width: "90%",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      minWidth: 500,
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      minWidth: 300,
    },    

    [theme.breakpoints.down("xs")]: {      
      flexDirection: "row",     
    },
  },
  productCard__mediaContainer: {
    display: "flex",
    flexDirection: "column",
  },
  productCard__media: {
    width: 200,
    height: 200,
    margin: theme.spacing(0, 1),
    padding: theme.spacing(0),
    overflow: "hidden",
    borderRadius: 15,
    [theme.breakpoints.down("sm")]: {
      //margin: theme.spacing(2),
      width: 100,
      height: 100,
    },
       
    [theme.breakpoints.down("xs")]: {      
      width: "50vw",
      height: "50vw",   
    },
  },
  productCard__img: {
    margin: "auto",
    display: "block",
    maxHeight: "90%",
    //objectFit: "cover",
    objectFit: "none",
  },

  productCard__infoContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing(1),
  },
  productCard__subInfoContainer: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  productCard__subInfoLeft: {
    minWidth: 128,
    display: "flex",
    flexDirection: "row",
    //justifyContent:"center",
    alignItems: "baseline",
    "align-self":"baseline",
    padding: 0,
       
  },
  productCard__subInfoButton: {
    //color:"#24E5B8",
    display: "flex",
    flexGrow: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  productCard__titleText: {
    maxWidth: "40vw",
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": 2,
    textOverflow: "ellipsis",
    overflow: "hidden",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      maxWidth: 150,
      fontSize: 16,
    },
    
    [theme.breakpoints.down("xs")]: {      
      minWidth:"50vw"
    },
  },

  productCard__infoText: {
    maxWidth: "40vw",
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": 5,
    textOverflow: "ellipsis",
    overflow: "hidden",
    lineHeight: "1.8em",
    fontSize: 14,
    "letter-spacing": "0.3em",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      //maxWidth: 150,
      fontSize: 12,
      "-webkit-line-clamp": 3,
    },
  },

  productCard__priceText: {
    "font-weight": 900,
    fontSize: "1.5em",
  },
};

const createProduct={

};

const useStyles = makeStyles({
  ...home,
  ...header,
  ...productCard,
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
