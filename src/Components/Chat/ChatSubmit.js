import React, { useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import { firestore, firebase } from "../../utils/firebase";
import { getLoginData } from "../../utils/localStorge";
function ChatSubmit({ chatId }) {
  const [text, setText] = useState("");
  const [textError, setTextError] = useState(false);
  const { photoURL, id } = getLoginData();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTextError(false);
    if (text == "") {
      setTextError(true);
    }
    if (text) {
      await firestore
        .collection("chat")
        .doc(chatId)
        .collection("message")
        .doc()
        .set({
          text: text,
          photoURL,
          id,
          time: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setText("");
    }
  };
  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={3}>
            商品按鈕
          </Grid>
          <Grid item xs={6}>
            <TextField
              onChange={(e) => setText(e.target.value)}
              label="輸入訊息...."
              color="secondary"
              variant="outlined"
              fullWidth
              required
              value={text}
              error={textError}
            />
          </Grid>
          <Grid item xs={3}>
            <Button type="submit" color="secondary" variant="contained">
              送出
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default ChatSubmit;
