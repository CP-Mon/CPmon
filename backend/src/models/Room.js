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
    }

    /** @param {Player} player */
    addPlayer(player) {
        if(this.players.length < this.maxPlayers) {
            this.players.push(player);
            return true; // Player added successfully
        }
        throw new Error(`${this.roomId}: ${this.roomName} is full.`)
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

    isGameOver() {
        this.players.forEach(player => {
                if(!player.isReady()) return true;
            }
        )
        return false;
    }

    startGame() {
        if(this.players.length < 2) {
            return false;
        }
        this.gameStart = true;
        this.turnPlayer = this.players[0];
        return true;
    }

    // method after this comment can be run if gameStart is true
    /** @param {Player} player  */
    getOtherPlayer(player) {
        if(this.players.length !== 2) {
            throw new Error("There must be exactly 2 players.");
        }
        return this.players.find(p => p.name !== player.name);
    }

    /**
     * @param {String} playerName 
     * @param {String} action 
     */
    playerAction(playerName, action) {
        if(!this.gameStart) {
            throw new Error("Game has not started yet.");
        }
        const player = this.players.find(player => player.name === playerName);
        if(!player) {
            throw new Error("Player not found.");
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
        this.turnPlayer = this.getOtherPlayer();
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