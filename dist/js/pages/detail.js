var url_ = new URL(location.href);
var fbId = url_.searchParams.get("fbId")



function getDataFB() {
    $.ajax({
        url: `//v7-fffblue.com/server/stats.php?task=getFacebookInformation&userToken=Vm5ZSmVLTjhXcWYwRzFObXlnbk5WUmlIdXF0Zk5XaGpkbXJ5ODMwc3J6Yz06OnD33aPxFDTCO6LhohyjG8o&fbId=${fbId}`,
        type: "GET"
    }).then(res => {
        res = JSON.parse(res)

        let fbCover = res.data.fanpageCover
        let fbName = res.data.fanpageName
        let fbCate = res.data.fbCategory
        $('#fbCover').attr("src", fbCover)
        $('#fbName').text(fbName)
        $('#fbCate').text(fbCate)

    })
}


function getLike10Days() {
    $.ajax({
        url: `http://v7-fffblue.com/server/stats.php?task=getFacebookLikeDay&userToken=Vm5ZSmVLTjhXcWYwRzFObXlnbk5WUmlIdXF0Zk5XaGpkbXJ5ODMwc3J6Yz06OnD33aPxFDTCO6LhohyjG8o&fbId=${fbId}&from=2020-05-07&to=2020-05-11`,
        type: "GET"
    }).then(res => {
        res = JSON.parse(res)

        renderChart(res)

    })


}


function renderChart(data) {
    // console.log(data)
    let arrDate = [];
    let arrLikes = [];
    if (!data || data.data.length == 0) {
        console.log(1)
    } else {
        data.data.forEach((v, k) => {
            let formatDate = moment(v.insertTime, "YYYY/MM/DD").format("DD/MM/YYYY")
            let getLikes = v.likes
            arrDate.push(formatDate)
            arrLikes.push(getLikes)
        })

        console.log(arrDate)
        let myChart = echarts.init(document.getElementById(''), 'light')
            // console.log(myChart)
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
            color: masterColor,
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
                name: 'Xếp hạng',
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



        option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        };

        myChart.setOption(option);
        new ResizeSensor($(`#chartLikes`), function() {
            myChart.resize();
        });
        console.log(myChart)
    }

}




getDataFB();
getLike10Days();