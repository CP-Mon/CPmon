import Status from "./Status"

export default class CPmon {

    /**
     * 
     * @param {String} name 
     * @param {Status} status 
     */
    constructor(name, status) {
        this.name = name
        this.status = status
    }

    /**
     * this CPmon attack the enemy
     * @param {CPmon} enemy
     * @returns {number}
     */
    attack(enemy) {
        damage = Math.max(
            0,
            this.status.atk - enemy.status.def
        );
        enemy.status.hp = Math.max(
            0,
            enemy.status.hp - damage
        );
        return damage;
    }
}