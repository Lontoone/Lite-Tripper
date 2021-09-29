import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { Paper } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Parser from "html-react-parser";
const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    objectFit: "cover",
    height: "100%",
    width: "100%",
    margin: "0 auto",
  },
  iframe: {
    overflow: "hidden",
    objectFit: "cover",
    //height: "100%",
    width: "105%",
    minWidth: 250,
    minHeight: 500,
    border: 0,
  },
  subPagesContainer: {
    width: "90%",
    margin: "0px auto",
    padding: "15px 0",
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
  const [dataCount, setDataCount] = useState(1);
  const [currentData, setCurrentData] = useState({
    description:""
  });
  const classes = useStyles();

  const [page, setPage] = React.useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
    setCurrentData(data[value]);
  };

  useEffect(() => {
    axios.get(url.href).then((res) => {
      console.log(res.data);
      setData(res.data.data);
      setDataCount(res.data.total);

      //預設第一筆資料
      console.log(res.data.data[0]);
      setCurrentData(res.data.data[0]);
      return res.data;
    });
  }, []);

  return (
    <div>
      {console.log(currentData.description)}
      <div>{ Parser(currentData?.description)} </div>
      <Paper className={classes.root}>
        {/* 推播分頁  */}
        <iframe
          className={classes.iframe}
          src={currentData.links ? currentData.links[0].src : {}}
          //scrolling="no"
        ></iframe>
      </Paper>
      <div className={classes.subPagesContainer}>
        <Pagination
          count={dataCount}
          page={page}
          onChange={handlePageChange}
          siblingCount={1}
          size="small"
          //color="primary"
        />
      </div>
    </div>
  );
}

export default TpiNewsFrame;
