$("#ActiveDnsRecordPanel .DnsrecordList").each((id, elem) => {
    if (elem.innerText.indexOf('MX') != -1 || elem.innerText.indexOf('SRV') != -1) {
        $("#" + elem.id).addClass('other-recordes');
    }
});

async function editDnsRecord(_recordtype, _id) {
    console.log('stepe 444');
    var validdata = true;
    let flag = false;
    if (_recordtype === "A") {
        var txtname_a = $('#txtname-a').val();
        var txtip_a = $('#txtip-a').val();
        
        
        if (txtname_a !== '@' && txtname_a !== '*' && !/^[*].?[A-z0-9]{0,5}?$/.test(txtname_a) && !/^[A-z0-9\.\-]{1,63}$/gi.test(txtname_a)) {
            if (!/^[چجحخهعغفقثصضپگکمنتالبیسشوئدذرزطظ*]{1,32}$/gi.test(txtname_a)){
           
                $('#txtname-aErr').html('<span>عنوان معتبر وارد کنید</span>');
            flag = true;
            validdata = false;
            }
        } else {
            $('#txtname-aErr').html('');
        }
        if(txtname_a.startsWith('.')  || txtname_a.includes('..') || txtname_a.includes('\\') || txtname_a.includes('^')) {
            $('#txtname-aErr').html('<span>عنوان معتبر وارد کنید</span>');
            validdata = false;
        }

        if (txtip_a === '') {
            $('#txtip-aErr').html('<span>IPv4 را وارد کنید</span>');
            flag = true;
            validdata = false;
        } else {
            $('#txtip-aErr').html('');
        }
        if(document.getElementById('proxystatus-a').checked) {
            if(document.querySelector('#showptla span').getAttribute('data-value').toLowerCase() !== "automatic" &&
            document.querySelector('#showptla span').getAttribute('data-value').toLowerCase() != "undefined") {
            if( domValue('txtport-a') == '' ||
                !parseInt(domValue('txtport-a')) || 
                    parseInt(domValue('txtport-a')) > 65535 || 
                    parseInt(domValue('txtport-a')) < 1 ) {
                    flag = true;
                    validdata = false;  
                    document.getElementById('txtport-aErr').innerHTML = 'پورت نامعتبر';
                    // alert('JER'+ document.querySelector('#showptla span').getAttribute('data-value').toLowerCase()+document.querySelector('#showptla span').getAttribute('data-value'));
            }
            }else{
                document.getElementById('txtport-aErr').innerHTML = '';
            }
        }
        if (flag) return;

        if ($('#geostatus').is(':checked')) {
            $(".geoip").each(function () {
                if ($(this).parent().parent().parent().hasClass("d-none")) {
                } else {
                    if ($(this).parent().parent().hasClass("d-none")) {
                    } else {
                        if ($(this).val() == "") {
                            $(this).next(".errorIp").html("<span>IPv4 را وارد کنید</span>")
                            validdata = false;
                            flag = true;
                        } else {
                            $(this).next(".errorIp").find('span').html('');
                        }
                    }
                }
            });
            console.log(validdata);
            $('.geoWeight').each(function () {
                if ($(this).parent().parent().parent().hasClass("d-none")) {
                } else {
                    if ($(this).parent().parent().hasClass("d-none")) {
                    } else {
                        if ($(this).val() == "") {
                            $(this).next(".errorWeight").html("<span>وزن را وارد کنید</span>");
                            validdata = false;
                            flag = true;
                        } else {
                            $(this).next(".errorWeight").find('span').html('');
                        }
                    }
                }
            });
            console.log(validdata);
            $('.geo-country .select-wrap').each(function () {
                if ($(this).parent().parent().parent().hasClass("d-none")) {
                } else {
                    if ($(this).parent().parent().hasClass("d-none")) {
                    } else {
                        if ($(this).find('.current-item').data('value') == undefined) {
                            $(this).next(".errorCountry").html('<span>کشور را انتخاب کنید</span>');
                            validdata = false;
                            flag = true;
                        } else {
                            $(this).next(".errorCountry").find('span').html('');
                        }
                    }
                }
            });
            console.log(validdata);
        }
        if (!validdata) {
            return;
        } else {
            if (typeof recSucc != undefined && txtname_a !== '' && txtip_a !== '') {
                if ( recErr != undefined) {
                } else {
                console.log(recSucc, recErr, typeof recSucc != undefined);
                }
            } else { }
        }

    }
    if (_recordtype === "TXT") {
        var txt_name_txt = $('#txt-name-txt').val();
        var txt_text_txt = $('#txt-text-txt').val();
        if (txt_name_txt !== '@' && /* !/^[*].?[A-z0-9]{0,5}?$/.test(txt_name_txt) && */ !/^[A-z0-9\.\-_\.]{1,63}$/gi.test(txt_name_txt)) {
            $('#txtNameTxtErr').html('<span>عنوان معتبر وارد کنید</span>');
            flag = true;
            validdata = false;
        } else {
            $('#txtNameTxtErr span').html('');
        }
        if(txt_name_txt.startsWith('.')  || txt_name_txt.includes('..') || txt_name_txt.includes('\\') || txt_name_txt.includes('^')) {
            $('#txtname-aErr').html('<span>عنوان معتبر وارد کنید</span>');
            validdata = false;
        }
        if (txt_text_txt === '') {
            $('#txtTextErr').html('<span>متن را وارد کنید</span>');
            flag = true;
            validdata = false;
        } else {
            $('#txtTextErr span').html('');
        }

        if (typeof recSucc != undefined && txt_name_txt !== '' && txt_text_txt !== '') {
            if ( recErr != undefined) {
            } else {
            console.log(recSucc, recErr, typeof recSucc != undefined);
            }
        }
    }
    if (_recordtype === "CNAME") {
        var txtname_cname = $('#txtname-cname').val();
        var txtaddress_cname = $('#txtaddress-cname').val();

        if (txtname_cname !== '@' && !/^[*].?[A-z0-9]{0,5}?$/.test(txtname_cname) && !/^[A-z0-9\.\-]{1,63}$/gi.test(txtname_cname)) {

            if (!/^[چجحخهعغفقثصضپگکمنتالبیسشوئدذرزطظ]{1,32}$/gi.test(txtname_cname)){

            $('#txtNameErr-cname').html('<span>عنوان معتبر وارد کنید</span>');
            flag = true;
            validdata = false;
            }
        } else {
            $('#txtNameErr-cname span').html('');
        }
        if(txtname_cname.startsWith('.')  || txtname_cname.includes('.') || txtname_cname.includes('\\') || txtname_cname.includes('^')) {
            $('#txtname-aErr').html('<span>عنوان معتبر وارد کنید</span>');
            validdata = false;
        }
        if (!/^[A-z0-9\.\-]{1,32}$/gi.test(txtaddress_cname) || checkIP('txtaddress-cname')) {
            $('#txtaddressErr').html('<span>دامین را وارد کنید</span>');
            flag = true;
            validdata = false;
        } else {
            $('#txtaddressErr span').html('');
        }

        if (txtname_cname !== '' && txtaddress_cname !== '') {
            if ( recErr != undefined) {
            } else {
            console.log(recSucc, recErr, typeof recSucc != undefined);
            }
        }
    }
    if (_recordtype === "ANAME") {
        var txtname_name = $('#txtname').val();
        var txtdname_aname = $('#txt-dname-aname').val();

        if (txtname_name !== '@' /* && !/^[*].?[A-z0-9]{0,5}?$/.test(txtname_name) */ && !/^[A-z0-9\.\-]{1,63}$/gi.test(txtname_name)) {

            if (!/^[چجحخهعغفقثصضپگکمنتالبیسشوئدذرزطظ]{1,32}$/gi.test(txtname_name)){

            $('#txtNameErr-aname').html('<span>عنوان معتبر وارد کنید</span>');
            flag = true;
            validdata = false;
            }
        } else {
            $('#txtNameErr-aname span').html('');
        }

        if (txtdname_aname === '') {
            $('#txtDnameErr-aname').html('<span>آدرس را وارد کنید</span>');
            flag = true;
            validdata = false;
        } else {
            $('#txtDnameErr-aname span').html('');
        }

        if (typeof recSucc != undefined && txtname_name !== '' && txtdname_aname !== '') {
            if ( recErr != undefined) {
            } else {
            console.log(recSucc, recErr, typeof recSucc != undefined);
            }
        }
    }
    if (_recordtype === "AAAA") {
        var txt_name_aaaa = $('#txt-name-aaaa').val();
        var txt_ip_aaaa = $('#txt-ip-aaaa').val();

                if (txt_name_aaaa !== '@' /* && !/^[*].?[A-z0-9]{0,5}?$/.test(txtname_a) */ && !/^[A-z0-9\.]{1,63}$/gi.test(txt_name_aaaa)) {
                    if (!/^[چجحخهعغفقثصضپگکمنتالبیسشوئدذرزطظ]{1,32}$/gi.test(txt_name_aaaa)){
                $('#txtname-aaaaErr').html('<span>عنوان معتبر وارد کنید</span>');
                flag = true;
                validdata = false;
            }
        } else {
            $('#txtname-aaaaErr span').html('');
        }
        if(txt_name_aaaa.startsWith('.')  || txt_name_aaaa.includes('..') || txt_name_aaaa.includes('\\') || txt_name_aaaa.includes('^')) {
            $('#txtname-aErr').html('<span>عنوان معتبر وارد کنید</span>');
            validdata = false;
        }
            // txt_ip_aaaa = txt_ip_aaaa.replace('::', ":0:0:0:");
            // if (!/((^s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))s*$)|(^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s*$))/gi.test(txt_ip_aaaa)) {
         
            //     $('#txtip-aaaaErr').html('<span>IPv6 را وارد کنید</span>');
            //     flag = true;
            //     validdata = false;
            // } else {
            //     $('#txtip-aaaaErr span').html('');
            // }
        if (flag) return;
        if (typeof recSucc != undefined && txt_name_aaaa !== '' && txt_ip_aaaa !== '') {
            if ( recErr != undefined) {
            } else {
            console.log(recSucc, recErr, typeof recSucc != undefined);
            }
        }
    }
    if (_recordtype === "NS") {
        var txtname_name_ns = $('#txt-name-ns').val();
        var txtdname_nameserver = $('#txt-nameserver-ns').val();

                if (txtname_name_ns !== '@' /* && !/^[*].?[A-z0-9]{0,5}?$/.test(txtname_name_ns) */ && !/^[A-z0-9\-_]{1,63}$/gi.test(txtname_name_ns)) {
                    if (!/^[چجحخهعغفقثصضپگکمنتالبیسشوئدذرزطظ@]{1,32}$/gi.test(txtname_name_ns)){
            $('#txtNameErr-ns').html('<span>عنوان معتبر وارد کنید</span>');
            flag = true;
            validdata = false;
            }
        } else {
            $('#txtNameErr-ns span').html('');
        }
        if(txtname_name_ns.startsWith('.')  || txtname_name_ns.includes('..') || txtname_name_ns.includes('\\') || txtname_name_ns.includes('^')) {
            $('#txtname-aErr').html('<span>عنوان معتبر وارد کنید</span>');
            validdata = false;
        }

        if (!/^[A-z0-9\.\-]{1,32}$/gi.test(txtdname_nameserver)) {
            $('#txtNameServerErr-ns').html('<span>نام سرور را وارد کنید</span>');
            flag = true;
            validdata = false;
        } else {
            $('#txtNameServerErr-ns span').html('');
        }

        if (txtname_name_ns !== '' && txtdname_nameserver !== '') {
            if ( recErr != undefined) {
            } else {
            console.log(recSucc, recErr, typeof recSucc != undefined);
            }
        }

    }
    if (_recordtype === "MX") {
        var txtname_mx = $('#txt-name-mx').val();
        var txt_mailserver_mx = $('#txt-mailserver-mx').val();
        var txtpr_mx = $('#txt-pr-mx').val();

        if (txtname_mx !== '@' && /* !/^[*].?[A-z0-9]{0,5}?$/.test(txtname_mx) && */ !/^[A-z0-9_\.\-]{1,63}$/gi.test(txtname_mx)) {
            if (!/^[چجحخهعغفقثصضپگکمنتالبیسشوئدذرزطظ]{1,32}$/gi.test(txtname_mx)){
            $('#txtNameErr-mx').html('<span>عنوان معتبر وارد کنید</span>');
            flag = true;
            validdata = false;
            }
        } else {
            $('#txtNameErr-mx span').html('');
        }
        if(txtname_mx.startsWith('.')  || txtname_mx.includes('..') || txtname_mx.includes('\\') || txtname_mx.includes('^')) {
            $('#txtname-aErr').html('<span>عنوان معتبر وارد کنید</span>');
            validdata = false;
        }

        if (!/^[A-z0-9\.:\-]{1,40}$/gi.test(txt_mailserver_mx)) {
            $('#txtMailserverErr-mx').html('<span> Mail server را وارد کنید</span>');
            flag = true;
            validdata = false;
        } else {
            $('#txtMailserverErr-mx span').html('');
        }

        if (parseInt(txtpr_mx) < 0 || parseInt(txtpr_mx) > 65535) {
            $('#txtprErr-mx').html('<span>Priority را وارد کنید</span>');
            flag = true;
            validdata = false;
        } else {
            $('#txtprErr-mx span').html('');
        }

        if (typeof recSucc != undefined && txtname_mx !== '' && txt_mailserver_mx !== '' && txtpr_mx != '') {
                    if ( recErr != undefined) {
                    } else {
                    console.log(recSucc, recErr, typeof recSucc != undefined);
                    }
        }
    }
    if (_recordtype === "SRV") {
        var txt_title_srv = $('#txt-title-srv').val();
        var txt_name_srv = $('#txt-name-srv').val();
        var txt_weight_srv = $('#txt-weight-srv').val();
        var txt_priority_srv = $('#txt-priority-srv').val();
        var txt_target_srv = $('#txt-target-srv').val();
        var txt_port_srv = $('#txt-port-srv').val();

            if (txt_title_srv !== '@' /* && !/^[*].?[A-z0-9]{0,5}?$/.test(txt_title_srv) */ && !/^[A-z0-9\-_\.]{1,63}$/gi.test(txt_title_srv)) {
                if (!/^[چجحخهعغفقثصضپگکمنتالبیسشوئدذرزطظ]{1,32}$/gi.test(txt_title_srv)){
            $('#txtTitleErr-srv').html('<span> عنوان معتبر وارد کنید</span>');
            flag = true;
            validdata = false;
            }
        } else {
            $('#txtTitleErr-srv span').html('');
        }
        if(txt_title_srv.startsWith('.')  || txt_title_srv.includes('..') || txt_title_srv.includes('\\') || txt_title_srv.includes('^')) {
            $('#txtname-aErr').html('<span>عنوان معتبر وارد کنید</span>');
            validdata = false;
        }

        if (!/^[A-z_\.]{1,32}$/gi.test(txt_name_srv)) {
            $('#txtNameErr-srv').html('<span> نام سرویس را وارد کنید</span>');
            flag = true;
            validdata = false;
        } else {
            $('#txtNameErr-srv span').html('');
        }

        if (parseInt(txt_weight_srv) < 1 || parseInt(txt_weight_srv) > 65535) {
            $('#txtWeightErr-srv').html('<span> Weight را وارد کنید</span>');
            flag = true;
            validdata = false;
        } else {
            $('#txtWeightErr-srv span').html('');
        }

        if (parseInt(txt_priority_srv) < 0 || parseInt(txt_priority_srv) > 65535) {
            $('#txtPriorityErr-srv').html('<span> Priority را وارد کنید</span>');
            flag = true;
            validdata = false;
        } else {
            $('#txtPriorityErr-srv span').html('');
        }

        if (!/^[A-z0-9\.\-]{1,32}$/gi.test(txt_target_srv)) {
            $('#txtTargetErr-srv').html('<span>Target را وارد کنید</span>');
            flag = true;
            validdata = false;
        } else {
            $('#txtTargetErr-srv span').html('');
        }

        if (parseInt(txt_port_srv) < 0 || parseInt(txt_port_srv) > 65535) {
            $('#txtPortErr-srv').html('<span>پورت را وارد کنید</span>');
            flag = true;
            validdata = false;
        } else {
            $('#txtPortErr-srv span').html('');
        }

        if ($('#dp-protocol-srv .current-item').data('value') == undefined) {
            $('#txtProtocolErr-srv').html('<span>Protocol را انتخاب کنید</span>');
            flag = true;
            validdata = false;
        } else {
            $('#txtProtocolErr-srv span').html('');
        }


        if (typeof recSucc != undefined && txt_port_srv !== '' && txt_target_srv !== '' && txt_priority_srv != '' && txt_weight_srv != '' && txt_name_srv != '' &&
            txt_title_srv != '' &&
            $('#dp-protocol-srv .current-item').data('value') !== undefined) {

                if ( recErr != undefined) {
                } else {
                console.log(recSucc, recErr, typeof recSucc != undefined);
                }
        }
    }
    if (_recordtype === "PTR") {
        var txt_name_ptr = $('#txt-name-ptr').val();
        var txtdname_ptr = $('#txtdmoainname-ptr').val();

                if (txt_name_ptr !== '@' /* && !/^[*].?[A-z0-9]{0,5}?$/.test(txt_name_ptr) */ && !/^[A-z0-9\.\-_]{1,63}$/gi.test(txt_name_ptr)) {
                    if (!/^[چجحخهعغفقثصضپگکمنتالبیسشوئدذرزطظ]{1,32}$/gi.test(txt_name_ptr)){
            $('#txtnameErr-ptr').html('<span>نام را وارد کنید</span>');
            flag = true;
            validdata = false;
            }
        } else {
            $('#txtnameErr-ptr span').html('');
        }
        if(txt_name_ptr.startsWith('.')  || txt_name_ptr.includes('..') || txt_name_ptr.includes('\\') || txt_name_ptr.includes('^')) {
            $('#txtname-aErr').html('<span>عنوان معتبر وارد کنید</span>');
            validdata = false;
        }
        if (!/^[A-z0-9\.\-]{1,32}$/gi.test(txtdname_ptr)) {
            $('#txtdDnErr-ptr').html('<span>نام دامنه را وارد کنید</span>');
            flag = true;
            validdata = false;
        } else {
            $('#txtdDnErr-ptr span').html('');
        }

        if (typeof recSucc != undefined && txt_name_ptr !== '' && txtdname_ptr !== '') {

            if ( recErr != undefined) {
            } else {
            console.log(recSucc, recErr, typeof recSucc != undefined);
            }
        }
    }
    if ( flag ) return;
    const action = _recordtype;
    let showMe;
    if      (action === "A")     showMe = (async() => {
        const ride = await aRecord("update");
        return ride;
    })();
    else if (action === "AAAA")  showMe = await aaaaRecord("update");
    else if (action === "CNAME") showMe = await cNameRecord("update");
    else if (action === "ANAME") showMe = await aNameRecord("update");
    else if (action === "MX")    showMe = await mxRecord("update");
    else if (action === "SRV")   showMe = await srvRecord("update");
    else if (action === "TXT")   showMe = await txtRecord("update");
    else if (action === "NS")    showMe = await nsRecord("update");
    else if (action === "PTR")   showMe = await ptrRecord("update");
    ttl_ttl = parseInt(ttl_ttl);
    const id = showMe.id;
    console.log(showMe);
    const recordname = $domain;
    let ttl = "اتوماتیک";
    if (ttl_ttl > 0) {
        ttl = (ttl_ttl / 60) + "دقیقه";
    }
    console.log('stepe 555');
}

async function AddDnsRecordRow() {
    const action = document.querySelector("#Optionsrecord .SelectedItem").getAttribute("data-value");
    let showMe;
    if      (action === "A")     showMe = await aRecord("add");
    else if (action === "AAAA")  showMe = await aaaaRecord("add");
    else if (action === "CNAME") showMe = await cNameRecord("add");
    else if (action === "ANAME") showMe = await aNameRecord("add");
    else if (action === "MX")    showMe = await mxRecord("add");
    else if (action === "SRV")   showMe = await srvRecord("add");
    else if (action === "TXT")   showMe = await txtRecord("add");
    else if (action === "NS")    showMe = await nsRecord("add");
    else if (action === "PTR")   showMe = await ptrRecord("add");
    console.log(showMe);
    console.log(showMe);
    console.log(showMe);
    console.log(showMe);
    console.log(showMe);
    console.log(showMe);
    if (showMe.status == "error") return;
    ttl_ttl = parseInt(ttl_ttl);
    const id = showMe.id;
    let myData = showMe.msh;
    myData.host = myData.host.toLowerCase();
    let recordname = tit_tit.toLowerCase();
    let ttl = "اتوماتیک";
    console.log("cluster is ", showMe);

    if (ttl_ttl == '0') {
        ttl = 'اتوماتیک';
    } else {
        if ( ttl_ttl < 3600 ) {
           ttl = ttl_ttl / 60;
           ttl += " دقیقه" ;
        } else {
           ttl = ttl_ttl / 3600;
           ttl += " ساعت" ;
        }
    }

    const recordtype = rt_rt;
    let cdnstatus = "";
    if ( clououd == 0 ) {
        cdnstatus = '"/general/images/new/ico_inactive_features.svg" cdn="true"';
    } else if ( clououd == 1 ) {
        cdnstatus = '"/general/images/new/ico_active_features.svg" cdn="true"';
    } else if ( clououd == 2 ) {
        cdnstatus = '"/general/images/new/ico_inactive_features.svg" class="cloud-disabled" cdn="false"';
    } else {
        cdnstatus = '"/general/images/new/ico_inactive_features.svg" cdn="false"';
    }
    const recordcontent = rc_rc;
    console.log(recordname);
    if(recordname !== $domain && recordname.includes('.')) {
        recordname = recordname.substr(-1) === "." ? recordname.substr(0, recordname.length - 1) : recordname;
           if(recordname !== $domain) {
              recordname = recordname.substr(-$domain.length) === $domain ? recordname.substr(0, recordname.length - $domain.length ): recordname;
              recordname = recordname.substr(-1) === "." ? recordname.substr(0, recordname.length - 1): recordname;
           }
    }
    if(recordname === "@") recordname = $domain;

    var hiddeninputs = '';
    if ( clououd == 1 ) {
        hiddeninputs += '<input type="hidden" id="hidden-cloud-status-'+id+'" value="1"></input>';
        if ( document.getElementById('protocol-port-a').classList.contains('d-none') ) {
            console.log('ports and protocols edition1');
        } else {
            console.log('ports and protocols edition');
            let portval = document.getElementById("txtport-a").value;
            let protocolStatus = $('#showptla .current-item').text();
            hiddeninputs += '<input type="hidden" id="hidden-port-status-'+id+'" value="'+portval+'">';
            hiddeninputs += '<input type="hidden" id="hidden-protocol-status-'+id+'" value="'+protocolStatus+'">';
        }
    } else {
        hiddeninputs += '<input type="hidden" id="hidden-cloud-status-'+id+'" value="0"></input>';
    }
    if (showMe.cluster != '') {
        hiddeninputs += '<input type="hidden" id="hidden-record-cluster-'+id+'" value="balance"></input>';
        cdnstatus = '"/general/images/new/ico_inactive_features.svg" class="cloud-disabled" cdn="false"';
    } else {
        hiddeninputs += '<input type="hidden" id="hidden-record-cluster-'+id+'" value="nobalance"></input>';
    }

    hiddeninputs += `<input type="hidden" id="hidden-record-type-${id}" value="${recordtype}"></input>`;
    hiddeninputs += `<input type="hidden" id="hidden-record-name-${id}" value="${recordname}"></input>`;
    hiddeninputs += `<input type="hidden" id="hidden-record-ip-${id}" value="${recordcontent}"></input>`;
    hiddeninputs += `<input type="hidden" id="hidden-record-ttl-${id}" value="${ttl}"></input>`;


    
    var otherspan = '';
    if ( recordtype == "MX" || recordtype == "SRV" ) {
        
        if ( recordtype == "MX" ) {
            otherspan += 
            `
            <span class="btn btn-blue-100 border-0 rounded-pill fs-13 fw-400 record-other-wrap">
                <span>${myData['priority']}</span><span class="fs-20 line-h-1 dots m-0"></span>
                <input type="hidden" id="hidden-record-priority-${id}" value="${myData['priority']}">
            </span>
            `;
            hiddeninputs += `<input type="hidden" id="hidden-record-priority-${id}" value="${myData['priority']}"></input>`;
        } else if ( recordtype == "SRV" ) {
            otherspan += 
            `
            <span class="btn btn-blue-100 border-0 rounded-pill fs-13 fw-400 record-other-wrap">
                <span>${myData['port']}</span>-<span>${myData['weight']}</span>-<span>${myData['priority']}</span>-<span class="fs-20 line-h-1 dots">...</span>
                <input type="hidden" id="hidden-record-protocol-${id}" value="${myData['protocol']}">
                <input type="hidden" id="hidden-record-priority-${id}" value="${myData['priority']}">
                <input type="hidden" id="hidden-record-port-${id}" value="${myData['port']}">
                <input type="hidden" id="hidden-record-weight-${id}" value="${myData['weight']}">
            </span>
            `;
            hiddeninputs += `<input type="hidden" id="hidden-record-priority-${id}" value="${myData['priority']}"></input>`;
            hiddeninputs += `<input type="hidden" id="hidden-record-protocol-${id}" value="${myData['protocol']}"></input>`;
            hiddeninputs += `<input type="hidden" id="hidden-record-port-${id}" value="${myData['port']}"></input>`;
            hiddeninputs += `<input type="hidden" id="hidden-record-weight-${id}" value="${myData['weight']}"></input>`;
            hiddeninputs += `<input type="hidden" id="hidden-record-service-${id}" value="${myData['service']}"></input>`;
        }
        
    } else {

    }

    const coppier = ``;
    //     <span data-bs-toggle="tooltip" data-bs-placement="top" 
    //         title="کپی در حافظه" 
    //         data-bs-original-title="کپی در حافظه" 
    //         class="img-ico-wrap" 
    //         onclick="CopyDiv('record_name-${id}')">
    //         <img src="/general/images/new/ico_copy.svg" class="img-ico-copy">
    //     </span>
    // `;

    
    var output = '<div class="accordion-item DnsrecordList" id="DnsrecordList-' + id + '">';
    output += '<button class="text-center accordion-button w-100 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#active-flush-collapseOne" aria-expanded="false" aria-controls="active-flush-collapseOne" >';
    output += '<div id="cloud_status-'+id+'" class="col-1 fs-13 fw-400"><img onclick="ChangeCloudStatus('+id+', this)" src='+cdnstatus+'>';
    output += '</div><div id="record_type-' + id + '" class="col-1 fs-13 fw-400">' + recordtype + '</div><div  id="record_name-' + id + '" class="col-2 fs-13 fw-400 text-lowercase">';
    output += recordname + coppier + '</div><div id="record_content-' + id + '" class="col-3 fs-13 fw-400">' + recordcontent + '</div>';
    output += '<div id="record_ttl-' + id + '" class="rtl col-1 fs-13 fw-400">' + ttl + '</div><div id="record_other-' + id + '" class="col-3 fs-13 fw-400">' +otherspan+ '</div>';
    output += '<div id="record_operation" class="col-1 fs-13 fw-400 text-left position-relative"><ul class="d-flex justify-content-center align-items-center list-unstyled mb-0 fnlist p-0">'+showMe.cluster+'<li onclick="editRec(\''+$domain+'\',\''+$did+'\',\''+id+'\')"><span><img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="ویرایش" src="/general/images/new/ico_manage.svg" /></span><span class="fnlist-title">ویرایش</span></li>';
    output += '<li onclick="deletensRecord(\''+$domain+'\', \'DnsrecordList-'+id+'\',\''+id+'\');"><span><img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="حذف" src="/general/images/new/ico_delete.svg" /></span><span class="fnlist-title">حذف</span></li>';
    output += '</ul><span class="fnlist-options"><img src="/general/images/root/topMenu/ico_dotted_ico.svg"></span></div></button></div>';
    output += hiddeninputs;

    $("#ActiveDnsRecordPanel").prepend(output);
    document.querySelectorAll('img[class="cloud-disabled"]')?.forEach(el => el.removeAttribute('onclick'));
    console.log(output);
    $("#editrecord").modal("hide");

    // $(".accordion-item").on('click', '.fnlist-options',function(e) {
    //     e.stopPropagation();
    //     var all = $('.fnlist');
    //     // all.removeClass("active");
    //     if (all.hasClass("active")) {
    //     all.removeClass("active")
    //     // console.log(1111)
    //     } else {
    //     all.removeClass("active")
    //     $(this).parent().find('.fnlist').addClass('active');
    //     }

    // });
}
async function UpdateNsRecord(){
    var ns1=$('#newns1').val();
    var ns2=$('#newns2').val();
    if(ns1=="" || ns2==""){
        showAlert('error', 'وارد کردن نیم سرور ها الزامی است');
        return;
    }


    let mData = new FormData();
    $('#addDedicatedNsRecord').html('<img src="/general/loading/tail-spin.svg" />');
    $('#addDedicatedNsRecord').attr('disabled', 'disabled');
    mData.append("ns1", ns1);
    mData.append("ns2", ns2);
    mData.append("domainid",   $did);
    const answer = await fetch("/submit/ns/dedicated", { method: "POST", body: mData })
        .then((response) => response.json())
        .then((json) => (result = json)).catch(ex => window.location.reload());;

    if ( answer.status == "success" ) {
        showAlert('success', answer.message );
        $(".ns1").html(ns1)
        $(".ns2").html(ns2)
        $("#editNsModal").modal("hide")
    } else {
        showAlert('err', answer.message );
    }
    $('#addDedicatedNsRecord').html('ویرایش');
    $('#addDedicatedNsRecord').attr('disabled', false);
   





}
async function AddDNSRecord() {
 
    if ($('#showrecordtype .current-item').data('value') == undefined) {
        $('#txtRecordErr').html('<span>نوع رکورد را انتخاب کنید</span>');
    } else {
        $('#txtRecordErr span').html('');
        
        if ($('#showrecordtype .current-item').attr('data-value') === "A") {

            var validdata = true;
            var txtname_a = $('#txtname-a').val();
            var txtip_a = $('#txtip-a').val();

            if (txtname_a !== '@' /* && !/^[*].?[A-z0-9]{0,5}?$/.test(txtname_a) */ && !/^[A-z0-9\.\-]{1,63}$/gi.test(txtname_a)) {
                if (!/^[چجحخهعغفقثصضپگکمنتالبیسشوئدذرزطظ*]{1,32}$/gi.test(txtname_a)){
               
                    $('#txtname-aErr').html('<span>عنوان معتبر وارد کنید</span>');
                    validdata = false;
                }
            } else {
                $('#txtname-aErr').html('');
                console.log("hameja")
            }
            if(txtname_a.startsWith('.')  || txtname_a.includes('..') || txtname_a.includes('\\') || txtname_a.includes('^')) {
                $('#txtname-aErr').html('<span>عنوان معتبر وارد کنید</span>');
                validdata = false;
            }


            if (txtip_a.includes('/') || !checkIP('txtip-a')) {
                $('#txtip-aErr').html('<span>IPv4 را وارد کنید</span>');
                validdata = false;
            } else {
                $('#txtip-aErr').html('');
            }
            
            if ($('#geostatus').is(':checked')) {

                $(".geoip").each(function () {
                    if ($(this).parent().parent().parent().hasClass("d-none")) {
                    } else {
                        if ($(this).parent().parent().hasClass("d-none")) {
                        } else {
                            if ($(this).val() == "") {
                                $(this).next(".errorIp").html("<span>IPv4 را وارد کنید</span>")
                                validdata = false;
                            } else {
                                $(this).next(".errorIp").find('span').html('');
                            }
                        }
                    }
                });
                $('.geoWeight').each(function () {
                    if ($(this).parent().parent().parent().hasClass("d-none")) {
                    } else {
                        if ($(this).parent().parent().hasClass("d-none")) {
                        } else {
                            if ($(this).val() == "") {
                                $(this).next(".errorWeight").html("<span>وزن را وارد کنید</span>");
                                validdata = false;
                            } else {
                                $(this).next(".errorWeight").find('span').html('');
                            }
                        }
                    }
                });
                $('.geo-country .select-wrap').each(function () {
                    if ($(this).parent().parent().parent().hasClass("d-none")) {
                    } else {
                        if ($(this).parent().parent().hasClass("d-none")) {
                        } else {
                            if ($(this).find('.current-item').data('value') == undefined) {
                                $(this).next(".errorCountry").html('<span>کشور را انتخاب کنید</span>');
                                validdata = false;
                            } else {
                                $(this).next(".errorCountry").find('span').html('');
                            }
                        }
                    }
                });

            }
            if(document.getElementById('proxystatus-a').checked) {
                if(document.querySelector('#showptla span').getAttribute('data-value').toLowerCase() !== "automatic" &&
                document.querySelector('#showptla span').getAttribute('data-value').toLowerCase() != "undefined") {
                    if( domValue('txtport-a') == '' ||
                        !parseInt(domValue('txtport-a')) || 
                        parseInt(domValue('txtport-a')) > 65535 || 
                        parseInt(domValue('txtport-a')) < 0 ) {
                        //  flag = true;
                        validdata = false;  
                        document.getElementById('txtport-aErr').innerHTML = 'پورت نامعتبر';
                    }
                }else{
                    document.getElementById('txtport-aErr').innerHTML = '';
                }
            }
            console.log(validdata);
            if (!validdata) {
                console.log("validation is false");
                return;
            } else {
                await AddDnsRecordRow();
                if ( typeof recSucc != undefined && txtname_a !== '' && txtip_a !== '') {
                    if ( recErr != undefined) {
                        return;
                    } else {
                        console.log(recSucc, recErr, typeof recSucc != undefined);
                        $("#editrecord").modal("hide");
                    }
                }
            }
        }


        else if ($('#showrecordtype .current-item').attr('data-value') === "TXT") {
            var txt_name_txt = $('#txt-name-txt').val();
            var txt_text_txt = $('#txt-text-txt').val();
            var validdata = true;
            if (txt_name_txt !== '@' && /* !/^[*].?[A-z0-9]{0,5}?$/.test(txt_name_txt) && */ !/^[A-z0-9\.\-_]{1,63}$/gi.test(txt_name_txt)) {
                $('#txtNameTxtErr').html('<span>عنوان معتبر وارد کنید</span>');
                validdata = false;
            } else {
                $('#txtNameTxtErr span').html('');
            }
            if(txt_name_txt.startsWith('.')  || txt_name_txt.includes('..') || txt_name_txt.includes('\\') || txt_name_txt.includes('^')) {
                $('#txtname-aErr').html('<span>عنوان معتبر وارد کنید</span>');
                validdata = false;
            }
            if (txt_text_txt === '') {
                $('#txtTextErr').html('<span>متن را وارد کنید</span>');
                validdata = false;
            } else {
                $('#txtTextErr span').html('');
            }

            if ( !validdata ) {
                console.log("validation is false");
                return;
            } else {
                await AddDnsRecordRow();
                if (typeof recSucc != undefined && txt_name_txt !== '' && txt_text_txt !== '') {
                    if ( recErr != undefined ) {
                        return;
                    } else {
                        $("#editrecord").modal("hide");
                    }
                }
            }
        }


        else if ($('#showrecordtype .current-item').attr('data-value') === "CNAME") { // TODO:
            var txtname_cname = $('#txtname-cname').val();
            var txtaddress_cname = $('#txtaddress-cname').val();
            var validdata = true;

            if (txtname_cname !== '@' /* && !/^[*].?[A-z0-9]{0,5}?$/.test(txtname_cname) */ && !/^[A-z0-9\.\-]{1,63}$/gi.test(txtname_cname)) {
                if (!/^[چجحخهعغفقثصضپگکمنتالبیسشوئدذرزطظ]{1,32}$/gi.test(txtname_cname)){
                    $('#txtNameErr-cname').html('<span>عنوان معتبر وارد کنید</span>');
                    validdata = false;
                }
            } else {
                $('#txtNameErr-cname span').html('');
            }
            if(txtname_cname.startsWith('.') || txtname_cname.includes('\\') || txtname_cname.includes('^')) {
                $('#txtNameErr-cname').html('<span>عنوان معتبر وارد کنید</span>');
                validdata = false;
            }

            if (!/^[A-z0-9\.\-]{1,32}$/gi.test(txtaddress_cname) || checkIP('txtaddress-cname')) {
                $('#txtaddressErr').html('<span>دامین را وارد کنید</span>');
                validdata = false;
            } else {
                $('#txtaddressErr span').html('');
            }

            if ( validdata == false ) {
                console.log("validation is false");
                return;
            } else {
                await AddDnsRecordRow();
                if (typeof recSucc != undefined && txtname_cname !== '' && txtaddress_cname !== '') {
                    if ( recErr != undefined) {
                        return;
                    } else {
                        $("#editrecord").modal("hide");
                        recSucc = undefined;
                    }
                }
            }
            
        }


        else if ($('#showrecordtype .current-item').attr('data-value') === "ANAME") {
            var txtname_name = $('#txtname').val();
            var txtdname_aname = $('#txt-dname-aname').val();
            var validdata = true;

                if (txtname_name !== '@' /* && !/^[*].?[A-z0-9]{0,5}?$/.test(txtname_name) */ && !/^[A-z0-9\.\-]{1,63}$/gi.test(txtname_name)) {
                    if (!/^[چجحخهعغفقثصضپگکمنتالبیسشوئدذرزطظ]{1,32}$/gi.test(txtname_name)){
                $('#txtNameErr-aname').html('<span>عنوان معتبر وارد کنید</span>');
                validdata = false;
                    }
            } else {
                $('#txtNameErr-aname span').html('');
            }
            if(txtname_name.startsWith('.')  || txtname_name.endsWith('\\') || txtname_name.endsWith('^')) {
                $('#txtname-aErr').html('<span>عنوان معتبر وارد کنید</span>');
                validdata = false;
            }
            if (txtdname_aname === '') {
                $('#txtDnameErr-aname').html('<span>آدرس را وارد کنید</span>');
                validdata = false;
            } else {
                $('#txtDnameErr-aname span').html('');
            }

            if ( validdata == false ) {
                console.log("validation is false");
                return;
            } else {
                await AddDnsRecordRow();
                if ((typeof recSucc != undefined) && txtname_name !== '' && txtdname_aname !== '') {
                    if ( recErr != undefined) {
                        return;
                    } else {
                        $("#editrecord").modal("hide");
                        recSucc = undefined;
                    } 
                }
            }
        }


        else if ($('#showrecordtype .current-item').attr('data-value') === "AAAA") {
            var txt_name_aaaa = $('#txt-name-aaaa').val();
            var txt_ip_aaaa = $('#txt-ip-aaaa').val();
            var validdata = true;

                if (txt_name_aaaa !== '@' /* && !/^[*].?[A-z0-9]{0,5}?$/.test(txtname_a) */ && !/^[A-z0-9\.]{1,63}$/gi.test(txt_name_aaaa)) {
                    if (!/^[چجحخهعغفقثصضپگکمنتالبیسشوئدذرزطظ]{1,32}$/gi.test(txt_name_aaaa)){
                $('#txtname-aaaaErr').html('<span>عنوان معتبر وارد کنید</span>');
                validdata = false;
                    }
            } else {
                $('#txtname-aaaaErr span').html('');
            }
            if(txt_name_aaaa.startsWith('.')  || txt_name_aaaa.includes('..') || txt_name_aaaa.includes('\\') || txt_name_aaaa.includes('^')) {
                $('#txtname-aErr').html('<span>عنوان معتبر وارد کنید</span>');
                validdata = false;
            }
            // if (!/^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/gi.test(txt_ip_aaaa)) {
            // txt_ip_aaaa = txt_ip_aaaa.replace('::', ":0:0:0:");
            if (false) {
                $('#txtip-aaaaErr').html('<span>IPv6 را وارد کنید</span>');
                validdata = false;
            } else {
                $('#txtip-aaaaErr span').html('');
            }
            
            if ( validdata == false ) {
                console.log("validation is false");
                return;
            } else {
                await AddDnsRecordRow();
                if (typeof recSucc != undefined && txt_name_aaaa !== '' && txt_ip_aaaa !== '') {
                    if ( recErr != undefined) {
                        return;
                    } else {
                        $("#editrecord").modal("hide");
                        recSucc = undefined;
                    } 
                }
            }
        }


        else if ($('#showrecordtype .current-item').attr('data-value') === "NS") {
            var txtname_name_ns = $('#txt-name-ns').val();
            var txtdname_nameserver = $('#txt-nameserver-ns').val();
            var validdata = true;

                if (txtname_name_ns !== '@' /* && !/^[*].?[A-z0-9]{0,5}?$/.test(txtname_name_ns) */ && !/^[A-z0-9\-_]{1,63}$/gi.test(txtname_name_ns)) {
                    if (!/^[چجحخهعغفقثصضپگکمنتالبیسشوئدذرزطظ@]{1,32}$/gi.test(txtname_name_ns)){
                        $('#txtNameErr-ns').html('<span>عنوان معتبر وارد کنید</span>');
                        validdata = false;
                    }
            } else {
                $('#txtNameErr-ns span').html('');
            }
            if(txtname_name_ns.startsWith('.')  || txtname_name_ns.includes('..') || txtname_name_ns.includes('\\') || txtname_name_ns.includes('^')) {
                $('#txtname-aErr').html('<span>عنوان معتبر وارد کنید</span>');
                validdata = false;
            }
            if (!/^[A-z0-9\.\-]{1,32}$/gi.test(txtdname_nameserver)) {
                $('#txtNameServerErr-ns').html('<span>نام سرور را وارد کنید</span>');
                validdata = false;
            } else {
                $('#txtNameServerErr-ns span').html('');
            }
            
            if ( validdata == false ) {
                console.log("validation is false");
                return;
            } else {
                await AddDnsRecordRow();
                if (typeof recSucc != undefined && txtname_name_ns !== '' && txtdname_nameserver !== '') {
                    if ( recErr != undefined) {
                        return;
                    } else{
                        $("#editrecord").modal("hide");
                        recSucc = undefined;
                    }
                }
            }
        }


        else if ($('#showrecordtype .current-item').attr('data-value') === "MX") {
            var txtname_mx = $('#txt-name-mx').val();
            var txt_mailserver_mx = $('#txt-mailserver-mx').val();
            var txtpr_mx = $('#txt-pr-mx').val();
            var validdata = true;
                if (txtname_mx !== '@' && /* !/^[*].?[A-z0-9]{0,5}?$/.test(txtname_mx) && */ !/^[A-z0-9_\.\-]{1,63}$/gi.test(txtname_mx)) {
                    if (!/^[چجحخهعغفقثصضپگکمنتالبیسشوئدذرزطظ]{1,32}$/gi.test(txtname_mx)){
                        $('#txtNameErr-mx').html('<span>عنوان معتبر وارد کنید</span>');
                        validdata = false;
                    }
            } else {
                $('#txtNameErr-mx span').html('');
            }
            if(txtname_mx.startsWith('.')  || txtname_mx.includes('..') || txtname_mx.includes('\\') || txtname_mx.includes('^')) {
                $('#txtname-aErr').html('<span>عنوان معتبر وارد کنید</span>');
                validdata = false;
            }
            if (!/^[A-z0-9\.:\-]{1,40}$/gi.test(txt_mailserver_mx)) {
                $('#txtMailserverErr-mx').html('<span> Mail server را وارد کنید</span>');
                validdata = false;
            } else {
                $('#txtMailserverErr-mx span').html('');
            }

            if (parseInt(txtpr_mx) < 0 || parseInt(txtpr_mx) > 65535) {
                $('#txtprErr-mx').html('<span>Priority را وارد کنید</span>');
                validdata = false;
            } else {
                $('#txtprErr-mx span').html('');
            }

            if ( validdata == false ) {
                console.log("validation is false");
                return;
            } else {
                await AddDnsRecordRow();
                if (typeof recSucc != undefined && txtname_mx !== '' && txt_mailserver_mx !== '' && txtpr_mx != '') {
                    if (typeof recErr != undefined) {
                        return;
                    } else{
                    $("#editrecord").modal("hide");
                    recSucc = undefined;
                    }
                }
            }
        }


        else if ($('#showrecordtype .current-item').attr('data-value') === "SRV") {
            var txt_title_srv = $('#txt-title-srv').val();
            var txt_name_srv = $('#txt-name-srv').val();
            var txt_weight_srv = $('#txt-weight-srv').val();
            var txt_priority_srv = $('#txt-priority-srv').val();
            var txt_target_srv = $('#txt-target-srv').val();
            var txt_port_srv = $('#txt-port-srv').val();
            var validdata = true;

            if (txt_title_srv !== '@' /* && !/^[*].?[A-z0-9]{0,5}?$/.test(txt_title_srv) */ && !/^[A-z0-9\-_\.]{1,63}$/gi.test(txt_title_srv)) {
                if (!/^[چجحخهعغفقثصضپگکمنتالبیسشوئدذرزطظ]{1,32}$/gi.test(txt_title_srv)){
                    $('#txtTitleErr-srv').html('<span> عنوان معتبر وارد کنید</span>');
                    validdata = false;
                }
            } else {
                $('#txtTitleErr-srv span').html('');
            }
            if( /* txt_title_srv.startsWith('.') || txt_title_srv.includes('..') || */  txt_title_srv.includes('\\') || txt_title_srv.includes('^')) {
                $('#txtname-aErr').html('<span>عنوان معتبر وارد کنید</span>');
                validdata = false;

            }
            if (!/^[A-z_\-\.]{1,32}$/gi.test(txt_name_srv)) {
                $('#txtNameErr-srv').html('<span> نام سرویس را وارد کنید</span>');
                validdata = false;

            } else {
                $('#txtNameErr-srv span').html('');
            }

            if (parseInt(txt_weight_srv) < 1 || parseInt(txt_weight_srv) > 65535) {
                $('#txtWeightErr-srv').html('<span> Weight را وارد کنید</span>');
                validdata = false;

            } else {
                $('#txtWeightErr-srv span').html('');
            }

            if (parseInt(txt_priority_srv) < 0 || parseInt(txt_priority_srv) > 65535) {
                $('#txtPriorityErr-srv').html('<span> Priority را وارد کنید</span>');
                validdata = false;
            } else {
                $('#txtPriorityErr-srv span').html('');
            }

            if (!/^[A-z0-9\.\-]{1,32}$/gi.test(txt_target_srv)) {
                $('#txtTargetErr-srv').html('<span>Target را وارد کنید</span>');
                validdata = false;
            } else {
                $('#txtTargetErr-srv span').html('');
            }

            if (parseInt(txt_port_srv) < 0 || parseInt(txt_port_srv) > 65535) {
                $('#txtPortErr-srv').html('<span>پورت را وارد کنید</span>');
                validdata = false;
            } else {
                $('#txtPortErr-srv span').html('');
            }

            if ($('#dp-protocol-srv .current-item').data('value') == undefined) {
                $('#txtProtocolErr-srv').html('<span>Protocole را انتخاب کنید</span>');
                validdata = false;
            } else {
                $('#txtProtocolErr-srv span').html('');
            }


            if ( validdata == false ) {
                console.log("validation is false");
                return;
            } else {
                await AddDnsRecordRow();
                if (typeof recSucc != undefined && txt_port_srv !== '' && txt_target_srv !== '' && txt_priority_srv != '' && txt_weight_srv != '' && txt_name_srv != '' &&
                    txt_title_srv != '' &&
                    $('#dp-protocol-srv .current-item').data('value') !== undefined) {
                        if ( recErr != undefined) {
                            return;
                        } else {
                            // showAlert("success", recSucc);
                        }
                }
            }
        }


        else if ($('#showrecordtype .current-item').attr('data-value') === "PTR") {
            var txt_name_ptr = $('#txt-name-ptr').val();
            var txtdname_ptr = $('#txtdmoainname-ptr').val();
            var validdata = true;

                if (txt_name_ptr !== '@' /* && !/^[*].?[A-z0-9]{0,5}?$/.test(txt_name_ptr) */ && !/^[A-z0-9\.\-_]{1,63}$/gi.test(txt_name_ptr)) {
                    if (!/^[چجحخهعغفقثصضپگکمنتالبیسشوئدذرزطظ]{1,32}$/gi.test(txt_name_ptr)){
                $('#txtnameErr-ptr').html('<span>نام را وارد کنید</span>');
                validdata = false;
                    }
            } else {
                $('#txtnameErr-ptr span').html('');
            }
            if(txt_name_ptr.startsWith('.')  || txt_name_ptr.includes('..') || txt_name_ptr.includes('\\') || txt_name_ptr.includes('^')) {
                $('#txtname-aErr').html('<span>عنوان معتبر وارد کنید</span>');
                validdata = false;
            }
            if (!/^[A-z0-9\.\-]{1,32}$/gi.test(txtdname_ptr)) {
                $('#txtdDnErr-ptr').html('<span>نام دامنه را وارد کنید</span>');
                validdata = false;
            } else {
                $('#txtdDnErr-ptr span').html('');
            }

            if ( validdata == false ) {
                console.log("validation is false");
                return;
            } else {
                await AddDnsRecordRow();
                if (typeof recSucc != undefined && txt_name_ptr !== '' && txtdname_ptr !== '') {
                    if (typeof recErr != undefined) {
                        return;
                    } else{
                        $("#editrecord").modal("hide");
                        recSucc = undefined;
                    } 
                }
                
            }
        }
        
    }
}

$('.proxy-switch').removeAttr('checked');

function proxyStatusChecker(){
    if ($('.proxy-switch').is(':checked')) {
        $('#geostatus').removeAttr('checked');
        $("#add-ttl-record").prepend('<div id="disabled-recordtype-ttl" style="position: absolute;width: 100%;height: 40px;z-index: 9;top: 15px;"></div>');
        $('#showttl .current-item').text('اتوماتیک');
        $('#showttl .current-item').attr('data-value', '0');

        $('#geo-dns-record-card').addClass('d-none');
        $('#protocol-list-a').removeClass('d-none'); // new

        let dataValCur = $('#showptla .current-item').text(); // new
        // alert(dataValCur);
        if(dataValCur.toUpperCase() === 'HTTP' || dataValCur.toUpperCase() === 'HTTPS') { // new
            $('#protocol-port-a').removeClass('d-none'); // new
        } else { // new
            // $('#protocol-port-a').addClass('d-none'); // new
        } // new
      
        

    } else {
        $("#disabled-recordtype-ttl").remove();
        $('#protocol-list-a').addClass('d-none'); // new
    }
}

$(".proxy-switch").attr("onclick", "proxyStatusChecker()");

$('#proxystatus-a').click(function () {
    if ($('#proxystatus-a').is(':checked')) {
        $('#geostatus').removeAttr('checked');
        $("#add-ttl-record").prepend('<div id="disabled-recordtype-ttl" style="position: absolute;width: 100%;height: 40px;z-index: 9;top: 15px;"></div>');
        $('#showttl .current-item').text('اتوماتیک');
        $('#showttl .current-item').attr('data-value', '0');
        $("#disabled-recordtype-ttl").remove(); 
        $('#editrecord').removeClass('modal-scroll');
        $('#geo-dns-record-card').addClass('d-none');
        $('.scrollbar-outer').scrollbar();
    } else {
    }

})

$(document).on("keyup", "#geo-ip_1", function (e) {
    $("#txtip-a").val($("#geo-ip_1").val());
}); 
$('.proxy-switch').click(proxyStatusChecker());

$(document).on("click", "#addrow", function (e) {
    var currentid = $("#addrow").attr("data-value");
    if(currentid <= 10) {
        $("#cdn-dns-row_" + currentid).removeClass('d-none');
        $("#addrow").attr("data-value", parseInt(currentid) + 1);
    }
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
});

// $('.cdn-dns-row:first').find('.delete-dns-btn').addClass('disable-del');

$(document).on("click", "#distributelist li", function (e) {
    if ($('#showdistribute .current-item').text().trim() === 'نوبتی با وزن') {
        $('.geo-weight').removeClass('d-none');
    } else {
        $('.geo-weight').addClass('d-none');
    }
});

$(document).on("click", "#geolist li", function (e) {
    if ($('#showgeo .current-item').text().trim() === 'کشور') {
        $('.geo-country').removeClass('d-none');
    } else {
        $('.geo-country').addClass('d-none');
    }
});

$('#recordlist li').click(function () {
    $('#add-ttl-record-label').removeClass('d-none');
    $('#add-ttl-record').removeClass('d-none');
})

$('#recordlist').on('click', 'li', function () {
    $('#editrecord').removeClass('modal-scroll');
})
 
function geoStatusChecker() {
    if ($('#geostatus').is(':checked')) {
        $('.proxy-switch').removeAttr('checked');
        $('#geo-dns-record-card').removeClass('d-none');
        $("#disabled-recordtype-ttl").remove();
        $('#editrecord').addClass('modal-scroll');
        $("#geo-ip_1").val($("#txtip-a").val());
        $("#txtip-a").attr("disabled","disabled")
    } else {
        $('#geo-dns-record-card').addClass('d-none');
        $('#editrecord').removeClass('modal-scroll');
        $("#txtip-a").val($("#geo-ip_1").val());
        $('.cdn-dns-row  input[type="text"]').val('');
        $("#txtip-a").removeAttr("disabled");
        $('.cdn-dns-row .showSelect').find('.current-item').text('انتخاب کشور');
        $('.cdn-dns-row .showSelect .current-item').attr('data-value', undefined);
    }
}

$(document).on("click", ".delete-dns-btn", function (e) {
    console.log(e.target.id)
    if ( e.target.id ) {
        return
    } else {

        var currentid = $("#addrow").attr("data-value");
        // if (currentid >= 3) {
            $("#addrow").attr("data-value", parseInt(currentid) - 1);
            $(this).parents('.cdn-dns-row').addClass('d-none');
            $(this).parents('.cdn-dns-row').find('input').val('');
        // }
    }
    
});

$(document).on("click", "#geostatus", function (e) {
    if ($('#geostatus').is(':checked')) {
        // $("#cdn-dns-row_1 .delete-dns-btn img").removeAttr("onclick")

        
        $('.proxy-switch').removeAttr('checked');
        $('#geo-dns-record-card').removeClass('d-none');
        $("#disabled-recordtype-ttl").remove();
        $('#editrecord').addClass('modal-scroll');
        $("#geo-ip_1").val($("#txtip-a").val());
        $("#txtip-a").attr("disabled","disabled")
    } else {
        $('#geo-dns-record-card').addClass('d-none');
        $('#editrecord').removeClass('modal-scroll');
        $("#txtip-a").val($("#geo-ip_1").val());
        $('.cdn-dns-row  input[type="text"]').val('');
        $("#txtip-a").removeAttr("disabled")
        $('.cdn-dns-row .showSelect').find('.current-item').text('انتخاب کشور');
        $('.cdn-dns-row .showSelect .current-item').attr('data-value', undefined);
    }

}); 

$('#geostatus').click(geoStatusChecker);


$(document).on("click" , "#ptllist-a li" , function(){
    let dataVal = $(this).data('value');
    if(dataVal.toUpperCase() === 'HTTP' || dataVal.toUpperCase() === 'HTTPS') {
        $('#protocol-port-a').removeClass('d-none');
    } else {
        $('#protocol-port-a').addClass('d-none');
    }
});

function protocolCheckerer() {
    if ($('#proxystatus-a').is(':checked')) {
        let dataValCur = $('#showptla').find('.current-item').attr('data-value');
        if(dataValCur.toUpperCase() === 'HTTP' || dataValCur.toUpperCase() === 'HTTPS') {
            $('#protocol-port-a').removeClass('d-none');
        } else {
            $('#protocol-port-a').addClass('d-none');
        }
        $('#protocol-list-a').removeClass('d-none');
    } else {
        $('#protocol-list-a').addClass('d-none');
        $('#protocol-port-a').addClass('d-none');

    }

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
