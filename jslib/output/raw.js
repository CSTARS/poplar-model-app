var modelIO = require('../modelRunHandler');
var app;

var show = function(results) {
  var i, z;

  // selected in the charts output
  var vars = $("#chartTypeInput").val();

  // find the rows we care about
  var chartRows = {};
  for( i = 0; i < results[0].output[0].length; i++ ) {
      if( vars.indexOf(results[0].output[0][i]) > -1 ) chartRows[results[0].output[0][i]] = i;
  }

  var tabs = $('<ul class="nav nav-pills" id="rawOutputTabs"  data-tabs="pill"></ul>');
  var contents = $('<div class="tab-content" style="overflow:auto;margin-top:15px"></div>');

  for( i = 0; i < vars.length; i++) {
      tabs.append($('<li '+(i === 0 ? 'class="active"' : "")+'><a href="#rawout'
          +vars[i]+'" data-toggle="tab">'+vars[i]+'</a></li>'));

      contents.append($('<div class="tab-pane ' + (i === 0 ? 'active' : "")
          + '" id="rawout' + vars[i] + '"></div>'));
  }

  $("#output-content").html("").append(tabs).append(contents);
  $("#rawOutputTabs").tab();

  csvResults = {
      config : modelIO.exportSetup(),
      data : {}
  };

  var cDate = new Date($("#input-manage-datePlanted").val());

  var table, row;
  for( var key in chartRows ) {
      table = "<table class='table table-striped'>";

      csvResults.data[key] = [];

      for( var j = 0; j < results[0].output.length; j++ ){
          csvResults.data[key][j] = [];

          // set header row
          if( j === 0 ) {
              csvResults.data[key][j].push('month');
              csvResults.data[key][j].push('date');

              table += "<tr><th>Step</th><th>Date</th>";
              for( z = 0; z < results.length; z++ ) {
                  table += "<th>";
                  var tmp = [];

                  for( var mType in results[z].inputs ) {
                      tmp.push(mType+"="+results[z].inputs[mType]);
                      table += "<div>"+mType+"="+results[z].inputs[mType]+"</div>";
                  }

                  if( tmp.length === 0 ) {
                      csvResults.data[key][j].push(key);
                      table += key;
                  } else {
                      csvResults.data[key][j].push(tmp.join(" "));
                  }
                  table += "</th>";
              }

              table += "</tr>";
          } else {
              //var date = new Date(cDate.getYear()+1900, cDate.getMonth()+j, cDate.getDate());
              //var m = date.getMonth()+1;
              //if( m < 10 ) m = '0'+m;

              table += "<tr><td>"+j+"</td><td>"+results[0].output[j][0]+'</td>';

              csvResults.data[key][j].push(j);
              csvResults.data[key][j].push(results[0].output[j][0]);

              var v;
              for( z = 0; z < results.length; z++ ) {
                  v = results[z].output[j][chartRows[key]];
                  table += "<td>"+v+"</td>";
                  csvResults.data[key][j].push(v);
              }
              table += "</tr>";
          }

      }
      $("#rawout" + key).html(table+"</table>");
  }

  app.setCsvResults(csvResults);

  // make sure we can see the export btn
  if( !offlineMode ) $("#show-export-csv").show();
};

module.exports = {
  show : show,
  init : function(a) {
    app = a;
  }
};
