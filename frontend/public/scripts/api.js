import { BACKEND_URL } from "./config.js";


export async function getCurrentUser() {
    const userDataLocal =  await getCurrentUserLocalStorage()
    if(userDataLocal == null){
        return null
    }else{
        const obj = {username: userDataLocal}
        const userData =  await fetch(`${BACKEND_URL}/user/getUserData`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
            credentials: 'include'
        }).then((r) => r.json());
        return userData
    }
}


export async function getCurrentUserLocalStorage() {
    const userData =  localStorage.getItem("user")
    if(userData == undefined ||userData == null || userData == "null"){
        return null
    }else{
        return userData
    }
}

export async function logoutCurrentUser() {
    localStorage.setItem("user", null)
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
    if(userData.mes == "Success"){
        localStorage.setItem("user", userData.loginUserData.username)
    }
    return userData
}

export async function rewardUser(obj) {
    await fetch(`${BACKEND_URL}/user/reward`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
        credentials: 'include'
    }).then((r) => r.json());
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

export async function getCPmonStatus(obj) {
    const userData =  await fetch(`${BACKEND_URL}/CPmon/getCPmonStatus`,{
        method:"POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    }).then((r) => r.json());
    return userData
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

export async function clearRoom(obj) {
    fetch(`${BACKEND_URL}/room/clearRoom/${obj.id}`, {
        method: "POST"
    }).then(r => r.json())
}

export async function removePlayerFromAllRooms(obj) {
    await fetch(`${BACKEND_URL}/room/removePlayers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    })
}