const swalWithBootstrapButtons = Swal.mixin({
   customClass: {
       confirmButton: 'fw-600 next btn btn-sm fs-14 px-4 btn-blue-100 ws-15 border-0 rounded-pill',
       cancelButton: 'btn btn-sm fs-13 px-4 btn-white-100 ws-15 border-0'
   },
   buttonsStyling: false
})

function removeRecordTable(_recordid) {

}
function deletensRecord(_recordid) {
   swalWithBootstrapButtons.fire({
       title: 'Ø§Ø®Ø·Ø§Ø±',
       html: 'Ø¢ÛŒØ§ Ø§Ø² Ø­Ø°Ù Ø±Ú©ÙˆØ±Ø¯ Ù…ÙˆØ±Ø¯ Ù†Ø¸Ø± Ø®ÙˆØ¯ Ø§Ø·Ù…ÛŒÙ†Ø§Ù† Ø¯Ø§Ø±ÛŒØ¯ØŸ ',
       //timer: 3000,
       icon: 'error',
       timerProgressBar: true,
       confirmButtonText: 'Ù‚Ø¨ÙˆÙ„',
       showCancelButton: true,
       cancelButtonText: 'Ø®ÛŒØ±',
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
       swalWithBootstrapButtons.close();
   })
   $(".swal2-confirm").click(function () {
       $("#" + _recordid).slideUp(function () {
           $("#" + _recordid).remove();
       });
       swalWithBootstrapButtons.close();
   })
}

function validate(str) {
   return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(str);
}

const isValidIpv6 = value => (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(str) ? true : false);
function ValidateIPaddressv6(_id, _btnid) {
   str = $("#" + _id).val();
   // console.log(isValidIp($("#" + _id).val()));
   if (isValidIpv6($("#" + _id).val())) {
       $("#" + _btnid).removeAttr("disabled");
       console.log($("#" + _id).val() + ":" + isValidIpv6($("#" + _id).val()));
       return (true)
   }
   else {
       $("#" + _btnid).attr("disabled", "true");
       console.log($("#" + _id).val() + ":" + isValidIpv6($("#" + _id).val()));
       return (false)
   }

}
const isValidIp = value => (/^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/.test(value) ? true : false);
function ValidateIPaddress(_id, _btnid) {
   if (isValidIp($("#" + _id).val())) {
       $("#" + _btnid).removeAttr("disabled");
       console.log($("#" + _id).val() + ":" + isValidIp($("#" + _id).val()));
       return (true)
   }
   else {
       $("#" + _btnid).attr("disabled", "true");
       console.log($("#" + _id).val() + ":" + isValidIp($("#" + _id).val()));
       return (false)
   }
}
function customSelect(_className, _dropdownClass) {
   var all = $('.showSelect');
   $(".showSelect .imgexp").addClass("img-collapse");
   $(".showSelect .imgexp").removeClass("img-collapsed");
   all.next().slideUp(250);
   $("." + _className).parent().removeClass("select-active");
   if ($("." + _className).next().css('display') == 'none') {
       $("." + _className).next().slideDown(150);
       $("." + _className + " .imgexp").removeClass("img-collapse");
       $("." + _className + " .imgexp").addClass("img-collapsed");
       $("." + _className).parent().addClass("select-active");
   } else {
       all.next().slideUp(250);
       $("." + _className + " .imgexp").addClass("img-collapse");
       $("." + _className + " .imgexp").removeClass("img-collapsed");
       $("." + _className).parent().removeClass("select-active");
   }
}

function customDropdown(_className, _dropdownClass, _value, _index) {
   $("." + _dropdownClass + " li").removeClass("SelectedItem");
   $("[data-value='" + _index + "']").addClass("SelectedItem");
   var supportValue = _index;
   var supportItem = _value;
   $('.' + _className + ' .current-item').text(supportItem);
   $('.' + _className + ' .current-item').attr('data-value', supportValue);
   // console.log($('.' + _className + '.current-item').text());
   $("." + _className).trigger("click");
}

$('.modal').click(function (e) {
   $('.showSelect').each(function () {
       $(this).siblings().css('display', 'none');
   })
   $(".showSelect .imgexp").addClass("img-collapse");
   $(".showSelect .imgexp").removeClass("img-collapsed");
   $(".showSelect").parent().removeClass("select-active");
});

$(".showSelect").click(function (event) {
   event.stopPropagation();
});






function addRowsToDnsRecord() {

}

// function ShowAddForm() {
//     $("#recordmanagementtitle").html("Ø§ÙØ²ÙˆØ¯Ù† Ø±Ú©ÙˆØ±Ø¯Ù‡Ø§ÛŒ DNS");
//     $("#sendRecord").html("Ø§ÙØ²ÙˆØ¯Ù† Ø±Ú©ÙˆØ±Ø¯");
//     $("#sendRecord").attr("onclick", "AddDNSRecord()");
//     $("#disabled-recordtype").remove();
//     $("#Optionsrecord1").attr('id', 'Optionsrecord');
//     $("#editrecord").modal("show");
//     $('#txtip').val('');
//     $('#txtname').val('');


// }


function ShowAddForm() {
   $("#recordmanagementtitle").html("Ø§ÙØ²ÙˆØ¯Ù† Ø±Ú©ÙˆØ±Ø¯Ù‡Ø§ÛŒ DNS");
   $("#sendRecord").html("Ø§ÙØ²ÙˆØ¯Ù† Ø±Ú©ÙˆØ±Ø¯");
   $("#sendRecord").attr("onclick","AddDNSRecord()");
   $("#disabled-recordtype").remove();
   $("#Optionsrecord1").attr('id', 'Optionsrecord');
   $("#editrecord").modal("show");
   $('#txtip').val('');
   $('#txtname').val('');

   $('#add-ttl-record-label').addClass('d-none');
   $('#add-ttl-record').addClass('d-none');
}

$('#recordlist').on('click', 'li', function () {
   $(".alltypes").css("display", "none");
   $("#" + $(this).find('span').text().trim().toLowerCase()).css("display", "block");
});

$(".number-field").keypress(function (e) {
   if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
       return false;
   }
});



$(document).ready(function () {
   if ($("#editrecord").hasClass("show")) {
       $("#Optionsrecord1").css("display", "none");
   }
})
// function editrecord(_recordtype, _id) {
//     $("#recordmanagementtitle").html("ÙˆÛŒØ±Ø§ÛŒØ´ Ø±Ú©ÙˆØ±Ø¯Ù‡Ø§ÛŒ DNS");
//     $("#disabled-recordtype").remove();
//     $("#sendRecord").html("ÙˆÛŒØ±Ø§ÛŒØ´ Ø±Ú©ÙˆØ±Ø¯");
//     $("#sendRecord").attr("onclick", "editDnsRecord('" + _recordtype + "','" + _id + "')");
//     $("#add-record-select").prepend('<div id="disabled-recordtype" style="position: absolute;width: 100%;height: 40px;z-index: 1000;"></div>');
//     $("#editrecord").modal("show");
//     // $('#recordlist li[data-value="'+_recordtype+'"]').trigger("click");
//     $("#recordlist li").removeClass("SelectedItem");
//     $('#recordlist li[data-value="' + _recordtype + '"]').addClass('SelectedItem');
//     var supportValue = $('#recordlist li[data-value="' + _recordtype + '"]').attr("data-value");
//     var supportItem = $('#recordlist li[data-value="' + _recordtype + '"]').find('span').text();
//     $('#showrecordtype .current-item').text(supportItem);
//     $('#showrecordtype .current-item').attr('data-value', supportValue);
//     $(".alltypes").css("display", "none");
//     $("#Optionsrecord").attr('id', 'Optionsrecord1');

//     $("#" + _recordtype.toLowerCase()).css("display", "block");
//     // var ttl=$("#record_ttl-"+_id).first().text();

//     var ttl = $("#record_ttl-" + _id).text();
//     $("#ttllist li").removeClass("SelectedItem");
//     $('#ttllist li span:contains("' + ttl + '")').parent().addClass('SelectedItem');
//     var ttlvalue = $('#ttllist li span:contains("' + ttl + '")').parent().attr("data-value");
//     // var ttlitem = $('#ttllist li span:contains("' + ttl + '")').text();
//     $('#showttl .current-item').text(ttl);
//     $('#showttl .current-item').attr('data-value', ttlvalue);


//     // $("#showrecordtype").trigger("click");

//     $('#txtip').val($("#record_content-" + _id).html().trim());
//     $('#txtname').val($("#record_name-" + _id).html().trim());
//     if ($("#cloud_status-" + _id + " img").attr("cdn") == "true") {
//         $('#proxystatus').prop("checked", 1);
//     } else {
//         $('#proxystatus').prop("checked", 0);
//     }

// }



function editrecord(_recordtype, _id) {
       $("#recordmanagementtitle").html("ÙˆÛŒØ±Ø§ÛŒØ´ Ø±Ú©ÙˆØ±Ø¯Ù‡Ø§ÛŒ DNS");
       $("#disabled-recordtype").remove();
       $("#sendRecord").html("ÙˆÛŒØ±Ø§ÛŒØ´ Ø±Ú©ÙˆØ±Ø¯");
       $("#sendRecord").attr("onclick","editDnsRecord('" + _recordtype + "','" + _id + "')");
       $("#add-record-select").prepend('<div id="disabled-recordtype" style="position: absolute;width: 100%;height: 40px;z-index: 1000;"></div>');
       $("#editrecord").modal("show");
       // $('#recordlist li[data-value="'+_recordtype+'"]').trigger("click");
       $("#recordlist li").removeClass("SelectedItem");
       $('#recordlist li[data-value="' + _recordtype + '"]').addClass('SelectedItem');
       var supportValue = $('#recordlist li[data-value="' + _recordtype + '"]').attr("data-value");
       var supportItem = $('#recordlist li[data-value="' + _recordtype + '"]').find('span').text();
       $('#showrecordtype .current-item').text(supportItem);
       $('#showrecordtype .current-item').attr('data-value', supportValue);
       $(".alltypes").css("display", "none");
       $("#Optionsrecord").attr('id', 'Optionsrecord1');
   
       $("#" + _recordtype.toLowerCase()).css("display", "block");
       // var ttl=$("#record_ttl-"+_id).first().text();
   
       var ttl = $("#record_ttl-" + _id).text();
       $("#ttllist li").removeClass("SelectedItem");
       $('#ttllist li span:contains("' + ttl + '")').parent().addClass('SelectedItem');
       var ttlvalue = $('#ttllist li span:contains("' + ttl + '")').parent().attr("data-value");
       // var ttlitem = $('#ttllist li span:contains("' + ttl + '")').text();
       $('#showttl .current-item').text(ttl);
       $('#showttl .current-item').attr('data-value', ttlvalue);
   
   
       // $("#showrecordtype").trigger("click");
   
       $('#txtip').val($("#record_content-" + _id).html().trim());
       $('#txtname').val($("#record_name-" + _id).html().trim());
       if ($("#cloud_status-" + _id + " img").attr("cdn") == "true") {
           $('#proxystatus').prop("checked", 1);
       } else {
           $('#proxystatus').prop("checked", 0);
       }

       $('.proxy-switch').click(function(){
           if ($('.proxy-switch').is(':checked')) {
               $("#add-ttl-record").prepend('<div id="disabled-recordtype-ttl" style="position: absolute;width: 100%;height: 40px;z-index: 9;top: 15px;"></div>');
               $('#showttl .current-item').text('Ø§ØªÙˆÙ…Ø§ØªÛŒÚ©');
               $('#showttl .current-item').attr('data-value', 'اتوماتیک');
           } else {
               $('#showttl .current-item').text(ttl);
               $('#showttl .current-item').attr('data-value', ttlvalue);
               $("#disabled-recordtype-ttl").remove();
           }
       });
   
}





// function validatev6(str){
//     return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(str);
// }

// const isValidIpv6 = value => (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(str) ? true : false);
// function ValidateIPaddressv6(_id, _btnid) {
//     str = $("#" + _id).val();
//     // console.log(isValidIp($("#" + _id).val()));
//     if (isValidIpv6($("#" + _id).val())) {
//         $("#" + _btnid).removeAttr("disabled");
//         console.log($("#" + _id).val() + ":" + isValidIpv6($("#" + _id).val()));
//         return (true)
//     }
//     else {
//         $("#" + _btnid).attr("disabled", "true");
//         console.log($("#" + _id).val() + ":" + isValidIpv6($("#" + _id).val()));
//         return (false)
//     }

// }



function DomainValidation(text) {
   var val = text;
   if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(val)) {
       return true;
   } else {
       return false;
   }
}

function SendToGetNSRecords(){
   setTimeout(() => {
       // window.location.href="http://localhost/mizbanpanel/getdnsrecordlist.php";
   }, 7000);
}
$(document).ready(function () {

   var current_fs, next_fs, previous_fs; //fieldsets
   var opacity;

   EnterKeyboard('txtdomain', '1', '1')

   $(".next").click(function () {
       current_fs = $(this).parent().parent();
       next_fs = $(this).parent().parent().next();

       let index = $("fieldset").index(current_fs);

       if (index == 0) {
           if (DomainValidation($("#txtdomain").val()) == false) {
               swalWithBootstrapButtons.fire({
                   title: 'Ø§Ø®Ø·Ø§Ø±',
                   html: 'Ø¯Ø§Ù…Ù†Ù‡ ÙˆØ§Ø±Ø¯ Ø´Ø¯Ù‡ ØµØ­ÛŒØ­ Ù†ÛŒØ³Øª!',
                   //timer: 3000,
                   icon: 'error',
                   timerProgressBar: true,
                   confirmButtonText: 'Ù‚Ø¨ÙˆÙ„',
                   showCancelButton: false,
                   cancelButtonText: 'Ø®ÛŒØ±',
                   didOpen: () => {
                       timerInterval = setInterval(() => {
                       }, 100)
                   },
                   willClose: () => {
                       clearInterval(timerInterval)
                   }
               }).then((result) => {
                   $("#txtdomain").focus();
               });
               var al = $(".swal2-modal").html();
               $(".swal2-modal").html("");
               var nal = "<div id='sml'>" + al + "</div>";
               $(".swal2-modal").html(nal);
               $(".swal2-cancel").click(function () {
                   swalWithBootstrapButtons.close();
               })
               $(".swal2-confirm").click(function () {
                   swalWithBootstrapButtons.close();
               })

               return;
           }



           if ($("#txtdomain").val() == "") {
               swalWithBootstrapButtons.fire({
                   title: 'Ø§Ø®Ø·Ø§Ø±',
                   html: 'Ù„Ø·ÙØ§ Ù†Ø§Ù… Ø¯Ø§Ù…Ù†Ù‡ Ù…ÙˆØ±Ø¯ Ù†Ø¸Ø± Ø®ÙˆØ¯ Ø±Ø§ ÙˆØ§Ø±Ø¯ Ú©Ù†ÛŒØ¯ !',
                   //timer: 3000,
                   icon: 'error',
                   timerProgressBar: true,
                   confirmButtonText: 'Ù‚Ø¨ÙˆÙ„',
                   showCancelButton: true,
                   cancelButtonText: 'Ø®ÛŒØ±',
                   didOpen: () => {
                       timerInterval = setInterval(() => {
                       }, 100)
                   },
                   willClose: () => {
                       clearInterval(timerInterval)
                   }
               }).then((result) => {
                   $("#txtdomain").focus();
               });
               var al = $(".swal2-modal").html();
               $(".swal2-modal").html("");
               var nal = "<div id='sml'>" + al + "</div>";
               $(".swal2-modal").html(nal);
               $(".swal2-cancel").click(function () {
                   swalWithBootstrapButtons.close();
               })
               $(".swal2-confirm").click(function () {
                   swalWithBootstrapButtons.close();
               })

               return;
           }

           document.getElementById("msform").setAttribute("style", "background-image:none !important");
           changestate('1', '2');


       }
       else if (index == 1) {

           if (!$('#chacceptrules').is(":checked")) {
               swalWithBootstrapButtons.fire({
                   title: 'Ø§Ø®Ø·Ø§Ø±',
                   html: 'ØªØ§ÛŒÛŒØ¯ Ù‚ÙˆØ§Ù†ÛŒÙ† Ùˆ Ø´Ø±Ø§ÛŒØ· Ø§Ù„Ø²Ø§Ù…ÛŒ Ø§Ø³Øª !',
                   //timer: 3000,
                   icon: 'error',
                   timerProgressBar: true,
                   confirmButtonText: 'Ù‚Ø¨ÙˆÙ„',
                   didOpen: () => {
                       timerInterval = setInterval(() => {
                       }, 100)
                   },
                   willClose: () => {
                       clearInterval(timerInterval)
                   }
               }).then((result) => {

               })
               var al = $(".swal2-modal").html();
               $(".swal2-modal").html("");
               var nal = "<div id='sml'>" + al + "</div>";
               $(".swal2-modal").html(nal);
               $(".swal2-cancel").click(function () {
                   swalWithBootstrapButtons.close();
               })
               $(".swal2-confirm").click(function () {
                   swalWithBootstrapButtons.close();
               })
               return;
           }
           document.getElementById("msform").setAttribute("style", "background-image:none !important");
           changestate('2', '3');
       }
       else if (index == 2) {
           swalWithBootstrapButtons.fire({
               title: 'Ø§Ø¹Ù„Ø§Ù†',
               html: 'Ø¯Ø§Ù…Ù†Ù‡ Ø´Ù…Ø§ Ø¨Ø§ Ù…ÙˆÙÙ‚ÛŒØª Ø«Ø¨Øª Ø´Ø¯',
               //timer: 3000,
               icon: 'error',
               timerProgressBar: true,
               confirmButtonText: 'Ø§Ø¯Ø§Ù…Ù‡',
               didOpen: () => {
                   timerInterval = setInterval(() => {
                   }, 100)
               },
               willClose: () => {
                   clearInterval(timerInterval)
               }
           })
           var al = $(".swal2-modal").html();
           $(".swal2-modal").html("");
           var nal = "<div id='sml'>" + al + "</div>";
           $(".swal2-modal").html(nal);
           $(".swal2-confirm").click(function () {
               // window.location.href = '#';
               swalWithBootstrapButtons.close();
               SendToGetNSRecords();
           })
       }



       $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

       //show the next fieldset
       next_fs.show();
       //hide the current fieldset with style
       current_fs.animate({ opacity: 0 }, {
           step: function (now) {
               // for making fielset appear animation
               opacity = 1 - now;

               current_fs.css({
                   'display': 'none',
                   'position': 'relative'
               });
               next_fs.css({ 'opacity': opacity });
           },
           //duration: 600
       });




   });

   function EnterKeyboard(_inputid, _buttonid, _index = null) {
       $('#' + _inputid).keypress(function (e) {
           var key = e.which;
           if (key == 13) {
               if (_index != null) {
                   $('[step=' + _index + ']').trigger('click');
               }
               else {
                   $('#' + _buttonid).trigger('click');
               }
           }
       });
   }



   $(".previous").click(function () {

       current_fs = $(this).parent().parent();
       previous_fs = $(this).parent().parent().prev();

       //Remove class active
       $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

       //show the previous fieldset
       previous_fs.show();

       //hide the current fieldset with style
       current_fs.animate({ opacity: 0 }, {
           step: function (now) {
               // for making fielset appear animation
               opacity = 1 - now;

               current_fs.css({
                   'display': 'none',
                   'position': 'relative'
               });
               previous_fs.css({ 'opacity': opacity });
           },
           //duration: 600
       });
   });

   $('.radio-group .radio').click(function () {
       $(this).parent().find('.radio').removeClass('selected');
       $(this).addClass('selected');
   });

   $(".submit").click(function () {
       return false;
   })

});

function changestate(currentid, nextlevel) {

   $("#step" + currentid).attr("src", "\\mizbanpanel\\assets\\images\\new\\ico_wizard_finish.svg");
   $("#step" + currentid).removeClass();
   $("#step" + currentid).addClass("formwizard-img-completed");
   $("#step" + nextlevel).attr("src", "\\mizbanpanel\\assets\\images\\new\\ico_wizard_step.svg");
   $("#step" + nextlevel).removeClass();
   $("#step" + nextlevel).addClass("formwizard-img-inprogress");
}
function changetoBack(currentid, previouslevel) {
   if (previouslevel == 1) {
       document.getElementById("msform").removeAttribute("style");
   }
   $("#step" + currentid).attr("src", "\\mizbanpanel\\assets\\images\\new\\ico_wizard_circle.svg");
   $("#step" + currentid).removeClass();
   $("#step" + currentid).addClass("formwizard-img-non");

   $("#step" + previouslevel).attr("src", "\\mizbanpanel\\assets\\images\\new\\ico_wizard_step.svg");
   $("#step" + previouslevel).removeClass();
   $("#step" + previouslevel).addClass("formwizard-img-inprogress");

}
function CopyDiv(nameservers) {
   var elem = document.getElementById(nameservers);
   var textToCopy = elem.innerText.trim();
   console.log(elem);
   var myTemporaryInputElement = document.createElement("input");
   myTemporaryInputElement.type = "text";
   myTemporaryInputElement.value = textToCopy;

   document.body.appendChild(myTemporaryInputElement);

   myTemporaryInputElement.select();
   document.execCommand("Copy");
   ShowSuccessAlert("Ù†ÛŒÙ… Ø³Ø±ÙˆØ± Ù…ÙˆØ±Ø¯ Ù†Ø¸Ø± Ø¯Ø± Ø­Ø§ÙØ¸Ù‡ Ú©Ù¾ÛŒ Ø´Ø¯",3000);
   document.body.removeChild(myTemporaryInputElement);
}
function CopyNameserver(nameservers) {
   /* Get the text field */
   var copyText = document.getElementById(nameservers);

   /* Select the text field */
   copyText.select();
   copyText.setSelectionRange(0, 99999); /* For mobile devices */

   /* Copy the text inside the text field */
   document.execCommand("copy");
   ShowSuccessAlert("Ù†ÛŒÙ… Ø³Ø±ÙˆØ±  Ù…ÙˆØ±Ø¯ Ù†Ø¸Ø± Ø¯Ø± Ø­Ø§ÙØ¸Ù‡ Ú©Ù¾ÛŒ Ø´Ø¯",3000);

   /* Alert the copied text */

}
function ShowSuccessAlert(message,time){
   var temp=`<div id="dvalertsuccess" class="login-alert shadow-sm">
                   <img class="img-alert" src="/general/images/root/alerts/ico_message_check.svg" />
                       <span class="fs-13" style="word-spacing:-1px;">
                       ${message}
                       </span>
                   <div class="progressloader-dvalertsuccess"> 
                   </div>
               </div>`;
               $(window).scrollTop(0);
               $("body").append(temp);
               $("#dvalertsuccess").fadeIn(400);
               var bar = new ProgressBar.Circle('.progressloader-dvalertsuccess', {
                   strokeWidth: 10,
                   easing: 'easeInOut',
                   duration: time,
                   color: '#59C2E2',
                   trailColor: '#eee',
                   trailWidth: 1,
                   svgStyle: null,
               });
           
               bar.animate(1.0);
               setTimeout(function () {
                   $("#dvalertsuccess").fadeOut(400);
                   $("#dvalertsuccess").remove()
               }, time);
               

}
function showalert() {
   $(window).scrollTop(0);
   $("#dvalert").fadeIn(400);
   var bar = new ProgressBar.Circle('.progressloader', {
       strokeWidth: 10,
       easing: 'easeInOut',
       duration: 5000,
       color: '#59C2E2',
       trailColor: '#eee',
       trailWidth: 1,
       svgStyle: null,
   });

   bar.animate(1.0);
   setTimeout(function () {
       $("#dvalert").fadeOut(400);

   }, 5000);

}
function showsuccess() {
   $(window).scrollTop(0);
   $("#dvsuccess").fadeIn(400);
   var bar = new ProgressBar.Circle('.progressloader2', {
       strokeWidth: 10,
       easing: 'easeInOut',
       duration: 5000,
       color: '#59C2E2',
       trailColor: '#eee',
       trailWidth: 1,
       svgStyle: null,
   });

   bar.animate(1.0);
   setTimeout(function () {
       $("#dvsuccess").fadeOut(400);

   }, 5000);

}