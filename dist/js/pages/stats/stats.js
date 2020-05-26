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
        url: `https://localapi.trazk.com/2020/api/facebook/stats.php?task=showCategory&userToken=${userToken}&limit=15`,
        type: "GET",
    }).then(data => {
        data = JSON.parse(data)
        data.data.forEach((v, k) => {

            option = `
            <a href="?view=stats&action=index&category=${remove_unicode(v)}" class="kt-fbrank ${v == category ? 'active' : ''} ">
                <div id="Computers_Electronics_and_Technology" class="kt-widget6__item ">
                    <span>${v}</span>
                </div>
            </a>`
            $('#catalogFbRank').append(option)


        })

    })
}


function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    } else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
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

        let datafanpageCover = `http://graph.facebook.com/${v.fbId}/picture?type=square`; //data[i].fanpageCover;
        output.fanpageCover = datafanpageCover;

        output.fanpageName = v.fanpageName
        output.fbCategory = v.fbCategory
        output.pageAlias = v.pageAlias

        v.likes == null ? output.likes = 0 : output.likes = v.likes
        v.talking_about_count == null ? output.talkingAbout = 0 : output.talkingAbout = v.talking_about_count
        output.likes_yesterday = v.likes_yesterday
        if (!v.website) {
            output.website = ``
        } else {
            output.website = v.website
            output.websiteRootUrl = extractHostname(v.website)
        }
        arrtTable.push(output);
    })
    return arrtTable;
}

function getDataSearch(data) {
    // clearTimeout(timeout_load)

    $('#fanpage-search').html('');
    var address_option = ``;
    var data = data.data
    for (var i in data) {
        let dataId = data[i].fbId;
        let dataName = data[i].fanpageName;
        let datafanpageCover = `http://graph.facebook.com/${data[i].fbId}/picture?type=square`; //data[i].fanpageCover;
        let datalikes = data[i].likes;
        address_option = `<div class="fanpage-option d-flex" data-fbid="${dataId}" data-fbname="${dataName}">
        <img src="${datafanpageCover}" class="img-option img-fluid">
            <div class="text-option d-flex row">
                <span class="fontsize-14 col-12 research-fanpages">${dataName}</span>
                <span class="fontsize-12 text-secondary col-12">Lượt like: ${datalikes ? datalikes : '0'}</span>
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


// function getData() {
//     let from = moment().subtract(7, "days").format("DD/MM/YYYY")
//     let to = moment().format("DD/MM/YYYY")
//     let whichAPi = '';
//     if (!category || category == "All" || category == '') {
//         whichAPi = `https://localapi.trazk.com/2020/api/facebook/stats.php?task=getAllFacebookInformation&userToken=${userToken}&limit=1`
//         $('.all-active').addClass('active')
//         console.log(0)
//     } else {
//         console.log(1)
//             // whichAPi = `http://localapi.trazk.com/2020/api/facebook/stats.php?task=getFacebookCategory&userToken=${userToken}&category=${category.replace('&','%26')}`
//         whichAPi = `http://localapi.trazk.com/2020/api/facebook/graph.php?task=searchFanpageSuggestion&q=${category.replace('&','%26')}`

//     }
//     $.ajax({
//         url: whichAPi,
//         type: "GET"
//     }).then(data => {
//         data = JSON.parse(data);
//         getDataSearch(data);
//         $(`#input-searchFbRank`).on('keyup', function() {

//                 $('#fanpage-search').css('display', 'block');
//                 let valuewebsite = $(this).val().toLowerCase();
//                 $("#fanpage-search .fanpage-option").removeClass("d-none").addClass("d-flex");
//                 $("#fanpage-search .fanpage-option").each(function() {
//                     let name = $(this).data("fbname").toLowerCase();
//                     let index = name.indexOf(valuewebsite);
//                     if (index == -1) {
//                         $(this).removeClass("d-flex").addClass("d-none");
//                     }
//                 })
//             })
//             .focusout(function() {
//                 setTimeout(() => {
//                     $('#fanpage-search').css('display', 'none');
//                 }, 200);
//             });
//         $('#nextButton').on('click', function() {
//             let fbIdInput = $(`#input-searchFbRank`).data('fbid')


//             let fanpage = '';
//             fanpage = $(`#input-searchFbRank`).val();
//             fanpage ?
//                 $('#alert_message').addClass('d-none') :
//                 $('#alert_message').removeClass('d-none');
//             if (fanpage) {
//                 window.location.href = `?view=stats&action=detail?view=stats&action=detail&fbId=${fbIdInput}&start=${from}&end=${to}`;
//             }
//         })








//         $(`#tablefbRank`).DataTable({
//                 data: renderData(data),
//                 columns: [{
//                         title: `<div class="text-capitalize font-weight-bold font-12 text-center m-auto" style="max-width:30px;width:30px; line-height:18px">Stt</div>`,
//                         "data": data => `<div class="text-center m-auto" style="line-height:40px">${data.stt}</div>`
//                     }, {
//                         title: `<div class="text-capitalize font-weight-bold font-12 text-left" style="max-width:200px;width: 200px; line-height:18px">Tên FanPage</div>`,
//                         "data": data => `<div class="text-left mr-auto text-cut" style="max-width:200px;width: 200px">
//                             <a class="d-flex align-items-center" href="?view=stats&action=detail&fbId=${data.fbId}&start=${from}&end=${to}"> 
//                                 <img src="${data.fanpageCover}" class="img-fluid rounded-circle" style="object-fit:cover; height:40px; width:40px">
//                                 <p class="mb-0 text-primary pl-3 text-left mr-auto cut-text-title">${data.fanpageName}</p>
//                                 <a target="blank" href="${data.website}"><i class="fal text-muted fa-external-link-square-alt ml-1"></i></a>
//                             </a>
//                         </div>`

//                     },
//                     {
//                         title: `Danh Mục`,
//                         "data": data => `<div class="text-dark text-left mr-auto cut-text-category" style="line-height:40px"> <span>${data.fbCategory }</span></div>`,
//                     },
//                     {
//                         title: `Website`,
//                         "data": data => `
//                                             ${data.websiteRootUrl}
//                                         `,
//                     },
//                     {
//                         title: `Lượt thích`,
//                         "data": data => `
//                             <div class="take-care-likes d-flex justify-content-center align-items-center" style="height: 40px">
//                                 <span class="text-box-catelog text-white fontsize-12 bg-success mr-2 ml-0 mb-0">${numeral(data.likes).format('0.00a')}</span>
//                             </div>`
//                     },
//                     {
//                         title: `Đánh giá`,
//                         "data": data => `
//                             <div class="take-care-likes d-flex justify-content-center align-items-center" style="height: 40px">
//                                 <span class="text-box-catelog text-white fontsize-12 bg-info mr-2 ml-0 mb-0">${numeral(data.talkingAbout).format('0a')}</span>
//                             </div>`,
//                         width: '90',
//                     }
//                 ],


//                 initComplete: function(settings, json) {
//                     $(`#tablefbRank td`).attr('style', 'padding:10px 18px')
//                     $(`#tablefbRank_wrapper .dataTables_scrollBody`).perfectScrollbar();
//                     $(`.tabletablefbRank`).removeClass('is-loading')
//                 },
//                 paging: true,
//                 autoWidth: false,
//                 pageLength: 50,
//                 ordering: true,
//                 "order": [
//                     [1, 'DESC']
//                 ],
//                 info: true,
//                 responsive: true,
//                 searching: false,
//                 sorting: true,
//                 destroy: true,
//                 rowId: 'trId',
//                 "dom": 'ftp',
//                 scrollX: false,
//                 "ordering": false,
//                 info: false,
//                 processing: true,
//                 processing: true,

//                 language
//             })
//             // }

//         // research Fanpage Name ne nha

//     })
// }

// function showFacebookVietnam(name = null) {

//     let from = moment().subtract(7, "days").format("DD/MM/YYYY")
//     let to = moment().format("DD/MM/YYYY")
//     let whichAPi = '';
//     if (!category || category == "All" || category == '') {
//         whichAPi = (!name) ? `https://localapi.trazk.com/2020/api/facebook/stats.php?task=getAllFacebookInformation&userToken=${userToken}` : `//localapi.trazk.com/webdata/websiteapicat.php?task=getWebsiteInACategoryInVietnamServer&catName=${name}&limit=50`
//         $('.all-active').addClass('active')
//         console.log(0)
//     } else {
//         console.log(1)
//         let cate = category;
//         cate = cate.toLowerCase();
//         cate = cate.replace(/ /g, "%20");
//         cate = cate.replace('&', '%26');
//         whichAPi = `http://localapi.trazk.com/2020/api/facebook/graph.php?task=searchFanpageSuggestion&userToken=${userToken}&q=${cate}`
//             // whichAPi = `http://localapi.trazk.com/2020/api/facebook/graph.php?task=searchFanpageSuggestion&q=bat%20dong%20san`
//         console.log(whichAPi)

//     }

//     $(`#tablefbRank`).DataTable({
//             data: renderData(data),
//             columns: [{
//                     title: `<div class="text-capitalize font-weight-bold font-12 text-center m-auto" style="max-width:30px;width:30px; line-height:18px">Stt</div>`,
//                     "data": data => `<div class="text-center m-auto" style="line-height:40px">${data.stt}</div>`
//                 }, {
//                     title: `<div class="text-capitalize font-weight-bold font-12 text-left" style="max-width:200px;width: 200px; line-height:18px">Tên FanPage</div>`,
//                     "data": data => `<div class="text-left mr-auto text-cut" style="max-width:200px;width: 200px">
//                             <a class="d-flex align-items-center" href="?view=stats&action=detail&fbId=${data.fbId}&start=${from}&end=${to}"> 
//                                 <img src="${data.fanpageCover}" class="img-fluid rounded-circle" style="object-fit:cover; height:40px; width:40px">
//                                 <p class="mb-0 text-primary pl-3 text-left mr-auto cut-text-title">${data.fanpageName}</p>
//                             </a>
//                         </div>`

//                 },
//                 {
//                     title: `Danh Mục`,
//                     "data": data => `<div class="text-dark text-left mr-auto cut-text-category" style="line-height:40px"> <span>${data.fbCategory }</span></div>`,
//                 },
//                 {
//                     title: `Website`,
//                     "data": data => `
//                                             ${data.websiteRootUrl}
//                                         `,
//                 },
//                 {
//                     title: `Lượt thích`,
//                     "data": data => `
//                             <div class="take-care-likes d-flex justify-content-center align-items-center" style="height: 40px">
//                                 <span class="text-box-catelog text-white fontsize-12 bg-success mr-2 ml-0 mb-0">${numeral(data.likes).format('0.00a')}</span>
//                             </div>`
//                 },
//                 {
//                     title: `Đánh giá`,
//                     "data": data => `
//                             <div class="take-care-likes d-flex justify-content-center align-items-center" style="height: 40px">
//                                 <span class="text-box-catelog text-white fontsize-12 bg-info mr-2 ml-0 mb-0">${numeral(data.talkingAbout).format('0a')}</span>
//                             </div>`,
//                     width: '90',
//                 }
//             ],


//             initComplete: function(settings, json) {
//                 $(`#tablefbRank td`).attr('style', 'padding:10px 18px')
//                 $(`#tablefbRank_wrapper .dataTables_scrollBody`).perfectScrollbar();
//                 $(`.tabletablefbRank`).removeClass('is-loading')
//             },
//             paging: true,
//             autoWidth: false,
//             pageLength: 50,
//             ordering: true,
//             "order": [
//                 [1, 'DESC']
//             ],
//             info: true,
//             responsive: true,
//             searching: false,
//             sorting: true,
//             destroy: true,
//             rowId: 'trId',
//             "dom": 'ftp',
//             scrollX: false,
//             "ordering": false,
//             info: false,
//             processing: true,
//             processing: true,

//             language
//         })
//         // }

//     // research Fanpage Name ne nha

// })
// }

function remove_unicode(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");

    str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1- 
    str = str.replace(/^\-+|\-+$/g, "");

    return str;
}

function showFacebookVietnam(name = null) {
    $(`#tablefbRank`).DataTable({

        ajax: {
            url: whichAPi,
            dataSrc: function(res) {
                var columns = [];
                var stt = parseInt(res.data.from) + 1;

                console.log(res)
                $.each(res.data.data, function(k, v) {
                    var output = {};

                    output.stt = stt++;
                    output.fbId = v.fbId;

                    let datafanpageCover = `http://graph.facebook.com/${v.fbId}/picture?type=square`; //data[i].fanpageCover;
                    output.fanpageCover = datafanpageCover;

                    output.fanpageName = v.fanpageName
                    output.fbCategory = v.fbCategory
                    output.pageAlias = v.pageAlias

                    v.likes == null ? output.likes = 0 : output.likes = v.likes
                    v.talking_about_count == null ? output.talkingAbout = 0 : output.talkingAbout = v.talking_about_count
                    output.likes_yesterday = v.likes_yesterday
                    if (!v.website) {
                        output.website = ``
                    } else {
                        output.website = v.website
                        output.websiteRootUrl = extractHostname(v.website)
                    }
                    columns.push(output);
                })
                return columns;
            }
        },
        columns: [{
                title: `<div class="text-capitalize font-weight-bold font-12 text-center m-auto" style="max-width:30px;width:30px; line-height:18px">Stt</div>`,
                "data": data => `<div class="text-center m-auto" style="line-height:40px">${data.stt}</div>`
            }, {
                title: `<div class="text-capitalize font-weight-bold font-12 text-left" style="max-width:200px;width: 200px; line-height:18px">Tên FanPage</div>`,
                "data": data => `<div class="text-left mr-auto text-cut" style="max-width:200px;width: 200px">
                    <a class="d-flex align-items-center" href="rank/${data.fbId}/${remove_unicode(data.fanpageName)}"> 
                        <img src="${data.fanpageCover}" class="img-fluid rounded-circle" style="object-fit:cover; height:40px; width:40px">
                        <p class="mb-0 text-primary pl-3 text-left mr-auto cut-text-title">${data.fanpageName}</p>
                    </a>
                    <a target="_blank" href="${data.website}" class="d-flex align-items-center pl-1"><i class="fal text-muted fa-external-link-square-alt ml-1"></i></a>
                </div>`

            },
            {
                title: `Danh Mục`,
                "data": data => `<div class="text-dark text-left mr-auto cut-text-category" style="line-height:40px"> <span>${data.fbCategory }</span></div>`,
            },
            {
                title: `Website`,
                "data": data => `
                                    <div class="text-dark text-left mr-auto cut-text-category" style="line-height:40px">
                                        <a target="_blank" href="${data.website == undefined ? 'javascrip:voild(0)' : data.website}">${data.website == undefined ? '' : data.website}</a>
                                    </div>
                                    
                                `,
            },
            {
                title: `Lượt thích`,
                "data": data => `
                    <div class="take-care-likes d-flex justify-content-center align-items-center" style="height: 40px">
                        <span class="text-box-catelog text-white fontsize-12 bg-success mr-2 ml-0 mb-0">${numeral(data.likes).format('')}</span>
                    </div>`
            },
            {
                title: `Đánh giá`,
                "data": data => `
                    <div class="take-care-likes d-flex justify-content-center align-items-center" style="height: 40px">
                        <span class="text-box-catelog text-white fontsize-12 bg-info mr-2 ml-0 mb-0">${numeral(data.talkingAbout).format('')}</span>
                    </div>`,
                width: '90',
            }
        ],


        initComplete: function(settings, json) {
            $(`#tablefbRank td`).attr('style', 'padding:10px 10px')
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
        serverSide: true,

        language
    })
}

$(document).ready(function() {

    renderCategory()
    showFacebookVietnam();
});