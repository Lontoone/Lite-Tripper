import React from "react";
import { Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { auth } from "../utils/firebase";
import { useHistory } from "react-router-dom";
function SignOutBtn() {
  const History = useHistory();
  const logout = () => {
    auth.signOut().then(() => {
      History.push("/");
      return;
    });
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
