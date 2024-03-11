'use strict';

// PROPERTIES
const resetMobile = document.getElementById('resetMobile');
const resetMobileErr = document.getElementById('resetMobileErr');
const resetSMS = document.getElementById('resetSMS');
const regexMobile = new RegExp(/^0(9)\d{9}$/);
const resetCode = document.getElementById('resetCode');
const resetPwd = document.getElementById('resetPwd');
const resetCnf = document.getElementById('resetCnf');
const pwdErr = document.getElementById('pwdErr');
const codeErr = document.getElementById('resetCodeErr');
const submitPwd = document.getElementById('sNewpass');

async function sendSMS() {
  resetMobile.classList.remove('border-is-invalid');
  resetMobileErr.classList.add('d-none');
  if ( (resetMobile.value).length !== 11 || !/^0(9)\d{9}$/.test(resetMobile.value)) {
    resetMobile.classList.add('border-is-invalid');
    resetMobileErr.classList.remove('d-none');
    return;
  }
  countDown();
  resetSMS.setAttribute('disabled', 'disabled');
  const f1 = document.getElementById('f1');
  const f2 = document.getElementById('f2');
  let numb = new FormData;
  numb.append('mobile', resetMobile.value);
  let res;
  await fetch('/auth/reset-sms', {method: 'POST', body: numb}).then(r => r.json()).then(rj => res = rj);
  if(typeof res.status === "undefined" && typeof res.message !== "undefined") res.status = "success";
  if (res.message != 'successSlash' && typeof res.sms === "undefined") {
    showAlert(res.status, res.message);
    resetSMS.removeAttribute('disabled');
    resetMobile.classList.add('border-is-invalid');
    resetMobileErr.classList.remove('d-none');
    return false;
  }
  if(res.message != "successSlash")
    showAlert(res.status, res.message);
  document.getElementById('G').classList.remove('d-none');
  //document.getElementById('azx').classList.remove('d-none');
  if (!looping)
    smsAlert();
  console.log(res.message);
  f1.classList.add('d-none');
  f2.classList.remove('d-none');
  return true;
}

async function resetPasswd() {
  pwdErr.classList.add('d-none');
  codeErr.classList.add('d-none');
  resetPwd.classList.remove('border-is-invalid');
  resetCnf.classList.remove('border-is-invalid');
  resetCode.classList.remove('border-is-invalid');
  if (!validated()) return;
  if(!$captcha) {
    $captchaAction = "sNewpass";
    return $('#captchaModal').modal('show');
  }
  document.getElementById('fetcher').classList.remove('d-none');
  let reset = new FormData;
  reset.append('code', resetCode.value);
  reset.append('passwd', resetPwd.value);
  let res;
  await fetch('/auth/reset', {method: 'POST', body: reset}).then(r => r.json()).then(
    rj => {
      res = rj;
      console.log(res);
    }).catch(e => console.log(e));
  document.getElementById('fetcher').classList.add('d-none');
  if (res.message == 'successSlash' || res.status == 'success') {
    document.getElementById('f2').classList.add('d-none');
    document.getElementById('azx').classList.add('d-none');
    showAlert('success', 'رمز عبور شما با موفقیت تغییر یافت');
    document.getElementById('loginSwitch').click();
    goback();

  } else {
    document.getElementById('notifications').classList.add('d-none');
    showAlert('err', 'کد وارد شده معتبر نیست');
    $captcha = false;
    document.getElementById('checkCaptcha').checked = $captcha;
    refreshImage()
    sleep(5000);
    document.getElementById('notifications').classList.remove('d-none');
  }

}

function validated() {
  let isValid = true;

  if (resetPwd.value.length < 7) {
    resetPwd.classList.add('border-is-invalid');
    resetCnf.classList.add('border-is-invalid');
    pwdErr.classList.remove('d-none');
    isValid = false;
  }
  if (resetPwd.value !== resetCnf.value) {
    resetPwd.classList.add('border-is-invalid');
    resetCnf.classList.add('border-is-invalid');
    pwdErr.classList.remove('d-none');
    isValid = false;
  }
  if (resetCode.value.length < 4 || resetCode.value.length > 7) {
    resetCode.classList.add('border-is-invalid');
    codeErr.classList.remove('d-none');
    isValid = false;
  }
  return isValid;
}


// LISTENERS
resetSMS.addEventListener("click", () => {
  sendSMS();
});
submitPwd.addEventListener("click", () => resetPasswd());
resetMobile.addEventListener("keydown", (ki) => {
  if (ki.key === 'Enter') {
    sendSMS();
  }
});
resetMobile.addEventListener("change", () => {
  resetMobile.classList.remove('border-is-invalid');
  resetMobileErr.classList.add('d-none');
});


// HELPERS
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function vNotifyZ(errorMessage, inputField) {
  const zone = inputField.id + 'Err';
  inputField.classList.add('border-is-invalid');
  document.getElementById(zone).innerHTML = `
    <span class=" fs-13 fw-400 ws-15 ls-02 text-red-400 mt-4 user-select-none">
        ${errorMessage}
    </span>`;

}

function notification(errorMessage) {
  const id = 1; //makeId(32);
  loginNotifications.innerHTML = ``;
  loginNotifications.innerHTML += makeNotificationR(errorMessage, id);
  setTimeout(function () {
      document.getElementById(id).classList.add('fader');
      setTimeout(() => document.getElementById(id).remove(), 5000);
    },
    5000);
}

function gnotification(errorMessage) {
  const id = 1; //makeId(32);
  document.getElementById('gNotifications').innerHTML = makeNotificationG(errorMessage, id);
  setTimeout(function () {
      document.getElementById(id).classList.add('fader');
      setTimeout(() => document.getElementById(id).remove(), 5000);
    },
    5000);
}

function makeNotificationR(errText, id) {
  const a = `
<div id="${id}"
 class="alert alert-hover-show d-flex bg-light-100 px-4 py-2-5 position-relative
            align-items-center justify-content-between shadow-sm rounded-pill alert-dismissible fade show" role="alert">
  <div class="d-flex align-items-center">
    <img class="me-2-5" src="/general/images/root/alerts/ico_close.svg">
    <p class="mb-0 fs-14 line-h-1-5 ws-05 text-gray-600 ls-02 user-select-none">${errText}</p>
  </div>
  <div class="d-flex align-items-center">
    <img class="ms-2-5 alert-hover-hide cursor-pointer" src="/general/images/root/alerts/ico_close.svg">
  </div>
</div>
  `;

  return a;
}

function makeNotificationG(errText, id) {
  const a = `
<div id="${id}"
 class="alert alert-hover-show d-flex bg-light-100 px-4 py-2-5 position-relative
            align-items-center justify-content-between shadow-sm rounded-pill alert-dismissible fade show" role="alert">
  <div class="d-flex align-items-center">
    <div style="background-image: url('/general/images/root/topMenu/ico_password_changer.svg');
    background-size: cover; width: 29px ;height: 18px; margin-left: 18px"></div>
    <p class="mb-0 fs-14 line-h-1-5 ws-05 text-gray-600 ls-02 user-select-none">${errText}</p>
  </div>

</div>
  `;

  return a;
}

const timer = document.getElementById('timerZ');
const resendKey = document.getElementById('resendKey');
const wait = document.getElementById('wait');
const show = document.getElementById('show');
let looping = false;
resendKey.addEventListener("click", sendCode);

async function countDown(num = 120) {
  resendKey.classList.remove('bEnable');
  document.querySelector('.progBar').classList.remove('d-none');

  smsAlert();
  resendKey.classList.add('bDisable');
  resendKey.classList.add('d-none');

  looping = true;
  for (let i = num; i > 0; i--) {
    if(i != num && wait.innerHTML != `برای ارسال مجدد کد ${i+1} ثانیه صبر کنید `) break;
    wait.innerHTML = `برای ارسال مجدد کد ${i} ثانیه صبر کنید `;
    await sleep(1000);
  }
  looping = false;
  resendKey.classList.add('bEnable');
  resendKey.classList.remove('bDisable');
  resendKey.classList.remove('d-none');

  document.querySelector('.progBar').classList.add('d-none');
  resendKey.classList.add('openZ');
  wait.innerHTML = 'درخواست ارسال مجدد پیامک تایید';
}

async function sendCode() {
  resendKey.classList.remove('bEnable');
  document.querySelector('.progBar').classList.remove('d-none');
  resendKey.classList.add('bDisable');
  resendKey.classList.add('d-none');
  if (resendKey.classList.contains('openZ')) {
    resendKey.classList.remove('openZ');
    // wait.classList.add('d-none');
    show.classList.remove('d-none');
    const approved = await sendSMS();
    await sleep(3000);
    show.classList.add('d-none');
    wait.classList.remove('d-none');
    if (approved)
      await countDown(120);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
