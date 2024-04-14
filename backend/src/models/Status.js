export default class Status {
    /**
     * constructor for status initialize all of the variables
     * @param {number} maxHp 
     * @param {number} hp 
     * @param {number} atk 
     * @param {number} def 
     * @param {number} mAtk 
     * @param {number} mDef 
     */
    constructor(maxHp, hp, atk, def, mAtk, mDef) {
        this.maxHp = maxHp;
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.mAtk = mAtk;
        this.mDef = mDef;
    }
}