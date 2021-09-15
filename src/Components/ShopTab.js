import { List, ListItem, Container, Card, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ShopTab({ uid }) {
  const [products, setProducts] = useState([
    {
      pid: "1",
      title: "一中街一日遊",
      county: "台中市",
      town: "北區",
      rating: "4",
      price: "100",
      discribe:
        "Mibro品牌是由小尋所研發生產，小尋是由 NOKIA 等知名品牌所投資的科技品牌，在無線通訊領域已經有超過 15 年以上經驗，是生態鏈智慧手錶第一大廠，更在海外市場銷售超過數十億的佳績，品質有口皆碑。本次，特別攜手睿濬國際推出亞洲首發唯一繁體中文與通過 NCC 認證的【Mibro color智慧手錶】，為台灣用戶帶來專屬台灣版調校、容易入手的價格以及完整的售後服務，讓大家安心入手，享受科技生活！",
      thumbnail:
        "https://p2.bahamut.com.tw/B/2KU/09/497beea0399f4826c9560024091dk9l5.JPG",
    },
    {
      pid: "2",
      title: "一中街一日遊",
      county: "台中市",
      town: "北區",
      rating: "4",
      price: "100",
      discribe:
        "Mibro品牌是由小尋所研發生產，小尋是由 NOKIA 等知名品牌所投資的科技品牌，在無線通訊領域已經有超過 15 年以上經驗，是生態鏈智慧手錶第一大廠，更在海外市場銷售超過數十億的佳績，品質有口皆碑。本次，特別攜手睿濬國際推出亞洲首發唯一繁體中文與通過 NCC 認證的【Mibro color智慧手錶】，為台灣用戶帶來專屬台灣版調校、容易入手的價格以及完整的售後服務，讓大家安心入手，享受科技生活！",
      thumbnail:
        "https://p2.bahamut.com.tw/B/2KU/09/497beea0399f4826c9560024091dk9l5.JPG",
    },
    {
      pid: "3",
      title: "一中街一日遊",
      county: "台中市",
      town: "北區",
      rating: "4",
      price: "100",
      discribe:
        "Mibro品牌是由小尋所研發生產，小尋是由 NOKIA 等知名品牌所投資的科技品牌，在無線通訊領域已經有超過 15 年以上經驗，是生態鏈智慧手錶第一大廠，更在海外市場銷售超過數十億的佳績，品質有口皆碑。本次，特別攜手睿濬國際推出亞洲首發唯一繁體中文與通過 NCC 認證的【Mibro color智慧手錶】，為台灣用戶帶來專屬台灣版調校、容易入手的價格以及完整的售後服務，讓大家安心入手，享受科技生活！",
      thumbnail:
        "https://p2.bahamut.com.tw/B/2KU/09/497beea0399f4826c9560024091dk9l5.JPG",
    },
  ]);
  useEffect(() => {}, []);
  return (
    <List>
      {products.map((product) => (
        <ListItem divider key={product.pid}>
          <div style={{width:"100%"}}>
            <ProductCard
              pid={product.pid}
              title={product.title}
              county={product.county}
              town={product.town}
              rating={product.rating}
              price={product.price}
              discribe={product.discribe}
              thumbnail={product.thumbnail}              
            />
          </div>
        </ListItem>
      ))}
    </List>
  );
}

export default ShopTab;
