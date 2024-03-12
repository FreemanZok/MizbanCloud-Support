async function removeSnapshot(id) {
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

        if (document.getElementById('SnapshotServerList').childNodes.length < 6)
            document.getElementById('emptystt').classList.remove('d-none');
    }

}


async function addSnapshot() {
    let addSnapshot = new FormData();

    const id = $('input[type=radio][name=server]:checked').attr('id');
    const name = document.getElementById('snapshot-name').value;

    if (id) {
        var idNumber = id.split('-');
    } else {
        document.getElementById("addSnapshotServer").disabled = true;
    }

    const regex = /^[A-z0-9\-\.]+$/gi

    if (!regex.test(name) || name.includes('\\') || name.includes('^')) {
        return $('#snapshot-name').addClass('alert-danger-border');
    } else {
        $('#snapshot-name').removeClass('alert-danger-border');
    }

    document.getElementById("addSnapshotServer").disabled = true;
    document.getElementById('addSnapshotServer').innerHTML = '<img src="/general/loading/tail-spin.svg" />';

    addSnapshot.append('snapshotId', idNumber[1]);
    addSnapshot.append('name', name);

    const result = await fetch('/submit/cloud/snapshot/add-snapshot', { method: 'POST', body: addSnapshot })
        .then(response => response.json())
        .then(j => j).catch(ex => window.location.reload());

    showAlert(result.status, result.message);
    document.getElementById('addSnapshotServer').innerHTML = "گرفتن اسنپ شات";
    document.getElementById("addSnapshotServer").disabled = false;

    $("input:radio[name=server]:checked")[0].checked = false;
    document.getElementById('snapshot-name').value = '';
    $('#snapshot-name').removeClass('alert-danger-border');

    if (result.status === 'success') {
        let addRow = '';
        let hostName = $('#' + id).next().find('.hostName').text();

        let nid;
        result.snapshot.data.forEach(snap => {
            nid = snap.cvid;
            addRow += `
        <div class="accordion-item" id="snapshot-${nid}">
                <h2 class="accordion-header" id="flush-heading${nid}">
                    <div class="accordion-button w-100 collapsed">
                        <div class="col-2 col-sm-2 col-md-2 position-relative svolume-action-col">
                            <ul class="d-flex justify-content-start align-items-center list-unstyled mb-0 fnlist">
                                <li class="remove-item" title="حذف" onclick="myDeleteSWA((() => removeSnapshot('${nid}')),
                                    'اخطار' ,  'آیا از حذف این اسنپ شات مطمئنید؟')">
                                    <span>
                                        <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="حذف" class="sublink" src="/general/images/new/ico_delete.svg" alt="">
                                    </span>
                                    <span class="fnlist-title">حذف</span>
                                </li>   
                                <li>
                                </li>               
                            </ul>
                            <span class="fnlist-options">
                                <img src="/general/images/root/topMenu/ico_dotted_ico.svg">
                            </span>
                        </div>
                        <div class="col-2 col-sm-1 col-md-1 svolume-space-col d-none d-sm-block">
                            <p class="mb-0 fs-14 dir_ltr">
                                ${snap.cv_space} GB
                            </p>
                        </div>
                        <div class="col-10 col-sm-3 col-md-3 svolume-date-col d-none d-sm-block">
                            <p class="mb-0 fs-14 dir_ltr">
                                ${snap.cv_creation_date}
                            </p>
                        </div>
                        
                        <div class="col-12 col-sm-3 col-md-3 shost-name-col">
                            <p class="mb-0 fs-14">
                                ${hostName}
                            </p>
                        </div>
                        <div class="col-10 col-sm-3 col-md-3 svolume-name-col">
                            <p class="mb-0 fs-14 tl">
                                ${snap.cv_name}
                            </p>
                        </div>
                    </div>
                </h2>
            </div>
            `;
        });
        $('#SnapshotServerList').html(addRow);

        document.getElementById('emptystt')?.classList.add('d-none');
        $('#addSnapshot').modal('hide');
    }

}








var restoreID;
var serverID;
function restoreModal(space, id, server) {
    serverID = server;
    restoreID = id;
    document.getElementById('dae2').setAttribute('min', space);
    // document.getElementById('dae2').value = space;
    $('#restoreSnapshot').modal('show');

    $('.slider').WBslider();

}

async function restoreAction() {
    const path = "/submit/cloud/snapshot/restore-snapshot";
    const method = "POST";
    let body = new FormData();
    body.append("id", restoreID);
    body.append("serverId", serverID);
    body.append("space", document.getElementById('dae2').value);
    body.append("ram", document.getElementById('dae3').value);
    body.append("cpu", document.getElementById('dae1').value);
    body.append("net", document.getElementById('dae4').value);
    document.getElementById('restoreBTN').setAttribute('disabled', 'disabled');
    const result = await fetch(path, { method, body })
        .then(res => res.json())
        .then(k => k)
        .catch(ex => window.location.reload());
    document.getElementById('restoreBTN').removeAttribute('disabled');
    showAlert(result.status, result.message);
    if (result.status === "success") $('#restoreSnapshot').modal('hide');
}