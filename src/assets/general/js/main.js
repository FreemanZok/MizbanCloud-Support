const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton:
            "fw-600 next btn btn-sm fs-14 px-4 btn-blue-100 ws-15 border-0 rounded-pill",
        cancelButton: "btn btn-sm fs-13 px-4 btn-white-100 ws-15 border-0",
    },
    buttonsStyling: false,
});
const swalWithBootstrapButtonsDelete = Swal.mixin({
    customClass: {
        confirmButton:
            "fw-600 next btn btn-sm fs-14 px-4 btn-blue-100 ws-15 border-0 rounded-pill swal2-delete",
        cancelButton: "btn btn-sm fs-13 px-4 btn-white-100 ws-15 border-0",
    },
    buttonsStyling: false,
});

function deletensRecord(_domainname, _rowid, _recordid) {
    swalWithBootstrapButtonsDelete
        .fire({
            title: "اخطار",
            html: "آیا از حذف رکورد مورد نظر خود اطمینان دارید؟ ",
            //timer: 3000,
            icon: "error",
            timerProgressBar: true,
            confirmButtonText: "قبول",
            showCancelButton: true,
            cancelButtonText: "خیر",
            didOpen: () => {
                timerInterval = setInterval(() => {
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            },
        })
        .then((result) => {
        });
    var al = $(".swal2-modal").html();
    $(".swal2-modal").html("");
    var nal = "<div id='sml'>" + al + "</div>";
    $(".swal2-modal").html(nal);
    $(".swal2-cancel").click(function () {
        swalWithBootstrapButtons.close();
    });
    $(".swal2-confirm").click(function () {
        RequestdeletensRecord(_domainname, _recordid, _rowid);
        swalWithBootstrapButtons.close();
    });
}

function validate(str) {
    return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(
        str
    );
}

const isValidIpv6 = (value) =>
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(
        str
    )
        ? true
        : false;

function ValidateIPaddressv6(_id, _btnid) {
    str = $("#" + _id).val();
    if (isValidIpv6($("#" + _id).val())) {
        $("#" + _btnid).removeAttr("disabled");
        return true;
    } else {
        $("#" + _btnid).attr("disabled", "true");
        return false;
    }
}

function checkIP(myinput) {
    var i = document.getElementById(myinput).value;
    i = i.trim();
    var ipformat =
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|0)$/;
    if (i.match(ipformat)) {
        return true;
    } else {
        if (i.indexOf("/") != -1) {
            console.log("elseif");
            var m = i.split("/");
            if (m[0].match(ipformat)) {
                console.log(1);
                var l = parseInt(m[1]);
                if (l >= 0 && l < 33) {
                    console.log(11);
                    return true;
                } else {
                    console.log(12);
                    return false;
                }
            }
        } else {
            console.log("elseelse");
            return false;
        }
        console.log("else");
        return false;
    }
}

$(document).on("keyup", "#txtip-a", function (e) {
    console.log("key up ipv4");
    ip_validation = checkIP("txtip-a");
    if (ip_validation == true) {
        $("#txtip-aErr").html("");
        $("#sendRecord").removeAttr("disabled");
    } else {
        $("#txtip-aErr").html("<span>مقدار ورودی صحیح نیست</span>");
        $("#sendRecord").attr("disabled", "true");
    }
});

const isValidIp = (value) =>
    /^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/.test(value) ? true : false;

function ValidateIPaddress(_id, _btnid) {
    if (checkIP(_id)) {
        $("#" + _btnid).removeAttr("disabled");
        $("#txtip-aErr").html("");
        document.getElementById(_id).classList.remove("alert-danger-border");
        return true;
    } else {
        document.getElementById(_id).classList.add("alert-danger-border");
        $("#" + _btnid).attr("disabled", "true");
        $("#txtip-aErr").html("<span>مقدار ورودی صحیح نیست</span>");
        return false;
    }
}

var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

async function refreshserverlist(dsid) {
    const method = "POST",
        address = "/submit/idc/ssh-and-firewall";
    let body = new FormData();
    body.append("idc", dsid);
    $(".accordion-server-wrap > div > div").prepend(
        '<div class="three-dots-loading " id="fetcher"></div>'
    );
    $(".accordion-key-wrap > div > div").prepend(
        '<div class="three-dots-loading " id="fetcher"></div>'
    );
    $(".accordion-firewall-wrap > div > div").prepend(
        '<div class="three-dots-loading " id="fetcher"></div>'
    );
    $(".accordion-network-wrap > div > div").prepend(
        '<div class="three-dots-loading " id="fetcher"></div>'
    );
    $(".accordion-volume-wrap  > div").prepend(
        '<div class="three-dots-loading " id="fetcher"></div>'
    );

    const result = await fetch(address, {method, body})
        .then((r) => r.json())
        .then((j) => j)
        .catch((ex) => window.location.reload());
    window.location.reload();
}

function customSelect(_className, _dropdownClass) {
    $(".overview-list li").css("display", "");
    var all = $(".showSelect");
    // $(".showSelect .imgexp").addClass("img-collapse");
    $(".showSelect .imgexp").removeClass("img-collapsed");
    all.next().slideUp(250);
    $("." + _className)
        .parent()
        .removeClass("select-active");
    if (
        $("." + _className)
            .next()
            .css("display") == "none"
    ) {
        $("." + _className)
            .next()
            .slideDown(150);
        // $("." + _className + " .imgexp").removeClass("img-collapse");
        $("." + _className + " .imgexp").addClass("img-collapsed");
        $("." + _className)
            .parent()
            .addClass("select-active");
    } else {
        all.next().slideUp(250);
        // $("." + _className + " .imgexp").addClass("img-collapse");
        $("." + _className + " .imgexp").removeClass("img-collapsed");
        $("." + _className)
            .parent()
            .removeClass("select-active");

        // setTimeout(function() {
        //     $('#replyoption').slideUp('fast'); // slide down menu
        // }, 300);
    }
}

function customDropdown(_className, _dropdownClass, _value, _index) {
    $("." + _dropdownClass + " li").removeClass("SelectedItem");
    $("." + _dropdownClass)
        .find("[data-value='" + _index + "']")
        .addClass("SelectedItem");
    var supportValue = _index;
    var supportItem = _value;
    // console.log(itemImage);
    $("." + _className + " .current-item:first").text(supportItem);
    $("." + _className + " .current-item:first").attr("data-value", supportValue);
    $("." + _className).trigger("click");
    setTimeout(() => {
        $(".scroll-fix-height").css({
            position: "absolute", // Optional if #dataCenteroption is already absolute
            visibility: "hidden",
            display: "block",
        });
        setTimeout(() => {
            $(".scroll-fix-height").attr("style", "display: none");
        }, 300);
    }, 200);
}

function customDropdown2(_className, _dropdownClass, _value, _index) {
    $("." + _dropdownClass + " li").removeClass("SelectedItem");
    $("." + _dropdownClass)
        .find("[data-value='" + _index + "']")
        .addClass("SelectedItem");
    var supportValue = _index;
    var supportItem = _value;
    $("." + _className + " .curDomain").text(supportItem);
    $("." + _className + " .curDomain").attr("data-value", supportValue);
    $("." + _className).trigger("click");
    setTimeout(() => {
        $(".scroll-fix-height").css({
            position: "absolute", // Optional if #dataCenteroption is already absolute
            visibility: "hidden",
            display: "block",
        });
        setTimeout(() => {
            $(".scroll-fix-height").attr("style", "display: none");
        }, 300);
    }, 200);
}

function customDropdownImage(_className, _dropdownClass, _value, _index, elm) {
    var supportValue = _index;
    var supportItem = _value;

    var itemImage = $(elm).find("img").attr("src");
    $("." + _className + " .current-item img").attr("src", itemImage);
    $("." + _className + " .current-item:first span").text(supportItem);
    $("." + _className + " .current-item:first").attr("data-value", supportValue);
    $("." + _className).trigger("click");
}

function customDropdownMulti(_className, _dropdownClass, _value, _index) {
    var selectItemText = _value;
    var selectedValue = _index;

    const dom = document.querySelector("." + _className + " .current-item input");
    if (dom.value.includes(selectedValue)) {
        dom.value = dom.value.replace(selectedValue + ",", "");
        $("." + _dropdownClass)
            .find("[data-value='" + _index + "']")
            .removeClass("SelectedItem");
    } else {
        dom.value += selectedValue + ",";
        $("." + _dropdownClass)
            .find("[data-value='" + _index + "']")
            .addClass("SelectedItem");
    }

    // console.log(dom.value.split(',').length);

    if (dom.value.split(",").length > 2) {
        $("." + _className + " .current-item:first span").text(
            dom.value.split(",").length - 1 + "مورد"
        );
    } else if (dom.value.split(",").length == 1) {
        $("." + _className + " .current-item:first span").text("پیش فرض");
    } else {
        $("." + _className + " .current-item:first span").text(
            $("." + _dropdownClass + " .SelectedItem").text()
        );
    }

    $("." + _className).trigger("click");
}

$(".showSelect").click(function (event) {
    event.stopPropagation();
});

$(".modal , body").click(function (e) {
    if ($(".searchFilter").is(e.target)) {
    } else {
        $(".searchFilter").val("");
        $(".showSelect").parent().find("li").css("display", "block");

        if (!$(e.target).hasClass("current-item")) {
            if (!$(e.target).hasClass("showSelect")) {
                $(".showSelect").siblings().css("display", "none");
                $(".showSelect .imgexp").removeClass("img-collapsed");
            }
        } else {
        }
    }

    // $(".showSelect .imgexp").addClass("img-collapse");
    $(".showSelect").parent().removeClass("select-active");
});

function ShowAddForm() {
    document.getElementById("sendRecord").removeAttribute("disabled");
    $("#dnsrecodsmodalAll #recordmanagementtitle").html("افزودن رکوردهای DNS");
    $("#geoswitchbox").addClass("d-none");
    $("#sendRecord").html("افزودن رکورد");
    $("#sendRecord").attr("onclick", "AddDNSRecord()");
    $("#disabled-recordtype").remove();
    $("#Optionsrecord1").attr("id", "Optionsrecord");
    $("#editrecord").modal("show");
    setTimeout(() => {
        $(".scroll-fix-height").css({
            position: "absolute", // Optional if #dataCenteroption is already absolute
            visibility: "hidden",
            display: "block",
        });
        setTimeout(() => {
            $(".scroll-fix-height").attr("style", "display: none");
        }, 300);
    }, 200);
    $("#txtip").val("");
    $("#txtname").val("");
    if ($("#showrecordtype .current-item").data("value") == undefined) {
        $("#add-ttl-record-label").addClass("d-none");
        $("#add-ttl-record").addClass("d-none");
    }
    $('#editrecord input[type="text"]').val("");
    $(".error-field-wrap span").html("");
    $("#showttl .current-item").text("اتوماتیک");
    $("#showttl .current-item").attr("data-value", "0");
    $("#showptl .current-item").text("TCP");
    $("#showptl .current-item").attr("data-value", "TCP");
    $(".proxy-switch").removeAttr("checked");
    $("#geostatus").removeAttr("checked");
    geoStatusChecker();
    $(".errorIp span").html("");
    $(".errorWeight span").html("");
    $(".errorCountry span").html("");
    $(".alltypes").css("display", "none");
    $("#add-ttl-record-label").addClass("d-none");
    $("#add-ttl-record").addClass("d-none");
    $("#showrecordtype").find(".current-item").text("نوع رکورد");

    $("#proxystatus-a").click(protocolCheckerer);

    $(".ttllist li").removeClass("SelectedItem");
}

$("#recordlist").on("click", "li", function () {
    $(".alltypes").css("display", "none");
    $("#" + $(this).find("span").text().trim().toLowerCase()).css(
        "display",
        "block"
    );
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
});

function editrecord(_recordtype, _id) {
    $("#recordmanagementtitle").html("ویرایش رکوردهای DNS");
    $("#disabled-recordtype").remove();
    $("#geoswitchbox").removeClass("d-none");
    $("#sendRecord").html("ویرایش رکورد");
    $("#sendRecord").attr(
        "onclick",
        "editDnsRecord('" + _recordtype + "','" + _id + "')"
    );
    $("#add-record-select").prepend(
        '<div id="disabled-recordtype" style="position: absolute;width: 100%;height: 40px;z-index: 1000;"></div>'
    );
    $("#editrecord").modal("show");
    $("#recordlist li").removeClass("SelectedItem");
    $('#recordlist li[data-value="' + _recordtype + '"]').addClass(
        "SelectedItem"
    );
    var supportValue = $('#recordlist li[data-value="' + _recordtype + '"]').attr(
        "data-value"
    );
    var supportItem = $('#recordlist li[data-value="' + _recordtype + '"]')
        .find("span")
        .text();
    $("#showrecordtype .current-item").text(supportItem);
    $("#showrecordtype .current-item").attr("data-value", supportValue);
    $(".alltypes").css("display", "none");
    $("#Optionsrecord").attr("id", "Optionsrecord1");
    $("#" + _recordtype.toLowerCase()).css("display", "block");
    var ttl = $("#record_ttl-" + _id).text();
    $("#ttllist li").removeClass("SelectedItem");
    $('#ttllist li span:contains("' + ttl + '")')
        .parent()
        .addClass("SelectedItem");
    var ttlvalue = $('#ttllist li span:contains("' + ttl + '")')
        .parent()
        .attr("data-value");
    $("#showttl .current-item").text(ttl);
    $("#showttl .current-item").attr("data-value", ttlvalue);
    $("#txtip").val(
        $("#record_content-" + _id)
            .html()
            .trim()
    );
    $("#txtname").val(
        $("#record_name-" + _id)
            .html()
            .trim()
    );
    if ($("#cloud_status-" + _id + " img").attr("cdn") == "true") {
        $("#proxystatus").prop("checked", 1);
    } else {
        $("#proxystatus").prop("checked", 0);
    }
    $(".proxy-switch").click(function () {
        if ($(this).is(":checked")) {
            $("#geostatus").removeAttr("checked");
            $("#geo-dns-record-card").addClass("d-none");
            $("#editrecord").removeClass("modal-scroll");

            $("#add-ttl-record").prepend(
                '<div id="disabled-recordtype-ttl" style="position: absolute;width: 100%;height: 40px;z-index: 9;top: 15px;"></div>'
            );
            $("#showttl .current-item").text("اتوماتیک");
            $("#showttl .current-item").attr("data-value", "0");

            $("#protocol-list-a").removeClass("d-none"); // new
            protocolCheckerer();
        } else {
            $("#showttl .current-item").text(ttl);
            $("#showttl .current-item").attr("data-value", ttlvalue);
            $("#disabled-recordtype-ttl").remove();

            $("#protocol-list-a").addClass("d-none"); // new
            $("#protocol-port-a").addClass("d-none"); // new
            protocolCheckerer();
        }
    });

    // protocolCheckerer();
}

$(document).on("click", ".accordion .accordion-button", function (e) {
    if (e.target.className == "sublink") {
        return;
    } else {
        var paneldestination = $(this).attr("sdata-bs-target");
        $(paneldestination).collapse("toggle");
        $(this).toggleClass("active");
    }
});
// Accardion menu mobile
$("body").click(function () {
    if ($(".fnlist").hasClass("active")) {
        $(".fnlist").removeClass("active");
    }
});

$(".accordion-item").on("click", ".fnlist-options", function (e) {
    e.stopPropagation();
    var all = $(".fnlist");
    // all.removeClass("active");
    if (all.hasClass("active")) {
        all.removeClass("active");
        // console.log(1111)
    } else {
        all.removeClass("active");
        $(this).parent().find(".fnlist").addClass("active");
    }
});

$(".fnlist li").click(function () {
    $(this).parent().removeClass("active");
});

//Channel Modal Switch
$("#safeLink-switch").click(function () {
    if ($("#safeLink-switch").is(":checked")) {
        $(".safeKeyInput").removeClass("d-none");
        $(".limitIpField").removeClass("d-none");
    } else {
        $(".safeKeyInput").addClass("d-none");
        $(".limitIpField").addClass("d-none");
    }
});

$("#ads-switch").click(function () {
    if ($("#ads-switch").is(":checked")) {
        $(".adsOpField").removeClass("d-none");
    } else {
        $(".adsOpField").addClass("d-none");
    }
    scrollLag();
});

function numberOnly(e) {
    var k = e.keyCode;
    if (k != 8 && k != 0 && (k < 48 || k > 57)) {
        return false;
    }
}

function DomainValidation(text) {
    var val = text;
    if (
        /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(val)
    ) {
        return true;
    } else {
        return false;
    }
}

var redirectDomain;

function SendToGetNSRecords() {
    setTimeout(() => {
        window.location.href = redirectDomain;
    }, 7000);
}

$(document).ready(function () {
    var current_fs, next_fs, previous_fs;
    var opacity;

    EnterKeyboard("txtdomain", "1", "1");

    $(".next").click(async function () {
        current_fs = $(this).parent().parent();
        next_fs = $(this).parent().parent().next();

        let index = $("fieldset").index(current_fs);

        if (index == 0) {
            // if (DomainValidation($("#txtdomain").val()) == false
            // // || !/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(document.getElementById('txtdomain').value)
            // ) {
            //     swalWithBootstrapButtons.fire({
            //         title: 'اخطار',
            //         html: 'دامنه وارد شده صحیح نیست!',
            //         //timer: 3000,
            //         icon: 'error',
            //         timerProgressBar: true,
            //         confirmButtonText: 'قبول',
            //         showCancelButton: false,
            //         cancelButtonText: 'خیر',
            //         didOpen: () => {
            //             timerInterval = setInterval(() => {
            //             }, 100)
            //         },
            //         willClose: () => {
            //             clearInterval(timerInterval)
            //         }
            //     }).then((result) => {
            //         $("#txtdomain").focus();
            //     });
            //     var al = $(".swal2-modal").html();
            //     $(".swal2-modal").html("");
            //     var nal = "<div id='sml'>" + al + "</div>";
            //     $(".swal2-modal").html(nal);
            //     $(".swal2-cancel").click(function () {
            //         swalWithBootstrapButtons.close();
            //     })
            //     $(".swal2-confirm").click(function () {
            //         swalWithBootstrapButtons.close();
            //     })

            //     return;
            // }

            if ($("#txtdomain").val() == "") {
                swalWithBootstrapButtons
                    .fire({
                        title: "اخطار",
                        html: "لطفا نام دامنه مورد نظر خود را وارد کنید !",
                        //timer: 3000,
                        icon: "error",
                        timerProgressBar: true,
                        confirmButtonText: "قبول",
                        showCancelButton: true,
                        cancelButtonText: "خیر",
                        didOpen: () => {
                            timerInterval = setInterval(() => {
                            }, 100);
                        },
                        willClose: () => {
                            clearInterval(timerInterval);
                        },
                    })
                    .then((result) => {
                        $("#txtdomain").focus();
                    });
                var al = $(".swal2-modal").html();
                $(".swal2-modal").html("");
                var nal = "<div id='sml'>" + al + "</div>";
                $(".swal2-modal").html(nal);
                $(".swal2-cancel").click(function () {
                    swalWithBootstrapButtons.close();
                });
                $(".swal2-confirm").click(function () {
                    swalWithBootstrapButtons.close();
                });

                return;
            }

            document
                .getElementById("msform")
                .setAttribute("style", "background-image:none !important");
            changestate("1", "2");
        } else if (index == 1) {
            if (!$("#chacceptrules").is(":checked")) {
                swalWithBootstrapButtons
                    .fire({
                        title: "اخطار",
                        html: "تایید قوانین و شرایط الزامی است !",
                        //timer: 3000,
                        icon: "error",
                        timerProgressBar: true,
                        confirmButtonText: "قبول",
                        didOpen: () => {
                            timerInterval = setInterval(() => {
                            }, 100);
                        },
                        willClose: () => {
                            clearInterval(timerInterval);
                        },
                    })
                    .then((result) => {
                    });
                var al = $(".swal2-modal").html();
                $(".swal2-modal").html("");
                var nal = "<div id='sml'>" + al + "</div>";
                $(".swal2-modal").html(nal);
                $(".swal2-cancel").click(function () {
                    swalWithBootstrapButtons.close();
                });
                $(".swal2-confirm").click(function () {
                    swalWithBootstrapButtons.close();
                });
                return;
            }
            // function testAjax() {
            //     var domains=$("#txtdomain").val();
            //     $.ajax({
            //         data:{
            //             domain: domains,
            //           },
            //       url: "/submit/add-domain",
            //       success: function(data) {
            //         return data;
            //       }
            //     });
            //   }

            const domain = document.getElementById("txtdomain").value;
            let rBody = new FormData();
            rBody.append("domain", domain);
            document.querySelector(".lod").setAttribute("disabled", "disabled");
            document.querySelector(".lod").innerHTML = `
            <img class="pr-5" src="/general/loading/tail-spin.svg">
            `;
            document
                .querySelectorAll("#button.next")
                .forEach((btn) => btn.setAttribute("disabled", "disabled"));
            const response = await fetch("/submit/add-domain", {
                method: "POST",
                body: rBody,
            })
                .then((res) => res.json())
                .then((resj) => resj)
                .catch((ex) => window.location.reload());
            document
                .querySelectorAll("#button.next")
                .forEach((btn) => btn.removeAttribute("disabled", "disabled"));
            if (typeof response.redirectRoute === "undefined") {
                swalWithBootstrapButtons
                    .fire({
                        title: "اعلان",
                        html: response.message,
                        //timer: 3000,
                        icon: "error",
                        timerProgressBar: true,
                        confirmButtonText: "بستن",
                        didOpen: () => {
                            timerInterval = setInterval(() => {
                            }, 100);
                            document.querySelector("#previous").click();
                        },
                        willClose: () => {
                            clearInterval(timerInterval);
                        },
                    })
                    .then((result) => {
                    });
                var al = $(".swal2-modal").html();
                $(".swal2-modal").html("");
                var nal = "<div id='sml'>" + al + "</div>";
                $(".swal2-modal").html(nal);
                $(".swal2-cancel").click(function () {
                    swalWithBootstrapButtons.close();
                });
                $(".swal2-confirm").click(function () {
                    swalWithBootstrapButtons.close();
                });
                document.querySelector(".lod").removeAttribute("disabled");
                document.querySelector(".lod").innerHTML = `
               ادامه
                `;
                return;
            }
            document.querySelector(".lod").removeAttribute("disabled");
            document.querySelector(".lod").innerHTML = `
           ادامه
            `;
            redirectDomain = response.redirectRoute;
            document.getElementById("nameserver1").value = response.ns.ns1;
            document.getElementById("nameserver2").value = response.ns.ns2;
            document.getElementById("nameserverrold1").value = response.ons.ons1;
            document.getElementById("nameserverold2").value = response.ons.ons2;
            document
                .getElementById("msform")
                .setAttribute("style", "background-image:none !important");
            changestate("2", "3");
        } else if (index == 2) {
            swalWithBootstrapButtons.fire({
                title: "اعلان",
                html: "دامنه شما با موفقیت ثبت شد",
                //timer: 3000,
                icon: "error",
                timerProgressBar: true,
                confirmButtonText: "ادامه",
                didOpen: () => {
                    timerInterval = setInterval(() => {
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                },
            });
            var al = $(".swal2-modal").html();
            $(".swal2-modal").html("");
            var nal = "<div id='sml'>" + al + "</div>";
            $(".swal2-modal").html(nal);
            $(".swal2-confirm").click(function () {
                // window.location.href = '#';
                swalWithBootstrapButtons.close();
                SendToGetNSRecords();
            });
        }

        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate(
            {opacity: 0},
            {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        display: "none",
                        position: "relative",
                    });
                    next_fs.css({opacity: opacity});
                },
                //duration: 600
            }
        );
    });

    function EnterKeyboard(_inputid, _buttonid, _index = null) {
        $("#" + _inputid).keypress(function (e) {
            var key = e.which;
            if (key == 13) {
                if (_index != null) {
                    $("[step=" + _index + "]").trigger("click");
                } else {
                    $("#" + _buttonid).trigger("click");
                }
            }
        });
    }

    $(".previous").click(function () {
        current_fs = $(this).parent().parent();
        previous_fs = $(this).parent().parent().prev();

        //Remove class active
        $("#progressbar li")
            .eq($("fieldset").index(current_fs))
            .removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate(
            {opacity: 0},
            {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        display: "none",
                        position: "relative",
                    });
                    previous_fs.css({opacity: opacity});
                },
                //duration: 600
            }
        );
    });

    $(".radio-group .radio").click(function () {
        $(this).parent().find(".radio").removeClass("selected");
        $(this).addClass("selected");
    });

    $(".submit").click(function () {
        return false;
    });
});

function changestate(currentid, nextlevel) {
    $("#step" + currentid).attr(
        "src",
        "/general/images/new/ico_wizard_finish.svg"
    );
    $("#step" + currentid).removeClass();
    $("#step" + currentid).addClass("formwizard-img-completed");
    $("#step" + nextlevel).attr("src", "/general/images/new/ico_wizard_step.svg");
    $("#step" + nextlevel).removeClass();
    $("#step" + nextlevel).addClass("formwizard-img-inprogress");
}

function changetoBack(currentid, previouslevel) {
    if (previouslevel == 1) {
        document.getElementById("msform").removeAttribute("style");
    }
    $("#step" + currentid).attr(
        "src",
        "/general/images/new/ico_wizard_circle.svg"
    );
    $("#step" + currentid).removeClass();
    $("#step" + currentid).addClass("formwizard-img-non");

    $("#step" + previouslevel).attr(
        "src",
        "/general/images/new/ico_wizard_step.svg"
    );
    $("#step" + previouslevel).removeClass();
    $("#step" + previouslevel).addClass("formwizard-img-inprogress");
}

function CopyDiv(nameservers) {
    var elem = document.getElementById(nameservers);
    var textToCopy = elem.innerText.trim();
    var myTemporaryInputElement = document.createElement("input");
    myTemporaryInputElement.type = "text";
    myTemporaryInputElement.value = textToCopy;

    document.body.appendChild(myTemporaryInputElement);

    myTemporaryInputElement.select();
    document.execCommand("Copy");
    ShowSuccessAlert("مورد درخواستی در حافظه کپی شد", 3000);
    document.body.removeChild(myTemporaryInputElement);
}

function CopyTxt(text) {
    var textToCopy = text;
    var myTemporaryInputElement = document.createElement("input");
    myTemporaryInputElement.type = "text";
    myTemporaryInputElement.value = textToCopy;

    document.body.appendChild(myTemporaryInputElement);

    myTemporaryInputElement.select();
    document.execCommand("Copy");
    ShowSuccessAlert("نیم سرور مورد نظر در حافظه کپی شد", 3000);
    document.body.removeChild(myTemporaryInputElement);
}

function CopyNameserver(nameservers) {
    var copyText = document.getElementById(nameservers);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    ShowSuccessAlert("نیم سرور  مورد نظر در حافظه کپی شد", 3000);
}

function CopyTextbox(nameservers) {
    var elem = document.getElementById(nameservers);
    var textToCopy = elem.innerText;
    var myTemporaryInputElement = document.createElement("input");
    myTemporaryInputElement.type = "text";
    myTemporaryInputElement.value = textToCopy;

    document.body.appendChild(myTemporaryInputElement);

    myTemporaryInputElement.select();
    document.execCommand("Copy");
    document.body.removeChild(myTemporaryInputElement);
    ShowSuccessAlert("مورد درخواستی شما کپی شد ", 3000);
}

function CopyDataDiv(id) {
    const cb = navigator.clipboard;
    const paragraph = document.getElementById(id).getAttribute('data-value');
    cb.writeText(paragraph).then(() => ShowSuccessAlert("متن در حافظه کپی شد", 3000));
}


function ShowSuccessAlert(message, time) {
    showAlert("success", message);
}


function checkAudioOptions() {
    if ($('#output-manual').is(":checked")) {
        $('.output-manual-wrap').show();
    } else {
        $('.output-manual-wrap').hide();
    }

    if ($('#output-profile').is(":checked")) {
        $('.output-profile-wrap').show();
    } else {
        $('.output-profile-wrap').hide();
    }
}

function checkWatermark() {
    if ($('#watermark-switch').is(':checked')) {
        $('.watermark-row').removeClass('disable-box');
    } else {
        $('.watermark-row').addClass('disable-box');
    }
}

$('#watermark-switch').click(function () {
    checkWatermark();
});


$('.pager-pagination').on('click', '.page-link', function () {
    $('html, body').animate({
        scrollTop: $("#records_table").offset().top
    }, 'slow');
})


// function showalert() {

//     $("#dvalert").fadeIn(400);
//     var bar = new ProgressBar.Circle('.progressloader', {
//         strokeWidth: 10,
//         easing: 'easeInOut',
//         duration: 5000,
//         color: '#59C2E2',
//         trailColor: '#eee',
//         trailWidth: 1,
//         svgStyle: null,
//     });

//     bar.animate(1.0);
//     setTimeout(function () {
//         $("#dvalert").fadeOut(400);

//     }, 5000);

// }

// function showAlert(status = 'success', text = '', key = '') {
//     console.log('main alert');
//     if(document.getElementById('dvalert').classList.contains('alert-border-success')) {
//         document.getElementById('dvalert').classList.remove('alert-border-success')
//     }
//     if (document.getElementById('dvalert').classList.contains('alert-border-danger')) {
//         document.getElementById('dvalert').classList.remove('alert-border-danger')
//     }
//     if (status === 'success'){
//         $("#dvalert").addClass("alert-border-success");
//         document.getElementById("img").setAttribute(`src`, `/general/images/root/alerts/img_success-8.png`);
//         $("#alert-stat").text('تبریک !');
//     }
//     else {
//         document.getElementById("img").setAttribute(`src`, `/general/images/root/alerts/img_error-8.png`);
//         $("#dvalert").addClass("alert-border-danger");
//         $("#alert-stat").text('خطا !');
//     }

//     document.getElementById('popop').innerHTML = text;
//     document.getElementById('popopki').innerHTML = key;
//     $("#dvalert").fadeOut(0);
//     $(".progressloader").html('');

//     $("#dvalert").fadeIn(400);
//     // var bar = new ProgressBar.Circle('.progressloader', {
//     //     strokeWidth: 10,
//     //     easing: 'easeInOut',
//     //     duration: 5000,
//     //     color: '#59C2E2',
//     //     trailColor: '#eee',
//     //     trailWidth: 1,
//     //     svgStyle: null,
//     // });

//     // bar.animate(1.0);
//     setTimeout(function () {
//         $("#dvalert").fadeOut(400);
//         // $(".progressloader").html('');

//     }, 5000);

// }

function showAlert(status = "success", text = "", key = "") {
    $("#dvalert-wrap")
        .prepend(`<div class="login-alert shadow-sm animated animatedFadeInUp fadeInUp ${
            status === "success" ? "success-alert" : "error-alert"
        }">
    <span class="close-alert" id="close-alert"><img class="p-3" src="/general/images/root/ico_menu_close.svg"></span>

        <img id="img" class="img-alert" src="${
            status === "success"
                ? "/general/images/root/alerts/img_success-8.png"
                : "/general/images/root/alerts/img_error-8.png"
        }" />
        <p class="alert-cont">
        <span id="alert-stat">${
            status === "success" ? "موفق !" : "خطا !"
        }</span>
        <span id="popop" class="fs-13" style="word-spacing:-1px;">${text}
        </span>
        </p>
        <span id="popopki" class="fs-13 alert-command">${key}
        </span>
    </div>`);
    // $("#dvalert-wrap .login-alert").fadeOut(0);
    // $(".progressloader").html("");
    $("#dvalert-wrap .login-alert").fadeIn(200);

    document.querySelectorAll(".login-alert").forEach((alert) => {
        setTimeout(function () {
            $(alert).fadeOut(200);
            $(alert).remove();
        }, 5000);
    });

    document.querySelectorAll(".close-alert").forEach((item) => {
        item.addEventListener("click", function () {
            item.parentElement.style.display = "none";
            item.parentElement.remove();
        });
    });
}

function showsuccess() {
    $("#dvsuccess").fadeIn(400);
    var bar = new ProgressBar.Circle(".progressloader2", {
        strokeWidth: 10,
        easing: "easeInOut",
        duration: 5000,
        color: "#59C2E2",
        trailColor: "#eee",
        trailWidth: 1,
        svgStyle: null,
    });

    bar.animate(1.0);
    setTimeout(function () {
        $("#dvsuccess").fadeOut(400);
    }, 5000);
}

async function RequestdeletensRecord(_domainname, _recordid, _rowid) {
    let mData = new FormData();
    mData.append("domain", _domainname);
    mData.append("id", _recordid);
    const answer = await fetch("/submit/dns/delete-record", {
        method: "POST",
        body: mData,
    })
        .then((response) => response.json())
        .then((json) => (result = json))
        .catch((ex) => window.location.reload());
    if ((answer.status = "success")) {
        // showAlert('success', 'رکورد مدنظرتان حذف شد');
        showAlert(answer.status, answer.message);
        $("#" + _rowid).slideUp(function () {
            $("#" + _rowid).remove();
        });
    } else {
        showAlert("err", "امکان حذف رکوردتان نمی باشد");
    }
    return answer;
}

async function RequestUpdateRecords(domain, domainid, recid, status) {
    let mData = new FormData();
    mData.append("domain", domain);
    mData.append("domainid", domainid);
    mData.append("recordid", recid);
    mData.append("status", status);
    const answer = await fetch("/submit/dns/change-cloud-status", {
        method: "POST",
        body: mData,
    })
        .then((response) => response.json())
        .then((json) => (result = json))
        .catch((ex) => window.location.reload());
    if (answer.status == "success") {
        console.log("fetcher show success");
        $("#fetcher-" + recid).remove();
    } else {
        console.log("fetcher show error");
        $("#fetcher-" + recid).remove();
    }
    showAlert(answer.status, answer.message);
    return answer.status;
}

$(".select-wrap").each(function () {
    var selectNum = $(".select-wrap");
    $(this).css("z-index", selectNum.length - selectNum.index($(this)));
});

function searchFiletr(ListClassName) {
    var search_value = $("." + ListClassName)
        .parents(".support-field-wrap")
        .find(".searchFilter")
        .val()
        .toLowerCase();

    $("." + ListClassName + " li").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(search_value) > -1);
    });
}

async function openWebsiteClusterAssign(
    self,
    currentdid,
    dcid,
    wname,
    domainName
) {
    // $("body").prepend('<div class="three-dots-loading " id="fetcher"></div>');
    document.getElementById('cluster-asign-loading').classList.remove('d-none');
    document.getElementById("cluster-site-div").classList.add("d-none");
    document.getElementById("cluster-site-div-buttons").classList.add("d-none");
    document.getElementById("empty-cluster-site-div").classList.add("d-none");
    console.log(currentdid, dcid, wname, domainName);
    var answer = await CheckWebsitehasCluster(currentdid, dcid);
    if (answer.status == "success") {
        currentCluster = await getCurrentCluster(dcid);
        if (currentCluster.status == "success") {
            document.querySelectorAll("#sitename").forEach((el) => {
                el.setAttribute("value", $website);
                el.setAttribute("placeholder", $website);
            });
            let currentItemName = currentCluster.clustername;
            var mytemplates = generateClusterOfWebsitesCurrent(
                answer,
                $website,
                currentItemName,
                currentCluster.data[0].cw_cl_id_fk
            );
            document.getElementById("cluster-site-div").innerHTML = mytemplates;
            document.getElementById("cluster-site-div").classList.remove("d-none");
            document
                .getElementById("cluster-site-div-buttons")
                .classList.remove("d-none");
        } else {
            document.querySelectorAll("#sitename").forEach((el) => {
                el.setAttribute("value", $website);
                el.setAttribute("placeholder", $website);
            });
            var mytemplates = generateClusterOfWebsites(answer, $website);
            document.getElementById("cluster-site-div").innerHTML = mytemplates;
            document.getElementById("cluster-site-div").classList.remove("d-none");
            document
                .getElementById("cluster-site-div-buttons")
                .classList.remove("d-none");
        }
        $("#openClustertoWebsiteModalID").modal("show");
        $(".scrollbar-outer").scrollbar();
        setTimeout(() => {
            $(".scroll-fix-height").css({
                position: "absolute", // Optional if #dataCenteroption is already absolute
                visibility: "hidden",
                display: "block",
            });
            setTimeout(() => {
                optionHeight = $(".scroll-fix-height").height();
                console.log(optionHeight);
                $(".scroll-fix-height").attr("style", "display: none");
            }, 300);
        }, 200);
        const real_sitename =
            $website === $domain ? $domain : $website + "." + $domain;
        document.querySelectorAll("#sitename").forEach((el) => {
            el.setAttribute("value", real_sitename);
            el.setAttribute("placeholder", real_sitename);
        });
        // $("#fetcher").remove();
        document.getElementById('cluster-asign-loading').classList.add('d-none');

    } else {
        swalWithBootstrapButtons
            .fire({
                title: "اخطار",
                html: "شما کلاستری در این دامنه ندارید !",
                //timer: 3000,
                icon: "error",
                timerProgressBar: true,
                confirmButtonText: "قبول",
                showCancelButton: false,
                cancelButtonText: "خیر",
                didOpen: () => {
                    timerInterval = setInterval(() => {
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                },
            })
            .then((result) => {
            });
        var al = $(".swal2-modal").html();
        $(".swal2-modal").html("");
        var nal = "<div id='sml'>" + al + "</div>";
        $(".swal2-modal").html(nal);
        $(".swal2-cancel").click(function () {
            swalWithBootstrapButtons.close();
        });
        $(".swal2-confirm").click(function () {
            swalWithBootstrapButtons.close();
        });
        // $("#fetcher").remove();
        document.getElementById('cluster-asign-loading').classList.add('d-none');

    }
}

async function CheckWebsitehasCluster(domain, websiteid) {
    let mData = new FormData();
    mData.append("domainid", domain);
    mData.append("countofrecord", 15);
    const answer = await fetch("/submit/cluster/check-cluster-exist", {
        method: "POST",
        body: mData,
    })
        .then((response) => response.json())
        .then((json) => (result = json))
        .catch((ex) => window.location.reload());
    return answer;
}

async function getCurrentCluster(websiteid) {
    let mData = new FormData();
    mData.append("websiteid", websiteid);
    const answer = await fetch("/submit/cluster/get-current-website-cluster", {
        method: "POST",
        body: mData,
    })
        .then((response) => response.json())
        .then((json) => (result = json))
        .catch((ex) => window.location.reload());
    console.log(answer);
    return answer;
}

function generateClusterOfWebsites(allitems, websitename) {
    let clustersss = allitems["data"];
    let clusterlis = "";
    let firstitem = clustersss[0]["name"];
    let firstid = clustersss[0]["id"];
    for (let i = 0; i < clustersss.length; i++) {
        clusterlis += `
       <li onclick="customDropdown('openClusterToWebsiteList', 'website-ClusterList','${clustersss[i]["name"]}','${clustersss[i]["id"]}')" 
       class="support-item fs-13 mb-1 py-1 px-3 rounded-pill" data-value="${clustersss[i]["id"]}">
             <span>${clustersss[i]["name"]}</span>
       </li>
       `;
    }
    var clustewebsitemodaltemplate = `
    <div class="addrecordform fs-15 fw-400">آدرس سایت :</div>
    <input type="text" id="sitename" disabled="disabled" class="addrecordform border rounded-pill text-start fs-13 text-gray-400 bg-white ws-10 border-c-light-300 border-1 py-2 px-4 ltr tl w-100" placeholder="${
        $website + "." + $domain
    }">
    <input type="hidden" disabled="disabled" id="hidden-input-cluster-id">
    <div id="cluster-name-Err" class="error-field-wrap fs-13 fw-400 ws-15 ls-02 text-red-400 text-right mt-1"></div>
    <div class="select-dp-wrap">
       <div class="fs-15 fw-400 ws-1 addrecordform">نام کلاستر :</div>
       <div class="fs-13 fw-500 mt-3">
             <div class="position-relative" style="height: 40px;">
                <div class="position-absolute select-wrap">
                   <div id="dp" class="support-field-wrap position-relative border-c-1-fu line-h-1-5 ws-10 border-c-light-300 border-1" style="user-select: none; cursor: pointer;">
                         <div id="openClusterToWebsiteList" class="openClusterToWebsiteList showSelect ps-3 pe-3" 
                         onclick="customSelect('openClusterToWebsiteList' , 'website-ClusterList')" style="padding: 6.5px 0">
                            <span class="current-item fs-14 text-lowercase" data-value="${firstid}">${firstitem}</span>
                            <img class="imgexp img-collapse" src="/general/images/root/ico_arrow_down_disabled.svg" />
                         </div>
                         <div id="openClusterToWebsite" class="scroll-fix-height" style="display:none;">
                         <div class="scrollbar-dynamic direction-ltr-scroll-custom" style="padding: 0 13px 0 16px;;">
                         <div class="page-content">
                             <div class="content">
                                 <div class="demo pb-3" style="padding-right:38px;">
                                     <div class="scrollbar-outer scroll-content scroll-scrolly_visible scroll-custom-top-0" style="direction: ltr; height: auto; margin-bottom: -17px; margin-right: 0px; max-height: 195px;" id="">
                            <ul class="website-ClusterList w-100 mb-0 list-unstyled" id="website-ClusterList">
                               ${clusterlis}
                            </ul>
                            </div>
                            </div>
                         </div>
                   </div>
                </div>
                         </div>
                   </div>
                </div>
             </div>
       </div>
    </div>
    `;

    return clustewebsitemodaltemplate;
}

function generateClusterOfWebsitesCurrent(
    allitems,
    websitename,
    currentCluster,
    currentClusterId
) {
    let clustersss = allitems["data"];
    let clusterlis = "";
    let firstitem = currentCluster;
    for (let i = 0; i < clustersss.length; i++) {
        clusterlis += `
       <li onclick="customDropdown('openClusterToWebsiteList', 'website-ClusterList','${clustersss[i]["name"]}','${clustersss[i]["id"]}')" 
       class="support-item fs-13 mb-1 py-1 px-3 rounded-pill" data-value="${clustersss[i]["id"]}">
             <span>${clustersss[i]["name"]}</span>
       </li>
       `;
    }
    console.log("fist item", firstitem);
    var clustewebsitemodaltemplate = `
    <div class="addrecordform  fs-15 fw-400">آدرس سایت :</div>
    <input type="text" id="sitename" disabled="disabled" class="addrecordform border rounded-pill text-start fs-13 text-gray-400 bg-white ws-10 border-c-light-300 border-1 py-2 px-4 ltr tl w-100" placeholder="${
        $website + "." + $domain
    }">
    <input type="hidden" disabled="disabled" id="hidden-input-cluster-id" data-value="${
        $website + "." + $domain
    }">
    <div id="cluster-name-Err" class="error-field-wrap fs-13 fw-400 ws-15 ls-02 text-red-400 text-right mt-1"></div>
    <div class="select-dp-wrap">
       <div class="fs-15 fw-400  ws-1 addrecordform">نام کلاستر :</div>
       <div class="fs-13 fw-500 mt-3">
             <div class="position-relative" style="height: 40px;">
                <div class="position-absolute select-wrap">
                   <div id="dp" class="support-field-wrap position-relative border-c-1-fu line-h-1-5 ws-10 border-c-light-300 border-1" style="user-select: none; cursor: pointer;">
                         <div id="openClusterToWebsiteList" class="openClusterToWebsiteList showSelect ps-3 pe-3" 
                         onclick="customSelect('openClusterToWebsiteList' , 'website-ClusterList')" style="padding: 6.5px 0">
                            <span class="current-item fs-14 text-lowercase" data-value="${currentClusterId}">${firstitem}</span>
                            <img class="imgexp img-collapse" src="/general/images/root/ico_arrow_down_disabled.svg" />
                         </div>
                         <div id="openClusterToWebsite" class="scroll-fix-height" style="display:none;">
                         <div class="scrollbar-dynamic direction-ltr-scroll-custom" style="padding: 0 13px 0 16px;">
                         <div class="page-content">
                             <div class="content">
                                 <div class="demo pb-3" style="padding-right:38px;">
                                     <div class="scrollbar-outer scroll-content scroll-scrolly_visible scroll-custom-top-0" style="direction: ltr; height: auto; margin-bottom: -17px; margin-right: 0px; max-height: 195px;" id="">
                            <ul class="website-ClusterList w-100 mb-0 list-unstyled" id="website-ClusterList">
                               ${clusterlis}
                            </ul>
                            </div>
                            </div>
                         </div>
                   </div>
                </div>
                         </div>
                   </div>
                </div>
             </div>
       </div>
    </div>
    `;

    return clustewebsitemodaltemplate;
}

async function openClustertoWebsite() {
    var clusterid = document
        .querySelector("#openClusterToWebsiteList .current-item")
        .getAttribute("data-value");
    document.getElementById("openClustertowebsite").innerHTML =
        '<img src="/general/loading/tail-spin.svg"/>';
    let answer = await AssignWebsiteToCluster(clusterid, $wid);
    if (answer.status == "success") {
        //    showAlert('success', 'کلاستر به وب سایتتان متصل شد');
        $("#openClustertoWebsiteModalID").modal("hide");
        document.querySelectorAll('img[src="/general/images/root/table/active.svg"]').forEach(el => el.setAttribute('src', '/general/images/root/table/danger.svg'));
        document.querySelectorAll('[data-action="unassign"]').forEach(el => el.classList.add('d-none'));
        document.querySelectorAll('[data-action="remove"]').forEach(el => el.classList.remove('d-none'));


        if ($(`#cluster-image-${clusterid}`))
            $(`#cluster-image-${clusterid}`).html(
                `<img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="فعال" src="/general/images/root/table/active.svg" alt="">`
            );
        if (document.getElementById(`remove-${clusterid}`))
            document.getElementById(`remove-${clusterid}`).classList.add("d-none");
        if (document.getElementById(`unassign-${clusterid}`))
            document
                .getElementById(`unassign-${clusterid}`)
                .classList.remove("d-none");
    } else {
        //    showAlert('error', answer.message);
    }
    showAlert(answer.status, answer.message);

    document.getElementById("openClustertowebsite").innerHTML = "اضافه کردن";
}

async function AssignWebsiteToCluster(clusterid, $wid) {
    let mData = new FormData();
    mData.append("clusterid", clusterid);
    mData.append("websiteid", $wid);
    const answer = await fetch("/submit/cluster/assign-cluster-to-website", {
        method: "POST",
        body: mData,
    })
        .then((response) => response.json())
        .then((json) => (result = json))
        .catch((ex) => window.location.reload());
    return answer;
}

function mockAlert(route) {
    const callback = () => (window.location.href = route);
    const msgType = "اخطار";
    const msgText = "ابتدا دامین و رکورد های خود را تنظیم کنید";
    mySWA(callback, msgType, msgText);
}

// function nullify() {
//     document.querySelectorAll('#foundmod input').forEach(e => e.value = '');
//     document.querySelectorAll('#foundmod input[type="checkbox"]').forEach(e => e.checked = false);

//     let i = 2
//     while (document.querySelector('#cdn-dns-row_'+i)){
//         document.getElementById('cdn-dns-row_'+i).classList.add('d-none');
//         document.querySelector("#cdn-dns-row_"+i+" .geo-weight input").textContent = "";
//         document.querySelector("#cdn-dns-row_"+i+" .geo-country .current-item").textContent = "انتخاب کشور";
//         document.querySelector("#cdn-dns-row_"+i+" .geo-country .current-item").removeAttribute("checked");
//         document.querySelector("#cdn-dns-row_"+i+" .geo-ip input").textContent = "";
//         let current_dom = document.getElementById('cdn-dns-row_'+i);
//         document.getElementById('cdn-dns-row_'+i).remove();
//         $(current_dom).insertBefore(".add-dns-row");
//         i++;
//     }

//     document.getElementById('geo-dns-record-card').classList.add('d-none');
//     document.getElementById('showdistribute').innerHTML =
//     `
//     <span class="current-item fs-14">خاموش</span>
//     <img class="imgexp img-collapse" src="/general/images/root/ico_arrow_down_disabled.svg">
//     `;
//     document.getElementById('showdistribute').innerHTML =
//     `
//     <span class="current-item fs-14">
//     خاموش
// </span>
// <img class="imgexp img-collapse" src="/general/images/root/ico_arrow_down_disabled.svg">
//     `;
//     document.getElementById('showreply').innerHTML =
//     `
//     <span class="current-item fs-14" data-value="automatic">تکی</span>
//     <img class="imgexp img-collapse" src="/general/images/root/ico_arrow_down_disabled.svg">
//     `;
// }

function urlStateShifter(D, d, W, w) {
    const domAttr = (id, value) => {
        document.getElementById(id).setAttribute("onclick", `Redir('${value}')`);
        document.getElementById(id).setAttribute("href", value);
    };
    const sample = `/cdn/${D}/${d}/${W}/${w}/`,
        method = "POST";

    domAttr("asideRdns", `/dns/${D}/${d}?w=${w}`);
    domAttr("clusterAside", `/cdn/${D}/${d}/cluster?w=${w}`);
    domAttr("asidecache", sample + "cache");
    domAttr("asideplans", sample + "plans");
    domAttr("asidessl", sample + "ssl");
    domAttr("asiderules", sample + "rules");
    domAttr("asideacceleration", sample + "acceleration");
    domAttr("asidefirewall", sample + "firewall");
    domAttr("asidewaf", sample + "waf");
    domAttr("asideddos", sample + "ddos");
    domAttr("asideddos2", sample + "ddos");
    domAttr("asidecp", sample + "custom-pages");
    domAttr("asideov", sample + "overview");

    let body = new FormData();
    body.append("D", D);
    body.append("d", d);
    body.append("W", W);
    body.append("w", w);
    fetch("/submit/uri-shifter", {method, body}).catch((ex) =>
        window.location.reload()
    );
}

function changeDnsRouting(D, d) {
    document
        .getElementById("asideRdns")
        .setAttribute("onclick", `Redir('/dns/${D}/${d})`);
    document.getElementById("asideRdns").setAttribute("href", `/dns/${D}/${d}`);
}

// scroll fix height

setTimeout(() => {
    $(".scroll-fix-height").css({
        position: "absolute", // Optional if #dataCenteroption is already absolute
        visibility: "hidden",
        display: "block",
    });
    setTimeout(() => {
        $(".scroll-fix-height").attr("style", "display: none");
    }, 300);
}, 200);

$(document).ready(function () {
    setTimeout(() => {
        $(".scroll-fix-height").css({
            position: "absolute", // Optional if #dataCenteroption is already absolute
            visibility: "hidden",
            display: "block",
        });
        setTimeout(() => {
            $(".scroll-fix-height").attr("style", "display: none");
        }, 300);
    }, 200);
});

document.querySelectorAll(".modal-opener").forEach((el) => {
    el.addEventListener("click", () => {
        setTimeout(() => {
            $(".scroll-fix-height").css({
                position: "absolute", // Optional if #dataCenteroption is already absolute
                visibility: "hidden",
                display: "block",
            });
            setTimeout(() => {
                $(".scroll-fix-height").attr("style", "display: none");
            }, 300);
        }, 200);
    });
});

$("body").click(function () {
    $(".apexcharts-menu").removeClass("apexcharts-menu-open");
});

$('a[data-bs-target="#newTicket"]').click(function () {
    setTimeout(() => {
        $(".scroll-fix-height").css({
            position: "absolute", // Optional if #dataCenteroption is already absolute
            visibility: "hidden",
            display: "block",
        });
        setTimeout(() => {
            $(".scroll-fix-height").attr("style", "display: none");
        }, 300);
    }, 200);
});

document
    .querySelectorAll('[data-bs-target="#newTicket"]')
    .forEach((el) => el.addEventListener("click", showTicketModal));

async function importServices_TicketModal() {
    if (document.querySelector("#serviceList li")) return;
    const htmls = await fetch("/htmls/support/tickets/get-services")
        .then((i) => i.text())
        .then((j) => j);
    document.getElementById("serviceList").innerHTML = htmls;
}

async function importDepartments_TicketModal() {
    if (document.querySelector("#supportList li")) return;
    const htmls = await fetch("/htmls/support/tickets/get-departments")
        .then((i) => i.text())
        .then((j) => j);
    document.getElementById("supportList").innerHTML = htmls;
}

function showTicketModal() {
    $("#newTicket").modal("show");
    importDepartments_TicketModal();
    importServices_TicketModal();
}


function scrollLag() {
    setTimeout(() => {
        $(".scroll-fix-height").css({
            position: "absolute", // Optional if #dataCenteroption is already absolute
            visibility: "hidden",
            display: "block",
        });
        setTimeout(() => {
            $(".scroll-fix-height").attr("style", "display: none");
        }, 300);
    }, 200);
}

$('.buttons button').click(function () {
    scrollLag();
});

$('[data-bs-toggle="modal"]').click(function () {
    scrollLag();
});