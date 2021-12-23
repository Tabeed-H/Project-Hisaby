const userActionDash = document.querySelector(".dashboard-left");
const userListDash = document.querySelector(".dashboard-right");
const userActionBtn = document.querySelector(".user-action-btn");
const amountDue = document.querySelector(".amout-due");
const logoutBtn = document.querySelector(".user-action-btn");
const addExpBtn = document.querySelector(".dashboard-left-item-3");
const userName = document.querySelector(".welcom-line");
const expTitle = document.getElementById("title");
const expAmount = document.getElementById("balance");
const expDue = document.getElementById("due");
const addExpBackground = document.querySelector(".addexp-form-container-back");
const addExpForm = document.querySelector(".addexp-form-container");
const postExpFormBtn = document.querySelector(".exp-add-btn");

const doMarkComplete = function (ele) {
  const obj = {
    expid: ele.parentNode.dataset.expid,
  };
  axios
    .patch(
      `${window.location.origin}/api/v1/user/expences/markComplete`,
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
      getUserExp();
    })
    .catch((err) => {
      console.log(err.response);
    });
};

const doDeleteExp = function (ele) {
  const obj = {
    expid: ele.parentNode.dataset.expid,
  };
  axios
    .post(
      `${window.location.origin}/api/v1/user/expences/delete`,
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
      // console.log(res);
      getUserExp();
    })
    .catch((err) => {
      console.log(err.response);
    });
};

const doFetchUser = function () {
  axios
    .post(
      `${window.location.origin}/api/v1/user/loggeduser`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: document.cookie,
        },
      }
    )
    .then((res) => {
      // console.log(res);
      loadComplete(res);
      getUserExp();
    })
    .catch((err) => {
      // console.log(err.response);
      window.location.assign(`${window.location.origin}/404`);
    });
};

const loadComplete = function (res) {
  userActionDash.classList.remove("loading");
  userListDash.classList.remove("animation-div");
  userActionBtn.classList.remove("loading");

  userName.innerHTML = `Hi, ${res.data.user.name}`;
  //   add events
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    doLogout();
  });

  addExpBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addNewExp(res);
  });
};

const getUserExp = function () {
  axios
    .get(`${window.location.origin}/api/v1/user/expences/getAll`, {
      headers: {
        Authorization: document.cookie,
      },
    })
    .then((res) => {
      // console.log(res);
      printExpOnScreen(res.data);
    })
    .catch((err) => {
      // console.log(err.response);
      window.alert(`Something Went Wrong!`);
    });
};

const addNewExp = function (res) {
  openExpForm();
  addExpBackground.addEventListener("click", closeExpForm);
  document
    .querySelector(".close-form-btn")
    .addEventListener("click", closeExpForm);
  postExpFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    sendExpForm(res);
    getUserExp();
  });
};

const openExpForm = function () {
  addExpBackground.style.display = "inherit";
  addExpForm.style.visibility = "visible";
};

const closeExpForm = function () {
  addExpBackground.style.display = "none";
  addExpForm.style.visibility = "hidden";
  clearExpForm();
};

const clearExpForm = function () {
  // expTitle.value = "";
  // expAmount.value = "";
  // expDue.value = "";
  document.querySelector(".exp-form").reset();
};

const printExpOnScreen = function (res) {
  const expContainer = document.querySelector(".exp-container");
  expContainer.innerHTML = "";
  let completeExp = [],
    notCompletedExp = [];
  res.forEach((ele) => {
    if (ele.completed) {
      completeExp.push(ele);
    } else {
      notCompletedExp.push(ele);
    }
  });
  const allExp = [...notCompletedExp, ...completeExp];
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

  calculateBalance(res);
};

const calculateBalance = function (res) {
  let balance = 0;
  res.forEach((ele) => {
    if (!ele.completed) balance += ele.balance;
  });
  amountDue.innerHTML = String(balance);
};

const sendExpForm = function (res) {
  const obj = {
    title: expTitle.value,
    balance: expAmount.value,
    due: expDue.value,
    owner: res.data.user._id,
  };

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
      console.log(err.response);
      window.alert(`Something Went Wrong!`);
    });
};

const doLogout = function () {
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
      // console.log(err.response);
      window.alert(`Somthing Went Wrong!`);
    });
};

// loadComplete();
window.onload = doFetchUser;
