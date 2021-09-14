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
import { firestore, auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ShopTab from "../Components/ShopTab";
import MessageBoard from "../Components/MessageBoard";

const useStyles = makeStyles((theme) => ({
  tabs: {
    flexGrow: 1,
  },
  Avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: theme.spacing(1),
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
  //style
  const classes = useStyles();
  //授權hook
  const [user, authLoading, error] = useAuthState(auth);
  //拉取資料的載入狀態
  const [loading, setLoading] = useState(true);
  //網址參數
  const { uid } = useParams();
  const History = useHistory();
  //用來作為tab換頁用
  const [value, setValue] = React.useState(0);
  //用來儲存使用者資料
  const [userData, setUserData] = useState({
    introduction: "",
    id: "",
    email: "",
    photoURL: "",
    name: "",
  });

  const getUserData = async () => {
    const docRef = firestore.collection("users").doc(uid);
    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserData(doc.data());
        } else {
          //發現找不到該用戶重導向到404頁
          History.push("/404");
        }
      })
      .then(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getUserData();
  }, [uid]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (authLoading && loading) {
    return <div></div>;
  }
  return (
    <Container maxWidth="md">
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
            {user?.uid == uid ? (
              <>
                <Button variant="contained" color="primary">
                  修改資料
                </Button>
                <SignOutBtn />
              </>
            ) : (
              <>
                <Button variant="contained" color="primary">
                  傳送訊息
                </Button>
              </>
            )}
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
          <Tab label="Shop" />
          <Tab label="Comment" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ShopTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MessageBoard uid={uid} />
        </TabPanel>
      </Paper>
    </Container>
  );
}

export default Profile;
