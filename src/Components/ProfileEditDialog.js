import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  FormControl,
  makeStyles,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Slider,
} from "@material-ui/core";
import { auth, firestore } from "../utils/firebase";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    dispaly: "block",
  },
});
export default function ProfileEditDialog({ getUserData, userData }) {
  const classes = useStyles();
  //路由
  const History = useHistory();
  //對話框展開
  const [open, setOpen] = React.useState(false);
  //表單
  const [name, setName] = useState("");
  const [sex, setSex] = React.useState(userData.sex || "");
  const [age, setAge] = useState(userData.age || 20);
  const [description, setDescription] = useState(userData.description);
  //錯誤處裡
  const [descriptionError, setDescriptionError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const handleClickOpen = () => {
    setName(userData.name);
    setDescription(userData.introduction);
    setSex(userData.sex);
    setAge(userData.age);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let result = window.confirm("確定修改?");
    if (!result) {
      return;
    }
    setNameError(false);
    setDescriptionError(false);

    if (name == "") {
      setNameError(true);
    }
    if (description == "") {
      setDescriptionError(true);
    }
    if (name && description) {
      const user = auth.currentUser;
      const docRef = firestore.collection("users").doc(user.uid);
      docRef
        .update({
          name,
          sex,
          age,
          introduction: description,
          verification: true,
        })
        .then(() => {
          History.push("/Profile/" + user.uid);
          getUserData();
          setOpen(false);
          return;
        });
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        修改資料
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <DialogTitle>修改資料</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="修改用戶姓名"
              type="email"
              variant="outlined"
              fullWidth
              value={name}
              error={nameError}
              onChange={(e) => setName(e.target.value)}
            />
            <FormControl className={classes.field}>
              <FormLabel>性別</FormLabel>
              <RadioGroup value={sex} onChange={(e) => setSex(e.target.value)}>
                <FormControlLabel
                  value="男生"
                  control={<Radio />}
                  label="男生"
                />
                <FormControlLabel
                  value="女生"
                  control={<Radio />}
                  label="女生"
                />
                <FormControlLabel
                  value="其他"
                  control={<Radio />}
                  label="其他"
                />
              </RadioGroup>
            </FormControl>

            <Typography gutterBottom>年齡: {age}</Typography>
            <Slider
              defaultValue={20}
              value={age}
              onChange={(e, newValue) => setAge(newValue)}
              valueLabelDisplay="auto"
              step={1}
              min={20}
              max={110}
            />

            <TextField
              className={classes.field}
              onChange={(e) => setDescription(e.target.value)}
              label="修改個人介紹"
              variant="outlined"
              color="secondary"
              multiline
              rows={4}
              fullWidth
              required
              value={description}
              error={descriptionError}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              確定修改
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
