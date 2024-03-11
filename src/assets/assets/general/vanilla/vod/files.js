"use strict";
const ID = (id) => document.getElementById(id);
const QS = (Q) => document.querySelector(Q);
let fileManager;
fetch('/submit/vod/explorer/get-data')
    .then(response => response.json())
    .then(j => {
        fileManager = new FileManager(
            j.datasaf,
            ID("filemanagerList"),
            ID("filemanagerListFiles")
        )
    })
    .catch(ex => console.error(ex));


function beforeCreateFolder() {

    if (!/^[A-Za-z0-9 _\-]+$/.test(ID('newFolderName').value.trim())) {
        ID('newFolderName').classList.add('alert-danger-border');
        return false;
    }

    ID('btn-newfolder').innerHTML = `<img src="/general/loading/tail-spin.svg" />`;
    ID('btn-newfolder').disabled = true;
    ID('newFolderName').classList.remove('alert-danger-border');
    return true;
}

function afterCreateFolder(status) {
    ID('btn-newfolder').innerHTML = `اضافه کردن`;
    ID('btn-newfolder').disabled = false;
    if (status !== "success") return;
    $('#addNewFileManager').modal('hide');
    ID('newFolderName').value = '';
}

function beforeDeleteFolder(id) {
    const callback = function () {
        ID(`rose-${id}`).innerHTML += '<div onclick="event.stopPropagation()" class="three-dots-loading" id="fetcher"></div>';
        fileManager.removeFolder(id, afterDeleteFolder);
    }
    return myDeleteSWA(callback, 'اخطار', 'آیا از حذف این پوشه اطمینان دارید؟');
}

function afterDeleteFolder(id, status) {
    QS(`#rose-${id} #fetcher`).remove();
    if (status === "success")
        QS(`#rose-${id}`).remove();
}

function beforeDeleteVideo(id) {
    const callback = () => {
        ID(`frose-${id}`).innerHTML += '<div onclick="event.stopPropagation()" class="three-dots-loading" id="fetcher"></div>';
        fileManager.removeFile(id, afterDeleteVideo);
    }
    mySWA(callback, 'اخطار', 'آیا از حذف این فایل اطمینان دارید؟');
}

function afterDeleteVideo(id, status) {
    QS(`#frose-${id} #fetcher`).remove();
    if (status === "success")
        QS(`#frose-${id}`).remove();
}