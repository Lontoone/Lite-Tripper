import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
//import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
//import "react-tabs/style/react-tabs.css";
//import "../Components/Css/userPage.css";
import { auth, firestore } from "../utils/firebase";
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
import ShoppingCart from "./ShoppingCart";
import OrdersWithCalendar from "./OrdersWithCalendar";
function UserPage() {
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
        {auth?.currentUser?.uid === uid ? (
          <>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="個人資訊" />
              <Tab label="購物車" />
              <Tab label="進行中" />
              <Tab label="待評價" />
              <Tab label="已完成" />
            </Tabs>
            {/* 個人資訊 */}
            <TabPanel value={tabValue} index={0}>
              <Profile />
            </TabPanel>
            {/* 購物車 */}
            <TabPanel value={tabValue} index={1}>
              <ShoppingCart></ShoppingCart>
            </TabPanel>

            {/* 進行中 */}
            <TabPanel value={tabValue} index={2}>
              <OrdersWithCalendar
                isSeller={false}
                state={["confirmed", "created"]}
              ></OrdersWithCalendar>
            </TabPanel>

            {/* 待評價 */}
            <TabPanel value={tabValue} index={3}>
              <OrdersWithCalendar
                isSeller={false}
                state={["finished"]}                
                showCalendar={false}
              ></OrdersWithCalendar>
            </TabPanel>

            {/* 已完成 */}
            <TabPanel value={tabValue} index={4}>
              <OrdersWithCalendar
                isSeller={false}
                state={["rated"]}
                showCalendar={false}
              ></OrdersWithCalendar>
            </TabPanel>
          </>
        ) : (
          <>
            {/* 別人的頁面 */}
            <Profile />
          </>
        )}
      </Paper>
    </div>
  );
}

export default UserPage;
