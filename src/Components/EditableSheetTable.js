import {
  Button,
  Divider,
  IconButton,
  Input,
  makeStyles,
  styled,
  TextField,
  Typography,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import React, { useState, useEffect, useRef } from "react";
import { useTable } from "react-table";
import EditableTable from "../Components/EditableTable";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import AddBoxIcon from "@material-ui/icons/AddBoxTwoTone";
const useStyles = makeStyles((theme) => ({
  tableContainer: {
    //backgroundColor: theme.palette.primary.main,
    //backgroundColor: orange[100],
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "0 auto",
  },
  table: {
    width: "75%",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },

  contentField: {
    background: "transparent",
    outline: "none",
    border: 0,
    "&:focus-within": {
      borderBottom: "2px solid gray",
    },
    textAlign: "center",
    width: "100%",
    margin:"0 auto"
  },
  contentHeader: {
    textAlign: "center",
    minWidth: "50%",
    flex: 1,
    flexGrow: 1,
  },
  priceHeader: {
    textAlign: "center",
    flex: 1,
    flexGrow: 0,
    padding: 0,
  },
  operationHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    "align-items": "center",
    //backgroundColor: orange[100],
    flex: 1,
    flexGrow: 0,
  },
  operationHeaderButton: {
    maxHeight: 30,
    maxWidth: 30,
    minWidth: 15,
  },

  totalContainer: {
    display: "flex",
    "justify-content": "end",
    padding: theme.spacing(2),
  },
  totalText: {
    fontSize: 18,
  },
}));

function EditableSheetTable({ dataCallback, totalCallback,defaultData,defaulTotal }) {
  const [data, setData] = useState(defaultData||[
    {
      id: 0,
      content: "",
      price: 0,
    },
  ]);

  const [total, setTotal] = useState(defaulTotal||0);

  useEffect(() => {
    dataCallback(data);
  }, [data]);

  useEffect(() => {
    totalCallback(total);
  }, [total]);

  const classes = useStyles();

  const columns = React.useMemo(
    () => [
      {
        Header: "index",
        accessor: "id",
      },
      {
        //內容
        Header: () => (
          <Typography className={classes.contentHeader}>內容</Typography>
        ),
        accessor: "content",
        Cell: (tableProps) => (
          <div style={{width:"100%"}}>
            <input
              key={("contnet", tableProps.row.index)}
              className={classes.contentField}
              type="text"
              maxlength={50}
              onFocus={(e) => (e.target.readOnly = false)}
              onBlur={(e) => (e.target.readOnly = true)}
              onChange={(e) =>
                (tableProps.data[tableProps.row.index].content = e.target.value)
              }
              defaultValue={tableProps.data[tableProps.row.index].content}
              required
            ></input>
          </div>
        ),
      },
      {
        //價格
        Header: <Typography className={classes.priceHeader}>價格</Typography>,
        accessor: "price",
        Cell: (tableProps) => (
          <div style={{width:70 ,margin:"0 auto"}}>
            <input
              key={tableProps.row.index}
              className={classes.contentField}
              type="number"
              min={1}
              onFocus={(e) => (e.target.readOnly = false)}
              onBlur={(e) => (e.target.readOnly = true)}
              onChange={(e) => {
                tableProps.data[tableProps.row.index].price = e.target.value;
                setTotal(
                  tableProps.data.reduce(
                    (sum, row) => parseFloat(row.price) + sum,
                    0
                  )
                );
              }}
              required
              defaultValue={tableProps.data[tableProps.row.index].price}
            ></input>
          </div>
        ),
      },
      {
        //新增操作的按鈕放在header
        Header: (tableProps) => (
          <div className={classes.operationHeader}>
            {/* 新增欄位 */}
            <IconButton
              variant="contained"
              color="secondary"
              onClick={() => {
                console.log(tableProps.data);
                setData([
                  ...tableProps.data,
                  {
                    id: tableProps.data.length,
                    content: "",
                    price: 0,
                  },
                ]);
              }}
            >
              <AddBoxIcon />
            </IconButton>
          </div>
        ),
        id: "opt", // It needs an ID
        accessor: (str) => "del",
        Cell: (tableProps) => (
          <IconButton
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
            }}
            onClick={() => {
              //刪除row資料
              const dataCopy = [...tableProps.data];
              dataCopy.splice(tableProps.row.index, 1);
              console.log("delete ", tableProps, dataCopy);
              setData(dataCopy);
            }}
          >
            <DeleteOutlinedIcon color="Secondary" />
          </IconButton>
        ),
        /*
        Footer: (info) => {
          // Only calculate total visits if rows change
          const total = React.useMemo(
            () =>
              info.rows.reduce(
                (sum, row) => parseFloat(row.values.price) + sum,
                0
              ),
            [info.rows.values]
          );
          console.log(info);
          return <>Total: {total}</>;
        },*/
      },
    ],
    [data]
  );

  return (
    <>
      {/* 可編輯表格 */}
      <div className={classes.tableContainer}>
        <EditableTable
          columns={columns}
          data={data}
          classes={classes.table}
          getHeaderProps={(state, rowInfo, column) => ({
            style: {
              height: 10,
              padding: 0,
            },
          })}
          getRowProps={(state, rowInfo, column) => ({
            style: {
              padding: 0,
            },
          })}
          getCellProps={(state, rowInfo, column) => ({
            style: {
              padding: 0,
              textAlign: "center",
            },
          })}
        />
      </div>

      {/* 結算 */}
      <div className={classes.totalContainer}>
        <Typography className={classes.totalText} color="textSecondary">
          總合 {currencyFormat(total)}
        </Typography>
      </div>
    </>
  );
}
function currencyFormat(num) {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
export default EditableSheetTable;
