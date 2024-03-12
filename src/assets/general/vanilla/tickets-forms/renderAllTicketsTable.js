let tableData = [], closedTableData = [], rawData, allData = [];

var getTableData = async function() {
  tableData = []; allData = []; rawData = null; closedTableData = [];
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
  $("#ticketTable").kendoGrid({
    columns: [
      {
        template: "<span class='text-navy-blue-600 fs-12 fw-400 iranyekanFa w-100 text-start d-block'>#:data.id#</span>",
        field: "id",
        title: "<img src='/general/images/root/table/arrows.svg'><span class='fs-13 ws-05 ls-01 fw-400 iranyekanFa'> شماره تیکت</span>",
        width: "30px"
      },
      {
        template: `<span  class='text-navy-blue-600 text-nowrap fs-13 ls-03 w-100 d-flex align-items-center iranyekanFa deactivelineTickt'><img style='margin-left: 3px;' src='/general/images/root/table/#:data.status#.svg'> <a style='text-decoration: none;' class="text-navy-blue-600 fs-12 fw-400 iranyekanFa" href='/support/tickets/open-ticket/#:data.id#'>#:data.title#</a> </span>`,
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
    dataSource: allData,
    sortable: true,
    height: 261
  }

  )


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
}
$(document).ready(function () {
  getTableData();
});
