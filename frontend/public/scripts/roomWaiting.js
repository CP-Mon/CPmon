import * as api from "./api.js";
import { FRONTEND_URL } from "./config.js";

var roomNumber = window.location.href[window.location.href.toString().length-1] - 1;
const userData = await api.getCurrentUser();

const toHome = document.getElementById("toHome");
toHome.addEventListener("click", async () => {
    await api.removePlayer({username: userData.username, id:roomNumber});
    window.location.href = `${FRONTEND_URL}/`;
});


let CPmonChosenIndex = null;
const CPmonName = ["Neen", "Beam", "Nadeem", "Tokyo"]
var isReady = false

for(let i=1;i<=4;i++){
    const CPmonCard = document.getElementById("CPmon-"+i.toString());
    CPmonCard.addEventListener("click", async () => {
        CPmonChosenIndex = i-1
        drawCPmonStatus()
    });
}

const readyButton = document.getElementById("readyButton");
readyButton.addEventListener("click", async () => {
    if(CPmonChosenIndex == null){
        alert("please choose your CPmon")
        return;
    }
    if(isReady == true){
        alert("you already clickk ready button")
        return;
    }
    isReady = true
    await api.addPokemon({username : userData.username, pokemonName: CPmonName[CPmonChosenIndex], id:roomNumber})
    await api.ready({username : userData.username, id:roomNumber})
});


export async function drawCPmonStatus() {
    let CPmon = await api.getCPmonStatus({CPmonName : CPmonName[CPmonChosenIndex]})
    document.getElementById("CPmon-name").innerText = CPmonName[CPmonChosenIndex]

    document.getElementById("CPmon-HP").children[1].children[0].style.width = (CPmon.status.hp * 100/ 30).toString() + "%";
    document.getElementById("CPmon-attack").children[1].children[0].style.width = (CPmon.status.atk * 100/ 5).toString() + "%";
    document.getElementById("CPmon-defense").children[1].children[0].style.width = (CPmon.status.def * 100/ 5).toString() + "%";
}

export async function drawUsername() {
    let roomInfo = await api.getRoom({id:roomNumber})
    document.getElementById("player-name-1").innerText = (roomInfo.room.players[0] == undefined) ? "Wating..." : roomInfo.room.players[0].name
    document.getElementById("player-name-2").innerText = (roomInfo.room.players[1] == undefined) ? "Wating..." : roomInfo.room.players[1].name

    // improve later
    if(roomInfo.room.players[0] != undefined && roomInfo.room.players[1] != undefined){
        if(roomInfo.room.players[0].isReady == true && roomInfo.room.players[1].isReady == true){
            window.location.href = `${FRONTEND_URL}/game/${roomNumber}`;
        }
    }
}

const intervalId = setInterval(drawUsername, 1000);
