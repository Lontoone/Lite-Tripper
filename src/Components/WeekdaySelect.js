import { ButtonGroup, ListItem, ListSubheader } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
const useStyles = makeStyles((theme) => ({
  title: {
    paddingLeft: 0,
  },
  button: {
    height: 20,    
  },
  
  item: {
    padding: theme.spacing(0,2),
  },
}));

function WeekdaySelect() {
  const [selectedWeekdays, setSelectedWeekday] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const handleChange = (weekIndex) => {
    let newArr = [...selectedWeekdays];
    //true變false，false變true
    newArr[weekIndex] = !newArr[weekIndex];
    setSelectedWeekday(newArr);
  };

  const classes = useStyles();

  const days = ["一", "二", "三", "四", "五", "六", "七"];
  return (
    <ListItem className={classes.item}>
      <ListSubheader className={classes.title}>星期</ListSubheader>
      <ButtonGroup aria-label="contained primary button group" size="small">
        {Array(days.length)
          .fill()
          .map((_, i) => (
            <Button
              value={i}
              variant={selectedWeekdays[i] ? "contained" : "outlined"}
              color={selectedWeekdays[i] ? "secondary" : ""}
              className={classes.button}
              onClick={() => handleChange(i)}
            >
              {days[i]}
            </Button>
          ))}
      </ButtonGroup>
    </ListItem>
  );
}

export default WeekdaySelect;
