import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { auth, firebase, firestore } from "../utils/firebase";
import {
  createOrder,
  currencyFormat,
  getProductById,
} from "../utils/ProductFuntion";
import {
  completeOrdersWithComments,
  getRatingComments,
  getOrderRatingComment,
  getUserData,
  parseState,
  removeFromShoppingCart,
  setOrderState,
} from "../utils/userFunction";
import "./Css/shoppingCartItemCard.css";
import FullScreenDialog from "../Components/FullScreenDialog";
import { Rating } from "@material-ui/lab";

function InProgressCard({
  _orderId,
  _orderData,
  _infoPairs,
  _actions,
  isSeller,
}) {
  const [productData, setProductData] = useState({});
  const [orderData, setOrderDate] = useState(_orderData);
  const [infos, setInfos] = useState(_infoPairs);
  const [actins, setActions] = useState(_actions);
  const [targetUser, setTargetUser] = useState({});
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [isBusy, setIsBusy] = useState(true);

  const getActionsByState = (target, state) => {
    if (target == "buyer") {
      if (state == "created") {
        return buyer__CreatedActions();
      }
      //
      else if (state == "confirmed") {
        return buyer_FinishActions();
      }
      //
      else if (state == "finished") {
        return buyer_RateActions();
      }
      //
      else if (state == "rated") {
        return readOnlyRating();
      }
    }
    //賣方方法
    else {
      if (state == "created") {
        return seller_CreatedActions();
      }
      //
      else if (state == "confirmed") {
        return <>行程未結束</>;
      }
      //
      else if (state == "finished") {
        return <>未評價</>;
      }
      //
      else if (state == "rated") {
        return readOnlyRating();
      }
    }
  };

  //買家: 創立、待確認的訂單
  const buyer__CreatedActions = () => {
    return <></>;
  };
  //買家: 成立的訂單
  const buyer_FinishActions = () => {
    console.log(orderData);
    console.log(
      orderData.title +
        " " +
        firebase.firestore.Timestamp.now().seconds +
        " vs " +
        orderData.endDate.seconds
    );
    return (
      <>
        <Button
          color={
            firebase.firestore.Timestamp.now().seconds >
            orderData.endDate.seconds
              ? "primary"
              : "disabled"
          }
          variant="contained"
          onClick={() => {
            //檢查日期，結束後才能完成
            if (
              firebase.firestore.Timestamp.now().seconds >
              orderData.endDate.seconds
            ) {
              console.log("已過期");
              setOrderState(_orderId, "finished").then((res) => {
                setAlert({
                  isLoading: false,
                  isShow: true,
                  title: "完成行程!",
                  content: "請記得給辛苦的導遊評價哦!",
                  buttonText: "確認",
                  closeCallback: () => {
                    window.location.reload();
                  },
                });
              });
            } else {
              console.log("未過期");
              setAlert({
                isLoading: false,
                isShow: true,
                title: "行程尚未完成!",
                content: "請待行程結束後再完成",
                buttonText: "確認",
                closeCallback: null,
              });
            }
          }}
        >
          完成
        </Button>
      </>
    );
  };

  //買家: 評價功能
  const buyer_RateActions = () => {
    return (
      <>
        <Rating
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        ></Rating>

        <TextField
          placeholder="評價..."
          multiline
          fullWidth
          margin="dense"
          rows={4}
          rowsMax={5}
          value={comment}
          inputProps={{ maxLength: 50 }}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            //完成並送出評價
            completeOrdersWithComments(
              _orderData.pid,
              _orderId,
              auth?.currentUser?.uid,
              rating,
              comment
            )
              .then(() => {
                setAlert({
                  isLoading: false,
                  isShow: true,
                  title: "完成!",
                  content: "感謝評價",
                  buttonText: "確認",
                  closeCallback: () => {
                    window.location.reload();
                  },
                });
              })
              .catch((err) => {
                setAlert({
                  isLoading: false,
                  isShow: true,
                  title: "錯誤",
                  content: "發生不明錯誤，請稍後再試",
                  buttonText: "確認",
                  closeCallback: () => {
                    console.log(err);
                  },
                });
              });
          }}
        >
          送出
        </Button>
      </>
    );
  };

  //唯讀評價
  const readOnlyRating = () => {
    getOrderRatingComment(_orderData.pid, _orderId).then((snapShot) => {
      var data = snapShot.data();
      console.log(data);
      setRating(data.rating);
      setComment(data.msg);
    });
    return (
      <>
        {isSeller && (
          //賣家看見留言者
          <div className="spci__avatorContaier">
            <Avatar src={targetUser?.photoURL}></Avatar>
            <a href={"/profile/" + targetUser?.id}>{targetUser?.name}</a>
          </div>
        )}
        <Rating value={rating} readOnly></Rating>
        <TextField readOnly value={comment}></TextField>
      </>
    );
  };

  //賣家: 新訂單
  const seller_CreatedActions = () => {
    return (
      <>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setOrderState(_orderId, "confirmed").then(() => {
              window.location.reload();
            });
          }}
        >
          接受
        </Button>
        <Button
          color="disabled"
          variant="contained"
          onClick={() => {
            setOrderState(_orderId, "denied");
            window.location.reload();
          }}
        >
          拒絕
        </Button>
      </>
    );
  };

  //賣家: 進行中
  const seller_InProgressActions = () => {
    return <></>;
  };

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
    //訂單資料
    setOrderDate(_orderData);
    console.log(_orderData);
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
    if (_orderData.pid == "") {
      //console.log("pid return " + pid);
      return;
    }
    getProductById(_orderData.pid)
      .then((res) => {
        console.log(res);
        setProductData(res.data());
        return res.data();
      })
      .then((pData) => {
        //取得對方用戶
        getUserData(isSeller ? orderData.buyer : orderData.seller).then(
          (res) => {
            setTargetUser(res.data());
          }
        );
      })
      .then(setIsBusy(false));
  }, [orderData]);

  if (isBusy) {
    return <>Loading</>;
  } else
    return (
      <div className="root" key={_orderId}>
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
            <div className="info-text">{_orderId}</div>
          </div>

          <div className="info-text-container">
            <div className="info-text">{isSeller ? "買家" : "賣家"}</div>
            <div className="info-text">{targetUser?.name}</div>
          </div>

          <div className="info-text-container">
            <div className="info-text">開始日期</div>
            <div className="info-text">
              {secToDate(_orderData.startDate?.seconds)}
            </div>
          </div>

          <div className="info-text-container">
            <div className="info-text">狀態</div>
            <div className="info-text">{parseState(_orderData.state)}</div>
          </div>

          <div className="info-text-container">
            <div className="info-text"></div>
            <div className="info-text">
              {_orderData.paid ? "已付款" : "未付款"}
            </div>
          </div>

          <div className="info-text-container">
            <div className="info-text">購買金額</div>
            <div className="info-money">
              {currencyFormat(productData?.bill?.total)}
            </div>
          </div>
        </div>

        {/* 方法 */}
        <div className="actionContainer">
          {isSeller ? (
            //賣家方法
            <>{getActionsByState("seller", _orderData.state)}</>
          ) : (
            //買家方法
            <>{getActionsByState("buyer", _orderData.state)}</>
          )}
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

export default InProgressCard;
