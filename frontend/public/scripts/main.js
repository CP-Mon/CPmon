import { drawLoginSection } from "./userLogin.js";
import { currentUser } from "./config.js";


if(currentUser == null ){
    drawLoginSection();
}

document.addEventListener("DOMContentLoaded", () => {
    
});