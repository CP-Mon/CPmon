import { BACKEND_URL } from "./config.js";


export async function getCurrentUser() {
    const userData =  await fetch(`${BACKEND_URL}/api/getUserData`,{
        credentials: 'include'
    }).then((r) => r.json());
    return userData
}

export async function logoutCurrentUser() {
    await fetch(`${BACKEND_URL}/user/logout`,{
        method:'POST',
        credentials: "include"
    }).then((r) => r.json());
}


export async function loginUserData(obj) {
    const userData = await fetch(`${BACKEND_URL}/user/login`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
        credentials: 'include'
    }).then((r) => r.json());
    return userData;
}

export async function checkSignUpNewUser(obj) {
    const checkSignUpResult = await fetch(`${BACKEND_URL}/user/signup/check`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
        credentials: 'include'
    }).then((r) => r.json());
    return checkSignUpResult;
}

export async function SignUpNewUser(obj) {
    await fetch(`${BACKEND_URL}/user/signup/addNewUser`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
        credentials: 'include'
    }).then((r) => r.json());
}

export async function getRooms() {
    const rooms = fetch(`${BACKEND_URL}/room/getRooms`, {
        method: "GET"
    }).then(r => r.json())
    return rooms;
}

export async function getRoom(obj) {
    const room = fetch(`${BACKEND_URL}/room/getRoom/${obj.id}`, {
        method: "GET"
    }).then(r => r.json());
    return room;
}


export async function joinRoom(obj) {
    const room = fetch(`${BACKEND_URL}/room/joinRoom/${obj.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    }).then(r => r.json());
    return room;
}

export async function addPokemon(obj) {
    const room = fetch(`${BACKEND_URL}/room/addPokemon/${obj.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    }).then(r => r.json());
    return room;
}

export async function removePlayer(obj) {
    const room = fetch(`${BACKEND_URL}/room/removePlayer/${obj.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    }).then(r => r.json());
    return room;
}

export async function ready(obj) {
    const room = fetch(`${BACKEND_URL}/room/ready/${obj.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    }).then(r => r.json());
    return room;
}

export async function action(obj) {
    const room = fetch(`${BACKEND_URL}/room/action/${obj.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    }).then(r => r.json());
    return room;
}