import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { firebase, firestore } from "../utils/firebase";
import { currencyFormat, getProductById } from "../utils/ProductFuntion";
import {
  getUserData,
  removeFromShoppingCart,
  createOrder,
} from "../utils/userFunction";
import "./Css/shoppingCartItemCard.css";
import FullScreenDialog from "../Components/FullScreenDialog";

function ShoppingCartItemCard({ _pid, _orderData, _infoPairs, _actions }) {
  const [pid, setPid] = useState(_pid);
  const [productData, setProductData] = useState({});
  const [orderData, setOrderDate] = useState(_orderData);
  const [infos, setInfos] = useState(_infoPairs);
  const [actins, setActions] = useState(_actions);
  const [sellerData, setSellerData] = useState({});

  const [isBusy, setIsBusy] = useState(true);

  //通知popUp
  const [alert, setAlert] = useState({
    isLoading: false,
    isShow: false,
    title: "",
    content: "",
    buttonText: "",
    closeCallback: null,
  });

  useEffect(() => {
    //設定pid初始
    setPid(_pid);
  }, [_pid]);

  useEffect(() => {
    //購物車資料
    setOrderDate(_orderData);
  }, [_orderData]);

  useEffect(() => {
    //細項資訊
    setInfos(_infoPairs);
  }, [_infoPairs]);

  useEffect(() => {
    //操作按鈕
    setActions(_actions);
  }, [_actions]);

  useEffect(() => {
    //取得商品資料
    if (pid == "") {
      console.log("pid return " + pid);
      return;
    }
    getProductById(pid)
      .then((res) => {
        console.log(res);
        setProductData(res.data());
        return res.data();
      })
      .then((pData) => {
        //取得賣家
        console.log(pData);
        getUserData(pData.seller).then((res) => {
          setSellerData(res.data());
        });
      })
      .then(setIsBusy(false));
  }, [pid, orderData]);

  if (isBusy) {
    return <>Loading</>;
  } else
    return (
      <div className="root" key={pid}>
        {/* 圖片 */}
        <div className="mediaContainer">
          <img src={productData?.thumbnail} />
        </div>

        {/* 描述 */}
        <div className="infoContainer">
          <div className="info-title">{productData?.title}</div>

          {infos &&
            infos.map((info) => (
              <div className="info-text-container">
                <div className="info-text">{info.key}</div>
                <div className="info-text">{info.value}</div>
              </div>
            ))}

          <div className="info-text-container">
            <div className="info-text">編號</div>
            <div className="info-text">{pid}</div>
          </div>

          <div className="info-text-container">
            <div className="info-text">賣家</div>
            <div className="info-text">{sellerData?.name}</div>
          </div>

          <div className="info-text-container">
            <div className="info-text">開始日期</div>
            <div className="info-text">
              {secToDate(_orderData.startDate?.seconds)}
            </div>
          </div>

          <div className="info-text-container">
            <div className="info-text">購買金額</div>
            <div className="info-money">
              {currencyFormat(productData?.bill.total)}
            </div>
          </div>
        </div>

        {/* 方法 */}
        <div className="actionContainer">
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              createOrder(pid, orderData, productData)
                .then((suceess) => {
                  console.log("odder 成功");
                  setAlert({
                    isLoading: false,
                    isShow: true,
                    title: "購買成功",
                    content: "",
                    buttonText: "確認",
                    closeCallback: () => {
                      window.location.reload();
                    },
                  });
                })
                .catch((err) => {
                  console.log(err);
                  setAlert({
                    isLoading: false,
                    isShow: true,
                    title: "購買失敗",
                    content: "發生不明原因，請稍後再試",
                    buttonText: "確認",
                    closeCallback: () => {},
                  });
                });
            }}
          >
            購買
          </Button>

          <Button
            color="disabled"
            variant="contained"
            onClick={() => {
              removeFromShoppingCart(orderData)
                .then(() => {
                  window.location.reload();
                })
                .catch(() => {
                  console.log("removed");
                });
            }}
          >
            取消
          </Button>
        </div>

        <FullScreenDialog
          isOpen={alert.isShow}
          title={alert.title}
          content={alert.content}
          buttonText={alert.buttonText}
          closeCallback={() => {
            //setShowAlert(false);
            setAlert({ isShow: false });
            if (alert.closeCallback) {
              alert.closeCallback();
            }
          }}
        />
      </div>
    );
}

const secToDate = (sec) => {
  var curdate = new Date(null);
  curdate.setTime(sec * 1000);
  return curdate.toLocaleDateString(navigator.language);
};

export default ShoppingCartItemCard;
