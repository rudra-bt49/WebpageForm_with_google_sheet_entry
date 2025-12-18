const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const dob = document.getElementById("date");
const gender = document.getElementById("gender");
const signupBtn = document.getElementById("signupBtn");
const form = document.getElementById("register-form");

/* =====================
   REGEX
===================== */
const emailRegex = /^[a-zA-Z0-9._%+-]+@(bitontree\.com|ddu\.com)$/;
const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


let isEmailValid = false;
let isUsernamevalid = false;
let isPasswordValid = false;
let isConfirmPasswordValid = false;
let isDobValid = false;
let isGenderValid = false;


email.addEventListener("input", () => {
  if (!emailRegex.test(email.value)) {
    emailError.textContent =
      "Only Business Emails allowed (bitontree.com / ddu.com)";
    isEmailValid = false;
  } else {
    emailError.textContent = "";
    isEmailValid = true;
  }
  toggleButton();
});

username.addEventListener("input", () => {
  if (!usernameRegex.test(username.value)) {
    usernameError.textContent =
      "Min 6 chars, must contain 1 letter & 1 digit";
    isUsernamevalid = false;
  } else {
    usernameError.textContent = "";
    isUsernamevalid = true;
  }
  toggleButton();
});

password.addEventListener("input", () => {
  if (!passwordRegex.test(password.value)) {
    passwordError.textContent =
      "Min 8 chars with uppercase, lowercase, digit & special char";
    isPasswordValid = false;
  } else {
    passwordError.textContent = "";
    isPasswordValid = true;
  }
  toggleButton();
});

confirmPassword.addEventListener("input", () => {
  if (confirmPassword.value !== password.value) {
    confirmPasswordError.textContent = "Passwords must match";
    isConfirmPasswordValid = false;
  } else {
    confirmPasswordError.textContent = "";
    isConfirmPasswordValid = true;
  }
  toggleButton();
});

dob.addEventListener("input", () => {
  const year = new Date(dob.value).getFullYear();
  if (year < 1980 || year > 2005) {
    dobError.textContent = "DOB must be between 1980 and 2005";
    isDobValid = false;
  } else {
    dobError.textContent = "";
    isDobValid = true;
  }
  toggleButton();
});

gender.addEventListener("change", () => {
  if (!gender.value) {
    genderError.textContent = "Select gender";
    isGenderValid = false;
  } else {
    genderError.textContent = "";
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
  e.preventDefault();
  showLoader();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.some(
    (u) =>
      u.username === username.value || u.email === email.value
  );

  if (exists) {
    hideLoader();
    alert("❌ Username or Email already exists (local)");
    return;
  }

  users.push({
    email: email.value,
    username: username.value,
    password: password.value
  });

  localStorage.setItem("users", JSON.stringify(users));

  sendToGoogleSheet();
});


function sendToGoogleSheet() {
  const formData = new FormData();
  formData.append("email", email.value);
  formData.append("username", username.value);
  formData.append("dob", dob.value);
  formData.append("gender", gender.value);

  fetch(
    "https://script.google.com/macros/s/AKfycbw1B_bP3jFCzEHv_Lipi-83eydybdHhRMAXJ3h2e22KS6Cs-lr-ggpjqRqCP2CGXuOzqg/exec",
    {
      method: "POST",
      body: formData
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        alert(data.message);
        return;
      }
      // alert("😊 Registration Successful!");
      window.location.href = "login.html";
    })
    .catch(() => { 
      hideLoader();
      alert("😒 Error submitting form");
    });
}

// function showLoader() {
//   document.getElementById("loader").style.display = "flex";
// }

// function hideLoader() {
//   document.getElementById("loader").style.display = "none";
// }

