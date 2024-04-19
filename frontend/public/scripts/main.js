import {getCurrentUser} from "./api.js"

const currentUser = await getCurrentUser();
if(currentUser==null){
    console.log("NOT login");
    
}


document.addEventListener("DOMContentLoaded", () => {

});