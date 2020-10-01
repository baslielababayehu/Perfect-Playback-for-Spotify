import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (value) => (e) => {
    setValue({ ...value, [value]: e.target.value });
  };
  return (
    <div>
      <button
        className="btn btn-block btn-sm  my-3 text-white"
        style={{ backgroundColor: "#1DB954" }}
        onClick={handleClickOpen}
      >
        {props.ButtonTitle}
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{props.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.body}</DialogContentText>
          <TextField
            id="form-dialog-input"
            autoFocus
            margin="dense"
            // id="name"
            label={props.modalAction}
            type="email"
            fullWidth
            defaultValue={value}
            onKeyDown={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="black">
            Cancel
          </Button>
          <Button onClick={handleClose} color="black">
            {props.dialogTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
