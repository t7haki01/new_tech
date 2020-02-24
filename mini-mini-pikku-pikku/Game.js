module.exports = class Game{
    constructor(){
        this.playerA;
        this.playerB;    
        this.isEnd ;
        this.winner;
        this.loser;
        this.status ;
        this.players ;
        this.picked ;
        this.justClicked;
    }


    getPlayerA() {
        return this.playerA;
    }
    setPlayerA(value) {
        this.playerA = value;
    }

    getPlayerB() {
        return this.playerB;
    }
    setPlayerB(value) {
        this.playerB = value;
    }

    getIsEnd() {
        return this.isEnd;
    }
    setIsEnd(value) {
        this.isEnd = value;
    }

    getWinner() {
        return this.winner;
    }
    setWinner(value) {
        this.winner = value;
    }

    getLoser() {
        return this.loser;
    }
    setLoser(value) {
        this.loser = value;
    }

    getStatus() {
        return this.status;
    }
    setStatus(value) {
        this.status = value;
    }

    getPlayers() {
        return this.players;
    }
    setPlayers(value) {
        this.players = value;
    }

    getPicked() {
        return this.picked;
    }
    setPicked(value) {
        this.picked = value;
    }

    getJustClicked() {
        return this.justClicked;
    }
    setJustClicked(value) {
        this.justClicked = value;
    }

}