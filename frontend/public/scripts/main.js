import {handleLogoutUser} from "./userLogin"

document.addEventListener("DOMContentLoaded", () => {
    const userLogoutButton = document.getElementById("userLogoutButton");
    userLogoutButton.addEventListener("click", ()=>{
        handleLogoutUser();
    });
});