import { Box, ListItem, ListSubheader } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto 0",
    display: "flex",
    flexDirection: "row",
    padding: 0,
  },
  title: {
    paddingLeft: 0,
  },
  item: {
    padding: theme.spacing(0, 2),
  },
}));
function RatingSelect({ setRating }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box
        className={classes.root}
        component="fieldset"
        mb={3}
        borderColor="transparent"
      >
        <Rating
          name="ratng"
          //value={value}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </Box>
    </div>
  );
}

export default RatingSelect;
