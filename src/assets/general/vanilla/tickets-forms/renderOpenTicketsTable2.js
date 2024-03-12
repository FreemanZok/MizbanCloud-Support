let tableData = [], closedTableData = [], rawData, allData = [];

var getTableDataO = async function () {
  tableData = [];
  allData = [];
  rawData = null;
  closedTableData = [];
  await fetch('/submit/support/get-data', {
    method: 'POST',
  }).then(R => R.json()).then(RJ => rawData = RJ).catch(ex => window.location.reload());
  rawData.forEach(row => {
    let tempObj = {
      id: row['id'],
      department: row['department'],
      description: row['description'],
      title: row['title'],
      time: row['lastreplytime'],
      status: row['status']
    };
    if (row.isbold == "bold")
      tempObj.description = `<strong> ${tempObj.description} </strong>`;

    allData.push(tempObj);
    if (row.status == 'closed')
      closedTableData.push(tempObj);
    else
      tableData.push(tempObj);


  });
  if (tableData.length > 0) {
    document.querySelector('.tbodybody').innerHTML = '';
    tableData.forEach(tRow => {

      document.querySelector('.tbodybody').innerHTML += `
    <tr onclick="document.location.href = '/support/tickets/open-ticket/${tRow.id}'" class="text-navy-blue-600 fs-12 fw-400 iranyekanFa">
    <td>${tRow.id}</td>
    <td> <img src='/general/images/root/table/${tRow.status}.svg'> </td>
    <td class="aid" style="text-align: right !important;"><a class="text-navy-blue-600 fs-12 fw-400 iranyekanFa" style="text-decoration:none;max-width: 120px"> ${tRow.title}</a></td>
    <td>${tRow.time}</td>

    </tr>
    `
    });
    $.fn.DataTable.ext.pager.numbers_length = 6;
    $(document).ready(function () {
      setTimeout(
        function () {
          let table = $('#openTick').DataTable(
            {
               "paging": true,
              "info": false,
               "pageLength": 15,
               "pagingType": "simple_numbers",
              "oLanguage": {
                "sEmptyTable":     "هیچ محصول یا سرویسی یافت نشد",
                "sInfo":           "نمایش _START_ تا _END_ از مجموع _TOTAL_ مقدار",
                "sInfoEmpty":      "نمایش 0 تا 0 از 0 مورد",
                "sInfoFiltered":   "(filtered from _MAX_ total entries)",
                "sInfoPostFix":    "",
                "sInfoThousands":  ",",
                "sLengthMenu":     "نمایش _MENU_ مقادیر",
                "sLoadingRecords": "در حال انجام...",
                "sProcessing":     "در حال پردازش ...",
                "sSearch":         "",
                "sZeroRecords":    "هیچ تیکتی یافت نشد",
                "oPaginate": {
                  "sFirst":    "اول",
                  "sLast":     "آخر",
                  "sNext":     "بعدی",
                  "sPrevious": "قبلی"
                }

              },
            }
          );
          $("#openTick_paginate").addClass('pageNumbersUI');
          $("#openTick_filter").remove();
          $('#ticketTable').scrollLeft($(this).height());
          $("th").removeAttr("style");
          $("#pga").append($("#openTick_paginate"));
          $('#searchQuery').on('keyup', function () {
            table
              .search(this.value)
              .draw();

              $(".dataTables_empty").innerHTML = `تیکتی پیدا نشد`;
          });

        }

        , 500);
    });

  }




    //
    // $('#openTick').on('search.dt', function() {
    //   var value = $('#searchQuery').val();
    //   console.log(value); // <-- the value
    // });
    /*
    $("#ticketTable").kendoGrid({
      columns: [
        {
          template: "<span class='text-navy-blue-600 fs-12 fw-400 iranyekanFa w-100 text-start d-block'>#:data.id#</span>",
          field: "id",
          title: "<img src='/general/images/root/table/arrows.svg'><span class='fs-13 ws-05 ls-01 fw-400 iranyekanFa'> شماره تیکت</span>",
          width: "30px"
        },
        {
          template: `<span  class='text-navy-blue-600 text-nowrap fs-13 ls-03 w-100 d-flex align-items-center iranyekanFa deactivelineTickt'><img style='margin-left: 3px;' src='/general/images/root/table/#:data.status#.svg'> <a style='text-decoration: none;'  class="text-navy-blue-600 fs-12 fw-400 iranyekanFa" href='/support/tickets/open-ticket/#:data.id#'>#:data.title#</a> </span>`,
          field: "title",
          title: "<span class='fs-13 ws-05 w-100 ls-01 fw-400 iranyekanFa '>عنوان تیکت</span>",
          width: "70px"
        },
        {
          template: "<span class='text-navy-blue-600 fs-12 fw-400 iranyekanFa'>#:data.time#</span>",
          field: "time",
          title: "<img src='/general/images/root/table/arrows.svg'><span class='fs-13 ws-05 ls-01 fw-400 iranyekanFa'> تاریخ ایجاد تیکت</span>",
          width: "50px"
        },
        {
          template: "<span  class='text-navy-blue-600 text-nowrap fs-13 ls-03 iranyekanFa'>#:data.department#</span>",
          field: "department",
          title: "<span class='fs-13 ws-05 ls-01 fw-400 iranyekanFa'>واحد پشتیبانی</span>",
          width: "42px"
        },
      ],
      dataSource: tableData,
      sortable: true,
      height: 261
    });

    $('td .deactiveline').each(function (index) {
      for (var i = 0; i < $(this).text().length; ++i) {
        if (i > 19) {
          $(this).addClass('activeline')
        }
      }
    });

    $('td .deactivelineTickt').each(function (index) {
      for (var i = 0; i < $(this).text().length; ++i) {
        if (i > 28) {
          $(this).addClass('activelineTickt')
        }
      }
    });

     */
  }

