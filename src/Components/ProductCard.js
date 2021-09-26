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
import React, { useEffect, useState } from "react";
import Rating from "@material-ui/lab/Rating";
import webTheme from "../Hooks/WebTheme";
import MUIRichTextEditor from "mui-rte";
import FavoriteBorderTwoToneIcon from "@material-ui/icons/FavoriteBorderTwoTone";
import ShareTwoToneIcon from "@material-ui/icons/ShareTwoTone";
import { Link } from "react-router-dom";
import { countyList, townCode2Name } from "../utils/regionData";

function ProductCard({ datasnapShot }) {
  console.log(datasnapShot);
  const data = datasnapShot.data();
  const classes = webTheme();
  const [region, setRegion] = useState([]);
  const [county, setCounty] = useState("");
  const [town, setTown] = useState("");

  useEffect(() => {
    //城市清單
    countyList().then((list) => {
      setRegion(list);
    });
  }, []);

  useEffect(() => {
    //解析城市代號
    region.forEach((a) => {
      if (a.code.value == data.county) {
        setCounty(a.cityname.value);
      }
    });

    //解析區域代號
    townCode2Name(data.county, data.town, setTown);
  }, [region]);

  return (
    <Button
      component={Link}
      to={"/Product?pid=" + datasnapShot.id}
      variant="Outlined"
      color="primary"
      style={{ width: "100%" }}
    >
      <Card className={classes.productCard__papaer}>
        <Grid container xs={12} className={classes.productCard__container}>
          {/* 預覽圖片 */}
          <Grid item className={classes.productCard__mediaContainer}>
            <ButtonBase className={classes.productCard__media}>
              <img
                className={classes.productCard__img}
                alt="thumbNail"
                //src="https://p2.bahamut.com.tw/B/2KU/23/db331003ade211a643216ed0af1dnab5.JPG"
                src={data.thumbnail}
              />
            </ButtonBase>
            <Grid item container className={classes.productCard__subInfoButton}>
              {/* favorites */}
              <Grid item>
                <IconButton aria-label="add to favorites">
                  <FavoriteBorderTwoToneIcon fontSize="small" />
                </IconButton>
              </Grid>
              {/* favorites */}
              <Grid item>
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
                {data.title}
              </Typography>
            </Grid>
            <Grid item>
              {/* 地區 */}
              <Typography variant="subtitle1" color="textSecondary">
                {county}
                {town}
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
                    value={data.rating}
                    readOnly
                    //value={value}
                  />
                  <Typography color="textSecondary">({data.rating})</Typography>
                </Grid>

                {/* 價格 */}
                <Grid item xs={12} container>
                  <Grid item xs={12}>
                    {/* 價格 */}
                    <Typography
                      component="h2"
                      color="primary"
                      className={classes.productCard__priceText}
                    >
                      ${data.bill?.total}
                    </Typography>{" "}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs direction="column">
                {/* 內文 */}
                <Typography className={classes.productCard__infoText}>
                  {/*data.discribe*/}
                  <MUIRichTextEditor
                    defaultValue={data.discribe}
                    toolbar={false}
                    readOnly
                  />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Button>
  );
}
function countyCode2Name(data, code) {
  data.forEach((a) => {
    console.log(a);
    if (a.code.value == code) {
      return a.cityname.value;
    }
  });
}

export default ProductCard;
