"use strict";

// defining elements
const registerSwitch = document.getElementById("registerSwitch");
const loginSwitch = document.getElementById("loginSwitch");
const registerForm = document.getElementById("formZoneRegister");
const loginForm = document.getElementById("formZoneLogin");
const registerButtonZone = document.getElementById("registerButtonZone");
const loginButtonZone = document.getElementById("loginButtonZone");
const forgotPassword = document.getElementById("loginForgotPwd");
const forgetForm = document.getElementById("forgetForm");
const f1 = document.getElementById("f1");
const f2 = document.getElementById("f2");
const f3 = document.getElementById("f3");

registerSwitch.addEventListener("click", () => {
  loginForm.classList.add("d-none");
  forgetForm.classList.add("d-none");
  loginButtonZone.classList.add("d-none");
  f2.classList.add("d-none");
  f3.classList.add("d-none");
  f1.classList.remove("d-none");
  registerForm.classList.remove("d-none");
  registerButtonZone.classList.remove("d-none");
  //document.getElementById('resize').classList.remove('loginSize');
  document.getElementById("backBtn").classList.add("d-none");
  if (registerLegal.checked) legalNote.classList.remove("d-invisible");
  else legalNote.classList.add("d-invisible");
  document.getElementById('G').classList.add('d-none');
  resetSMS.removeAttribute('disabled');
  $captcha = false;
  document.getElementById('checkCaptcha').checked = $captcha;

  $("#G").fadeOut(0);
});

loginSwitch.addEventListener("click", () => {
  loginForm.classList.remove("d-none");
  loginButtonZone.classList.remove("d-none");
  forgetForm.classList.add("d-none");
  f2.classList.add("d-none");
  f3.classList.add("d-none");
  f1.classList.remove("d-none");
  registerForm.classList.add("d-none");
  registerButtonZone.classList.add("d-none");
  document.getElementById("backBtn").classList.add("d-none");
  document.getElementById('G').classList.add('d-none');
  resetSMS.removeAttribute('disabled');
  //document.getElementById('resize').classList.add('loginSize');
  if(document.getElementById('login-captcha-section').classList.includes('d-none')) $captcha = true;
  document.getElementById('checkCaptcha').checked = $captcha;

  $("#G").fadeOut(0);
});

forgotPassword.addEventListener("click", () => {
  loginForm.classList.add("d-none");
  registerForm.classList.add("d-none");
  forgetForm.classList.remove("d-none");
  loginButtonZone.classList.add("d-none");
  registerButtonZone.classList.add("d-none");
  document.getElementById("backBtn").classList.remove("d-none");
  $captcha = false;
  document.getElementById('checkCaptcha').checked = $captcha;
});

function goback() {
  document.getElementById("loginSwitch").click();
  document.getElementById("backBtn").classList.add("d-none");
  $("#G").fadeOut(0);
}
