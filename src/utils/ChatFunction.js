import { useEffect, useState } from "react";
import { firestore } from "./firebase";

export function GenChatId(uid1, uid2) {
  return uid1 < uid2 ? uid1 + uid2 : uid2 + uid1;
}

//用在個人頁面上私訊按下的按鈕，會傳入雙方的uid
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

//取得聊天室的列表所需資料，使用in可能造成只能最多有十個聊天室的窘境
export function useGetChatList(senderUid) {
  const [userList, setUserList] = useState([]);

  const [chatList, setChatList] = useState([]);
  const fetchData = () => {
    firestore
      .collection("chat")
      .where("users", "array-contains-any", [senderUid])
      .onSnapshot((chats) => {
        const userlist = [];
        const chatlist = [];
        chats.forEach((chat) => {
          chatlist.push(chat.id);
          userlist.push(chat.data().users.find((user) => user !== senderUid));
        });
        console.log("用戶列表", userlist);
        console.log("聊天室列表", chatlist);
        setChatList(chatlist);
        setUserList(userlist);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return [userList, chatList];
}
