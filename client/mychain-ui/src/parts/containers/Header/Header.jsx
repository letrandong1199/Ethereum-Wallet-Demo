import React from "react";
import { Paper, Grid, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./style";

const Header = () => {
  const classes = useStyles();

  return (
    <Paper
      className={classes.paper}
      style={{ position: "fixed", top: "0", left: "0", width: "100%" }}
    >
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ minHeight: "48px" }}
      >
        <Grid item xs={4}>
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
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={6}>
              <Link to="/create-wallet" className={classes.link}>
                <Button variant="outlined" className={classes.root}>
                  New Wallet
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to="/access-wallet" className={classes.link}>
                <Button variant="outlined" className={classes.root}>
                  Access Wallet
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Header;
