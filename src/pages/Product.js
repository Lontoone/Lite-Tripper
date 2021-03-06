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
  CircularProgress,
  Container,
} from "@material-ui/core";
import React, { useEffect, useState, useStyle } from "react";
import { Link, useLocation } from "react-router-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";
import ParallaxCarousel from "../Components/ParallaxCarousel";
import { countyList, townCode2Name } from "../utils/regionData";
import WeekdaySelect from "../Components/WeekdaySelect";
import DividerWithText from "../Components/DividerWithText";
import {
  getAllProductsList,
  getProductState,
  getProductById,
} from "../utils/ProductFuntion";
import CalendarPicker from "../Components/CalendarPicker";
import { Rating } from "@material-ui/lab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { orange } from "@material-ui/core/colors";
import MUIRichTextEditor from "mui-rte";
import EditableTable from "../Components/EditableTable";
import { auth } from "../utils/firebase";
import { addToShoppingCart, getUserData } from "../utils/userFunction";
import FullScreenDialog from "../Components/FullScreenDialog";
import zIndex from "@material-ui/core/styles/zIndex";
import "../utils/reset.css";
import ProductRating from "../Components/ProductRating";

const today = new Date();

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: "90vw",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
  },
  infoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  imagesContaier: {
    width: "70%",
    flex: 1,
    padding: "0 100px",
    margin: "0 auto",

    [theme.breakpoints.down("xs")]: {
      width: "90%",
      padding: "0",
      backgroundColor: "white",
    },
  },

  image: {
    display: "flex",
    height: "100%",
    maxHeight: "50vh",
    justifyContent: "center",
    alignContent: "center",
    margin: "auto",
  },

  info: {
    display: "flex",
    flexDirection: "column",
    width: 500,
    minHeight: 350,
    padding: theme.spacing(6, 5),
    backgroundColor: "#f9f9f9",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      padding: 0,
      margin: "0 auto",
    },
  },
  //?????????
  info__title: {},
  info__subTitle: {
    margin: theme.spacing(0, 2, 0, 0),
  },
  info__infoGroup: {
    display: "flex",
    flexDirection: "column",
  },
  //*****??????******
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
  //*****??????******

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
    //position: "absolute",
    bottom: 0,
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    fontSize: 28,
  },
  bigButton: {
    height: 50,
    width: 150,
    fontSize: 20,
    color: "white",
  },
  //***??????****
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

  //***????????????*****/
  discribtionContainer: {
    width: "80%",
    //margin: theme.spacing(3),
    margin: "auto",
    lineHeight: "1.3em",
  },

  //***?????????*****/
  tableContainer: {
    width: "70%",
    margin: "0 auto",
  },
  table__header: {
    textAlign: "center",
    backgroundColor: orange[100],
  },

  /**Loading bar */
  loadingContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "#191919A5",
    zIndex: 99,
    display: "flex",
    borderRadius: "5px",
  },
  loadingCircular: {
    margin: "auto",
  },
}));

function Product() {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const pid = urlSearchParams.get("pid");

  const classes = useStyles();

  const [isBusy, setIsBusy] = useState(true);

  const [region, setRegion] = useState([]);
  const [county, setCounty] = useState("");
  const [town, setTown] = useState("");
  const [seller,setSeller]=useState({});

  const [data, setData] = useState({
    images: [],
    bill: {
      data: [],
      total: 0,
    },
  });
  const [orderData, setOrderData] = useState({
    quantity: 1,
    startDate: null,
    endDate: null,
    duration: 1,
    /*
    price:1,
    seller:null,
    buyer:null,*/
  });
  const [alert, setAlert] = useState({
    isLoading: false,
    isShow: false,
    title: "",
    content: "",
    buttonText: "",
    closeCallback: null,
  });

  const columns = React.useMemo(() => [
    {
      Header: "??????",
      accessor: "content",
    },
    {
      Header: "??????",
      accessor: "price",
    },
  ]);

  //?????? ????????????
  function handleOrderCount(opt) {
    var newCount = Math.min(
      Math.max(orderData.quantity + opt, 1),
      data?.peopleCountLimit
    );
    //setOrderCount(newCount);
    setOrderData((old) => {
      let update = Object.assign({}, old);
      update.quantity = newCount;
      return update;
    });
  }

  useEffect(() => {
    //??????url????????????
    getProductById(pid)
      .then((e) => {
        console.log(e.data());
        setData(e.data());

        //????????????????????????
        setOrderData((old) => {
          let update = Object.assign({}, old);
          update.duration = e.data().duration;
          return update;
        });

        //??????????????????
        getUserData(e.data().seller).then((res)=>{
          console.log(res.data());
          setSeller(res.data());
        })
      })      
      .then(
        //????????????
        countyList().then((list) => {
          console.log(list);
          setRegion(list);
        })
        .then(setIsBusy(false))
      )
  }, []);

  useEffect(() => {
    console.log(region);
    //??????????????????
    region.forEach((a) => {
      if (a.code.value == data.county) {
        setCounty(a.cityname.value);
      }
    });

    //??????????????????
    townCode2Name(data.county, data.town, setTown);
  }, [region]);

  if (isBusy) {
    return <></>;
  } else
    return (
      <div style={{ position: "relative" }}>
        <Grid container className={classes.mainContainer}>
          <Grid
            item
            container
            component={Paper}
            className={classes.infoContainer}
          >
            {/* ?????? 
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
          </Grid>*/}
            {/* ?????? */}
            <Grid item className={classes.imagesContaier}>
              <img src={data.thumbnail} className={classes.image}></img>
            </Grid>

            {/* ????????? */}
            <Grid className={classes.info}>
              {/* ?????? */}
              <Typography className={classes.info__title}>
                {data.title}
              </Typography>

              {/* TODO:?????? | ?????? | ???????????? */}
              <div className={classes.subinfo}>
                {/* ?????? */} 
                <ProductRating></ProductRating>

                {/* ?????? */}
                <div className={classes.subinfo__columnContent}>
                  <IconButton>
                    <FavoriteIcon color="primary" />
                  </IconButton>
                  <Typography>({0})</Typography>
                </div>
                {/* ???????????? */}
                <div className={classes.subinfo__columnContent}>
                  <Typography>???????????? {0}</Typography>
                </div>
              </div>

              {/* ?????? */}
              <div className={classes.info__rowContent}>
                <Typography color="textSecondary">
                  {county}
                  {town}
                </Typography>
              </div>

              {/* ???????????? */}
              <div className={classes.info__rowContent}>
                <Typography
                  color="textSecondary"
                  className={classes.info__subTitle}
                >
                  ??????
                </Typography>
                {/* ?????? / ?????? ?????? */}
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
                    {orderData.quantity}
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
                    (??????{data.peopleCountLimit})
                  </Typography>
                </div>
              </div>

              {/* ?????? */}
              <div className={classes.info__rowContent}>
                <Typography
                  color="textSecondary"
                  className={classes.info__subTitle}
                >
                  {" "}
                  ??????{" "}
                </Typography>
                <Typography color="textSecondary">{data.duration}</Typography>
              </div>

              {/* ???????????? */}
              <div className={classes.info__columnContent}>
                <Typography color="textSecondary">???????????? </Typography>
                <WeekdaySelect
                  readonly={true}
                  value={data.openWeek}
                ></WeekdaySelect>
              </div>

              {/* ????????? */}
              <Grid
                item
                container
                style={{ position: "relative", height: "100%" }}
              >
                {/* ?????? | ?????? */}
                <div className={classes.buttonGroup} id="buttonGroup">
                  <Typography className={classes.priceText} color="primary">
                    {currencyFormat(data?.bill?.total * orderData.quantity)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.bigButton}
                    onClick={
                      auth.currentUser && orderData.startDate
                        ? () => {
                            //??????
                            setAlert({ isLoading: true }); //??????

                            addToShoppingCart(
                              auth.currentUser.uid,
                              pid,
                              orderData
                            )
                              .then(() => {
                                setAlert({
                                  isLoading: false,
                                  isShow: true,
                                  title: "????????????",
                                  content: "",
                                  buttonText: "??????",
                                  closeCallback: () => {},
                                });
                              })
                              .catch((err) => {
                                console.log(err);
                                setAlert({
                                  isLoading: false,
                                  isShow: true,
                                  title: "????????????",
                                  content: "????????????????????????????????????",
                                  buttonText: "??????",
                                  closeCallback: () => {},
                                });
                              });
                          }
                        : () => {
                            console.log(orderData.startDate);
                            //????????????
                            if (!auth.currentUser) {
                              window.location.href = "/signIn";
                            }
                            if (!orderData.startDate)
                              window.location.hash = "#calendar";
                          }
                    }
                  >
                    {/* ???????????? */}
                    <div
                      className={classes.loadingContainer}
                      style={
                        alert.isLoading
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <CircularProgress
                        className={classes.loadingCircular}
                      ></CircularProgress>
                    </div>
                    ??????
                  </Button>
                </div>
              </Grid>

              <div className={classes.userContainer}>
                <Link to={"/profile/" + seller?.id}>
                  <img
                    src={seller?.photoURL}
                    className={classes.userPhoto}
                    component={IconButton}
                  />
                </Link>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.userButton}
                  onClick={()=>{
                    window.location.href="/chat/"+seller?.id;
                  }}
                >
                  ??????
                </Button>
              </div>
            </Grid>
          </Grid>

          <DividerWithText>??????</DividerWithText>
          {/* ?????? */}
          <Grid item container className={classes.discribtionContainer}>
            <MUIRichTextEditor
              defaultValue={data.discribe}
              toolbar={false}
              readOnly
            />
          </Grid>

          <DividerWithText>?????????</DividerWithText>
          {/* ????????? */}
          <Grid item className={classes.tableContainer} component={Card}>
            <EditableTable
              columns={columns}
              //map????????????accessor
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

          <DividerWithText>???????????????</DividerWithText>
          <Grid item className={classes.tableContainer} id="calendar">
            {data.duration && (
              <CalendarPicker
                duration={data.duration}
                year={today.getFullYear()}
                month={today.getMonth()}
                avaliableWeekDays={data.openWeek}
                onSelectCallback={(e) =>
                  setOrderData((old) => {
                    let update = Object.assign({}, old);
                    update.startDate = e.date;
                    return update;
                  })
                }
              ></CalendarPicker>
            )}
          </Grid>

          <DividerWithText>??????</DividerWithText>
        </Grid>

        {/* ????????????- */}
        <FullScreenDialog
          isOpen={alert.isShow}
          title={alert.title}
          content={alert.content}
          buttonText={alert.buttonText}
          closeCallback={() => {
            //setShowAlert(false);
            setAlert({ isShow: false });
            if (alert.closeCallback) {
              alert.closeCallback();
            }
          }}
        />
      </div>
    );
}

function currencyFormat(num) {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
export default Product;
