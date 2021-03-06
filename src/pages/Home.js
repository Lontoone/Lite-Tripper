import {
  Container,
  Drawer,
  FormControl,
  Grid,
  List,
  ListItem,
  ListSubheader,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import webTheme from "../Hooks/WebTheme";
import ProductCard from "../Components/ProductCard";
import ProductFilter from "../Components/ProductFilter";
import {
  getAllProductsList,
  getProductsByFiltered,
  getProductState,
  getQueryByOption,
} from "../utils/ProductFuntion";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";
import TpiNewsFrame from "../Components/TpiNewsFrame";
import { countyList } from "../utils/regionData";
import HomeEventCarousel from "../Components/HomeEventBoard";
import HomeAdsCarouse from "../Components/HomeAdsCarouse";

const useStyles = makeStyles((theme) => ({
  home__container: {
    //background: "#f9f9f9",
    width: "95%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
  },
  home__ad: {
    //height: 400,
    height: "100%",
    maxWidth: 1280,
    margin: "0 auto",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    //overflow: "auto",
  },
  home__bodyContainer: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  home__filterBox: {
    width: "30%",
    display: "flex",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  home__productListContainer: {
    flex: 1,
    flexGrow: 2,
    margin: 20,
    [theme.breakpoints.up("sm")]: {
      minWidth: "70%",
    },
  },
  home__productList: {
    margin: 2,
    paddingTop: 2,
    paddingBottom: 2,
  },

  home__pageButtonContainer: {
    margin: "0 auto",
  },
  home__broadCastContainer: {
    minWidth: "28%",
    minHeight: 500,
    //maxHeight: "50vh",
    display: "flex",
    flexDirection:"column",
    justifyContent:"center",
    margin:"0 auto",
    [theme.breakpoints.down("sm")]: {
      minWidth: 350,
    },
  },
}));

function Home() {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [productData, setProductData] = useState([]);

  const [orderSearch, setOrderSearch] = useState("createdAt");
  const [startAfterSearch, setStartAfterSearch] = useState(null);
  const [limitSearch, setLimitSearch] = useState(5);
  const [maxPageCount, setMaxPageCount] = useState(0);

  useEffect(async () => {
    //??????????????????
    const result = getAllProductsList(
      orderSearch,
      startAfterSearch,
      limitSearch
    ).then((e) => {
      console.log(e, Array.isArray(e));
      setProductData(e);
    });

    //??????
    getProductState().then((e) => {
      setMaxPageCount(Math.ceil(e.count / limitSearch));
    });   
/*
    //??????:
    getProductsByFiltered({
      orderBy:orderSearch,
      startAfter:startAfterSearch,
      limit:limitSearch,      

    }).then((r)=>{
      console.log(r);
    });*/
  }, []);

  //????????????:
  useEffect(() => {
    setStartAfterSearch(productData[productData.length - 1]);
  }, [page]);

  //??????????????????:
  useEffect(() => {
    getAllProductsList(orderSearch, startAfterSearch, limitSearch).then((e) => {
      setProductData(e);
    });
  }, [orderSearch, startAfterSearch, limitSearch]);

  return (
    <div>
      <Grid container spacing={3} className={classes.home__container}>
        {/* ????????? */}
        <Grid item xs={12}>
          <Paper className={classes.home__ad}>
            {/* <HomeEventCarousel /> */}
            {/* TODO: ??????????????? 
            <img src="https://p2.bahamut.com.tw/B/2KU/38/3c661803ce9a8b1918024d02f21di7e5.JPG" />
            */}
            <HomeAdsCarouse></HomeAdsCarouse>
          </Paper>
        </Grid>

        {/* ??????????????? */}
        <Grid item className={classes.home__bodyContainer}>
          {/* ?????????????????? */}
          <Grid item className={classes.home__filterBox} xs={0} sm={0} lg={3}>
            {/* ???????????? */}
            <ProductFilter submitCallback={(e)=>{
              console.log(e);
              setProductData(e);
              }}/>
          </Grid>

          {/* ????????? */}
          <Grid
            item
            container
            xs={12}
            sm={12}
            className={classes.home__productListContainer}
          >
            {/* 
            //TODO: ?????? 
            <Grid item xs={12} sm={12} lg={4}>
              <Paper>
                <Container>??????....</Container>
              </Paper>
            </Grid>*/}

            {/* ???????????? */}
            <Grid item xs={12} sm={12} lg={12}>
              {productData.map((_, i) => {
                return (
                  <Paper className={classes.home__productList} elevation={0}>
                    {/* ??????Card */}
                    <ProductCard datasnapShot={productData[i]}></ProductCard>
                  </Paper>
                );
              })}
            </Grid>
          </Grid>

          {/* ??????????????? ?????? */}
          <Grid item className={classes.home__broadCastContainer}>
            {/* <TpiNewsFrame />  */}
            <Typography> ???????????? </Typography>
            <HomeEventCarousel />
          </Grid>
        </Grid>

        {/* ???????????? */}
        <Grid item className={classes.home__pageButtonContainer}>
          <Pagination
            count={maxPageCount}
            color="secondary"
            page={page}
            onChange={(event, value) => {
              setPage(value);
            }}
          ></Pagination>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
