import React, { useState, useEffect, useContext } from "react";
import HeaderDashBoard from "../../parts/containers/HeaderDashBoard/HeaderDashBoard";
import { Paper, Typography, Grid, Avatar } from "@material-ui/core";
import { SocketContext } from "../../context/socket";
import myWalletIcon from "../../assets/img/my-wallet.png";
import HomeIcon from "@material-ui/icons/Home";
const DashBoard = () => {
  const socket = useContext(SocketContext);
  const [amount, setAmount] = useState();
  const [loaded, setLoaded] = useState(false);
  const [listTransactions, setListTransactions] = useState([]);

  useEffect(() => {
    if (!loaded) {
      socket.emit("log_connect");
      fetch(`http://localhost:3000/updatedata/`)
        .then((res) => res.json())
        .then(
          (result) => {
            localStorage.setItem("data", result.result);
            socket.emit("local_data", result.result);
            setLoaded(true);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      socket.emit("getAmount", {
        socketId: socket.id,
        address: localStorage.getItem("address"),
      });
      console.log(socket.id);
      socket.on("getAmount", (data) => {
        setAmount(data);
        localStorage.setItem("balance", data);
        console.log(`Amount: ${data}`);
      });
      socket.emit("get_my_transactions", localStorage.getItem("address"));
      socket.on("transactions", (data) => {
        console.log("Transactions: ", JSON.stringify(data["result"]));
        setListTransactions(data["result"].reverse());
      });
    }
  });

  return (
    <div>
      <HeaderDashBoard />
      <div
        style={{
          display: "flex",
          height: "90vh",
          justifyContent: "space-around",
          alignItems: "center",
          flex: "space",
        }}
      >
        <Paper
          variant="outlined"
          style={{
            backgroundColor: "#5a78f0",
            width: "470px",
            height: "271px",
          }}
        >
          <Grid container>
            <Grid item xs={3} style={{ padding: "24px" }}>
              <HomeIcon
                style={{ width: "100px", height: "100px", color: "#FFF" }}
              />
            </Grid>
            <Grid item xs={9} style={{ padding: "24px" }}>
              <Typography style={{ fontSize: "25px", color: "#fff" }}>
                Address
              </Typography>
              <Typography
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  overflowWrap: "break-word",
                  fontStyle: "italic",
                }}
              >
                {localStorage.getItem("address")}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper
          variant="outlined"
          style={{
            backgroundColor: "#05c0a5",
            width: "470px",
            height: "271px",
          }}
        >
          <Grid container>
            <Grid item xs={3} style={{ padding: "24px" }}>
              <Avatar
                src={myWalletIcon}
                style={{ width: "100px", height: "100px" }}
              ></Avatar>
            </Grid>
            <Grid item xs={9} style={{ padding: "24px" }}>
              <Typography style={{ fontSize: "25px", color: "#fff" }}>
                Balance
              </Typography>
              <Typography
                style={{
                  fontSize: "50px",
                  color: "#fff",
                  overflowWrap: "break-word",
                  fontStyle: "italic",
                }}
              >
                {amount}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
};
export default DashBoard;
