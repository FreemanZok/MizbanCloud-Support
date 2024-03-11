// async function submitAddDomain() {
//    const domain = document.getElementById('txtdomain').value ;
//    let rBody = new FormData();
//    rBody.append("domain", domain);
//    const response = await fetch("/submit/add-domain", {
//       method: "POST",
//       body: rBody
//    }).then(res => res.json()).then(resj => resj).catch(ex => window.location.reload());
//    console.log(response);
//    if (typeof response.redirectRoute === "undefined") {
//       // changetoBack('3','2');
//       // changetoBack('2','1');
//       return mySWA("err", response.message);
//    }

//    window.location.href = redirectRoute;
// }