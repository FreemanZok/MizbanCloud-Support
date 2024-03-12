
async function developerModeSwitch() {
   document.querySelector('#card-8 .fetcher').classList.remove('d-none');

   let rBody = new FormData();
   rBody.append("dv", document.querySelector('#card-8 input').checked ? "1" : "0");
   rBody.append("wid", $wid);
   rBody.append("ao", "0");
   const result = await fetch("/submit/cdn/cache/website/cache-mode", {method:"POST", body: rBody})
                  .then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
   showAlert(result.dv.status, result.dv.message);

   document.querySelector('#card-8 .fetcher').classList.add('d-none');

}
