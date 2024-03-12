var $timy= '-';
var ip_validation = true;



const ipDom = document.querySelector('.ipSelectedFirewall');
const countryDom = document.querySelector('.countrySelectedFr');

function validRequest() {
   let notValid = false;
   document.getElementById('ipErr').classList.add('d-none');
   document.getElementById('countryErr').classList.add('d-none');
   if (!ipDom.innerHTML.includes('div') && !countryDom.innerHTML.includes('div')) {
      if (!ipDom.innerHTML.includes('div'))
      document.getElementById('ipErr').classList.remove('d-none');
      if (!countryDom.innerHTML.includes('div'))
      document.getElementById('countryErr').classList.remove('d-none');
      return false;
   }
   return true;
}


function nullifier() {
   document.querySelectorAll('#addFirewallRule input').forEach(el => el.value = '');
   document.querySelectorAll('#addFirewallRule textarea').forEach(el => el.value = '');
   document.querySelectorAll('#addFirewallRule input[type="radio"]').forEach(el => el.checked = false);

   document.getElementById('show-firewall-country').innerHTML = `
      <span class="current-item fs-14"> کشور را انتخاب کنید  </span>
      <img class="imgexp img-collapse" src="/general/images/root/ico_arrow_down_disabled.svg">
   `;

   ipDom.innerHTML = 'ip های مورد نظر را در کادر بالا وارد کرده و کلید enter را بفشارید';
   // ipDom.classList.add('d-none');
   countryDom.innerHTML = '';
   countryDom.classList.add('d-none');

   document.getElementById('notallow').checked =true;
   document.getElementById('ipErr').classList.add('d-none');
   document.getElementById('countryErr').classList.add('d-none');
}

async function updateViewFirewallRules() {
   let body = new FormData();
   body.append("wid", $wid);
   const rest = await fetch("/submit/cdn/firewall/website/get-firewall-rules",
    {method: "POST", body: body}).then(res => res.text()).then(ponse => ponse).catch(ex => window.location.reload());
   
   document.getElementById('frs').innerHTML = rest;
}


async function addFirewallRules() {
   

   if (!validRequest()) return;
   document.getElementById('txtip-firewall').value = '';
   let ips = '';
   document.querySelectorAll('.ipSelectedFirewall .ip').forEach(e => ips +=','+ e.getAttribute('data-value'));
   let cts = '';
   let fullCts = '';
   document.querySelectorAll('.countrySelectedFr .country').forEach(e => {
      cts +=','+ e.getAttribute('data-country');
      fullCts +=','+ $countries[e.getAttribute('data-country')];
   });
   $('#sendFirewallRule').html('<img src="/general/loading/tail-spin.svg" />');
   $('#sendFirewallRule').attr('disabled', 'disabled');
   let body = new FormData();
   body.append("wid", $wid);
   body.append("status", document.getElementById('allow').checked ? "allow": "deny");
   body.append("countries", cts);
   body.append("ips", ips);
   body.append("caption", document.getElementById('txt-firewall-msg').value);
   const rest = await fetch("/submit/cdn/firewall/website/real-add-firewall-rules",
    {method: "POST", body: body}).then(res => res.json()).then(ponse => ponse).catch(ex => window.location.reload());
    $('#addFirewallRule').modal('hide');
    $('#sendFirewallRule:first').html('اضافه کردن');
    $('#sendFirewallRule:first').removeAttr('disabled');
   if (rest.status != "success") return showAlert("error", rest.message);
   showAlert(rest.status, rest.message);


   const TEXT = document.getElementById('txt-firewall-msg').value;
   const IPS = JSON.stringify(ips.replace(/(^,)|(,$)/g, "").split(','));
   const CTS = JSON.stringify(cts.replace(/(^,)|(,$)/g, "").split(','));
   const STATE = document.getElementById('allow').checked ? "allow": "deny";

   // document.getElementById('rulesSCS').innerHTML += `
   //    <tr  id="rule-row-${rest.id}">
   //       <td>
   //          <div class="accordion-item position-relative">
   //             <div class="d-flex firewall-table-row align-items-center accordion-button">
   //                   <div class="col-2 col-sm-2 position-relative">
   //                      <ul class="d-flex justify-content-center align-items-center list-unstyled mb-0 firewall-list fnlist">
   //                         <li class="remove-item" title="حذف" onclick="askDelete('${rest.id}')">
   //                               <a>
   //                                  <span><img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="حذف" class="sublink" src="/general/images/new/ico_delete.svg" alt=""></span>
   //                                  <span class="fnlist-title">حذف </span>
   //                               </a>
   //                         </li>
   //                         <li title="ویرایش" onclick='editFirewall( \`${TEXT}\`, \`${IPS}\`, \`${CTS}\`, \`${STATE}\`, \`${rest.id}\`)'>
   //                               <a>
   //                                  <span><img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="ویرایش" class="sublink" src="/general/images/new/ico_manage.svg" alt=""></span>
   //                                  <span class="fnlist-title">ویرایش </span>
   //                               </a>
   //                         </li>
   //                      </ul>
   //                      <span class="fnlist-options">
   //                         <img src="/general/images/root/topMenu/ico_dotted_ico.svg">
   //                      </span>
   //                   </div>
   //                   <div class="col-10 col-sm-7 firewall-traffic-src">
   //                      <div class="">
   //                         <span id="iprcid">
   //                               ${ips}
   //                         </span>
   //                         <span id="ctrcid">
   //                               ${cts}
   //                         </span>
   //                      </div>
   //                   </div>
   //                   <div class="col-sm-3 firewall-desc">
   //                      <p class="fs-12 fw-400 mb-0 tl ellipsis">${TEXT}</p>
   //                   </div>
   //             </div>
   //          </div>
   //       </td>
   //    </tr>
   //    `;



      deteteble.row.add( [
         `
         <div class="accordion-item position-relative" id="parentDelete-${rest.id}">
               <div class="d-flex firewall-table-row align-items-center accordion-button">
                     <div class="col-2 col-sm-2 position-relative">
                        <ul class="d-flex justify-content-center align-items-center list-unstyled mb-0 firewall-list fnlist">
                           <li class="remove-item" title="حذف" onclick="askDelete('${rest.id}')">
                                 <a>
                                    <span><img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="حذف" class="sublink" src="/general/images/new/ico_delete.svg" alt=""></span>
                                    <span class="fnlist-title">حذف </span>
                                 </a>
                           </li>
                           <li title="ویرایش" onclick='editFirewall( \`${TEXT}\`, \`${IPS}\`, \`${CTS}\`, \`${STATE}\`, \`${rest.id}\`)'>
                                 <a>
                                    <span><img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="ویرایش" class="sublink" src="/general/images/new/ico_manage.svg" alt=""></span>
                                    <span class="fnlist-title">ویرایش </span>
                                 </a>
                           </li>
                        </ul>
                        <span class="fnlist-options">
                           <img src="/general/images/root/topMenu/ico_dotted_ico.svg">
                        </span>
                     </div>
                     <div class="col-10 col-sm-7 firewall-traffic-src">
                        <div class="">
                           <span id="iprcid">
                                 ${ips.replace(/^,|,$/g,'')}
                           </span>
                           <span id="ctrcid">
                                 ${fullCts.replace(/^,|,$/g,'')}
                           </span>
                        </div>
                     </div>
                     <div class="col-sm-3 firewall-desc">
                        <p class="fs-12 fw-400 mb-0 tl ellipsis">${TEXT}</p>
                     </div>
               </div>
            </div>
         `
     ] ).draw( false );

      setTimeout(() => {
         railAnimText();
         if(rest.status === "success")
            document.querySelector('.dataTables_empty').parentNode.classList.add('d-none');
      }, 200);

}

async function editFirewallRules(ruid) {
   
   if (!validRequest()) return;
   
   document.getElementById('txtip-firewall').value = '';
   let ips = '';
   document.querySelectorAll('.ipSelectedFirewall .ip').forEach(e => ips +=','+ e.getAttribute('data-value'));
   let cts = '';
   let fullCts = '';
   document.querySelectorAll('.countrySelectedFr .country').forEach(e => {
      cts +=','+ e.getAttribute('data-country');
      fullCts +=','+ $countries[e.getAttribute('data-country')];
   });
   $('#sendFirewallRule').html('<img src="/general/loading/tail-spin.svg" />');
   $('#sendFirewallRule').attr('disabled', 'disabled');
   let body = new FormData();
   body.append("wid", $wid);
   body.append("status", document.getElementById('allow').checked ? "allow": "deny");
   body.append("countries", cts);
   body.append("ips", ips);
   body.append("updid", ruid);
   
   body.append("caption", document.getElementById('txt-firewall-msg').value);
   const rest = await fetch("/submit/cdn/firewall/website/add-firewall-rules",
    {method: "POST", body: body}).then(res => res.json()).then(ponse => ponse).catch(ex => window.location.reload());
    $('#addFirewallRule').modal('hide');
    $('#sendFirewallRule:first').html('اضافه کردن');
    $('#sendFirewallRule:first').removeAttr('disabled');
    showAlert(rest.status, rest.message);
   

   if (rest.status != "success") return;
   

   const TEXT = document.getElementById('txt-firewall-msg').value;
   const IPS = JSON.stringify(ips.replace(/(^,)|(,$)/g, "").split(','));
   const CTS = JSON.stringify(cts.replace(/(^,)|(,$)/g, "").split(','));
   const STATE = document.getElementById('allow').checked ? "allow": "deny";
   // document.getElementById('rule-row-'+ruid).innerHTML = `
   //       <td>
   //          <div class="accordion-item position-relative">
   //             <div class="d-flex firewall-table-row align-items-center accordion-button">
   //                   <div class="col-2 col-sm-2 position-relative">
   //                      <ul class="d-flex justify-content-center align-items-center list-unstyled mb-0 firewall-list fnlist">
   //                         <li class="remove-item" title="حذف" onclick="askDelete('${ruid}')">
   //                               <a>
   //                                  <span><img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="حذف" class="sublink" src="/general/images/new/ico_delete.svg" alt=""></span>
   //                                  <span class="fnlist-title">حذف </span>
   //                               </a>
   //                         </li>
   //                         <li title="ویرایش" onclick='editFirewall( \`${TEXT}\`, \`${IPS}\`, \`${CTS}\`, \`${STATE}\`, \`${ruid}\`)'>
   //                               <a>
   //                                  <span><img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="ویرایش" class="sublink" src="/general/images/new/ico_manage.svg" alt=""></span>
   //                                  <span class="fnlist-title">ویرایش </span>
   //                               </a>
   //                         </li>
   //                      </ul>
   //                      <span class="fnlist-options">
   //                         <img src="/general/images/root/topMenu/ico_dotted_ico.svg">
   //                      </span>
   //                   </div>
   //                   <div class="col-10 col-sm-7 firewall-traffic-src">
   //                      <div class="">
   //                         <span id="iprcid">
   //                               ${ips}
   //                         </span>
   //                         <span id="ctrcid">
   //                               ${cts}
   //                         </span>
   //                      </div>
   //                   </div>
   //                   <div class="col-sm-3 firewall-desc">
   //                      <p class="fs-12 fw-400 mb-0 tl ellipsis">IP BLOCKED</p>
   //                   </div>
   //             </div>
   //          </div>
   //       </td>
   
   //    `; 
      if(document.getElementById('rule-row-'+ ruid))
         deteteble.row(document.getElementById('rule-row-'+ ruid)).remove().draw();
         

      if(document.getElementById('parentDelete-'+ ruid))
         deteteble.row(document.getElementById('parentDelete-'+ ruid).parentNode.parentNode).remove().draw();
   
   let row = deteteble.row.add( [
   `
      <div class="accordion-item position-relative" id="parentDelete-${rest.id}">
      <div class="d-flex firewall-table-row align-items-center accordion-button">
            <div class="col-2 col-sm-2 position-relative" >
               <ul class="d-flex justify-content-center align-items-center list-unstyled mb-0 firewall-list fnlist">
                  <li class="remove-item" title="حذف" onclick="askDelete('${rest.id}')">
                        <a>
                           <span><img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="حذف" class="sublink" src="/general/images/new/ico_delete.svg" alt=""></span>
                           <span class="fnlist-title">حذف </span>
                        </a>
                  </li>
                  <li title="ویرایش" onclick='editFirewall( \`${TEXT}\`, \`${IPS}\`, \`${CTS}\`, \`${STATE}\`, \`${rest.id}\`)'>
                        <a>
                           <span><img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="ویرایش" class="sublink" src="/general/images/new/ico_manage.svg" alt=""></span>
                           <span class="fnlist-title">ویرایش </span>
                        </a>
                  </li>
               </ul>
               <span class="fnlist-options">
                  <img src="/general/images/root/topMenu/ico_dotted_ico.svg">
               </span>
            </div>
            <div class="col-10 col-sm-7 firewall-traffic-src">
               <div class="">
                  <span id="iprcid">
                        ${ips.replace(/^,|,$/g,'')}
                  </span>
                  <span id="ctrcid">
                        ${fullCts.replace(/^,|,$/g,'')}
                  </span>
               </div>
            </div>
            <div class="col-sm-3 firewall-desc">
               <p class="fs-12 fw-400 mb-0 tl ellipsis">${TEXT}</p>
            </div>
      </div>
   </div>
   `
   ] ).draw();
   // row.nodes().to$().attr('id', 'rule-row-'+ rest.id);
   // deteteble.draw( false );
   // console.log('row ',row.node()._DT_RowIndex);
   
   

   $('.firewall-desc p').each(function (index) {
      for (var i = 0; i < $(this).text().length; ++i) {
          if (i > 35) {
              $(this).addClass('railanim')
          }
      }
  });

  $('.firewall-traffic-src > div').each(function (index) {
      for (var i = 0; i < $(this).find('span').length; ++i) {
          if (i > 18) {
              $(this).addClass('railanim')
          }
      }
  });

}

document.getElementById('txtip-firewall').addEventListener("keyup", () => {
   document.getElementById('ipErr').classList.add('d-none');
   document.getElementById('countryErr').classList.add('d-none');
   // if (!ipDom.innerHTML.includes('div')) ipDom.classList.add('d-none');
   if (!countryDom.innerHTML.includes('div')) countryDom.classList.add('d-none');
});

document.getElementById('show-firewall-country').addEventListener("click", () => {
   document.getElementById('ipErr').classList.add('d-none');
   document.getElementById('countryErr').classList.add('d-none');
   // if (!ipDom.innerHTML.includes('div')) ipDom.classList.add('d-none');
   if (!countryDom.innerHTML.includes('div')) countryDom.classList.add('d-none');
});



function askDelete(delid) {
   myDeleteSWA(() => deleteRule(delid), 'اخطار', 'آیا مایلید قانون فایروال را حذف کنید؟');
}

async function deleteRule(delid) {
   let rBody = new FormData();
   rBody.append("wid", $wid);
   rBody.append("delid", delid);
   const res = await fetch("/submit/cdn/firewall/website/delete-firewall",
    { method: "POST", body: rBody}).then(r=>r.json()).then(j=>j).catch(ex => window.location.reload());
   showAlert(res.status, res.message);
   if(res.status !== "success") return;
   if(document.getElementById('rule-row-'+ delid))
      deteteble.row(document.getElementById('rule-row-'+ delid)).remove().draw();
   if(document.getElementById('parentDelete-'+ delid))
      deteteble.row(document.getElementById('parentDelete-'+ delid).parentNode.parentNode).remove().draw();
}

function firewallEdit() {
   let jdata = JSON.parse(document.getElementById('jdata').innerHTML);
   if(jdata.ip){
   console.log(jdata);
   document.getElementById('txt-firewall-msg').value = jdata.desc ?? '';
   jdata.ip.forEach(i => {
         if (i == '') return;
         if(!document.querySelector('.ipSelectedFirewall .ip') && !ipDom.innerHTML.includes('div')) {
            document.querySelector('.ipSelectedFirewall').innerHTML = '';
         }
       document.querySelector('.ipSelectedFirewall').innerHTML += `
            <div class="ip" data-value="${i}"><i class="remove-ip"><img title="حذف" src="/general/images/root/ico_menu_close.svg"></i>${i}</div>
       `;});
       if (ipDom.innerHTML.includes('div')) ipDom.classList.remove('d-none');
   }
   if(jdata.countries) {
   jdata.countries.forEach(i => {
      if (i == '') return;
   
      document.querySelector('.countrySelectedFr').innerHTML += `
            <div class="country " data-country="${i}" data-value="${i}">${document.querySelector('li[data-value="'+i+'"]').innerText}<i class="remove-country"><img title="حذف" src="/general/images/root/ico_menu_close.svg"></i></div>
      `;});
      if (countryDom.innerHTML.includes('div')) countryDom.classList.remove('d-none');
   }
   if (jdata.default){
   if (jdata.default == "allow") document.getElementById('allow').checked = true;
   if (jdata.default != "allow") document.getElementById('notallow').checked = true;
   }
}

function editFirewall(desc = false, l3addr = false, gloc = false, act = false, ruid = false) {
   nullifier();
   

   if(ruid) {
         setTimeout(() => {
            if(JSON.parse(l3addr)[0] != "") {
               document.querySelector('.ipSelectedFirewall').innerHTML = '';
               JSON.parse(l3addr).forEach(ip => 
               {
                  console.log(ip);
                  if(ip){
                     document.querySelector('.ipSelectedFirewall').innerHTML += `
                        <div class="ip" data-value="${ip}">
                           <i class="remove-ip">
                              <img title="حذف" src="/general/images/root/ico_menu_close.svg">
                           </i>
                              ${ip}
                        </div>
                     `;
                  }
               });
            }
            if(JSON.parse(gloc)[0] != "") {
               document.querySelector('.countrySelectedFr').innerHTML = '';
               JSON.parse(gloc).forEach(ct => 
               {
                  console.log(ct);
                  if(ct) 
                     document.querySelector('.countrySelectedFr').innerHTML += `
                        <div class="country " data-country="${ct}" data-value="${ct}">
                           ${document.querySelector('li[data-value="'+ct+'"]').innerText}
                           <i class="remove-country">
                              <img title="حذف" src="/general/images/root/ico_menu_close.svg">
                           </i>
                        </div>
                     `;
               });
            }
            document.getElementById('txt-firewall-msg').value = desc;
            if (ipDom.innerHTML.includes('div')) ipDom.classList.remove('d-none');
            if (countryDom.innerHTML.includes('div')) countryDom.classList.remove('d-none');
            console.log('act', act);
            if (act === 'allow') {
               document.getElementById('notallow').checked = false;
               document.getElementById('allow').checked = true;
            } else {
               document.getElementById('allow').checked = false;
               document.getElementById('notallow').checked = true;
            }
         }, 100);   
         document.getElementById('sendFirewallRule').setAttribute('onclick', `editFirewallRules(${ruid})`);
      }else{
         document.getElementById('sendFirewallRule').setAttribute('onclick', `addFirewallRules()`);
      }
         $("#addFirewallRule").modal("show");
         setTimeout(() => {
            $(".scroll-fix-height").css({
               position:   'absolute', // Optional if #dataCenteroption is already absolute
               visibility: 'hidden',
               display:    'block'
            });
            setTimeout(() => {
               $(".scroll-fix-height").attr("style", 'display: none');
            }, 300);
      }, 200);
}
let iip, iid;
async function blockUserIp(ip = iip) {
   let rbody = new FormData();
   rbody.append("wid", $wid);
   rbody.append("ip", ip);
   const rest = await fetch("/submit/cdn/firewall/website/add-firewall-rules",
   { method:"POST", body: rbody }).then(res => res.json()).then(ponse => ponse).catch(ex => window.location.reload());
   showAlert(rest.status, rest.message);
   if (rest.status === "success") {
   // document.querySelector('#table_firewall_ip .dataTables_empty')?.remove();
   // let nn = ip.replace(/\./g,'-');
   // $(`#${nn}`).slideUp(700, $(`#${ip.replace(/\./g,'-')}`).remove());
   // document.querySelector('#table_firewall_ip tbody tr td .emptystate-wrap').remove();
   }
}

function askBlockUserIp(ip) {
   iip = ip
   // mySWA(blockUserIp, "اخطار", `آیا از بلاک ${ip} اطمینان دارید؟`);
   mySWA(blockUserIpNew, "اخطار", `آیا از بلاک ${ip} اطمینان دارید؟`);
}



async function unblockUserIp(id = iid,ip=iip) {
   let rbody = new FormData();
   rbody.append("wid", $wid);
   rbody.append("id", id);
   const rest = await fetch("/submit/cdn/firewall/website/unblock-ip",
   { method:"POST", body: rbody }).then(res => res.json()).then(ponse => ponse).catch(ex => window.location.reload());
   showAlert(rest.status, rest.message);
   if (rest.status === "success")
   $('#trblk-'+id).slideUp(500,function(){ this.remove() });
   console.log(rest);
   // if (document.querySelector('#table_firewall_ip tbody tr td').classList.includes('dataTables_empty'))
   //    document.querySelector('#table_firewall_ip tbody tr td').classList.remove('dataTables_empty')
 
   var ip=iip.replace(".", "-");
   var tmp=`
         <div class="accordion-item position-relative" id="${ip}">
            <div class="d-flex firewall-table-row align-items-center accordion-button">
               <div class="col-4 firewall-ip-col">
                     <span>${iip}</span>
               </div>
               <div class="col-4 text-center">
                     <span>--</span>
               </div>
               <div class="col-4 block-col tl">
                     <button onclick="askBlockUserIp('${iip}')" 
                     class="btn bg-grd-pink-350-to-orange-300-80 border-0 rounded-pill btn-sm px-4-5 py-1 fs-14 ls-02 fw-500 text-white">
                        بلاک
                     </button>
               </div>
            </div>
         </div>
        `;
         $("#firewallVisitors").prepend(tmp)
}


function askUnblockUserIp(id, ip) {
   iip = ip
   iid = id
   mySWA(unblockUserIp, "اخطار", `آیا از آنبلاک ${iip} اطمینان دارید؟`);
}




async function afterloadIpListSection() {
   let rbody = new FormData();
   rbody.append("wid", $wid);
   rbody.append("website", $website);
   rbody.append("did", $did);
   rbody.append("domain", $domain);
   document.getElementById('fetcher2').classList.remove('d-none');
   const rest = await fetch("/submit/cdn/firewall/website/afterload-ip",
   { method:"POST", body: rbody }).then(res => res.text()).then(ponse => ponse).catch(ex => window.location.reload());
   
   document.getElementById('fetcher2').classList.add('d-none');
   document.getElementById('afterLoad1').innerHTML = rest;
}
afterloadIpListSection();








async function blockUserIpNew(ip = iip) {

      let body = new FormData();
      body.append("wid", $wid);
      body.append("status", "deny");
      body.append("countries", "");
      body.append("ips", ip);
      body.append("caption", "");
      const rest = await fetch("/submit/cdn/firewall/website/real-add-firewall-rules",
       {method: "POST", body: body}).then(res => res.json()).then(ponse => ponse).catch(ex => window.location.reload());
      showAlert(rest.status, rest.message);
      if (rest.status != "success") return;
      if (!document.getElementById('rulesSCS')) return window.location.reload();
      // document.getElementById('rulesSCS').innerHTML += `
      // <tr id="rule-row-${rest.id}">
      //    <td>
      //       <div class="accordion-item position-relative">
      //          <div class="d-flex firewall-table-row align-items-center accordion-button">
      //                <div class="col-2 col-sm-2 position-relative">
      //                   <ul class="d-flex justify-content-center align-items-center list-unstyled mb-0 firewall-list fnlist">
      //                      <li class="remove-item" title="حذف" onclick="askDelete('${rest.id}')">
      //                            <a>
      //                               <span><img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="حذف" class="sublink" src="/general/images/new/ico_delete.svg" alt=""></span>
      //                               <span class="fnlist-title">حذف </span>
      //                            </a>
      //                      </li>
      //                      <li title="ویرایش" onclick='editFirewall("IP BLOCKED", \`["${ip}"]\`, [""], "deny", "${rest.id}")'>
      //                            <a>
      //                               <span><img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="ویرایش" class="sublink" src="/general/images/new/ico_manage.svg" alt=""></span>
      //                               <span class="fnlist-title">ویرایش </span>
      //                            </a>
      //                      </li>
      //                   </ul>
      //                   <span class="fnlist-options">
      //                      <img src="/general/images/root/topMenu/ico_dotted_ico.svg">
      //                   </span>
      //                </div>
      //                <div class="col-10 col-sm-7 firewall-traffic-src">
      //                   <div class="">
      //                      <span id="iprcid">
      //                            ${ip}
      //                      </span>
      //                      <span id="ctrcid">
                                 
      //                      </span>
      //                   </div>
      //                </div>
      //                <div class="col-sm-3 firewall-desc">
      //                   <p class="fs-12 fw-400 mb-0 tl ellipsis">IP BLOCKED</p>
      //                </div>
      //          </div>
      //       </div>
      //    </td>
      // </tr>
      // `;

      deteteble.row.add( [
         `
         <div class="accordion-item position-relative" id="parentDelete-${rest.id}">
               <div class="d-flex firewall-table-row align-items-center accordion-button">
                     <div class="col-2 col-sm-2 position-relative">
                        <ul class="d-flex justify-content-center align-items-center list-unstyled mb-0 firewall-list fnlist">
                           <li class="remove-item" title="حذف" onclick="askDelete('${rest.id}')">
                                 <a>
                                    <span><img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="حذف" class="sublink" src="/general/images/new/ico_delete.svg" alt=""></span>
                                    <span class="fnlist-title">حذف </span>
                                 </a>
                           </li>
                           <li title="ویرایش" onclick='editFirewall( "", \`${ip}\`, "", "deny", \`${rest.id}\`)'>
                                 <a>
                                    <span><img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="ویرایش" class="sublink" src="/general/images/new/ico_manage.svg" alt=""></span>
                                    <span class="fnlist-title">ویرایش </span>
                                 </a>
                           </li>
                        </ul>
                        <span class="fnlist-options">
                           <img src="/general/images/root/topMenu/ico_dotted_ico.svg">
                        </span>
                     </div>
                     <div class="col-10 col-sm-7 firewall-traffic-src">
                        <div class="">
                           <span id="iprcid">
                                 ${ip}
                           </span>
                           <span id="ctrcid">
                                 
                           </span>
                        </div>
                     </div>
                     <div class="col-sm-3 firewall-desc">
                        <p class="fs-12 fw-400 mb-0 tl ellipsis"></p>
                     </div>
               </div>
            </div>
         `
     ] ).draw( false );
      // document.querySelector('.dataTables_empty').parentNode.classList.add('d-none');
}








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
document.getElementById('txtip-firewall').addEventListener("keyup", (ki) => {
   document.getElementById('ipErr').classList.add('d-none');
   document.getElementById('txtip-firewall').classList.remove('alert-danger-border');
   if (ki.key === "Enter") {
      if (!checkIP('txtip-firewall')) { 
         document.getElementById('txtip-firewall').classList.add('alert-danger-border');
         return document.getElementById('ipErr').classList.remove('d-none');
      }
      if(!document.querySelector('.ipSelectedFirewall .ip')) {
         document.querySelector('.ipSelectedFirewall').innerHTML = '';
      }
      let ip_value  = document.getElementById('txtip-firewall').value;
      $("div[data-value='"+ip_value.trim()+"']").remove();
      $('.ipSelectedFirewall:first').append('<div class="ip" data-value="'+ip_value.trim()+'"><i class="remove-ip"><img title="حذف" src="/general/images/root/ico_menu_close.svg"></i>'+ip_value.trim()+'</div>');
      $('#txtip-firewall').val('');
      if($('.ipSelectedFirewall:first .ip').length > 0  || ip_value !== ' ') {
          $('.ipSelectedFirewall:first').removeClass('d-none');
      } else {
          $('.ipSelectedFirewall:first').removeClass('d-none');
      }

      $(this).val(' ');  
      
   }
})











function changeStateUri(state, newDomain, newDomainid, newWebsite, newWebsiteid) {
   const uri = `/cdn/${newDomain}/${newDomainid}/${newWebsite}/${newWebsiteid}/firewall`;
   window.history.pushState(state, title, uri);
   document.title = `Client Mizban | Firewall`;
   $domain = newDomain;
   $did = newDomainid;
   $website = newWebsite;
   $wid = newWebsiteid;
   let dDom = document.querySelectorAll('.domainDom');
   let wDom = document.querySelectorAll('.websiteDom');
   dDom.forEach(dom => dom.innerHTML = newDomain);
   wDom.forEach(dom => dom.innerHTML = newWebsite);
   setSpaData();
   urlStateShifter($domain,$did,$website,$wid);
}

async function setSpaData() {

   // jqSlide();
   document.querySelectorAll('#fetcher').forEach(el => el.classList.remove('d-none'));
   await (async() => {
   spaSec1();
   spaSec2();
   afterloadIpListSection();
   })();

   // endJqSlide();
   // let rBody = new FormData();
   // rBody.append("wid", $wid);
   // const result = await fetch("/submit/cdn/cache/website/spa-data", {method:"POST", body: rBody})
   // .then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
   // console.log('riz', result);
   // AOSwitch.checked = result.switches.alwaysOnline == "1";
   // DVSwitch.checked = result.switches.developerMode == "1";
   
   // document.querySelector('#showinfocache .current-item').innerHTML = (((result.switches.cacheTtl.serverttl).replace("h", " ساعت")).replace("m", " دقیقه")).replace("s", " ثانیه");
   // document.querySelector('#showcachebrowser .current-item').innerHTML = (((result.switches.cacheTtl.browserttl).replace("h", " ساعت")).replace("m", " دقیقه")).replace("s", " ثانیه");
   // document.querySelector('.active_cdn').classList.remove('active_cdn');
   // document.getElementById('c' + result.switches.cacheTtl.cachetype + 'c' + result.switches.cacheTtl.cachetype).classList.add('active_cdn');
   // cacsheCards.forEach(i => i.classList.add('d-none'));
}






   // setTimeout(() => {
   //    if(document.querySelectorAll('#table_firewall_ip tr').length < 6) {
   //       document.getElementById('table_firewall_ip_paginate').style.display = 'none';
   //       console.log(document.getElementById('table_firewall_ip_paginate').style.display)
   //    }
   // }, 1000);



   function jqSlide() {
      
      $('#sec1').slideUp(1000);

      $('#sec2').slideUp(1000);

      $('#afterLoad1').slideUp(1000);

   }

   function endJqSlide() {

      $('#sec1').slideDown(1000);
      
      $('#sec2').slideDown(1000);

      $('#afterLoad1').slideDown(1000);

   }


   async function spaSec1() {
      let rBody = new FormData();
      rBody.append("wid", $wid);
      const result = await fetch("/submit/cdn/firewall/website/load-section-1", {method:"POST", body: rBody})
      .then(r => r.text()).then(rj => rj).catch(ex => window.location.reload());
      console.log('riz', result);
      document.getElementById('frs').innerHTML = result;
      deteteble.destroy();
      deteteble = $("#table-firewall").DataTable(
         { 
             "destroy": true,
             "pageLength": 5, 
             "pagingType": "simple_numbers",
             "bInfo" : false,
             "lengthChange": false,
             language: { 
                 search: "",
                 zeroRecords: `<div class="emptystate-wrap">
                      <div class="empty-state-image text-center">
                          <img src="/general/images/emptystate/img_empty_records.png" alt="">
                      </div>
                      <p class="text-center emptydoc emptyState-text mb-5 mt-3" id="emptydoc">رکورد مطابقی یافت نشد</p>
                  </div>`,
             },
            "emptyTable":`<div class="emptystate-wrap">
                     <div class="empty-state-image text-center">
                         <img src="/general/images/emptystate/img_empty_records.png" alt="">
                     </div>
                     <p class="text-center emptydoc emptyState-text mb-5 mt-3" id="emptydoc">شما قانونی ایجاد نکردید</p>
                 </div>`,
            "order": []
         }
     );
     $('.dataTables_filter input').addClass('searchbox my-0 border rounded-pill text-start w-100 fs-12  bg-white ws-10  border-1 px-4'); // <-- add this line
     $('.dataTables_filter input').attr("placeholder", "جستجو");
     if($("#table-firewall tbody tr").length <= 5)
     $("#table-firewall_paginate").addClass("d-none")
         else
     $("#table-firewall_paginate").removeClass("d-none")
   }

   async function spaSec2() {
      // let rBody = new FormData();
      // rBody.append("wid", $wid);
      // const result = await fetch("/submit/cdn/firewall/website/load-section-2", {method:"POST", body: rBody})
      // .then(r => r.text()).then(rj => rj).catch(ex => window.location.reload());
      // console.log('riz', result);
      // document.getElementById('sec2').innerHTML = result;
   }






async function changeMode(allow) {
   const status = allow ? 'allow' : 'deny';
   const path = '/submit/cdn/firewall/website/default';
   const method = "POST";
   let body = new FormData();
   body.append("wid", $wid);
   body.append("default", status);
   
   const resp = await fetch( path, { method, body } )
   .then( res => res.json() )
   .then( k => k )
   //.catch( ex => window.location.reload() )

   showAlert(resp.status, resp.message);
}




async function searchVisitor(ipAddress) {
   if(ipAddress === null || ipAddress === "" || ipAddress === false || !ipAddress) {
      return afterloadIpListSection();
   }
        document.querySelector('#fetcher2').classList.remove('d-none');
   const path = '/submit/cdn/firewall/website/search';
   const method = "POST";
   let body = new FormData();
   body.append("wid", $wid);
   body.append("website", $website);
   body.append("domain", $domain);
   body.append("did", $did);
   body.append("address", ipAddress);
   body.append("time", timeRangeIp);
   
   const resp = await fetch( path, { method, body } )
   .then( res => res.json() )
   .then( k => k )
   //.catch( ex => window.location.reload() )
   console.log(resp);
           document.querySelector('#fetcher2').classList.add('d-none');
   if(resp.status === "success") {
      document.getElementById('firewallVisitors').parentNode.innerHTML = `
      
      <div class="accordion-item position-relative" id="search-result-ip">
      <div class="d-flex firewall-table-row align-items-center accordion-button">


         <div class="col-2 col-sm-4 block-col px-3-5">
               <button class="border-0 line-h-1" onclick="askBlockUserIp('${ipAddress}')">
                   <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="بلاک کردن آی پی" src="/general/images/cloud/server/ic_hint.svg" alt="">
               </button>
         </div>
         <div class="col-4 col-sm-4 text-center">
            <span class="d-block line-h-1">${resp.data}</span>
         </div>
         <div class="col-6 col-sm-4 firewall-ip-col tl px-3">
            <span class="d-block line-h-1">${ipAddress}</span>
      </div>
      </div>
      </div>

      `;
      if(document.getElementById('firewallVisitors-last'))
      document.getElementById('firewallVisitors-last').remove();
   } else {
      document.getElementById('firewallVisitors').parentNode.innerHTML = `
         <div class="text-center"> نتیجه ای یافت نشد. </div>
      `;
      if(document.getElementById('firewallVisitors-last'))
      document.getElementById('firewallVisitors-last').remove();
   }
   
}