import { auth, firestore, firebase } from "../utils/firebase";
import { getProductById } from "../utils/ProductFuntion";

async function getUserData(uid) {
  return await firestore.collection("users").doc(uid).get();
}

async function getUserProducts(uid) {
  //let doc = firestore.collection("users").doc(uid);
  //return await doc.get().then().catch();
  return await firestore
    .collection("users")
    .doc(uid)
    .get()
    .then((data) => {
      const refsPromise = data
        .data()
        .products?.map((id) =>
          firestore.collection("product").doc(`${id}`).get()
        );

      return Promise.all(refsPromise).then((e) => {
        console.log(e);
        return e;
      });
    });
}

async function addToShoppingCart(uid, pid, orderData) {
  console.log("add to cart " + uid + " " + pid + " " + orderData);
  var data = {
    pid: pid,
    quantity: orderData.quantity,
    startDate: orderData.startDate,
  };
  return await firestore
    .collection("shoppingCart")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return firestore
          //.collection("users")
          .collection("shoppingCart")
          .doc(uid)
          .update({
            shoppingCart: firebase.firestore.FieldValue.arrayUnion(data),
          });
      } else {
        return firestore
          //.collection("users")
          .collection("shoppingCart")
          .doc(uid)
          .set({
            shoppingCart: firebase.firestore.FieldValue.arrayUnion(data),
          });
      }
    });
}

async function getShoppingCart(uid) {
  return await firestore.collection("shoppingCart").doc(uid).get();
}

export { getUserProducts, addToShoppingCart, getUserData, getShoppingCart };
