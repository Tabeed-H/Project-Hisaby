const signUpFormBtn = document.querySelector(".form-btn"); // selcts the signup form
const popupWindow = document.querySelector(".popup-container"); // redirect popup modal

// adds function to signup button
// validates the form
// if validated calls submitFrom()
// if not validated shows Error
signUpFormBtn.addEventListener("click", (e) => {
  e.preventDefault(); //prevents reload
  const nameField = document.getElementById("name"); // selects name field
  const emailField = document.getElementById("email"); // selects email field
  const passwordFeild = document.getElementById("password"); // selects password field
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // email validation regex

  // validating user name for length
  if (nameField.value.trim() === "") {
    window.alert("Enter a Valid Name");
    nameField.focus(); // forcus on the field
    return;
  }

  // validating password for lenght
  if (
    passwordFeild.value.trim().length < 8 ||
    passwordFeild.value.trim().length > 15
  ) {
    window.alert(
      "Password Length Must Be Greater Than 8 And Less Than 15 Characters!"
    );
  }
  // validating email for length and regex
  if (
    emailField.value.trim() === "" ||
    !emailField.value.toLowerCase().match(validRegex)
  ) {
    window.alert("Enter a valid Email!");
    emailField.focus(); // forcus on the field
    return;
  }

  // validating password compare password with re-entered password
  if (
    passwordFeild.value.trim() !==
    document.getElementById("cpassword").value.trim()
  ) {
    window.alert("Passwords Don't Match!. Please Check!");
    document.getElementById("cpassword").focus(); // focus on the field
    return;
  }

  // if form is validated
  submitForm();
});

/**
 * Function : submitForm
 * Makes an API call to signup (if validated)
 * @param {*} none
 * Success
 *
 * Error
 */
const submitForm = () => {
  // Creates an object
  const obj = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  /**
   * Axios promise
   * API call
   * @param {String}  URL api url
   * @param {JSON}    obj data to send
   * @param {Object}  header config
   */
  axios
    .post(`${window.location.origin}/api/v1/user/signup`, JSON.stringify(obj), {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      popupWindow.style.display = "flex";
      startTimmer(); // simulates 5 seconds timmer
    })
    .catch((err) => {
      // Checks for duplicated Key error
      if (err.response.data.err.code == 11000) {
        window.alert(
          `Please Use a Different ${Object.keys(
            err.response.data.err.keyPattern
          )}`
        );
      } else {
        window.alert(
          `Some Unknown Error Occured! \n Please Try Again Later!\nError Code : ${err.response.status}\nError Message : ${err.response.statusText}`
        );
      }
    });
};

/**
 * Function : startTimmer
 * Simulated a 5s timmer
 */
const startTimmer = () => {
  let time = 5;
  let redirectTime = setInterval(() => {
    document.querySelector(".timmer").innerHTML = String(time);
    if (time <= 0) {
      clearInterval(redirectTime); // clears time interval
      redirectToPage(); // navigate to login page
    }
    time--;
  }, 1000);
};

// Function : redirectToPage
// navigates to login page on successful signup
const redirectToPage = () => {
  window.location.assign(`${window.location.origin}/login`);
};
