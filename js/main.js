// 数据来源
const data_source = 'https://docs.google.com/spreadsheets/d/1vSVsn7Hyf5mxbvLWVqXuGEo-QbxDC5Uz_fnFmyufAEc/gviz/tq?';

// 1. 加载时执行的动作，以及加载需要的图表package
google.charts.load('current', {'packages': ['corechart', 'timeline', 'bar']});
google.load('visualization', '1', {packages: ['corechart', 'timeline', 'bar'], callback: callback});
// google.setOnLoadCallback(drawVisualization);
function callback() {
    // 调用画图函数进行画图
    init();
    drawAge();
    // drawAgeHistogram();
    drawGender();
    drawEducation();
    drawInvestigate();
}
function init() {
    document.getElementById('sort_age').onclick = sortAge;
    document.getElementById('sort_age_d').onclick = sortAgeD;
    document.getElementById('unsort_age').onclick = drawAge;
}
// 2. 画议员年龄
function drawAge() {
    let query_statement = data_source + 'sheet=age&headers=1&tq=';
    const select_statement = 'SELECT * ORDER BY A';
    query_statement += encodeURIComponent(select_statement);
    const query = new google.visualization.Query(query_statement);
    query.send(handleAgeQueryResponse);
}
function sortAge() {
    let query_statement = data_source + 'sheet=age&headers=1&tq=';
    const select_statement = 'SELECT * ORDER BY B';
    query_statement += encodeURIComponent(select_statement);
    const query = new google.visualization.Query(query_statement);
    query.send(handleAgeQueryResponse);
}
function sortAgeD() {
    let query_statement = data_source + 'sheet=age&headers=1&tq=';
    const select_statement = 'SELECT * ORDER BY B DESC';
    query_statement += encodeURIComponent(select_statement);
    const query = new google.visualization.Query(query_statement);
    query.send(handleAgeQueryResponse);
}
function handleAgeQueryResponse(response) {
    const data = response.getDataTable();
    data.setColumnProperties(2, {role: 'style'});
    const age_chart = new google.visualization.BarChart(document.getElementById('age'));
    const options = {
        legend: {position: 'none'},
        hAxis: { minValue: 0 },
        chartArea:{left:250,top:30,width:"70%",height:"90%"},
    };
    age_chart.draw(data, options);
}
// 年龄Histogram图
// function drawAgeHistogram() {
//     let query_statement = data_source + 'sheet=age&headers=1';
//     const query = new google.visualization.Query(query_statement);
//     query.send(handleAgeHistogramQueryResponse);
// }
// function handleAgeHistogramQueryResponse(response) {
//     const data = response.getDataTable();
//     data.setColumnProperties(2, {role: 'style'});
//     const chart = new google.visualization.Histogram(document.getElementById('age2'));
//     chart.draw(data);
// }
// 3. 画议员性别分布
function drawGender() {
    let query_statement = data_source + 'sheet=gender&headers=1';
    const query = new google.visualization.Query(query_statement);
    query.send(handleGenderQueryResponse);
}
function handleGenderQueryResponse(response) {
    const data = response.getDataTable();
    data.setColumnProperties(2, {role: 'tooltip'});
    const chart = new google.visualization.PieChart(document.getElementById('gender'));
    const options = {
        title: 'Gender distribution of the candidates',
        backgroundColor: '#F5F5F5',
        // legend: 'none',
        // pieSliceText: 'label',
        // pieStartAngle: 90,
        chartArea:{width:"90%",height:"90%"},
    };
    chart.draw(data, options);
}
// 4. 画议员学历
function drawEducation() {
    // 拼接获取数据的query
    // 选择education的sheet，header=1表示这个sheet的第一行是头部，=0表示没有头部
    let query_statement = data_source + 'sheet=education&headers=1';
    // 创建一个Query对象并发送请求
    const query = new google.visualization.Query(query_statement);
    query.send(handleEducationQueryResponse); // query发送处理query的函数
}
function handleEducationQueryResponse(response) {
    const data = response.getDataTable();
    data.setColumnProperties(2, {role: 'tooltip'});
    const chart = new google.visualization.PieChart(document.getElementById('education'));
    const options = {
        title: 'Educational Background of the candidates',
        backgroundColor: '#F5F5F5',
        // legend: 'none',
        // pieSliceText: 'label',
        // backgroundColor: '#9B59B6',
        pieStartAngle: 90,
        slices: {2: {offset: 0.15},},
        pieHole: 0.4,
        chartArea:{width:"90%",height:"90%"},
    };
    chart.draw(data, options);
}
// 5. 画议员的认知度和支持度
function drawInvestigate() {
    let query_statement = data_source + 'sheet=bubble&headers=1';
    const query = new google.visualization.Query(query_statement);
    query.send(handleInvestigateQueryResponse);
}
function handleInvestigateQueryResponse(response) {
    const data = response.getDataTable();
    const chart = new google.visualization.BubbleChart(document.getElementById('investigate'));
    const options = {
        colorAxis: {colors: ['yellow', 'red']},
        hAxis: {
            title: 'Support rate',
            titleTextStyle: {
                color: '#000'
            },
            format: 'percent',
            // ticks: [0.43],
        }, 
        vAxis: {
            title: 'Recognition rate',
            titleTextStyle: {
                color: '#000'
            },
            format: 'percent',
            minValue: 0.6, 
            maxValue: 1,
        }, 
		//The bubble font
		 bubble: {
			 textStyle: {
        		fontSize: 12,
        		color: 'black',
        		bold: true,
        		italic: true,
				auraColor: 'none',
      					}
    	},
		//series set up the color
		series: {'Pro-democracy camp': {color: '#F39C12'},
				 'Pro-establishment camp':{color:'blue'},
				 'Independent camp':{color:'grey'}
				 
		},
        // legend: {position: 'right'}
        chartArea:{left:100,top:80,width:"70%",height:"70%"},
        sizeAxis: {minValue: 30, maxValue: 60},
    };
    chart.draw(data, options);
}
