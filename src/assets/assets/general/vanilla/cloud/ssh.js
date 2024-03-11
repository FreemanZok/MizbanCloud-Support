async function removeSsh(id) {
    let method = "POST", body = new FormData();
    body.append("kid", id);
    const res = await fetch("/submit/cloud/ssh/remove-key", {method, body})
    .then(r=>r.json()).then(j=>j);
    showAlert(res.status, res.message);
    if(res.status === "success")
        $('ssh-acc-'+id).slideUp(800, 
            document.getElementById('ssh-acc-'+id).remove());
    if (document.getElementById('KeysList').childNodes.length < 3) {
        document.getElementById('KeysList').innerHTML = `<p id="emptystate" class="text-center">شما کلیدی ندارید</p>`;
        document.querySelector(".key-list-header").childNodes.forEach(e => e.classList.add('d-none'));
    }
        
}


async function addSsh() {
    let method = "POST", body = new FormData();
    body.append("name", document.getElementById('key-name').value);
    body.append("value", document.getElementById('generalKey').value);
    body.append("pvk", document.getElementById('pivKey').value);
    document.getElementById('sendKey').innerHTML = `<img src="/general/loading/tail-spin.svg" />`;
    document.getElementById('sendKey').setAttribute("disabled", "disabled");

    const res = await fetch("/submit/cloud/ssh/add-key", {method, body})
    .then(r=>r.json()).then(j=>j).catch(ex => window.location.reload());
    showAlert(res.status, res.message);
    document.getElementById('sendKey').removeAttribute("disabled");
    document.getElementById('sendKey').innerHTML = `اضافه کردن`;

    if(res.status === "success") {
        $('#addSshKey').modal('hide');
        document.getElementById('emptystate')?.classList.add('d-none');
        if(document.getElementById('KeysList')) {
        $('#KeysList').prepend(makeit(res.id,
             document.getElementById('generalKey').value, document.getElementById('key-name').value));
        } else window.location.reload();
    }
}

async function randomKey() {
    document.getElementById('sendKey').setAttribute("disabled", "disabled");
    document.getElementById('sendKey').innerHTML = `درحال‌ساخت`;
    document.getElementById('shuffle').setAttribute("disabled", "disabled");
    document.getElementById('shuffle').innerHTML = `<img src="/general/loading/tail-spin.svg" />`;
    let method = "POST", body = new FormData();
    body.append("name", document.getElementById('key-name').value);
    body.append("value", document.getElementById('generalKey').value);
    body.append("pvk", document.getElementById('pivKey').value);
    const res = await fetch("/submit/cloud/ssh/random-key", {method, body})
    .then(r=>r.json()).then(j=>j).catch(ex => window.location.reload());
    showAlert(res.status, res.message);
    document.getElementById('shuffle').removeAttribute("disabled");
    document.getElementById('shuffle').innerHTML = `ایجاد کلید جدید`;
    document.getElementById('sendKey').removeAttribute("disabled");
    document.getElementById('sendKey').innerHTML = `اضافه کردن`;
    if(res.status === "success") {
        document.querySelector('.addKeyField').classList.add('d-none');
        // document.getElementById('key-name').value = `Random Key`;
        document.getElementById('pivKey').value = res.data.privatekey;
        document.getElementById('generalKey').value = res.data.publickey;
        document.getElementById('tmp').innerText = res.data.privatekey;
        $("#lblprvkey").removeClass("d-none")
        $("#pivKey").removeClass("d-none")
        $("#privalert").removeClass("d-none")
        $("#prvkey-panel").removeClass("d-none")
        
        
    }
}


function nullifier() {
    document.querySelector('.addKeyField').classList.remove('d-none');
    document.getElementById('key-name').value = '';
    document.getElementById('pivKey').value = '';
    document.getElementById('generalKey').value = '';
}


function makeit(id, pub, name) { return `
    
        <div class="accordion-item" id="ssh-acc-${id}">
            <h2 class="accordion-header" id="flush-heading${id}">
                <div class="accordion-button w-100 collapsed flex-wrap">
                    <div class="col-2 col-md-2 px-4 key-action-col">
                        <ul class="d-flex align-items-center list-unstyled mb-0">
                            <li title="حذف" onclick="myDeleteSWA( (() => removeSsh(${id})) , 'اخطار' ,  'آیا از حذف این کلید مطمئنید؟')">
                                <a class="pointer">
                                    <img class="sublink" src="/general/images/new/ico_delete.svg" alt="">
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-6 col-md-7 general-key-col">
                            <span class="img-ico-wrap" onclick="CopyTxt('${pub}')">
                            <img src="/general/images/new/ico_copy.svg" class="img-ico-copy">
                        </span>
                        <p class="truncate ltr key_truncate d-inline-block">
                        ${pub}
                        </p>
                    </div>  
                    <div class="col-10 col-sm-4 col-md-3 position-relative">
                        <p class="mb-0 fs-14 tl acc-title">
                            <span>${name}</span>
                            <img class="acc-bullet" src="/general/images/root/table/active.svg" alt="">
                        </p>
                    </div>    
                </div>
            </h2>
        </div>

`;}