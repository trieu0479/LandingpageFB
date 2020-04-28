$( document ).ready(function() {
    $("body").on("click",".btn-lockURL",function(res){
        var facebookURL = $(".input-facebookURL").val();
      
        if (facebookURL == ""){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: `<div class="text-center">Trước khi tiếp tục, bạn cần nhập bài post Facebook cần tương tác</div>`,
                footer: '<a href>Xem hướng dẫn sử dụng</a>'
              })
        }else{
            if (userToken == userTokenDemo){
                showLoginModal();
            }else{
                $.getJSON(`//localapi.trazk.com/2020/api/facebook/index.php?userToken=${userToken}&task=getFacebookPostId&url=${facebookURL}`,function(res){
                    if (res.data == ""){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            html: `<div class="text-center">Không xác định được facebook post ID, vui lòng xem hướng dẫn</div>`,
                            footer: '<a href>Xem hướng dẫn sử dụng</a>',
                            showCloseButton: false,
                            showCancelButton: false,
                            showConfirmButton: false,
                          })
                    }else{
                        showLockUrlModal(facebookURL,res.data);
                    }
                });
            }
        }
    })

    function showErrorOnModal(msg){
        Swal.showValidationMessage(msg);
        $(".swal2-validation-message").addClass("fontSize-14 mt-2");
    }

    function showLockUrlModal(facebookURL,facebookId){
        Swal.fire({
            html: `
  <div class="form-group">
    <label>URL chuyển đến sau khi tương tác</label>
    <input type="text" value="" class="form-control input-targetURL">
    </div>
  <div class="form-group d-none kq-LockedLink">
    <label class="font-weight-bold">Link rút gọn (share link này vào bài post facebook)</label>
    <input type="text" value="" onClick="this.select();" class="form-control input-resultLockedLink">
  </div>

  <button type="submit" class="btn btn-doLockUrl btn-primary">Hoàn Tất</button>
            `,
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick:true,
            focusConfirm: true,
            padding: "2em 2em 2em",
            width: "800px",
            position:"top",
            onOpen: () => {
                
                $(".btn-doLockUrl").click(() => {
                    var facebookURL = $(".input-facebookURL").val();
                    var me = $(this);
                    me.html(`<i class="fas fa-spinner fa-pulse"></i> Tạo link khóa`);
                    var post = {};
                    post.targetUrl = $(".input-targetURL").val();
                    post.facebookId = facebookId;
                    post.facebookUrl = $(".input-facebookURL").val();

                    if ($('.input-requestLike').is(":checked")){
                        post.missionType = "LIKE";
                    }
                    if ($('.input-requestComment').is(":checked")){
                        post.missionType = "COMMENT";
                    }

                    if ($('.input-requestLike').is(":checked") && $('.input-requestComment').is(":checked")){
                        post.missionType = "LIKECOMMENT";
                    }
                    $.post(`//localapi.trazk.com/2020/api/facebook/index.php?userToken=${userToken}&task=createLockedLink`,post,function(res){
                        res = JSON.parse(res);
                        console.log(res);
                        console.log(res.data.status);
                        console.log(res.data.lockedLink);
                        if (res.data.status == "success"){
                            $(".kq-LockedLink").removeClass("d-none").fadeIn();
                            $(".input-resultLockedLink").val(res.data.data.lockedLink);
                        }
                    })
                });
            
            },
    
        });
    }
   
});