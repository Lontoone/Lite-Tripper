import React, { useEffect, useState } from "react";

import ChatMsg from "@mui-treasury/components/chatMsg/ChatMsg";
import { getLoginData } from "../../utils/localStorge";

import { getProductById } from "../../utils/ProductFuntion";
import ProductCard from "../ProductCard";
import { Container } from "@material-ui/core";

function ChatDialog({ message }) {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  //取得現在登入者資料
  const currentUid = getLoginData().id;

  const getData = () => {
    if (message?.type === "card") {
      getProductById(message.text).then((datasnapShot) => {
        setProductData(datasnapShot);
        setLoading(false);
      });
    }
  };
  useEffect(async () => {
    await getData();
  }, []);

  if (loading) {
    return (
      <ChatMsg
        key={message.docid}
        side={currentUid === message.id ? "right" : "left"}
        avatar={message.photoURL}
        messages={["載入中"]}
      />
    );
  }
  return (
    <>
      {message?.type === "card" ? (
        // <p>dd</p>
        <ChatMsg
          key={message.docid}
          side={currentUid === message.id ? "right" : "left"}
          avatar={message.photoURL}
          messages={[<ProductCard datasnapShot={productData}></ProductCard>]}
        />
      ) : (
        <ChatMsg
          key={message.docid}
          side={currentUid === message.id ? "right" : "left"}
          avatar={message.photoURL}
          messages={[message.text]}
        ></ChatMsg>
      )}
    </>
  );
}

export default ChatDialog;
