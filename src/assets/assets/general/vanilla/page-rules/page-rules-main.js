var subfolder;
var dumbledore = document.getElementById('dp').innerHTML;

function changeStateUri(state, newDomain, newDomainid, newWebsite, newWebsiteid) {
   const uri = `/cdn/${newDomain}/${newDomainid}/${newWebsite}/${newWebsiteid}/rules`;
   window.history.pushState(state, title, uri);
   document.title = `Mizban Cloud | Rules`;
   $domain = newDomain;
   $did = newDomainid;
   $website = newWebsite;
   $wid = newWebsiteid;
   let dDom = document.querySelectorAll('.domainDom');
   let wDom = document.querySelectorAll('.websiteDom');
   dDom.forEach(dom => dom.innerHTML = newDomain);
   wDom.forEach(dom => dom.innerHTML = newWebsite);
   setSpaData();
   urlStateShifter($domain, $did, $website, $wid);
   if_Domain_Equals_SubDomain_Show_One();
}

async function setSpaData(animations = true) {
   if (animations) {
      $('#un').addClass('d-none');
      $('#in').removeClass('d-none');
      $('.accordion-pagerule-wrap').slideUp(500);
   }

   let rBody = new FormData();
   rBody.append("wid", $wid);
   rBody.append("did", $did);
   const result = await fetch("/submit/cdn/rules/website/spa-data", { method: "POST", body: rBody })
      .then(r => r.text()).then(rj => rj).catch(ex => window.location.reload());
   console.log('riz', result);
   if (document.querySelector('#PageRuleList'))
      document.querySelector('#PageRuleList').innerHTML = result;
   else
      window.location.reload();
   if (animations) {
      $('.accordion-pagerule-wrap').slideDown(500);
      $('#in').addClass('d-none');
      $('#un').removeClass('d-none');
   }
}

async function addFolderJx() {
   document.getElementById('ezafeKardan').innerHTML = 'اضافه کردن';
   document.getElementById('priority-pagerule').classList.remove('alert-danger-border');
   document.getElementById('folderName').classList.remove('alert-danger-border');

   // if (document.getElementById('folderName').value == ""
   // || document.getElementById('folderName').value == "undefiend"
   // || document.getElementById('folderName').value == null) {
   //    document.getElementById('ezafeKardan').innerHTML = 'اضافه کردن';
   //    return document.getElementById('folderName').classList.add('alert-danger-border');
   // }
   // if (!/^[A-z0-9\.\*\-/]+$/.test(document.getElementById('folderName').value) ||
   //  document.getElementById('folderName').value.includes('//')   ||
   //   document.getElementById('folderName').value.includes('..')  ||
   //   document.getElementById('folderName').value.startsWith('.') ||
   //   document.getElementById('folderName').value.startsWith('-') ||
   //   document.getElementById('folderName').value.endsWith('.')   ||
   //   document.getElementById('folderName').value.endsWith('-')
   // ) { 
   //    return document.getElementById('folderName').classList.add('alert-danger-border');
   // }
   if (!/^[0-9]+$/.test(document.getElementById('priority-pagerule').value) ||
      document.getElementById('priority-pagerule').value.includes('//') ||
      document.getElementById('priority-pagerule').value.includes('\\') ||
      document.getElementById('priority-pagerule').value.includes('/') ||
      document.getElementById('priority-pagerule').value.includes('^')
   ) {
      return document.getElementById('priority-pagerule').classList.add('alert-danger-border');
   }
   let rBody = new FormData();
   rBody.append("wid", $wid);
   rBody.append("name", document.getElementById('folderName').value);
   rBody.append("priority", document.getElementById('priority-pagerule').value);
   document.getElementById('ezafeKardan').innerHTML = '<img src="/general/loading/tail-spin.svg" />';
   const result = await fetch("/submit/cdn/rules/website/add-folder", { method: "POST", body: rBody })
      .then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
   if (result.status === "success") await setSpaData(false);
   showAlert(result.status, result.message);
   if (result.status == "success") {
      $('#addFolder').modal('hide');
      document.getElementById('folderName').value = "";
   }
   document.getElementById('ezafeKardan').innerHTML = 'اضافه کردن';


   $(".accordion-item").on('click', '.fnlist-options', function (e) {
      e.stopPropagation();

      var all = $('.fnlist');
      // all.removeClass("active");
      if (all.hasClass("active")) {
         all.removeClass("active")
         // console.log(1111)
      } else {
         all.removeClass("active")
         $(this).parent().find('.fnlist').addClass('active');
      }

   });

   var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
   var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
   })
}

async function easyFetch(rRoute, rMethod, rBody = null) {
   return fetch(rRoute, { method: rMethod, body: rBody }).then(r => r.json()).then(j => j).catch(ex => window.location.reload());
}


function nullifier() {
   // Global
   document.querySelectorAll("#foundmod input").forEach(el => el.value = '');
   document.querySelectorAll("#foundmod .error-field-wrap").forEach(el => el.innerHTML = '');
   document.querySelectorAll("#foundmod input").forEach(el => el.classList.remove('alert-danger-border'));
   document.querySelectorAll("#foundmod input[type='checkbox']").forEach(el => el.checked = false);
   document.querySelector('#foundmod #alltypes #modal-box-ip').innerHTML = `ip های مورد نظر را در کادر بالا وارد کرده و کلید enter را بفشارید`;
   // Browser Cache Ttl
   document.getElementById('showbrcache').innerHTML = `
   <span class="current-item fs-14" data-value="30m">30 دقیقه</span>
   <img class="imgexp img-collapse" src="/general/images/root/ico_arrow_down_disabled.svg">
   `;
   // Cache Level
   document.getElementById('showcacheLv').innerHTML = `
   <span class="current-item fs-14" data-value="0">خاموش</span>
   <img class="imgexp img-collapse" src="/general/images/root/ico_arrow_down_disabled.svg">
   `;
   // Edge Cache Ttl
   document.getElementById('showedgecache').innerHTML = `<span class="current-item fs-14" data-value="30m">30 دقیقه</span>
   <img class="imgexp img-collapse" src="/general/images/root/ico_arrow_down_disabled.svg">  
   `;
   // Security Level
   document.getElementById('showesecurity').innerHTML = `
   <span class="current-item fs-14" data-value="0">سپر</span>
   <img class="imgexp img-collapse" src="/general/images/root/ico_arrow_down_disabled.svg">
   `;
   // Ip Management
   document.querySelector('.ipSelected').innerHTML = '<p class="emptyipinfo">' + 'لیستIPهای مجاز (لطفا بعد از ورود آی پی اینتر بزنید)  ' + '</p>';
   // document.querySelector('.ipSelected').classList.add('d-none');
   // Country Management
   document.querySelector('.countrySelected').innerHTML = '';
   document.querySelector('.countrySelected').classList.add('d-none');
   document.getElementById('showCrCache').innerHTML = `
   <span class="current-item fs-14" data-value="AD">
   آندورا 
   </span>
   <img class="imgexp img-collapse" src="/general/images/root/ico_arrow_down_disabled.svg">
   `;

   // Header To Client
   let i = 2
   while (document.getElementById("header-item_" + i)) {
      document.getElementById("header-item_" + i).remove()
      i++;
   }

   // Header To Server
   let j = 2
   while (document.getElementById("sheader-item_" + j)) {
      document.getElementById("sheader-item_" + j).remove()
      j++;
   }

   document.getElementById('dp').innerHTML = dumbledore;
   document.querySelectorAll('#alltypes > div').forEach(el => el.style.display = 'none');





   document.getElementById('allow-switch').checked = true;
   document.getElementById('allow-switch2').checked = true;


   document.getElementById('to_connect').innerHTML = '';
   document.getElementById('to_send').innerHTML = '';
   document.getElementById('to_read').innerHTML = '';


   document.querySelectorAll(".alert-danger-border").forEach(el => el.classList.remove('alert-danger-border'));
}





function if_Domain_Equals_SubDomain_Show_One() {
   if (document.getElementById('ananas1').innerHTML == document.getElementById('ananas2').innerHTML) {
      document.getElementById('ananas1').classList.add('d-none');
      document.getElementById('ananas-dot').classList.add('d-none');
   } else {
      document.getElementById('ananas1').classList.remove('d-none');
      document.getElementById('ananas-dot').classList.remove('d-none');
   }
}

(async () => {
   await new Promise(resolve => setTimeout(() => { }, 500))
   if_Domain_Equals_SubDomain_Show_One();
})()




function checkIP(myinput) {
   var i = document.getElementById(myinput).value;
   i = i.trim();
   var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|0)$/;
   if (i.match(ipformat)) {
      return true;
   } else {
      if (i.indexOf('/') != -1) {
         console.log('elseif')
         var m = i.split("/");
         if (m[0].match(ipformat)) {
            console.log(1);
            var l = parseInt(m[1]);
            if (l >= 16 && l < 33) {
               console.log(11);
               return true;
            }
            else {
               console.log(12);
               return false
            }
         }
      } else {
         console.log('elseelse');
         return false
      }
      console.log('else');
      return false;
   }
}



async function editFolderJx(folder) {
   document.getElementById('ezafeKardan').innerHTML = 'ویرایش';
   document.getElementById('priority-pagerule').classList.remove('alert-danger-border');
   document.getElementById('folderName').classList.remove('alert-danger-border');

   if (document.getElementById('folderName').value == ""
      || document.getElementById('folderName').value == "undefiend"
      || document.getElementById('folderName').value == null) {
      document.getElementById('ezafeKardan').innerHTML = 'ویرایش';
      return document.getElementById('folderName').classList.add('alert-danger-border');
   }
   if (!/^[A-z0-9\.\*\-/]+$/.test(document.getElementById('folderName').value) ||
      document.getElementById('folderName').value.includes('//') ||
      document.getElementById('folderName').value.includes('..') ||
      document.getElementById('folderName').value.startsWith('.') ||
      document.getElementById('folderName').value.startsWith('-') ||
      document.getElementById('folderName').value.endsWith('.') ||
      document.getElementById('folderName').value.endsWith('-')
   ) {
      return document.getElementById('folderName').classList.add('alert-danger-border');
   }
   if (!/^[0-9]+$/.test(document.getElementById('priority-pagerule').value) ||
      document.getElementById('priority-pagerule').value.includes('//') ||
      document.getElementById('priority-pagerule').value.includes('\\') ||
      document.getElementById('priority-pagerule').value.includes('/') ||
      document.getElementById('priority-pagerule').value.includes('^')
   ) {
      return document.getElementById('priority-pagerule').classList.add('alert-danger-border');
   }
   let rBody = new FormData();
   rBody.append("wid", $wid);
   rBody.append("folder", folder);
   rBody.append("name", document.getElementById('folderName').value);
   rBody.append("priority", document.getElementById('priority-pagerule').value);
   document.getElementById('ezafeKardan').innerHTML = '<img src="/general/loading/tail-spin.svg" />';
   const result = await fetch("/submit/cdn/rules/website/edit-folder", { method: "POST", body: rBody })
      .then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
   if (result.status === "success") await setSpaData(false);
   showAlert(result.status, result.message);
   if (result.status == "success") {
      $('#addFolder').modal('hide');
      document.getElementById('folderName').value = "";
   }
   document.getElementById('ezafeKardan').innerHTML = 'ویرایش';


   $(".accordion-item").on('click', '.fnlist-options', function (e) {
      e.stopPropagation();

      var all = $('.fnlist');
      // all.removeClass("active");
      if (all.hasClass("active")) {
         all.removeClass("active")
         // console.log(1111)
      } else {
         all.removeClass("active")
         $(this).parent().find('.fnlist').addClass('active');
      }

   });

   var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
   var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
   })
}




async function getDefaultPriority() {

   const method = "POST";
   const path = "/submit/cdn/rules/website/default-priority";
   let body = new FormData(); body.append('wid', $wid);

   const priority = await fetch(path, { method, body })
      .then(response => response.json())
      .then(kson => kson)
      .catch(ex => window.location.reload());

   console.log(typeof priority)
   if (typeof priority != 'object') {
      document.getElementById('priority-pagerule').value = priority;
      // showAlert(res.status, res.message);
   }
}