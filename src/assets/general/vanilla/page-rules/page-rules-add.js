
var arrayR = {
   "1": "browser_cache_ttl",
   "2": "cache_level",
   "3": "Edge_cache_ttl",
   "4": "waf",
   "5": "add_header_to_client",
   "6": "add_header_to_server",
   "7": "remove_header",
   "8": "redirect_url",
   "9": "autominify",
   "10": "forcehttps",
   "11": "securitylevel",
   "12": "ipmanagement",
   "13": "countrymanagement",
   "14": "clustering",
   "15": "connection_timeout",
   "16": "hostheader",
   "17": "cachecontrol",
   "18": "ratelimit"
}
var R = 1;


async function rulerule(subsub = subfolder) {
   if (subsub != undefined || typeof subsub != 'undefined') subsub = subfolder;
   // DOMS DOMS DOMS DOMS DOMS DOMS DOMS DOMS DOMS DOMS DOMS
   const add_BrowserCacheTtl = $("#showbrcache .current-item").attr("data-value");
   const add_CacheLevel = $("#showcacheLv:first .current-item").attr("data-value");
   const add_EdgeCacheTtl = $("#showedgecache  .current-item").attr("data-value");
   const add_RemoveHeader = $("#remove-header").val();
   if (!document.querySelector('#showrule .current-item').getAttribute('data-value')) return;
   let bypass = false;
   let ttll, levell, namee, valuee, keyy, newurll, defaultt, ipp, countryy, statuss, mode = arrayR[R], bad = false;
   let req = new FormData();

   if (R == 1) {
      ttll = add_BrowserCacheTtl;
   }
   if (R == 2) {
      levell = add_CacheLevel;
   }
   if (R == 3) {
      ttll = add_EdgeCacheTtl;
   }
   if (R == 4) {
      let dumbMove = true;
      if ($('#off:first').attr("checked") == "checked") { levell = "1"; dumbMove = false; };
      if ($('#layer1:first').attr("checked") == "checked") { levell = "2"; dumbMove = false; };
      if ($('#layer2:first').attr("checked") == "checked") { levell = "3"; dumbMove = false; };
      if (dumbMove) return
   }
   if (R == 5) {
      let keysStack = $('#client-key:first').val();
      let valuesStack = $('#client-value:first').val();
      document.getElementById('client-key').classList.remove('alert-danger-border');
      document.getElementById('client-value').classList.remove('alert-danger-border');

      if (!/^[A-z0-9\-]+$/.test(keysStack)) {
         document.getElementById('client-key').classList.add('alert-danger-border');
         bad = true;
      }
      if (!/^[A-z0-9\-]+$/.test(valuesStack)) {
         document.getElementById('client-value').classList.add('alert-danger-border');
         bad = true;
      }
      for (let field = 2; field < 100; field++) {
         if (document.getElementById(`client-key-${field}`)) {
            console.log($(`#client-key-${field}`))
            if ($(`#client-key-${field}`).val() != ''
               && $(`#client-value-${field}`).val() != '') {
               keysStack += ',' + $(`#client-key-${field}`).val()
               valuesStack += ',' + $(`#client-value-${field}`).val()
            }
            if (!/^[A-z0-9\-]+$/.test($(`#client-key-${field}`).val()) ||
               ($(`#client-key-${field}`).val()).includes('\\') ||
               ($(`#client-key-${field}`).val()).includes('^') ||
               ($(`#client-key-${field}`).val()).includes('\`')
            ) {
               document.getElementById(`client-key-${field}`).classList.add('alert-danger-border');
               bad = true;
            } else {
               document.getElementById(`client-key-${field}`).classList.remove('alert-danger-border');
            }
            if (!/^[A-z0-9\-]+$/.test($(`#client-value-${field}`).val()) ||
               ($(`#client-value-${field}`).val()).includes('\\') ||
               ($(`#client-value-${field}`).val()).includes('^') ||
               ($(`#client-value-${field}`).val()).includes('\`')
            ) {
               document.getElementById(`client-value-${field}`).classList.add('alert-danger-border');
               bad = true;
            } else {
               document.getElementById(`client-value-${field}`).classList.remove('alert-danger-border');
            }
         }
      }
      if (bad) return;
      keyy = keysStack;
      namee = keysStack;
      valuee = valuesStack;
      console.log("magic stick", keyy, valuee, namee);
   }
   if (R == 6) {
      let keysStack = $('#server-key').val();
      let valuesStack = $('#server-value').val();
      if (!/^[A-z0-9\-]+$/.test(keysStack)) {
         document.getElementById('server-key').classList.add('alert-danger-border');
         bad = true;
      }
      if (!/^[A-z0-9\-]+$/.test(valuesStack)) {
         document.getElementById('server-value').classList.add('alert-danger-border');
         bad = true;
      }
      for (let field = 2; field < 100; field++) {
         if (document.getElementById(`server-key-${field}`)) {
            if ($(`#server-key-${field}`).val() != ''
               && $(`#server-value-${field}`).val() != '') {
               keysStack += ',' + $(`#server-key-${field}`).val()
               valuesStack += ',' + $(`#server-value-${field}`).val()
            }
            if (!/^[A-z0-9\-]+$/.test($(`#server-key-${field}`).val()) ||
               ($(`#server-key-${field}`).val()).includes('\\') ||
               ($(`#server-key-${field}`).val()).includes('^') ||
               ($(`#server-key-${field}`).val()).includes('\`')

            ) {
               document.getElementById(`server-key-${field}`).classList.add('alert-danger-border');
               bad = true;
            } else {
               document.getElementById(`server-key-${field}`).classList.remove('alert-danger-border');
            }
            if (!/^[A-z0-9\-]+$/.test($(`#server-value-${field}`).val()) ||
               ($(`#server-value-${field}`).val()).includes('\\') ||
               ($(`#server-value-${field}`).val()).includes('^') ||
               ($(`#server-value-${field}`).val()).includes('\`')
            ) {
               document.getElementById(`server-value-${field}`).classList.add('alert-danger-border');
               bad = true;
            } else {
               document.getElementById(`server-value-${field}`).classList.remove('alert-danger-border');
            }
         }
      }
      if (bad) return;
      keyy = keysStack;
      namee = keysStack;
      valuee = valuesStack;
   }
   if (R == 7) {
      document.getElementById(`remove-header`).classList.remove('alert-danger-border');
      namee = add_RemoveHeader;
      if (!/^[A-z0-9\-]+$/.test(namee)) {
         document.getElementById(`remove-header`).classList.add('alert-danger-border');
         bad = true;
      }
      if (bad) return;
   }
   if (R == 8) {
      newurll = document.getElementById('Url').value;
      document.getElementById(`Url`).classList.remove('alert-danger-border');

      if (!/^[A-z0-9\-\:\.\/]+$/.test(newurll)) {
         document.getElementById(`Url`).classList.add('alert-danger-border');
         bad = true;
      }
      if (bad) return;
      const r301 = $('#red-301');
      const r302 = $('#red-302');
      const r307 = $('#red-307');
      if (r301.attr("checked") == "checked") statuss = "301";
      else if (r302.attr("checked") == "checked") statuss = "302";
      else if (r307.attr("checked") == "checked") statuss = "307";
      else return;
   }
   if (R == 9) {
      valuee = '';
      if ($('#css-switch:first').attr("checked") == "checked") valuee += 'css,';
      if ($('#html-switch:first').attr("checked") == "checked") valuee += 'html,';
      if ($('#js-switch:first').attr("checked") == "checked") valuee += 'js';
      if (valuee == '') return;
   }
   if (R == 10) {
      valuee = $('#force-switch:first').attr("checked") == "checked" ? "1" : "0";
   }
   if (R == 11) {
      valuee = $('#showesecurity:first .current-item').attr('data-value');
   }
   if (R == 12) {
      let ipSelected = ''
      document.getElementById(`txtip-cache`).classList.remove('alert-danger-border');

      document.querySelectorAll('.ipSelected .ip').forEach(el => ipSelected += ',' + el.getAttribute('data-value'));
      defaultt = $('#allow-switch').attr("checked") == "checked" ? "allow" : "deny";
      console.log(ipSelected);
      ipp = ipSelected;
      if (ipp.length < 3) return document.getElementById(`txtip-cache`).classList.add('alert-danger-border');
   }
   if (R == 13) {
      countryy = '';
      document.getElementById(`showCrCache`).classList.remove('alert-danger-border');
      (document.querySelectorAll('.countrySelected .country')).forEach(cntry => {
         countryy += ',' + cntry.getAttribute('data-country');
         console.log(cntry, cntry.getAttribute('data-country'));
      });
      if (countryy.length < 3) return document.getElementById(`showCrCache`).parentNode.classList.add('alert-danger-border');

      defaultt = $('#allow-switch:first').attr("checked") == "checked" ? "allow" : "deny";
   }
   if (R == 14) {
      const moz = document.querySelector('#showCluster .current-item').getAttribute('data-value');
      if (!moz) return showAlert('err', "کلاستر مورد نظر را انتخاب کنید");
      defaultt = $wid;
      keyy = moz;
   }
   if (R == 15) {
      // TODO:
      let falsy = false;
      document.getElementById('to_connect').classList.remove('alert-danger-border');
      document.getElementById('to_send').classList.remove('alert-danger-border');
      document.getElementById('to_read').classList.remove('alert-danger-border');

      to_connect = document.getElementById('to_connect').value;
      to_send = document.getElementById('to_send').value;
      to_read = document.getElementById('to_read').value;
      if (!/^[0-9]+$/.test(to_connect) || to_connect > 500 || to_connect < 1) {
         document.getElementById('to_connect').classList.add('alert-danger-border');
         showAlert('error', 'مقدار ورودی to_connect باید بین 1 و 500 باشد')
         falsy = true;
      }
      if (!/^[0-9]+$/.test(to_send) || to_send > 500 || to_send < 1) {
         document.getElementById('to_send').classList.add('alert-danger-border');
         showAlert('error', 'مقدار ورودی to_send باید بین 1 و 500 باشد')
         falsy = true;
      }
      if (!/^[0-9]+$/.test(to_read) || to_read > 500 || to_read < 1) {
         document.getElementById('to_read').classList.add('alert-danger-border');
         showAlert('error', 'مقدار ورودی to_read باید بین 1 و 500 باشد')
         falsy = true;
      }
      if (falsy) return;
   }
   if (R == 16) {
      let falsy = false;
      newurll = document.getElementById('hostUrl').value.replace(/^https:\/\//, '').replace(/^http:\/\//, '');
      valuee = document.getElementById('hostUrl').value;
      if (!/^[A-Za-z\.\-\_0-9]+$/.test(newurll)) {
         falsy = true;
         document.getElementById('hosturlErr').innerHTML = `آدرس ورودی باید دامین معتبر باشد`;
         document.getElementById('hostUrl').classList.add('alert-danger-border');
      } else {
         document.getElementById('hosturlErr').innerHTML = ``;
         document.getElementById('hostUrl').classList.remove('alert-danger-border');
      }
      if (falsy) return;
   }
   if (R == 17) {
      defaultt = document.getElementById('cache-control-switch').checked ? "1" : "0";
      valuee = document.getElementById('cache-control-switch').checked ? "1" : "0";
   }
   if (R == 18) {
      ip_validation = true;
      let validate_ddos = true;
      let ddos_path = $('#rate-limit-modal-input-location-name').val();
      let ddos_request = $('#modal-ddos-requests').val();
      let ddos_rangeTime = $('#modal-ddos-timerange').val();
      document.getElementById("ip-allow-Err").innerHTML = '';
      // remove error span if exist 
      if (document.getElementsByClassName("ip-not-valid-modal")) {
         let errors = document.getElementsByClassName("ip-not-valid-modal");
         for (i = 0; i in errors; i++) {
            errors[i].remove();
         }
      }
      // if (ddos_path == "") {
      //    $("#ddos-path-Err").html("<span>مسیر را وارد کنید</span>");
      //    validate_ddos = false;
      // } else {
      //    $("#ddos-path-Err").find('span').html('');
      // }
      if (!/^[0-9]+$/.test(ddos_request)) {
         $("#ddos-req-Err").html("<span>تعداد درخواست را به عدد وارد کنید</span>");
         validate_ddos = false;
      } else {
         $("#ddos-req-Err").find('span').html('');
      }
      // if (!/^[0-9]+$/.test(ddos_rangeTime)) {
      //    $("#ddos-time-Err").html("<span>بازه زمانی را به عدد وارد کنید</span>");
      //    validate_ddos = false;
      // } else {
      //    $("#ddos-time-Err").find('span').html('');
      // }
      let desired_ips = $('#modal-box-ip .ip');
      const ip_array = [];
      for (var i = 0; i < desired_ips.length; i++) {
         let tt = desired_ips[i];
         ip_array.push(tt.getAttribute("data-value"));
      }
      if (validate_ddos != true || ip_validation != true) return console.log('debug');

      document.getElementById("sendDdosRule").setAttribute("disabled", "disabled");
      document.getElementById("sendDdosRule").innerHTML = `<img src="/general/loading/tail-spin.svg" />`;
      // let timerange = document.getElementById("modal-ddos-timerange").value;
      let timeformat = document.querySelector("#showUnit span.current-item").getAttribute("data-value");
      if (timeformat == "در ثانیه") {
         timeformat = "s"
      } else if (timeformat == "در دقیقه") {
         timeformat = "m"
      }
      let numberofrequests = document.getElementById("modal-ddos-requests").value;
      let messagemodal = document.getElementById("modal-ddos-msg").value;
      // let burst = document.getElementById('burst-switch').checked ? "true" : "false";

      req.append("websiteid", $wid);
      req.append("timeformat", timeformat);
      // req.append("rate", timerange);
      req.append("desc", messagemodal);
      req.append("ipranges", ip_array);
      req.append("burstcount", numberofrequests);
      req.append("burst", '');
      req.append("blackhole", $('#showBlockUnit .current-item').attr('data-value'));

   }



   req.append("subfolderid", subfolder);
   req.append("rules", mode);
   req.append("ttll", ttll);
   req.append("levell", levell);
   req.append("namee", namee);
   req.append("valuee", valuee);
   req.append("keyy", keyy);
   req.append("newurll", newurll);
   req.append("defaultt", defaultt);
   req.append("ipp", ipp);
   req.append("statuss", statuss);
   req.append("country", countryy);
   req.append("did", $did);
   req.append("to_connect", to_connect);
   req.append("to_send", to_send);
   req.append("to_read", to_read);

   $('#sendRule:first').html('<img src="/general/loading/tail-spin.svg" />');
   $('#sendRule:first').attr('disabled', 'disabled');
   const rest = await fetch("/submit/cdn/rules/website/add-rule",
      { method: "POST", body: req }).then(r => r.json()).then(j => j).catch(ex => window.location.reload());
   console.log(rest);
   await setSpaData(false);
   showAlert(rest.status, rest.message);
   if (rest.status == "success") $('#addRule:first').modal('hide');
   $('#sendRule:first').html('اضافه کردن');
   $('#sendRule:first').removeAttr('disabled');
   // $("#active-flush-collapse"+subsub).collapse('toggle');


   $(".accordion-item").on('click', '.fnlist-options', function (e) {
      e.stopPropagation();

      var all = $('.fnlist');
      // all.removeClass("active");
      if (all.hasClass("active")) {
         all.removeClass("active")

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




async function deleteRule(folderid = document.getElementById('delrul').getAttribute("folderid"),
   ruleid = document.getElementById('delrul').getAttribute("ruleid")) {

   let rBody = new FormData();
   rBody.append("folderid", folderid);
   rBody.append("rules", ruleid);

   const res = await fetch("/submit/cdn/rules/website/delete-rule", { method: "POST", body: rBody }).then(r => r.json()).then(j => j).catch(ex => window.location.reload());
   if (res.status == "success") $(`#${folderid}-${ruleid}`).slideUp(500, function () {
      this.remove();
      showAlert('success', 'قانون مورد نظر حذف شد ');
   });
   console.log(ruleid, folderid, res);
}

function askDelete(folderid, ruleid, check = false) {
   document.getElementById('delrul').setAttribute("folderid", folderid);
   document.getElementById('delrul').setAttribute("ruleid", ruleid);
   if (check) return myDeleteSWA(deleteCluster, 'اخطار', 'آیا مایلید این کلاستر را حذف کنید؟');
   myDeleteSWA(deleteRule, 'اخطار', 'آیا مایلید این قانون را حذف کنید؟');
}


async function deleteFolder(folderid = document.getElementById('delfol').getAttribute("folderid")) {

   let rBody = new FormData();
   rBody.append("folderid", folderid);
   rBody.append("wid", $wid);

   const res = await fetch("/submit/cdn/rules/website/delete-folder", { method: "POST", body: rBody }).then(r => r.json()).then(j => j).catch(ex => window.location.reload());
   if (res.status == "success") $(`#p-${folderid}`).slideUp(500, function () {
      this.remove();

   });
   console.log(folderid, res);
}

function askDeleteFolder(folderid) {
   document.getElementById('delfol').setAttribute("folderid", folderid);
   myDeleteSWA(deleteFolder, 'اخطار', 'آیا مایلید این فولدر را حذف کنید؟');
}


async function deleteCluster() {
   const fodel = document.getElementById('delrul').getAttribute("folderid");
   const rudel = document.getElementById('delrul').getAttribute("ruleid");
   let rBody = new FormData(); rBody.append('subfolderid', fodel);
   rBody.append('defaultt', $wid); rBody.append('rules', 'clustering'); rBody.append('keyy', 'null');
   const res = await fetch("/submit/cdn/rules/website/add-rule", { method: "POST", body: rBody })
      .then(r => r.json()).then(j => j).catch(ex => window.location.reload());
   showAlert(res.status, res.message);
   await setSpaData(false);
}