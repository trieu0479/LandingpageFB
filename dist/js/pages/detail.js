var url_ = new URL(location.href);
var fbId = url_.searchParams.get("fbId")
var from = url_.searchParams.get("start")
var to = url_.searchParams.get("end")

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
    window.location.href = 'http://v7-fffblue.com/stats.php/?view=stats&action=index';
    console.log(1)
} else {
    $(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });

    function getDataFB() {
        $.ajax({
            url: `//v7-fffblue.com/server/stats.php?task=getFacebookInformation&userToken=Vm5ZSmVLTjhXcWYwRzFObXlnbk5WUmlIdXF0Zk5XaGpkbXJ5ODMwc3J6Yz06OnD33aPxFDTCO6LhohyjG8o&fbId=${fbId}`,
            type: "GET"
        }).then(res => {
            res = JSON.parse(res)
            console.log(res.data)
            let fbCover = res.data.cover.source
            let fbName = res.data.name
            let fbCate = res.data.category
            let fbId = res.data.id
            let fbwebsite = res.data.website
            let fbphone = res.data.phone
            console.log(`fbAva`)
            $('#fbAva').attr("src", `http://graph.facebook.com/${fbId}/picture?type=large`)
            $('.fbCover').attr("src", fbCover)
            $('#fbName').text(fbName)
            $('#fbCate').text(fbCate)


            $('#fbLink').attr('href', `http://facebook.com/${fbId}`)
            fbwebsite ? $('#webLink').attr('href', fbwebsite) : $('#webLink').attr('href', 'javascript:void(0)')
            fbphone ? $('#phoneNumb').attr('data-original-title', fbphone) : $('#phoneNumb').attr('data-original-title', 'chưa đăng ký')
        })
    }
}

function getDataFB() {
    $.ajax({
        url: `//v7-fffblue.com/server/stats.php?task=getFacebookInformation&userToken=Vm5ZSmVLTjhXcWYwRzFObXlnbk5WUmlIdXF0Zk5XaGpkbXJ5ODMwc3J6Yz06OnD33aPxFDTCO6LhohyjG8o&fbId=${fbId}`,
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
        fbwebsite ? $('#webPhone').attr('href', fbwebsite) : $('#webLink').attr('href', 'javascript:void(0)')
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
            output.kq = `<span class=" text-success fontsize-14">+${columns[aaa].likes - columns[i].likes}</span><i class="fad text-success bg-success-2 fa-arrow-up ml-2" style="font-size:12px"></i>`
        } else if (columns[aaa].likes - columns[i].likes < 0) {
            output.kq = `<span class=" text-danger fontsize-14"> ${columns[aaa].likes - columns[i].likes}</span><i class="fad text-danger fa-arrow-down ml-2" style="font-size:12px"></i>`
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
    let from_ = moment(from, 'DD/MM/YYYY').format('YYYY-MM-DD');
    let to_ = moment(to, 'DD/MM/YYYY').format('YYYY-MM-DD');

    console.log(from)
    console.log(to_)


    $("#rangeDateSeo").flatpickr({
        locale: "vn",
        mode: 'range',
        dateFormat: "d/m/Y",
        maxDate: new Date(),
        defaultDate: [from, to],
        onClose: function(date) {
            let startDay_ = flatpickr.formatDate(date[0], "d/m/Y");
            let endDay_ = flatpickr.formatDate(date[1], "d/m/Y");
            if (startDay_ != from || endDay_ != to) {
                window.location.href = `?view=stats&action=detail&fbId=${fbId}&start=${startDay_}&end=${endDay_}`
            }

        }
    })





    $.ajax({
        url: `//v7-fffblue.com/server/stats.php?task=getFacebookLikeDay&userToken=Vm5ZSmVLTjhXcWYwRzFObXlnbk5WUmlIdXF0Zk5XaGpkbXJ5ODMwc3J6Yz06OnD33aPxFDTCO6LhohyjG8o&fbId=${fbId}&from=${from_}&to=${to_}`,
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
                    "data": data => `<div class="sparkline text-center m-auto" style="max-width:100px;width:100px">${data.likesday}</div>`,
                },
                {
                    title: `<div class="text-capitalize text-center m-auto font-weight-bold font-12" style="max-width:100px;width:100px">Biến động</div>`,
                    "data": data => `<div class="sparkline text-center m-auto" id="countlike" style="max-width:100px;width:100px">${data.kq} </div>`,
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


    })
}







// render chart 
function renderChart(data) {


    let arrDate = [];
    let arrLikes = [];

    if (!data || data.data.length == 0) {
        console.log(1)
    } else {
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
                borderColor: 'rgba(93,120,255,1)',
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
                type: 'line',
                smooth: true,
                // stack: "0",
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(79, 141, 249)'
                    }, {
                        offset: 1,
                        color: '#fff'
                    }])
                },
                symbol: 'none',
                // symbolSize: 10,
                itemStyle: {
                    color: 'rgb(79, 141, 249)'
                },
                data: arrLikes
            }, ]
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