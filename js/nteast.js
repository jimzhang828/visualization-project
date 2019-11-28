// 数据来源
const data_source = 'https://docs.google.com/spreadsheets/d/1vSVsn7Hyf5mxbvLWVqXuGEo-QbxDC5Uz_fnFmyufAEc/gviz/tq?';

// 1. 加载时执行的动作，以及加载需要的图表package
google.charts.load('current', {'packages': ['corechart', 'timeline', 'bar']});
google.load('visualization', '1', {packages: ['corechart', 'timeline', 'bar'], callback: callback});
// google.setOnLoadCallback(drawVisualization);
function callback() {
    // 调用画图函数进行画图
    init();
    drawCareer();
    drawGoogleTrends();
    drawInvestigate();
}

// 测试
function init() {
    // var button = document.getElementById('but');
    // button.onclick = function() {
    //     let query_statement = data_source + 'sheet=trends&headers=1&tq=';
    //     query_statement += encodeURIComponent('SELECT A, F, G, H, I');
    //     new google.visualization.Query(query_statement).send(handleTrendsQueryResponse);
    // }
}

// 2. 画议员工作经历的图表
function drawCareer() {
    // 拼接获取数据的query
    // 选择career的sheet，header=1表示这个sheet的第一行是头部，=0表示没有头部
    let query_statement = data_source + 'sheet=career&headers=1&tq=';
    const select_statement = 'SELECT * WHERE A = "Chan Chi Chuen Raymond" OR A = "Cheung Chiu Hung" OR A = "Quat Elizabeth" OR A = "Yeung Alvin Ngok Kiu"';
    query_statement += encodeURIComponent(select_statement);
    // 创建一个Query对象并发送请求
    const query = new google.visualization.Query(query_statement);
    query.send(handleCareerQueryResponse); // query发送处理query的函数
}

// 3. 画议员的google trends
function drawGoogleTrends() {
    let query_statement = data_source + 'sheet=trends&headers=1&tq=';
    query_statement += encodeURIComponent('SELECT A, R, S, T, U');
    // 前面两句也可以写成: let query_statement = data_source + '/gviz/tq?sheet=trends&headers=1&range=A:E';
    new google.visualization.Query(query_statement).send(handleTrendsQueryResponse);
}

// 4. 画议员的支持率和认知度
function drawInvestigate() {
    let query_statement = data_source + 'sheet=investigation&headers=1&tq=';
    query_statement += encodeURIComponent('SELECT * WHERE A = "Chan Chi Chuen Raymond" OR A = "Cheung Chiu Hung" OR A = "Quat Elizabeth" OR A = "Yeung Alvin Ngok Kiu"');
    new google.visualization.Query(query_statement).send(handleInvestigateQueryResponse);
}

