var fbuid = 0;

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
                    res.preventDefault();
                    console.log(fbuid);
                    if (fbuid == 0 || fbuid == 1){
                        FB.login(function(response) {
                            if (response.authResponse) {
                             console.log('Welcome!  Fetching your information.... ');
                             FB.api('/me', function(response) {
                                 console.log(response);
                               console.log('Good to see you, ' + response.name + '.');
                             });
                            } else {
                             console.log('User cancelled login or did not fully authorize.');
                            }
                        }, {scope: 'email,user_likes'});
                    }else{
                        var post = {};
                        post.mission= $(this).data("mission");
                        post.missionid= $(this).data("missionid");
                        post.alias= $(this).data("alias");
                        post.fbuid= fbuid;

                        $.post(`https://localapi.trazk.com/2020/api/facebook/index.php?task=confirmMission`,post,function(res){
                            res = JSON.parse(res);
                            console.log(res);
                            if (res.data.status == "error"){
                                if (res.data.msg == "Invalid user"){
                                    console.log(res.data.msg);
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        html: `<div class="text-center">Bạn cần thực hiện nhiệm vụ trước khi mở khóa link</div>`,
                                        footer: '<a href>Xem hướng dẫn sử dụng</a>',
                                        showCloseButton: false,
                                        showCancelButton: false,
                                        showConfirmButton: false,
                                      })
                                }
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
                    console.log('Wow! Iframe Click!');
                    var missionFbId = $("fbIframe").data("mission");
                    $.getJSON(`https://localapi.trazk.com/2020/api/facebook/index.php?task=updateMission&missionFbId=${missionFbId}&fbId=${fbuid}`);
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