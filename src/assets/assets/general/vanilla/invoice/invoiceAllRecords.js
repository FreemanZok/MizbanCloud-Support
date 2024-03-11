async function loadAllissued() {
  let res;
  let head;
  const config = {
    priceUnit: " ریال ",
  };
  await fetch("/invoice/dataAllIssued", { method: "POST" })
    .then((response) => {head = response; return response.json()})
    .then((responseJson) => {
      res = responseJson;
    }).catch(err => document.location.href = '/');


  if (typeof res.status != "undefined" && res.status == "error") {
    document.getElementById("dvitems").innerHTML = `<br><br><br><div class="text-center m-10 pt-0" style="padding-bottom: 80px"> اطلاعاتی جهت نمایش وجود ندارد </div>`
    return;
  }

  document.getElementById('dvitems').innerHTML = "";
  res.invoices.forEach(invoice => {
    console.log(invoice.invoiceid);
    document.getElementById('dvitems').innerHTML+=(accHead(invoice.invoiceid,invoice.start,invoice.end,invoice.price, invoice.data));
    let item = invoice.data;

    if (typeof item.vod != "undefined") {
      document.getElementById(`vod_issue_body_${invoice.invoiceid}`).innerHTML = "";
      document.getElementById(`vod_price_issue_${invoice.invoiceid}`).innerText =
        item.vod.price + config.priceUnit;
      item.vod.services.forEach((service) => {
        document.getElementById(`vod_issue_body_${invoice.invoiceid}`).innerHTML += renderIssueCards(
          service,
          "VideoName",
          "نام ویدئو",
          config.priceUnit
        );
        service.details.forEach((detail) => {
          document.getElementById(`vod_issue_body_${invoice.invoiceid}`).innerHTML +=
            renderIssueCardDetails(detail, config);
        });
        document.getElementById(`vod_issue_body_${invoice.invoiceid}`).innerHTML += "<br>";
      });
    } else {
      document.getElementById(`remove_vod_${invoice.invoiceid}`).remove();
    }

    if (typeof item.live != "undefined") {
      document.getElementById(`live_issue_body_${invoice.invoiceid}`).innerHTML = "";
      document.getElementById(`live_price_issue_${invoice.invoiceid}`).innerText =
        item.live.price + config.priceUnit;
      item.live.services.forEach((service) => {
        document.getElementById(`live_issue_body_${invoice.invoiceid}`).innerHTML += renderIssueCards(
          service,
          "livename",
          "نام استریم",
          config.priceUnit
        );
        service.details.forEach((detail) => {
          document.getElementById(`live_issue_body_${invoice.invoiceid}`).innerHTML +=
            renderIssueCardDetails(detail, config);
        });
        document.getElementById(`live_issue_body_${invoice.invoiceid}`).innerHTML += "<br>";
      });
    } else {
      document.getElementById(`remove_live_${invoice.invoiceid}`).remove();
    }
    if (typeof item.realtimeLiveStream != "undefined") {
      document.getElementById(`real_issue_body_${invoice.invoiceid}`).innerHTML = "";
      document.getElementById(`real_price_issue_${invoice.invoiceid}`).innerText =
        item.realtimeLiveStream.price + config.priceUnit;
      item.realtimeLiveStream.services.forEach((service) => {
        document.getElementById(`real_issue_body_${invoice.invoiceid}`).innerHTML += renderIssueCards(
          service,
          "livename",
          "نام استریم",
          config.priceUnit
        );
        service.details.forEach((detail) => {
          document.getElementById(`real_issue_body_${invoice.invoiceid}`).innerHTML +=
            renderIssueCardDetails(detail, config);
        });
        document.getElementById(`real_issue_body_${invoice.invoiceid}`).innerHTML += "<br>";
      });
    } else {
      document.getElementById(`remove_real_${invoice.invoiceid}`).remove();
    }
    if (typeof item.cdn != "undefined") {
      document.getElementById(`cdn_issue_body_${invoice.invoiceid}`).innerHTML = "";
      document.getElementById(`cdn_price_issue_${invoice.invoiceid}`).innerText =
        item.cdn.price + config.priceUnit;
      item.cdn.services.forEach((service) => {
        document.getElementById(`cdn_issue_body_${invoice.invoiceid}`).innerHTML += renderIssueCards(
          service,
          "WebsiteName",
          "سایت",
          config.priceUnit
        );
        service.details.forEach((detail) => {
          document.getElementById(`cdn_issue_body_${invoice.invoiceid}`).innerHTML +=
            renderIssueCardDetails(detail, config);
        });
        document.getElementById(`cdn_issue_body_${invoice.invoiceid}`).innerHTML += "<br>";
      });
    } else {
      document.getElementById(`remove_cdn_${invoice.invoiceid}`).remove();
    }
    if (typeof item.cloud != "undefined") {

      document.getElementById(`cloud_issue_body_${invoice.invoiceid}`).innerHTML = "";
      document.getElementById(`cloud_price_issue_${invoice.invoiceid}`).innerText =
        item.cloud.price + config.priceUnit;

      item.cloud.services.forEach((service) => {

        document.getElementById(`cloud_issue_body_${invoice.invoiceid}`).innerHTML +=
          renderIssueCards(
            service,
            "ServerName",
            "سرور",
            config.priceUnit
          )

        service.details.forEach((detail) => {

          let truncOrNot = {message: "", price: ""};
          if (detail.message.length > 40)
            truncOrNot.message = detail.message.substr(0, 40);
          else truncOrNot.message = detail.message;
          truncOrNot.price = detail.price;
          document.getElementById(`cloud_issue_body_${invoice.invoiceid}`).innerHTML +=
            renderIssueCardDetails(
              truncOrNot,
              config,
              `title="${detail.message}"`
            );

        });

        document.getElementById(`cloud_issue_body_${invoice.invoiceid}`).innerHTML += "<br>";
      });
    } else {
      document.getElementById(`remove_cloud_${invoice.invoiceid}`).remove();
    }
  });
}


function accHead(id, start, end, price, data) {
  return `
<div class="accordion-item">
    <h2 class="accordion-header" id="flush-heading-${id}">
      <button class="accordion-button accordion-border-button w-100 collapsed" type="button"
              data-bs-toggle="collapse" data-bs-target="#flush-collapse-${id}" aria-expanded="false"
              aria-controls="flush-collapse-${id}">
        <ul class="d-flex mb-0 justify-content-between w-100 align-items-center list-unstyled">
          <li class="fs-13 text-gray-900 ws-20 fw-400">
            <img class="me-2" src="/general/images/root/bullet_pink.svg">
              فاکتور
              <span class="me-2 text-black-800" id="id-${id}">${id}</span>
          </li>
          <li class="d-none d-md-block fw-400" id="start-${id}">${start}</li>
          <li class="d-none d-md-block fw-400" id="end-${id}">${end}</li>
          <li class="d-none d-md-block fw-400" id="price-${id}">${price}</li>

        </ul>
      </button>
    </h2>

    <div id="flush-collapse-${id}" class="accordion-collapse collapse" aria-labelledby="flush-heading-${id}"
         data-bs-parent="#accordionZone">
      <div class="accordion-body" id="body-${id}">

      <div class="accordion border-accordion mt-4 accordion-flush" id="accordionFlushExample">

        <div class="accordion-item" id="remove_vod_${id}">
          <h2 class="accordion-header" id="flush-headingOne">
            <button class="accordion-button w-100 collapsed" type="button"
                    data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
                    aria-expanded="false" aria-controls="flush-collapseOne">
              ویدیوی ابری
              <u id="vod_price_issue_${id}"></u>
            </button>
          </h2>
          <div id="flush-collapseOne" class="accordion-collapse collapse"
               aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body" id="vod_issue_body_${id}">

            </div>
          </div>
        </div>

        <div class="accordion-item" id="remove_live_${id}">
          <h2 class="accordion-header" id="flush-headingTwo">
            <button class="accordion-button collapsed" type="button"
                    data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo"
                    aria-expanded="false" aria-controls="flush-collapseTwo">
              پخش زنده ابری
              <u id="live_price_issue_${id}"></u>
            </button>
          </h2>
          <div id="flush-collapseTwo" class="accordion-collapse collapse"
               aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body" id="live_issue_body_${id}">

            </div>
          </div>
        </div>

        <div class="accordion-item" id="remove_real_${id}">
          <h2 class="accordion-header" id="flush-headingTwo2">
            <button class="accordion-button collapsed" type="button"
                    data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo2"
                    aria-expanded="false" aria-controls="flush-collapseTwo2">
              پخش زنده بدون تاخیر ابری
              <u id="real_price_issue_${id}"></u>
            </button>
          </h2>
          <div id="flush-collapseTwo2" class="accordion-collapse collapse"
               aria-labelledby="flush-headingTwo2" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body" id="real_issue_body_${id}">

            </div>
          </div>
        </div>

        <div class="accordion-item" id="remove_cdn_${id}">
          <h2 class="accordion-header" id="flush-headingThree">
            <button class="accordion-button collapsed" type="button"
                    data-bs-toggle="collapse" data-bs-target="#flush-collapseThree"
                    aria-expanded="false" aria-controls="flush-collapseThree">
              سرویس cdn
              <u id="cdn_price_issue_${id}"></u>
            </button>
          </h2>
          <div id="flush-collapseThree" class="accordion-collapse collapse"
               aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body" id="cdn_issue_body_${id}">

          </div>
          </div>
        </div>

        <div class="accordion-item" id="remove_cloud_${id}">
          <h2 class="accordion-header" id="flush-headingThree2">
            <button class="accordion-button collapsed" type="button"
                    data-bs-toggle="collapse" data-bs-target="#flush-collapseThree2"
                    aria-expanded="false" aria-controls="flush-collapseThree2">
              سرور ابری
              <u id="cloud_price_issue_${id}"></u>
            </button>
          </h2>
          <div id="flush-collapseThree2" class="accordion-collapse collapse"
               aria-labelledby="flush-headingThree2" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body" id="cloud_issue_body_${id}">

          </div>
          </div>
        </div>
      </div>

      </div>

      </div>
    </div>
  </div>`;
}
//
// function renderIssueCards(service, sub, name, priceUnit = "ریال") {
//   return `<div  class="d-flex flex-column flex-lg-row mt-0 mt-lg-3 justify-content-between iranyekanFa cleanHead">
//
//       <div
//         class="col-lg-6 col-sm-12 col-xs-12 d-flex mt-3 mt-lg-0 justify-content-between justify-content-lg-start  align-items-center">
//         <p class="fs-14 fw-600 ws-15 ls-01 mb-0">${name}</p>
//         <span class="iranyekanFa fs-14 ms-2  text-black-900" dir="ltr">
//         ${service[sub]}
//         </span>
//       </div>
//
//       <div
//         class="col-lg-6 col-sm-12 col-xs-12 d-flex mt-3 mt-lg-0 justify-content-between justify-content-lg-end  align-items-center">
//         <p class="fs-14 fw-600 ws-15 ls-01 mb-0">مبلغ</p>
//         <span class="iranyekanFa fs-14 ms-2 text-black-900"dir="ltr">
//         ${service.price}
//         </span>
//          ${priceUnit}
//       </div>
//
//     </div>
//     <div
//       class="d-flex flex-column flex-lg-row mt-0 mt-lg-3 justify-content-between aligner">
//
//       <div
//         class="col-6  d-flex mt-3 mt-lg-0 justify-content-between justify-content-lg-start  align-items-center">
//         <p class="fs-14 fw-600 ws-15 ls-01 mb-0">تاریخ شروع</p>
//         <span class="iranyekanFa fs-14 ms-2 text-black-900" dir="ltr">
//         ${service.start}
//         </span>
//       </div>
//
//       <div
//         class="col-6 d-flex mt-3 mt-lg-0 justify-content-between justify-content-lg-end  align-items-center">
//         <p class="fs-14 fw-600 ws-15 ls-01 mb-0">تاریخ ‍پایان</p>
//         <span class="iranyekanFa fs-14 ms-2 text-black-900"dir="ltr">
//         ${service.end}
//         </span>
//       </div>
//
//     </div>
//     <div class="row pb17px">
//       <div>
//         <p
//          class="fs-14 fw-600 d-block tralign details"> جزئیات مصرف: </p>
//       </div>
//     </div>
//     <hr class="hr-main">
//     `;
// }
//
// function renderIssueCardDetails(detail, config, hoverTitle = "") {
//   return `<div class="row iranyekanFa py10">
//             <div class="col-9">
//               <p ${hoverTitle} class="fs-14 ws-15 tralign mgr9px">${detail.message}</p>
//             </div>
//             <div class="col-3">
//               <p class="fs-14 ws-15 tlalign mgl9px"><span class=" fw-600 ">${detail.price}<span> ${config.priceUnit}</p>
//             </div>
//           </div>
//           <hr class="hr">
//         `;
// }
