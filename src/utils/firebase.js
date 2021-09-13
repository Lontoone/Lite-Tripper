// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdWFxIUbjchiqeNO3L8LtNp8JyMfCatKI",
  authDomain: "lite-tripper.firebaseapp.com",
  projectId: "lite-tripper",
  storageBucket: "lite-tripper.appspot.com",
  messagingSenderId: "619686803558",
  appId: "1:619686803558:web:b19dcc30395aad4ccdd5a7",
  measurementId: "G-SYCHJT3HW1",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

//上傳圖片到storage並且回傳promise物件，可以取得圖片網址
function UploadImg(path, fileName, file) {
  const fileRef = firebase.storage().ref(path + "/" + fileName);
  const metadata = {
    contentType: file.type,
  };
  const result = Promise.resolve(
    fileRef.put(file, metadata).then(() => {
      return fileRef.getDownloadURL().then((imgURL) => {
        return imgURL;
      });
    })
  );
  return result;
}

export { firebase, auth, firestore, UploadImg };
