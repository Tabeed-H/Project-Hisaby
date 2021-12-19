const loginBtn = document.querySelector(".form-btn");
const signupAnchor = document.querySelector(".anchor-lable");

signupAnchor.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.assign(`${window.location.origin}/signup`);
});

const doAlert = function () {
  window.alert("Invalid Email-ID/Password");
  nameField.focus();
};

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const emailField = document.getElementById("email");
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (
    emailField.value.trim() === "" ||
    !emailField.value.toLowerCase().match(validRegex)
  ) {
    doAlert();
    return;
  }
  submitForm();
});

const submitForm = function () {
  const emailField = document.getElementById("email");
  const passwordFeild = document.getElementById("password");
  const obj = {
    email: emailField.value.trim(),
    password: passwordFeild.value,
  };
  axios
    .post(`${window.location.origin}/api/v1/user/login`, JSON.stringify(obj), {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      console.log(res);
      window.location.assign(`${window.location.origin}/dashboard`);
    })
    .catch((err) => {
      console.log(err.response);
      doAlert();
    });
};
