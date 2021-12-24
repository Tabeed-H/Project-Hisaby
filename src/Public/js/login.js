const loginBtn = document.querySelector(".form-btn"); // Login button
const signupAnchor = document.querySelector(".anchor-lable"); // navigate to signup page

/**
 * Login Button funcationality
 * checks the email field if filled correctly
 * calls submitForm()
 */
loginBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevents reload of page
  const emailField = document.getElementById("email"); // selects the email field
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //regex for email validation

  // checks for empty email field or invalid emil-id
  if (
    emailField.value.trim() === "" ||
    !emailField.value.toLowerCase().match(validRegex)
  ) {
    doAlert();
    return;
  }

  submitForm();
});

/**
 * Function : submitForm
 * Makes an API call to login a User
 * @param {*} none
 * Success
 * Navigates to User Dashboard
 * Error
 * Alert box with Error Message
 */
const submitForm = function () {
  const emailField = document.getElementById("email"); // selects the email field
  const passwordFeild = document.getElementById("password"); // selects the password field

  // creates an object for axios post call
  const obj = {
    email: emailField.value.trim(),
    password: passwordFeild.value,
  };

  /**
   * Axios promise
   * API call
   * @param {String}  URL api url
   * @param {JSON}    obj data to send
   * @param {Object}  header config
   */
  axios
    .post(`${window.location.origin}/api/v1/user/login`, JSON.stringify(obj), {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      // Navigate to user dashboard
      window.location.assign(`${window.location.origin}/dashboard`);
    })
    .catch((err) => {
      doAlert(err.response.data.err);
    });
};

// Alert if Any Error
const doAlert = function (message) {
  window.alert(`\n${message}`);
};

// Navigate to signup page if clicked
signupAnchor.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.assign(`${window.location.origin}/signup`);
});
