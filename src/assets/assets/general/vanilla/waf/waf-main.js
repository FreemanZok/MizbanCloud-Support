function ebtn(rid) {
   return `<button onclick="toggleRule('${rid}', 'enable')"
    class="btn border-0 rounded-pill btn-sm px-3 py-1 fs-14 ls-02 fw-500 disable-btn">غیرفعال</button>`;
}
function dbtn(rid) {
   return `<button onclick="toggleRule('${rid}', 'disable')"
    class="btn btn-blue-100 border-0 rounded-pill btn-sm px-3 py-1 fs-14 ls-02 fw-500">فعال</button>`;
}
var ipWafDom = document.getElementById('txtip-waf');


async function switchingFirewall(el = '#waf_switch', mode = document.getElementById('waf_switch').checked) {
   let route, waflevel, rBody = new FormData;
   route = mode ?
   "/submit/cdn/waf/website/active" : "/submit/cdn/waf/website/deactive";
   
   document.querySelectorAll('.waflevelitem').forEach(lvl => {
      if (lvl.checked) return waflevel = lvl.getAttribute('data-value');
   });
   
   rBody.append("wid", $wid);
   rBody.append("lvl", waflevel);

   document.querySelectorAll('.fetcher').forEach(ft => ft.classList.remove('d-none'));
   for (let i = 1; i < 4; i++) {
      document.querySelector(`button[onclick="document.getElementById('waf-level${i}').click()"]`).setAttribute('disabled', 'disabled');   
   }

   document.querySelector(el)?.setAttribute('disabled', 'disabled');
   document.querySelector('.waf-card-row').insertAdjacentHTML('afterbegin', `<div class="three-dots-loading" id="fetcher"></div>`);
   // document.getElementById('stsbtn').setAttribute("disabled", "disabled");
   const result = await fetch(route, { method: "POST", body: rBody }).then(r => r.json()).then(j => j).catch(ex => window.location.reload());
   
   document.querySelector('.waf-card-row #fetcher').remove();
   // if(result.status === "success" && route === "/submit/cdn/waf/website/active") {
   //    document.querySelector('div.disable-element')?.classList.add('d-none');
   // } else if (result.status === "success" && route === "/submit/cdn/waf/website/active") {
   //    document.querySelector('div.disable-element')?.classList.remove('d-none');
   // }
   
   if(typeof result.action !== "undefined" && result.action === "needtoupgrade"){
      showAlert(result.status, result.message);
      document.querySelector(el).checked = !document.querySelector(el).checked;
      document.querySelector(el)?.removeAttribute('disabled');
      return;
   }
   if(typeof result.current?.data[0]?.WafLevel !== "undefined") {
      for (let wafLevel = 1; wafLevel < 4; wafLevel++) {
         document.getElementById(`waf-level${waflevel}`).checked = false;
      }
      document.getElementById(`waf-level${result.current.data[0].WafLevel}`).checked = true;
   }
   
   
   await new Promise(resolve => setTimeout(resolve, 1000));
   showAlert(result.status, result.message);

   for (let i = 1; i < 4; i++) {
      document.querySelector(`button[onclick="document.getElementById('waf-level${i}').click()"]`).removeAttribute('disabled');   
   }
   // document.getElementById('stsbtn').removeAttribute("disabled");
   document.querySelector(el)?.removeAttribute('disabled');
   if(result.status !== "success" && el !== null && typeof result.current?.data[0]?.WafLevel === "undefined") {
      document.querySelector(el).checked = !document.querySelector(el).checked;
   }else if(result.status === "success"){
      $('.waf-card input[type="radio"]').removeAttr('checked');
      $('.waf-card ').removeClass('active_card');
      $('.waf-card button').attr("disabled", false);
      $(`button[onclick="document.getElementById('waf-level${waflevel}').click()"]`).parents('.waf-card').find('input[type="radio"]').attr('checked' , 'checked');
      $(`button[onclick="document.getElementById('waf-level${waflevel}').click()"]`).parents('.waf-card').addClass('active_card');
      $(`button[onclick="document.getElementById('waf-level${waflevel}').click()"]`).attr("disabled", true);
      shiftCards();
      afterloadDefaultRules();
      document.querySelectorAll('.waf-card-btn button').forEach(el => el.innerHTML = `
      <img class="imgbtn" src="/general/images/root/ico_add_wsp.png">
      انتخاب بسته`);
      document.querySelector('.active_card .waf-card-btn button').innerHTML = `
      <img class="imgbtn" src="/general/images/root/ico_add_wsp.png">
      انتخاب شده`;
   }
   allowDeny();
   
   document.querySelectorAll('.fetcher').forEach(ft => ft.classList.add('d-none'));

   console.log(result);
   if (document.getElementById('waf1').checked) {
      document.querySelector('.disable-element').classList.remove('d-none')
      document.querySelector('.disable-element').parentNode.style.opacity = '0.5';
   }
   if (document.getElementById('waf2').checked) {
      document.querySelector('.disable-element').classList.add('d-none')
      document.querySelector('.disable-element').parentNode.style.opacity = '1';
   }

}

async function afterloadDefaultRules() {
   $('#default').slideUp(800);
   
   let body = new FormData();
   body.append("wid", $wid);
   const route = '/submit/cdn/waf/website/default-rules';
   const result = await fetch(route, { method: "POST", body }).then(r => r.text()).then(j => j).catch(ex => window.location.reload());
   if ( $.fn.DataTable.isDataTable('#waff-table') ) {
      $('#waff-table').DataTable().destroy();
    }
   $('#waff-table tbody').empty();
   $("#waff-table tbody").html(result);
   $('#default').slideDown(800);

   $("#waff-table").DataTable({ 
      "destroy": true,
      "pageLength": 10, 
      "pagingType": "simple_numbers",
      "bInfo" : false,
      "lengthChange": false,
      "searching": true,
      "emptyTable":`<div class="emptystate-wrap">
          <div class="empty-state-image text-center">
              <img src="/general/images/emptystate/img_empty_records.png" alt="">
          </div>
          <p class="text-center emptydoc emptyState-text mb-5 mt-3" id="emptydoc">قانونی برای سطح شما موجود نیست</p>
      </div>`,
      "order": [],
      "language": { search: "" },
   });

   $('.dataTables_filter input').addClass('searchbox my-0 border rounded-pill text-start w-100 fs-12  bg-white ws-10  border-1 px-4'); // <-- add this line
   $('.dataTables_filter input').attr("placeholder", "جستجو");
}

async function toggleRule(rid, action) {

   // document.querySelector('#btn-'+rid+' button').innerHTML += `<img src="/general/loading/tail-spin.svg" />`;
   document.querySelector('#btn-' + rid + ' button').setAttribute("disabled", "disabled");
   let body = new FormData();
   body.append("wid", $wid);
   body.append("rid", rid);
   body.append("act", action);
   const route = '/submit/cdn/waf/website/toggle-rule';
   const result = await fetch(route, { method: "POST", body }).then(r => r.json()).then(j => j).catch(ex => window.location.reload());
   console.log(result);
   showAlert(result.status, result.message);
   if (result.status !== "success") return;

   if (action == "enable")
      document.getElementById('btn-' + rid).innerHTML = dbtn(rid);
   else
   document.getElementById('btn-'+rid).innerHTML = ebtn(rid);
   }













   // custom rules
   document.querySelectorAll('.mores').forEach(m => m.addEventListener("click", modalNullifier))
   

   function modalNullifier() {
      document.getElementById('show-wafrule').innerHTML = `
         <span class="current-item fs-14">انتخاب قانون</span>
         <img class="imgexp img-collapse" src="/general/images/root/ico_arrow_down_disabled.svg" />
      `;
      document.getElementById("txtkey-waf").value = '';
      document.getElementById("txtvalue-waf").value = '';
      document.getElementById("txtreferer-waf").value = '';
      document.getElementById("txturl-waf").value = '';
      key = document.getElementById("txtip-waf").value = '';

      document.querySelectorAll('.nuller').forEach(node => node.classList.add('d-none'));
   }



   async function addCustomRule() {
      document.getElementById("txtkey-waf").classList.remove('alert-danger-border');
      document.getElementById("txtvalue-waf").classList.remove('alert-danger-border');
      document.getElementById("txtreferer-waf").classList.remove('alert-danger-border');




      let rName = document.querySelector('#show-wafrule .current-item').getAttribute('data-value');
      let key, value, body = new FormData(), bad = false;
      console.log(rName);
   // shape form
      if (rName === "posted_fields") {
         key = document.getElementById("txtkey-waf").value;
         value = document.getElementById("txtvalue-waf").value;
         if(!/^[A-z0-9\-_]+$/.test(key)) {
            document.getElementById("txtkey-waf").classList.add('alert-danger-border');
            bad = true;
         }
         if(!/^[A-z0-9\-_]+$/.test(value)) {
            document.getElementById("txtvalue-waf").classList.add('alert-danger-border');
            bad = true;
         }
      }
      if (rName === "referer") {
         key = document.getElementById("txtreferer-waf").value;
         value = document.getElementById("txtreferer-waf").value;
         if(!/^[A-z0-9\-\.]+$/.test(key)) {
            document.getElementById("txtreferer-waf").classList.add('alert-danger-border');
            bad = true;
         }
      }
      if (rName === "url") {
         key = document.getElementById("txturl-waf").value;
         value = document.getElementById("txturl-waf").value;
         rName = document.getElementById('wildcard-waf').checked ? "wildurl" : rName;
         if(!/^[A-z0-9\-\.:/]+$/.test(key)) {
            document.getElementById("txturl-waf").classList.add('alert-danger-border');
            bad = true;
         }
      }
      if (rName === "ip") {
         key = document.getElementById("txtip-waf").value;
         value = document.getElementById("txtip-waf").value;
         if (!checkIP('txtip-waf')) {
            ipWafDom.classList.add('alert-danger-border');
            bad = true;
         }
      }
      if (bad) return;
      if (typeof key === "undefined" || key === "") return;
      if (typeof value === "undefined" || value === "") return;
      document.getElementById('sendWafRule').setAttribute("disabled", "disabled");
      document.getElementById('sendWafRule').innerHTML = `<img src="/general/loading/tail-spin.svg" />`;
      body.append("wid", $wid);
      body.append("rName", rName);
      body.append("rKey", key);
      body.append("rValue", value);
      body.append("rLevel", document.querySelector('#show-wafLevelrule .current-item').getAttribute('data-value'));
      const route = '/submit/cdn/waf/website/add-crule';
      const result = await fetch(route, { method: "POST", body}).then(r=>r.json()).then(j=>j).catch(ex => window.location.reload());
      console.log(result);
      document.getElementById('sendWafRule').removeAttribute("disabled");
      document.getElementById('sendWafRule').innerHTML = "اضافه کردن";
      $('#addWaflRule').modal('hide');
      kiwi = rName == "posted_fields" ? `<span>Key:</span> ${key}<br>`  : "";
      showAlert(result.status, result.message);
      let ri = result.id;
      if (result.status === "success") {
      if (!document.querySelector('#table_waf_rule tbody')) return window.location.reload();
         const keyValueFinal = rName === 'posted_fields' ? `key: ${key} &#160;&#160; value: ${value}` : value;
         $('#table_waf_rule tbody').prepend(`
         <tr>
            <td>
               <div class="accordion-item mt-0" id="acc-${ri}">
                     <h2 class="accordion-header" id="flush-heading">
                        <button class="accordion-button w-100 collapsed DnsrecordList">
                           <div class="col-3 col-sm-4  waf-rule-actionCol">
                                 <span class="remove-item"  style="text-align: right" onclick="removeCR('${ri}')">
                                    <img class="sublink" src="/general/images/new/ico_delete.svg" alt="">
                                 </span>
                           </div>
                           <div class="col-12 col-sm-4 waf-rule-varaible text-center">
                                 <p class="mb-0 fs-14 enFont">
                                    ${keyValueFinal}
                                 </p>
                           </div>
                           <div class="col-9 col-sm-4 position-relative waf-rule-nameCol">
                                 <p class="mb-0 fs-14 tl  enFont">
                                    ${rName}
                                 </p>
                           </div>
                        </button>
                     </h2>
                     
               </div>
            </td>
         </tr>
        
         `);
      }
      modalNullifier();


   }


   function removeCR(rid) {
      myDeleteSWA(function(){deleteCustomRule(rid)}, "اخطار", "آیا از حذف این قانون مطمئنید؟");
   }

   async function deleteCustomRule(rid) {
      
      let body = new FormData();
      body.append("wid", $wid);
      body.append("rid", rid);
      const route = '/submit/cdn/waf/website/remove-crule';
      const result = await fetch(route, { method: "POST", body}).then(r=>r.json()).then(j=>j).catch(ex => window.location.reload());
      console.log(result);
      showAlert(result.status, result.message);

      console.log(result.status);
      console.log(result.message);

      if(result.status == 'success') {
         $('#acc-'+rid).slideUp(500, function(){ document.getElementById('acc-'+rid).remove() });
      }
   }



   ipWafDom.addEventListener("keyup", () => {
   checkIP('txtip-waf')?
   ipWafDom.classList.remove('alert-danger-border'):
   ipWafDom.classList.add('alert-danger-border');
});

   
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

function iffi(){

   // if (document.getElementById('waf1').checked) {
   //    document.querySelector('.disable-element').classList.remove('d-none')
   //    document.querySelector('.disable-element').parentNode.style.opacity = '0.5';
   // }
   // if (document.getElementById('waf2').checked) {
   //    document.querySelector('.disable-element').classList.add('d-none')
   //    document.querySelector('.disable-element').parentNode.style.opacity = '1';
   // }
};
