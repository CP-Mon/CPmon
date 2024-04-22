import {getCurrentUser} from "./api.js"
import {FRONTEND_URL} from "../scripts/config.js"

// redirect user to login page if user is not login yet
const currentUser = await getCurrentUser();
if(currentUser==null && window.location.href != `${FRONTEND_URL}/login`){
    window.location.href = `${FRONTEND_URL}/user`;
}


document.addEventListener("DOMContentLoaded", () => {

});