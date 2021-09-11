import React from "react";
import { Button, Container } from "@material-ui/core";
import { firebase, auth } from "../utils/firebase";

function SignIn() {
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
    <Container>
      <Button onClick={signInWithGoogle} variant="contained" color="primary">
        Sign in with Google
      </Button>
    </Container>
  );
}

export default SignIn;
