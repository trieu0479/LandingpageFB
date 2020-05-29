var url_ = new URL(location.href);
var fbId = url_.searchParams.get("fbId")

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

if (!fbId) {
    window.location.href = 'https://fff.blue';
} else {
    $(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });

    function getDataFB() {
        $.ajax({
            url: `https://localapi.trazk.com/2020/api/facebook/stats.php?task=getFacebookInformation&userToken=${userToken}&fbId=${fbId}`,
            type: "GET"
        }).then(res => {
            if (res) {
                res = JSON.parse(res)
                    // console.log(res)
                let fbCover = res.data.json.cover.source
                let fbName = res.data.json.name
                let fbUsername = res.data.json.username
                let fbBirthday = res.data.json.birthday
                let fbCate = res.data.json.category
                let fbhaveapp = res.data.json.has_added_app
                let fbId = res.data.json.id
                let fbLikes = res.data.json.likes
                let fbTalkingAbout = res.data.json.talking_about_count
                let fbAbout = res.data.json.about
                let fbLink = res.data.json.link
                let fbwebsite = res.data.website
                let fbphone = res.data.phone
                let fbhereCount = res.data.json.were_here_count
                let fbcheckins = res.data.json.checkins
                let fbdescription = res.data.json.description
                let fbawards = res.data.json.awards




                $('#fbAva').attr("src", 'https://graph.facebook.com/' + fbId + '/picture?type=large').removeClass('is-loading')
                $('#fbCover').css("--cover-photo-uri", 'url(' + fbCover + ')').removeClass('is-loading')

                $('#fbUsername').text('@' + fbUsername).removeClass('is-loading')
                $('#fbCate').html(`${fbCate} - <span>${numeral(fbLikes).format()} Like </span>`).removeClass('is-loading')

                $('#fbBirthday').text(fbBirthday).removeClass('is-loading')
                $('#likeNow').text(numeral(fbLikes).format('0.0a')).removeClass('is-loading')

                $('#fbhereCount').text(numeral(fbhereCount).format('0.0a')).removeClass('is-loading')
                $('#checkin').text(numeral(fbcheckins).format('0.0a')).removeClass('is-loading')

                $('#fbTalkingAbout').html(numeral(fbTalkingAbout).format('0.0a') + '<span class="fontsize-16 pl-2 text-dark">bài<span>').removeClass('is-loading')
                $('#fbAbout').text(fbAbout ? fbAbout : "...").removeClass('is-loading')
                $('#fbLinkFg').text(fbLink).removeClass('is-loading')

                fbLink ? $('#fbLinkFg').attr('href', fbLink) : $('#fbWebsite').text('chưa có').removeClass('is-loading')

                fbwebsite ? $('#fbWebsite').text(fbwebsite).removeClass('is-loading') : $('#fbWebsite').text('chưa có').removeClass('is-loading')
                fbwebsite ? $('#fbWebsite').attr('href', fbwebsite).removeClass('is-loading') : $('#fbWebsite').text('chưa có').removeClass('is-loading')

                fbphone ? $('#fbPhone').text(`${fbphone}`).removeClass('is-loading') : $('#fbPhone').text('chưa có').removeClass('is-loading')

                $('#fbName').prepend(fbName).removeClass('is-loading')
                $('#categoryDes').text(fbCate).removeClass('is-loading')
                $('#haveApp').text(fbhaveapp == false ? "Chưa liên kết" : "Đã liên kết").removeClass('is-loading')
                $('#description').text(fbdescription ? fbdescription : "...").removeClass('is-loading')
                $('#awards').text(fbawards ? fbawards : "...").removeClass('is-loading')


                $('#fbLink').attr('href', `https://facebook.com/${fbId}`)
                fbwebsite ? $('#webLink').attr('href', fbwebsite) : $('#webLink').addClass('d-none')
            }

        })
    }
}



function renderTable(data) {
    // console.log(data)
    var table = []
    let columns = data.data
    var arr = [];
    for (let i = 0; i < columns.length; i++) {

        let output = {};
        let countLikes = (columns[i + 1].likes) - columns[i].likes;
        if (!columns[i + 1].likes) {
            output.kq = '0'
        } else {
            if (countLikes > 0) {
                output.kq = `<span class=" text-success fontsize-14">+${numeral(countLikes).format()}</span><i class="fad text-success bg-success-2 fa-arrow-up ml-2" style="font-size:12px"></i>`
            } else if (countLikes < 0) {
                output.kq = `<span class=" text-danger fontsize-14"> ${numeral(countLikes).format()}</span><i class="fad text-danger fa-arrow-down ml-2" style="font-size:12px"></i>`
            } else if (countLikes == 0) {
                output.kq = `<span class=" text-warning fontsize-14">-</span>`
            }
        }
        output.likesday = columns[i].likes
        output.formatDate = moment(columns[i].insertTime, "YYYY/MM/DD").format("DD/MM/YYYY")
            // console.log('output ', output)
            // console.log('arr ', arr)
        arr.push(output)

    }
    return arr;
}


function getLike10Days() {


    $.ajax({
        url: `https://localapi.trazk.com/2020/api/facebook/stats.php?task=getFacebookLikeDay&userToken=${userToken}&fbId=${fbId}`,
        type: "GET"
    }).then(res => {
        res = JSON.parse(res);
        renderChart(res)






        $('#tableRank-fb').DataTable({

            data: renderTable(res),
            // drawCallback: function(settings) {},

            columns: [{
                    title: `<div class="text-capitalize text-center m-auto font-weight-bold font-12" style="max-width:100px;width:100px">Ngày</div>`,
                    "data": data => `<div class="sparkline text-center m-auto" style="max-width:100px;width:100px">${data.formatDate}</div>`,
                },
                {
                    title: `<div class="text-capitalize text-center m-auto font-weight-bold font-12" style="max-width:100px;width:100px">Lượt like</div>`,
                    "data": data => `<div class="sparkline text-center m-auto" style="max-width:100px;width:100px">${numeral(data.likesday).format()}</div>`,
                },
                {
                    title: `<div class="text-capitalize text-center m-auto font-weight-bold font-12" style="max-width:100px;width:100px">Biến động</div>`,
                    "data": data => `<div class="sparkline text-center m-auto" id="countlike" style="max-width:100px;width:100px">${data.kq} </div>`,
                }
            ],
            initComplete: function(settings, json) {
                $(`#tablefbRank td`).attr('style', 'padding:10px 18px')
                    // $(`#tablefbRank_wrapper .dataTables_scrollBody`).perfectScrollbar();
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


    })
}







// render chart 
function renderChart(data) {
    let arrDate = [];
    let arrLikes = [];

    if (!data || data.data.length == 0) {
        console.log(1)
        $('#chartLikes').removeClass('is-loading').addClass('empty-state')
    } else {
        $('#chartLikes').removeClass('is-loading').removeClass('empty-state')
        data.data.forEach((v, k) => {
            let formatDate = moment(v.insertTime, "YYYY/MM/DD").format("DD/MM")
            let getLikes = v.likes
            arrDate.push(formatDate)
            arrLikes.push(getLikes)
        })
        let myChart = echarts.init(document.getElementById(`chartLikes`), 'light')
        let option = {
            tooltip: {
                trigger: "axis",
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderColor: '#fd397a',
                borderWidth: 1,
                extraCssText: 'padding: 10px; box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);',
                formatter: params => {
                    let {
                        name
                    } = params[0];
                    let detail = "";
                    params.forEach((p, i) => {
                        if (p.value == null || p.value == "A")
                            p.value == 0;
                        let {
                            marker,
                            color,
                            seriesName,
                            value
                        } = p;

                        value = numeral(value).format("0,0");
                        detail += `${marker} ${seriesName} <span style="color:${color};font-weight:bold">${value}</span>
                    <br/>`
                    })
                    name = name
                    return `<div class="text-dark text-capitalize border-bottom pb-1">${name}</div>
            <div class="text-dark pt-2">${detail}</div>`;
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            // color: masterColor,
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: arrDate,
                axisLine: {
                    lineStyle: {
                        color: "#ccc"
                    }
                },
            }],
            yAxis: [{
                type: "value",
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        color: "#ccc"
                    },
                    fontFamily: 'Arial',
                    formatter: (value, index) => (value = numeral(value).format("0a"))
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
            }, ],
            series: [{

                    data: arrLikes,
                    name: 'Lượt Like',
                    type: 'bar',
                    smooth: true,
                    // stack: "0",
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#fd397a'
                            }, {
                                offset: 1,
                                color: '#fff'
                            },

                        ])
                    },

                    symbol: 'none',
                    // symbolSize: 10,
                    itemStyle: {
                        color: '#fd397a'
                    },
                    data: arrLikes
                },

            ]
        };
        myChart.setOption(option);
        new ResizeSensor(document.getElementById(`chartLikes`), function() {
            myChart.resize();
        });


    }

}




// render post facebook
function getPostFbRank() {
    $(`#fbPostRank`).DataTable({
        ajax: {
            url: `https://localapi.trazk.com/2020/api/facebook/index.php?task=getFanpagePost&fbid=${fbId}&userToken=${userToken}&limit=10`,
            dataSrc: function(res) {
                var columns = [];
                let stt = 0
                $.each(res.data.data, function(k, v) {
                    stt++
                    var output = {};
                    output.stt = stt;
                    // output.name = v.from.name
                    output.picture = v.picture
                    output.message = !v.message ? `<spa class="text-danger">Không có mô tả</span>` : v.message
                    output.link = v.link
                    output.likes = !v.likes.summary.total_count ? 0 : v.likes.summary.total_count
                        // output.shares = v.shares
                    output.times = moment(v.created_time, "YYYY/MM/DD").format("DD/MM/YYYY")
                    output.shares = !v.shares ? 0 : v.shares.count

                    if (!v.comments) {
                        output.comments = 0
                    } else {
                        output.comments = v.comments.data.length
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
                title: `<div class="text-capitalize font-weight-bold font-12 text-left" >Tên FanPage</div>`,
                "data": data => `<div class="">
                            <a class="d-flex align-items-center" href="${data.link}"> 
                                <img src="${data.picture}" class="img-fluid" style="object-fit:cover; height:70px; width:100px">
                                <i class="fad fa-external-link-alt text-info font-24 pl-2"></i>
                            </a>
                    
                </div>`

            },
            {
                title: `<div class="" style="max-width:200px;width:200px;">Nội dung bài viết</div>`,
                "data": data => `<div class="text-dark text-left mr-auto cut-text-message">${data.message}</div>`,
                className: 'w-200px'
            },
            {
                title: `Comments`,
                "data": data => `
                            <div class="take-care-likes d-flex justify-content-center align-items-center">
                            <span class="text-box-catelog text-white fontsize-12 ml-0 mb-0" style="background-color: #be4bdb"><i class="fad fa-comments-alt"></i> :  ${numeral(data.comments).format('')}</span>
                        </div>`,
                className: 'text-center'
            },
            {
                title: `Likes`,
                "data": data => `
                    <div class="take-care-likes d-flex justify-content-center align-items-center">
                        <span class="text-box-catelog text-white fontsize-12 bg-success ml-0 mb-0"><i class="fad fa-thumbs-up pr-1 text-white"></i>:  ${numeral(data.likes).format('')}</span>
                    </div>`,
                className: 'text-center'
            },
            {
                title: `Shares`,
                "data": data => `
                    <div class="take-care-likes d-flex justify-content-center align-items-center">
                        <span class="text-box-catelog text-white fontsize-12 bg-info ml-0 mb-0"><i class="fad fa-share-square pr-1 text-white"></i>:  ${numeral(data.shares).format('')}</span>
                    </div>`,
                // width: '90',
                className: 'text-center'
            }
        ],

        initComplete: function(settings, json) {
            $(`#tablefbRank td`).attr('style', 'padding:10px 10px')
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
}








$(document).ready(function() {
    getDataFB();
    getLike10Days();
    getPostFbRank();
});