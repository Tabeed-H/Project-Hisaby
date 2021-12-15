console.log("Connected");
// const loginbtn = document.querySelectorAll(".login-btn");
const signUpBtn = document.querySelectorAll(".signup-btn");
const logoAction = document.querySelector(".header-logo-container");

logoAction.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.assign(window.location.origin);
});

signUpBtn.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.assign(`${window.location}signup`);
  })
);
