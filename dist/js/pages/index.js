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
                $('.btn-lockURL i').removeClass('fad fa-layer-plus').addClass('fas fa-spinner fa-pulse')
                $.getJSON(`//localapi.trazk.com/2020/api/facebook/index.php?userToken=${userToken}&task=getFacebookPostId&url=${facebookURL}`,function(res){

                var facebookId= res.data
                
                if (res.data == ""){
                    $('.btn-lockURL i').removeClass('fas fa-spinner fa-pulse').addClass('fad fa-layer-plus')
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            html: `<div class="text-center">Không xác định được facebook post ID, vui lòng xem hướng dẫn</div>`,
                            footer: '<a href>Xem hướng dẫn sử dụng</a>',
                            showCloseButton: false,
                            showCancelButton: false,
                            showConfirmButton: false,
                          })
                        
                    }
                    else if (res.data== null){
                        console.log('type of ',typeof(res.data))
                        $('.btn-lockURL i').removeClass('fas fa-spinner fa-pulse').addClass('fad fa-layer-plus')
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            html: `<div class="text-center">Xin lỗi bạn ! Chúng tôi không tìm được bài post Facebook cần tương tác</div>`,
                            footer: '<a href>Xem hướng dẫn sử dụng</a>'
                          })
                    }
                    else{
                        $('.btn-lockURL i').removeClass('fas fa-spinner fa-pulse').addClass('fad fa-layer-plus')
                        // showLockUrlModal(facebookURL,res.data);

                        showLockModalSelect(facebookURL,facebookId);
                    }
                });
            }
        }
    })
   
    $("body").on("click",".btn-lockOption",function(res){
        let val=$('#listSelectInteractive').val();
        
        if (val == ""){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: `<div class="text-center">Trước khi tiếp tục, bạn cần chọn nội dung tương tác Facebook</div>`,
                footer: '<a href>Xem hướng dẫn sử dụng</a>'
              })
        }else{
            if (userToken == userTokenDemo){
                showLoginModal();
            }else{
                if (val == null){
                        console.log('type of ',typeof(res.data))
                        $('.btn-lockOption i').removeClass('fas fa-spinner fa-pulse').addClass('fad fa-layer-plus')
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            html: `<div class="text-center">Xin lỗi bạn ! Chúng tôi không tìm được bài post Facebook cần tương tác</div>`,
                            footer: '<a href>Xem hướng dẫn sử dụng</a>'
                          })
                    }
                    else{
                        $('.btn-lockOption i').removeClass('fas fa-spinner fa-pulse').addClass('fad fa-layer-plus')
                        // showLockModalSelect(facebookURL,facebookId);
                        console.log("3")
                        if (val == "likePost"){
                            
                            likePost(val);
                        }
                        else if (val == "likePage"){
                            
                            likePost(val);
                        }
                        else if (val == "joinInGroup"){
                            
                            likePost(val);
                        }
                        else if (val == "Like&Comment"){
                            likePost(val);
                        }
                    }
                
            }
        }
    })
    function likePost(valSelectInteractive){
        var text=$('#listSelectInteractive').val();
        var facebookURL = $(".input-facebookURL").val();
        if  (text=="likePost"){
            text="Tăng Like 👍 bài post"
        }
        else if  (text=="likePage"){
            text="Tăng Like 👍 page"
        }
        else if  (text=="joinInGroup"){
            text="Tăng member cho Group"
        }
        else if  (text=="Like&Comment"){
            text="Tăng Like 👍 & Comment bài post"
        }
        Swal.fire({
            html: `
            <div class="form-group">
            
                <div class="text-left font-weight-bold"><label>Bạn muốn : ${text}</label></div>
                <div class="d-flex mb-1">
                <input value="" type="text" class="form-control input-facebookURL  border " autocomplete="off"
                    placeholder="Nhập URL bài post facebook cần tăng tương tác">
                    <button id="btn-lockUrl" class="ml-6px  btn-lockUrl btn btn-info"><i class="fad fa-layer-plus mr-2" ></i> Xác nhận</button>
                </div>
                <div class="form-group d-none kq-LockedLink">
                    <label class="font-weight-bold">Link rút gọn (share link này vào bài post facebook)</label>
                    <input type="text" value="" onClick="this.select();" class="form-control input-resultLockedLink">
                </div>
            </div>
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
                $('.btn-lockUrl').click(() =>{
                    $('#btn-lockUrl i').removeClass('fad fa-layer-plus').addClass('fas fa-spinner fa-pulse')
                    let val=$('.input-facebookURL').val();
                    // if(val == "showLockUrlModal"){
                    //     showLockUrlModal(valSelectInteractive);
                    // }
                    // else if(val == "showNumberlModal"){
                    //     console.log("showNumberlModal")
                    //     showNumberlModal();
                    // }

                    if (val != "") 
                    {
                        
                        $.getJSON(`//localapi.trazk.com/2020/api/facebook/index.php?userToken=${userToken}&task=getFacebookPostId&url=${val}`,function(res){
                        var facebookId= res.data
                            if (facebookId){
                                let post={
                                    facebookId,
                                    targetUrl: val,
                                    facebookUrl: val,
                                    missionType: (valSelectInteractive  == "likePost")? "LIKE-POST" : (alSelectInteractive  == "likePage") ? "LIKE-PAGE" : (valSelectInteractive == "joinInGroup") ? "JOININGROUP" : "LIKECOMMENT"
                                };
                                console.log(post)
                                $.post(`//localapi.trazk.com/2020/api/facebook/index.php?userToken=${userToken}&task=createLockedLink`,post,function(res){
                                    res = JSON.parse(res);
                                    console.log(res);
                                    // console.log(res.data.status);
                                    // console.log(res.data.lockedLink);
                                    // if (res.data.status == "success"){
                                    // $(".kq-LockedLink").removeClass("d-none").fadeIn();
                                    // $(".input-resultLockedLink").val(res.data.data.lockedLink);
                                // }
                                if (res.data.status == "success"){
                                    $('#btn-lockUrl i').addClass('fad fa-layer-plus').removeClass('fas fa-spinner fa-pulse')
                                    $(".kq-LockedLink").removeClass("d-none").fadeIn();
                                    $(".input-resultLockedLink").val(res.data.data.lockedLink);
                                    
                                }
                                
                            })
                            } else{
                                console.log("link rong")
                                $('#btn-lockUrl i').addClass('fad fa-layer-plus').removeClass('fas fa-spinner fa-pulse')
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    html: `<div class="text-center">Không xác định được facebook post ID, vui lòng xem hướng dẫn</div>`,
                                    footer: '<a href>Xem hướng dẫn sử dụng</a>',
                                    showCloseButton: false,
                                    showCancelButton: false,
                                    showConfirmButton: false,
                                })   
                            }
                        })
                    } else{
                        $('#btn-lockUrl i').addClass('fad fa-layer-plus').removeClass('fas fa-spinner fa-pulse')
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    html: `<div class="text-center">Không xác định được facebook post ID, vui lòng xem hướng dẫn</div>`,
                                    footer: '<a href>Xem hướng dẫn sử dụng</a>',
                                    showCloseButton: false,
                                    showCancelButton: false,
                                    showConfirmButton: false,
                                })   
                    }
                })
            },
        });
        
    }
    function showGiftUser(){
        Swal.fire({
            html: `
                    <div class="form-group">
                        <div class="d-flex">
                        <select class="custom-select" id="listSelectGiftUser">
                            <option selected value="">Chọn phần thưởng</option>
                            <option value="moveUrl">Chuyển User đến một đường dẫn</option>
                            <option value="giveCode">Gửi tặng User 1 mã khuyến mãi</option>
                            
                        </select>
                        <button class="ml-6px btn-lockOption btn btn-info"><i class="fad fa-layer-plus mr-2"></i> Cấu Hình</button>
                    </div>
                </div>
            `,
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick:true,
            focusConfirm: true,
            padding: "2em 2em 2em",
            width: "800px",
            position:"top",
    })
}

    function showErrorOnModal(msg){
        Swal.showValidationMessage(msg);
        $(".swal2-validation-message").addClass("fontSize-14 mt-2");
    }
    

    function showLockModalSelect(facebookURL,facebookId){
        Swal.fire({
            html: `
                <div class="form-group">
                    <label>Sau khi hoàn tất Like và Comment. Bạn sẽ</label>
                    <select class="custom-select mb-3" id="listSelect">
                        <option selected>Chọn</option>
                        <option value="showLockUrlModal">Chuyển khách hàng đến một website khác</option>
                        <option value="showNumberModal">Hỏi thêm số điện thoại của khách hàng</option>
                        <option value="3">Gửi tài liệu qua Emial của khách hàng</option>
                        <option value="4">Hiện ra chương trình khuyến mãi</option>
                    </select>
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
                $('.btn-doLockUrl').click(() =>{
                    let val=$('#listSelect').val();
                    if(val == "showLockUrlModal"){
                        console.log("showLockUrlModal",facebookURL,facebookId) 
                        showLockUrlModal(facebookURL,facebookId);
                    }
                    else if(val == "showNumberlModal"){
                        console.log("showNumberlModal")
                        showNumberlModal();
                    }
                })
            
            },
    
        });
    }
    function showLockUrlModal(facebookURL,facebookId){
        Swal.fire({
            html: `
                <div class="form-group">
                    <label>URL chuyển đến sau khi tương tác</label>
                    <input type="text" value="${facebookURL}" class="form-control input-targetURL">
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
                    if ($('.input-requestLike').is(":checked") && $('.input-requestComment').is(":checked")){
                        post.missionType = "LIKECOMMENT";
                    }
                    $.post(`//localapi.trazk.com/2020/api/facebook/index.php?userToken=${userToken}&task=createLockedLink`,post,function(res){
                        res = JSON.parse(res);

                    if ($('.input-requestLike').is(":checked")){
                        post.missionType = "LIKE";
                    }
                    if ($('.input-requestComment').is(":checked")){
                        post.missionType = "COMMENT";
                    }

                        console.log(res);
                        console.log(res.data.status);
                        console.log(res.data.lockedLink);
                        if (res.data.status == "success"){
                            $(".kq-LockedLink").removeClass("d-none").fadeIn();
                            $(".input-resultLockedLink").val(res.data.data.lockedLink);
                        }
                    })
                    setTimeout(function(){ location.reload(); }, 1000);
                });
            
            },
    
        });
    }
    
   
});