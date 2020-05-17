/***********************************************************
* The difficulty level should not be raised above 6, as that 
* will require 6 zeros at the beginning of each hash. Also,
* the mine rate can be changed to ridiculous numbers, even 
* like 10 minutes, which bitcoin does. The MINE_RATE is in 
* seconds?
************************************************************/

const DIFFICULTY = 4;
const MINE_RATE = 3000;
const INITIAL_BALANCE = 500;

module.exports = { DIFFICULTY, MINE_RATE, INITIAL_BALANCE };