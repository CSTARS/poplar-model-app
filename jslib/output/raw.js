var modelIO = require('../modelRunHandler');
var config = require('../config');
var app;

var show = function(results) {
  var i, z;

  // selected in the charts output
  var vars = $("#chartTypeInput").val();

  // find the rows we care about
  var chartRows = {};
  for( i = 0; i < results[0].header.length; i++ ) {
      if( vars.indexOf(results[0].header[i]) > -1 ) chartRows[results[0].header[i]] = i;
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
      inputs : [],
      header : results[0].header,
      data : {}
  };
  for( var i = 0; i < results.length; i++ ) {
    csvResults.inputs.push(results[i].inputs);
  }

  var cDate = new Date($("#input-manage-datePlanted").val());

  var table, row;
  for( var key in chartRows ) {
      table = "<table class='table table-striped'>";

      csvResults.data[key] = [];


      // set header row
      var currentRow = [];
      currentRow.push('date');
      //currentRow.push('step');

      table += "<tr><th>Date</th><th>Step</th>";

      for( z = 0; z < results.length; z++ ) {
          table += "<th>";
          var tmp = [];

          for( var mType in results[z].inputs ) {
              tmp.push(mType+"="+results[z].inputs[mType]);
              table += "<div>"+mType+"="+results[z].inputs[mType]+"</div>";
          }

          if( tmp.length === 0 ) {
              currentRow.push(key);
              table += key;
          } else {
              currentRow.push(tmp.join(" "));
          }
          table += "</th>";
      }
      table += "</tr>";
      csvResults.data[key].push(currentRow);
      var c = 0;

      for( var date in results[0].output ) {
        c++;
        currentRow = [];

        table += "<tr><td>"+date+"</td><td>"+c+"</td>";

        currentRow.push(date);
        //currentRow.push(c);

        var v;
        for( z = 0; z < results.length; z++ ) {
          if( !results[z].output[date] ) {
            table += "<td></td>";
            currentRow.push(null);
          } else {
            v = results[z].output[date][chartRows[key]];
            table += "<td>"+v+"</td>";
            currentRow.push(v);
          }
        }
        table += "</tr>";

        csvResults.data[key].push(currentRow);
      }
      $("#rawout" + key).html(table+"</table>");
  }

  app.setCsvResults(csvResults);

  // make sure we can see the export btn
  if( !offlineMode ) $("#show-export-csv").show();

  return csvResults;
};

module.exports = {
  show : show,
  init : function(a) {
    app = a;
  }
};
