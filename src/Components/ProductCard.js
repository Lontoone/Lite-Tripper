import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
  Paper,
  ButtonBase,
} from "@material-ui/core";
import React from "react";
import Rating from "@material-ui/lab/Rating";
import webTheme from "../Hooks/WebTheme";

import FavoriteBorderTwoToneIcon from "@material-ui/icons/FavoriteBorderTwoTone";
import ShareTwoToneIcon from "@material-ui/icons/ShareTwoTone";
import { Link } from "react-router-dom";

function ProductCard({
  pid,
  title,
  county,
  town,
  rating,
  price,
  discribe,
  thumbnail,
}) {
  const classes = webTheme();
  return (
    <Button
      component={Link}
      to={"/product/" + pid}
      variant="Outlined"
      color="primary"
    >
      <Paper className={classes.productCard__papaer}>
        <Grid container xs={12} className={classes.productCard__container}>
          {/* 預覽圖片 */}
          <Grid item className={classes.productCard__mediaContainer} >
            <ButtonBase className={classes.productCard__media}>
              <img
                className={classes.productCard__img}
                alt="thumbNail"
                //src="https://p2.bahamut.com.tw/B/2KU/23/db331003ade211a643216ed0af1dnab5.JPG"
                src={thumbnail}
              />
            </ButtonBase>
            <Grid item container className={classes.productCard__subInfoButton}>
              {/* favorites */}
              <Grid item xs={2}>
                <IconButton aria-label="add to favorites">
                  <FavoriteBorderTwoToneIcon fontSize="small" />
                </IconButton>
              </Grid>
              {/* favorites */}
              <Grid item xs={2}>
                <IconButton aria-label="share">
                  <ShareTwoToneIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          {/* 右側資訊欄位 */}
          {/* 資訊欄位 */}
          <Grid
            item
            container
            xs={8}
            className={classes.productCard__infoContainer}
          >
            <Grid item>
              {/* 標題 */}
              <Typography
                className={classes.productCard__titleText}
                component="h5"
                variant="h5"
              >
                {title}
              </Typography>
            </Grid>
            <Grid item>
              {/* 地區 */}
              <Typography variant="subtitle1" color="textSecondary">
                {county} {town}
              </Typography>
            </Grid>

            {/* 星等 | 內容 */}
            <Grid
              item
              container
              className={classes.productCard__subInfoContainer}
            >
              <Grid
                item
                container
                xs={3}
                className={classes.productCard__subInfoLeft}
              >
                {/* 星等 */}
                <Grid item container alignItems="center">
                  <Rating
                    name="simple-controlled"
                    size="small"
                    value={rating}
                    readOnly
                    //value={value}
                  />
                  <Typography color="textSecondary">({rating})</Typography>
                </Grid>

                {/* 價格 */}
                <Grid
                  item
                  xs={12}
                  container
                >
                  <Grid item xs={12}>
                    {/* 價格 */}
                    <Typography 
                      component="h2" 
                      color="primary"
                      className={classes.productCard__priceText}
                      >
                      ${price}
                    </Typography>{" "}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs direction="column">
                {/* 內文 */}
                <Typography className={classes.productCard__infoText}>
                  {discribe}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Button>
  );
}

export default ProductCard;
