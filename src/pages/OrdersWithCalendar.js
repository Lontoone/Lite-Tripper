import React, { useState, useEffect } from "react";

import "../Components/Css/ShoppingCart.css";
import ReadonlyCalendar from "../Components/ReadonlyCalendar";
import DividerWithText from "../Components/DividerWithText";
//import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getInProgressOrders, getOrdersByState } from "../utils/userFunction";
import { auth } from "../utils/firebase";
import InProgressCard from "../Components/InProgressCard";
import { Typography } from "@material-ui/core";
//進行中商品
/*
備註: 商品狀態


*/
function OrdersWithCalendar({ isSeller, state,showCalendar=true }) {
  const [dates, setDates] = useState([]);
  const [orders, setOrders] = useState([{ pid: "" }]);

  const [isbusy, setIsBusy] = useState(true);
  console.log(state);

  useEffect(() => {
    //取得order的文件們
    //getInProgressOrders(auth.currentUser?.uid)
    var userType=isSeller?"seller":"buyer";
    getOrdersByState(auth.currentUser?.uid,userType, state)
      .then((res) => {
        const _orders = [];
        for (var i = 0; i < res.docs.length; i++) {
          _orders.push(res.docs[i]);
        }
        setOrders(_orders);
        console.log(_orders);

        //排入預定日期
        setDates((old) => {
          const _temp = [];
          for (var i = 0; i < _orders.length; i++) {
            var start = new Date(null);
            //firebase秒數換算成日期
            start.setTime(_orders[i].data().startDate?.seconds * 1000);

            //加入開始日與期間長度
            var _data = {
              startDate: start,
              duration: _orders[i].data().duration,
            };
            _temp.push(_data);
          }
          return _temp;
        });
      })
      .then(() => {
        setIsBusy(false);
      });
  }, []);

  if (isbusy) {
    return <>Loading</>;
  } else
    return (
      <div className="shopping-cart-root">
        {orders.length > 0 ? (
          <>
            {/* 日曆 */}
            <div className="calendarContaier" style={showCalendar?{}:{display:"none"}}>
              <ReadonlyCalendar
                readonly={true}
                datas={dates}
              ></ReadonlyCalendar>
            </div>
            <div className="leftContainer">
              <div className="cartContainer">
                <div className="cart">
                  {orders &&
                    orders.map((item) => (
                      <InProgressCard
                        _pid={item.data().pid}
                        _orderId={item.id}
                        _orderData={item.data()}
                        isSeller={isSeller}
                      ></InProgressCard>
                    ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* 無內容 */}
            <Typography color="textSecondary"> 無內容</Typography>
          </>
        )}
      </div>
    );
}

export default OrdersWithCalendar;
