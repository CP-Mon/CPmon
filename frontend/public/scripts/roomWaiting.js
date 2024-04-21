import * as api from "./api.js";
import { FRONTEND_URL } from "./config.js";

var roomNumber = window.location.href[window.location.href.toString().length-1] - 1;
const userData = await api.getCurrentUser();

const toHome = document.getElementById("toHome");
toHome.addEventListener("click", async () => {
    await api.removePlayer({username: userData.username, roomID:roomNumber});
    window.location.href = `${FRONTEND_URL}/`;
});