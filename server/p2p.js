// const WebSocket = require('ws');
// const { Server } = require('ws');
// const { addBlockToChain, Block, getBlockchain, getLastestBlock, isValidBlockStructure, replaceChain } = require('./blockchain');

// console.log("dsafhas", require('./blockchain'))

// const sockets = [];
// const MessageType = {
//     QUERRY_LASTEST: 0,
//     QUERY_ALL: 1,
//     RESPONSE_BLOCKCHAIN: 2,
// }

// const initP2PServer = (p2pPort) => {
//     const server = new WebSocket.Server({ port: p2pPort });
//     server.on('connection', (ws) => {
//         initConnection(ws);
//     });
//     console.log('Listening websocket p2p port on: ' + p2pPort)
// };

// const getSockets = () => sockets;

// const initConnection = (ws) => {
//     sockets.push(ws);
//     console.log(sockets);
//     initMessageHandler(ws);
//     initErrorHandler(ws);
//     write(ws, queryChainLengthMsg())
// }

// const initMessageHandler = (ws) => {
//     ws.on('message', (data) => {
//         const message = JSON.parse(data);
//         console.log(message);
//         if (message === null) {
//             console.log('could not parse received JSON message: ' + data);
//             return;
//         }
//         console.log('Received message' + JSON.stringify(message));
//         switch (message.type) {
//             case MessageType.QUERY_LATEST:
//                 console.log("asjgdfhasgdfas", getBlockchain);
//                 write(ws, responseLatestMsg());
//                 break;
//             case MessageType.QUERY_ALL:
//                 write(ws, responseChainMsg());
//                 break;
//             case MessageType.RESPONSE_BLOCKCHAIN:
//                 console.log(message.data);
//                 const receivedBlocks = message.data;
//                 if (receivedBlocks === null) {
//                     console.log('invalid blocks received:');
//                     console.log(message.data)
//                     break;
//                 }
//                 handleBlockchainResponse(receivedBlocks);
//                 break;
//         }
//     });
// };

// const write = (ws, message) => ws.send(JSON.stringify(message));
// const broadcast = (message) => sockets.forEach((socket) => write(socket, message));
// const queryChainLengthMsg = () => ({ 'type': MessageType.QUERY_LATEST, 'data': null });
// const queryAllMsg = () => ({ 'type': MessageType.QUERY_ALL, 'data': null });
// const responseChainMsg = () => ({
//     'type': MessageType.RESPONSE_BLOCKCHAIN, 'data': JSON.stringify(getBlockchain())
// });
// const responseLatestMsg = () => ({
//     'type': MessageType.RESPONSE_BLOCKCHAIN,
//     'data': JSON.stringify([getLastestBlock()])
// });

// const initErrorHandler = (ws) => {
//     const closeConnection = (myWs) => {
//         console.log('connection failed to peer: ' + myWs.url);
//         sockets.splice(sockets.indexOf(myWs), 1);
//     };
//     ws.on('close', () => closeConnection(ws));
//     ws.on('error', () => closeConnection(ws));
// };

// const handleBlockchainResponse = (receivedBlocks) => {
//     if (receivedBlocks.length === 0) {
//         console.log('received block chain size of 0');
//         return;
//     }
//     const latestBlockReceived = receivedBlocks[receivedBlocks.length - 1];
//     if (!isValidBlockStructure(latestBlockReceived)) {
//         console.log('block structuture not valid');
//         return;
//     }
//     const latestBlockHeld = require('./blockchain').getLastestBlock;
//     if (latestBlockReceived.index > latestBlockHeld.index) {
//         console.log('blockchain possibly behind. We got: '
//             + latestBlockHeld.index + ' Peer got: ' + latestBlockReceived.index);
//         if (latestBlockHeld.hash === latestBlockReceived.previousHash) {
//             if (addBlockToChain(latestBlockReceived)) {
//                 broadcast(responseLatestMsg());
//             }
//         } else if (receivedBlocks.length === 1) {
//             console.log('We have to query the chain from our peer');
//             broadcast(queryAllMsg());
//         } else {
//             console.log('Received blockchain is longer than current blockchain');
//             replaceChain(receivedBlocks);
//         }
//     } else {
//         console.log('received blockchain is not longer than received blockchain. Do nothing');
//     }
// };

// const broadcastLatest = () => {
//     broadcast(responseLatestMsg());
// };

// const connectToPeers = (newPeer) => {
//     const ws = new WebSocket(newPeer);
//     console.log(ws)
//     console.log(newPeer);
//     ws.on('open', () => {
//         initConnection(ws);
//     });
//     ws.on('error', () => {
//         console.log('connection failed');
//     });
// };
// module.exports = { connectToPeers, broadcastLatest, initP2PServer, getSockets };

const { Server } = require("socket.io");
const Blockchain = require("./blockchain");
const Block = require("./block");
const Transaction = require("./transaction");
const fs = require("fs");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

/*
Code use to get or create data
Socket server be also a node in network -> get local data of this node not by reading file './data.json'
If file not existed, create new blockchain and create a file to save local data
*/
let mycoin = new Blockchain();
const path = "./data.json";
try {
  if (fs.existsSync(path)) {
    try {
      const data = fs.readFileSync(path, "utf8");
      const myObject = JSON.parse(data);
      console.log(JSON.stringify(myObject));
      chain = [];
      for (let i = 0; i < myObject["blockchain"].length; i++) {
        // create transaction
        current_block = myObject["blockchain"][i];
        transaction = [];
        for (let j = 0; j < current_block["transactions"].length; j++) {
          current_transaction = current_block["transactions"][j];
          new_transaction = new Transaction(
            current_transaction["fromAddress"],
            current_transaction["toAddress"],
            current_transaction["amount"]
          );
          new_transaction["timestamp"] = current_transaction["timestamp"];
          new_transaction["signature"] = current_transaction["signature"];

          transaction.push(new_transaction);
        }

        block = new Block(current_block["timestamp"], transaction);
        block["previousHash"] = current_block["previousHash"];
        block["hash"] = current_block["hash"];
        block["nonce"] = current_block["nonce"];
        chain.push(block);
      }
      mycoin.chain = chain;

      pendingtransaction = [];
      for (let i = 0; i < myObject["pendingTransactions"].length; i++) {
        current_pending_transaction = myObject["pendingTransactions"][i];
        pendingtransaction.push(
          new Transaction(
            current_pending_transaction["fromAddress"],
            current_pending_transaction["toAddress"],
            current_pending_transaction["amount"]
          )
        );
      }
      mycoin.pendingTransactions = pendingtransaction;
    } catch (err) {
      console.error(err);
    }
  } else {
    const myObject = {
      blockchain: mycoin.chain,
      pendingTransactions: mycoin.pendingTransactions,
    };
    fs.writeFile(path, JSON.stringify(myObject), function (err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(myObject));
    });
  }
} catch (err) {
  console.error(err);
}

//Create socket server listen at port 8000
const server = new Server(8000, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// Event fired every time a new client connects:
server.on("connection", (socket) => {
  socket.on("log_connect", () => {
    console.info(`Client connected [id=${socket.id}]`);
  });

  /* Process when a new node connect and send local data
    Check if blockchain valid and have longer length -> Broadcast to all nodes in network for update local data
    Else, send current data to that node 
    */
  socket.on("local_data", (local_data) => {
    // console.info(`Client local data: ${JSON.stringify(local_data)}`);
    // console.info(`Local chain: ${local_data["blockchain"]}`)
    // console.info(`Local pending transactions: ${local_data.pendingTransactions}`)
    client_blockchain = new Blockchain();
    // Read chain from data
    chain = [];
    for (let i = 0; i < local_data["blockchain"].length; i++) {
      // create transaction
      current_block = local_data["blockchain"][i];
      transaction = [];
      for (let j = 0; j < current_block["transactions"].length; j++) {
        current_transaction = current_block["transactions"][j];
        new_transaction = new Transaction(
          current_transaction["fromAddress"],
          current_transaction["toAddress"],
          current_transaction["amount"]
        );
        new_transaction["timestamp"] = current_transaction["timestamp"];
        new_transaction["signature"] = current_transaction["signature"];

        transaction.push(new_transaction);
      }

      block = new Block(current_block["timestamp"], transaction);
      block["previousHash"] = current_block["previousHash"];
      block["hash"] = current_block["hash"];
      block["nonce"] = current_block["nonce"];
      chain.push(block);
    }
    client_blockchain.chain = chain;

    pendingtransaction = [];
    for (let i = 0; i < local_data["pendingTransactions"].length; i++) {
      current_pending_transaction = local_data["pendingTransactions"][i];
      pendingtransaction.push(
        new Transaction(
          current_pending_transaction["fromAddress"],
          current_pending_transaction["toAddress"],
          current_pending_transaction["amount"]
        )
      );
    }
    client_blockchain.pendingTransactions = pendingtransaction;

    console.log(`Check blockchain valid: ${client_blockchain.isChainValid()}`);
    console.log(
      `Check if have longer length: ${
        client_blockchain.chain.length > mycoin.chain.length
      }`
    );
    if (
      client_blockchain.isChainValid() &&
      client_blockchain.chain.length > mycoin.chain.length
    ) {
      console.log(`Update network data from new connection local data`);
      mycoin.chain = client_blockchain.chain;
      mycoin.pendingTransactions = client_blockchain.pendingTransactions;
    } else {
      console.log(`Update new connection local data from network data`);
    }

    return_object = {
      blockchain: mycoin.chain,
      pendingTransactions: mycoin.pendingTransactions,
    };

    fs.writeFile(path, JSON.stringify(return_object), function (err) {
      if (err) return console.log(err);
    });

    console.log(`Data: ${JSON.stringify(return_object)}`);

    socket.emit("sync_data", return_object);
  });

  // Process to return amount of a address
  socket.on("getAmount", (data) => {
    address = data["address"];
    socketId = data["socketId"];
    res = mycoin.getBalanceOfAddress(address);
    server.to(socketId).emit("getAmount", `${res}`);
  });

  socket.on("add_PT", (data) => {
    fromAddress = data["fromAddress"];
    toAddress = data["toAddress"];
    amount = data["amount"];
    myKey = ec.keyFromPrivate(data["privateKey"]);
    const tx = new Transaction(fromAddress, toAddress, parseInt(amount));
    tx.signTransaction(myKey);
    mycoin.addTransaction(tx);

    console.log("Add new pending transaction successfully");
    return_object = {
      blockchain: mycoin.chain,
      pendingTransactions: mycoin.pendingTransactions,
    };

    fs.writeFile(path, JSON.stringify(return_object), function (err) {
      if (err) return console.log(err);
    });

    console.log(`Data: ${JSON.stringify(return_object)}`);

    socket.emit("sync_data", return_object);
  });

  socket.on("mine", (data) => {
    const temp = new Blockchain();
    temp.chain = mycoin.chain;
    temp.pendingTransactions = mycoin.pendingTransactions;
    // if mine success
    if (temp.minePendingTransactions(data["address"])) {
      mycoin.chain = temp.chain;
      mycoin.pendingTransactions = temp.pendingTransactions;
      server.to(data["socket_id"]).emit("mine_success", mycoin.miningReward);

      return_object = {
        blockchain: mycoin.chain,
        pendingTransactions: mycoin.pendingTransactions,
      };

      fs.writeFile(path, JSON.stringify(return_object), function (err) {
        if (err) return console.log(err);
      });

      console.log(`Data: ${JSON.stringify(return_object)}`);

      socket.emit("sync_data", return_object);
    }
  });

  socket.on("get_all_blocks", () => {
    socket.emit("blocks", { result: mycoin.getAllBlocks() });
  });

  socket.on("get_all_transactions", () => {
    socket.emit("transactions", { result: mycoin.getAllTransactions() });
  });

  socket.on("get_my_transactions", (data) => {
    socket.emit("transactions", {
      result: mycoin.getAllTransactionsForWallet(data),
    });
  });

  socket.on("log_disconnect", () => {
    console.info(`Client gone [id=${socket.id}]`);
  });

  // when socket disconnects, remove it from the list:
  socket.on("disconnect", () => {});
});
