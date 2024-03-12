let reload_limit = 10;
let reload_lock = true;
let NS_request_allowed = true;
async function reloadNS(first = false) {
  if (!NS_request_allowed) return showAlert('error', 'درخواست شما برای بروزرسانی ارسال شده لطفا منتظر بمانید');
  if (!first) {
    if (reload_lock) return;
    document.getElementById("rns").setAttribute("disabled", "disabled");
    document.getElementById("rns").classList.add('free');
    // $("#rns").html(`<img src="/general/loading/k-spin.svg" />`);
    showAlert("success", "درخواست شما برای بروزرسانی ns ها ثبت شد");
    NS_request_allowed = false;
  }
  const route = "/submit/cdn/overview/website/load-ns";
  rBody = new FormData();
  rBody.append("wid", $wid);
  rBody.append("domain", $domain);
  setTimeout(() => reload_lock = false, 1000)
  const result = await fetch(route, { method: "POST", body: rBody })
    .then((r) => r.json())
    .then((j) => j); //.catch(ex => window.location.reload());
  console.log(result);
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  // if (typeof result.state !== "undefined") {
  //   if (result.state === "activated" && pastNsStatus != result.state) {
  //     window.location.reload();
  //   } else {
  //     pastNsStatus = result.state;
  //   }
  // }

  if (result.status === "success") {

  }
  document.getElementById("nis1").innerHTML =
    result[0] && result[0] != "" ? result[0] : "-";
  document.getElementById("nis2").innerHTML =
    result[1] && result[1] != "" ? result[1] : "-";
  // if (!first) showAlert(result.status, result.message);
  if (!first) {
    document.getElementById("rns").removeAttribute("disabled");
    document.getElementById("rns").classList.add('free');

    // $("#rns").html("بروزرسانی ns ها");
  }
}

async function circleRange(range) {
  //    const L = document.getElementById('chapC');
  //    const R = document.getElementById('rastC');
  const route = "/submit/cdn/overview/website/circle-scale";
  rBody = new FormData();
  rBody.append("domain", $domain);
  rBody.append("did", $did);
  rBody.append("website", $website);
  rBody.append("wid", $wid);
  rBody.append("time", range);
  //    L.setAttribute("data-max", "0-GB");
  //    L.setAttribute("data-percent", "0-GB");
  //    R.setAttribute("data-max", "0");
  //    R.setAttribute("data-percent", "0");
  //    $(function(){
  //       var $ppc = $('.progress');
  //       $ppc.each(updatePercentage);
  //   });

  //    $('#rastC .ss-progress-fill').attr('style', 'transform: rotate(0deg)');
  //    $('#chapC .ss-progress-fill').attr('style', 'transform: rotate(0deg)');
  //    document.querySelectorAll('.gt-50').forEach(gt => gt.classList.remove('gt-50'));

  let result = await fetch(route, { method: "POST", body: rBody })
    .then((r) => r.json())
    .then((j) => j)
    .catch((ex) => window.location.reload());

  //    L.setAttribute("data-max", result.totalBytes);
  //    L.setAttribute("data-percent", result.cachebw+"-GB");
  //    document.getElementById('chapV').innerHTML = result.cachebw;
  //    R.setAttribute("data-max", result.TotalRequests);
  //    R.setAttribute("data-percent", result.TotalCachedRequests);
  //    document.getElementById('rastV').innerHTML = result.TotalCachedRequests;

  if (typeof chart3 !== "undefined") chart3.destroy();
  const max =
    parseInt(result.TotalRequests) == 0 ? 1 : parseInt(result.TotalRequests);
  const act = parseInt(result.TotalCachedRequests);
  const conf = makeCircleConfig(max, act, "درخواست کش شده");
  chart3 = new ApexCharts(document.querySelector("#rastC"), conf);
  chart3.render();

  if (typeof chart4 !== "undefined") chart4.destroy();
  const max2 =
    parseInt(result.totalBytes) == 0 ? 1 : parseInt(result.totalBytes);
  const act2 = parseInt(result.cachebw);
  const conf2 = makeCircleConfig(max2, act2, "ترافیک کش شده");
  chart4 = new ApexCharts(document.querySelector("#chapC"), conf2);
  chart4.render();
  if (result.cachebw > 1024000000000) {
    document.getElementById("chapV2").innerHTML =
      parseFloat(result.cachebw / 1024000000000).toFixed(2) + " TB";
  } else if (result.cachebw > 1024000000) {
    document.getElementById("chapV2").innerHTML =
      parseFloat(result.cachebw / 1024000000).toFixed(2) + " GB";
  } else if (result.cachebw > 1024000) {
    document.getElementById("chapV2").innerHTML =
      parseFloat(result.cachebw / 1024000).toFixed(2) + " MB";
  } else if (result.cachebw > 1024) {
    document.getElementById("chapV2").innerHTML =
      parseFloat(result.cachebw / 1024).toFixed(2) + " KB";
  } else {
    document.getElementById("chapV2").innerHTML =
      parseInt(result.cachebw) + " bytes";
  }
  if (result.totalBytes > 1024000000000) {
    document.getElementById("chapV").innerHTML =
      parseFloat(result.totalBytes / 1024000000000).toFixed(2) + " TB";
  } else if (result.totalBytes > 1024000000) {
    document.getElementById("chapV").innerHTML =
      parseFloat(result.totalBytes / 1024000000).toFixed(2) + " GB";
  } else if (result.totalBytes > 1024000) {
    document.getElementById("chapV").innerHTML =
      parseFloat(result.totalBytes / 1024000).toFixed(2) + " MB";
  } else if (result.totalBytes > 1024) {
    document.getElementById("chapV").innerHTML =
      parseFloat(result.totalBytes / 1024).toFixed(2) + " KB";
  } else {
    document.getElementById("chapV").innerHTML =
      parseInt(result.totalBytes) + " bytes";
  }
  // document.getElementById('chapV').innerHTML = result.cachebw > 1000000 ? parseInt(result.totalBytes/1000000)+'MB' : parseInt(result.totalBytes/1000)+'KB';
  // document.getElementById('chapV').innerHTML = result.cachebw > 1000000 ? parseInt(result.totalBytes/1000000)+'MB' : parseInt(result.totalBytes/1000)+'KB';
  document.getElementById("rastV").innerHTML = parseInt(
    result.TotalRequests
  ).toLocaleString();
  document.getElementById("rastV2").innerHTML = parseInt(
    result.TotalCachedRequests
  ).toLocaleString();

  console.log(
    result.TotalRequests,
    result.TotalCachedRequests,
    result.totalBytes,
    result.cachebw
  );
}

async function linearRange(range, firstTime = false) {
  const route = "/submit/cdn/overview/website/linear2-scale";
  rBody = new FormData();
  rBody.append("domain", $domain);
  rBody.append("did", $did);
  rBody.append("website", $website);
  rBody.append("wid", $wid);
  rBody.append("time", range);

  if (!firstTime && typeof chart3 !== "undefined") chart.destroy();
  document.querySelector(".traffic-preloader").classList.remove("d-none");
  let result = await fetch(route, { method: "POST", body: rBody })
    .then((r) => r.json())
    .then((j) => j)
    .catch((ex) => window.location.reload());
  document.querySelector(".traffic-preloader").classList.add("d-none");

  //    linear = JSON.parse(result);
  const linearKe = Object.values(JSON.parse(result).keys);
  const linearVe = Object.values(JSON.parse(result).values);

  const optionse = {
    series: [
      {
        name: "تعداد دفعات بازدید",
        data: linearVe,
      },
    ],
    colors: ["#918ce5", "#70b5ef", "#fd7b88"],
    chart: {
      type: "area",
      stacked: false,
      width: "100%",
      height: "100%",
      fontFamily: "iranyekanFa",
      zoom: {
        enabled: false,
      },
      locales: [
        {
          name: "en",
          options: {
            toolbar: {
              exportToSVG: "دانلود SVG",
              exportToPNG: "دانلود PNG",
              exportToCSV: "دانلود CSV",
            },
          },
        },
      ],
      defaultLocale: "en",
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.7,
        inverseColors: false,
        opacityFrom: 0.32,
        opacityTo: 0.07,
        stops: [20, 40, 100, 100],
      },
    },
    yaxis: {
      labels: {
        minWidth: 40,
        maxWidth: 100,
        style: {
          colors: "#e7e8ec",
        },
        offsetX: -50,
        formatter: function (val) {
          return val.toLocaleString();
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    xaxis: {
      categories: linearKe,
      // type: 'datetime',
      axisBorder: {
        show: true,
        color: "#eff0f2",
      },
      axisTicks: {
        color: "#eff0f2",
      },
      labels: {
        show: false,
        offsetY: 70,
        style: {
          colors: "#e7e8ec",
        },
      },
    },
    tooltip: {
      shared: true,
      x: {},
      y: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          return value.toLocaleString();
        },
      },
    },
    legend: {
      fontSize: "11px",
      position: "bottom",
      horizontalAlign: "right",
      offsetX: -10,
      offsetY: 10,
      markers: {
        width: 10,
        height: 10,
        offsetX: 5,
        offsetY: 0,
      },
    },
    grid: {
      show: true,
      borderColor: "#eff0f2",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
  };
  // document.getElementById('viewRepoerChart').innerHTML = '';

  chart = new ApexCharts(document.querySelector("#viewRepoerChart"), optionse);
  chart.render();
}

async function linear2Range(range, firstTime = false) {
  const route = "/submit/cdn/overview/website/linear-scale";
  rBody = new FormData();
  rBody.append("domain", $domain);
  rBody.append("did", $did);
  rBody.append("website", $website);
  rBody.append("wid", $wid);
  rBody.append("time", range);

  if (!firstTime && typeof chart3 !== "undefined") chart2.destroy();
  document.querySelector(".waf-preloader").classList.remove("d-none");
  let result = await fetch(route, { method: "POST", body: rBody })
    .then((r) => r.json())
    .then((j) => j)
    .catch((ex) => window.location.reload());
  document.querySelector(".waf-preloader").classList.add("d-none");

  //    linearV2 = JSON.parse(result);
  const linearK2e = Object.values(JSON.parse(result).keys);
  const linearV2e = Object.values(JSON.parse(result).values);

  // viewRepoerChart
  options2 = {
    series: [
      {
        name: "تعداد حملات",
        data: linearV2e,
      },
    ],
    colors: ["#918ce5", "#70b5ef", "#fd7b88"],
    chart: {
      type: "area",
      stacked: false,
      width: "100%",
      height: "100%",
      fontFamily: "iranyekanFa",
      zoom: {
        enabled: false,
      },
      locales: [
        {
          name: "en",
          options: {
            toolbar: {
              exportToSVG: "دانلود SVG",
              exportToPNG: "دانلود PNG",
              exportToCSV: "دانلود CSV",
            },
          },
        },
      ],
      defaultLocale: "en",
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.7,
        inverseColors: false,
        opacityFrom: 0.32,
        opacityTo: 0.07,
        stops: [20, 40, 100, 100],
      },
    },
    yaxis: {
      labels: {
        minWidth: 40,
        maxWidth: 100,
        style: {
          colors: "#e7e8ec",
        },
        offsetX: -50,
        formatter: function (val) {
          return val.toLocaleString();
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },

    xaxis: {
      categories: linearK2e,
      axisBorder: {
        show: true,
        color: "#eff0f2",
      },
      axisTicks: {
        color: "#eff0f2",
      },
      labels: {
        show: false,
        offsetY: 70,
        style: {
          colors: "#e7e8ec",
        },
      },
    },
    tooltip: {
      shared: true,
      y: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          return value.toLocaleString();
        },
      },
    },
    legend: {
      fontSize: "11px",
      position: "bottom",
      horizontalAlign: "right",
      offsetX: -10,
      offsetY: 10,
      markers: {
        width: 10,
        height: 10,
        offsetX: 5,
        offsetY: 0,
      },
    },
    grid: {
      show: true,
      borderColor: "#eff0f2",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
  };

  // $('#view-report-tab').on("shown.bs.tab",function(){
  chart2 = new ApexCharts(
    document.querySelector("#high-chart-security-report"),
    options2
  );
  chart2.render();
  // $('#view-report-tab').off(); // to remove the binded event after the initial rendering
  // });
}

// setTimeout(() => {
//     linear2Range('3h', true);
//     linearRange('3h', true);
// }, 500);

loadAllCharts();
async function loadAllCharts() {
  const route = "/submit/cdn/overview/website/all-charts";
  const method = "POST";

  body = new FormData();
  body.append("domain", $domain);
  body.append("did", $did);
  body.append("website", $website);
  body.append("wid", $wid);

  const result = await fetch(route, { method, body })
    .then((r) => r.json())
    .then((j) => j);
  // .catch(ex => window.location.reload());

  renderVisits(result.visitors);
  renderWafLog(result.wafs);
  // if(typeof result.totals !== 'undefined')
  renderCircleLogs(result.totals);
  console.log(result);
}

function makeLinearConfig(xAxis, yAxis, name) {
  const settings = {
    series: [{ name: name, data: yAxis }],
    colors: ["#918ce5", "#70b5ef", "#fd7b88"],
    chart: {
      type: "area",
      stacked: false,
      width: "100%",
      height: "100%",
      fontFamily: "iranyekanFa",
      zoom: {
        enabled: false,
      },
      locales: [
        {
          name: "en",
          options: {
            toolbar: {
              exportToSVG: "دانلود SVG",
              exportToPNG: "دانلود PNG",
              exportToCSV: "دانلود CSV",
            },
          },
        },
      ],
      defaultLocale: "en",
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.7,
        inverseColors: false,
        opacityFrom: 0.32,
        opacityTo: 0.07,
        stops: [20, 40, 100, 100],
      },
    },
    yaxis: {
      // labels: {
      //   style: {
      //     colors: "#e7e8ec",
      //   },
      //   offsetX: -50,
      //   formatter: function (val) {
      //     return val.toLocaleString();
      //   },
      // },
      labels: {
        minWidth: 40,
        maxWidth: 100,
        style: {
          colors: "#e7e8ec",
        },
        offsetX: -50,
        formatter: function (val) {
          return val.toLocaleString();
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },

    xaxis: {
      categories: xAxis,
      axisBorder: {
        show: true,
        color: "#eff0f2",
      },
      axisTicks: {
        color: "#eff0f2",
      },
      labels: {
        show: false,
        offsetY: 70,
        style: {
          colors: "#e7e8ec",
        },
      },
    },
    tooltip: {
      shared: true,
      y: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          return value.toLocaleString();
        },
      },
    },
    legend: {
      fontSize: "11px",
      position: "bottom",
      horizontalAlign: "right",
      offsetX: -10,
      offsetY: 10,
      markers: {
        width: 10,
        height: 10,
        offsetX: 5,
        offsetY: 0,
      },
    },
    grid: {
      show: true,
      borderColor: "#eff0f2",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
  };

  return settings;
}

function makeCircleConfig(total, current, name) {
  const percentage = (current * 100) / total;
  const settings = {
    series: [percentage],
    chart: {
      height: 220,
      type: "radialBar",
      fontFamily: "iranyekanFa",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 0,
          size: "67%",
          background: "#fff",
          position: "front",
          dropShadow: {
            enabled: false,
          },
        },
        track: {
          background: "#c8ecf8",
          strokeWidth: "100%",
          margin: 0,
          dropShadow: {
            enabled: false,
          },
        },
        dataLabels: {
          show: true,

          name: {
            offsetY: -10,
            show: true,
            color: "#000",
            fontSize: "12px",
          },
          value: {
            formatter: function (val) {
              return parseInt(val) + "%";
            },
            color: "#000",
            show: true,
            fontSize: "28px",
            fontFamily: "iranyekanEn",
            fontWeight: 700,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      colors: ["#68def0"],
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#63b2ef"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: [""], //[name],
  };
  return settings;
}

function renderVisits(chartData) {
  if (typeof chartData === "undefined" || !chartData) {
    document.getElementById("viewRepoerChart").classList.add("d-none");
    document.getElementById("visitsEMPT").classList.remove("d-none");
    return;
  }
  document.getElementById("viewRepoerChart").classList.remove("d-none");
  document.getElementById("visitsEMPT").classList.add("d-none");

  const configuration = makeLinearConfig(
    Object.keys(chartData),
    Object.values(chartData),
    "تعداد دفعات بازدید"
  );
  console.log(Object.keys(chartData), Object.values(chartData), configuration);
  chart = new ApexCharts(
    document.querySelector("#viewRepoerChart"),
    configuration
  );
  chart.render();
}

function renderWafLog(chartData) {
  if (typeof chartData === "undefined" || !chartData) {
    document
      .getElementById("high-chart-security-report")
      .classList.add("d-none");
    document.getElementById("wafsEMPT").classList.remove("d-none");
    return;
  }
  document
    .getElementById("high-chart-security-report")
    .classList.remove("d-none");
  document.getElementById("wafsEMPT").classList.add("d-none");

  const configuration = makeLinearConfig(
    Object.keys(chartData),
    Object.values(chartData),
    "تعداد حملات"
  );
  console.log(Object.keys(chartData), Object.values(chartData), configuration);
  chart2 = new ApexCharts(
    document.querySelector("#high-chart-security-report"),
    configuration
  );
  chart2.render();
}

function renderCircleLogs(chartData) {
  if (
    typeof chartData === "undefined" ||
    typeof chartData["total-bytes"] === "undefined" ||
    chartData["total-bytes"] == 0
  ) {
    const left = makeCircleConfig(0.1, 00, "ترافیک کش شده");
    chart4 = new ApexCharts(document.querySelector("#chapC"), left);
    chart4.render();
    document.getElementById("chapV").innerHTML = 0 + " bytes";
    document.getElementById("chapV2").innerHTML = 0 + " bytes";
    // document.getElementById('chapC').classList.add('d-none');
    // document.getElementById('chapTXT').classList.add('d-none');
    // document.getElementById('chapEMPT').classList.remove('d-none');
  } else {
    // document.getElementById('chapC').classList.remove('d-none');
    // document.getElementById('chapTXT').classList.remove('d-none');
    // document.getElementById('chapEMPT').classList.add('d-none');

    totalBytes = chartData["total-bytes"] == 0 ? 1 : chartData["total-bytes"];
    const left = makeCircleConfig(
      totalBytes,
      chartData["cached-bytes"],
      "ترافیک کش شده"
    );
    chart4 = new ApexCharts(document.querySelector("#chapC"), left);
    chart4.render();
    // document.getElementById('chapV').innerHTML = parseInt(totalBytes/1000000);
    // document.getElementById('chapV2').innerHTML = parseInt( chartData['cached-bytes']/1000000);
    if (chartData["cached-bytes"] > 1024000000000) {
      document.getElementById("chapV2").innerHTML =
        parseFloat(chartData["cached-bytes"] / 1024000000000).toFixed(2) +
        " TB";
    } else if (chartData["cached-bytes"] > 1024000000) {
      document.getElementById("chapV2").innerHTML =
        parseFloat(chartData["cached-bytes"] / 1024000000).toFixed(2) + " GB";
    } else if (chartData["cached-bytes"] > 1024000) {
      document.getElementById("chapV2").innerHTML =
        parseFloat(chartData["cached-bytes"] / 1024000).toFixed(2) + " MB";
    } else if (chartData["cached-bytes"] > 1024) {
      document.getElementById("chapV2").innerHTML =
        parseFloat(chartData["cached-bytes"] / 1024).toFixed(2) + " KB";
    } else {
      document.getElementById("chapV2").innerHTML =
        parseInt(chartData["cached-bytes"]) + " bytes";
    }
    if (totalBytes > 1024000000000) {
      document.getElementById("chapV").innerHTML =
        parseFloat(totalBytes / 1024000000000).toFixed(2) + " TB";
    } else if (totalBytes > 1024000000) {
      document.getElementById("chapV").innerHTML =
        parseFloat(totalBytes / 1024000000).toFixed(2) + " GB";
    } else if (totalBytes > 1024000) {
      document.getElementById("chapV").innerHTML =
        parseFloat(totalBytes / 1024000).toFixed(2) + " MB";
    } else if (totalBytes > 1024) {
      document.getElementById("chapV").innerHTML =
        parseFloat(totalBytes / 1024).toFixed(2) + " KB";
    } else {
      document.getElementById("chapV").innerHTML =
        parseInt(totalBytes) + " bytes";
    }
  }

  if (
    typeof chartData === "undefined" ||
    typeof chartData["total-bytes"] === "undefined" ||
    chartData["total-requests"] == 0
  ) {
    const right = makeCircleConfig(0.1, 0, "درخواست کش شده");
    chart3 = new ApexCharts(document.querySelector("#rastC"), right);
    chart3.render();
    document.getElementById("rastV").innerHTML = 0;
    document.getElementById("rastV2").innerHTML = 0;
    // document.getElementById('rastC').classList.add('d-none');
    // document.getElementById('rastTXT').classList.add('d-none');
    // document.getElementById('rastEMPT').classList.remove('d-none');
  } else {
    // document.getElementById('rastC').classList.remove('d-none');
    // document.getElementById('rastTXT').classList.remove('d-none');
    // document.getElementById('rastEMPT').classList.add('d-none');

    totalReqs =
      chartData["total-requests"] == 0 ? 1 : chartData["total-requests"];
    const right = makeCircleConfig(
      totalReqs,
      chartData["cached-requests"],
      "درخواست کش شده"
    );
    chart3 = new ApexCharts(document.querySelector("#rastC"), right);
    chart3.render();
    document.getElementById("rastV").innerHTML =
      parseInt(totalReqs).toLocaleString();
    document.getElementById("rastV2").innerHTML = parseInt(
      chartData["cached-requests"]
    ).toLocaleString();
  }
}

async function wwwSwitches(action, on, off) {
  let wSwitch = document.getElementById("www_switch");
  let nwSwitch = document.getElementById("nwww_switch");

  wSwitch.setAttribute("disabled", "disabled");
  nwSwitch.setAttribute("disabled", "disabled");

  const route = "/submit/cdn/overview/website/www";
  const method = "POST";
  let mode = action ? on : off;
  console.log(mode);
  let body = new FormData();
  body.append("wid", $wid);

  if (!wSwitch.checked && !nwSwitch.checked) mode = "off";

  body.append("www", mode);

  const res = await fetch(route, { method, body })
    .then((response) => response.json())
    .then((resolve) => resolve)
    .catch((ex) => window.location.reload());

  showAlert(res.status, res.message);

  wSwitch.removeAttribute("disabled");
  nwSwitch.removeAttribute("disabled");

  if (res.status === "error") {
    if (mode === "www") {
      wSwitch.checked = !wSwitch.checked;
    } else if (mode === "nonwww") {
      nwSwitch.checked = !nwSwitch.checked;
    }
  } else if (res.status === "success" && mode !== "off") {
    wSwitch.checked = mode === "www";
    nwSwitch.checked = mode === "nonwww";
  } else if (res.status === "success" && mode === "off") {
    wSwitch.checked = false;
    nwSwitch.checked = false;
  }
  return res.status === "success" ? true : false;
}

async function developerModeCacher() {
  document
    .getElementById("prstatus_switch")
    .setAttribute("disabled", "disabled");
  let rBody = new FormData();
  rBody.append(
    "dv",
    document.getElementById("prstatus_switch").checked ? "1" : "0"
  );
  rBody.append("wid", $wid);
  rBody.append("ao", "0");
  const result = await fetch("/submit/cdn/cache/website/cache-mode", {
    method: "POST",
    body: rBody,
  })
    .then((r) => r.json())
    .then((rj) => rj)
    .catch((ex) => window.location.reload());
  showAlert(result.dv.status, result.dv.message);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  document.getElementById("prstatus_switch").removeAttribute("disabled");
}

//  async function miniFetch(e) {
//     e.preventDefault();

//     // config
//     const route = '';
//     const output = '';
//     // ---

//     let body = new FormData;
//     document.querySelectorAll('form input').forEach(el => body.append(el.getAttribute('name'), el.value));
//     const response = await fetch(route, {method: 'POST', body}).then(r => r.text()).then(j => j);
//     document.getElementById(output).innerHTML = response;
//  }
