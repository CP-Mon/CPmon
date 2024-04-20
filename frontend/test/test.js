import * as api from "../public/scripts/api.js";

const room = await api.action({
    id: 3,
    username: "1",
    action: "attack",
})
console.dir(room, { depth: null })