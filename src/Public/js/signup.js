const signUpFormBtn = document.querySelector(".form-btn");
const popupWindow = document.querySelector(".popup-container");

signUpFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const passwordFeild = document.getElementById("password");
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (nameField.value.trim() === "") {
    window.alert("Enter a Valid Name");
    nameField.focus();
    return;
  }

  if (
    passwordFeild.value.trim().length < 8 ||
    passwordFeild.value.trim().length > 15
  ) {
    window.alert(
      "Password Length Must Be Greater Than 8 And Less Than 15 Characters!"
    );
  }
  if (
    emailField.value.trim() === "" ||
    !emailField.value.toLowerCase().match(validRegex)
  ) {
    window.alert("Enter a valid Email!");
    emailField.focus();
    return;
  }

  if (
    passwordFeild.value.trim() !==
    document.getElementById("cpassword").value.trim()
  ) {
    window.alert("Passwords Don't Match!. Please Check!");
    document.getElementById("cpassword").focus();
    return;
  }

  submitForm();
});

const submitForm = () => {
  const obj = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  axios
    .post(`${window.location.origin}/api/v1/user/signup`, JSON.stringify(obj), {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      console.log(res);
      popupWindow.style.display = "flex";
      startTimmer();
    })
    .catch((err) => {
      console.log(err.response);
      window.alert("Some Unknown Error Occured! \n Please Try Again Later!");
    });
};

const startTimmer = () => {
  let time = 5;
  let redirectTime = setInterval(() => {
    document.querySelector(".timmer").innerHTML = String(time);
    if (time <= 0) {
      clearInterval(redirectTime);
      redirectToPage();
    }
    time--;
  }, 1000);
};
const redirectToPage = () => {
  window.location.assign(`${window.location.origin}/login`);
};
