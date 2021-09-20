import React, { useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import { firestore } from "../../utils/firebase";
function ChatSubmit({ roomId }) {
  const [text, setText] = useState("");
  const [textError, setTextError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setTextError(false);
    if (text == "") {
      setTextError(true);
    }
    if (text) {
      firestore.collection("chat");
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
