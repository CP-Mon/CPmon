import CPmon from "./cpmonModel.js";
export default class Player {

    /**
     * @param {String} name 
     */
    constructor(name) {
        this.name = name;
        this.isReady = false;
        /** @type {CPmon[]} */
        this.pokemonList = [];
    }
    addPokemon(pokemon) {
        this.pokemonList.push(pokemon);
    }
    removePokemon(pokemonName) {
        const removedPokemon = this.pokemonList.find(pokemon => pokemon.name === pokemonName);
        if(!removedPokemon) {
            throw new Error(`there is no pokemon with name: ${pokemonName} to remove.`)
        }
        this.pokemonList = this.pokemonList.filter(pokemon => pokemon === removedPokemon);
    }
    clearPokemon() {
        this.pokemonList = this.pokemonList.filter(pokemon => pokemon.health > 0);
    }
    /** @returns {CPmon} */
    getMainPokemon() {
        if(this.pokemonList.length == 0) {
            throw new Error("There is no pokemon here.")
        }
        const pokemon = this.pokemonList[0];
        return pokemon;
    }
    /**
     * 
     * @param {String} pokemonName 
     * @returns {boolean}
     */
    changeMainPokemon(pokemonName) {
        const index = this.pokemonList.findIndex(pokemon => pokemon.name === pokemonName);
        if (index === -1) return false;
        const selectedPokemon = this.pokemonList[index];
        this.pokemonList.splice(index, 1);
        this.pokemonList.unshift(selectedPokemon);
        return true;
    }
    /** @param {Player} player  */
    attack(player) {
        const attackingPokemon = this.pokemonList[0];
        attackingPokemon.attack(player.pokemonList[0]);
    }
    guard() {
        this.getMainPokemon().guard();
    }
}