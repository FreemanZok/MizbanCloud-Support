"use strict";

// defining elements:
let loginEmailField = document.getElementById("loginEmailField");
let loginPwdField = document.getElementById("loginPwdField");
let loginButton = document.getElementById("loginButton");
let loginForgotPwd = document.getElementById("loginForgotPwd");
let loginNotifications = document.getElementById("loginNotifications");
let loginDeny = false;

//login listeners
loginButton.addEventListener("click", () => actionLogin());
loginEmailField.addEventListener("keydown", (key) => {
  if (key.key == "Enter") actionLogin();
});
loginEmailField.addEventListener("change", () => {
  loginResetErrors();
});
loginPwdField.addEventListener("keydown", (key) => {
  if (key.key == "Enter") actionLogin();
});
loginPwdField.addEventListener("change", () => {
  loginResetErrors();
});
// login methods
function validationLogin() {
  loginResetErrors();

  if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(loginEmailField.value)
  )
    loginUserNameErr();

  if (loginPwdField.value.length < 8) loginPasswordError();

  return loginDeny;
}

async function actionLogin() {
  validationLogin();
  if (loginDeny) return;
  if (!$captcha && !$recaptcha) {
    loginButton.innerHTML = `
    ورود
    `;
    loginButton.removeAttribute("disabled");
    $captchaAction = "loginButton";
    return $('#captchaModal').modal('show');
  }
  loginButton.innerHTML = `
  <span style="margin-left: 10px;"> در حال بررسی </span>
  <img src="/general/loading/tail-spin.svg"/>
  `;
  loginButton.setAttribute("disabled", "disabled");
  document.getElementById('fetcher').classList.remove('d-none');
  //document.getElementById("load-cover").classList.remove("d-none");
  let loginData = new FormData();
  loginData.append("loginEmail", loginEmailField.value);
  loginData.append("loginPassword", loginPwdField.value);
  const dataer = await fetch("/auth/login", { method: "POST", body: loginData })
  .then((s) => s.json())
  .then((sj) => sj)
  .catch((e) => console.log(e));
  const response = dataer.message;
  if (response == "successSlash") {
    window.location.href = old_url ?? "/";
  }
  else if (response == "successValidation")
    window.location.href = "/verification";
  else {
    loginEmailField.classList.add("border-is-invalid");
    loginPwdField.classList.add("border-is-invalid");
    console.log(response);
    if (response == "step-up"){
      return window.location.href = "/second-step";
    }
    document.getElementById('fetcher').classList.add('d-none');
    let id = 3; //makeId(32);
    loginNotifications.innerHTML = lmakeNotification(
      "نام کاربری یا رمز عبور اشتباه است",
      id
    );
    loginButton.innerHTML = `
        ورود
    `;
    if(!$recaptcha) {
      refreshImage();
      $captcha = false;
      document.getElementById('login-captcha-section').classList.remove('d-none');
      document.getElementById('checkCaptchaLogin').checked = false;
    }
    loginButton.removeAttribute("disabled");
    //document.getElementById("load-cover").classList.add("d-none");
    showAlert('err', 'نام کاربری یا رمز عبور اشتباه است');
  }
}

// login errors
function loginResetErrors() {
  loginEmailField.classList.remove("border-is-invalid");
  document.getElementById("lMailErr").innerHTML = "";
  loginPwdField.classList.remove("border-is-invalid");
  document.getElementById("lPwdErr").innerHTML = "";

  loginNotifications.innerHTML = "";
  loginDeny = false;
}
function loginUserNameErr() {
  loginEmailField.classList.add("border-is-invalid");
  document.getElementById("lMailErr").innerHTML = `
    <span class=" fs-13 fw-400 ws-15 ls-02 text-red-400 mt-4 user-select-none">
        ایمیل اشتباه است
    </span>`;

  loginDeny = true;
}

function loginPasswordError() {
  loginPwdField.classList.add("border-is-invalid");
  document.getElementById("lPwdErr").innerHTML = `
    <span class=" fs-13 fw-400 ws-15 ls-02 text-red-400 mt-4 user-select-none">

        رمز عبور اشتباه است
    </span>`;
  loginDeny = true;
}

function offlineErr() {
  let id = makeId(32);
  loginNotifications.innerHTML += lmakeNotification(
    "اتصال خود را به اینترنت بررسی کرده، مجددا تلاش کنید.",
    id
  );
  setTimeout(function () {
    document.getElementById(id).classList.add("fader");
    setTimeout(() => document.getElementById(id).remove(), 5000);
  }, 3000);
}

// Helpers

function lmakeNotification(errText, id) {
  const a = `
<div id="${id}" class="alert alert-hover-show d-flex bg-light-100 px-4 py-2-5 position-relative
            align-items-center justify-content-between shadow-sm rounded-pill alert-dismissible fade show pos-fix" role="alert">
  <div class="d-flex align-items-center">
    <img class="me-2-5" src="/general/images/root/alerts/ico_close.svg">
    <p class="mb-0 fs-14 line-h-1-5 ws-05 text-gray-600 ls-02 user-select-none">${errText}</p>
  </div>

</div>
  `;

  return a;
}

function makeId(length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
