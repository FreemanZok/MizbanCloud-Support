const OSdom = document.querySelector("#showOpSystem .current-item");
document.getElementById("dp-opSystem").addEventListener("click", () => {
  oslister(OSdom.getAttribute("data-value"));
});
function oslister(mode) {
  if (
    mode != document.querySelector("#sparta .ak47")?.getAttribute("data-parent")
  ) {
    document.getElementById("showOpVersion").innerHTML = `
            <span class="current-item fs-14 pe-3" data-value="choose">
            انتخاب کنید
            </span>
            <img class="imgexp img-collapse" src="/general/images/root/ico_arrow_down_disabled.svg" />
        `;
  }
  document.querySelectorAll(".os-list-os").forEach((m) => {
    m.classList.add("d-none");
    m.classList.remove("ak47");

    if (m.getAttribute("data-parent") === mode) {
      m.classList.remove("d-none");
      m.classList.add("ak47");
    }
  });
}
function updateState(freeze = false) {
  if (freeze === true) {
    for (let i = 1; i < 5; i++)
      document.getElementById("dae" + i).setAttribute("disabled", "disabled");
    document.getElementById("cloud-os").click();
    document.getElementById("cloud-hard-ssd").click();
    document.getElementById("cloud-hard-sas").disabled = true;
    document.getElementById("cloud-hard-ssd").disabled = true;
    document.getElementById("cloud-hard-nvme").disabled = true;
    document
      .querySelectorAll(".free-not-allowed input")
      .forEach((el) => el.setAttribute("disabled", "disabled"));
    document.getElementById("dtctr").innerHTML =
      '<div id="dtc-disabled" class="disable-element disableitemsnapshot" style="width:100%;"></div>' +
      document.getElementById("dtctr").innerHTML;

    document.getElementById("ttlprc").innerHTML = 'رایگان';
    fplan = true;
  } else {
    for (let i = 1; i < 5; i++)
      document.getElementById("dae" + i).removeAttribute("disabled");

    document.getElementById("cloud-hard-sas").disabled = false;
    document.getElementById("cloud-hard-ssd").disabled = false;
    document.getElementById("cloud-hard-nvme").disabled = false;
    document
      .querySelectorAll(".free-not-allowed input")
      .forEach((el) => el.removeAttribute("disabled"));
    document.getElementById("dtc-disabled")?.remove();
    fplan = false;
  }
  document.getElementById("netShow").innerHTML =
    document.getElementById("dae4").value + " GB Traffic";
  document.getElementById("ssdShow").innerHTML =
    document.getElementById("dae2").value + " " + document.querySelector('#blocktype input[type=radio]:checked').value.toUpperCase() + " Storage";
  document.getElementById("ramShow").innerHTML =
    document.getElementById("dae3").value + " GB RAM";
  document.getElementById("cpuShow").innerHTML =
    document.getElementById("dae1").value == 0 ? "1 vCore" : + document.getElementById("dae1").value + " vCore";
  let vc = parseInt(document.getElementById("dae1").value ?? 1);
  if (vc > 2) {
    if (vc % 2 != 0) {
      document.getElementById("dae1").value = vc + 1;
    }
  }
  updatePricing();
  if (fplan)
    document.getElementById("ttlprc").innerHTML = 'رایگان' + ' &#160; 0';
}
document.getElementById("dae1").addEventListener("change", updateState);
document.getElementById("dae2").addEventListener("change", updateState);
document.getElementById("dae3").addEventListener("change", updateState);
document.getElementById("dae4").addEventListener("change", updateState);

function updatePricing() {
  const ramPrice =
    parseInt(
      price.filter(
        (item) => item.dp_category === "ram" && item.dp_type === "CloudServer"
      )[0]["dp_price"]
    ) * 720;
  const ssdPrice =
    parseInt(
      price.filter(
        (item) => item.dp_category === document.querySelector('#blocktype input[type=radio]:checked').value && item.dp_type === "CloudServer"
      )[0]["dp_price"]
    ) * 720;
  const cpuPrice =
    parseInt(
      price.filter(
        (item) => item.dp_category === "cpu" && item.dp_type === "CloudServer"
      )[0]["dp_price"]
    ) * 720;
  const netPrice = 0; //parseInt(price.filter(item => item.dp_category === "traffic" && item.dp_type === "CloudServer")[0]['dp_price']) ;
  const ipPrice = 0; //parseInt(price.filter(item => item.dp_category === "ip" && item.dp_type === "CloudServer")[0]['dp_price']) * 720;

  const ramTotal = document.getElementById("dae3").value * ramPrice;
  const ssdTotal = document.getElementById("dae2").value * ssdPrice;
  const cpuTotal = document.getElementById("dae1").value ?? 1 * cpuPrice;
  const netTotal = document.getElementById("dae4").value * netPrice;
  const totalPrice =
    parseInt(ramTotal) + parseInt(ssdTotal) + parseInt(cpuTotal) + 0 + 0;

  document.getElementById("ttlprc").innerHTML = totalPrice.toLocaleString(
    "en-US",
    { maximumFractionDigits: 2 }
  );
}

function venusPlan() {
  const cpu = 2,
    ram = 4,
    ssd = 50,
    net = 500;
  document.getElementById("dae1").value = cpu;
  document.getElementById("dae2").value = ssd;
  document.getElementById("dae3").value = ram;
  document.getElementById("dae4").value = net;
  $("#venus div").removeClass("widget-cloud-deactive");
  $(".activelabel").addClass("widget-cloud-deactive");
  $(".activelabel").removeClass("activelabel");
  $(".active_cloud_tab").removeClass("active_cloud_tab");

  $("#venus div").addClass("activelabel");

  $("#venus div").addClass("active_cloud_tab");
  $(".slider").WBslider();
  updateState();
}

function uranusPlan() {
  const cpu = 4,
    ram = 8,
    ssd = 100,
    net = 500;
  document.getElementById("dae1").value = cpu;
  document.getElementById("dae2").value = ssd;
  document.getElementById("dae3").value = ram;
  document.getElementById("dae4").value = net;

  $("#uranus div").removeClass("widget-cloud-deactive");
  $(".activelabel").addClass("widget-cloud-deactive");
  $(".activelabel").removeClass("activelabel");
  $("#uranus div").addClass("activelabel");
  $(".active_cloud_tab").removeClass("active_cloud_tab");

  $("#uranus div").addClass("active_cloud_tab");
  $(".slider").WBslider();
  updateState();
}

function TestPlan() {
  const cpu = 1,
    ram = 1,
    ssd = 25,
    net = 500;
  document.getElementById("dae1").value = cpu;
  document.getElementById("dae2").value = ssd;
  document.getElementById("dae3").value = ram;
  document.getElementById("dae4").value = net;

  $("#testplan div").removeClass("widget-cloud-deactive");
  $(".activelabel").addClass("widget-cloud-deactive");
  $(".activelabel").removeClass("activelabel");
  $("#testplan div").addClass("activelabel");
  $(".active_cloud_tab").removeClass("active_cloud_tab");

  $("#testplan div").addClass("active_cloud_tab");
  $(".slider").WBslider();
  updateState(true);
}
function ExtremePlan() {
  const cpu = 16,
    ram = 32,
    ssd = 200,
    net = 500;
  document.getElementById("dae1").value = cpu;
  document.getElementById("dae2").value = ssd;
  document.getElementById("dae3").value = ram;
  document.getElementById("dae4").value = net;
  updateState();
  $("#extreme div").removeClass("widget-cloud-deactive");
  $(".activelabel").addClass("widget-cloud-deactive");
  $(".activelabel").removeClass("activelabel");
  $("#extreme div").addClass("activelabel");
  $(".active_cloud_tab").removeClass("active_cloud_tab");

  $("#extreme div").addClass("active_cloud_tab");

  $(".slider").WBslider();
}
function neptonPlan() {
  const cpu = 1,
    ram = 1,
    ssd = 25,
    net = 500;
  document.getElementById("dae1").value = cpu;
  document.getElementById("dae2").value = ssd;
  document.getElementById("dae3").value = ram;
  document.getElementById("dae4").value = net;
  $("#nepton div").removeClass("widget-cloud-deactive");
  $(".activelabel").addClass("widget-cloud-deactive");
  $(".activelabel").removeClass("activelabel");
  $(".active_cloud_tab").removeClass("active_cloud_tab");

  $("#nepton div").addClass("activelabel");
  $("#nepton div").addClass("active_cloud_tab");
  console.log("3334444", document.getElementById("dae3").value, ram);
  $(".slider").WBslider();
  updateState();
}

updateState();

async function sshds(dsid) {
  const method = "POST",
    address = "/submit/idc/ssh-and-firewall";
  idc = document
    .querySelector("#showDataCenter .current-item")
    .getAttribute("data-value");
  let body = new FormData();
  body.append("idc", dsid);
  const result = await fetch(address, { method, body })
    .then((r) => r.json())
    .then((j) => j)
    .catch((ex) => window.location.reload());
  console.table(result);
  result.firewall.forEach((fw) => console.log(fw));
  document.getElementById("keypasslist").innerHTML = "";
  result.ssh.forEach((key) => {
    document.getElementById("keypasslist").innerHTML += `

        <li 
         onclick="customDropdown('showkeypass' , 'keypasslist','${key.name}','${key.Keyid}')"
         class="select-item fs-13 py-1 px-1 rounded-pill" data-value="${key.Keyid}">
            <span>${key.name}</span>
        </li>

        `;
  });

  document.getElementById("clSnapshotlist").innerHTML = "";
  result.snaps.forEach((sn) => {
    document.getElementById("clSnapshotlist").innerHTML += `

        <li 
         onclick="customDropdown('showClSnapshot' , 'clSnapshotlist','${sn.VolumeName}','${sn.VolumeID}')"
         class="select-item fs-13 py-1 px-1 rounded-pill" data-value="${sn.VolumeID}">
            <span>${sn.VolumeName}</span>
        </li>

        `;
  });

  document.getElementById("clFirelist").innerHTML = "";
  result.firewall.forEach((fw) => {
    document.getElementById("clFirelist").innerHTML += `

        <li 
        onclick="customDropdownMulti('showclFire' , 'clFirelist','${fw.name}','${fw.id}')"
        class="select-item fs-13 py-1 px-1 rounded-pill" data-value="${fw.id}">
            <span>
            ${fw.name} 
            </span>
        </li>

        `;
  });

  // document.getElementById('clSnapshotlist').innerHTML = '';
  // result.snaps.forEach(snap => {
  //     document.getElementById('clSnapshotlist').innerHTML = `
  //     <li
  //     onclick="customDropdownMulti('showclFire' , 'clFirelist','${snap.name}','${snap.id}')"
  //     class="select-item fs-13 py-1 px-1 rounded-pill" data-value="${snap.id}">
  //         <span>
  //         ${snap.name}
  //         </span>
  //     </li>
  //     `;
  // });

  document.getElementById("showclFire").innerHTML = `
    <span class="current-item fs-14" data-value="">
    <img src="/general/images/cloud/ic_firewall.svg" alt="">
    <span>انتخاب کنید</span>
    <input id="selectedGroup" type="hidden" class="d-none">
    </span>
    <img class="imgexp img-collapse" src="/general/images/root/ico_arrow_down_disabled.svg" />
    `;
  $("#clFirelist li:first").trigger("click");
}

function readConfig() {
  let idc, os, cpu, ram, ssd, net, ssh, firewall, protocol, name, snapshot;
  idc = document
    .querySelector("#showDataCenter .current-item")
    .getAttribute("data-value");
  os = document
    .querySelector("#showOpVersion .current-item")
    .getAttribute("data-value");
  protocol = document
    .querySelector("#showClProtocol .current-item")
    .getAttribute("data-value");
  name = document.getElementById("nameInput").value;
  cpu = document.getElementById("dae1").value;
  ssd = document.getElementById("dae2").value;
  ram = document.getElementById("dae3").value;
  net = document.getElementById("dae4").value;
  snapshot = document.getElementById("issnapshot").value;
  snapshotid = document
    .querySelector("#showClSnapshot .current-item")
    .getAttribute("data-value");

  if (document.getElementById("cloud-password").checked) ssh = "0";
  else
    ssh = document
      .querySelector("#showkeypass .current-item")
      .getAttribute("data-value");
  firewall = document.querySelector("#showclFire .current-item input").value;
  return {
    idc,
    os,
    cpu,
    ram,
    ssd,
    net,
    ssh,
    name,
    protocol,
    firewall,
    snapshot,
    snapshotid,
  };
}

function errorStateOnField(field, bool = false) {
  bool
    ? document.getElementById(field).classList.add("alert-danger-border")
    : document.getElementById(field).classList.remove("alert-danger-border");
}

function resetErrorStatesOnFields() {
  const nodes = [
    "dp-dataCenter",
    "dp-opSystem",
    "dp-opVersion",
    "dp-keypass",
    "nameInput",
    "dp-clprotocol",
    "dp-clFire",
  ];
  document.getElementById("serverNameErr").classList.add("d-none");
  nodes.forEach((node) => errorStateOnField(node, false));
}

function validateConfig(config) {
  let flag = true;
  resetErrorStatesOnFields();

  if (!config.idc) {
    errorStateOnField("dp-dataCenter", true);
    flag = false;
  }
  if (config.os === "choose") {
    errorStateOnField("dp-opSystem", true);
    errorStateOnField("dp-opVersion", true);
    flag = false;
  }
  if (!config.ssh) {
    errorStateOnField("dp-keypass", true);
    flag = false;
  }
  if (
    !config.name ||
    !/^[A-z0-9\.]+$/.test(config.name) ||
    config.name.includes("\\") ||
    config.name.includes("^")
  ) {
    errorStateOnField("nameInput", true);
    document.getElementById("serverNameErr").classList.remove("d-none");
    flag = false;
  }
  if (!config.protocol) {
    errorStateOnField("dp-clprotocol", true);
    flag = false;
  }
  if (
    config.firewall === "" ||
    config.firewall === "," ||
    config.firewall === ",,"
  ) {
    errorStateOnField("dp-clFire", true);
    flag = false;
  }

  return flag;
}

async function makeServer(balance) {
  if (!fplan) {
    var pr = $("#ttlprc").html().replace(",", "");
    var needed = pr / 2;
    if (balance < needed) {
      swalWithBootstrapButtons.fire({
        title: "اخطار",
        html: "حداقل اعتبار مورد نیاز برای خرید سرور " + needed + "ریال است",
        //timer: 3000,
        icon: "error",
        timerProgressBar: true,
        confirmButtonText: "تایید",
        didOpen: () => {
          timerInterval = setInterval(() => { }, 100);
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

        $("#addFound").modal("show");
        $("#paymentprice").val(pr);
        $("#showPayment").trigger("click");
        // $('#mainPaymentDiv').trigger("click")
        $("#paymentprice").blur();
        $("#AFSwitch").trigger("click");

        // $("#nullprice").html(pr);
      });

      return;
    }
  }

  const config = readConfig();
  if (!validateConfig(config)) return scrollToError();

  const method = "POST",
    body = new FormData();

  body.append("idc", config.idc);
  body.append("os", config.os);
  body.append("cpu", config.cpu ?? '1');
  body.append("ram", config.ram);
  body.append("ssd", config.ssd);
  body.append("ssh", config.ssh);
  body.append("net", config.net);
  body.append("name", config.name);
  body.append("snapshot", config.snapshot);
  body.append("snapshotid", config.snapshotid);
  body.append("protocol", config.protocol);
  body.append("firewall", config.firewall ?? default_firewall);
  body.append("fplan", fplan ? "1" : "0");
  body.append("st_type", document.querySelector('#blocktype input[type=radio]:checked').value);
  body.append("autoPilot", document.querySelector('#autopilot_switch').checked ? "true" : "false");

  document.getElementById(
    "creative"
  ).innerHTML = `<img src="/general/loading/tail-spin.svg" />`;
  document.getElementById("creative").disabled = true;
  const result = await fetch("/submit/cloud/servers/create-server", {
    method,
    body,
  })
    .then((r) => r.json())
    .then((j) => j)
    .catch((ex) => window.location.reload());
  document.getElementById("creative").innerHTML = `پرداخت`;

  console.log(result);
  showAlert(result.status, result.message);
  if (result.status == "success") {
    window.location.href = `/cloud/servers/${config.name}/${result.id}`;
    document.getElementById("creative").innerHTML = `سرور در حال راه اندازی`;
  } else {
    document.getElementById("creative").disabled = false;
  }
}

function scrollToError() {
  var errorElements = document.querySelectorAll(".alert-danger-border");
  $("html, body").animate(
    {
      scrollTop: $(errorElements[0]).offset().top,
    },
    2000
  );
}
neptonPlan();
