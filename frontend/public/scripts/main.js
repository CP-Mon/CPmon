import {handleLogoutUser} from "./userLogin.js"

document.addEventListener("DOMContentLoaded", () => {
    const userLogoutButton = document.getElementById("userLogoutButton");
    userLogoutButton.addEventListener("click", ()=>{
        handleLogoutUser();
    });
});