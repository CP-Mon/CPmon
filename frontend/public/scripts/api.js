import { BACKEND_URL } from "./config.js";

export async function loginUserData(username, password) {
    const obj = {username : username, password : password};
    const userData = await fetch(`${BACKEND_URL}/user/login`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
    }).then((r) => r.json());
    return userData;
}