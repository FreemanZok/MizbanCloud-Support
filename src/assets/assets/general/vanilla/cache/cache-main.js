let cdn_cache_inp = document.querySelector('#showinfocache .current-item').getAttribute('data-value');
let cdn_cache_txt = document.querySelector('#showinfocache .current-item').innerHTML;
let brw_cache_inp = document.querySelector('#showcachebrowser .current-item').getAttribute('data-value');
let brw_cache_txt = document.querySelector('#showcachebrowser .current-item').innerHTML;
// DOM
let cacsheCards = document.querySelectorAll('.disable-element');
let cacsheBtn = document.querySelectorAll('.botdiz');
const AOSwitch = document.getElementById('access_switch');
const DVSwitch = document.getElementById('prstatus_switch');

function changeStateUri(state, newDomain, newDomainid, newWebsite, newWebsiteid) {
   const uri = `/cdn/${newDomain}/${newDomainid}/${newWebsite}/${newWebsiteid}/cache`;
   window.history.pushState(state, title, uri);
   document.title = `Client Mizban | ${state}`;
   $domain = newDomain;
   $did = newDomainid;
   $website = newWebsite;
   $wid = newWebsiteid;
   let dDom = document.querySelectorAll('.domainDom');
   let wDom = document.querySelectorAll('.websiteDom');
   dDom.forEach(dom => dom.innerHTML = newDomain);
   wDom.forEach(dom => dom.innerHTML = newWebsite);
   urlStateShifter($domain, $did, $website, $wid);
   setSpaData();
}

async function setSpaData() {
   cacsheCards.forEach(i => i.classList.remove('d-none'));
   let rBody = new FormData();
   rBody.append("wid", $wid);
   const result = await fetch("/submit/cdn/cache/website/spa-data", { method: "POST", body: rBody })
      .then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
   console.log('riz', result);
   AOSwitch.checked = result.switches.alwaysOnline == "1";
   DVSwitch.checked = result.switches.developerMode == "1";

   document.querySelector('#showinfocache .current-item').innerHTML = (((result.switches.cacheTtl.serverttl).replace("h", " ساعت")).replace("m", " دقیقه")).replace("s", " ثانیه");
   document.querySelector('#showcachebrowser .current-item').innerHTML = (((result.switches.cacheTtl.browserttl).replace("h", " ساعت")).replace("m", " دقیقه")).replace("s", " ثانیه");
   document.querySelector('.active_cdn').classList.remove('active_cdn');
   document.getElementById('c' + result.switches.cacheTtl.cachetype + 'c' + result.switches.cacheTtl.cachetype).classList.add('active_cdn');
   cacsheCards.forEach(i => i.classList.add('d-none'));
}












async function alwaysOnlineSwitch() {
   const AOSwitch = document.getElementById('access_switch');
   const DVSwitch = document.getElementById('prstatus_switch');
   DVSwitch.setAttribute("disabled", "disabled");
   AOSwitch.setAttribute("disabled", "disabled");

   let rBody = new FormData();
   rBody.append("ao", AOSwitch.checked ? "1" : "0");
   rBody.append("wid", $wid);
   const dvState = DVSwitch.checked;
   if (AOSwitch.checked) {
      DVSwitch.checked = false;
      rBody.append("dv", "0");
   } else {
      rBody.append("dv", DVSwitch.checked ? "1" : "0");
   }
   const result = await fetch("/submit/cdn/cache/website/cache-mode", { method: "POST", body: rBody })
      .then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
   showAlert(result.ao.status, result.ao.message);
   await new Promise(resolve => setTimeout(resolve, 1000));
   if (result.ao.status !== 'success') {
      DVSwitch.checked = dvState;
      AOSwitch.checked = !AOSwitch.checked;
   }
   DVSwitch.removeAttribute("disabled");
   AOSwitch.removeAttribute("disabled");
}

async function developerModeSwitch() {
   const AOSwitch = document.getElementById('access_switch');
   const DVSwitch = document.getElementById('prstatus_switch');
   DVSwitch.setAttribute("disabled", "disabled");
   AOSwitch.setAttribute("disabled", "disabled");

   let rBody = new FormData();
   rBody.append("dv", DVSwitch.checked ? "1" : "0");
   rBody.append("wid", $wid);
   const aoState = AOSwitch.checked;
   if (DVSwitch.checked) {
      AOSwitch.checked = false;
      rBody.append("ao", "0");
   } else {
      rBody.append("ao", AOSwitch.checked ? "1" : "0");
   }
   const result = await fetch("/submit/cdn/cache/website/cache-mode", { method: "POST", body: rBody })
      .then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
   showAlert(result.dv.status, result.dv.message);
   await new Promise(resolve => setTimeout(resolve, 1000));
   if (result.dv.status !== 'success') {
      AOSwitch.checked = aoState;
      DVSwitch.checked = !DVSwitch.checked;
   }
   DVSwitch.removeAttribute("disabled");
   AOSwitch.removeAttribute("disabled");
}


async function clearCash(route) {
   listOfCache = route.split('\n');
   console.log('list of purge routes', listOfCache);
   console.log('count of purge routes', listOfCache.length);
   if (listOfCache.length > 1) return listOfCache.forEach(rot => clearCash(rot));
   document.querySelector('.cache-delete-all').setAttribute('disabled', 'disabled');
   document.querySelector('.cache-delete-all').innerHTML = ` در حال پاکسازی  `;

   let rBody = new FormData();
   rBody.append("route", route);
   rBody.append("wid", $wid);
   const result = await fetch("/submit/cdn/cache/website/delete-cache", { method: "POST", body: rBody })
      .then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());

   if (document.querySelector('#delCashAdr').value !== `` || route === '/' || result.status !== "success")
      showAlert(result.status, result.message);

   document.querySelector('.cache-delete-all').removeAttribute('disabled');
   document.querySelector('.cache-delete-all').innerHTML = `پاک کردن همه چیز`;
   document.querySelector('#delCashAdr').value = ``;
}


async function cacheTime(server, client, st = false, self = false) {
   if (st) document.getElementById('fetcher').classList.remove('d-none');
   if (self) self.setAttribute('disabled', 'disabled');
   console.log(server, client);
   let rBody = new FormData();
   rBody.append("svc", server);
   rBody.append("csc", client);
   if (!st) rBody.append("sts", document.querySelector('.active_cdn').getAttribute('data-value') + '');
   else rBody.append("sts", st);
   rBody.append("wid", $wid);
   console.log(server, client);

   const result = await fetch("/submit/cdn/cache/website/cache-time", { method: "POST", body: rBody })
      .then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
   showAlert(result.status, result.message);
   console.log(server, client);
   if (self) self.setAttribute('disabled', false);
   if (result.status === "success" && self) {
      $('.cdnCasheCard').removeClass('active_cdn');
      $('.cdnCasheCard button').attr("disabled", false);
      $('.cdnCasheCard button').html(`<img class="imgbtn" src="/general/images/root/ico_add_wsp.png">انتخاب گزینه`);
      $(self).attr("disabled", true);
      $(self).html(`<img class="imgbtn" src="/general/images/root/ico_add_wsp.png">انتخاب شده`);
      $(self).parents('.cdnCasheCard').addClass('active_cdn');
      $(self).parents('.cdnCasheCard').find('input[type="radio"]').prop("checked", true);
   }
   if (result.status !== 'success') {
      document.querySelector('#showinfocache .current-item').setAttribute('data-value', cdn_cache_inp);
      document.querySelector('#showinfocache .current-item').innerHTML = cdn_cache_txt;
      document.querySelector('#showcachebrowser .current-item').setAttribute('data-value', brw_cache_inp);
      document.querySelector('#showcachebrowser .current-item').innerHTML = brw_cache_txt;
   } else {
      cdn_cache_inp = document.querySelector('#showinfocache .current-item').getAttribute('data-value');
      cdn_cache_txt = document.querySelector('#showinfocache .current-item').innerHTML;
      brw_cache_inp = document.querySelector('#showcachebrowser .current-item').getAttribute('data-value');
      brw_cache_txt = document.querySelector('#showcachebrowser .current-item').innerHTML;
   }
   if (st) document.getElementById('fetcher').classList.add('d-none');
}

function domValue(query) {
   return document.querySelector(query).getAttribute('data-value');
}