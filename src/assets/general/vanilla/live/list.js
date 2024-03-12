"use strict";

function getList() {
    return fetch();
}

function renderFetcher(element = '#stream-table tbody') {
    document.querySelector('#stream-table thead').classList.add('d-none');
    return document.querySelector(element).insertAdjacentHTML(
        'afterbegin', `<div class="three-dots-loading" id="fetcher"></div>`
    );
}
function clearFetcher(element = '#stream-table tbody') {
    document.querySelector('#stream-table thead').classList.remove('d-none');
    return document.querySelector(element + ' #fetcher').remove();
}

function renderEmptyState(element = '#stream-table tbody') {
    return document.querySelector(element).innerHTML = `
        <tr class="odd">
            <td>
                <div 
                    class="card-empty w-100 h-100 d-flex flex-column justify-content-center align-items-center" 
                    style="padding-top: 20px;"
                >
                    <img src="/general/images/card/no_domain_added_state.png">
                    <p 
                        class="card-text emptyState-text" 
                        style="word-spacing: -2px;margin-bottom:13px;margin-top:-7px;"
                    >
                    
                    همین حالا می‌توانید برنامه‌تان را به دنیا نشان دهید.
                    
                    </p>
                    <button 
                        type="button" 
                        onclick="Redir('/live/create')"
                        class="btn btn-white-100 btn-sm-100-icon border-s-1-gray-100 rounded-pill"
                    >
                        <img style="margin-top: -3px;" src="/general/images/root/ico_add_wsp.png">

                        پخش زنده جدید

                    </button>
                </div>
            </td>
        </tr>
    `;
}

async function renderList() {
    const DATA = await getList();
    return DATA.map((data, index) => `
        <tr>
            <td>
                <div 
                    class="accordion-item position-relative" 
                    id="mainRow-${index}"
                >
                    <h2 class="accordion-header">
                        <button 
                            class="accordion-button w-100 collapsed streamList"
                            type="button"
                            sdata-bs-toggle="collapse"
                            sdata-bs-target="#active-flush-${index}" 
                            saria-expanded="false"
                            saria-controls="active-flush-${index}"
                        >
                            <div class="col-3 col-sm-4 col-md-3 position-relative">
                                <ul class="d-flex justify-content-center align-items-center list-unstyled mb-0 fnlist">
                                    <li onclick="Redir('/vod/live/edit')" class="modal-opener">
                                        <span>
                                            <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="ویرایش" src="/general/images/new/ico_manage.svg">
                                        </span>
                                        <span class="fnlist-title">ویرایش</span>
                                    </li>
                                    <li class="remove-item" title="حذف" onclick="">
                                        <span>
                                            <img data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="حذف" src="/general/images/new/ico_delete.svg">
                                        </span>
                                        <span class="fnlist-title">حذف</span>
                                    </li>
                                </ul>
                                <span class="fnlist-options">
                                    <img src="/general/images/root/topMenu/ico_dotted_ico.svg">
                                </span>
                            </div>
                            <div class="col-3 col-sm-3 col-md-2 text-center archive-status">
                                <span class="fs-13">فعال</span>
                            </div>
                            <div class="col-6 col-sm-5 col-md-7 stream-table-title-col">
                                <p class="mb-0 fs-14 tl">
                                    test hhbdcscbh jdcnbsjdcnbs,
                                </p>
                            </div>
                        </button>
                    </h2>
                </div>
            </td>
        </tr>
    `);
}

function removeLive() {
    const callback = async function () {

    }
    myDeleteSWA(
        callback,
        'اخطار',
        'آیا از حذف این پخش زنده اطمینان دارید؟'
    );
}

function destroyDataTable() {
    return $('#stream-table').DataTable().destroy();
}

function initializeDataTable() {
    var countofRecords = $("#stream-table tbody tr").length;

    $("#stream-table").DataTable({
        "destroy": true,
        "pageLength": 10,
        "pagingType": "simple_numbers",
        "bInfo": false,
        "lengthChange": false,
        language: {
            search: ""
        },
        "emptyTable": "پخش زنده ای موجود نیست",
        "order": []
    });
    if (countofRecords <= 10)
        $("#stream-table_paginate").addClass("d-none")
    else
        $("#stream-table_paginate").removeClass("d-none")

    $('.dataTables_filter input').addClass('searchbox my-0 border rounded-pill text-start w-100 fs-12  bg-white ws-10  border-1 px-4'); // <-- add this line
    $('.dataTables_filter input').attr("placeholder", "جستجو");
}