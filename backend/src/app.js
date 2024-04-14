import CPmon from "./models/CPmon.js";
import Status from "./models/Status.js";

// test and debug - can erase

const pikachu = new CPmon(
    "pikachu", 
    new Status(10, 10, 10, 10, 10, 10)
);

const beam = new CPmon(
    "beam", 
    new Status(10, 10, 10, 3, 10, 10)
);

pikachu.attack(beam)

console.log(beam.status.hp);