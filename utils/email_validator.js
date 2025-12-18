// utils/validators.js

const emailRegex = /^[a-zA-Z0-9._%+-]+@(bitontree\.com|ddu\.com)$/;

function validateBusinessEmail(email) {
  return emailRegex.test(email);
}

function isEmailRegistered(email) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.some(user => user.email === email);
}
