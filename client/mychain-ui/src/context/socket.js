import React from "react";
import socketio from "socket.io-client";
const { SERVER_IP } = require("../config");
const fs = require("browserify-fs");

export const socket = socketio.connect(`${SERVER_IP}:8000`, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});

socket.on("sync_data", (data) => {
  localStorage.setItem("data", data);
  fetch("http://localhost:3000/updatedata/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  fs.writeFile("my_data.txt", JSON.stringify(data));
});

export const SocketContext = React.createContext();
