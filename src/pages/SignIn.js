import React from "react";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  Paper,
  Avatar,
  Typography,
} from "@material-ui/core";
import { firebase, auth, firestore } from "../utils/firebase";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn() {
  const classes = useStyles();
  const History = useHistory();
  //使用google授權
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    auth
      .signInWithPopup(provider)
      .then(async (result) => {
        const user = result.user;
        const docRef = firestore.collection("users").doc(user.uid);
        await docRef.get().then((doc) => {
          if (doc.exists) {
            if (!doc.data().verification) {
              History.push("/profile/" + doc.id);
              return;
            }
            History.push("/");
            return;
          }
          docRef.set({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            verification: false,
            introduction: "暫無介紹",
          });
          History.push("/profile/" + user.id);
          return;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar
            className={classes.avatar}
            src="https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png"
          />
          <Typography component="h1" variant="h5">
            歡迎來到Lite-Tripper
          </Typography>
          <Button
            onClick={signInWithGoogle}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            startIcon={<img src="/GoogleLogo.png" />}
          >
            Sign In With Google
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}

export default SignIn;
