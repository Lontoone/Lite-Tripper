import { auth, firestore, firebase } from "../utils/firebase";
import { getProductById } from "../utils/ProductFuntion";

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
        .products?.map((id) => firestore.collection("product").doc(`${id}`).get());
  
      return Promise.all(refsPromise)
      .then((e) => {
        console.log(e);
        return(e);
      });
    });
}

export { getUserProducts };
