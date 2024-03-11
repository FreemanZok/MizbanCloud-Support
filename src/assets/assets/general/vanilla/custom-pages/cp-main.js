
function changeStateUri(state, newDomain, newDomainid, newWebsite, newWebsiteid) {
   const uri = `/cdn/${newDomain}/${newDomainid}/${newWebsite}/${newWebsiteid}/custom-pages`;
   window.history.pushState(state, title, uri);
   document.title = `Client Mizban | Custom Pages`;
   $domain = newDomain;
   $did = newDomainid;
   $website = newWebsite;
   $wid = newWebsiteid;
   let dDom = document.querySelectorAll('.domainDom');
   let wDom = document.querySelectorAll('.websiteDom');
   dDom.forEach(dom => dom.innerHTML = newDomain);
   wDom.forEach(dom => dom.innerHTML = newWebsite);
   setSpaData(true);
   urlStateShifter($domain,$did,$website,$wid);
}
async function setSpaData(animations = false) {
   if (animations) {
      $('#fetcher').removeClass('d-none')
   }

   let rBody = new FormData();
   rBody.append("wid", $wid);
   const result = await fetch("/submit/cdn/pages/website/loadpage", {method:"POST", body: rBody})
   .then(r => r.text()).then(rj => rj).catch(ex => window.location.reload());
   console.log('riz', result);
   document.getElementById('grandmaster').innerHTML = result;

   if (animations) {
      $('#fetcher').addClass('d-none')
   }

      
   document.getElementById('file-input1')?.addEventListener("change", () => {
      document.getElementById('file-input1').parentNode.childNodes[1].innerHTML =
      "<img src='https://img.icons8.com/fluency/48/000000/chrome.png' width='25px' height='25px' />"
      + "تغییر فایل";
   })

   document.getElementById('file-input2')?.addEventListener("change", () => {
   document.getElementById('file-input2').parentNode.childNodes[1].innerHTML =
   "<img src='https://img.icons8.com/fluency/48/000000/chrome.png' width='25px' height='25px' />"
   + "تغییر فایل";
   })

   document.getElementById('file-input3')?.addEventListener("change", () => {
   document.getElementById('file-input3').parentNode.childNodes[1].innerHTML =
   "<img src='https://img.icons8.com/fluency/48/000000/chrome.png' width='25px' height='25px' />"
   + "تغییر فایل";
   })

   document.getElementById('file-input4')?.addEventListener("change", () => {
   document.getElementById('file-input4').parentNode.childNodes[1].innerHTML =
   "<img src='https://img.icons8.com/fluency/48/000000/chrome.png' width='25px' height='25px' />"
   + "تغییر فایل";
   })

   document.getElementById('file-input5')?.addEventListener("change", () => {
   document.getElementById('file-input5').parentNode.childNodes[1].innerHTML =
   "<img src='https://img.icons8.com/fluency/48/000000/chrome.png' width='25px' height='25px' />"
   + "تغییر فایل";
   })

}


const translateZone = {
   "1": "firewall",
   "2": "underconstruction",
   "3": "waf",
   "4": "ratelimit",
   "5": "servererror"
};

function askDelete(zone, del) {
   myDeleteSWA(()=>{addCp(zone, del)}, 'اخطار', 'آیا مایلید این صفحه را حذف کنید؟');
}

async function addCp(zone, del = null) {
   let rBody = new FormData();
   let file, ip;
   if (del !== "delete") {
         file = document.getElementById('file-input'+zone).files[0] ?? false;
         ip = document.getElementById('txtfirewallip'+zone).value;
      let valval = false;
      document.getElementById('txtfirewallip'+zone).classList.remove('alert-danger-border');
      if (zone == 2 && !checkIP('txtfirewallip'+zone)) { 
         document.getElementById('txtfirewallip'+zone).classList.add('alert-danger-border');
         valval = true;
      }
      if (!document.getElementById('file-input'+zone).files[0]) {
         document.querySelector('#cluster-protocol-firewall'+zone+' a').classList.add('alert-danger-border');
         valval = true
      }
      if (valval) return;
      if (zone == 2) rBody.append("ip",ip);
   }
   rBody.append("wid", $wid);

   rBody.append("pop",translateZone[`${zone}`]);
   if (del === "delete") {
      rBody.append("del", "true");
   }else{
      rBody.append("pg",file);
   }
   const result = await fetch("/submit/cdn/pages/website/add-page",
    { method: "POST", body: rBody}).then(r=>r.json()).then(re => re).catch(ex => window.location.reload());
    if(result.status == "success") await setSpaData();
    showAlert(result.status, result.message);
    console.log(result);
   
}







// Validation

function checkIP(myinput) {
   var i = document.getElementById(myinput).value;
   i = i.trim();
   var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|0)$/;
   if (i.match(ipformat)) {
       return true;
   } else {
       if ( i.indexOf('/') != -1 ) {
           console.log('elseif')
           var m = i.split("/");
           if ( m[0].match(ipformat) ) {
               console.log(1);
               var l=parseInt(m[1]);
               if ( l>=16 && l < 33 ){
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
$(document).on("keyup", "#txtfirewallip1", function (ki) {
     document.getElementById('txtfirewallip1').classList.remove('alert-danger-border');
     if (!checkIP('txtfirewallip1')) 
     return document.getElementById('txtfirewallip1').classList.add('alert-danger-border');
     else if (!document.getElementById('file-input1').files[0])
     document.querySelector('#cluster-protocol-firewall1 a').classList.add('alert-danger-border');
})

$(document).on("keyup", "#txtfirewallip2", function (ki) {
     document.getElementById('txtfirewallip2').classList.remove('alert-danger-border');
     if (!checkIP('txtfirewallip2')) 
     return document.getElementById('txtfirewallip2').classList.add('alert-danger-border');
     else if (!document.getElementById('file-input2').files[0])
     document.querySelector('#cluster-protocol-firewall2 a').classList.add('alert-danger-border');

})

$(document).on("keyup", "#txtfirewallip3", function (ki) {
     document.getElementById('txtfirewallip3').classList.remove('alert-danger-border');
     if (!checkIP('txtfirewallip3')) 
     return document.getElementById('txtfirewallip3').classList.add('alert-danger-border');
     else if (!document.getElementById('file-input3').files[0])
     document.querySelector('#cluster-protocol-firewall3 a').classList.add('alert-danger-border');
})

$(document).on("keyup", "#txtfirewallip4", function (ki) {
     document.getElementById('txtfirewallip4').classList.remove('alert-danger-border');
     if (!checkIP('txtfirewallip4')) 
     return document.getElementById('txtfirewallip4').classList.add('alert-danger-border');
     else if (!document.getElementById('file-input4').files[0])
     document.querySelector('#cluster-protocol-firewall4 a').classList.add('alert-danger-border');
})

$(document).on("keyup", "#txtfirewallip5", function (ki) {
     document.getElementById('txtfirewallip5').classList.remove('alert-danger-border');
     if (!checkIP('txtfirewallip5')) 
     return document.getElementById('txtfirewallip5').classList.add('alert-danger-border');
     else if (!document.getElementById('file-input5').files[0])
     document.querySelector('#cluster-protocol-firewall5 a').classList.add('alert-danger-border');
})


$(document).on("click", "#cluster-protocol-firewall1", function (ki) {
document.querySelector('#cluster-protocol-firewall1 a').classList.remove('alert-danger-border')
})

$(document).on("click", "#cluster-protocol-firewall2", function (ki) {
document.querySelector('#cluster-protocol-firewall2 a').classList.remove('alert-danger-border')
})
$(document).on("click", "#cluster-protocol-firewall3", function (ki) {
document.querySelector('#cluster-protocol-firewall3 a').classList.remove('alert-danger-border')
})
$(document).on("click", "#cluster-protocol-firewall4", function (ki) {
document.querySelector('#cluster-protocol-firewall4 a').classList.remove('alert-danger-border')
})
$(document).on("click", "#cluster-protocol-firewall5", function (ki) {
document.querySelector('#cluster-protocol-firewall5 a').classList.remove('alert-danger-border')
})



document.getElementById('file-input1')?.addEventListener("change", () => {
   document.getElementById('file-input1').parentNode.childNodes[1].innerHTML =
   "<img src='https://img.icons8.com/fluency/48/000000/chrome.png' width='25px' height='25px' />"
   + "تغییر فایل";
})

document.getElementById('file-input2')?.addEventListener("change", () => {
document.getElementById('file-input2').parentNode.childNodes[1].innerHTML =
"<img src='https://img.icons8.com/fluency/48/000000/chrome.png' width='25px' height='25px' />"
+ "تغییر فایل";
})

document.getElementById('file-input3')?.addEventListener("change", () => {
document.getElementById('file-input3').parentNode.childNodes[1].innerHTML =
"<img src='https://img.icons8.com/fluency/48/000000/chrome.png' width='25px' height='25px' />"
+ "تغییر فایل";
})

document.getElementById('file-input4')?.addEventListener("change", () => {
document.getElementById('file-input4').parentNode.childNodes[1].innerHTML =
"<img src='https://img.icons8.com/fluency/48/000000/chrome.png' width='25px' height='25px' />"
+ "تغییر فایل";
})

document.getElementById('file-input5')?.addEventListener("change", () => {
document.getElementById('file-input5').parentNode.childNodes[1].innerHTML =
"<img src='https://img.icons8.com/fluency/48/000000/chrome.png' width='25px' height='25px' />"
+ "تغییر فایل";
})
