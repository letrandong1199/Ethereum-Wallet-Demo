import React, { useState, useRef } from "react";
import { Paper, Typography, Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useStyles from "./style";

const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const AccessWallet = () => {
  const classes = useStyles();
  const [alert, setAlert] = useState(
    "A private key is a 256-bit number in hexadecimal"
  );
  const [privateKey, setPrivateKey] = useState();
  const privateKeyRef = useRef();
  const history = useHistory();

  const handleClick = async () => {
    if (checkValidPrivate()) {
      const myKey = ec.keyFromPrivate(privateKey);
      const myWalletAddress = myKey.getPublic("hex");
      await localStorage.setItem("privateKey", privateKey);
      await localStorage.setItem("address", myWalletAddress);
      history.push("/dashboard");
    } else {
      setAlert("Private key not valid");
    }
  };

  const checkValidPrivate = () => {
    console.log(privateKey);
    var re = /[0-9A-Fa-f]{6}/g;
    if (re.test(privateKey) && privateKey.length === 64) {
      return true;
    }
    return false;
  };
  return (
    <React.Fragment>
      <Paper className={classes.paper}></Paper>
      <Paper className={classes.bodyPaper}>
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontWeight: "500",
              fontSize: "30px",
              lineHeight: "42px",
              marginBottom: "15px",
            }}
          >
            Access Your Wallet By Private Key
          </h2>
          <h5
            style={{
              fontWeight: "400",
              fontSize: "14px",
              marginBottom: "15px",
            }}
          >
            You dont have a Wallet ?
            <a href="/create-wallet" className={classes.linka}>
              Create A New Wallet
            </a>
          </h5>
        </div>
        <div>
          <div
            style={{
              margin: "0 auto",
              width: "600px",
              height: "400px",
              backgroundColor: "#fff",
              position: "relative",
            }}
          >
            <Typography
              style={{
                textAlign: "center",
                backgroundColor: "#434f61",
                color: "#fff",
                padding: "6px 18px",
                borderRadius: "10px 10px 0 0",
              }}
            ></Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                height: "80%",
              }}
            >
              <Typography style={{ color: "#b4a71a", margin: "2rem 0" }}>
                Enter Your Private Key
              </Typography>
              <p className={classes.alert}>{alert}</p>
              <TextField
                size="small"
                variant="outlined"
                label="PrivateKey"
                type="text"
                onChange={(e) => setPrivateKey(e.target.value)}
                style={{ width: "400px" }}
              ></TextField>
            </div>
            <Button
              variant="outlined"
              className={classes.btnGenerate}
              onClick={handleClick}
            >
              Access Wallet
            </Button>
          </div>
        </div>
      </Paper>
    </React.Fragment>
  );
};
export default AccessWallet;
