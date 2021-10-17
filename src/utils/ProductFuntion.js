import { auth, firestore, firebase } from "../utils/firebase";
import XMLParser from "react-xml-parser";

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
};
