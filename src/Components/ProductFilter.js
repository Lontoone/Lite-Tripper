import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  List,
  ListSubheader,
  Paper,
  Icon,
  Button,
  Container,
  ListItem,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import RegionSelect from "../Components/RegionSelect";
import PriceRangeBox from "../Components/PriceRangeBox";
import RatingSelect from "../Components/RatingSelect";
import WeekdaySelect from "../Components/WeekdaySelect";
import { getProductsByFiltered } from "../utils/ProductFuntion";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    maxHeight: "350px",
  },
  submitButton: {
    margin: "auto",
    display: "flex",
    //marginBottom: 20,
    width: "70%",
    height: 25,
    "&:hover": {
      backgroundColor: orange[200],
    },
  },
  title: {
    //paddingLeft: 0,
    //fontSize: 12,
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "row",
  },
  subContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "start",
  },
}));

function ProductFilter({ submitCallback }) {
  const classes = useStyles();
  const [minPrice, setminPrice] = useState(0);
  const [maxPrice, setmaxPrice] = useState(0);

  const [weekDays, setWeekDays] = useState([true,true,true,true,true,true,true]);
  const [rating, setRating] = useState(5);

  const [county, setCounty] = useState("");
  const [town, setTown] = useState("");

  //送出搜尋表單:
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("min ", minPrice, " max ", maxPrice);
    console.log("week days ",weekDays);
    console.log("rating ", rating);
    console.log("region code ", county, " ", town);

    getProductsByFiltered({
      county: county,
      town: town,
      orderBy:"bill.total",
      minPrice: minPrice,
      maxPrice: maxPrice,
      openWeek:weekDays,
    }).then((res) => {
      console.log(res);
      if (submitCallback) {
        submitCallback(res);
      }
    });
  };

  return (
    <Paper
      component="form"
      onSubmit={(e) => handleSubmit(e)}
      elevation={0}
      className={classes.root}
    >
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            商品篩選
          </ListSubheader>
        }
      >
        {/* 區域選擇 */}
        <RegionSelect
          county_value={county}
          town_value={town}
          setCounty={setCounty}
          setTown={setTown}
        />
        {/* 價格選擇 */}
        <PriceRangeBox
          setMin={setminPrice}
          setMax={setmaxPrice}
        ></PriceRangeBox>
        {/* 星等選擇 */}
        <div className={classes.ratingContainer}>
          <ListSubheader className={classes.title}> 星等</ListSubheader>
          <RatingSelect setRating={setRating}></RatingSelect>
        </div>

        {/* 星期選擇 */}
        <ListItem className={classes.subContainer}>
          <ListSubheader className={classes.title}>星期</ListSubheader>
          <WeekdaySelect setWeekday={setWeekDays}></WeekdaySelect>
        </ListItem>
      </List>
      <Button
        variant="contained"
        color="third"
        className={classes.submitButton}
        //startIcon={<Icon/>}
        type="submit"
      >
        確認
      </Button>
    </Paper>
  );
}

export default ProductFilter;
