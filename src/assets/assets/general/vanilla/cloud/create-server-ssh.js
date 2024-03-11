
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
        addToSshList(document.getElementById('key-name').value, res.id);
        nullifier();
        $('#addSshKey').modal('hide');
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
        // document.getElementById('key-name').value = res.data.name;
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



function addToSshList(name, id) {
    document.getElementById('keypasslist').innerHTML += `
    <li onclick="customDropdown('showkeypass' , 'keypasslist','${name}','${id}')" class="select-item fs-13 py-1 px-1 rounded-pill" data-value="${id}">
        <span>
            ${name} 
        </span>
    </li>
    `;
}