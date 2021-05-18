import React, { useState, useEffect } from "react";
import { Paper, Typography, Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useStyles from "./style";

const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const CreateWallet = () => {
  const [privateKey, setPrivateKey] = useState("a");
  const history = useHistory();
  const handleClick = async () => {
    const myKey = ec.keyFromPrivate(privateKey);
    const myWalletAddress = myKey.getPublic("hex");
    await localStorage.setItem("privateKey", privateKey);
    await localStorage.setItem("address", myWalletAddress);
    history.push("/dashboard");
  };
  useEffect(() => {
    fetch(`http://localhost:3000/wallet/create`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPrivateKey(result.result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const classes = useStyles();
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
            Get a New Wallet
          </h2>
          <h5
            style={{
              fontWeight: "400",
              fontSize: "14px",
              marginBottom: "15px",
            }}
          >
            Already have a Wallet ?
            <a href="/access-wallet" className={classes.linka}>
              {" "}
              Access My Wallet
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
            >
              By Private Key
            </Typography>
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
                Remember this key carefully. If you forget your private key, you
                will lost your wallet
              </Typography>
              <Typography>{privateKey}</Typography>
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
export default CreateWallet;
