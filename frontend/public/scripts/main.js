import {getCurrentUser, getRoom, removePlayerFromAllRooms} from "./api.js"
import {FRONTEND_URL} from "../scripts/config.js"

// redirect user to login page if user is not login yet
const currentUser = await getCurrentUser();
if(currentUser==null && window.location.href != `${FRONTEND_URL}/user`){
    window.location.href = `${FRONTEND_URL}/user`;
}else{
    // check if in gameroom correctly
    // if user in gameroom without players name in room -> send to /home
    // if user not in gameroom but their are still name in game room -> remove player
    const location_now = window.location.href
    var validRegex = /\/(room|game)\/\d+$/;

    console.log(location_now);
    if(location_now.match(validRegex)){
        const roomNumber = window.location.href[window.location.href.toString().length-1] -1 ;
        const roomInfo = await getRoom({id:roomNumber})
        if(roomInfo.room.players.length == 0){
            window.location.href = `${FRONTEND_URL}/home`;
        }else if(roomInfo.room.players[0].name != currentUser.username && roomInfo.room.players.length == 1){
            window.location.href = `${FRONTEND_URL}/home`;
        }else if(roomInfo.room.players.length == 2){
            if(roomInfo.room.players[0].name != currentUser.username || roomInfo.room.players[1].name != currentUser.username){
                window.location.href = `${FRONTEND_URL}/home`;
            }
        } 
        if(location_now.match(/\/(game)\/\d+$/) && roomInfo.room.gameStart == false){
            window.location.href = `${FRONTEND_URL}/home`;
        }
    }else{
        removePlayerFromAllRooms({username:currentUser.username})
    }   
}




document.addEventListener("DOMContentLoaded", () => {

});