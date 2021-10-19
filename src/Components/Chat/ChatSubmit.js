import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Drawer,
  List,
  ListItem,
} from "@material-ui/core";
import { firestore, firebase } from "../../utils/firebase";
import { getLoginData } from "../../utils/localStorge";
import { getUserProducts } from "../../utils/userFunction";

import ChatProductCard from "./ChatProductCard";
function ChatSubmit({ chatId, reciverid }) {
  //對話框相關
  const [text, setText] = useState("");
  const [textError, setTextError] = useState(false);
  //控制商品抽屜開啟
  const [shopListOpen, setShopListOpen] = useState(false);
  //控制商品抽屜開啟
  const toggleDrawer = (open) => (event) => {
    console.log("我要", open);
    setShopListOpen(open);
  };
  //取得發送者的資料
  const { photoURL, id } = getLoginData();
  //取得商品列表
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getUserProducts(reciverid).then((e) => {
      console.log(e, Array.isArray(e));
      setProducts(e);
    });
  }, [reciverid]);

  //商品列表的內容
  const Shoplist = () => {
    return (
      <List>
        {products?.length === 0 ?  (
          <p>目前該用戶無商品</p>
        ):(
          products.map((product, index) => {
            return (
              <div
                key={product.id}
                onClick={(e) => {
                  handleClickShop(product.id);
                }}
              >
                <ListItem divider button>
                  <ChatProductCard
                    datasnapShot={products[index]}
                    setText={setText}
                  ></ChatProductCard>
                </ListItem>
              </div>
            );
          })
        )}
      </List>
    );
  };

  //處裡商品列表點下去的事件
  //TODO: 解決無法傳入參數的問題
  const handleClickShop = async (product) => {
    await firestore
      .collection("chat")
      .doc(chatId)
      .collection("message")
      .doc()
      .set({
        text: product,
        type: "card",
        photoURL,
        id,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      });

    setShopListOpen(false);
  };
  //對話送出
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTextError(false);
    if (text == "") {
      setTextError(true);
    }
    if (text) {
      await firestore
        .collection("chat")
        .doc(chatId)
        .collection("message")
        .doc()
        .set({
          text: text,
          photoURL,
          id,
          time: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setText("");
    }
  };
  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={toggleDrawer(true)}
            >
              商品列表
            </Button>
            <Drawer
              anchor={"bottom"}
              open={shopListOpen}
              onClose={toggleDrawer(false)}
            >
              {Shoplist()}
            </Drawer>
          </Grid>
          <Grid item xs={6}>
            <TextField
              onChange={(e) => setText(e.target.value)}
              label="輸入訊息...."
              color="secondary"
              variant="outlined"
              fullWidth
              required
              value={text}
              error={textError}
            />
          </Grid>
          <Grid item xs={3}>
            <Button type="submit" color="secondary" variant="contained">
              送出
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default ChatSubmit;
