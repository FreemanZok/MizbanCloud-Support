//////////////////////////////////////////////////////// DOM AND LISTENERS ////////////////////////////////////////////////////////
function switchGatewayField() {
    if (!document.getElementById('gateway-switch').checked) {
        document.getElementById('gw1').classList.add('d-none');
        document.getElementById('txtgateway-network').classList.add('d-none');
    } else {
        document.getElementById('gw1').classList.remove('d-none');
        document.getElementById('txtgateway-network').classList.remove('d-none');
    } 
}
function switchDhcpField() {
    if (!document.getElementById('DHCP-switch').checked) {
        document.querySelectorAll('#dhcpZone input[type="text"]').forEach(x => x.parentNode.parentNode.classList.add("d-none"));
        document.getElementById('azta').classList.add('d-none');
    } else {
        document.querySelectorAll('#dhcpZone input[type="text"]').forEach(x => x.parentNode.parentNode.classList.remove("d-none"));
        document.getElementById('azta').classList.remove('d-none');
    } 
}
 
//////////////////////////////////////////////////////// DOM AND LISTENERS ////////////////////////////////////////////////////////




function removeIp(nid) {
    const mode = "اخطار";
    const text = "آیا از حذف این رنج آیپی مطمئنید؟";
    const callback = () => removeNetwork(nid)
    myDeleteSWA(callback, mode, text);
}

async function removeNetwork(nid) {
    let method = "POST", body = new FormData;
    body.append("nid", nid);
    const resp = await fetch("/submit/cloud/networks/remove-private", { method, body })
    .then(r=>r.json()).then(j=>j).catch(ex => window.location.reload());

    showAlert(resp.status, resp.message);
    if(resp.status === "success") {
        document.getElementById(`acc${nid}`).remove();
    }
}

async function addPrivateNetwork() {
    let invalid = false;
   
   
    const title_dom = document.getElementById('txtname-network');
    const ipRange_dom = document.getElementById('txtsubnet-network');
    const gateway_dom = document.getElementById('txtgateway-network');
    const gatewaySwitch = document.getElementById('gateway-switch').checked;
    const dhcpSwitch = document.getElementById('DHCP-switch').checked;
    const dnsMain_dom = document.getElementById('txtDNS');

    // reset
    title_dom.classList.remove("alert-danger-border");
    ipRange_dom.classList.remove("alert-danger-border");
    gateway_dom.classList.remove("alert-danger-border");
    dnsMain_dom.classList.remove('alert-danger-border');




    if ( !/^[A-z0-9]+$/gi.test(title_dom.value) || title_dom.value.includes("\\") || title_dom.value.includes("^") ) {
        title_dom.classList.add("alert-danger-border");
        invalid = true;
    }
    if ( !checkIP(ipRange_dom.id) || ipRange_dom.value.includes("\\") || ipRange_dom.value.includes("^") || !ipRange_dom.value.includes("/") ){
        ipRange_dom.classList.add("alert-danger-border");
        invalid = true;
    }
    if( !ipRange_dom.value.includes('/24') && !ipRange_dom.value.includes('/25') && !ipRange_dom.value.includes('/26') && !ipRange_dom.value.includes('/27') && !ipRange_dom.value.includes('/28') && !ipRange_dom.value.includes('/29') ) {
        ipRange_dom.classList.add("alert-danger-border");
        invalid = true;
    }
    
    if (true) {     // a validation for local ips
        
        const explosion = ipRange_dom.value.split('/');
        const range = parseInt(explosion[1]);
        const ipCells = explosion[0].split('.');
        if ( 24 > range || range > 29) {
            ipRange_dom.classList.add("alert-danger-border");
            invalid = true;
        }
        console.log(ipCells[0]);
        if (ipCells[0] != 10 && ipCells[0] != 172 && ipCells[0] != 192) {
            ipRange_dom.classList.add("alert-danger-border");
            invalid = true;
        }
        if (ipCells[0] == 172 && (parseInt(ipCells[1]) < 16 || parseInt(ipCells[1]) > 31) ) {
            ipRange_dom.classList.add("alert-danger-border");
            invalid = true;
        }
        if (ipCells[0] == 192 && ipCells[1] != 168) {
            ipRange_dom.classList.add("alert-danger-border");
            invalid = true;
        }

    }

    if (gatewaySwitch) {
        if ( !checkIP(gateway_dom.id) || gateway_dom.value.includes('\\') || gateway_dom.value.includes('/') || gateway_dom.value.includes('^') ) {
            gateway_dom.classList.add("alert-danger-border");
            invalid = true;
        }
    }

 
    console.log($("#DHCP-switch").prop("checked"))
    if($("#DHCP-switch").prop("checked")=="true"){
        console.log(55555)

        if (!dhcpChecker("dhcp-from", "dhcp-to")) invalid = true;
        let i = 2;
        while(document.getElementById(`dhcp-from-${i}`)) {
            if(!dhcpChecker(`dhcp-from-${i}`, `dhcp-to-${i}`)) {
                invalid = true;
            }
            i++;
        }
    }

    if ( !checkIP('txtDNS')  || dnsMain_dom.value.includes("\\") || dnsMain_dom.value.includes("/") || dnsMain_dom.value.includes("^") ) {
        dnsMain_dom.classList.add('alert-danger-border');
        invalid = true;
    }
    let dn = 2;

       while(document.getElementById('txtDNS-'+dn)) {
                const er = document.getElementById('txtDNS-'+dn);
                er.classList.remove('alert-danger-border');
                if ( !checkIP('txtDNS-'+dn) || er.value.includes("\\") || er.value.includes("/") || er.value.includes("^") ) {
                    er.classList.add('alert-danger-border');
                    invalid = true;
                }
                dn++;
         }
    
    if (invalid) return;

    const body = new FormData();
    body.append("name", title_dom.value);
    body.append("ipRange", ipRange_dom.value);
    body.append("gateway", gatewaySwitch ? "true" : "false");
    body.append("gatewayip", gateway_dom.value);
    body.append("dhcpSwitch", dhcpSwitch ? "true" : "false");

    let dhcpList = "-";

     console.log($("#DHCP-switch").prop("checked"))
    if(document.getElementById("DHCP-switch").checked){
        dhcpList=document.getElementById(`dhcp-from`).value + '-' + document.getElementById(`dhcp-to`).value;
  
        console.log("2222")
    let j = 2;
    while(document.getElementById('dhcp-from-'+j)) {
        dhcpList += ','+document.getElementById(`dhcp-from-${j}`).value + '-' + document.getElementById(`dhcp-to-${j}`).value;
        j++;
        console.log("j>>>>>"+j)
    }
   
}
    body.append("dhcp", dhcpList);
    
    let dnsList = document.getElementById('txtDNS').value;
    let d = 2;
    while(document.getElementById('txtDNS-'+d)) {
        dnsList+='-'+ document.getElementById('txtDNS-'+d).value;
        d++;
    }
    body.append("dns", dnsList);

    document.getElementById("sendNetwork").setAttribute("disabled", "disabled");
    document.getElementById("sendNetwork").innerHTML = `<img src="/general/loading/tail-spin.svg" />`;

    const result = await fetch("/submit/cloud/networks/add-private", { method: "POST", body})
    .then(r=>r.json())
    .then(j=>j).catch(ex => window.location.reload());

    console.log(result);

    showAlert(result.status, result.message);
    if ( result.status == "success" ) {
        $("#addNetworkCloud").modal("hide");
        document.getElementById("emptyStt")?.remove();
        document.getElementById("sendNetwork").removeAttribute("disabled");
        document.getElementById("sendNetwork").innerHTML = `اضافه کردن`;
        document.getElementById('NetworkCloudList').innerHTML += 
        `
            <div class="accordion-item" id="acc${result.id}">
                <h2 class="accordion-header" id="flush-heading${result.id}">
                    <div class="accordion-button w-100 collapsed">
                        <div class="col-2 col-sm-2 col-md-3 position-relative">
                            <ul class="d-flex justify-content-start align-items-center list-unstyled mb-0 fnlist">
                                <li title="حذف">
                                    <span onclick="removeIp('${result.id}')">
                                        <img class="sublink" src="/general/images/new/ico_delete.svg" alt="">
                                    </span>
                                    <span class="fnlist-title">حذف</span>
                                </li>  
                                <li title="ویرایش">
                                    <span class="">
                                        <img class="sublink" onclick="showEdit('${result.id}')" src="/general/images/new/ico_manage.svg" alt="">
                                    </span>
                                    <span class="fnlist-title">ویرایش</span>
                                </li>                    
                            </ul>
                            <span class="fnlist-options">
                                <img src="/general/images/root/topMenu/ico_dotted_ico.svg">
                            </span>
                        </div>
                        <div class="col-5 col-sm-5 col-md-5 network-rangeip-col">
                            <p class="mb-0 fs-14 fw-500 EnFont">
                                ${ipRange_dom.value}
                            </p>
                        </div>
                        <div class="col-2 col-sm-2 col-md-2 network-name-col">
                            <p class="mb-0 fs-14 fw-500 EnFont">
                                ${title_dom.value}
                            </p>
                        </div>
                        <input type="hidden" id="name-hide-${result.id}" value="${title_dom.value}" />
                        <input type="hidden" id="rangeip-hide-${result.id}" value="${ipRange_dom.value}" />
                        <input type="hidden" id="gateway_enabled-hide-${result.id}" value="${dnsList}" />
                        <input type="hidden" id="gatewayip-hide-${result.id}" value="${gateway_dom.value}" />
                        <input type="hidden" id="dhcp_pool-hide-${result.id}" value="${dhcpList}" />
                        <input type="hidden" id="dns-hide-${result.id}" value="${dnsList}" /> 

                        <div class="col-3 col-sm-3 col-md-2 tl network-status-col">
                            <span  class=" border-0 rounded-pill btn-sm px-3 py-1 fs-14 ls-02 fw-500 network-status">
                                فعال
                            </span>
                        </div>
                    </div>
                </h2>
            </div>
        `

    } else {
        document.getElementById("sendNetwork").removeAttribute("disabled");
        document.getElementById("sendNetwork").innerHTML = `اضافه کردن`;
    }
}

async function EditPrivateNetwork(id){
    let invalid = false;
   
   
    const title_dom = document.getElementById('txtname-network');
    const ipRange_dom = document.getElementById('txtsubnet-network');
    const gateway_dom = document.getElementById('txtgateway-network');
    const gatewaySwitch = document.getElementById('gateway-switch').checked;
    const dhcpSwitch = document.getElementById('DHCP-switch').checked;
    const dnsMain_dom = document.getElementById('txtDNS');

    // reset
    title_dom.classList.remove("alert-danger-border");
    ipRange_dom.classList.remove("alert-danger-border");
    gateway_dom.classList.remove("alert-danger-border");
    dnsMain_dom.classList.remove('alert-danger-border');




    if ( !/^[A-z0-9]+$/gi.test(title_dom.value) || title_dom.value.includes("\\") || title_dom.value.includes("^") ) {
        title_dom.classList.add("alert-danger-border");
        invalid = true;
    }
    if ( !checkIP(ipRange_dom.id) || ipRange_dom.value.includes("\\") || ipRange_dom.value.includes("^") || !ipRange_dom.value.includes("/") ){
        ipRange_dom.classList.add("alert-danger-border");
        invalid = true;
    }
    if( !ipRange_dom.value.includes('/24') && !ipRange_dom.value.includes('/25') && !ipRange_dom.value.includes('/26') && !ipRange_dom.value.includes('/27') && !ipRange_dom.value.includes('/28') && !ipRange_dom.value.includes('/29') ) {
        ipRange_dom.classList.add("alert-danger-border");
        invalid = true;
    }
    
    if (true) {     // a validation for local ips
        
        const explosion = ipRange_dom.value.split('/');
        const range = parseInt(explosion[1]);
        const ipCells = explosion[0].split('.');
        if ( 24 > range || range > 29) {
            ipRange_dom.classList.add("alert-danger-border");
            invalid = true;
        }
        console.log(ipCells[0]);
        if (ipCells[0] != 10 && ipCells[0] != 172 && ipCells[0] != 192) {
            ipRange_dom.classList.add("alert-danger-border");
            invalid = true;
        }
        if (ipCells[0] == 172 && (parseInt(ipCells[1]) < 16 || parseInt(ipCells[1]) > 31) ) {
            ipRange_dom.classList.add("alert-danger-border");
            invalid = true;
        }
        if (ipCells[0] == 192 && ipCells[1] != 168) {
            ipRange_dom.classList.add("alert-danger-border");
            invalid = true;
        }

    }

    if (gatewaySwitch) {
        if ( !checkIP(gateway_dom.id) || gateway_dom.value.includes('\\') || gateway_dom.value.includes('/') || gateway_dom.value.includes('^') ) {
            gateway_dom.classList.add("alert-danger-border");
            invalid = true;
        }
    }

 
    console.log($("#DHCP-switch").prop("checked"))
    if($("#DHCP-switch").prop("checked")=="true"){
        console.log(55555)

        if (!dhcpChecker("dhcp-from", "dhcp-to")) invalid = true;
        let i = 2;
        while(document.getElementById(`dhcp-from-${i}`)) {
            if(!dhcpChecker(`dhcp-from-${i}`, `dhcp-to-${i}`)) {
                invalid = true;
            }
            i++;
        }
    }

    if ( !checkIP('txtDNS')  || dnsMain_dom.value.includes("\\") || dnsMain_dom.value.includes("/") || dnsMain_dom.value.includes("^") ) {
        dnsMain_dom.classList.add('alert-danger-border');
        invalid = true;
    }
    let dn = 2;

       while(document.getElementById('txtDNS-'+dn)) {
                const er = document.getElementById('txtDNS-'+dn);
                er.classList.remove('alert-danger-border');
                if ( !checkIP('txtDNS-'+dn) || er.value.includes("\\") || er.value.includes("/") || er.value.includes("^") ) {
                    er.classList.add('alert-danger-border');
                    invalid = true;
                }
                dn++;
         }
    
    if (invalid) return;

    const body = new FormData();
    body.append("name", title_dom.value);
    body.append("ipRange", ipRange_dom.value);
    body.append("gateway", gatewaySwitch ? "true" : "false");
    body.append("gatewayip", gateway_dom.value);

    let dhcpList = "-";

     console.log($("#DHCP-switch").prop("checked"))
    if(document.getElementById("DHCP-switch").checked){
        dhcpList=document.getElementById(`dhcp-from`).value + '-' + document.getElementById(`dhcp-to`).value;
  
         
    let j = 2;
    while(document.getElementById('dhcp-from-'+j)) {
        dhcpList += ','+document.getElementById(`dhcp-from-${j}`).value + '-' + document.getElementById(`dhcp-to-${j}`).value;
        j++;
        console.log("j>>>>>"+j)
    }
   
}
    body.append("dhcp", dhcpList);
    
    let dnsList = document.getElementById('txtDNS').value;
    let d = 2;
    while(document.getElementById('txtDNS-'+d)) {
        dnsList+='-'+ document.getElementById('txtDNS-'+d).value;
        d++;
    }
    body.append("dns", dnsList);
    body.append("id", id);

    document.getElementById("sendNetwork").setAttribute("disabled", "disabled");
    document.getElementById("sendNetwork").innerHTML = `<img src="/general/loading/tail-spin.svg" />`;

    const result = await fetch("/submit/cloud/networks/update-private", { method: "POST", body})
    .then(r=>r.json());
    //.then(j=>j).catch(ex => window.location.reload()
   // );

    console.log(result);

    showAlert(result.status, result.message);
    if ( result.status == "success" ) {
        $("#addNetworkCloud").modal("hide");
        document.getElementById("emptyStt")?.remove();
        document.getElementById("sendNetwork").removeAttribute("disabled");
        document.getElementById("sendNetwork").innerHTML = `اضافه کردن`;
        document.getElementById('hiddenblocks-'+id).innerHTML = 
        `
                        <input type="hidden" id="name-hide-${id}" value="${title_dom.value}" />
                        <input type="hidden" id="rangeip-hide-${id}" value="${ipRange_dom.value}" />
                        <input type="hidden" id="gateway_enabled-hide-${id}" value="${dnsList}" />
                        <input type="hidden" id="gatewayip-hide-${id}" value="${gateway_dom.value}" />
                        <input type="hidden" id="dhcp_pool-hide-${id}" value="${dhcpList}" />
                        <input type="hidden" id="dns-hide-${id}" value="${dnsList}" /> 
        `

    } else {
        document.getElementById("sendNetwork").removeAttribute("disabled");
        document.getElementById("sendNetwork").innerHTML = `اضافه کردن`;
    }
}
function dhcpChecker(fromThis1, toThis1) {
    let flag = true;
    const fromThis = document.getElementById(fromThis1);
    const toThis = document.getElementById(toThis1);
    fromThis.classList.remove('alert-danger-border');
    toThis.classList.remove('alert-danger-border');

    if (
        !checkIP(fromThis.id) ||
        fromThis.value.includes('\\') ||
        fromThis.value.includes('/') ||
        fromThis.value.includes('^')
    ) {
        fromThis.classList.add('alert-danger-border');
        flag = false;
    }
    if (
        !checkIP(toThis.id) ||
        toThis.value.includes('\\') ||
        toThis.value.includes('/') ||
        toThis.value.includes('^')
    ) {
        toThis.classList.add('alert-danger-border');
        flag = false;
    }
    return flag;
}