var auth2 = null;
var userGoogleInfo = {};
var startInitLoginByGoogle = function() {
  gapi.load('auth2', initSigninWithGoogle);
};
var initSigninWithGoogle = function() {
    auth2 = gapi.auth2.init({
        client_id: '268066960004-054ph7q5aovqbtgum2uu56fhfdfmq7vp.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'https://www.googleapis.com/auth/adwords'  
    });
    auth2.currentUser.listen(userChanged);
};

var userChanged = function userChanged(googleUser){
  if (googleUser && googleUser.getBasicProfile()){
    userGoogleInfo.getId = googleUser.getBasicProfile().getId();
    userGoogleInfo.getName = googleUser.getBasicProfile().getName();
    userGoogleInfo.getEmail = googleUser.getBasicProfile().getEmail();
    userGoogleInfo.getImageUrl = googleUser.getBasicProfile().getImageUrl();
    userGoogleInfo.id_token = googleUser.getAuthResponse().id_token;
  }
}

function signInCallback(authResult) {
    
    if (authResult['code']) {
        var postVal = {};
        postVal.g_code = authResult['code'];
        postVal.appid = '268066960004';
        postVal.retailerId = '1';
        postVal.targetUrl =btoa(window.location.href);
        $.post("https://admin.fff.com.vn/v7/google/loginGoogle.php", postVal, function(result) {
            result = jQuery.parseJSON(result);
            if (result) {
                window.location = result.target;
            }
        });
    } else {
      //login error 
    }
  }

function attachSignin(element) {
  auth2.attachClickHandler(element, {},
      function(googleUser) {
        document.getElementById('name').innerText = "Signed in: " +
            googleUser.getBasicProfile().getName();
      }, function(error) {
      });
}
function loginWithGoogleInformation(){
    if (userGoogleInfo.getEmail){
        var postVal = {}; 
        postVal.token = userGoogleInfo.id_token;
        postVal.appid = '268066960004';
        postVal.retailerId = '1';
        postVal.email = userGoogleInfo.getEmail;
        postVal.targetUrl =btoa(window.location.href);
        $.post("https://admin.fff.com.vn/v7/google/checkTokenGoogle.php", postVal, function(result) {
            result = jQuery.parseJSON(result);
            window.location = result.target;
        });
        
    }else{
        loginfistTimeWithGoogle();
    }
}
function loginfistTimeWithGoogle(){
    auth2.grantOfflineAccess().then(signInCallback);
}

startInitLoginByGoogle();

$(document).ready(() => {
  if ( url.searchParams.get("requestUpdate") == "phone") showRequestPhoneModal();
function validPhone(phone){
  var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  if (vnf_regex.test(phone) == false) 
  {
     return false;
  }else{
      return true;
  }
}
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function showRegisterModal() {
  Swal.fire({
      html: `
        
        <div class="text-center pt-4 pb-3"><a href="https://admin.fff.com.vn"><img width="60px" src="https://admin.fff.com.vn/assets/v7/logo-v7.png"></a>
        <div class="tagLine">3F Solutions - Digital Marketing Platform </div></div>
        
        <div class="m-auto text-center">
            <div id="g-sign-in-button" class="g-sign-in-button">
              <div class="content-wrapper">
                  <span id="logoG" class="logo-wrapper iconGoogle"> </span>
                  <span id="name" class="text-container"> Đăng nhập bằng Google</span>
              </div>
          </div>
        </div>
        <h4 class="mt-3 mb-3 background"><span class="font-weight-bold">Hoặc Tạo Tài Khoản Mới</span></h4>

          <div class="row">
            <div class="col-6">
             <div class="form-group  text-left">
                <label for="modalFullname">Tên xưng hô: <span class="text-red">(*)</span></label>
                <input type="text" class="form-control modalFullname" placeholder="Họ và tên" >
              </div>
              <div class="form-group  text-left">
                <label for="email">Email: <span class="text-red">(*)</span></label>
                <input type="email" class="form-control modalEmail" placeholder="Enter email" >
              </div>
              <div class="form-group text-left">
                <label for="pwd">Mật khẩu: <span class="text-red">(*)</span></label>
                <input type="text" class="form-control modalPass" placeholder="Enter password">
              </div>
            </div>
            <div class="col-6">
              <div class="form-group  text-left">
                <label for="email">Số điện thoại:<span class="text-red">(*)</span></label>
                <input type="text" class="form-control modalPhone" placeholder="Enter phone" >
              </div>
              <div class="form-group text-left">
                <label for="pwd">Website</label>
                <input type="text" class="form-control modalWebsite" placeholder="Enter website">
              </div>
              <div class="form-group text-left">
              <label for="pwd">Ngân sách quảng cáo Adwords</label>
                <select class="form-control adwordsBudget" >
                  <option value="1000" selected>Tôi không quảng cáo AdWords</option>
                  <option value="5">Dưới 5tr/tháng</option>
                  <option value="10">Từ 5 - 10tr/tháng</option>
                  <option value="20">Từ 10 - 20tr/tháng</option>
                  <option value="40">Từ 20 - 40tr/tháng</option>
                  <option value="100">Từ 40 - 100tr/tháng</option>
                  <option value="101">Trên 100tr/tháng</option>
                </select>
            </div>
            </div>
          </div>
          <div class="form-group">
            <div class="noteModal d-none text-center text-red pb-2"></div>
            <button type="submit" class="btn btn-info btn-registerButton btn-block">Đăng Ký Tài Khoản</button>
          </div>
          <div>
            <a href="#" class="btn-showLoginModal">Đăng nhập</a> hoặc <a href="https://admin.fff.com.vn/forgotpass.php" class="btn-showLoginModal">Quên mật khẩu</a> 
        </div>
      </div>
      `,
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick:false,
      focusConfirm: false,
      dangerMode: true,
      padding: "0em 3em 2em",
      width: "800px",
      position:"top",
      onOpen: () => {
       
          $(".btn-registerButton").click(() => {
            var post = {};
            $(".btn-registerButton").html('<i class="fas fa-spinner fa-spin"></i> Đăng Ký Tài Khoản');
            post.email = $(".modalEmail").val();
            post.fullname = $(".modalFullname").val();
            post.phone = $(".modalPhone").val();
            post.website = $(".modalWebsite").val();
            post.password = $(".modalPass").val();
            post.adwordsBudget = $(".adwordsBudget").val();
            if (post.email && post.phone && post.password){
              if (validateEmail(post.email)){
                  if (validPhone(post.phone)){
                      $.ajax(`https://localapi.trazk.com/fff/user.php?task=registerUser`, {
                        type: "POST",
                        data:post,
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true
                    }).done(function(res) {
                        res = JSON.parse(res);
                        if (res.data.status =="error"){
                          
                          $(".btn-registerButton").html('<i class="fad fa-exclamation-square"></i> Có lỗi. Vui lòng thử lại');
                          $(".swal2-validation-message").addClass("font-gg font-14 mt-2");
                          Swal.showValidationMessage(res.data.msg);
                        }else{
                          window.location.href = res.data.redirect;
                        }
                    });
                  }else{
                    Swal.showValidationMessage(`Lỗi: Số điện thoại không hợp lệ`);
                    $(".swal2-validation-message").addClass("font-gg font-14 mt-2");
                    $(".btn-registerButton").html('<i class="fad fa-exclamation-square"></i> Đăng Ký Tài Khoản');

                  }
              }else{
                Swal.showValidationMessage(`Lỗi: Email không hợp lệ`);
                $(".swal2-validation-message").addClass("font-gg font-14 mt-2");
                $(".btn-registerButton").html('<i class="fad fa-exclamation-square"></i> Đăng Ký Tài Khoản');

              }
            }else{
              if (post.email ==""){
                Swal.showValidationMessage(`Lỗi: Bạn cần cung cấp email`);
                $(".swal2-validation-message").addClass("font-gg font-14 mt-2");
              }
              if (post.phone ==""){
                Swal.showValidationMessage(`Lỗi: Bạn cần cung cấp số điện thoại`);
                $(".swal2-validation-message").addClass("font-gg font-14 mt-2");
              }
              if (post.password ==""){
                Swal.showValidationMessage(`Lỗi: Bạn cần cung cấp mật khẩu`);
                $(".swal2-validation-message").addClass("font-gg font-14 mt-2");
              }
              $(".btn-registerButton").html('<i class="fad fa-exclamation-square"></i> Đăng Ký Tài Khoản');
            }    
        })
        
    },

  });
}

  window.showLoginModal = function showLoginModal() {
      Swal.fire({
          html: `
            
            <div class="text-center pt-4 pb-3"><a href="https://admin.fff.com.vn"><img width="60px" src="https://admin.fff.com.vn/assets/v7/logo-v7.png"></a>
            <div class="tagLine">3F Solutions - Digital Marketing Platform </div></div>
            
            <div class="m-auto text-center">
                <div id="g-sign-in-button" class="g-sign-in-button">
                  <div class="content-wrapper">
                      <span id="logoG" class="logoG logo-wrapper iconGoogle"> </span>
                      <span id="name" class="text-container"> Đăng nhập bằng Google</span>
                  </div>
              </div>
            </div>
            <h4 class="mt-3 mb-3 background"><span>Hoặc Sử Dụng</span></h4>
              <div class="form-group  text-left">
                <label for="email">Email:</label>
                <input type="email" class="form-control modalEmail" placeholder="Enter email" >
              </div>
              <div class="form-group text-left">
                <label for="pwd">Mật khẩu:</label>
                <input type="password" class="form-control modalPass" placeholder="Enter password">
              </div>
              <div class="form-group">
                <div class="noteModal d-none text-center text-red pb-2"></div>
                <button type="submit" class="btn btn-primary btn-modalLogin btn-block">Đăng nhập</button>
              </div>
              <div>
                <a href="#" class="btn-showRegisterModal">Đăng ký</a> hoặc <a href="https://admin.fff.com.vn/forgotpass.php" class="btn-showLoginModal">Quên mật khẩu</a> 

            </div>
          </div>
          `,
          showCloseButton: true,
          showCancelButton: false,
          showConfirmButton: false,
		      allowOutsideClick:false,
          focusConfirm: false,
          padding: "0em 3em 2em",
          width: "400px",
          position:"top",
          onOpen: () => {
            $(".btn-modalLogin").focus();
          }

      });
  }

  function showRequestPhoneModal() {
    $.getJSON(`//localapi.trazk.com/fff/user.php?task=getUserInfo&userToken=${userToken}`, function(res) {
      if (res){
        var userData = res.data;
        Swal.fire({
            html: `
              <div class="text-center pt-4 pb-3"><img width="80px" src="${userData.data.avatar}">
              <div class="tagLine pt-2">${userData.data.fullname} </div></div>
              <p class="font-14">Để hỗ trợ bạn tốt hơn, vui lòng cho chúng tôi biết số điện thoại của bạn</p>
              <h4 class="mt-3 mb-3 background"><span>Vui lòng bổ xung thông tin</span></h4>
                <div class="form-group  text-left">
                  <label for="email">Số di động:</label>
                  <input type="text" name="phonenumber" class="form-control phonenumber" placeholder="Enter phone" >
                </div>
                
                <div class="form-group">
                  <div class="noteModal d-none text-center text-red pb-2"></div>
                  <button type="submit" class="btn btn-info btn-updatePhone btn-block">Cập Nhập Thông Tin</button>
                </div>
                
            </div>
            `,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick:false,
            focusConfirm: false,
            padding: "0em 3em 2em",
            width: "400px",
            position:"top",
            onOpen: () => {
  
              $(".btn-updatePhone").click(() => {
                  var phonenumber = $(".phonenumber").val();
                  $.getJSON(`https://localapi.trazk.com/fff/user.php?task=updatePhoneNumber&phoneNumber=${phonenumber}&userToken=${userToken}`,function(res){
                      var newahref = window.location.href;
                      newahref = newahref.replace("requestUpdate=phone","");
                      window.location.href = newahref;
                      swal.close();
                  })
              })
          },

        });
      }
    })
}
  $("body").on("click",".btn-modalLogin",function(res){
      $(".btn-modalLogin").html('<i class="fas fa-spinner fa-spin"></i> Đăng nhập');

      var postVal = {};
      postVal.email = $(".modalEmail").val();
      postVal.pass = $(".modalPass").val();
      if (postVal.email !="" && postVal.pass != "" ){
      $.post("https://localapi.trazk.com/fff/user.php?task=userLoginByEmail&target=https://admin.fff.com.vn/quangcao",postVal,function(res){
          res = JSON.parse(res);
          if (res.data.status == "success"){
            setCookie("userToken", res.data.userToken, 1);
            targetUrl = window.location.href;
            goURL = "https://admin.fff.com.vn/v7/redirect.php?targetURL="+btoa(targetUrl)+"&userToken="+res.data.userToken+"&view=toTargetUrl64";
            window.location.href = goURL;
          //  location.reload(); 
          }else{
             $(".noteModal").removeClass("d-none").text("Mật khẩu không đúng");
             $(".btn-modalLogin").html('<i class="fad fa-exclamation-square"></i> Đăng nhập');
          }
        })
      }else{
        $(".noteModal").removeClass("d-none").text("Bạn cần nhập Email và mật khẩu");
      }
  })
  $("body").on("click",".btn-showLoginModal",function(res){
    res.preventDefault();
    showLoginModal();
  })
  $("body").on("click",".btn-showRegisterModal",function(res){
    res.preventDefault();
    showRegisterModal();
  })
  $("body").on("click","#g-sign-in-button",function(res){        
        $(".logoG").addClass("iconLoading");
        $(".logoG").removeClass("iconGoogle");
    
      if (userGoogleInfo){
        loginWithGoogleInformation();
      }else{
        loginfistTimeWithGoogle();
      }

      
  });
  $("body").on("click",".doLogout",function(res){
    res.preventDefault();
    setCookie("userToken",userTokenDemo, 10);
    var targetUrl = window.location.href;
    location.href="https://admin.fff.com.vn/v7/logout.php?targetURL="+btoa(targetUrl);
  })
  function transferFocus(e) {
    $('.swal-button').blur();
    $('.swal-button--confirm').focus();
}

});