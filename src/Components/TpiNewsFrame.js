import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    objectFit: "cover",
    height: "100%",
    width: "100%",    
    margin:"0 auto"
  },
  iframe: {
    overflow: "hidden",
    objectFit: "cover",
    //height: "100%",        
    width: "105%",
    minWidth:250,
    minHeight:500,
    border: 0,
  },
}));

function TpiNewsFrame() {
  const today = new Date();
  let beginTime = new Date().setMonth(today.getMonth()); //今天yyyy-mm-dd
  let endTime = new Date().setMonth(today.getMonth() + 5); //結束: 3個月後
  endTime = new Date(endTime).toISOString().slice(0, 10);
  beginTime = new Date(beginTime).toISOString().slice(0, 10); //結束: 3個月後

  //https://www.travel.taipei/open-api/swagger/ui/index#/Events/Events_News
  const tpiNewsUrl =
    "https://www.travel.taipei/open-api/zh-tw/Events/Activity?";
  var url = new URL(tpiNewsUrl);
  url.searchParams.append("begin", beginTime);
  url.searchParams.append("end", endTime);
  url.searchParams.append("page", 1);
  console.log(url.href);

  const [data, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axios.get(url.href).then((res) => {
      console.log(res.data);
      setData(res.data.data);
      return res.data;
    });
  }, []);

  return (
    <Paper className={classes.root}>
      <iframe
        className={classes.iframe}
        src={data[0]?.links[0].src}
        //scrolling="no"
      ></iframe>
    </Paper>
  );
}

export default TpiNewsFrame;
