

async function removeServers(id) {

    $("#fetcher-full-" + id).removeClass("d-none");
    let serverInfo = new FormData();
    serverInfo.append('serverId', id);
    const result = await fetch('/submit/cloud/servers/remove-server', { method: 'POST', body: serverInfo })
        .then(response => response.json())
        .then(j => j).catch(ex => window.location.reload());

    showAlert(result.status, result.message);
    if (result.status === 'success') {
        $("#img-status-" + id).attr("src", "/general/images/root/table/danger.svg");
        $("#img-status-" + id).attr("data-bs-original-title", "حذف شده");
        $("#img-status-" + id).attr("title", "حذف شده");
        $("#server_status-" + id).html("حذف شده");
        $("#fetcher-full-" + id).addClass("d-none");
    }
    $("#fetcher-full-" + id).addClass("d-none");
}


async function toggleServers(id) {
    let server_status = document.getElementById("power-dom-" + id);
    const status_value = server_status.getAttribute('data-value');
    let toggleServer = new FormData();

    toggleServer.append('serverId', id);
    toggleServer.append('serverStatus', status_value);


    const result = await fetch('/submit/cloud/servers/toggle-server', { method: 'POST', body: toggleServer })
        .then(response => response.json())
        .then(j => j).catch(ex => window.location.reload());

    showAlert(result.status, result.message);

    // showAlert(result);

    if (result.status === "success") {

        if (status_value === "shutdown") {
            $(".server-img-id-" + id).attr("src", "/general/images/new/server_on.svg");
            document.getElementById('power-dom-' + id).style.opacity = "1";
            $("#server_status-" + id).html("<span class='fs-13 text-green-400'>فعال</span>")
            document.getElementById('server_status-' + id).innerHTML = "<span class='fs-13 text-green-400'>فعال</span>";
            server_status.setAttribute("data-value", "active");
            $("#img-status-" + id).attr("src", "/general/images/root/table/active.svg");
        } else {
            // document.getElementById('power-dom-'+id).style.opacity = "0.5";
            $("#server_status-" + id).html("<span class='fs-13 text-red-400'>خاموش</span>")
            document.getElementById('server_status-' + id).innerHTML = "<span class='fs-13 text-red-400'>خاموش</span>";
            server_status.setAttribute("data-value", "shutdown");
            $(".server-img-id-" + id).attr("src", "/general/images/new/server_off.svg");
            $("#img-status-" + id).attr("src", "/general/images/root/table/danger.svg");
        }
    }
}
