import { auth, firestore } from "../utils/firebase";
import XMLParser from "react-xml-parser";

async function getAllProductsList(
  orderBy = "createdAt",
  startAfter = null,
  limit = 5
) {
    console.log(startAfter);
  return await firestore
    .collection("product")
    .orderBy(orderBy)
    //.startAfter(startAfter)
    .limit(limit)
    .get()
    .then((snapshot) => {
      return snapshot.docs;
      snapshot.docs.forEach((doc) => {
        //console.log(doc.data());
      });
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
function getProduct() {}


export { getAllProductsList, getProductState };
