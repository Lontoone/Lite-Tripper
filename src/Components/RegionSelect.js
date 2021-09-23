import { ListItem, ListSubheader, MenuItem, Select } from "@material-ui/core";
import XMLParser from "react-xml-parser";

import React, { useState, useEffect } from "react";

import webTheme from "../Hooks/WebTheme";
import { ContactSupport } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  field: {
    width: 80,
  },
  title: {
    paddingLeft: 0,
  },

  item: {
    padding: theme.spacing(0, 2),
  },
}));

function RegionSelect({ setCounty, setTown }) {
  document.body.style = {
    overflow: "visible !important",
  };

  //城市資料集 https://data.gov.tw/dataset/101905
  const [countyList, setCountyList] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState("A");
  //區域使用資料集 https://data.gov.tw/dataset/102013
  const [townList, setTownList] = useState([]);
  const [selectedTown, setSelectedTown] = useState("A01");
  //const classes = webTheme();

  const classes = useStyles();

  useEffect(() => {
    var XMLParser = require("react-xml-parser");

    //城市清單:
    const countyUrl = "https://api.nlsc.gov.tw/other/ListCounty";
    fetch(countyUrl)
      .then((res) => res.text())
      .then((data) => {
        var xml = new XMLParser().parseFromString(data);
        setCountyList(xml.children);
        //console.log(xml.children);
      });

    //區域清單:
    const url = "https://api.nlsc.gov.tw/other/ListTown/" + selectedCounty;
    fetch(url)
      .then((res) => res.text())
      .then((data) => {
        var xml = new XMLParser().parseFromString(data);
        setTownList(xml.children);
        console.log(townList);
      });
  }, [selectedCounty]);

  useEffect(() => {
    setCounty(selectedCounty);
  }, [selectedCounty]);

  return (
    <ListItem className={classes.item} component="div">
      <ListSubheader
        className={classes.title}
        component="div"
        id="nested-list-subheader"
      >
        城市
      </ListSubheader>
      <Select name="county" className={classes.field}>
        {countyList.map((data) => (
          <MenuItem
            value={data.children[0].value}
            //onClick={setSelectedCounty(data.children[0].value)}
            onClick={() => setSelectedCounty(data.children[0].value)}
          >
            {data.children[1].value}
          </MenuItem>
        ))}
      </Select>

      <ListSubheader component="div" id="nested-list-subheader">
        區域
      </ListSubheader>
      <Select name="town" className={classes.field}>
        {townList.map((data) => (
          <MenuItem
            value={data.children[0].value}
            onClick={setTown(data.children[0].value)}
          >
            {data.children[1].value}
          </MenuItem>
        ))}
      </Select>
    </ListItem>
  );
}

export default RegionSelect;
