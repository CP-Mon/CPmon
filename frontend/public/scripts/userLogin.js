// import User from "../../../backend/src/models/userModel.js";
import {loginUserData, checkSignUpNewUser, SignUpNewUser, getCurrentUser, logoutCurrentUser} from "./api.js"

const currentUser = await getCurrentUser();
if(currentUser==null){
    drawLoginSection();
}else{
    drawUserSection();
}


export async function handleLoginUser() {
    const username = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;
    const obj = {username : username, password : password};
    const userData = await loginUserData(obj);

    if(userData.mes == "NoUsername"){
        const loginStatus = document.getElementById("loginStatus");
        loginStatus.innerHTML = "This username is not valid, create new account?";
    }else if(userData.mes == "WrongPassword"){
        const loginStatus = document.getElementById("loginStatus");
        loginStatus.innerHTML = "WRONG password, please try again";
    }else if(userData.mes == "Success"){
        drawUserSection(await getCurrentUser())
    }
}

export async function handleAddNewUser() {
    const SignUpStatus = document.getElementById("SignUpStatus")
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail.com/;
    const username = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;
    const Rpassword = document.getElementById("password-repeat-input").value;
    const email = document.getElementById("email-input").value;

    // Check if every field is match requirement
    if(username=="" || email=="" || password==""){
        SignUpStatus.innerHTML = "Every field must has more than one charecter"
        return;
    }
    if(password != Rpassword){
        SignUpStatus.innerHTML = "Password must be same as confirmation"
        return;
    }
    if(password.length<8){
        SignUpStatus.innerHTML = "Password's lenght must be more than 8 charecter"
        return;
    }
    if(!email.match(validRegex)){
        SignUpStatus.innerHTML = "Email must be in gmail-format"
        return;
    }

    // check if New User is Duplicate
    const obj1 = {username : username, email : email};
    const checkSignUpResult =  await checkSignUpNewUser(obj1)
    
    if(checkSignUpResult.mes=="DuplicateEmail"){
        SignUpStatus.innerHTML = "This email already sign up. Try another email."
        return;
    }
    if(checkSignUpResult.mes=="DuplicateUsername"){
        SignUpStatus.innerHTML = "This username alredy USED."
        return;
    }
    
    const payload = {
        username : username, password : password, email : email,
        CPmonlist:new Array(), exp:0, money:0
    };

    SignUpNewUser(payload);
    const obj2 = {username : username, password : password};
    const userData = await loginUserData(obj2);
    await drawUserSection()
}

export async function handleLogoutUser() {
    await logoutCurrentUser();
    await drawLoginSection();
}

export async function handleSignUpUser() {
    await drawSignUpSection();
}


export async function drawSignUpSection() {
    const userLoginSection = document.getElementById("userLoginSection");
    userLoginSection.innerHTML = `
        <p class="header"><b>Sign up</b></p>
        <p>Username</p>
        <input type="text" id="username-input">
        <p>Email</p>
        <input type="text" id="email-input">
        <p>Password</p>
        <input type="password" id="password-input">
        <p>Confirm Password</p>
        <input type="password" id="password-repeat-input">
        <br><button id="userSignUpButton" class="">Sign up</button>
        <button id="userLoginButton">Already have account? Back to Login</button>
        
        <p id="SignUpStatus"></p>
    `;
    

    // add eventListener for login button
    const userLoginButton = document.getElementById("userLoginButton");
    userLoginButton.addEventListener("click", ()=>{
        drawLoginSection();
    });
    const userSignUpButton = document.getElementById("userSignUpButton");
    userSignUpButton.addEventListener("click", ()=>{
        handleAddNewUser();
    });
}


export async function drawLoginSection() {
    const userLoginSection = document.getElementById("userLoginSection");
    userLoginSection.innerHTML = `
        <p class="header"><b>Log in</b></p>
        <p>Username</p>
        <input type="text" id="username-input">
        <p>Password</p>
        <input type="password" id="password-input">
        <br><button id="userLoginButton" class="">Log in</button>
        <button id="userSignUpButton" class="">Create new account</button>
        <p id="loginStatus"></p>
    `;

    // add eventListener for login button
    const userLoginButton = document.getElementById("userLoginButton");
    userLoginButton.addEventListener("click", ()=>{
        handleLoginUser();
    });
    const userSignUpButton = document.getElementById("userSignUpButton");
    userSignUpButton.addEventListener("click", ()=>{
        handleSignUpUser();
    });
}

export async function  drawUserSection() {
    const UserData = await getCurrentUser();
    const userLoginSection = document.getElementById("userLoginSection");

    userLoginSection.innerHTML = `
    <div id="expContainer">
        <div id="expText">Exp :</div>
    </div>

    <div id="moneyContainer">
        <span id="moneyLabel">Money :</span>
        <span id="userMoney">${UserData.money} $</span>
    </div>

        <h3 id="greeting">Hi, ${UserData.username}</h3>
        <p>Your CPMon:</p>
        <div id="CPMonListContainer"></div>
        <div id="buttonContainer">
            <a id="userLogoutButton">Exit</a>
            <a href="/home" id="toHome">Vidva</a>
        </div>
    `;

    // Calculate the width of the experience bar based on the user's experience points
    document.getElementById("expText").innerText = `Exp : ${(UserData.exp / 100) * 100}`;

    const CPmonListContainer = document.getElementById("CPMonListContainer");
    CPmonListContainer.innerHTML = `<div id="CPmon-selection">
    <div class="CPmon-card" id="CPmon-1">
        <img src="../res/images/CPmon/Neen.png" alt="CPmon 1" class="CPmon-avatar">
        <p class="CPmon-name">Neen</p>
    </div>
    <div class="CPmon-card" id="CPmon-2">
        <img src="../res/images/CPmon/Beam.png" alt="CPmon 2" class="CPmon-avatar">
        <p class="CPmon-name">Beam</p>
    </div>
    <div class="CPmon-card" id="CPmon-3">
        <img src="../res/images/CPmon/Nadeem.png" alt="CPmon 3" class="CPmon-avatar">
        <p class="CPmon-name">Nadeem</p>
    </div>
    <div class="CPmon-card" id="CPmon-4">
        <img src="../res/images/CPmon/Tokyo.png" alt="CPmon 4" class="CPmon-avatar">
        <p class="CPmon-name">Tokyo</p>
    </div>
</div>`;

    // Add event listener for logout button
    const userLogoutButton = document.getElementById("userLogoutButton");
    userLogoutButton.addEventListener("click", handleLogoutUser);
}