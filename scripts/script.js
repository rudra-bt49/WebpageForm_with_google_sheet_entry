const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const dob = document.getElementById("date");
const gender = document.getElementById("gender");
const signupBtn = document.getElementById("signupBtn");
const form = document.getElementById("register-form");

// Regular Expressions Decalred
const emailRegex = /^[a-zA-Z0-9._%+-]+@(bitontree\.com|ddu\.com)$/;
const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// variables to check validations
let isEmailValid = false;
let isUsernamevalid = false;
let isPasswordValid = false;
let isConfirmPasswordValid = false;
let isDobValid = false;
let isGenderValid = false;

// email validation
email.addEventListener("input", () => {
    if(!emailRegex.test(email.value)){
        document.getElementById("emailError").textContent = 
            "Only Business Emails allowed (Bitontree.com and DDU.com)";
        isEmailValid = false;
    }
    else {
        document.getElementById("emailError").textContent = "";
        isEmailValid = true;
    }
    toggleButton();
});

// username validation
username.addEventListener("input", () => {
    if(!usernameRegex.test(username.value)){
        document.getElementById("usernameError").textContent = 
            "Min 6 chars, must contain 1 letter & 1 digit (no special chars)";
        isUsernamevalid = false;
    }
    else {
        document.getElementById("usernameError").textContent = "";
        isUsernamevalid = true;
    }
    toggleButton();
});

// password validation
password.addEventListener("input", () => {
    if(!passwordRegex.test(password.value)){
        document.getElementById("passwordError").textContent = 
            "Min 8 chars with uppercase, lowercase, digit & special character";
        isPasswordValid = false;
    }
    else {
        document.getElementById("passwordError").textContent = "";
        isPasswordValid = true;
    }
    toggleButton();
});

// confirm-password validation
confirmPassword.addEventListener("input", () => {
    if(confirmPassword.value !== password.value || confirmPassword.value == "") {
        document.getElementById("confirmPasswordError").textContent = "Both Password must match!"
        isConfirmPasswordValid = false;
    }
    else {
        document.getElementById("confirmPasswordError").textContent = "";
        isConfirmPasswordValid = true;
    }
    toggleButton();
});

// date validation
dob.addEventListener("input", () => {
    const year = new Date(dob.value).getFullYear();

    if(year < 1980 || year > 2005) {
        document.getElementById("dobError").textContent = 
            "DOB must between 1980 and 2005!";
            isDobValid = false;
    }
    else {
        document.getElementById("dobError").textContent = "";
        isDobValid = true;
    }
    toggleButton();
})

// gender validation
gender.addEventListener("change", () => {
    if (gender.value === "") {
        document.getElementById("genderError").textContent = 
            "Please select gender!";
            isGenderValid = false;
    } else {
        document.getElementById("genderError").textContent = "";
        isGenderValid = true;
    }
    toggleButton();
});

function toggleButton() {
    signupBtn.disabled = !(
        isEmailValid &&
        isUsernamevalid &&
        isPasswordValid && 
        isConfirmPasswordValid &&
        isDobValid &&
        isGenderValid 
    );
}

form.addEventListener("submit", (e) => {
    // preventing page load on form submit
    e.preventDefault();

    // setting in localStorage
    localStorage.setItem("email", email.value);
    localStorage.setItem("username", username.value);
    localStorage.setItem("password", password.value);

    sendToGoogleSheet();
});

// send data to google-sheet
function sendToGoogleSheet() {
  const formData = new FormData();

  formData.append("email", email.value);
  formData.append("username", username.value);
  formData.append("dob", dob.value);
  formData.append("gender", gender.value);

  fetch("https://script.google.com/macros/s/AKfycbw1B_bP3jFCzEHv_Lipi-83eydybdHhRMAXJ3h2e22KS6Cs-lr-ggpjqRqCP2CGXuOzqg/exec", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        alert(data.message);
        return;
      }

      alert("😊 Registration Successful!");
      window.location.href = "login.html";
    })
    .catch(err => {
      console.error(err);
      alert("😒 Error submitting form");
    });
}

