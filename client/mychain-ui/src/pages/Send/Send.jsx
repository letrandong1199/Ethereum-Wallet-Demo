import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import HeaderDashBoard from "../../parts/containers/HeaderDashBoard/HeaderDashBoard";
import {
  Button,
  Paper,
  TextField,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import useStyles from "./style";
import { SocketContext } from "../../context/socket.js";
const Send = () => {
  const [show, setShow] = useState(false);
  const socket = useContext(SocketContext);
  const history = useHistory();
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const checkValidForm = () => {
    if (
      toAddress !== "" &&
      amount !== "" &&
      parseInt(amount) <= localStorage.getItem("balance")
    ) {
      console.log("Form valid");
      return true;
    } else {
      if (toAddress === "") {
        setAlertContent("To address field empty");
      } else {
        if (amount === "") {
          setAlertContent("Amount field empty");
        } else {
          setAlertContent("Balance not enough");
        }
      }
    }
    console.log("Form not valid");
    return false;
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (checkValidForm()) {
      handleShow();
    } else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  };

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleConfirm = () => {
    setShow(false);
    const data = {
      fromAddress: localStorage.getItem("address"),
      toAddress: toAddress,
      amount: amount,
      privateKey: localStorage.getItem("privateKey"),
    };
    socket.emit("add_PT", data);
    setAlertContent("Add transaction into pending transaction successfully");
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 1000);
    setTimeout(() => {
      history.push("/mine");
    }, 1100);
  };

  const classes = useStyles();
  return (
    <div>
      <HeaderDashBoard />
      <Paper variant="outlined" square className={classes.root}>
        <section style={{ height: "100%" }}>
          <form method="post">
            <Paper variant="outlined" square className={classes.paper}>
              <Avatar variant="rounded" className={classes.avatar}>
                C
              </Avatar>
              <h3 className={classes.text}>Create New Transaction</h3>
            </Paper>
            <Paper style={{ margin: "20px 20px", padding: "20px 0 20px 20px" }}>
              <div className={classes.formGroup}>
                <TextField
                  size="small"
                  variant="outlined"
                  label="To Address"
                  onChange={(e) => setToAddress(e.target.value)}
                  style={{ marginTop: "15px", width: "400px" }}
                />
              </div>
              <div className={classes.formGroup}>
                <TextField
                  size="small"
                  variant="outlined"
                  label="Ammount"
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  style={{ width: "400px" }}
                />
              </div>
              <div className={classes.formGroup}>
                <Button
                  onClick={handleClick}
                  variant="outlined"
                  type="submit"
                  className={classes.btnSubmit}
                >
                  Send
                </Button>
              </div>
            </Paper>
          </form>
          <Dialog
            open={show}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Sign transaction"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please confirm if you want to sign this transaction
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirm} color="primary" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </section>
      </Paper>
    </div>
  );
};
export default Send;
