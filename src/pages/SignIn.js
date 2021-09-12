import React from "react";
import { Button, Container, makeStyles } from "@material-ui/core";
import { firebase, auth } from "../utils/firebase";

const useStyle = makeStyles((theme) => {
  return {
    page: {
      background: "#FFB2B2",
      padding: theme.spacing(3),
    },
  };
});
function SignIn() {
  const classes = useStyle();

  //使用google授權的
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container align="center" className={classes.page}>
      <Button onClick={signInWithGoogle} variant="contained" color="primary">
        Sign in with Google
      </Button>
    </Container>
  );
}

export default SignIn;
