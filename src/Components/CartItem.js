import React from "react";
import { getProductById } from "../utils/ProductFuntion";
import { getUserData } from "../utils/userFunction";
import "./Css/shoppingCartItemCard.css";
//報廢
class CartItem extends React.Component {
  state = {
    productData: {},
    orderData: {},
    sellerData: {},
  };
  constructor(props) {
    super(props);
    this.state = props;
    console.log(props)
  }
  render() {
    getProductById(this.state.pid)
      .then((res) => {
        getUserData(res.data().seller)
          .then((res) => {
            this.setState({ sellerData: res.data() });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    return <div>{this.state.sellerData}</div>;
  }
}

CartItem.defaultProps = {
  pid: "123",
  orderData: {},
};

export default CartItem;
