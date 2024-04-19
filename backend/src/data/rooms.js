import Room from '../models/Room.js';

const rooms = [];

for(let i = 0; i < 6; i++) {
    rooms.push(new Room(`CPmon-${i}`));
}

export default rooms;