module.exports = class Game{
    constructor(){
    }

    playerA = null;
    get playerA() {
        return this.playerA;
    }
    set playerA(value) {
        this.playerA = value;
    }
    playerB = null;
    get playerB() {
        return this.playerB;
    }
    set playerB(value) {
        this.playerB = value;
    }
    
    isEnd = false;
    get isEnd() {
        return this.isEnd;
    }
    set isEnd(value) {
        this.isEnd = value;
    }
    winner = null;
    get winner() {
        return this.winner;
    }
    set winner(value) {
        this.winner = value;
    }
    loser = null;
    get loser() {
        return this.loser;
    }
    set loser(value) {
        this.loser = value;
    }
    status = '';
    get status() {
        return this.status;
    }
    set status(value) {
        this.status = value;
    }
    players = [];
    get players() {
        return this.players;
    }
    set players(value) {
        this.players = value;
    }

    picked = [];
    get picked() {
        return this.picked;
    }
    set picked(value) {
        this.picked = value;
    }

    justClicked = null;
    get justClicked() {
        return this.justClicked;
    }
    set justClicked(value) {
        this.justClicked = value;
    }

}