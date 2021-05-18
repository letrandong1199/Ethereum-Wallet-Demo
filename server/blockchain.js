const Block = require("./block");
const CryptoJS = require("crypto-js");
const Transaction = require("./transaction");
const { result } = require("lodash");
//Define block
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block(Date.parse("2017-01-01"), [], "0");
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  minePendingTransactions(miningRewardAddress) {
    if (this.pendingTransactions.length > 0) {
      const rewardTx = new Transaction(
        null,
        miningRewardAddress,
        this.miningReward
      );
      this.pendingTransactions.push(rewardTx);

      const block = new Block(
        Date.now(),
        this.pendingTransactions,
        this.getLatestBlock().hash
      );
      block.mineBlock(this.difficulty);

      console.log("Block successfully mined!");
      this.chain.push(block);

      this.pendingTransactions = [];

      return true;
    }
  }
  addTransaction(transaction) {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error("Transaction must include from and to address");
    }

    if (!transaction.isValid()) {
      throw new Error("Cannot add invalid transaction to chain");
    }

    if (transaction.amount <= 0) {
      throw new Error("Transaction amount should be higher than 0");
    }

    // if (
    //   this.getBalanceOfAddress(transaction.fromAddress) < transaction.amount
    // ) {
    //   throw new Error("Not enough balance");
    // }

    this.pendingTransactions.push(transaction);
    console.log("transaction added: %s", transaction);
  }
  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }
    // console.log("getBalanceOfAddrees: %s", balance);
    return balance;
  }

  getAllTransactionsForWallet(address) {
    const txs = [];

    for (const block of this.chain) {
      for (const tx of block.transactions) {
        if (tx.fromAddress === address || tx.toAddress === address) {
          txs.push(tx);
        }
      }
    }

    // console.log('get transactions for wallet count: %s', txs.length);
    return txs;
  }

  getAllTransactions() {
    const txs = [];

    for (const block of this.chain) {
      for (const tx of block.transactions) {
        txs.push(tx);
      }
    }
    return txs;
  }

  getAllBlocks() {
    const blocks = [];

    for (const block of this.chain) {
      blocks.push(block);
    }
    return blocks;
  }

  isChainValid() {
    const realGenesis = JSON.stringify(this.createGenesisBlock());

    if (realGenesis !== JSON.stringify(this.chain[0])) {
      return false;
    }

    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];

      if (!currentBlock.hasValidTransactions()) {
        return false;
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
    }

    return true;
  }
}
module.exports = Blockchain;
// Generate first index of chain
/*
const genesisBlock = () => {
    const newBlock = new Block(0, "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7", 0, Date.UTC(new Date().getTime()), [], 0, 0);
    return newBlock;
}
//Hash of block
const calculateHash = (index, previousHash, timestamp, data, difficulty, nonce) => {
    return CryptoJS.SHA256(index + previousHash + timestamp + data + difficulty + nonce).toString();
}

let blockchain = [genesisBlock()];

let unspentTxOuts = [];

//get chain[]
const getBlockchain = () => {
    return blockchain;
}
//get last block in chain []
const getLastestBlock = () => {
    return blockchain[blockchain.length - 1];
}

//Define interval
const BLOCK_GENERATION_INTERVAL = 10;

// in blocks
const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;

//Get difficulty from lastblock in chain[]
const getDifficulty = (aBlockchain) => {
    const latestBlock = aBlockchain[blockchain.length - 1];
    if (latestBlock.index % DIFFICULTY_ADJUSTMENT_INTERVAL === 0 && latestBlock.index !== 0) {
        return getAdjustedDifficulty(latestBlock, aBlockchain);
    } else {
        return latestBlock.difficulty;
    }
};


const getAdjustedDifficulty = (latestBlock, aBlockchain) => {
    const prevAdjustmentBlock = aBlockchain[blockchain.length - DIFFICULTY_ADJUSTMENT_INTERVAL];
    const timeExpected = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;
    const timeTaken = latestBlock.timestamp - prevAdjustmentBlock.timestamp;
    if (timeTaken < timeExpected / 2) {
        return prevAdjustmentBlock.difficulty + 1;
    } else if (timeTaken > timeExpected * 2) {
        return prevAdjustmentBlock.difficulty - 1;
    } else {
        return prevAdjustmentBlock.difficulty;
    }
};

const getCurrentTimestamp = () => Math.round(new Date().getTime() / 1000);

//add block in chain[]
// const addBlock = (newBlock) => {
//     if (isValidNewBlock(newBlock, getLastestBlock())) {
//         blockchain.push(newBlock);
//     }
// }
// Valid block present with previous block
const isValidNewBlock = (newBlock, previousBlock) => {
    if (!isValidBlockStructure(newBlock)) {
        console.log('invalid structure');
        console.log('newBlock............:', newBlock);
        return false;
    }
    if (previousBlock.index + 1 !== newBlock.index) {
        console.log('invalid index');
        return false;
        // } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
        //     console.log(typeof (newBlock.hash) + ' ' + typeof (calculateHashForBlock(newBlock)));
        //     console.log('invalid hash: ' + calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
        //     return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
        console.log('invalid previoushash');
        return false;
    } else if (!isValidTimestamp(newBlock, previousBlock)) {
        console.log('invalid timestamp');
        return false;
    } else if (!hasValidHash(newBlock)) {
        return false;
    }
    return true;
}


const getAccumulatedDifficulty = (aBlockchain) => {
    return aBlockchain
        .map((block) => block.difficulty)
        .map((difficulty) => Math.pow(2, difficulty))
        .reduce((a, b) => a + b);
};

const isValidTimestamp = (newBlock, previousBlock) => {
    return (previousBlock.timestamp - 60 < newBlock.timestamp)
        && newBlock.timestamp - 60 < getCurrentTimestamp();
};

const hasValidHash = (block) => {

    if (!hashMatchesBlockContent(block)) {
        console.log('invalid hash, got:' + block.hash);
        return false;
    }

    if (!hashMatchesDifficulty(block.hash, block.difficulty)) {
        console.log('block difficulty not satisfied. Expected: ' + block.difficulty + 'got: ' + block.hash);
    }
    return true;
};

const hashMatchesBlockContent = (block) => {
    const blockHash = calculateHashForBlock(block);
    return blockHash === block.hash;
};

const hashMatchesDifficulty = (hash, difficulty) => {
    const hashInBinary = hexToBinary(hash);
    // console.log(`hashInBinary: ${hashInBinary}`);
    const requiredPrefix = '0'.repeat(difficulty);
    return hashInBinary.startsWith(requiredPrefix);
};



const isValidChain = (blockchainToValidate) => {
    const isValidGenesis = (block) => {
        return JSON.stringify(block) === JSON.stringify(genesisBlock);
    };

    if (!isValidGenesis(blockchainToValidate[0])) {
        return false;
    }

    for (let i = 1; i < blockchainToValidate.length; i++) {
        if (!isValidNewBlock(blockchainToValidate[i], blockchainToValidate[i - 1])) {
            return false;
        }
    }
    return true;
};

const isValidBlockStructure = (block) => {
    const flag = (typeof block.index == 'number'
        && typeof block.hash == 'string'
        && typeof block.previousHash == 'string'
        && typeof block.timestamp == 'number'
        && typeof block.data == 'object');

    console.log(flag);
    return flag;
};

const generateNextBlock = (blockData) => {
    const previousBlock = getLastestBlock();
    const difficulty = getDifficulty(getBlockchain());
    console.log(`difficulty:  + ${difficulty}`);
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = getCurrentTimestamp();
    // const nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
    const newBlock = findBlock(nextIndex, previousBlock.hash, nextTimestamp, blockData, difficulty);
    if (addBlockToChain(new Block)) {
        broadcastLatest();
        return newBlock;
    } else {
        return null;
    }

}

const findBlock = (index, previousHash, timestamp, data, difficulty) => {
    let nonce = 0;
    while (true) {
        const hash = calculateHash(index, previousHash, timestamp, data, difficulty, nonce);
        if (hashMatchesDifficulty(hash, difficulty)) {
            return new Block(index, hash, previousHash, timestamp, data, difficulty, nonce);
        }
        nonce++;
    }
};

const calculateHashForBlock = (block) =>
    calculateHash(block.index, block.previousHash, block.timestamp, block.data, block.difficulty, block.nonce);


const addBlock = (newBlock) => {
    if (isValidNewBlock(newBlock, getLastestBlock())) {
        blockchain.push(newBlock);
        console.log(blockchain);
    }
};

const addBlockToChain = (newBlock) => {
    if (isValidNewBlock(newBlock, getLastestBlock())) {
        const retVal = processTransactions(newBlock.data, unspentTxOuts, newBlock.index)
        if (retVal === null) {
            return false;
        }
        else {
            blockchain.push(newBlock);
            unspentTxOuts = retVal;
            return true;
        }
    }
    return false;
};

const replaceChain = (newBlocks) => {
    if (isValidChain(newBlocks) && getAccumulatedDifficulty(newBlocks) > getAccumulatedDifficulty(getBlockchain())) {
        console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
        blockchain = newBlocks;
        broadcastLatest();
    } else {
        console.log('Received blockchain invalid');
    }
};
module.exports = { Block, getBlockchain, getLastestBlock, generateNextBlock, isValidBlockStructure, replaceChain, addBlockToChain };*/
