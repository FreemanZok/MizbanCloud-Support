async function newGroup() {
    let byebye = false;
    document.getElementById('group-name-Err').classList.add('d-none');
    document.getElementById('group-desc-Err').classList.add('d-none');
    document.getElementById('sendfirewallGp').setAttribute('disabled', 'disabled');
    document.getElementById('generalKey').classList.remove('alert-danger-border');
    document.getElementById('key-name').classList.remove('alert-danger-border');

    document.getElementById('sendfirewallGp').innerHTML = `<img src="/general/loading/tail-spin.svg" />`;
    if(document.getElementById('key-name').value.length < 1) {
        document.getElementById('sendfirewallGp').innerHTML = 'اضافه کردن';
        document.getElementById('sendfirewallGp').removeAttribute('disabled');
        document.getElementById('group-name-Err').classList.remove('d-none');
        document.getElementById('key-name').classList.add('alert-danger-border');
        byebye = true;
    }
    if(document.getElementById('generalKey').value.length < 1) {
        document.getElementById('sendfirewallGp').innerHTML = 'اضافه کردن';
        document.getElementById('sendfirewallGp').removeAttribute('disabled');
        document.getElementById('group-desc-Err').classList.remove('d-none');
        document.getElementById('generalKey').classList.add('alert-danger-border');
        byebye = true;
    }
    if (byebye) return;
    let body = new FormData();
    body.append("fwName", document.getElementById('key-name').value);
    body.append("fwDescription", document.getElementById('generalKey').value);
    const res = await fetch("/submit/cloud/firewall/add-group", {method:"POST", body}).then(r=>r.json()).then(j=>j).catch(ex => window.location.reload());
    console.log(res);
    showAlert(res.status, res.message);
    if (res.status === "success") {
        $('#addGp').modal('hide');
        $('#FirewallCloudList').prepend(addGroupToScreen(res.id, document.getElementById('key-name').value, res.data.data[0]));
    }
    document.getElementById('sendfirewallGp').innerHTML = 'اضافه کردن';
    document.getElementById('sendfirewallGp').removeAttribute('disabled');
}

async function removeGroup(id) {
    let method = "POST", body = new FormData();
    body.append("fwid", id);
    const res = await fetch("/submit/cloud/firewall/remove-group", { method, body})
    .then(r=>r.json()).then(j=>j).catch(ex => window.location.reload());
    showAlert(res.status, res.message);
    if (res.status === "success") {
        $('#fw-acc-'+id).slideUp(450, function() { $('#fw-acc-'+id).remove() });
    }
}

function groupNullifier() {
    document.getElementById('key-name').value = '';
    document.getElementById('generalKey').value = '';
}

function addGroupToScreen(id, name, rulee) {
    console.log("in Sparkle: "+rulee);
    const Sparkle = `
        <div class="accordion-item" id="fw-acc-${id}">
        <h2 class="accordion-header" id="flush-heading${id}">
            <button 
            class="accordion-button w-100 collapsed"
            type="button" data-bs-toggle="collapse" sdata-bs-target="#active-flush-collapse${id}" aria-expanded="false" aria-controls="active-flush-collapse${id}">
                <div class="col-2 col-sm-4 col-md-8 position-relative rule-operation-wrap">
                    <ul class="d-flex justify-content-start align-items-center list-unstyled mb-0 fnlist">
                         
                        <li class="remove-item" title="حذف" onclick="mySWA((() => removeGroup('${id}')),'اخطار'
                            ,  'آیا از حذف این گروه مطمئنید؟'
                            )">
                                <span>
                                    <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="حذف" class="sublink" src="/general/images/new/ico_delete.svg" alt="">
                                </span>
                                <span class="fnlist-title">حذف</span>
                        </li> 
                        <li title="افزودن قانون" onclick="addFireCloudRule('${id}')">
                            <span>
                                <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="افزودن قانون" class="sublink" src="/general/images/new/ico_add_rule.svg" alt="">
                            </span>
                            <span class="fnlist-title">افزودن قانون</span>
                        </li>                   
                    </ul>
                    <span class="fnlist-options">
                        <img src="/general/images/root/topMenu/ico_dotted_ico.svg">
                    </span>
                </div>
                <div class="col-10 col-sm-8 col-md-4 rule-name-col">
                    <p class="tl mb-0 ltr fs-14 EnFont px-2">
                    ${name}
                    </p>
                </div>
            </button>
        </h2>

        <div id="active-flush-collapse${id}" class="collapse" aria-labelledby="flush-heading${id}" data-bs-parent="#FirewallCloudList">
        <div class="accordion-body p-0" id="acbody${id}">
            <div class="d-flex row-accordion-body align-items-center">
                <div class="col-2 col-sm-3 col-md-2 rule-operation-wrap">
                    <p class="fs-13 fw-400 mb-0 ws-05">عملیات</p>
                </div>
                <div class="col-2 col-sm-2 col-md-2 d-none d-sm-block">
                    <p class="fs-13 fw-400 mb-0 ws-05">مبدا/مقصد</p>
                </div>
                <div class="col-2 col-md-1 d-none d-sm-block">
                    <p class="fs-13 fw-400 mb-0 ws-05">پورت ها</p>
                </div>
                <div class="col-3 col-sm-2 col-md-1 fcport-col">
                    <p class="fs-13 fw-400 mb-0  ws-05">پروتکل</p>
                </div>
                <div class="col-sm-3 col-md-4 d-none d-md-block">
                    <p class="fs-13 fw-400 mb-0 ws-05">توضیحات</p>
                </div>
                <div class="col-7 col-sm-3 col-md-2">
                    <p class="fs-13 fw-400 mb-0 ws-05 ltr">نوع</p>
                </div>
            </div>
            <div class="d-flex flex-wrap row-accordion-body align-items-center subsubsub" id="subsub${rulee.id}">
                <div class="col-2 col-sm-3 col-md-2 position-relative rule-operation-wrap">
                    <ul class="d-flex justify-content-start align-items-center list-unstyled mb-0 fnlist">
                        <li class="remove-item" title="حذف" onclick="myDeleteSWA((()=>removeRule('${rulee.id}', '${id}')), 'اخطار', 'آیا از حذف این قانون مطمئنید؟')">
                            <span>
                                <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="حذف" class="sublink" src="/general/images/new/ico_delete.svg" alt="">
                            </span>
                            <span class="fnlist-title">حذف</span>
                        </li>
                    </ul>
                    <span class="fnlist-options">
                        <img src="/general/images/root/topMenu/ico_dotted_ico.svg">
                    </span>
                </div>
                <div class="col-2 col-sm-2 col-md-2 d-none d-sm-block">
                    <p class="fs-13 fw-400 mb-0 ws-05">${rulee.ip}</p>
                </div>
                <div class="col-3 col-sm-2 col-md-1 fcport-col">
                    <p class="fs-13 fw-400 mb-0 ws-05">${rulee.port}</p>
                </div>
                <div class="col-2 col-sm-2 col-md-1 d-none d-sm-block">
                    <p class="fs-13 fw-400 mb-0 ws-05">${rulee.protocol}</p>
                </div>
                <div class="col-12 col-md-4 col-lg-4 d-none d-sm-block cloud-firewall-descCol">
                    <p class="fs-13 fw-400 mb-0 ws-05">${rulee.description}</p>
                </div>
                <div class="col-7 col-sm-3 col-md-2">
                    <p class="tl mb-0 ltr fs-13 fw-400">
                        ${rulee.trafictype}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
    `;

return Sparkle;
}






async function addRule() {
    let byebye = false;
    const protocol = document.querySelector('#show-firewall-cloud .current-item').getAttribute('data-value');
    const port = document.getElementById('txtport-firewall');
    const ip = document.getElementById('txtcloudip-firewall');
    // const msg = document.getElementById('firewall-cloud-msg');

    port.classList.remove('alert-danger-border');
    ip.classList.remove('alert-danger-border');
    // msg.classList.remove('alert-danger-border');
    document.getElementById('sendFirewallCloudRule').setAttribute("disabled", "disabled");
    document.getElementById('sendFirewallCloudRule').innerHTML = `<img src="/general/loading/tail-spin.svg" />`;
    if (protocol === "optional") {
        if (!/^[0-9]{1,5}$/.test(port.value) || parseInt(port.value) > 65535) {
            port.classList.add('alert-danger-border');
            byebye = true;
        }
    } else port.value = '';

    // if(ip.value.contains('/')) {
    //     ip.classList.add('alert-danger-border');
    //     byebye = true;
    // }
    if (!checkIP(ip.id) && !/^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/gi.test(ip.value)) {
        ip.classList.add('alert-danger-border');
        byebye = true;
    }
    // if (!/^.+$/.test(msg.value)) {
    //     msg.classList.add('alert-danger-border');
    //     byebye = true;
    // }
    if (byebye) {
        document.getElementById('sendFirewallCloudRule').removeAttribute("disabled");
        document.getElementById('sendFirewallCloudRule').innerHTML = `اضافه کردن`;
        return;
    }

    const ipType = /^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/gi.test(ip.value) ? "6" : "4";
    let body = new FormData();
    body.append("ptc", protocol === "optional" ? "Other Protocol": protocol);
    body.append("prt", port.value);
    body.append("ipi", ip.value);
    body.append("ipv", ipType);
    body.append("fwid", fiwaid);
    body.append("desc", document.getElementById('firewall-cloud-msg').value);
    // body.append("msg", msg.value);
    body.append("tt", document.getElementById('inputOption').checked? "inbound":"outbound");
    const res = await fetch("/submit/cloud/firewall/add-rule", {method:"POST", body}).then(r=>r.json()).then(j=>j).catch(ex => window.location.reload());
    console.log(res);
    showAlert(res.status, res.message);
    if (res.status === "success") {
        document.getElementById('acbody'+fiwaid).innerHTML += addRuleToScreen(fiwaid,
            res.id, ip.value, port.value, protocol === "optional" ?
        "Other Protocol" : protocol, document.getElementById('inputOption').checked, document.getElementById('firewall-cloud-msg').value)
        $('#addFirewallCloud').modal('hide');
        ip.value = '';
        port.value = '';
        document.getElementById('inputOption').checked = true;
        document.getElementById('outputOption').checked = false;
        document.getElementById('firewall-cloud-msg').value = '';
        document.getElementById('show-firewall-cloud').innerHTML = `
        <span class="current-item fs-14" data-value="optional">اختیاری</span>
        <img class="imgexp img-collapse img-collapsed" src="/general/images/root/ico_arrow_down_disabled.svg">
        `;
    }
    document.getElementById('sendFirewallCloudRule').removeAttribute("disabled");
    document.getElementById('sendFirewallCloudRule').innerHTML = `اضافه کردن`;
}

async function removeRule(id, fwid) {
    let method = "POST", body = new FormData();
    body.append("id", id);
    body.append("fwid", fwid);
    const res = await fetch("/submit/cloud/firewall/remove-rule", { method, body})
    .then(r=>r.json()).then(j=>j).catch(ex => window.location.reload());
    showAlert(res.status, res.message);
    if (res.status === "success") {
        $('#subsub'+id).slideUp(450, function() { $('#subsub'+id).remove() });
    }
}

function addRuleToScreen(id, rid, ip, port, protocol, inbound, description = '') {
    const bound = inbound ? "inbound" : "outbound" ;
    const Sparkle = `
    <div class="d-flex flex-wrap row-accordion-body align-items-center subsubsub" id="subsub${rid}">
        <div class="col-2 col-sm-3 col-md-2 position-relative rule-operation-wrap">
            <ul class="d-flex justify-content-start align-items-center list-unstyled mb-0 fnlist">
                <li class="remove-item" title="حذف" onclick="myDeleteSWA((()=>removeRule('${rid}', '${id}')), 'اخطار', 'آیا از حذف این قانون مطمئنید؟')">
                    <span>
                        <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="حذف" class="sublink" src="/general/images/new/ico_delete.svg" alt="">
                    </span>
                    <span class="fnlist-title">حذف</span>
                </li>
            </ul>
            <span class="fnlist-options">
                <img src="/general/images/root/topMenu/ico_dotted_ico.svg">
            </span>
        </div>
        <div class="col-2 col-sm-2 col-md-2 d-none d-sm-block">
            <p class="fs-13 fw-400 mb-0 ws-05">${ip}</p>
        </div>
        <div class="col-3 col-sm-2 col-md-1 fcport-col">
            <p class="fs-13 fw-400 mb-0 ws-05">${port}</p>
        </div>
        <div class="col-2 col-sm-2 col-md-1 d-none d-sm-block">
            <p class="fs-13 fw-400 mb-0 ws-05">${protocol}</p>
        </div>
        <div class="col-12 col-md-4 col-lg-4 d-none d-sm-block cloud-firewall-descCol">
            <p class="fs-13 fw-400 mb-0 ws-05">${description}</p>
        </div>
        <div class="col-7 col-sm-3 col-md-2">
            <p class="tl mb-0 ltr fs-13 fw-400">
                ${bound}
            </p>
        </div>
    </div>
    `;
    return Sparkle;
}



function portCheck() {
    if(document.querySelector('#show-firewall-cloud .current-item').getAttribute('data-value') !== "optional") {
        console.log("event add d-none");
        document.getElementById("popo").classList.add('d-none');
        document.getElementById("txtport-firewall").classList.add('d-none');
    } else {
        console.log("event remove d-none");
        document.getElementById("popo").classList.remove('d-none');
        document.getElementById("txtport-firewall").classList.remove('d-none');
    }
}

document.getElementById('addFirewallCloud').addEventListener("click", portCheck);
