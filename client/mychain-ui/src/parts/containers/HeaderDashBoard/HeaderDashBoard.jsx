import React, { useContext } from "react";
import { Paper, Grid, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
// import { SocketContext } from "../../../context/socket";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import useStyles from "./style";

const HeaderDashBoard = () => {
  // const socket = useContext(SocketContext);
  const history = useHistory();
  const handleLogout = (e) => {
    localStorage.clear();
    history.push("/");
    // socket.emit("log_disconnect");
  };

  const classes = useStyles();

  return (
    <Paper className={classes.paper} style={{ Swidth: "100%" }}>
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ minHeight: "48px" }}
      >
        <Grid item xs={3}>
          <Typography
            style={{
              marginLeft: "5%",
              color: "#0078D4",
              fontSize: "0.875rem",
              fontWeight: "bold",
            }}
          >
            My Coin Demo
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Link to="/dashboard" className={classes.link}>
            Dashboard
          </Link>
        </Grid>
        <Grid item xs={2}>
          <Link to="/send" className={classes.link}>
            Send
          </Link>
        </Grid>
        <Grid item xs={2}>
          <Link to="#" className={classes.link}>
            Block and Transaction
          </Link>
        </Grid>
        <Grid item xs={2}>
          <Link to="#" className={classes.link}>
            Mine
          </Link>
        </Grid>
        <Grid item xs={1}>
          <ExitToAppIcon onClick={handleLogout} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HeaderDashBoard;
