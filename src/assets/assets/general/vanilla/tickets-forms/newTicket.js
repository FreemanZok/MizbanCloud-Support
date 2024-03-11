let form = document.getElementById('myForm');
let title = document.getElementById('title');
let department = document.getElementById('dp');
let description = document.getElementById('des');
let files = document.getElementById('file-input');
form.addEventListener("submit", function (j) {
  j.preventDefault();

  let data = new FormData();
  data.append('title', title.value);
  data.append('department', department.value);
  data.append('description', description.value);
  data.append('file1', files.files[0]);
  data.append('file2', files.files[1]);
  data.append('file3', files.files[2]);
  data.append('file4', files.files[3]);
  data.append('file5', files.files[4]);
  data.append('file6', files.files[5]);
  fetch('/submit/support/new-ticket', {
    method: 'POST',
    body: data
  }).then((r) => {
    if (r.status == 200) {
      document.getElementById('close').click();
      document.getElementById('ticketPor').classList.remove('d-none');
      document.getElementById('ticketKhali').classList.add('d-none');
      getTableData();
    } else {
        document.getElementById('submit').removeAttribute("disabled");
      if (department.value == undefined || department.value == '+0')
        document.getElementById('err-dp').innerHTML = `
                   <span class=" fs-12 fw-400 ws-15 ls-02 text-red-400 mt-4 user-select-none">
                       دپارتمان مربوطه را مشخص کنید
                   </span>
                  `;
      else
        document.getElementById('err-dp').innerHTML = '';

      if (title.value == undefined || title.value == '')
        document.getElementById('err-title').innerHTML = `
                   <span class=" fs-12 fw-400 ws-15 ls-02 text-red-400 mt-4 user-select-none">
                       عنوان سوال خود را مشخص کنید
                   </span>
                  `;
      else
        document.getElementById('err-title').innerHTML = '';

      if (description.value == undefined || description.value == '')
        document.getElementById('err-des').innerHTML = `
                   <span class=" fs-12 fw-400 ws-15 ls-02 text-red-400 mt-4 user-select-none">
                       توضیحاتی از مشکل خود ارائه نمایید
                   </span>
                  `;
      else
        document.getElementById('err-des').innerHTML = '';


    }
  });
})

const fileInput = document.getElementById('file-input');
fileInput.onchange = () => {
  const selectedFiles = [...fileInput.files];
  console.log(selectedFiles);
  selectedFiles.forEach(function (file) {
      document.getElementById('selectedFilesList').innerHTML +=
        `
                    <a style="user-select: none"
                       class="d-flex w-max-c ms-1 mt-1 align-items-center text-decoration-none text-gray-700 fs-12 border border-c-light-100 rounded-pill py-1 px-2-5 iranyekanEn fw-500">
                      ${file.name}
                      <img class="me-1" src="/general/images/ico_attach.svg" width="12" height="12">
                    </a>
`
      ;
    }
  )
}

// nullish

document.getElementById('close').addEventListener("click", freshForm);


function freshForm() {
  title.value = null;
  department.value = "+0";
  document.getElementById('dp').innerText = `انتخاب دپارتمان پشتیبانی`;
  description.value = null;
  files.value = null;
  document.getElementById('selectedFilesList').innerHTML = null;
    document.getElementById('submit').removeAttribute("disabled");
}
