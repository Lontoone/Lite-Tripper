import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Container,
  CardMedia,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link, TO } from "react-router-dom";
import CartItem from "../Components/CartItem";
import ShoppingCartItemCard from "../Components/ShoppingCartItemCard";
import { auth } from "../utils/firebase";
import { getShoppingCart } from "../utils/userFunction";

import "../Components/Css/ShoppingCart.css";
import ReadonlyCalendar from "../Components/ReadonlyCalendar";
import DividerWithText from "../Components/DividerWithText";
//import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function ShoppingCart() {
  //網址參數
  const { uid } = useParams();
  const History = useHistory();

  const [dates, setDates] = useState([]);
  const [cart, setCart] = useState([{ pid: "" }]);

  const [isbusy, setIsBusy] = useState(true);


  useEffect(() => {
    //讀取購物車
    getShoppingCart(uid)
      .then((res) => {
        var data = res.data();
        console.log(data);
        setCart(data.shoppingCart);

        //排入預定日期
        setDates((old) => {
          const _temp = [];
          console.log(old);
          for (var i = 0; i < data.shoppingCart.length; i++) {
            var start = new Date(null);
            //firebase秒數換算成日期
            start.setTime(data.shoppingCart[i].startDate?.seconds * 1000);
            //加入開始日與期間長度
            var _data = {
              startDate: start,
              duration: data.shoppingCart[i].duration,
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

  useEffect(() => {
    console.log(dates);
  }, [dates]);

  if (isbusy) {
    return <></>;
  } else
    return (
      <div className="shopping-cart-root">
        {/* 日曆 */}
        <div className="calendarContaier">
          <ReadonlyCalendar readonly={true} datas={dates}></ReadonlyCalendar>
        </div>
        {/* 購物車 */}
        <DividerWithText>購物車</DividerWithText>
        <div className="leftContainer">
          <div className="cartContainer">
            <div className="cart">
              {cart &&
                cart.map((item) => (
                  <ShoppingCartItemCard
                    _pid={item.pid}
                    _orderData={item}
                  ></ShoppingCartItemCard>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
}

export default ShoppingCart;
