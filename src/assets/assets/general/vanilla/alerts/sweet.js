function mySWA(callback , title = 'اخطار', html = 'اخطار' , icon = 'question', yes = 'قبول', no = 'خیر') {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'fw-400 next btn btn-sm fs-14 px-4 btn-blue-100 ws-15 border-0 rounded-pill',
      cancelButton: 'btn btn-sm fs-13 px-4 btn-white-100 ws-15 border-0'
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
      title: title,
      html: html,
      //timer: 3000,
      icon: icon,
      timerProgressBar: true,
      confirmButtonText: yes,
      showCancelButton: true,
      cancelButtonText: no,
      didOpen: () => {
          timerInterval = setInterval(() => {
          }, 100)
      },
      willClose: () => {
          clearInterval(timerInterval)
      }
  }).then((result) => {
      $("#txtdomain").focus();
  });
  var al=$(".swal2-modal").html();
  $(".swal2-modal").html("");
  var nal="<div id='sml'>"+al+"</div>";
  $(".swal2-modal").html(nal);
  $(".swal2-cancel").click(function(){
    swalWithBootstrapButtons.close();
  })
  $(".swal2-confirm").click(function(){
    swalWithBootstrapButtons.close();
    callback();
  })

return;
}

function myDeleteSWA(callback , title = 'اخطار', html = 'اخطار' , icon = 'question', yes = 'قبول', no = 'خیر') {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'fw-400 next btn btn-sm fs-14 px-4 btn-blue-100 ws-15 border-0 rounded-pill swal2-delete ',
      cancelButton: 'btn btn-sm fs-13 px-4 btn-white-100 ws-15 border-0'
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
      title: title,
      html: html,
      //timer: 3000,
      icon: icon,
      timerProgressBar: true,
      confirmButtonText: yes,
      showCancelButton: true,
      cancelButtonText: no,
      didOpen: () => {
          timerInterval = setInterval(() => {
          }, 100)
      },
      willClose: () => {
          clearInterval(timerInterval)
      }
  }).then((result) => {
      $("#txtdomain").focus();
  });
  var al=$(".swal2-modal").html();
  $(".swal2-modal").html("");
  var nal="<div id='sml'>"+al+"</div>";
  $(".swal2-modal").html(nal);
  $(".swal2-cancel").click(function(){
    swalWithBootstrapButtons.close();
  })
  $(".swal2-confirm").click(function(){
    swalWithBootstrapButtons.close();
    return callback();
  })

return;
}