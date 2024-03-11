"use strict";
let form = document.getElementById('myForm');
let title = document.getElementById('title');
let description = document.getElementById('des');
let files = document.getElementById('file-input');
let selectedFiles = [];
let filesArray;
let red;
let supportValue;
let supportItem;
let className;
let requireService = false;
form.addEventListener("submit", function (j) {
  j.preventDefault();
  supportValue = document.querySelector('#showSupport .current-item').getAttribute('data-value');
  supportItem = document.querySelector('#showSupport .current-item').innerHTML;
  console.log(supportItem, supportValue);
  let flag = false;
  if (title.value.length < 1) {
    document.getElementById('err-title').innerHTML = `
                   <span class=" fs-12 fw-400 ws-15 ls-02 text-red-400 mt-4 user-select-none">
                       عنوان سوال خود را مشخص کنید
                   </span>
                  `;
    flag = true;
  } else {document.getElementById('err-title').innerHTML = ''}

  if (supportValue == "+0" || supportValue == undefined ) {
    // document.getElementById("des").classList.add("mt-5");
    document.getElementById('err-dp').innerHTML =
      `
                   <span class=" fs-12 fw-400 ws-15 ls-02 text-red-400 mt-4 user-select-none">
                       دپارتمان مربوطه را مشخص کنید
                   </span>
                  `;
    flag = true;
  } else { 
    // document.getElementById("des").classList.remove("mt-5");
    document.getElementById('err-dp').innerHTML =''; 
  }

  if (description.value.length < 5) {
    document.getElementById('err-des').innerHTML = `
                   <span class=" fs-12 fw-400 ws-15 ls-02 text-red-400 mt-4 user-select-none">
                       توضیحاتی از مشکل خود ارائه نمایید
                   </span>
                  `;
    flag = true;
  }else{
    document.getElementById('err-des').innerHTML = ``;
  }
  if(requireService) {
    if (
      typeof !document.querySelector('#showService .current-item').getAttribute('data-value') === 'undefined' ||
      !document.querySelector('#showService .current-item').getAttribute('data-value')) {
        
          // document.getElementById("des").classList.add("mt-5");
          document.getElementById('err-srvc').innerHTML = `
                        <span class=" fs-12 fw-400 ws-15 ls-02 text-red-400 mt-4 user-select-none">
                            سرویس مورد نظر را انتخاب کنید
                        </span>
                        `;
          flag = true;
      }
  }else{
    // document.getElementById("des").classList.remove("mt-5");
    document.getElementById('err-srvc').innerHTML = ``;
  }

  if (flag) return document.getElementById('submit').removeAttribute("disabled");
  
  document.getElementById("submit").setAttribute("disabled", "disabled");
  document.getElementById("submit").innerHTML = `<img src="/general/loading/tail-spin.svg" />`;
  let data = new FormData();
  data.append('title', title.value);
  data.append('department', supportValue);
  data.append('description', description.value);
  data.append('srvc', document.querySelector('#showService .current-item').getAttribute('data-value'));
  data.append('file1', selectedFiles[0]);
  data.append('file2', selectedFiles[1]);
  data.append('file3', selectedFiles[2]);
  data.append('file4', selectedFiles[3]);
  data.append('file5', selectedFiles[4]);
  data.append('file6', selectedFiles[5]);
  fetch('/submit/support/new-ticket', {
    method: 'POST',
    body: data
  }).then((r) => {
    if (r.status == 200) {
      document.getElementById('close').click();
      (r.json().then(rj => {
        if (typeof rj.data.ticketid != undefined){
          if (false && document.querySelector("#TicketTable > tbody")) {
          const charkhak = title.value.length > 60 ? "activelineTickt" : "";
            document.querySelector("#TicketTable > tbody").innerHTML = `
              <tr onclick="window.location.href='/support/tickets/${rj.data.ticketid}'">
                <td class="text-nowrap text-navy-blue-600 tdstyle iranyekanFa">#${rj.data.ticketid}</td>
                <td class="scroll text-nowrap text-navy-blue-600 tdstyle iranyekanFa titleBar">
                  <span class="text-navy-blue-600 text-nowrap fs-13 ls-03 w-100 d-flex align-items-center iranyekanFa deactivelineTickt ${charkhak}">
                    <img class="imgactive-rtl" src="/general/images/root/table/open.svg">
                    ${title.value}
                  </td>
                <td class="text-nowrap text-navy-blue-600 tdstyle iranyekanFa ">لحظاتی پیش</td>
                <td class="text-nowrap text-navy-blue-600 tdstyle iranyekanFa  ">${supportItem}</td>
              </tr>
            ` + document.querySelector("#TicketTable > tbody").innerHTML;
          } else {
            document.location.replace(`/support/tickets/${rj.data.ticketid}`);
          }
          freshForm();
        }
      }))//.catch(ex => window.location.reload());
      document.getElementById("submit").removeAttribute("disabled");
      document.getElementById("submit").innerHTML = `ثبت تیکت`;
      freshForm();
    } else {
      document.getElementById("submit").removeAttribute("disabled");
      document.getElementById("submit").innerHTML = `ثبت تیکت`;
      (r.json().then(rj => console.log(rj)));
      freshForm();
    }
  });
});


const fileInput = document.getElementById('file-input');
// fileInput.onchange = () => {
//   let fifi = [...fileInput.files];
//     fifi.forEach((file) => {
//     filesArray.push(file);
//   });
//   document.getElementById('selectedFilesList').innerHTML ='';
//   filesArray.forEach(file => {
//     if (file.size > 4086000){
//       fileInput.value = null;
//       document.getElementById('selectedFilesList').innerHTML = "<div class='fs-12 text-red-400' style='margin: auto;'>" +
//         "حجم فایل های ارسالی نباید بیشتر از 4 مگابایت باشد"
//         +"</div>"
//       ;
//     }
//   });
//   if (filesArray.length > 6) {
//     document.getElementById('selectedFilesList').innerHTML = "<div class='fs-12 text-red-400' style='margin: auto;'>" +
//       "حداکثر فایل های قابل ارسال 6 فایل است"
//       +"</div>"
//     ;
//     return fileInput.value = null;
//   }
//
//   filesArray.forEach(function (file) {
//       document.getElementById('selectedFilesList').innerHTML +=
//         `
//         <a style="user-select: none" class="d-flex w-max-c ms-1 mt-1 align-items-center text-decoration-none text-gray-700 fs-12 border border-c-light-100 rounded-pill py-1 px-2-5 iranyekanEn fw-500">
//           ${file.name}
//           <img class="me-1" src="/general/images/ico_attach.svg" width="12" height="12">
//         </a>`
//       ;
//     }
//   )
// }

fileInput.onchange = () => {
  selectedFiles.push(...fileInput.files);
  document.getElementById('selectedFilesList').innerHTML = '';
  selectedFiles.forEach(function (file,key) {
      const title = file.name;
      let name;
      if ((file.name).length > 8) {
        name = (file.name).substring(0,8) + "...";
      } else {
        name = file.name;
      }
      document.getElementById('selectedFilesList').innerHTML +=
        `
        <span title="${title}" style="user-select: none; padding-left: 4px" class="d-flex w-max-c me-1 mt-1 align-items-center text-decoration-none text-gray-700 fs-12 border border-c-light-100 rounded-pill py-1 iranyekanEn fw-600 position-relative">
        <img class="img-attached" style="color: #3e3e3e;" src=" /general/images/ico_attach.svg" width="12" height="12">
          <a target="_blank" style="text-decoration: none; color: #3e3e3e; margin-right: 20px">
            ${name}
          </a>
        <img class="attachdelete position-absolute" id="${key}" onclick="removeAttach(this)" style="right: 10px" title="حذف فایل" src="/general/images/root/ico_menu_close.svg">
      </span>`
      ;
    }
  )
}

document.getElementById('close').addEventListener("click", freshForm);
document.querySelector('#newTicket').addEventListener("hidden.bs.modal", freshForm);


async function freshForm() {
  await new Promise(resolve => setTimeout(resolve, 700));
  title.value = null;
  supportValue = "+0";
  supportItem = "انتخاب دپارتمان پشتیبانی"
  description.value = null;
  files.value = null;
  selectedFiles = [];
  document.getElementById('selectedFilesList').innerHTML = null;
  document.getElementById('submit').removeAttribute("disabled");
  document.getElementById('err-title').innerHTML = '';
  document.getElementById('err-dp').innerHTML = '';
  document.getElementById('err-des').innerHTML = '';
  document.getElementById('err-srvc').innerHTML = '';
  document.getElementById("des").classList.remove("mt-5");
  // $('.' + className + ' .current-item').text("انتخاب دپارتمان پشتیبانی");
  $('#showSupport .current-item').text("انتخاب دپارتمان پشتیبانی");
  $('#showService .current-item').text("سرویس مورد نظر را انتخاب نمایید");
}

function buttonVisuals(state){
  if (state == "enable") {
    document.getElementById("submit").removeAttribute("disabled");
    document.getElementById("submit").innerHTML = `ثبت تیکت`;
  }else{
    document.getElementById("submit").setAttribute("disabled", "disabled");
    document.getElementById("submit").innerHTML = `<img src="/general/loading/tail-spin.svg" />`;
  }
}




    function customSelect(_className, _dropdownClass) {
      $("." + _className).siblings().fadeToggle(500);
      $('.' + _className).click(function () {
          if ($("." + _className + " .imgexp").hasClass("img-collapse")) {
              $("." + _className + " .imgexp").removeClass("img-collapse");
              $("." + _className + " .imgexp").addClass("img-collapsed");
          } else {
              $("." + _className + " .imgexp").addClass("img-collapse");
              $("." + _className + " .imgexp").removeClass("img-collapsed");
          }
      });
  }

  function customDropdown1(_className, _dropdownClass, _value, _index) {
      className = _className;
      $("." + _dropdownClass + "li").removeClass("SelectedItem");
      $(this).addClass('SelectedItem');
      supportValue = _index;
      supportItem = _value;
      console.log(_className);
      $('.' + _className + ' .current-item').text(supportItem);
      $('.' + _className + ' .current-item').attr('data-value', supportValue);
      $("." + _className).trigger("click");
  }



  function removeAttach(e) {
    selectedFiles.splice(e.id, 1);
    document.getElementById('selectedFilesList').innerHTML = '';
    selectedFiles.forEach(function (file,key) {
      document.getElementById('selectedFilesList').innerHTML +=
        `
        <span title="${file.name}" style="user-select: none;" class="d-flex w-max-c me-1 mt-1 align-items-center text-decoration-none text-gray-700 fs-12 border border-c-light-100 rounded-pill py-1 iranyekanEn fw-600 position-relative">
        <img class="img-attached" style="color: #3e3e3e" src=" /general/images/ico_attach.svg" width="12" height="12">
          <a target="_blank" style="text-decoration: none; color: #3e3e3e">
            ${file.name}
          </a>
        <img class="attachdelete position-absolute" id="${key}" onclick="removeAttach(this)" style="right: 10px" title="حذف فایل" src="/general/images/root/ico_menu_close.svg">
      </span>`
      ;
    }
  )
  console.log(selectedFiles);
  }










  function renderRelatedServices(department) {
      const dpList = [
        /*0*/null,
        /*1*/ 'domain', 
        /*2*/'vod', 
        /*3*/'server', 
        /*4*/'live'
      ];
      document.querySelector('#showService .current-item').innerHTML = 'سرویس مورد نظر را انتخاب نمایید';
      document.querySelector('#showService .current-item').removeAttribute('data-value');
      document.querySelectorAll('#serviceList li').forEach(el => el.classList.add('d-none'));
      document.querySelectorAll(`#serviceList li[service-category="${dpList[department]}"]`).forEach(el => el.classList.remove('d-none'));
      requireService = document.querySelectorAll(`#serviceList li[service-category="${dpList[department]}"]`).length > 0 ? true : false;
  }