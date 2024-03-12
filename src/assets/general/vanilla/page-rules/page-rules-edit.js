// ds dr df 

function getDataEditRule(folderid, addit = null) {
   subfolder = folderid;
   $("#add-rule-select").prepend('<div id="disabled-recordtype" style="position: absolute;width: 100%;height: 40px;z-index: 1000;"></div>');
   console.log(folderid);
   const hi = (JSON.parse(document.getElementById(`hidden-folder-data-${folderid}`).value)).rulesDetails.data   // *** h.i. => hidden input ***

   console.log(hi);

   // option 1
   if (typeof hi.browser_cache_ttl != "undefined" && hi.browser_cache_ttl != undefined) {
      $('#showbrcache .current-item').attr("data-value", hi.browser_cache_ttl);
      if (hi.browser_cache_ttl)
         $('#showbrcache .current-item').html((hi.browser_cache_ttl).replace("m", " دقیقه").replace("h", " ساعت").replace("d", " روز").replace("M", " ماه").replace("y", " سال") ?? '');
   }

   // option 2
   if (typeof hi.cache_level != "undefined" && hi.cache_level != undefined) {
      $('#showcacheLv .current-item').attr("data-value", hi.cache_level);
      let el;
      if (hi.cache_level == "0") el = 'خاموش';
      else if (hi.cache_level == "1") el = 'بدون Query String';
      else if (hi.cache_level == "2") el = 'با Query String';
      else if (hi.cache_level == "3") el = 'استاندارد';
      $('#showcacheLv .current-item').html(el);
   }

   // option 3
   if (typeof hi.Edge_cache_ttl != "undefined" && hi.Edge_cache_ttl != undefined) {
      $('#showedgecache .current-item').attr("data-value", hi.Edge_cache_ttl);
      $('#showedgecache .current-item').html(
         (hi.Edge_cache_ttl).replace("m", " دقیقه").replace("h", " ساعت").replace("d", " روز").replace("M", " ماه").replace("y", " سال") ?? '');
   }

   // option 4
   if (typeof hi.waf != "undefined" && hi.waf != undefined) {
      if (hi.waf == "1") $('#off').attr("checked", "checked");
      if (hi.waf == "2") $('#layer1').attr("checked", "checked");
      if (hi.waf == "3") $('#layer2').attr("checked", "checked");
   }

   // option 5
   if (hi.add_header_to_client != undefined) {
      let ns = hi['add_header_to_client'][0]['name'];
      let val = hi['add_header_to_client'][0]['value'];
      $('#client-key').val(ns);
      $('#client-value').val(val);

      ns = hi['add_header_to_client'];
      console.log("ns is ", ns);

      for (let C = 1; C < ns.length; C++) {
         let h = C + 1;
         if ($('#header-item_' + h + '')) $('#header-item_' + h + '').remove();

         $("#addheaderToClientRow > .add-header-item:last").after("<div class='d-flex add-header-item mb-2' id='header-item_" + h + "'></div>");

         $("#header-item_" + h + '').append(`<div class="value-field">
                 <input type="text" id="client-value-${h}"  value="${ns[C]['value']}" class="border  rounded-pill text-start 
                 fs-13 text-gray-400 bg-white ws-10 border-c-light-300 
                 border-1 py-2 px-4 ltr tl w-100" placeholder="Value">
                 <div id="txtvalue-clientErr" class="error-field-wrap fs-13 fw-400 ws-15 ls-02 text-red-400 text-right rtl mt-1"></div>
             </div>
             <div class="key-field">
                 <input type="text" id="client-key-${h}" value="${ns[C]['name']}" class="border rounded-pill text-start
                     fs-13 text-gray-400 bg-white ws-10 border-c-light-300 
                     border-1 py-2 px-4 ltr tl w-100" placeholder="Key">
                 <div id="txtkey-clientErr" class="error-field-wrap fs-13 fw-400 ws-15 ls-02 text-red-400 text-right rtl mt-1"></div>
             </div>
             <div class="header-rule-btn delete-header-btn" id="remove_${h}">
                 <span><img src="/general/images/new/ico_delete.svg" class="img-operation-list nomargin" data-bs-toggle="tooltip" title="" data-bs-original-title="حذف" aria-label="حذف"></span>
             </div>`);
      }

      $("#addheaderToClientRow > .add-header-item").filter(function () {
         return $(this).find('input').filter(function () { return $(this).val().trim().length > 0 }).length == 0
      }).not("#header-item_1").remove();

   }

   // option 6
   if (hi.add_header_to_server != undefined) {
      let ns = hi['add_header_to_server'][0]['name'];
      let val = hi['add_header_to_server'][0]['value'];

      $('#server-key').val(ns);
      $('#server-value').val(val);
      ns = hi['add_header_to_server'];

      for (let C = 1; C < ns.length; C++) {
         let h = C + 1;
         if ($('#sheader-item_' + h + '')) $('#sheader-item_' + h + '').remove();
         $("#addheaderToServerRow > .add-sheader-item:last").after("<div class='d-flex add-sheader-item mb-2' id='sheader-item_" + h + "'></div>");
         $("#sheader-item_" + h + '').append(`<div class="server-value-field">
                <input type="text"  value="${ns[C]['value']}" id="server-value-${h}" class="border  rounded-pill text-start 
                fs-13 text-gray-400 bg-white ws-10 border-c-light-300 
                border-1 py-2 px-4 ltr tl w-100" placeholder="Value">
                <div id="txtvalue-serverErr" class="error-field-wrap fs-13 fw-400 ws-15 ls-02 text-red-400 text-right rtl mt-1"></div>
            </div>
            <div class="server-key-field">
                <input type="text"  value="${ns[C]['name']}" id="server-key-${h}" class="border rounded-pill text-start 
                    fs-13 text-gray-400 bg-white ws-10 border-c-light-300 
                    border-1 py-2 px-4 ltr tl w-100" placeholder="Key">
                <div id="txtkey-serverErr" class="error-field-wrap fs-13 fw-400 ws-15 ls-02 text-red-400 text-right rtl mt-1"></div>
            </div>
            <div class="header-rule-btn delete-header-btn" id="remove_${h}">
                <span><img src="/general/images/new/ico_delete.svg" class="img-operation-list nomargin" data-bs-toggle="tooltip" title="" data-bs-original-title="حذف" aria-label="حذف"></span>
            </div>`);

      }

      $("#addheaderToServerRow > .add-sheader-item").filter(function () {
         return $(this).find('input').filter(function () { return $(this).val().trim().length > 0 }).length == 0
      }).not("#sheader-item_1").remove();
   }

   // option 7
   if (typeof hi.remove_header != "undefined" && hi["remove_header"][0]['name'] != undefined) {

      $('#remove-header').val(hi["remove_header"][0]['name']);
   }

   // option 8
   if (typeof hi.redirect_url != "undefined" && hi["redirect_url"][0]['newurl'] != undefined) {
      $('#Url').val(hi["redirect_url"][0]['newurl']);
      if (hi["redirect_url"][0]['status'] == 301) $('#red-301').attr("checked", "checked");
      if (hi["redirect_url"][0]['status'] == 302) $('#red-302').attr("checked", "checked");
      if (hi["redirect_url"][0]['status'] == 307) $('#red-307').attr("checked", "checked");
   }

   // option 9
   if (typeof hi.autominify != "undefined" && hi['autominify'] != undefined) {
      if (hi['autominify'].includes("css"))
         $('#css-switch').attr("checked", "checked");
      if (hi['autominify'].includes("html"))
         $('#html-switch').attr("checked", "checked");
      if (hi['autominify'].includes("js"))
         $('#js-switch').attr("checked", "checked");
   }

   // option 10
   if (typeof hi.forcehttps != "undefined" && hi['forcehttps'][0]['value'] != undefined) {
      // console.log()
      if (hi['forcehttps'][0]['value'] == "1") {
         $('div[data-id="Force Https"] #force-switch').attr("checked", "checked");

      } else {
         // alert('aaaa');

         $('#addRule').find('div[data-id="Force Https"]').find('#force-switch').prop('checked', false);
         console.log($('#force-switch').attr('checked'));
      }
   }

   // option 11
   if (typeof hi.securitylevel != "undefined" && hi['securitylevel'][0]['value'] != undefined) {
      $('#showesecurity .current-item').attr("data-value", hi['securitylevel'][0]['value']);
      $('#showesecurity .current-item').html(
         hi['securitylevel'][0]['value'] == "1" ? 'جنگنده' :
            (
               hi['securitylevel'][0]['value'] == "2" ?
                  "ژنرال"
                  :
                  (
                     hi['securitylevel'][0]['value'] == "0" ?
                        "سپر"
                        :
                        "قلعه"
                  )
            ));
   }

   // option 12
   if (typeof hi.ipmanagement != "undefined" && hi['ipmanagement']['listofIPS'] != undefined) {
      if (hi['ipmanagement']['DefaultAction'] == "allow")
         $('#allow-switch').attr("checked", "checked");
      else
         document.getElementById('allow-switch').checked = false;
      const list = (hi['ipmanagement']['listofIPS']).split('-');
      $('.ipSelected').html('');
      $('.ipSelected').removeClass("d-none");

      list.forEach(el => $('.ipSelected').append(`<div class="ip" data-value="${el}"><i class="remove-ip"><img title="حذف" src="/general/images/root/ico_menu_close.svg"></i>${el}</div>`));
   }

   // option 13
   if (typeof hi['countrymanagement'] != "undefined" && hi['countrymanagement']['listofCountriess'] != undefined) {
      if (hi['countrymanagement']['DefaultAction'] == "allow")
         $('#allow-switch2').attr("checked", "checked");
      $('.countrySelected').removeClass('d-none');
      $('.countrySelected').html('');

      hi.countrymanagement.listofCountriess.forEach(coun3 => {
         const yes = $('[data-value=' + coun3 + '] span').html()
         $('.countrySelected').append(
            `
         <div class="country" data-country="${coun3}" data-value="امارات متحده عربی">
         ${yes}
         <i class="remove-country">X</i></div>
         `
         )
      });
   }


   // option 15
   if (typeof hi['connection_timeout'] != "undefined" && hi['connection_timeout'][0] != undefined) {
      document.getElementById('to_connect').value = hi['connection_timeout'][0]['connectTime'];
      document.getElementById('to_send').value = hi['connection_timeout'][0]['sendTime'];
      document.getElementById('to_read').value = hi['connection_timeout'][0]['readTime'];
   }
   // option 16
   if (typeof hi['hostheader'] != "undefined" && hi['hostheader'][0] != undefined) {
      document.getElementById('hostUrl').value = hi['hostheader'][0]['value'];
   }
   // option 17
   if (typeof hi['cachecontrol'] != "undefined" && hi['cachecontrol'] != undefined) {
      document.getElementById('cache-control-switch').checked = hi['cachecontrol'];
   }
   // option 18
   if (typeof hi['ratelimit'] != "undefined" && hi['ratelimit']['data'] != undefined) {
      document.getElementById('modal-ddos-msg').value = hi['ratelimit']['data']['rlsf_description'] ?? "";
      document.getElementById('modal-ddos-requests').value = hi['ratelimit']['data']['rlsf_requestcount'];
      // document.getElementById('modal-ddos-timerange').value = hi['ratelimit']['data']['rlsf_timerate'];
      document.querySelector('#showUnit .current-item').setAttribute('data-value', hi['ratelimit']['data']['rlsf_timeformat'] === "m" ? "در دقیقه" : "در ثانیه");
      document.querySelector('#showUnit .current-item').innerHTML = hi['ratelimit']['data']['rlsf_timeformat'] === "m" ? "در دقیقه" : "در ثانیه";
      document.querySelector('#showBlockUnit .current-item').setAttribute('data-value', hi['ratelimit']['data']['rlsf_blockedbytimerange']);
      if (hi['ratelimit']['data']['rlsf_blockedbytimerange'] > 3600)
         document.querySelector('#showBlockUnit .current-item').innerHTML = (parseInt(hi['ratelimit']['data']['rlsf_blockedbytimerange']) / 3600) + " ساعت";
      else if (hi['ratelimit']['data']['rlsf_blockedbytimerange'] > 60)
         document.querySelector('#showBlockUnit .current-item').innerHTML = (parseInt(hi['ratelimit']['data']['rlsf_blockedbytimerange']) / 60) + " دقیقه";
      else
         document.querySelector('#showBlockUnit .current-item').innerHTML = (parseInt(hi['ratelimit']['data']['rlsf_blockedbytimerange']) / 1) + " ثانیه";

      // document.getElementById('burst-switch').checked = hi['ratelimit']['data']['rlsfburst'] == 1;
      if (hi['ratelimit']['data']['rangeips'].length > 0 && hi['ratelimit']['data']['rangeips'][0] !== "") {
         document.getElementById('modal-box-ip').innerHTML = '';
         hi['ratelimit']['data']['rangeips'].forEach(ip => {
            document.getElementById('modal-box-ip').innerHTML += `
               <div class="ip EnFont" data-value="${ip}"><i class="remove-ip"><img title="حذف" src="/general/images/root/ico_menu_close.svg"></i>${ip}</div>
            `;
         });
      }
   }

}




// function setDataEditRule(folderid, subject) {

//    subfolder = folderid;
//    document.getElementById('sendRule').innerHTML = 'ویرایش';
//    $("#addRule").modal("show");
//    for (const [key, value] of Object.entries(arrayR)) {
//       if (value == subject) R = key
//    }
//    (document.querySelectorAll('#rulelist li')).forEach(element => {
//       if (element.getAttribute('data-action') == R) element.click();
//          document.getElementById('add-rule-select').style.display = 'none';
//    });

//    getDataEditRule(folderid);

// }

function setDataEditRule(folderid, subject, cluster = null) {
   subfolder = folderid;
   nullifier();
   subfolder = folderid;
   $('#sendRule').html('ویرایش');
   // $('#modeJx').html('');
   $("#addRule").modal("show");
   for (const [key, value] of Object.entries(arrayR)) {
      if (value == subject) R = key;
   }
   (document.querySelectorAll('#rulelist li')).forEach(element => {
      if (element.getAttribute('data-action') == R) {
         element.click();
         $('#addRule').find('#Optionsrule').remove();
         document.getElementById('showrule').classList.add("not-allow");
      }
   });
   console.log(cluster);
   if (cluster !== null) {
      document.getElementById('showCluster').innerHTML = `
         <span class="current-item fs-14"> ${cluster} </span>
         <img class="imgexp img-collapse" src="/general/images/root/ico_arrow_down_disabled.svg">
      `;
   } else {
      document.getElementById('showCluster').innerHTML = `شما کلاستری نداید`;

   }


   getDataEditRule(folderid);

}