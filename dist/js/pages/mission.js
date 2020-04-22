var fbname = 0;
var fbemail = 0;
var fbuid = 0;
var clickMission = 0;
var fbtoken ="";
window.fbAsyncInit = function() {
    FB.init({
      appId            : '1795529270684966',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v6.0'
    });

    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          fbuid = response.authResponse.userID;
          fbtoken = response.authResponse.accessToken;
          FB.api('/me?fields=id,name,email', function(response) {
            fbname = response.name;
            fbemail = response.email;

         });
        } else if (response.status === 'not_authorized') {
            fbuid = 1;
        } else {
            fbuid = 0;
        }
        startJquery();
       });

  };

  function startJquery(){
        $( document ).ready(function() {
            if (alias )  log(alias);
            function log(alias){
                $.getJSON(`https://localapi.trazk.com/2020/api/facebook/index.php?task=updateLog&alias=${alias}`);
            }
            confirmMission();
            function confirmMission(){
                $(".confirmMission").click(function(res){
                    me = $(this);
                    me.html(`<i class="fas fa-spinner fa-spin"></i> ` + me.text());
                    res.preventDefault();
                    if (fbuid == 0 || fbuid == 1){
                        FB.login(function(response) {
                            fbtoken = response.authResponse.accessToken;
                            if (response.authResponse) {
                             FB.api('/me?fields=id,name,email', function(response) {
                                fbname = response.name;
                                fbemail = response.email;
                             });
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Bạn cần đăng nhập',
                                    html: `<div class="text-center">Bạn cần đăng nhập facebook để hoàn thành nhiệm vụ này</div>`,
                                    footer: '<a href>Xem hướng dẫn sử dụng</a>',
                                    showCloseButton: false,
                                    showCancelButton: false,
                                    showConfirmButton: false,
                                    })
                            }
                        }, {scope: 'email'});
                    }else{
                        var post = {};
                        post.mission= $(this).data("mission");
                        post.missionid= $(this).data("missionid");
                        post.alias= $(this).data("alias");
                        post.fbuid= fbuid;
                        post.fbtoken= fbtoken;
                        post.fbname= fbname;
                        post.fbemail= fbemail;
                        post.clickMission= clickMission;
                        console.log(post);
                        var postVal = {data:btoa(JSON.stringify(post))};
                        $.post(`https://localapi.trazk.com/2020/api/facebook/index.php?task=confirmMission`,postVal,function(res){
                            res = JSON.parse(res);
                            
                            if (res.data.status == "error"){
                               
                                var alertmsg = "";
                                switch(post.mission){
                                    case "LIKE": alertmsg = "Bạn cần LIKE bài post để hoàn tất nhiệm vụ và mở khóa link"; break;
                                    case "COMMENT": alertmsg = "Bạn cần COMMENT bài post để hoàn tất nhiệm vụ và mở khóa link"; break;
                                    case "LIKECOMMENT": alertmsg = "Bạn cần LIKE và COMMENT bài post để hoàn tất nhiệm vụ và mở khóa link"; break;
                                    case "LIKEPAGE": alertmsg = "Bạn cần LIKE (bấm thích) Fanpage để hoàn tất nhiệm vụ và mở khóa link.<br> Nếu bạn đã thích, hãy <strong>truy cập lại fanpage</strong>  để hoàn thành nhiệm vụ"; break;
                                    case "JOINGROUP": alertmsg = "Bạn cần tham gia nhóm để hoàn tất nhiệm vụ và mở khóa link.<br> Nếu bạn đã tham gia, hãy <strong>truy cập vào nhóm lại </strong> để hoàn thành nhiệm vụ"; break;
                                    default: alertmsg = "Bạn cần hoàn thành nhiệm vụ trước khi mở khóa link";
                                }
                                Swal.fire({
                                    icon: 'error',
                                    title: '😞, đợi chút ...',
                                    html: `<div class="text-center">${alertmsg}</div>`,
                                    footer: '<a href>Xem hướng dẫn sử dụng</a>',
                                    showCloseButton: false,
                                    showCancelButton: false,
                                    showConfirmButton: false,
                                    })
                                me.html(`<i class="fad fa-exclamation-circle mr-1"></i> Lỗi Nhiệm Vụ`);
                            }else{
                                window.location.href=res.data.resultURL;
                            }
                        });
                    }
                });
            }
            var myConfObj = {
                iframeMouseOver: false
            }
            window.addEventListener('blur', function() {
                if (myConfObj.iframeMouseOver) {
                    clickMission = 1;
                }
            });
            
            document.getElementById('fbIframe').addEventListener('mouseover', function() {
                myConfObj.iframeMouseOver = true;
            });
            document.getElementById('fbIframe').addEventListener('mouseout', function() {
                myConfObj.iframeMouseOver = false;
            });


        });
  }