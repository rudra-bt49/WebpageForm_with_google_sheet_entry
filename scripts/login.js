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

  // 🔑 LOGIN STATE (ADDED)
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("loggedInUser", matchedUser.username);

  // alert("😊 Login Successful!");
  window.location.href = "home.html";
});

