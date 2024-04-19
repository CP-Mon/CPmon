import {getCurrentUser} from "./api.js"
import {FRONTEND_URL} from "../scripts/config.js"

const currentUser = await getCurrentUser();
if(currentUser==null && window.location.href != `${FRONTEND_URL}/login`){
    console.log(window.location.href, " lets go");
    window.location.href = `${FRONTEND_URL}/login`;
}


document.addEventListener("DOMContentLoaded", () => {

});