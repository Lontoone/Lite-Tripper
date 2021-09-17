import {
  Container,
  Grid,
  Input,
  List,
  ListItem,
  ListSubheader,
  Paper,
  TextField,
  Typography,
  Button,
  makeStyles,
  Card,
} from "@material-ui/core";
import React, { useState } from "react";
import RegionSelect from "../Components/RegionSelect";
import DividerWithText from "../Components/DividerWithText";
import webTheme from "../Hooks/WebTheme";

import PriceRangeBox from "../Components/PriceRangeBox";
import RatingSelect from "../Components/RatingSelect";
import WeekdaySelect from "../Components/WeekdaySelect";
import SingleImageUpload from "../Components/SingleImageUpload";

import MultiImageUpload from "../Components/MultiImageUpload";
import MUIRichTextEditor from "mui-rte";

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    display: "flex",
    flexDirection: "column",
  },

  topInputContaier: {
    display: "flex",
    flexDirection: "row",
    margin: "0 auto",
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flexDirection: "column",
    },
  },
  topInputListItem: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      "align-items": "baseline",
    },
  },
  smallInputBox: {
    height: "100%",
    width: 50,
    padding: 0,
    textAlign: "center",
    "text-indent": "2em",
  },
  thumbnailUploadContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,

    [theme.breakpoints.down("sm")]: {
      maxWidth: "90vw",
      margin: "0 auto",
    },
  },
  imagesContainer: {
    height: "90%",
    backgroundColor: "#F45264",
  },
  uploadCarouselContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  textEdiotrContainer: {
    width: "70%",
    height: "50vh",
    margin: "0 auto",
    padding: 15,
    "overflow-y": "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: 5,
    },
  },
}));

function CreateProduct() {
  //const classes = webTheme();
  const classes = useStyles();

  const [minPrice, setminPrice] = useState(0);
  const [maxPrice, setmaxPrice] = useState(0);

  const [weekDays, setWeekDays] = useState([]);
  const [rating, setRating] = useState(5);

  const [county, setCounty] = useState("");
  const [town, setTown] = useState("");

  const [images, setImages] = useState([]);

  const [thumbnailPhoto, setthumbnailPhoto] = useState(null);

  const setPreviewPhotos = (e) => {
    var files = e.target.files;
    console.log(files);
    return (
      <Container>
        {Array(files.length)
          .fill()
          .map(
            (file, i) => (
              console.log(files[i]),
              (<img src={URL.createObjectURL(files[i])} />)
            )
          )}
      </Container>
    );
  };

  return (
    <Container className={classes.paperContainer}>
      <Typography>新增行程</Typography>

      <Grid container component={Paper} className={classes.topInputContaier}>
        {/* 左邊- 資料輸入 */}
        <Grid item md={6}>
          <List component="form">
            {/* 標題輸入 */}
            <ListItem variant="outlined">
              <ListSubheader>標題</ListSubheader>
              <TextField></TextField>
            </ListItem>

            {/* 區域選擇 */}
            <ListItem>
              <RegionSelect setCounty={setCounty} setTown={setTown} />
            </ListItem>

            {/* 人數限制 */}
            <ListItem>
              <ListSubheader>人數上限</ListSubheader>
              <TextField
                variant="outlined"
                type="number"
                inputProps={{
                  min: 1,
                  maxLength: 3,
                  style: { textAlign: "center", padding: 0 },
                }}
                className={classes.smallInputBox}
              ></TextField>
              <ListSubheader>人</ListSubheader>
            </ListItem>

            {/* 星期選擇 */}
            <ListItem className={classes.topInputListItem}>
              <ListSubheader>開放星期</ListSubheader>
              <WeekdaySelect setWeekday={setWeekDays}></WeekdaySelect>
            </ListItem>

            {/* 日常 */}
            <ListItem>
              <ListSubheader>天數</ListSubheader>
              <TextField
                variant="outlined"
                type="number"
                inputProps={{
                  min: 1,
                  maxLength: 2,
                  style: { textAlign: "center", padding: 0 },
                }}
                className={classes.smallInputBox}
              ></TextField>
              <ListSubheader>天</ListSubheader>
            </ListItem>

            {/* 介紹 
            <ListItem>
              <ListSubheader>介紹</ListSubheader>
              <TextField
                multiline
                rows={4}
                //defaultValue="Default Value"
                placeholder="介紹"
                variant="standard"
                fullWidth
              />
            </ListItem>*/}
          </List>
        </Grid>
        {/* 右邊- 上傳縮圖 */}
        <Grid item lg={6} className={classes.thumbnailUploadContainer}>
          <SingleImageUpload setFile={setthumbnailPhoto} />
        </Grid>
      </Grid>
      {/* 介紹內容 */}
      <DividerWithText>內容</DividerWithText>
      <Grid item component={Card} className={classes.textEdiotrContainer}>
        <MUIRichTextEditor label="Start typing..." />,
      </Grid>

      {/* 上傳多張圖片 */}
      <Grid
        item
        container
        direction="column"
        className={classes.uploadCarouselContainer}
      >
        <Grid itme>
          <DividerWithText>上傳風景照</DividerWithText>

          <MultiImageUpload />
        </Grid>
      </Grid>

      {/* 日程內容 */}
      <Grid item>
        <DividerWithText>日程內容</DividerWithText>
        <Card>日程內容123</Card>
      </Grid>

      {/* 報價單 */}
      <Grid item>
        <DividerWithText>報價單</DividerWithText>
        <Card>報價單123</Card>
      </Grid>

      {/* 送出 */}
      <Grid item>
        <DividerWithText>最後確認</DividerWithText>
        <Card>價格100 
          <Button>確認</Button>
        </Card>
      </Grid>
    </Container>
  );
}

export default CreateProduct;
