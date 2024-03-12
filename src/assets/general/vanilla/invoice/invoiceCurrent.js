async function loadIssued() {
  let res;
  const config = {
    priceUnit: " ریال ",
  };
  await fetch("/invoice/dataIssued", { method: "POST" })
    .then((response) => response.json())
    .then((responseJson) => {
      res = responseJson;
    }).catch(err => document.location.href = '/');

  document.getElementById("update_issue").innerText = res.end;
  document.getElementById("price_issue").innerText = res.price;

  if (typeof res.data.vod != "undefined") {
    document.getElementById("vod_issue_body").innerHTML = "";
    document.getElementById("vod_price_issue").innerText =
      res.data.vod.price + config.priceUnit;
    res.data.vod.services.forEach((service) => {
      document.getElementById("vod_issue_body").innerHTML += renderIssueCards(
        service,
        "VideoName",
        "نام ویدئو",
        config.priceUnit
      );
      service.details.forEach((detail) => {
        document.getElementById("vod_issue_body").innerHTML +=
          renderIssueCardDetails(detail, config);
      });
      document.getElementById("vod_issue_body").innerHTML += "<br>";
    });
  } else {
    document.getElementById("remove_vod").remove();
  }

  if (typeof res.data.live != "undefined") {
    document.getElementById("live_issue_body").innerHTML = "";
    document.getElementById("live_price_issue").innerText =
      res.data.live.price + config.priceUnit;
    res.data.live.services.forEach((service) => {
      document.getElementById("live_issue_body").innerHTML += renderIssueCards(
        service,
        "livename",
        "نام استریم",
        config.priceUnit
      );
      service.details.forEach((detail) => {
        document.getElementById("live_issue_body").innerHTML +=
          renderIssueCardDetails(detail, config);
      });
      document.getElementById("live_issue_body").innerHTML += "<br>";
    });
  } else {
    document.getElementById("remove_live").remove();
  }

  if (typeof res.data.realtimeLiveStream != "undefined") {
    document.getElementById("real_issue_body").innerHTML = "";
    document.getElementById("real_price_issue").innerText =
      res.data.realtimeLiveStream.price + config.priceUnit;
    res.data.realtimeLiveStream.services.forEach((service) => {
      document.getElementById("real_issue_body").innerHTML += renderIssueCards(
        service,
        "livename",
        "نام استریم",
        config.priceUnit
      );
      service.details.forEach((detail) => {
        document.getElementById("real_issue_body").innerHTML +=
          renderIssueCardDetails(detail, config);
      });
      document.getElementById("real_issue_body").innerHTML += "<br>";
    });
  } else {
    document.getElementById("remove_real").remove();
  }

  if (typeof res.data.cdn != "undefined") {
    document.getElementById("cdn_issue_body").innerHTML = "";
    document.getElementById("cdn_price_issue").innerText =
      res.data.cdn.price + config.priceUnit;
    res.data.cdn.services.forEach((service) => {
      document.getElementById("cdn_issue_body").innerHTML += renderIssueCards(
        service,
        "WebsiteName",
        "نام وبسایت",
        config.priceUnit
      );
      service.details.forEach((detail) => {
        document.getElementById("cdn_issue_body").innerHTML +=
          renderIssueCardDetails(detail, config);
      });
      document.getElementById("cdn_issue_body").innerHTML += "<br>";
    });
  } else {
    document.getElementById("remove_cdn").remove();
  }

  if (typeof res.data.cloud != "undefined") {

    document.getElementById("cloud_issue_body").innerHTML = "";
    document.getElementById("cloud_price_issue").innerText =
      res.data.cloud.price + config.priceUnit;
    res.data.cloud.services.forEach((service) => {
      document.getElementById("cloud_issue_body").innerHTML += renderIssueCards(
        service,
        "ServerName",
        "سرور",
        config.priceUnit
      );
      service.details.forEach((detail) => {
        let truncOrNot = {message: "", price: ""};
        if (detail.message.length > 40)
          truncOrNot.message = detail.message.substr(0, 40);
        else truncOrNot.message = detail.message;
        truncOrNot.price = detail.price;
        document.getElementById("cloud_issue_body").innerHTML +=
          renderIssueCardDetails(
            truncOrNot,
            config,
            `title="${detail.message}"`
          );

      });
      document.getElementById("cloud_issue_body").innerHTML += "<br>";
    }

    );
    }else {
  document.getElementById("remove_cloud").remove();
}
  document.getElementById("invoice_loading").classList.add("d-none");
  document.getElementById("invoice_loaded").classList.remove("d-none");
}

async function loadProfile() {
  let res;

  await fetch("/profile/data/get", { method: "POST" })
    .then((response) => response.json())
    .then((responseJson) => {
      res = responseJson;
    }).catch(ex => window.location.reload());

  document.getElementById("id").innerText = res.id;
  document.getElementById("fname").innerText = res.fName;
  document.getElementById("lname").innerText = res.lName;
  document.getElementById("phone").innerText = res.phone;
  document.getElementById("profile_loading").classList.add("d-none");
  document.getElementById("profile_loaded").classList.remove("d-none");
}

function renderIssueCards(service, sub, name, priceUnit = "ریال") {
  return `
  <div
      class="d-flex flex-column flex-lg-row mt-0 mt-lg-3 justify-content-between iranyekanFa cleanHead">

      <div
        class="col-lg-6 col-sm-12 col-xs-12 d-flex mt-3 mt-lg-0 justify-content-between justify-content-lg-start  align-items-center">
        <p class="fs-14 fw-600 ws-15 ls-01 mb-0">${name}</p>
        <span class="iranyekanFa fs-14 ms-2  text-black-900" dir="ltr">
        ${service[sub]}
        </span>
      </div>

      <div
        class="col-lg-6 col-sm-12 col-xs-12 d-flex mt-3 mt-lg-0 justify-content-between justify-content-lg-end  align-items-center">
        <p class="fs-14 fw-600 ws-15 ls-01 mb-0">مبلغ</p>
        <span class="iranyekanFa fs-14 ms-2  text-black-900"dir="ltr">
        ${service.price}
        </span>
         &nbsp ${priceUnit}
      </div>

    </div>
    <div
      class="d-flex flex-column flex-lg-row mt-0 mt-lg-3 justify-content-between aligner">

      <div
        class="col-6  d-flex mt-3 mt-lg-0 justify-content-between justify-content-lg-start  align-items-center">
        <p class="fs-14 fw-600 ws-15 ls-01 mb-0">تاریخ شروع</p>
        <span class="iranyekanFa fs-14 ms-2 text-black-900" dir="ltr">
        ${service.start}
        </span>
      </div>

      <div
        class="col-6 d-flex mt-3 mt-lg-0 justify-content-between justify-content-lg-end  align-items-center">
        <p class="fs-14 fw-600 ws-15 ls-01 mb-0">تاریخ ‍پایان</p>
        <span class="iranyekanFa fs-14 ms-2 text-black-900"dir="ltr">
        ${service.end}
        </span>
      </div>

    </div>
    <div class="row pb17px">
      <div>
        <p
         class="fs-14 fw-600 d-block tralign details"> جزئیات مصرف: </p>
      </div>
    </div>
    <hr class="hr-main">
    `;
}

function renderIssueCardDetails(detail, config, hoverTitle = "") {
  return `<div class="row iranyekanFa py10">
            <div class="col-9">
              <p ${hoverTitle} class="fs-14 ws-15 tralign mgr9px">${detail.message}</p>
            </div>
            <div class="col-3">
              <p class="fs-14 ws-15 my-1 tlalign mgl9px"><span class=" fw-600 ">${detail.price}<span> ${config.priceUnit}</p>
            </div>
          </div>
          <hr class="hr">
        `;
}

/*
              <div
                class="d-flex flex-column flex-lg-row mt-0 mt-lg-3 justify-content-between">

                <div
                  class="col-12  col-lg-4  d-flex mt-3 mt-lg-0 justify-content-between justify-content-lg-start  align-items-center">
                  <p class="fs-14 ws-15 ls-01 mb-0">تعداد هسته ( Core )</p>
                  <span class="iranyekanEn fs-14 ms-2 fw-600 text-black-900" dir="ltr">4
                                                   vCore</span>
                </div>

                <div
                  class="col-12 col-lg-4 d-flex mt-3 mt-lg-0 justify-content-between justify-content-lg-start align-items-center">
                  <p class="fs-14 ws-15 ls-01 mb-0">حافظه رم ( RAM )</p>
                  <span class="iranyekanEn fs-14 ms-2 fw-600 text-black-900" dir="ltr">8GB
                                                   RAM</span>
                </div>

                <div
                  class="col-12  col-lg-4 d-flex mt-3 mt-lg-0 justify-content-between justify-content-lg-end  align-items-center">
                  <p class="fs-14 ws-15 ls-01 mb-0">دیسک ابری ( SSD )</p>
                  <span class="iranyekanEn fs-14 ms-2 fw-600 text-black-900"
                        dir="ltr">200GB SSD</span>
                </div>

              </div>
              // <hr></hr> */
