import CPmon from "./cpmonModel";
export default class Player {

    /**
     * @param {String} name 
     */
    constructor(name) {
        this.name = name;
        /** @type {CPmon[]} */
        this.pokemonList = [];
    }
    isReady() {
        return this.pokemonList.length >= 0;
    }
    addPokemon(pokemon) {
        this.pokemonList.push(pokemon);
    }
    removePokemon(pokemonName) {
        this.pokemonList = this.pokemonList.filter(pokemon => (pokemon.name !== pokemonName));
    }
    clearPokemon() {
        this.pokemonList = this.pokemonList.filter(pokemon => pokemon.health > 0);
    }
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
}