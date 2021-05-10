const CryptoJS = require("crypto-js");
//Define block
class Block {
    constructor(index, hash, previousHash, timestamp, data) {
        this.index = index;
        this.hash = hash.toString();
        this.previousHash = previousHash.toString();
        this.timestamp = timestamp;
        this.data = data;
    }
}
// Generate first index of chain
const genesisBlock = () => {
    const newBlock = new Block(0, "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7", 0, Date.UTC(new Date().getDate()), 100000);
    return newBlock;
}
//Hash of block
const caculateHash = (index, previousHash, timestamp, data) => {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
}
let blockchain = [genesisBlock()];
//get chain[]
const getBlockchain = () => {
    return blockchain;
}
//get last block in chain []
const getLastestBlock = () => {
    return blockchain[blockchain.length - 1];
}
//add block in chain[]
const addBlock = (newBlock) => {
    if (isValidNewBlock(newBlock, getLastestBlock())) {
        blockchain.push(newBlock);
    }
}
// Valid block present with previous block 
const isValidNewBlock = (newBlock, previousBlock) => {
    if (isValidBlockStructure(newBlock)) {
        console.log('invalid structure');
        return false;
    }
    if (previousBlock.index + 1 !== newBlock.index) {
        console.log('invalid index');
        return false;
    } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
        console.log(typeof (newBlock.hash) + ' ' + typeof (calculateHashForBlock(newBlock)));
        console.log('invalid hash: ' + calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
        return false;
    }
    return true;
}

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
    return typeof block.index === 'number'
        && typeof block.hash === 'string'
        && typeof block.previousHash === 'string'
        && typeof block.timestamp === 'number'
        && typeof block.data === 'string';
};

const generateNextBlock = (blockData) => {
    const previousBlock = getLatestBlock();
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = new Date().getTime() / 1000;
    const nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
    const newBlock = new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
    addBlock(newBlock);
    broadcasrLatest();
    return newBlock;
}


const addBlockToChain = (newBlock) => {
    if (isValidNewBlock(newBlock, getLatestBlock())) {
        blockchain.push(newBlock);
        return true;
    }
    return false;
};

const replaceChain = (newBlocks) => {
    if (isValidChain(newBlocks) && newBlocks.length > getBlockchain().length) {
        console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
        blockchain = newBlocks;
        broadcastLatest();
    } else {
        console.log('Received blockchain invalid');
    }
};
module.exports = { Block, getBlockchain, getLastestBlock, generateNextBlock, isValidBlockStructure, replaceChain, addBlockToChain };