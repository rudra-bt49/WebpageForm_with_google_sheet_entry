checkAuthorizeUser();

const isLoggedIn = localStorage.getItem("isLoggedIn");
const authLink = document.getElementById("authLink");

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
