// Load navbar
fetch("../headers/navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-container").innerHTML = data

    // Load navbar script after navbar HTML is loaded
    const navScript = document.createElement("script")
    navScript.src = "../headers/navbar.js"
    navScript.onload = () => {
      console.log("[v0] Navbar script loaded successfully")
    }
    navScript.onerror = () => {
      console.error("[v0] Failed to load navbar script")
    }
    document.body.appendChild(navScript)

    // Load home.js after navbar is ready
    const homeScript = document.createElement("script")
    homeScript.src = "../scripts/home.js"
    homeScript.onload = () => {
      console.log("[v0] Home script loaded successfully")
    }
    document.body.appendChild(homeScript)
  })
  .catch((error) => {
    console.error("[v0] Error loading navbar:", error)
  })

// Load footer
fetch("../headers/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer-container").innerHTML = data
    console.log("[v0] Footer loaded successfully")
  })
  .catch((error) => {
    console.error("[v0] Error loading footer:", error)
  })
