import { List, ListItem, Container, Card, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getUserProducts } from "../utils/userFunction";
import { getProductById } from "../utils/ProductFuntion";

function ShopTab({ uid }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getUserProducts(uid).then((e) => {
      console.log(e, Array.isArray(e));
      setProducts(e);
    });
  }, []);

  return (
    <List>
      {products?.map((pid, i) => {
        return (
          <ListItem divider key={pid}>
            <div style={{ width: "100%" }}>
              {console.log(products[i])}
              <ProductCard datasnapShot={products[i]}></ProductCard>
            </div>
          </ListItem>
        );
      })}
    </List>
  );
}

export default ShopTab;
