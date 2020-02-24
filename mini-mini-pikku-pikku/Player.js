module.exports = class Player {
  constructor() {
    this.id = null;
    this.win = false;
    this.lose = false;
    this.value = null;
    this.socket = null;
    this.turn = true;
    this.nickName = null;
    this.playAgain = null;
  }
  getId(){
    return this.id;
  }
  setId(id){
    this.id = id;
  }
  getValue(){
    return this.value;
  }
  setValue(value){
    this.value = value;
  }
  getSocket() {
    return this.socket;
  }
  setSocket(socket){
    this.socket = socket;
  }
  getTurn() {
    return this.turn;
  }
  setTurn(turn) {
    this.turn = turn;
  }
  getNickName(){
    return this.nickName;
  }
  setNickName(nickName){
    this.nickName = nickName;
  }
  setPlayAgain(play){
    this.playAgain = play;
  }
  getPlayAgain(){
    return this.playAgain;
  }
 
}
