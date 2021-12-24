const loginbtn = document.querySelector(".login-btn"); // Select Login Button
const signUpBtn = document.querySelectorAll(".signup-btn"); // Select signup Button
const logoAction = document.querySelector(".header-logo-container"); // Selects the Logo

// Navigate to login page when clicked
loginbtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.assign(`${window.location.origin}/login`);
});

// Navigate to main page when clicked on logo
logoAction.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.assign(window.location.origin);
});

// Navigate to signup page
// All the signup buttons
signUpBtn.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.assign(`${window.location.origin}/signup`);
  })
);
