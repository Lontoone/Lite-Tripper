import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { getUserProducts } from "../utils/userFunction";
import AddBoxIcon from "@material-ui/icons/AddBoxTwoTone";
import { deleteProduct, secToDate } from "../utils/ProductFuntion";

const useStyles = makeStyles((theme) => ({
  img: {
    height: "70px",
    width: "70px",
    margin: "0 auto",
    overflow: "hidden",
    objectFit: "cover",
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ProductList() {
  const classes = useStyles();
  const [isBusy, setisBusy] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getUserProducts(auth?.currentUser?.uid).then((res) => {
      console.log(res);
      /*
      var _datas = [];
      for (var i = 0; i < res.length; i++) {
        _datas.push(res[i].data());
        console.log(res[i].data());
      }*/
      if (res) setProducts(res);
      setisBusy(false);
    });
  }, []);

  if (isBusy) {
    return <></>;
  } else if (products?.length == 0) {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            window.location.href = "/CreateProduct";
          }}
        >
          <AddBoxIcon></AddBoxIcon>
          <Typography color="textSecondary">新增商品</Typography>
        </Button>
      </div>
    );
  } else
    return (
      <TableContainer component={"div"}>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              window.location.href = "/CreateProduct";
            }}
          >
            <AddBoxIcon></AddBoxIcon>
            <Typography color="textSecondary">新增商品</Typography>
          </Button>
        </div>
        {console.log(products.length)}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>商品</TableCell>
              <TableCell align="center">標題</TableCell>
              <TableCell align="center">日程</TableCell>
              <TableCell align="center">價格</TableCell>
              <TableCell align="center">上傳時間</TableCell>
              <TableCell align="center">動作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img className={classes.img} src={row.data().thumbnail}></img>
                </TableCell>
                <TableCell align="center">{row.data().title}</TableCell>
                <TableCell align="center">{row.data().duration}</TableCell>
                <TableCell align="center">{row.data().bill.total}</TableCell>
                <TableCell align="center">
                  {secToDate(row.data().createdAt.seconds)}
                </TableCell>
                <TableCell align="center">
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      window.location.href = "/EditProduct/" + row.id;
                    }}
                  >
                    編輯
                  </Button>
                  <Button
                    color="disabled"
                    variant="contained"
                    onClick={() => {
                      //TODO:...未完成
                      //deleteProduct(row.id);
                    }}
                  >
                    刪除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}
