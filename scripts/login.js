const username = document.getElementById("username");
const password = document.getElementById("password");
const form = document.getElementById("login-form");


let usernameValid = false;
let passwordValid = false;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const enteredUsername = username.value;
    const enteredPassword = password.value;

    if(!enteredUsername || enteredUsername !== localStorage.getItem("username")){
        document.getElementById("usernameError").textContent = 
        "username does not exist";
        usernameValid = false;
    }
    else {
        usernameValid = true;
    }

    if(!enteredPassword || enteredPassword !== localStorage.getItem("password")){
        document.getElementById("passwordError").textContent = 
        "password is incorrect";
        passwordValid = false;
    }
    else {
        passwordValid = true;
    }

    if(usernameValid && passwordValid){
        alert("😊 Login Successfull");
        window.location.href = "home.html";
    }
});