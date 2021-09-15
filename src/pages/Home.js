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
import React from "react";

import webTheme from "../Hooks/WebTheme";
import CarouselImage from "../Components/CarouselImage";
import RegionSelect from "../Components/RegionSelect";
import ProductCard from "../Components/ProductCard";
function Home() {
  const classes = webTheme();

  return (
    <Container>
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
            <Paper component="form">
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    商品篩選
                  </ListSubheader>
                }
              >
                <RegionSelect
                  className={classes.regionSelect__container}
                ></RegionSelect>
              </List>
            </Paper>
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
            <Grid item xs={12} sm={12} lg={12}>
              <Paper className={classes.home__productList} elevation={0}>
                 {/* 商品Card */}
                <ProductCard
                  pid="1"
                  title="一中街一日遊"
                  county="台中市"
                  town="北區"
                  rating={4}
                  price={100000}
                  discribe="
                  Mibro品牌是由小尋所研發生產，小尋是由 NOKIA 等知名品牌所投資的科技品牌，在無線通訊領域已經有超過 15 年以上經驗，是生態鏈智慧手錶第一大廠，更在海外市場銷售超過數十億的佳績，品質有口皆碑。本次，特別攜手睿濬國際推出亞洲首發唯一繁體中文與通過 NCC 認證的【Mibro color智慧手錶】，為台灣用戶帶來專屬台灣版調校、容易入手的價格以及完整的售後服務，讓大家安心入手，享受科技生活！"
                  thumbnail="https://p2.bahamut.com.tw/B/2KU/09/497beea0399f4826c9560024091dk9l5.JPG"
                ></ProductCard>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
