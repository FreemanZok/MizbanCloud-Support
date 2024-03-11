let sid_of_edited_vol = 0;
let drive_of_edited_vol = '-';
let PRICE_OF_EACH_GIGABYTE_OF_STORAGE;
const space = document.getElementById("txtspace-volume");
const name = document.getElementById("txtname-volume");
function spaceKeyUpFunc() {
  PRICE_OF_EACH_GIGABYTE_OF_STORAGE = pricing[document.querySelector('#addVolumeCloud input[type=radio]:checked').value];
  document.querySelector(".volume-total").innerHTML = (
    space.value * PRICE_OF_EACH_GIGABYTE_OF_STORAGE
  )
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    + `<span class="mb-0 fs-16 fw-400 text-gray-700"> ریال </span>`
    + `<span class="mb-0 fs-13 fw-400 text-gray-700"> (روزانه) </span>`;
}
space.addEventListener("keyup", spaceKeyUpFunc);

function limitedNumberOnly(e) {
  var k = e.keyCode;
  if (k != 8 && k != 0 && (k < 48 || k > 57)) {
    space.classList.add("alert-danger-border");
    return false;
  }
  if (e.target.value.length > 4) {
    return false;
  }
  space.classList.remove("alert-danger-border");
}

function limitedStringOnly(e) {
  var k = e.target.value;

  if (
    e.key == "\\" ||
    e.key == "`" ||
    e.key == "^" ||
    !/^[A-z0-9 \-_\.]+$/.test(e.key)
  ) {
    document
      .getElementById("txtname-volume")
      .classList.add("alert-danger-border");
    return false;
  }
  document
    .getElementById("txtname-volume")
    .classList.remove("alert-danger-border");
  return true;
}

function addForm() {
  document.getElementById("txtname-volume").removeAttribute("disabled");
  document.getElementById("txtname-volume").value = "";
  document.getElementById("txtspace-volume").value = "";
  document
    .getElementById("sendvolume")
    .setAttribute("onclick", "newStorageBlock()");

  document.querySelector(`#addVolumeCloud input[value="ssd"]`).click();
  document.querySelectorAll('#addVolumeCloud input[type="radio"]').forEach(el => el.disabled = false);
  document.getElementById("sendvolume").innerHTML = "اضافه کردن";
}

async function newStorageBlock() {
  const title = document.getElementById("txtname-volume");
  const size = document.getElementById("txtspace-volume");
  const type = document.querySelector('#addVolumeCloud input[type=radio]:checked').value;
  let bye = false;
  if (!/^[0-9]+$/.test(size.value)) {
    size.classList.add("alert-danger-border");
    bye = true;
  }
  if (
    title.value.includes("\\") ||
    title.value.includes("`") ||
    title.value.includes("^") ||
    !/^[A-z0-9 \-_\.]+$/.test(title.value)
  ) {
    title.classList.add("alert-danger-border");
    bye = true;
  }
  if (bye) return;
  document.getElementById("sendvolume").setAttribute("disabled", "disabled");
  document.getElementById(
    "sendvolume"
  ).innerHTML = `<img src="/general/loading/tail-spin.svg" />`;
  let body = new FormData();
  body.append("name", title.value);
  body.append("size", size.value);
  body.append("st_type", type);
  const res = await fetch("/submit/cloud/volumes/add-volume", {
    method: "POST",
    body,
  })
    .then((r) => r.json())
    .then((j) => j)
    .catch((ex) => window.location.reload());
  showAlert(res.status, res.message);
  document.getElementById("sendvolume").removeAttribute("disabled");
  document.getElementById("sendvolume").innerHTML = `اضافه کردن`;
  if (res.status === "success") {
    renderStorageBlock(res.id, title.value, size.value);
    title.value = "";
    size.value = "";
    $("#addVolumeCloud").modal("hide");
  }
}

function renderStorageBlock(id, name, size, createDate = "لحظاتی پیش", serverName = '-') {
  document.getElementById(`theZone`).innerHTML =
    `
    <div class="accordion-item" id="acc${id}">
    <h2 class="accordion-header" id="flush-heading${id}">
        <div class="accordion-button w-100 collapsed acc-volumes-row">
            <div class="col-1 col-sm-2 position-relative volume-action-col">
                <ul class="d-flex justify-content-start align-items-center list-unstyled mb-0 fnlist">
                    <li class="remove-item" title="حذف" onclick="askRemove('${id}')">
                        <span>
                            <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="حذف" class="sublink" src="/general/images/new/ico_delete.svg" alt="">
                        </span>
                        <span class="fnlist-title">حذف</span>
                    </li>    
                    <li title="ویرایش" onclick="sid_of_edited_vol = ${sid_of_edited_vol};openExtendModal('${name}', '${size}', '${id}', '${document.querySelector(`#addVolumeCloud input:checked`).getAttribute('value')}')">
                        <span>
                            <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="ویرایش" class="sublink" src="/general/images/new/ico_manage.svg" alt="">
                        </span>
                        <span class="fnlist-title">ویرایش</span>
                    </li>    
                    <li>
                    ${sid_of_edited_vol != '0' ? `
                          <span id="attche-${id}"><img width="17px"  class="sublink" onclick="myDeleteSWA(() => cloud_deattach_volume('${id}', '${sid_of_edited_vol}'), 'اخطار', 'آیا از جداسازی این فضا از سرور ${serverName.trim()} اطمینان دارید؟' );" src="/general/images/ico_deattach.svg" alt=""></span>
                        `: `
                          <span id="attche-${id}" onclick="attach_volume_id = '${id}'; $('#attachList').modal('show');"><img data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="اتچ" class="sublink" src="/general/images/ico_attach.svg" alt=""></span>
                      `}
                    </li >            
                </ul >
            <span class="fnlist-options">
              <img src="/general/images/root/topMenu/ico_dotted_ico.svg">
            </span>
            </div >
            <div class="col-3 col-sm-2 col-md-2 text-center volume-status-col">
                <span  class=" border-0 fs-14 ls-02 volumes-status" id="server-name-${id}">
                  ${serverName}   
                </span>
            </div>
            <div class="col-4 col-sm-2 col-md-2 cloud-date-col text-center d-none d-sm-block">
                <p class="mb-0 fs-14 fw-400" id="creation-date-${id}">
                  ${createDate}  
                </p>
            </div>
            <div class="col-3 col-sm-1 col-md-2 cloud-space-col text-center">
                <p class="mb-0 fs-14 fw-400 iranyekanEn ltr">
                    ${size} GB
                </p>
            </div>
            <div class="col-4 col-sm-2 col-md-2 cloud-date-col text-center d-none d-sm-block">
                <p class="mb-0 fs-14 fw-400" id="mount-point-${id}">
                    ${drive_of_edited_vol}
                </p>
            </div>
            <div class="col-5 col-sm-3 col-md-2 volume-server-name">
                <p class="mb-0 fs-14 fw-400 tl px-2">
                    ${name}
                </p>
            </div>
        </div >
    </h2 >
</div >
` + document.getElementById(`theZone`).innerHTML;
  sid_of_edited_vol = 0;
}

function askRemove(id) {
  myDeleteSWA(() => removeBlock(id), "اخطار", "آیا از حذف این حافظه مطمئنید؟ ");
}

async function removeBlock(id) {
  let body = new FormData();
  body.append("vid", id);
  const res = await fetch("/submit/cloud/volumes/remove-volume", {
    method: "POST",
    body,
  })
    .then((r) => r.json())
    .then((j) => j)
    .catch((ex) => window.location.reload());

  showAlert(res.status, res.message);
  if (res.status === "success") {
    const acc = document.getElementById(`acc${id} `);
    $(`acc${id} `).slideUp(800, acc.remove());
  }
}

function openExtendModal(name, size, veid, sttype) {
  document
    .getElementById("txtname-volume")
    .setAttribute("disabled", "disabled");
  document.getElementById("txtname-volume").value = name;
  document.getElementById("txtspace-volume").value = size;
  document
    .getElementById("sendvolume")
    .setAttribute("onclick", `expandStorageBlock('${veid}')`);
  document.getElementById("sendvolume").innerHTML = "گسترش";

  document.querySelector(`#addVolumeCloud input[value = "${sttype}"]`).click();
  document.querySelectorAll('#addVolumeCloud input[type="radio"]').forEach(el => el.disabled = true);
  $("#addVolumeCloud").modal("show");
}

function closeExtendModal() {
  $("#addVolumeCloud").modal("hide");
  document.getElementById("txtname-volume").removeAttribute("disabled");
  document.getElementById("txtname-volume").value = "";
  document.getElementById("txtspace-volume").value = "";
}

async function expandStorageBlock(id) {
  const title = document.getElementById("txtname-volume");
  const size = document.getElementById("txtspace-volume");

  let bye = false;
  if (!/^[0-9]+$/.test(size.value)) {
    size.classList.add("alert-danger-border");
    bye = true;
  }
  if (
    title.value.includes("\\") ||
    title.value.includes("`") ||
    title.value.includes("^") ||
    !/^[A-z0-9 \-_\.]+$/.test(title.value)
  ) {
    title.classList.add("alert-danger-border");
    bye = true;
  }
  if (bye) return;
  document.getElementById("sendvolume").setAttribute("disabled", "disabled");
  document.getElementById(
    "sendvolume"
  ).innerHTML = `<img src="/general/loading/tail-spin.svg" />`;
  let body = new FormData();
  body.append("vid", id);
  body.append("size", size.value);
  const res = await fetch("/submit/cloud/volumes/expand-volume", {
    method: "POST",
    body,
  })
    .then((r) => r.json())
    .then((j) => j)
    .catch((ex) => window.location.reload());
  showAlert(res.status, res.message);
  document.getElementById("sendvolume").removeAttribute("disabled");
  document.getElementById("sendvolume").innerHTML = `گسترش`;
  if (res.status === "success") {
    const createDate = document.getElementById(`creation-date-${id}`).innerHTML;
    const serverName = document.getElementById(`server-name-${id}`) ? document.getElementById(`server-name-${id}`).innerHTML : '-';
    document.getElementById(`acc${id}`).remove();
    renderStorageBlock(id, title.value, size.value, createDate, serverName);
    title.value = "";
    size.value = "";
    closeExtendModal();
  }
}






async function attachVolume(id) {
  let body = new FormData();
  body.append('sid', $serverID);
  body.append('vid', id);
  let attach_icon = self.src;
  self.src = '/general/loading/k-spin.svg';
  const result = await fetch('/submit/cloud/volumes/attach-to-server', { method: 'POST', body })
    .then(response => response.json())
    .then(j => j).catch(ex => window.location.reload());
  self.src = attach_icon;
  showAlert(result.status, result.message);
  if (result.status === 'success') {
    loadVolumesToModal(true);
    $('#addVolumeAttach').modal('hide');
    serverHistoryUpdate();
  }
}

async function cloud_deattach_volume(id, serverID, drive) {
  drive_of_edited_vol = drive;
  let body = new FormData();
  body.append('sid', serverID);
  body.append('vid', id);
  const original_onclick = document.getElementById(`attche-${id}`).getAttribute('onclick');
  const original_markups = document.getElementById(`attche-${id}`).innerHTML;
  document.getElementById(`attche-${id}`).innerHTML = `<img width="18" src="/general/loading/tail-spin.svg" />`;
  document.getElementById(`attche-${id}`).removeAttribute('onclick');
  const result = await fetch('/submit/cloud/servers/deattach-volume', { method: 'POST', body })
    .then(response => response.json())
    .then(j => j).catch(ex => window.location.reload());
  showAlert(result.status, result.message);
  if (result.status !== "success") {
    document.getElementById(`attche-${id}`).innerHTML = original_markups;
    document.getElementById(`attche-${id}`).setAttribute('onclick', original_onclick);
    return;
  }
  document.getElementById(`mount-point-${id}`).innerHTML = '-'
  document.querySelector(`#server-name-${id}`).innerHTML = '-';
  document.getElementById(`attche-${id}`).innerHTML = `
  <img data-bs-toggle="tooltip" 
  data-bs-placement="top" 
  data-bs-original-title="اتچ" 
  class="sublink" 
  src="/general/images/ico_attach.svg">`;
  document.getElementById(`attche-${id}`).setAttribute('onclick', `attach_volume_id = '${id}'; $('#attachList').modal('show');`);
}

let attach_volume_id = 0;
async function attachVolumeToServer(Server, Sid) {
  let body = new FormData();
  const vid = attach_volume_id;
  body.append('sid', Sid);
  body.append('vid', vid);
  const original_onclick = document.getElementById(`attche-${vid}`).getAttribute('onclick');
  document.getElementById(`attche-${vid}`).innerHTML = `<img width="18" src="/general/loading/tail-spin.svg" />`;
  document.getElementById(`attche-${vid}`).removeAttribute('onclick');
  $('#attachList').modal('hide');
  const result = await fetch('/submit/cloud/servers/attach-volume', { method: 'POST', body })
    .then(response => response.json())
    .then(j => j).catch(ex => window.location.reload());
  showAlert(result.status, result.message);
  if (result.status !== 'success') {
    document.getElementById(`attche-${vid}`).setAttribute('onclick', original_onclick);
    document.getElementById(`attche-${vid}`).innerHTML = `
      <img data-bs-toggle="tooltip" 
      data-bs-placement="top" 
      data-bs-original-title="اتچ" 
      class="sublink" 
      src="/general/images/ico_attach.svg">`;
  } else {
    document.querySelector(`#server-name-${vid}`).innerHTML = Server;
    document.getElementById(`attche-${vid}`).innerHTML = `
    <img width="17px" 
    onclick="myDeleteSWA(() => cloud_deattach_volume('${vid}', '${Sid}', '-'), 'اخطار', 'آیا از جداسازی این فضا از سرور ${Server} اطمینان دارید؟' );" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="دی اتچ" class="sublink" src="/general/images/ico_deattach.svg" alt="">`;
  }
}