var tableMyLockUrl = null;
$( document ).ready(function() {
    $("body").on("click",".btn-Step1",function(res){
        if (userToken == userTokenDemo){
            showLoginModal();
        }else{
            var wantToDo = $('.wantToDo :selected').val(); 
            doStep1(wantToDo);
        }
    }) 

  
    if (userToken != userTokenDemo){
        tableMyLockUrl = renderTableLockedUrl();

         $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            value = $(this).data("value");
            tableMyLockUrl.clear().destroy();
            $("#myLockUrl thead").empty();
            if (value == "listMyMission")  tableMyLockUrl = renderTableLockedUrl(); 
            if (value == "listMyAllData")  tableMyLockUrl =  renderMyData();
          })
          $("body").on("click",".showDataByMission",function(res){
              $(".nav-link").removeClass("active");
              $(".listMyAllData").addClass("active");
              var alias = $(this).data("alias");
              tableMyLockUrl.clear().destroy();
              $("#myLockUrl thead").empty();
              tableMyLockUrl = renderMyData(alias);
              $(".listMyAllData").html(`Data khách hàng <span class='text-danger'>(${alias})<span>`);
          })
      
          
    }
    
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

    function doStep1(wantToDo){
        var meta={};
        switch(wantToDo){
            case "LIKECOMMENT-PROFILE":
                meta.title = "Điền URL bài post trên profile của bạn.";
                meta.helpLink = "https://help.fff.com.vn";
                break;
            case "LIKECOMMENT-FANPAGE":
                meta.title = "Điền URL bài post trên fanpage của bạn.";
                meta.helpLink = "https://help.fff.com.vn";
                break;      
            case "LIKECOMMENT-GROUP":
                meta.title = "Điền URL bài post trên fanpage của bạn.";
                meta.helpLink = "https://help.fff.com.vn";
                break;     
            case "LIKEFANPAGE":
                meta.title = "Điền URL Fanpage của bạn";
                meta.helpLink = "https://help.fff.com.vn";
                break;    
            case "JOINGROUP":
                meta.title = "Điền URL nhóm của bạn";
                meta.helpLink = "https://help.fff.com.vn";
                break;                                             
        }
            Swal.fire({
                html: `
        <div class="pb-1"><strong>Bước 1: ${meta.title}</strong></div>
        <div class="input-group">
            <input type="text" value="" class="form-control input-facebookURL">
            
            <div class="input-group-append">
                <button type="submit" class="btn btn-ConfirmStep1 btn-primary">Tiếp Tục</button>
            </div>
        </div>
        <small class="form-text text-muted">Xem <a href="${meta.helpLink}">hướng dẫn</a> lấy link</small>
 
        
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
                    
                    $(".btn-ConfirmStep1").click(() => {
                        var facebookURL = $(".input-facebookURL").val();
                        var me = $(this);
                        me.html(`<i class="fas fa-spinner fa-pulse"></i> Tiếp Tục`);
                        $.getJSON(`//localapi.trazk.com/2020/api/facebook/index.php?userToken=${userToken}&task=getFacebookPostId&url=${facebookURL}&type=${wantToDo}`,function(res){
                            if (res.data == "" || res.data == null){
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
                                var fbData = {};
                                fbData.missionFbId = res.data;
                                fbData.missionFbUrl = facebookURL;
                                fbData.missionType = wantToDo;
                                doStep2(fbData);
                            }
                        });
                    });
                
                },
        
            });
    }
    
    function doStep2(fbData){
        console.log(fbData);
        Swal.fire({
            html: `

 <div class="pb-1"><strong>Bước 2: URL chuyển đến sau khi tương tác</strong></div>
 <div class="input-group">
     <input type="text" value="" class="form-control input-targetURL">
     
     <div class="input-group-append">
         <button type="submit" class="btn btn-doLockUrl btn-primary">Tiếp Tục</button>
     </div>
 </div>
  
 <div class="mt-4 mb-2">         
    <div class="form-group d-none kq-LockedLink">
        <label class="font-weight-bold">Bước 3: Lấy link rút gọn <small class="text-muted">Xem <a href="">hướng dẫn</a> cách sử dụng </small></label>
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
                
                $(".btn-doLockUrl").click(() => {
                    var facebookURL = $(".input-facebookURL").val();
                    var me = $(this);
                    me.html(`<i class="fas fa-spinner fa-pulse"></i> Tạo link khóa`);
                    var post = {};
                    post.targetUrl = $(".input-targetURL").val();
                    post.missionFbId = fbData.missionFbId;
                    post.missionFbUrl = fbData.missionFbUrl;
                    post.missionType = fbData.missionType;
                    console.log(post);
                    $.post(`//localapi.trazk.com/2020/api/facebook/index.php?userToken=${userToken}&task=createLockedLink`,post,function(res){
                        res = JSON.parse(res);
                        if (res.data.status == "success"){
                            $(".kq-LockedLink").removeClass("d-none").fadeIn();
                            $(".input-resultLockedLink").val(res.data.data.lockedLink);
                        }
                    })
                });
            
            },
    
        });
    }

    function initDatatable(select, tableOptions) {
        const table = $(`#${select}`).DataTable(tableOptions);
        return table;
    }
    function renderTableLockedUrl() {
       return initDatatable(
            'myLockUrl', {
                ajax: {
                    url: `//localapi.trazk.com/2020/api/facebook/index.php?task=listLockedLink&userToken=${userToken}`,

                    dataSrc: function (res) {               
                        var columns =[];
                        $.each(res.data,function (k,v){
                            var output = {};
                            output.alias =  v.alias;
                            output.custom = v.custom;
                            output.click = v.click;
                            output.status = v.status;
                            output.countUser = v.countUser;
                            
                            output.missionType = v.missionType;
                            output.missionFbId = v.missionFbId;
                            output.missionFbUrl = v.missionFbUrl;
                            output.url = v.url;
                            output.insertDate = v.insertDate;
                           
                            columns.push(output);
                        })
                        return columns;
                    },
                },

                drawCallback: function (settings) {},
                columns: [
                    {
                        title: '<strong>Thêm ngày</strong>',
                        data:  (data) => moment(data.insertDate).format("hh:mm DD/MM"),
                        className: 'text-left',
                        width: '150',

                    },
                    {
                        title: '<strong>Nhiệm vụ</strong>',
                        data:  (data) => `<span class="badge-mission  badge-${data.missionType}">${data.missionType}</span>`,
                        className: 'text-left',
                        width: '150'
                    },
                    
                    {
                        title: '<strong>Link</strong>',
                        data:  (data) => `<a class="text-gray" href="https://fff.blue/detail/${data.alias}?userToken=${userToken}">https://fff.blue/${data.alias}</a> <a href="https://fff.blue/${data.alias}"><i class="fal text-muted fa-external-link-square-alt ml-1"></i></a> <i data-alias="${data.alias}" class="fal fa-server ml-1 pointer text-info showDataByMission"></i></a>`,
                        className: 'text-left',
                       
                    },
                    {
                        title: '<strong>Click</strong>',
                        data: 'click',
                        className: 'text-left',
                       
                    },
                    
                    {
                        title: '<strong>Data</strong>',
                        data: 'countUser',
                        className: 'text-left',
                       
                    },
                    
                   
                   
                   
                ],
              
                buttons: [
                    'copy', 'excel',
                ],
                dom: 'Bfrtip',
                paging: true,
                autoWidth: false,
                pageLength: 50,
                info: false,
                responsive: true,
                searching: false,
                ordering:false,
                
               
                language: {
                    loadingRecords: '<div class="placeholder-loading" style="height:10px">Đang tải</div>',
                    paginate: {
                        first: "Đầu",
                        last: "Cuối",
                        next: '<i class="fas fa-angle-right"></i>',
                        previous: '<i class="fas fa-angle-left"></i>'
                    },
                    search: 'Tìm kiếm <span class="ml-1"></span>:',
                    searchPlaceholder: 'Nhập từ khóa ...',
                    processing: 'Đang xử lý...',
                    loadingRecords: 'Đang tải...',
                    emptyTable: 'Không có dữ liệu hiển thị',
                    lengthMenu: '<div class="ml-4 font-gg"> Hiển thị <span class="ml-1">:</span>  <span class="ml-2" style="border:.5px solid #eee;padding: 4px 8px!important;">_MENU_</span> <span class="ml-1">kết quả </span></div>',
                    zeroRecords: 'Không tìm thấy dữ liệu',
                    info: '<div class="ml-4 font-gg mt-3">Hiển thị từ _START_ đến _END_ trong _TOTAL_ kết quả</div>',
                    infoEmpty: '',
                    infoFiltered: '(lọc từ tổng số _MAX_ dòng)',
                }
            }
        )


    }

    function renderMyData(alias=null) {
        if (alias == null){
            var ajaxURL = `//localapi.trazk.com/2020/api/facebook/index.php?task=listMyAllData&userToken=${userToken}`;
        }else{
            var ajaxURL = `//localapi.trazk.com/2020/api/facebook/index.php?task=listDataByAlias&alias=${alias}&userToken=${userToken}`;
        }
        return initDatatable(
            'myLockUrl', {
                ajax: {
                    url: ajaxURL,

                    dataSrc: function (res) {               
                        var columns =[];
                        $.each(res.data,function (k,v){
                            var output = {};
                            output.alias =  v.alias;
                            output.facebookEmail =  v.facebookEmail;
                            output.facebookName = v.facebookName;
                            output.insertDate = v.insertDate;
                            
                            columns.push(output);
                        })
                        return columns;
                    },
                },

                drawCallback: function (settings) {},
                columns: [
                    {
                        title: '<strong>Thêm ngày</strong>',
                        data:  (data) => moment(data.insertDate).format("hh:mm DD/MM"),
                        className: 'text-left',
                        width: '150',

                    },
                   
                    {
                        title: '<strong>Email</strong>',
                        data:  'facebookEmail',
                        className: 'text-left',
                        width: '200',
                       
                    },
                    {
                        title: '<strong>Facebook Name</strong>',
                        data: 'facebookName',
                        className: 'text-left',
                       
                    },
                    {
                        title: '<strong>Nhiệm vụ</strong>',
                        data: 'alias',
                        className: 'text-left',
                       
                    },
                    
                   
                ],
              
                buttons: [
                    'excel'
                ],
                dom: 'Bfrtip',
                paging: true,
                autoWidth: false,
                pageLength: 50,
                info: false,
                responsive: true,
                searching: false,
                ordering:false,
                
               
                language: {
                    loadingRecords: '<div class="placeholder-loading" style="height:10px">Đang tải</div>',
                    paginate: {
                        first: "Đầu",
                        last: "Cuối",
                        next: '<i class="fas fa-angle-right"></i>',
                        previous: '<i class="fas fa-angle-left"></i>'
                    },
                    search: 'Tìm kiếm <span class="ml-1"></span>:',
                    searchPlaceholder: 'Nhập từ khóa ...',
                    processing: 'Đang xử lý...',
                    loadingRecords: 'Đang tải...',
                    emptyTable: 'Không có dữ liệu hiển thị',
                    lengthMenu: '<div class="ml-4 font-gg"> Hiển thị <span class="ml-1">:</span>  <span class="ml-2" style="border:.5px solid #eee;padding: 4px 8px!important;">_MENU_</span> <span class="ml-1">kết quả </span></div>',
                    zeroRecords: 'Không tìm thấy dữ liệu',
                    info: '<div class="ml-4 font-gg mt-3">Hiển thị từ _START_ đến _END_ trong _TOTAL_ kết quả</div>',
                    infoEmpty: '',
                    infoFiltered: '(lọc từ tổng số _MAX_ dòng)',
                }
            }
        )


    }
   
});