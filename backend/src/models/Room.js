import Player from "./Player.js";

export default class Room {

    /** @type {Number} */
    static roomCount = 0;

    /** @param {String} roomName  */
    constructor(roomName) {
        this.roomId = Room.roomCount;
        Room.roomCount += 1;
        this.roomName = roomName;
        /** @type {Player[]} */
        this.players = [];
        this.maxPlayers = 2;
        this.turnPlayer = null;
        this.gameStart = false;
        this.gameOver = false;
        this.winner = null;
    }

    /** @param {Player} player */
    addPlayer(player) {
        if(this.players.length >= this.maxPlayers) {
            throw new Error(`${this.roomName} is full.`)
        }
        if(this.players.find(p => p.name === player.name)) {
            throw new Error(`${player.name} is already in the room.`);
        }
        this.players.push(player);
        return true; // Player added successfully
    }

    /** @param {String} playerName  */
    removePlayer(playerName) {
        const index = this.players.findIndex(player => player.name === playerName);
        if(index !== -1) {
            this.players.splice(index, 1);
            return true; // Player removed successfully
        }
        return false;
    }

    startGame() {
        if (!this.isAllReady()) return;
        this.gameStart = true;
        this.turnPlayer = this.players[0];
    }

    endGame() {
        if(!this.isGameEnd()) return;
        this.gameStart = false;
        this.gameOver = true;
        const winner = this.players.find(player => !player.isPokemonEmpty());
        if(!winner) {
            throw new Error("This is not possible??????");
        }
        this.winner = winner;
    }

    isAllReady() {
        if (this.players.length != this.maxPlayers) return false;
        for(const player of this.players) {
            if(!player.isReady) {
                return false;
            }
        }
        return true;
    }

    isGameEnd() {
        for(const player of this.players) {
            if(player.isPokemonEmpty()) {
                return true;
            }
        }
        return false;
    }

    // method after this comment can be run if gameStart is true
    /** @param {Player} player  */
    getOtherPlayer(player) {
        if(this.players.length !== 2) {
            throw new Error("There must be exactly 2 players.");
        }
        const otherPlayer = this.players.find(p => p.name != player.name);
        if (!otherPlayer) {
            throw new Error(`Not possible Error: can not find other player`);
        }
        return otherPlayer;
    }

    /**
     * @param {String} playerName 
     * @param {String} action 
     */
    playerAction(player, action) {
        if(this.gameOver) {
            throw new Error("The game is ended.");
        }
        if(!this.gameStart) {
            throw new Error("Game has not started yet.");
        }
        if(player !== this.turnPlayer) {
            throw new Error("Not this player turn.");
        }
        switch(action) {
            case 'attack':
                this.handleAttack(player);
                break;
            case 'guard':
                this.handleGuard(player);
                break;
            default:
                throw new Error("Invalid action.");
        }
        if(this.isGameEnd()) {
            this.endGame();
        }
        this.turnPlayer = this.getOtherPlayer(player);
    }

    /** @param {Player} player  */
    handleAttack(player) {
        // Implement your attack logic here
        const otherPlayer = this.getOtherPlayer(player);
        player.attack(otherPlayer);
        otherPlayer.clearPokemon();
    }

    /** @param {Player} player  */
    handleGuard(player) {
        // Implement your guard logic here
        // This is just a placeholder
        player.guard();
    }
}