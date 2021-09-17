import React from "react";
import { useParams } from "react-router";
import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    dispaly: "block",
  },
});
export default function ProfileEdit() {
  const { uid } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [sex, setSex] = useState("money");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (details === "") {
      setDetailsError(true);
    }
    // if (title && details) {
    //   const docRef = firestore.collection("users").doc(user.uid);
    //     await docRef.get().then((doc) => {
    //       if (doc.exists) {
    //         // docRef.update({
    //         //   id: user.uid,
    //         //   name: user.displayName,
    //         //   email: user.email,
    //         //   photoURL: user.photoURL,
    //         //   introduction: "暫無介紹",
    //         // });
    //         History.push("/");
    //       } else {
    //         docRef.set({
    //           id: user.uid,
    //           name: user.displayName,
    //           email: user.email,
    //           photoURL: user.photoURL,
    //           introduction: "暫無介紹",
    //         });
    //         History.push("/ProfileEdit/" + user.uid);
    //       }
    //     });
    //   }).then(() => history.push("/profile/"+uid));
    // }
  };

  return (
    <Container size="sm">
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          onChange={(e) => setTitle(e.target.value)}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          className={classes.field}
          onChange={(e) => setDetails(e.target.value)}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />

        {/* <Radio value="hello" />
        <Radio value="goodbye" /> */}

        <FormControl className={classes.field}>
          <FormLabel>性別</FormLabel>
          <RadioGroup value={sex} onChange={(e) => setSex(e.target.value)}>
            <FormControlLabel value="男生" control={<Radio />} label="男生" />
            <FormControlLabel value="女生" control={<Radio />} label="女生" />
            <FormControlLabel value="其他" control={<Radio />} label="其他" />
          </RadioGroup>
        </FormControl>
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
