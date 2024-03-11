async function changeStateUri(state, newDomain, newDomainid, newWebsite, newWebsiteid) {
    document.getElementById("fetcher-full").classList.remove("d-none");
    const uri = `/cdn/${newDomain}/${newDomainid}/${newWebsite}/${newWebsiteid}/acceleration`;
    window.history.pushState(state, title, uri);
    document.title = `Client Mizban | Acceleration`;
    $domain = newDomain;
    $did = newDomainid;
    $website = newWebsite;
    $wid = newWebsiteid;
    let dDom = document.querySelectorAll('.domainDom');
    let wDom = document.querySelectorAll('.websiteDom');
    dDom.forEach(dom => dom.innerHTML = newDomain);
    wDom.forEach(dom => dom.innerHTML = newWebsite);
    await setSpaData();
    urlStateShifter($domain,$did,$website,$wid);
    document.getElementById("fetcher-full").classList.add("d-none");
}
 
async function setSpaData() {
    let rBody = new FormData();
    rBody.append("wid", $wid);
    const result = await fetch("/submit/cdn/acceleration/website/spa-data", {method:"POST", body: rBody})
    .then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
    console.log(result);
    //css
    if ( result.css == "active" ) {
        document.getElementById("css_switch").checked = true;
    } else {
        document.getElementById("css_switch").checked = false;
    }

    //js
    if ( result.js == "active" ) {
        document.getElementById("javascript_switch").checked = true;
    } else {
        document.getElementById("javascript_switch").checked = false;
    }

    //html
    if ( result.html == "active" ) {
        document.getElementById("html_switch").checked = true;
    } else {
        document.getElementById("html_switch").checked = false;
    }

    //resize
    if ( result.resize == "active" ) {
        document.getElementById("resize_image_switch").checked = true;
    } else {
        document.getElementById("resize_image_switch").checked = false;
    }

    //gzip
    if ( result.gzip == "active" ) {
        document.getElementById("gzip_switch").checked = true;
    } else {
        document.getElementById("gzip_switch").checked = false;
    }
}





async function ChangeCssStatus(self) {
    let rBody = new FormData();
    document.getElementById("fetcher1").classList.remove("d-none");
    rBody.append("websiteid", $wid);
    rBody.append("mintype", "css");
    let minstatus = document.getElementById("css_switch").checked ? "1" : "0";
    rBody.append("minstatus", minstatus);
    const result = await fetch("/submit/cdn/acceleration/update-status", {method:"POST", body: rBody})
    .then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
    console.log(result);
    document.getElementById("fetcher1").classList.add("d-none");
    showAlert(result.status, result.message);
    if ( result.status !== "success" ) {
        document.getElementById("css_switch").checked = false;
    }
}

async function ChangeJsStatus(self) {
    document.getElementById("fetcher1").classList.remove("d-none");
    let rBody = new FormData();
    rBody.append("websiteid", $wid);
    rBody.append("mintype", "js");
    let minstatus = document.getElementById("javascript_switch").checked ? "1" : "0";
    rBody.append("minstatus", minstatus);
    const result = await fetch("/submit/cdn/acceleration/update-status", {method:"POST", body: rBody})
    .then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
    console.log(result);
    document.getElementById("fetcher1").classList.add("d-none");
    showAlert(result.status, result.message);
    if ( result.status !== "success" ) {
        document.getElementById("javascript_switch").checked = false;
    }
}

async function ChangeHTMLStatus(self) {
    document.getElementById("fetcher1").classList.remove("d-none");
    let rBody = new FormData();
    rBody.append("websiteid", $wid);
    rBody.append("mintype", "html");
    let minstatus = document.getElementById("html_switch").checked ? "1" : "0";
    rBody.append("minstatus", minstatus);
    const result = await fetch("/submit/cdn/acceleration/update-status", {method:"POST", body: rBody})
    .then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
    console.log(result);
    document.getElementById("fetcher1").classList.add("d-none");
    showAlert(result.status, result.message);
    if ( result.status !== "success" ) {
        document.getElementById("html_switch").checked = false;
    }
}

async function ChangeResizeStatus(self) {
    let rBody = new FormData();
    document.getElementById("fetcher3").classList.remove("d-none");
    rBody.append("websiteid", $wid);
    rBody.append("mintype", "resizeimage");
    let minstatus = document.getElementById("resize_image_switch").checked ? "1" : "0";
    rBody.append("minstatus", minstatus);
    const result = await fetch("/submit/cdn/acceleration/update-status", {method:"POST", body: rBody})
    .then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
    console.log(result);
    document.getElementById("fetcher3").classList.add("d-none");
    showAlert(result.status, result.message);
    if ( result.status !== "success" ) {
        document.getElementById("resize_image_switch").checked = false;
    }
}

async function ChangeGzipStatus(self) {
    let rBody = new FormData();
    document.getElementById("fetcher1").classList.remove("d-none");
    rBody.append("websiteid", $wid);
    rBody.append("mintype", "gzip");
    let minstatus = document.getElementById("gzip_switch").checked ? "active" : "deactive";
    rBody.append("minstatus", minstatus);
    const result = await fetch("/submit/cdn/acceleration/update-status", {method:"POST", body: rBody})
    .then(r => r.json()).then(rj => rj).catch(ex => window.location.reload());
    console.log(result);
    document.getElementById("fetcher1").classList.add("d-none");
    showAlert(result.status, result.message);
    if ( result.status !== "success" ) {
        document.getElementById("gzip_switch").checked = false;
    }
}
