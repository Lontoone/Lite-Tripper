import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
//import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
//import "react-tabs/style/react-tabs.css";
//import "../Components/Css/userPage.css";
import { firestore } from "../utils/firebase";
import Profile from "./Profile";
import {
  Paper,
  Card,
  CardContent,
  Avatar,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
  Tab,
  Tabs,
  Box,
} from "@material-ui/core";
import { TabPanel } from "@material-ui/lab";
import OrdersWithCalendar from "./OrdersWithCalendar";
function SellerPage() {
  const [tabValue, setTabValue] = React.useState(0);
  //網址參數
  const { uid } = useParams();
  const History = useHistory();

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  //操作Tab的程式
  function TabPanel({ children, value, index }) {
    return (
      <div hidden={value !== index} id={index}>
        {value === index && <Box p={4}>{children}</Box>}
      </div>
    );
  }

  return (
    <div>
      <Paper>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="商品管理" />
          <Tab label="訂單" />
          <Tab label="進行中" />
          <Tab label="已完成" />
        </Tabs>
        <TabPanel value={tabValue} index={0}></TabPanel>
        <TabPanel value={tabValue} index={1}>
          <OrdersWithCalendar
            isSeller={true}
            state={["created"]}
          ></OrdersWithCalendar>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <OrdersWithCalendar
            isSeller={true}
            state={["confirmed"]}
          ></OrdersWithCalendar>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <OrdersWithCalendar
            isSeller={true}
            showCalendar={false}
            state={["finished","rated"]}
          ></OrdersWithCalendar>
        </TabPanel>
      </Paper>
    </div>
  );
}

export default SellerPage;
