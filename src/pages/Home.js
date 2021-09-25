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
  getProductState,
  getQueryByOption,
} from "../utils/ProductFuntion";
import { Pagination } from "@material-ui/lab";

import { countyList } from "../utils/regionData";

function Home() {
  const classes = webTheme();
  const [page, setPage] = useState(1);
  const [productData, setProductData] = useState([]);

  const [orderSearch, setOrderSearch] = useState("createdAt");
  const [startAfterSearch, setStartAfterSearch] = useState(null);
  const [limitSearch, setLimitSearch] = useState(3);
  const [maxPageCount, setMaxPageCount] = useState(0);

  useEffect(async () => {
    //預設搜尋商品
    const result = getAllProductsList(
      orderSearch,
      startAfterSearch,
      limitSearch
    ).then((e) => {
      console.log(e, Array.isArray(e));
      setProductData(e);
    });

    //頁數
    getProductState().then((e) => {
      setMaxPageCount(Math.ceil(e.count / limitSearch));
    });
    /*
    let options = {
      //where:[["category", "==", "someCategory"]],
      orderBy: ["createdAt"],
      limit:5,

    };
    console.log(getQueryByOption("product", options));
    getQueryByOption("product", options).then((e) => {
      console.log(e);
    });*/
  }, []);

  //頁數更新:
  useEffect(() => {
    //console.log(productData.length-1);
    setStartAfterSearch(productData[productData.length - 1]);
  }, [page]);

  //搜尋參數更新:
  useEffect(() => {
    getAllProductsList(orderSearch, startAfterSearch, limitSearch).then((e) => {
      setProductData(e);
    });
  }, [orderSearch, startAfterSearch, limitSearch]);

  return (
    <div>
      <Grid
        container
        spacing={3}
        className={classes.home__container}
        //style={webTheme.home.root}
      >
        {/* 廣告區 */}
        <Grid item xs={12}>
          <Paper
            className={classes.home__ad}
            //style={webTheme.home.home__ad}
          >
            {/* TODO: 廣告幻燈片 */}
            <img src="https://p2.bahamut.com.tw/B/2KU/38/3c661803ce9a8b1918024d02f21di7e5.JPG" />
          </Paper>
        </Grid>

        {/* 商品內容版 */}
        <Grid
          item
          className={classes.home__bodyContainer}
          //style={webTheme.home.home__bodyContainer}
        >
          {/* 搜尋篩選調整 */}
          <Grid
            item
            className={classes.home__filterBox}
            xs={0}
            sm={0}
            lg={3}
            //style={webTheme.home.home__filterBox}
          >
            {/* 商品篩選 */}
            <ProductFilter />
          </Grid>

          {/* 商品區 */}
          <Grid item container xs={12} sm={12} lg={9}>
            {/* 排序 */}
            <Grid item xs={12} sm={12} lg={4}>
              <Paper>
                <Container>排序....</Container>
              </Paper>
            </Grid>

            {/* 商品清單 */}
            {/*console.log(getAllProductsList())*/}
            {/*console.log(getCounty())*/}

            <Grid item xs={12} sm={12} lg={12}>
              {productData.map((_, i) => {
                return (
                  <Paper className={classes.home__productList} elevation={0}>
                    {/* 商品Card */}
                    <ProductCard datasnapShot={productData[i]}></ProductCard>
                  </Paper>
                );
              })}
            </Grid>
          </Grid>
        </Grid>

        {/* 分頁按鈕 */}
        <Grid item>
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
