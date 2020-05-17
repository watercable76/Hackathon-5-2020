/* calls the package SHA256 and declares a var for 
   that data*/
const ChainUtil = require('../chain-util');

const { DIFFICULTY, MINE_RATE } = require('../config');

class Block {
    /* this constructor calls the data, and then sets
       it inside the constructor */
    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString() {
        // returns the data 

        /* substring returns from (a,b) total char
           from total string */
        return `Block
            Timestamp : ${this.timestamp}
            Last Hash : ${this.lastHash.substring(0, 10)}
            Hash      : ${this.hash.substring(0, 10)}
            Nonce     : ${this.nonce}
            Difficulty: ${this.difficulty}
            Data      : ${this.data}`;
    }

    /* What happens for the first block? Where does it 
    get the data for the last hash? There is a genesis
    block, one that has a hash, but also has false data
    to fill it.

    returns this, as in this class, with values
    */
    static genesis() {
        return new this('Genesis time', '----', 'f1r57-h45h', [], 0, DIFFICULTY);
    }

    /* assigns values to the new Block that will be 
       mined, or created */
    static mineBlock(lastBlock, data) {
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;

        // create the hash with the number of 0's equal to the 
        // difficulty level set for the blocks
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);          
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));


        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    /* this function creates the unique has based on 
       the input variables  */
    static hash(timestamp, lastHash, data, nonce, difficulty) {
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block) {
        const { timestamp, lastHash, data, nonce, difficulty } = block;
        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    // difficulty levels adjusted dynamically, adjusting for too slow and 
    // too fast mining
    static adjustDifficulty(lastBlock, currentTime) {
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }
}

module.exports = Block;