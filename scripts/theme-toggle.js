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
