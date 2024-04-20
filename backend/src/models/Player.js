import CPmon from "./CPmon.js";
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
        this.pokemonList = this.pokemonList.filter(pokemon => pokemon.status.hp > 0);
    }
    /** @returns {boolean} */
    isPokemonEmpty() {
        return this.pokemonList.length == 0;
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
        const attackingPokemon = this.getMainPokemon();
        attackingPokemon.attack(player.getMainPokemon());
    }
    guard() {
        this.getMainPokemon().guard();
    }

}