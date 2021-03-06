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
      const product = data?.data()?.products;
      if (!product) {
        return;
      }
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

//新增至購物車
async function addToShoppingCart(uid, pid, orderData) {
  console.log("add to cart " + uid + " " + pid + " " + orderData);
  var data = {
    pid: pid,
    quantity: orderData.quantity,
    startDate: orderData.startDate,
    duration: orderData.duration,
  };
  return await firestore
    .collection("shoppingCart")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return (
          firestore
            //.collection("users")
            .collection("shoppingCart")
            .doc(uid)
            .update({
              shoppingCart: firebase.firestore.FieldValue.arrayUnion(data),
            })
        );
      } else {
        return (
          firestore
            //.collection("users")
            .collection("shoppingCart")
            .doc(uid)
            .set({
              shoppingCart: firebase.firestore.FieldValue.arrayUnion(data),
            })
        );
      }
    });
}

//從購物車移除
async function removeFromShoppingCart(orderData) {
  return await firestore
    .collection("shoppingCart")
    .doc(auth?.currentUser?.uid)
    .update({
      shoppingCart: firebase.firestore.FieldValue.arrayRemove(orderData),
    });
}

//取得購物車
async function getShoppingCart(uid) {
  return await firestore.collection("shoppingCart").doc(uid).get();
}
//建立訂單
function createOrder(pid, orderData, productData) {
  console.log(productData);
  //TODO:檢查與進行中撞日

  //算開始日
  let _start = orderData.startDate;
  let startDate = new Date(null);
  startDate.setTime(_start.seconds * 1000);

  //算結束日
  let _end = new Date(startDate);
  let endDate = new Date(
    _end.setDate(_end.getDate() + parseInt(productData.duration) - 1)
  );

  //訂單資料
  const fullOrderData = {
    pid: pid,
    startDate: startDate,
    endDate: endDate,
    quantity: orderData.quantity,
    price: productData.bill.total,
    total: productData.bill.total * orderData.quantity,
    buyer: auth?.currentUser?.uid,
    seller: productData.seller,
    duration: orderData.duration,
    paid: false,
    state: "created",
    //TODO:付款資訊
  };

  //創建訂單資料
  var ref = firestore.collection("orders").doc();
  const batch = firestore.batch();
  batch.set(ref, fullOrderData);

  //從購物車刪除
  var cartRef = firestore
    .collection("shoppingCart")
    .doc(auth?.currentUser?.uid);
  batch.set(
    cartRef,
    {
      shoppingCart: firebase.firestore.FieldValue.arrayRemove(orderData),
    },
    { merge: true }
  );

  //更新order資料庫state
  var stateRef = firestore.collection("orders").doc("--state--");
  const increment = firebase.firestore.FieldValue.increment(1);
  batch.update(stateRef, { count: increment });

  //給賣家通知
  var notificationRef = firestore
    .collection("notifications")
    .doc(productData.seller);
  var contentText = "商品 【" + productData.title + " 】有新訂單";
  var content = { title: "有新的訂單", content: contentText };
  batch.set(
    notificationRef,
    { notes: firebase.firestore.FieldValue.arrayUnion(content), read: false },
    { merge: true }
  );

  return batch.commit();
}

//取得訂單狀況
async function getOrdersByState(uid,userType, state) {
  return await firestore
    .collection("orders")
    .where(userType, "==", uid)
    .where("state", "in", state)
    .get();
}

//修改訂單state狀況
async function setOrderState(orderId, state) {
  return await firestore
    .collection("orders")
    .doc(orderId)
    .update({ state: state });
}

//設定商品評價
async function completeOrdersWithComments(pid, orderId, uid, rating, msg) {
  var orderRef = firestore.collection("orders").doc(orderId);
  const batch = firestore.batch();

  //更新訂單狀況為"已評價"
  batch.update(orderRef, { state: "rated" });

  //上傳評價
  var productRef = firestore.collection("productComments").doc(pid);
  //該商品評價數量
  const increment = firebase.firestore.FieldValue.increment(1);
  batch.set(productRef, { count: increment }, { merge: true });

  //上傳內容
  var commentRef = firestore
    .collection("productComments")
    .doc(pid)
    .collection("comments")
    .doc(orderId);
  var msgData = {
    oid:orderId,
    rating: rating,
    msg: msg,
    uid: uid,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  batch.set(commentRef, msgData);

  return await batch.commit();
}

//取得該商品所有評價
async function getProductRatingDoc(pid  ){
  return await firestore
  .collection("productComments")
  .doc(pid)
  .get();
}
async function getRatingComments(pid) {
  return await firestore
    .collection("productComments")
    .doc(pid)
    .collection("comments")
    .get();
}
async function getOrderRatingComment(pid, oid) {
  return await firestore
    .collection("productComments")
    .doc(pid)
    .collection("comments")
    .doc(oid)
    .get();
}

//

function parseState(stateCode) {
  if (stateCode == "created") {
    return "待賣家確認";
  } else if (stateCode == "confirmed") {
    return "成立";
  } else if (stateCode == "outdated") {
    return "過期";
  } else if (stateCode == "finished") {
    return "完成";
  } else if (stateCode == "canceled") {
    return "取消";
  } else if (stateCode == "denied") {
    return "拒絕";
  }
}
export {
  getUserProducts,
  addToShoppingCart,
  getUserData,
  getShoppingCart,
  removeFromShoppingCart,
  createOrder,
  setOrderState,
  parseState,
  getOrdersByState,
  completeOrdersWithComments,
  getRatingComments,
  getOrderRatingComment,
  getProductRatingDoc,
};
