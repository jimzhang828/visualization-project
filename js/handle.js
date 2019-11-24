// 1. 画议员工作经历的图表
function handleCareerQueryResponse(response) {
    // 图的定义，数据，图的选项
    const chart = new google.visualization.Timeline(document.getElementById('career'));
    const data = response.getDataTable();
    const options = {
        width: "100%"
    };
    chart.draw(data, options); // 画图
}
// 2. 画议员的google trends
function handleTrendsQueryResponse(response) {
    const chart = new google.visualization.LineChart(document.getElementById('trends'));
    const data = response.getDataTable();
    const options = {
        title: 'Google Trends',
        curveType: 'function',
        legend: { position: 'bottom' },
        animation:{
            duration: 1000,
            easing: 'out',
            startup: true
        }
    };
    chart.draw(data, options);
}
// 3. 画议员的支持率和认知度
function handleInvestigateQueryResponse(response) {
    const chart = new google.charts.Bar(document.getElementById('investigate'));
    const data = response.getDataTable();
    const options = {
        bars: 'horizontal',
        series: {
            0: { axis: 'support' },
            1: { axis: 'recognition' }
        },
        axes: {
            x: {
                recognition: {label: 'Recognition rate'},
                support: {side: 'top', label: 'Support rate'}
            }
        }
    };
    chart.draw(data, google.charts.Bar.convertOptions(options));
}