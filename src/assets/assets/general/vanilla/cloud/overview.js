async function removeServers(id, confirmation) {
    if (confirmation.trim() !== `MizbanCloud/${$serverName}`) return showAlert('error', 'غبارت وارد شده اشتباه است');
    let serverInfo = new FormData();
    serverInfo.append('serverId', id);
    document.getElementById('deldombutton').innerHTML = '<img src="/general/loading/k-spin.svg" />';
    const result = await fetch('/submit/cloud/servers/remove-server', { method: 'POST', body: serverInfo })
        .then(response => response.json())
        .then(j => j).catch(ex => window.location.reload());
    if (result.status !== "success") document.getElementById('deldombutton').innerHTML = 'حذف';
    showAlert(result.status, result.message);
    if (result.status === 'success') {
        /*
        $('#p-' + id).slideUp(800 , function(self = this) {
            self.remove()
        });
        serverHistoryUpdate();
        */
        return window.location.href = "/cloud/servers"
    }
}

async function autoPilot() {
    const state = document.getElementById('pilot_switch').checked;
    let body = new FormData();
    body.append('serverID', $serverID);
    body.append('status', state ? "true" : "false");
    const result = await fetch('/submit/cloud/servers/auto-pilot', { method: 'POST', body })
        .then(response => response.json())
        .then(j => j).catch(ex => document.getElementById('pilot_switch').checked = !state);

    showAlert(result.status, result.message);
    if (result.status === "error") {
        document.getElementById('pilot_switch').checked = !state
    }
}

async function showConsole(id) {
    if (!['active'].includes($serverStatus)) return showAlert('err', 'سرور فعال نیست');
    $('#viewConsoleModal').modal('show');
    let serverInfo = new FormData();
    serverInfo.append('serverId', id);
    const result = await fetch('/submit/cloud/servers/get-vnc', { method: 'POST', body: serverInfo })
        .then(response => response.json())
        .then(j => j).catch(ex => window.location.reload());

    showAlert(result.status, result.message);
    if (result.status === 'success') {
        // $('html, body').animate({
        //     scrollTop: $("#console").offset().top
        // }, 2000);
        $("#console").attr("src", result.console);
        $("#console_href").attr("href", result.console);
        serverHistoryUpdate();
    }
}


async function enableRescueMode(id) {
    if (!['active', 'shutdown', 'off'].includes($serverStatus)) return showAlert('err', 'سرور فعال نیست');
    let serverInfo = new FormData();
    serverInfo.append('serverId', id);
    serverInfo.append('serverId', id);
    const result = await fetch('/submit/cloud/servers/enable-rescue-mode', { method: 'POST', body: serverInfo })
        .then(response => response.json())
        .then(j => j).catch(ex => window.location.reload());

    showAlert(result.status, result.message);
    if (result.status === 'success') {
        $('#p-' + id).slideUp(800, function (self = this) {
            self.remove()
        });
        serverHistoryUpdate();
    }
}


async function resizeServer(id) {
    if (!['active', 'shutdown', 'off'].includes($serverStatus)) return showAlert('err', 'سرور فعال نیست');

    document.getElementById("resizeservermodal").setAttribute("disabled", "disabled");
    document.getElementById("resizeservermodal").innerHTML = `<img src="/general/loading/tail-spin.svg" />`;
    let serverInfo = new FormData();
    let newRam = document.querySelector("#memSmall").value;
    let newCpu = document.querySelector("#coreSmall").value;
    let newStg = document.querySelector("#dae2").value;
    serverInfo.append('serverId', id);
    serverInfo.append('ram', newRam);
    serverInfo.append('cpu', newCpu);
    serverInfo.append('size', newStg);
    serverInfo.append('vid', $main_storage_id);
    serverInfo.append('sttype', $storage_type);
    const result = await fetch('/submit/cloud/servers/resize-server', { method: 'POST', body: serverInfo })
        .then(response => response.json())
        .then(j => j).catch(ex => window.location.reload());


    if (typeof result.status !== 'undefined') showAlert(result.status, result.message);
    document.getElementById("resizeservermodal").innerHTML = `تغییر اندازه`;
    document.getElementById("resizeservermodal").removeAttribute("disabled");

    if (result.status === 'success') {
        $("#resizeServer").modal("hide");
        document.querySelectorAll('.SHOWCPUMAIN').forEach(el => el.innerHTML = newCpu + ' Core');
        document.querySelectorAll('.SHOWRAMMAIN').forEach(el => el.innerHTML = newRam + ' GB');
        document.querySelectorAll('.SHOWSSDMAIN').forEach(el => el.innerHTML = newStg + ' GB');
        document.querySelector("#dae2").setAttribute('min', newStg);
        serverHistoryUpdate();
    } else if (result.status === "half") {
        showAlert(result.s1, result.m1);
        showAlert(result.s2, result.m2);
        if (result.s1 === 'success') {
            document.querySelectorAll('.SHOWCPUMAIN').forEach(el => el.innerHTML = newCpu + ' Core');
            document.querySelectorAll('.SHOWRAMMAIN').forEach(el => el.innerHTML = newRam + ' GB');
        } else if (result.s2 === 'success') {
            document.querySelectorAll('.SHOWSSDMAIN').forEach(el => el.innerHTML = newStg + ' GB');
            document.querySelector("#dae2").setAttribute('min', newStg);
        }
    }
}


async function changeHostname(id) {
    if (!['active', 'shutdown', 'off'].includes($serverStatus)) return showAlert('err', 'سرور فعال نیست');
    // validation
    let newHostname = document.getElementById("consolename-server").value;
    document.getElementById('consolename-server').classList.remove('alert-danger-border');
    if (!/^[A-z0-9\.\-]*$/gi.test(newHostname) || newHostname.includes('..') || document.getElementById("consolename-server").value.length == 0) {
        return document.getElementById('consolename-server').classList.add('alert-danger-border');
    }

    document.getElementById("consolename-server-btn").setAttribute("disabled", "disabled");
    document.getElementById("consolename-server-btn").innerHTML = `<img src="/general/loading/tail-spin.svg" />`;

    let serverInfo = new FormData();

    serverInfo.append('serverId', id);
    serverInfo.append('hostname', newHostname);
    const result = await fetch('/submit/cloud/servers/change-hostname', { method: 'POST', body: serverInfo })
        .then(response => response.json())
        .then(j => j).catch(ex => window.location.reload());

    showAlert(result.status, result.message);
    document.getElementById("consolename-server-btn").removeAttribute("disabled");
    document.getElementById("consolename-server-btn").innerHTML = `تغییر نام`;
    if (result.status === "success") {
        $('#editConsoleModal').modal('hide');
        document.querySelectorAll('.SERVERNAME').forEach(el => el.innerHTML = newHostname);
        serverHistoryUpdate();
    }
}


async function changeServerPassword(id) {
    if (!['active', 'shutdown', 'off'].includes($serverStatus)) return showAlert('err', 'سرور فعال نیست');

    let newPassword = document.getElementById("serverpassword").value;
    document.getElementById('serverpassword').classList.remove('alert-danger-border');
    document.getElementById('srvpass-nameErr').innerHTML = '';
    console.log(newPassword.length);
    if (newPassword.length < 8 || newPassword.length == 0) {
        document.getElementById('srvpass-nameErr').innerHTML = 'رمز عبور باید 8 کارکتر باشد';
        return document.getElementById('serverpassword').classList.add('alert-danger-border');
    }

    //document.getElementById("newPassphrase").setAttribute("disabled", "disabled");
    document.getElementById("newPassphrase").innerHTML = `<img src="/general/loading/tail-spin.svg" />`;

    let serverInfo = new FormData();

    serverInfo.append('serverId', id);
    serverInfo.append('password', newPassword);
    document.getElementById('newPassphrase').disabled = true;
    const result = await fetch('/submit/cloud/servers/change-password', { method: 'POST', body: serverInfo })
        .then(response => response.json())
        .then(j => j).catch(ex => window.location.reload());
    document.getElementById('newPassphrase').innerHTML = `ویرایش`;
    document.getElementById('newPassphrase').disabled = false;
    showAlert(result.status, result.message);
    serverHistoryUpdate();
    document.getElementById("newPassphrase").removeAttribute("disabled");
    document.getElementById("newPassphrase").innerHTML = `تغییر نام`;
}


async function hardReboot(id) {
    if (!['active', 'shutdown', 'off'].includes($serverStatus)) return showAlert('err', 'سرور فعال نیست');

    let serverInfo = new FormData();
    serverInfo.append('serverId', id);
    const result = await fetch('/submit/cloud/servers/hard-reboot', { method: 'POST', body: serverInfo })
        .then(response => response.json())
        .then(j => j).catch(ex => window.location.reload());
    serverHistoryUpdate();
    showAlert(result.status, result.message);
}

function changeOSAsk(id) {
    myDeleteSWA(() => changeOS(id), "اخطار", "با ادامه این فرایند تمام اطلاعات داخل سرور شما حذف خواهد شد، ادامه میدهید؟");
}
async function changeOS(id) {
    if (!['active', 'shutdown', 'off'].includes($serverStatus)) return showAlert('err', 'سرور فعال نیست');

    let os = document.querySelector("#showOpVersion span.current-item").innerHTML.trim();
    let dist = document.querySelector("#showOpSystem span.current-item").innerText.trim();
    console.log(os);
    if (os == "انتخاب کنید" || os.length == 0) {
        document.getElementById("select-osErr").classList.remove("d-none");
        return;
    } else {
        document.getElementById("select-osErr").classList.add("d-none");
        document.getElementById("changeOSbtn").innerHTML = `<img src="/general/loading/tail-spin.svg" />`;
    }
    let serverInfo = new FormData();
    serverInfo.append('serverId', id);
    serverInfo.append('osName', os);
    const result = await fetch('/submit/cloud/servers/change-os', { method: 'POST', body: serverInfo })
        .then(response => response.json())
        .then(j => j).catch(ex => window.location.reload());

    showAlert(result.status, result.message);
    if (result.status === 'success') {
        $("#refactorOs").modal("hide");
        document.getElementById("changeOSbtn").innerHTML = `بازسازی`;
        serverHistoryUpdate();
        getServerDetails(id);
        $('.server-img-wrap img:last').attr('src', `/general/images/cloud/server/cloud_overview_${dist}.png`);
        $('.server-info-title.SHOWOSMAIN:last').html(dist + ' ' + os);
    } else {
        document.getElementById("changeOSbtn").innerHTML = `بازسازی`;
    }

    serverHistoryUpdate();
}


async function powerOfforOn(self, id, status) {
    if (!['active', 'shutdown', 'off'].includes($serverStatus)) return showAlert('err', 'سرور فعال نیست');

    let serverInfo = new FormData();
    console.log(self);
    if (status == 0) {
        serverInfo.append('serverId', id);
        const result = await fetch('/submit/cloud/servers/power-off', { method: 'POST', body: serverInfo })
            .then(response => response.json())
            .then(j => j).catch(ex => window.location.reload());

        showAlert(result.status, result.message);
        if (result.status == "success") {
            // document.querySelector(".server-name span").innerHTML = 'خاموش';
            // self.classList.remove("off-server");
            // self.classList.add("on-server");
            // self.setAttribute("title", "روشن کردن ابرک");
            // self.setAttribute("data-bs-original-title", "روشن کردن ابرک");
            // $("#serverstate").attr("src","/general/images/new/server_off.svg");
            self.setAttribute("onclick", "mySWA( (() => powerOfforOn(this, " + id + ", 1)) ,'روشن کردن ابرک','از روشن کردن ابرک به ‌شکل سخت‌افزاری اطمینان دارید؟')");
        }
    } else {
        serverInfo.append('serverId', id);
        const result = await fetch('/submit/cloud/servers/power-on', { method: 'POST', body: serverInfo })
            .then(response => response.json())
            .then(j => j).catch(ex => window.location.reload());

        showAlert(result.status, result.message);
        if (result.status == "success") {
            // document.querySelector(".server-name span").innerHTML = 'روشن';
            // self.classList.remove("on-server");
            // self.classList.add("off-server");
            // self.removeAttribute("title");
            // self.setAttribute("title", "خاموش کردن ابرک");
            // $("#serverstate").attr("src","/general/images/new/server_on.svg");
            // self.setAttribute("data-bs-original-title", "خاموش کردن ابرک");
            self.setAttribute("onclick", "mySWA( (() => powerOfforOn(this, " + id + ", 0)) ,'خاموش کردن ابرک','از خاموش کردن ابرک به ‌شکل سخت‌افزاری اطمینان دارید؟')");
        }
    }
    serverHistoryUpdate();
    showAlert(serverInfo.status, serverInfo.message);
}


async function softReboot(id) {
    if (!['active', 'shutdown', 'off'].includes($serverStatus)) return showAlert('err', 'سرور فعال نیست');

    let serverInfo = new FormData();
    serverInfo.append('serverId', id);
    const result = await fetch('/submit/cloud/servers/soft-reboot', { method: 'POST', body: serverInfo })
        .then(response => response.json())
        .then(j => j).catch(ex => window.location.reload());
    serverHistoryUpdate();
    showAlert(result.status, result.message);
}


async function takeSnapShot(id) {
    if (!['active', 'shutdown', 'off'].includes($serverStatus)) return showAlert('err', 'سرور فعال نیست');

    let snapname = document.getElementById("snapshot-name").value;
    document.getElementById('snapshot-name').classList.remove('alert-danger-border');
    if (!/^[A-z0-9\-\._ ]+$/.test(snapname) || snapname.length == 0) {
        return document.getElementById('snapshot-name').classList.add('alert-danger-border');
    }

    // document.getElementById("takeSnapShot")?.innerHTML = `<img src="/general/loading/k-spin.svg" />`;
    let serverInfo = new FormData();
    serverInfo.append('snapshotId', id);
    serverInfo.append('name', snapname);
    const result = await fetch('/submit/cloud/snapshot/add-snapshot', { method: 'POST', body: serverInfo })
        .then(response => response.json())
        .then(j => j).catch(ex => window.location.reload());

    showAlert(result.status, result.message);
    if (result.status === 'success') {
        $('#addSnapshotServer').modal('hide');
        serverHistoryUpdate();
    }
}

async function attachVolume(id) {
    let body = new FormData();
    body.append('sid', $serverID);
    body.append('vid', id);
    let attach_icon = self.src;
    self.src = '/general/loading/k-spin.svg';
    const result = await fetch('/submit/cloud/volumes/attach-to-server', { method: 'POST', body })
        .then(response => response.json())
        .then(j => j).catch(ex => window.location.reload());
    self.src = attach_icon;
    showAlert(result.status, result.message);
    if (result.status === 'success') {
        loadVolumesToModal(true);
        $('#addVolumeAttach').modal('hide');
        serverHistoryUpdate();
    }
}

async function cloud_deattach_volume(id) {
    let body = new FormData();
    body.append('sid', $serverID);
    body.append('vid', id);
    const result = await fetch('/submit/cloud/servers/deattach-volume', { method: 'POST', body })
        .then(response => response.json())
        .then(j => j).catch(ex => window.location.reload());
    showAlert(result.status, result.message);
    if (result.status === 'success') {
        loadVolumesToModal(true);
        $('#addVolumeAttach').modal('hide');
        serverHistoryUpdate();
    }
}


function askRemoveVolume(id) {
    myDeleteSWA(() => removeBlock(id), "اخطار", "آیا از حذف این حافظه مطمئنید؟ ");
}

async function removeBlock(id) {
    let body = new FormData();
    body.append("vid", id);
    const res = await fetch("/submit/cloud/volumes/remove-volume", {
        method: "POST",
        body,
    })
        .then((r) => r.json())
        .then((j) => j)
        .catch((ex) => window.location.reload());

    showAlert(res.status, res.message);
    if (res.status === "success") {
        loadVolumesToModal(true);
        $('#addVolumeAttach').modal('hide');
    }
}


// async function makeSnapShot(id) {
//     let snapname = document.getElementById("snapshot-name").value;
//     document.getElementById('snapshot-name').classList.remove('alert-danger-border');
//     if ( !/^[A-z0-9\-\._ ]+$/.test(snapname) || snapname.length == 0 ) {
//         return document.getElementById('snapshot-name').classList.add('alert-danger-border');
//     }

//     // document.getElementById("takeSnapShot")?.innerHTML = `<img src="/general/loading/k-spin.svg" />`;
//     let serverInfo = new FormData();
//     serverInfo.append('snapshotId' , id);
//     serverInfo.append('name' , snapname);
//     const result = await fetch('/submit/cloud/snapshot/add-snapshot' , {method:'POST' , body:serverInfo})
//     .then(response => response.json())
//     .then(j => j).catch(ex => window.location.reload());

//     showAlert(result.status, result.message);
//     if(result.status === 'success') {
//         $('#addSnapshotServer').modal('hide');
//         serverHistoryUpdate();
//     }
// }


async function removeSnapshot(id) {
    if (!['active', 'shutdown', 'off'].includes($serverStatus)) return showAlert('err', 'سرور فعال نیست');

    let snapshot = new FormData();
    snapshot.append('id', id);
    const result = await fetch('/submit/cloud/snapshot/remove', { method: 'POST', body: snapshot })
        .then(response => response.json())
        .then(j => j).catch(ex => window.location.reload());

    showAlert(result.status, result.message);
    console.log(result.status);

    if (result.status === 'success') {
        $('#snapshot-' + id).slideUp(800, function (self = this) {
            self.remove()
        });
        serverHistoryUpdate();
        if (document.getElementById('SnapshotServerList').childNodes.length < 6)
            document.getElementById('emptystt').classList.remove('d-none');
    }

}


async function AssignFirewallToServer(id, self) {
    if (!['active', 'shutdown', 'off'].includes($serverStatus)) return showAlert('err', 'سرور فعال نیست');

    let serverInfo = new FormData();
    serverInfo.append('serverId', $serverID);
    serverInfo.append('firewallId', id);
    const attach_icon = self.src;
    self.src = '/general/loading/k-spin.svg';

    const result = await fetch('/submit/cloud/servers/assign-firewall', { method: 'POST', body: serverInfo })
        .then(response => response.json())
        .then(j => j).catch(ex => window.location.reload());
    self.src = attach_icon;
    showAlert(result.status, result.message);
    if (result.status === 'success') {
        // const addRow = 
        // `
        // <div class="col-12 col-sm-6 col-md-3 col-lg-2" id="firewallid-${firewallid}">
        //     <div class="srfirewall-card d-flex p-3 my-2-5 rounded-10 border border-1 position-relative">
        //         <div class="srfirewall-image">
        //             <svg width="34px" height="30px" viewBox="0 0 34 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="p-eccDetail__icon p-eccDetail__icon--firewall"><defs><path id="path-1" d="M25.1303828,24.6152105 L25.1303828,30.1586714 L14.0434609,30.1586714 L14.0434609,24.6152105 L25.1303828,24.6152105 Z M34,24.6151441 L34,29.0499527 C34,29.6624175 33.5033477,30.1586714 32.8912813,30.1586714 L32.8912813,30.1586714 L27.3478203,30.1586714 L27.3478203,24.6151441 L34,24.6151441 Z M11.8260898,24.6152769 L11.8260898,30.1587378 L1.10871875,30.1587378 C0.496652344,30.1587378 -1.50990331e-14,29.6624839 -1.50990331e-14,29.0500191 L-1.50990331e-14,29.0500191 L-1.50990331e-14,24.6152769 L11.8260898,24.6152769 Z M18.4782695,16.8543785 L18.4782695,22.3978394 L9.60871875,22.3978394 L9.60871875,16.8543785 L18.4782695,16.8543785 Z M7.39128125,16.8543785 L7.39128125,22.3978394 L1.64313008e-14,22.3978394 L1.64313008e-14,16.8543785 L7.39128125,16.8543785 Z M32.8912812,16.8543785 C33.5036133,16.8543785 34,17.3507652 34,17.9630308 L34,17.9630308 L34,22.3978394 L20.6956406,22.3978394 L20.6956406,16.8543785 Z M24.0217305,9.09348003 C24.6340625,9.09348003 25.1304492,9.58986675 25.1304492,10.2021324 L25.1304492,10.2021324 L25.1304492,14.636941 L16.2608984,14.636941 L16.2608984,9.09348003 Z M14.0434609,9.09348003 L14.0434609,14.636941 L-1.50990331e-14,14.636941 L-1.50990331e-14,9.09348003 L14.0434609,9.09348003 Z M19.5869883,1.332648 C20.1990547,1.332648 20.6956406,1.82890191 20.6956406,2.44130035 L20.6956406,2.44130035 L20.6956406,6.87610894 L9.60871875,6.87610894 L9.60871875,1.332648 L9.60871875,1.332648 Z M7.39128125,1.332648 L7.39128125,6.87610894 L1.64313008e-14,6.87610894 L1.64313008e-14,2.44130035 C1.64313008e-14,1.82890191 0.496652344,1.332648 1.10871875,1.332648 L1.10871875,1.332648 L7.39128125,1.332648 Z"></path></defs> <g stroke="none" stroke-width="1" fill="#48b1e5" fill-rule="evenodd"><use xlink:href="#path-1"></use></g></svg>
        //         </div>
        //         <div class="srfirewall-name fs-14 fw-400">${firewallname}</div>
        //         <span class="delete-srfirewall" onclick="mySWA( (() => deAssignFirewallToServer(${id}, ${firewallid})), 'حذف فایروال', 'اطمینان از حذف فایروال دارید؟')"><img src="/general/images/new/ico_delete.svg" alt=""></span>
        //     </div> 
        // </div>
        // `;
        // $('.firwall-tab-cards').append(addRow);
        $('#changeFirewall').modal('hide');
        Promise.all([loadFirewallsToModal(true), serverHistoryUpdate()]);
    }
}


async function deAssignFirewallToServer(id, firewallid, self) {
    if (!['active', 'shutdown', 'off'].includes($serverStatus)) return showAlert('err', 'سرور فعال نیست');

    let serverInfo = new FormData();
    serverInfo.append('serverId', id);
    serverInfo.append('firewallId', firewallid);
    const attach_icon = self.src;
    self.src = '/general/loading/k-spin.svg';
    const result = await fetch('/submit/cloud/servers/deassign-firewall', { method: 'POST', body: serverInfo })
        .then(response => response.json())
        .then(j => j).catch(ex => window.location.reload());
    self.src = attach_icon;
    showAlert(result.status, result.message);
    if (result.status === 'success') {
        $("#firewallid-" + firewallid).remove();
        $('#changeFirewall').modal('hide');
        Promise.all([loadFirewallsToModal(true), serverHistoryUpdate()]);
    }
}


async function AssignKey(id) {

}


async function deAssignKey(id) {
    document.getElementById("assignFirewallToServer").innerHTML = `<img src="/general/loading/k-spin.svg" />`;
    let firewallid = document.querySelector("#show-srfirewall span.current-item").getAttribute('data-value');
    let firewallname = document.querySelector("#show-srfirewall span.current-item").innerHTML.trim();
    let serverInfo = new FormData();
    serverInfo.append('serverId', id);
    serverInfo.append('firewallId', firewallid);
    const result = await fetch('/submit/cloud/servers/assign-firewall', { method: 'POST', body: serverInfo })
        .then(response => response.json())
        .then(j => j).catch(ex => window.location.reload());

    showAlert(result.status, result.message);
    if (result.status === 'success') {
        const addRow =
            `
        <div class="col-12 col-sm-6 col-md-3 col-lg-2">
            <div class="srfirewall-card d-flex p-3 my-2-5 rounded-10 border border-1">
                <div class="srfirewall-image">
                    <svg width="34px" height="30px" viewBox="0 0 34 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="p-eccDetail__icon p-eccDetail__icon--firewall"><defs><path id="path-1" d="M25.1303828,24.6152105 L25.1303828,30.1586714 L14.0434609,30.1586714 L14.0434609,24.6152105 L25.1303828,24.6152105 Z M34,24.6151441 L34,29.0499527 C34,29.6624175 33.5033477,30.1586714 32.8912813,30.1586714 L32.8912813,30.1586714 L27.3478203,30.1586714 L27.3478203,24.6151441 L34,24.6151441 Z M11.8260898,24.6152769 L11.8260898,30.1587378 L1.10871875,30.1587378 C0.496652344,30.1587378 -1.50990331e-14,29.6624839 -1.50990331e-14,29.0500191 L-1.50990331e-14,29.0500191 L-1.50990331e-14,24.6152769 L11.8260898,24.6152769 Z M18.4782695,16.8543785 L18.4782695,22.3978394 L9.60871875,22.3978394 L9.60871875,16.8543785 L18.4782695,16.8543785 Z M7.39128125,16.8543785 L7.39128125,22.3978394 L1.64313008e-14,22.3978394 L1.64313008e-14,16.8543785 L7.39128125,16.8543785 Z M32.8912812,16.8543785 C33.5036133,16.8543785 34,17.3507652 34,17.9630308 L34,17.9630308 L34,22.3978394 L20.6956406,22.3978394 L20.6956406,16.8543785 Z M24.0217305,9.09348003 C24.6340625,9.09348003 25.1304492,9.58986675 25.1304492,10.2021324 L25.1304492,10.2021324 L25.1304492,14.636941 L16.2608984,14.636941 L16.2608984,9.09348003 Z M14.0434609,9.09348003 L14.0434609,14.636941 L-1.50990331e-14,14.636941 L-1.50990331e-14,9.09348003 L14.0434609,9.09348003 Z M19.5869883,1.332648 C20.1990547,1.332648 20.6956406,1.82890191 20.6956406,2.44130035 L20.6956406,2.44130035 L20.6956406,6.87610894 L9.60871875,6.87610894 L9.60871875,1.332648 L9.60871875,1.332648 Z M7.39128125,1.332648 L7.39128125,6.87610894 L1.64313008e-14,6.87610894 L1.64313008e-14,2.44130035 C1.64313008e-14,1.82890191 0.496652344,1.332648 1.10871875,1.332648 L1.10871875,1.332648 L7.39128125,1.332648 Z"></path></defs> <g stroke="none" stroke-width="1" fill="#48b1e5" fill-rule="evenodd"><use xlink:href="#path-1"></use></g></svg>
                </div>
                <div class="srfirewall-name fs-14 fw-400">${firewallname}</div>
            </div> 
        </div>
        `;
        $('.firwall-tab-cards').prepend(addRow);
        $('#changeFirewall').modal('hide');
        serverHistoryUpdate();
    }
    document.getElementById("assignFirewallToServer").innerHTML = 'اضافه کردن';
}


// change os modal
const OSdom = document.querySelector('#showOpSystem .current-item');
document.getElementById('dp-opSystem').addEventListener("click", () => {
    oslister(OSdom.getAttribute('data-value'));
});
function oslister(mode) {
    if (mode != document.querySelector('#sparta .ak47')?.getAttribute('data-parent')) {
        document.getElementById('showOpVersion').innerHTML =
            `
            <span class="current-item fs-14" data-value="choose">
            انتخاب کنید
            </span>
            <img class="imgexp img-collapse" src="/general/images/root/ico_arrow_down_disabled.svg" />
        `;
    }
    document.querySelectorAll('.os-list-os').forEach(m => {
        m.classList.add('d-none');
        m.classList.remove('ak47');

        if (m.getAttribute("data-parent") === mode) {
            m.classList.remove('d-none');
            m.classList.add('ak47');
        }

    });
}










// const fromDate = document.getElementById('fromDate');
// const toDate = document.getElementById('toDate');
// fromDate.addEventListener("change", () => {
//     toDate.value = (new Date(Date.parse(fromDate.value) + 86400000 * 2)).toLocaleDateString();
// });

async function getCharts() {
    let method = "POST", body = new FormData();
    body.append("dt", fromDate.value);
    const res = await fetch("/submit/cloud/servers/get-charts", { method, body })
        .then(r => r.json()).then(j => j).catch(ex => window.location.reload());
    showAlert(res.status, res.message);
    serverHistoryUpdate();
}

async function mountNetwork(pvnet, self) {
    if (!['active', 'shutdown', 'off'].includes($serverStatus)) return showAlert('err', 'سرور فعال نیست');

    let method = "POST", body = new FormData();
    // const pvnet = document.querySelector('#show-network .current-item').getAttribute('data-value');
    // const pvname = document.querySelector('#show-network .current-item').innerHTML;
    // if (pvnet === "null") {
    //     return document.getElementById('dp-network-cloud').classList.add('alert-danger-border');
    // }

    body.append("pvid", pvnet);
    body.append("sid", $serverID);
    let attach_icon = self.src;
    self.src = '/general/loading/k-spin.svg';
    // document.getElementById('networkpv').disabled = true;
    // document.getElementById('networkpv').innerHTML = `<img src="/general/loading/k-spin.svg" />`;
    const res = await fetch("/submit/cloud/servers/set-networks", { method, body })
        .then(r => r.json()).then(j => j).catch(ex => window.location.reload());
    // document.getElementById('networkpv').disabled = false;
    // document.getElementById('networkpv').innerHTML = `اضافه کردن`;
    showAlert(res.status, res.message);
    self.src = attach_icon;
    if (res.status === "success") {
        document.getElementById('netLis').insertAdjacentHTML('beforeend', `
            <div class="d-flex" id="fpvn-${res.id}"><span>IPV4 Private :  </span>
                <p class="mb-0">
                    <span id="pvussh-${res.id}">${res.ip}</span>
                    <span data-bs-toggle="tooltip" data-bs-placement="top" title="" 
                    data-bs-original-title="کپی در حافظه" class="img-ico-wrap" onclick="CopyDiv('pvussh-${res.id}')">
                        <img src="/general/images/new/ico_copy.svg" class="img-ico-copy">
                    </span>
                    <span>
                        <img onclick="unmountNetwork(${res.id}, this)" width="17px" 
                        data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="دی اتچ" 
                        class="sublink" src="/general/images/ico_deattach.svg" alt="">
                    </span>
                </p>
            </div>
        `);
        $('#assignInternalNetwork').modal('hide');
        serverHistoryUpdate();
    }
}

async function unmountNetwork(id, self) {
    if (!['active', 'shutdown', 'off'].includes($serverStatus)) return showAlert('err', 'سرور فعال نیست');

    let method = "POST", body = new FormData();
    body.append("pvid", id);
    body.append("sid", $serverID);
    console.log(id);
    const self_src = self.src;
    const self_sclick = self.onclick;
    self.onclick = () => { };
    self.src = '/general/loading/k-spin.svg';
    const res = await fetch("/submit/cloud/servers/unset-networks", { method, body })
        .then(r => r.json()).then(j => j).catch(ex => window.location.reload());
    self.src = self_src;
    self.onclick = self_sclick;
    showAlert(res.status, res.message);
    if (res.status === "success") {
        document.getElementById('fpvn-' + id).remove();
        serverHistoryUpdate();
    }
}

async function serverHistoryUpdate() {
    let body = new FormData();
    body.append('serverid', $serverID);
    const logs = await fetch("/submit/cloud/servers/notifications", { method: "POST", body })
        .then(k => k.json()).then(m => m).catch(ex => window.location.reload());
    if (logs.status === "success") {
        document.getElementById('server-history').innerHTML = "";
        logs.data.forEach((log, key) => {
            document.getElementById('server-history').innerHTML += `
                <div class="d-flex log-row">
                    <div class="event-log-name">
                        ${log.description}
                    </div>
                    <div class="event-log-date">
                        ${log.datetime}
                    </div>
                </div>
            `;
        });
    }
    console.log(logs);
    updateServer();
}

serverHistoryUpdate();
// TODO
// TODO
// TODO
// TODO


async function linearRange(range) {

    const route = '/submit/cdn/overview/website/linear2-scale';
    rBody = new FormData();
    rBody.append("domain", $domain);
    rBody.append("wid", $wid);
    rBody.append("time", range);


    if (typeof chart !== 'undefined') chart.destroy();
    let result = await fetch(route, { method: "POST", body: rBody }).then(r => r.json()).then(j => j).catch(ex => window.location.reload());
    //    linear = JSON.parse(result);
    linearK = Object.values(JSON.parse(result).keys);
    linearV = Object.values(JSON.parse(result).values);

    chart = new ApexCharts(document.querySelector("#viewRepoerChart"), options);
    chart.render();
}

// TODO
// TODO
// TODO
// TODO







// var check = true;
// setInterval(async function() {
//     if (check) {
//         let rBody = new FormData();
//         rBody.append("id", "{{ $id }}");
//         const jedi = await fetch("/submit/dns/check-status-loaded", {
//             method: "POST",
//             body: rBody
//         }).then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
//         if (jedi.isReady == "true" && check) {
//             check = false;
//             GetNameServerRecords();
//         }
//     }
// }, 5000);








































let pending1 = false, pending2 = false, pending3 = false, pending4 = false;
let lock1 = false, lock2 = false, lock3 = false, lock4 = false;
async function timeShift(chart, time) {
    const IS_REALTIME = time === "realtime";
    time = time === "realtime" ? '5m' : time;
    if (time === '5m' && chart == "1" && lock1) return console.log("1 is locked"); else if (chart == "1" && time !== '5m') lock1 = true;
    if (time === '5m' && chart == "2" && lock2) return console.log("2 is locked"); else if (chart == "2" && time !== '5m') lock2 = true;
    if (time === '5m' && chart == "3" && lock3) return console.log("3 is locked"); else if (chart == "3" && time !== '5m') lock3 = true;
    if (time === '5m' && chart == "4" && lock4) return console.log("4 is locked"); else if (chart == "4" && time !== '5m') lock4 = true;
    rBody = new FormData();
    rBody.append("time", time);
    rBody.append("sid", $serverID);
    if (chart == "1" && pending1) return setTimeout(() => timeShift("1", IS_REALTIME ? 'realtime' : time), 1000);
    if (chart == "2" && pending2) return setTimeout(() => timeShift("2", IS_REALTIME ? 'realtime' : time), 1000);
    if (chart == "3" && pending3) return setTimeout(() => timeShift("3", IS_REALTIME ? 'realtime' : time), 1000);
    if (chart == "4" && pending4) return setTimeout(() => timeShift("4", IS_REALTIME ? 'realtime' : time), 1000);
    if (chart1) pending1 = true;
    if (chart2) pending2 = true;
    if (chart3) pending3 = true;
    if (chart4) pending4 = true;
    const result = await fetch(`/submit/cloud/servers/charts/${chart}`, { method: "POST", body: rBody })
        .then(r => r.json()).then(j => j)//.catch(ex => window.location.reload());
    if (chart1) pending1 = false;
    if (chart2) pending2 = false;
    if (chart3) pending3 = false;
    if (chart4) pending4 = false;
    if (!IS_REALTIME) {
        if (chart == 1) {
            X1r = Object.values(result.outgoing.keys);
            X1w = Object.values(result.incoming.keys);
            Y1r = Object.values(result.outgoing.values);
            Y1w = Object.values(result.incoming.values);
            options1 = {
                series: [{
                    data: Y1r
                }, { data: Y1w }],
                colors: ['#70b5ef', '#9191d8'],
                chart: {
                    type: 'area',
                    width: '100%',
                    height: 152,
                    sparkline: {
                        enabled: true
                    },
                    locales: [{
                        "name": "en",
                        "options": {
                            "toolbar": {
                                "exportToSVG": "دانلود SVG",
                                "exportToPNG": "دانلود PNG",
                                "exportToCSV": "دانلود CSV",
                            }
                        }
                    }],
                    defaultLocale: "en",
                    toolbar: {
                        show: true,
                        offsetX: 0,
                        offsetY: 0,
                        tools: {
                            download: true,
                            selection: true,
                            pan: true,
                            reset: true | '<img src="/static/icons/reset.png" width="20">',
                            customIcons: []
                        },

                    },

                    export: {
                        csv: {
                            filename: undefined,
                            columnDelimiter: ',',
                            headerCategory: 'category',
                            headerValue: 'value',
                            dateFormatter(timestamp) {
                                return new Date(timestamp).toDateString()
                            }
                        },
                        svg: {
                            filename: undefined,
                        },
                        png: {
                            filename: undefined,
                        }
                    },
                },
                tooltip: {
                    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                        console.log(series, seriesIndex, dataPointIndex, w);
                        let size = series[0][dataPointIndex], unit = 'bytes';
                        let size2 = series[1][dataPointIndex], unit2 = 'bytes';
                        if (size > 1024000000000) {
                            size /= 1024000000000;
                            unit = "TB/s";
                        }
                        else if (size > 1024000000) {
                            size /= 1024000000;
                            unit = "GB/s";
                        }
                        else if (size > 1024000) {
                            size /= 1024000;
                            unit = "MB/s";
                        }
                        else if (size > 1024) {
                            size /= 1024;
                            unit = "KB/s";
                        }
                        size = parseFloat(size).toFixed(2);
                        if (size2 > 1024000000000) {
                            size2 /= 1024000000000;
                            unit2 = "TB/s";
                        }
                        else if (size2 > 1024000000) {
                            size2 /= 1024000000;
                            unit2 = "GB/s";
                        }
                        else if (size2 > 1024000) {
                            size2 /= 1024000;
                            unit2 = "MB/s";
                        }
                        else if (size2 > 1024) {
                            size2 /= 1024;
                            unit2 = "KB/s";
                        }
                        size2 = parseFloat(size2).toFixed(2);
                        return (
                            '<div class="arrow_box">' + '<p class="tooltip-date-ltr">' + X1r[dataPointIndex] + '</p>' +
                            "<span> Write: " +
                            size + ' ' + unit +
                            "</span><br/>" +
                            "<span> Read: " +
                            size2 + ' ' + unit2 +
                            "</span>" +

                            "</div>"
                        );
                    },
                    fixed: {
                        enabled: false
                    },
                    x: {
                        //   show: false
                    },
                    y: {
                        title: {
                            formatter: function (seriesName) {
                                return ''
                            }
                        },
                    },
                    marker: {
                        show: true
                    },
                },

                xaxis: {
                    crosshairs: {
                        width: 1
                    },
                },
                //   yaxis: {
                //     min: 0,
                //     show: true
                //   },

            };
            if (typeof chart1 !== 'undefined') chart1.destroy();
            chart1 = new ApexCharts(document.querySelector("#sparkDisk"), options1);
            chart1.render();
        } else if (chart == 2) {
            X2 = Object.values(result.keys);
            Y2 = Object.values(result.values);
            options2 = {
                series: [{
                    data: Y2
                }],
                colors: ['#9191d8'],
                chart: {
                    type: 'area',
                    width: '100%',
                    height: 152,
                    sparkline: {
                        enabled: true
                    },
                    locales: [{
                        "name": "en",
                        "options": {
                            "toolbar": {
                                "exportToSVG": "دانلود SVG",
                                "exportToPNG": "دانلود PNG",
                                "exportToCSV": "دانلود CSV",
                            }
                        }
                    }],
                    defaultLocale: "en",
                    toolbar: {
                        show: true,
                        offsetX: 0,
                        offsetY: 0,
                        tools: {
                            download: true,
                            selection: true,
                            pan: true,
                            reset: true | '<img src="/static/icons/reset.png" width="20">',
                            customIcons: []
                        }
                    },
                    export: {
                        csv: {
                            filename: undefined,
                            columnDelimiter: ',',
                            headerCategory: 'category',
                            headerValue: 'value',
                            dateFormatter(timestamp) {
                                return new Date(timestamp).toDateString()
                            }
                        },
                        svg: {
                            filename: undefined,
                        },
                        png: {
                            filename: undefined,
                        }
                    },
                },
                tooltip: {
                    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                        let size = series[seriesIndex][dataPointIndex], unit = 'bytes';
                        if (size > 1024000000000) {
                            size /= 1024000000000;
                            unit = "TB/s";
                        }
                        else if (size > 1024000000) {
                            size /= 1024000000;
                            unit = "GB/s";
                        }
                        else if (size > 1024000) {
                            size /= 1024000;
                            unit = "MB/s";
                        }
                        else if (size > 1024) {
                            size /= 1024;
                            unit = "KB/s";
                        }
                        size = parseFloat(size).toFixed(2);
                        return (
                            '<div class="arrow_box">' + '<p class="tooltip-date-ltr">' + X2[dataPointIndex] + '</p>' +
                            "<span> usage: " +
                            size + ' ' + unit +
                            "</span>" +
                            "</div>"
                        );
                    },
                    fixed: {
                        enabled: false
                    },
                    x: {
                        show: false
                    },
                    y: {
                        title: {
                            formatter: function (seriesName) {
                                return ''
                            }
                        }
                    },
                    marker: {
                        show: true
                    },
                }
            };

            if (typeof chart2 !== 'undefined') chart2.destroy();
            chart2 = new ApexCharts(document.querySelector("#sparkTraffic"), options2);
            chart2.render();

        } else if (chart == 3) {
            X3 = Object.values(result.keys);
            Y3 = Object.values(result.values);
            options3 = {
                series: [{
                    data: Y3
                }],
                colors: ['#13c1d4'],
                chart: {
                    type: 'area',
                    width: '100%',
                    height: 152,
                    sparkline: {
                        enabled: true
                    },
                    locales: [{
                        "name": "en",
                        "options": {
                            "toolbar": {
                                "exportToSVG": "دانلود SVG",
                                "exportToPNG": "دانلود PNG",
                                "exportToCSV": "دانلود CSV",
                            }
                        }
                    }],
                    defaultLocale: "en",
                    toolbar: {
                        show: true,
                        offsetX: 0,
                        offsetY: 0,
                        tools: {
                            download: true,
                            selection: true,
                            pan: true,
                            reset: true | '<img src="/static/icons/reset.png" width="20">',
                            customIcons: []
                        }
                    },
                    export: {
                        csv: {
                            filename: undefined,
                            columnDelimiter: ',',
                            headerCategory: 'category',
                            headerValue: 'value',
                            dateFormatter(timestamp) {
                                return new Date(timestamp).toDateString()
                            }
                        },
                        svg: {
                            filename: undefined,
                        },
                        png: {
                            filename: undefined,
                        }
                    },
                },
                tooltip: {
                    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                        let size = series[seriesIndex][dataPointIndex], unit = parseInt($('.SHOWCPUMAIN').html());
                        let cp = parseInt(size / unit) > 100 ? 100 : parseInt(size / unit);
                        const cpusage = cp + "%";
                        return `
                        <div class="arrow_box">
                            <p class="tooltip-date-ltr">${X3[dataPointIndex]}</p>
                            <span>usage: ${cpusage}</span>
                        </div>`;
                    },
                    fixed: {
                        enabled: false
                    },
                    x: {
                        show: false
                    },
                    y: {
                        title: {
                            formatter: function (seriesName) {
                                return ''
                            }
                        }
                    },
                    marker: {
                        show: true
                    },
                }
            };
            if (typeof chart3 !== 'undefined') chart3.destroy();
            chart3 = new ApexCharts(document.querySelector("#sparkCpu"), options3);
            chart3.render();

        } else if (chart == 4) {
            X4 = Object.values(result.keys);
            Y4 = Object.values(result.values);
            options4 = {
                series: [{
                    data: Y4
                }],
                colors: ['#ce67bb'],
                chart: {
                    type: 'area',
                    width: '100%',
                    height: 152,
                    sparkline: {
                        enabled: true
                    },
                    locales: [{
                        "name": "en",
                        "options": {
                            "toolbar": {
                                "exportToSVG": "دانلود SVG",
                                "exportToPNG": "دانلود PNG",
                                "exportToCSV": "دانلود CSV",
                            }
                        }
                    }],
                    defaultLocale: "en",
                    toolbar: {
                        show: true,
                        offsetX: 0,
                        offsetY: 0,
                        tools: {
                            download: true,
                            selection: true,
                            pan: true,
                            reset: true | '<img src="/static/icons/reset.png" width="20">',
                            customIcons: []
                        }
                    },
                    export: {
                        csv: {
                            filename: undefined,
                            columnDelimiter: ',',
                            headerCategory: 'category',
                            headerValue: 'value',
                            dateFormatter(timestamp) {
                                return new Date(timestamp).toDateString()
                            }
                        },
                        svg: {
                            filename: undefined,
                        },
                        png: {
                            filename: undefined,
                        }
                    },
                },
                tooltip: {
                    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                        let size = series[seriesIndex][dataPointIndex], unit = 'bytes';
                        if (size > 1024000000000) {
                            size /= 1024000000000;
                            unit = "TB/s";
                        }
                        else if (size > 1024000000) {
                            size /= 1024000000;
                            unit = "GB/s";
                        }
                        else if (size > 1024000) {
                            size /= 1024000;
                            unit = "MB/s";
                        }
                        else if (size > 1024) {
                            size /= 1024;
                            unit = "KB/s";
                        }
                        size = parseFloat(size).toFixed(2);
                        return (
                            '<div class="arrow_box">' + '<p class="tooltip-date-ltr">' + X4[dataPointIndex] + '</p>' +
                            "<span> usage: " +
                            size + ' ' + unit +
                            "</span>" +
                            "</div>"
                        );
                    },
                    fixed: {
                        enabled: false
                    },
                    x: {
                        show: false
                    },
                    y: {
                        title: {
                            formatter: function (seriesName) {
                                return ''
                            }
                        }
                    },
                    marker: {
                        show: true
                    },
                }
            };
            if (typeof chart4 !== 'undefined') chart4.destroy();
            chart4 = new ApexCharts(document.querySelector("#sparkRam"), options4);
            chart4.render();

        }
    } else {
        setTimeout(() => {
            timeShift('1', "realtime");
            timeShift('2', "realtime");
            timeShift('3', "realtime");
            timeShift('4', "realtime");
        }, 5000);
        switch (chart) {
            case "1":
                if (!lock1) {
                    X1r = Object.values(result.outgoing.keys);
                    X1w = Object.values(result.incoming.keys);
                    Y1r = Object.values(result.outgoing.values);
                    Y1w = Object.values(result.incoming.values);
                    chart1.updateSeries([{ data: Y1r }, { data: Y1w }]);
                }
                break;
            case "2":
                if (!lock2) {
                    X2 = Object.values(result.keys);
                    Y2 = Object.values(result.values);
                    chart2.updateSeries([{ data: Y2 }]);
                }
                break;
            case "3":
                if (!lock3) {
                    X3 = Object.values(result.keys);
                    Y3 = Object.values(result.values);
                    chart3.updateSeries([{ data: Y3 }]);
                }
                break;
            case "4":
                if (!lock4) {
                    X4 = Object.values(result.keys);
                    Y4 = Object.values(result.values);
                    chart4.updateSeries([{ data: Y4 }]);
                }
                break;
        }
    }
}











async function updateServer() {
    const method = "POST"
    const path = "/submit/cloud/servers/get-status";
    let body = new FormData();
    body.append('serverid', $serverID);
    const sts = await fetch(path, { method, body })
        .then(response => response.json())
        .then(json => json)
        .catch(ex => updateServer());
    console.log(sts.status);
    $storage_type = !!$storage_type ? sts.volume.data[0].cv_type : $storage_type;
    serverStatusUpdater(sts.server_Status);
}



function serverStatusUpdater(status) {
    $serverStatus = status;
    document.querySelectorAll('.server-status-ov').forEach(el => el.classList.add('d-none'));
    if (status === "active") {
        document.querySelector('#server-card').classList.add('d-none');
        document.querySelector('#hard-reboot').classList.remove('d-none');
        document.querySelector('#server-opacity').classList.remove('server-disable-stat');
        document.getElementById('konsole-btn').classList.remove('gray-grad');
        document.getElementById('rename-btn').classList.remove('gray-grad');
    } else {
        document.querySelector('#server-card').classList.remove('d-none');
        document.querySelector('#hard-reboot').classList.add('d-none');
        document.querySelector('#server-opacity').classList.add('server-disable-stat');
        document.getElementById(status).classList.remove('d-none');
        document.getElementById('konsole-btn').classList.add('gray-grad');
        document.getElementById('rename-btn').classList.add('gray-grad');
    }

}




async function loadPrivateNetworksToModal(force = false) {
    $('#assignInternalNetwork').modal('show');
    if (document.querySelector('#assignInternalNetwork #foundmod div') && !force) return;
    const DATA = await fetch('/html/cloud/overview/networks/' + $serverID).then(i => i.text()).then(t => t);
    document.querySelector('#assignInternalNetwork #foundmod').innerHTML = DATA;

}

async function loadFirewallsToModal(force = false) {
    $('#changeFirewall').modal('show');
    if (document.querySelector('#changeFirewall #foundmod div') && !force) return;
    const DATA = await fetch('/html/cloud/overview/firewalls/' + $serverID).then(i => i.text()).then(t => t);
    document.querySelector('#changeFirewall #foundmod').innerHTML = DATA;
}

async function loadVolumesToModal(force = false) {
    $('#addVolumeAttach').modal('show');
    if (document.querySelector('#addVolumeAttach #foundmod div') && !force) return;
    const DATA = await fetch('/html/cloud/overview/volumes/' + $serverID).then(i => i.text()).then(t => t);
    document.querySelector('#addVolumeAttach #foundmod').innerHTML = DATA;
}

// firewall group remove
async function removeGroup(id, self) {
    let method = "POST", body = new FormData();
    body.append("fwid", id);
    const self_src = self.src;
    self.src = '/general/loading/k-spin.svg';
    const res = await fetch("/submit/cloud/firewall/remove-group", { method, body })
        .then(r => r.json()).then(j => j).catch(ex => window.location.reload());
    showAlert(res.status, res.message);
    self.src = self_src;
    if (res.status === "success") {
        $('#fw-acc-' + id).slideUp(450, function () { $('#fw-acc-' + id).remove() });
        self.parentNode.parentNode.parentNode.parentNode.remove();

    }
}

function removeIp(nid, self) {
    const mode = "اخطار";
    const text = "آیا از حذف این رنج آیپی مطمئنید؟";
    const callback = () => removeNetwork(nid, self)
    myDeleteSWA(callback, mode, text);
}
async function removeNetwork(nid, self) {
    let method = "POST", body = new FormData;
    body.append("nid", nid);
    const self_src = self.src;
    self.src = '/general/loading/k-spin.svg';
    const resp = await fetch("/submit/cloud/networks/remove-private", { method, body })
        .then(r => r.json()).then(j => j).catch(ex => window.location.reload());
    self.src = self_src;
    showAlert(resp.status, resp.message);
    if (resp.status === "success") {
        self.parentNode.parentNode.parentNode.parentNode.remove();
    }
}

