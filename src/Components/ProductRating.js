import { makeStyles, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { getProductRatingDoc } from "../utils/userFunction";
import { Link, useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  subinfo__columnContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}));
function ProductRating() {
  const classes = useStyles();

  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const pid = urlSearchParams.get("pid");

  useEffect(() => {
    getProductRatingDoc(pid)
      .then((res) => {
        setConut(res.data()?.count);
        setRating(res.data()?.averageRating);
        console.log(res.data());
      })
      .then(setIsBusy(false));
  }, []);

  const [count, setConut] = useState(0);
  const [rating, setRating] = useState(0);
  const [isBusy, setIsBusy] = useState(true);

  if (isBusy) {
    return <></>;
  } else
    return (
      <>
        {/* 評價 */}
        <div className={classes.subinfo__columnContent}>
          <Rating value={rating} readOnly></Rating>
          <Typography>({count})</Typography>
        </div>
      </>
    );
}

export default ProductRating;
