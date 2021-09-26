import {
  Card,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
  List,
  ListItem,
  ListSubheader,
  Button,
  ButtonGroup,
  IconButton,
} from "@material-ui/core";
import React, { useEffect, useState, useStyle } from "react";
import { Link, useLocation } from "react-router-dom";
import ParallaxCarousel from "../Components/ParallaxCarousel";
import { countyList, townCode2Name } from "../utils/regionData";
import WeekdaySelect from "../Components/WeekdaySelect";
import DividerWithText from "../Components/DividerWithText";
import {
  getAllProductsList,
  getProductState,
  getProductById,
} from "../utils/ProductFuntion";
import CalenderPicker from "../Components/CalenderPicker";
import { Rating } from "@material-ui/lab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { orange } from "@material-ui/core/colors";
import MUIRichTextEditor from "mui-rte";
import EditableTable from "../Components/EditableTable";
import { auth } from "../utils/firebase";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: "90vw",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
  },
  infoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  imagesContaier: {
    //width: "70%",
    flex: 1,
    padding: "0 100px",
    margin: "0 auto",

    [theme.breakpoints.down("xs")]: {
      width: "90%",
      padding: "0",
      backgroundColor: "white",
    },
  },
  info: {
    display: "flex",
    flexDirection: "column",
    width: 500,
    padding: theme.spacing(6, 5),
    backgroundColor: "#f9f9f9",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      padding: 0,
      margin: "0 auto",
    },
  },
  //大標題
  info__title: {},
  info__subTitle: {
    margin: theme.spacing(0, 2, 0, 0),
  },
  info__infoGroup: {
    display: "flex",
    flexDirection: "column",
  },
  //*****數量******
  info__numberInputContainer: {
    display: "flex",
    flexDirection: "row",
    width: 200,
    justifyContent: "space-evenly",
    alignItems: "center",
    textAlign: "center",
  },
  info__number: {
    border: "2px solid",
    borderColor: orange[100],
    width: 50,
  },
  info__button: {
    minWidth: 20,
    maxWidth: 20,
    maxHeight: 20,
    //padding: 10,
  },
  //*****數量******

  info__rowContent: {
    margin: theme.spacing(1, 0),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
  },
  subinfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subinfo__columnContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonGroup: {
    display: "flex",
    width: "100%",
    height: 50,
    flexDirection: "row",
    //backgroundColor: orange[100],
    position: "absolute",
    bottom: 0,
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    fontSize: 28,
  },
  bigButton: {
    height: 50,
    width: "40%",
    fontSize: 20,
    color: "white",
  },
  //***賣家****
  userContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 10,
  },
  userPhoto: {
    borderRadius: "50%",
    overflow: "hidden",
    height: 25,
    margin: theme.spacing(0, 2),
  },
  userButton: {
    height: 25,
    minWidth: 30,
  },

  //***文字介紹*****/
  discribtionContainer: {
    margin: theme.spacing(3),
  },

  //***價表格*****/
  tableContainer: {
    width: "70%",
    margin: "0 auto",
  },
  table__header: {
    textAlign: "center",
    backgroundColor: orange[100],
  },
}));

function Product() {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const pid = urlSearchParams.get("pid");

  const classes = useStyles();

  const [region, setRegion] = useState([]);
  const [county, setCounty] = useState("");
  const [town, setTown] = useState("");

  const [data, setData] = useState({
    images: [],
    bill: {
      data: [],
      total: 0,
    },
  });
  const [orderCount, setOrderCount] = useState(1);

  const columns = React.useMemo(() => [
    {
      Header: "內容",
      accessor: "content",
    },
    {
      Header: "價格",
      accessor: "price",
    },
  ]);

  function handleOrderCount(opt) {
    var newCount = Math.min(
      Math.max(orderCount + opt, 1),
      data?.peopleCountLimit
    );
    setOrderCount(newCount);
  }

  useEffect(() => {
    //取得url商品資料
    getProductById(pid)
      .then((e) => {
        console.log(e.data());
        setData(e.data());
      })
      .then(
        //城市清單
        countyList().then((list) => {
          setRegion(list);
        })
      );
  }, []);

  useEffect(() => {
    console.log(region);
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
    <div>
      <Grid container className={classes.mainContainer}>
        <Grid
          item
          container
          component={Paper}
          className={classes.infoContainer}
        >
          {/* 圖片 */}
          <Grid item className={classes.imagesContaier}>
            <ParallaxCarousel
              data={Array(data?.images?.length)
                .fill()
                .map((_, i) => ({
                  id: i,
                  title: data.title,
                  subtittle: "",
                  image: data?.images[i],
                }))}
            />
          </Grid>

          {/* 資訊欄 */}
          <Grid className={classes.info}>
            {/* 標題 */}
            <Typography className={classes.info__title}>
              {data.title}
            </Typography>

            {/* TODO:評價 | 收藏 | 成交數量 */}
            <div className={classes.subinfo}>
              {/* 評價 */}
              <div className={classes.subinfo__columnContent}>
                <Rating readOnly></Rating>
                <Typography>({123})</Typography>
              </div>
              {/* 收藏 */}
              <div className={classes.subinfo__columnContent}>
                <IconButton>
                  <FavoriteIcon color="primary" />
                </IconButton>
                <Typography>({123})</Typography>
              </div>
              {/* 成交數量 */}
              <div className={classes.subinfo__columnContent}>
                <Typography>成交數量 {123}</Typography>
              </div>
            </div>

            {/* 區域 */}
            <div className={classes.info__rowContent}>
              <Typography color="textSecondary">
                {county}
                {town}
              </Typography>
            </div>

            {/* 人數上限 */}
            <div className={classes.info__rowContent}>
              <Typography
                color="textSecondary"
                className={classes.info__subTitle}
              >
                人數
              </Typography>
              {/* 增加 / 減少 按鈕 */}
              <div className={classes.info__numberInputContainer}>
                <Button
                  variant="contained"
                  tiny
                  className={classes.info__button}
                  onClick={() => {
                    handleOrderCount(-1);
                  }}
                >
                  -
                </Button>
                <Typography className={classes.info__number}>
                  {orderCount}
                </Typography>
                <Button
                  variant="contained"
                  small
                  className={classes.info__button}
                  onClick={() => {
                    handleOrderCount(1);
                  }}
                >
                  +
                </Button>

                <Typography color="textSecondary">
                  (上限{data.peopleCountLimit})
                </Typography>
              </div>
            </div>

            {/* 天數 */}
            <div className={classes.info__rowContent}>
              <Typography
                color="textSecondary"
                className={classes.info__subTitle}
              >
                {" "}
                天數{" "}
              </Typography>
              <Typography color="textSecondary">{data.duration}</Typography>
            </div>

            {/* 開放星期 */}
            <div className={classes.info__columnContent}>
              <Typography color="textSecondary">開放星期 </Typography>
              <WeekdaySelect
                readonly={true}
                value={data.openWeek}
              ></WeekdaySelect>
            </div>

            {/* 操作欄 */}
            <Grid
              item
              container
              style={{ position: "relative", height: "100%" }}
            >
              {/* 價格 | 按鈕 */}
              <div className={classes.buttonGroup}>
                <Typography className={classes.priceText} color="primary">
                  {currencyFormat(data?.bill?.total * orderCount)}
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  className={classes.bigButton}
                >
                  購買
                </Button>
              </div>
            </Grid>

            <div className={classes.userContainer}>
              <Link to={"/profile/" + auth.currentUser?.uid}>
                <img
                  src={auth.currentUser?.photoURL}
                  className={classes.userPhoto}
                  component={IconButton}
                />
              </Link>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.userButton}
              >
                聯絡
              </Button>
            </div>
          </Grid>
        </Grid>
        
        <DividerWithText>介紹</DividerWithText>
        {/* 介紹 */}
        <Grid item container className={classes.discribtionContainer}>
          <MUIRichTextEditor
            defaultValue={data.discribe}
            toolbar={false}
            readOnly
          />
        </Grid>

        <DividerWithText>明細表</DividerWithText>
        {/* 明細表 */}
        <Grid item className={classes.tableContainer} component={Card}>
          <EditableTable
            columns={columns}
            //map資料配合accessor
            data={data?.bill?.data?.map((x, i) => {
              return {
                content: x.content,
                price: x.price,
              };
            })}
            getHeaderProps={(state, rowInfo, column) => ({
              style: {
                height: 30,
                padding: 0,
                textAlign: "center",
                backgroundColor: orange[100],
              },
            })}
            getCellProps={(state, rowInfo, column) => ({
              style: {
                textAlign: "center",
              },
            })}
          />
        </Grid>
      
        <DividerWithText>選擇出遊日</DividerWithText>
        <Grid item>
          
        </Grid>

        <DividerWithText>留言</DividerWithText>
      
      </Grid>
    </div>
  );
}

function currencyFormat(num) {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
export default Product;
