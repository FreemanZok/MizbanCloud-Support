"use strict";


// VISUALS
const c1switch = document.getElementById("c1switch");
const c2switch = document.getElementById("c2switch");
const c3switch = document.getElementById("c3switch");
const c4switch = document.getElementById("c4switch");
const c1labels = document.querySelectorAll("#c1t3 label");
const c2labels = document.querySelectorAll("#c2t3 label");
const c3labels = document.querySelectorAll("#c3t3 label");
const c4labels = document.querySelectorAll("#c4t3 label");
const c1boxes = document.querySelectorAll("#c1t3 input");
const c2boxes = document.querySelectorAll("#c2t3 input");
const c3boxes = document.querySelectorAll("#c3t3 input");
const c4boxes = document.querySelectorAll("#c4t3 input");
c1switch.addEventListener("change", c1check);
c2switch.addEventListener("change", c2check);
c3switch.addEventListener("change", c3check);
c4switch.addEventListener("change", c4check);
function c1check() {
  if (c1switch.checked) {
    c1labels.forEach((label) => {
      label.classList.remove("bg-grd-gray-350-to-gray-180-45");
      label.classList.add("bg-grd-blue-230-to-blue-260-45");

      c1boxes.forEach((box) => {
        box.removeAttribute("disabled");
        box.classList.remove("noCursor");
      });
      document
        .querySelectorAll("#c1t3 p")
        .forEach((p) => p.classList.remove("noCursor"));
    });
  } else {
    c1labels.forEach((label) => {
      label.classList.add("bg-grd-gray-350-to-gray-180-45");
      label.classList.remove("bg-grd-blue-230-to-blue-260-45");
    });
    c1boxes.forEach((box) => {
      box.setAttribute("disabled", "disabled");
    });
    c1switch.removeAttribute("disabled");
    document
      .querySelectorAll("#c1t3 p")
      .forEach((p) => p.classList.add("noCursor"));
  }
}
function c2check() {
  if (c2switch.checked) {
    c2labels.forEach((label) => {
      label.classList.remove("bg-grd-gray-350-to-gray-180-45");
      label.classList.add("bg-grd-blue-230-to-blue-260-45");

      c2boxes.forEach((box) => {
        box.removeAttribute("disabled");
        box.classList.remove("noCursor");
      });
      document
        .querySelectorAll("#c2t3 p")
        .forEach((p) => p.classList.remove("noCursor"));
    });
  } else {
    c2labels.forEach((label) => {
      label.classList.add("bg-grd-gray-350-to-gray-180-45");
      label.classList.remove("bg-grd-blue-230-to-blue-260-45");
    });
    c2boxes.forEach((box) => {
      box.setAttribute("disabled", "disabled");
    });
    c2switch.removeAttribute("disabled");
    document
      .querySelectorAll("#c2t3 p")
      .forEach((p) => p.classList.add("noCursor"));
  }
}
function c3check() {
  if (c3switch.checked) {
    c3labels.forEach((label) => {
      label.classList.remove("bg-grd-gray-350-to-gray-180-45");
      label.classList.add("bg-grd-blue-230-to-blue-260-45");

      c3boxes.forEach((box) => {
        box.removeAttribute("disabled");
        box.classList.remove("noCursor");
      });
      document
        .querySelectorAll("#c3t3 p")
        .forEach((p) => p.classList.remove("noCursor"));
    });
  } else {
    c3labels.forEach((label) => {
      label.classList.add("bg-grd-gray-350-to-gray-180-45");
      label.classList.remove("bg-grd-blue-230-to-blue-260-45");
    });
    c3boxes.forEach((box) => {
      box.setAttribute("disabled", "disabled");
    });
    c3switch.removeAttribute("disabled");
    document
      .querySelectorAll("#c3t3 p")
      .forEach((p) => p.classList.add("noCursor"));
  }
  4;
}
function c4check() {
  if (c4switch.checked) {
    c4labels.forEach((label) => {
      label.classList.remove("bg-grd-gray-350-to-gray-180-45");
      label.classList.add("bg-grd-blue-230-to-blue-260-45");

      c4boxes.forEach((box) => {
        box.removeAttribute("disabled");
        box.classList.remove("noCursor");
      });
      document
        .querySelectorAll("#c4t3 p")
        .forEach((p) => p.classList.remove("noCursor"));
    });
  } else {
    c4labels.forEach((label) => {
      label.classList.add("bg-grd-gray-350-to-gray-180-45");
      label.classList.remove("bg-grd-blue-230-to-blue-260-45");
    });
    c4boxes.forEach((box) => {
      box.setAttribute("disabled", "disabled");
    });
    c4switch.removeAttribute("disabled");
    document
      .querySelectorAll("#c4t3 p")
      .forEach((p) => p.classList.add("noCursor"));
  }
}
function checkAll() {
  c1check();
  c2check();
  c3check();
  c4check();
}

getPreferences();
// FUNCTIONALITY
async function getPreferences() {
  let result;
  await fetch("/profile/preference-data", { method: "POST" })
    .then((r) => r.json())
    .then((j) => (result = j))
    .catch(ex => window.location.reload());
  if (result.status != "success") return;

  let res = result.data;
  document.getElementById("sms2step").checked = res["2fadetails"]["2fa_annouce"].includes("sms");
  document.getElementById("smsCash").checked = res.financialDetails.endofcredit.includes("sms");
  document.getElementById("smsCloud").checked = res.serversDetails.create_server.includes("sms");
  document.getElementById("smsDelCloud").checked = res.serversDetails.delete_server.includes("sms");
  document.getElementById("smsDisCloud").checked = res.serversDetails.deactive_server.includes("sms");
  document.getElementById("1fac").checked = res.financialDetails.invoice.includes("sms");
  document.getElementById("failedLogin").checked = res.onenterDetails.on_failed_login.includes("sms");
  document.getElementById("successLogin").checked = res.onenterDetails.on_success_login.includes("sms");
  c1switch.checked = res["2fa"] == "true";
  c2switch.checked = res["financial"] == "true";
  c3switch.checked = res["servers"] == "true";
  c4switch.checked = res["onenter"] == "true";
  document.getElementById("email2step").checked = res["2fadetails"]["2fa_annouce"].includes("email");
  document.getElementById("emailCloud").checked = res.serversDetails.create_server.includes("email");
  document.getElementById("emailCash").checked = res.financialDetails.endofcredit.includes("email");
  document.getElementById("emailDelCloud").checked = res.serversDetails.delete_server.includes("email");
  document.getElementById("emailDisCloud").checked = res.serversDetails.deactive_server.includes("email");
  document.getElementById("failedLogin2").checked = res.onenterDetails.on_failed_login.includes("email");
  document.getElementById("successLogin2").checked = res.onenterDetails.on_success_login.includes("email");
  document.getElementById("2fac").checked = res.financialDetails.invoice.includes("email");
  checkAll();
}

function checkChanged() {

}


function submit3() {
  mySWA(fireSubmitButton, 'اخطار','آیا از تغییر مشخصات کاربری خود اطمینان دارید؟' );
}

async function fireSubmitButton() {

  // show loadings
  document.getElementById("prefLoader").classList.add("position-absolute");
  document.getElementById("prefLoader").classList.remove("d-none");
  document.getElementById("magicButton").setAttribute("disabled", "disabled");
  document.getElementById("magicButton").innerHTML =
  `
  <img class="pr-5" src="/general/loading/tail-spin.svg">
  `;


  let active = "sms,";
  let active2 = "email";
  let deactive = "";
  let s1 = document.getElementById("sms2step").checked ? active : deactive;
  let s2 = document.getElementById("smsCash").checked ? active : deactive;
  let s3 = document.getElementById("smsCloud").checked ? active : deactive;
  let s4 = document.getElementById("smsDelCloud").checked ? active : deactive;
  let s5 = document.getElementById("smsDisCloud").checked ? active : deactive;
  let s6 = document.getElementById("smsLinkCloud").checked ? active : deactive;
  let s7 = document.getElementById("1fac").checked ? active : deactive;
  let s8 = document.getElementById("failedLogin").checked ? active : deactive;
  let s9 = document.getElementById("successLogin").checked ? active : deactive;
  let s10 = c1switch.checked ? "1" : "0";
  let s11 = c2switch.checked ? "1" : "0";
  let s12 = c3switch.checked ? "1" : "0";
  let s13 = c4switch.checked ? "1" : "0";

  s1 += document.getElementById("email2step").checked ? active2 : deactive;
  s2 += document.getElementById("emailCash").checked ? active2 : deactive;
  s3 += document.getElementById("emailCloud").checked ? active2 : deactive;
  s4 += document.getElementById("emailDelCloud").checked ? active2 : deactive;
  s5 += document.getElementById("emailDisCloud").checked ? active2 : deactive;
  s6 += document.getElementById("emailLinkCloud").checked ? active2 : deactive;
  s8 += document.getElementById("failedLogin2").checked ? active2 : deactive;
  s9 += document.getElementById("successLogin2").checked ? active2 : deactive;
  s7 += document.getElementById("2fac").checked ? active2 : deactive;

  let mData = new FormData();
  mData.append("twofavalue", s1);
  mData.append("financial_endofcredit", s2);
  mData.append("servercreate", s3);
  mData.append("serverdelete", s4);
  mData.append("serverdeactive", s5);
  mData.append("financial_invoice", s7);
  mData.append("unsuccesslogin", s8);
  mData.append("slogin", s9);
  mData.append("twofa", s10);
  mData.append("financial", s11);
  mData.append("serverz", s12);
  mData.append("onenter", s13);

  let result;
  await fetch("/profile/preference", { method: "POST", body: mData })
    .then((response) => response.json())
    .then((json) => (result = json)).catch(ex => window.location.reload());
  let asset;


  if (result.status == "success") {
    showAlert('success', 'تنظیمات اعمال گردید');
  } else {
    showAlert('error', result.message);
  }

  notification(result.message, asset);


  //hide loadings
  document.getElementById("changePassword").classList.remove("position-relative");
  document.getElementById("prefLoader").classList.remove("position-absolute");
  document.getElementById("prefLoader").classList.add("d-none");
  document.getElementById("magicButton").removeAttribute("disabled");
  document.getElementById("magicButton").innerHTML =
  `
  ذخیره
  `;
}



function updatePreference() {

}
