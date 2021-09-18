import { useState } from "react";
import { firestore } from "./firebase";

export function GenChatId(uid1, uid2) {
  return "chat_" + (uid1 < uid2 ? uid1 + uid2 : uid2 + uid1);
}

export function initChat(senderUid, reciverUid) {
  //產生聊天室名稱
  const chatName = GenChatId(senderUid, reciverUid);
  const ref = firestore.collection("chat").doc(chatName);
  //確認聊天室是否存在
  ref.get().then((docSnapshot) => {
    //存在則抓對方的消息並且返回50則訊息
    if (docSnapshot.exists) {
      console.log("exists");
    }
    //不存在則創立聊天室
    else {
      ref.set({
        id: chatName,
        users: [senderUid, reciverUid],
      });
    }
  });
}

//取得聊天室的列表所需資料
export function GetChatList(senderUid) {
  // const [chatList, setChatList] = useState([]);
  firestore
    .collection("chat")
    .where("users", "array-contains-any", [senderUid])
    .get()
    .then((chats) => {
      const list = [];
      const userlist = [];
      chats.forEach((chat, index) => {
        list.push(chat.data().id);
        userlist.push(chat.data().users.find((user) => user != senderUid));
      });
      console.log("聊天室列表 ", list);
      console.log("用戶列表", userlist);
      // setChatList(list);
    });
}
