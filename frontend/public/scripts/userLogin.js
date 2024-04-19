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
        <p><b>New User Sign Up</b></p>
        <p>Username : </p>
        <input type="text" id="username-input">
        <p>Email : </p>
        <input type="text" id="email-input">
        <p>Password : </p>
        <input type="text" id="password-input">
        <p>Confirm Password : </p>
        <input type="text" id="password-repeat-input">
        <br><button id="userSignUpButton" class="">SignUp</button>
        <br><button id="userLoginButton">Already has account? Back to Login</button>
        
        <p id="SignUpStatus" style="color:red"></p>
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
            <p><b>Log In</b></p>
            <p>Username : </p>
            <input type="text" id="username-input">
            <p>Password : </p>
            <input type="text" id="password-input">
            <br><button id="userLoginButton" class="">Login</button>
            <button id="userSignUpButton" class="">Create New Account</button>
            <p id="loginStatus"></p>
            <p>Note for Dev : You could try "Neen" "Password"</p>
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

export async function drawUserSection() {
    const UserData = await getCurrentUser();
    const userLoginSection = document.getElementById("userLoginSection");
    userLoginSection.innerHTML = `
        <a href="./"><button>HOME</button></a>

        <h3>Hi, ${UserData.username}</h3>
        <p>Money : ${UserData.money} $</p>
        <p>Exp. : ${UserData.exp}</p>
        <p>Your CPMon : </p>
    `;

    for (const monster of UserData.CPmonList) {
        userLoginSection.innerHTML += `<li>${monster}</li>`
    }

    userLoginSection.innerHTML += `
        <br><button id="userLogoutButton" class="">Logout</button>
    `;

    // add eventListener for logout button
    const userLogoutButton = document.getElementById("userLogoutButton");
    userLogoutButton.addEventListener("click", ()=>{
        handleLogoutUser();
    });
}