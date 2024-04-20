import CPmon from "../models/CPmon.js";
import Status from "../models/Status.js";

const CPmons = [
    new CPmon("Neen", Status.BALANCE()),
    new CPmon("Beam", Status.MAGE()),
    new CPmon("Nadeem", Status.CARRY()),
    new CPmon("Tokyo", Status.TANK()),
    new CPmon("JOMNOIZ", Status.JOMNOIZ())
]; 

export default CPmons;