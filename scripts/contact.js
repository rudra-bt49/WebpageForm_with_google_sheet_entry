const form = document.getElementById("contact-form");
const email = document.getElementById("email");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const contactBtn = document.getElementById("contactBtn");

let isEmailValid = false;
let isNameValid = false;
let isMessageValid = false;

// Email validation (must exist in registered users)
email.addEventListener("input", () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.some(user => user.email === email.value);

    if (!exists) {
        document.getElementById("emailError").textContent =
            "This email is not registered!";
        isEmailValid = false;
    } else {
        document.getElementById("emailError").textContent = "";
        isEmailValid = true;
    }
    toggleButton();
});

// Name validation
nameInput.addEventListener("input", () => {
    if (nameInput.value.trim().length < 2) {
        document.getElementById("nameError").textContent =
            "Name must be at least 2 characters";
        isNameValid = false;
    } else {
        document.getElementById("nameError").textContent = "";
        isNameValid = true;
    }
    toggleButton();
});

// Message validation
messageInput.addEventListener("input", () => {
    if (messageInput.value.trim().length < 5) {
        document.getElementById("messageError").textContent =
            "Message must be at least 5 characters";
        isMessageValid = false;
    } else {
        document.getElementById("messageError").textContent = "";
        isMessageValid = true;
    }
    toggleButton();
});

function toggleButton() {
    contactBtn.disabled = !(isEmailValid && isNameValid && isMessageValid);
}

// Submit form
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("type", "contact");
    formData.append("email", email.value);
    formData.append("name", nameInput.value);
    formData.append("message", messageInput.value);

    fetch("https://script.google.com/macros/s/AKfycbwjSF_1rkNw4Yh-NV3WRKEMlvregzM31MVhZi2_pqKq9zwIhk9Tds1bdCQAkTrutZAZYQ/exec", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (!data.success) {
            alert("Error submitting contact form");
            return;
        }
        alert("😊 Contact form submitted successfully!");
        window.location.href = "home.html";
    })
    .catch(() => alert("😒 Submission failed"));
});
