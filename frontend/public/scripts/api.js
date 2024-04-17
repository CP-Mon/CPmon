import { BACKEND_URL } from "./config.js";

export async function getUserData(obj) {
    let userData = await fetch(`${BACKEND_URL}/user/getData`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
    }).then((r) => r.json());
    return userData;
}

export async function loginUserData(obj) {
    const userData = await fetch(`${BACKEND_URL}/user/login`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
    }).then((r) => r.json());
    return userData;
}

export async function checkSignUpNewUser(obj) {
    const checkSignUpResult = await fetch(`${BACKEND_URL}/user/signup/check`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
    }).then((r) => r.json());
    return checkSignUpResult;
}

export async function SignUpNewUser(obj) {
    await fetch(`${BACKEND_URL}/user/signup/addNewUser`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
    }).then((r) => r.json());
}