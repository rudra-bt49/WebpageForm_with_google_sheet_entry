// // Theme Toggle Functionality
// ;(() => {
//   // Get saved theme from localStorage or default to dark
//   const savedTheme = localStorage.getItem("theme") || "dark"

//   // Apply saved theme immediately to prevent flash
//   if (savedTheme === "light") {
//     document.body.classList.add("light-theme")
//   }

//   // Wait for DOM to be fully loaded
//   document.addEventListener("DOMContentLoaded", () => {
//     console.log("[v0] Theme toggle script initialized")

//     // Create theme toggle button if it doesn't exist
//     if (!document.querySelector(".theme-toggle-container")) {
//       const toggleContainer = document.createElement("div")
//       toggleContainer.className = "theme-toggle-container"
//       toggleContainer.innerHTML = `
//         <button class="theme-toggle-btn" id="themeToggle" aria-label="Toggle theme">
//           <svg class="theme-icon sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//             <circle cx="12" cy="12" r="5"/>
//             <line x1="12" y1="1" x2="12" y2="3"/>
//             <line x1="12" y1="21" x2="12" y2="23"/>
//             <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
//             <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
//             <line x1="1" y1="12" x2="3" y2="12"/>
//             <line x1="21" y1="12" x2="23" y2="12"/>
//             <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
//             <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
//           </svg>
//           <svg class="theme-icon moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//             <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
//           </svg>
//         </button>
//       `
//       document.body.appendChild(toggleContainer)
//     }

//     // Get toggle button
//     const themeToggleBtn = document.getElementById("themeToggle")

//     if (themeToggleBtn) {
//       // Add click event listener
//       themeToggleBtn.addEventListener("click", () => {
//         document.body.classList.toggle("light-theme")

//         // Save theme preference
//         const currentTheme = document.body.classList.contains("light-theme") ? "light" : "dark"
//         localStorage.setItem("theme", currentTheme)

//         console.log("[v0] Theme switched to:", currentTheme)
//       })
//     }
//   })
// })()




// Theme Toggle Functionality
;(() => {
  // Get saved theme from localStorage or default to dark
  const savedTheme = localStorage.getItem("theme") || "dark";

  // Apply saved theme immediately to prevent flash
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }

  // Expose an init function to bind the handler once the navbar is in the DOM
  window.initThemeToggle = () => {
    console.log("[v0] Theme toggle script initialized");

    const themeToggleBtn = document.getElementById("themeToggle");

    if (!themeToggleBtn) {
      console.error("[v0] themeToggle button not found");
      return;
    }

    // Avoid double-binding if called more than once
    if (!themeToggleBtn.dataset.bound) {
      themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");

        const currentTheme = document.body.classList.contains("light-theme") ? "light" : "dark";
        localStorage.setItem("theme", currentTheme);

        console.log("[v0] Theme switched to:", currentTheme);
      });

      themeToggleBtn.dataset.bound = "true";
    }
  };
})();
