'use strict';
const pass = document.getElementById("pass");
const passNew1 = document.getElementById("pass1");
const passNew2 = document.getElementById("pass2");
async function submit2() {
  let prevent = false;
  document.getElementById("errTab2").innerHTML = '';
  pass.classList.remove('border-is-invalid');
  passNew1.classList.remove('border-is-invalid');
  passNew2.classList.remove('border-is-invalid');
  pass.classList.remove('border-is-valid');
  passNew1.classList.remove('border-is-valid');
  passNew2.classList.remove('border-is-valid');

  if (pass.value.length < 8) {
    pass.classList.add('border-is-invalid');
    document.getElementById("errTab2").innerHTML += "<br> رمز عبور فعلی اشتباه است";
    prevent = true;
  }
  else
    pass.classList.add('border-is-valid');

  if (passNew1.value.length < 8) {
    passNew1.classList.add('border-is-invalid');
    document.getElementById("errTab2").innerHTML += "<br> رمز عبور جدید کوتاه تر از 8 کارکتر است";
    prevent = true;
  }
  else
    passNew1.classList.add('border-is-valid');

  if (passNew2.value.length < 8) {
    passNew2.classList.add('border-is-invalid');
    prevent = true;
  }
  else
    passNew2.classList.add('border-is-valid');

  if (passNew1.value != passNew2.value) {
    passNew1.classList.add('border-is-invalid');
    passNew2.classList.add('border-is-invalid');
    document.getElementById("errTab2").innerHTML += "<br> رمز عبور جدید با تکرار آن یکسان نیست";
    prevent = true;
  }
  if (passNew1.value == passNew2.value && passNew1.value == pass.value) {
    pass.classList.add('border-is-invalid');
    passNew1.classList.add('border-is-invalid');
    passNew2.classList.add('border-is-invalid');
    document.getElementById("errTab2").innerHTML += "<br> رمز جدید نمیتواند با رمز قبلی یکسان باشد";
    prevent = true;
  }
  if (prevent) return;
  mySWA(fetchpasswd, 'اخطار','آیا از تغییر رمز عبورتان اطمینان دارید؟' );


}



async function fetchpasswd() {

  // show loadings
  document.getElementById("changePassword").classList.add("position-relative");
  document.getElementById("passLoader").classList.add("position-absolute");
  document.getElementById("passLoader").classList.remove("d-none");
  document.getElementById("magicButton").setAttribute("disabled", "disabled");
  document.getElementById("magicButton").innerHTML =
  `
  <img class="pr-5" src="general/loading/tail-spin.svg">
  `;

  let result;
  let fdata = new FormData;
  fdata.append("pass", pass.value);
  fdata.append("pass1", passNew1.value);
  fdata.append("pass2", passNew2.value);
  await fetch("/profile/password", { method:"POST", body: fdata})
    .then(r => r.json()).then(rj => result = rj).catch(ex => window.location.reload());

  let asset;

  if (result.status == "success") {
    showAlert('success', 'کلمه عبور با موفقیت تغییر یافت ، لطفا مجددا وارد شوید ...');
    await new Promise(resolve => setTimeout(resolve, 8000));
    document.location.href = "/logout";
    return;
  } else {
    showAlert('error', result.message);
    pass.classList.add('border-is-invalid');
    document.getElementById("errTab2").innerHTML += "<br> رمز عبور فعلی اشتباه است";
  }


  //hide loadings
  document.getElementById("changePassword").classList.remove("position-relative");
  document.getElementById("passLoader").classList.remove("position-absolute");
  document.getElementById("passLoader").classList.add("d-none");
  document.getElementById("magicButton").removeAttribute("disabled");
  document.getElementById("magicButton").innerHTML =
  `
  ذخیره
  `;
}
