import React from "react";
import { Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { auth } from "../utils/firebase";
import { useHistory } from "react-router-dom";
function SignOutBtn() {
  const History = useHistory();
  const logout = () => {
    let result = window.confirm("確定登出?");
    if (result) {
      auth.signOut().then(() => {
        localStorage.removeItem("userData");
        History.push("/");
        return;
      });
    } else {
      return;
    }
  };
  return (
    <Button
      onClick={logout}
      variant="contained"
      color="primary"
      startIcon={<ExitToAppIcon />}
    >
      登出
    </Button>
  );
}

export default SignOutBtn;
