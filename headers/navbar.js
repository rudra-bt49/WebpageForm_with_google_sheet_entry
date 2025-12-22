const hamburger = document.getElementById("hamburger")
const navLinks = document.getElementById("navLinks")

if (hamburger && navLinks) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation()
    hamburger.classList.toggle("active")
    navLinks.classList.toggle("active")
    console.log("[v0] Hamburger menu toggled")
  })

  const links = navLinks.querySelectorAll("a")
  links.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  document.addEventListener("click", (event) => {
    if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    }
  })
} else {
  console.error("[v0] Hamburger or navLinks element not found")
}

const currentPage = window.location.pathname.split("/").pop() || "home.html"

const allNavLinks = document.querySelectorAll(".nav-links a")

allNavLinks.forEach((link) => {
  const linkHref = link.getAttribute("href")

  if (linkHref === currentPage) {
    link.classList.add("active")
  }

  if ((currentPage === "" || currentPage === "index.html" || currentPage === "home.html") && linkHref === "home.html") {
    link.classList.add("active")
  }
})

console.log("[v0] Active page detection initialized for:", currentPage)
