import React, { Component, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export function MessageModal(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    handleClickOpen();
  }, []);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="text-center">
          Log in
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are currently not logged into Spotify. Don't have spotify? Get
            it <a href="https://www.spotify.com/">here</a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "black" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
            style={{ backgroundColor: "#1db954", color: "white" }}
          >
            <a href="http://localhost:5000/login" className="text-white">
              Login
            </a>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MessageModal;
