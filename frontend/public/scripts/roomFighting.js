import * as api from "./api.js";
import { FRONTEND_URL } from "./config.js";

var roomNumber = window.location.href[window.location.href.toString().length-1] -1 ;
const userData = await api.getCurrentUser();
var playerMeCard, playerYouCard

drawRoomElement()
let turnPlayer = null

async function drawRoomElement(){
    const roomInfo = await api.getRoom({id:roomNumber})

    document.getElementById('CPmon1-name').innerText = roomInfo.room.players[0].pokemonList[0].name
    document.getElementById('CPmon2-name').innerText = roomInfo.room.players[1].pokemonList[0].name
    document.getElementById('CPmon1-card-name').innerText = roomInfo.room.players[0].pokemonList[0].name
    document.getElementById('CPmon2-card-name').innerText = roomInfo.room.players[1].pokemonList[0].name
    document.getElementById('player1-name').innerText = roomInfo.room.players[0].name
    document.getElementById('player2-name').innerText = roomInfo.room.players[1].name

    if(userData.username == roomInfo.room.players[0].name){
        playerMeCard = "player1-card"
        playerYouCard = "player2-card"
    }else{
        playerMeCard = "player2-card"
        playerYouCard = "player1-card"
    }
}

async function game(){
    const roomInfo = await api.getRoom({id:roomNumber})
    document.getElementsByClassName('timer-text')[0].innerText = roomInfo.room.TurnCountdown
    
    if(roomInfo.room.gameOver == true || roomInfo.room.players == []){
        if(roomInfo.room.winner.name == "error-timeout"){
            await api.clearRoom({id:roomNumber})
            window.location.href = `${FRONTEND_URL}/timeout`
        }else if(roomInfo.room.winner.name == userData.username){
            await api.clearRoom({id:roomNumber})
            window.location.href = `${FRONTEND_URL}/winner`    
        }else{
            await api.clearRoom({id:roomNumber})
            window.location.href = `${FRONTEND_URL}/loser`
            
        }
    }

    if(turnPlayer != roomInfo.room.turnPlayer.name){
        await chengeTurnPlayer()
    }

}

async function chengeTurnPlayer(){
    const roomInfo = await api.getRoom({id:roomNumber})
    turnPlayer = roomInfo.room.turnPlayer.name

    // do animation if change back to this user turn
    if(turnPlayer == userData.username){
        
        if(roomInfo.room.lastAction == 'attack'){
            handleAttack(playerYouCard)
        }else if(roomInfo.room.lastAction == 'guard'){
            handleGuard(playerYouCard)
        }else if(roomInfo.room.lastAction == 'magic'){
            handleMagic(playerYouCard)
        }
    }

    // update player's name on turn
    turnPlayer = roomInfo.room.turnPlayer.name
    document.getElementById('room-log').innerText = `${turnPlayer}'s turn`

    // update CPmon HP
    let CPmon1 = roomInfo.room.players[0].pokemonList[0]
    let CPmon2 = roomInfo.room.players[1].pokemonList[0]
    document.getElementById("player1-hp-fill").style.width = (CPmon1.status.hp * 100/ CPmon1.status.maxHp).toString() + "%";
    document.getElementById("player2-hp-fill").style.width = (CPmon2.status.hp * 100/ CPmon2.status.maxHp).toString() + "%";

    // switch button
    const actionButton = document.getElementsByClassName("action-button")
    if(turnPlayer == userData.username){
        actionButton[0].id = "attackable-button"
        actionButton[0].addEventListener("click", () => {handleAttack(playerMeCard)})
        actionButton[1].id = "guardable-button"
        actionButton[1].addEventListener("click", () => {handleGuard(playerMeCard)})
        actionButton[2].id = "magicable-button"
        actionButton[2].addEventListener("click", () => {handleMagic(playerMeCard)})
    }else{
        actionButton[0].id = "disable-button"
        actionButton[0].removeEventListener("click", () => {handleAttack(playerMeCard)})
        actionButton[1].id = "disable-button"
        actionButton[1].removeEventListener("click", () => {handleGuard(playerMeCard)})
        actionButton[2].id = "disable-button"
        actionButton[2].removeEventListener("click", () => {handleMagic(playerMeCard)})
    }


}

async function handleAttack(playerCard) {
    if(playerCard == playerMeCard){
        await api.action({username: userData.username, id:roomNumber, action:'attack'});
    }
    
    // play sound
    const audio = new Audio();
    audio.src = "../res/audio/attack.mp3";
    audio.play();

    const card = document.getElementById(playerCard);

    // Remove inline animation style
    card.style.animation = '';

    // Add the class to trigger both animations simultaneously
    card.classList.add("attack-sequence");

    // Listen for animation end event
    card.addEventListener("animationend", function() {
        // After the animation ends, remove the animation class
        card.classList.remove("attack-sequence");
    }, { once: true }); // Make sure the event listener only runs once
}

async function handleGuard(playerCard) {
    if(playerCard == playerMeCard){
        await api.action({username: userData.username, id:roomNumber, action:'guard'});
    }

    // play sound
    const audio = new Audio();
    audio.src = "../res/audio/guard.mp3";
    audio.play();

    const card = document.getElementById(playerCard);

    // Remove inline animation style
    card.style.animation = '';

    // Add the class to trigger both animations simultaneously
    card.classList.add("guard-sequence");

    // Listen for animation end event
    card.addEventListener("animationend", function() {
        // After the animation ends, remove the animation class
        card.classList.remove("guard-sequence");
    }, { once: true }); // Make sure the event listener only runs once
}


async function handleMagic(playerCard) {
    if(playerCard == playerMeCard){
        await api.action({username: userData.username, id:roomNumber, action:'magic'});
    }

    // play sound
    const audio = new Audio();
    audio.src = "../res/audio/magic.mp3";
    audio.play();

    const card = document.getElementById(playerCard);
    console.log(card);

    // Remove inline animation style
    card.style.animation = '';

    // Add the class to trigger both animations simultaneously
    card.classList.add("magic-sequence");

    // Listen for animation end event
    card.addEventListener("animationend", function() {
        // After the animation ends, remove the animation class
        card.classList.remove("magic-sequence");
    }, { once: true }); // Make sure the event listener only runs once
}


const intervalGame = setInterval(game, 500);
