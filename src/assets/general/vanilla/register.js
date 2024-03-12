"use strict";

// register
const rFirstName = document.getElementById("rName");
const rLastName = document.getElementById("rFamily");
const rMobileNumber = document.getElementById("rMobile");
const rMailBox = document.getElementById("rMail");
const rNationalCode = document.getElementById("rNationalCode");
const rPassword = document.getElementById("rPassword");
const rConfirm = document.getElementById("rConfirm");
const rBrand = document.getElementById("rBrand");
const rEconomicCode = document.getElementById("rEconomicCode");
const rNationalID = document.getElementById("rNationalID");
const rRegistrationNumber = document.getElementById("rRegistrationNumber");
const rPostalCode = document.getElementById("rPostalCode");
const rAddress = document.getElementById("rAddress");
const rRules = document.getElementById("btn-check-tick-2-1");
const registerButton = document.getElementById("registerButton");
const registerLegal = document.getElementById("registerLegal");
const business = document.getElementById("business");
const legalNote = document.getElementById("legalize");
const vCodeMeli = new RegExp("/^.{10,10}$/");
const vMobile = new RegExp("/^0(9)\\d{9}$/");
let registerDeny = false;

// WANA ENTER? GET SOME!
rFirstName.addEventListener("keydown", (ki) => {
  if(ki.key == "Enter")
    actionRegister();
})
rLastName.addEventListener("keydown", (ki) => {
  if(ki.key == "Enter")
    actionRegister();
})
rMobileNumber.addEventListener("keydown", (ki) => {
  if(ki.key == "Enter")
    actionRegister();
})
rMailBox.addEventListener("keydown", (ki) => {
  if(ki.key == "Enter")
    actionRegister();
})
rNationalCode.addEventListener("keydown", (ki) => {
  if(ki.key == "Enter")
    actionRegister();
})
rPassword.addEventListener("keydown", (ki) => {
  if(ki.key == "Enter")
    actionRegister();
})
rConfirm.addEventListener("keydown", (ki) => {
  if(ki.key == "Enter")
    actionRegister();
})
rBrand.addEventListener("keydown", (ki) => {
  if(ki.key == "Enter")
    actionRegister();
})
rEconomicCode.addEventListener("keydown", (ki) => {
  if(ki.key == "Enter")
    actionRegister();
})
rNationalID.addEventListener("keydown", (ki) => {
  if(ki.key == "Enter")
    actionRegister();
})
rRegistrationNumber.addEventListener("keydown", (ki) => {
  if(ki.key == "Enter")
    actionRegister();
})
rPostalCode.addEventListener("keydown", (ki) => {
  if(ki.key == "Enter")
    actionRegister();
})
rAddress.addEventListener("keydown", (ki) => {
  if(ki.key == "Enter")
    actionRegister();
})













// register methods
function validationRegister() {
  registerResetErrors();
  registerSuccessErrors();

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(rMailBox.value))
    vNotifyr("ایمیل صحیح نیست", rMailBox);

  if (rFirstName.value.length < 3) vNotifyr("فیلد نام اجباریست", rFirstName);
  if (rLastName.value.length < 3)
    vNotifyr("فیلد نام خانوادگی اجباریست", rLastName);

  if (rPassword.value.length < 8) {
    vNotifyr("کلمه عبور کوتاه است", rPassword);
    rConfirm.classList.add("border-is-invalid");
  }
  if (!/[A-Z]+/.test(rPassword.value) || !/[a-z]+/.test(rPassword.value)) {
    vNotifyr("رمز باید حاوی حروف کوچک و بزرگ باشد", rPassword);
    rConfirm.classList.add("border-is-invalid");
  }
  if (!/[\!\@\#\$\%\^\&\*\(\)\_\+\=\-]+/.test(rPassword.value)) {
    vNotifyr("رمز باید حاوی نمادهای خاص باشد", rPassword);
    rConfirm.classList.add("border-is-invalid");
  }
  if (rPassword.value != rConfirm.value) {
    vNotifyr("کلمه عبور درست تکرار نشده", rPassword);
    rConfirm.classList.add("border-is-invalid");
  }
  if (rMobileNumber.value.length != 11)
    vNotifyr("شماره موبایل صحیح نمیباشد", rMobileNumber);

  if (rNationalCode.value.length != 10)
    vNotifyr("کد ملی وارد شده صحیح نیست", rNationalCode);

  if (!rRules.checked) vNotifyr("(الزامی)", rRules);

  if (registerLegal.checked) {
    if (rBrand.value.length < 4) vNotifyr("نام تجاری کوتاه است", rBrand);

    if (rEconomicCode.value.length < 4)
      vNotifyr("کد اقتصادی کوتاه تر از حد مجاز است", rEconomicCode);

    if (rNationalID.value.length < 4)
      vNotifyr("کد ملی وارد شده صحیح نیست", rNationalID);

    if (rRegistrationNumber.value.length < 4)
      vNotifyr("شماره ثبت وارد شده صحیح نیست", rRegistrationNumber);

    if (rPostalCode.value.length != 10)
      vNotifyr("کد پستی وارد شده صحیح نیست", rPostalCode);

    if (rAddress.value.length < 20)
      vNotifyr("لطفا آدرس خود را کامل وارد کنید", rAddress);
  }
}

function formForgerRegister() {
  let data = new FormData();
  data.append("rFirstName", rFirstName.value);
  data.append("rLastName", rLastName.value);
  data.append("rMobileNumber", rMobileNumber.value);
  data.append("rMailBox", rMailBox.value);
  data.append("rNationalCode", rNationalCode.value);
  data.append("rPassword", rPassword.value);
  data.append("rConfirm", rConfirm.value);

  if (registerLegal.checked) {
    data.append("rBrand", rBrand.value);
    data.append("rEconomicCode", rEconomicCode.value);
    data.append("rNationalID", rNationalID.value);
    data.append("rRegistrationNumber", rRegistrationNumber.value);
    data.append("rAddress", rAddress.value);
    data.append("rZip", rPostalCode.value);
    data.append("rStatus", "2");
  }
  if (!registerLegal.checked) {
    data.append("rStatus", "1");
  }

  return data;
}

async function actionRegister() {
  registerDeny = false;
  validationRegister();
  if (registerDeny) {
    registerDeny = false;
    registerButton.innerHTML = `
      ثبت نام
    `;
    registerButton.removeAttribute("disabled");
    //document.getElementById("load-cover").classList.add("d-none");
    return;
  }
  // if (!$captcha && !$recaptcha) {
  //   registerDeny = false;
  //   registerButton.innerHTML = `
  //     ثبت نام
  //   `;
  //   registerButton.removeAttribute("disabled");
  //   $captchaAction = "registerButton";
  //   return $('#captchaModal').modal('show');
  // }
  registerButton.innerHTML = `
  <span style="margin-left: 10px;"> در حال بررسی </span>
  <img src="/general/loading/tail-spin.svg"/>
  `;
  registerButton.setAttribute("disabled", "disabled");
  document.getElementById('fetcher').classList.remove('d-none');
  //document.getElementById("load-cover").classList.remove("d-none");
  //document.getElementById("load-cover").style.height = "460px";
  let registerData = formForgerRegister();
  let response;
  await fetch("/auth/register", {
    method: "POST",
    body: registerData,
  })
    .then((s) => s.json())
    .then((sj) => (response = sj.message))
    .catch((e) => console.log(e));
  document.getElementById('fetcher').classList.add('d-none');
  registerButton.innerHTML = `
      ثبت نام
    `;
  registerButton.removeAttribute("disabled");
  //document.getElementById("load-cover").classList.add("d-none");
  if (response == "successVerify") window.location.href = "/verification";
  else {
    showAlert('err', response);
  }
}

// login errors
function registerResetErrors() {
  loginNotifications.innerHTML = "";
  loginDeny = false;

  rFirstName.classList.remove("border-is-invalid");
  rFirstName.classList.remove("border-is-valid");
  document.getElementById("rNameErr").innerHTML = "";

  rLastName.classList.remove("border-is-invalid");
  rLastName.classList.remove("border-is-valid");
  document.getElementById("rFamilyErr").innerHTML = "";

  rMobileNumber.classList.remove("border-is-invalid");
  rMobileNumber.classList.remove("border-is-valid");
  document.getElementById("rMobileErr").innerHTML = "";

  rMailBox.classList.remove("border-is-invalid");
  rMailBox.classList.remove("border-is-valid");
  document.getElementById("rMailErr").innerHTML = "";

  rNationalCode.classList.remove("border-is-invalid");
  rNationalCode.classList.remove("border-is-valid");
  document.getElementById("rNationalCodeErr").innerHTML = "";

  rPassword.classList.remove("border-is-invalid");
  rPassword.classList.remove("border-is-valid");
  document.getElementById("rPasswordErr").innerHTML = "";

  rConfirm.classList.remove("border-is-invalid");
  rConfirm.classList.remove("border-is-valid");
  document.getElementById("rConfirmErr").innerHTML = "";

  rBrand.classList.remove("border-is-invalid");
  rBrand.classList.remove("border-is-valid");
  document.getElementById("rBrandErr").innerHTML = "";

  rEconomicCode.classList.remove("border-is-invalid");
  rEconomicCode.classList.remove("border-is-valid");
  document.getElementById("rEconomicCodeErr").innerHTML = "";

  rNationalID.classList.remove("border-is-invalid");
  rNationalID.classList.remove("border-is-valid");
  document.getElementById("rNationalIDErr").innerHTML = "";

  rRegistrationNumber.classList.remove("border-is-invalid");
  rRegistrationNumber.classList.remove("border-is-valid");
  document.getElementById("rRegistrationNumberErr").innerHTML = "";

  rPostalCode.classList.remove("border-is-invalid");
  rPostalCode.classList.remove("border-is-valid");
  document.getElementById("rPostalCodeErr").innerHTML = "";

  rAddress.classList.remove("border-is-invalid");
  rAddress.classList.remove("border-is-valid");
  document.getElementById("rAddressErr").innerHTML = "";

  rRules.classList.remove("border-is-invalid");
  rRules.classList.remove("border-is-valid");
  document.getElementById("btn-check-tick-2-1").innerHTML = "";
}

function registerSuccessErrors() {
  loginNotifications.innerHTML = "";
  rFirstName.classList.add("border-is-valid");
  rLastName.classList.add("border-is-valid");
  rMobileNumber.classList.add("border-is-valid");
  rMailBox.classList.add("border-is-valid");
  rNationalCode.classList.add("border-is-valid");
  rPassword.classList.add("border-is-valid");
  rConfirm.classList.add("border-is-valid");
  rBrand.classList.add("border-is-valid");
  rEconomicCode.classList.add("border-is-valid");
  rNationalID.classList.add("border-is-valid");
  rRegistrationNumber.classList.add("border-is-valid");
  rPostalCode.classList.add("border-is-valid");
  rAddress.classList.add("border-is-valid");
  rRules.classList.add("border-is-valid");
}

function vNotifyr(errorMessage, inputField) {
  const zone = inputField.id + "Err";
  inputField.classList.add("border-is-invalid");
  document.getElementById(zone).innerHTML = `
    <span class=" fs-13 fw-400 ws-15 ls-02 text-red-400 mt-4 user-select-none" style="font-size: 0.7rem;font-weight: 400">
        ${errorMessage}
    </span>`;

  registerDeny = true;
}

function vOffline() {
  const id = makeId(32);
  loginNotifications.innerHTML += makeNotification(
    "اتصال خود را به اینترنت بررسی کرده، مجددا تلاش کنید.",
    id
  );
  setTimeout(function () {
    document.getElementById(id).classList.add("fader");
    setTimeout(() => document.getElementById(id).remove(), 5000);
  }, 3000);
}

function notification() {
  const id = makeId(32);
  loginNotifications.innerHTML += makeNotification(errorMessage, id);
  setTimeout(function () {
    document.getElementById(id).classList.add("fader");
    setTimeout(() => document.getElementById(id).remove(), 5000);
  }, 3000);
}

// render
function legalCheckbox() {
  if (registerLegal.checked) {
    business.classList.remove("d-none");
    legalNote.classList.remove("d-invisible");
  } else {
    business.classList.add("d-none");
    legalNote.classList.add("d-invisible");
  }
}

document.addEventListener("DOMContentLoaded", legalCheckbox);
registerLegal.addEventListener("change", legalCheckbox);
registerSwitch.addEventListener("click", legalCheckbox);
// listeners
registerButton.addEventListener("click", actionRegister);
registerLegal.addEventListener("change", () => {
  if (registerLegal.checked) legalNote.classList.remove("d-invisible");
  else legalNote.classList.add("d-invisible");
});

// Helpers
function makeNotification(errText, id) {
  const a = `
<div id="${id}" class="alert alert-hover-show d-flex bg-light-100 px-4 py-2-5 position-relative
            align-items-center justify-content-between shadow-sm rounded-pill alert-dismissible fade show" role="alert">
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
