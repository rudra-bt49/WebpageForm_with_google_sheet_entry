checkAuthorizeUser();

const form = document.getElementById("contact-form");
const email = document.getElementById("email");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const contactBtn = document.getElementById("contactBtn");

let isEmailValid = false;
let isNameValid = false;
let isMessageValid = false;

email.addEventListener("input", () => {
  if (!validateBusinessEmail(email.value)) {
    document.getElementById("emailError").textContent =
      "Only Business Emails allowed (bitontree.com / ddu.com)";
    isEmailValid = false;
    toggleButton();
    return;
  }

  if (!isEmailRegistered(email.value)) {
    document.getElementById("emailError").textContent =
      "This email is not registered!";
    isEmailValid = false;
  } else {
    document.getElementById("emailError").textContent = "";
    isEmailValid = true;
  }

  toggleButton();
});

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

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  showLoader();

  await submitContactForm();
});

async function submitContactForm() {
  try {
    const formData = new FormData();
    formData.append("type", "contact");
    formData.append("email", email.value);
    formData.append("name", nameInput.value);
    formData.append("message", messageInput.value);

    const response = await fetch(CONFIG.CONTACT_API_URL, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (!data.success) {
        alert(data.message || "Error submitting contact form");
        return;
    }
    window.location.href = "home.html";
  } catch (error) {
    alert("😒 Submission failed");
  } finally {
    hideLoader();
  }
}
