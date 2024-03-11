'use strict';
////////////////////////////////////////////////////////////////
/////////       RESEND SMS NOTIFICATION AREA         //////////
//////////////////////////////////////////////////////////////
smsAlert();
// Properties
const timer = document.getElementById('timerZ');
const resendKey = document.getElementById('resendKey');
const wait = document.getElementById('wait');
const show = document.getElementById('show');
const input2 = document.getElementById('inputField2');
const form1b = document.getElementById('b1');
const form1 = document.querySelector('#top-login');
const form2b = document.getElementById('b2');
const form2 = document.querySelector('#bot-login');
let RESEND_ADDR = '/auth/resendCode';
countDown(120);

// Listeners
async function countDown(num = 120) {
  resendKey.classList.remove('bEnable');
  resendKey.classList.add('bDisable');
  smsAlert();
  for (let i = num; i > 0; i--) {
    wait.innerHTML = `برای ارسال مجدد کد ${i} ثانیه صبر کنید`;
    await sleep(1000);
  }
  resendKey.classList.add('bEnable');
  resendKey.classList.remove('bDisable');
  resendKey.classList.add('openZ');
  wait.innerHTML = 'درخواست ارسال مجدد کد تایید';
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendCode() {
  if (resendKey.classList.contains('openZ')) {
    resendKey.classList.remove('openZ');
    wait.classList.add('d-none');
    show.classList.remove('d-none');
    fetch(RESEND_ADDR, {method: 'POST'});
    //await sleep(3000);
    show.classList.add('d-none');
    resendKey.classList.add('d-none');
    wait.classList.remove('d-none');
    await countDown(120);
  }
}

resendKey.addEventListener("click", sendCode);


////////////////////////////////////////////////////////////////
//////////////       CORE FUNCTIONALITY         ///////////////
//////////////////////////////////////////////////////////////
const sendButton = document.getElementById('sendButton');
const sendButton2 = document.getElementById('sendButton2');
const inputField = document.getElementById('inputField');
const inputField2 = document.getElementById('inputField2');
sendButton.addEventListener("click", () => sendRequest(document.getElementById('inputField').value));
inputField.addEventListener("keydown", (ki) => {
  console.log(ki.key);
  const inp = document.getElementById('inputField').value;
  if (ki.key == 'Enter')
    sendRequest();
  if (inp.length === 3 && /^[0-9]{1}$/.test(ki.key))
    sendRequest(inp+ki.key);
});
sendButton2.addEventListener("click", sendRequestEmail);
inputField2.addEventListener("keydown", (ki) => {
  if (ki.key == 'Enter')
    sendRequestEmail();
});

async function sendRequest(inst = false) {
  let ret = false;
  inputField.classList.remove('border-is-invalid');
  document.getElementById('inputFieldErr').innerHTML = '';

  if (inputField.value.length < 3 || inputField.value.length > 7) {
    if(!inst) {
      vNotify('کد تایید معتبر نیست', inputField);
      ret = true;
    }
  }
  if (inputField.value.length < 1) {
    vNotify('کد تایید را وارد کنید', inputField);
    ret = true;
  }
  console.log("step2", ret);
  if (ret) return;
  sendButton.innerHTML = `
  <span style="margin-left: 10px;"> در حال بررسی </span>
  <img src="general/loading/tail-spin.svg"/>
  `;
  sendButton.setAttribute("disabled", "disabled");
  let code = new FormData();

  if (inst) code.append('code', inst);
  else code.append('code', (inputField.value));
  console.log(inputField.value);
  document.getElementById('fetcher').classList.remove('d-none');
  document.getElementById('fetcher2').classList.remove('d-none');
  let res;
  await fetch('/auth/verify', {method: 'POST', body: code})
    .then(r => r.json()).then(rj => res = rj);
  if (res.message == 'توکن ارسالی اشتباه است لطفا مجدد وارد شوید')
    console.log('check2153869 Not allowed.');
  if (res.status == 'success') {
    step2();
    //document.location.href = '/';
  }
  else {
    vNotify(res.message, inputField);
    showAlert('err', res.message);
  }
  document.getElementById('fetcher').classList.add('d-none');
  document.getElementById('fetcher2').classList.add('d-none');
  sendButton.innerHTML = `
      بررسی
    `;
  sendButton.removeAttribute("disabled");
}

async function sendRequestEmail() {
  let ret = false;
  inputField.classList.remove('border-is-invalid');
  document.getElementById('inputFieldErr').innerHTML = '';

  if (inputField2.value.length < 4 || inputField.value.length > 7) {
    vNotify('کد تایید معتبر نیست', inputField);
    ret = true;
  }
  if (inputField2.value.length < 1) {
    vNotify('کد تایید را وارد کنید', inputField);
    ret = true;
  }
  console.log("step2", ret);
  if (ret) return;
  sendButton2.innerHTML = `
  <span style="margin-left: 10px;"> در حال بررسی </span>
  <img src="general/loading/tail-spin.svg"/>
  `;
  sendButton2.setAttribute("disabled", "disabled");
  document.getElementById('fetcher').classList.remove('d-none');
  document.getElementById('fetcher2').classList.remove('d-none');
  let code = new FormData();
  code.append('code', inputField2.value);
  let res;
  await fetch('/auth/verify-email', {method: 'POST', body: code})
    .then(r => r.json()).then(rj => res = rj);
  if (res.message == 'توکن ارسالی اشتباه است لطفا مجدد وارد شوید') {
    console.log('check2153869 Not allowed.');
    showAlert('err',res.message);
  }
  if (res.status == 'success') {
    showAlert('success', res.message);
    window.location.href = '/';
  }
  else {
    vNotify(res.message, inputField2);
    showAlert('err',res.message);
  }
  document.getElementById('fetcher').classList.add('d-none');
  document.getElementById('fetcher2').classList.add('d-none');
  sendButton2.innerHTML = `
      بررسی
    `;
  sendButton2.removeAttribute("disabled");
}

// Helpers
function makeNotification(errText, id) {
  const a = `
<div id="${id}"
 class="alert alert-hover-show d-flex bg-light-100 px-4 py-2-5 position-relative
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
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

function vNotify(errorMessage, inputField) {
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
  loginNotifications.innerHTML += makeNotification(errorMessage, id);
  setTimeout(function () {
      document.getElementById(id).classList.add('fader');
      setTimeout(() => document.getElementById(id).remove(), 5000);
    },
    3000);
}


function showAlert(status = 'success', text = '', key=''){
  // if(document.getElementById('dvalert').classList.contains('alert-border-success')) {
  //   document.getElementById('dvalert').classList.remove('alert-border-success')
  // }
  // if (document.getElementById('dvalert').classList.contains('alert-border-danger')) {
  //     document.getElementById('dvalert').classList.remove('alert-border-danger')
  // }
  if (status === 'success'){
    document.getElementById("img").setAttribute(`src`,`general/images/root/alerts/ico_message_check.svg`);
    // $("#dvalert").addClass("alert-border-success");
  } else{
    // $("#dvalert").addClass("alert-border-danger");
    document.getElementById("img").setAttribute(`src`,`general/images/root/alerts/ico_message_warn.svg`);
  }

  document.getElementById('popop').innerHTML = text;
  document.getElementById('popopki').innerHTML = key;
  $("#dvalert").fadeOut(0);
  $(".progressloader").html('');
  $(window).scrollTop(0);
  $("#dvalert").fadeIn(400);
  var bar = new ProgressBar.Circle('.progressloader3', {
    strokeWidth: 10,
    easing: 'easeInOut',
    duration: 5000,
    color: '#59C2E2',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null,
  });

  bar.animate(1.0);
  setTimeout(function(){
    $("#dvalert").fadeOut(400);
    $(".progressloader").html('');

  }, 5000);


  // $('#dvalert-wrap').append(`<div class="login-alert shadow-sm ${status === 'success' ? 'success-alert' : 'error-alert'}">
  //       <img id="img" class="img-alert" src="${status === 'success' ? '/general/images/root/alerts/img_success-8.png' : '/general/images/root/alerts/img_error-8.png'}" />
  //       <p class="alert-cont">
  //       <span id="alert-stat">${status === 'success' ? 'موفق !' : 'خطا !'}</span>
  //       <span id="popop" class="fs-13" style="word-spacing:-1px;">${text}
  //       </span>
  //       </p>
  //       <span id="popopki" class="fs-13 alert-command">${key}
  //       </span>
  //   </div>`);
  //   $("#dvalert-wrap .login-alert").fadeOut(0);
  //   $(".progressloader").html('');
  //   $("#dvalert-wrap .login-alert").fadeIn(200);

  //   $('#dvalert-wrap .login-alert').length;

  //   document.querySelectorAll('.login-alert').forEach(alert => {
  //       setTimeout(function () {
  //           $(alert).fadeOut(200);
  //           $(alert).remove();
  //       }, 5000);
  //   });

}



function smsAlert(text = '', key=''){
  document.getElementById('wait').innerHTML = `برای ارسال مجدد کد 2 دقیقه صبر کنید`;
  $("#G").fadeOut(0);
  $(".progressloader3").html('');
  $(window).scrollTop(0);
  $("#G").fadeIn(400);
  var bar2 = new ProgressBar.Circle('.progressloader3', {
    strokeWidth: 11,
    easing: 'easeInOut',
    duration: 120000,
    color: '#eee',
    trailColor: '#59C2E2',
    trailWidth: 10,
    svgStyle: null,
  });

  bar2.animate(1.0);
  setTimeout(function(){
    // $("#G").fadeOut(400);
    $(".progressloader3").html(``);
    document.getElementById('wait').innerHTML = `ارسال درخواست مجدد`;
    $("#resendKey").removeClass('d-none');
  }, 120000);

}

function step2() {
  return window.location.href = '/';
  form1.classList.add('d-none');
  form1b.classList.add('d-none');
  form2.classList.remove('d-none');
  form2b.classList.remove('d-none');
  RESEND_ADDR = '/auth/resendCodeMail';
  fetch('/auth/resendCodeMail', {method: 'POST'});
}

if (mophone === "1"){
  step2();
}
