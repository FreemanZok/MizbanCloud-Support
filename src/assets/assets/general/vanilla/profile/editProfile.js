"use strict";
let prevented = false;
let resultx;
const name = document.getElementById("name");
const family = document.getElementById("family");
const natID = document.getElementById("nationalCode");
const mobile = document.getElementById("mobile");
const mail = document.getElementById("mail");
const legalSwitch = document.getElementById("legal_switch");
const brand = document.getElementById("brand");
const economicCode = document.getElementById("EconomicCode");
const nationalID = document.getElementById("nationalID");
const registrationNumber = document.getElementById("registrationNumber");
const postalCode = document.getElementById("postalCode");
const address = document.getElementById("address");
const realNotice = document.getElementById("real_notice");
const errors = [
  "nameErr",
  "familyErr",
  "nationalCodeErr",
  "mobileErr",
  "mailErr",
  "brandErr",
  "EconomicCodeErr",
  "nationalIDErr",
  "registrationNumberErr",
  "postalCodeErr",
  "addressErr",
];
const form3 = document.getElementById("form-3");
const dNotice = document.getElementById("real_notice");
legalSwitch.addEventListener("change", legalCheckState);
$(document).ready(legalCheckState(true));
loadTab1();

async function loadTab1() {
  let result;
  realNotice.classList.add('d-none');
  await fetch("/profile/user-data", { method: "POST" })
    .then((response) => response.json())
    .then((json) => (result = json)).catch(ex => window.location.reload());
    realNotice.classList.remove('d-none');
  resultx = result;
  name.value = result.fName;
  family.value = result.lName;
  natID.value = result.unationalid;
  mobile.value = result.phone;
  mail.value = result.umail;
  console.log(result);
  if (typeof result.individual != "undefined" && result.individual == 2) {
    resultx = result;
    realNotice.innerHTML = "<br/>";
    legalSwitch.checked = result["individual"] == 2;
    economicCode.value = result["eco"];
    nationalID.value = result["natcode"];
    brand.value = result["brand"];
    registrationNumber.value = result["regcode"];
    postalCode.value = result["zip"];
    address.value = result["address"];
    legalSwitch.setAttribute("disabled","disabled");
  }
  legalCheckState();
}

function legalCheckState(first = false) {
  if (legalSwitch.checked == true) {
    document.getElementById('real_notice').classList.remove('d-none');
    brand.removeAttribute("disabled");
    economicCode.removeAttribute("disabled");
    nationalID.removeAttribute("disabled");
    registrationNumber.removeAttribute("disabled");
    postalCode.removeAttribute("disabled");
    address.removeAttribute("disabled");
    form3.style.opacity = 1;
    dNotice.classList.remove("hide_hide");
  } else if (legalSwitch.checked == false) {
    brand.setAttribute("disabled", "disabled");
    economicCode.setAttribute("disabled", "disabled");
    nationalID.setAttribute("disabled", "disabled");
    registrationNumber.setAttribute("disabled", "disabled");
    postalCode.setAttribute("disabled", "disabled");
    address.setAttribute("disabled", "disabled");
    form3.style.opacity = 0.6;
    dNotice.classList.add("hide_hide");
  }  if (
    economicCode.value.length > 1 &&
    nationalID.value.length > 1 &&
    brand.value.length > 1 &&
    registrationNumber.value.length > 1 &&
    postalCode.value.length > 1 &&
    address.value.length > 1
  ) {
    brand.setAttribute("disabled", "disabled");
    economicCode.setAttribute("disabled", "disabled");
    nationalID.setAttribute("disabled", "disabled");
    registrationNumber.setAttribute("disabled", "disabled");
    postalCode.setAttribute("disabled", "disabled");
    address.setAttribute("disabled", "disabled");
    form3.style.opacity = 0.6;
  }

}

function submit1() {
  validationRegister();
  if (prevented) return;
  console.log(economicCode.value);
  if( resultx != undefined &&
  economicCode.value == resultx["eco"] &&
  nationalID.value == resultx["natcode"] &&
  brand.value == resultx["brand"] &&
  registrationNumber.value == resultx["regcode"] &&
  postalCode.value == resultx["zip"] &&
  address.value == resultx["address"] &&
  mobile.value == resultx['phone']
  ) return showAlert('err', 'شما تغییری اعمال نکردید');
  if( resultx != undefined &&
    !legalSwitch.checked &&
    mobile.value == resultx['phone']
    ) return showAlert('err', 'شما تغییری اعمال نکردید');
  mySWA(updateUser, 'اخطار','درصورت تغییر مشخصات کاربری باید دوباره وارد شوید.', );
}

async function updateUser(){

  // show loadings
  document.getElementById("editProfile").classList.add("position-relative");
  document.getElementById("profileLoader").classList.add("position-absolute");
  document.getElementById("profileLoader").classList.remove("d-none");
  document.getElementById("magicButton").setAttribute("disabled", "disabled");
  document.getElementById("magicButton").innerHTML =
  `
  <img class="pr-5" src="general/loading/tail-spin.svg">
  `;


  const individual = legalSwitch.checked ? "2" : "1";
  let fdata = new FormData();
  fdata.append("name", name.value);
  fdata.append("family", family.value);
  fdata.append("natID", natID.value);
  fdata.append("mobile", mobile.value);
  fdata.append("mail", mail.value);
  fdata.append("individual", individual);
  if (legalSwitch.checked) {
    fdata.append("brand", brand.value);
    fdata.append("economicCode", economicCode.value);
    fdata.append("nationalID", nationalID.value);
    fdata.append("registrationNumber", registrationNumber.value);
    fdata.append("postalCode", postalCode.value);
    fdata.append("address", address.value);
  }
  let result;


  await fetch("/profile/update", { method: "POST", body: fdata })
    .then((response) => response.json())
    .then((json) => (result = json)).catch(ex => window.location.reload());
    console.log('mamd', result);
  let asset;
  if (result.status == "success") {
    asset = "ico_check.svg";
    console.log(result);
    if (result.mobile == "true") {
      document.getElementById('changeMobile').click();
    } else {
    showAlert('success', 'تغییرات شما با موفقیت ثبت شد...');
    window.location.href = "/logout";
    }
  } else {
    asset = "ico_close.svg";
    showAlert('error', result.message);
  }


  //hide loader
  document.getElementById("editProfile").classList.remove("position-relative");
  document.getElementById("profileLoader").classList.remove("position-absolute");
  document.getElementById("profileLoader").classList.add("d-none");
  document.getElementById("magicButton").removeAttribute("disabled");
  document.getElementById("magicButton").innerHTML =
  `
  ذخیره
  `;

}

function validationRegister() {
  prevented = false;
  registerResetErrors();
  registerSuccessErrors();
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value))
    vNotifyr("ایمیل صحیح نیست", mail);

  if (name.value.length < 3) vNotifyr("فیلد نام اجباریست", name);

  if (family.value.length < 3) vNotifyr("فیلد نام خانوادگی اجباریست", family);

  if (mobile.value.length != 11) vNotifyr("شماره موبایل صحیح نمیباشد", mobile);

  if (checkid(natID.value)) vNotifyr("کد ملی وارد شده صحیح نیست", natID);

  if (legalSwitch.checked) {
    if (brand.value.length < 4) vNotifyr("نام تجاری کوتاه است", brand);

    if (economicCode.value.length < 4)
      vNotifyr("کد اقتصادی کوتاه تر از حد مجاز است", economicCode);

    if (nationalID.value.length < 4 || isNaN(nationalID.value))
      vNotifyr("شناسه ملی وارد شده صحیح نیست", nationalID);

    if (registrationNumber.value.length < 4 || isNaN(registrationNumber.value))
      vNotifyr("شماره ثبت وارد شده صحیح نیست", registrationNumber);

    if (postalCode.value.length != 10 || isNaN(postalCode.value))
      vNotifyr("کد پستی وارد شده اشتباه است", postalCode);

    if (address.value.length < 13)
      vNotifyr("لطفا آدرس خود را کامل وارد کنید", address);
  }
}

function registerResetErrors() {
  let inp = document.querySelectorAll("input");
  let taz = document.querySelectorAll("textarea");
  inp.forEach((inz) => {
    inz.classList.remove("border-is-invalid");
  });
  inp.forEach((inz) => {
    inz.classList.remove("border-is-valid");
  });
  taz.forEach((ta) => {
    ta.classList.remove("border-is-invalid");
  });
  taz.forEach((ta) => {
    ta.classList.remove("border-is-valid");
  });
  errors.forEach((err) => {
    document.getElementById(err).classList.add("d-none");
    document.getElementById(err).innerText = "";
  });
  if (!legalSwitch.checked) {
    brand.classList.remove("border-is-valid");
    brand.classList.remove("border-is-invalid");
    economicCode.classList.remove("border-is-valid");
    economicCode.classList.remove("border-is-invalid");
    nationalID.classList.remove("border-is-valid");
    nationalID.classList.remove("border-is-invalid");
    registrationNumber.classList.remove("border-is-valid");
    postalCode.classList.remove("border-is-valid");
    address.classList.remove("border-is-valid");
    registrationNumber.classList.remove("border-is-invalid");
    postalCode.classList.remove("border-is-invalid");
    address.classList.remove("border-is-invalid");
  }
}

function registerSuccessErrors() {
  let inp = document.querySelectorAll("#tabCard1 input");
  let taz = document.querySelectorAll("#tabCard1 textarea");
  inp.forEach((inz) => {
    inz.classList.remove("border-is-invalid");
  });
  inp.forEach((inz) => {
    inz.classList.add("border-is-valid");
  });
  taz.forEach((ta) => {
    ta.classList.remove("border-is-invalid");
  });
  taz.forEach((ta) => {
    ta.classList.add("border-is-valid");
  });
  legalSwitch.classList.remove("border-is-valid");
  legalSwitch.classList.remove("border-is-invalid");
  if (!legalSwitch.checked) {
    brand.classList.remove("border-is-valid");
    brand.classList.remove("border-is-invalid");
    economicCode.classList.remove("border-is-valid");
    economicCode.classList.remove("border-is-invalid");
    nationalID.classList.remove("border-is-valid");
    nationalID.classList.remove("border-is-invalid");
    registrationNumber.classList.remove("border-is-valid");
    postalCode.classList.remove("border-is-valid");
    address.classList.remove("border-is-valid");
    registrationNumber.classList.remove("border-is-invalid");
    postalCode.classList.remove("border-is-invalid");
    address.classList.remove("border-is-invalid");
  }
}

function vNotifyr(msg, zone) {
  prevented = true;
  zone.classList.add("border-is-invalid");
  zone.classList.remove("border-is-valid");

  document.getElementById(`${zone.id}Err`).innerText = msg;
  document.getElementById(`${zone.id}Err`).classList.remove("d-none");
}

function checkid(xv) {
  if (isNaN(xv)) {
    return true;
  } else if (xv == "") {
    return true;
  } else if (xv.length < 10) {
    return true;
  } else {
    let yy = 0;
    let yv = parseInt(xv);
    for (let i = 0; i < xv.length; i++) {
      yv = xv[i] * (xv.length - i);
      yy += yv;
    }
    let x = yy % 11;
    if (x === 0) {
      return false;
    } else {
      return true;
    }
  }
}
