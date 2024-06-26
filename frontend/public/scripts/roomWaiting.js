import * as api from "./api.js";
import { FRONTEND_URL } from "./config.js";

let roomNumber = null
if(window.location.href[window.location.href.toString().length-2] == "1"){
    roomNumber = (window.location.href[window.location.href.toString().length-2]) + (window.location.href[window.location.href.toString().length-1]) -1 ;
}else{
    roomNumber = window.location.href[window.location.href.toString().length-1] -1 ;
}
const userData = await api.getCurrentUser();


// function : click back to home button
const toHome = document.getElementById("toHome");
toHome.addEventListener("click", async () => {
    await api.removePlayer({username: userData.username, id:roomNumber});
    window.location.href = `${FRONTEND_URL}/home`;
});

var audio = document.querySelector('audio');
audio.volume = 0.5; // 50% volume

let CPmonChosenIndex = null;
const CPmonName = ["Neen", "Beam", "Nadeem", "Tokyo", "JOMNOIZ"]
var isReady = false

// function : click CPmon card to choose your CP mon
for(let i=1;i<=5;i++){
    const CPmonCard = document.getElementById("CPmon-"+i.toString());
    CPmonCard.addEventListener("click", async () => {
        if (i==5 && userData.exp < 1500) {
            return;
        }
        CPmonChosenIndex = i-1
        drawCPmonStatus()
    });
}


// function : handle ready request from user
const readyButton = document.getElementById("readyButton");
readyButton.addEventListener("click", async () => {
    if(CPmonChosenIndex == null){
        logMessage("Please choose your CPmon first");
        return;
    }
    if(isReady == true){
        return;
    }

    // play sound
    const audio = new Audio();
    audio.src = "../res/audio/ready.mp3";
    audio.play();

    readyButton.style.backgroundColor = "#467f4cff";
    readyButton.style.pointerEvents = "none";
    isReady = true
    await api.addPokemon({username : userData.username, pokemonName: CPmonName[CPmonChosenIndex], id:roomNumber})
    await api.ready({username : userData.username, id:roomNumber})
});

// function : handle select CPmon
const CPmonSelection = document.getElementById("CPmon-selection");
for (let i =0; i<=4;i++) {
    const CPmonSelectionChild = CPmonSelection.children[i]
    CPmonSelectionChild.addEventListener("click", async () => {
        if (isReady) {
            return;
        }
        if (i==4 && userData.exp <1500) {
            return;
        }
        for (const CPmonSelectionChild of CPmonSelection.children) {
            CPmonSelectionChild.style.backgroundColor = "white";
        }
        CPmonSelectionChild.style.backgroundColor = "#467f4cff";
    });
}

// log message
function logMessage(message, timeout = 5000) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("log-message");
    messageElement.innerText = message;
    document.getElementById("log-container").appendChild(messageElement);


    setTimeout(() => {
        messageElement.remove();
    }, timeout);
}

// function : draw CPmon status
export async function drawCPmonStatus() {
    if (isReady) {
        return;
    }
    

    let CPmon = await api.getCPmonStatus({CPmonName : CPmonName[CPmonChosenIndex]})

    document.getElementById("CPmon-info").style.visibility = "visible";
    document.getElementById("CPmon-name").innerText = CPmonName[CPmonChosenIndex];
    document.getElementById("CPmon-image").src =`../res/images/CPmon/${CPmonName[CPmonChosenIndex]}.png`

    document.getElementById("CPmon-hp").children[1].children[0].style.width = (CPmon.status.hp * 100/ 60).toString() + "%";
    document.getElementById("CPmon-attack").children[1].children[0].style.width = (CPmon.status.atk * 100/ 15).toString() + "%";
    document.getElementById("CPmon-defense").children[1].children[0].style.width = (CPmon.status.def * 100/ 5).toString() + "%";
    document.getElementById("CPmon-magic").children[1].children[0].style.width = (CPmon.status.mAtk * 100/ 15).toString() + "%";
}

var player1Ready = false;
var player2Ready = false;

// function : draw username in button of the page & check is game start
export async function drawUsername() {

    let roomInfo = await api.getRoom({id:roomNumber})
    document.getElementById("room-name").innerHTML = roomInfo.room.roomName

    let oldPlayer1 = document.getElementById("player-name-1").innerText;
    let oldPlayer2 = document.getElementById("player-name-2").innerText;

    document.getElementById("player-name-1").innerText = (roomInfo.room.players[0] == undefined) ? "Waiting..." : roomInfo.room.players[0].name;
    document.getElementById("player-name-2").innerText = (roomInfo.room.players[1] == undefined) ? "Waiting..." : roomInfo.room.players[1].name;

    let newPlayer1 = document.getElementById("player-name-1").innerText;
    let newPlayer2 = document.getElementById("player-name-2").innerText;

    if (oldPlayer1 !== newPlayer1) {
        if (newPlayer1 !== "Waiting...") {
            logMessage(`${newPlayer1} has joined the room.`);
        } else if (oldPlayer1 !== "Waiting...") {
            logMessage(`${oldPlayer1} has left the room.`);
            player1Ready = false;
        }
    }
    if (oldPlayer2 !== newPlayer2) {
        if (newPlayer2 !== "Waiting...") {
            logMessage(`${newPlayer2} has joined the room.`);
        } else if (oldPlayer2 !== "Waiting...") {
            logMessage(`${oldPlayer2} has left the room.`);
            player2Ready = false;
        }
    }

    // Check if other player is ready
    if(roomInfo.room.players[0] != undefined && roomInfo.room.players[0].isReady == true && !player1Ready){
        logMessage(`${roomInfo.room.players[0].name} is ready.`);
        player1Ready = true;
    }
    if(roomInfo.room.players[1] != undefined && roomInfo.room.players[1].isReady == true && !player2Ready){
        logMessage(`${roomInfo.room.players[1].name} is ready.`);
        player2Ready = true;
    }

    // check if game is start
    if(roomInfo.room.gameStart){
        window.location.href = `${FRONTEND_URL}/game/${roomNumber+1}`;
    }
}

const intervalId = setInterval(drawUsername, 1000);

// lock JOMNOIZ
if(userData.exp < 1500){
    document.getElementById("JOMNOIZ").src = "../res/images/CPmon/JOMNOIZ_lock.png"
}else{
    document.getElementById("JOMNOIZ").src = "../res/images/CPmon/JOMNOIZ.png"
}