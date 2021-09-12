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
import React from "react";
import { useParams } from "react-router";
import SignOutBtn from "../Components/SignoutBtn";

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
  const [value, setValue] = React.useState(0);
  const displayName = "多估你而拉斯";
  const message =
    "japofjsdofjsopafoasjdfojasof asojfpasodjfoasj aospdfjpaosdjf osajfapsjfasjfpojapdfjp jasfopajsdpfojasodjf pjsapjfpoajsopfajspdfj opja";
  const email = "pasjdpfjasdfj@gmail.com";
  let { uid } = useParams();
  //TODO: 透過傳入的uid去抓使用者資料
  {
    /*<p>ID: {uid}</p>;*/
  }

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
            <Avatar className={classes.Avatar} />
          </Container>
        </Grid>
        {/*個人介紹兼操作 */}
        <Grid item container xs={12} sm={8}>
          {/*個人資料 */}
          <Grid xs={8} container wrap="nowrap" spacing={2}>
            <Grid item>
              <Typography variant="h5">{displayName}</Typography>
              <Typography variant="p" nowarp>
                {email}
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
          <Grid xs={12} item spacing={2}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {message}
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
