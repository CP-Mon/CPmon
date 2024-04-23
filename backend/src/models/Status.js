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
        return new Status(30, 14, 2, 10);
    }
    static MAGE() {
        return new Status(25, 10, 2, 15);
    }
    static BALANCE() {
        return new Status(35, 12, 3, 10);
    }
    static TANK() {
        return new Status(50, 8, 4, 6);
    }
    // only for developping 
    static JOMNOIZ() {
        return new Status(999, 999, 999, 999);
    }
    clone() {
        return new Status(this.maxHp, this.atk, this.def, this.mAtk);
    }
}