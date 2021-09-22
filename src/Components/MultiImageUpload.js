import React, { useState, useEffect } from "react";
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
import ParallaxCarousel from "./ParallaxCarousel";
const useStyles = makeStyles((theme) => ({
  paperContainer: {
    display: "flex",
    flexDirection: "column",
    //padding: 25,
    width: "70%",
    height: "100%",
    paddingBottom: 30,
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      minWidth: "95%",
    },
  },

  actionButtonContaier: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnailUploadContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imagesContainer: {
    minWidth: "50%",
    //backgroundColor: "#F45264",
    minHeight: "30vh",
    margin: "0 auto",

    [theme.breakpoints.down("sm")]: {
      //minWidth: "95%",
    },
  },
  previewImage: {
    flex: 1,
    height: "100%",
  },
  defaultImage: {
    maxHeight: "30vh",
    display: "flex",
    margin: "0 auto",
    padding: 20,
    [theme.breakpoints.down("sm")]: {
      //width: "100%",
      height: "100%",
    },
  },
}));

function MultiImageUpload({ setImagesCallback }) {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const photoMaxCount = 6;

  useEffect(() => {
    setImagesCallback(images);
  }, [images]);

  const uploadImage = (e) => {
    //檔案太多不給上傳
    if (photoMaxCount <= images.length) {
      return;
    }
    //加入現有檔案
    var files = e.target.files;
    const allFiles = [...files, ...images];
    setImages(allFiles);
  };

  const deleteImage = () => {
    var filterArr = [];
    for (let i = 0; i < images.length; i++) {
      if (i != currentIndex) {
        filterArr = [...filterArr, images[i]];
      }
    }
    setImages(filterArr);
  };

  return (
    <Paper elevation={3} className={classes.paperContainer}>
      <Grid container direction="column">
        {/* 預覽圖片輪播 */}
        <Grid item className={classes.imagesContainer}>
          {/* 沒有圖片時的預設圖 */}
          <img
            src="https://react.semantic-ui.com/images/wireframe/image.png"
            style={images.length > 0 ? { display: "none" } : {}}
            className={classes.defaultImage}
          />
          <ParallaxCarousel
            data={Array(images?.length)
              .fill()
              .map((_, i) => ({
                id: i,
                title: "",
                subtittle: "",
                image: URL.createObjectURL(images[i]),
              }))}
            setIndex={() => setCurrentIndex}
            style={images.length < 1 ? { display: "none" } : {}}
          ></ParallaxCarousel>
        </Grid>

        {/* 新增 | 刪除按鈕 */}
        <Grid item className={classes.actionButtonContaier}>
          <Button
            variant="contained"
            component="label"
            className={classes.actionButton}
          >
            新增
            <input
              type="file"
              id="file"
              multiple
              hidden
              onChange={(e) => uploadImage(e)}
            />
          </Button>
          <Button
            variant="contained"
            component="label"
            className={classes.actionButton}
            onClick={() => deleteImage()}
          >
            刪除
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MultiImageUpload;
