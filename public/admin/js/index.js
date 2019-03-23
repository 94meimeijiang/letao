//如果有后台返回数据
$(function(){
    var data = {
        title:'2018年注册人数',
        list:[
            { month: '1月', count: 1000 },
            { month: '2月', count: 2020 },
            { month: '3月', count: 1560 },
            { month: '4月', count: 1000 },
            { month: '5月', count: 2500 },
            { month: '6月', count: 800 }
        ]
    }

    var months = [];
    var counts = [];
    for ( var i = 0 ; i < data.list.length ; i++) {
        months.push(data.list[i].month);
        counts.push(data.list[i].count);
    }
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector('.lt_content .left'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: data.title,
            textStyle:{
                color: 'red'
            }
        },
        tooltip: {},
        legend: {
            data: ['人数']
        },
        xAxis: {
            data: months
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: counts
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);



    // 基于准备好的dom，初始化echarts 饼图实例
    var rightChart = echarts.init(document.querySelector('.lt_content .right'));

    // 指定图表的配置项和数据
    var rightOption = {
        title: {
            text: '热门品牌销售',
            subtext: '2018年',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b}:{c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '阿迪', '匡威', '万斯', '新百伦']
        },
        series: [
            {
                name: '销售情况',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: '耐克' },
                    { value: 310, name: '阿迪' },
                    { value: 234, name: '匡威' },
                    { value: 135, name: '万斯' },
                    { value: 1548, name: '新百伦' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };


    // 使用刚指定的配置项和数据显示图表。
    rightChart.setOption(rightOption);
})

