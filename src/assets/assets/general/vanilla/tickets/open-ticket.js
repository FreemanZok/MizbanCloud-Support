// adds selected files to ui
const replyFilez = document.getElementById('replyFiles');
var finalRF = [];
replyFilez.onchange = () => {
  const selectedFiles2 = [...replyFilez.files];
  if ((finalRF.length + selectedFiles2.length) < 7) {
    selectedFiles2.forEach(filev => {
      if (filev.size < 4000000) {
        finalRF.push(filev);
      }else{
        mySWA(console.log('not more than 4'), 'اخطار','شما نمیتوانید فایل بیشتر از 4 مگابایت آپلود کنید');
      }
    });
  }else{
    mySWA(console.log('not more than 6'), 'اخطار','شما نمیتوانید بیشتر از 6 فایل اضافه کنید')
  }
  document.getElementById('replyFilezInner').innerHTML = '';
  finalRF.forEach(function (file, key) {
    const title = file.name;
    let name;
    if ((file.name).length > 10) {
      name = (file.name).substring(0,10) + "...";
    } else {
      name = file.name;
    }
      document.getElementById('replyFilezInner').innerHTML += `
        <span title="${title}" style="user-select: none;" class="d-flex w-max-c me-1 mt-1 align-items-center text-decoration-none text-gray-700 fs-12 border border-c-light-100 rounded-pill py-1 iranyekanEn fw-600 position-relative">
          <img class="img-attached" style="color: #3e3e3e" src=" /general/images/ico_attach.svg" width="12" height="12">
            <a target="_blank" style="text-decoration: none; color: #3e3e3e">
              ${name}
            </a>
          <img class="attachdelete position-absolute" id="${key}" onclick="removeFile(this)" style="right: 10px" title="حذف فایل" src="/general/images/root/ico_menu_close.svg">
        </span>`;
    }
  )
}

function removeFile(e) {
  finalRF.splice(e.id, 1);
  console.log(finalRF);
  document.getElementById('replyFilezInner').innerHTML = '';
  finalRF.forEach(function (file, key) {
    const title = file.name;
    let name;
    if ((file.name).length > 8) {
      name = (file.name).substring(0,8) + "...";
    } else {
      name = file.name;
    }
      document.getElementById('replyFilezInner').innerHTML += `
        <span title="${title}" style="user-select: none; padding-left: 4px" class="d-flex w-max-c me-1 mt-1 align-items-center text-decoration-none text-gray-700 fs-12 border border-c-light-100 rounded-pill py-1 iranyekanEn fw-600 position-relative">
          <img class="img-attached" style="color: #3e3e3e" src=" /general/images/ico_attach.svg" width="12" height="12">
            <a target="_blank" style="text-decoration: none; color: #3e3e3e">
              ${name}
            </a>
          <img class="attachdelete position-absolute" id="${key}" onclick="removeFile(this)" style="right: 10px" title="حذف فایل" src="/general/images/root/ico_menu_close.svg">
        </span>`;
    }
  )
}