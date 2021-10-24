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
import "../utils/reset.css";

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
    width: "90%",
    height: "90vh",
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

function CreateProduct({ isEdit = false, pid, defaultProduct }) {
  const history = useHistory();

  const classes = useStyles();
  const [title, setTitle] = useState(defaultProduct?.title);
  const [peopleCountLimit, setPeopleCountLimit] = useState(
    defaultProduct?.peopleCountLimit || 1
  );
  const [duration, setDuration] = useState(defaultProduct?.duration || 1);
  const [weekDays, setWeekDays] = useState(
    defaultProduct?.openWeek || [true, true, true, true, true, true, true]
  );

  const [county, setCounty] = useState(defaultProduct?.county);
  const [town, setTown] = useState(defaultProduct?.town);

  const [discribe, setDiscribe] = useState(defaultProduct?.discribe || "");
  var _tempContent = "";

  //const [images, setImages] = useState(defaultProduct?.images || []);

  const [thumbnailPhoto, setthumbnailPhoto] = useState(
    defaultProduct?.thumbnail || ""
  );

  const [billData, setBillData] = useState(defaultProduct?.bill?.data);
  const [billTotal, setBillTotal] = useState(defaultProduct?.bill?.total);

  const [isAuthed, setIsAuthed] = useState(true);
  const [isCreateSuccess, setIsCreateSuccess] = useState();

  function UploadProductData(pid, product) {
    console.log(
      "submit ",
      product
      /*
      product.title,
      product.weekDays,
      product.county,
      product.town,
      product.images,
      product.thumbnailPhoto,
      product.billData,
      product.billTotal,
      product.discribe*/
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

    var ref = pid
      ? firestore.collection("product").doc(pid)
      : firestore.collection("product").doc();
    var isEdit = pid == null;

    const thumnFileName = ref.id + "-t";
    console.log(ref);
    //上傳縮圖
    var thumbnailPhoto = "";
    if (product.thumbnailPhoto && product.thumbnailPhoto instanceof File) {
      //需要上傳檔案
      Promise.resolve(
        UploadImg("ProductImg", thumnFileName, product.thumbnailPhoto)
      ).then((link) => {
        uploadProduct(ref,product, link);
      });
    } else {
      //無須上傳檔案，僅更新product
      uploadProduct(ref,product, product.thumbnailPhoto);
    }
  }

  function uploadProduct(ref,product, thubnaimLink) {    
    const batch = firestore.batch();
    var newData = {
      //id: key,
      seller: auth.currentUser.uid,
      title: product.title,
      peopleCountLimit: product.peopleCountLimit,
      duration: product.duration,
      openWeek: product.weekDays,
      county: product.county,
      town: product.town,
      //images: urls,
      thumbnail: thubnaimLink,
      bill: { data: product.billData, total: product.billTotal },
      discribe: product.discribe,
      //預設評價:
      //rating: 5,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    console.log(newData);
    //ref.set(newData);
    batch.set(ref, newData);

    //更新進user 商品
    const userRef = firestore.collection("users").doc(auth.currentUser.uid);
    batch.update(userRef, {
      products: firebase.firestore.FieldValue.arrayUnion(ref.id),
    });

    //更新商品doc數量
    if (!isEdit) {
      const statsRef = firestore.collection("product").doc("--stats--");
      const increment = firebase.firestore.FieldValue.increment(1);
      batch.update(statsRef, { count: increment });
    }
    batch
      .commit()
      .then(() => {
        setIsCreateSuccess(true);
      })

      .catch((error) => {
        console.log(`Some failed: `, error.message);
        setIsCreateSuccess(false);
      });
  }

  const handleSubmit = (e, pid) => {
    e.preventDefault();
    UploadProductData(pid, {
      title,
      peopleCountLimit,
      weekDays,
      duration,
      county,
      town,
      //images,
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
      onSubmit={(e) => {
        console.log("submit");
        handleSubmit(e, pid);
      }}
    >
      <Typography>{isEdit ? "編輯" : "新增行程"}</Typography>

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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></TextField>
            </ListItem>

            {/* 區域選擇 */}
            <ListItem>
              <RegionSelect
                setCounty={setCounty}
                setTown={setTown}
                county_value={defaultProduct?.county}
                town_value={defaultProduct?.town}
              />
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
              <WeekdaySelect
                setWeekday={setWeekDays}
                value={weekDays}
              ></WeekdaySelect>
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
          </List>
        </Grid>
        {/* 右邊- 上傳縮圖 */}
        <Grid item lg={6} className={classes.thumbnailUploadContainer}>
          <SingleImageUpload
            setFile={setthumbnailPhoto}
            defaultValue={thumbnailPhoto}
          />
        </Grid>
      </Grid>
      {/* 介紹內容 */}
      <DividerWithText>內容</DividerWithText>
      <Grid item component={Card} className={classes.textEdiotrContainer}>
        <MUIRichTextEditor
          label="Start typing..."
          defaultValue={isEdit ? discribe : ""}
          onChange={(value) => {
            const content = JSON.stringify(
              convertToRaw(value.getCurrentContent())
            );
            console.log(content);
            _tempContent = content;
            //setDiscribe(content);
          }}
          onBlur={() => {
            setDiscribe(_tempContent);
          }}
          onSave={(value) => setDiscribe(value)}
        />
        ,
      </Grid>

      {/* 上傳多張圖片 
      <Grid
        item
        container
        direction="column"
        className={classes.uploadCarouselContainer}
      >
        <Grid itme>
          <DividerWithText>上傳風景照</DividerWithText>

          <MultiImageUpload
            setImagesCallback={setImages}
            defaultImgs={images}
          />
        </Grid>
      </Grid>*/}

      {/* 報價單 */}
      <Grid item>
        <DividerWithText>報價單</DividerWithText>
        <Card>
          <EditableSheetTable
            dataCallback={setBillData}
            totalCallback={setBillTotal}
            defaultData={billData}
            defaulTotal={billTotal}
          />
        </Card>
      </Grid>

      {/* 送出 */}
      <Grid item>
        <DividerWithText> 上傳</DividerWithText>
        <div style={{ display: "flex" }}>
          <Button
            type="submit"
            className={classes.confirmButton}
            elevation={3}
            onClick={(e) => {
              //e.preventDefault();
              setIsAuthed(auth.currentUser != null);
              //handleSubmit(pid);
            }}
          >
            確認
          </Button>
        </div>
      </Grid>
      {/* 創建失敗- 尚未登入 dia */}
      <FullScreenDialog
        isOpen={!isAuthed}
        title="創建失敗"
        content="用戶尚未登入"
        buttonText="確認"
        closeCallback={() => {
          window.location.replace("/");
        }}
      />
      {/* 創建失敗- ?
      <FullScreenDialog
        isOpen={!isCreateSuccess}
        title="創建失敗"
        content="上傳發生問題，請稍後再試"
        buttonText="確認"
        closeCallback={() => {
          //window.location.replace("/");
        }}        
      /> */}

      {/* 創建成功 dia */}
      <FullScreenDialog
        isOpen={isCreateSuccess}
        title="創建成功"
        content="商品創建成功"
        buttonText="確認"
        closeCallback={() => {
          const userPath = "/profile/" + auth?.currentUser.uid;
          window.location.replace(userPath);
        }}
      />
    </Container>
  );
}

export default CreateProduct;
