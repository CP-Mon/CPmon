import {joinRoom, getCurrentUser} from "./api.js"
import {FRONTEND_URL} from "./config.js"

const userData = await getCurrentUser();

// function : click roomDiv to join room
function bindClickListener(roomNumber) {
    const roomDiv = document.getElementById("room" + roomNumber);
    roomDiv.addEventListener("click", async () => {
        const result = await joinRoom({username: userData.username, roomNumber:roomNumber-1});
        if(result.status=="success"){
            window.location.href = `${FRONTEND_URL}/room/${roomNumber}`;
        } else {
            alert("This room is full");
        }
    });
    
}
;

for(var i = 1; i <= 12; i++){
    bindClickListener(i.toString());
}