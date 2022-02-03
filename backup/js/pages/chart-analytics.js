$(document).ready(() => {
  getChartAnalytics();
});

function getChartAnalytics() {
  const get = $.get({
    url: `${getBaseUrlApi()}/api/analytics/chart`
  }).then((data) => {
    fillChartAnalytics(data);
  });
}

function fillChartAnalytics(data) {
  Morris.Area({
    element: 'extra-area-chart',
    data: data,
    lineColors: ['#4680ff'],
    xkey: 'date',
    ykeys: ['total'],
    labels: ['Quantidade'],
    pointSize: 0,
    lineWidth: 0,
    resize: true,
    xLabelFormat: function(d) {
      return ("0" + d.getDate()).slice(-2) + '/' + ("0" + (d.getMonth() + 1)).slice(-2) + '/' + d.getFullYear();
    },
    dateFormat: function(date) {
      d = new Date(date);
      return ("0" + d.getDate()).slice(-2) + '/' + ("0" + (d.getMonth() + 1)).slice(-2) + '/' + d.getFullYear();
    },
    fillOpacity: 0.8,
    behaveLikeLine: true,
    gridLineColor: '#e0e0e0',
    hideHover: 'auto'
  });

  let total = data.map(data => data.total).reduce((accumulator, current) => accumulator + parseInt(current), 0);
  total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  $("#chart-analytics-total").text(total);
}
