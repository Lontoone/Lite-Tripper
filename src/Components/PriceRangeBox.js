import {
  FormControl,
  InputAdornment,
  InputLabel,
  ListItem,
  ListSubheader,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-evenly",
    alignItems: "center",
    //margin: theme.spacing(0, 2),
    
  },
  field: {
    display: "flex",
    padding: theme.spacing(0, 1),
    width: 100,
    height:30,
  },
  text: {
    display: "flex",
    flexGrow: 0,
    width: "50px",
    justifyContent:"center",
  },
  title:{
    paddingLeft:0,
  },
  
  item: {
    padding: theme.spacing(0,2),
  },
}));

function PriceRangeBox({setMin,setMax}) {
  const classes = useStyles();
  
  return (
    <ListItem variant="outlined" className={classes.item}>
      <ListSubheader className={classes.title}>金額</ListSubheader>
      <div className={classes.root}>
        <OutlinedInput
          name="minPirce"
          className={classes.field}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          labelWidth={0}
          onChange={(e)=>setMin(e.target.value)}
        />
        <Typography className={classes.text}> 至 </Typography>
        <OutlinedInput
          name="maxPirce"
          className={classes.field}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          labelWidth={0}
          onChange={(e)=>setMax(e.target.value)}
        />
      </div>
    </ListItem>
  );
}

export default PriceRangeBox;
