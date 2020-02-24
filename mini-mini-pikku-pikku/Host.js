const Game = require('./Game.js');


module.exports = class Host {
  constructor() {
  }
  games = [];
  get games() {
    return this.games;
  }
}
