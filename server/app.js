// const express = require('express');
// const bodyParser = require('body-parser')
// const { connectToPeers, getSockets, initP2PServer } = require('./p2p');
// const { Block, generateNextBlock, getBlockchain } = require('./blockchain');
// const httpPort = parseInt(process.env.HTTP_PORT) || 3001;
// const p2pPort = parseInt(process.env.P2P_PORT) || 6001;
// console.log(process.env.HTTP_PORT);
// console.log(process.env.P2P_PORT);
// const initHttpServer = (myHttpPort) => {
//     const app = express();
//     app.use(express.urlencoded({ extended: true }));
//     app.use(express.json());
//     app.use(bodyParser.urlencoded({
//         extended: true
//     }));

//     app.use(bodyParser.json());

//     app.get('/blocks', (req, res) => {
//         res.send(getBlockchain());
//     });
//     app.post('/mineBlock', (req, res) => {
//         const newBlock = generateNextBlock(req.body.data);
//         res.send(newBlock);
//     });
//     app.get('/peers', (req, res) => {
//         res.send(getSockets().map((s) => s._socket.remoteAddress + ':' + s._socket.remotePort));
//     });
//     app.post('/addPeer', (req, res) => {
//         connectToPeers(req.body.peer);
//         res.send();
//     });

//     app.listen(myHttpPort, () => {
//         console.log('Listening http on port: ' + myHttpPort);
//     });
// };
// initHttpServer(httpPort);
// initP2PServer(p2pPort);

const createError = require("http-errors");
const express = require("express");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const updateDataRouter = require("./routers/updatedata-router");
const walletRouter = require("./routers/wallet-router");

const cors = require("cors");
const app = express();

// view engine setup
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/updatedata", updateDataRouter);
app.use("/wallet", walletRouter);

app.get("/", (req, res) => {
  res.send("Hello My Wallet");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ message: "Something broke" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
