var url_ = new URL(location.href);

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
                console.log(res)
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




                $('#fbAva').attr("src", 'http://graph.facebook.com/' + fbId + '/picture?type=large').removeClass('is-loading')
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


                $('#fbLink').attr('href', `http://facebook.com/${fbId}`)
                fbwebsite ? $('#webLink').attr('href', fbwebsite) : $('#webLink').addClass('d-none')
            }

        })
    }
}

function getDataFB() {
    $.ajax({
        url: `https://localapi.trazk.com/2020/api/facebook/stats.php?task=getFacebookInformation&userToken=${userToken}&fbId=${fbId}`,
        type: "GET"
    }).then(res => {
        res = JSON.parse(res)
        console.log(res)
        let fbCover = res.data.fanpageCover
        let fbName = res.data.fanpageName
        let fbCate = res.data.fbCategory
        let fbId = res.data.fbId
        let fbwebsite = res.data.website
        let fbphone = res.data.phone



        $('#fbCover').attr("src", fbCover)
        $('#fbName').text(fbName)
        $('#fbCate').text(fbCate)


        $('#fbLink').attr('href', `http://facebook.com/${fbId}`)
        fbwebsite ? $('#webLink').attr('href', fbwebsite) : $('#webLink').attr('href', 'javascript:void(0)')
    })
}


function renderTable(data) {

    let bbb = [];
    let columns = data.data
    let aaa = null
    if (!columns.length - 1) {
        aaa = columns.length - 2;
    } else {
        aaa = columns.length - 1;
    }

    for (i = 0; i < columns.length; i++) {

        let output = {}
        output.countlike = columns[aaa].likes - columns[i].likes

        if (columns[aaa].likes - columns[i].likes > 0) {
            output.kq = `<span class=" text-success fontsize-14">+${numeral(columns[aaa].likes - columns[i].likes).format()}</span><i class="fad text-success bg-success-2 fa-arrow-up ml-2" style="font-size:12px"></i>`
        } else if (columns[aaa].likes - columns[i].likes < 0) {
            output.kq = `<span class=" text-danger fontsize-14"> ${numeral(columns[aaa].likes - columns[i].likes).format()}</span><i class="fad text-danger fa-arrow-down ml-2" style="font-size:12px"></i>`
        } else if (columns[aaa].likes - columns[i].likes == 0) {
            output.kq = `<span class=" text-warning fontsize-14">-</span>`
        }
        output.likesday = columns[i].likes
        output.formatDate = moment(columns[i].insertTime, "YYYY/MM/DD").format("DD/MM/YYYY")
        bbb.push(output)
    }
    return bbb;
}


function getLike10Days() {
    // let from_ = moment(from).format("YYYY-MM-DD")
    // let to_ = moment(to).format("YYYY-MM-DD")

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






$(document).ready(function() {
    getDataFB();
    getLike10Days();

});