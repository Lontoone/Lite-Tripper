import {
  Paper,
  Card,
  CardContent,
  Avatar,
  Button,
  ButtonGroup,
  Container,
  Grid,
  makeStyles,
  Typography,
  Tab,
  Tabs,
  Box,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import SignOutBtn from "../Components/SignoutBtn";
import { firestore } from "../utils/firebase";

const useStyles = makeStyles((theme) => ({
  tabs: {
    flexGrow: 1,
  },
  Avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: theme.spacing(1),
  },
  colorblock: {
    backgroundColor: "#DC9FB4",
  },
}));

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} id={index}>
      {value === index && <Box p={4}>{children}</Box>}
    </div>
  );
}

//個人葉面
function Profile() {
  const { uid } = useParams();
  const History = useHistory();
  const [value, setValue] = React.useState(0);
  const [userData, setUserData] = useState({
    introduction: "暫無介紹",
    id: "",
    email: "",
    photoURL: "",
    name: "",
  });
  useEffect(async () => {
    const docRef = firestore.collection("users").doc(uid);
    await docRef.get().then((doc) => {
      if (doc.exists) {
        console.log("success");
        setUserData(doc.data());
      } else {
        //發現找不到該用戶重導向到404頁
        History.push("/404");
      }
    });
    console.log(userData);
  }, []);
  const message =
    "japofjsdofjsopafoasjdfojasof asojfpasodjfoasj aospdfjpaosdjf osajfapsjfasjfpojapdfjp jasfopajsdpfojasodjf pjsapjfpoajsopfajspdfj opja";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  return (
    <Container maxWidth="md" justify="contant">
      {/*上半部 */}
      <Grid container>
        {/*個人大頭貼 */}
        <Grid item xs={12} sm={4}>
          <Container>
            <Avatar src={userData.photoURL} className={classes.Avatar} />
          </Container>
        </Grid>
        {/*個人介紹兼操作 */}
        <Grid item container xs={12} sm={8}>
          {/*個人資料 */}
          <Grid item xs={8} container wrap="nowrap" spacing={2}>
            <Grid item>
              <Typography variant="h5">{userData.name}</Typography>
              <Typography variant="subtitle1" noWrap>
                {userData.email}
              </Typography>
            </Grid>
          </Grid>
          {/*操作按鈕 */}
          <Grid xs={4} item>
            <ButtonGroup
              orientation="vertical"
              variant="contained"
              color="primary"
            >
              <Button>修改資料</Button>
              <SignOutBtn />
            </ButtonGroup>
          </Grid>
          {/*自我介紹 */}
          <Grid xs={12} item>
            <Card>
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {userData.introduction}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      {/*下半部 */}
      <Paper className={classes.tabs}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
        </Tabs>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Paper>
    </Container>
  );
}

export default Profile;
