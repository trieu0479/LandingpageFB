var tableMyLockUrl = null;
var CLickChart = null;
// $(window).on('load', function () {
//     let fromx;
//     fromd = url.searchParams.get("startDate")
//     fromx=moment(fromd).format('DD-MM-YYYY')
//     tod = url.searchParams.get("endDate")
//     tox=moment(tod).format('DD-MM-YYYY')
//     var setnow = new Date();
//     var sety = setnow.setDate(setnow.getDate());
//     var setx = setnow.setDate(setnow.getDate() - 7);
//     if (!fromd &&  !tod ) {
//         console.log(setx,sety);
//     }
//    $('#rangeChart').val(`Từ ${fromx} đến ${tox}`)
// });
var from;
var to;
$(document).ready(function () {
    var now = new Date();
    var endDate = now.setDate(now.getDate());
    var startDate = now.setDate(now.getDate() - 7);
    
    if (url.searchParams.get("startDate") == null || url.searchParams.get("endDate") == null) {
        from = moment(startDate).format("DD-MM-YYYY")
        to = moment(endDate).format("DD-MM-YYYY")
    } else {
        from = url.searchParams.get("startDate")
        to= url.searchParams.get("endDate")
    }

    $("body").on("click", ".btn-Step1", function (res) {
        if (userToken == userTokenDemo) {
            showLoginModal();
        } else {
            var wantToDo = $('.wantToDo :selected').val();
            doStep1(wantToDo);
        }
    })


    if (userToken != userTokenDemo) {
        tableMyLockUrl = renderTableLockedUrl();
        $('a[data-toggle="tab"]#tabtable').on('shown.bs.tab', function (e) {
            value = $(this).data("value");
<<<<<<< HEAD
            
            if (value == "donwloadData"){
                donwloadData();
            }  else{
                tableMyLockUrl.clear().destroy();
                $("#myLockUrl thead").empty();
                if (value == "listMyMission")  tableMyLockUrl = renderTableLockedUrl(); 
                if (value == "listMyAllData")  tableMyLockUrl =  renderMyData();
            }
            
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
          $("body").on("click",".btn-editAlias",function(res){
=======
            tableMyLockUrl.clear().destroy();           
            $("#myLockUrl thead").empty();
            if (value == "listMyMission") tableMyLockUrl = renderTableLockedUrl();
            if (value == "listMyAllData") tableMyLockUrl = renderMyData();

        })
        //  $('a[data-toggle="tab"]#tabchart').on('shown.bs.tab', function (e) {
        //     value = $(this).data("value");                    
        //     if (value == "ClickChart")  CLickChart = renderClickChart(); 
        //     if (value == "LeadChart")  CLickChart =  renderLeadChart();            
        //   })


        $("body").on("click", ".showDataByMission", function (res) {
            $(".nav-link").removeClass("active");
            $(".listMyAllData").addClass("active");
            var alias = $(this).data("alias");
            tableMyLockUrl.clear().destroy();
            $("#myLockUrl thead").empty();
            tableMyLockUrl = renderMyData(alias);
            $(".listMyAllData").html(`Data khách hàng <span class='text-danger'>(${alias})<span>`);
        })
        $("body").on("click", ".btn-editAlias", function (res) {
>>>>>>> 929db55d68fc8859106d10dcd4a46049433ceac5
            var alias = $(this).data("alias");
            if (alias) {
                editMission(alias);
            } else {
                showPopupError("Bạn không có quyền tùy chỉnh link này");
            }
        })



    }
<<<<<<< HEAD
    function donwloadData(){
        $(".buttons-csv").trigger("click");
    }
    $("body").on("click",".btn-lockURL",function(res){
=======

    $("body").on("click", ".btn-lockURL", function (res) {
>>>>>>> 929db55d68fc8859106d10dcd4a46049433ceac5
        var facebookURL = $(".input-facebookURL").val();

        if (facebookURL == "") {
            showPopupError("Trước khi tiếp tục, bạn cần nhập bài post Facebook cần tương tác");
        } else {
            if (userToken == userTokenDemo) {
                showLoginModal();
<<<<<<< HEAD
            }else{
                getJSON(`//localapi.trazk.com/2020/api/facebook/index.php?userToken=${userToken}&task=getFacebookPostId&url=${btoa(facebookURL)}`).then(res =>{
                    if (res.data == ""){
=======
            } else {
                getJSON(`//localapi.trazk.com/2020/api/facebook/index.php?userToken=${userToken}&task=getFacebookPostId&url=${facebookURL}`).then(res => {
                    if (res.data == "") {
>>>>>>> 929db55d68fc8859106d10dcd4a46049433ceac5
                        showPopupError("Không xác định được facebook post ID, vui lòng xem hướng dẫn")
                    } else {
                        showLockUrlModal(facebookURL, res.data);
                    }
                })

            }
        }
    })

    function showPopupError(text) {
        Swal.fire({
            icon: 'error',
            title: text,

            footer: '<a href>Xem hướng dẫn sử dụng</a>',
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: false,
        })
    }

    function showPopopSuccess(text) {
        Swal.fire({
            icon: 'success',
            title: text,
            footer: '<a href>Xem hướng dẫn sử dụng</a>',
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: false,
        })
    }
<<<<<<< HEAD
    function showErrorOnModal(text){
        Swal.showValidationMessage(text);
        $(".swal2-validation-message").addClass("fontSize-14 mt-2");
    }
    function showErrorOnModal(msg){
=======

    function showErrorOnModal(msg) {
>>>>>>> 929db55d68fc8859106d10dcd4a46049433ceac5
        Swal.showValidationMessage(msg);
        $(".swal2-validation-message").addClass("fontSize-14 mt-2");
    }

    function editMission(alias) {
        getJSON(`//localapi.trazk.com/2020/api/facebook/index.php?userToken=${userToken}&task=getInfoAlias&alias=${alias}`).then(data => {
            if (data && data.data) {
                showPopupEdit(data.data);
            } else {

            }
        })
    }
    async function getJSON(url) {
        return await $.getJSON(url)
    }
    async function postJSON(url, data) {
        return await $.post(url, data)
    }

    function showPopupEdit(data) {
        console.log(data)

        Swal.fire({
            html: `
    <div class="pb-3 fontSize-16 text-align-center"><strong>Chỉnh sửa nhiệm vụ</strong></div>
        <div class="form-group">
            <label><strong>Tùy chỉnh Short URL (30 ký tự)</strong></label>
            <input type="text" maxlength="30" value="${(data.custom) ? data.custom : ""}" class="form-control input-customSlug">
        </div>
        <div class="form-group">
            <label><strong>Target URL:</strong></label>
            <input type="text" value="${data.url}" class="form-control input-targetURL">
        </div>
        <div class="form-group">
            <label><strong>Analytic Code:</strong></label>
            <input type="text" value="${(data.analyticCode) ? data.analyticCode : ""}" class="form-control input-analyticCode border-bottom">
        </div>
        <div class="form-group">
            <label><strong>Facebook Pixel Code:</strong></label>
            <input type="text"  value="${(data.pixelsCode) ? data.pixelsCode : ""}" class="form-control input-pixelCode border-bottom">
        </div>
      
        <button type="button" class="mt-3 btn btn-ConfirmEdit btn-primary">Hiệu Chỉnh</button>
    </div>    
            `,
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: true,
            focusConfirm: true,
            padding: "2em 2em 2em",
            width: "600px",
            position: "top",
            onOpen: () => {
                $('.btn-ConfirmEdit').click(function () {
                    if ($('.input-targetURL').val() != "") {
                        console.log("lodfan")
                        let post = {
                            targetUrl: $('.input-targetURL').val(),
                            analyticCode: $('.input-analyticCode').val(),
                            pixelsCode: $('.input-pixelCode').val(),
                            customSlug: $(".input-customSlug").val()
                        };
                        postJSON(`https://localapi.trazk.com/2020/api/facebook/index.php?userToken=${userToken}&task=editLockedLink&alias=${data.alias}`, post).then(res => {
                            res = JSON.parse(res);
                            if (res.data.status == "success") {
                                showPopopSuccess("Đã cập nhật thành công");
                            } else {
                                showErrorOnModal(res.data.msg);
                            }
                        })
                    } else {

                    }

                })
            },

        });
    }

    function doStep1(wantToDo) {
        var meta = {};
        switch (wantToDo) {
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
<<<<<<< HEAD
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
                        $.getJSON(`//localapi.trazk.com/2020/api/facebook/index.php?userToken=${userToken}&task=getFacebookPostId&url=${btoa(facebookURL)}&type=${wantToDo}`,function(res){
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
=======
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: true,
            focusConfirm: true,
            padding: "2em 2em 2em",
            width: "800px",
            position: "top",
            onOpen: () => {

                $(".btn-ConfirmStep1").click(() => {
                    var facebookURL = $(".input-facebookURL").val();
                    var me = $(this);
                    me.html(`<i class="fas fa-spinner fa-pulse"></i> Tiếp Tục`);
                    $.getJSON(`//localapi.trazk.com/2020/api/facebook/index.php?userToken=${userToken}&task=getFacebookPostId&url=${facebookURL}&type=${wantToDo}`, function (res) {
                        if (res.data == "" || res.data == null) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                html: `<div class="text-center">Không xác định được facebook post ID, vui lòng xem hướng dẫn</div>`,
                                footer: '<a href>Xem hướng dẫn sử dụng</a>',
                                showCloseButton: false,
                                showCancelButton: false,
                                showConfirmButton: false,
                            })
                        } else {
                            var fbData = {};
                            fbData.missionFbId = res.data;
                            fbData.missionFbUrl = facebookURL;
                            fbData.missionType = wantToDo;
                            doStep2(fbData);
                        }
>>>>>>> 929db55d68fc8859106d10dcd4a46049433ceac5
                    });
                });

            },

        });
    }

    function doStep2(fbData) {
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
            allowOutsideClick: true,
            focusConfirm: true,
            padding: "2em 2em 2em",
            width: "800px",
            position: "top",
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
                    $.post(`//localapi.trazk.com/2020/api/facebook/index.php?userToken=${userToken}&task=createLockedLink`, post, function (res) {
                        res = JSON.parse(res);
                        if (res.data.status == "success") {
                            $(".kq-LockedLink").removeClass("d-none").fadeIn();
                            $(".input-resultLockedLink").val(res.data.data.lockedLink);
                        }
                    })
                });

            },

        });
    }
    function extractHostname(url) {
        var hostname;
        //find & remove protocol (http, ftp, etc.) and get hostname
    
        if (url.indexOf("//") > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }
    
        //find & remove port number
        hostname = hostname.split(':')[0];
        //find & remove "?"
        hostname = hostname.split('?')[0];
    
        return hostname;
    }
    function initDatatable(select, tableOptions) {
        const table = $(`#${select}`).DataTable(tableOptions);
        $('[data-toggle="tooltip"]').tooltip();
        return table;
    }

    function renderTableLockedUrl() {
<<<<<<< HEAD
        $(".tooltip").hide();
       return initDatatable(
=======
        return initDatatable(
>>>>>>> 929db55d68fc8859106d10dcd4a46049433ceac5
            'myLockUrl', {
                ajax: {
                    url: `//localapi.trazk.com/2020/api/facebook/index.php?task=listLockedLink&userToken=${userToken}`,

                    dataSrc: function (res) {
                        var columns = [];
                        $.each(res.data, function (k, v) {
                            var output = {};
<<<<<<< HEAD
                            if (! v.custom) output.alias =  v.alias; else output.alias = v.custom;
=======
                            output.alias = v.alias;
>>>>>>> 929db55d68fc8859106d10dcd4a46049433ceac5
                            output.custom = v.custom;
                            output.click = v.click;
                            output.status = v.status;
                            output.countUser = v.countUser;

                            output.missionType = v.missionType;
                            output.missionFbId = v.missionFbId;
                            output.missionFbUrl = v.missionFbUrl;
                            output.url = v.url;
                            output.insertDate = v.insertDate;
<<<<<<< HEAD
                            output.task = `<i  data-toggle="tooltip" data-placement="top" title="Chỉnh sửa nhiệm vụ" data-alias="${v.alias}" class="fal text-success pointer fontSize-16 btn-editAlias fa-pen-square"></i>  <i data-toggle="tooltip" data-placement="top" title="Danh sách data khách"  data-alias="${v.alias}" class="fal fa-server fontSize-16 ml-1 pointer text-info showDataByMission"></i> <a href="https://fff.blue/${v.alias}"><i class="fal fontSize-16 text-muted fa-external-link-square-alt ml-1" target="blank" data-toggle="tooltip" data-placement="top" title="Xem trang nhiệm vụ" ></i></a>`;
                           
=======
                            output.task = `<i  data-toggle="tooltip" data-placement="top" title="Chỉnh sửa nhiệm vụ" data-alias="${v.alias}" class="fad text-info pointer fontSize-16 btn-editAlias fa-pen-square"></i>  <i data-toggle="tooltip" data-placement="top" title="Danh sách data khách"  data-alias="${v.alias}" class="fal fa-server ml-1 pointer text-info showDataByMission"></i>`;

>>>>>>> 929db55d68fc8859106d10dcd4a46049433ceac5
                            columns.push(output);
                        })
                        //
                        $(".btn-editAlias").on("click", function () {
                            console.log("123");
                        })
                        //
                        return columns;
                    },
                },

<<<<<<< HEAD
                drawCallback: function (settings) {
                    $('body').tooltip({
                        selector: '[data-toggle="tooltip"]'
                    });
                },
                columns: [
                    {
=======
                drawCallback: function (settings) {},
                columns: [{
>>>>>>> 929db55d68fc8859106d10dcd4a46049433ceac5
                        title: '<strong>Thêm ngày</strong>',
                        data: (data) => moment(data.insertDate).format("hh:mm DD/MM"),
                        className: 'text-left',
                        width: '90',

                    },
                    {
                        title: '<strong>Nhiệm vụ</strong>',
                        data: (data) => `<span class="badge-mission  badge-${data.missionType}">${data.missionType}</span>`,
                        className: 'text-left',
                        width: '120'
                    },
<<<<<<< HEAD
                    {
                        title: '<strong>Alias</strong>',
                        data:  (data) => `<a class="text-gray" href="https://fff.blue/detail/${data.alias}?userToken=${userToken}">${data.alias}</a>`,
                        className: 'text-left',
                       
                    },
                    {
                        title: '<strong>Target</strong>',
                        data:  (data) => `<a class="text-gray" href="${data.url}">${extractHostname(data.url)}</a>`,
=======

                    {
                        title: '<strong>Link</strong>',
                        data: (data) => `<a class="text-gray" href="https://fff.blue/detail/${data.alias}?userToken=${userToken}">https://fff.blue/${data.alias}</a> <a href="https://fff.blue/${data.alias}"><i class="fal text-muted fa-external-link-square-alt ml-1"></i></a>`,
>>>>>>> 929db55d68fc8859106d10dcd4a46049433ceac5
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

                    {
                        title: '<strong>Tác vụ</strong>',
                        data: 'task',
                        className: 'text-left',

                    },



                ],
<<<<<<< HEAD
                dom: 'Bfrtip',
=======

>>>>>>> 929db55d68fc8859106d10dcd4a46049433ceac5
                buttons: [
                    {
                        extend: 'csv',
                        title: 'Mission'
                    }
                ],
                
                paging: true,
                autoWidth: false,
                pageLength: 50,
                info: false,
                responsive: true,
                searching: false,
                ordering: false,


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

<<<<<<< HEAD
    function renderMyData(alias=null) {
        $(".tooltip").hide();
        if (alias == null){
=======
    function renderMyData(alias = null) {
        if (alias == null) {
>>>>>>> 929db55d68fc8859106d10dcd4a46049433ceac5
            var ajaxURL = `//localapi.trazk.com/2020/api/facebook/index.php?task=listMyAllData&userToken=${userToken}`;
        } else {
            var ajaxURL = `//localapi.trazk.com/2020/api/facebook/index.php?task=listDataByAlias&alias=${alias}&userToken=${userToken}`;
        }
        return initDatatable(
            'myLockUrl', {
                ajax: {
                    url: ajaxURL,

                    dataSrc: function (res) {
                        var columns = [];
                        $.each(res.data, function (k, v) {
                            var output = {};
                            output.alias = v.alias;
                            output.facebookEmail = v.facebookEmail;
                            output.facebookName = v.facebookName;
                            output.insertDate = v.insertDate;

                            columns.push(output);
                        })
                        return columns;
                    },
                },

<<<<<<< HEAD
                drawCallback: function (settings) {
                  
                },
                columns: [
                    {
=======
                drawCallback: function (settings) {},
                columns: [{
>>>>>>> 929db55d68fc8859106d10dcd4a46049433ceac5
                        title: '<strong>Thêm ngày</strong>',
                        data: (data) => moment(data.insertDate).format("hh:mm DD/MM"),
                        className: 'text-left',
                        width: '150',

                    },

                    {
                        title: '<strong>Email</strong>',
                        data: 'facebookEmail',
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
<<<<<<< HEAD
                dom: 'Bfrtip',
=======

>>>>>>> 929db55d68fc8859106d10dcd4a46049433ceac5
                buttons: [
                    {
                        extend: 'csv',
                        title: 'Lead Data'
                    }
                ],
                
                paging: true,
                autoWidth: false,
                pageLength: 50,
                info: false,
                responsive: true,
                searching: false,
                ordering: false,


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
    // ------------------trieu-----------
    $("#rangeChart").flatpickr({
        locale: "vn",
        mode: 'range',
        dateFormat: "d/m/Y",
        maxDate: new Date(),
        defaultDate: [moment(from,"DD-MM-YYYY").format("DD/MM/YYYY"), moment(to,"DD-MM-YYYY").format("DD/MM/YYYY")],
        onClose: function (date) { 
            let aaa = flatpickr.formatDate(date[0], "d/m/Y");
            let bbb = flatpickr.formatDate(date[1], "d/m/Y");
            console.log(aaa,bbb)
            if(aaa != from ||  bbb!= to){ 
                window.location.href = `./?userToken=${userToken}&startDate=${aaa}&endDate=${bbb}`
            }
        }
    })

    function renderClickChart(data) {
        // let wrapper = $('#getKeywordsSuggestion--eCharts_wrapper');
        let ele = document.getElementById('ClickChart');

        // wrapper.removeClass('is-loading')
        //     .append(`<div class="flex-center flex-grow-1 display-5 font-gg text-favorite counter"></div>`);
        $.getJSON(`//localapi.trazk.com/2020/api/facebook/report.php?task=reportByDate&userToken=${userToken}&from=${moment(from,"DD-MM-YYYY").format("YYYY-MM-DD")}&to=${moment(to,"DD-MM-YYYY").format("YYYY-MM-DD")}`).then(data => {
            let dataChart = {
                keys: [],
                values: {
                    pc: [],
                    mobile: [],
                    total: []
                }
            };

            Object.values(data.data.data).forEach(item => {
                dataChart.keys.push(item.date);
                dataChart.values.pc.push(item.Computer);
                dataChart.values.mobile.push(item.Phone);
                dataChart.values.total.push(parseInt(item.Computer) + parseInt(item.Phone));
            })
            console.log(dataChart);

            let option = {
                grid: {
                    // bottom: 0,
                    left: 80,
                    right: 40,
                },
                legend: {
                    itemWidth: 16,
                    itemHeight: 10,
                    itemGap: 16,
                    right: 30,
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        // fontSize: 12,
                        fontFamily: 'Google Sans'
                    },
                    data: ['Máy tính', 'Điện thoại', 'Tổng']
                },
                tooltip: {
                    showContent: true,
                    trigger: 'axis',
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    borderColor: 'rgba(93,120,255,1)',
                    borderWidth: 1,
                    extraCssText: 'padding: 10px; box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);',
                    formatter: params => {

                        if (params.length > 0) {

                            let {
                                name
                            } = params[0];

                            name = moment(name).format('DD,MMMM,YYYY');

                            let kq = `<div class="text-dark text-capitalize border-bottom pb-1 mb-2">${name}</div>`

                            params.forEach(param => {

                                let {
                                    marker,
                                    color,
                                    seriesName,
                                    value
                                } = param;

                                value = numeral(value).format('0,0')

                                kq += `<div class="text-dark">${marker} ${seriesName} <span style="color:${color};font-weight:bold">${value}</span></div>`
                            })

                            return kq;
                        }
                    },
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        }
                    }
                },
                xAxis: [{
                    type: 'category',
                    data: dataChart.keys,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: 12,
                        formatter: (data) =>
                            data
                        // margin: 20
                    }
                }],
                yAxis: [{
                    type: 'value',
                    // show: false,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            // type: 'dashed'
                        }
                    },
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: 12,
                        formatter: (data) => numeral(data).format('0a')
                    }
                }, ],
                series: [{
                        name: 'Máy tính',
                        type: 'bar',
                        data: dataChart.values.pc,
                        itemStyle: {
                            color: '#1abc9c'
                        },
                    },
                    {
                        name: 'Điện thoại',
                        type: 'bar',
                        data: dataChart.values.mobile,
                        itemStyle: {
                            color: '#e74c3c'
                        },
                    },
                    {
                        name: 'Tổng',
                        type: 'line',
                        data: dataChart.values.total,
                        smooth: true,
                        symbolSize: 15,
                        itemStyle: {
                            color: '#667388'
                        },
                    }
                ]
            };
            // $(".historyByMonthKeywords").removeClass("d-none");
            let myChart = echarts.init(ele);

            myChart.setOption(option);
            new ResizeSensor(ele, function () {
                myChart.resize();
            });
            // setTimeout(function () {
            //     myChart.on('mouseover', function (params) {
            //         if (params.name == data[0].name) {
            //             myChart.dispatchAction({
            //                 type: 'highlight',
            //                 seriesIndex: 0,
            //                 dataIndex: 0
            //             });
            //         } else {
            //             myChart.dispatchAction({
            //                 type: 'downplay',
            //                 seriesIndex: 0,
            //                 dataIndex: 0
            //             });
            //         }
            //     });

            //     myChart.on('mouseout', function (params) {
            //         myChart.dispatchAction({
            //             type: 'highlight',
            //             seriesIndex: 0,
            //             dataIndex: 0
            //         });
            //     });
            //     myChart.dispatchAction({
            //         type: 'highlight',
            //         seriesIndex: 0,
            //         dataIndex: 0
            //     });
            // }, 1000);

        })

    }
    renderClickChart();

    function renderLeadChart(data) {        
        let ele = document.getElementById('LeadChart');
        $.getJSON(`//localapi.trazk.com/2020/api/facebook/report.php?task=reportByDate&userToken=${userToken}&from=${moment(from,"DD-MM-YYYY").format("YYYY-MM-DD")}&to=${moment(to,"DD-MM-YYYY").format("YYYY-MM-DD")}`).then(data => {      
         let dataChart = {
                keys: [],
                values: {
                    lead: [],
                }
            };

            Object.values(data.data.data).forEach(item => {
                dataChart.keys.push(item.date);
                dataChart.values.lead.push(item.lead);
            })
            console.log(dataChart);
            
            let option = {
                grid: {
                    // bottom: 0,
                    left: 80,
                    right: 40,
                },
                legend: {
                    itemWidth: 16,
                    itemHeight: 10,
                    itemGap: 16,
                    right: 30,
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        // fontSize: 12,
                        fontFamily: 'Google Sans'
                    },
                    data: ['Lead']
                },
                tooltip: {
                    showContent: true,
                    trigger: 'axis',
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    borderColor: 'rgba(93,120,255,1)',
                    borderWidth: 1,
                    extraCssText: 'padding: 10px; box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);',
                    formatter: params => {
                        if (params.length > 0) {
                            let {
                                name
                            } = params[0];
                            name = moment(name).format('DD,MMMM,YYYY');
                            let kq = `<div class="text-dark text-capitalize border-bottom pb-1 mb-2">${name}</div>`
                           console.log(name);
                           
                            params.forEach(param => {
                                let {
                                    marker,
                                    color,
                                    seriesName,
                                    value
                                } = param;

                                value = numeral(value).format('0,0')

                                kq += `<div class="text-dark">${marker} ${seriesName} <span style="color:${color};font-weight:bold">${value}</span></div>`
                            })

                            return kq;
                        }
                    },
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        }
                    }
                },
                xAxis: [{
                    type: 'category',
                    data: dataChart.keys,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: 12,
                        formatter: (data) =>
                            data
                        // margin: 20
                    }
                }],
                yAxis: [{
                    type: 'value',
                    // show: false,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            // type: 'dashed'
                        }
                    },
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: 12,
                        formatter: (data) => numeral(data).format('0a')
                    }
                }, ],
                series: [{
                        name: 'Lead',
                        type: 'bar',
                        data: dataChart.values.lead,
                        itemStyle: {
                            color: '#1abc9c'
                        },
                    }

                ]
            };
            let myChart = echarts.init(ele);
            myChart.setOption(option);
            new ResizeSensor(ele, function () {
                myChart.resize();
            });
            // setTimeout(function () {
            //     myChart.on('mouseover', function (params) {
            //         if (params.name == data[0].name) {
            //             myChart.dispatchAction({
            //                 type: 'highlight',
            //                 seriesIndex: 0,
            //                 dataIndex: 0
            //             });
            //         } else {
            //             myChart.dispatchAction({
            //                 type: 'downplay',
            //                 seriesIndex: 0,
            //                 dataIndex: 0
            //             });
            //         }
            //     });

            //     myChart.on('mouseout', function (params) {
            //         myChart.dispatchAction({
            //             type: 'highlight',
            //             seriesIndex: 0,
            //             dataIndex: 0
            //         });
            //     });
            //     myChart.dispatchAction({
            //         type: 'highlight',
            //         seriesIndex: 0,
            //         dataIndex: 0
            //     });
            // }, 1000);
        })
    }
    renderLeadChart();

});