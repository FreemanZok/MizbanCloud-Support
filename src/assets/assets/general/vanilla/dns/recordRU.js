var $rid;let wasBalance = false;
async function addDnsRecord(rBody) {
   let cluster = '';
   document.getElementById('sendRecord').innerHTML = `<img src="/general/loading/tail-spin.svg"/>`;
   document.getElementById('sendRecord').setAttribute("disabled", "disabled");
   const response = await fetch("/submit/dns/add-record", {
      method: "POST",
      body: rBody
   }).then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
   
   if (response.status === "success") {
      recErr = undefined;
      recSucc = response.message;
      showAlert("success", recSucc);
      if(document.getElementById('heading-record-titles')?.classList.contains('d-none')) {
         document.getElementById('heading-record-titles')?.classList.remove('d-none');
      }
      if(!document.querySelector('.emptystate-wrap')?.classList.contains('d-none')) {
         document.querySelector('.emptystate-wrap')?.classList.add('d-none');
      }
      if(document.getElementById('empTstt')) document.getElementById('empTstt').innerHTML = '';
      if(document.getElementById('DnsrecordList-'+response.id)){
         document.getElementById('DnsrecordList-'+response.id).remove();

         
         cluster = `
         <li><img onclick="editRec('${$domain}','${$did}','${response.id}')" src="/general/images/new/ico_cluster_manage.svg" class="img-operation-list nomargin"></li>
         `;
      }
   } else {
      recSucc = undefined;
      recErr = response.message;
      showAlert("err", recErr);
   }
   document.getElementById('sendRecord').innerHTML = `افزودن رکورد`;
   document.getElementById('sendRecord').removeAttribute("disabled");

   document.getElementById('emptyStat')?.remove();

   var addData = {};
   rBody.forEach(function(value, key){
      addData[key] = value;
   });
   return {
      id: response.id,
      cluster: cluster,
      msh: addData,
      status: response.status
   }
}

function returnRecords1(recordtype, cdnstatus, recordname, recordip, ttl, id, otherrecords, domainname, domainid, balanaceID, fullData) {
   if(recordname !== $domain  && recordname.includes('.')) {
   recordname = recordname.substr(-1) === "." ? recordname.substr(0, recordname.length - 1) : recordname;
      if(recordname !== $domain  && recordname.includes('.')) {
         recordname = recordname.substr(-$domain.length) === $domain ? recordname.substr(0, recordname.length - $domain.length ): recordname;
         recordname = recordname.substr(-1) === "." ? recordname.substr(0, recordname.length - 1): recordname;
      }
   }
   if(recordname === "@") recordname = $domain;

   console.log("balanaceID is",balanaceID);
   console.log(fullData);
   let balancetag = "";
   if ( balanaceID == "balance") {
      balancetag += 
      `<li>
      <img onclick="editRec('${domainname}', '${domainid}','${id}')" src="/general/images/new/ico_cluster_manage.svg" class="img-operation-list nomargin">
      <input type="hidden" id="hidden-record-cluster-${id}" value="balance" wfd-invisible="true">
      </li>`;
   } else {
      balancetag += '';
   }
   
   
   var valstat;
   if(cdnstatus==0){
      cdnstatus="in";
      valstat = 0;
   }
   else{
         cdnstatus="";
         valstat = 1;
   }
   var plusdata = "";

   imagedata = "";
   if (typeof fullData['protocol'] !== 'undefined') {
      if ( fullData['protocol'].toLowerCase() == 'automatic' ) {
         plusdata += `<input type="hidden" id="hidden-protocol-status-${id}" value="${fullData['protocol']}">`;
      } else if ( typeof fullData['port'] != 'undefined' && fullData['port'] &&  typeof fullData['protocol']  != 'undefined' && fullData['protocol']  && (fullData['protocol']).toLowerCase() != 'automatic' ) {
         plusdata += `<input type="hidden" id="hidden-port-status-${id}" value="${fullData['port']}">`;
         plusdata += `<input type="hidden" id="hidden-protocol-status-${id}" value="${fullData['protocol']}">`;
      }
   } 

   if ( recordtype == "A" || recordtype == "AAAA" || recordtype == "ANAME" || recordtype == "CNAME" ) {
      if ( recordtype == "A" && balanaceID == "balance" ) {
         imagedata = `<img class="cloud-disabled" src="/general/images/new/ico_${cdnstatus}active_features.svg" cdn="true">
         <input type="hidden" id="hidden-cloud-status-${id}" value="${valstat}">`;
      } else if ( recordtype == "A" && balanaceID != "balance" ) {
         imagedata = `<img onclick="ChangeCloudStatus('${id}',this)" src="/general/images/new/ico_${cdnstatus}active_features.svg" cdn="true">
         <input type="hidden" id="hidden-cloud-status-${id}" value="${valstat}">`;
      } else {
         imagedata = `<img onclick="ChangeCloudStatus('${id}',this)" src="/general/images/new/ico_${cdnstatus}active_features.svg" cdn="true">
         <input type="hidden" id="hidden-cloud-status-${id}" value="${valstat}">`;
      }
   } else {
      imagedata = `<img src="/general/images/new/ico_inactive_features.svg" class="cloud-disabled">`;
   }

   if ( otherrecords == "" ) {
         
   } else {
      const words = otherrecords.split('-');
      if ( words.length > 1 ) {
         plusdata += 
         `<span class="btn btn-blue-100 border-0 rounded-pill fs-13 fw-400 record-other-wrap">
            <span>${words[0]}</span>-<span>${words[1]}</span>-<span>${words[2]}</span>-<span class="fs-20 line-h-1 dots">...</span>
            <input type="hidden" id="hidden-record-protocol-${id}" value="${words[3]}">
            <input type="hidden" id="hidden-record-priority-${id}" value="${words[2]}">
            <input type="hidden" id="hidden-record-port-${id}" value="${words[0]}">
            <input type="hidden" id="hidden-record-weight-${id}" value="${words[1]}">
         </span>`
      } else {
         plusdata += 
         `<span class="btn btn-blue-100 border-0 rounded-pill fs-13 fw-400 record-other-wrap">
            <span>${words[0]}</span><span class="fs-20 line-h-1 dots m-0"></span>
            <input type="hidden" id="hidden-record-priority-${id}" value="${words[0]}">
         </span>`
      }
   }
   if (ttl == '0') {
      ttl = 'اتوماتیک';
   } else {
      if ( ttl < 3600 ) {
         ttl = ttl / 60;
         ttl += " دقیقه" ;
      } else {
         ttl = ttl / 3600;
         ttl += " ساعت" ;
      }
   }
   const coppier = ``;
   // <span data-bs-toggle="tooltip" data-bs-placement="top" 
   //     title="کپی در حافظه" 
   //     data-bs-original-title="کپی در حافظه" 
   //     class="img-ico-wrap" 
   //     onclick="CopyDiv('record_name-${id}')">
   //     <img src="/general/images/new/ico_copy.svg" class="img-ico-copy">
   // </span>
   // `;
   var template = 
   `<div class="accordion-item DnsrecordList" id="DnsrecordList-${id}">
         <button class=" text-center accordion-button w-100 collapsed" type="button" data-bs-toggle="collapse" 
         data-bs-target="#active-flush-collapse-${id}" aria-expanded="false" aria-controls="active-flush-collapse-${id}">
            <div id="cloud_status-1" class="col-1 fs-13 fw-400">
               ${imagedata}
            </div>
            <div id="record_type-${id}" class="col-1 fs-13 fw-400">
               ${recordtype}
            </div>
            <input type="hidden" id="hidden-record-type-${id}" value="${recordtype}">
            <div id="record_name-${id}" class="col-2 fs-13 fw-400 text-lowercase">
               ${recordname.toLowerCase()}
               ${coppier}
            </div>
            <input type="hidden" id="hidden-record-name-${id}" value="${recordname.toLowerCase()}">
            <div id="record_content-${id}" class="col-3 fs-13 fw-400">
               <p class="mb-0 record_content_truncate" title="${recordip}">
                     ${recordip}
               </p>
            </div>
            <input type="hidden" id="hidden-record-ip-${id}" value="${recordip}">
            <div id="record_ttl-${id}" class="rtl col-1 fs-13 fw-400"> ${ttl}</div>
            <div id="record_other-${id}" class="col-3 fs-13 fw-400">
               ${plusdata}
            </div>
            <div id="record_operation" class="col-1 fs-13 fw-400 text-left position-relative">
               <ul class="d-flex justify-content-center align-items-center list-unstyled mb-0 fnlist p-0">
                  ${balancetag}
                  <li onclick="editRec('${domainname}', '${domainid}','${id}')">
                     <span>
                        <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="ویرایش" src="/general/images/new/ico_manage.svg" />
                     </span>
                     <span class="fnlist-title">ویرایش</span>
                  </li>
                  <li onclick="deletensRecord('${domainname}', 'DnsrecordList-${id}','${id}')">
                     <span>
                        <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="حذف" src="/general/images/new/ico_delete.svg" class="img-operation-list nomargin" />
                     </span>
                     <span class="fnlist-title">حذف</span>
                  </li>
               </ul>
               <span class="fnlist-options">
                  <img src="/general/images/root/topMenu/ico_dotted_ico.svg">
               </span>
            </div>
         </button>
   </div>`;
   return template;
}

async function updateDnsRecord(rBody) {
   document.getElementById('sendRecord').innerHTML = `<img src="/general/loading/tail-spin.svg"/>`;
   document.getElementById('sendRecord').setAttribute("disabled", "disabled");
   let body = new FormData();
   body.append("rid", $rid);
   body.append("domain", $domain);
   body.append("id", $did);
   const rise = await fetch("/submit/dns/delete-all-balancer-records", {method:"POST", body}).then(r=>r.json()).then(j=>j).catch(ex => window.location.reload());
   console.log(rise);
   const response = await fetch("/submit/dns/update-record", {
      method: "POST",
      body: rBody
   }).then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
   if (response.status === "success") {
      recErr = undefined;
      recSucc = response.message;
      showAlert("success", recSucc);
   } else {
      recSucc = undefined;
      recErr = response.message;
      showAlert("err", recErr);
   }
   console.log(response);
   document.getElementById('sendRecord').innerHTML = `ویرایش رکورد`;
   document.getElementById('sendRecord').removeAttribute("disabled");
   if (response.status == "error") return;
   var myData = {};
   rBody.forEach(function(value, key){
      myData[key] = value;
   });
   var rid = myData['id'] + '';
   
   $("#DnsrecordList-"+rid).remove();
   
   console.log(myData);
   if ( myData["type"] == "A" || myData["type"] == "ANAME" || myData["type"] == "AAAA" || myData["type"] == "CNAME" || myData["type"] == "NS" || myData["type"] == "PTR" || myData["type"] == "TXT" ) {
      var recordname = myData["host"];
      var lastOutput = returnRecords1(myData["type"], myData["proxied"], recordname, myData["ip"], myData["ttl"], rid, "", myData['domain'], $did,myData["balance"], myData);
   } else if ( myData["type"] == "MX" ) {
      var recordname = myData["host"];
      var lastOutput = returnRecords1(myData["type"], myData["proxied"], recordname, myData["ip"], myData["ttl"], rid, myData["priority"], myData['domain'], $did,myData["balance"], myData);
   } else if ( myData["type"] == "SRV" ) {
      var recordname = myData["host"];
      var lastOutput = returnRecords1(myData["type"], myData["proxied"], recordname, myData["ip"], myData["ttl"], rid, myData["port"]+"-"+myData["weight"]+"-"+myData["priority"]+"-"+myData["protocol"], 1, 1,myData["balance"], myData);
   }
   
   $("#ActiveDnsRecordPanel").prepend(lastOutput);

   $("#editrecord").modal("hide");
   
   return {
      id: response.id,
      response,
      status: response.status
   }
}

/*async*/ function deleteBalancerRecords(numofrec, rowidofbalancer, balancerid) {
   console.log(rowidofbalancer);
   document.getElementById("delete-balancer-"+balancerid).src = "/general/loading/tail-spin.svg";
   document.getElementById("delete-balancer-"+balancerid).setAttribute("onclick", "onloadingdelete");


   

   // if ( numofrec == "1" ) {

   //    showAlert("err", "امکان حذف رکورد پیش فرض وجود ندارد");
   //    return;

   // } else {
      // let rBody = new FormData();
      // rBody.append("domain", $domain);
      // rBody.append("rid", $rid);
      // rBody.append("id", balancerid);
      // const apianswer = await fetch("/submit/dns/delete-balancer-record", { method: "POST", body: rBody })
      //    .then(r => r.json())
      //    .then(rj => rj).catch(ex => window.location.reload())
      // console.log(apianswer);

      // if ( apianswer.status == "success" ) {
         document.getElementById(rowidofbalancer).classList.add("d-none");
         document.getElementById('geo-ip_'+numofrec).value = '';
         console.log('deleted:   geo-ip_'+numofrec);
      //    showAlert("success", "رکورد بالانسر مدنظرتان حذف شد")
      // } else {
      //    showAlert("err", apianswer.message);
      // }
   // }

   document.getElementById("delete-balancer-"+balancerid).src = "/general/images/new/ico_delete.svg";
   document.getElementById("delete-balancer-"+balancerid).setAttribute("onclick", "deleteBalancerRecords( '"+numofrec+"', '"+rowidofbalancer+"', '"+balancerid+"' )");
   
}

function onloadingdelete() {
   return
}

async function aRecord(action) {

   if (domChecked("geostatus")) {
      let itbe = false;
      for (let it=1; it < 11; it++) {
         if(domValue('geo-weight_'+it)) {
            document.getElementById('geo-weight_'+it).classList.remove('alert-danger-border');
            if(parseInt(domValue('geo-weight_'+it)) < 0) {
               document.getElementById('geo-weight_'+it).classList.add('alert-danger-border');
               itbe = true;
            }
         }
         if(domValue('geo-ip_'+it)) {
            document.getElementById('geo-ip_'+it).classList.remove('alert-danger-border');
            if(domValue('geo-ip_'+it).includes('/')) {
               document.getElementById('geo-ip_'+it).classList.add('alert-danger-border');
               itbe = true;
            }
         }

         if(document.querySelector('#showdistribute .current-item').getAttribute('data-value') == "weight") {
            for (let i = 1 ; i < 11; i++) {
               if(!/^[0-9]+$/.test(domValue('geo-weight_'+i)) || parseInt(domValue('geo-weight_'+i)) > 65535 || parseInt(domValue('geo-weight_'+i)) < 1) {
                  document.getElementById('geo-weight_'+i).classList.add('alert-danger-border');
                  if(!document.getElementById('cdn-dns-row_'+i).classList.contains('d-none')) { 
                     document.getElementById('errorWeight-'+i).innerHTML = '1-65535';   
                     itbe = true 
                  };
               }else{
                  document.getElementById('geo-weight_'+i).classList.remove('alert-danger-border');
                  document.getElementById('errorWeight-'+i).innerHTML = '';   

               }
            }
         }
      }
      if (itbe) return;
   }

   let rBody = new FormData();
   rBody.append("domain", $domain);
   rBody.append("id", $rid);
   rBody.append("type", "A");
   rBody.append("host", domValue('txtname-a'));
   tit_tit = domValue('txtname-a');
   rBody.append("proxied", domChecked('proxystatus-a') ? "1" : "0");
   clououd = domChecked('proxystatus-a') ? "1" : "0";
   rBody.append("ip", domValue('txtip-a'));
   rBody.append("value", domValue('txtip-a'));
   rBody.append("ttl", domQS('#showttl .current-item'));
   rBody.append("protocol", domQS('#showptla .current-item'));
   rBody.append("port", domValue('txtport-a'));
   const geoipzz = `${domValue('geo-ip_1')},${domValue('geo-ip_2')},${domValue('geo-ip_3')},${domValue('geo-ip_4')},${domValue('geo-ip_5')},${domValue('geo-ip_6')},${domValue('geo-ip_7')},${domValue('geo-ip_8')},${domValue('geo-ip_9')},${domValue('geo-ip_10')},`
   if (domChecked("geostatus") && !/^[,]+$/.test(geoipzz)) {
      rBody.append("balance", "balance");
   } else {
      // rBody.append("balance", "nobalance");
   }
   rc_rc = domValue('txtip-a');
   rt_rt = "A";
   ttl_ttl = domQS('#showttl .current-item');

   let reteUrn;
   let upd = false;
   if (action === "update") {
      rBody.append("wasBalanced", wasBalance);
      reteUrn = await updateDnsRecord(rBody);
      upd = true;
   }
   else if (action === "add") {
      reteUrn = await addDnsRecord(rBody);
   }
   if (domChecked("geostatus") && upd) {
      await geoInvokation(reteUrn.id);
   }else{
      // let body = new FormData();
      // body.append("rid", $rid);
      // body.append("domain", $domain);
      // body.append("id", $did);
      // const rise = await fetch("/submit/dns/delete-all-balancer-records", {method:"POST", body}).then(r=>r.json()).then(j=>j).catch(ex => window.location.reload());
      // console.log(rise);
   }
   return reteUrn;
}

async function srvRecord(action) {
   console.log('srv records');
   let rBody = new FormData();
   rBody.append("domain", $domain);
   rBody.append("id", $rid);
   rBody.append("type", "SRV");
   rBody.append("host", domValue('txt-title-srv'));
   tit_tit = domValue('txt-title-srv');
   rBody.append("ip", domValue('txt-target-srv'));
   rBody.append("value", domValue('txt-target-srv'));
   rBody.append("proxied", domChecked('proxystatus-aaaa') ? "1" : "0");
   clououd = "2";
   rBody.append("ttl", domQS('#showttl .current-item'));
   rBody.append("protocol", domQS('#ptllist .SelectedItem'));
   rBody.append("priority", domValue('txt-priority-srv'));
   rBody.append("weight", domValue('txt-weight-srv'));
   rBody.append("port", domValue('txt-port-srv'));
   rBody.append("service", domValue('txt-name-srv'));
   rBody.append("target", domValue('txt-target-srv'));
   rBody.append("balance", "nobalance");
   rc_rc = domValue('txt-target-srv');
   rt_rt = "SRV";
   ttl_ttl = domQS('#showttl .current-item');
   if (action === "update") {
      return updateDnsRecord(rBody);
   } else if (action === "add") {
      return addDnsRecord(rBody);
   }
}

async function aaaaRecord(action) {
   let rBody = new FormData();
   rBody.append("domain", $domain);
   rBody.append("id", $rid);
   rBody.append("type", "AAAA");
   rBody.append("host", domValue('txt-name-aaaa'));
   tit_tit = domValue('txt-name-aaaa');
   rBody.append("ip", domValue('txt-ip-aaaa'));
   rBody.append("value", domValue('txt-ip-aaaa'));
   rBody.append("proxied", domChecked('proxystatus-aaaa') ? "1" : "0");
   clououd = domChecked('proxystatus-aaaa') ? "1" : "0";
   rBody.append("ttl", domQS('#showttl .current-item'));
   rBody.append("balance", "nobalance");
   rc_rc = domValue('txt-ip-aaaa');
   rt_rt = "AAAA";
   ttl_ttl = domQS('#showttl .current-item');
   if (action === "update")
      return updateDnsRecord(rBody);
   else if (action === "add")
      return addDnsRecord(rBody);
}

async function cNameRecord(action) {
   let rBody = new FormData();
   rBody.append("domain", $domain);
   rBody.append("id", $rid);
   rBody.append("type", "CNAME");
   rBody.append("host", domValue('txtname-cname'));
   tit_tit = domValue('txtname-cname');
   rBody.append("ip", domValue('txtaddress-cname'));
   rBody.append("value", domValue('txtaddress-cname'));
   rBody.append("proxied", domChecked('proxystatus-cname') ? "1" : "0");
   clououd = domChecked('proxystatus-cname') ? "1" : "0";
   rBody.append("ttl", domQS('#showttl .current-item'));
   rBody.append("balance", "nobalance");
   rc_rc = domValue('txtaddress-cname');
   rt_rt = "CNAME";
   ttl_ttl = domQS('#showttl .current-item');
   if (action === "update")
      return updateDnsRecord(rBody);
   else if (action === "add")
      return addDnsRecord(rBody);
}

async function aNameRecord(action) {
   let rBody = new FormData();
   rBody.append("domain", $domain);
   rBody.append("id", $rid);
   rBody.append("type", "ANAME");
   rBody.append("host", domValue('txtname'));
   tit_tit = domValue('txtname');
   rBody.append("ip", domValue('txt-dname-aname'));
   rBody.append("value", domValue('txt-dname-aname'));
   rBody.append("proxied", domChecked('proxystatus-cname') ? "1" : "0");
   clououd = domChecked('proxystatus-cname') ? "1" : "0";
   rBody.append("ttl", domQS('#showttl .current-item'));
   rBody.append("balance", "nobalance");
   rc_rc = domValue('txt-dname-aname');
   rt_rt = "ANAME";
   ttl_ttl = domQS('#showttl .current-item');
   if (action === "update")
      return updateDnsRecord(rBody);
   else if (action === "add")
      return addDnsRecord(rBody);

}

async function mxRecord(action) {
   let rBody = new FormData();
   rBody.append("domain", $domain);
   rBody.append("id", $rid);
   rBody.append("type", "MX");
   rBody.append("host", domValue('txt-name-mx'));
   tit_tit = domValue('txt-name-mx');
   rBody.append("ip", domValue('txt-mailserver-mx'));
   rBody.append("value", domValue('txt-mailserver-mx'));
   rBody.append("priority", domValue('txt-pr-mx'));
   rBody.append("balance", "nobalance");
   rBody.append("proxied", "0");
   clououd = "2";
   rBody.append("ttl", domQS('#showttl .current-item'));
   rc_rc = domValue('txt-mailserver-mx');
   rt_rt = "MX";
   ttl_ttl = domQS('#showttl .current-item');
   if (action === "update")
      return updateDnsRecord(rBody);
   else if (action === "add")
      return addDnsRecord(rBody);

}

async function nsRecord(action) {
   let rBody = new FormData();
   rBody.append("domain", $domain);
   rBody.append("id", $rid);
   rBody.append("type", "NS");
   rBody.append("host", domValue('txt-name-ns'));
   tit_tit = domValue('txt-name-ns');
   clououd = "2";
   rBody.append("ip", domValue('txt-nameserver-ns'));
   rBody.append("value", domValue('txt-nameserver-ns'));
   rBody.append("proxied", /*domChecked('proxystatus-cname') ? "1" :*/ "0");
   rBody.append("ttl", domQS('#showttl .current-item'));
   rBody.append("balance", "nobalance");
   rc_rc = domValue('txt-nameserver-ns');
   rt_rt = "NS";
   ttl_ttl = domQS('#showttl .current-item');
   if (action === "update")
      return updateDnsRecord(rBody);
   else if (action === "add")
      return addDnsRecord(rBody);

}

async function txtRecord(action) {
   let rBody = new FormData();
   rBody.append("domain", $domain);
   rBody.append("id", $rid);
   rBody.append("type", "TXT");
   rBody.append("host", domValue('txt-name-txt'));
   tit_tit = domValue('txt-name-txt');
   clououd = "2";
   rBody.append("ip", domValue('txt-text-txt'));
   rBody.append("value", domValue('txt-text-txt'));
   rBody.append("proxied", "0");
   rBody.append("ttl", domQS('#showttl .current-item'));
   rBody.append("balance", "nobalance");
   rc_rc = domValue('txt-text-txt');
   rt_rt = "TXT";
   ttl_ttl = domQS('#showttl .current-item');
   if (action === "update")
      return updateDnsRecord(rBody);
   else if (action === "add")
      return addDnsRecord(rBody);

}

async function ptrRecord(action) {
   let rBody = new FormData();
   rBody.append("domain", $domain);
   rBody.append("id", $rid);
   rBody.append("type", "PTR");
   clououd = "2";
   rBody.append("host", domValue('txt-name-ptr'));
   tit_tit = domValue('txt-name-ptr');
   rBody.append("ip", domValue('txtdmoainname-ptr'));
   rBody.append("value", domValue('txtdmoainname-ptr'));
   rBody.append("proxied", "0");
   rBody.append("ttl", domQS('#showttl .current-item'));
   rBody.append("balance", "nobalance");
   rc_rc = domValue('txtdmoainname-ptr');
   rt_rt = "PTR";
   ttl_ttl = domQS('#showttl .current-item');
   if (action === "update")
      return updateDnsRecord(rBody);
   else if (action === "add")
      return addDnsRecord(rBody);

}

async function editRec(domain, domainId, recordId) {
   
   var rowsCount=0;
   $("#dnsrecodsmodalAll").html("");
   $("#dnsrecodsmodalAll").html($("#dnsmodalnull").val());
   teksteyria();
   jQuery('.scrollbar-outer').scrollbar();
   $("#dnsrecodsmodalAll #recordmanagementtitle").html("ویرایش رکوردهای DNS");
   $("#DnsrecordList-"+recordId+" button").prepend("<div class='recordloader' ></div>");
   $rid = recordId;
   const rc = new FormData();
   rc.append("domain",domain);
   rc.append("domainId",domainId);
   rc.append("recordId",recordId);
   var recordType=$("#hidden-record-type-"+recordId).val();

   if ( $( "#hidden-record-cluster-"+recordId).val() == "balance" && recordType=="A" ) {
      const recData = await fetch("/submit/dns/single-record-data", { method: "POST", body: rc })
      .then(r => r.json())
      .then(rj => rj).catch(ex => window.location.reload());
      
      if (recData.status !== "success") {
         showAlert("err", "مشکلی در نمایش اطلاعات رخ داده است . لطفا مجددا بررسی بفرمایید");
         return;
      }
      
      if (recData.data.dnr_type === "A") {

         
         protocolCheckerer();

         // nullify();
         let jex = new FormData();
         jex.append("rid", recordId);
         jex.append("domain", domain);
         const jdata = await fetch("/submit/dns/get-geo-data", {method: "POST", body: jex}).then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
         wasBalance = jdata.status === "balance";
         $('.scrollbar-outer').scrollbar(); 
         
         if (jdata.data != undefined || jdata.status != "nobalance" ) {
            console.log(jdata);
            for ( let i = 0; i < jdata.data.length; i++ ) {
               if ( i < 11 ){
                  rowsCount=i;
                  document.querySelector("#cdn-dns-row_"+parseInt(i+1)+" > .delete-dns-btn > span .img-operation-list").setAttribute("id","delete-balancer-"+jdata.data[i]['drbid']);
                  document.getElementById("delete-balancer-"+jdata.data[i]['drbid']).setAttribute("onclick", "deleteBalancerRecords( '"+parseInt(i+1)+"', 'cdn-dns-row_"+parseInt(i+1)+"', '"+jdata.data[i]['drbid']+"' )");
                  $("#geo-ip_"+parseInt(i+1)).val( jdata.data[i]['drb_ip']);

                  if (jdata.data[i]['drb_weight'].toString()!="0") {
                     console.log("weight omade");
                     $("#geo-weight_"+parseInt(i+1)).val( jdata.data[i]['drb_weight']);
                     $("#geo-weight_"+parseInt(i+1)).removeClass("d-none");
                     $("#cdn-dns-row_"+parseInt(i+1)+" .geo-weight").removeClass("d-none");
                     if ( i == 0 ) {
                        $("#distributelist  li[data-value='weight']").trigger("click");
                     } else {
                     }
                  }

                  // show default country
                  if ( i == 0 && jdata.data[i]['drb_country'].toString()=="default" ) {
                     console.log("country 0 omade");
                     document.querySelector("#cdn-dns-row_1 .geo-country").classList.remove("d-none");
                     document.querySelector("#cdn-dns-row_1 .geo-country .current-item").textContent = "پیش فرض";
                     document.querySelector("#cdn-dns-row_1 .geo-country .current-item").removeAttribute("checked");
                     $("#geolist  li[data-value='country']").trigger("click");
                  }

                  if ( i> 0 && jdata.data[i]['drb_country'].toString()!="nocountry"  ) {
                     console.log("country 1 omade");
                     // $("#distributelist  li[data-value='weight']").trigger("click");
                     $("#geo-country_"+parseInt(i+1)).val( jdata.data[i]['drb_country']);
                     $("#geo-country_"+parseInt(i+1)).removeClass("d-none");
                     $("#cdn-dns-row_"+parseInt(i+1)+" .geo-country").removeClass("d-none");
                     $("#countryList_"+parseInt(i+1)+" li[data-value='"+jdata.data[i]['drb_country']+"']").trigger("click");
                  }

                  $("#cdn-dns-row_"+parseInt(i+1)).removeClass("d-none");
                  $("#geostatus").attr('checked','checked');
                  $("#editrecord").addClass('modal-scroll');
                  $("#geo-dns-record-card").removeClass("d-none");
               }
            }
         }else{
            
         }
         domEdit("jixonData", `${JSON.stringify(jdata)}`);
         domEdit("txtname-a", recData.data.dnr_name);
         console.log("proxy stat",recData.data.dnr_proxied);
         domCheckedEdit("proxystatus-a", parseInt(recData.data.dnr_proxied));
         domEdit("txtip-a", recData.data.dnr_ip);
         domEdit("txtip-a", recData.data.dnr_ip);
         $(`#ttllist li[data-value='${recData.data.dnr_ttl}']`).addClass("SelectedItem");
         proxyStatusChecker();
         $(`#showttl .current-item`).attr("data-value", recData.data.dnr_ttl);
         await editrecord('A',recordId);
         // document.getElementById('geostatus').checked = document.getElementById('hidden-cluster-status-'+ recordId).value == 1;
         // $("#cdn-dns-row_1 .delete-dns-btn img").removeAttr("onclick")
         $("#txtip-a").attr("disabled","disabled")
         $("#addrow").attr("data-value",rowsCount+2);
         console.log(rowsCount);
      }
      
   // normal mode
   } else {
      // nullify();
      wasBalance = false;
      $("#geostatus").removeAttr("checked","");
      if (recordType === "A") {
         var proxyvalue = document.getElementById("hidden-cloud-status-"+recordId).value;
         console.log("proxytype is"+proxyvalue);
         if ( proxyvalue == "1" ) {
            document.getElementById("proxystatus-a").setAttribute("checked","checked")
         }
         domCheckedEdit("proxystatus-a", parseInt($("#hidden-cloud-status-"+recordId).val()));
         domEdit("txtip-a", $("#hidden-record-ip-"+recordId).val());
         domEdit("txtname-a", $("#hidden-record-name-"+recordId).val());
         if (document.getElementById("hidden-port-status-"+recordId)) {
            domEdit("txtport-a", $("#hidden-port-status-"+recordId).val());
            let ptla = domValue("hidden-protocol-status-"+recordId);
            if(ptla.toLowerCase() === 'automatic') {
               ptla = ptla.charAt(0).toUpperCase() + ptla.slice(1);
            }else{
               ptla = ptla.toUpperCase();
            }
            document.querySelector('#showptla .current-item').innerHTML = ptla;
            document.querySelector('#showptla .current-item').setAttribute("data-value", (domValue("hidden-protocol-status-"+recordId)));
         } else{
            domEdit("txtport-a", '');
            document.querySelector('#showptla .current-item').innerHTML = 'Automatic';
            document.querySelector('#showptla .current-item').setAttribute("data-value", (domValue("hidden-protocol-status-"+recordId)));
         }
         var ttl=$("#hidden-record-ttl-"+recordId).val();
         $(`#ttllist li[data-value='${ttl}']`).addClass("SelectedItem");
         proxyStatusChecker();
         $(`#showttl .current-item`).attr("data-value", ttl);
         $("#geostatus").removeAttr("checked","");
         await editrecord('A',recordId);
         $("#geo-dns-record-card").addClass("d-none");
         $("#editrecord").removeClass("modal-scroll");
         document.getElementById("proxystatus-a").removeAttribute("checked");
      }
      if (recordType === "AAAA") {
         var proxyvalue = document.getElementById("hidden-cloud-status-"+recordId).value;
         if ( proxyvalue == "1" ) {
            document.getElementById("proxystatus-aaaa").setAttribute("checked","checked")
         }
         domEdit("txt-name-aaaa", $("#hidden-record-name-"+recordId).val());
         domEdit("txt-name-aaaa", $("#hidden-record-name-"+recordId).val());
         domEdit("txt-ip-aaaa", $("#hidden-record-ip-"+recordId).val());
         var ttl=$("#hidden-record-ttl-"+recordId).val();
         $(`#ttllist li[data-value='${ttl}']`).addClass("SelectedItem"); 
         $(`#showttl .current-item`).attr("data-value", ttl); 
         proxyStatusChecker();
         await editrecord('AAAA',recordId);
         $("#geo-dns-record-card").addClass("d-none");
         document.getElementById("proxystatus-aaaa").removeAttribute("checked")
         $("#editrecord").removeClass("modal-scroll");
      }
      if (recordType === "ANAME") {
         console.log('dsdsfdsfsdfdsf');
         domEdit("txtname", $("#hidden-record-name-"+recordId).val());
         // domCheckedEdit("proxystatus-aname", parseInt($("#hidden-cloud-status-"+recordId).val()));
         domEdit("txt-dname-aname",  $("#hidden-record-ip-"+recordId).val());
         // domEdit("txt-ip-aname",  $("#hidden-record-ip-"+recordId).val());
         var ttl=$("#hidden-record-ttl-"+recordId).val();
         $(`#ttllist li[data-value='${ttl}']`).addClass("SelectedItem"); 
         $(`#showttl .current-item`).attr("data-value", ttl); 
         proxyStatusChecker();
         await editrecord('ANAME',recordId);
         $("#geo-dns-record-card").addClass("d-none");
         $("#editrecord").removeClass("modal-scroll");
      }
      if (recordType === "CNAME") {
         domEdit("txtname-cname", $("#hidden-record-name-"+recordId).val());
         domCheckedEdit("proxystatus-cname", parseInt($("#hidden-cloud-status-"+recordId).val()));
         domEdit("txtaddress-cname", $("#hidden-record-ip-"+recordId).val());
         var ttl=$("#hidden-record-ttl-"+recordId).val();
         $(`#ttllist li[data-value='${ttl}']`).addClass("SelectedItem"); 
         $(`#showttl .current-item`).attr("data-value", ttl); 
         proxyStatusChecker();
         await editrecord('CNAME',recordId);
         $("#geo-dns-record-card").addClass("d-none");
         $("#editrecord").removeClass("modal-scroll");
      }
      if (recordType === "NS") {
         domEdit("txt-name-ns", $("#hidden-record-name-"+recordId).val());
         domEdit("txt-nameserver-ns", $("#hidden-record-ip-"+recordId).val());
         var ttl=$("#hidden-record-ttl-"+recordId).val();
         $(`#ttllist li[data-value='${ttl}']`).addClass("SelectedItem");
         $(`#showttl .current-item`).attr("data-value", ttl);
         proxyStatusChecker();
         editrecord('NS',recordId);
         $("#geo-dns-record-card").addClass("d-none");
         $("#editrecord").removeClass("modal-scroll");
      }
      if (recordType === "PTR") {
         domEdit("txt-name-ptr", $("#hidden-record-name-"+recordId).val());
         domEdit("txtdmoainname-ptr", $("#hidden-record-ip-"+recordId).val());
         var ttl=$("#hidden-record-ttl-"+recordId).val();
         $(`#ttllist li[data-value='${ttl}']`).addClass("SelectedItem");
         $(`#showttl .current-item`).attr("data-value", ttl);
         proxyStatusChecker();
         editrecord('PTR',recordId);
         $("#geo-dns-record-card").addClass("d-none");
         $("#editrecord").removeClass("modal-scroll");
      }
      if (recordType === "TXT") {
         domEdit("txt-name-txt", $("#hidden-record-name-"+recordId).val());
         domEdit("txt-text-txt", $("#hidden-record-ip-"+recordId).val());
         var ttl=$("#hidden-record-ttl-"+recordId).val();
         $(`#ttllist li[data-value='${ttl}']`).addClass("SelectedItem"); 
         $(`#showttl .current-item`).attr("data-value", ttl);
         proxyStatusChecker();
         editrecord('TXT',recordId);
         $("#geo-dns-record-card").addClass("d-none");
         $("#editrecord").removeClass("modal-scroll");
      }
      if (recordType === "MX") {
         domEdit("txt-name-mx", $("#hidden-record-name-"+recordId).val());
         domEdit("txt-mailserver-mx", $("#hidden-record-ip-"+recordId).val());
         domEdit("txt-pr-mx", $("#hidden-record-priority-"+recordId).val());
         var ttl=$("#hidden-record-ttl-"+recordId).val();
         $(`#ttllist li[data-value='${ttl}']`).addClass("SelectedItem");
         $(`#showttl .current-item`).attr("data-value", ttl);
         proxyStatusChecker();
         editrecord('MX',recordId);
         $("#geo-dns-record-card").addClass("d-none");
         $("#editrecord").removeClass("modal-scroll");
      }
      if (recordType === "SRV") {
         domEdit("txt-title-srv", $("#hidden-record-name-"+recordId).val());
         domEdit("txt-name-srv", $("#hidden-record-service-"+recordId).val());
         domEdit("txt-priority-srv", $("#hidden-record-priority-"+recordId).val());
         domEdit("txt-weight-srv", $("#hidden-record-weight-"+recordId).val());
         domEdit("txt-port-srv", $("#hidden-record-port-"+recordId).val());
         domEdit("txt-target-srv", $("#hidden-record-ip-"+recordId).val());
         var ttl=$("#hidden-record-ttl-"+recordId).val();
         $(`#ttllist li[data-value='${ttl}']`).addClass("SelectedItem");
         $(`#showttl .current-item`).attr("data-value", ttl);
         var protocol=$("#hidden-record-protocol-"+recordId).val();
         $(`#ptllist li[data-value='${protocol}']`).addClass("SelectedItem"); 
         $(`#showptl .current-item`).attr("data-value", protocol);
         $(`#showptl .current-item`).html(protocol.toUpperCase());
         proxyStatusChecker();
         editrecord('SRV',recordId);
         $("#geo-dns-record-card").addClass("d-none");
         $("#editrecord").removeClass("modal-scroll");
      }
   }

   $(".recordloader").remove();
}

async function geoInvokation(rid) {
   let gBody = new FormData();
   const geoip = `${domValue('geo-ip_1')},${domValue('geo-ip_2')},${domValue('geo-ip_3')},${domValue('geo-ip_4')},${domValue('geo-ip_5')},${domValue('geo-ip_6')},${domValue('geo-ip_7')},${domValue('geo-ip_8')},${domValue('geo-ip_9')},${domValue('geo-ip_10')},`
   if(/^[,]+$/.test(geoip)) return document.getElementById('geostatus').checked = false;
   gBody.append("geoIp", geoip);
   gBody.append("rid", $rid);
   let cts = `${domQS("#showCountry_1 .current-item")},${domQS("#showCountry_2 .current-item")},${domQS("#showCountry_3 .current-item")},${domQS("#showCountry_4 .current-item")},${domQS("#showCountry_5 .current-item")},${domQS("#showCountry_6 .current-item")},${domQS("#showCountry_7 .current-item")},${domQS("#showCountry_8 .current-item")},${domQS("#showCountry_9 .current-item")},${domQS("#showCountry_10 .current-item")},`;
   let wt = `${domValue('geo-weight_1')},${domValue('geo-weight_2')},${domValue('geo-weight_3')},${domValue('geo-weight_4')},${domValue('geo-weight_5')},${domValue('geo-weight_6')},${domValue('geo-weight_7')},${domValue('geo-weight_8')},${domValue('geo-weight_9')},${domValue('geo-weight_10')},`;
   gBody.append("country", cts);
   gBody.append("weight", wt);
   gBody.append("jixonData", domValue("jixonData"));
   gBody.append("ttl", domQS('#showttl .current-item'));
   gBody.append("domain", $domain);
   gBody.append("reply" ,domQS('#showreply .current-item'));
   gBody.append("distro" ,domQS('#showdistribute .current-item'));
   gBody.append("geo" ,domQS('#showgeo .current-item'));
   
   const G = await fetch("/submit/dns/geo-ip", {method: "POST", body: gBody})
   .then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
   console.log(G);
   if ( G ) {
      G.forEach(row => {
         if (row.status != "success") return;
      });
   }
   
   showAlert("success", "رکورد های Geo-ip با موفقیت ثبت شد");
}





function domValue(id) {
   return document.getElementById(id)?.value;
}
function domEdit(id, value) {
   return document.getElementById(id).value = value;
}
function domHtml(id, value) {
   return document.getElementById(id).innerHTML = value;
}
function domChecked(id) {
   return document.getElementById(id).checked;
}
function domCheckedEdit(id, value) {
   return document.getElementById(id).checked = value;
}
function domQS(q) {
   return document.querySelector(q).getAttribute("data-value");
}
function domQSEdit(q, v) {
   return document.querySelector(q).setAttribute("data-value", v);
}