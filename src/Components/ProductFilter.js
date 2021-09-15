import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  List,
  ListSubheader,
  Paper,
  Icon,
  Button,
  Container,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import RegionSelect from "../Components/RegionSelect";
import PriceRangeBox from "../Components/PriceRangeBox";
import RatingSelect from "../Components/RatingSelect";
import WeekdaySelect from "../Components/WeekdaySelect";

const useStyles = makeStyles((theme) => ({
  root: {},
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
}));

function ProductFilter() {
  const classes = useStyles();
  const [minPrice, setminPrice] = useState(0);
  const [maxPrice, setmaxPrice] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("min ",minPrice, " max ", maxPrice);
    //console.log(e.target.elements);
  };

  return (
    <Paper component="form" onSubmit={(e) => handleSubmit(e)} elevation={0}>
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
        <RegionSelect />
        {/* 價格選擇 */}
        <PriceRangeBox
          setMin={setminPrice}
          setMax={setmaxPrice}
        ></PriceRangeBox>
        {/* 星等選擇 */}
        <RatingSelect></RatingSelect>
        {/* 星期選擇 */}
        <WeekdaySelect></WeekdaySelect>
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
