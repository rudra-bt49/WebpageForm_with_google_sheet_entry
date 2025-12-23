const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const form = document.getElementById("login-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  showLoader();

  const enteredUsername = usernameInput.value;
  const enteredPassword = passwordInput.value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const matchedUser = users.find(
    (u) =>
      u.username === enteredUsername &&
      u.password === enteredPassword
  );

  if (!matchedUser) {
    hideLoader();
    document.getElementById("usernameError").textContent =
      "Invalid username or password";
    document.getElementById("passwordError").textContent =
      "Invalid username or password";
    return;
  }

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("loggedInUser", matchedUser.username);

  window.location.href = "home.html";
});

fetch("../headers/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data

      const navScript = document.createElement("script")
      navScript.src = "../headers/navbar.js"
      document.body.appendChild(navScript)

      const homeScript = document.createElement("script")
      homeScript.src = "../scripts/home.js"
      document.body.appendChild(homeScript)
    })
    .catch((error) => {
      console.error("Error loading navbar:", error)
    })

  // Load footer
  fetch("../headers/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data
    })
    .catch((error) => {
      console.error("Error loading footer:", error)
    })