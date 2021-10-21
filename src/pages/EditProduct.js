import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { getProductById } from "../utils/ProductFuntion";
import CreateProduct from "./CreateProduct";

function EditProduct() {
  //網址參數
  const { pid } = useParams();
  const History = useHistory();
  const [product, setProduct] = useState({});
  const [isBusy, setIsBusy] = useState(true);
  useEffect(() => {
    getProductById(pid).then((res) => {
      setProduct(res.data());
      console.log(res.data());
      setIsBusy(false);
    });
  }, []);

  if (isBusy) {
    return <>Loading</>;
  } else
    return (
      <div>
        <CreateProduct 
          isEdit={true}
          pid={pid}
          defaultProduct={product}

        ></CreateProduct>
      </div>
    );
}

export default EditProduct;
