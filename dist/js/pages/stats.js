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


function renderData(data) {
    var arrtTable = [];
    let stt = 0
    console.log(data)
    data.data.forEach((v, k) => {

        stt++
        var output = {};
        output.stt = stt
        output.fbId = v.fbId;
        output.fanpageCover = v.fanpageCover
        output.fanpageName = v.fanpageName
        output.fbCategory = v.fbCategory
        output.pageAlias = v.pageAlias
        output.hieu = v.likes - v.likes_yesterday
        if (v.likes - v.likes_yesterday > 0) {
            output.kq = `<span class=" text-sucess fontsize-14"> ${v.likes - v.likes_yesterday}</span><i class="fad text-success bg-success-2 fa-arrow-up ml-2" style="font-size:12px"></i> `
        } else if (v.likes - v.likes_yesterday < 0) {
            output.kq = `<span class=" text-danger fontsize-14"> ${v.likes - v.likes_yesterday}</span><i class="fad text-danger fa-arrow-down ml-2" style="font-size:12px"></i>`
        } else if (v.likes - v.likes_yesterday == 0) {
            output.kq = ``
        }

        output.likes = v.likes
        output.likes_yesterday = v.likes_yesterday


        if (!v.website) {
            output.website =
                `<a href="javascript:void(0)">
                <span class="btn btn-result-danger btn-default btn-sm rounded-pill bg-danger-2 px-3 py-2 font-13"><i class="fad fa-do-not-enter text-danger mr-2 font-14 font-weight-bold"></i>Chưa có</span>
            </a>`
        } else {
            output.website =
                `<a href="${v.website}">
                    <span class="btn btn-result-kq btn-default btn-sm rounded-pill px-3 py-2 font-13"><i class="fad fa-eye text-info mr-2 font-14 font-weight-bold"></i>Đi đến</span>
                </a>`
        }
        arrtTable.push(output);
    })
    return arrtTable;
}




function getData() {
    let from = moment().subtract(7, "days").format("DD/MM/YYYY")
    let to = moment().format("DD/MM/YYYY")
    $.ajax({
        url: `//v7-fffblue.com/server/stats.php?task=getAllFacebookInformation&userToken=Vm5ZSmVLTjhXcWYwRzFObXlnbk5WUmlIdXF0Zk5XaGpkbXJ5ODMwc3J6Yz06OnD33aPxFDTCO6LhohyjG8o&limit=10`,
        type: "GET"
    }).then(data => {
        data = JSON.parse(data)
        $(`#tablefbRank`).DataTable({
                data: renderData(data),
                columns: [{
                        title: `<div class="text-capitalize font-weight-bold font-12 text-center m-auto" style="max-width:30px;width:30px; line-height:36px">Stt</div>`,
                        "data": data => `<div class="text-center m-auto" style="line-height:40px">${data.stt}</div>`
                    }, {
                        title: `<div class="text-capitalize font-weight-bold font-12 text-left" style="max-width:200px;width: 200px; line-height:36px">Tên FanPage</div>`,
                        "data": data => `<div class="text-left mr-auto text-cut" style="max-width:200px;width: 200px">
                            <a class="d-flex align-items-center" href="?view=stats&action=detail&fbId=${data.fbId}&start=${from}&end=${to}"> 
                                <img src="${data.fanpageCover}" class="img-fluid rounded-circle" style="object-fit:cover; height:40px; width:40px">
                                <p class="mb-0 text-primary pl-3 text-left mr-auto cut-text-title">${data.fanpageName}</p>
                            </a>
                        </div>`,
                    },
                    {
                        title: `<div class="text-capitalize font-weight-bold font-12 text-left ml-auto" style="line-height:36px">Danh Mục</div>`,
                        "data": data => `<div class="text-dark text-left mr-auto cut-text-category" style="line-height:40px"> <span>${data.fbCategory }</span></div>`,
                    },
                    {
                        title: `<div class="text-capitalize font-weight-bold font-12 text-center mr-auto" style="line-height:36px">Website</div>`,
                        "data": data => `<div class="text-center m-auto">
                                            ${data.website}
                                        </div>`,
                    },
                    {
                        title: `<div class="text-capitalize font-weight-bold font-12 text-left " style="max-width:150px;width:150px;">
                                    Lượt thích
                                    <div class="fontsize-10">(Hôm nay và hôm qua)</div>
                                </>`,
                        "data": data => `
                                        <div class="take-care-likes d-flex justify-content-center align-items-center" style="height: 40px">
                                            <span class="text-box-catelog text-white bg-success mr-2 ml-0 mb-0">${data.likes}</span>
                                            <span class="text-box-catelog text-white bg-danger mr-2 ml-0 mb-0">${data.likes_yesterday}</span>
                                            <div class="take-care-like ml-auto d-flex justify-content-center align-items-center"> 
                                                ${data.kq}
                                            </div>
                                        </div>`
                    }
                ],
                initComplete: function(settings, json) {
                    $(`#tablefbRank td`).attr('style', 'padding:10px 18px')
                    $(`#tablefbRank_wrapper .dataTables_scrollBody`).perfectScrollbar();
                    $(`.tabletablefbRank`).removeClass('is-loading')
                },
                destroy: true,
                rowId: 'trId',
                "dom": 'ftp',
                paging: false,
                // scrollY: '570px', 
                scrollX: false,
                "ordering": false,
                info: false,
                autoWidth: false,
                processing: true,
                searching: false,
                language
            })
            // }

    })
}


$(document).ready(function() {

    getData();
});