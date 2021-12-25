/**
 * Program Structure :
 * A. DOM Selectors
 * B. All Functions performing an API call
 *     * 1. doFetchUser()       to get the details of a user
 *     * 2. getUserExp()        to gets the expenses of the user
 *     * 3. sendExpForm()       to add a new expenses to the DB
 *     * 4. doMarkComplete()    to mark an expense as complete
 *     * 5. doDeleteExp()       to delete an expense
 *     * 6. doLogout()          to logout a user
 * C. All Functions performing DOM manuplation
 *     * 1. loadComplete()      to add functions to the dashboard buttons
 *     * 2. printExpOnScreen()  to add the fetched expenses to the DOM
 *     * 3. addNewExp()         to add functions to the form buttons
 *     * 4. openExpForm()       to change the visibilty of the form
 *     * 5. closeExpForm()      to change the visibilty of the form
 *     * 5. clearExpForm()      to reset the values of the form
 *     * 6. calculateBalance()  to calculate the due balance and add to the DOM
 */

const userActionDash = document.querySelector(".dashboard-left"); // selects the user dashboard menu
const userListDash = document.querySelector(".dashboard-right"); // selects the user expense container
const userActionBtn = document.querySelector(".user-action-btn"); // selects logout button container
const logoutBtn = document.querySelector(".user-action-btn"); // selects the logout button
const amountDue = document.querySelector(".amout-due"); // selects the container that holds the total amount due container
const addExpBtn = document.querySelector(".dashboard-left-item-3"); // selects the add expense container
const userName = document.querySelector(".welcom-line"); // selects container containing the welcome message
const expTitle = document.getElementById("title"); // selects the container containing the title of the expense
const expAmount = document.getElementById("balance"); // selects the container containing the amount of the expense
const expDue = document.getElementById("due"); // selects the container containing the due date of the expense
const addExpBackground = document.querySelector(".addexp-form-container-back"); // selects background for add expense modal
const addExpForm = document.querySelector(".addexp-form-container"); // selects add expense form
const postExpFormBtn = document.querySelector(".exp-add-btn"); // selects the add expense button of the form

/**
 * Function : doFetchUser
 * gets the details of the logged user
 */
const doFetchUser = function () {
  /**
   * Axios API Call
   * @param {String} url  API url
   * @param {Object} headers  cookie for authorization
   * on Promise Success
   * function call: loadComplete(), getUserExp();
   * on Promise Rejection
   * if the user data is not fetched 404 page is loaded
   */
  axios
    .post(
      `${window.location.origin}/api/v1/user/loggeduser`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: document.cookie, // cookie with the jwt token
        },
      }
    )
    .then((res) => {
      loadComplete(res); // for changing page style and adding functionality
      getUserExp();
    })
    .catch((err) => {
      window.location.assign(`${window.location.origin}/404`);
    });
};

/**
 * Function : getUserExp
 * gets all the expenses of the current logged user
 */
const getUserExp = function () {
  /**
   * Axios API Call
   * @param {String} url  API url
   * @param {Object} headers  cookie for authorization
   * on Promise Success
   * function call: printExpOnScreen()
   * on Promise Rejection
   * Shows Error code and message
   */
  axios
    .get(`${window.location.origin}/api/v1/user/expences/getAll`, {
      headers: {
        Authorization: document.cookie,
      },
    })
    .then((res) => {
      printExpOnScreen(res.data);
    })
    .catch((err) => {
      window.alert(
        `Something Went Wrong!\nError Code : ${err.response.status}\nError Message : ${err.response.statusText}`
      );
    });
};

/**
 * Function : sendExpForm
 * Adds a new expense to the DB
 * @param {*} res
 */
const sendExpForm = function (res) {
  // creates a js object from the expense form
  const obj = {
    title: expTitle.value,
    balance: expAmount.value,
    due: expDue.value,
    owner: res.data.user._id,
  };
  /**
   * Axios API Call
   * @param {String} url  API url
   * @param {JSON}   obj  data to send
   * @param {Object} headers  content-type and cookie for authorization
   * on Promise Success
   * function call: clearExpForm, Alerts User
   * on Promise Rejection
   * Shows Error
   */
  axios
    .post(
      `${window.location.origin}/api/v1/user/expences/add`,
      JSON.stringify(obj),
      {
        headers: {
          "content-type": "application/json",
          withCredentials: true,
          Authorization: document.cookie,
        },
      }
    )
    .then((res) => {
      window.alert(`Added!`);
      clearExpForm();
    })
    .catch((err) => {
      window.alert(
        `Something Went Wrong!\nError Code : ${err.response.status}\nError Message : ${err.response.statusText}`
      );
    });
};

/**
 * Function : doMarkComplete
 * marks a expense as complete using axios API call
 * @param {*} ele DOM element
 */
const doMarkComplete = function (ele) {
  // object to send as data
  const obj = {
    expid: ele.parentNode.dataset.expid, // gets the id stored in the DOM
  };

  /**
   * Axios API Call
   * @param {String} url  API url
   * @param {JSON}   obj  data to send
   * @param {Object} headers  content-type and cookie for authorization
   * on Promise Success
   * function call: getUserExp()
   * on Promise Rejection
   * Shows Error
   */
  axios
    .patch(
      `${window.location.origin}/api/v1/user/expences/markComplete`,
      JSON.stringify(obj),
      {
        headers: {
          "content-type": "application/json",
          withCredentials: true,
          Authorization: document.cookie, // containing the jwt token stored on cookie
        },
      }
    )
    .then((res) => {
      getUserExp(); // functin call
    })
    .catch((err) => {
      window.alert(
        `Some Unknown Error Occured! \n Please Try Again Later!\nError Code : ${err.response.status}\nError Message : ${err.response.statusText}`
      );
    });
};

/**
 * Function : doDeleteExp
 * Deletes an expense
 * @param {*} ele   DOM element
 */
const doDeleteExp = function (ele) {
  // object to send as data
  const obj = {
    expid: ele.parentNode.dataset.expid, // id of the expense to delete stored on the DOM
  };
  /**
   * Axios API Call
   * @param {String} url  API url
   * @param {JSON}   obj  data to send
   * @param {Object} headers  content-type and cookie for authorization
   * on Promise Success
   * function call: getUserExp();
   * on Promise Rejection
   * Shows Error
   */
  axios
    .post(
      `${window.location.origin}/api/v1/user/expences/delete`,
      JSON.stringify(obj),
      {
        headers: {
          "content-type": "application/json",
          withCredentials: true,
          Authorization: document.cookie, // jwt token stored in cookie
        },
      }
    )
    .then((res) => {
      getUserExp(); // function call
    })
    .catch((err) => {
      window.alert(
        `Some Unknown Error Occured! \n Please Try Again Later!\nError Code : ${err.response.status}\nError Message : ${err.response.statusText}`
      );
    });
};

/**
 * Function : dologout
 * To end the current session of the current user
 */
const doLogout = function () {
  /**
   * Axios API Call
   * @param {String} url  API url
   * @param {Object} headers  content-type and cookie for authorization
   * on Promise Success
   * Navigates to home Page
   * on Promise Rejection
   * Shows Error
   */
  axios
    .post(
      `${window.location.origin}/api/v1/user/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: document.cookie,
        },
      }
    )
    .then((res) => {
      window.location.assign(`${window.location.origin}`);
    })
    .catch((err) => {
      window.alert(
        `Somthing Went Wrong!\nError Code : ${err.response.status}\nError Message : ${err.response.statusText}`
      );
    });
};

/**
 * Function : loadComplete
 * Changes style of the dashboard and adds functionality to the page buttons
 * @param {*} res
 */
const loadComplete = function (res) {
  userActionDash.classList.remove("loading"); // removes the opacity of the dashboard
  userActionBtn.classList.remove("loading"); // removes the opacity of the buttion
  userListDash.classList.remove("animation-div"); // removes the loading animation from the dashboard

  userName.innerHTML = `Hi, ${res.data.user.name}`; // Adds a welcome message

  // add events to the dashboard buttons

  /**
   * Adds logout function
   */
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault(); // prevents reload
    doLogout();
  });

  /**
   * Adds function of adding new expenses
   */
  addExpBtn.addEventListener("click", (e) => {
    e.preventDefault(); // prevents reload
    addNewExp(res);
  });
};

/**
 * Function : printExpOnScreen
 * Adds the list of expenses of the logges user on the DOM
 * @param {*} res
 */
const printExpOnScreen = function (res) {
  const expContainer = document.querySelector(".exp-container"); // selects the expense list container in the DOM
  expContainer.innerHTML = ""; // to empty the container before manuplation

  // seperates expenses base on the status of completion
  let completeExp = []; // for completed expenses,
  notCompletedExp = []; // for not completed expenses;

  // sorts the incomming list
  res.forEach((ele) => {
    if (ele.completed) {
      completeExp.push(ele);
    } else {
      notCompletedExp.push(ele);
    }
  });

  // to store all the sorted expenses
  const allExp = [...notCompletedExp, ...completeExp];

  // add each element to the DOM
  allExp.forEach((ele) => {
    const html = `<div class="exp-item ${
      ele.completed ? "exp-item-completed" : ""
    }" data-expId=${ele._id}>
    <div class="exp-item-checkbox exp-item-style" onclick="doMarkComplete(this)"><img src="/img/checkbox.png" alt="checkbox"></div>
    <div class="exp-item-title exp-item-style ">${ele.title}</div>
    <div class="exp-item-amount exp-item-style  ">Rs ${ele.balance}</div>
    <div class="exp-item-due  exp-item-style " >${ele.due.split("T")[0]}</div>
    <div class="exp-item-checkbox exp-item-style" onclick="doDeleteExp(this)"><img src="/img/cancel.png" alt="delete"></div>
  </div>`;
    expContainer.insertAdjacentHTML("beforeend", html);
  });

  // calculates the balance due
  calculateBalance(res);
};

/**
 * Function : addNewExp
 * Makes the form visible and adds functionality to the form add button
 * @param {*} res
 */
const addNewExp = function (res) {
  openExpForm(); // this changes the visibility of the form
  addExpBackground.addEventListener("click", closeExpForm); // adds function to the background of the form
  document
    .querySelector(".close-form-btn")
    .addEventListener("click", closeExpForm); // adds function to the close button of the form

  // on form submit
  postExpFormBtn.addEventListener("click", (e) => {
    e.preventDefault(); // prevents loading
    sendExpForm(res); // to make API call
    getUserExp(); // to get the new list of expenses of the logges user
  });
};

/**
 * Function : openExpForm
 * Changes the visibility of the add expense form to vissible
 */
const openExpForm = function () {
  addExpBackground.style.display = "inherit";
  addExpForm.style.visibility = "visible";
};

/**
 * Function : closeExpForm
 * changes the visiblity of the add expense form to hidden
 */
const closeExpForm = function () {
  addExpBackground.style.display = "none";
  addExpForm.style.visibility = "hidden";
  clearExpForm();
};

/**
 * Function : clearExpForm
 * resets the input fields of the add expense form
 */
const clearExpForm = function () {
  document.querySelector(".exp-form").reset();
};

/**
 * Function : calculateBalance
 * Calculates the total balance due by adding the amount of pending (not completed) expenses
 * @param {*} res
 */
const calculateBalance = function (res) {
  let balance = 0; //sets initial value
  res.forEach((ele) => {
    if (!ele.completed) balance += ele.balance;
  });
  amountDue.innerHTML = String(balance); // adds balance to the DOM
};

// On DOM load complete
window.onload = doFetchUser;
