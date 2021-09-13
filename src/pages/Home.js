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
            xs={12}
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
                <RegionSelect></RegionSelect>
              </List>
            </Paper>
          </Grid>

          {/* 商品區 */}
          <Grid item>
            {/* 排序 */}
            <Grid item>
              <Paper>
                <Container>排序....</Container>
              </Paper>
            </Grid>

            {/* 商品清單 */}
            <Grid item>
              <Paper>商品內容...</Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
