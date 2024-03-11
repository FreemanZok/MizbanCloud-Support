var ip_validation = true;
async function SendNewRule() {
    ip_validation = true;
    var validate_ddos = true;
    var ddos_blackhole = $('#showBlockUnit .current-item').attr('data-value');
    var ddos_path = $('#rate-limit-modal-input-location-name').val();
    var ddos_request = $('#modal-ddos-requests').val();
    // var ddos_rangeTime = $('#modal-ddos-timerange').val();
    var ddos_azina = $('#modal-ddos-msg').val();
    document.getElementById("ip-allow-Err").innerHTML = '';
    // remove error span if exist 
    if (document.getElementsByClassName("ip-not-valid-modal")) {
        let errors = document.getElementsByClassName("ip-not-valid-modal");
        for (i = 0; i in errors; i++) {
            errors[i].remove();
        }
    }

    if (ddos_path == "") {
        $("#ddos-path-Err").html("<span>مسیر را وارد کنید</span>");
        validate_ddos = false;
    } else {
        $("#ddos-path-Err").find('span').html('');
    }

    // if (ddos_azina.length < 5) {
    //     $("#ddos-msg-Err").removeClass('d-none');
    //     validate_ddos = false;
    // } else {
    //     $("#ddos-msg-Err").addClass('d-none');
    // }


    if (ddos_request == "") {
        $("#ddos-req-Err").html("<span>تعداد درخواست را وارد کنید</span>");
        validate_ddos = false;
    } else {
        $("#ddos-req-Err").find('span').html('');
    }

    // if (ddos_rangeTime == "") {
    //     $("#ddos-time-Err").html("<span>بازه زمانی را وارد کنید</span>");
    //     validate_ddos = false;
    // } else {
    //     $("#ddos-time-Err").find('span').html('');
    // }

    let desired_ips = $("#modal-box-ip:last .ip");
    let ip_array = [];
    for (var i = 0; i < desired_ips.length; i++) {
        let tt = desired_ips[i];
        ip_array.push(tt.getAttribute("data-value"));
    }
    console.log(desired_ips);
    // if ( ip_array.length == 0 ) {
    //     validate_ddos = false;
    //     document.getElementById("ip-allow-Err").innerHTML = '<span>آی پی وارد شده صحیح نمی باشد</span>';
    // }

    // request if everything is ok
    if (validate_ddos == true && ip_validation == true) {
        document.getElementById("sendDdosRule").setAttribute("disabled", "disabled");
        document.getElementById("sendDdosRule").innerHTML = `<img src="/general/loading/tail-spin.svg" />`;


        let mData = new FormData();

        // let timerange = document.getElementById("modal-ddos-timerange").value;
        let timeformat = document.querySelector("#showUnit span.current-item").getAttribute("data-value");
        if (timeformat == "در ثانیه") {
            timeformat = "s"
        } else if (timeformat == "در دقیقه") {
            timeformat = "m"
        }
        let numberofrequests = document.getElementById("modal-ddos-requests").value;
        let messagemodal = document.getElementById("modal-ddos-msg").value;
        messagemodal = messagemodal === "0" ? '' : messagemodal;
        let burst;

        // if (document.getElementById("burst-switch").hasAttribute("checked")) {
        //     burst = true;
        // } else {
        //     burst = false;
        // }

        console.log(ip_array);
        mData.append("websiteid", $wid);
        mData.append("timeformat", timeformat);
        // mData.append("rate", timerange);
        mData.append("desc", messagemodal);
        mData.append("ipranges", ip_array);
        mData.append("burstcount", numberofrequests);
        mData.append("burst", '');
        mData.append("blackhole", ddos_blackhole);
        const apianswer = await fetch('/submit/cdn/ddos/website/add-rate-limit', { method: "POST", body: mData })
            .then((response) => response.json())
            .then((json) => (result = json)).catch(ex => window.location.reload());

        if (apianswer.status == "success") {
            await setSpaData();
            $("#addDdosRule").modal("hide");
            showAlert("success", apianswer.message)
        } else {
            showAlert("err", apianswer.message)
        }

        document.getElementById("sendDdosRule").removeAttribute("disabled");
        document.getElementById("sendDdosRule").innerHTML = `ذخیره`;
    }
}

function checkIP(myinput) {
    var i = document.getElementById(myinput).value;
    i = i.trim();
    var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|0)$/;
    if (i.match(ipformat)) {
        return true;
    } else {
        if (i.indexOf('/') != -1) {
            console.log('elseif')
            var m = i.split("/");
            if (m[0].match(ipformat)) {
                console.log(1);
                var l = parseInt(m[1]);
                if (l >= 16 && l < 33) {
                    console.log(11);
                    return true;
                }
                else {
                    console.log(12);
                    return false
                }
            }
        } else {
            console.log('elseelse');
            return false
        }
        console.log('else');
        return false;
    }
}
if (nodata) document.querySelector('.ipSelectedModal').innerHTML = 'ip های مورد نظر را در کادر بالا وارد کرده و کلید enter را بفشارید';
$(document).on('keyup', '#addDdosRule[data-t="00000"] #rate-limit-modal-input-ip-address', function (e) {
    if (e.keyCode == 13) {

        // remove error span if exist 
        if (document.getElementsByClassName("ip-not-valid-modal")) {
            let errors = document.getElementsByClassName("ip-not-valid-modal");
            for (i = 0; i in errors; i++) {
                errors[i].remove();
            }
        }

        const ip_value = document.getElementById('rate-limit-modal-input-ip-address').value;
        ip_validation = checkIP("rate-limit-modal-input-ip-address") && !ip_value.includes('/');
        if (!document.querySelector('.ipSelectedModal .ip')) {
            document.querySelector('.ipSelectedModal').innerHTML = '';
        }
        console.log("ip validation is ", ip_validation);
        if (ip_validation == true) {
            document.getElementById("ip-allow-Err").innerHTML = ``;
            document.getElementById('ip-allow-Err')?.classList.add('d-none');
            $("div[data-value='" + ip_value.trim() + "']").remove();
            $('#addDdosRule[data-t="00000"] .ipSelectedModal').append('<div class="ip EnFont" data-value="' + ip_value.trim() + '"><i class="remove-ip"><img title="حذف" src="/general/images/root/ico_menu_close.svg"></i>' + ip_value.trim() + '</div>');
            if ($('#addDdosRule[data-t="00000"] .ipSelectedModal .ip').length > 0 || ip_value !== '') {
                $('#addDdosRule[data-t="00000"] .ipSelectedModal').removeClass('d-none');
            } else {
                $('#addDdosRule[data-t="00000"] .ipSelectedModal').addClass('d-none');
            }
            $(this).val('');

        } else {
            document.getElementById('ip-allow-Err')?.classList.remove('d-none');
            const ip_value = document.getElementById('rate-limit-modal-input-ip-address');
            if (ip_value.value.includes('/') && checkIP(ip_value.id))
                document.getElementById("ip-allow-Err").innerHTML = '<span>آیپی وارد شده معتبر نیست</span>';
            else
                document.getElementById("ip-allow-Err").innerHTML = '<span>آیپی وارد شده معتبر نیست</span>';
        }
    }
});