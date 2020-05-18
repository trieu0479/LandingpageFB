const language = {
    searchPlaceholder: 'Nhập từ khóa',
    processing: 'Đang xử lý...',
    loadingRecords: 'Đang tải...',
    emptyTable: 'Không có dữ liệu hiển thị',
    lengthMenu: 'Hiển thị: _MENU_ dòng mỗi trang',
    zeroRecords: 'Không tìm thấy dữ liệu',
    info: 'Hiển thị từ _START_ đến _END_ trong tổng _TOTAL_ dòng',
    infoEmpty: 'Hiển thị từ 0 đến 0 trong tổng 0 dòng',
    infoFiltered: '(lọc từ tổng số _MAX_ dòng)',
    search: 'Tìm kiếm:',
    paginate: {
        previous: '<i class="fa fa-angle-left kt-font-brand"></i>',
        next: '<i class="fa fa-angle-right kt-font-brand"></i>'
    }
};

var url_ = new URL(location.href);
var category = url_.searchParams.get("category")

function renderCategory() {

    $.ajax({
        url: `http://v7-fffblue.com/server/stats.php?task=showCategory&userToken=Vm5ZSmVLTjhXcWYwRzFObXlnbk5WUmlIdXF0Zk5XaGpkbXJ5ODMwc3J6Yz06OnD33aPxFDTCO6LhohyjG8o&limit=15`,
        type: "GET",
    }).then(data => {
        data = JSON.parse(data)
        data.data.forEach((v, k) => {
            // console.log(v)
            option = `
            <a href="?view=stats&action=index&category=${v.replace('&','%26')}" class="kt-fbrank ${v == category ? 'active' : ''} ">
                <div id="Computers_Electronics_and_Technology" class="kt-widget6__item ">
                    <span>${v}</span>
                </div>
            </a>`
            $('#catalogFbRank').append(option)


        })

    })
}



function renderData(data) {
    var arrtTable = [];
    let stt = 0
    let datav2 = data.data.sort(function(a, b) {
        return b.likes - a.likes
    })
    datav2.forEach((v, k) => {
        stt++
        var output = {};
        output.stt = stt
        output.fbId = v.fbId;
        output.fanpageCover = v.fanpageCover
        output.fanpageName = v.fanpageName
        output.fbCategory = v.fbCategory
        output.pageAlias = v.pageAlias

        v.likes == null ? output.likes = 0 : output.likes = v.likes
        v.talking_about_count == null ? output.talkingAbout = 0 : output.talkingAbout = v.talking_about_count
        output.likes_yesterday = v.likes_yesterday


        if (!v.website) {
            output.website =
                `<a href="javascript:void(0)">
                <span class="btn btn-result-danger btn-default btn-sm rounded-pill bg-danger-2 px-3 py-2 font-13"><i class="fad fa-do-not-enter text-danger mr-2 font-14 font-weight-bold"></i>Chưa có</span>
            </a>`
        } else {
            output.website =
                `<a href="${v.website}" target="_blank">
                    <span class="btn btn-result-kq btn-default btn-sm rounded-pill px-3 py-2 font-13"><i class="fad fa-eye text-info mr-2 font-14 font-weight-bold"></i>Đi đến</span>
                </a>`
        }
        arrtTable.push(output);
    })
    return arrtTable;
}

function getDataSearch(data) {
    // clearTimeout(timeout_load)
    console.log(data)

    $('#fanpage-search').html('');
    var address_option = ``;
    var data = data.data
    for (var i in data) {
        let dataId = data[i].fbId;
        let dataName = data[i].fanpageName;
        let datafanpageCover = data[i].fanpageCover;
        let datalikes = data[i].likes;
        address_option = `<div class="fanpage-option" data-fbid="${dataId}" data-fbname="${dataName}">
        <img src="${datafanpageCover}" class="img-option img-fluid">
            <div class="text-option">
                <span class="fontsize-14 ">${dataName}</span>
            </div>
        </div>`
        $('#fanpage-search').append(address_option);
    }

    $('#fanpage-search .fanpage-option').on('click', function() {
        console.log(1)
        var elValId = $(this).data('fbid');
        var elValName = $(this).data('fbname');
        console.log(elValName)
        $('.add-fbid').data('fbid', elValId);
        $('.add-fbid').val(elValName);
    });

}


function getData() {
    let from = moment().subtract(7, "days").format("DD/MM/YYYY")
    let to = moment().format("DD/MM/YYYY")
    let whichAPi = '';
    if (!category || category == "All" || category == '') {
        whichAPi = `//v7-fffblue.com/server/stats.php?task=getAllFacebookInformation&userToken=Vm5ZSmVLTjhXcWYwRzFObXlnbk5WUmlIdXF0Zk5XaGpkbXJ5ODMwc3J6Yz06OnD33aPxFDTCO6LhohyjG8o&limit=50`
        $('.all-active').addClass('active')
            // console.log(0)
    } else {
        // console.log(1)
        whichAPi = `//v7-fffblue.com/server/stats.php?task=getFacebookCategory&userToken=Vm5ZSmVLTjhXcWYwRzFObXlnbk5WUmlIdXF0Zk5XaGpkbXJ5ODMwc3J6Yz06OnD33aPxFDTCO6LhohyjG8o&category=${category.replace('&','%26')}`
        $('.all-active').removeClass('active')

    }
    $.ajax({
        url: whichAPi,
        type: "GET"
    }).then(data => {
        data = JSON.parse(data)
        $(`#input-searchFbRank`).on('keyup', function() {
                // setTimeout(() => {
                $('#fanpage-search').css('display', 'block');
                var valuewebsite = $(this).val().toLowerCase();
                $("#fanpage-search .fanpage-option").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf(valuewebsite) > -1)
                });

                // }, 400);
                // setTimeout(() => {
                getDataSearch(data);
                // }, 500)
            })
            // .focusout(function() {
            //     setTimeout(() => {
            //         $('#fanpage-search').css('display', 'none');
            //     }, 200);
            // });









        $(`#tablefbRank`).DataTable({
                data: renderData(data),
                columns: [{
                        title: `<div class="text-capitalize font-weight-bold font-12 text-center m-auto" style="max-width:30px;width:30px; line-height:18px">Stt</div>`,
                        "data": data => `<div class="text-center m-auto" style="line-height:40px">${data.stt}</div>`
                    }, {
                        title: `<div class="text-capitalize font-weight-bold font-12 text-left" style="max-width:200px;width: 200px; line-height:18px">Tên FanPage</div>`,
                        "data": data => `<div class="text-left mr-auto text-cut" style="max-width:200px;width: 200px">
                            <a class="d-flex align-items-center" href="?view=stats&action=detail&fbId=${data.fbId}&start=${from}&end=${to}"> 
                                <img src="${data.fanpageCover}" class="img-fluid rounded-circle" style="object-fit:cover; height:40px; width:40px">
                                <p class="mb-0 text-primary pl-3 text-left mr-auto cut-text-title">${data.fanpageName}</p>
                            </a>
                        </div>`,
                    },
                    {
                        title: `<div class="text-capitalize font-weight-bold font-12 text-left ml-auto" style="line-height:18px">Danh Mục</div>`,
                        "data": data => `<div class="text-dark text-left mr-auto cut-text-category" style="line-height:40px"> <span>${data.fbCategory }</span></div>`,
                    },
                    {
                        title: `<div class="text-capitalize font-weight-bold font-12 text-center mr-auto" style="line-height:18px">Website</div>`,
                        "data": data => `<div class="text-center m-auto">
                                            ${data.website}
                                        </div>`,
                    },
                    {
                        title: `<div class="text-capitalize font-weight-bold font-14 text-center mr-auto" style="line-height:18px">Lượt thích</div>`,
                        "data": data => `
                            <div class="take-care-likes d-flex justify-content-center align-items-center" style="height: 40px">
                                <span class="text-box-catelog text-white fontsize-12 bg-success mr-2 ml-0 mb-0">${data.likes}</span>
                            </div>`
                    },
                    {
                        title: `<div class="text-capitalize font-weight-bold font-14 text-center mr-auto" style="line-height:18px">Bài viết đánh giá</div>`,
                        "data": data => `
                            <div class="take-care-likes d-flex justify-content-center align-items-center" style="height: 40px">
                                <span class="text-box-catelog text-white fontsize-12 bg-info mr-2 ml-0 mb-0">${data.talkingAbout}</span>
                            </div>`
                    }
                ],


                initComplete: function(settings, json) {
                    $(`#tablefbRank td`).attr('style', 'padding:10px 18px')
                    $(`#tablefbRank_wrapper .dataTables_scrollBody`).perfectScrollbar();
                    $(`.tabletablefbRank`).removeClass('is-loading')
                },
                paging: true,
                autoWidth: false,
                pageLength: 50,
                ordering: true,
                "order": [
                    [1, 'DESC']
                ],
                info: true,
                responsive: true,
                searching: false,
                sorting: true,
                destroy: true,
                rowId: 'trId',
                "dom": 'ftp',
                scrollX: false,
                "ordering": false,
                info: false,
                processing: true,
                language
            })
            // }

        // research Fanpage Name ne nha

    })
}


$(document).ready(function() {

    // $('select.selectpicker').on('show.bs.select', function(e) {
    //     alert('hello');
    // });
    renderCategory()
    getData();
});