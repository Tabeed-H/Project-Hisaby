console.log("Connected");
const loginbtn = document.querySelector(".login-btn");
const signUpBtn = document.querySelectorAll(".signup-btn");
const logoAction = document.querySelector(".header-logo-container");

loginbtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.assign(`${window.location.origin}/login`);
});
logoAction.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.assign(window.location.origin);
});

signUpBtn.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.assign(`${window.location.origin}/signup`);
  })
);
