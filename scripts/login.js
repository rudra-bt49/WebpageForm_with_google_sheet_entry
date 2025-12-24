// ===============================
// LOGIN LOGIC
// ===============================

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const form = document.getElementById("login-form");

const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Clear previous errors
  usernameError.textContent = "";
  passwordError.textContent = "";

  showLoader();

  const enteredUsername = usernameInput.value.trim();
  const enteredPassword = passwordInput.value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if username exists
  const user = users.find((u) => u.username === enteredUsername);

  // ❌ Username not found
  if (!user) {
    hideLoader();
    usernameError.textContent = "Username does not exist";
    return;
  }

  // ❌ Password incorrect
  if (user.password !== enteredPassword) {
    hideLoader();
    passwordError.textContent = "Incorrect password";
    return;
  }

  // ✅ Login successful
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("loggedInUser", user.username);

  window.location.href = "home.html";
});


// ===============================
// LOAD NAVBAR
// ===============================

fetch("../headers/navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;

    const navScript = document.createElement("script");
    navScript.src = "../headers/navbar.js";
    document.body.appendChild(navScript);

    const homeScript = document.createElement("script");
    homeScript.src = "../scripts/home.js";
    document.body.appendChild(homeScript);
  })
  .catch((error) => {
    console.error("Error loading navbar:", error);
  });


// ===============================
// LOAD FOOTER
// ===============================

fetch("../headers/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer-container").innerHTML = data;
  })
  .catch((error) => {
    console.error("Error loading footer:", error);
  });
