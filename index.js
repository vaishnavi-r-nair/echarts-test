// Load ECharts
const container = document.getElementById('container');
const chart = echarts.init(container);

// Called when Looker Studio sends new data
function drawViz(dataView) {
  const dim = dataView.fields.dimensions[0].name;
  const metric = dataView.fields.metrics[0].name;
  const data = dataView.rows.map(row => ({
    name: row[dim],
    value: row[metric]
  }));

  const option = {
    title: { text: 'ECharts Bar Chart', left: 'center' },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: data.map(d => d.name)
    },
    yAxis: { type: 'value' },
    series: [{
      type: 'bar',
      data: data.map(d => d.value),
      itemStyle: { color: '#4285F4' }
    }]
  };

  chart.setOption(option);
}

lookerStudio.visualizations.onData(drawViz);
