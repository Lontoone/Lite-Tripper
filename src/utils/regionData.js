import XMLParser from "react-xml-parser";
import React, { useEffect } from "react";

/*
function regionData() {
    useEffect(()=>{

    },[])
    return (
    )
}

export default regionData;*/

async function countyList() {
  const countyUrl = "https://api.nlsc.gov.tw/other/ListCounty";
  return await fetch(countyUrl)
    .then((res) => res.text())
    .then((data) => {
      var xml = new XMLParser().parseFromString(data);

      return xml.children.map((a) => ({
        code: a.children[0],
        cityname: a.children[1],
      }));
    });
}
async function townCode2Name(cityCode, townCode,callback) {
  //區域清單:
  const url = "https://api.nlsc.gov.tw/other/ListTown/" + cityCode;
  return await fetch(url)
    .then((res) => res.text())
    .then((data) => {
      var xml = new XMLParser().parseFromString(data);      
      xml?.children?.forEach((a) => {
        if (a.children[0].value == townCode) {
          //return a.children[1];
          callback(a.children[1].value)
        }
      });
      return "";
    });
}
/*
function countyCode2Name(data, code) {
  data.forEach((a) => {
    if (a.code.value == code) {
      return a.cityname.value;
    }
  });
}*/

export { countyList,townCode2Name };
