import React, { useEffect, useState } from "react";
import { makeStyles, Paper } from "@material-ui/core";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Parser from "html-react-parser";
import { getAllProductsList } from "../utils/ProductFuntion";
import { Link } from "react-router-dom";
import MUIRichTextEditor from "mui-rte";
//import { getTpiActivity } from "../utils/OpenAPIGetter";
const useStyles = makeStyles((theme) => ({
  root: {    
    height: 400,
    width: "100%",
    margin: " auto",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
  },
  subContainer: {
    objectFit: "cover",
    //width: "100%",
    //height: "100%",
    maxHeight: 350,

    [theme.breakpoints.down("sm")]: {
      maxHeight: "100%",
    },
  },
  carousel: {
    display: "flex",
    objectFit: "cover",
    justifyContent: "center",
    height: "100%",
    flex: 1,
    flexGrow: 3,
  },
  infoBox: {
    height: "90%",
    //width: 500,
    display: "flex",
    flex: 1,
    flexGrow: 1,
    overflow: "auto",
    margin: "10px",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

function HomeAdsCarouse() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    //先抓最高評價ㄉ商品
    getAllProductsList("rating").then((e) => {
      console.log(e);
      setData(e);
    });
  }, []);

  const handleChange = (index) => {
    setCurrentIndex(index);
  };
  return (
    <div className={classes.root}>
      <Carousel
        className={classes.carousel}
        showArrows={true}
        dynamicHeight={false}
        emulateTouch={true}
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        onChange={(e) => {
          handleChange(e);
        }}
        //onClickItem={onClickItem}
        //onClickThumb={onClickThumb}
      >
        {data?.map((_, i) => {
          //console.log(data[i].data());
          const pid = data[i]?.id;
          const pidLink = "/Product/?pid=" + pid;
          return (
            <div className={classes.subContainer}>
              <img className={classes.images} src={data[i]?.data().thumbnail} />
              <Link className="legend" to={pidLink}>
                {data[i]?.data().title}
              </Link>
            </div>
          );
        })}
      </Carousel>

      <div className={classes.infoBox}>
        {/*<Paper>{Parser(data[currentIndex]?.data().discribe)} 123</Paper>*/}
        <MUIRichTextEditor
          className={classes.infoBox}
          defaultValue={data[currentIndex]?.data().discribe}
          toolbar={false}
          readOnly
        ></MUIRichTextEditor>
      </div>
    </div>
  );
}

export default HomeAdsCarouse;
