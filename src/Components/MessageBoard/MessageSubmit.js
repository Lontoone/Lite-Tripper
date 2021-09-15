import React from "react";
import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { auth, firestore, firebase } from "../../utils/firebase";
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    dispaly: "block",
  },
});
export default function MessageSubmit({ getMessage, uid }) {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [textError, setTextError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("請先登入");
      History.push("/SignIn");
      return;
    }
    setTextError(false);
    if (text == "") {
      setTextError(true);
    }
    if (text) {
      const ref = firestore
        .collection("profileComment")
        .doc(uid)
        .collection("comment")
        .doc();
      const id = ref.id;
      ref
        .set({
          id,
          name: auth.currentUser.displayName,
          uid: auth.currentUser.uid,
          photoURL: auth.currentUser.photoURL,
          text: text,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          getMessage();
          setText("");
          console.log(text);
        });
    }
  };

  return (
    <Container size="sm">
      <Typography
        variant="h4"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        留下你對他的印象吧
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          onChange={(e) => setText(e.target.value)}
          label="我想對他說...."
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          value={text}
          error={textError}
        />

        <br />
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
