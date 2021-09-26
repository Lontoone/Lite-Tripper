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
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RegionSelect from "../Components/RegionSelect";
import DividerWithText from "../Components/DividerWithText";
import webTheme from "../Hooks/WebTheme";

import PriceRangeBox from "../Components/PriceRangeBox";
import RatingSelect from "../Components/RatingSelect";
import WeekdaySelect from "../Components/WeekdaySelect";
import SingleImageUpload from "../Components/SingleImageUpload";

import MultiImageUpload from "../Components/MultiImageUpload";
import MUIRichTextEditor from "mui-rte";
import { convertToRaw } from "draft-js";
import EditableSheetTable from "../Components/EditableSheetTable";
import { auth, firebase, firestore, UploadImg } from "../utils/firebase";
import FullScreenDialog from "../Components/FullScreenDialog";

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3, 5),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(3, 0),
    },
  },
  //行程基本資料
  topInputContaier: {
    display: "flex",
    flexDirection: "row",
    margin: "0 auto",
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
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
  //頭貼上傳
  thumbnailUploadContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,

    [theme.breakpoints.down("sm")]: {
      maxWidth: "50%",
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
    margin: theme.spacing(3, 0),
  },

  //文字編輯器
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

  //確認
  confirmButton: {
    width: 200,
    margin: "0 auto",
    textAlign: "center",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
    color: "white",
    fontWeight: 1000,
    fontSize: 18,
  },
}));

function UploadProductData(product) {
  console.log(
    "submit ",
    product.title,
    product.weekDays,
    product.county,
    product.town,
    product.images,
    product.thumbnailPhoto,
    product.billData,
    product.billTotal,
    product.discribe
  );

  console.log(auth.currentUser);
  if (auth.currentUser == null) {
    return (
      <FullScreenDialog
        title="創建失敗"
        content="用戶尚未登入"
        buttonText="確認"
      />
    );
  }

  var ref = firestore.collection("product").doc();
  const batch = firestore.batch();

  //上傳縮圖
  var thumbnailUrl = Promise.resolve(
    UploadImg(
      "ProductImg",
      (ref, "-thumb-", product.thumbnailPhoto.name),
      product.thumbnailPhoto
    )
  )
    .then((link) => {
      return link;
    })
    .then((thubnaimLink) => {
      //上傳圖片清單
      var imagesUrls = Promise.all(
        product.images.map((img) =>
          UploadImg("ProductImg", (ref, "-", img.name), img)
        )
      )
        .then((url) => {
          console.log(`All success`, url);
          return url;
        })
        .then((urls) => {
          //上傳產品
          var newData = {
            //id: key,
            seller: auth.currentUser.uid,
            title: product.title,
            peopleCountLimit: product.peopleCountLimit,
            duration:product.duration,
            openWeek: product.weekDays,
            county: product.county,
            town: product.town,
            images: urls,
            thumbnail: thubnaimLink,
            bill: { data: product.billData, total: product.billTotal },
            discribe: product.discribe,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          };
          //ref.set(newData);
          batch.set(ref, newData);

          //更新進user 商品
          const userRef = firestore
            .collection("users")
            .doc(auth.currentUser.uid);
          batch.update(userRef, {
            products: firebase.firestore.FieldValue.arrayUnion(ref.id),
          });

          //更新商品doc數量
          const statsRef = firestore.collection("product").doc("--stats--");
          const increment = firebase.firestore.FieldValue.increment(1);
          batch.update(statsRef, { count: increment });
          batch.commit();
        })

        .catch((error) => {
          console.log(`Some failed: `, error.message);
        });
    });
  /*
  //更新進user 商品
  firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .update({
      products: { id: ref.id },
    });
    */
}

function CreateProduct() {
  const history = useHistory();

  //const classes = webTheme();
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [peopleCountLimit, setPeopleCountLimit] = useState(1);
  const [duration, setDuration] = useState(1);
  const [weekDays, setWeekDays] = useState([]);

  const [county, setCounty] = useState("");
  const [town, setTown] = useState("");

  const [discribe, setDiscribe] = useState("");

  const [images, setImages] = useState([]);

  const [thumbnailPhoto, setthumbnailPhoto] = useState(null);

  const [billData, setBillData] = useState([]);
  const [billTotal, setBillTotal] = useState(0);

  const [isAuthed, setIsAuthed] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    UploadProductData({
      title,
      peopleCountLimit,
      weekDays,
      duration,
      county,
      town,
      images,
      thumbnailPhoto,
      billData,
      billTotal,
      discribe,
    });
  };

  return (
    <Container
      className={classes.paperContainer}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography>新增行程</Typography>

      <Grid container component={Paper} className={classes.topInputContaier}>
        {/* 左邊- 資料輸入 */}
        <Grid item md={6}>
          <List component="form">
            {/* 標題輸入 */}
            <ListItem variant="outlined">
              <ListSubheader>標題</ListSubheader>
              <TextField
                type="text"
                required
                onChange={(e) => setTitle(e.target.value)}
              ></TextField>
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
                onChange={(e) => {
                  setPeopleCountLimit(e.target.value);
                }}
                value={peopleCountLimit}
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
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
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
        <MUIRichTextEditor
          label="Start typing..."
          onChange={(value) => {
            const content = JSON.stringify(
              convertToRaw(value.getCurrentContent())
            );
            console.log(content);
            setDiscribe(content);
          }}
          onSave={(value) => setDiscribe(value)}
        />
        ,
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

          <MultiImageUpload setImagesCallback={setImages} />
        </Grid>
      </Grid>

      {/* 報價單 */}
      <Grid item>
        <DividerWithText>報價單</DividerWithText>
        <Card>
          <EditableSheetTable
            dataCallback={setBillData}
            totalCallback={setBillTotal}
          />
        </Card>
      </Grid>

      {/* 送出 */}
      <Grid item>
        <DividerWithText>上傳</DividerWithText>
        <div style={{ display: "flex" }}>
          <Button
            type="submit"
            className={classes.confirmButton}
            elevation={3}
            onClick={() => {
              setIsAuthed(auth.currentUser != null);
              console.log(isAuthed);
            }}
          >
            確認
          </Button>
        </div>
      </Grid>

      <FullScreenDialog
        isOpen={!isAuthed}
        title="創建失敗"
        content="用戶尚未登入"
        buttonText="確認"
        closeCallback={() => {
          window.location.replace("/");
        }}
      />
    </Container>
  );
}

export default CreateProduct;
