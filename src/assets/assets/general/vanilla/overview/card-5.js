var ip_validation = true;
async function SendNewRule() {
    var validate_ddos = true;
    var ddos_path = $('#rate-limit-modal-input-location-name').val();
    var ddos_request = $('#modal-ddos-requests').val();
    var ddos_rangeTime = $('#modal-ddos-timerange').val();

    // remove error span if exist 
    if ( document.getElementsByClassName("ip-not-valid-modal") ) {
        let errors = document.getElementsByClassName("ip-not-valid-modal");
        for ( i=0;i in errors; i++ ) {
            errors[i].remove();
        }
    }
    
    if (ddos_path == "") {
        $("#ddos-path-Err").html("<span>مسیر را وارد کنید</span>");
        validate_ddos = false;
    } else {
        $("#ddos-path-Err").find('span').html('');
    }

    if (ddos_request == "") {
        $("#ddos-req-Err").html("<span>تعداد درخواست را وارد کنید</span>");
        validate_ddos = false;
    } else {
        $("#ddos-req-Err").find('span').html('');
    }
    
    if (ddos_rangeTime == "") {
        $("#ddos-time-Err").html("<span>بازه زمانی را وارد کنید</span>");
        validate_ddos = false;
    } else {
        $("#ddos-time-Err").find('span').html('');
    }

    let desired_ips = document.getElementsByClassName("ip");
    const ip_array = [];
    for ( var i=0; i < desired_ips.length; i++ ) {
        let tt = desired_ips[i];
        ip_array.push(tt.getAttribute("data-value"));
    }

    if ( ip_array.length == 0 ) {
        validate_ddos = false;
        document.getElementById("modal-allowed-ip").innerHTML += '<div class="error-field-wrap ip-not-valid-modal fs-13 fw-400 ws-15 ls-02 text-red-400 text-right mt-1"><span>آی پی وارد شده صحیح نمی باشد</span></div>';
    }

    // request if everything is ok
    if ( validate_ddos == true && ip_validation == true ) {
        document.getElementById("sendDdosRule").setAttribute("disabled", "disabled");
        document.getElementById("sendDdosRule").innerHTML = `<img src="/general/loading/tail-spin.svg" />`;


        let mData = new FormData();
        
        let timerange = document.getElementById("modal-ddos-timerange").value;
        let timeformat = document.querySelector("#showUnit span.current-item").getAttribute("data-value");
        if ( timeformat == "ثانیه" ) {
            timeformat = "s"
        } else if ( timeformat == "دقیقه" ) {
            timeformat = "m"
        }
        let numberofrequests = document.getElementById("modal-ddos-requests").value;
        let messagemodal = document.getElementById("modal-ddos-msg").value;
        let burst;

        if ( document.getElementById("burst-switch").hasAttribute("checked") ) {
            burst = true;
        } else {
            burst = true;
        }
        
        console.log(ip_array);
        mData.append("websiteid", $wid);
        mData.append("timeformat", timeformat);
        mData.append("rate", timerange);
        mData.append("desc", messagemodal);
        mData.append("ipranges", ip_array);
        mData.append("burstcount", numberofrequests);
        mData.append("burst", burst);
        const apianswer = await fetch('/submit/cdn/ddos/website/add-rate-limit', { method: "POST", body: mData })
            .then((response) => response.json())
            .then((json) => (result = json)).catch(ex => window.location.reload());

      document.getElementById('rls').checked = true;
      document.getElementById('sendDdosRule').removeAttribute('disabled');
      document.getElementById('sendDdosRule').innerHTML = 'اضافه کردن';
      showAlert(apianswer.status, apianswer.message);
      $('#addDdosRule').modal('hide');

   }
}

function checkIP(myinput) {
    var i = document.getElementById(myinput).value;
    i = i.trim();
    var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|0)$/;
    if (i.match(ipformat)) {
        return true;
    } else {
        if ( i.indexOf('/') != -1 ) {
            console.log('elseif')
            var m = i.split("/");
            if ( m[0].match(ipformat) ) {
                console.log(1);
                var l=parseInt(m[1]);
                if ( l>=16 && l < 33 ){
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

$(document).on('keyup', '#rate-limit-modal-input-ip-address', function(e){
   console.log('zert');
    if(e.keyCode == 13) {
        // remove error span if exist 
        if ( document.getElementsByClassName("ip-not-valid-modal") ) {
            let errors = document.getElementsByClassName("ip-not-valid-modal");
            for ( i=0;i in errors; i++ ) {
                errors[i].remove();
            }
        }

        ip_validation = checkIP("rate-limit-modal-input-ip-address");
        const ip_value  = document.getElementById('rate-limit-modal-input-ip-address').value;
        console.log("ip validation is ", ip_validation);
        if ( ip_validation == true ) {
            $("div[data-value='"+ip_value.trim()+"']").remove();
            $('.ipSelectedModal').append('<div class="ip" data-value="'+ip_value.trim()+'"><i class="remove-ip"><img title="حذف" src="/general/images/root/ico_menu_close.svg"></i>'+ip_value.trim()+'</div>');
            if($('.ipSelectedModal .ip').length > 0  || ip_value !== ' ') {
                $('.ipSelectedModal').removeClass('d-none');
            } else {
                $('.ipSelectedModal').addClass('d-none');
            }
            $(this).val(' ');

        } else {
            document.getElementById("modal-allowed-ip").innerHTML += '<div class="error-field-wrap ip-not-valid-modal fs-13 fw-400 ws-15 ls-02 text-red-400 text-right mt-1"><span>آی پی وارد شده صحیح نمی باشد</span></div>';
        }
    }
});







async function removeRL() {
   $('#addDdosRule').modal('hide');
   document.querySelector('#card-5 .fetcher').classList.remove('d-none');
   let body = new FormData();
   body.append("wid", $wid);
   const data = await fetch("/submit/cdn/ddos/website/remove-rl", {method:"POST", body}).then(r=>r.json()).then(j=>j).catch(ex => window.location.reload());
   showAlert(data.status, data.message);
   document.querySelector('#card-5 .fetcher').classList.add('d-none');
}

function rateLimitMG() {
    if(!document.getElementById('rls').checked) return removeRL();
    else if(document.getElementById('rls').checked) {
    $('#addDdosRule').modal('show');
    document.getElementById('rls').checked = false;
    }
}