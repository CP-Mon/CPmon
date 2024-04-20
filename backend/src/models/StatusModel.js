export default class Status {
    /**
     * constructor for status initialize all of the variables
     * @param {number} maxHp 
     * @param {number} hp 
     * @param {number} atk 
     * @param {number} def 
     * @param {number} mAtk 
     */
    constructor(maxHp, atk, def, mAtk) {
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.atk = atk;
        this.def = def;
        this.mAtk = mAtk;
    }
    static CARRY() {
        return new Status(15, 4, 1, 3);
    }
    static BALACNCE() {
        return new Status(20,   3, 2, 5);
    }
    static TANK() {
        return new Status(30, 2, 3, 4);
    }
    static JOMNOIZ() {
        return new Status(999, 999, 999, 999);
    }
    clone() {
        return new Status(this.maxHp, this.atk, this.def, this.mAtk);
    }
}