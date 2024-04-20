import CPmon from "../models/CPmonModel.js";
import Status from "../models/StatusModel.js";

const CPmons = [
    new CPmon("Neen", Status.BALACNCE()),
    new CPmon("Beam", Status.TANK()),
    new CPmon("Nadeem", Status.CARRY()),
    new CPmon("Tokyo", Status.BALACNCE()),
    new CPmon("JOMNOIZ", Status.JOMNOIZ())
]; 

export default CPmons;