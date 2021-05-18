import React, { useState, useEffect, useContext } from "react";
import HeaderDashBoard from "../../parts/containers/HeaderDashBoard/HeaderDashBoard";
import { Button } from "@material-ui/core";
import useStyles from "./style";
import { SocketContext } from "../../context/socket";
const Mine = () => {
  const classes = useStyles();
  const socket = useContext(SocketContext);
  const [buttonState, setButtonState] = useState(false);
  const [showState, setShowState] = useState(false);
  const [stateContent, setStateContent] = useState("");
  const [reward, setReward] = useState();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleMining = () => {
    setButtonState(true);
    setStateContent("Mining..............");
    setShowSuccess(false);
    setShowState(true);
    const data = {
      address: localStorage.getItem("address"),
      socket_id: socket.id,
    };
    console.log(data);
    socket.emit("mine", data);
  };
  useEffect(() => {
    socket.on("mine_success", (data) => {
      setStateContent("Mining successfully");
      setShowSuccess(true);
      setButtonState(false);
      setReward(data);
    });
  }, []);
  return (
    <div>
      <HeaderDashBoard />
      <Button
        onClick={handleMining}
        variant="filled"
        className={classes.btnMine}
        disabled={buttonState}
      >
        Mining
      </Button>
      {showState && (
        <p
          style={{
            fontStyle: "italic",
            fontSize: 24,
            position: "absolute",
            left: 100,
            top: 200,
          }}
        >
          {stateContent}
        </p>
      )}
      {showSuccess && (
        <p
          style={{
            fontStyle: "italic",
            fontWeight: "bold",
            fontSize: 24,
            position: "absolute",
            left: 100,
            top: 250,
            color: "#ff0000",
          }}
        >
          Congratualtion!! You are rewarded {reward} for mining new block!
        </p>
      )}
    </div>
  );
};
export default Mine;
