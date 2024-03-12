async function clearCache() {
   document.querySelector('#card-9 .fetcher').classList.remove('d-none');

   let rBody = new FormData();
   rBody.append("route", "/");
   rBody.append("wid", $wid);
   const result = await fetch("/submit/cdn/cache/website/delete-cache", {method:"POST", body: rBody})
                  .then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
   showAlert(result.status, result.message);

   document.querySelector('#card-9 input[type="checkbox"]').checked = false;
   document.querySelector('#card-9 .fetcher').classList.add('d-none');
}