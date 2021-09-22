import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Divider,
  IconButton,
  Input,
  makeStyles,
  styled,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
//import Button from '@mui/material/Button';
//import Dialog from '@mui/material/Dialog';
//import DialogActions from '@mui/material/DialogActions';
//import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
//import DialogTitle from '@mui/material/DialogTitle';

export default function FullScreenDialog({
  title,
  content,
  buttonText,
  isOpen,
  closeCallback
}) {
  const [open, setOpen] = useState("false");
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    closeCallback?.();
  };

  return (
    <div>
      {/*
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
        </Button>*/}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
