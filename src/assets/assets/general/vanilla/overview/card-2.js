async function switchingFirewall(par = false) {
   const switcher = document.querySelector('#wf');
   if(!switcher.checked && par) return;
   let route, rBody = new FormData;
   document.querySelector('#card-2 .fetcher').classList.remove('d-none');
   route = switcher.checked ?
   "/submit/cdn/waf/website/active" : "/submit/cdn/waf/website/deactive";
   rBody.append("wid", $wid);
   rBody.append("lvl", lvl);
   const result = await fetch(route, { method: "POST", body: rBody }).then(r => r.json()).then(j => j).catch(ex => window.location.reload());
   console.log(result);
   showAlert(result.status, result.message);
   // document.getElementById('nis1').innerHTML = result[0];
   // document.getElementById('nis2').innerHTML = result[1];
   document.querySelector('#card-2 .fetcher').classList.add('d-none');
}
