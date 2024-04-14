import Status from "./Status.js"

export default class CPmon {

    /**
     * constructor for CPmon 
     * @param {String} name - name of this CPmon
     * @param {Status} status - status of this CPmon
     */
    constructor(name, status) {
        this.name = name
        this.status = status
    }

    /**
     * this CPmon attack the enemy
     * @param {CPmon} enemy - the enemy that get attacked
     * @returns {number} - return the damage dealt
     */
    attack(enemy) {
        const damage = Math.max(
            0,
            this.status.atk - enemy.status.def
        );
        enemy.decreaseHp(damage);
        return damage;
    }

    mAttack(enemy) {
        const damage = Math.max(
            0,
            this.status.mAtk - enemy.status.mDef
        );
        enemy.decreaseHp(damage);
        return damage;
    }

    /**
     * decrease this CPmon Hp by the damage
     * @param {number} damage - damage that this pokemon get
     * @returns {boolean} - true if damage > 0 otherwise false
     */
    decreaseHp(damage) {
        if(damage <= 0) return false;
        const remainingHp = this.status.hp - damage;
        this.status.hp = Math.max(
            0,
            remainingHp
        );
        return true;
    }
}