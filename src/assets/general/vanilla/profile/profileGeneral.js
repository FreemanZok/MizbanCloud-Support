let currentTab = 1;

function magicButton() {
  document.querySelector("body").scrollTop = 0;
  document.documentElement.scrollTop = 0;
  if (currentTab === 1) submitOne();
  if (currentTab === 2) submitTwo();
  if (currentTab === 3) submitThree();
}


function submitOne() {
  submit1();
}
function submitTwo() {
  submit2();
}
function submitThree() {
  submit3();
}

function notification(errorMessage, asset) {
  showAlert('success', errorMessage, '');
}

// Helpers
function makeNotification(errText, id, asset) {
  const a = `
    <div id="${id}" class="alert alert-hover-show d-flex bg-light-100 px-4 py-2-5 position-relative
                align-items-center justify-content-between shadow-sm rounded-pill alert-dismissible fade show fancy-shadow" role="alert">
      <div class="d-flex align-items-center">
        <img class="me-2-5" src="/dashboard/general/images/root/alerts/${asset}">
        <p class="mb-0 fs-14 line-h-1-5 ws-05 text-gray-600 ls-02 user-select-none 4c">${errText}</p>
      </div>
    </div>
  `;

  return a;
}

function makeId(length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


function renderTab1() {

  currentTab = 1;
}

function renderTab2() {

  currentTab = 2;
}

function renderTab3() {

  currentTab = 3;
}


function showAlert(status = 'success', text = '', key=''){
  magicButton
  // if(document.getElementById('dvalert').classList.contains('alert-border-success')) {
  //   document.getElementById('dvalert').classList.remove('alert-border-success')
  // }
  // if (document.getElementById('dvalert').classList.contains('alert-border-danger')) {
  //     document.getElementById('dvalert').classList.remove('alert-border-danger')
  // }
  // if (status === 'success') {
  //   $("#dvalert").addClass("alert-border-success");
  //   document.getElementById("img").setAttribute(`src`,`general/images/root/alerts/ico_message_check.svg`);
  // }else {
  //   $("#dvalert").addClass("alert-border-danger");
  //   document.getElementById("img").setAttribute(`src`,`general/images/root/alerts/ico_message_warn.svg`);
  // }
  // document.getElementById('popop').innerHTML = text;
  // document.getElementById('popopki').innerHTML = key;
  // $("#dvalert").fadeOut(0);
  // $(".progressloader").html('');
  // $(window).scrollTop(0);
  // $("#dvalert").fadeIn(400);
  // var bar = new ProgressBar.Circle('.progressloader', {
  //   strokeWidth: 10,
  //   easing: 'easeInOut',
  //   duration: 5000,
  //   color: '#59C2E2',
  //   trailColor: '#eee',
  //   trailWidth: 1,
  //   svgStyle: null,
  // });

  // bar.animate(1.0);
  // setTimeout(function(){
  //   $("#dvalert").fadeOut(400);
  //   $(".progressloader").html('');

  // }, 5000);


  $('#dvalert-wrap').append(`<div class="login-alert shadow-sm animated animatedFadeInUp fadeInUp ${status === 'success' ? 'success-alert' : 'error-alert'}">
        <img id="img" class="img-alert" src="${status === 'success' ? '/general/images/root/alerts/img_success-8.png' : '/general/images/root/alerts/img_error-8.png'}" />
        <p class="alert-cont">
        <span id="alert-stat">${status === 'success' ? 'موفق !' : 'خطا !'}</span>
        <span id="popop" class="fs-13" style="word-spacing:-1px;">${text}
        </span>
        </p>
        <span id="popopki" class="fs-13 alert-command">${key}
        </span>
    </div>`);
    $("#dvalert-wrap .login-alert").fadeOut(0);
    $(".progressloader").html('');
    $("#dvalert-wrap .login-alert").fadeIn(200);

    $('#dvalert-wrap .login-alert').length;

    document.querySelectorAll('.login-alert').forEach(alert => {
        setTimeout(function () {
            $(alert).fadeOut(200);
            $(alert).remove();
        }, 5000);
    });

}
