import {loginUserData} from "./api.js"

export async function handleLoginUser() {
    const username = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;
    let userData = await loginUserData(username, password);

    if(userData.mes == "NoUsername"){
        const loginStatus = document.getElementById("loginStatus");
        loginStatus.innerHTML = "This username is not valid, create new account?";
    }else if(userData.mes == "WrongPassword"){
        const loginStatus = document.getElementById("loginStatus");
        loginStatus.innerHTML = "WRONG password, please try again";
    }else if(userData.mes == "Success"){
        drawUserSection(userData.loginUserData)
    }
}

export async function handleLogoutUser() {
    console.log("OUT");
    drawLoginSection();
}

export async function drawLoginSection() {
    const userSection = document.getElementById("UserSection");
    userSection.innerHTML = `
            <p>Username : </p>
            <input type="text" id="username-input">
            <p>Password : </p>
            <input type="text" id="password-input">
            <br><button id="userLoginButton" class="">Login</button>
            <p id="loginStatus"></p>
            <p>Note for Dev : You could try "Neen" "Password"</p>
    `;

    // add eventListener for login button
    const userLoginButton = document.getElementById("userLoginButton");
    userLoginButton.addEventListener("click", ()=>{
        handleLoginUser();
    });
}

export async function drawUserSection(UserData) {
    const userSection = document.getElementById("UserSection");
    userSection.innerHTML = `
        <h3>Hi, ${UserData.username}</h3>
        <p>Money : ${UserData.money} $</p>
        <p>Exp. : ${UserData.exp}</p>
        <p>Your CPMon : </p>
    `;

    for (const monster of UserData.CPmonList) {
        userSection.innerHTML += `<li>${monster}</li>`
    }

    userSection.innerHTML += `
        <br><button id="userLogoutButton" class="">Logout</button>
    `;

    // add eventListener for logout button
    const userLogoutButton = document.getElementById("userLogoutButton");
    userLogoutButton.addEventListener("click", ()=>{
        handleLogoutUser();
    });
}