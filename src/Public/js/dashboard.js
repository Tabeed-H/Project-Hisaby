const userActionDash = document.querySelector(".dashboard-left");
const userListDash = document.querySelector(".dashboard-right");
const userActionBtn = document.querySelector(".user-action-btn");
const logoutBtn = document.querySelector(".user-logout-btn");
const addExpBtn = document.querySelector(".dashboard-left-item-3");
const userName = document.querySelector(".welcom-line");

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
      console.log(res);
      loadComplete(res);
    })
    .catch((err) => {
      console.log(err.response);
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
    addNewExp();
  });
};

const addNewExp = function () {
  console.log("Add expense");
};

const doLogout = function () {
  console.log("Clicked on logout");
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
      console.log(res);
      window.location.assign(`${window.location.origin}`);
    })
    .catch((err) => {
      console.log(err.response);
    });
};

// loadComplete();
window.onload = doFetchUser;
