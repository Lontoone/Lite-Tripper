import { auth, firestore, firebase } from "../utils/firebase";
import XMLParser from "react-xml-parser";

function getProductsByFiltered({
  orderBy = "createdAt",
  startAfter = null,
  limit = 5,
  county,
  town,
  minPrice,
  maxPrice,
  ranting,
  openWeek,
}) {
  let query = firestore.collection("product");
  if (orderBy != "") query = query.orderBy(orderBy);
  if (county != "") query = query.where(`county`, "==", county);
  if (town != "") query = query.where(`town`, "==", town);

  if (minPrice) query= query.where("bill.total", ">",  parseFloat(minPrice));
  if (maxPrice) query= query.where("bill.total", "<",  parseFloat(maxPrice));

  if (startAfter) query = query.startAfter(startAfter);
  if (limit) query = query.limit(limit);

  //if(ranting) query.where("town","==",town);
  //if (openWeek) query.where("openWeek", "==", town);
  
  return query
    .get()
    .then((res) => {
      var datas=[];
      console.log(res.docs.length);      
      //檢查開放日
      for(var i =0;i<res.docs.length;i++){
        if(checkOpenWeeks(res.docs[i]?.data().openWeek,openWeek)){
          datas.push(res.docs[i]);
        }
      }
      return datas;
    })
    .catch();
}

function checkOpenWeeks(weekdays, checkWeekdays){
  for(let i=0;i<weekdays.length;i++){
    if(weekdays[i] && checkWeekdays[i]){
      return true.valueOf;
    }
  }
  return false;
}

async function getAllProductsList(
  orderBy = "createdAt",
  startAfter = null,
  limit = 5
) {
  return await firestore
    .collection("product")
    .orderBy(orderBy)
    .startAfter(startAfter)
    .limit(limit)
    .get()
    .then((snapshot) => {
      return snapshot.docs;
    });
}

async function getProductState() {
  return await firestore
    .collection("product")
    .doc("--stats--")
    .get()
    .then((snapShot) => {
      console.log(snapShot.data());
      return snapShot.data();
    });
}
function getProductById(pid) {
  let query = firestore.collection("product").doc(pid);
  return query.get().then().catch();
}

function deleteProduct(pid) {
  var productRef = firestore.collection("product").doc(pid);
  const batch = firestore.batch();
  batch.delete(productRef);
  //TODO....刪除圖片
}

function getQueryByOption(collection, options = {}) {
  //https://stackoverflow.com/questions/48036975/firestore-multiple-conditional-where-clauses
  let { where, orderBy, limit } = options;
  let query = firestore.collection(collection);
  if (where) {
    if (where[0] instanceof Array) {
      // It's an array of array
      for (let w of where) {
        query = query.where(...w);
      }
    } else {
      query = query.where(...where);
    }
  }

  if (orderBy) {
    query = query.orderBy(...orderBy);
  }

  if (limit) {
    query = query.limit(limit);
  }
  return query.get().then().catch();
}



function currencyFormat(num) {
  return "$" + num?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function secToDate(sec) {
  var curdate = new Date(null);
  curdate.setTime(sec * 1000);
  return curdate.toLocaleDateString(navigator.language);
}

export {
  getAllProductsList,
  getProductState,
  getQueryByOption,
  getProductById,
  currencyFormat,
  secToDate,
  deleteProduct,
  getProductsByFiltered,
};
