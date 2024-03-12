$(document).on("click",".accordion-button",function(e) {
    if (e.target.className == "sublink") {
        return;
    }
    else {
        var paneldestination = $(this).attr("sdata-bs-target")
        $(paneldestination).collapse("toggle");
    }
});

$('#table-cluster').on("click",".accordion-button" ,function(){
    if($(this).hasClass('closed')) {
        $(this).removeClass('closed');
    } else {
        $(this).addClass('closed');
    }
});

function ShowClusterForm(e) {

    $("#recordmanagementtitle").html("افزودن کلاستر");
    $("#addCluster").modal("show");

    $('#addCluster  input[type="text"]').val('');
    $('#showProtocol').find('.current-item').text('Automatic');
    $('#showProtocol .current-item').attr('data-value', 'Automatic');

    $('#showMethod').find('.current-item').text('ip_hash');
    $('#showMethod .current-item').attr('data-value', 'ip_hash');

    $('.error-field-wrap span').html('');
    setTimeout(() => {
        $(".scroll-fix-height").css({
            position:   'absolute', // Optional if #dataCenteroption is already absolute
            visibility: 'hidden',
            display:    'block'
        });
        setTimeout(() => {
            $(".scroll-fix-height").attr("style", 'display: none');
        }, 300);
    }, 200);
}

var cluster_id;
function EditClusterForm(id) {
    cluster_id = id;
    $("#recordmanagementtitleedit").html("ویرایش کلاستر");
    $("#editCluster").modal("show");
    let inputText = document.getElementById("cluster-name-"+cluster_id).textContent;
    let methodText = document.getElementById("cluster-method-"+cluster_id).textContent;
    let protocolText = document.getElementById("cluster-protocol-"+cluster_id).textContent;

    console.log(inputText);
    console.log(methodText);
    console.log(protocolText);
    $('#editCluster  input[type="text"]').val(inputText.trim());
    document.querySelector("#showProtocolEdit > span").innerHTML = protocolText;
    $('#showProtocolEdit .current-item').attr('data-value', protocolText);

    document.querySelector("#showMethodEdit > span").innerHTML = methodText;
    $('#showMethodEdit .current-item').attr('data-value', methodText);

    $('.error-field-wrap span').html('');
    setTimeout(() => {
        $(".scroll-fix-height").css({
            position:   'absolute', // Optional if #dataCenteroption is already absolute
            visibility: 'hidden',
            display:    'block'
        });
        setTimeout(() => {
            $(".scroll-fix-height").attr("style", 'display: none');
        }, 300);
    }, 200);
}

var SubClusterid;
var subclusterstatus;
function ShowServerForm(id,status, protocol) {
    document.querySelectorAll('.alert-danger-border').forEach(el => el.classList.remove('alert-danger-border'));
    SubClusterid = id;
    subclusterstatus= status;

    $("#servermanagementtitle").html("ایجاد سرور برای کلاستر");
    $("#addServerCluster").modal("show");
    $('#addServerCluster input[type="text"]').val('');
    if(protocol === 'Automatic') {
        document.getElementById('port-cluster-header').classList.add('d-none');
        document.getElementById('port-cluster-name').classList.add('d-none');
        document.getElementById('port-cluster-name').value = '0';
        document.getElementById('sendSubCluster').setAttribute('onclick', 'AddServerRecord(false)');
    } else {
        document.getElementById('port-cluster-header').classList.remove('d-none');
        document.getElementById('port-cluster-name').classList.remove('d-none');
        document.getElementById('port-cluster-name').value = '';
        document.getElementById('sendSubCluster').setAttribute('onclick', 'AddServerRecord(true)');
    }
    $('.error-field-wrap span').html('');
}

var clidi;
var subID;
function EditShowServerForm(id,clid,protocol) {
    document.querySelectorAll('.alert-danger-border').forEach(el => el.classList.remove('alert-danger-border'));
    document.getElementById('weight-cluster-Err-edit').innerHTML = '';
    subID = id;
    clidi = clid;
    $("#editservermanagementtitle").html("ویرایش سرور کلاستر");
    $("#editServerCluster").modal("show");
    let ipaddText = document.getElementById("sub-cluster-source-"+subID).textContent;
    let weightText = document.getElementById("sub-cluster-weight-"+subID).textContent;
    let portText = document.getElementById("sub-cluster-port-"+subID).textContent;

    console.log('inja', ipaddText, weightText, portText);
    $('#ip-cluster-name-edit').val(ipaddText);
    $('#weight-cluster-name-edit').val(weightText);
    $('#port-cluster-name-edit').val(portText);
    $('.error-field-wrap span').html('');
    if(protocol === 'Automatic') {
        document.getElementById('port-cluster-header-edit').classList.add('d-none');
        document.getElementById('port-cluster-name-edit').classList.add('d-none');
        document.getElementById('port-cluster-name-edit').value = '0';
    } else {
        document.getElementById('port-cluster-header-edit').classList.remove('d-none');
        document.getElementById('port-cluster-name-edit').classList.remove('d-none');
    }
}

async function AddClusterRecord() {
    var cluster_name = $('#cluster-name').val();
    var volvo = false;
    document.getElementById('cluster-name').classList.remove('alert-danger-border');
    $('#cluster-name-Err').html('');
    if (!/^[^\W]+$/.test(cluster_name) || cluster_name.includes('.') || cluster_name.includes('^')) {
        document.getElementById('cluster-name').classList.add('alert-danger-border');
        $('#cluster-name-Err').html('<span>نام کلاستر میتواند عدد و حروف انگلیسی باشد</span>');
        volvo = true;
    }
    if (volvo) return;
    var protocol = document.getElementById("showProtocol").firstElementChild.getAttribute("data-value");
    var method = document.getElementById("showMethod").firstElementChild.getAttribute("data-value");
    var validate = true;
    if (cluster_name == '') {
        $('#cluster-name-Err').html('<span>نام کلاستر را وارد کنید</span>');
        validate = false;
    }  else if (cluster_name.length < 1) {
        $('#cluster-name-Err').html('<span>نام کلاستر کوتاه است</span>');
        validate = false;
    } else {
        $('#cluster-name-Err span').html('');
    }
    if (validate) {
        document.getElementById("sendCluster").setAttribute("disabled", "disabled");
        document.getElementById("sendCluster").innerHTML = `<img src="/general/loading/tail-spin.svg" />`;
        await RequestToAddCluster(cluster_name, protocol, method);
        document.getElementById("sendCluster").removeAttribute("disabled");
        document.getElementById("sendCluster").innerHTML = `اضافه کردن`;
        $("#addCluster").modal("hide");
    }

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
       return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}

async function EditClusterRecord() {
    var cluster_name = $('#cluster-name-edit').val();
    var protocol = document.getElementById("showProtocolEdit").firstElementChild.getAttribute("data-value");
    var method = document.getElementById("showMethodEdit").firstElementChild.getAttribute("data-value");
    var validate = true;
    if (cluster_name == '') {
        $('#cluster-name-Err-edit').html('<span>نام کلاستر را وارد کنید</span>');
        validate = false;
    } else {
        $('#cluster-name-Err-edit span').html('');
    }
    console.log(protocol, method);
    if (validate) {
        document.getElementById("sendClusterEdit").setAttribute("disabled", "disabled");
        document.getElementById("sendClusterEdit").innerHTML = `<img src="/general/loading/tail-spin.svg" />`;
        await RequestToEditCluster(cluster_name, protocol, method);
        document.getElementById("sendClusterEdit").removeAttribute("disabled");
        document.getElementById("sendClusterEdit").innerHTML = `ویرایش`;
        $("#editCluster").modal("hide");
    }
}

async function AddServerRecord(notAutomatic = false) {
    var ip_cluster_name = $('#ip-cluster-name').val();
    var weight_cluster_name = $('#weight-cluster-name').val();
    var port_cluster_name = $('#port-cluster-name').val();

    var volvo = false;
    document.getElementById('ip-cluster-name').classList.remove('alert-danger-border');
    document.getElementById('weight-cluster-name').classList.remove('alert-danger-border');
    document.getElementById('port-cluster-name').classList.remove('alert-danger-border');
    $('#ipcluster-name-Err').html('');
    $('#weight-cluster-name').html('');
    $('#port-cluster-Err').html('');
    // if (!checkIP('ip-cluster-name') || ip_cluster_name.includes('^')) {
    //     document.getElementById('ip-cluster-name').classList.add('alert-danger-border');
    //     $('#ipcluster-name-Err').html('<span>سرور باید ipv4 باشد</span>');
    //     volvo = true;
    // }
    if (!/^[0-9]+$/gi.test(weight_cluster_name) || weight_cluster_name.includes('^') || parseInt(weight_cluster_name) > 1000 || parseInt(weight_cluster_name) < 1 ) {
        document.getElementById('weight-cluster-name').classList.add('alert-danger-border');
        document.getElementById('weight-cluster-Err').innerHTML = '<span>' + 'وزن باید بین 1 و 1000 باشد' + '</span>';
        volvo = true;
    }
    if(notAutomatic) {
        if (!/^[0-9]+$/gi.test(port_cluster_name) || port_cluster_name.includes('^') || parseInt(port_cluster_name) > 65535 ) {
            document.getElementById('port-cluster-name').classList.add('alert-danger-border');
            $('#port-cluster-Err').html('<span>پورت وارد شده مجاز نمی باشد</span>');
            volvo = true;
        }
    }

    var validate = true;
    if (ip_cluster_name == '') {
        $('#ipcluster-name-Err').html('<span>ای پی سرور را وارد کنید</span>');
        validate = false;
    } else {
        $('#ipcluster-name-Err span').html('');
    }

    if (weight_cluster_name == '') {
        $('#weight-cluster-Err').html('<span>weight را وارد کنید</span>');
        validate = false;
    }
    if(notAutomatic) {
        if (port_cluster_name == '') {
            $('#port-cluster-Err').html('<span>port را وارد کنید</span>');
            validate = false;
        }
    }
    if (volvo) return;
    if (validate) {
        document.getElementById("sendSubCluster").setAttribute("disabled", "disabled");
        document.getElementById("sendSubCluster").innerHTML = `<img src="/general/loading/tail-spin.svg" />`;
        await RequestToAddSubCluster(port_cluster_name, weight_cluster_name, ip_cluster_name, SubClusterid);
        document.getElementById("sendSubCluster").removeAttribute("disabled");
        document.getElementById("sendSubCluster").innerHTML = `اضافه کردن`;
    }
}

async function EditServerRecord() {
    var ip_cluster_name = $('#ip-cluster-name-edit').val();
    var weight_cluster_name = $('#weight-cluster-name-edit').val();
    var port_cluster_name = $('#port-cluster-name-edit').val();

    var validate = true;
    if (ip_cluster_name == '') {
        $('#ipcluster-name-Err').html('<span>ای پی سرور را وارد کنید</span>');
        validate = false;
    } else {
        $('#ipcluster-name-Err span').html('');
    }
    if (!/^[0-9]+$/gi.test(weight_cluster_name) || weight_cluster_name.includes('^') || parseInt(weight_cluster_name) > 1000 || parseInt(weight_cluster_name) < 1 ) {
        document.getElementById('weight-cluster-name-edit').classList.add('alert-danger-border');
        document.getElementById('weight-cluster-Err-edit').innerHTML = '<span>' + 'وزن باید بین 1 و 1000 باشد' + '</span>';
        validate = false;
    }
    if (weight_cluster_name == '') {
        $('#weight-cluster-Err').html('<span>weight را وارد کنید</span>');
        validate = false;
    }

    if (port_cluster_name == '') {
        $('#port-cluster-Err').html('<span>port را وارد کنید</span>');
        validate = false;
    } else {
        $('#port-cluster-Err span').html('');
    }


    if (validate) {
        document.getElementById("sendEditSubCluster").setAttribute("disabled", "disabled");
        document.getElementById("sendEditSubCluster").innerHTML = `<img src="/general/loading/tail-spin.svg" />`;
        console.log(port_cluster_name, weight_cluster_name, ip_cluster_name, subID);
        await RequestToEditSubCluster(port_cluster_name, weight_cluster_name, ip_cluster_name, subID);
        document.getElementById("sendEditSubCluster").removeAttribute("disabled");
        console.log(document.getElementById("sendEditSubCluster"));
        document.getElementById("sendSubCluster").innerHTML = `ویرایش`;
        document.getElementById("sendEditSubCluster").innerHTML = `ویرایش`;
        // $("#editServerCluster").modal("hide");
    }
}

function showAlert(status = 'success', text = '', key=''){
    // if(document.getElementById('dvalert').classList.contains('alert-border-success')) {
    //     document.getElementById('dvalert').classList.remove('alert-border-success')
    // }
    // if(document.getElementById('dvalert').classList.contains('alert-border-danger')) {
    //     document.getElementById('dvalert').classList.remove('alert-border-danger')
    // }
    // if (status === 'success') {
    //     $("#dvalert").addClass("alert-border-success");
    //     document.getElementById("img").setAttribute(`src`,`/general/images/root/alerts/ico_message_check.svg`);
    // } else {
    //     $("#dvalert").addClass("alert-border-danger");
    //     document.getElementById("img").setAttribute(`src`,`/general/images/root/alerts/ico_message_warn.svg`);
    // }
  
    // document.getElementById('popop').innerHTML = text;
    // document.getElementById('popopki').innerHTML = key;
    // $("#dvalert").fadeOut(0);
    // $(".progressloader").html('');
    // $(window).scrollTop(0);
    // $("#dvalert").fadeIn(400);
    // var bar = new ProgressBar.Circle('.progressloader', {
    //   strokeWidth: 10,
    //   easing: 'easeInOut',
    //   duration: 5000,
    //   color: '#59C2E2',
    //   trailColor: '#eee',
    //   trailWidth: 1,
    //   svgStyle: null,
    // });
  
    // bar.animate(1.0);
    // setTimeout(function(){
    //   $("#dvalert").fadeOut(400);
    //   $(".progressloader").html('');
  
    // }, 5000);
  

    $('#dvalert-wrap').append(`<div class="login-alert shadow-sm animated animatedFadeInUp fadeInUp ${status === 'success' ? 'success-alert' : 'error-alert'}">
        <img id="img" class="img-alert" src="${status === 'success' ? '/general/images/root/alerts/img_success-8.png' : '/general/images/root/alerts/img_error-8.png'}" />
        <p class="alert-cont">
        <span id="alert-stat">${status === 'success' ? 'موفق !' : 'خطا !'}</span>
        <span id="popop" class="fs-13" style="word-spacing:-1px;">${text}
        </span>
        </p>
        <span id="popopki" class="fs-13 alert-command">${key}
        </span>
    </div>`);
    $("#dvalert-wrap .login-alert").fadeOut(0);
    $(".progressloader").html('');
    $("#dvalert-wrap .login-alert").fadeIn(200);

    document.querySelectorAll('.login-alert').forEach(alert => {
        setTimeout(function () {
            $(alert).fadeOut(200);
            $(alert).remove();
        }, 5000);
    });
}

async function AddClusterToWebsite() {
    document.getElementById("sendClustertowebsite").setAttribute("disabled", "disabled");
    document.getElementById("sendClustertowebsite").innerHTML = `<img src="/general/loading/tail-spin.svg" />`;

    var choosedcluster = document.querySelector("#ClusterToWebsite > span").getAttribute("data-value");
    var ans = await ClusterToWebsite(choosedcluster);
    
}




async function RequestToAddCluster(cluster_name, protocol, method) {
    let mData = new FormData();
    mData.append("domain", $domain);
    mData.append("domainid", $domainid);
    mData.append("protocol", protocol);
    mData.append("method", method);
    mData.append("name", cluster_name);
    const answer = await fetch("/submit/cluster/add-cluster", { method: "POST", body: mData })
        .then((response) => response.json())
        .then((json) => (result = json)).catch(ex => window.location.reload());;
    console.log(answer);
    if (answer.status == "success") {
        var newClusterID = answer.id;
        // showAlert('success', 'کلاستر با موفقیت اضافه شد');
        if($("#emptydoc").hasClass("emptydoc")){
            window.location.reload();
        } else {
            console.log('inja rec');
            $("#table-cluster tbody").prepend(generateClusterRow(newClusterID, protocol, method, cluster_name));
        }
    } else {
        // showAlert('err', answer.message);
    }
    showAlert(answer.status, answer.message);
}

async function RequestToEditCluster(cluster_name, protocol, method) {
    let mData = new FormData();
    mData.append("domain", $domain);
    mData.append("domainid", $domainid);
    mData.append("protocol", protocol);
    mData.append("method", method);
    mData.append("name", cluster_name);
    mData.append("id", cluster_id);
    console.log($domain,$domainid, protocol, method, cluster_name, cluster_id);
    const answer = await fetch("/submit/cluster/update-cluster", { method: "POST", body: mData })
        .then((response) => response.json())
        .then((json) => (result = json)).catch(ex => window.location.reload());
    console.log(answer);
    if (answer.status == "success") {
        showAlert('success', 'کلاستر با موفقیت ویرایش شد');
        document.getElementById("cluster-method-"+cluster_id).innerHTML = method;
        document.getElementById("cluster-protocol-"+cluster_id).innerHTML = protocol;
        document.getElementById("cluster-name-"+cluster_id).innerHTML = cluster_name + `
        <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="غیرفعال" src="/general/images/root/table/danger.svg" alt="">
        `;
    } else {
        showAlert('err', answer.message);
    }
}

function generateClusterRow(newClusterID, protocol, method, cluster_name) {
    console.log('onja rec');
    var template = 
    `
    <tr> <td>
    <div class="accordion-item" id="acc-${newClusterID}">
        <h2 class="accordion-header" id="flush-heading-${newClusterID}">
            <button id="btn-accordion-${newClusterID}" class="accordion-button w-100 collapsed DnsrecordList" sdata-bs-toggle="collapse" sdata-bs-target="#active-flush-collapse-${newClusterID}" saria-expanded="false" saria-controls="active-flush-collapse-${newClusterID}">
                <div class="col-3 col-sm-4 col-md-5 cluster-action-col">
                    <ul class="d-flex justify-content-start align-items-center list-unstyled mb-0 cluster-action fnlist">
                        <li title="حذف">
                                <span>
                                    <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="حذف" onclick="deleteCluster('${newClusterID}', this)" class="sublink" src="/general/images/new/ico_delete.svg" alt="">
                                </span>
                            <span class="fnlist-title">حذف</span>
                        </li>
                        <li title="مدیریت سرورهای کلاستر">
                                <span>
                                    <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="مدیریت سرورهای کلاستر" onclick="ShowServerForm('${newClusterID}','error', '${protocol}')" class="sublink" src="/general/images/new/ico_server_management.svg" alt="">
                                </span>
                            <span class="fnlist-title">مدیریت سرورهای کلاستر</span>
                        </li>
                        <li title="افزودن کلاستر به سایت" onclick="openWebsiteClusterAssign(this,'${$did}','${$wid}','${$website}','${$domain}');">
                            <span>
                                <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="افزودن کلاستر به سایت"  class="sublink" src="/general/images/new/ico_cluster_manage.svg" alt="">
                            </span>
                            <span class="fnlist-title">افزودن کلاستر به سایت</span>
                        </li>
                    </ul>
                    <span class="fnlist-options" wfd-invisible="true">
                        <img src="/general/images/root/topMenu/ico_dotted_ico.svg">
                    </span>
                </div>
                <div class="col-2 col-md-2 protocol-col">
                    <p class="mb-0 fs-14 fw-400 text-center" id="cluster-method-${newClusterID}">${method}</p>
                </div>
                <div class="col-2 col-md-2 method-col">
                    <p class="mb-0 fs-14 fw-400 text-center" id="cluster-protocol-${newClusterID}">
                    ${protocol}
                    </p>
                </div>
                <div class="col-5 col-sm-4 col-md-3 cluster-col">
                    <p class="fs-14 fw-400 mb-0 ws-05 tl px-3 cluster-name" id="cluster-name-${newClusterID}">  
                    ${cluster_name}
                    <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="غیرفعال" src="/general/images/root/table/danger.svg" alt="">
                    </p>
                </div>
            </button>
        </h2>             
    </div>
    </tr> </td>
    `;
    return template;
}

function generateSubClusterRow(newSubClusterID, port, weight, source, cluster, protoco = '') {
    const protocol = document.getElementById('cluster-protocol-'+cluster).innerHTML.trim();
    var templates = 
    `
    <div id="subCluster-inner-${newSubClusterID}" class="d-flex row-accordion-body align-items-center px-0">
        <div class="col-3 col-sm-4 col-md-5 cluster-action-col">
            <ul class="d-flex justify-content-start align-items-center list-unstyled mb-0 cluster-action fnlist">
                <li title="حذف">
                    <span>
                        <img onclick="deleteSubCluster('${cluster}' ,'${newSubClusterID}')" src="/general/images/new/ico_delete.svg" alt="حذف">
                    </span>
                    <span class="fnlist-title">مدیریت</span>
                </li>
                <li title="مدیریت رکوردهای DNS" onclick="EditShowServerForm('${newSubClusterID}', '${cluster}', '${protocol}')">
                    <span>
                        <img src="/general/images/new/ico_manage.svg" alt="مدیریت رکوردهای DNS">
                    </span>
                    <span class="fnlist-title">مدیریت رکوردهای DNS</span>
                </li>
            </ul>
            <span class="fnlist-options">
                <img src="/general/images/root/topMenu/ico_dotted_ico.svg">
            </span>
        </div>
        <div class="col-2 col-sm-2 col-md-2 port-col">
            <p class="fs-14 mb-0 text-center" id="sub-cluster-port-${newSubClusterID}">${port == 0 ? 'auto' : port}</p>
        </div>
        <div class="col-2 col-sm-2 col-md-2 weight-col">
            <p class="mb-0 fs-14 text-center" id="sub-cluster-weight-${newSubClusterID}">${weight}</p>
        </div>
        <div class="col-5 col-sm-4 col-md-3 ipServer-name-col">
            <p class="fs-14 fw-400 mb-0 ws-05 tl px-4-5 EnFont" id="sub-cluster-source-${newSubClusterID}">${source}</p>
        </div>
    </div>
    `;
    console.log(templates);
    return templates;
}

function deleteCluster(cid, self) {
    console.log(self);
    swalWithBootstrapButtonsDelete.fire({
        title: 'اخطار',
        html: 'آیا از حذف کلاستر مورد نظر خود اطمینان دارید؟ ',
        //timer: 3000,
        icon: 'error',
        timerProgressBar: true,
        confirmButtonText: 'قبول',
        showCancelButton: true,
        cancelButtonText: 'خیر',
        didOpen: () => {
            timerInterval = setInterval(() => {
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {

    });
    var al = $(".swal2-modal").html();
    $(".swal2-modal").html("");
    var nal = "<div id='sml'>" + al + "</div>";
    $(".swal2-modal").html(nal);
    $(".swal2-cancel").click(function () {
        swalWithBootstrapButtonsDelete.close();
    })
    $(".swal2-confirm").click(function () {
        RequestdeleteCluster(cid);
        swalWithBootstrapButtonsDelete.close();
    })
}

async function RequestdeleteCluster(cid) {
    let mData = new FormData();
    mData.append("id", cid);
    mData.append("domainid", $domainid);
    const answer = await fetch("/submit/cluster/remove-cluster", { method: "POST", body: mData })
        .then((response) => response.json())
        .then((json) => (result = json)).catch(ex => window.location.reload());;
    console.log(answer);
    console.log(answer.status);
    console.log(answer.message);
    if ( answer.status == "success" ) {
        showAlert('success', 'کلاستر مدنظرتان حذف شد');
        $("#acc-" + cid).slideUp(function () {
            $("#acc-" + cid).parent().remove();
        });
    } else {
        showAlert('err', 'امکان حذف کلاستر نمی باشد');
    }
    return answer;

}

async function RequestToAddSubCluster(port, weight, source, cluster, protocol = '') {
    let mData = new FormData();
    mData.append("port", port);
    mData.append("weight", weight);
    mData.append("source", source);
    mData.append("cluster", cluster);
    const answer = await fetch("/submit/cluster/add-sub-cluster", { method: "POST", body: mData })
        .then((response) => response.json())
        .then((json) => (result = json)).catch(ex => window.location.reload());
    console.log(answer);
    if (answer.status == "success") {
        $("#addServerCluster").modal("hide");

        var newSubClusterID = answer.id;
        // showAlert('success', 'کلاستر با موفقیت اضافه شد');
        // if(subclusterstatus=="error"){
        //     window.location.reload();
        // }
        console.log(cluster);
        if(!document.getElementById('active-flush-collapse-'+cluster)) {
        document.getElementById('flush-heading-'+cluster).parentNode.innerHTML += `
            <div id="active-flush-collapse-${cluster}" class="accordion-collapse collapse show" data-bs-parent="#ClusterList" style="">
                <div class="accordion-body p-0 d-none" id="vod_issue_body-${cluster}">
                    <div class="d-none d-sm-flex flex-wrap justify-content-between cluster-list-header">
                        <div class="col-3 col-sm-4 col-md-5 cluster-action-col">
                            <p class="titledetails fs-13 fw-600 mb-0  ws-05 text-right cluster-action">عملیات</p>
                        </div>
                        <div class="col-2 col-sm-2 col-md-2 port-col">
                            <p class="titledetails fs-13 fw-600 mb-0  ws-05 text-center">پورت</p>
                        </div>
                        <div class="col-2 col-sm-2 col-md-2 weight-col">
                            <p class="titledetails fs-13 fw-600 mb-0  ws-05 text-center">وزن</p>
                        </div>
                        <div class="col-5 col-sm-4 col-md-3 ipServer-name-col">
                            <p class="titledetails fs-13 fw-600 mb-0  ws-05 tl px-4-5">سرور سایت</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
            document.getElementById('btn-accordion-'+cluster).classList.remove('DnsrecordList');
        }
        if(document.getElementById('vod_issue_body-'+cluster)?.classList.contains('d-none'))
            document.getElementById('vod_issue_body-'+cluster)?.classList.remove('d-none');
        if(document.getElementById('btn-accordion-'+cluster)?.classList.contains('DnsrecordList'))
            document.getElementById('btn-accordion-'+cluster)?.classList.remove('DnsrecordList');
        if(document.getElementById('active-flush-collapse-'+cluster)?.classList.contains('d-none'))
            document.getElementById('active-flush-collapse-'+cluster)?.classList.remove('d-none');
        $("#vod_issue_body-"+cluster).append(generateSubClusterRow(newSubClusterID, port, weight, source, cluster, protocol));
    } else {
        // showAlert('err', answer.message);
    }
    showAlert(answer.status, answer.message);

}

async function RequestToEditSubCluster(port, weight, source, cluster) {
    let mData = new FormData();
    mData.append("port", port);
    mData.append("weight", weight);
    mData.append("source", source);
    mData.append("clusterid", clidi);
    mData.append("id", subID);
    const answer = await fetch("/submit/cluster/update-sub-cluster", { method: "POST", body: mData })
        .then((response) => response.json())
        .then((json) => (result = json)).catch(ex => window.location.reload());
    console.log(answer);
    if (answer.status == "success") {
        $("#editServerCluster").modal("hide");

        var newSubClusterID = answer.id;
        // showAlert('success', 'کلاستر با موفقیت ویرایش شد');
        if(subclusterstatus=="error"){
            window.location.reload();
        }
        console.log(cluster);
        document.getElementById("sub-cluster-source-"+subID).innerHTML = source;
        document.getElementById("sub-cluster-weight-"+subID).innerHTML = weight;
        document.getElementById("sub-cluster-port-"+subID).innerHTML = port == 0 ? 'auto' : port;
    } else {
        // showAlert('err', answer.message);
    }
    showAlert(answer.status, answer.message);

}

async function deleteSubCluster(cluster, clid) {
 
    let id =clid;
    swalWithBootstrapButtonsDelete.fire({
        title: 'اخطار',
        html: 'آیا از حذف این سرور اطمینان دارید؟ ',
        //timer: 3000,
        icon: 'error',
        timerProgressBar: true,
        confirmButtonText: 'قبول',
        showCancelButton: true,
        cancelButtonText: 'خیر',
         
        didOpen: () => {
            timerInterval = setInterval(() => {
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
  
    });
    var al = $(".swal2-modal").html();
    $(".swal2-modal").html("");
    var nal = "<div id='sml'>" + al + "</div>";
    $(".swal2-modal").html(nal);
    $(".swal2-cancel").click(function () {
        swalWithBootstrapButtonsDelete.close();
    })
    $(".swal2-confirm").click(async function () {
        let rBody = new FormData();
        rBody.append("id", id);
        rBody.append("clusterid",cluster);
        rBody.append("cldid",clid);
        rBody.append("domain", $domain);
        rBody.append("domainid", $did);
        const results = await fetch("/submit/cluster/delete-sub-cluster", { method: "POST", body: rBody}).then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
        if (results.status === "success") {
           $("#subCluster-inner-"+id).slideUp(function () {
              $("#subCluster-inner-"+id).remove();
           });
           if(document.getElementById('vod_issue_body-'+cluster).children.length < 3) {
                document.getElementById('vod_issue_body-'+cluster).classList.add('d-none');
                document.getElementById('btn-accordion-'+cluster).classList.add('DnsrecordList');
           }
        }
        showAlert(results.status, results.message);
        swalWithBootstrapButtonsDelete.close();
    })
}

async function ClusterToWebsite(choosedcluster) {

}



async function unassignCluster (clusterID, self) {
    const callback = async function () {
        let mData = new FormData();
        mData.append("domain", $domain);
        mData.append("domainid", $domainid);
        mData.append("wid", $wid);
        mData.append("cluster", clusterID);
        const answer = await fetch("/submit/cluster/unassign-cluster", { method: "POST", body: mData })
            .then((response) => response.json())
            .then((json) => (result = json)).catch(ex => window.location.reload());
        console.log(answer);
        showAlert(answer.status, answer.message);
        if(answer.status === 'success') { 
            self.classList.add('d-none');
            $(`#cluster-image-${clusterID}`).html(`<img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="غیرفعال" src="/general/images/root/table/danger.svg" alt="">`);
            document.getElementById(`remove-${clusterID}`).classList.remove('d-none');
        }
    }
    myDeleteSWA(callback, "اخطار", "از جداسازی این کلاستر اطمینان دارید؟");
}
