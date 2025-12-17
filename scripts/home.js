const authLink = document.getElementById("authLink");

const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn === "true") {
  authLink.textContent = "Logout";
  authLink.href = "#";

  authLink.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
} else {
  authLink.textContent = "Login";
  authLink.href = "login.html";
}
