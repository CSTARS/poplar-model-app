var config = require('../config');

// make sure all the weather is set.  #1 thing people will mess up
function check(model) {
  // first get current months we are going to run,
  var start = $("#input-manage-datePlanted").val();

  var end = $("#input-manage-dateFinalHarvest").val().split("-");
  var eMonth = parseInt(end[1]);
  var eYear = parseInt(end[0]);

  var cDate = new Date(start);

  // now see if we have custom weather coverage
  var hasCoverage = true;
  var count = 0;
  while( count < 10000 ) {
      if( !model.custom_weather ) {
          hasCoverage = false;
          break;
      }

      var m = (cDate.getMonth()+1)+'';
      var y = cDate.getFullYear();
      if( m.length == 1 ) m = '0'+m;

      if( cDate.getMonth()+1 == eMonth && y == eYear ) {
          break;
      } else if( !model.custom_weather[y+'-'+m] ) {
          hasCoverage = false;
          break;
      }

      cDate.setMonth(cDate.getMonth()+1);
      count++;
  }

  if( hasCoverage ) return true;

  // if not make sure we have averages selected
  for ( var i = 0; i < 12; i++) {
    var m = (i+1)+'';
    if( m.length == 1 ) m = '0'+m;

      for ( var j = 1; j < config.inputs.weather.length; j++) {
          var c = config.inputs.weather[j];
          var val = parseFloat($("#input-weather-" + c + "-" + m).val());
          if( !val && val !== 0 ) {
              alert("Missing weather data: "+c+" for month "+m+"\n\n"+
                    "Did you select a location (Setup) and/or are all weather/soil fields filled out?");
              $("#runbtn, #runbtn-sm").removeClass("disabled").html("<i class='icon-play'></i> Run");
              return false;
          }
      }
  }

  return true;
}

function set(model, data) {
  if( !model.custom_weather ) model.custom_weather = {};

  if( data ) {
      for( var key in data ) {

          // clean up date format
          var date = key.replace(/[^\d-]/,'');
          var parts = date.split('-');

          if( parts.length < 2 ) {
              return alert('Invalid Date Format.  Dates should be in YYYY-MM format');
          }
          if ( parts[1].length != 2 ) {
              date = parts[0]+"-0"+parts[1];
          }

          model.custom_weather[date] = data[key];
      }
  }

  // create array so we can sort
  var arr = [];
  var headers = ['date'];
  for( var date in model.custom_weather ) {

      var t = [date];
      for( var key in model.custom_weather[date] ) {
          if( key == 'nrel' ) continue;
          if( arr.length === 0 ) headers.push(key);
          t.push(model.custom_weather[date][key]);
      }

      arr.push(t);
  }

  if( arr.length === 0 ) {
      $('#custom-weather-panel').html("No weather data has been uploaded.");
      return;
  }

  var html = '<div style="overflow:auto;max-height:600px"><table class="table table-striped"><tr>';

  arr.sort(function(a, b){
      var d1 = new Date(a[0]+"-01").getTime();
      var d2 = new Date(b[0]+"-01").getTime();

      if( d1 < d2 ) {
          return 1;
      } else if( d1 > d2 ) {
          return -1;
      }

      return 0;
  });

  for( var i = 0; i < headers.length; i++ ) {
      html += '<th>'+headers[i]+'</th>';
  }
  html += '</tr>';

  for( var i = 0; i < arr.length; i++ ) {
      html += '<tr><td>'+arr[i].join('</td><td>')+'</td></tr>';
  }

  $('#custom-weather-panel').html(html+'</table></div><div id="custom-weather-chart"></div>');

  setTimeout(function(){
      weatherCustomChart = charts.createWeatherChart($('#custom-weather-chart')[0], model.custom_weather);
  }, 1000);
}

module.exports = {
  set : set,
  check : check
};
