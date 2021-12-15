console.log("Connected");
// const loginbtn = document.querySelectorAll(".login-btn");
const signUpBtn = document.querySelectorAll(".signup-btn");

signUpBtn.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.assign(`${window.location}signup`);
  })
);
