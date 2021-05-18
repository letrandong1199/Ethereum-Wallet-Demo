const Blockchain = require("./blockchain");
const Block = require("./block");
const Transaction = require("./transaction");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
  "fe8fc36eb4e4098b8aed9ab8078e28258a43c66d74b0b973c38d1a99f2b63e75"
);
const myWalletAddress = myKey.getPublic("hex");

const toKey_1 = ec.keyFromPrivate(
  "2cc2748f06dcce81c214adecb6d8004ffa704881d8014c154b4ad0924dbac019"
);
const toAddress_1 = toKey_1.getPublic("hex");

const toKey_2 = ec.keyFromPrivate(
  "b2127999935dcb234624773b1390ebe15246f07d2780a528617df63274a95f4e"
);
const toAddress_2 = toKey_2.getPublic("hex");

const toKey_3 = ec.keyFromPrivate(
  "a939569c78b000350c0114f064b3015ab69cd439d6e9177570a066eecc0b1401"
);
const toAddress_3 = toKey_3.getPublic("hex");

const toKey_4 = ec.keyFromPrivate(
  "441f163f01b23e326631ff664b48e1ed597e238ada9243f05ce650c9db1823bf"
);
const toAddress_4 = toKey_4.getPublic("hex");

let mycoin = new Blockchain();
console.log("mycoinnnnn", mycoin);
const tx1 = new Transaction(myWalletAddress, toAddress_1, 100);
tx1.signTransaction(myKey);
mycoin.addTransaction(tx1);

console.log("\n Starting the miner...");
mycoin.minePendingTransactions(myWalletAddress);

const tx2 = new Transaction(myWalletAddress, toAddress_2, 150);
tx2.signTransaction(myKey);
mycoin.addTransaction(tx2);

console.log("\n Starting the miner...");
mycoin.minePendingTransactions(myWalletAddress);

const tx3 = new Transaction(myWalletAddress, toAddress_3, 250);
tx3.signTransaction(myKey);
mycoin.addTransaction(tx3);

console.log("\n Starting the miner...");
mycoin.minePendingTransactions(myWalletAddress);

const tx4 = new Transaction(myWalletAddress, toAddress_4, 100);
tx4.signTransaction(myKey);
mycoin.addTransaction(tx4);

console.log("\n Starting the miner...");
mycoin.minePendingTransactions(myWalletAddress);

console.log(
  "\nBalance of mine is",
  mycoin.getBalanceOfAddress(myWalletAddress)
);
console.log(
  "\nBalance of toAddress_1 is",
  mycoin.getBalanceOfAddress(toAddress_1)
);
console.log(
  "\nBalance of toAddress_2 is",
  mycoin.getBalanceOfAddress(toAddress_2)
);
console.log(
  "\nBalance of toAddress_3 is",
  mycoin.getBalanceOfAddress(toAddress_3)
);
console.log(
  "\nBalance of toAddress_4 is",
  mycoin.getBalanceOfAddress(toAddress_4)
);

console.log("\nBlockchain", mycoin.chain);
console.log("\nCheck valid blockchain", mycoin.isChainValid());
