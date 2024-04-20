import Status from "./Status.js"

export default class CPmon {

    /**
     * constructor for CPmon 
     * @param {String} name - name of this CPmon
     * @param {Status} status - status of this CPmon
     */
    constructor(name, status) {
        this.name = name;
        /** @type {boolean} */
        this.isGuard = false;
        this.status = status;
    }

    /**
     * this CPmon attack the enemy
     * @param {CPmon} enemy - the enemy that get attacked
     * @returns {number} - return the damage dealt
     */
    attack(enemy) {
        let enemyDef = enemy.status.def;
        if(enemy.isGuard) {
            enemyDef *= 2;
            enemy.isGuard = false;
            if(enemyDef < 0) {
                enemyDef = 0;
            }
        }
        const damage = Math.max(
            0,
            this.status.atk - enemyDef
        );
        enemy.decreaseHp(damage);
        return damage;
    }

    guard() {
        this.isGuard = true;
    }

    magic(enemy) {
        const damage = this.status.mAtk;
        this.status.def -= 1;
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

    clone() {
        return new CPmon(this.name, this.status.clone());
    }
}