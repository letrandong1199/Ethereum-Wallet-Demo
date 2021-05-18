import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socket.js";
import {
  Paper,
  Grid,
  Button,
  List,
  ListItem,
  Typography,
  Divider,
} from "@material-ui/core";

import useStyles from "./style";
import HeaderDashBoard from "../../parts/containers/HeaderDashBoard/HeaderDashBoard";

const Statistic = () => {
  const socket = useContext(SocketContext);
  const [listBlocks, setListBlocks] = useState([]);
  const [listTransactions, setListTransactions] = useState([]);

  useEffect(() => {
    socket.emit("get_all_blocks");
    socket.emit("get_all_transactions");
    socket.on("blocks", (data) => {
      console.log("Blocks: ", JSON.stringify(data["result"]));
      setListBlocks(data["result"].reverse());
    });
    socket.on("transactions", (data) => {
      console.log("Transactions: ", JSON.stringify(data["result"]));
      setListTransactions(data["result"].reverse());
    });
  }, []);

  const dateTimeReviver = (value) => {
    var d = new Date(value);
    var formattedDate =
      d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
    var hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    var minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    var formattedTime = hours + ":" + minutes;

    formattedDate = formattedDate + " " + formattedTime;
    return formattedDate;
  };

  let lenBlocks = listBlocks.length;
  let lenTransactions = listTransactions.length;

  const classes = useStyles();
  return (
    <React.Fragment>
      <HeaderDashBoard />
      <Paper className={classes.paper}>
        <List>
          <ListItem>
            <Grid container>
              <Grid item xs={1}>
                <Typography style={{ fontSize: "0.875rem" }}>#</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography style={{ fontSize: "0.875rem" }}>
                  TimeStamp
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography style={{ fontSize: "0.875rem" }}>
                  From Address
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography style={{ fontSize: "0.875rem" }}>
                  To Address
                </Typography>
              </Grid>
              <Grid item xs={1} style={{ textAlign: "center" }}>
                <Typography style={{ fontSize: "0.875rem" }}>Amount</Typography>
              </Grid>
            </Grid>
          </ListItem>
          {listTransactions.map((row, index) => (
            <ListItem
              className={
                index % 2 === 0 ? classes.listItemEven : classes.listItemOdd
              }
              key={index}
            >
              <Grid container>
                <Grid item xs={1}>
                  <Typography style={{ fontSize: "0.875rem" }}>
                    {index + 1}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography style={{ fontSize: "0.875rem" }}>
                    {dateTimeReviver(row["timestamp"])}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography style={{ fontSize: "0.875rem" }}>
                    {row["formAddress"] === null
                      ? "System"
                      : ("" + row["fromAddress"]).substr(0, 15)}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography style={{ fontSize: "0.875rem" }}>
                    {"" + row["toAddress"].substr(0, 15)}
                  </Typography>
                </Grid>
                <Grid item xs={1} style={{ textAlign: "center" }}>
                  <Typography style={{ fontSize: "0.875rem" }}>
                    {row["amount"]}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Divider className={classes.divider} />
    </React.Fragment>
  );
};

export default Statistic;
