"use strict";
class FileManager {

    #routes = {
        newFolder: "/submit/vod/explorer/new-folder",
        removeFolder: "/submit/vod/explorer/remove-folder",
        removeFile: "/submit/vod/explorer/remove-file"
    };

    constructor(folders, display, filesDisplay) {
        this.folders = folders;
        this.files = [];
        this.back = false;
        this.up = false;
        this.current = '0';
        this.parent = '0';
        this.display = display;
        this.filesDisplay = filesDisplay;
        this.render(folders.filter(folder => folder.vf_parentid === "0"));
    }

    navigate(folderID) {
        this.back = this.current;
        this.current = folderID.toString();
        this.getFiles(this.current);
        this.parent = this.folders.find(f => f.vfid === this.current);
        const up = this.folders.find(f => f.vfid === this.current);
        if (typeof up === "undefined" || typeof up.vf_parentid === "undefined") this.up = false;
        else this.up = true;
        this.render(this.folders.filter(folder => folder.vf_parentid === this.current));
    }

    goBack() {
        this.navigate(this.back);
    }

    goUp() {
        this.navigate(this.folders.find(f => f.vfid === this.current).vf_parentid);
    }

    folderPath(folder = this.current) {
        let path = [];
        let temp = this.folders.find(f => f.vfid === folder);
        while (typeof temp.vf_parentid !== "undefined" && temp.vf_parentid !== 0) {
            path.unshift(temp.vfname);
            temp = temp.vf_parentid;
        }
        console.log(temp);
        return path.join('/');
    }

    newFolder(name, validation, callback) {
        if (!validation()) return;
        const method = "POST";
        let body = new FormData();
        body.append("name", name);
        body.append("parent", this.current);
        fetch(this.#routes.newFolder, { method, body })
            .then(res => res.json())
            .then(j => {
                showAlert(j.status, j.message);
                if (j.status !== "success") return callback("error");
                this.display.insertAdjacentHTML('beforeend', this.makeRow({
                    vfid: j.id.toString(),
                    vf_updatedate: j.now,
                    vfname: name
                }));
                this.folders.push({
                    vfid: j.id.toString(),
                    vf_updatedate: j.now,
                    vfname: name,
                    vf_parentid: this.current
                });
                if (ID('empty_state')) ID('empty_state').remove();
                callback("success");
            })
            .catch(ex => {
                showAlert("error", "خطا در برقراری ارتباط");
                console.error(ex);
                callback("error");
            });
    }

    removeFolder(id, callback) {
        const method = "POST";
        let body = new FormData();
        body.append("folder", id);
        fetch(this.#routes.removeFolder, { method, body })
            .then(res => res.json())
            .then(j => {
                showAlert(j.status, j.message);
                if (j.status !== "success") return callback(id, "error");
                this.folders = this.folders.filter(folder => folder.vfid != id);
                if (this.folders.length < 1) return this.renderEmpty();
                callback(id, "success");
            })
            .catch(ex => {
                showAlert("error", "خطا در برقراری ارتباط");
                console.error(ex);
                callback(id, "error");
            });
    }

    async getFiles(folder) {
        folder = folder.toString();
        if (typeof this.files[folder] !== "undefined") return this.renderFiles(this.files[folder]);
        const files = await fetch(`/submit/vod/explorer/get-files/${folder}`)
            .then(r => r.json())
            .then(j => j.data ?? [])
            .catch(e => console.log(e));

        this.files[folder] = [...files];
        this.files[folder] = this.files[folder].map(file => {
            file.location = this.folderPath(folder);
            return file;
        });
        this.renderFiles(this.files[folder]);
    }

    removeFile(id, callback) {
        const method = "POST";
        let body = new FormData();
        body.append("file", id);
        fetch(this.#routes.removeFile, { method, body })
            .then(res => res.json())
            .then(j => {
                showAlert(j.status, j.message);
                if (j.status !== "success") return callback(id, "error");
                this.files = this.files.map(folder => folder.filter(file => file.vvid != id));
                callback(id, "success");
            })
            .catch(ex => {
                showAlert("error", "خطا در برقراری ارتباط");
                console.error(ex);
                callback(id, "error");
            });
    }

    render(rows) {
        this.display.innerHTML = !this.up ? '' : this.makeUp();
        if (this.folders.length < 1) return this.renderEmpty();
        else if (ID('empty_state')) ID('empty_state').remove();
        rows.forEach(row => this.display.innerHTML += this.makeRow(row));
    }
    renderFiles(files) {
        this.filesDisplay.innerHTML = '';
        files.forEach(file => this.filesDisplay.innerHTML += this.makeFileRow(file));
    }
    renderEmpty() {
        this.display.innerHTML = `
            <tr id="empty_state" onclick="$('#addNewFileManager').modal('show')"><td>
                <div class="card-empty w-100 h-100 d-flex flex-column justify-content-center align-items-center" style="padding-top: 20px;">
                    <div class="empty-state-image text-center">
                        <img src="/general/images/emptystate/img_empty_records.png" alt="">
                    </div>    
                    <p class="card-text emptyState-text" style="word-spacing: -2px;margin-bottom:13px;margin-top:-7px;">فایل و فولدر جدید بسازید</p>
                </div>
            </td></tr>
        `;
    }
    makeRow(row) {
        return `<tr class="position: relative" id="rose-${row.vfid}" onclick="fileManager.navigate(${row.vfid})"><td><div class="accordion-item position-relative" id="mainRow-2">
        <h2 class="accordion-header">
            <button class="accordion-button w-100  filemanagerList" type="button" sdata-bs-toggle="collapse" sdata-bs-target="#active-flush-1" saria-expanded="false" saria-controls="active-flush-1">
                <div class="col-3 col-sm-3 col-md-3 col-lg-2 position-relative">
                    <ul class="d-flex justify-content-center align-items-center list-unstyled mb-0 fnlist">
                        <li class="remove-item" title="حذف" 
                            onclick="event.stopPropagation();beforeDeleteFolder(${row.vfid})">
                            <span>
                                <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="حذف" src="/general/images/new/ico_delete.svg">
                            </span>
                            <span class="fnlist-title">حذف</span>
                        </li>
                    </ul>
                </div>
                <div class="col-3 col-sm-3 col-md-2 text-center">
                    <p class="mb-0">${row.vf_updatedate}</p>
                </div>
                <div class="col-3 col-sm-4 col-md-3 text-center">
                </div>
                <div class="col-6 col-sm-4 col-md-5">
                    <p class="mb-0 fs-14 tl ltr">
                        <img class="ms-2" src="/general/images/root/table/ico_destination.svg" alt=""> 
                        ${row.vfname}
                    </p>
                </div>
            </button>
        </h2>
    </div></td></tr>
`;
    }
    makeFileRow(row) {
        return `
            <tr id="frose-${row.vvid}" onclick="window.open('${VOD_DOMAIN}/${row.location}/${row.vv_name}')">
                <td>
                    <div class="accordion-item position-relative" id="fileRow-${row.vvid}">
                        <h2 class="accordion-header">
                            <button
                                class="accordion-button w-100 filemanagerList"
                                type="button" sdata-bs-toggle="collapse" sdata-bs-target="#active-flush-1" 
                                saria-expanded="false" saria-controls="active-flush-1">
                                
                                <div class="col-3 col-sm-3 col-md-3 col-lg-2 position-relative">
                                    <ul class="d-flex justify-content-center align-items-center list-unstyled mb-0 fnlist">
                                        <li class="remove-item" title="حذف" onclick="event.stopPropagation();beforeDeleteVideo('${row.vvid}')">
                                            <span>
                                                <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="حذف"  src="/general/images/new/ico_delete.svg">
                                            </span>
                                            <span class="fnlist-title">حذف</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-3 col-sm-3 col-md-2 text-center">
                                    <p class="mb-0">${row.vf_updatedate}</p>
                                </div>
                                <div class="col-3 col-sm-4 col-md-3 text-center">
                                    <p class="mb-0 enFont fileSize">${row.vv_length}</p>
                                </div>
                                <div class="col-6 col-sm-4 col-md-5">
                                    <p class="mb-0 fs-14 tl ltr">
                                        <img class="ms-2" src="/general/images/new/ico_add_rule.svg" alt="">
                                        ${row.vv_name}
                                    </p>
                                </div>
                            </button>
                        </h2>
                    </div>
                </td>
            </tr>
        `;
    }
    makeUp() {
        return `
            <tr onclick="fileManager.goUp()"><td><div class="accordion-item position-relative" id="back">
                <h2 class="accordion-header">
                    <button class="accordion-button w-100 filemanagerList">
                        <p class="mb-0 fs-14 tl ltr levelUp"><span>
                            <img class="ms-2" src="/general/images/new/ico_sub.svg" alt=""> ...
                        </span></p>
                    </button>
                </h2>
            </div></td></tr>
        `;
    }
}