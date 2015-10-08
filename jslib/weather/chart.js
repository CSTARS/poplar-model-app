var options = {
  title : 'Weather',
  height : 300,
  vAxes: [{
          title: "Radiation (MJ/day); Temperature (^C); Dew Point (^C); Daylight (h)",
          minValue : -5,
          maxValue : 35
        },{
          title: "Precipitation (mm)",
          minValue : -50,
          maxValue : 350
        }],
  hAxis: {title: "Month"},
  seriesType: "bars",
  series: {
      0: {type: "line", targetAxisIndex:0},
      1: {type: "line", targetAxisIndex:0},
      2: {type: "line", targetAxisIndex:0},
      3: {type: "area", targetAxisIndex:1},
      4: {targetAxisIndex:0}
  }
};

function create(root, data) {
  $(root).html('');

  var dt = new google.visualization.DataTable();
  dt.addColumn('string', 'Month');
  dt.addColumn('number', 'Min Temperature');
  dt.addColumn('number', 'Max Temperature');
  dt.addColumn('number', 'Dew Point');
  dt.addColumn('number', 'Precipitation');
  dt.addColumn('number', 'Radiation');
  dt.addColumn('number', 'Daylight');

  for( var date in data ) {
      var obj = data[date];
      dt.addRow([
          date+'',
          obj.tmin || 0,
          obj.tmax || 0,
          obj.tdmean || 0,
          obj.ppt || 0,
          obj.rad || 0,
          obj.daylight || 0
      ]);
  }

  var chart = new google.visualization.ComboChart(root);
  chart.draw(dt, options);

  return chart;
}

module.exports = {
  create : create
};
