import React, { useEffect, useState } from "react";
import { Button, Card, makeStyles, Paper } from "@material-ui/core";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Parser from "html-react-parser";
import { getTpiActivity } from "../utils/OpenAPIGetter";

import Collapsible from "react-collapsible";
import { orange } from "@material-ui/core/colors";

import { BiArrowToRight } from "react-icons/bi";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    //height: 400,
    width: "95%",
    margin: " auto",
    display: "flex",
    flexDirection: "column",
  },
  subContainer: {
    objectFit: "cover",
    //width: "100%",
    //height: "100%",
    overflow: "auto",
    maxHeight: 250,
    fontSize: "8pt",

    //backgroundColor: orange[100],
  },
  title: {
    objectFit: "cover",
    maxHeight: 350,
    height: "100%",
    //textAlign: "start",
    flex: 1,
    transition: 2,
  },
  moreButton: {
    height: 30,
    width: 100,
    margin: 5,
    //margin: "0 auto",
    backgroundColor: orange[100],
  },
}));

function HomeEventCarousel() {
  const classes = useStyles();

  const [data, setData] = useState();
  const [currentData, setCurrentData] = useState({
    description: "",
  });
  useEffect(() => {
    getTpiActivity().then((e) => {
      console.log(e);
      setData(e.data);
      setCurrentData(e.data[0]);
    });
  }, []);
  return (
    <div className={classes.root}>
      {data?.map((e) => {
        return (
          <Collapsible
            trigger={e.title}
            className={classes.title}
            component={Card}
            triggerStyle={{
              //background: "linear-gradient(rgb(255 129 9), rgb(229 145 145))",
              backgroundColor: "rgb(243 243 243)",
              //color: "white",
              display: "flex",
              justifyContent: "Start",
              borderRadius: "5px",
              padding: 5,
              margin: "2px 0",
              "box-shadow": " 5px 5px 2px #F7F7F7",
            }}
          >
            <div className={classes.subContainer} component={Paper}>
              {Parser(e.description)}
            </div>
            <Button
              //varient="a"
              href={e.url}
              target="_blank"
              className={classes.moreButton}
              color="textSecondary"
              variant="contained"
            >
              看更多
              <BiArrowToRight />
            </Button>
          </Collapsible>
        );
      })}
    </div>
  );
}

export default HomeEventCarousel;
