import CPmon from "./models/CPmonModel.js";
import Status from "./models/StatusModel.js";

// test and debug - can erase

const pikachu = new CPmon(
    "pikachu", 
    new Status(10, 10, 10, 10, 10, 10)
);

const beam = new CPmon(
    "beam", 
    new Status(10, 10, 10, 3, 10, 10)
);


console.log(beam.status.hp);

pikachu.attack(beam)

console.log(beam.status.hp);