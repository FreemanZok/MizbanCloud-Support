async function updateTls(value, old) {
   if (old === value) return;
   let rBody = new FormData();
   rBody.append("tls", value);
   rBody.append("wid", $wid);
   const result = await fetch("/submit/cdn/ssl/website/tls", { method: "POST", body: rBody }).then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
   showAlert(result.status, result.message);
}

async function changeHttp() {

   const checkBox = document.getElementById('https_switch');
   const value = checkBox.checked ? "forcehttps" : "bothactive";

   let rBody = new FormData();
   rBody.append("switch", value);
   rBody.append("wid", $wid);

   const res = await sslSwitches("/submit/cdn/ssl/website/assign", checkBox, rBody);
   if (res.status !== 'success') checkBox.checked = !checkBox.checked;
}

async function forceLinksHttp() {

   const checkBox = document.getElementById('http_switch');
   const value = checkBox.checked ? "active" : "deactive";

   let rBody = new FormData();
   rBody.append("switch", value);
   rBody.append("wid", $wid);

   const res = await sslSwitches("/submit/cdn/ssl/website/force-links", checkBox, rBody);
   if (res.status !== 'success') checkBox.checked = !checkBox.checked;


}

async function hstsSwitch(time = document.querySelector('#showmonth .current-item').getAttribute('data-value')) {

   const checkBox = document.getElementById('hsts_switch');
   const value = checkBox.checked ? "true" : "false";
   const selector = document.getElementById('hsts-time');
   let rBody = new FormData();
   rBody.append("switch", value);
   rBody.append("wid", $wid);
   rBody.append("time", time);
   const resp = await sslSwitches("/submit/cdn/ssl/website/hsts", checkBox, rBody);
   if (resp.status !== 'success') {
      document.getElementById('hsts_switch').checked = !document.getElementById('hsts_switch').checked;
   }
   return resp;
}

async function callhstsSwitch(value, older) {
   if (older == value) return;
   await hstsSwitch(value);
}








async function sslSwitches(address, checkBox, rBody) {
   console.log(checkBox, checkBox.id);
   if (checkBox.hasAttribute("disabled")) return;
   checkBox.setAttribute("disabled", "disabled");
   const result = await fetch(address, { method: "POST", body: rBody }).then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
   console.log(result);
   showAlert(result.status, result.message);
   await new Promise(resolve => setTimeout(resolve, 1000));
   checkBox.removeAttribute("disabled");
   return result;
}









async function httpOnly(self) {
   $('#selectSslDiv').removeClass('alert-danger-border');
   let check1 = document.getElementById('cdn-radio1');
   let check2 = document.getElementById('cdn-radio2');
   check2.classList.remove("dis");
   let check3 = document.getElementById('cdn-radio3');
   check3.classList.remove("dis");
   if (check1.classList.contains('dis')) return;

   let rBody = new FormData();
   rBody.append("switch", "forcehttp");
   rBody.append("wid", $wid);

   document.querySelector(`button[onclick="httpOnly(this)"]`).setAttribute('disabled', 'disabled');
   const result = await fetch("/submit/cdn/ssl/website/assign", { method: "POST", body: rBody }).then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
   document.querySelector(`button[onclick="httpOnly(this)"]`).removeAttribute('disabled');


   if (result.status === 'success') {
      activeCardSSl(self, 'cdn_http');
      document.querySelector('#showhttps .current-item').innerHTML = ' انتخاب کنید ';
      document.querySelector('#showhttps .current-item').removeAttribute('data-value');
      $('.cdn-tab-row').addClass('d-none');
      if (document.getElementById('cdn-tab3').classList.contains('active_tab'))
         document.getElementById('cdn-tab3').classList.remove('active_tab');
      document.getElementById('hsts_switch').checked = false;
      document.getElementById('https_switch').checked = false;
      document.getElementById('http_switch').checked = false;
      document.querySelector('#showtls .current-item').innerHTML = ' Default ';
      document.querySelector('#showtls .current-item').setAttribute('data-value', 'default');
      document.querySelector('#showmonth .current-item').innerHTML = '1 ماه';
      document.querySelector('#showmonth .current-item').setAttribute('data-value', 'default');

   }
   showAlert(result.status, result.message);
   check1.classList.add("dis");
}


async function freeSsl(self) {
   $('#selectSslDiv').removeClass('alert-danger-border');
   let check1 = document.getElementById('cdn-radio1');
   check1.classList.remove("dis");
   let check2 = document.getElementById('cdn-radio2');
   let check3 = document.getElementById('cdn-radio3');
   check3.classList.remove("dis");
   if (check2.classList.contains('dis')) return;
   let rBody = new FormData();
   rBody.append("wid", $wid);

   document.querySelector(`button[onclick="freeSsl(this)"]`).setAttribute('disabled', 'disabled')
   const result = await fetch("/submit/cdn/ssl/website/free-ssl", { method: "POST", body: rBody }).then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
   document.querySelector(`button[onclick="freeSsl(this)"]`).removeAttribute('disabled')

   if (result.status === 'success') {
      activeCardSSl(self, 'cdn_safe');
      document.querySelector('#showhttps .current-item').innerHTML = ' انتخاب کنید ';
      document.querySelector('#showhttps .current-item').removeAttribute('data-value');
      $('.cdn-tab-row').addClass('d-none');
   }

   console.log(result);
   showAlert(result.status, result.message);
   if (result.status !== "success") return;
   if (result.cert) {
      const domaining = result.cert.data[0].sp_domain;
      const issuer = result.cert.data[0].sp_issuername;
      const alt = result.cert.data[0].sp_altdomain;
      const expire = result.cert.data[0].sp_expiredate + `<span style="color: ${result.cert.data[0].color}">  ( ` + result.cert.data[0].xpd8 + ' )</span>';

      document.getElementById('t3domain').innerHTML = domaining;
      document.getElementById('t3issuer').innerHTML = issuer;
      document.getElementById('t3alt').innerHTML = alt;
      document.getElementById('t3expire').innerHTML = expire;
      if (document.querySelector('.cdn-tab-row').classList.contains('d-none'))
         document.querySelector('.cdn-tab-row').classList.remove('d-none')
      if (document.getElementById('cdn-tab3').classList.contains('active_tab'))
         document.getElementById('cdn-tab3').classList.remove('active_tab');
   }
   check2.classList.add("dis");
}

async function selectSsl(value, old, self) {
   $('#selectSslDiv').removeClass('alert-danger-border');
   if (old === value) return;
   let check1 = document.getElementById('cdn-radio1');
   check1.classList.remove("dis");
   let check2 = document.getElementById('cdn-radio2');
   check2.classList.remove("dis");
   let check3 = document.getElementById('cdn-radio3');

   console.log(123);



   let rBody = new FormData();
   rBody.append("ssl", value);
   rBody.append("wid", $wid);
   const force_switch = document.getElementById('https_switch').checked ? "forcehttps" : "bothactive";
   rBody.append("switch", force_switch);
   const result = await fetch("/submit/cdn/ssl/website/select-ssl", { method: "POST", body: rBody }).then(r => r.json()).then(rj => rj);//.catch(ex => window.location.reload());

   if (result.status === 'success') {
      activeCardSSl(self, 'cdn_safe');
      $('.cdn-tab-row').removeClass('d-none')
   }

   showAlert(result.status, result.message);
   if (result.status === 'success' && result.cert) {
      const domaining = result.cert.data[0].sp_domain;
      const issuer = result.cert.data[0].sp_issuername;
      const alt = result.cert.data[0].sp_altdomain;
      const expire = result.cert.data[0].sp_expiredate + ` { ${result.cert.data[0].sp_expiredate_fa} } ` + `<span style="color: ${result.cert.data[0].color}">  ( ` + result.cert.data[0].xpd8 + ' )</span>';
      document.getElementById('t3domain').innerHTML = domaining;
      document.getElementById('t3issuer').innerHTML = issuer;
      document.getElementById('t3alt').innerHTML = alt;
      document.getElementById('t3expire').innerHTML = expire;
      document.querySelector('#t3expire span').style.color = result.cert.data[0].color;
      document.getElementById('cdn-tab3').classList.add('active_tab');
      $('#selectSslDiv').removeClass('alert-danger-border');
   } else {
      $('#selectSslDiv').addClass('alert-danger-border');
   }
   // console.log(domain);
   // console.log(result);

   // check3.classList.add("dis");
}


async function cdnica(value, dis) {
   if (value === $state) return;
   await new Promise(resolve => setTimeout(resolve, 100));
   $state = value;
   let rBody = new FormData();
   console.log(value);
   rBody.append("cdn", value);
   rBody.append("wid", $wid);
   const result = await fetch("/submit/cdn/ssl/website/cdn-ssl", { method: "POST", body: rBody }).then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
   showAlert(result.status, result.message);
   if (result.status !== "success") return
   const els = dis.parentNode.childNodes;
   document.querySelectorAll('.ssl-leftCol .active_tab').forEach(el => el.classList.remove('active_tab'));
   dis.classList.add('active_tab');
   console.log(result);
   if (value == "auto") {
      document.getElementById('client_image_zone').innerHTML = `
         <div class="float-el text-center">
            <span class="bg-grd-pink-350-to-orange-300-80 lock">
               <img src="/general/images/newpage/ico_lock.png" alt="">
            </span>
            <span class="d-block text-red-400 http-label">AUTOMATIC</span>
         </div>
      `;
   } else if (value == "https") {
      document.getElementById('client_image_zone').innerHTML = `
         <div class="float-el text-center">
            <span class="green-bg-grad lock">
               <img src="/general/images/newpage/ico_lock.png" alt="">
            </span>
            <span class="d-block https-label">HTTPS</span>
         </div>
      `;
   } else if (value == "http") {
      document.getElementById('client_image_zone').innerHTML = `
         <div class="float-el text-center">
            <span class="bg-grd-pink-350-to-orange-300-80 lock">
               <img src="/general/images/newpage/ico_lock.png" alt="">
            </span>
            <span class="d-block text-red-400 https-label">HTTP</span>
         </div>
      `;
   }
}


function activeCardSSl(self, image = '') {
   if ($(self).parents('.ssl-card-wrap').hasClass('active_tab')) {
   } else {
      $('#right-cdn-col .ssl-card-wrap').removeClass('active_tab');
      $(self).parents('.ssl-card-wrap').addClass('active_tab');
   }
   $(self).find('input[type="radio"]').prop("checked", true);
   $('.ssl-card-wrap button').attr("disabled", false);
   $('.ssl-card-wrap button').html(`<img class="imgbtn" src="/general/images/root/ico_add_wsp.png">انتخاب گزینه`);
   $(self).parents('.ssl-card-wrap').addClass('active_tab');
   $(self).attr("disabled", true);
   $(self).html(`<img class="imgbtn" src="/general/images/root/ico_add_wsp.png">انتخاب شده`);
   // const image = self.getAttribute('data-image');
   if (image === "cdn_http") {
      document.getElementById('cdn_image_zone').innerHTML = `
         <div class="float-el text-center">
            <span class="bg-grd-pink-350-to-orange-300-80 lock">
               <img src="/general/images/newpage/ico_lock.png" alt="">
            </span>
            <span class="d-block text-red-400 http-label">HTTP</span>
         </div>
      `;
   } else if (image === "cdn_safe") {
      document.getElementById('cdn_image_zone').innerHTML = `
         <div class="float-el text-center">
            <span class="green-bg-grad lock">
               <img src="/general/images/newpage/ico_lock.png" alt="">
            </span>
            <span class="d-block https-label">HTTPS</span>
         </div>
      `;
   }
}










// async function selectSslCard() {
//    // $('#selectSslDiv').addClass('alert-danger-border');
//    document.getElementById('cdn-radio3').classList.remove('dis')
// }


// document.getElementById('cdn-tab3').addEventListener("click", (e) => {
//    if(e.target.parentNode.id !== "httpslist" || e.target.parentNode.id !== "httpsoption" || e.target.parentNode.id !== "selectSslDiv") $('#selectSslDiv').addClass('alert-danger-border');
//    // if ($("#selectSslDiv").is(e.target)) {
//    //    console.log('inja');

//    // } else {
//    //    $('#selectSslDiv').addClass('alert-danger-border');
//    //    console.log('unja');
//    // }
// });