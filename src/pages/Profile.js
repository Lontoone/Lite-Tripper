import {
  Paper,
  Card,
  CardContent,
  Avatar,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
  Tab,
  Tabs,
  Box,
} from "@material-ui/core";
//react
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import SignOutBtn from "../Components/SignoutBtn";
//firebase
import { firestore } from "../utils/firebase";
//page
import ShopTab from "../Components/ShopTab";
import MessageBoard from "../Components/MessageBoard/MessageBoard";
import ProfileEdit from "../Components/ProfileEditDialog";
import { getLoginData } from "../utils/localStorge";
import { GenChatId } from "../utils/ChatFunction";

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

//操作Tab的程式
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
  //取得當下登入人的id，若無則空字串
  const currentUid = getLoginData()?.id || "";
  const getUserData = async () => {
    const docRef = firestore.collection("users").doc(uid);
    await docRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          //發現找不到該用戶重導向到404頁
          History.push("/404");
          return;
        }
        setUserData(doc.data());
        if (!doc.data().verification) {
          //判定是否登入的人與該頁面為同一人
          if (getLoginData()?.id === doc.data().id) alert("請先編輯使用者資料");
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

  if (loading) {
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
              <Typography variant="subtitle1" noWrap>
                性別:{userData?.sex}
              </Typography>
              <Typography variant="subtitle1" noWrap>
                年齡:{userData?.age}
              </Typography>
            </Grid>
          </Grid>
          {/*操作按鈕 */}
          <Grid xs={4} item>
            {currentUid === uid ? (
              <>
                <ProfileEdit getUserData={getUserData} userData={userData} />
                <SignOutBtn />
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    const chatId = GenChatId(currentUid, userData.id);
                    History.push("/Chat/" + chatId);
                  }}
                >
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
          <ShopTab uid={uid} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MessageBoard uid={uid} />
        </TabPanel>
      </Paper>
    </Container>
  );
}

export default Profile;
