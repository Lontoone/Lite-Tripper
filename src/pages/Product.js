import {
  Card,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState, useStyle } from "react";
import { Link, useLocation } from "react-router-dom";
import ParallaxCarousel from "../Components/ParallaxCarousel";
import {
  getAllProductsList,
  getProductState,
  getProductById,
} from "../utils/ProductFuntion";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: "90vw",
    margin: "0 auto",
  },
  infoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  imagesContaier: {
    width: "70%",
    flex: 1,
    padding: "0 100px",
    margin: "0 auto",
    backgroundColor: "#EEEEEE",

    [theme.breakpoints.down("xs")]: {
      width: "90%",
      padding: "0",
      backgroundColor: "white",
    },
  },
  info: {
    display: "flex",
    width: 500,
    padding: 50,
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      padding:0,
      margin:"0 auto"
    },
  },
  info__title: {},
}));

function Product() {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const pid = urlSearchParams.get("pid");

  const classes = useStyles();

  const [data, setData] = useState({
    images: [],
  });
  //const [images,setImages]=use

  useEffect(() => {
    //取得url商品資料
    getProductById(pid).then((e) => {
      console.log(e.data());
      setData(e.data());
    });
  }, []);

  return (
    <div>
      <Grid container className={classes.mainContainer}>
        <Grid item container>
          {/* 圖片 */}
          <Paper className={classes.infoContainer}>
            <div className={classes.imagesContaier}>
              <ParallaxCarousel
                data={Array(data?.images?.length)
                  .fill()
                  .map((_, i) => ({
                    id: i,
                    title: data.title,
                    subtittle: "",
                    image: data?.images[i],
                  }))}
              />
            </div>
            {/* 資訊欄 */}
            <div className={classes.info}>
              <Typography className={classes.info__title}>
                {data.title}
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Product;
