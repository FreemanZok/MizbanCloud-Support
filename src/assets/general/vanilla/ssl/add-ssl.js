var exp = '';
var issuer = '';
var key = '';
var doomains = '';
async function addSslSubmit() {
   const title = document.getElementById('ctr-title');
   const crt = document.getElementById('crt');
   const keys = document.getElementById('private-key');
   const cab = document.getElementById('crt-auth');
   if (title.value.length < 5) return showAlert("error", "عنوان وارد شده باید بیشتر از 5 کارکتر باشد")
   let rBody = new FormData();
   rBody.append("title", title.value);
   rBody.append("crt", crt.value);
   rBody.append("prv", keys.value);
   rBody.append("domain", $domain);
   rBody.append("did", $did);
   rBody.append("authBoundle", cab.value);
   document.querySelectorAll('#close').forEach(cl => cl.click());

   const result = await fetch("/submit/cdn/ssl/add-ssl", {method: "POST", body: rBody})
                  .then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());

   showAlert(result.status, result.message);
   if (result.status !== "success") return;
   let whatever = 
   `
   <div class="accordion-item" id="${result.id}">
   <h2 class="accordion-header" id="flush-heading${result.id}">
      <button class="accordion-button w-100 collapsed" type="button" 
      sdata-bs-toggle="collapse" sdata-bs-target="#active-flush-collapse${result.id}" 
      saria-expanded="false" saria-controls="active-flush-collapse${result.id}">
            <div class="col-2 col-md-2 col-lg-3 rtl px-5 position-relative ssl-action-col" style="float: left">
               <ul class="d-flex align-items-center list-unstyled mb-0 fnlist">
                  <li>
                     <a class="remove-item" onclick="deleteSSL('${result.id}');">
                        <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="حذف" src="/general/images/new/ico_delete.svg" class="sublink">
                        <span class="fnlist-title">حذف</span>
                     </a>
                  </li>
                  <li>
                     <a onclick="ShowSslForm(\`${title.value}\`, \`${crt.value}\`, \`${keys.value}\`, \`${cab.value}\`, true)">
                        <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="مشاهده" src="/general/images/new/ico_manage.svg" class="sublink">
                        <span class="fnlist-title">مشاهده</span>
                     </a>
                  </li>
               </ul>
               <a class="fnlist-options">
                  <img src="/general/images/root/topMenu/ico_dotted_ico.svg">
               </a>
            </div>
            <div class="col-3 col-sm-2 col-md-2 col-lg-2 d-none d-sm-block">
               <p class="mb-0 fs-14 fw-400 text-center  text-green-600">ACTIVE</p>    
            </div>
            <div class="col-12 col-sm-2 col-md-2 col-lg-2 sslDateCol">
               <p class="mb-0 fs-14 fw-400 text-center dir_ltr">
                  ${exp}
               </p>
            </div>
            <div class="col-12 col-sm-3 col-md-3 col-lg-2 sslDomainCol">
               <p class="mb-0 fs-14 fw-400 text-center">
                  ${$domain}
               </p>
            </div>
            <div class="col-10 col-sm-3 col-md-3 col-lg-3 sslNameCol">
               <p class="fs-14 fw-400 mb-0 ws-05 tl ltr px-5 ssl-name-col">
                  ${title.value}
               </p>
            </div>
      </button>
   </h2>
</div>
   `
   ;
   document.getElementById('httpslist').innerHTML += `
   <li onclick="( function(){
   selectSsl('${result.id}',document.querySelector('#showhttps .current-item').getAttribute('data-value'));
   customDropdown('showhttps' , 'tlslist','${title.value}','${result.id}');
   $('.cdn-full-content').removeClass('show_tab');
   $('#cdn-tab3-content').addClass('show_tab');
   })()
   "class="support-item fs-13 mb-1 py-1 px-3 rounded-pill" data-value="${title.value}">
       <span>
       ${title.value}
       </span>
   </li>
   `;

   // document.getElementById('sslList').innerHTML = whatever + document.getElementById('sslList').innerHTML;
   $("#sslList").prepend(whatever);
   document.getElementById('shownull').classList.add('d-none');
   title.value = '';
   crt.value = '';
   keys.value = '';
   cab.value = '';

}

async function dataValidateCrt() {
   const crt = document.getElementById('crt').value;
   let rBody = new FormData();
   rBody.append("crt", crt);
   const result = await fetch("/submit/cdn/ssl/check-crt", {method: "POST", body: rBody})
                  .then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
                  console.log(result);
   if(result) {
      exp = (new Date(result.validTo_time_t * 1000)).toLocaleDateString();
      issuer = `${result.issuer.O} ${result.issuer.C} ${result.issuer.CN}`;
      key = result.signatureTypeSN;
      doomains = result.subject.CN;
      document.getElementById('crtErr').classList.add("d-none");
      document.getElementById('und').innerHTML = `
      <p class="mb-0 fs-13 fw-400">Domains: ${doomains}</p>
      <p class="mb-0 fs-13 fw-400">Issuer:	${issuer}</p>
      <p class="mb-0 fs-13 fw-400">Key:	${key}</p>
      <p class="mb-0 fs-13 fw-400">Expiration:	${exp}</p>  
      `;
   } else {
      document.getElementById('und').innerHTML = ``;
      document.getElementById('crtErr').classList.remove("d-none");
   }
}


async function deleteSSL(id) {
   swalWithBootstrapButtonsDelete.fire({
      title: 'اخطار',
      html: 'آیا از حذف این گواهینامه اطمینان دارید؟ ',
      //timer: 3000,
      icon: 'error',
      timerProgressBar: true,
      confirmButtonText: 'قبول',
      showCancelButton: true,
      cancelButtonText: 'خیر',
      didOpen: () => {
          timerInterval = setInterval(() => {
          }, 100)
      },
      willClose: () => {
          clearInterval(timerInterval)
      }
  }).then((result) => {

  });
  var al = $(".swal2-modal").html();
  $(".swal2-modal").html("");
  var nal = "<div id='sml'>" + al + "</div>";
  $(".swal2-modal").html(nal);
  $(".swal2-cancel").click(function () {
   swalWithBootstrapButtonsDelete.close();
  })
  $(".swal2-confirm").click(async function () {
      let rBody = new FormData();
      rBody.append("id", id);
      rBody.append("domain", $domain);
      rBody.append("domainid", $did);
      const results = await fetch("/submit/cdn/ssl/delete-ssl", { method: "POST", body: rBody}).then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
      if (results.status === "success") {
         $("#"+id).slideUp(function () {
            $("#"+id).remove();
         });
      }
      showAlert(results.status, results.message);
      swalWithBootstrapButtonsDelete.close();
  })
}