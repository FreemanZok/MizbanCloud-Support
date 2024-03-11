async function underAttackMode(mode, ttlBox = null, e = undefined, targetCard = null, zizi = false) {
   console.log('', zizi);
   if (typeof e !== "undefined" && e != undefined) e.stopPropagation();
   if (!zizi && document.getElementById(targetCard).classList.contains('active_card')) return;

   document.getElementById('not-now').classList.remove('d-none');
   // if(mode == globalLevel && globalttl == document.querySelector(ttlBox).getAttribute('data-value')) return showAlert("success", "وضعیت کنونی برای شما ثبت شده است");
   let route;
   const dies = document.getElementById('dies');
   dies.classList.add('disable-element');
   dies.classList.add('not-allow');
   if (mode != "0") {
      globalLevel = mode;
      route = "/submit/cdn/ddos/website/under-attack";
   } else {
      route = "/submit/cdn/ddos/website/in-peace";
   }
   console.log(typeof ttlBox);
   if (typeof ttlBox === "string") {
      globalttl = document.querySelector(`#showvalidity${mode} .current-item`)?.getAttribute('data-value') ?? 0;
   }
   else globalttl = 0;
   let rBody = new FormData();
   rBody.append("wid", $wid);
   rBody.append("mode", globalLevel);

   if (ttlBox) rBody.append("ttl", globalttl);
   else rBody.append("ttl", "0");

   const rest = await fetch(
      route,
      { method: "POST", body: rBody }
   ).then(res => res.json()).then(ponse => ponse).catch(ex => window.location.reload());

   // console.log(rest);
   document.getElementById('not-now').classList.add('d-none');

   showAlert(rest.status, rest.message);
   if (rest.status === "success") {
      const target = targetCard;
      console.log(target);
      $('.ddos-card').removeClass('active_card');
      $('#' + target).addClass('active_card');

      $('.ddos-card input').removeAttr('checked');
      $('#' + target).find('input').attr('checked', 'checked');

      $('.validity-time-wrap').addClass('d-none');
      $('#' + target).find('.validity-time-wrap').removeClass('d-none');

      setTimeout(() => {
         $(".scroll-fix-height").css({
            position: 'absolute', // Optional if #dataCenteroption is already absolute
            visibility: 'hidden',
            display: 'block'
         });
         setTimeout(() => {
            $(".scroll-fix-height").attr("style", 'display: none');
         }, 300);
      }, 200);

   }
   dies.classList.remove('disable-element');
   dies.classList.remove('not-allow');

}





document.getElementById('showvalidity').addEventListener("change", async (e) => await underAttackMode("1", "#showvalidity .current-item"));
document.getElementById('showvalidity2').addEventListener("change", async (e) => await underAttackMode("2", "#showvalidity2 .current-item"));
document.getElementById('showvalidity3').addEventListener("change", async (e) => await underAttackMode("3", "#showvalidity3 .current-item"));

document.getElementById('1z').addEventListener("click", (e) => underAttackMode("0", null, null, "1z"));
document.getElementById('2z').addEventListener("click", (e) => underAttackMode("1", "#showvalidity .current-item", e, "2z"));
document.getElementById('3z').addEventListener("click", (e) => underAttackMode("2", "#showvalidity2 .current-item", e, "3z"));
document.getElementById('4z').addEventListener("click", (e) => underAttackMode("3", "#showvalidity3 .current-item", e, "4z"));
function zizi(e, zi) { return underAttackMode(zi - 1, `#showvalidity${zi == 2 ? '' : zi - 1} .current-item`, e, zi + "z", true) }

function changeStateUri(state, newDomain, newDomainid, newWebsite, newWebsiteid) {
   const uri = `/cdn/${newDomain}/${newDomainid}/${newWebsite}/${newWebsiteid}/ddos`;
   window.history.pushState(state, title, uri);
   document.title = `Mizban Cloud | Ddos`;
   $domain = newDomain;
   $did = newDomainid;
   $website = newWebsite;
   $wid = newWebsiteid;
   let dDom = document.querySelectorAll('.domainDom');
   let wDom = document.querySelectorAll('.websiteDom');
   dDom.forEach(dom => dom.innerHTML = newDomain);
   wDom.forEach(dom => dom.innerHTML = newWebsite);
   setSpaData();
   urlStateShifter($domain, $did, $website, $wid);
}

async function setSpaData() {
   let body = new FormData();
   body.append("wid", $wid);
   const data = await fetch("/submit/cdn/ddos/website/get-data", { method: "POST", body }).then(r => r.json()).then(j => j).catch(ex => window.location.reload());

   if (data[0]['code'] == 201) {
      document.getElementById('emptyStt').classList.remove('d-none');
      document.getElementById('dataZone').classList.add('d-none');
   }
   if (data[0]['code'] == 200) {
      const D = data[0]['data'];
      document.getElementById('emptyStt').classList.add('d-none');
      document.getElementById('dataZone').classList.remove('d-none');
      document.getElementById('zIpList').innerHTML = typeof D.rangeips === 'string' ? D.rangeips : D.rangeips.join(", ");
      document.getElementById('zLimit').innerHTML = D.rln_requestcount;
      document.getElementById('rlx2').innerHTML = D.rln_requestcount + ' درخواست ' + (D.rln_timeformat === 's' ? 'بر ثانیه' : 'بر دقیقه');
      document.getElementById('zRate').innerHTML = D.rln_requestcount + ' درخواست ' + (D.rln_timeformat === 's' ? 'بر ثانیه' : 'بر دقیقه');
      if (D.rln_blockedbytimerange > 3600) {
         document.getElementById('rlx1').innerHTML = D.rln_blockedbytimerange / 3600 + ' ساعت';
         document.getElementById('zLimit').innerHTML = D.rln_blockedbytimerange / 3600 + ' ساعت';
      } else if (D.rln_blockedbytimerange > 60) {
         document.getElementById('rlx1').innerHTML = D.rln_blockedbytimerange / 60 + ' دقیقه';
         document.getElementById('zLimit').innerHTML = D.rln_blockedbytimerange / 60 + ' دقیقه';
      } else {
         document.getElementById('rlx1').innerHTML = D.rln_blockedbytimerange + ' ثانیه';
         document.getElementById('zLimit').innerHTML = D.rln_blockedbytimerange + ' ثانیه';
      }
      document.getElementById('zDesc').innerHTML = D.rln_description;
      document.getElementById('rlx3').innerHTML = D.rln_description;
      // document.querySelector('.acc-title span').innerHTML = D.rl_desc;
   }
   if (data[1]['UnderAttackStatus'] == "deactive") { document.getElementById('DDos1').checked = true; document.querySelectorAll('.active_card').forEach(e => e.classList.remove('active_card')); document.getElementById('1z').classList.add('active_card') }
   else if (data[1]['UnderAttackStatus'] == "level1") { document.getElementById('DDos2').checked = true; document.querySelectorAll('.active_card').forEach(e => e.classList.remove('active_card')); document.getElementById('2z').classList.add('active_card') }
   else if (data[1]['UnderAttackStatus'] == "level2") { document.getElementById('DDos3').checked = true; document.querySelectorAll('.active_card').forEach(e => e.classList.remove('active_card')); document.getElementById('3z').classList.add('active_card') }
   else if (data[1]['UnderAttackStatus'] == "level3") { document.getElementById('DDos4').checked = true; document.querySelectorAll('.active_card').forEach(e => e.classList.remove('active_card')); document.getElementById('4z').classList.add('active_card') }

   console.log(data);
}


async function removeRL() {
   let body = new FormData();
   body.append("wid", $wid);
   const data = await fetch("/submit/cdn/ddos/website/remove-rl", { method: "POST", body })
      .then(r => r.json()).then(j => j).catch(ex => window.location.reload());
   showAlert(data.status, data.message);

   document.getElementById('dataZone').classList.add('d-none');
   document.getElementById('emptyStt').classList.remove('d-none');


}