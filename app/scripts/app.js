(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PoplarApp = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var gdrive = require('./gdrive');
var charts;
var inputForm;
var exporter = require('./export');
var offline = require('./offline');

// import model stuff
var model = require('poplar-3pg-model');
var modelIO = require('./modelIO');
model.setIO(modelIO);

var runCallback = null;
var _3pgModel = null;

var inputs = {
	weather : ["month","tmin","tmax","tdmean","ppt","rad","daylight"]
};
var outputs = ["VPD","fVPD","fT","fFrost","PAR","xPP","Intcptn","ASW","CumIrrig",
           "Irrig","StandAge","LAI","CanCond","Transp","fSW","fAge",
           "PhysMod","pR","pS","litterfall","NPP","WF","WR","WS","W"];
var debug = false;
var devmode = false;

var weatherCustomChart = null;

// row raw data does a lot of processing of the results and the current state of what's
// being displayed.  Go ahead an setup the csv data at this point, then if the user
// decides to export, we are all set to to;
var csvResults = null;

var getModel = function() {
  return model;
}

var getOutputs = function() {
  return outputs;
}

var outputDefinitions = require('./outputDefinitions');


function qs(key) {
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&");
  var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

var init = function(callback) {
	inputForm = require('./inputForm')(this);
	charts = require('./charts');
	charts.setApp(this);

	modelIO.app = this;
	modelIO.model = model;
	modelIO.charts = charts;
	modelIO.inputForm = inputForm;

  // check if flash is installed.  If not, hide the chart type toggle.
  require('./flashBlock-detector')(function(val){
      if( val > 0 ) $("#chart-type-btn-group").hide();
  });

  // setup export modal
  exporter.init();
  $("#export-csv").on('click', function(){
      exporter.exportCsv(csvResults);
  });

  var ele = $("#inputs-content");
  inputForm.create(ele);

  $("#runbtn, #runbtn-sm").on('click', function() {
      runModel();
  });

  // initialize the charts
  charts.init();

  // set default config
  $("#input-manage-DatePlanted").val(new Date().toISOString().replace(/T.*/,''));
  $("#input-manage-DateCoppiced").val(new Date(new Date().getTime()+(86400000*2*365)).toISOString().replace(/T.*/,''));
  $("#input-manage-DateFinalHarvest").val(new Date(new Date().getTime()+(86400000*10*365)).toISOString().replace(/T.*/,''));

  // setup nice scrolling
  $('.app-nav').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({
          scrollTop: $(this.hash).offset().top-55
       }, 700);
 });

  $(window).resize(function(){
      charts.resize();

      if( weatherCustomChart ) {
          weatherCustomChart = charts.createWeatherChart($('#custom-weather-chart')[0], model.custom_weather);
      }
  });

  callback();
}


var runComplete = function(rows) {
  if ( runCallback ) runCallback(rows);
  if( hideInitLoading ) hideInitLoading();
  runCallback = null;
}

var monthsToRun = function() {
  var d1 = $("#input-manage-DatePlanted").val();
  if (d1 && d1 != "") {
      d1 = new Date($("#input-manage-DatePlanted").val());
  } else {
      d1 = new Date();
  }

  var d2 = $("#input-manage-DateFinalHarvest").val();
  if (d2 && d2 != "") {
      d2 = new Date($("#input-manage-DateFinalHarvest").val());
  } else {
      d2 = new Date();
  }

  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() + 1;
  months += d2.getMonth();
  return months <= 0 ? 1 : months+1;
}


var runModel = function(isRt) {

  if ($("#runbtn, #runbtn-sm").hasClass("disabled")) return;
  $("#runbtn, #runbtn-sm").addClass("disabled").html("Running...");

  if( !checkWeather() ) return;

  // let UI process for a sec before we tank it
  // TODO: this should be preformed w/ a webworker
  setTimeout(function() {
      ga('send', 'event', 'ui', 'interaction', 'model-run', 1);

      // read everything so the variations are set
      model.variations = {};
      modelIO.readFromInputs();

      // make sure we are only setting 2 variation parameters
      var params = [];
      for( var key in model.variations ) params.push(key);
      if( params.length > 2 ) {
          alert("There is a limit of 2 variation parameters per run.  Currently you are varying "+
                "the following parameters:\n\n -"+params.join("\n -"));
          $("#runbtn, #runbtn-sm").removeClass("disabled").html("<i class='icon-play'></i> Run");
          return;
      }

      // let the world know what we are doing
      if( !isRt ) gdrive.runModelRt();

      // show what we are doing
      $("#variationAnalysisStatus").html("<b>"+(params.length == 0 ? "None" : params.join(", "))+"</b>");

      // we are only running once
      if ( params.length == 0 ) {
          ga('send', 'event', 'ui', 'interaction', 'model-run-singleParam', 1);

          runCallback = function(rows) {
              showResults(rows);
          }
          model.run(monthsToRun());

      } else {
          ga('send', 'event', 'ui', 'interaction', 'model-run-variation', 1);

          // set variation order
          var runs = [];
          for( var i = 0; i < model.variations[params[0]].length; i++ ) {
              var obj = {
                  inputs : {},
                  output : null
              }
              obj.inputs[params[0]] = model.variations[params[0]][i];
              if( params.length > 1 ) {
                  for( var j = 0; j < model.variations[params[1]].length; j++ ) {
                      var t = $.extend(true, {}, obj);
                      t.inputs[params[1]] = model.variations[params[1]][j];
                      runs.push(t);
                  }
              } else {
                  runs.push(obj);
              }
          }

          runVariation(0, runs);
      }
  }, 250);
}

var runVariation = function(index, runs) {
  // set input variables for run
  var run = runs[index];
  for( var key in run.inputs ) {
      $("#input-"+key.replace(/\./g, '-')).val(run.inputs[key]);
  }

  runCallback = function(data) {
      runs[index].output = data;
      index++;

      if (runs.length == index) {
          // reset the constant to the first value
          for( var key in model.variations ) {
              $("#input-"+key.replace(/\./g, '-')).val(model.variations[key].join(", "));
          }
          showResults(runs);
      } else {
          runVariation(index, runs);
      }
  }

  model.run(monthsToRun());
}


var showResults = function(result) {
  if( result[0] instanceof Array ) {
      result = [{
          singleRun : true,
          inputs : {},
          output : result
      }]
  }

  currentResults = result;

  showRawOutput(result);
  charts.updateCharts(result, true);

  setTimeout(function() {
      $("#runbtn, #runbtn-sm").removeClass("disabled").html("<i class='icon-play'></i> Run");
  }, 250);

}

// make sure all the weather is set.  #1 thing people will mess up
var checkWeather = function() {
  // first get current months we are going to run,
  var start = $("#input-manage-DatePlanted").val();

  var end = $("#input-manage-DateFinalHarvest").val().split("-");
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
      for ( var j = 1; j < inputs.weather.length; j++) {
          var c = inputs.weather[j];
          var val = parseFloat($("#input-weather-" + c + "-" + i).val());
          if( !val && val != 0 ) {
              alert("Missing weather data: "+c+" for month "+i+"\n\n"+
                    "Did you select a location (Setup) and/or are all weather/soil fields filled out?");
              $("#runbtn, #runbtn-sm").removeClass("disabled").html("<i class='icon-play'></i> Run");
              return false;
          }
      }
  }

  return true;
}

var setWeather = function(data) {
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
          if( arr.length == 0 ) headers.push(key);
          t.push(model.custom_weather[date][key]);
      }

      arr.push(t);
  }

  if( arr.length == 0 ) {
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

};

var showRawOutput = function(results) {

  // selected in the charts output
  var vars = $("#chartTypeInput").val();

  // find the rows we care about
  var chartRows = {};
  for( var i = 0; i < results[0].output[0].length; i++ ) {
      if( vars.indexOf(results[0].output[0][i]) > -1 ) chartRows[results[0].output[0][i]] = i;
  }

  var tabs = $('<ul class="nav nav-pills" id="rawOutputTabs"  data-tabs="pill"></ul>');
  var contents = $('<div class="pill-content" style="overflow:auto;margin-top:15px"></div>');

  for ( var i = 0; i < vars.length; i++) {
      tabs.append($('<li '+(i == 0 ? 'class="active"' : "")+'><a href="#rawout'
          +vars[i]+'" data-toggle="tab">'+vars[i]+'</a></li>'));

      contents.append($('<div class="pill-pane ' + (i == 0 ? 'active' : "")
          + '" id="rawout' + vars[i] + '"></div>'));
  }

  $("#output-content").html("").append(tabs).append(contents);
  $("#rawOutputTabs").tab();

  csvResults = {
      config : modelIO.exportSetup(),
      data : {}
  };

  // some rows have strings, we don't want these
  // ignore string rows
  for( var i = 0; i < results.length; i++ ) {
      var clean = [results[i].output[0]];
      for( var j = 1; j < results[i].output.length; j++ ) {
          if( typeof results[i].output[j][0] != 'string' ) clean.push(results[i].output[j]);
      }
      results[i].output = clean;
  }

  var cDate = new Date($("#input-manage-DatePlanted").val());

  var table, row;
  for( var key in chartRows ) {
      table = "<table class='table table-striped'>";

      csvResults.data[key] = [];

      for( var j = 0; j < results[0].output.length; j++ ){
          csvResults.data[key][j] = [];

          // set header row
          if( j == 0 ) {
              csvResults.data[key][j].push('month');
              csvResults.data[key][j].push('date');

              table += "<tr><th>Month</th><th>Date</th>";
              for( var z = 0; z < results.length; z++ ) {
                  table += "<th>";
                  var tmp = [];

                  for( var mType in results[z].inputs ) {
                      tmp.push(mType+"="+results[z].inputs[mType]);
                      table += "<div>"+mType+"="+results[z].inputs[mType]+"</div>";
                  }

                  if( tmp.length == 0 ) {
                      csvResults.data[key][j].push(key);
                      table += key;
                  } else {
                      csvResults.data[key][j].push(tmp.join(" "));
                  }
                  table += "</th>";
              }

              table += "</tr>";
          } else {
              var date = new Date(cDate.getYear()+1900, cDate.getMonth()+j, cDate.getDate());
              var m = date.getMonth()+1;
              if( m < 10 ) m = '0'+m;

              table += "<tr><td>"+j+"</td><td>"+date.getFullYear()+'-'+m+"</td>";

              csvResults.data[key][j].push(j);
              csvResults.data[key][j].push(date.getFullYear()+'-'+m);

              var v;
              for( var z = 0; z < results.length; z++ ) {
                  v = results[z].output[j][chartRows[key]];
                  table += "<td>"+v+"</td>";
                  csvResults.data[key][j].push(v);
              }
              table += "</tr>";
          }

      }
      $("#rawout" + key).html(table+"</table>");
  }

  // make sure we can see the export btn
  if( !offlineMode ) $("#show-export-csv").show();
};

module.exports = {
  init : init,
  outputs : outputs,
	inputs : inputs,
  getModel : getModel,
  runModel : runModel,
  showRawOutput : showRawOutput,
	monthsToRun : monthsToRun,
  outputDefinitions : outputDefinitions,
  qs : qs,
  setWeather : setWeather,
	gdrive : gdrive,
	runComplete : runComplete,
	getModelIO : function() {
		return modelIO;
	}
};

},{"./charts":2,"./export":3,"./flashBlock-detector":4,"./gdrive":5,"./inputForm":7,"./modelIO":8,"./offline":10,"./outputDefinitions":11,"poplar-3pg-model":13}],2:[function(require,module,exports){
var app;

// only draw charts if width has changed
var cWidth = 0;

// there is no way to get the colors for the legends (to make your own)
// this post:
// gives these values.  This is a HACK, if they ever change, we need to update
var googleChartColors = ["#3366cc","#dc3912","#ff9900","#109618","#990099","#0099c6",
                      "#dd4477","#66aa00","#b82e2e","#316395","#994499","#22aa99",
                      "#aaaa11","#6633cc","#e67300","#8b0707","#651067","#329262",
                      "#5574a6","#3b3eac","#b77322","#16d620","#b91383","#f4359e",
                      "#9c5935","#a9c413","#2a778d","#668d1c","#bea413","#0c5922"
                      ,"#743411"];

var weatherChartOptions = {
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
}

// template for the popup
var sliderPopup = $(
      "<div class='slide-popup'>" +
          "<i class='icon-remove-circle pull-right slide-popup-close'></i>"+
          "<div id='carousel' class='owl-carousel owl-theme' style='margin-top:15px'></div>" +
	"</div>");

var sliderPopupBg = $("<div class='slide-popup-bg'>&nbsp;</div>");

// only draw charts if someone has click a checkbox
var changes = false;

// when sizing, wait a ~300ms before triggering redraw
var resizeTimer = -1;

var chartTypeSelector, chartCheckboxes, cData;

function init() {

  $("#show-chartspopup-btn").on('click',function() {
      showPopup();
  });

  // setup chart selectors
  $("#chart-modal").modal({show:false});

  // set popup click handlers
  $("#chartType-selectAll").on('click',selectAll);
  $("#chartType-unselectAll").on('click',unselectAll);

  chartTypeSelector = $("#chartTypeInput");
  chartCheckboxes = $("#chartSelections");

  var c1 = $("#chartSelections-c1");
  var c2 = $("#chartSelections-c2");
  for( var i = 0; i < app.outputs.length; i++) {
      var val = app.outputs[i];
      chartTypeSelector.append($("<option value='" + val + "' "
              + (val == 'WR' || val == 'WS' || val == 'WF' ? 'selected' : '')
              + ">" + val + "</option>"));

      if( i % 2 == 0 ) {
          c1.append($('<div class="checkbox"><label><input type="checkbox"'
                  + (val == 'WR' || val == 'WS' || val == 'WF' ? 'checked="checked"' : '')
                  + ' value="'+val+'"> '+_createDescription(val)+'</div>'));
      } else {
          c2.append($('<div class="checkbox"><label><input type="checkbox"'
                  + (val == 'WR' || val == 'WS' || val == 'WF' ? 'checked="checked"' : '')
                  + ' value="'+val+'"> '+_createDescription(val)+'</div>'));
      }
  }

  chartCheckboxes.find(".fn-toggle").on('click',function(){
      $("#"+$(this).attr("datatarget")).toggle('slow');
  });

  chartCheckboxes.find("input[type=checkbox]").on('change', function(){
      if( $(this).is(":checked") ) select($(this).attr("value"));
      else unselect($(this).attr("value"));
  });

  $("#select-charts-btn, #select-charts-title-btn").on('click', function(){
      $("#chart-modal").modal('show');
      changes = false;
  });

  $(".chart-modal-close").on('click', function(){
      $("#chart-modal").modal('hide');
      if( changes && cData ) {
          setTimeout(function(){
              updateCharts();
              // update raw data as well
              app.showRawOutput(cData);
          },400);

      }
  });

  $(".chart-type-toggle").on('click', function(){
      if( !$(this).hasClass("active") ) {
          $(".chart-type-toggle.active").removeClass("active");
          $(this).toggleClass("active");
          updateCharts();
      }
  });
}

// make sure and end label tag
function _createDescription(val) {
  if( !app.outputDefinitions[val] ) return "<b>"+val+"</b></label>";

  var desc = app.outputDefinitions[val];
  var label = desc.label && desc.label.length > 0 ? " - "+desc.label : "";
  var units = desc.units && desc.units.length > 0 ? " ["+desc.units+"]" : "";

  var label = "<b>"+val+"</b><span style='font-size:12px'>"+label+units+"</span></label>";
  var hasDesc = desc.description && desc.description.length > 0;
  if( hasDesc ) {
      label += "<div style='font-size:11px;color:#888;font-style:italic'>"+desc.description;
  }

  var fName = desc.altFnName || val;
  var fn = app.getModel().getFunction(fName);

  if( fn || desc.fn ) {
      if( !hasDesc ) label += "<div style='font-size:11px'>";
      label += " <a style='font-style:normal;cursor:pointer' datatarget='fn-desc-"+val+"' class='fn-toggle'>fn()</a></div>";

      label += "<div id='fn-desc-"+val+"' style='display:none;font-size:11px;overflow:auto' class='well well-sm'>"+
                  (fn||desc.fn).toString().replace(/ /g,'&nbsp;').replace(/\n/g,'<br />')+"</div>";
  } else if ( hasDesc ) {
      label += "</div>";
  }

  // TODO: add fn well
  return label+"<br />";
}

function select(val) {
  chartTypeSelector.find("option[value="+val+"]").attr("selected","selected");
  chartCheckboxes.find("input[value="+val+"]").prop("checked",true);
  changes = true;
}

function unselect(val) {
  chartTypeSelector.find("option[value="+val+"]").removeAttr("selected");
  chartCheckboxes.find("input[value="+val+"]").prop("checked",false);
  changes = true;
}

function selectAll() {
  for( var i = 0; i < app.outputs.length; i++) select(app.outputs[i]);
}

function unselectAll() {
  for( var i = 0; i < app.outputs.length; i++) unselect(app.outputs[i]);
}

function remove(ele) {
  ele.parent().hide('slow', function(){
      ele.parent().remove();
      unselect(ele.attr('type'));
  });

}

function print(chartContainer) {
  ga('send', 'event', 'ui', 'interaction', 'print-chart', 1);


var disp_setting="toolbar=yes,location=no,directories=yes,menubar=yes,";
  disp_setting+="scrollbars=yes,width=800, height=600, left=25, top=25";

  var svg = chartContainer.find("svg");
  var html = chartContainer.find("div").html();

  var docprint=window.open("","",disp_setting);
  docprint.document.open();
  docprint.document.write('<html><head><title></title>');
  docprint.document.write('</head><body marginwidth="0" marginheight="0" onLoad="self.print()"><center>');
  docprint.document.write(html);
  docprint.document.write('</center></body></html>');
  docprint.document.close();
  docprint.focus();

}


function setData(data) {
  cData = data;
}

// basically redraw everything
function resize() {
  // require more than a 30 pixel width change (so we don't redraw w/ scroll bars added)
  var winWidth = $(window).width();
  if( cWidth > winWidth - 15 && cWidth < winWidth + 15 ) return;
  cWidth = winWidth;

  if( resizeTimer != -1 ) clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
      resizeTimer = -1;
      updateCharts();
  },300);
}

function updateCharts(results, animate) {
  if( results ) setData(results);
  if( !cData ) return;

  $("#show-chartspopup-btn").show();

  // create a legend if there is more than one run
  var legend = "";
  if( !cData[0].singleRun ) {
      var c1 = "";
      var c2 = "";
      for( var i = 0; i < cData.length; i++ ) {
          var ele = "<div style='min-height:40px;margin-bottom:10px'><div class='legend-square' style='background-color:"+googleChartColors[i]+"'>&nbsp;</div>";
          for( var mType in cData[i].inputs ) {
              ele += "<div class='legend-text'>"+mType+"="+cData[i].inputs[mType]+"</div>";
          }

          if( i % 2 == 0 ) c1 += ele + "</div>"
          else c2 += ele + "</div>"
      }
      legend = "<div><a id='legend-panel-toggle' style='margin-left:5px;cursor:pointer'>Legend</a></div>"+
               "<div style='border-bottom:1px solid #eee;padding-bottom:5px;margin-bottom:15px'>"+
               "<div class='row' id='legend-panel'><div class='col-sm-6'>"+c1+"</div>"+
               "<div class='col-sm-6'>"+c2+"</div>"+
               "</div></div>";
  }
  $("#chart-content").html(legend);
  $("#legend-panel-toggle").on('click', function(){
      $("#legend-panel").toggle("slow");
  });


  var types = chartTypeSelector.val();
  for ( var i = 0; i < types.length; i++) {
      _showMainChart(types[i], animate);
  }
}

function showPopup() {
  ga('send', 'event', 'ui', 'interaction', 'show-chart-popup', 1);


  sliderPopup.find(".owl-theme").html("");
  $('body').scrollTop(0).css('overflow','hidden').append(sliderPopupBg).append(sliderPopup);

  // this could case badness....  why doesn't it live when removed from DOM?
  sliderPopup.find('.slide-popup-close').on('click',function(){
      hidePopup();
  });

  var types = chartTypeSelector.val();
  for ( var i = 0; i < types.length; i++) {
      _showPopupChart(types[i]);
  }

  $('#carousel').owlCarousel({
      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true
  });
}

function hidePopup() {
  sliderPopupBg.remove();
  sliderPopup.remove();
  $('body').css('overflow','auto');
}

function _showMainChart(type, animate) {
  var chartType = $(".chart-type-toggle.active").attr("value");
  var panel = $("<div />");
  var outerPanel = $("<div>"+
  	"<a class='btn btn-xs btn-default' style='"+(chartType != "timeline" ? "position:absolute;z-index:10;margin:0 0 -20px 20px" : "margin-bottom:5px")+
      "' type='"+type+"'>" +
  	"<i class='icon-remove'></i> "+type+"</a></div>");
  outerPanel.find("a").on('click', function(){
          remove($(this));
  });
  if( chartType == "timeline" ) outerPanel.css("margin-bottom","20px");
  $("#chart-content").append(outerPanel.append(panel));
  _createChart(type, chartType, panel, false, null, animate);
}

function _showPopupChart(type) {
  var panel = $("<div class='item'></div>");

  var printBtn = $("<a class='btn btn-sm btn-default' style='margin-left:16px'><i class='icon-print'></i> Print</a>").on('click',function(){
     print(chartPanel);
  });
  panel.append(printBtn);

  var chartPanel = $("<div></div>");
  panel.append(chartPanel);

  sliderPopup.find(".owl-theme").append(panel);
  _createChart(type, 'line', chartPanel, true, [Math.round($(window).width()*.88), Math.round(($(window).height()*.90)-125)]);
}

function _createChart(type, chartType, panel, showLegend, size, animate) {
  var col = 0;

  var dt = new google.visualization.DataTable();

  if( chartType == 'timeline' ) {
      dt.addColumn('date', 'Month');
  } else {
      //dt.addColumn('number', 'Month');
      dt.addColumn('string', 'Month');
  }

  // set the first column
  if( !cData[0].singleRun ) {
      for( var i = 0; i < cData.length; i++ ) {
          var label = "";
          for( var key in cData[i].inputs ) {
              label += key.replace(/.*\./,'')+"="+cData[i].inputs[key]+" \n";
          }
          label = label.replace(/,\s$/,'');
          dt.addColumn('number', label);
      }
  } else {
      dt.addColumn('number', type);
  }

  // find the column we want to chart
  for ( var i = 0; i < cData[0].output[0].length; i++) {
      if (cData[0].output[0][i] == type) {
          col = i;
          break;
      }
  }

  var cDate = new Date($("#input-manage-DatePlanted").val());

  var data = [];
  var max = 0;
  // create the [][] array for the google chart
  for ( var i = 1; i < cData[0].output.length; i++) {
      if (typeof cData[0].output[i][col] === 'string') continue;

      var row = [];
      var date = new Date(cDate.getYear()+1900, cDate.getMonth()+i, cDate.getDate());
      if( chartType == "timeline" ) {
          // add on month
          row.push(date);
      } else {
          var m = date.getMonth()+1;
          if( m < 10 ) m = '0'+m;
          row.push(i+': '+date.getFullYear()+'-'+m);
      }

      for ( var j = 0; j < cData.length; j++) {
          if( cData[j].output[i][col] > max ) max = cData[j].output[i][col];
          row.push(cData[j].output[i][col]);
      }
      data.push(row);
  }

  dt.addRows(data);

  if( app.outputDefinitions[type] ) {
      var desc = app.outputDefinitions[type];
      var label = desc.label && desc.label.length > 0 ? " - "+desc.label : "";
      var units = desc.units && desc.units.length > 0 ? " ["+desc.units+"]" : "";
      type = type+label+units;
  }


  var options = {
          vAxis : {
              title : type
          },
          hAxis : {
              title : "Month"
          }
  }
  if( !showLegend ) options.legend = {position:"none"};

  if( size ) {
      options.width = size[0];
      options.height = size[1];
  } else {
      options.width = panel.width();
      options.height = options.width*.4;
  }
  panel.width(options.width).height(options.height);

  if( chartType == 'timeline' ) {
      options.displayAnnotations = true;
      var chart = new google.visualization.AnnotatedTimeLine(panel[0]);
      chart.draw(dt, options);
  } else {
      var chart = new google.visualization.LineChart(panel[0]);
      chart.draw(dt, options);
  }
}

function createWeatherChart(root, data) {
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
  chart.draw(dt, weatherChartOptions);

  return chart;
}


module.exports = {
  setApp : function(a) {
    app = a;
  },
    init : init,
    setData : setData,
    select : select,
    unselect : unselect,
    selectAll : selectAll,
    unselectAll : unselectAll,
    updateCharts : updateCharts,
    remove : remove,
    showPopup: showPopup,
    hidePopup: hidePopup,
    resize : resize,
    createWeatherChart : createWeatherChart
}

},{}],3:[function(require,module,exports){
var gdrive = require('./gdrive');

function init() {
  $("#export-modal").modal({
          show : false
      });

      $("#show-export-csv").on('click', function(){
        _setMessage(null);

        $("#export-name").val("3PG Model Results ("+new Date().toISOString().replace(/T/,' ').replace(/\.\d*Z/,'')+")");
          $("#export-modal").modal('show');
      });
}

function _setMessage(msg, type, progress) {
  if( !msg ) {
    return $("#export-msg").hide();
  }
  $("#export-msg").show();

  if( progress ) {
    $("#export-msg-progress").show();
  } else {
    $("#export-msg-progress").hide();
  }

  $('#export-msg').attr("class",'alert alert-'+type);
  $('#export-msg-text').html(msg);
}

function _updateProgress(index, total) {
  percent = 100 * ( index / total );
  $("#export-msg-progress-bar").attr("aria-valuenow", percent).css("width",percent+"%");
}

// see if an error exists, if so, set state
function _checkError(file) {
  var errorMessage = null;
  if( !file ) errorMessage = "Error creating file on Google Drive :(";
  if( file.error ) errorMessage = file.message;

  if( errorMessage ) {
    _setMessage(errorMessage, "danger");
    $("#export-csv").removeClass("disabled").html("Export");
    return true;
  }
  return false;
}

  // export as csv
function exportCsv(results) {
  ga('send', 'event', 'ui', 'interaction', 'export-drive-csv', 1);

  $("#export-csv").addClass("disabled").html("Exporting...");

  var name = $("#export-name").val();
  if( name.length == 0 ) {
    _setMessage("Please provide a folder name", "danger")
    $("#export-csv").removeClass("disabled").html("Export");
    return;
  }

  var data = results.data;

  // create a list so we can recursively iterate
  var keys = [];
  for( var key in data ) keys.push(key);

  // create folder
  _setMessage("Creating export folder...", "info", true);
  _updateProgress(1, keys.length+2);
  gdrive.saveFile(name,"AHB 3PG Model Results","application/vnd.google-apps.folder","",function(file){
    if( _checkError(file) ) return;
    var parent = file.id;
    _updateProgress(2, keys.length+2);

    // create a nice file describing the current export
    _setMessage("Creating config file...", "info", true);
    delete results.config.plantation_state;
    var config = JSON.stringify(results.config,null,"  ");
    gdrive.saveFile("config.txt","AHB 3PG Model - Run Configuration","text/plain",config,function(file){
      if( _checkError(file) ) return;
      _updateProgress(3, keys.length+2);

      _createExport(0, keys, data, parent);
    },{parent: parent})
  });
}

function _createExport(index, keys, data, parent) {

  // we are all done :)
  if( index == keys.length ) {
    _updateProgress(1, 1);
    _setMessage("Export Successful.<br /><a href='https://drive.google.com/#folders/" + parent +
          "' target='_blank'><i class='icon-external-link-sign'></i> Open in Google Drive</a>", "success");
    $("#export-csv").removeClass("disabled").html("Export");
  } else {

    var key = keys[index];
    var csv = "";

    // TODO: add month and date

    for( var i = 0; i < data[key].length; i++ ) {
      if( data[key][i].length == 0 ) continue; // ignore the blank rows

      for( var j = 0; j < data[key][i].length; j++ ) csv += data[key][i][j]+",";
      csv = csv.replace(/,$/,'')+"\n";
    }

    _setMessage("Creating "+keys[index]+".csv... ", "info", true);
    gdrive.saveFile(keys[index]+".csv","","text/csv",csv,function(file){
      if( _checkError(file) ) return;

      _updateProgress(index+4, keys.length+2);

      index++;
      _createExport(index, keys, data, parent);
    },{convert: true, parent: parent});
  }
};

module.exports = {
  exportCsv : exportCsv,
  init      : init
};

},{"./gdrive":5}],4:[function(require,module,exports){
// https://github.com/browserstack/flashblock-detector

module.exports = function(callbackMethod){
    var return_value = 0;

    if(navigator.plugins["Shockwave Flash"]) {
          embed_length = $('embed').length;
          object_length = $('object').length;

          if((embed_length > 0) || (object_length > 0)) {
              /* Mac / Chrome using FlashBlock + Mac / Safari using AdBlock */
              $('object, embed').each(function() {
                    if($(this).css('display') === 'none'){
                        return_value = 2;
                    }
              });
          } else {
              /* Mac / Firefox using FlashBlock */
              if( $('div[bginactive]').length > 0 ){
                    return_value = 2;
              }
          }
    } else if(navigator.userAgent.indexOf('MSIE') > -1) {
          try {
              new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
          } catch(e) {
              return_value = 2;
          }
    } else {
          /* If flash is not installed */
          return_value = 1;
    }

    if(callbackMethod && typeof(callbackMethod) === "function") {
          callbackMethod(return_value);
    } else {
          return return_value;
    }
};

},{}],5:[function(require,module,exports){
var Oauth = require('./oauth');
var gdriveRT = require('./gdriveRT');
var app;


var MIME_TYPE = "application/vnd.ahb-3pg.run";
var TREE_MIME_TYPE = "application/vnd.ahb-3pg.tree";
var DRIVE_API_VERSION = "v2";

// google oauth access token
var token = "";

// currently loaded gdrive file id
var loadedFile = null;
// list of currently loaded files (metadata)
var fileList = [];
// google drive share client
var client = null;

// loaded tree and management
var loadedTree = null;
// list of currently loaded tree files (metadata)
var treeList = [];

// current MIME TYPE we are saving
var saveMimeType = "";

/***
 *  Initialize google drive panels, btns and login
 ***/
function init(application, callback) {
  app = application;
  gdriveRT.setApp(app);

  // init bootstrap modal
  $("#save-modal").modal({
    show : false
  });

  // init bootstrap modal
  $("#load-modal").modal({
    show : false
  });

  // the about modal link is created below, so why not...
  $("#about-modal").modal({
    show : false
  });

  // the about modal link is created below, so why not...
  $("#help-modal").modal({
    show : false
  });

  // set the 'update' btn click handler
  $("#save-update-btn").on('click', function() {
    _updateCurrentFile();
  });

  // set the 'new' btn click handler
  $("#save-new-btn").on('click', function() {
    _saveNewFile();
  });

  // create the top right menu
  _createLoginBtn();

  // load the google auth and drive api's
  _loadApi(function() {
    // if the user is authorized grab the refresh token
    Oauth.isAuthorized(function(refreshToken){
      // if there is no refresh token, leave, we are initialized
      if( !refreshToken ) return callback();

      // if we have a refesh token, then user is all set,
      // get a new access token so we can start using the api's
      // grab their information and display
      Oauth.getAccessToken(function(t){
        token = t;
        if( token ) _setUserInfo();
        callback();
      });
    });

    // check if access token has expired
    setInterval(function() {
      _checkToken();
    }, 1000 * 5 * 60);
  });

  // setup the tree 'share' btn
  $("#share-tree-btn").on('click', function(){
    // see if we have a share client
    if( client == null ) {
      // no client, load api
      gapi.load('drive-share', function(){
        // on load, show the share popup with the current tree
         client = new gapi.drive.share.ShareClient(Oauth.APP_ID);
          client.setItemIds([loadedTree]);
         client.showSettingsDialog();
       });
    } else {
      // we have a client, show the share popup with current tree
      client.setItemIds([loadedFile]);
       client.showSettingsDialog();
    }
  });

}

/***
 * Save the current model as a new google drive file
 ***/
function _saveNewFile() {
  ga('send', 'event', 'ui', 'interaction', 'save-drive-file', 1);

  // grab the name of the new file
  var name = $("#save-name-input").val();
  if( name.length == 0 ) { // we always want a name, alert and quit
    _setSaveMessage('Please provide a filename.','info');
    return;
  }

  // see what kind of file we are creating based on the saveMimeType var
  if( saveMimeType == MIME_TYPE ) {
    data = app.getModelIO().exportSetup();
  } else if ( saveMimeType == TREE_MIME_TYPE ) {
    data = app.getModelIO().exportSetup().tree;
  } else { // badness
    alert("Unknown MIME_TYPE: "+saveMimeType);
    return;
  }

  // set the user know what we are doing
  _setSaveMessage('<i class="icon-spinner icon-spin"></i> Saving File...','info');

  // save the file
  saveFile(name,
      $("#save-description-input").val(),
      saveMimeType,
      data,
      function(resp) {
        // let the user know what happened
        if( resp.error ) return _setSaveMessage('Failed to save to Google Drive :(','danger');
        else _setSaveMessage('Sucessfully saved.','success');

        // wait a tick to hide the popup, so user sees success message
        setTimeout(function(){
          $("#save-modal").modal('hide');
        },1500);

        // show the share btn
        if( saveMimeType == MIME_TYPE ) {
          // we have a new file, update our list
          _updateFileList();

          // show the share btns
          $("#share-btn").parent().show();
          $("#open-in-drive").attr("href","https://docs.google.com/file/d/"+resp.id).parent().show();

          // set the loaded file id
          loadedFile = resp.id;
        } else if ( saveMimeType == TREE_MIME_TYPE ) {
          // we have a new tree, update the list
          _updateTreeList();

          // show the tree share btns
          $("#share-tree-btn").show();
          $("#loaded-tree-name").html(name).parent().show();

          // set the loaded trees
          loadedTree = resp.id;
        }
      }
  );
}

/***
 * Update the currently loaded google drive file
 ***/
function _updateCurrentFile() {
  ga('send', 'event', 'ui', 'interaction', 'update-drive-file', 1);

  // let the user know what we are doing
  _setSaveMessage('<i class="icon-spinner icon-spin"></i> Updating...','info');

  var file = {};
  var data = {};

  // grab the corrent data and fileid based on mimeType
  if( saveMimeType == MIME_TYPE ) {
    file = loadedFile;
    data = app.getModelIO().exportSetup();
  } else if ( saveMimeType == TREE_MIME_TYPE ) {
    file = loadedTree;
    data = app.getModelIO().exportSetup().tree;
  } else { // badness
    alert("Unknown MIME_TYPE: "+saveMimeType);
    return;
  }

  // update the google drive file
  updateFile(file,
      data,
      function(resp){
        // let the user know what happened
        if( resp.error ) return _setSaveMessage('Failed to update on Google Drive :(','danger');
        else _setSaveMessage('Update Successful.','success');

        // wait a tick so the user knows update was success
        setTimeout(function(){
          $("#save-modal").modal('hide');
        },1500);

        // update the list for whatever type was updated
        if( saveMimeType == MIME_TYPE ) {
          _updateFileList();
        } else if ( saveMimeType == TREE_MIME_TYPE ) {
          _updateTreeList();
        }
      }
  );
}

/***
 * set a message for the 'load from drive' popup.
 *  type - boostrap alert type
 ***/
function _setLoadMessage(msg, type) {
  if( !msg ) return $("#gdrive-file-msg").html("");
  $('#gdrive-file-msg').html('<div class="alert alert-'+type+'">'+msg+'</div>');
}

/***
 * set a message for the 'save to drive' popup
 * type - boostrap alert type
 ***/
function _setSaveMessage(msg, type) {
  if( !msg ) return $("#gdrive-save-msg").html("");
  $('#gdrive-save-msg').html('<div class="alert alert-'+type+'">'+msg+'</div>');
}

/***
 * create the top right menu. This menu is for when the user is not logged in
 ***/
function _createLoginBtn() {
  var btn = $('<li class="dropdown">'
      + '<a class="dropdown-toggle" style="cursor:pointer">Login<b class="caret"></b></a>'
      + '<ul class="dropdown-menu">'
      + '<li><a id="help"><i class="icon-question-sign"></i> Help</a></li>'
      + '<li><a id="about"><i class="icon-info-sign"></i> About</a></li>'
      + '<li><a id="login-with-google"><i class="icon-signin"></i> Login with Google</a></li>'
      + '</ul></li>');

  // set click handlers for popup
  btn.find('a.dropdown-toggle').on('click', function(){
    $(this).parent().toggleClass('open');
  });

  // about click handler
  btn.find('#about').on('click', function() {
    btn.toggleClass('open');
    $("#about-modal").modal('show');
  });

  btn.find('#help').on('click', function() {
    btn.toggleClass('open');
    showHelp();
  });

  // login click handler
  btn.find('#login-with-google').on('click',function() {
    ga('send', 'event', 'ui', 'interaction', 'user-login', 1);
    btn.toggleClass('open');
    signIn(function(token) {
      _setUserInfo();
    });
  });

  // add menu
  $("#login-header").html("").append(btn);
};

/***
 * Create the top right menu for when the user is logged in
 ***/
function _createLogoutBtn(userdata) {
  // set btn html
  var btn = $('<li class="dropdown">'
      + '<a class="dropdown-toggle" style="cursor:pointer"><img class="img-rounded" src="'+userdata.picture
      + '" style="margin:-5px 5px -5px 0;width:28px;height:28px;border:1px solid white" /> ' + userdata.name
      + '<b class="caret"></b></a>' + '<ul class="dropdown-menu">'
      + '<li><a id="save"><i class="icon-cloud-upload"></i> Save Model</a></li>'
      + '<li style="display:none"><a id="share-btn"><i class="icon-share"></i> Share Model</a></li>'
      + '<li style="display:none"><a id="open-in-drive" target="_blank"><i class="icon-external-link-sign"></i> Open in Google Drive</a></li>'
      + '<li><a id="load"><i class="icon-cloud-download"></i> Load Model</a></li>'
      + '<li><a id="help"><i class="icon-question-sign"></i> Help</a></li>'
      + '<li><a id="about"><i class="icon-info-sign"></i> About</a></li>'
      + '<li><a id="logout"><i class="icon-signout"></i> Logout</a></li>'
      + '</ul></li>');

  // add click handler to show menu
  btn.find('a.dropdown-toggle').on('click', function(){
    $(this).parent().toggleClass('open');
  });

  // show the save popup
  btn.find('#save').on('click', function() {
    // set the current save mimeType
    saveMimeType = MIME_TYPE;

    // let the user know what typ they are saving
    $("#gdrive-save-subheader").html("<h5>Save Model</h5>");

    btn.toggleClass('open');

    // if the file is loaded, show the update panel
    if( loadedFile != null) {
      // grab the current files metadata
      var file = {};
      for( var i = 0; i < fileList.length; i++ ) {
        if( fileList[i].id == loadedFile) {
          file = fileList[i];
          break;
        }
      }

      // show the update panel
      $("#save-update-panel").show();

      // render the files metadata in the update panel
      var d = new Date(file.modifiedDate);
      $("#save-update-panel-inner").html("<b>"+file.title+"</b><br />" +
          "<span style='color:#888'>"+file.description+"</span><br />"+
          "<span style='font-style:italic;font-size:11px;'>Last Modified: " +
          d.toDateString()+" "+d.toLocaleTimeString()+" by "+file.lastModifyingUserName+"</span><br />"+
          "<a href='https://drive.google.com/file/d/"+file.id+"'' target='_blank'><i class='icon-link'></i> " +
          "Link to Share</a> <span style='color:#888'>(must have permission)</span><br /><br />");
    } else {
      $("#save-update-panel").hide();
    }

    // clear any message
    _setSaveMessage(null);

    // show the save popup
    $("#save-modal").modal('show');
  });

  // click handler for share btn
  btn.find("#share-btn").on('click', function(){
    ga('send', 'event', 'ui', 'interaction', 'open-drive-share', 1);

    // has the share client been loaded
    if( client == null ) {
      // load the share popup
      gapi.load('drive-share', function(){
        // create and show the share popup
         client = new gapi.drive.share.ShareClient(Oauth.APP_ID);
          client.setItemIds([loadedFile]);
         client.showSettingsDialog();
       });
    } else {
      // show the share popup
      client.setItemIds([loadedFile]);
       client.showSettingsDialog();
    }
  });

  // show about panel
  btn.find('#about').on('click', function() {
    btn.toggleClass('open');
    $("#about-modal").modal('show');
  });

  btn.find('#help').on('click', function() {
    btn.toggleClass('open');
    showHelp();
  });

  // show the 'load from drive' panel
  btn.find('#load').on('click', function() {
    btn.toggleClass('open');

    // hide any existing message
    _setLoadMessage(null);

    // render the model files in the popup files
    _showDriveFiles();

    // show the modal
    $("#load-modal").modal('show');
  });

  // load the user out
  btn.find('#logout').on('click', function() {
    ga('send', 'event', 'ui', 'interaction', 'user-logout', 1);

    btn.toggleClass('open');

    // kill the access token
    token = null;

    // update the menu panel
    _createLoginBtn();
  });

  // attach the menu
  $("#login-header").html("").append(btn);
};

/***
 *  Request the user's information.  When loaded, update the top right menu
 ***/
function _setUserInfo() {
  // load user name
  $.ajax({
    url : "https://www.googleapis.com/oauth2/v1/userinfo",
    beforeSend : function(request) {
      // always set your access stoken
      request.setRequestHeader("Authorization",'Bearer '+ token.access_token);
    },
    success : function(data, status,xhr) {
      // parse your json response
      try {
        data = JSON.parse(data);
      } catch (e) {}

      // update top right menu
      _createLogoutBtn(data);

      // set to window scope
      window.userinfo = data;
    },
    error : function() {
      // TODO: should we alert this?
    }
  });

  // load user files, trees
  _updateFileList();
  _updateTreeList();
}

/***
 *  Search for the users models
 *
 * TODO: add search to the following functions,
 *  limit to 10 results
 ***/
function _updateFileList() {
  listFiles("mimeType = '"+MIME_TYPE+"'", function(resp){
    fileList = resp.result.items;
  });
}

/***
 *  Search for the users trees
 *
 * TODO: add search to the following functions,
 *  limit to 10 results
 ***/
function _updateTreeList() {
  listFiles("mimeType = '"+TREE_MIME_TYPE+"'", function(resp){
    treeList = resp.result.items;
  });
}

/***
 *  Render the users current models onto the 'load from drive' popup
 ***/
function _showDriveFiles() {
  // if they have no files, say so and get out of here
  if( !fileList ) return $("#gdrive-file-list").html("<li>No Files</li>");
  if( fileList.length == 0 ) return $("#gdrive-file-list").html("<li>No Files</li>");

  // show a title, there are multiple types that can be loaded from drive
  $("#gdrive-file-list").html("<h4>Select File</h4>");

  // create the list elements for each files metadata
  for( var i = 0; i < fileList.length; i++ ) {
    var item = fileList[i];
    var d = new Date(item.modifiedDate);
    $("#gdrive-file-list").append(
      $("<li class='list-group-item'><a id='"+item.id+"' url='"+item.downloadUrl+"' style='cursor:pointer'><i class='icon-file'></i> "+item.title+"</a>" +
        "<div style='color:#888;padding: 5px 0 0 10px'>"+item.description+"</div>"+
        "<div style='font-style:italic;font-size:11px;padding-left:10px'>Last Modified: "+d.toDateString()+" "+d.toLocaleTimeString()+" by "+item.lastModifyingUserName+"<div></li>"
        )
    );
  }

  // add click handler for each file
  $("#gdrive-file-list a").on('click', function(){
    ga('send', 'event', 'ui', 'interaction', 'load-drive-model', 1);

    var id = $(this).attr("id");

    // let the user know what we are doing
    _setLoadMessage('<i class="icon-spinner icon-spin"></i> Loading File...','info');

    // grab the five from drive
    getFile(id, $(this).attr("url"), function(file) {
      // if badness, let the user know
      if( !file  ) return _setLoadMessage('Failed to load file from Google Drive :(','danger');
      if( file.error  ) return _setLoadMessage('Failed to load file from Google Drive :(','danger');

      // hide any loaded trees,
      $("#share-tree-btn").hide();
      $("#loaded-tree-name").html("").parent().hide();
      loadedTree = null;

      // let the user know we are all good
      _setLoadMessage('File Loaded.','success');

      // set the loaded file id
      loadedFile = id;

      // set the loaded file name
      for( var i = 0; i < fileList.length; i++ ) {
        if( id == fileList[i].id ) {
          $("#loaded-model-title").html("<span style='color:#333'>Loaded Model </span> "+fileList[i].title);
        }
      }

      // show the share btn
      $("#share-btn").parent().show();
      $("#open-in-drive").attr("href","https://docs.google.com/file/d/"+id).parent().show();

      // setup model
      app.getModelIO().loadSetup(id, file);

      // setup realtime events
      gdriveRT.initRtApi(loadedFile);

      // wait a tick so user can see success message
      setTimeout(function(){
        // hide the modal
        $("#load-modal").modal('hide');
      },1500);

    });
  });
}

/***
 *  Render the users current trees onto the 'load from drive' popup
 ***/
function _showTreeFiles() {
  // update the list header, let user know what they are selecting
  $("#gdrive-file-list").html("");
  $("#gdrive-file-list").append($("<li class='list-group-item'><h5>Select Tree</h5></li>"));

  // if there are no trees, say so and get out of here
  if( !treeList ) return $("#gdrive-file-list").append($("<li class='list-group-item'>No Trees Available</li>"));
  if( treeList.length == 0 ) return $("#gdrive-file-list").append($("<li class='list-group-item'>No Trees Available</li>"));

  // create the tree list elements
  for( var i = 0; i < treeList.length; i++ ) {
    var item = treeList[i];
    var d = new Date(item.modifiedDate);
    $("#gdrive-file-list").append(
      $("<li class='list-group-item'><a id='"+item.id+"' name='"+item.title+"' url='"+item.downloadUrl+"' style='cursor:pointer'><i class='icon-leaf'></i> "+item.title+"</a>" +
        "<div style='color:#888;padding: 5px 0 0 10px'>"+item.description+"</div>"+
        "<div style='font-style:italic;font-size:11px;padding-left:10px'>Last Modified: "+d.toDateString()+" "+d.toLocaleTimeString()+" by "+item.lastModifyingUserName+"<div></li>"
        )
    );
  }

  // add click handler for titles
  $("#gdrive-file-list a").on('click', function(){
    ga('send', 'event', 'ui', 'interaction', 'load-drive-tree', 1);

    var id = $(this).attr("id");
    var name = $(this).attr("name");

    // tell the user we are loading
    _setLoadMessage('<i class="icon-spinner icon-spin"></i> Loading Tree...','info');

    // load file from drive
    getFile(id, $(this).attr("url"), function(file) {
      // if badness, let user know
      if( !file  ) return _setLoadMessage('Failed to load tree from Google Drive :(','danger');
      if( file.error  ) return _setLoadMessage('Failed to load tree from Google Drive :(','danger');

      // show the tree sharing btns
      $("#share-tree-btn").show();
      $("#loaded-tree-name").html(name).parent().show();

      // let the user know we are succesfull
      _setLoadMessage('Tree Loaded.','success');

      // set the loaded tree id
      loadedTree = id;

      // loaded tree into model / UI
      app.getModelIO().loadTree(file);

      // wait a sec so user can see success message
      setTimeout(function(){
        $("#load-modal").modal('hide');
      },1500);

    });
  });
}

/***
 *  show the user the load tree popup
 ***/
function showLoadTreePanel() {
  // render the trees into the popup list
  _showTreeFiles();
  // clear any messages
  _setLoadMessage(null);
  // show the popup
  $("#load-modal").modal('show');
}

/***
 *  show the user the save tree popup
 ***/
function showSaveTreePanel() {
  // set the current mimeType we are saving
  saveMimeType = TREE_MIME_TYPE;

  // set the header so user knows what type they are saving
  $("#gdrive-save-subheader").html("<h5>Save Tree</h5>");

  // if there is a current tree, show the update panel
  if( loadedTree != null) {
    // find the current tree based on id
    var tree = {};
    for( var i = 0; i < treeList.length; i++ ) {
      if( treeList[i].id == loadedTree) {
        tree = treeList[i];
        break;
      }
    }

    // show the update panel
    $("#save-update-panel").show();

    // render tree metadata on update panel
    var d = new Date(tree.modifiedDate);
    $("#save-update-panel-inner").html("<b>"+tree.title+"</b><br />" +
        "<span style='color:#888'>"+tree.description+"</span><br />"+
        "<span style='font-style:italic;font-size:11px;'>Last Modified: " +
        d.toDateString()+" "+d.toLocaleTimeString()+" by "+tree.lastModifyingUserName+"</span><br />"+
        "<a href='https://drive.google.com/file/d/"+tree.id+"'' target='_blank'><i class='icon-link'></i> Open in Google Drive</a>");
  } else {
    // don't show the update panel, this is a new tree
    $("#save-update-panel").hide();
  }

  // clear any message
  _setSaveMessage(null);

  // show the popup
  $("#save-modal").modal('show');
}

/***
 * Load a model based on passed id.  This function is really only for loading model on start, when a file id
 * has been passed in the url either from google drive or from the ?file=id url.
 ***/
var loginModalInit = false;
function load(id, loadFn) {
  // if we don't have an access token, we need to sign in first
  // TODO: if this is a public file, there is no reason to sign in... solution?
  if( !token ) {

    if( !loginModalInit ) {
      $('#google-modal-login').on('click', function(){
        // sign the user in (force oauth popup)
        signIn(function(token) {
          $('#login-modal').modal('hide');

          // set the user information in top left
          _setUserInfo();

          if( loadFn ) loadFn();

          getFileMetadata(id, function(metadata){
            getFile(id, metadata.downloadUrl, function(file) {
              _onInitFileLoaded(metadata,file);
            });
          });

        });
      });

      $('#login-modal').modal();
      loginModalInit = true;
    } else {
      $('#login-modal').modal('show');
    }

  } else {
    if( loadFn ) loadFn();

    getFileMetadata(id, function(metadata){
      getFile(id, metadata.downloadUrl, function(file) {
        _onInitFileLoaded(metadata,file);
      });
    });
  }
}

/***
 * Initialize UI / model when a file is loaded at start
 ***/
function _onInitFileLoaded(metadata, file) {
  // baddness, let the user know
  if( !file ) {
    if( hideInitLoading ) hideInitLoading();
    return alert("Failed to load from Google Drive :/");
  }

  // metadata failed to load, more badness
  if( metadata.code == 404 ) {
    if( hideInitLoading ) hideInitLoading();
    return alert("Google Drive: "+metadata.message);
  }

  // we loaded a model, setup and run
  if( metadata.mimeType == MIME_TYPE ) {
    // set the currently loaded file id
    loadedFile = metadata.id;

    // show the share btn
    $("#share-btn").parent().show();
    $("#open-in-drive").attr("href","https://docs.google.com/file/d/"+metadata.id).parent().show();

    // show title
    $("#loaded-model-title").html("<span style='color:#333'>Loaded Model </span> "+metadata.title);

    // setup model
    app.getModelIO().loadSetup(metadata.id, file);

    // setup realtime events
    gdriveRT.initRtApi(loadedFile);
  } else if ( metadata.mimeType == TREE_MIME_TYPE ) { // we loaded a tree
    // set the loaded tree id
    loadedTree = metadata.id;

    // show the share btn
    $("#share-tree-btn").show();
    $("#loaded-tree-name").html(metadata.title).parent().show();

    // set the loaded tree
    app.getModelIO().loadTree(file);

    // hide the loading popup
    if( hideInitLoading ) hideInitLoading();
  } else {
    alert("Loaded unknown file type from Google Drive: "+metadata.mimeType);
  }
}

/***
 * tokens expire, every once in awhile check the current token hasn't
 * if it has, then update
 ***/
function _checkToken() {
  // ignore if there is no token
  if (!token) return;

  // otherwise, look to update the access token
  Oauth.getAccessToken(function(t) {
    if( t != null ) token = t;
  });
};

/***
 * is the current user signed in?
 ***/
function checkSignedIn(callback) {
  // if isAutherized returns a token, user is logged in
  Oauth.isAuthorized(function(token){
    if (token != null) callback(true);
    else callback(false);
  });
};

/***
 * Sign a user in using the Oauth class
 ***/
function signIn(callback) {
  Oauth.authorize(function(t){
    token = t;
    if (token != null) {
      if( t.error ) return callback(false);
      callback(true);
    } else {
      callback(false);
    }
  })
};

/***
 * Access method for token
 ***/
function getToken() {
  return token;
};

/***
 * Load the google drive api code
 ***/
function _loadApi(callback) {
  gapi.client.load("drive", DRIVE_API_VERSION, function() {
    callback();
  });
};

/***
 * Get a list of file metadata from google drive based on query
 ***/
function listFiles(query, callback) {
  gapi.client.drive.files.list({
    q : query + " and trashed = false"
  }).execute(function(resp) {
    callback(resp);
  });
};

/***
 * Get a single files metadata based on id
 ***/
function getFileMetadata(id, callback) {
  gapi.client.drive.files.get({
    'fileId' : id
  }).execute(function(resp) {
    callback(resp);
  });
};

/***
 *  Actually load a files data.  The url to do this is provided in a files metadata.
 ***/
function getFile(id, downloadUrl, callback) {
  $.ajax({
    url : downloadUrl,
    beforeSend : function(request) {
      // set access token in header
      request.setRequestHeader("Authorization", 'Bearer '+ token.access_token);
    },
    success : function(data, status, xhr) {
      // parse the response (we only store json in the google drive)
      try {
        data = JSON.parse(data);
      } catch (e) {}

      callback(data, id);
    },
    error : function() {
      callback({
        error : true,
        message : "Failed to load file from Google Drive"
      });

    }
  });
};

/***
 * Save json to google drive
 ***/
function saveFile(name, description, mimeType, json, callback, options) {
  if( !options ) options = {}

  var boundary = '-------314159265358979323846';
  var delimiter = "\r\n--" + boundary + "\r\n";
  var close_delim = "\r\n--" + boundary + "--";

  var metadata = {
    'title' : name,
    'description' : description,
    'mimeType' : mimeType
  };

  // if we want to save the file to a specified folder
  if( options.parent ) {
    metadata.parents = [{id: options.parent}];
  }

  // if the json is really an object, turn it to a string
  if (typeof json == 'object') json = JSON.stringify(json);

  // data needs to be base64 encoded for the POST
  var base64Data = btoa(json);

  // create our multipart POST request
  var multipartRequestBody = delimiter
      + 'Content-Type: application/json\r\n\r\n'
      + JSON.stringify(metadata);

  if( json.length > 0 ) {
    multipartRequestBody += delimiter + 'Content-Type: '
      + mimeType + '\r\n' + 'Content-Transfer-Encoding: base64\r\n'
      + '\r\n' + base64Data;
  }
  multipartRequestBody += close_delim;

     // setup POST request
     // if the options.conver=true flag is set, google attempts to convert the file to
     // a google doc file.  Mostly, we use this for exporting csv -> Google Spreadsheets
  var request = gapi.client.request({
    'path' : '/upload/drive/v2/files' + ( options.convert ? '?convert=true' : ''),
    'method' : 'POST',
    'params' : {
      'uploadType' : 'multipart'
    },
    'headers' : {
      'Content-Type' : 'multipart/mixed; boundary="' + boundary + '"'
    },
    'body' : multipartRequestBody
  });

  // send the request
  request.execute(function(resp) {
    if (resp.id)
      callback(resp);
    else
      callback({
        error : true,
        message : "Failed to save"
      });
  });
};

/***
 * Update a file based on id and given json data
 ***/
function updateFile(fileId, json, callback) {
  // start creating the multipart POST request
  var boundary = '-------314159265358979323846';
  var delimiter = "\r\n--" + boundary + "\r\n";
  var close_delim = "\r\n--" + boundary + "--";

  var metadata = {};

  // strinify then base64 encode then object
    var base64Data = btoa(JSON.stringify(json));

    // set up the POST body
    var multipartRequestBody =
      delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: ' + MIME_TYPE + '\r\n' +
        'Content-Transfer-Encoding: base64\r\n' +
        '\r\n' +
        base64Data +
        close_delim;

  // setup POST request
    var request = gapi.client.request({
        'path': '/upload/drive/v2/files/'+fileId,
        'method': 'PUT',
        'params': {'uploadType': 'multipart'},
        'headers': {
          'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
        },
        'body': multipartRequestBody});

    // set request
    request.execute(function(resp){
      if( resp.id ) {
        callback(resp);
      } else {
        callback({
        error : true,
        message : "Failed to update"
      });
      }
    });
}

function runModelRt() {
  if( offlineMode ) return;
  ga('send', 'event', 'ui', 'interaction', 'run-model-remote', 1);
  gdriveRT.runModelRt();
}

module.exports = {
  init : init,
  checkSignedIn : checkSignedIn,
  signIn : signIn,
  getToken : getToken,
  listFiles : listFiles,
  getFileMetadata : getFileMetadata,
  load : load,
  saveFile: saveFile,
  showLoadTreePanel : showLoadTreePanel,
  showSaveTreePanel : showSaveTreePanel,
  runModelRt : runModelRt,

  MIME_TYPE : MIME_TYPE
}

},{"./gdriveRT":6,"./oauth":9}],6:[function(require,module,exports){
// REALTIME (rt) Objects
// rt json field, used to send updates to peers
var rtJson = null;
// rt document
var rtDoc = null;
// has the rt api been loaded?
var _rtLoaded = false;
// timer to buffer the firing of updates from rt events
var _rtTimer = -1;

// list of current rt edits to input files
var rtEdits = {};
// google drive rt model - map
var liveEdits = null;
// local lock on an element
var lock = {};

var app;

// loaded file id
var loadedFile;

/***
 * Setup the rt api for the current file.  This will actually load the api if needed
 ***/
function initRtApi(file) {
  rtJson = null; // kill off any old listners
  loadedFile = file;

  // close any old connection
  if( rtDoc ) rtDoc.close();

  // get out of here if we don't have a loaded file
  if( loadedFile == null ) return;

  // load api if needed
  if( !_rtLoaded ) {
    gapi.load('drive-realtime', function(){
      // setup rt hooks
      _rtLoaded = true;
      _loadRtFile();
    });
  } else {
    // setup rt hooks
    _loadRtFile();
  }

  // setup input handlers
  $('#inputs input').on('focus',function(e){
    var ele = $(e.target);
    _setLocalLock({
      id        : ele.attr("id"),
      value     : ele.val(),
      timestamp : new Date().getTime(),
      user      : window.userinfo ? window.userinfo.name : "unknown"
    });
  });
  $('#inputs input').on('blur',function(e){
    _removeLocalLock($(e.target).attr("id"));
  });
  $('#inputs input').on('keyup',function(e){
    if( e.which == 13 ) return;
    var ele = $(e.target);
    _updateLocalLock(ele.attr("id"), ele.val());
  });
}

function _setLocalLock(lock) {
  // TODO: this should mark the current lock
  if( liveEdits.has[lock.id] ) return;
  liveEdits.set(lock.id, lock);
}

function _updateLocalLock(id, val) {
  var lock = {
    id : id,
    value : val,
    timestamp : new Date().getTime(),
    user      : window.userinfo ? window.userinfo.name : "unknown"
  }

  liveEdits.set(id, lock);
}

function _removeLocalLock(id) {
  liveEdits.delete(id);
}

function _removeRemoteLock(lock) {
  $("#"+lock.id).removeAttr("disabled");
  $("#"+lock.id+"-editing").remove();
  delete rtEdits[lock.id];
}

function _updateLock(lock) {
  $("#"+lock.id).val(lock.value).attr("disabled","disabled");
  if( $("#"+lock.id+"-editing").length == 0 ) {
    $("#"+lock.id).parent().after("<span id='"+lock.id+"-editing' class='label label-warning'></span>");
  }
  $("#"+lock.id+"-editing").html(lock.user);
  rtEdits[lock.id] = lock;
}

/***
 * Update the list of realtime edits as well as the input UI based on the rtDoc event
 * TODO: this is a bit nasty right now
 **/
function _updateRtEdits(e) {
  if( e.isLocal ) return;

  var keys = liveEdits.keys();

  // remove old timestamps TODO
  /*for( var i = 0; i < values.length; i++ ) {
    if( now - values[i].timestamp > 1000 * 60 ) {
      _removeLock(values[i]); // does this fire updates?
    }
  }*/


  // set new edits
  for( var i = 0; i < keys.length; i++ ) {
    _updateLock(liveEdits.get(keys[i]));
  }

  // remove old edits
  for( var key in rtEdits ) {
    if( keys.indexOf(key) == -1 ) {
      _removeRemoteLock(rtEdits[key]);
    }
  }
}

/***
 *  Setup the rt hooks for the current file.  The api needs to already be loaded
 ***/
function _loadRtFile() {
  // get the rt doc
  gapi.drive.realtime.load(loadedFile,
    // rt doc loaded
    function(file){
      rtDoc = file;

      // get our rt attribute.  Triggering changes on rtJson will push events
      // to all listening clients
      var json = file.getModel().getRoot().get("json");
      liveEdits = file.getModel().getRoot().get("liveEdits");

      // if there is no json attr, we need to initialize the model
      if( json == null || liveEdits == null) {
        // initialize our rt model
        _onRtModelLoad(file.getModel());
        // grab rt json attr now that we are initialized
        json = file.getModel().getRoot().get("json");
        liveEdits = file.getModel().getRoot().get("liveEdits");
      }

      // badness happened :(
      if( !json ) return console.log("Failed to connect to rt json");
      // set that attr global to class
      rtJson = json;

      // get current list of users
      var users = file.getCollaborators();

      // add event listeners for when people come and go
      file.addEventListener(gapi.drive.realtime.EventType.COLLABORATOR_JOINED, function(e){
        users = file.getCollaborators();
        _updateActiveUsers(users);
      });
      file.addEventListener(gapi.drive.realtime.EventType.COLLABORATOR_LEFT, function(e){
        users = file.getCollaborators();
        _updateActiveUsers(users);
      });

      // add event listeners for the rtJson object
      // when this updates, we want to re-run the model
      json.addEventListener(gapi.drive.realtime.EventType.TEXT_INSERTED, function(e){
        if( e.isLocal ) return;
        _rerunRt(users, e.userId);
        });
        json.addEventListener(gapi.drive.realtime.EventType.TEXT_DELETED, function(e){
          if( e.isLocal ) return;
          _rerunRt(users, e.userId);
        });

        // live edit updates
              liveEdits.addEventListener(gapi.drive.realtime.EventType.VALUE_CHANGED, function(e){
                   _updateRtEdits(e);
              });

        // show who is listening
        _updateActiveUsers(users);

        // set input handlers for rt events
    },
    // model loaded
    function(model){
      _onRtModelLoad(model);
    },
    // errors
    function(err) {
      console.log("RT ERRORS: ");
      console.log(err);
    }
  );
}


/***
 * Update the display of active users for the model.
 ***/
function _updateActiveUsers(users) {
  // if it's just us, don't show anything
  if( !users ) return $("#active-users").html("");
  if( users.length <= 1 ) return $("#active-users").html("");

  // we only want unique users
  var unique = [];
  var uusers = [];
  for( var i = 0; i < users.length; i++ ) {
    if( unique.indexOf(users[i].userId) == -1 ) {
      unique.push(users[i].userId);
      uusers.push(users[i]);
    }
  }
  if( uusers.length <= 1 ) return $("#active-users").html("");

  // add pic of user to display panel
  var html = "Active Users ";
  for( var i = 0; i < uusers.length; i++ ) {
    if( uusers[i].photoUrl ) {
      html += "<img src='"+uusers[i].photoUrl+"' title='"+uusers[i].displayName+"' style='margin:0 5px;width:32px;height:32px' class='img-rounded' /> ";
    } else {
      html += "<span style='width:32px;height:32px;margin:0 5px;background-color:"+uusers[i].color+"' title='"+uusers[i].displayName+"' ></span> ";
    }
  }
  $("#active-users").html(html);
}

/***
   *  Re-run the model.  Events can come in quickly in many parts.  Buffer the events so we don't re-run the model too many times.
   ***/
function _rerunRt(users, userId) {
  // this is badness
  if( !rtJson ) return;

  // clear any queued run
  if( _rtTimer != -1 ) clearTimeout(_rtTimer);

  // queue up a run and wait to make sure there are no updates
  _rtTimer = setTimeout(function(){
    _rtTimer = -1;

    // find the user who is running the model and diplay popup of that users information
    for( var i = 0; i < users.length; i++ ) {
      if( users[i].userId == userId ) {
        var panel = $("<div class='init-loading-outer' ><div class='init-loading' style='width:400px'> "+
                (users[i].photoUrl ? "<img src='"+users[i].photoUrl+"' /> " : "")+users[i].displayName+" is updating the model...</div></div>");
            $("body").append(panel);
            setTimeout(function(){
                panel.css("opacity",".9");
            },50);
            setTimeout(function(){
                panel.remove();
            }, 3500);
            break;
      }
    }

    // parse the new model data and load it as our current setup
    var data = JSON.parse(rtJson.getText());
    app.getModelIO().loadSetup(loadedFile, data, true);
  }, 300);
}

/***
 * initialize a new rt model
 ***/
function _onRtModelLoad(model) {
  // currently we just want to use this single attribute to broadcast events
  var json = model.getRoot().get("json");
  if( json == null ) {
    var string = model.createString("{}");
    model.getRoot().set("json", string);
  }

  var liveEdits = model.getRoot().get("liveEdits");
  if( liveEdits == null ) {
    var field = model.createMap();
    model.getRoot().set("liveEdits", field);
  }

}

/***
 * let the world know what we are doing :)
 * This should be called when a local user runs the model.  It updates the 'json'
 * attribute which is then broadcast to all listening parties
 ***/
function runModelRt() {
  if( rtJson ) rtJson.setText(JSON.stringify( app.getModelIO().exportSetup() ));
}

module.exports = {
  runModelRt : runModelRt,
  initRtApi  : initRtApi,
  setApp : function(application) {
    app = application;
  }
};

},{}],7:[function(require,module,exports){
var offline = require('./offline');
var gdrive = require('./gdrive');
var charts = require('./charts');
var weatherFileReader = require('./weatherFileReader');

module.exports = function(app) {

var weatherAverageChart = null;
var weatherAverageChartData = {};

var SETUP_TEMPLATE =
  '<div>'+
  '<h4>Chart Options</h4>'+
  '<div>'+
      '<table class="table">'+
          '<tr>'+
              '<td style="width:50%">Output variable(s) to chart </td>'+
              '<td> <a id="select-charts-btn" class="btn btn-default">Select Charts</a></td>'+
          '</tr>'+
          '<tr>'+
              '<td style="width:50%">Variation analysis parameter(s) </td>'+
              '<td><div id="variationAnalysisStatus">None</div></td>'+
          '</tr>'+
      '</table>'+
  '</div>'+
  '<h4>Location</h4>'+
   '<div style="border-top:1px solid #ddd;padding:8px;height:60px">'+
     '<span id="current-location" style="color:#888"></span>'+
     '<a class="btn btn-default pull-right select-weather-location"><i class="icon-map-marker"></i> Select Location</a>'+
     '</div>'+
     '<div>';

var GOOLEDRIVE_TREE_TEMPLATE =
  '<div style="padding:15px 0 5px 0;margin-bottom:5px;height: 50px">'+
    '<div class="btn-group pull-right" id="tree-sub-menu">'+
      '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">'+
        '<span id="loaded-tree-name">Default Tree</span> <span class="caret"></span>'+
      '</button>'+
      '<ul class="dropdown-menu" role="menu">'+
        '<li><a id="gdrive-treepanel-load"><i class="icon-cloud-download"></i> Load Tree</a></li>'+
        '<li><a id="gdrive-treepanel-save"><i class="icon-cloud-upload"></i> Save Tree</a></li>'+
        '<li style="display:none"><a id="share-tree-btn" class="btn btn-default" style="display:none;margin-left:10px"><i class="icon-share"></i> Share Tree</a></li>'+
      '</ul>'+
  '</div>'+
  '<div style="display:none"><input type="checkbox" id="compare-trees" /> Compare Trees</div>'+
'</div>';

var INPUT_TEMPLATE =
  '<div class="form-group">'+
    '<label for="{{id}}" class="col-lg-4 control-label">{{label}}</label>'+
    '<div class="col-lg-8">'+
      '<input type="{{type}}" class="form-control" id="{{id}}" style="width:200px;display:inline-block" value="{{value}}">&nbsp;&nbsp;{{units}}'+
      '<p class="help-block">{{description}}</p>' +
    '</div>'+
  '</div>';

var ARRAY_INPUT_TEMPLATE =
  '<div class="col-lg-6"><div class="form-group">'+
    '<label for="{{id}}" class="col-lg-4 control-label">{{label}}</label>'+
    '<div class="col-lg-8">'+
      '{{inputs}}'+
      '<p class="help-block">{{description}}</p>' +
    '</div>'+
  '</div></div>';

var tabHeader = '<ul class="nav nav-pills" id="input_pills">';
var content = '<div class="pill-content">';

var treeHeader = '<div class="panel-group" id="tree-accordion">';
var TREE_PANEL_TEMPLATE = '<div class="panel panel-default">'+
        '<div class="panel-heading">'+
            '<h4 class="panel-title">'+
                '<a class="accordion-toggle" data-toggle="collapse" data-parent="#tree-accordion" href="#collapse{{id}}">'+
                    '{{title}}'+
                '</a>'+
            '</h4>'+
        '</div>'+
        '<div id="collapse{{id}}" class="panel-collapse collapse">'+
            '<div class="panel-body">{{body}}</div>'+
        '</div>'+
     '</div>';

var inputs = {};

// for weather data
var cols = [];

var map = null;

/**
 * Options :
 *   model - type of model to append to
 *   label - attribute label
 *   value - default value
 *   description - description of attribute
 *   units - attribute units
 */
function _addInput(options) {
  if( !inputs[options.model] ) inputs[options.model] = [];
  inputs[options.model].push(options);
}

function _createWeatherInputs() {
  for( var attr in app.getModel().getDataModel().weather ) {
    if( attr != "nrel" ) cols.push(attr);
  }

  var table = '<div style="padding-top:25px"><a class="btn btn-default pull-right" id="load-weather-btn"><i class="icon-upload-alt"></i> Upload</a>'+
        '<div class="btn-group" id="weather-input-toggle">'+
          '<button type="button" class="btn btn-default active">Averages</button>'+
          '<button type="button" class="btn btn-default">Actual</button>'+
        '</div>'+
        '</div>'+
        '<div id="custom-weather-panel" style="display:none;margin-top:20px"></div>'+
        '<div id="average-weather-panel">'+
        '<div style="padding:10px;color:#888">Select location to set the average weather data</div>'+
        '<table class="table table-striped table-condensed weather-table" style="margin-top:20px">';

  table += "<tr>";
  for( var i = 0; i < cols.length; i++ ) {
    table += "<td>"+cols[i]+"</td>";
  }
  table += "</tr>";

  for( var i = 0; i < 12; i++ ) {
    table += "<tr>";
    for( var j = 0; j < cols.length; j++ ) {
      if( j == 0 ) {
        table += "<td>"+(i+1)+"</td>";
      } else {
        table += "<td><input class='form-control' id='input-weather-"+cols[j]+"-"+i+"' type='text' /></td>";
      }
    }
    table += "</tr>";
  }
  return table+'</table><div id="average-weather-chart"></div></div>';

}

function _setWeatherData() {
  var ll = app.qs("ll");
  if( ll ) {
    ll = ll.split(",");
    _queryWeatherData(ll[0], ll[1], function() {
        app.runModel();
    });
  } else {
    $("#current-location").html("Not Set");
  }
}

function _queryWeatherData(lng, lat, callback) {
  ga('send', 'event', 'ui', 'interaction', 'weather-data-query', 1);

  var url = "http://alder.bioenergy.casil.ucdavis.edu:8080/vizsource/rest?view=pointToWeather("+lng+","+lat+",8192)"
  var q = new google.visualization.Query(url);
  var resps = 0;

  function checkDone() {
      resps++;
      if( resps == 2 && callback ) callback();
  }

  q.setQuery('SELECT *');
  q.send(function(response){
    var table = JSON.parse(response.getDataTable().toJSON());

    for( var i = 0; i < table.rows.length; i++ ) {
      var m = i+'';
      weatherAverageChartData[m] = {};
      for( var j = 1; j < table.cols.length; j++ ) {
        $("#input-weather-"+cols[j]+"-"+i).val(table.rows[i].c[j] ? table.rows[i].c[j].v : "");
      }
    }

    updateAverageChart();
    checkDone();
  });

  var url = "http://alder.bioenergy.casil.ucdavis.edu:8080/vizsource/rest?view=pointToSOIL("+lng+","+lat+",8192)"
  var q = new google.visualization.Query(url);
  q.setQuery('SELECT *');
  q.send(function(response){
    var error = false;
    var table = JSON.parse(response.getDataTable().toJSON());
    for( var i = 0; i < table.cols.length; i++ ) {
      if( table.rows[0] == null ) {
        error = true;
        alert("Invalid location selected");
        break;
      }
      $("#input-soil-"+table.cols[i].id).val(table.rows[0].c[i].v);
    }

    if( !error ) checkDone();
  });

  $("#current-location").html(lng+", "+lat+" <a href='"+window.location.href.replace(/#.*/,'')+
                              "?ll="+lng+","+lat+"' target='_blank'><i class='icon-link'></i></a>");
}

function updateAverageChart() {
  weatherAverageChartData = {};

  for( var i = 0; i < 12; i++ ) {
    weatherAverageChartData[i+''] = {};
    for( var j = 1; j < cols.length; j++ ) {
      var val = $("#input-weather-"+cols[j]+"-"+i).val();
      if( val && val.length > 0 ) weatherAverageChartData[i+''][cols[j]] = parseInt(val);
      else weatherAverageChartData[i+''][cols[j]] = 0;
    }
  }
  weatherAverageChart = charts.createWeatherChart($('#average-weather-chart')[0], weatherAverageChartData);
}

function _selectWeatherLocation() {
  if( !map ) {
    $("#select-weather-modal").modal({});

    $("#locate-button").on('click', _getLocation);


    // wait for the modal to init
    setTimeout(function(){
      if( offlineMode ) return;

      map = new google.maps.Map($("#gmap")[0], {
        center : new google.maps.LatLng(35, -121),
        zoom: 5,
        mapTypeId : google.maps.MapTypeId.ROADMAP
      });

      var defaultStyle = {
            polygonOptions: {
              strokeColor   : "#0000FF",
              strokeOpacity : 0.5,
              fillColor     : '#FEFEFE',
              fillOpacity   : 0.2
            },
      };


      var defaultOptions = {
          query: {
            select: 'boundary',
            from: '1hV9vQG3Sc0JLPduFpWJztfLK-ex6ccyMg_ptE_s'
          },
          styles: [defaultStyle],
          suppressInfoWindows : true
      };

      var fusionLayer = new google.maps.FusionTablesLayer(defaultOptions);
      fusionLayer.opacity = .8;
      fusionLayer.setMap(map);

      google.maps.event.addListener(map, 'click', function(e) {
        if( $('#locate-cache-mode').is(':checked') ) {
          alert('You must click on a geometry to cache');
          return;
        }

        _queryWeatherData(e.latLng.lng(), e.latLng.lat(), function() {
                  app.runModel();
              });
        $("#select-weather-modal").modal('hide');
      });
      google.maps.event.addListener(fusionLayer, 'click', function(e) {
        if( $('#locate-cache-mode').is(':checked') ) {
          offline.cacheTile(e, fusionLayer, defaultOptions, defaultStyle);
          return;
        }

        _queryWeatherData(e.latLng.lng(), e.latLng.lat(), function() {
                  app.runModel();
              });
        $("#select-weather-modal").modal('hide');
      });

      // setup input for clearing cache
          $('#clear-cached-tiles').on('click', function(){
              offline.clearCache();
              offline.renderCachedTilesOnMap(fusionLayer, defaultOptions, defaultStyle);
          });

      offline.renderCachedTilesOnMap(fusionLayer, defaultOptions, defaultStyle);

    },500);
  } else {
    $("#select-weather-modal").modal('show');

    // we seem to be hanging sometimes....
    setTimeout(function(){
      google.maps.event.trigger(map, "resize");
    }, 500);
  }
}

function _getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    $("#locate-button").addClass("btn-warning");
  } else{
    window.alert("Geolocation is not supported by this browser.");
  }
  function showPosition(position) {
    $("#locate-button").removeClass("btn-warn").addClass("btn-success");
    map.setZoom(10);
    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    //_queryWeatherData(position.coords.longitude, position.coords.latitude);
  }
}

function _generateInputs(i, type, prefix, name, attrs) {
  var id = prefix.length > 0 ? prefix+'-'+name : 'input-'+name;
  var input = '<div class="form-group" style="margin-left:'+(i*20)+'px;margin-top:0px;margin-right:5px">';

  var treebody = "";

  if( !(i == 1) ) {
      if( i != 0 ) input += '<label for="'+id+'" class="control-label">'+name +'</label>';
      input += '<div>';
  }


      if ( typeof attrs.value == 'object' && i == 1  ) { // && type == 'tree' ) {
      for( var key in attrs.value ) {
              treebody += _generateInputs(i+1, type, id, key, attrs.value[key]);
          }
  } else if ( typeof attrs.value == 'object' ) {
      if( attrs.description ) input += '<p class="help-block">'+attrs.description+'</p>';
          for( var key in attrs.value ) {
              input += _generateInputs(i+1, type, id, key, attrs.value[key]);
          }
  } else if ( (typeof attrs.value == 'number' || typeof attrs.value == 'string') && i == 1 ) { // && type == 'tree' ) {

      treebody +=
          '<div><input type="'+(attrs.value == '_date_' ? 'date' : 'text')+'" '+
          (type=='constants'?'disabled':'')+' class="form-control '+type+'" id="'+
          id+'" style="width:200px;display:inline-block" value="'
              +(attrs.value == '_date_' ? '' : attrs.value)+'">&nbsp;&nbsp;'
              +(attrs.units ? attrs.units : '')+'</div>';

  } else if (  typeof attrs.value == 'string' || typeof attrs.value == 'number' ) {

    input += '<div><input type="'+(attrs.value == '_date_' ? 'date' : 'text')+'" '
          +(type=='constants'?'disabled':'')+' class="form-control '+type+
           '" id="'+id+'" style="width:200px;display:inline-block" value="'
          +(attrs.value == '_date_' ? '' : attrs.value)+'">&nbsp;&nbsp;'
          +(attrs.units ? attrs.units : '')+'</div>';

    if( attrs.description ) input += '<p class="help-block">'+attrs.description+'</p>';
  }

  if( !(i == 1 /*&& type == 'tree'*/) ) {
      input += '</div></div>';
  } else {
      input += TREE_PANEL_TEMPLATE
                  .replace(/{{id}}/g,id)
                  .replace('{{title}}',name+" <span style='color:#888;font-size:12px'> - "+attrs.description+"</span>")
                  .replace('{{body}}',treebody)+'</div>'
  }

  return input;
}

function create(ele) {
  weatherFileReader.init();
  var model, m, attr, config;

  var inputs = $.extend(true, {}, app.getModel().getDataModel());

  inputs['setup'] = {};
  for( model in inputs ) {
    m = inputs[model];
    for( attr in m ) {
      config = m[attr];

      if( typeof config == 'object' ) {
        _addInput({
          model       : model,
          label       : attr,
          description : config.description,
          value       : config.value,
          units       : config.units
        });
      } else {
        _addInput({
          model       : model,
          label       : attr
        });
      }
    }
  }


  for( model in inputs ) {
    if( model == "plantation_state" ) continue;

    tabHeader += '<li><a href="#inputs_'+model+'" id="tab_inputs_'+model+'" data-toggle="pill">'
                +model.substr(0,1).toUpperCase()+model.substr(1).toLowerCase()+'</a></li>';
    var attributes = inputs[model];

    content += ' <div class="pill-pane" id="inputs_'+model+'">';

    var row1 = "";
    var row2 = "<div class='col-lg-6>";

    if( model == 'weather' ) {
      content += _createWeatherInputs();
    } else if( model == 'setup' ) {
      content += SETUP_TEMPLATE;
    } else {
        content += treeHeader;

        // add the google drive btn from trees
        if( model =='tree' ) {
          content += _createTreeInput(model, inputs);
        } else {
          content += _generateInputs(0, model, '', model, inputs[model]);
        }

      content += '</div>';
    }


    content += '</div>';
  }
  content += '</div>';
  tabHeader += "</ul>";

  ele.html(tabHeader+"<div class='form-horizontal'>"+content+"</div>");

  // run the model whenever some hits 'enter'
  ele.find('input').on('keyup',function(e){
    if( e.which == 13 ) app.runModel();
  });

  // add click handler for loading a tree
  ele.find("#gdrive-treepanel-load").on('click', function(){
    gdrive.showLoadTreePanel();
  });
  ele.find("#gdrive-treepanel-save").on('click', function(){
    gdrive.showSaveTreePanel();
  });

  // set tree input handlers
  $("#compare-trees").on('click', function(){
    if( $(this).is(':checked') ) {
      $("#single-tree-content").hide();
      $("#compare-tree-content").show();
      $("#tree-sub-menu").hide();
    } else {
      $("#single-tree-content").show();
      $("#compare-tree-content").hide();
      $("#tree-sub-menu").show();
    }
  });

  // set pill click handlers
  $('#input_tabs a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
  });
  $('#tab_inputs_weather').tab('show');

  $('.select-weather-location').on('click', _selectWeatherLocation);


  $('#weatherReader-modal').modal({show:false});
  $('#load-weather-btn').on('click', function(){
    $('#weatherReader-modal').modal('show');
  });

  $("#weather-input-toggle .btn").on('click', function(){
    $('#weather-input-toggle .btn.active').removeClass('active');
    $(this).addClass('active');

    if( $(this).html() == 'Averages' ) {
      $('#average-weather-panel').show();
      $('#custom-weather-panel').hide();
    } else {
      app.setWeather();
      $('#average-weather-panel').hide();
      $('#custom-weather-panel').show();
    }
  });

  $(window).on('resize', function(){
    if( weatherAverageChart ){
      weatherAverageChart = charts.createWeatherChart($('#average-weather-chart')[0], weatherAverageChartData);
    }
  });

  _setWeatherData();
}

function _createTreeInput(model, inputs) {
  var content = "";
  content += GOOLEDRIVE_TREE_TEMPLATE;

  content += '<div id="single-tree-content">';
  content += _generateInputs(0, model, '', model, inputs[model]);
  content += '</div>';

  content += '<div id="compare-tree-content" style="display:none">'+
        '<ul class="nav nav-tabs">'+
          '<li class="active"><a href="#tree1" data-toggle="tab">Tree 1</a></li>'+
            '<li><a href="#tree2" data-toggle="tab">Tree 2</a></li>'+
        '</ul>'+
        '<div class="tab-content">'+
            '<div class="tab-pane active" id="tree1">'+
              '<div class="well" style="text-align:center;margin-top:10px">'+
                '<div class="btn-group">'+
                '<button type="button" class="btn btn-default active">Custom</button>'+
                '<button type="button" class="btn btn-default">Select Tree</button>'+
              '</div>'+
              '</div>'+
              _generateInputs(0, model, 't1', model, inputs[model])+
            '</div>'+
            '<div class="tab-pane active" id="tree2">'+
              '<div class="well" style="text-align:center;margin-top:10px" >'+
                '<div class="btn-group">'+
                '<button type="button" class="btn btn-default active">Custom</button>'+
                '<button type="button" class="btn btn-default">Select Tree</button>'+
              '</div>'+
              '</div>'+
              _generateInputs(0, model, 't2', model, inputs[model])+
            '</div>'+
          '</div>'+
         '</div>';

  return content;
}


return {
  create : create,
  updateAverageChart: updateAverageChart
};

};

},{"./charts":2,"./gdrive":5,"./offline":10,"./weatherFileReader":12}],8:[function(require,module,exports){
// Special Sauce...
// basically the code loaded from GitHub expects the following to exists in the window scope
//   m3PGIO
//     - readAllContants
//     - readWeather
//     - dump
//     - readFromInputs
// So we inject functions that interact w/ our UI, model in no way cares
module.exports = {
  read : function(model) {
    this.model = model;

    if( !model.plantation ) model.plantation = {};
    this.readAllConstants(model.plantation);

    if( !model.weather ) model.weather = {};
    if( !model.plantingParams ) model.plantingParams = {};
    if( !model.custom_weather ) model.custom_weather = {};

    this.readWeather(model.weather, model.plantingParams, model.custom_weather);
  },
  readAllConstants : function(plantation) {
      this.readFromInputs();

      //for ( var key in this.model.plantation) {
      //    plantation[key] = this.model.plantation[key];
      //}

      plantation.coppicedTree = this.model.tree;

      // setup seedling Tree
      // TODO: hardcoded for now, this shouldn't be
      plantation.seedlingTree = $.extend(true, {}, this.model.tree);
      plantation.seedlingTree.stemsPerStump = 1;
      plantation.seedlingTree.pfs.stemCnt = 1;
      plantation.seedlingTree.rootP = {
          LAITarget : 10,
          efficiency : 0.6,
          frac : 0.01
      };
  },
  readWeather : function(weatherMap, plantingParams, customWeatherMap) {
      var datePlanted = $("#input-manage-DatePlanted").val();
      if (datePlanted && datePlanted != "") {
          plantingParams.datePlanted = new Date($("#input-manage-DatePlanted").val());
      } else {
          plantingParams.datePlanted = new Date();
      }

      var dateCoppiced = $("#input-manage-DateCoppiced").val();
      if (dateCoppiced && dateCoppiced != "") {
          plantingParams.dateCoppiced = new Date($("#input-manage-DateCoppiced").val());
      } else {
         // set error condition : TODO
      }

      var DateFinalHarvest = $("#input-manage-DateFinalHarvest").val();
      if (DateFinalHarvest && DateFinalHarvest != "") {
          plantingParams.DateFinalHarvest = new Date($("#input-manage-DateFinalHarvest").val());
      } else {
         // set error condition : TODO
      }

      var yearsPerCoppice = $("#input-manage-CoppiceInterval").val();
      if (yearsPerCoppice && yearsPerCoppice != "") {
          plantingParams.yearsPerCoppice = parseInt($("#input-manage-CoppiceInterval").val());
      }


      for ( var i = 0; i < 12; i++) {
          var item = {
              month : (i + 1)
          };
          for ( var j = 1; j < this.app.inputs.weather.length; j++) {
              var c = this.app.inputs.weather[j];
              item[c] = this._readVal($("#input-weather-" + c + "-" + i));
          }
          item.nrel = item.rad / 0.0036;

          weatherMap[i] = item;
      }

      if( this.model.custom_weather ) {
          for( var date in this.model.custom_weather ) {
              this.model.custom_weather[date].nrel = this.model.custom_weather[date].rad / 0.0036;
              //customWeatherMap[date] = custom_weather[date];
          }
      }
      return weatherMap;
  },
  dump : function(rows, sheet) {
      // set the raw output
      this.app.runComplete(rows);
  },

  // read a value from the input
  // it has a ',' is set for variation
  _readVal : function(ele) {
      var val = ele.val();
      if( val.match(/\d*-\d*-\d*$/) ) {
          return val;
      } else if( val.match(/.*,.*/) ) {
          val = val.replace(/\s/g,'').split(",");
          var id = ele.attr("id").replace(/^input-/,'').replace(/-/g,'.');
          this.model.variations[id] = [];
          for( var i = 0; i < val.length; i++ ) {
              this.model.variations[id].push(parseFloat(val[i]));
          }
          return this.model.variations[id][0];
      }
      return parseFloat(val);
  },

  readFromInputs : function() {
      // read soil
      this.model.soil = {};
      this.model.soil.maxAWS = this._readVal($("#input-soil-maxaws"));
      this.model.soil.swpower = this._readVal($("#input-soil-swpower"));
      this.model.soil.swconst = this._readVal($("#input-soil-swconst"));

      // read manage
      this.model.manage = {
          coppice : false
      };
      var eles = $(".manage");
      for ( var i = 0; i < eles.length; i++) {
          var ele = $(eles[i]);
          this.model.manage[ele.attr("id").replace("input-manage-", "")] = this._readVal(ele);
      }

      // read plantation
      if( !this.model.plantation ) this.model.plantation = {};
      eles = $(".plantation");
      for ( var i = 0; i < eles.length; i++) {
          var ele = $(eles[i]);
          this.model.plantation[ele.attr("id").replace("input-plantation-", "")] = this._readVal(ele);
      }

      // read tree
      var treeInputs = $(".tree");
      this.model.tree = {};
      for ( var i = 0; i < treeInputs.length; i++) {
          var ele = $(treeInputs[i]);

          var parts = ele.attr("id").replace("input-tree-", "").split("-");
          if (parts.length == 1) {
              this.model.tree[parts[0]] = this._readVal(ele);
          } else {
              if (!this.model.tree[parts[0]])
                  this.model.tree[parts[0]] = {};
              this.model.tree[parts[0]][parts[1]] = this._readVal(ele);
          }
      }

      // read plantation state
      if( !this.model.plantation_state ) this.model.plantation_state = {};
      for ( var key in this.model.getDataModel().plantation_state.value ) {
          this.model.plantation_state[key] = -1;
      }

  },
  exportSetup : function() {
      this.model.variations = {};
      this.readFromInputs();
      this.readWeather([], {}, {});

      var ex = {
          weather : this.model.weather,
          custom_weather : this.model.custom_weather,
          tree : this.model.tree,
          plantation : this.model.plantation,
          manage : this.model.manage,
          soil : this.model.soil,
          plantingParams : this.model.plantingParams,
          plantation_state : this.model.plantation_state,
          config : {
              chartTypeInput : $("#chartTypeInput").val(),
              monthsToRun : this.app.monthsToRun(),
              currentLocation : $("#current-location").html(),
              loadedTree : $("#loaded-tree-name").html(),
              version : this.app.qs("version") ? this.app.qs("version") : "master"
          }
      }

      // by default the read function set the variations variables but only
      // returns the first, set the variation params to their correct values
      for( var key in this.model.variations ) {
          var parts = key.split(".");
          var param = ex;
          for( var i = 0; i < parts.length-1; i++ ) {
              param = param[parts[i]];
          }
          param[parts[parts.length-1]] = this.model.variations[key].join(", ");
      }

      return ex;
  },
  loadTree : function(tree) {
      for ( var rootKey in tree) {
          if (typeof tree[rootKey] != 'object') {
              $("#input-tree-" + rootKey).val(tree[rootKey]);
          } else {
              for ( var childKey in tree[rootKey]) {
                  $("#input-tree-" + rootKey + "-" + childKey).val(tree[rootKey][childKey]);
              }
          }
      }
  },
  loadSetup : function(fileid, setup, isRt) {

      // load config
      if (setup.config.chartTypeInput) {
          this.charts.unselectAll();
          for ( var i = 0; i < setup.config.chartTypeInput.length; i++) {
              this.charts.select(setup.config.chartTypeInput[i]);
          }
      }
      if (setup.config.currentLocation) {
          $("#current-location").html(setup.config.currentLocation);
      }
      if( setup.config.loadedTree ) {
          $("#loaded-tree-name").html(setup.config.loadedTree).parent().show();
      }

      // load weather
      if( Array.isArray(setup.weather) ) {
        for ( var i = 0; i < setup.weather.length; i++) {
            for ( var key in setup.weather[i]) {
                if (key == 'month')
                    continue;
                if (setup.weather[i][key] != null)
                    $("#input-weather-" + key + "-" + i).val(setup.weather[i][key])
                else
                    $("#input-weather-" + key + "-" + i).val("");
            }
        }
      } else {
        for ( var i in setup.weather ) {
            for ( var key in setup.weather[i]) {
                if (key == 'month')
                    continue;
                if (setup.weather[i][key] != null)
                    $("#input-weather-" + key + "-" + i).val(setup.weather[i][key])
                else
                    $("#input-weather-" + key + "-" + i).val("");
            }
        }
      }

      if( setup.custom_weather ) {
          this.model.custom_weather = setup.custom_weather;
      } else {
          this.model.custom_weather = {};
      }

      // create the chart
      this.inputForm.updateAverageChart();

      // load tree
      this.loadTree(setup.tree);

      // load planting params
      // Now part of manage....
      // fo
      if (setup.plantingParams) {
          var map = {
              "datePlanted" : "DatePlanted",
              "dateCoppiced" : "DateCoppiced",
              "yearsPerCoppice" : "CoppiceInterval"
          }

          for ( var key in setup.plantingParams) {
              var newKey = key;
              if( map[key] ) newKey = map[key];

              if (typeof setup.plantingParams[key] == 'string')
                  $("#input-manage-" + newKey).val(setup.plantingParams[key].replace(/T.*/, ''));
              else
                  $("#input-manage-" + newKey).val(setup.plantingParams[key]);
          }
      }

      // this value is deprecated, set to new input
      if( setup.config.monthsToRun ) {
          var d = new Date(setup.plantingParams.datePlanted);
          d = new Date(new Date(d).setMonth(d.getMonth()+parseInt(setup.config.monthsToRun)));
          $("#input-manage-DateFinalHarvest").val(d.toISOString().replace(/T.*/, ''));
      }


      // load rest
      var inputs = [ "plantation", "soil", "manage" ];
      for ( var i = 0; i < inputs.length; i++) {
          for ( var key in setup[inputs[i]]) {
              if (key == 'maxAWS') {
                  $("#input-soil-maxaws").val(setup.soil.maxAWS);
              } else if ( typeof setup[inputs[i]][key] == 'string' && setup[inputs[i]][key].match(/.*T.*Z$/) ) {
                  $("#input-" + inputs[i] + "-" + key).val(setup[inputs[i]][key].replace(/T.*/, ''));
              } else {
                  $("#input-" + inputs[i] + "-" + key).val(setup[inputs[i]][key]);
              }
          }
      }
      this.app.runModel(isRt);
  }
};

},{}],9:[function(require,module,exports){

  // must install this for native phonegap support:
  // https://github.com/phonegap-build/ChildBrowser

var win = null;

/* the key for refresh Token in local Storage */
var tokenKey = 'refresh_token';

/* stores the accessToken after retrieval from google server */
var accessToken = null;

/* stores the Time when access token was last received from server */
var accessTokenTime = null;

/* stores access Token's Expiry Limit. Uses 58 min. instead of 60 min. */
var accessTokenExpiryLimit = 58 * 60 * 1000;

/* A temporary variable storing callback function */
var callbackFunc = false;

// are we running native or browser mode?
var isNative = window.location.href.match(/^file.*/) ? true : false;

var CLIENT_ID = isNative ?
        "344190713465-diimtferh4tjb03169bkl9mkoqvq2ru9.apps.googleusercontent.com" :
         "344190713465.apps.googleusercontent.com";

var APP_ID = "344190713465";

var OAUTH_SCOPES = 'https://www.googleapis.com/auth/drive.file '
  + 'https://www.googleapis.com/auth/drive.install '
  + 'https://www.googleapis.com/auth/userinfo.profile';

/* config values for Google API (gapi) */
var gapiConfig = {
  endpoint: "https://accounts.google.com/o/oauth2/auth",
  endtoken: "https://accounts.google.com/o/oauth2/token", // token endpoint
  redirect_uri : "http://localhost",
  client_secret : '6rOQ9l0fynh137MRXGK-G_Zg',
  response_type : "code",
  client_id : CLIENT_ID,
  state : "gdriveinit",
  access_type : "offline",
  scope : OAUTH_SCOPES,

  /* As defined in the OAuth 2.0 specification, this field must contain a value
     * of "authorization_code" or "refresh_token" */
    grantTypes: { AUTHORIZE: "authorization_code", REFRESH: "refresh_token" },
 };

/**
 * Enum for Status values
 *
 * @enum {number}
 *
 * SUCCESS - Successfully data received from server
 * ERROR - Error occurred when trying to receive from server
 * NOT_DETERMINED - undetermined
 */
var status = {
        SUCESS: 1,
        ERROR: -1,
        NOT_DETERMINED: 0
}

requestStatus = 0;

/* stores the authorization Code internally */
authCode = false;

/* stores the error message when an error happens from google server */
errorMessage = false;

var log = function(msg) {
  console.log("***OAUTH***: "+msg);
}

/**
 * Attempts to authorize user using OAuth
 * Opens up Another window where user allows access or denies it.
 *
 * @param {function} callBack   A callback function which is invoked
 */
var authorize = function(callBack) {
  log("attempting to authorize");

    var authUri = gapiConfig.endpoint + '?'
    + 'scope=' + encodeURIComponent(gapiConfig.scope)
    + '&' + 'redirect_uri=' + encodeURIComponent(gapiConfig.redirect_uri)
    + '&' + 'response_type=' + encodeURIComponent(gapiConfig.response_type)
    + '&' + 'client_id=' + encodeURIComponent(gapiConfig.client_id);
    //+ '&' + 'state=' + encodeURIComponent(gapiConfig.state)
    //+ '&' + 'access_type=' + encodeURIComponent(gapiConfig.access_type)
    //+ '&' + 'approval_prompt=force'; // @TODO - check if we really need this param

    callbackFunc = callBack;
    requestStatus = status.NOT_DETERMINED;




    log("opening InAppBrowser");

    try {

      // Now open new browser
      win = window.open(authUri, '_blank', 'location=no,toolbar=no');

      $(win).on('loadstart',function(e){
        log("InAppBrowser loadstart");
        console.log(e.originalEvent.url);
        onAuthUrlChange(e.originalEvent.url);
      });

      //window.plugins.childBrowser.showWebPage(authUri, {showLocationBar : true});
      //window.plugins.childBrowser.onClose = onAuthClose;
      //window.plugins.childBrowser.onLocationChange = onAuthUrlChange;
    } catch(e) {
      log("Error opening InAppBrowser");
      log(e);
    }

};

if( !isNative ) {
  authorize = function(callback, immediate) {
  gapi.auth.authorize({
    client_id : CLIENT_ID,
    scope : OAUTH_SCOPES,
    immediate : immediate
  }, function() {
    authCode = gapi.auth.getToken();
    callback(authCode);
  });

  }
}

/* Auth Window closed */
var onAuthClose = function() {
        //console.log("Auth window closed");
};

/* OAuth Successfully done */
var onAuthSuccess = function() {
        //console.log('Auth Success?');
};

/**
 * Gets Invoked when the URL changes on OAuth authorization process
 *
 * Success URL Pattern:
 * "redirect_uri" + "?code=" [secret code val]
 *
 * Success Sample URL:
 * http://localhost/?code=4/WOpRLQfvvhHE0tuMUDDqnn76lCTT.8nXC4IebMEAUuJJVnL49Cc8AQGr8cQI
 *
 * Denied Access URL Pattern: "redirect_uri" + ?error=access_denied
 * Denied Access Sample: http://localhost/?error=access_denied
 *
 * @param {string} uriLocation The URI Location
 */
var onAuthUrlChange = function(uriLocation) {
    console.log("InAppBrowser url changed "+uriLocation);
    if(uriLocation.indexOf("code=") != -1) {
        requestStatus = status.SUCCESS;

        /* Store the authCode temporarily */
        authCode = getParameterByName("code", uriLocation);
        log("Found auth code: "+authCode);

        getRefreshToken(callbackFunc);

        // close the childBrowser
        win.close();
    } else if(uriLocation.indexOf("error=") != -1)  {
        requestStatus = status.ERROR;
        errorMessage = getParameterByName("error", uriLocation);
        callbackFunc();
        win.close();
    } else {
        requestStatus = status.NOT_DETERMINED;
        //callbackFunc();
    }
};


/**
* Gets the Refresh from Access Token. This method is only called internally,
* and once, only after when authorization of Application happens.
*
* @param paramObj An Object containing authorization code
* @param paramObj.auth_code The Authorization Code for getting Refresh Token
*
* @param {Function} callback callback function which is to be invoked after
*                            successful retrieval of data from google's server
*
*/
var getRefreshToken = function(callback) {
  console.log("access refresh token");
   $.ajax({
          type: "POST",
          url: gapiConfig.endtoken,
          data: {
                   client_id    : gapiConfig.client_id,
                   client_secret: gapiConfig.client_secret,
                   code         : authCode,
                   redirect_uri : gapiConfig.redirect_uri,
                   grant_type   : gapiConfig.grantTypes.AUTHORIZE
           }
    })
    .done(function(data) {
        console.log("success getting refresh token");

        /* upon sucess, do a callback with the data received */
        // temporary storing access token
        accessToken     = data.access_token;
        accessTokenTime = (new Date()).getTime();

        // set the token for the js api
        gapi.auth.setToken(data);

        /* set the error of data to false, as it was successful */
        data.error = false;

        window.localStorage.setItem(tokenKey, data.refresh_token);

        /* now invoke the callback */
        callback({access_token: accessToken});
    })
    .fail(function(xhr, textStatus) {
            callback({
                    error: true,
                    message: xhr.responseText
            });
    })
    .always(function() {
            //console.log("Token request complete");
    });
};

if( !isNative ) {
  getRefreshToken = function(callback) {
  gapi.auth.authorize({
    client_id : CLIENT_ID,
    scope : OAUTH_SCOPES,
    immediate : true
  }, function() {
    token = gapi.auth.getToken();
    if( callback ) callback(token);
  });
  }
}


/**
* This method should ONLY be called locally from within this class.
* Returns the Refresh Token from the local database.
*
* @return {String} The refresh Token
*
*/
var getToken = function() {
    return window.localStorage.getItem(tokenKey);
};


/**
* This method is invoked externally. It retrieves the Access Token by at first
* checking if current access token has expired or not. If its not expired, it
* simply returns that, otherwise, it gets the refresh Token from the local database
* (by invoking getToken) and then connecting with Google's Server (using OAuth)
* to get the Access Token.
*
* @param {Function} callback   A callBack function which is to be invoked after
*                             data is retrieved from the google's server. The data
*                             from google server is passed to callback as args.
*
*/
var getAccessToken = function(callback) {
   var currentTime = (new Date()).getTime();

   console.log("getting access token");

   /* check if current Token has not expired (still valid) */
   if (accessToken && accessToken != false &&
           currentTime < (accessTokenTime + accessTokenExpiryLimit)) {
           callback({ access_token: accessToken });

           return;
   }

   console.log("ACCESS TOKEN PARAMS: "+accessToken+" "+accessTokenTime+" "+accessTokenExpiryLimit);

   /* else, get the refreshToken from local storage and get a new access Token */
   var refreshToken = getToken();

   //   console.log("Refresh Token >> " + refreshToken);
   $.ajax({
          type: "POST",
          url: gapiConfig.endtoken,
          data: {
                  client_id    : gapiConfig.client_id,
                  client_secret: gapiConfig.client_secret,
                  refresh_token: refreshToken,
                  grant_type   : gapiConfig.grantTypes.REFRESH,
          }
    })
    .done(function(data) {
            /* upon sucess, do a callback with the data received */
            // temporary storing access token
            accessToken = data.access_token;
            accessTokenTime = (new Date()).getTime();

            // set the token for the js api
            gapi.auth.setToken(data);

            /* set the error to false */
            data.error = false;
            callback(data);
           })
    .fail(function(xhr, textStatus) {
            console.log("Token request error ?? >>" + xhr.responseText);
            callback({
                    error: true,
                    message: xhr.responseText
            });
    })
    .always(function() { //console.log("Token request complete");
    });
};

if( !isNative ) {
  getAccessToken = function(callback) {
     var currentTime = (new Date()).getTime();

     if (accessToken &&
             currentTime < (accessTokenTime + accessTokenExpiryLimit)) {
             callback(accessToken);

             return;
     }

    gapi.auth.authorize({
    client_id : CLIENT_ID,
    scope : OAUTH_SCOPES,
    immediate : true
  }, function() {
    token = gapi.auth.getToken();
    accessToken = token;
    accessTokenTime = (new Date()).getTime();
    if( callback ) callback(token);
  });
  }
}



/**
* Saves the Refresh Token in a local database or localStorage
* This method shall be invoked from externally only <b>once</b> after an
* authorization code is received from google's server. This method
* calls the other method (getRefreshToken) to get the refresh Token and
* then saves it locally on database and invokes a callback function
*
* @param tokenObj A Object containing authorization code
* @param {String} tokenObj.auth_code The authorization code from google's server
*
* @param {Function} callback The function to be invoked with parameters
*/
var saveRefreshToken = function(tokenObj, callback) {
     getRefreshToken(tokenObj, function(data) {

             /* if there's no error */
             if (!data.error) {
                    // @TODO: make another method saveToken to abstract the storing of token
                window.localStorage.setItem(tokenKey, data.refresh_token);
             }
             callback(data);
     });
};



/**
* Checks if user has authorized the App or not
* It does so by checking if there's a refresh_token
* available on the current database table.
*
* @return {Boolean} true if authorized, false otherwise
*/
var isAuthorized = function(callback) {
      var tokenValue = window.localStorage.getItem(tokenKey);

      callback(((tokenValue !== null) && (typeof tokenValue !== 'undefined')));
};

if( !isNative ) {
  isAuthorized = function(callback) {
    gapi.auth.authorize({
    client_id : CLIENT_ID,
    scope : OAUTH_SCOPES,
    immediate : true
  }, function() {
    token = gapi.auth.getToken();
    if( callback ) callback(token);
  });
  }
}


/**
* Extracts the code from the url. Copied from online
* @TODO needs to be simplified.
*
* @param name The parameter whose value is to be grabbed from url
* @param url  The url to be grabbed from.
*
* @return Returns the Value corresponding to the name passed
*/
var getParameterByName = function(name, url) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);

  if(results == null) {
    return false;
  }
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
};


module.exports = {
  authorize : authorize,
  isAuthorized : isAuthorized,
  getAccessToken : getAccessToken,
  APP_ID : APP_ID
};

},{}],10:[function(require,module,exports){
var app = require('./app');

var cachedTileStyle = {
  where: "pid in ()",
  polygonOptions: {
    fillColor: "#000000",
    strokeColor: "#FF0000",
    strokeWeight: 3
  }
}

var cachedTiles = [];
var cachedTilesLoaded = false;
var cachedTilePrefix = 'cached_title_';
var caching = false;
var saveCacheOnClickSet = false;
var cMapData = {};

var cols = [];
var app = null;

function init() {
  _loadFromCache();
  _loadCachedTiles();
}

function clearCache() {
  if( !confirm('Are you sure you want to clear all tile data from the cache?') ) return;

  for( var key in window.localStorage ) {
    if( key.indexOf(cachedTilePrefix) > -1 ) {
      window.localStorage.removeItem(key);
    }
  }
  cachedTiles = [];
}

// e is the event object from google maps
function cacheTile(e, fusionLayer, defaultOptions, defaultStyle) {
  if( !saveCacheOnClickSet ) {
    saveCacheOnClickSet = true;
    $('#locate-cache-save-btn').on('click', function(){
      _saveTile();
    });
    $('#locate-cache-mode').on('click', function(){
      if( !$(this).is('checked') ) $('#locate-cache-save-panel').hide();
    });
  }

  if( caching ) return;
  caching = true;

  cMapData = {
    fusionLayer : fusionLayer,
    defaultOptions : defaultOptions,
    defaultStyle : defaultStyle,
    pid :  e.row.pid.value
  }

  $('#locate-cache-save-name').val('');
  $('#locate-cache-mode-loading').show();
  $('#locate-cache-save-panel').hide();

  _loadTile(e.latLng.lng(), e.latLng.lat(), function(data){
    $('#locate-cache-save-panel').show();
    $('#locate-cache-mode-loading').hide();

    $('#locate-cache-save-pid').html(cMapData.pid);
    cMapData.data = data;
    caching = false;
  });
}

function render() {
  for( var attr in app.getModel().weather ) {
    if( attr != "nrel" ) cols.push(attr);
  }

  // the about modal link is created below, so why not...
  $("#about-modal").modal({
    show : false
  });

  // the about modal link is created below, so why not...
  $("#help-modal").modal({
    show : false
  });

  _createNavMenu();

  // hide the select tree button
  $('#tree-sub-menu').parent().hide();

  // hide the selector for uploading weather data from a google spreadsheet
  $('#weatherReader-spreadsheet').parent().hide();

  // show the cache version of the location selector
  $('#select-location-online').hide();
  $('#select-location-offline').show();

  // set the location selector ui list based on cached tiles
  _updateCacheTileUiList();
}

function renderCachedTilesOnMap(fusionLayer, defaultOptions, defaultStyle) {
  if( !cachedTilesLoaded ) _loadCachedTiles();

  defaultOptions.styles = [defaultStyle];

  if( cachedTiles.length > 0 ) {
    cachedTileStyle.where = 'pid in ('+cachedTiles.join(',')+')';
    defaultOptions.styles.push(cachedTileStyle);
  }

  fusionLayer.setOptions(defaultOptions);
}

function _saveTile() {
  var name = $('#locate-cache-save-name').val();
  if( name.length == 0 ) return alert('Please provide a name');

  cMapData.data.name = name;

  window.localStorage.setItem(cachedTilePrefix+cMapData.pid, JSON.stringify(cMapData.data));

  cachedTiles.push(cMapData.pid);
  renderCachedTilesOnMap(cMapData.fusionLayer, cMapData.defaultOptions, cMapData.defaultStyle);
  $('#locate-cache-save-panel').hide();
}

function _loadTile(lng, lat, callback) {
  ga('send', 'event', 'ui', 'interaction', 'tile-data-cache', 1);

  var url = "http://alder.bioenergy.casil.ucdavis.edu:8080/vizsource/rest?view=pointToWeather("+lng+","+lat+",8192)"
  var q = new google.visualization.Query(url);
  var resps = 0;
  var weatherTable = {};
  var soilTable = {};

  function checkDone() {
      resps++;
      if( resps == 2 && callback ) callback({weather:weatherTable, soil:soilTable});
  }

  q.setQuery('SELECT *');
  q.send(function(response){
    weatherTable = JSON.parse(response.getDataTable().toJSON());
    checkDone();
  });

  var url = "http://alder.bioenergy.casil.ucdavis.edu:8080/vizsource/rest?view=pointToSOIL("+lng+","+lat+",8192)"
  var q = new google.visualization.Query(url);
  q.setQuery('SELECT *');
  q.send(function(response){
    soilTable = JSON.parse(response.getDataTable().toJSON());
    checkDone();
  });
}

function _updateCacheTileUiList() {
  if( cachedTiles.length == 0 ) {
    $('#select-location-offline-none').show();
    return;
  }

  var listEle = $('#select-location-offline-list').html('<div>Select Cached Tile</div>'), ele;
  $('#select-location-offline-none');
  for( var i = 0; i < cachedTiles.length; i++ ) {
    var json = window.localStorage.getItem(cachedTilePrefix+cachedTiles[i]);
    json = JSON.parse(json);

    ele = $('<div><a cacheid="'+i+'" style="cursor:pointer">'+cachedTiles[i]+': '+json.name+'</a></div>');
    ele.find('a').on('click', function() {
      _runCachedTile(parseInt($(this).attr('cacheid')));
    });
    listEle.append(ele)
  }
}

function _runCachedTile(index) {
  var json = window.localStorage.getItem(cachedTilePrefix+cachedTiles[index]);
  json = JSON.parse(json);

  for( var i = 0; i < json.weather.rows.length; i++ ) {
    var m = i+'';
    for( var j = 1; j < json.weather.cols.length; j++ ) {
      $("#input-weather-"+cols[j]+"-"+i).val(json.weather.rows[i].c[j] ? json.weather.rows[i].c[j].v : "");
    }
  }


  for( var i = 0; i < json.soil.cols.length; i++ ) {
    if( json.soil.rows[0] == null ) continue;
    $("#input-soil-"+json.soil.cols[i].id).val(json.soil.rows[0].c[i].v);
  }

  $("#select-weather-modal").modal('hide');

  setTimeout(function(){
    app.runModel();
  }, 500);
}

function _loadCachedTiles() {
  cachedTiles = [];
  for( var key in window.localStorage ) {
    if( key.indexOf(cachedTilePrefix) > -1 ) {
      cachedTiles.push(key.replace(cachedTilePrefix,''));
    }
  }
  cachedTilesLoaded = true;
}

function _createNavMenu() {
  var btn = $('<li class="dropdown">'
      + '<a class="dropdown-toggle">OFFLINE MODE<b class="caret"></b></a>'
      + '<ul class="dropdown-menu">'
      + '<li><a id="help"><i class="icon-question-sign"></i> Help</a></li>'
      + '<li><a id="about"><i class="icon-info-sign"></i> About</a></li>'
      + '</ul></li>');

  // set click handlers for popup
  btn.find('a.dropdown-toggle').on('click', function(){
    $(this).parent().toggleClass('open');
  });

  // about click handler
  btn.find('#about').on('click', function() {
    btn.toggleClass('open');
    $("#about-modal").modal('show');
  });

  btn.find('#help').on('click', function() {
    btn.toggleClass('open');
    showHelp();
  });

  // add menu
  $("#login-header").html("").append(btn);
};

function _loadFromCache() {
      $.ajax({
        url: 'cache/jsapi',
        dataType: "script",
        cache : true,
        success: function(){
          $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'cache/chart.css') );
          $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'cache/annotatedtimeline.css') );
          $.ajax({
            url: 'cache/chart.js',
            dataType: "script",
            cache : true,
            success: function(){
              chartsLoaded = true;
              if( chartsCallback ) chartsCallback();
            }
          });
        }
      });
}

module.exports = {
  init : init,
  render : render,
  cacheTile : cacheTile,
  renderCachedTilesOnMap : renderCachedTilesOnMap,
  clearCache : clearCache
};

},{"./app":1}],11:[function(require,module,exports){
module.exports = {
  VPD : {
      label : "Mean Vapor Pressure Deficit",
      units : "kPA",
      description : "the difference (deficit) between the amount of moisture in the air and how much " +
      		"moisture the air can hold when it is saturated"
  },
  fVPD : {
      label : "Vapor Pressure Deficit Modifier",
      units : "unitless",
      description : "A environmental factor growth modifier"
  },
  fT : {
      label : "Temperature Modifier",
      units : "unitless",
      description : "A environmental factor growth modifier"
  },
  fFrost : {
      label : "Frost Modifier",
      units : "unitless",
      description : "Number of frost days growth modifier"
  },
  PAR : {
      label : "Monthly Photosynthetically Active Radiation",
      units : "mols / m^2 month",
      description : "Designates the spectral range (wave band) of solar radiation from 400 to 700 nanometers " +
      		"that photosynthetic organisms are able to use in the process of photosynthesis"
  },
  xPP : {
      label : "Maximum Potential Primary Production",
      units : "Metric Tons Dry Matter/ha",
      description : ""
  },
  Intcptn : {
      label : "Canopy Rainfall Interception",
      units : "",
      description : "Precipitation that does not reach the soil, but is instead intercepted by the leaves and branches of plants and the forest floor."
  },
  ASW : {
      label : "Available Soil Water",
      units : "mm",
      description : ""
  },
  CumIrrig : {
      label : "Cumulative Required Irrigation",
      units : "mm/mon",
      description : ""
  },
  Irrig : {
      label : "Required Irrigation",
      units : "mm/mon",
      description : ""
  },
  StandAge : {
      label : "Stand Age",
      units : "",
      description : ""
  },
  LAI : {
      label : "Leaf Area Index",
      units : "m2 / m2",
      description : "The one-sided green leaf area per unit ground surface area"
  },
  CanCond : {
      label : "Canopy Conductance",
      units : "gc,m/s",
      description : ""
  },
  Transp : {
      label : "Canopy Monthly Transpiration",
      units : "mm/mon",
      description : "Water movement through a plant and its evaporation from aerial parts"
  },
  fSW : {
      label : "Soil Water Modifier",
      units : "unitless",
      description : "A environmental factor growth modifier"
  },
  fAge : {
      label : "Stand age",
      units : "unitless",
      description : "A environmental factor growth modifier"
  },
  PhysMod : {
      label : "",
      units : "unitless",
      description : "Physiological Modifier to Canopy Conductance"
  },
  pR : {
      label : "",
      units : "",
      description : "Along with a Physiologial parameter, specifies the amount of new growth allocated to the root system, and the turnover rate."
  },
  pS : {
      label : "",
      units : "",
      description : "Defines the foliage to stem (WF/WS) fraction in allocating aboveground biomass of the tree"
  },
  litterfall : {
      label : "",
      units : "",
      descrition : "",
      altFnName : "tdp"
  },
  NPP : {
      label : "Net Canopy Production",
      units : "Mg/ha",
      description : ""
  },
  WF : {
      label : "Leaf Biomass",
      units : "Mg/ha",
      description : "",
      fn : function(pre_WF, cur_dW, cur_pF, cur_litterfall, prev_WF) {
          return prev_WF + cur_dW * cur_pF - cur_litterfall * prev_WF
      }
  },
  WR : {
      label : "Root Biomass",
      units : "Mg/ha",
      description : "",
      fn : function(prev_WR, cur_dW, cur_pR, turnover, prev_WR, cur_RootP) {
          return prev_WR + cur_dW * cur_pR - tree.pR.turnover * prev_WR - cur_RootP;
      }
  },
  WS : {
      label : "Stem Biomass",
      units : "Mg/ha",
      description : "",
      fn : function(prev_WS, cur_dW, cur_pS) { return prev_WS + cur_dW * cur_pS }
  },
  W : {
      label : "Total Biomass",
      units : "Mg/ha",
      description : "",
      fn : function(cur_WF, cur_WR, cur_WS) { return cur_WF+cur_WR+cur_WS }
  }
}

},{}],12:[function(require,module,exports){
var app = require('./app');

// add spreadsheet viz source
// https://spreadsheets.google.com/tq?tq=select%20*&key=0Av7cUV-o2QQYdHZFYWJNNWpRS1hIVWhGQThlLWZwZWc&usp=drive_web#gid=0

function init() {
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', _handleDragOver, false);
dropZone.addEventListener('drop', _handleFileSelect, false);

document.getElementById('files').addEventListener('change', _handleFileSelect, false);

    $('#spreadsheet-weather-input-btn').on('click', function(){
        _handleGoogleSpreadsheet();
    });
    $('#spreadsheet-weather-input').on('keyup', function(e){
        if( e.which == 13 ) _handleGoogleSpreadsheet();
    });

    $('#weatherReader-localfile').on('click', function(){
        $('#weatherReader-localfile-panel').toggle('slow');
    });
    $('#weatherReader-spreadsheet').on('click', function(){
        $('#weatherReader-spreadsheet-panel').toggle('slow');
    });

}

function _handleGoogleSpreadsheet() {
    ga('send', 'event', 'ui', 'interaction', 'load-weather-drive-file', 1);

    var val = $('#spreadsheet-weather-input').val();
    if( val.length == 0 ) return;

    if( !val.match(/^http.*/ ) ) val = 'https://'+val;

    var filePanel = new WeatherFile();
    var root = $("#file_list");
    filePanel.initFromUrl(val, root);
    $('#spreadsheet-weather-input').val('');
}

function _handleFileSelect(evt) {
    ga('send', 'event', 'ui', 'interaction', 'load-weather-local-file', 1);

  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer ? evt.dataTransfer.files : evt.target.files; // FileList object.

  // files is a FileList of File objects. List some properties.
  var root = $("#file_list");
  for (var i = 0, f; f = files[i]; i++) {
    var filePanel = new WeatherFile();
    filePanel.init(f, root);
  }
}

function _handleDragOver(evt) {
evt.stopPropagation();
evt.preventDefault();
evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// on add, if the list is empty, let's close the popup
function _onComplete() {
    if( $("#file_list").children().length == 0 ) {
        $('#weatherReader-modal').modal('hide');
    }
}

var WeatherFile = function() {
  var headers = {
        date     : {
            label : 'Date',
            units : 'Date',
            col   : -1
        },
        tmin     : {
            label : 'Min Temperature',
            units : 'C',
            col   : -1
        },
        tmax     : {
            label : 'Max Temperature',
            units : 'C',
            col   : -1
        },
        tdmean   : {
            label : 'Mean Temperature',
            units : 'C',
            col   : -1
        },
        ppt      : {
            label : 'Precipition',
            units : 'mm',
            col   : -1
        },
        rad      : {
            label : 'Radiation',
            units : 'MJ m-2 day-1',
            col   : -1
        },
        daylight : {
            lanel : 'Daylight Hours',
            units : 'hours',
            col   : -1
        }
    };


  var ele = $('<div style="text-align: left">'+
            '<button type="button" class="close" aria-hidden="true">&times;</button>'+
      '<div class="filename"></div>'+
      '<div class="progress">'+
      '<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">'+
        '<span class="sr-only">0% Complete</span>'+
      '</div>'+
    '</div>'+
      '<div class="status">'+
                '<div class="date-range"></div>'+
                '<div class="preview-data" style="display:none">'+
                    '<div><a class="btn btn-link preview-data-btn">Preview Data</a></div>'+
                    '<div class="preview-data-table" style="display:none"></div>'+
                '</div>'+
                '<div class="col-status" style="display:none"></div>'+
                '<div style="height:50px">'+
                    '<a class="btn btn-link map-data-btn">Map CSV Columns</a>'+
                    '<a class="btn btn-success disabled pull-right">Add Data</a>'+
                '</div>'+
            '</div>'+
    '</div>');

  var data = {};
    var csvTable = [];

    // only auto hide the first time
    var autoHide = true;

  // the file reader object and the element
  function init(file, rootEle) {
    var reader = new FileReader();
    reader.onerror = errorHandler;
    reader.onprogress = updateProgress;
    reader.onloadstart = function(e) {};
    reader.onload = function(e) {
      ele.find('.progress').remove();
      parse(e.target.result);
    }
    reader.readAsText(file)

    ele.find('.filename').html(getName(file));
    rootEle.append(ele);

        _setHandlers();
  }

    function initFromUrl(url, rootEle) {
        var q = new google.visualization.Query(url);
        ele.find('.progress').html('Querying spreadsheet...');

        var key = getKey(url);
        ele.find('.filename').html('<h3 style="border-bottom:1px solid #eee;padding:15px 0 4px 0"><i class="icon-tint"></i> '+
            'Google Spreadsheet'+(key.length > 0 ? '<br /><span style="color:#888;font-size:14px">'+key+'</span>' : '')+'</h3>');

        rootEle.append(ele);

        q.setQuery('SELECT *');
        q.send(function(response){
            ele.find('.progress').remove();

            if (response.isError()) {
                setError('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                return;
            }

            parse(dtToCsv(response.getDataTable()));
        });

        _setHandlers();
    }

    function _setHandlers() {
        ele.find('.map-data-btn').on('click', function(){
            ele.find('.col-status').toggle('slow');
        });

        ele.find('.preview-data-btn').on('click', function(){
            ele.find('.preview-data-table').toggle('slow');
        });

        ele.find('.close').on('click', function(){
            ele.remove();
        });

        ele.find('.btn-success').on('click', function(){
            app.setWeather(data);
            ele.remove();
            _onComplete();
        });
    }

    function dtToCsv(dt) {
        var arr = [[]];

        dt = JSON.parse(dt.toJSON());
        for( var i = 0; i < dt.cols.length; i++ ) {
            arr[0].push(dt.cols[i].label);
        }

        for( var i = 0; i < dt.rows.length; i++ ) {
            arr.push([]);
            for( var j = 0; j < dt.rows[i].c.length; j++ ) {
                if( !dt.rows[i].c[j] ) arr[i+1].push('');
                else arr[i+1].push(dt.rows[i].c[j].v);
            }
        }

        var csv = '';
        for( var i = 0; i < arr.length; i++ ) {
            csv += arr[i].join(',')+'\n';
        }

        return csv;
    }

    function getKey(url) {
        var parts = url.split('?');
        if( parts.length == 1 ) return '';

        parts = parts[1].split('&');
        for( var i = 0; i < parts.length; i++ ) {
            if( parts[i].split('=')[0] == 'key' ) return parts[i].split('=')[1];
        }
        return '';
    }

  function getName(f) {
    return ['<h3 style="border-bottom:1px solid #eee;padding:15px 0 4px 0"><i class="icon-tint"></i> ', f.name,
                ' <span style="color:#888;font-size:16px">(', f.type || 'n/a',
                ')</span> - <span style="font-size:16px">', f.size, ' bytes</span>', '</h3>'].join('');
  }

  function parse(data) {
    data = data.replace(/^\s*\n/g,'').split('\n');

    var table = [];
    for( var i = 0; i < data.length; i++ ) {
      table.push(data[i].split(','));
    }

        if( table.length == 0 ) return setError('File did not contain any information.');
        csvTable = table;

        parseHeader(table[0]);
        getDateRange();
    }

    function getDateRange() {
        ele.find('.date-range').html('');
        if( headers.date.col == -1 ) return ele.find('.date-range').html('Date column needs to be matched.');
        if( typeof headers.date.col == 'string' ) headers.date.col = parseInt(headers.date.col);

        var dates = {};
        var displayDates = [];
        for( var i = 1; i < csvTable.length; i++ ) {
            if( headers.date.col < csvTable[i].length && csvTable[i].length >= 7 ) {
                var p = csvTable[i][headers.date.col].split("-");
                if( p.length != 3 && p.length != 2 ) return setError("Date: "+csvTable[i][headers.date.col]+" is not a valid format (yyyy-mm-dd or yyyy-mm)");

                if( !dates[p[0]] ) dates[p[0]] = [];
                var mmdd = p[1];

                if( dates[p[0]].indexOf(mmdd) != -1 ) return setError("Date: "+csvTable[i][headers.date.col]+" is in dataset twice");
                dates[p[0]].push(mmdd);
            }
        }

        for( var year in dates ) {
            if( dates[year].length == 12) {
                displayDates.push(year);
            } else {
                displayDates.push(year+' ['+dates[year].join(', ')+']');
            }
        }

        ele.find('.date-range').html('<b>Date Range:</b> '+displayDates.join(', '));
    }

    function parseHeader(headerRow) {
        var matched = [];

        var html = '<table class="table table-striped">';
        html += '<tr><th>Key</th><th>Column #</th></tr>';

        for( var key in headers ) {
            if( headerRow.indexOf(key) != -1 ) {
                headers[key].col = headerRow.indexOf(key);
                matched.push(key);
                html += '<tr><td>'+key+'</td><td><span class="label label-success">'+headers[key].col+' <i class="icon-ok"></i></span></td></tr>';
            } else {
                html += '<tr><td>'+key+'</td><td><select class="select-'+key+'""></select></td></tr>';
            }
        }
        ele.find('.col-status').html(html+'</table>');


        if( matched.length != 7 ) {
            // create select element for missing col's
            ele.find('.status select').append($('<option value="">[Select Column]</option>'));

            // if it's radiation, add option for calculating
            // TODO

            // append missing cols
            for( var i = 0; i < headerRow.length; i++ ) {
                if( matched.indexOf(headerRow[i]) == -1 ) {
                    ele.find('.status select').append($('<option value="'+i+'">'+i+' - '+headerRow[i]+'</option>'));
                }
            }

            // set the change handlers for the selectors
            ele.find('.status select').on('change', function(e){
                var val = $(this).find('option:selected').attr('value');
                if( val != '' ) headers[this.className.replace(/select-/,'')].col = val;

                // if all columns are set, remove disabled from btn
                var ready = true;
                for( var key in headers ) {
                    if( headers[key].col == -1 ) {
                        ready = false;
                        break;
                    }
                }

                if( ready ) {
                    if( autoHide ) ele.find('.col-status').hide('slow');
                    onReady();
                } else {
                    data = {};
                    ele.find('.btn-success').addClass('disabled');
                    ele.find('.preview-data').hide();
                }
            });

            // show the table
            ele.find('.col-status').show('slow');
        } else {
            onReady();
        }
    }

    function onReady() {
        autoHide = false;
        ele.find('.btn-success').removeClass('disabled');
        setData();
        setPreview();
    }

    function setPreview() {
        ele.find('.preview-data').show();

        var html = '<table class="table table-striped"><tr><th>date</th>';
        for( var key in headers ){
            if( key == 'date' ) continue;
            html += '<th>'+key+'</th>';
        }

        var c = 0;
        for( var date in data ){
            if( c == 10 ) {
                html += '<tr><td colspan="7" style="text-align:center">...</td></tr>';
                break;
            }

            html += '<tr><td>'+date+'</td>';
            for( var key in headers ){
                if( key == 'date' ) continue;
                html += '<td>'+data[date][key]+'</td>';
            }
            html += '</tr>';

            c++;
        }

        ele.find('.preview-data-table').html(html);
    }

  // set the map of csv headers
  function setData() {
        data = {};
        for( var i = 1; i < csvTable.length; i++ ) {
            if( csvTable[i].length < 7 ) continue; // bad row

            var date = csvTable[i][headers.date.col];

            if( !date ) continue; // bad row

            if( date.split('-').length == 3 ) date = date.split("-").splice(0,2).join("-");
            data[date] = {};

            for( var key in headers ) {
                if( key == 'date' ) continue;

                data[date][key] = parseFloat(csvTable[i][headers[key].col]);
            }
        }
  }

  function updateProgress(evt) {
    // evt is an ProgressEvent.
    if (evt.lengthComputable) {
        var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
        ele.find('.progress-bar').attr('aria-valuenow',percentLoaded).width(percentLoaded+"%");
        ele.find('.sr-only').html(Math.ceil(percentLoaded)+'% Complete');
    }
}

  function errorHandler(evt) {
    switch(evt.target.error.code) {
      case evt.target.error.NOT_FOUND_ERR:
        setError('File Not Found!');
        break;
      case evt.target.error.NOT_READABLE_ERR:
        setError('File is not readable');
        break;
      case evt.target.error.ABORT_ERR:
        break; // noop
      default:
        setError('An error occurred reading this file.');
    };
  }

  function setError(msg) {
      ele.find('.status').html('<div class="alert alert-danger">'+msg+'</div>');
  }

  return {
    init : init,
    initFromUrl : initFromUrl
  };

};

module.exports = {
  init : init
};

},{"./app":1}],13:[function(require,module,exports){
var io = require('./lib/io');
var run = require('./lib/run')(io);


module.exports = run;

},{"./lib/io":32,"./lib/run":33}],14:[function(require,module,exports){
module.exports = {
    description: "These are constants.",
    value: {
        days_per_month: {
            value: 30.4,
            units: "days/mo",
            description: "Number of Days in an average month"
        },
        e20: {
            value: 2.2,
            units: "vp/t",
            description: "Rate of change of saturated VP with T at 20C"
        },
        rhoAir: {
            value: 1.2,
            units: "kg/m^3",
            description: "Density of air"
        },
        lambda: {
            value: 2460000,
            units: "J/kg",
            description: "Latent heat of vapourisation of h2o"
        },
        VPDconv: {
            value: 0.000622,
            units: "",
            description: "Convert VPD to saturation deficit = 18/29/1000"
        },
        Qa: {
            value: -90,
            units: "W/m^2",
            description: "Intercept of net radiation versus solar radiation relationship"
        },
        Qb: {
            value: 0.8,
            units: "unitless",
            description: "slope of net vs. solar radiation relationship"
        },
        gDM_mol: {
            value: 24,
            units: "g/mol(C)",
            description: "Molecular weight of dry matter"
        },
        molPAR_MJ: {
            value: 2.3,
            units: "mol(C)/MJ",
            description: "Conversion of solar radiation to PAR"
        }
    }
};

},{}],15:[function(require,module,exports){
module.exports = {
  tree : require('./tree'),
  plantation : require('./plantation'),
  plantation_state : require('./plantation_state'),
  soil : require('./soil'),
  weather : require('./weather'),
  manage : require('./manage'),
  constats : require('./constants')
};

},{"./constants":14,"./manage":16,"./plantation":17,"./plantation_state":18,"./soil":19,"./tree":23,"./weather":30}],16:[function(require,module,exports){
module.exports = {
  description : "Crop Management Parameters",
  value : {
    irrigFrac : {
      value : 1,
      units : "",
      description : "Irrigation fraction: 1 = fully irrigated, 0 = no irrigation. Any values between 0 and 1 are acceptable"
    },
    fertility : {
      value : 0.7,
      units : "",
      description : "Soil fertility"
    },
    DatePlanted : {
        value : "_date_",
        units : "date",
        description : "Date the crop was planted"
    },
    DateCoppiced : {
        value : "_date_",
        units : "date",
        description : "Date of the first coppice"
    },
    CoppiceInterval : {
        value : 3,
        units : "Years",
        description : "How after the crop is coppiced after the first coppice"
    },
    DateFinalHarvest : {
        value : "_date_",
        units : "date",
        description : "Date when the crop is completely harvested"
    }
  }
};

},{}],17:[function(require,module,exports){
module.exports = {
    description: "Greenwood PG Values (default)",
    value: {
        type: {
            value: "",
            description: ""
        },
        StockingDensity: {
            value: 3587,
            units: "Trees/hectar",
            description: "Number of trees planted per hectar"
        },
        SeedlingMass: {
            value: 0.0004,
            units: "kG",
            description: "Mass of the seedling"
        },
        pS: {
            value: 0.1,
            units: "unitless",
            description: "Proportion of seedling mass going into stem"
        },
        pF: {
            value: 0,
            units: "unitless",
            description: "Proportion of seedling mass going into foliage"
        },
        pR: {
            value: 0.9,
            units: "unitless",
            description: "Proportion of seedling mass going into root"
        }
    }
};

},{}],18:[function(require,module,exports){
module.exports = {
    description: "Plantation state class, containing all intemediate values at every timestep of the model",
    value: {
        feedstockHarvest: {
            value: -1,
            units: "",
            description: ""
        },
        coppiceCount: {
            value: -1,
            units: "",
            description: ""
        },
        coppiceAge: {
            value: -1,
            units: "month",
            description: "Age of tree at the time of coppice"
        },
        VPD: {
            value: -1,
            units:"kPA",
            description:"Mean vapor pressure deficit"
        },
        fVPD: {
            value: -1,
            units : "unitless",
            description:"Vapor Pressure Deficit Modifier (Poplar)"
        },
        fT: {
            value: -1,
            units:"unitless",
            description:"Temperature modifier"
        },
        fFrost: {
            value: -1,
            units : "unitless",
            description : "Number of Freeze Days Modifier"
        },
        fNutr: {
            value: -1,
            units:"unitless",
            description:"Nutritional Fraction, might be based on soil and fertilizer at some point"
        },
        fSW: {
            value: -1,
            units: "",
            description: "Soil water modifier"
        },
        fAge: {
            value: -1,
            units: "",
            description: ""
        },
        PAR: {
            value: -1,
            units:"mols",
            description:"Monthly PAR in mols / m^2 month"
        },
        xPP: {
            value: -1,
            units: "metric tons Dry Matter/ha",
            description: "maximum potential Primary Production"
        },
        Intcptn: {
            value: -1,
            units: "unitless",
            description: "Canopy rainfall interception"
        },
        ASW: {
            value: -1,
            units: "mm",
            description: "Available soil water"
        },
        CumIrrig: {
            value: -1,
            units: "mm",
            description: "Cumulative irrigation"
        },
        Irrig: {
            value: -1,
            units: "mm/mon",
            description: "Required irrigation"
        },
        StandAge: {
            value: -1,
            units: "month",
            description: "Age of the tree"
        },
        LAI: {
            value: -1,
            units: "",
            description: "Leaf area index"
        },
        CanCond: {
            value: -1,
            units: "",
            description: "Canopy conductance"
        },
        Transp: {
            value: -1,
            units: "mm/mon",
            description: "Canopy monthly transpiration"
        },
        PhysMod: {
            value: -1,
            units: "unitless",
            description: "Physiological Modifier to conductance and APARu"
        },
        pfs: {
            value: -1,
            units: "",
            description: "Ratio of foliage to stem partitioning"
        },
        pR: {
            value: -1,
            units: "",
            description: ""
        },
        pS: {
            value: -1,
            units: "",
            description: ""
        },
        pF: {
            value: -1,
            units: "",
            description: ""
        },
        litterfall: {
            value: -1,
            units: "",
            description: ""
        },
        NPP: {
            value: -1,
            units: "metric tons Dry Matter/ha",
            description: "Net Primary Productivity"
        },
        RootP: {
            value: -1,
            units: "",
            description: "Root productivity"
        },
        dW: {
            value: -1,
            units: "",
            description: ""
        },
        WF: {
            value: -1,
            units: "bdt/ha",
            description: "Foliage yield"
        },
        WR: {
            value: -1,
            units: "bdt/ha",
            description: "Root yield"
        },
        WS: {
            value: -1,
            units: "bdt/ha",
            description: "Stem yield"
        },
        W: {
            value: -1,
            units: "bdt/ha",
            description: "Total yield: root + stem + foliage"
        }
    }
};

},{}],19:[function(require,module,exports){
module.exports = {
    description: "Soil information based on current location",
    value: {
        maxaws: {
            value: -1,
            units: "",
            description: "Maximum available soil water"
        },
        swpower: {
            value: -1,
            units: "",
            description: "power parameter based on clay content of soil"
        },
        swconst: {
            value: -1,
            units: "",
            description: "constant parameter based on clay content of soil"
        }
    }
};

},{}],20:[function(require,module,exports){
module.exports = {
    units: "[gc m/s]?",
    description: "Along with a Physiological modifer, specifies the canopy conductance.  Used in calculation of transpiration",
    value: {
        mn: {
            description: "Minimum value, when lai=0",
            value: 0.0001
        },
        mx: {
            description: "Maximum value",
            value: 0.02
        },
        lai: {
            units: "[m^2/m^2]",
            description: "Leaf Area Index where parameter reaches a maximum value.",
            value: 2.6
        }
    }
};

},{}],21:[function(require,module,exports){
module.exports = {
    units: "fraction",
    description: "Specifies the growth limiter as a function of the tree age.  This is a time dependancy parameter.  The graph of the function is available at: https://www.desmos.com/calculator/wa0q2ih18h",
    value: {
        f0: {
            description: "Value at Initial Time",
            value: 1
        },
        f1: {
            description: "Value at Infinite Time",
            value: 0
        },
        tm: {
            units: "[y]",
            description: "Time in years where value is the average of f0 and f1",
            value: 47.5
        },
        n: {
            description: "n>=1; Parameter specifing the rate of change around tm.  n=1 is approximately a linear change, as n increases, change becomes more localized around tm.",
            value: 3.5
        }
    }
};

},{}],22:[function(require,module,exports){
module.exports = {
    description: "Specifies the parameters affecting temperature modifier, fT. A graph of how these parameters affect the temperature modifier is found here: https://www.desmos.com/calculator/69iwqtnl28",
    value: {
        mn: {
            units: "[C]",
            description: "Specifies the minimum temperature of respiration",
            value: 0
        },
        opt: {
            units: "[C]",
            description: "Specifies the optimum temperature of respiration",
            value: 20
        },
        mx: {
            units: "[C]",
            description: "Specifies the maximum temperature of respiration",
            value: 50
        }
    }
};

},{}],23:[function(require,module,exports){
module.exports = {
    description: "These specify growth parameters specific to the species of tree.",
    value : {
        k: {
            units: "unitless",
            description: "Radiation Extinction Coefficient.",
            value: 0.5
        },
        fullCanAge: {
            units: "[y]",
            description: "Year where tree reaches full Canopy Cover.",
            value: 1.5
        },
        kG: {
            units: "[kPA^-1]",
            description: "Determines the response of the canopy conductance to the vapor pressure deficit.",
            value: 0.5
        },
        alpha: {
            units: "[kg/mol ?]",
            description: "Canopy quantum efficiency.",
            value: 0.08
        },
        fT : require('./ft'),
        BLcond: {
            units: "[]",
            description: "Canopy boundary layer conductance. Used in the calcuation of transpiration",
            value: 0.04
        },
        fAge: require('./fage'),
        fN0: {
            units: "fraction",
            description: "Used in the calculation of the nutritional modifier,fNutr.  fNutr ranges from [fNO,1) based on the fertility index which ranges from 0 to 1.  When fN0=1 indicates fNutr is 1",
            value: 0.26
        },
        SLA: require('./sla'),
        //CheckUnitsChangetolinearFunction
        Conductance: require('./conductance'),
        Intcptn: require('./intcptn'),
        y: {
            description: "Assimilation use efficiency.  Used in calculation of the NPP.",
            value: 0.47
        },
        pfs: require('./pfs'),
        pR: require('./pr'),
        rootP: require('./rootp'),
        litterfall: require('./litterfall')
    }
};

},{"./conductance":20,"./fage":21,"./ft":22,"./intcptn":24,"./litterfall":25,"./pfs":26,"./pr":27,"./rootp":28,"./sla":29}],24:[function(require,module,exports){
module.exports = {
    units: "fraction",
    description: "Rainfall interception fraction.  A linear function w.r.t. LAI",
    value: {
        mn: {
            description: "Minimum value, when lai=0",
            value: 0
        },
        mx: {
            description: "Maximum value",
            value: 0.24
        },
        lai: {
            units: "[m^2/m^2]",
            description: "Leaf Area Index where parameter reaches a maximum value.",
            value: 7.3
        }
    }
};

},{}],25:[function(require,module,exports){
module.exports = {
    units: "fraction",
    description: "Specifies the fractional monthly loss of foliage. This is a time dependany parameter.  The graph of the function is available at: https://www.desmos.com/calculator/6iq9ppdqs7",
    value: {
        f0: {
            description: "Value at Initial Time",
            value: 0.0015
        },
        f1: {
            description: "Value at Infinite Time",
            value: 0.03
        },
        tm: {
            units: "[y]",
            description: "Time in years where value is the average of f0 and f1",
            value: 2
        },
        n: {
            description: "n>=1; Parameter specifing the rate of change around tm.  n=1 is approximately a linear change, as n increases, change becomes more localized around tm.",
            value: 2.5
        }
    }
};

},{}],26:[function(require,module,exports){
module.exports = {
    units: "fraction",
    description: "This defines the foliage to stem (WF/WS) fraction in allocating aboveground biomass of the tree. This is calculated with a pair of allometric power equations.  The first relates basal diameter, (DOB) to total woody biomass, while the second relates DOB to pfs.  The parameterization of the relationship between DOB and woody biomass is inverted to determine the DOB from the modeled woody fraction.  This relation is plotted at: .  The model allocates the appropriate fraction of wood based on the Stocking density of the plantation. DOB rather than DBH is used for comparison of trees with a high stemCnt and rapid coppicing value.",
    value: {
        stemCnt: {
            description: "Average number of stems per stump",
            value: 2.8
        },
        stemC: {
            units: "[cm^-1]",
            description: "Constant in relation of DOB to woody biomass",
            value: 0.18
        },
        stemP: {
            description: "Power in relation of DOB to woody biomass.",
            value: 2.4
        },
        pfsMx: {
            description: "Maximum possible pfs value allowed",
            value: 2
        },
        pfsP: {
            description: "Power in relation of DBO to pfs",
            value: -0.772
        },
        pfsC: {
            units: "[cm^-1]",
            description: "Constant in relation of DOB to pfs.",
            value: 1.3
        }
    }
};

},{}],27:[function(require,module,exports){
module.exports = {
    units: "fraction",
    description: "Along with a Physiologial parameter, specifies the amount of new growth allocated to the root system, and the turnover rate.",
    value: {
        mn: {
            description: "Minimum allocation to the root, when the physiologal parameter is 1.",
            value: 0.17
        },
        mx: {
            description: "Maximum allocation to the root, when m0.",
            value: 0.7
        },
        m0: {
            description: "Dependance on the fertility index. 0 indicates full dependance on fertility, 1 indicates a constant allocation, independant of fertility",
            value: 0.5
        },
        turnover: {
            units: "[month^-1]",
            description: "Specifies the monthly root turnover rate.",
            value: 0.02
        }
    }
};

},{}],28:[function(require,module,exports){
module.exports = {
    description: "These parameters specify root allocation to growth after coppicing.",
    value : {
      frac: {
          units: "[month^1]",
          description: "Specifies the fractional amount of root biomass that exceeds the aboveground requirements that can be supplied in a given month.",
          value: 0.2
      },
      LAITarget: {
          units: "[m^2/m^2]",
          description: "Specifies a target LAI rate.  The Target LAI is included in the calculation of a target NPP, based on weather paramaters.  Below this target, the roots will contribute biomass if the below ground root mass exceeds the requirements of the aboveground biomass. The target is specified in LAI to time root contributions to periods of growth",
          value: 10
      },
      efficiency: {
          units: "[kg/kg]",
          description: "Specifies the efficiency in converting root biomass into aboveground biomass.",
          value: 0.7
      }
    }
};

},{}],29:[function(require,module,exports){
module.exports = {
    units: "[m^2/kg]",
    description: "Specifies the Specific Leaf Area as a function of the tree age.  This is a time dependancy parameter.  Used in the calculation of LAI.  The graph of the function is available at: https://www.desmos.com/calculator/wa0q2ih18h",
    value: {
        f0: {
            description: "Value at Initial Time",
            value: 19
        },
        f1: {
            description: "Value at Infinite Time",
            value: 10.8
        },
        tm: {
            units: "[y]",
            description: "Time in years where value is the average of f0 and f1",
            value: 5
        },
        n: {
            description: "n>=1; Parameter specifing the rate of change around tm.  n=1 is approximately a linear change, as n increases, change becomes more localized around tm.",
            value: 2
        }
    }
};

},{}],30:[function(require,module,exports){
module.exports = {
    month: {
        value: -1,
        units: "unitless",
        description: "The month number since planting"
    },
    tmin: {
        value: -1,
        units: "Celcius",
        description: "Minimum temperature for growth"
    },
    tmax: {
        value: -1,
        units: "Celcius",
        description: "Maximum temperature for growth"
    },
    tdmean: {
        value: -1,
        units: "Celcius",
        description: "Dew point temperature"
    },
    ppt: {
        value: -1,
        units: "",
        description: "Precipitation"
    },
    rad: {
        value: -1,
        units: "",
        description: "Solar radiation"
    },
    nrel: {
        value: -1,
        units: "",
        description: ""
    },
    daylight: {
        value: -1,
        units: "",
        description: ""
    }
};

},{}],31:[function(require,module,exports){
/**

@module 3PG Module
**/


/**
Class for all the functions that run in a single step of the model

@class module.exports
**/


/**
list of constants used for computations

@attribute constant
**/
var constants = {
  days_per_month:{
      value:30.4,
      units:"days/mo",
      description:"Number of Days in an average month"
  },
  e20:{
      value:2.2,
      units:"vp/t",
      description:"Rate of change of saturated VP with T at 20C"
  },
  rhoAir:{
      value:1.2,
      units:"kg/m^3",
      description:"Density of air"
  },
  lambda:{
      value:2460000,
      units:"J/kg",
      description:"Latent heat of vapourisation of h2o"
  },
  VPDconv:{
      value:0.000622,
      units:"?",
      description:"Convert VPD to saturation deficit = 18/29/1000"
  },
  Qa:{
      value:-90,
      units:"W/m^2",
      description:"Intercept of net radiation versus solar radiation relationship"
  },
  Qb:{
      value:0.8,
      units:"unitless",
      description:"slope of net vs. solar radiation relationship"
  },
  gDM_mol:{
      value:24,
      units:"g/mol(C)",
      description:"Molecular weight of dry matter"
  },
  molPAR_MJ:{
      value:2.3,
      units:"mol(C)/MJ",
      description:"Conversion of solar radiation to PAR"
  }
};

module.exports.constant = constant;
function constant(c) {
    return constants[c].value;
}

/**
Time Dependant Attribute,
units='various',
description='This function creates a time dependant function that decays
(or rises from f0 to f1.  The value (f0+f1)/2 is reached at tm,
and the slope of the line at tm is given by p.
@method tdp
@param x
@param f
**/
module.exports.tdp = function(x,f) {
  var p=f.f1 + (f.f0-f.f1)*Math.exp(-Math.log(2)*Math.pow((x/f.tm),f.n));
  return p;
}

/**
@method lin
@param x
@param p
*/
module.exports.lin = function(x, p){
  if( x < 0 ) {
    return p.mn;
  }
  if( x > p.xmax ) {
    return p.xmax;
  }
  return p.mn + (p.mx-p.mn)*(x/p.xmax);
};

/**
units='unitless',
description='Canopy Rainfall interception'
@method Intcptn
@param cur_LAI
@param c
*/
module.exports.Intcptn = function(cur_LAI, c){
  return Math.max(c.mn,c.mn + (c.mx - c.mn) * Math.min(1 , cur_LAI / c.lai));
};

/**
units='mm',
description='Available Soil Water'
@method ASW
@param maxASW
@param prev_ASW
@param date_ppt
@param cur_Transp
@param cur_Intcptn
@param cur_Irrig
*/
module.exports.ASW = function(maxASW, prev_ASW, date_ppt, cur_Transp, cur_Intcptn, cur_Irrig){
  return Math.min(maxASW*10, Math.max(prev_ASW + date_ppt - (cur_Transp + cur_Intcptn * date_ppt) + cur_Irrig, 0));
};

//TODO: double check the appropriate use of tdmean (dew point temp)
//TODO: take constants out
/**
units='kPA',
description='Mean vapor pressure deficit'
@method VPD
@param date_tmin
@param date_tmax
@param date_tdmean
*/
module.exports.VPD = function(date_tmin, date_tmax, date_tdmean){
  return (0.6108 / 2 * (Math.exp(date_tmin * 17.27 / (date_tmin + 237.3) ) + Math.exp(date_tmax * 17.27 / (date_tmax + 237.3) ) ) ) - (0.6108 * Math.exp(date_tdmean * 17.27 / (date_tdmean + 237.3) ) );
};


/**
units = unitless,
description='Vapor Pressure Deficit Modifier (Poplar)'
@method fVPD
@param kG
@param cur_VPD
*/
module.exports.fVPD = function(kG, cur_VPD){
  return Math.exp(-1 * kG * cur_VPD);
};

//TODO: take constants out
// make a meaningful tempvar name
/**
units = unitless,
description = 'Number of Freeze Days Modifier'
@method fFrost
@param date_tmin
*/
module.exports.fFrost = function(date_tmin) {
  var tempVar = -1.0;

  if( date_tmin >= 0 ){
    tempVar = 1.0;
  } //else -1.0

  return 0.5 * (1.0 + tempVar * Math.sqrt(1 - Math.exp(-1 * Math.pow((0.17 * date_tmin) , 2) * (4 / 3.14159 + 0.14 * Math.pow( (0.17 * date_tmin) , 2) ) / (1 + 0.14 * Math.pow((0.17 * date_tmin) , 2) ) ) ) );
};

//TODO - better naming?: tmin, tmax = weather Topt, Tmax, Tmin = tree params
/**
units=unitless,
description='Temperature modifier'
@method fT
@param tavg
@param fT
*/
module.exports.fT = function(tavg, fT){
  var f;
  if(tavg <= fT.mn || tavg >= fT.mx){
    f = 0;
  } else {
    f = ( (tavg - fT.mn) / (fT.opt - fT.mn) )  *
           Math.pow ( ( (fT.mx - tavg) / (fT.mx - fT.opt) ),
                      ( (fT.mx - fT.opt) / (fT.opt - fT.mn) )
                    );
  }
  return(f);
}

/**
units='mm/mon',
description='Required Irrigation'
@method Irrig
@param irrigFrac
@param cur_Transp
@param cur_Intcptn
@param date_ppt
*/
module.exports.Irrig = function(irrigFrac, cur_Transp, cur_Intcptn, date_ppt){
    return Math.max(0 , irrigFrac * (cur_Transp - (1 - cur_Intcptn) * date_ppt) );
};

//TODO: get units and description
/**
@method fSW
@param ASW
@param maxAWS
@param swconst
@param swpower
*/
module.exports.fSW = function(ASW, maxAWS, swconst, swpower) {
  var fSW;
  if(swconst == 0 || maxAWS == 0) {
    fSW = 0;
  } else {
    var omr = 1 - (ASW/10)/maxAWS; // One Minus Ratio

    if(omr < 0.001) {
      fSW = 1;
    } else {
      fSW = (1-Math.pow(omr,swpower))/(1+Math.pow(omr/swconst,swpower));
    }
  }
  return fSW;
};

/**
units='unitless',
description='Nutritional Fraction, might be based on soil and fertilizer at some point'
@method fNutr
@param fN0
@param FR
*/
module.exports.fNutr = function(fN0, FR){
  return fN0 + (1 - fN0) * FR;
};

/**
TODO: why $3 in makefile - ask about it
units=unitless
description='Physiological Modifier to conductance and APARu'
@method PhysMod
@param cur_fVPD
@param cur_fSW
@param cur_fAge
*/
module.exports.PhysMod = function(cur_fVPD, cur_fSW, cur_fAge){
   return Math.min(cur_fVPD , cur_fSW) * cur_fAge;
};

/**
units='gc,m/s',
description='Canopy Conductance'
@method CanCond
@param PhysMod
@param LAI
@param cond
*/
module.exports.CanCond = function(PhysMod, LAI, cond){
   return Math.max(cond.mn , cond.mx * PhysMod * Math.min(1 , LAI / cond.lai) );
};

/**
units='mm/mon' which is also kg/m2/mon
description='Canopy Monthly Transpiration'
@method Transp
@param date_nrel
@param date_daylight
@param cur_VPD
@param BLcond
@param cur_CanCond
@param days_per_month
*/
module.exports.Transp = function(date_nrel, date_daylight, cur_VPD, BLcond, cur_CanCond, days_per_month){
  var VPDconv = constant('VPDconv');
  var lambda = constant('lambda');
  var rhoAir = constant('rhoAir');
  var e20 = constant('e20');
  var Qa = constant('Qa');
  var Qb = constant('Qb');
  var days_per_month = typeof days_per_month !== 'undefined' ? days_per_month : constant('days_per_month');

  // date_daylight = hours
  // nrel is in MJ/m^2/day convert to Wh/m^2/day
  var netRad = Qa + Qb * ((date_nrel * 277.778) / date_daylight);
  var defTerm = rhoAir * lambda * VPDconv * cur_VPD * BLcond;
  var div = 1 + e20 + BLcond / cur_CanCond;
  // Convert daylight to secs.
  var Transp=  days_per_month * ( (e20 * netRad + defTerm ) / div ) * date_daylight * 3600 / lambda;

  return Transp;
};

//TODO: description
/**
units='metric tons Dry Matter/ha',
@method NPP
@param prev_StandAge
@param fullCanAge
@param xPP
@param k
@param prev_LAI
@param fVPD
@param fSW
@param fAge
@param alpha
@param fNutr
@param fT
@param fFrost
*/
module.exports.NPP = function(prev_StandAge, fullCanAge, xPP, k, prev_LAI, fVPD, fSW, fAge, alpha, fNutr, fT, fFrost){
  var CanCover = 1;
  if( prev_StandAge < fullCanAge ){
    CanCover = prev_StandAge / fullCanAge;
  }

  return xPP * (1 - (Math.exp(-k * prev_LAI) ) ) * CanCover * Math.min(fVPD , fSW) * fAge * alpha * fNutr * fT * fFrost;
};

//TODO: units and description
/**
@method pR
@param cur_PhysMod
@param cur_pR
@param FR
@param pR
*/
module.exports.pR = function(cur_PhysMod, cur_pR,FR,pR){
  var p =(pR.mx * pR.mn) /
         (pR.mn + (pR.mx - pR.mn) * cur_PhysMod * (pR.m0 + (1 - pR.m0) * FR) );

  // This was added by quinn to limit root growth.
  return p * Math.pow(p/cur_pR,2);
}


//TODO: mols or mols per m^2?
/**
units=mols
description='Monthly PAR in mols / m^2 month'
molPAR_MJ [mol/MJ] is a constant Conversion of solar radiation to PAR
@method PAR
@param date_rad
@param molPAR_MJ
*/
module.exports.PAR = function(date_rad, molPAR_MJ){
  var molPAR_MJ = typeof molPAR_MJ !== 'undefined' ?
                    molPAR_MJ : constant('molPAR_MJ');

  return date_rad * constant('days_per_month') * molPAR_MJ;
}

/**
units='metric tons Dry Matter/ha',
description='maximum potential Primary Production [tDM / ha month],
NOTE: 10000/10^6 [ha/m2][tDm/gDM]
gGM_mol [g/mol] is the molecular weight of dry matter
@method xPP
@param y
@param cur_PAR
@param gDM_mol
*/
module.exports.xPP = function(y, cur_PAR, gDM_mol){
    gDM_mol = typeof gDM_mol !== 'undefined' ?
    gDM_mol : constant('gDM_mol');
    return y * cur_PAR * gDM_mol / 100;
}

/*** FUNCTIONS FOR COPPICING */
/**
coppice related functions
@method coppice
*/
module.exports.coppice = {
  // Coppice Functions are based on Diameter on Stump, NOT DBH.
  // Calculates the pfs based on the stem weight in KG
  pfs : function(stem, p) {
    var avDOB = Math.pow( ( stem / p.stemCnt / p.stemC) , (1 / p.stemP) );
    var ppfs= p.pfsC * Math.pow(avDOB , p.pfsP);

    return Math.min(p.pfsMx,ppfs);
  },

  // Calculates the pfs based on stem with in G.  Uses volume Index as guide
  pfs_via_VI : function (stemG, wsVI, laVI, SLA) {
    if (stemG < 10) {
      stemG=10;
    }
    var VI = Math.pow( (stemG / wsVI.stems_per_stump / wsVI.constant),(1 / wsVI.power) );

    // Add up for all stems
    var la = laVI.constant * Math.pow(VI,laVI.power) * wsVI.stems_per_stump;
    var wf = 1000 * (la / SLA);  // Foilage Weight in g;
    var pfs = wf/stemG;
    return pfs;
  },

  RootP : function(cur_npp, cur_nppTarget, WR,W,pRx,frac) {
    var nppRes = cur_nppTarget - cur_npp;
    var rootPP;
    if( nppRes > 0 && WR/W > pRx ) {
        rootPP = Math.min(nppRes, WR*(WR/W - pRx)*frac);
    } else {
      rootPP = 0;
    }

    return rootPP;
  }
};

},{}],32:[function(require,module,exports){
module.exports = {
  read : function(model) {
    // TODO : implement
    // You need to set your IO here and make sure all parameters for model are correctly set
  },
  dump : function() {
    // TODO : implement
  }
};

},{}],33:[function(require,module,exports){
var fn = require('./fn');
var utils = require('./utils');
var dataModel = require('./dataModel');

function run(lengthOfGrowth) {

    var yearToCoppice; //year of the first or subsequent harvests
    var coppiceInterval; //the # of months in a single coppice cycle
    var monthToCoppice; //at which month the harvest is to be performed :: currently the tree will be cut at the beginning of that month

    //Read the input parameters into object 2 functions can be combined into 1.
    //var plantation = {};

    //this.io.readAllConstants(plantation); //both tree constants and plantation/management constants


    this.io.read(this);
    //this.io.readWeather(weatherMap, plantingParams, customWeatherMap); //at this point weather map is a map of weather json objects, indexed at month 0
    //also reads in the manage stuff (date coppice, etc) and soil parameters.

    this.currentDate = this.plantingParams["datePlanted"];

    var plantedMonth = this.currentDate.getMonth();
    var currentMonth = this.currentDate.getMonth();


    //TODO: test no datecoppice as input
    if ( this.plantingParams["dateCoppiced"] != undefined ){
      yearToCoppice = this.plantingParams["dateCoppiced"].getYear();
      monthToCoppice = this.plantingParams["dateCoppiced"].getMonth();
      coppiceInterval = this.plantingParams["yearsPerCoppice"];
      willCoppice = true;
    }

    this.manage.coppice = false;

    var step = 0;

    var setup = {
      lengthOfGrowth : lengthOfGrowth,
      step : 0,
      plantedMonth : plantedMonth,
      currentDate : this.currentDate,
      currentMonth : currentMonth,
      yearToCoppice : yearToCoppice,
      monthToCoppice : monthToCoppice,
      coppiceInterval : coppiceInterval
    }

    this.runSetup(setup);
}

function runSetup(setup){
    var m = (setup.currentMonth+1)+'';
    if( m.length == 1 ) m = '0'+m;

    var weatherThisMonth;
    if( this.custom_weather[setup.currentDate.getFullYear()+'-'+m] ) {
    	weatherThisMonth = this.custom_weather[setup.currentDate.getFullYear()+'-'+m];
    } else {
    	weatherThisMonth = this.weather[setup.currentMonth];
    }

    var firstMonthResults = this.init(this.plantation, this.soil);

    var keysInOrder=[];
    for (var key in this.plantation_state){
      keysInOrder.push(key);
    }

    firstMonthResults.Date = (setup.currentDate.getMonth()+1) + "/" + setup.currentDate.getYear();

    var rows = []; //these will become rows

    utils.log("Results of the first month: " +firstMonthResults);

    rows.push(keysInOrder);

    var firstRow = [];
    for (var i = 0; i < keysInOrder.length; i++){
      var key = keysInOrder[i];
      utils.log(key  + ": " + firstMonthResults[key]);
      firstRow.push(firstMonthResults[key]);
    }

    rows.push(firstRow);

    var currentMonthResults = firstMonthResults;
    var nextMonthResults;

    for (var step = 1; step < setup.lengthOfGrowth; step++) {
      setup.currentDate.setMonth(setup.currentDate.getMonth() + 1); // add a month to current date

      utils.log("currentDate = " + setup.currentDate);
      setup.currentMonth = setup.currentDate.getMonth();

      //TODO: figure out willCoppice functionality
      if (setup.currentDate.getYear() == setup.yearToCoppice && setup.currentMonth == setup.monthToCoppice){
        utils.log("Time to Coppice!");
        this.manage.coppice = true;
        //TODO: update trees


        setup.yearToCoppice = setup.yearToCoppice + setup.coppiceInterval; //next coppice year

        rows.push(keysInOrder);
      } else {
        this.manage.coppice = false;
      }

      m = (setup.currentMonth+1)+'';
      if( m.length == 1 ) {
        m = '0'+m;
      }

      var weatherThisMonth;
	    if( this.custom_weather[setup.currentDate.getFullYear()+'-'+m] ) {
	    	weatherThisMonth = this.custom_weather[setup.currentDate.getFullYear()+'-'+m];
	    } else {
	    	weatherThisMonth = this.weather[setup.currentMonth];
	    }

      nextMonthResults = singleStep(this.plantation, this.soil, weatherThisMonth, this.manage, currentMonthResults); //TODO: switch up trees here when after the first harvest

      nextMonthResults.Date = (setup.currentDate.getMonth()+1)  + "/" + setup.currentDate.getYear();
      utils.log("\n Results of the next month: " + nextMonthResults);

      var thisRow = [];
      for (var i = 0; i < keysInOrder.length; i++) {
        var key = keysInOrder[i];
        utils.log( key  + ": " + nextMonthResults[key]);
        thisRow.push(nextMonthResults[key]);
      }

      currentMonthResults = nextMonthResults;
      rows.push(thisRow);
    }

    this.io.dump(rows);

    return rows;
}

function singleStep(plantation, soil, weather, manage, p) { //p = previous state
  var c = {}; //current state

  if( manage.coppice === true ) { //change this guy for the month when coppice
    // Add in a stump margin....
    c.feedstockHarvest = p.feedstockHarvest + p.WS;
    c.coppiceCount = p.coppiceCount + 1;
    c.coppiceAge = 0;
    p.LAI=0;
    p.WS = 0;
    p.WF = 0;
    p.W = p.WR;
  } else {
    c.feedstockHarvest = p.feedstockHarvest;
    c.coppiceCount = p.coppiceCount;
    c.coppiceAge = p.coppiceAge + 1.0/12;
  }

  var tree; //tree
  if( c.coppiceCount === 0 ) { //TODO: check the case where we start with a coppiced multi stump tree
      tree = plantation.seedlingTree;
  } else {
      tree = plantation.coppicedTree;
  }

  c.StandAge = p.StandAge+1.0/12;
  var sla = fn.tdp(p.StandAge,tree.SLA);
  c.LAI = p.WF * 0.1 * sla; // Landsburg eq 9.5
  c.VPD = fn.VPD(weather.tmin, weather.tmax, weather.tdmean);
  c.fVPD = fn.fVPD(tree.kG, c.VPD);

  c.fSW = fn.fSW(p.ASW, soil.maxAWS, soil.swconst, soil.swpower);
  c.fAge=fn.tdp(p.StandAge,tree.fAge);
  c.fFrost = fn.fFrost(weather.tmin);
  c.PAR = fn.PAR(weather.rad);
  c.fT = fn.fT((weather.tmin+weather.tmax)/2, tree.fT);
  c.xPP = fn.xPP(tree.y, c.PAR);
  c.PhysMod = fn.PhysMod(c.fVPD, c.fSW, c.fAge);
  c.fNutr=fn.fNutr(tree.fN0, manage.fertility);
  c.NPP = fn.NPP(p.coppiceAge, tree.fullCanAge, c.xPP, tree.k, p.LAI, c.fVPD, c.fSW, c.fAge, tree.alpha, c.fNutr, c.fT, c.fFrost);

  var NPP_target = fn.NPP(tree.fullCanAge, tree.fullCanAge, c.xPP, tree.k, tree.rootP.LAITarget, c.fVPD, c.fSW, c.fAge, tree.alpha, c.fNutr, c.fT, c.fFrost);
  c.RootP = fn.coppice.RootP(c.NPP, NPP_target, p.WR, p.W, tree.pR.mx,tree.rootP.frac);

  if (tree.laVI && tree.laVI.constant ) { // Test for that function
    c.pfs = fn.coppice.pfs_via_VI(p.WS*1000000/plantation.StockingDensity, tree.wsVI,tree.laVI,sla);
  } else {
    c.pfs = fn.coppice.pfs(p.WS*1000/plantation.StockingDensity, tree.pfs);
  }

  c.dW = c.NPP+tree.rootP.efficiency*c.RootP;

  c.Intcptn = fn.Intcptn(c.LAI, tree.Intcptn);
  c.CanCond = fn.CanCond(c.PhysMod, c.LAI, tree.Conductance);

  c.pR = fn.pR(c.PhysMod,p.WR/p.W,manage.fertility,tree.pR);
  c.litterfall=fn.tdp(p.StandAge,tree.litterfall);

  c.Transp = fn.Transp(weather.rad, weather.daylight, c.VPD, tree.BLcond, c.CanCond);

  // Calculated from pfs
  c.pS = (1 - c.pR) / (1 + c.pfs );
  c.pF = (1 - c.pR) / (1 + 1/c.pfs );

  c.Irrig = fn.Irrig(manage.irrigFrac, c.Transp, c.Intcptn, weather.ppt);
  c.CumIrrig = p.CumIrrig + c.Irrig;

  c.ASW = fn.ASW(soil.maxAWS, p.ASW, weather.ppt, c.Transp, c.Intcptn, c.Irrig); //for some reason spelled maxAWS

  c.WF = p.WF + c.dW * c.pF - c.litterfall * p.WF;
  // Include contribution of RootP // Error in old code !
  c.WR = p.WR + c.dW * c.pR - tree.pR.turnover * p.WR - c.RootP;
  c.WS = p.WS + c.dW * c.pS;
  c.W = c.WF+c.WR+c.WS;

  return c;
}

function init(plantation, soil) {
  var p = {};
  var tree = plantation.seedlingTree; //TODO: decide the case where we start with a coppiced tree?

  p.feedstockHarvest=0;
  p.coppiceCount=0;
  p.coppiceAge = 0;

  p.CumIrrig =0;
  p.dW = 0;
  p.W = this.plantation.StockingDensity * this.plantation.SeedlingMass;
  p.WF = this.plantation.pF * p.W
  p.WS = this.plantation.pS * p.W;
  p.WR = this.plantation.pR * p.W;
  p.ASW = 0.8 * 10 * this.soil.maxAWS; // The 10 is because maxAWS is in cm and ASW in mm (?) Why (?)
  p.StandAge = 0;

  var tree = this.plantation.seedlingTree;

  // sla = Specific Leaf Area
  var sla = fn.tdp(p.StandAge,tree.SLA);

  p.LAI = p.WF * 0.1 * sla; // Landsburg eq 9.5

  // These aren't used so can be set to anything;  They are set to match the postgres type
  p.VPD=0;
  p.fVPD=0;
  p.fT =0;
  p.fFrost = 0;
  p.fNutr=0;
  p.fSW=0;
  p.fAge=0;
  p.PAR = 0;
  p.xPP = 0;
  p.Intcptn = 0;
  p.Irrig = 0;
  p.CanCond = 0;
  p.Transp = 0;
  p.PhysMod = 0;
  p.pfs = 0;
  p.pR=0;
  p.pS=0;
  p.pF=0;
  p.litterfall = 0;
  p.NPP = 0;
  p.RootP = 0;
  return p;
};

function getFunction(name) {
  if( fn[name] ) return fn[name];
  if( fn.coppice[name] ) return fn.coppice[name];
  return null;
}

module.exports = function(io) {
  return {
    io : io,
    run : run,
    singleStep : singleStep,
    runSetup : runSetup,
    init : init,
    getFunction : getFunction,
    setIO : function(io) {
      this.io = io;
    },
    getDataModel : function() {
      return dataModel;
    }
  };
};

},{"./dataModel":15,"./fn":31,"./utils":34}],34:[function(require,module,exports){
function env() {
  if( typeof plv8 !== 'undefined' ) return "plv8";
  if( typeof Logger !== 'undefined' ) return "appscript";
  if( typeof module !== 'undefined' && module.exports) return "node";
}

function log(msg) {
  if( env() == "plv8" ) plv8.elog(NOTICE, 'notice', msg);
  if( env() == "appscript" ) Logger.log(msg);
}

function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

module.exports = {
  env : env,
  log : log,
  clone : clone
}

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc2xpYi9hcHAuanMiLCJqc2xpYi9jaGFydHMuanMiLCJqc2xpYi9leHBvcnQuanMiLCJqc2xpYi9mbGFzaEJsb2NrLWRldGVjdG9yLmpzIiwianNsaWIvZ2RyaXZlLmpzIiwianNsaWIvZ2RyaXZlUlQuanMiLCJqc2xpYi9pbnB1dEZvcm0uanMiLCJqc2xpYi9tb2RlbElPLmpzIiwianNsaWIvb2F1dGguanMiLCJqc2xpYi9vZmZsaW5lLmpzIiwianNsaWIvb3V0cHV0RGVmaW5pdGlvbnMuanMiLCJqc2xpYi93ZWF0aGVyRmlsZVJlYWRlci5qcyIsIm5vZGVfbW9kdWxlcy9wb3BsYXItM3BnLW1vZGVsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9jb25zdGFudHMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9tYW5hZ2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3BsYW50YXRpb24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3BsYW50YXRpb25fc3RhdGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3NvaWwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvY29uZHVjdGFuY2UuanMiLCJub2RlX21vZHVsZXMvcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvZmFnZS5qcyIsIm5vZGVfbW9kdWxlcy9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9mdC5qcyIsIm5vZGVfbW9kdWxlcy9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9pbnRjcHRuLmpzIiwibm9kZV9tb2R1bGVzL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2xpdHRlcmZhbGwuanMiLCJub2RlX21vZHVsZXMvcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvcGZzLmpzIiwibm9kZV9tb2R1bGVzL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL3ByLmpzIiwibm9kZV9tb2R1bGVzL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL3Jvb3RwLmpzIiwibm9kZV9tb2R1bGVzL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL3NsYS5qcyIsIm5vZGVfbW9kdWxlcy9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvd2VhdGhlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wb3BsYXItM3BnLW1vZGVsL2xpYi9mbi5qcyIsIm5vZGVfbW9kdWxlcy9wb3BsYXItM3BnLW1vZGVsL2xpYi9pby5qcyIsIm5vZGVfbW9kdWxlcy9wb3BsYXItM3BnLW1vZGVsL2xpYi9ydW4uanMiLCJub2RlX21vZHVsZXMvcG9wbGFyLTNwZy1tb2RlbC9saWIvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2ZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3orQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbFRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3piQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1WkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgZ2RyaXZlID0gcmVxdWlyZSgnLi9nZHJpdmUnKTtcbnZhciBjaGFydHM7XG52YXIgaW5wdXRGb3JtO1xudmFyIGV4cG9ydGVyID0gcmVxdWlyZSgnLi9leHBvcnQnKTtcbnZhciBvZmZsaW5lID0gcmVxdWlyZSgnLi9vZmZsaW5lJyk7XG5cbi8vIGltcG9ydCBtb2RlbCBzdHVmZlxudmFyIG1vZGVsID0gcmVxdWlyZSgncG9wbGFyLTNwZy1tb2RlbCcpO1xudmFyIG1vZGVsSU8gPSByZXF1aXJlKCcuL21vZGVsSU8nKTtcbm1vZGVsLnNldElPKG1vZGVsSU8pO1xuXG52YXIgcnVuQ2FsbGJhY2sgPSBudWxsO1xudmFyIF8zcGdNb2RlbCA9IG51bGw7XG5cbnZhciBpbnB1dHMgPSB7XG5cdHdlYXRoZXIgOiBbXCJtb250aFwiLFwidG1pblwiLFwidG1heFwiLFwidGRtZWFuXCIsXCJwcHRcIixcInJhZFwiLFwiZGF5bGlnaHRcIl1cbn07XG52YXIgb3V0cHV0cyA9IFtcIlZQRFwiLFwiZlZQRFwiLFwiZlRcIixcImZGcm9zdFwiLFwiUEFSXCIsXCJ4UFBcIixcIkludGNwdG5cIixcIkFTV1wiLFwiQ3VtSXJyaWdcIixcbiAgICAgICAgICAgXCJJcnJpZ1wiLFwiU3RhbmRBZ2VcIixcIkxBSVwiLFwiQ2FuQ29uZFwiLFwiVHJhbnNwXCIsXCJmU1dcIixcImZBZ2VcIixcbiAgICAgICAgICAgXCJQaHlzTW9kXCIsXCJwUlwiLFwicFNcIixcImxpdHRlcmZhbGxcIixcIk5QUFwiLFwiV0ZcIixcIldSXCIsXCJXU1wiLFwiV1wiXTtcbnZhciBkZWJ1ZyA9IGZhbHNlO1xudmFyIGRldm1vZGUgPSBmYWxzZTtcblxudmFyIHdlYXRoZXJDdXN0b21DaGFydCA9IG51bGw7XG5cbi8vIHJvdyByYXcgZGF0YSBkb2VzIGEgbG90IG9mIHByb2Nlc3Npbmcgb2YgdGhlIHJlc3VsdHMgYW5kIHRoZSBjdXJyZW50IHN0YXRlIG9mIHdoYXQnc1xuLy8gYmVpbmcgZGlzcGxheWVkLiAgR28gYWhlYWQgYW4gc2V0dXAgdGhlIGNzdiBkYXRhIGF0IHRoaXMgcG9pbnQsIHRoZW4gaWYgdGhlIHVzZXJcbi8vIGRlY2lkZXMgdG8gZXhwb3J0LCB3ZSBhcmUgYWxsIHNldCB0byB0bztcbnZhciBjc3ZSZXN1bHRzID0gbnVsbDtcblxudmFyIGdldE1vZGVsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBtb2RlbDtcbn1cblxudmFyIGdldE91dHB1dHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG91dHB1dHM7XG59XG5cbnZhciBvdXRwdXREZWZpbml0aW9ucyA9IHJlcXVpcmUoJy4vb3V0cHV0RGVmaW5pdGlvbnMnKTtcblxuXG5mdW5jdGlvbiBxcyhrZXkpIHtcbiAga2V5ID0ga2V5LnJlcGxhY2UoL1sqKz9eJC5cXFtcXF17fSgpfFxcXFxcXC9dL2csIFwiXFxcXCQmXCIpO1xuICB2YXIgbWF0Y2ggPSBsb2NhdGlvbi5zZWFyY2gubWF0Y2gobmV3IFJlZ0V4cChcIls/Jl1cIiArIGtleSArIFwiPShbXiZdKykoJnwkKVwiKSk7XG4gIHJldHVybiBtYXRjaCAmJiBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbMV0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0aW5wdXRGb3JtID0gcmVxdWlyZSgnLi9pbnB1dEZvcm0nKSh0aGlzKTtcblx0Y2hhcnRzID0gcmVxdWlyZSgnLi9jaGFydHMnKTtcblx0Y2hhcnRzLnNldEFwcCh0aGlzKTtcblxuXHRtb2RlbElPLmFwcCA9IHRoaXM7XG5cdG1vZGVsSU8ubW9kZWwgPSBtb2RlbDtcblx0bW9kZWxJTy5jaGFydHMgPSBjaGFydHM7XG5cdG1vZGVsSU8uaW5wdXRGb3JtID0gaW5wdXRGb3JtO1xuXG4gIC8vIGNoZWNrIGlmIGZsYXNoIGlzIGluc3RhbGxlZC4gIElmIG5vdCwgaGlkZSB0aGUgY2hhcnQgdHlwZSB0b2dnbGUuXG4gIHJlcXVpcmUoJy4vZmxhc2hCbG9jay1kZXRlY3RvcicpKGZ1bmN0aW9uKHZhbCl7XG4gICAgICBpZiggdmFsID4gMCApICQoXCIjY2hhcnQtdHlwZS1idG4tZ3JvdXBcIikuaGlkZSgpO1xuICB9KTtcblxuICAvLyBzZXR1cCBleHBvcnQgbW9kYWxcbiAgZXhwb3J0ZXIuaW5pdCgpO1xuICAkKFwiI2V4cG9ydC1jc3ZcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIGV4cG9ydGVyLmV4cG9ydENzdihjc3ZSZXN1bHRzKTtcbiAgfSk7XG5cbiAgdmFyIGVsZSA9ICQoXCIjaW5wdXRzLWNvbnRlbnRcIik7XG4gIGlucHV0Rm9ybS5jcmVhdGUoZWxlKTtcblxuICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIHJ1bk1vZGVsKCk7XG4gIH0pO1xuXG4gIC8vIGluaXRpYWxpemUgdGhlIGNoYXJ0c1xuICBjaGFydHMuaW5pdCgpO1xuXG4gIC8vIHNldCBkZWZhdWx0IGNvbmZpZ1xuICAkKFwiI2lucHV0LW1hbmFnZS1EYXRlUGxhbnRlZFwiKS52YWwobmV3IERhdGUoKS50b0lTT1N0cmluZygpLnJlcGxhY2UoL1QuKi8sJycpKTtcbiAgJChcIiNpbnB1dC1tYW5hZ2UtRGF0ZUNvcHBpY2VkXCIpLnZhbChuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSsoODY0MDAwMDAqMiozNjUpKS50b0lTT1N0cmluZygpLnJlcGxhY2UoL1QuKi8sJycpKTtcbiAgJChcIiNpbnB1dC1tYW5hZ2UtRGF0ZUZpbmFsSGFydmVzdFwiKS52YWwobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkrKDg2NDAwMDAwKjEwKjM2NSkpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC4qLywnJykpO1xuXG4gIC8vIHNldHVwIG5pY2Ugc2Nyb2xsaW5nXG4gICQoJy5hcHAtbmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogJCh0aGlzLmhhc2gpLm9mZnNldCgpLnRvcC01NVxuICAgICAgIH0sIDcwMCk7XG4gfSk7XG5cbiAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpe1xuICAgICAgY2hhcnRzLnJlc2l6ZSgpO1xuXG4gICAgICBpZiggd2VhdGhlckN1c3RvbUNoYXJ0ICkge1xuICAgICAgICAgIHdlYXRoZXJDdXN0b21DaGFydCA9IGNoYXJ0cy5jcmVhdGVXZWF0aGVyQ2hhcnQoJCgnI2N1c3RvbS13ZWF0aGVyLWNoYXJ0JylbMF0sIG1vZGVsLmN1c3RvbV93ZWF0aGVyKTtcbiAgICAgIH1cbiAgfSk7XG5cbiAgY2FsbGJhY2soKTtcbn1cblxuXG52YXIgcnVuQ29tcGxldGUgPSBmdW5jdGlvbihyb3dzKSB7XG4gIGlmICggcnVuQ2FsbGJhY2sgKSBydW5DYWxsYmFjayhyb3dzKTtcbiAgaWYoIGhpZGVJbml0TG9hZGluZyApIGhpZGVJbml0TG9hZGluZygpO1xuICBydW5DYWxsYmFjayA9IG51bGw7XG59XG5cbnZhciBtb250aHNUb1J1biA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZDEgPSAkKFwiI2lucHV0LW1hbmFnZS1EYXRlUGxhbnRlZFwiKS52YWwoKTtcbiAgaWYgKGQxICYmIGQxICE9IFwiXCIpIHtcbiAgICAgIGQxID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtRGF0ZVBsYW50ZWRcIikudmFsKCkpO1xuICB9IGVsc2Uge1xuICAgICAgZDEgPSBuZXcgRGF0ZSgpO1xuICB9XG5cbiAgdmFyIGQyID0gJChcIiNpbnB1dC1tYW5hZ2UtRGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoKTtcbiAgaWYgKGQyICYmIGQyICE9IFwiXCIpIHtcbiAgICAgIGQyID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtRGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoKSk7XG4gIH0gZWxzZSB7XG4gICAgICBkMiA9IG5ldyBEYXRlKCk7XG4gIH1cblxuICB2YXIgbW9udGhzO1xuICBtb250aHMgPSAoZDIuZ2V0RnVsbFllYXIoKSAtIGQxLmdldEZ1bGxZZWFyKCkpICogMTI7XG4gIG1vbnRocyAtPSBkMS5nZXRNb250aCgpICsgMTtcbiAgbW9udGhzICs9IGQyLmdldE1vbnRoKCk7XG4gIHJldHVybiBtb250aHMgPD0gMCA/IDEgOiBtb250aHMrMTtcbn1cblxuXG52YXIgcnVuTW9kZWwgPSBmdW5jdGlvbihpc1J0KSB7XG5cbiAgaWYgKCQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLmhhc0NsYXNzKFwiZGlzYWJsZWRcIikpIHJldHVybjtcbiAgJChcIiNydW5idG4sICNydW5idG4tc21cIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiUnVubmluZy4uLlwiKTtcblxuICBpZiggIWNoZWNrV2VhdGhlcigpICkgcmV0dXJuO1xuXG4gIC8vIGxldCBVSSBwcm9jZXNzIGZvciBhIHNlYyBiZWZvcmUgd2UgdGFuayBpdFxuICAvLyBUT0RPOiB0aGlzIHNob3VsZCBiZSBwcmVmb3JtZWQgdy8gYSB3ZWJ3b3JrZXJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ21vZGVsLXJ1bicsIDEpO1xuXG4gICAgICAvLyByZWFkIGV2ZXJ5dGhpbmcgc28gdGhlIHZhcmlhdGlvbnMgYXJlIHNldFxuICAgICAgbW9kZWwudmFyaWF0aW9ucyA9IHt9O1xuICAgICAgbW9kZWxJTy5yZWFkRnJvbUlucHV0cygpO1xuXG4gICAgICAvLyBtYWtlIHN1cmUgd2UgYXJlIG9ubHkgc2V0dGluZyAyIHZhcmlhdGlvbiBwYXJhbWV0ZXJzXG4gICAgICB2YXIgcGFyYW1zID0gW107XG4gICAgICBmb3IoIHZhciBrZXkgaW4gbW9kZWwudmFyaWF0aW9ucyApIHBhcmFtcy5wdXNoKGtleSk7XG4gICAgICBpZiggcGFyYW1zLmxlbmd0aCA+IDIgKSB7XG4gICAgICAgICAgYWxlcnQoXCJUaGVyZSBpcyBhIGxpbWl0IG9mIDIgdmFyaWF0aW9uIHBhcmFtZXRlcnMgcGVyIHJ1bi4gIEN1cnJlbnRseSB5b3UgYXJlIHZhcnlpbmcgXCIrXG4gICAgICAgICAgICAgICAgXCJ0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6XFxuXFxuIC1cIitwYXJhbXMuam9pbihcIlxcbiAtXCIpKTtcbiAgICAgICAgICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCI8aSBjbGFzcz0naWNvbi1wbGF5Jz48L2k+IFJ1blwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGxldCB0aGUgd29ybGQga25vdyB3aGF0IHdlIGFyZSBkb2luZ1xuICAgICAgaWYoICFpc1J0ICkgZ2RyaXZlLnJ1bk1vZGVsUnQoKTtcblxuICAgICAgLy8gc2hvdyB3aGF0IHdlIGFyZSBkb2luZ1xuICAgICAgJChcIiN2YXJpYXRpb25BbmFseXNpc1N0YXR1c1wiKS5odG1sKFwiPGI+XCIrKHBhcmFtcy5sZW5ndGggPT0gMCA/IFwiTm9uZVwiIDogcGFyYW1zLmpvaW4oXCIsIFwiKSkrXCI8L2I+XCIpO1xuXG4gICAgICAvLyB3ZSBhcmUgb25seSBydW5uaW5nIG9uY2VcbiAgICAgIGlmICggcGFyYW1zLmxlbmd0aCA9PSAwICkge1xuICAgICAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ21vZGVsLXJ1bi1zaW5nbGVQYXJhbScsIDEpO1xuXG4gICAgICAgICAgcnVuQ2FsbGJhY2sgPSBmdW5jdGlvbihyb3dzKSB7XG4gICAgICAgICAgICAgIHNob3dSZXN1bHRzKHJvd3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtb2RlbC5ydW4obW9udGhzVG9SdW4oKSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbW9kZWwtcnVuLXZhcmlhdGlvbicsIDEpO1xuXG4gICAgICAgICAgLy8gc2V0IHZhcmlhdGlvbiBvcmRlclxuICAgICAgICAgIHZhciBydW5zID0gW107XG4gICAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBtb2RlbC52YXJpYXRpb25zW3BhcmFtc1swXV0ubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAgICAgICBpbnB1dHMgOiB7fSxcbiAgICAgICAgICAgICAgICAgIG91dHB1dCA6IG51bGxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBvYmouaW5wdXRzW3BhcmFtc1swXV0gPSBtb2RlbC52YXJpYXRpb25zW3BhcmFtc1swXV1baV07XG4gICAgICAgICAgICAgIGlmKCBwYXJhbXMubGVuZ3RoID4gMSApIHtcbiAgICAgICAgICAgICAgICAgIGZvciggdmFyIGogPSAwOyBqIDwgbW9kZWwudmFyaWF0aW9uc1twYXJhbXNbMV1dLmxlbmd0aDsgaisrICkge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gJC5leHRlbmQodHJ1ZSwge30sIG9iaik7XG4gICAgICAgICAgICAgICAgICAgICAgdC5pbnB1dHNbcGFyYW1zWzFdXSA9IG1vZGVsLnZhcmlhdGlvbnNbcGFyYW1zWzFdXVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICBydW5zLnB1c2godCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBydW5zLnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJ1blZhcmlhdGlvbigwLCBydW5zKTtcbiAgICAgIH1cbiAgfSwgMjUwKTtcbn1cblxudmFyIHJ1blZhcmlhdGlvbiA9IGZ1bmN0aW9uKGluZGV4LCBydW5zKSB7XG4gIC8vIHNldCBpbnB1dCB2YXJpYWJsZXMgZm9yIHJ1blxuICB2YXIgcnVuID0gcnVuc1tpbmRleF07XG4gIGZvciggdmFyIGtleSBpbiBydW4uaW5wdXRzICkge1xuICAgICAgJChcIiNpbnB1dC1cIitrZXkucmVwbGFjZSgvXFwuL2csICctJykpLnZhbChydW4uaW5wdXRzW2tleV0pO1xuICB9XG5cbiAgcnVuQ2FsbGJhY2sgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICBydW5zW2luZGV4XS5vdXRwdXQgPSBkYXRhO1xuICAgICAgaW5kZXgrKztcblxuICAgICAgaWYgKHJ1bnMubGVuZ3RoID09IGluZGV4KSB7XG4gICAgICAgICAgLy8gcmVzZXQgdGhlIGNvbnN0YW50IHRvIHRoZSBmaXJzdCB2YWx1ZVxuICAgICAgICAgIGZvciggdmFyIGtleSBpbiBtb2RlbC52YXJpYXRpb25zICkge1xuICAgICAgICAgICAgICAkKFwiI2lucHV0LVwiK2tleS5yZXBsYWNlKC9cXC4vZywgJy0nKSkudmFsKG1vZGVsLnZhcmlhdGlvbnNba2V5XS5qb2luKFwiLCBcIikpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzaG93UmVzdWx0cyhydW5zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcnVuVmFyaWF0aW9uKGluZGV4LCBydW5zKTtcbiAgICAgIH1cbiAgfVxuXG4gIG1vZGVsLnJ1bihtb250aHNUb1J1bigpKTtcbn1cblxuXG52YXIgc2hvd1Jlc3VsdHMgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgaWYoIHJlc3VsdFswXSBpbnN0YW5jZW9mIEFycmF5ICkge1xuICAgICAgcmVzdWx0ID0gW3tcbiAgICAgICAgICBzaW5nbGVSdW4gOiB0cnVlLFxuICAgICAgICAgIGlucHV0cyA6IHt9LFxuICAgICAgICAgIG91dHB1dCA6IHJlc3VsdFxuICAgICAgfV1cbiAgfVxuXG4gIGN1cnJlbnRSZXN1bHRzID0gcmVzdWx0O1xuXG4gIHNob3dSYXdPdXRwdXQocmVzdWx0KTtcbiAgY2hhcnRzLnVwZGF0ZUNoYXJ0cyhyZXN1bHQsIHRydWUpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCI8aSBjbGFzcz0naWNvbi1wbGF5Jz48L2k+IFJ1blwiKTtcbiAgfSwgMjUwKTtcblxufVxuXG4vLyBtYWtlIHN1cmUgYWxsIHRoZSB3ZWF0aGVyIGlzIHNldC4gICMxIHRoaW5nIHBlb3BsZSB3aWxsIG1lc3MgdXBcbnZhciBjaGVja1dlYXRoZXIgPSBmdW5jdGlvbigpIHtcbiAgLy8gZmlyc3QgZ2V0IGN1cnJlbnQgbW9udGhzIHdlIGFyZSBnb2luZyB0byBydW4sXG4gIHZhciBzdGFydCA9ICQoXCIjaW5wdXQtbWFuYWdlLURhdGVQbGFudGVkXCIpLnZhbCgpO1xuXG4gIHZhciBlbmQgPSAkKFwiI2lucHV0LW1hbmFnZS1EYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpLnNwbGl0KFwiLVwiKTtcbiAgdmFyIGVNb250aCA9IHBhcnNlSW50KGVuZFsxXSk7XG4gIHZhciBlWWVhciA9IHBhcnNlSW50KGVuZFswXSk7XG5cbiAgdmFyIGNEYXRlID0gbmV3IERhdGUoc3RhcnQpO1xuXG4gIC8vIG5vdyBzZWUgaWYgd2UgaGF2ZSBjdXN0b20gd2VhdGhlciBjb3ZlcmFnZVxuICB2YXIgaGFzQ292ZXJhZ2UgPSB0cnVlO1xuICB2YXIgY291bnQgPSAwO1xuICB3aGlsZSggY291bnQgPCAxMDAwMCApIHtcbiAgICAgIGlmKCAhbW9kZWwuY3VzdG9tX3dlYXRoZXIgKSB7XG4gICAgICAgICAgaGFzQ292ZXJhZ2UgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIG0gPSAoY0RhdGUuZ2V0TW9udGgoKSsxKSsnJztcbiAgICAgIHZhciB5ID0gY0RhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgICBpZiggY0RhdGUuZ2V0TW9udGgoKSsxID09IGVNb250aCAmJiB5ID09IGVZZWFyICkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmKCAhbW9kZWwuY3VzdG9tX3dlYXRoZXJbeSsnLScrbV0gKSB7XG4gICAgICAgICAgaGFzQ292ZXJhZ2UgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY0RhdGUuc2V0TW9udGgoY0RhdGUuZ2V0TW9udGgoKSsxKTtcbiAgICAgIGNvdW50Kys7XG4gIH1cblxuICBpZiggaGFzQ292ZXJhZ2UgKSByZXR1cm4gdHJ1ZTtcblxuICAvLyBpZiBub3QgbWFrZSBzdXJlIHdlIGhhdmUgYXZlcmFnZXMgc2VsZWN0ZWRcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgZm9yICggdmFyIGogPSAxOyBqIDwgaW5wdXRzLndlYXRoZXIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB2YXIgYyA9IGlucHV0cy53ZWF0aGVyW2pdO1xuICAgICAgICAgIHZhciB2YWwgPSBwYXJzZUZsb2F0KCQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGMgKyBcIi1cIiArIGkpLnZhbCgpKTtcbiAgICAgICAgICBpZiggIXZhbCAmJiB2YWwgIT0gMCApIHtcbiAgICAgICAgICAgICAgYWxlcnQoXCJNaXNzaW5nIHdlYXRoZXIgZGF0YTogXCIrYytcIiBmb3IgbW9udGggXCIraStcIlxcblxcblwiK1xuICAgICAgICAgICAgICAgICAgICBcIkRpZCB5b3Ugc2VsZWN0IGEgbG9jYXRpb24gKFNldHVwKSBhbmQvb3IgYXJlIGFsbCB3ZWF0aGVyL3NvaWwgZmllbGRzIGZpbGxlZCBvdXQ/XCIpO1xuICAgICAgICAgICAgICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCI8aSBjbGFzcz0naWNvbi1wbGF5Jz48L2k+IFJ1blwiKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG52YXIgc2V0V2VhdGhlciA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgaWYoICFtb2RlbC5jdXN0b21fd2VhdGhlciApIG1vZGVsLmN1c3RvbV93ZWF0aGVyID0ge307XG5cbiAgaWYoIGRhdGEgKSB7XG4gICAgICBmb3IoIHZhciBrZXkgaW4gZGF0YSApIHtcblxuICAgICAgICAgIC8vIGNsZWFuIHVwIGRhdGUgZm9ybWF0XG4gICAgICAgICAgdmFyIGRhdGUgPSBrZXkucmVwbGFjZSgvW15cXGQtXS8sJycpO1xuICAgICAgICAgIHZhciBwYXJ0cyA9IGRhdGUuc3BsaXQoJy0nKTtcblxuICAgICAgICAgIGlmKCBwYXJ0cy5sZW5ndGggPCAyICkge1xuICAgICAgICAgICAgICByZXR1cm4gYWxlcnQoJ0ludmFsaWQgRGF0ZSBGb3JtYXQuICBEYXRlcyBzaG91bGQgYmUgaW4gWVlZWS1NTSBmb3JtYXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCBwYXJ0c1sxXS5sZW5ndGggIT0gMiApIHtcbiAgICAgICAgICAgICAgZGF0ZSA9IHBhcnRzWzBdK1wiLTBcIitwYXJ0c1sxXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtb2RlbC5jdXN0b21fd2VhdGhlcltkYXRlXSA9IGRhdGFba2V5XTtcbiAgICAgIH1cbiAgfVxuXG4gIC8vIGNyZWF0ZSBhcnJheSBzbyB3ZSBjYW4gc29ydFxuICB2YXIgYXJyID0gW107XG4gIHZhciBoZWFkZXJzID0gWydkYXRlJ107XG4gIGZvciggdmFyIGRhdGUgaW4gbW9kZWwuY3VzdG9tX3dlYXRoZXIgKSB7XG5cbiAgICAgIHZhciB0ID0gW2RhdGVdO1xuICAgICAgZm9yKCB2YXIga2V5IGluIG1vZGVsLmN1c3RvbV93ZWF0aGVyW2RhdGVdICkge1xuICAgICAgICAgIGlmKCBrZXkgPT0gJ25yZWwnICkgY29udGludWU7XG4gICAgICAgICAgaWYoIGFyci5sZW5ndGggPT0gMCApIGhlYWRlcnMucHVzaChrZXkpO1xuICAgICAgICAgIHQucHVzaChtb2RlbC5jdXN0b21fd2VhdGhlcltkYXRlXVtrZXldKTtcbiAgICAgIH1cblxuICAgICAgYXJyLnB1c2godCk7XG4gIH1cblxuICBpZiggYXJyLmxlbmd0aCA9PSAwICkge1xuICAgICAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuaHRtbChcIk5vIHdlYXRoZXIgZGF0YSBoYXMgYmVlbiB1cGxvYWRlZC5cIik7XG4gICAgICByZXR1cm47XG4gIH1cblxuICB2YXIgaHRtbCA9ICc8ZGl2IHN0eWxlPVwib3ZlcmZsb3c6YXV0bzttYXgtaGVpZ2h0OjYwMHB4XCI+PHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZFwiPjx0cj4nO1xuXG4gIGFyci5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgdmFyIGQxID0gbmV3IERhdGUoYVswXStcIi0wMVwiKS5nZXRUaW1lKCk7XG4gICAgICB2YXIgZDIgPSBuZXcgRGF0ZShiWzBdK1wiLTAxXCIpLmdldFRpbWUoKTtcblxuICAgICAgaWYoIGQxIDwgZDIgKSB7XG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9IGVsc2UgaWYoIGQxID4gZDIgKSB7XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gMDtcbiAgfSk7XG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBoZWFkZXJzLmxlbmd0aDsgaSsrICkge1xuICAgICAgaHRtbCArPSAnPHRoPicraGVhZGVyc1tpXSsnPC90aD4nO1xuICB9XG4gIGh0bWwgKz0gJzwvdHI+JztcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGh0bWwgKz0gJzx0cj48dGQ+JythcnJbaV0uam9pbignPC90ZD48dGQ+JykrJzwvdGQ+PC90cj4nO1xuICB9XG5cbiAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuaHRtbChodG1sKyc8L3RhYmxlPjwvZGl2PjxkaXYgaWQ9XCJjdXN0b20td2VhdGhlci1jaGFydFwiPjwvZGl2PicpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHdlYXRoZXJDdXN0b21DaGFydCA9IGNoYXJ0cy5jcmVhdGVXZWF0aGVyQ2hhcnQoJCgnI2N1c3RvbS13ZWF0aGVyLWNoYXJ0JylbMF0sIG1vZGVsLmN1c3RvbV93ZWF0aGVyKTtcbiAgfSwgMTAwMCk7XG5cbn07XG5cbnZhciBzaG93UmF3T3V0cHV0ID0gZnVuY3Rpb24ocmVzdWx0cykge1xuXG4gIC8vIHNlbGVjdGVkIGluIHRoZSBjaGFydHMgb3V0cHV0XG4gIHZhciB2YXJzID0gJChcIiNjaGFydFR5cGVJbnB1dFwiKS52YWwoKTtcblxuICAvLyBmaW5kIHRoZSByb3dzIHdlIGNhcmUgYWJvdXRcbiAgdmFyIGNoYXJ0Um93cyA9IHt9O1xuICBmb3IoIHZhciBpID0gMDsgaSA8IHJlc3VsdHNbMF0ub3V0cHV0WzBdLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHZhcnMuaW5kZXhPZihyZXN1bHRzWzBdLm91dHB1dFswXVtpXSkgPiAtMSApIGNoYXJ0Um93c1tyZXN1bHRzWzBdLm91dHB1dFswXVtpXV0gPSBpO1xuICB9XG5cbiAgdmFyIHRhYnMgPSAkKCc8dWwgY2xhc3M9XCJuYXYgbmF2LXBpbGxzXCIgaWQ9XCJyYXdPdXRwdXRUYWJzXCIgIGRhdGEtdGFicz1cInBpbGxcIj48L3VsPicpO1xuICB2YXIgY29udGVudHMgPSAkKCc8ZGl2IGNsYXNzPVwicGlsbC1jb250ZW50XCIgc3R5bGU9XCJvdmVyZmxvdzphdXRvO21hcmdpbi10b3A6MTVweFwiPjwvZGl2PicpO1xuXG4gIGZvciAoIHZhciBpID0gMDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRhYnMuYXBwZW5kKCQoJzxsaSAnKyhpID09IDAgPyAnY2xhc3M9XCJhY3RpdmVcIicgOiBcIlwiKSsnPjxhIGhyZWY9XCIjcmF3b3V0J1xuICAgICAgICAgICt2YXJzW2ldKydcIiBkYXRhLXRvZ2dsZT1cInRhYlwiPicrdmFyc1tpXSsnPC9hPjwvbGk+JykpO1xuXG4gICAgICBjb250ZW50cy5hcHBlbmQoJCgnPGRpdiBjbGFzcz1cInBpbGwtcGFuZSAnICsgKGkgPT0gMCA/ICdhY3RpdmUnIDogXCJcIilcbiAgICAgICAgICArICdcIiBpZD1cInJhd291dCcgKyB2YXJzW2ldICsgJ1wiPjwvZGl2PicpKTtcbiAgfVxuXG4gICQoXCIjb3V0cHV0LWNvbnRlbnRcIikuaHRtbChcIlwiKS5hcHBlbmQodGFicykuYXBwZW5kKGNvbnRlbnRzKTtcbiAgJChcIiNyYXdPdXRwdXRUYWJzXCIpLnRhYigpO1xuXG4gIGNzdlJlc3VsdHMgPSB7XG4gICAgICBjb25maWcgOiBtb2RlbElPLmV4cG9ydFNldHVwKCksXG4gICAgICBkYXRhIDoge31cbiAgfTtcblxuICAvLyBzb21lIHJvd3MgaGF2ZSBzdHJpbmdzLCB3ZSBkb24ndCB3YW50IHRoZXNlXG4gIC8vIGlnbm9yZSBzdHJpbmcgcm93c1xuICBmb3IoIHZhciBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgY2xlYW4gPSBbcmVzdWx0c1tpXS5vdXRwdXRbMF1dO1xuICAgICAgZm9yKCB2YXIgaiA9IDE7IGogPCByZXN1bHRzW2ldLm91dHB1dC5sZW5ndGg7IGorKyApIHtcbiAgICAgICAgICBpZiggdHlwZW9mIHJlc3VsdHNbaV0ub3V0cHV0W2pdWzBdICE9ICdzdHJpbmcnICkgY2xlYW4ucHVzaChyZXN1bHRzW2ldLm91dHB1dFtqXSk7XG4gICAgICB9XG4gICAgICByZXN1bHRzW2ldLm91dHB1dCA9IGNsZWFuO1xuICB9XG5cbiAgdmFyIGNEYXRlID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtRGF0ZVBsYW50ZWRcIikudmFsKCkpO1xuXG4gIHZhciB0YWJsZSwgcm93O1xuICBmb3IoIHZhciBrZXkgaW4gY2hhcnRSb3dzICkge1xuICAgICAgdGFibGUgPSBcIjx0YWJsZSBjbGFzcz0ndGFibGUgdGFibGUtc3RyaXBlZCc+XCI7XG5cbiAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldID0gW107XG5cbiAgICAgIGZvciggdmFyIGogPSAwOyBqIDwgcmVzdWx0c1swXS5vdXRwdXQubGVuZ3RoOyBqKysgKXtcbiAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXSA9IFtdO1xuXG4gICAgICAgICAgLy8gc2V0IGhlYWRlciByb3dcbiAgICAgICAgICBpZiggaiA9PSAwICkge1xuICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKCdtb250aCcpO1xuICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKCdkYXRlJyk7XG5cbiAgICAgICAgICAgICAgdGFibGUgKz0gXCI8dHI+PHRoPk1vbnRoPC90aD48dGg+RGF0ZTwvdGg+XCI7XG4gICAgICAgICAgICAgIGZvciggdmFyIHogPSAwOyB6IDwgcmVzdWx0cy5sZW5ndGg7IHorKyApIHtcbiAgICAgICAgICAgICAgICAgIHRhYmxlICs9IFwiPHRoPlwiO1xuICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICBmb3IoIHZhciBtVHlwZSBpbiByZXN1bHRzW3pdLmlucHV0cyApIHtcbiAgICAgICAgICAgICAgICAgICAgICB0bXAucHVzaChtVHlwZStcIj1cIityZXN1bHRzW3pdLmlucHV0c1ttVHlwZV0pO1xuICAgICAgICAgICAgICAgICAgICAgIHRhYmxlICs9IFwiPGRpdj5cIittVHlwZStcIj1cIityZXN1bHRzW3pdLmlucHV0c1ttVHlwZV0rXCI8L2Rpdj5cIjtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYoIHRtcC5sZW5ndGggPT0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgdGFibGUgKz0ga2V5O1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKHRtcC5qb2luKFwiIFwiKSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB0YWJsZSArPSBcIjwvdGg+XCI7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0YWJsZSArPSBcIjwvdHI+XCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShjRGF0ZS5nZXRZZWFyKCkrMTkwMCwgY0RhdGUuZ2V0TW9udGgoKStqLCBjRGF0ZS5nZXREYXRlKCkpO1xuICAgICAgICAgICAgICB2YXIgbSA9IGRhdGUuZ2V0TW9udGgoKSsxO1xuICAgICAgICAgICAgICBpZiggbSA8IDEwICkgbSA9ICcwJyttO1xuXG4gICAgICAgICAgICAgIHRhYmxlICs9IFwiPHRyPjx0ZD5cIitqK1wiPC90ZD48dGQ+XCIrZGF0ZS5nZXRGdWxsWWVhcigpKyctJyttK1wiPC90ZD5cIjtcblxuICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKGopO1xuICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKGRhdGUuZ2V0RnVsbFllYXIoKSsnLScrbSk7XG5cbiAgICAgICAgICAgICAgdmFyIHY7XG4gICAgICAgICAgICAgIGZvciggdmFyIHogPSAwOyB6IDwgcmVzdWx0cy5sZW5ndGg7IHorKyApIHtcbiAgICAgICAgICAgICAgICAgIHYgPSByZXN1bHRzW3pdLm91dHB1dFtqXVtjaGFydFJvd3Nba2V5XV07XG4gICAgICAgICAgICAgICAgICB0YWJsZSArPSBcIjx0ZD5cIit2K1wiPC90ZD5cIjtcbiAgICAgICAgICAgICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldW2pdLnB1c2godik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGFibGUgKz0gXCI8L3RyPlwiO1xuICAgICAgICAgIH1cblxuICAgICAgfVxuICAgICAgJChcIiNyYXdvdXRcIiArIGtleSkuaHRtbCh0YWJsZStcIjwvdGFibGU+XCIpO1xuICB9XG5cbiAgLy8gbWFrZSBzdXJlIHdlIGNhbiBzZWUgdGhlIGV4cG9ydCBidG5cbiAgaWYoICFvZmZsaW5lTW9kZSApICQoXCIjc2hvdy1leHBvcnQtY3N2XCIpLnNob3coKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0IDogaW5pdCxcbiAgb3V0cHV0cyA6IG91dHB1dHMsXG5cdGlucHV0cyA6IGlucHV0cyxcbiAgZ2V0TW9kZWwgOiBnZXRNb2RlbCxcbiAgcnVuTW9kZWwgOiBydW5Nb2RlbCxcbiAgc2hvd1Jhd091dHB1dCA6IHNob3dSYXdPdXRwdXQsXG5cdG1vbnRoc1RvUnVuIDogbW9udGhzVG9SdW4sXG4gIG91dHB1dERlZmluaXRpb25zIDogb3V0cHV0RGVmaW5pdGlvbnMsXG4gIHFzIDogcXMsXG4gIHNldFdlYXRoZXIgOiBzZXRXZWF0aGVyLFxuXHRnZHJpdmUgOiBnZHJpdmUsXG5cdHJ1bkNvbXBsZXRlIDogcnVuQ29tcGxldGUsXG5cdGdldE1vZGVsSU8gOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gbW9kZWxJTztcblx0fVxufTtcbiIsInZhciBhcHA7XG5cbi8vIG9ubHkgZHJhdyBjaGFydHMgaWYgd2lkdGggaGFzIGNoYW5nZWRcbnZhciBjV2lkdGggPSAwO1xuXG4vLyB0aGVyZSBpcyBubyB3YXkgdG8gZ2V0IHRoZSBjb2xvcnMgZm9yIHRoZSBsZWdlbmRzICh0byBtYWtlIHlvdXIgb3duKVxuLy8gdGhpcyBwb3N0OlxuLy8gZ2l2ZXMgdGhlc2UgdmFsdWVzLiAgVGhpcyBpcyBhIEhBQ0ssIGlmIHRoZXkgZXZlciBjaGFuZ2UsIHdlIG5lZWQgdG8gdXBkYXRlXG52YXIgZ29vZ2xlQ2hhcnRDb2xvcnMgPSBbXCIjMzM2NmNjXCIsXCIjZGMzOTEyXCIsXCIjZmY5OTAwXCIsXCIjMTA5NjE4XCIsXCIjOTkwMDk5XCIsXCIjMDA5OWM2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIjZGQ0NDc3XCIsXCIjNjZhYTAwXCIsXCIjYjgyZTJlXCIsXCIjMzE2Mzk1XCIsXCIjOTk0NDk5XCIsXCIjMjJhYTk5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIjYWFhYTExXCIsXCIjNjYzM2NjXCIsXCIjZTY3MzAwXCIsXCIjOGIwNzA3XCIsXCIjNjUxMDY3XCIsXCIjMzI5MjYyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIjNTU3NGE2XCIsXCIjM2IzZWFjXCIsXCIjYjc3MzIyXCIsXCIjMTZkNjIwXCIsXCIjYjkxMzgzXCIsXCIjZjQzNTllXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIjOWM1OTM1XCIsXCIjYTljNDEzXCIsXCIjMmE3NzhkXCIsXCIjNjY4ZDFjXCIsXCIjYmVhNDEzXCIsXCIjMGM1OTIyXCJcbiAgICAgICAgICAgICAgICAgICAgICAsXCIjNzQzNDExXCJdO1xuXG52YXIgd2VhdGhlckNoYXJ0T3B0aW9ucyA9IHtcbiAgdGl0bGUgOiAnV2VhdGhlcicsXG4gIGhlaWdodCA6IDMwMCxcbiAgdkF4ZXM6IFt7XG4gICAgICAgICAgdGl0bGU6IFwiUmFkaWF0aW9uIChNSi9kYXkpOyBUZW1wZXJhdHVyZSAoXkMpOyBEZXcgUG9pbnQgKF5DKTsgRGF5bGlnaHQgKGgpXCIsXG4gICAgICAgICAgbWluVmFsdWUgOiAtNSxcbiAgICAgICAgICBtYXhWYWx1ZSA6IDM1XG4gICAgICAgIH0se1xuICAgICAgICAgIHRpdGxlOiBcIlByZWNpcGl0YXRpb24gKG1tKVwiLFxuICAgICAgICAgIG1pblZhbHVlIDogLTUwLFxuICAgICAgICAgIG1heFZhbHVlIDogMzUwXG4gICAgICAgIH1dLFxuICBoQXhpczoge3RpdGxlOiBcIk1vbnRoXCJ9LFxuICBzZXJpZXNUeXBlOiBcImJhcnNcIixcbiAgc2VyaWVzOiB7XG4gICAgICAwOiB7dHlwZTogXCJsaW5lXCIsIHRhcmdldEF4aXNJbmRleDowfSxcbiAgICAgIDE6IHt0eXBlOiBcImxpbmVcIiwgdGFyZ2V0QXhpc0luZGV4OjB9LFxuICAgICAgMjoge3R5cGU6IFwibGluZVwiLCB0YXJnZXRBeGlzSW5kZXg6MH0sXG4gICAgICAzOiB7dHlwZTogXCJhcmVhXCIsIHRhcmdldEF4aXNJbmRleDoxfSxcbiAgICAgIDQ6IHt0YXJnZXRBeGlzSW5kZXg6MH1cbiAgfVxufVxuXG4vLyB0ZW1wbGF0ZSBmb3IgdGhlIHBvcHVwXG52YXIgc2xpZGVyUG9wdXAgPSAkKFxuICAgICAgXCI8ZGl2IGNsYXNzPSdzbGlkZS1wb3B1cCc+XCIgK1xuICAgICAgICAgIFwiPGkgY2xhc3M9J2ljb24tcmVtb3ZlLWNpcmNsZSBwdWxsLXJpZ2h0IHNsaWRlLXBvcHVwLWNsb3NlJz48L2k+XCIrXG4gICAgICAgICAgXCI8ZGl2IGlkPSdjYXJvdXNlbCcgY2xhc3M9J293bC1jYXJvdXNlbCBvd2wtdGhlbWUnIHN0eWxlPSdtYXJnaW4tdG9wOjE1cHgnPjwvZGl2PlwiICtcblx0XCI8L2Rpdj5cIik7XG5cbnZhciBzbGlkZXJQb3B1cEJnID0gJChcIjxkaXYgY2xhc3M9J3NsaWRlLXBvcHVwLWJnJz4mbmJzcDs8L2Rpdj5cIik7XG5cbi8vIG9ubHkgZHJhdyBjaGFydHMgaWYgc29tZW9uZSBoYXMgY2xpY2sgYSBjaGVja2JveFxudmFyIGNoYW5nZXMgPSBmYWxzZTtcblxuLy8gd2hlbiBzaXppbmcsIHdhaXQgYSB+MzAwbXMgYmVmb3JlIHRyaWdnZXJpbmcgcmVkcmF3XG52YXIgcmVzaXplVGltZXIgPSAtMTtcblxudmFyIGNoYXJ0VHlwZVNlbGVjdG9yLCBjaGFydENoZWNrYm94ZXMsIGNEYXRhO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuXG4gICQoXCIjc2hvdy1jaGFydHNwb3B1cC1idG5cIikub24oJ2NsaWNrJyxmdW5jdGlvbigpIHtcbiAgICAgIHNob3dQb3B1cCgpO1xuICB9KTtcblxuICAvLyBzZXR1cCBjaGFydCBzZWxlY3RvcnNcbiAgJChcIiNjaGFydC1tb2RhbFwiKS5tb2RhbCh7c2hvdzpmYWxzZX0pO1xuXG4gIC8vIHNldCBwb3B1cCBjbGljayBoYW5kbGVyc1xuICAkKFwiI2NoYXJ0VHlwZS1zZWxlY3RBbGxcIikub24oJ2NsaWNrJyxzZWxlY3RBbGwpO1xuICAkKFwiI2NoYXJ0VHlwZS11bnNlbGVjdEFsbFwiKS5vbignY2xpY2snLHVuc2VsZWN0QWxsKTtcblxuICBjaGFydFR5cGVTZWxlY3RvciA9ICQoXCIjY2hhcnRUeXBlSW5wdXRcIik7XG4gIGNoYXJ0Q2hlY2tib3hlcyA9ICQoXCIjY2hhcnRTZWxlY3Rpb25zXCIpO1xuXG4gIHZhciBjMSA9ICQoXCIjY2hhcnRTZWxlY3Rpb25zLWMxXCIpO1xuICB2YXIgYzIgPSAkKFwiI2NoYXJ0U2VsZWN0aW9ucy1jMlwiKTtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBhcHAub3V0cHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHZhbCA9IGFwcC5vdXRwdXRzW2ldO1xuICAgICAgY2hhcnRUeXBlU2VsZWN0b3IuYXBwZW5kKCQoXCI8b3B0aW9uIHZhbHVlPSdcIiArIHZhbCArIFwiJyBcIlxuICAgICAgICAgICAgICArICh2YWwgPT0gJ1dSJyB8fCB2YWwgPT0gJ1dTJyB8fCB2YWwgPT0gJ1dGJyA/ICdzZWxlY3RlZCcgOiAnJylcbiAgICAgICAgICAgICAgKyBcIj5cIiArIHZhbCArIFwiPC9vcHRpb24+XCIpKTtcblxuICAgICAgaWYoIGkgJSAyID09IDAgKSB7XG4gICAgICAgICAgYzEuYXBwZW5kKCQoJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCInXG4gICAgICAgICAgICAgICAgICArICh2YWwgPT0gJ1dSJyB8fCB2YWwgPT0gJ1dTJyB8fCB2YWwgPT0gJ1dGJyA/ICdjaGVja2VkPVwiY2hlY2tlZFwiJyA6ICcnKVxuICAgICAgICAgICAgICAgICAgKyAnIHZhbHVlPVwiJyt2YWwrJ1wiPiAnK19jcmVhdGVEZXNjcmlwdGlvbih2YWwpKyc8L2Rpdj4nKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIGMyLmFwcGVuZCgkKCc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj48bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiJ1xuICAgICAgICAgICAgICAgICAgKyAodmFsID09ICdXUicgfHwgdmFsID09ICdXUycgfHwgdmFsID09ICdXRicgPyAnY2hlY2tlZD1cImNoZWNrZWRcIicgOiAnJylcbiAgICAgICAgICAgICAgICAgICsgJyB2YWx1ZT1cIicrdmFsKydcIj4gJytfY3JlYXRlRGVzY3JpcHRpb24odmFsKSsnPC9kaXY+JykpO1xuICAgICAgfVxuICB9XG5cbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCIuZm4tdG9nZ2xlXCIpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjXCIrJCh0aGlzKS5hdHRyKFwiZGF0YXRhcmdldFwiKSkudG9nZ2xlKCdzbG93Jyk7XG4gIH0pO1xuXG4gIGNoYXJ0Q2hlY2tib3hlcy5maW5kKFwiaW5wdXRbdHlwZT1jaGVja2JveF1cIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICBpZiggJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpICkgc2VsZWN0KCQodGhpcykuYXR0cihcInZhbHVlXCIpKTtcbiAgICAgIGVsc2UgdW5zZWxlY3QoJCh0aGlzKS5hdHRyKFwidmFsdWVcIikpO1xuICB9KTtcblxuICAkKFwiI3NlbGVjdC1jaGFydHMtYnRuLCAjc2VsZWN0LWNoYXJ0cy10aXRsZS1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjY2hhcnQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgICAgIGNoYW5nZXMgPSBmYWxzZTtcbiAgfSk7XG5cbiAgJChcIi5jaGFydC1tb2RhbC1jbG9zZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgJChcIiNjaGFydC1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgaWYoIGNoYW5nZXMgJiYgY0RhdGEgKSB7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICB1cGRhdGVDaGFydHMoKTtcbiAgICAgICAgICAgICAgLy8gdXBkYXRlIHJhdyBkYXRhIGFzIHdlbGxcbiAgICAgICAgICAgICAgYXBwLnNob3dSYXdPdXRwdXQoY0RhdGEpO1xuICAgICAgICAgIH0sNDAwKTtcblxuICAgICAgfVxuICB9KTtcblxuICAkKFwiLmNoYXJ0LXR5cGUtdG9nZ2xlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICBpZiggISQodGhpcykuaGFzQ2xhc3MoXCJhY3RpdmVcIikgKSB7XG4gICAgICAgICAgJChcIi5jaGFydC10eXBlLXRvZ2dsZS5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgICB1cGRhdGVDaGFydHMoKTtcbiAgICAgIH1cbiAgfSk7XG59XG5cbi8vIG1ha2Ugc3VyZSBhbmQgZW5kIGxhYmVsIHRhZ1xuZnVuY3Rpb24gX2NyZWF0ZURlc2NyaXB0aW9uKHZhbCkge1xuICBpZiggIWFwcC5vdXRwdXREZWZpbml0aW9uc1t2YWxdICkgcmV0dXJuIFwiPGI+XCIrdmFsK1wiPC9iPjwvbGFiZWw+XCI7XG5cbiAgdmFyIGRlc2MgPSBhcHAub3V0cHV0RGVmaW5pdGlvbnNbdmFsXTtcbiAgdmFyIGxhYmVsID0gZGVzYy5sYWJlbCAmJiBkZXNjLmxhYmVsLmxlbmd0aCA+IDAgPyBcIiAtIFwiK2Rlc2MubGFiZWwgOiBcIlwiO1xuICB2YXIgdW5pdHMgPSBkZXNjLnVuaXRzICYmIGRlc2MudW5pdHMubGVuZ3RoID4gMCA/IFwiIFtcIitkZXNjLnVuaXRzK1wiXVwiIDogXCJcIjtcblxuICB2YXIgbGFiZWwgPSBcIjxiPlwiK3ZhbCtcIjwvYj48c3BhbiBzdHlsZT0nZm9udC1zaXplOjEycHgnPlwiK2xhYmVsK3VuaXRzK1wiPC9zcGFuPjwvbGFiZWw+XCI7XG4gIHZhciBoYXNEZXNjID0gZGVzYy5kZXNjcmlwdGlvbiAmJiBkZXNjLmRlc2NyaXB0aW9uLmxlbmd0aCA+IDA7XG4gIGlmKCBoYXNEZXNjICkge1xuICAgICAgbGFiZWwgKz0gXCI8ZGl2IHN0eWxlPSdmb250LXNpemU6MTFweDtjb2xvcjojODg4O2ZvbnQtc3R5bGU6aXRhbGljJz5cIitkZXNjLmRlc2NyaXB0aW9uO1xuICB9XG5cbiAgdmFyIGZOYW1lID0gZGVzYy5hbHRGbk5hbWUgfHwgdmFsO1xuICB2YXIgZm4gPSBhcHAuZ2V0TW9kZWwoKS5nZXRGdW5jdGlvbihmTmFtZSk7XG5cbiAgaWYoIGZuIHx8IGRlc2MuZm4gKSB7XG4gICAgICBpZiggIWhhc0Rlc2MgKSBsYWJlbCArPSBcIjxkaXYgc3R5bGU9J2ZvbnQtc2l6ZToxMXB4Jz5cIjtcbiAgICAgIGxhYmVsICs9IFwiIDxhIHN0eWxlPSdmb250LXN0eWxlOm5vcm1hbDtjdXJzb3I6cG9pbnRlcicgZGF0YXRhcmdldD0nZm4tZGVzYy1cIit2YWwrXCInIGNsYXNzPSdmbi10b2dnbGUnPmZuKCk8L2E+PC9kaXY+XCI7XG5cbiAgICAgIGxhYmVsICs9IFwiPGRpdiBpZD0nZm4tZGVzYy1cIit2YWwrXCInIHN0eWxlPSdkaXNwbGF5Om5vbmU7Zm9udC1zaXplOjExcHg7b3ZlcmZsb3c6YXV0bycgY2xhc3M9J3dlbGwgd2VsbC1zbSc+XCIrXG4gICAgICAgICAgICAgICAgICAoZm58fGRlc2MuZm4pLnRvU3RyaW5nKCkucmVwbGFjZSgvIC9nLCcmbmJzcDsnKS5yZXBsYWNlKC9cXG4vZywnPGJyIC8+JykrXCI8L2Rpdj5cIjtcbiAgfSBlbHNlIGlmICggaGFzRGVzYyApIHtcbiAgICAgIGxhYmVsICs9IFwiPC9kaXY+XCI7XG4gIH1cblxuICAvLyBUT0RPOiBhZGQgZm4gd2VsbFxuICByZXR1cm4gbGFiZWwrXCI8YnIgLz5cIjtcbn1cblxuZnVuY3Rpb24gc2VsZWN0KHZhbCkge1xuICBjaGFydFR5cGVTZWxlY3Rvci5maW5kKFwib3B0aW9uW3ZhbHVlPVwiK3ZhbCtcIl1cIikuYXR0cihcInNlbGVjdGVkXCIsXCJzZWxlY3RlZFwiKTtcbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCJpbnB1dFt2YWx1ZT1cIit2YWwrXCJdXCIpLnByb3AoXCJjaGVja2VkXCIsdHJ1ZSk7XG4gIGNoYW5nZXMgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiB1bnNlbGVjdCh2YWwpIHtcbiAgY2hhcnRUeXBlU2VsZWN0b3IuZmluZChcIm9wdGlvblt2YWx1ZT1cIit2YWwrXCJdXCIpLnJlbW92ZUF0dHIoXCJzZWxlY3RlZFwiKTtcbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCJpbnB1dFt2YWx1ZT1cIit2YWwrXCJdXCIpLnByb3AoXCJjaGVja2VkXCIsZmFsc2UpO1xuICBjaGFuZ2VzID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0QWxsKCkge1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGFwcC5vdXRwdXRzLmxlbmd0aDsgaSsrKSBzZWxlY3QoYXBwLm91dHB1dHNbaV0pO1xufVxuXG5mdW5jdGlvbiB1bnNlbGVjdEFsbCgpIHtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBhcHAub3V0cHV0cy5sZW5ndGg7IGkrKykgdW5zZWxlY3QoYXBwLm91dHB1dHNbaV0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmUoZWxlKSB7XG4gIGVsZS5wYXJlbnQoKS5oaWRlKCdzbG93JywgZnVuY3Rpb24oKXtcbiAgICAgIGVsZS5wYXJlbnQoKS5yZW1vdmUoKTtcbiAgICAgIHVuc2VsZWN0KGVsZS5hdHRyKCd0eXBlJykpO1xuICB9KTtcblxufVxuXG5mdW5jdGlvbiBwcmludChjaGFydENvbnRhaW5lcikge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdwcmludC1jaGFydCcsIDEpO1xuXG5cbnZhciBkaXNwX3NldHRpbmc9XCJ0b29sYmFyPXllcyxsb2NhdGlvbj1ubyxkaXJlY3Rvcmllcz15ZXMsbWVudWJhcj15ZXMsXCI7XG4gIGRpc3Bfc2V0dGluZys9XCJzY3JvbGxiYXJzPXllcyx3aWR0aD04MDAsIGhlaWdodD02MDAsIGxlZnQ9MjUsIHRvcD0yNVwiO1xuXG4gIHZhciBzdmcgPSBjaGFydENvbnRhaW5lci5maW5kKFwic3ZnXCIpO1xuICB2YXIgaHRtbCA9IGNoYXJ0Q29udGFpbmVyLmZpbmQoXCJkaXZcIikuaHRtbCgpO1xuXG4gIHZhciBkb2NwcmludD13aW5kb3cub3BlbihcIlwiLFwiXCIsZGlzcF9zZXR0aW5nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQub3BlbigpO1xuICBkb2NwcmludC5kb2N1bWVudC53cml0ZSgnPGh0bWw+PGhlYWQ+PHRpdGxlPjwvdGl0bGU+Jyk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKCc8L2hlYWQ+PGJvZHkgbWFyZ2lud2lkdGg9XCIwXCIgbWFyZ2luaGVpZ2h0PVwiMFwiIG9uTG9hZD1cInNlbGYucHJpbnQoKVwiPjxjZW50ZXI+Jyk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKGh0bWwpO1xuICBkb2NwcmludC5kb2N1bWVudC53cml0ZSgnPC9jZW50ZXI+PC9ib2R5PjwvaHRtbD4nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQuY2xvc2UoKTtcbiAgZG9jcHJpbnQuZm9jdXMoKTtcblxufVxuXG5cbmZ1bmN0aW9uIHNldERhdGEoZGF0YSkge1xuICBjRGF0YSA9IGRhdGE7XG59XG5cbi8vIGJhc2ljYWxseSByZWRyYXcgZXZlcnl0aGluZ1xuZnVuY3Rpb24gcmVzaXplKCkge1xuICAvLyByZXF1aXJlIG1vcmUgdGhhbiBhIDMwIHBpeGVsIHdpZHRoIGNoYW5nZSAoc28gd2UgZG9uJ3QgcmVkcmF3IHcvIHNjcm9sbCBiYXJzIGFkZGVkKVxuICB2YXIgd2luV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgaWYoIGNXaWR0aCA+IHdpbldpZHRoIC0gMTUgJiYgY1dpZHRoIDwgd2luV2lkdGggKyAxNSApIHJldHVybjtcbiAgY1dpZHRoID0gd2luV2lkdGg7XG5cbiAgaWYoIHJlc2l6ZVRpbWVyICE9IC0xICkgY2xlYXJUaW1lb3V0KHJlc2l6ZVRpbWVyKTtcbiAgcmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgcmVzaXplVGltZXIgPSAtMTtcbiAgICAgIHVwZGF0ZUNoYXJ0cygpO1xuICB9LDMwMCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNoYXJ0cyhyZXN1bHRzLCBhbmltYXRlKSB7XG4gIGlmKCByZXN1bHRzICkgc2V0RGF0YShyZXN1bHRzKTtcbiAgaWYoICFjRGF0YSApIHJldHVybjtcblxuICAkKFwiI3Nob3ctY2hhcnRzcG9wdXAtYnRuXCIpLnNob3coKTtcblxuICAvLyBjcmVhdGUgYSBsZWdlbmQgaWYgdGhlcmUgaXMgbW9yZSB0aGFuIG9uZSBydW5cbiAgdmFyIGxlZ2VuZCA9IFwiXCI7XG4gIGlmKCAhY0RhdGFbMF0uc2luZ2xlUnVuICkge1xuICAgICAgdmFyIGMxID0gXCJcIjtcbiAgICAgIHZhciBjMiA9IFwiXCI7XG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGNEYXRhLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgIHZhciBlbGUgPSBcIjxkaXYgc3R5bGU9J21pbi1oZWlnaHQ6NDBweDttYXJnaW4tYm90dG9tOjEwcHgnPjxkaXYgY2xhc3M9J2xlZ2VuZC1zcXVhcmUnIHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOlwiK2dvb2dsZUNoYXJ0Q29sb3JzW2ldK1wiJz4mbmJzcDs8L2Rpdj5cIjtcbiAgICAgICAgICBmb3IoIHZhciBtVHlwZSBpbiBjRGF0YVtpXS5pbnB1dHMgKSB7XG4gICAgICAgICAgICAgIGVsZSArPSBcIjxkaXYgY2xhc3M9J2xlZ2VuZC10ZXh0Jz5cIittVHlwZStcIj1cIitjRGF0YVtpXS5pbnB1dHNbbVR5cGVdK1wiPC9kaXY+XCI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYoIGkgJSAyID09IDAgKSBjMSArPSBlbGUgKyBcIjwvZGl2PlwiXG4gICAgICAgICAgZWxzZSBjMiArPSBlbGUgKyBcIjwvZGl2PlwiXG4gICAgICB9XG4gICAgICBsZWdlbmQgPSBcIjxkaXY+PGEgaWQ9J2xlZ2VuZC1wYW5lbC10b2dnbGUnIHN0eWxlPSdtYXJnaW4tbGVmdDo1cHg7Y3Vyc29yOnBvaW50ZXInPkxlZ2VuZDwvYT48L2Rpdj5cIitcbiAgICAgICAgICAgICAgIFwiPGRpdiBzdHlsZT0nYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2VlZTtwYWRkaW5nLWJvdHRvbTo1cHg7bWFyZ2luLWJvdHRvbToxNXB4Jz5cIitcbiAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0ncm93JyBpZD0nbGVnZW5kLXBhbmVsJz48ZGl2IGNsYXNzPSdjb2wtc20tNic+XCIrYzErXCI8L2Rpdj5cIitcbiAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nY29sLXNtLTYnPlwiK2MyK1wiPC9kaXY+XCIrXG4gICAgICAgICAgICAgICBcIjwvZGl2PjwvZGl2PlwiO1xuICB9XG4gICQoXCIjY2hhcnQtY29udGVudFwiKS5odG1sKGxlZ2VuZCk7XG4gICQoXCIjbGVnZW5kLXBhbmVsLXRvZ2dsZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgJChcIiNsZWdlbmQtcGFuZWxcIikudG9nZ2xlKFwic2xvd1wiKTtcbiAgfSk7XG5cblxuICB2YXIgdHlwZXMgPSBjaGFydFR5cGVTZWxlY3Rvci52YWwoKTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIF9zaG93TWFpbkNoYXJ0KHR5cGVzW2ldLCBhbmltYXRlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzaG93UG9wdXAoKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3Nob3ctY2hhcnQtcG9wdXAnLCAxKTtcblxuXG4gIHNsaWRlclBvcHVwLmZpbmQoXCIub3dsLXRoZW1lXCIpLmh0bWwoXCJcIik7XG4gICQoJ2JvZHknKS5zY3JvbGxUb3AoMCkuY3NzKCdvdmVyZmxvdycsJ2hpZGRlbicpLmFwcGVuZChzbGlkZXJQb3B1cEJnKS5hcHBlbmQoc2xpZGVyUG9wdXApO1xuXG4gIC8vIHRoaXMgY291bGQgY2FzZSBiYWRuZXNzLi4uLiAgd2h5IGRvZXNuJ3QgaXQgbGl2ZSB3aGVuIHJlbW92ZWQgZnJvbSBET00/XG4gIHNsaWRlclBvcHVwLmZpbmQoJy5zbGlkZS1wb3B1cC1jbG9zZScpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgIGhpZGVQb3B1cCgpO1xuICB9KTtcblxuICB2YXIgdHlwZXMgPSBjaGFydFR5cGVTZWxlY3Rvci52YWwoKTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIF9zaG93UG9wdXBDaGFydCh0eXBlc1tpXSk7XG4gIH1cblxuICAkKCcjY2Fyb3VzZWwnKS5vd2xDYXJvdXNlbCh7XG4gICAgICBuYXZpZ2F0aW9uIDogdHJ1ZSwgLy8gU2hvdyBuZXh0IGFuZCBwcmV2IGJ1dHRvbnNcbiAgICAgIHNsaWRlU3BlZWQgOiAzMDAsXG4gICAgICBwYWdpbmF0aW9uU3BlZWQgOiA0MDAsXG4gICAgICBzaW5nbGVJdGVtOnRydWVcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGhpZGVQb3B1cCgpIHtcbiAgc2xpZGVyUG9wdXBCZy5yZW1vdmUoKTtcbiAgc2xpZGVyUG9wdXAucmVtb3ZlKCk7XG4gICQoJ2JvZHknKS5jc3MoJ292ZXJmbG93JywnYXV0bycpO1xufVxuXG5mdW5jdGlvbiBfc2hvd01haW5DaGFydCh0eXBlLCBhbmltYXRlKSB7XG4gIHZhciBjaGFydFR5cGUgPSAkKFwiLmNoYXJ0LXR5cGUtdG9nZ2xlLmFjdGl2ZVwiKS5hdHRyKFwidmFsdWVcIik7XG4gIHZhciBwYW5lbCA9ICQoXCI8ZGl2IC8+XCIpO1xuICB2YXIgb3V0ZXJQYW5lbCA9ICQoXCI8ZGl2PlwiK1xuICBcdFwiPGEgY2xhc3M9J2J0biBidG4teHMgYnRuLWRlZmF1bHQnIHN0eWxlPSdcIisoY2hhcnRUeXBlICE9IFwidGltZWxpbmVcIiA/IFwicG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDttYXJnaW46MCAwIC0yMHB4IDIwcHhcIiA6IFwibWFyZ2luLWJvdHRvbTo1cHhcIikrXG4gICAgICBcIicgdHlwZT0nXCIrdHlwZStcIic+XCIgK1xuICBcdFwiPGkgY2xhc3M9J2ljb24tcmVtb3ZlJz48L2k+IFwiK3R5cGUrXCI8L2E+PC9kaXY+XCIpO1xuICBvdXRlclBhbmVsLmZpbmQoXCJhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgcmVtb3ZlKCQodGhpcykpO1xuICB9KTtcbiAgaWYoIGNoYXJ0VHlwZSA9PSBcInRpbWVsaW5lXCIgKSBvdXRlclBhbmVsLmNzcyhcIm1hcmdpbi1ib3R0b21cIixcIjIwcHhcIik7XG4gICQoXCIjY2hhcnQtY29udGVudFwiKS5hcHBlbmQob3V0ZXJQYW5lbC5hcHBlbmQocGFuZWwpKTtcbiAgX2NyZWF0ZUNoYXJ0KHR5cGUsIGNoYXJ0VHlwZSwgcGFuZWwsIGZhbHNlLCBudWxsLCBhbmltYXRlKTtcbn1cblxuZnVuY3Rpb24gX3Nob3dQb3B1cENoYXJ0KHR5cGUpIHtcbiAgdmFyIHBhbmVsID0gJChcIjxkaXYgY2xhc3M9J2l0ZW0nPjwvZGl2PlwiKTtcblxuICB2YXIgcHJpbnRCdG4gPSAkKFwiPGEgY2xhc3M9J2J0biBidG4tc20gYnRuLWRlZmF1bHQnIHN0eWxlPSdtYXJnaW4tbGVmdDoxNnB4Jz48aSBjbGFzcz0naWNvbi1wcmludCc+PC9pPiBQcmludDwvYT5cIikub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICBwcmludChjaGFydFBhbmVsKTtcbiAgfSk7XG4gIHBhbmVsLmFwcGVuZChwcmludEJ0bik7XG5cbiAgdmFyIGNoYXJ0UGFuZWwgPSAkKFwiPGRpdj48L2Rpdj5cIik7XG4gIHBhbmVsLmFwcGVuZChjaGFydFBhbmVsKTtcblxuICBzbGlkZXJQb3B1cC5maW5kKFwiLm93bC10aGVtZVwiKS5hcHBlbmQocGFuZWwpO1xuICBfY3JlYXRlQ2hhcnQodHlwZSwgJ2xpbmUnLCBjaGFydFBhbmVsLCB0cnVlLCBbTWF0aC5yb3VuZCgkKHdpbmRvdykud2lkdGgoKSouODgpLCBNYXRoLnJvdW5kKCgkKHdpbmRvdykuaGVpZ2h0KCkqLjkwKS0xMjUpXSk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDaGFydCh0eXBlLCBjaGFydFR5cGUsIHBhbmVsLCBzaG93TGVnZW5kLCBzaXplLCBhbmltYXRlKSB7XG4gIHZhciBjb2wgPSAwO1xuXG4gIHZhciBkdCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5EYXRhVGFibGUoKTtcblxuICBpZiggY2hhcnRUeXBlID09ICd0aW1lbGluZScgKSB7XG4gICAgICBkdC5hZGRDb2x1bW4oJ2RhdGUnLCAnTW9udGgnKTtcbiAgfSBlbHNlIHtcbiAgICAgIC8vZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnTW9udGgnKTtcbiAgICAgIGR0LmFkZENvbHVtbignc3RyaW5nJywgJ01vbnRoJyk7XG4gIH1cblxuICAvLyBzZXQgdGhlIGZpcnN0IGNvbHVtblxuICBpZiggIWNEYXRhWzBdLnNpbmdsZVJ1biApIHtcbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgY0RhdGEubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgdmFyIGxhYmVsID0gXCJcIjtcbiAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gY0RhdGFbaV0uaW5wdXRzICkge1xuICAgICAgICAgICAgICBsYWJlbCArPSBrZXkucmVwbGFjZSgvLipcXC4vLCcnKStcIj1cIitjRGF0YVtpXS5pbnB1dHNba2V5XStcIiBcXG5cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGFiZWwgPSBsYWJlbC5yZXBsYWNlKC8sXFxzJC8sJycpO1xuICAgICAgICAgIGR0LmFkZENvbHVtbignbnVtYmVyJywgbGFiZWwpO1xuICAgICAgfVxuICB9IGVsc2Uge1xuICAgICAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCB0eXBlKTtcbiAgfVxuXG4gIC8vIGZpbmQgdGhlIGNvbHVtbiB3ZSB3YW50IHRvIGNoYXJ0XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGNEYXRhWzBdLm91dHB1dFswXS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGNEYXRhWzBdLm91dHB1dFswXVtpXSA9PSB0eXBlKSB7XG4gICAgICAgICAgY29sID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgfVxuXG4gIHZhciBjRGF0ZSA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLURhdGVQbGFudGVkXCIpLnZhbCgpKTtcblxuICB2YXIgZGF0YSA9IFtdO1xuICB2YXIgbWF4ID0gMDtcbiAgLy8gY3JlYXRlIHRoZSBbXVtdIGFycmF5IGZvciB0aGUgZ29vZ2xlIGNoYXJ0XG4gIGZvciAoIHZhciBpID0gMTsgaSA8IGNEYXRhWzBdLm91dHB1dC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHR5cGVvZiBjRGF0YVswXS5vdXRwdXRbaV1bY29sXSA9PT0gJ3N0cmluZycpIGNvbnRpbnVlO1xuXG4gICAgICB2YXIgcm93ID0gW107XG4gICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKGNEYXRlLmdldFllYXIoKSsxOTAwLCBjRGF0ZS5nZXRNb250aCgpK2ksIGNEYXRlLmdldERhdGUoKSk7XG4gICAgICBpZiggY2hhcnRUeXBlID09IFwidGltZWxpbmVcIiApIHtcbiAgICAgICAgICAvLyBhZGQgb24gbW9udGhcbiAgICAgICAgICByb3cucHVzaChkYXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIG0gPSBkYXRlLmdldE1vbnRoKCkrMTtcbiAgICAgICAgICBpZiggbSA8IDEwICkgbSA9ICcwJyttO1xuICAgICAgICAgIHJvdy5wdXNoKGkrJzogJytkYXRlLmdldEZ1bGxZZWFyKCkrJy0nK20pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKCB2YXIgaiA9IDA7IGogPCBjRGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmKCBjRGF0YVtqXS5vdXRwdXRbaV1bY29sXSA+IG1heCApIG1heCA9IGNEYXRhW2pdLm91dHB1dFtpXVtjb2xdO1xuICAgICAgICAgIHJvdy5wdXNoKGNEYXRhW2pdLm91dHB1dFtpXVtjb2xdKTtcbiAgICAgIH1cbiAgICAgIGRhdGEucHVzaChyb3cpO1xuICB9XG5cbiAgZHQuYWRkUm93cyhkYXRhKTtcblxuICBpZiggYXBwLm91dHB1dERlZmluaXRpb25zW3R5cGVdICkge1xuICAgICAgdmFyIGRlc2MgPSBhcHAub3V0cHV0RGVmaW5pdGlvbnNbdHlwZV07XG4gICAgICB2YXIgbGFiZWwgPSBkZXNjLmxhYmVsICYmIGRlc2MubGFiZWwubGVuZ3RoID4gMCA/IFwiIC0gXCIrZGVzYy5sYWJlbCA6IFwiXCI7XG4gICAgICB2YXIgdW5pdHMgPSBkZXNjLnVuaXRzICYmIGRlc2MudW5pdHMubGVuZ3RoID4gMCA/IFwiIFtcIitkZXNjLnVuaXRzK1wiXVwiIDogXCJcIjtcbiAgICAgIHR5cGUgPSB0eXBlK2xhYmVsK3VuaXRzO1xuICB9XG5cblxuICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICB2QXhpcyA6IHtcbiAgICAgICAgICAgICAgdGl0bGUgOiB0eXBlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBoQXhpcyA6IHtcbiAgICAgICAgICAgICAgdGl0bGUgOiBcIk1vbnRoXCJcbiAgICAgICAgICB9XG4gIH1cbiAgaWYoICFzaG93TGVnZW5kICkgb3B0aW9ucy5sZWdlbmQgPSB7cG9zaXRpb246XCJub25lXCJ9O1xuXG4gIGlmKCBzaXplICkge1xuICAgICAgb3B0aW9ucy53aWR0aCA9IHNpemVbMF07XG4gICAgICBvcHRpb25zLmhlaWdodCA9IHNpemVbMV07XG4gIH0gZWxzZSB7XG4gICAgICBvcHRpb25zLndpZHRoID0gcGFuZWwud2lkdGgoKTtcbiAgICAgIG9wdGlvbnMuaGVpZ2h0ID0gb3B0aW9ucy53aWR0aCouNDtcbiAgfVxuICBwYW5lbC53aWR0aChvcHRpb25zLndpZHRoKS5oZWlnaHQob3B0aW9ucy5oZWlnaHQpO1xuXG4gIGlmKCBjaGFydFR5cGUgPT0gJ3RpbWVsaW5lJyApIHtcbiAgICAgIG9wdGlvbnMuZGlzcGxheUFubm90YXRpb25zID0gdHJ1ZTtcbiAgICAgIHZhciBjaGFydCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5Bbm5vdGF0ZWRUaW1lTGluZShwYW5lbFswXSk7XG4gICAgICBjaGFydC5kcmF3KGR0LCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICAgIHZhciBjaGFydCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5MaW5lQ2hhcnQocGFuZWxbMF0pO1xuICAgICAgY2hhcnQuZHJhdyhkdCwgb3B0aW9ucyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlV2VhdGhlckNoYXJ0KHJvb3QsIGRhdGEpIHtcbiAgJChyb290KS5odG1sKCcnKTtcblxuICB2YXIgZHQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uRGF0YVRhYmxlKCk7XG4gIGR0LmFkZENvbHVtbignc3RyaW5nJywgJ01vbnRoJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ01pbiBUZW1wZXJhdHVyZScpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdNYXggVGVtcGVyYXR1cmUnKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnRGV3IFBvaW50Jyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ1ByZWNpcGl0YXRpb24nKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnUmFkaWF0aW9uJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ0RheWxpZ2h0Jyk7XG5cbiAgZm9yKCB2YXIgZGF0ZSBpbiBkYXRhICkge1xuICAgICAgdmFyIG9iaiA9IGRhdGFbZGF0ZV07XG4gICAgICBkdC5hZGRSb3coW1xuICAgICAgICAgIGRhdGUrJycsXG4gICAgICAgICAgb2JqLnRtaW4gfHwgMCxcbiAgICAgICAgICBvYmoudG1heCB8fCAwLFxuICAgICAgICAgIG9iai50ZG1lYW4gfHwgMCxcbiAgICAgICAgICBvYmoucHB0IHx8IDAsXG4gICAgICAgICAgb2JqLnJhZCB8fCAwLFxuICAgICAgICAgIG9iai5kYXlsaWdodCB8fCAwXG4gICAgICBdKTtcbiAgfVxuXG4gIHZhciBjaGFydCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5Db21ib0NoYXJ0KHJvb3QpO1xuICBjaGFydC5kcmF3KGR0LCB3ZWF0aGVyQ2hhcnRPcHRpb25zKTtcblxuICByZXR1cm4gY2hhcnQ7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldEFwcCA6IGZ1bmN0aW9uKGEpIHtcbiAgICBhcHAgPSBhO1xuICB9LFxuICAgIGluaXQgOiBpbml0LFxuICAgIHNldERhdGEgOiBzZXREYXRhLFxuICAgIHNlbGVjdCA6IHNlbGVjdCxcbiAgICB1bnNlbGVjdCA6IHVuc2VsZWN0LFxuICAgIHNlbGVjdEFsbCA6IHNlbGVjdEFsbCxcbiAgICB1bnNlbGVjdEFsbCA6IHVuc2VsZWN0QWxsLFxuICAgIHVwZGF0ZUNoYXJ0cyA6IHVwZGF0ZUNoYXJ0cyxcbiAgICByZW1vdmUgOiByZW1vdmUsXG4gICAgc2hvd1BvcHVwOiBzaG93UG9wdXAsXG4gICAgaGlkZVBvcHVwOiBoaWRlUG9wdXAsXG4gICAgcmVzaXplIDogcmVzaXplLFxuICAgIGNyZWF0ZVdlYXRoZXJDaGFydCA6IGNyZWF0ZVdlYXRoZXJDaGFydFxufVxuIiwidmFyIGdkcml2ZSA9IHJlcXVpcmUoJy4vZ2RyaXZlJyk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICQoXCIjZXhwb3J0LW1vZGFsXCIpLm1vZGFsKHtcbiAgICAgICAgICBzaG93IDogZmFsc2VcbiAgICAgIH0pO1xuXG4gICAgICAkKFwiI3Nob3ctZXhwb3J0LWNzdlwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICBfc2V0TWVzc2FnZShudWxsKTtcblxuICAgICAgICAkKFwiI2V4cG9ydC1uYW1lXCIpLnZhbChcIjNQRyBNb2RlbCBSZXN1bHRzIChcIituZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC8sJyAnKS5yZXBsYWNlKC9cXC5cXGQqWi8sJycpK1wiKVwiKTtcbiAgICAgICAgICAkKFwiI2V4cG9ydC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICAgICAgfSk7XG59XG5cbmZ1bmN0aW9uIF9zZXRNZXNzYWdlKG1zZywgdHlwZSwgcHJvZ3Jlc3MpIHtcbiAgaWYoICFtc2cgKSB7XG4gICAgcmV0dXJuICQoXCIjZXhwb3J0LW1zZ1wiKS5oaWRlKCk7XG4gIH1cbiAgJChcIiNleHBvcnQtbXNnXCIpLnNob3coKTtcblxuICBpZiggcHJvZ3Jlc3MgKSB7XG4gICAgJChcIiNleHBvcnQtbXNnLXByb2dyZXNzXCIpLnNob3coKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiI2V4cG9ydC1tc2ctcHJvZ3Jlc3NcIikuaGlkZSgpO1xuICB9XG5cbiAgJCgnI2V4cG9ydC1tc2cnKS5hdHRyKFwiY2xhc3NcIiwnYWxlcnQgYWxlcnQtJyt0eXBlKTtcbiAgJCgnI2V4cG9ydC1tc2ctdGV4dCcpLmh0bWwobXNnKTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZVByb2dyZXNzKGluZGV4LCB0b3RhbCkge1xuICBwZXJjZW50ID0gMTAwICogKCBpbmRleCAvIHRvdGFsICk7XG4gICQoXCIjZXhwb3J0LW1zZy1wcm9ncmVzcy1iYXJcIikuYXR0cihcImFyaWEtdmFsdWVub3dcIiwgcGVyY2VudCkuY3NzKFwid2lkdGhcIixwZXJjZW50K1wiJVwiKTtcbn1cblxuLy8gc2VlIGlmIGFuIGVycm9yIGV4aXN0cywgaWYgc28sIHNldCBzdGF0ZVxuZnVuY3Rpb24gX2NoZWNrRXJyb3IoZmlsZSkge1xuICB2YXIgZXJyb3JNZXNzYWdlID0gbnVsbDtcbiAgaWYoICFmaWxlICkgZXJyb3JNZXNzYWdlID0gXCJFcnJvciBjcmVhdGluZyBmaWxlIG9uIEdvb2dsZSBEcml2ZSA6KFwiO1xuICBpZiggZmlsZS5lcnJvciApIGVycm9yTWVzc2FnZSA9IGZpbGUubWVzc2FnZTtcblxuICBpZiggZXJyb3JNZXNzYWdlICkge1xuICAgIF9zZXRNZXNzYWdlKGVycm9yTWVzc2FnZSwgXCJkYW5nZXJcIik7XG4gICAgJChcIiNleHBvcnQtY3N2XCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIkV4cG9ydFwiKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbiAgLy8gZXhwb3J0IGFzIGNzdlxuZnVuY3Rpb24gZXhwb3J0Q3N2KHJlc3VsdHMpIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnZXhwb3J0LWRyaXZlLWNzdicsIDEpO1xuXG4gICQoXCIjZXhwb3J0LWNzdlwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJFeHBvcnRpbmcuLi5cIik7XG5cbiAgdmFyIG5hbWUgPSAkKFwiI2V4cG9ydC1uYW1lXCIpLnZhbCgpO1xuICBpZiggbmFtZS5sZW5ndGggPT0gMCApIHtcbiAgICBfc2V0TWVzc2FnZShcIlBsZWFzZSBwcm92aWRlIGEgZm9sZGVyIG5hbWVcIiwgXCJkYW5nZXJcIilcbiAgICAkKFwiI2V4cG9ydC1jc3ZcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0XCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBkYXRhID0gcmVzdWx0cy5kYXRhO1xuXG4gIC8vIGNyZWF0ZSBhIGxpc3Qgc28gd2UgY2FuIHJlY3Vyc2l2ZWx5IGl0ZXJhdGVcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yKCB2YXIga2V5IGluIGRhdGEgKSBrZXlzLnB1c2goa2V5KTtcblxuICAvLyBjcmVhdGUgZm9sZGVyXG4gIF9zZXRNZXNzYWdlKFwiQ3JlYXRpbmcgZXhwb3J0IGZvbGRlci4uLlwiLCBcImluZm9cIiwgdHJ1ZSk7XG4gIF91cGRhdGVQcm9ncmVzcygxLCBrZXlzLmxlbmd0aCsyKTtcbiAgZ2RyaXZlLnNhdmVGaWxlKG5hbWUsXCJBSEIgM1BHIE1vZGVsIFJlc3VsdHNcIixcImFwcGxpY2F0aW9uL3ZuZC5nb29nbGUtYXBwcy5mb2xkZXJcIixcIlwiLGZ1bmN0aW9uKGZpbGUpe1xuICAgIGlmKCBfY2hlY2tFcnJvcihmaWxlKSApIHJldHVybjtcbiAgICB2YXIgcGFyZW50ID0gZmlsZS5pZDtcbiAgICBfdXBkYXRlUHJvZ3Jlc3MoMiwga2V5cy5sZW5ndGgrMik7XG5cbiAgICAvLyBjcmVhdGUgYSBuaWNlIGZpbGUgZGVzY3JpYmluZyB0aGUgY3VycmVudCBleHBvcnRcbiAgICBfc2V0TWVzc2FnZShcIkNyZWF0aW5nIGNvbmZpZyBmaWxlLi4uXCIsIFwiaW5mb1wiLCB0cnVlKTtcbiAgICBkZWxldGUgcmVzdWx0cy5jb25maWcucGxhbnRhdGlvbl9zdGF0ZTtcbiAgICB2YXIgY29uZmlnID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0cy5jb25maWcsbnVsbCxcIiAgXCIpO1xuICAgIGdkcml2ZS5zYXZlRmlsZShcImNvbmZpZy50eHRcIixcIkFIQiAzUEcgTW9kZWwgLSBSdW4gQ29uZmlndXJhdGlvblwiLFwidGV4dC9wbGFpblwiLGNvbmZpZyxmdW5jdGlvbihmaWxlKXtcbiAgICAgIGlmKCBfY2hlY2tFcnJvcihmaWxlKSApIHJldHVybjtcbiAgICAgIF91cGRhdGVQcm9ncmVzcygzLCBrZXlzLmxlbmd0aCsyKTtcblxuICAgICAgX2NyZWF0ZUV4cG9ydCgwLCBrZXlzLCBkYXRhLCBwYXJlbnQpO1xuICAgIH0se3BhcmVudDogcGFyZW50fSlcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVFeHBvcnQoaW5kZXgsIGtleXMsIGRhdGEsIHBhcmVudCkge1xuXG4gIC8vIHdlIGFyZSBhbGwgZG9uZSA6KVxuICBpZiggaW5kZXggPT0ga2V5cy5sZW5ndGggKSB7XG4gICAgX3VwZGF0ZVByb2dyZXNzKDEsIDEpO1xuICAgIF9zZXRNZXNzYWdlKFwiRXhwb3J0IFN1Y2Nlc3NmdWwuPGJyIC8+PGEgaHJlZj0naHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tLyNmb2xkZXJzL1wiICsgcGFyZW50ICtcbiAgICAgICAgICBcIicgdGFyZ2V0PSdfYmxhbmsnPjxpIGNsYXNzPSdpY29uLWV4dGVybmFsLWxpbmstc2lnbic+PC9pPiBPcGVuIGluIEdvb2dsZSBEcml2ZTwvYT5cIiwgXCJzdWNjZXNzXCIpO1xuICAgICQoXCIjZXhwb3J0LWNzdlwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJFeHBvcnRcIik7XG4gIH0gZWxzZSB7XG5cbiAgICB2YXIga2V5ID0ga2V5c1tpbmRleF07XG4gICAgdmFyIGNzdiA9IFwiXCI7XG5cbiAgICAvLyBUT0RPOiBhZGQgbW9udGggYW5kIGRhdGVcblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZGF0YVtrZXldLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIGRhdGFba2V5XVtpXS5sZW5ndGggPT0gMCApIGNvbnRpbnVlOyAvLyBpZ25vcmUgdGhlIGJsYW5rIHJvd3NcblxuICAgICAgZm9yKCB2YXIgaiA9IDA7IGogPCBkYXRhW2tleV1baV0ubGVuZ3RoOyBqKysgKSBjc3YgKz0gZGF0YVtrZXldW2ldW2pdK1wiLFwiO1xuICAgICAgY3N2ID0gY3N2LnJlcGxhY2UoLywkLywnJykrXCJcXG5cIjtcbiAgICB9XG5cbiAgICBfc2V0TWVzc2FnZShcIkNyZWF0aW5nIFwiK2tleXNbaW5kZXhdK1wiLmNzdi4uLiBcIiwgXCJpbmZvXCIsIHRydWUpO1xuICAgIGdkcml2ZS5zYXZlRmlsZShrZXlzW2luZGV4XStcIi5jc3ZcIixcIlwiLFwidGV4dC9jc3ZcIixjc3YsZnVuY3Rpb24oZmlsZSl7XG4gICAgICBpZiggX2NoZWNrRXJyb3IoZmlsZSkgKSByZXR1cm47XG5cbiAgICAgIF91cGRhdGVQcm9ncmVzcyhpbmRleCs0LCBrZXlzLmxlbmd0aCsyKTtcblxuICAgICAgaW5kZXgrKztcbiAgICAgIF9jcmVhdGVFeHBvcnQoaW5kZXgsIGtleXMsIGRhdGEsIHBhcmVudCk7XG4gICAgfSx7Y29udmVydDogdHJ1ZSwgcGFyZW50OiBwYXJlbnR9KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGV4cG9ydENzdiA6IGV4cG9ydENzdixcbiAgaW5pdCAgICAgIDogaW5pdFxufTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9icm93c2Vyc3RhY2svZmxhc2hibG9jay1kZXRlY3RvclxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNhbGxiYWNrTWV0aG9kKXtcbiAgICB2YXIgcmV0dXJuX3ZhbHVlID0gMDtcblxuICAgIGlmKG5hdmlnYXRvci5wbHVnaW5zW1wiU2hvY2t3YXZlIEZsYXNoXCJdKSB7XG4gICAgICAgICAgZW1iZWRfbGVuZ3RoID0gJCgnZW1iZWQnKS5sZW5ndGg7XG4gICAgICAgICAgb2JqZWN0X2xlbmd0aCA9ICQoJ29iamVjdCcpLmxlbmd0aDtcblxuICAgICAgICAgIGlmKChlbWJlZF9sZW5ndGggPiAwKSB8fCAob2JqZWN0X2xlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICAgIC8qIE1hYyAvIENocm9tZSB1c2luZyBGbGFzaEJsb2NrICsgTWFjIC8gU2FmYXJpIHVzaW5nIEFkQmxvY2sgKi9cbiAgICAgICAgICAgICAgJCgnb2JqZWN0LCBlbWJlZCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCQodGhpcykuY3NzKCdkaXNwbGF5JykgPT09ICdub25lJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5fdmFsdWUgPSAyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8qIE1hYyAvIEZpcmVmb3ggdXNpbmcgRmxhc2hCbG9jayAqL1xuICAgICAgICAgICAgICBpZiggJCgnZGl2W2JnaW5hY3RpdmVdJykubGVuZ3RoID4gMCApe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5fdmFsdWUgPSAyO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgIH0gZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ01TSUUnKSA+IC0xKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgbmV3IEFjdGl2ZVhPYmplY3QoJ1Nob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoJyk7XG4gICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgIHJldHVybl92YWx1ZSA9IDI7XG4gICAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgICAgLyogSWYgZmxhc2ggaXMgbm90IGluc3RhbGxlZCAqL1xuICAgICAgICAgIHJldHVybl92YWx1ZSA9IDE7XG4gICAgfVxuXG4gICAgaWYoY2FsbGJhY2tNZXRob2QgJiYgdHlwZW9mKGNhbGxiYWNrTWV0aG9kKSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY2FsbGJhY2tNZXRob2QocmV0dXJuX3ZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByZXR1cm5fdmFsdWU7XG4gICAgfVxufTtcbiIsInZhciBPYXV0aCA9IHJlcXVpcmUoJy4vb2F1dGgnKTtcbnZhciBnZHJpdmVSVCA9IHJlcXVpcmUoJy4vZ2RyaXZlUlQnKTtcbnZhciBhcHA7XG5cblxudmFyIE1JTUVfVFlQRSA9IFwiYXBwbGljYXRpb24vdm5kLmFoYi0zcGcucnVuXCI7XG52YXIgVFJFRV9NSU1FX1RZUEUgPSBcImFwcGxpY2F0aW9uL3ZuZC5haGItM3BnLnRyZWVcIjtcbnZhciBEUklWRV9BUElfVkVSU0lPTiA9IFwidjJcIjtcblxuLy8gZ29vZ2xlIG9hdXRoIGFjY2VzcyB0b2tlblxudmFyIHRva2VuID0gXCJcIjtcblxuLy8gY3VycmVudGx5IGxvYWRlZCBnZHJpdmUgZmlsZSBpZFxudmFyIGxvYWRlZEZpbGUgPSBudWxsO1xuLy8gbGlzdCBvZiBjdXJyZW50bHkgbG9hZGVkIGZpbGVzIChtZXRhZGF0YSlcbnZhciBmaWxlTGlzdCA9IFtdO1xuLy8gZ29vZ2xlIGRyaXZlIHNoYXJlIGNsaWVudFxudmFyIGNsaWVudCA9IG51bGw7XG5cbi8vIGxvYWRlZCB0cmVlIGFuZCBtYW5hZ2VtZW50XG52YXIgbG9hZGVkVHJlZSA9IG51bGw7XG4vLyBsaXN0IG9mIGN1cnJlbnRseSBsb2FkZWQgdHJlZSBmaWxlcyAobWV0YWRhdGEpXG52YXIgdHJlZUxpc3QgPSBbXTtcblxuLy8gY3VycmVudCBNSU1FIFRZUEUgd2UgYXJlIHNhdmluZ1xudmFyIHNhdmVNaW1lVHlwZSA9IFwiXCI7XG5cbi8qKipcbiAqICBJbml0aWFsaXplIGdvb2dsZSBkcml2ZSBwYW5lbHMsIGJ0bnMgYW5kIGxvZ2luXG4gKioqL1xuZnVuY3Rpb24gaW5pdChhcHBsaWNhdGlvbiwgY2FsbGJhY2spIHtcbiAgYXBwID0gYXBwbGljYXRpb247XG4gIGdkcml2ZVJULnNldEFwcChhcHApO1xuXG4gIC8vIGluaXQgYm9vdHN0cmFwIG1vZGFsXG4gICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIC8vIGluaXQgYm9vdHN0cmFwIG1vZGFsXG4gICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIC8vIHRoZSBhYm91dCBtb2RhbCBsaW5rIGlzIGNyZWF0ZWQgYmVsb3csIHNvIHdoeSBub3QuLi5cbiAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIC8vIHRoZSBhYm91dCBtb2RhbCBsaW5rIGlzIGNyZWF0ZWQgYmVsb3csIHNvIHdoeSBub3QuLi5cbiAgJChcIiNoZWxwLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gc2V0IHRoZSAndXBkYXRlJyBidG4gY2xpY2sgaGFuZGxlclxuICAkKFwiI3NhdmUtdXBkYXRlLWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBfdXBkYXRlQ3VycmVudEZpbGUoKTtcbiAgfSk7XG5cbiAgLy8gc2V0IHRoZSAnbmV3JyBidG4gY2xpY2sgaGFuZGxlclxuICAkKFwiI3NhdmUtbmV3LWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBfc2F2ZU5ld0ZpbGUoKTtcbiAgfSk7XG5cbiAgLy8gY3JlYXRlIHRoZSB0b3AgcmlnaHQgbWVudVxuICBfY3JlYXRlTG9naW5CdG4oKTtcblxuICAvLyBsb2FkIHRoZSBnb29nbGUgYXV0aCBhbmQgZHJpdmUgYXBpJ3NcbiAgX2xvYWRBcGkoZnVuY3Rpb24oKSB7XG4gICAgLy8gaWYgdGhlIHVzZXIgaXMgYXV0aG9yaXplZCBncmFiIHRoZSByZWZyZXNoIHRva2VuXG4gICAgT2F1dGguaXNBdXRob3JpemVkKGZ1bmN0aW9uKHJlZnJlc2hUb2tlbil7XG4gICAgICAvLyBpZiB0aGVyZSBpcyBubyByZWZyZXNoIHRva2VuLCBsZWF2ZSwgd2UgYXJlIGluaXRpYWxpemVkXG4gICAgICBpZiggIXJlZnJlc2hUb2tlbiApIHJldHVybiBjYWxsYmFjaygpO1xuXG4gICAgICAvLyBpZiB3ZSBoYXZlIGEgcmVmZXNoIHRva2VuLCB0aGVuIHVzZXIgaXMgYWxsIHNldCxcbiAgICAgIC8vIGdldCBhIG5ldyBhY2Nlc3MgdG9rZW4gc28gd2UgY2FuIHN0YXJ0IHVzaW5nIHRoZSBhcGknc1xuICAgICAgLy8gZ3JhYiB0aGVpciBpbmZvcm1hdGlvbiBhbmQgZGlzcGxheVxuICAgICAgT2F1dGguZ2V0QWNjZXNzVG9rZW4oZnVuY3Rpb24odCl7XG4gICAgICAgIHRva2VuID0gdDtcbiAgICAgICAgaWYoIHRva2VuICkgX3NldFVzZXJJbmZvKCk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGNoZWNrIGlmIGFjY2VzcyB0b2tlbiBoYXMgZXhwaXJlZFxuICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgX2NoZWNrVG9rZW4oKTtcbiAgICB9LCAxMDAwICogNSAqIDYwKTtcbiAgfSk7XG5cbiAgLy8gc2V0dXAgdGhlIHRyZWUgJ3NoYXJlJyBidG5cbiAgJChcIiNzaGFyZS10cmVlLWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIC8vIHNlZSBpZiB3ZSBoYXZlIGEgc2hhcmUgY2xpZW50XG4gICAgaWYoIGNsaWVudCA9PSBudWxsICkge1xuICAgICAgLy8gbm8gY2xpZW50LCBsb2FkIGFwaVxuICAgICAgZ2FwaS5sb2FkKCdkcml2ZS1zaGFyZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIG9uIGxvYWQsIHNob3cgdGhlIHNoYXJlIHBvcHVwIHdpdGggdGhlIGN1cnJlbnQgdHJlZVxuICAgICAgICAgY2xpZW50ID0gbmV3IGdhcGkuZHJpdmUuc2hhcmUuU2hhcmVDbGllbnQoT2F1dGguQVBQX0lEKTtcbiAgICAgICAgICBjbGllbnQuc2V0SXRlbUlkcyhbbG9hZGVkVHJlZV0pO1xuICAgICAgICAgY2xpZW50LnNob3dTZXR0aW5nc0RpYWxvZygpO1xuICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB3ZSBoYXZlIGEgY2xpZW50LCBzaG93IHRoZSBzaGFyZSBwb3B1cCB3aXRoIGN1cnJlbnQgdHJlZVxuICAgICAgY2xpZW50LnNldEl0ZW1JZHMoW2xvYWRlZEZpbGVdKTtcbiAgICAgICBjbGllbnQuc2hvd1NldHRpbmdzRGlhbG9nKCk7XG4gICAgfVxuICB9KTtcblxufVxuXG4vKioqXG4gKiBTYXZlIHRoZSBjdXJyZW50IG1vZGVsIGFzIGEgbmV3IGdvb2dsZSBkcml2ZSBmaWxlXG4gKioqL1xuZnVuY3Rpb24gX3NhdmVOZXdGaWxlKCkge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdzYXZlLWRyaXZlLWZpbGUnLCAxKTtcblxuICAvLyBncmFiIHRoZSBuYW1lIG9mIHRoZSBuZXcgZmlsZVxuICB2YXIgbmFtZSA9ICQoXCIjc2F2ZS1uYW1lLWlucHV0XCIpLnZhbCgpO1xuICBpZiggbmFtZS5sZW5ndGggPT0gMCApIHsgLy8gd2UgYWx3YXlzIHdhbnQgYSBuYW1lLCBhbGVydCBhbmQgcXVpdFxuICAgIF9zZXRTYXZlTWVzc2FnZSgnUGxlYXNlIHByb3ZpZGUgYSBmaWxlbmFtZS4nLCdpbmZvJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gc2VlIHdoYXQga2luZCBvZiBmaWxlIHdlIGFyZSBjcmVhdGluZyBiYXNlZCBvbiB0aGUgc2F2ZU1pbWVUeXBlIHZhclxuICBpZiggc2F2ZU1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICBkYXRhID0gYXBwLmdldE1vZGVsSU8oKS5leHBvcnRTZXR1cCgpO1xuICB9IGVsc2UgaWYgKCBzYXZlTWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7XG4gICAgZGF0YSA9IGFwcC5nZXRNb2RlbElPKCkuZXhwb3J0U2V0dXAoKS50cmVlO1xuICB9IGVsc2UgeyAvLyBiYWRuZXNzXG4gICAgYWxlcnQoXCJVbmtub3duIE1JTUVfVFlQRTogXCIrc2F2ZU1pbWVUeXBlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBzZXQgdGhlIHVzZXIga25vdyB3aGF0IHdlIGFyZSBkb2luZ1xuICBfc2V0U2F2ZU1lc3NhZ2UoJzxpIGNsYXNzPVwiaWNvbi1zcGlubmVyIGljb24tc3BpblwiPjwvaT4gU2F2aW5nIEZpbGUuLi4nLCdpbmZvJyk7XG5cbiAgLy8gc2F2ZSB0aGUgZmlsZVxuICBzYXZlRmlsZShuYW1lLFxuICAgICAgJChcIiNzYXZlLWRlc2NyaXB0aW9uLWlucHV0XCIpLnZhbCgpLFxuICAgICAgc2F2ZU1pbWVUeXBlLFxuICAgICAgZGF0YSxcbiAgICAgIGZ1bmN0aW9uKHJlc3ApIHtcbiAgICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2hhdCBoYXBwZW5lZFxuICAgICAgICBpZiggcmVzcC5lcnJvciApIHJldHVybiBfc2V0U2F2ZU1lc3NhZ2UoJ0ZhaWxlZCB0byBzYXZlIHRvIEdvb2dsZSBEcml2ZSA6KCcsJ2RhbmdlcicpO1xuICAgICAgICBlbHNlIF9zZXRTYXZlTWVzc2FnZSgnU3VjZXNzZnVsbHkgc2F2ZWQuJywnc3VjY2VzcycpO1xuXG4gICAgICAgIC8vIHdhaXQgYSB0aWNrIHRvIGhpZGUgdGhlIHBvcHVwLCBzbyB1c2VyIHNlZXMgc3VjY2VzcyBtZXNzYWdlXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKFwiI3NhdmUtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgfSwxNTAwKTtcblxuICAgICAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5cbiAgICAgICAgaWYoIHNhdmVNaW1lVHlwZSA9PSBNSU1FX1RZUEUgKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBhIG5ldyBmaWxlLCB1cGRhdGUgb3VyIGxpc3RcbiAgICAgICAgICBfdXBkYXRlRmlsZUxpc3QoKTtcblxuICAgICAgICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0bnNcbiAgICAgICAgICAkKFwiI3NoYXJlLWJ0blwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgICAgJChcIiNvcGVuLWluLWRyaXZlXCIpLmF0dHIoXCJocmVmXCIsXCJodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9maWxlL2QvXCIrcmVzcC5pZCkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgZmlsZSBpZFxuICAgICAgICAgIGxvYWRlZEZpbGUgPSByZXNwLmlkO1xuICAgICAgICB9IGVsc2UgaWYgKCBzYXZlTWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBhIG5ldyB0cmVlLCB1cGRhdGUgdGhlIGxpc3RcbiAgICAgICAgICBfdXBkYXRlVHJlZUxpc3QoKTtcblxuICAgICAgICAgIC8vIHNob3cgdGhlIHRyZWUgc2hhcmUgYnRuc1xuICAgICAgICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuc2hvdygpO1xuICAgICAgICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKG5hbWUpLnBhcmVudCgpLnNob3coKTtcblxuICAgICAgICAgIC8vIHNldCB0aGUgbG9hZGVkIHRyZWVzXG4gICAgICAgICAgbG9hZGVkVHJlZSA9IHJlc3AuaWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgKTtcbn1cblxuLyoqKlxuICogVXBkYXRlIHRoZSBjdXJyZW50bHkgbG9hZGVkIGdvb2dsZSBkcml2ZSBmaWxlXG4gKioqL1xuZnVuY3Rpb24gX3VwZGF0ZUN1cnJlbnRGaWxlKCkge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd1cGRhdGUtZHJpdmUtZmlsZScsIDEpO1xuXG4gIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gIF9zZXRTYXZlTWVzc2FnZSgnPGkgY2xhc3M9XCJpY29uLXNwaW5uZXIgaWNvbi1zcGluXCI+PC9pPiBVcGRhdGluZy4uLicsJ2luZm8nKTtcblxuICB2YXIgZmlsZSA9IHt9O1xuICB2YXIgZGF0YSA9IHt9O1xuXG4gIC8vIGdyYWIgdGhlIGNvcnJlbnQgZGF0YSBhbmQgZmlsZWlkIGJhc2VkIG9uIG1pbWVUeXBlXG4gIGlmKCBzYXZlTWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgIGZpbGUgPSBsb2FkZWRGaWxlO1xuICAgIGRhdGEgPSBhcHAuZ2V0TW9kZWxJTygpLmV4cG9ydFNldHVwKCk7XG4gIH0gZWxzZSBpZiAoIHNhdmVNaW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHtcbiAgICBmaWxlID0gbG9hZGVkVHJlZTtcbiAgICBkYXRhID0gYXBwLmdldE1vZGVsSU8oKS5leHBvcnRTZXR1cCgpLnRyZWU7XG4gIH0gZWxzZSB7IC8vIGJhZG5lc3NcbiAgICBhbGVydChcIlVua25vd24gTUlNRV9UWVBFOiBcIitzYXZlTWltZVR5cGUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHVwZGF0ZSB0aGUgZ29vZ2xlIGRyaXZlIGZpbGVcbiAgdXBkYXRlRmlsZShmaWxlLFxuICAgICAgZGF0YSxcbiAgICAgIGZ1bmN0aW9uKHJlc3Ape1xuICAgICAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3aGF0IGhhcHBlbmVkXG4gICAgICAgIGlmKCByZXNwLmVycm9yICkgcmV0dXJuIF9zZXRTYXZlTWVzc2FnZSgnRmFpbGVkIHRvIHVwZGF0ZSBvbiBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcbiAgICAgICAgZWxzZSBfc2V0U2F2ZU1lc3NhZ2UoJ1VwZGF0ZSBTdWNjZXNzZnVsLicsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAvLyB3YWl0IGEgdGljayBzbyB0aGUgdXNlciBrbm93cyB1cGRhdGUgd2FzIHN1Y2Nlc3NcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICB9LDE1MDApO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbGlzdCBmb3Igd2hhdGV2ZXIgdHlwZSB3YXMgdXBkYXRlZFxuICAgICAgICBpZiggc2F2ZU1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICAgICAgICBfdXBkYXRlRmlsZUxpc3QoKTtcbiAgICAgICAgfSBlbHNlIGlmICggc2F2ZU1pbWVUeXBlID09IFRSRUVfTUlNRV9UWVBFICkge1xuICAgICAgICAgIF91cGRhdGVUcmVlTGlzdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICk7XG59XG5cbi8qKipcbiAqIHNldCBhIG1lc3NhZ2UgZm9yIHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwb3B1cC5cbiAqICB0eXBlIC0gYm9vc3RyYXAgYWxlcnQgdHlwZVxuICoqKi9cbmZ1bmN0aW9uIF9zZXRMb2FkTWVzc2FnZShtc2csIHR5cGUpIHtcbiAgaWYoICFtc2cgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1tc2dcIikuaHRtbChcIlwiKTtcbiAgJCgnI2dkcml2ZS1maWxlLW1zZycpLmh0bWwoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC0nK3R5cGUrJ1wiPicrbXNnKyc8L2Rpdj4nKTtcbn1cblxuLyoqKlxuICogc2V0IGEgbWVzc2FnZSBmb3IgdGhlICdzYXZlIHRvIGRyaXZlJyBwb3B1cFxuICogdHlwZSAtIGJvb3N0cmFwIGFsZXJ0IHR5cGVcbiAqKiovXG5mdW5jdGlvbiBfc2V0U2F2ZU1lc3NhZ2UobXNnLCB0eXBlKSB7XG4gIGlmKCAhbXNnICkgcmV0dXJuICQoXCIjZ2RyaXZlLXNhdmUtbXNnXCIpLmh0bWwoXCJcIik7XG4gICQoJyNnZHJpdmUtc2F2ZS1tc2cnKS5odG1sKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtJyt0eXBlKydcIj4nK21zZysnPC9kaXY+Jyk7XG59XG5cbi8qKipcbiAqIGNyZWF0ZSB0aGUgdG9wIHJpZ2h0IG1lbnUuIFRoaXMgbWVudSBpcyBmb3Igd2hlbiB0aGUgdXNlciBpcyBub3QgbG9nZ2VkIGluXG4gKioqL1xuZnVuY3Rpb24gX2NyZWF0ZUxvZ2luQnRuKCkge1xuICB2YXIgYnRuID0gJCgnPGxpIGNsYXNzPVwiZHJvcGRvd25cIj4nXG4gICAgICArICc8YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZVwiIHN0eWxlPVwiY3Vyc29yOnBvaW50ZXJcIj5Mb2dpbjxiIGNsYXNzPVwiY2FyZXRcIj48L2I+PC9hPidcbiAgICAgICsgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJoZWxwXCI+PGkgY2xhc3M9XCJpY29uLXF1ZXN0aW9uLXNpZ25cIj48L2k+IEhlbHA8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJhYm91dFwiPjxpIGNsYXNzPVwiaWNvbi1pbmZvLXNpZ25cIj48L2k+IEFib3V0PC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwibG9naW4td2l0aC1nb29nbGVcIj48aSBjbGFzcz1cImljb24tc2lnbmluXCI+PC9pPiBMb2dpbiB3aXRoIEdvb2dsZTwvYT48L2xpPidcbiAgICAgICsgJzwvdWw+PC9saT4nKTtcblxuICAvLyBzZXQgY2xpY2sgaGFuZGxlcnMgZm9yIHBvcHVwXG4gIGJ0bi5maW5kKCdhLmRyb3Bkb3duLXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICB9KTtcblxuICAvLyBhYm91dCBjbGljayBoYW5kbGVyXG4gIGJ0bi5maW5kKCcjYWJvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gIGJ0bi5maW5kKCcjaGVscCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIHNob3dIZWxwKCk7XG4gIH0pO1xuXG4gIC8vIGxvZ2luIGNsaWNrIGhhbmRsZXJcbiAgYnRuLmZpbmQoJyNsb2dpbi13aXRoLWdvb2dsZScpLm9uKCdjbGljaycsZnVuY3Rpb24oKSB7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAndXNlci1sb2dpbicsIDEpO1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIHNpZ25JbihmdW5jdGlvbih0b2tlbikge1xuICAgICAgX3NldFVzZXJJbmZvKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIGFkZCBtZW51XG4gICQoXCIjbG9naW4taGVhZGVyXCIpLmh0bWwoXCJcIikuYXBwZW5kKGJ0bik7XG59O1xuXG4vKioqXG4gKiBDcmVhdGUgdGhlIHRvcCByaWdodCBtZW51IGZvciB3aGVuIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICoqKi9cbmZ1bmN0aW9uIF9jcmVhdGVMb2dvdXRCdG4odXNlcmRhdGEpIHtcbiAgLy8gc2V0IGJ0biBodG1sXG4gIHZhciBidG4gPSAkKCc8bGkgY2xhc3M9XCJkcm9wZG93blwiPidcbiAgICAgICsgJzxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlXCIgc3R5bGU9XCJjdXJzb3I6cG9pbnRlclwiPjxpbWcgY2xhc3M9XCJpbWctcm91bmRlZFwiIHNyYz1cIicrdXNlcmRhdGEucGljdHVyZVxuICAgICAgKyAnXCIgc3R5bGU9XCJtYXJnaW46LTVweCA1cHggLTVweCAwO3dpZHRoOjI4cHg7aGVpZ2h0OjI4cHg7Ym9yZGVyOjFweCBzb2xpZCB3aGl0ZVwiIC8+ICcgKyB1c2VyZGF0YS5uYW1lXG4gICAgICArICc8YiBjbGFzcz1cImNhcmV0XCI+PC9iPjwvYT4nICsgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJzYXZlXCI+PGkgY2xhc3M9XCJpY29uLWNsb3VkLXVwbG9hZFwiPjwvaT4gU2F2ZSBNb2RlbDwvYT48L2xpPidcbiAgICAgICsgJzxsaSBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxhIGlkPVwic2hhcmUtYnRuXCI+PGkgY2xhc3M9XCJpY29uLXNoYXJlXCI+PC9pPiBTaGFyZSBNb2RlbDwvYT48L2xpPidcbiAgICAgICsgJzxsaSBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxhIGlkPVwib3Blbi1pbi1kcml2ZVwiIHRhcmdldD1cIl9ibGFua1wiPjxpIGNsYXNzPVwiaWNvbi1leHRlcm5hbC1saW5rLXNpZ25cIj48L2k+IE9wZW4gaW4gR29vZ2xlIERyaXZlPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwibG9hZFwiPjxpIGNsYXNzPVwiaWNvbi1jbG91ZC1kb3dubG9hZFwiPjwvaT4gTG9hZCBNb2RlbDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImhlbHBcIj48aSBjbGFzcz1cImljb24tcXVlc3Rpb24tc2lnblwiPjwvaT4gSGVscDwvYT48L2xpPidcbiAgICAgICsgJzxsaT48YSBpZD1cImFib3V0XCI+PGkgY2xhc3M9XCJpY29uLWluZm8tc2lnblwiPjwvaT4gQWJvdXQ8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJsb2dvdXRcIj48aSBjbGFzcz1cImljb24tc2lnbm91dFwiPjwvaT4gTG9nb3V0PC9hPjwvbGk+J1xuICAgICAgKyAnPC91bD48L2xpPicpO1xuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIHRvIHNob3cgbWVudVxuICBidG4uZmluZCgnYS5kcm9wZG93bi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgfSk7XG5cbiAgLy8gc2hvdyB0aGUgc2F2ZSBwb3B1cFxuICBidG4uZmluZCgnI3NhdmUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAvLyBzZXQgdGhlIGN1cnJlbnQgc2F2ZSBtaW1lVHlwZVxuICAgIHNhdmVNaW1lVHlwZSA9IE1JTUVfVFlQRTtcblxuICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgdHlwIHRoZXkgYXJlIHNhdmluZ1xuICAgICQoXCIjZ2RyaXZlLXNhdmUtc3ViaGVhZGVyXCIpLmh0bWwoXCI8aDU+U2F2ZSBNb2RlbDwvaDU+XCIpO1xuXG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cbiAgICAvLyBpZiB0aGUgZmlsZSBpcyBsb2FkZWQsIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICAgIGlmKCBsb2FkZWRGaWxlICE9IG51bGwpIHtcbiAgICAgIC8vIGdyYWIgdGhlIGN1cnJlbnQgZmlsZXMgbWV0YWRhdGFcbiAgICAgIHZhciBmaWxlID0ge307XG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgICBpZiggZmlsZUxpc3RbaV0uaWQgPT0gbG9hZGVkRmlsZSkge1xuICAgICAgICAgIGZpbGUgPSBmaWxlTGlzdFtpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBzaG93IHRoZSB1cGRhdGUgcGFuZWxcbiAgICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuc2hvdygpO1xuXG4gICAgICAvLyByZW5kZXIgdGhlIGZpbGVzIG1ldGFkYXRhIGluIHRoZSB1cGRhdGUgcGFuZWxcbiAgICAgIHZhciBkID0gbmV3IERhdGUoZmlsZS5tb2RpZmllZERhdGUpO1xuICAgICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbC1pbm5lclwiKS5odG1sKFwiPGI+XCIrZmlsZS50aXRsZStcIjwvYj48YnIgLz5cIiArXG4gICAgICAgICAgXCI8c3BhbiBzdHlsZT0nY29sb3I6Izg4OCc+XCIrZmlsZS5kZXNjcmlwdGlvbitcIjwvc3Bhbj48YnIgLz5cIitcbiAgICAgICAgICBcIjxzcGFuIHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDsnPkxhc3QgTW9kaWZpZWQ6IFwiICtcbiAgICAgICAgICBkLnRvRGF0ZVN0cmluZygpK1wiIFwiK2QudG9Mb2NhbGVUaW1lU3RyaW5nKCkrXCIgYnkgXCIrZmlsZS5sYXN0TW9kaWZ5aW5nVXNlck5hbWUrXCI8L3NwYW4+PGJyIC8+XCIrXG4gICAgICAgICAgXCI8YSBocmVmPSdodHRwczovL2RyaXZlLmdvb2dsZS5jb20vZmlsZS9kL1wiK2ZpbGUuaWQrXCInJyB0YXJnZXQ9J19ibGFuayc+PGkgY2xhc3M9J2ljb24tbGluayc+PC9pPiBcIiArXG4gICAgICAgICAgXCJMaW5rIHRvIFNoYXJlPC9hPiA8c3BhbiBzdHlsZT0nY29sb3I6Izg4OCc+KG11c3QgaGF2ZSBwZXJtaXNzaW9uKTwvc3Bhbj48YnIgLz48YnIgLz5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuaGlkZSgpO1xuICAgIH1cblxuICAgIC8vIGNsZWFyIGFueSBtZXNzYWdlXG4gICAgX3NldFNhdmVNZXNzYWdlKG51bGwpO1xuXG4gICAgLy8gc2hvdyB0aGUgc2F2ZSBwb3B1cFxuICAgICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICAvLyBjbGljayBoYW5kbGVyIGZvciBzaGFyZSBidG5cbiAgYnRuLmZpbmQoXCIjc2hhcmUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnb3Blbi1kcml2ZS1zaGFyZScsIDEpO1xuXG4gICAgLy8gaGFzIHRoZSBzaGFyZSBjbGllbnQgYmVlbiBsb2FkZWRcbiAgICBpZiggY2xpZW50ID09IG51bGwgKSB7XG4gICAgICAvLyBsb2FkIHRoZSBzaGFyZSBwb3B1cFxuICAgICAgZ2FwaS5sb2FkKCdkcml2ZS1zaGFyZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgc2hvdyB0aGUgc2hhcmUgcG9wdXBcbiAgICAgICAgIGNsaWVudCA9IG5ldyBnYXBpLmRyaXZlLnNoYXJlLlNoYXJlQ2xpZW50KE9hdXRoLkFQUF9JRCk7XG4gICAgICAgICAgY2xpZW50LnNldEl0ZW1JZHMoW2xvYWRlZEZpbGVdKTtcbiAgICAgICAgIGNsaWVudC5zaG93U2V0dGluZ3NEaWFsb2coKTtcbiAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2hvdyB0aGUgc2hhcmUgcG9wdXBcbiAgICAgIGNsaWVudC5zZXRJdGVtSWRzKFtsb2FkZWRGaWxlXSk7XG4gICAgICAgY2xpZW50LnNob3dTZXR0aW5nc0RpYWxvZygpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gc2hvdyBhYm91dCBwYW5lbFxuICBidG4uZmluZCgnI2Fib3V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICBidG4uZmluZCgnI2hlbHAnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICBzaG93SGVscCgpO1xuICB9KTtcblxuICAvLyBzaG93IHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwYW5lbFxuICBidG4uZmluZCgnI2xvYWQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblxuICAgIC8vIGhpZGUgYW55IGV4aXN0aW5nIG1lc3NhZ2VcbiAgICBfc2V0TG9hZE1lc3NhZ2UobnVsbCk7XG5cbiAgICAvLyByZW5kZXIgdGhlIG1vZGVsIGZpbGVzIGluIHRoZSBwb3B1cCBmaWxlc1xuICAgIF9zaG93RHJpdmVGaWxlcygpO1xuXG4gICAgLy8gc2hvdyB0aGUgbW9kYWxcbiAgICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgLy8gbG9hZCB0aGUgdXNlciBvdXRcbiAgYnRuLmZpbmQoJyNsb2dvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd1c2VyLWxvZ291dCcsIDEpO1xuXG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cbiAgICAvLyBraWxsIHRoZSBhY2Nlc3MgdG9rZW5cbiAgICB0b2tlbiA9IG51bGw7XG5cbiAgICAvLyB1cGRhdGUgdGhlIG1lbnUgcGFuZWxcbiAgICBfY3JlYXRlTG9naW5CdG4oKTtcbiAgfSk7XG5cbiAgLy8gYXR0YWNoIHRoZSBtZW51XG4gICQoXCIjbG9naW4taGVhZGVyXCIpLmh0bWwoXCJcIikuYXBwZW5kKGJ0bik7XG59O1xuXG4vKioqXG4gKiAgUmVxdWVzdCB0aGUgdXNlcidzIGluZm9ybWF0aW9uLiAgV2hlbiBsb2FkZWQsIHVwZGF0ZSB0aGUgdG9wIHJpZ2h0IG1lbnVcbiAqKiovXG5mdW5jdGlvbiBfc2V0VXNlckluZm8oKSB7XG4gIC8vIGxvYWQgdXNlciBuYW1lXG4gICQuYWpheCh7XG4gICAgdXJsIDogXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvdXNlcmluZm9cIixcbiAgICBiZWZvcmVTZW5kIDogZnVuY3Rpb24ocmVxdWVzdCkge1xuICAgICAgLy8gYWx3YXlzIHNldCB5b3VyIGFjY2VzcyBzdG9rZW5cbiAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwnQmVhcmVyICcrIHRva2VuLmFjY2Vzc190b2tlbik7XG4gICAgfSxcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSwgc3RhdHVzLHhocikge1xuICAgICAgLy8gcGFyc2UgeW91ciBqc29uIHJlc3BvbnNlXG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgIC8vIHVwZGF0ZSB0b3AgcmlnaHQgbWVudVxuICAgICAgX2NyZWF0ZUxvZ291dEJ0bihkYXRhKTtcblxuICAgICAgLy8gc2V0IHRvIHdpbmRvdyBzY29wZVxuICAgICAgd2luZG93LnVzZXJpbmZvID0gZGF0YTtcbiAgICB9LFxuICAgIGVycm9yIDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBUT0RPOiBzaG91bGQgd2UgYWxlcnQgdGhpcz9cbiAgICB9XG4gIH0pO1xuXG4gIC8vIGxvYWQgdXNlciBmaWxlcywgdHJlZXNcbiAgX3VwZGF0ZUZpbGVMaXN0KCk7XG4gIF91cGRhdGVUcmVlTGlzdCgpO1xufVxuXG4vKioqXG4gKiAgU2VhcmNoIGZvciB0aGUgdXNlcnMgbW9kZWxzXG4gKlxuICogVE9ETzogYWRkIHNlYXJjaCB0byB0aGUgZm9sbG93aW5nIGZ1bmN0aW9ucyxcbiAqICBsaW1pdCB0byAxMCByZXN1bHRzXG4gKioqL1xuZnVuY3Rpb24gX3VwZGF0ZUZpbGVMaXN0KCkge1xuICBsaXN0RmlsZXMoXCJtaW1lVHlwZSA9ICdcIitNSU1FX1RZUEUrXCInXCIsIGZ1bmN0aW9uKHJlc3Ape1xuICAgIGZpbGVMaXN0ID0gcmVzcC5yZXN1bHQuaXRlbXM7XG4gIH0pO1xufVxuXG4vKioqXG4gKiAgU2VhcmNoIGZvciB0aGUgdXNlcnMgdHJlZXNcbiAqXG4gKiBUT0RPOiBhZGQgc2VhcmNoIHRvIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zLFxuICogIGxpbWl0IHRvIDEwIHJlc3VsdHNcbiAqKiovXG5mdW5jdGlvbiBfdXBkYXRlVHJlZUxpc3QoKSB7XG4gIGxpc3RGaWxlcyhcIm1pbWVUeXBlID0gJ1wiK1RSRUVfTUlNRV9UWVBFK1wiJ1wiLCBmdW5jdGlvbihyZXNwKXtcbiAgICB0cmVlTGlzdCA9IHJlc3AucmVzdWx0Lml0ZW1zO1xuICB9KTtcbn1cblxuLyoqKlxuICogIFJlbmRlciB0aGUgdXNlcnMgY3VycmVudCBtb2RlbHMgb250byB0aGUgJ2xvYWQgZnJvbSBkcml2ZScgcG9wdXBcbiAqKiovXG5mdW5jdGlvbiBfc2hvd0RyaXZlRmlsZXMoKSB7XG4gIC8vIGlmIHRoZXkgaGF2ZSBubyBmaWxlcywgc2F5IHNvIGFuZCBnZXQgb3V0IG9mIGhlcmVcbiAgaWYoICFmaWxlTGlzdCApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIjxsaT5ObyBGaWxlczwvbGk+XCIpO1xuICBpZiggZmlsZUxpc3QubGVuZ3RoID09IDAgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmh0bWwoXCI8bGk+Tm8gRmlsZXM8L2xpPlwiKTtcblxuICAvLyBzaG93IGEgdGl0bGUsIHRoZXJlIGFyZSBtdWx0aXBsZSB0eXBlcyB0aGF0IGNhbiBiZSBsb2FkZWQgZnJvbSBkcml2ZVxuICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIjxoND5TZWxlY3QgRmlsZTwvaDQ+XCIpO1xuXG4gIC8vIGNyZWF0ZSB0aGUgbGlzdCBlbGVtZW50cyBmb3IgZWFjaCBmaWxlcyBtZXRhZGF0YVxuICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBpdGVtID0gZmlsZUxpc3RbaV07XG4gICAgdmFyIGQgPSBuZXcgRGF0ZShpdGVtLm1vZGlmaWVkRGF0ZSk7XG4gICAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZChcbiAgICAgICQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+PGEgaWQ9J1wiK2l0ZW0uaWQrXCInIHVybD0nXCIraXRlbS5kb3dubG9hZFVybCtcIicgc3R5bGU9J2N1cnNvcjpwb2ludGVyJz48aSBjbGFzcz0naWNvbi1maWxlJz48L2k+IFwiK2l0ZW0udGl0bGUrXCI8L2E+XCIgK1xuICAgICAgICBcIjxkaXYgc3R5bGU9J2NvbG9yOiM4ODg7cGFkZGluZzogNXB4IDAgMCAxMHB4Jz5cIitpdGVtLmRlc2NyaXB0aW9uK1wiPC9kaXY+XCIrXG4gICAgICAgIFwiPGRpdiBzdHlsZT0nZm9udC1zdHlsZTppdGFsaWM7Zm9udC1zaXplOjExcHg7cGFkZGluZy1sZWZ0OjEwcHgnPkxhc3QgTW9kaWZpZWQ6IFwiK2QudG9EYXRlU3RyaW5nKCkrXCIgXCIrZC50b0xvY2FsZVRpbWVTdHJpbmcoKStcIiBieSBcIitpdGVtLmxhc3RNb2RpZnlpbmdVc2VyTmFtZStcIjxkaXY+PC9saT5cIlxuICAgICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIGZvciBlYWNoIGZpbGVcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0IGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLWRyaXZlLW1vZGVsJywgMSk7XG5cbiAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcblxuICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgX3NldExvYWRNZXNzYWdlKCc8aSBjbGFzcz1cImljb24tc3Bpbm5lciBpY29uLXNwaW5cIj48L2k+IExvYWRpbmcgRmlsZS4uLicsJ2luZm8nKTtcblxuICAgIC8vIGdyYWIgdGhlIGZpdmUgZnJvbSBkcml2ZVxuICAgIGdldEZpbGUoaWQsICQodGhpcykuYXR0cihcInVybFwiKSwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgLy8gaWYgYmFkbmVzcywgbGV0IHRoZSB1c2VyIGtub3dcbiAgICAgIGlmKCAhZmlsZSAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCBmaWxlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICBpZiggZmlsZS5lcnJvciAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCBmaWxlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG5cbiAgICAgIC8vIGhpZGUgYW55IGxvYWRlZCB0cmVlcyxcbiAgICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuaGlkZSgpO1xuICAgICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwoXCJcIikucGFyZW50KCkuaGlkZSgpO1xuICAgICAgbG9hZGVkVHJlZSA9IG51bGw7XG5cbiAgICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdlIGFyZSBhbGwgZ29vZFxuICAgICAgX3NldExvYWRNZXNzYWdlKCdGaWxlIExvYWRlZC4nLCdzdWNjZXNzJyk7XG5cbiAgICAgIC8vIHNldCB0aGUgbG9hZGVkIGZpbGUgaWRcbiAgICAgIGxvYWRlZEZpbGUgPSBpZDtcblxuICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgZmlsZSBuYW1lXG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgICBpZiggaWQgPT0gZmlsZUxpc3RbaV0uaWQgKSB7XG4gICAgICAgICAgJChcIiNsb2FkZWQtbW9kZWwtdGl0bGVcIikuaHRtbChcIjxzcGFuIHN0eWxlPSdjb2xvcjojMzMzJz5Mb2FkZWQgTW9kZWwgPC9zcGFuPiBcIitmaWxlTGlzdFtpXS50aXRsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuXG4gICAgICAkKFwiI3NoYXJlLWJ0blwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAkKFwiI29wZW4taW4tZHJpdmVcIikuYXR0cihcImhyZWZcIixcImh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2ZpbGUvZC9cIitpZCkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAvLyBzZXR1cCBtb2RlbFxuICAgICAgYXBwLmdldE1vZGVsSU8oKS5sb2FkU2V0dXAoaWQsIGZpbGUpO1xuXG4gICAgICAvLyBzZXR1cCByZWFsdGltZSBldmVudHNcbiAgICAgIGdkcml2ZVJULmluaXRSdEFwaShsb2FkZWRGaWxlKTtcblxuICAgICAgLy8gd2FpdCBhIHRpY2sgc28gdXNlciBjYW4gc2VlIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAvLyBoaWRlIHRoZSBtb2RhbFxuICAgICAgICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIH0sMTUwMCk7XG5cbiAgICB9KTtcbiAgfSk7XG59XG5cbi8qKipcbiAqICBSZW5kZXIgdGhlIHVzZXJzIGN1cnJlbnQgdHJlZXMgb250byB0aGUgJ2xvYWQgZnJvbSBkcml2ZScgcG9wdXBcbiAqKiovXG5mdW5jdGlvbiBfc2hvd1RyZWVGaWxlcygpIHtcbiAgLy8gdXBkYXRlIHRoZSBsaXN0IGhlYWRlciwgbGV0IHVzZXIga25vdyB3aGF0IHRoZXkgYXJlIHNlbGVjdGluZ1xuICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIlwiKTtcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZCgkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPjxoNT5TZWxlY3QgVHJlZTwvaDU+PC9saT5cIikpO1xuXG4gIC8vIGlmIHRoZXJlIGFyZSBubyB0cmVlcywgc2F5IHNvIGFuZCBnZXQgb3V0IG9mIGhlcmVcbiAgaWYoICF0cmVlTGlzdCApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuYXBwZW5kKCQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+Tm8gVHJlZXMgQXZhaWxhYmxlPC9saT5cIikpO1xuICBpZiggdHJlZUxpc3QubGVuZ3RoID09IDAgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZCgkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPk5vIFRyZWVzIEF2YWlsYWJsZTwvbGk+XCIpKTtcblxuICAvLyBjcmVhdGUgdGhlIHRyZWUgbGlzdCBlbGVtZW50c1xuICBmb3IoIHZhciBpID0gMDsgaSA8IHRyZWVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBpdGVtID0gdHJlZUxpc3RbaV07XG4gICAgdmFyIGQgPSBuZXcgRGF0ZShpdGVtLm1vZGlmaWVkRGF0ZSk7XG4gICAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZChcbiAgICAgICQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+PGEgaWQ9J1wiK2l0ZW0uaWQrXCInIG5hbWU9J1wiK2l0ZW0udGl0bGUrXCInIHVybD0nXCIraXRlbS5kb3dubG9hZFVybCtcIicgc3R5bGU9J2N1cnNvcjpwb2ludGVyJz48aSBjbGFzcz0naWNvbi1sZWFmJz48L2k+IFwiK2l0ZW0udGl0bGUrXCI8L2E+XCIgK1xuICAgICAgICBcIjxkaXYgc3R5bGU9J2NvbG9yOiM4ODg7cGFkZGluZzogNXB4IDAgMCAxMHB4Jz5cIitpdGVtLmRlc2NyaXB0aW9uK1wiPC9kaXY+XCIrXG4gICAgICAgIFwiPGRpdiBzdHlsZT0nZm9udC1zdHlsZTppdGFsaWM7Zm9udC1zaXplOjExcHg7cGFkZGluZy1sZWZ0OjEwcHgnPkxhc3QgTW9kaWZpZWQ6IFwiK2QudG9EYXRlU3RyaW5nKCkrXCIgXCIrZC50b0xvY2FsZVRpbWVTdHJpbmcoKStcIiBieSBcIitpdGVtLmxhc3RNb2RpZnlpbmdVc2VyTmFtZStcIjxkaXY+PC9saT5cIlxuICAgICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIGZvciB0aXRsZXNcbiAgJChcIiNnZHJpdmUtZmlsZS1saXN0IGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLWRyaXZlLXRyZWUnLCAxKTtcblxuICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xuICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKFwibmFtZVwiKTtcblxuICAgIC8vIHRlbGwgdGhlIHVzZXIgd2UgYXJlIGxvYWRpbmdcbiAgICBfc2V0TG9hZE1lc3NhZ2UoJzxpIGNsYXNzPVwiaWNvbi1zcGlubmVyIGljb24tc3BpblwiPjwvaT4gTG9hZGluZyBUcmVlLi4uJywnaW5mbycpO1xuXG4gICAgLy8gbG9hZCBmaWxlIGZyb20gZHJpdmVcbiAgICBnZXRGaWxlKGlkLCAkKHRoaXMpLmF0dHIoXCJ1cmxcIiksIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIC8vIGlmIGJhZG5lc3MsIGxldCB1c2VyIGtub3dcbiAgICAgIGlmKCAhZmlsZSAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCB0cmVlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICBpZiggZmlsZS5lcnJvciAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCB0cmVlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG5cbiAgICAgIC8vIHNob3cgdGhlIHRyZWUgc2hhcmluZyBidG5zXG4gICAgICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLnNob3coKTtcbiAgICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKG5hbWUpLnBhcmVudCgpLnNob3coKTtcblxuICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2UgYXJlIHN1Y2Nlc2Z1bGxcbiAgICAgIF9zZXRMb2FkTWVzc2FnZSgnVHJlZSBMb2FkZWQuJywnc3VjY2VzcycpO1xuXG4gICAgICAvLyBzZXQgdGhlIGxvYWRlZCB0cmVlIGlkXG4gICAgICBsb2FkZWRUcmVlID0gaWQ7XG5cbiAgICAgIC8vIGxvYWRlZCB0cmVlIGludG8gbW9kZWwgLyBVSVxuICAgICAgYXBwLmdldE1vZGVsSU8oKS5sb2FkVHJlZShmaWxlKTtcblxuICAgICAgLy8gd2FpdCBhIHNlYyBzbyB1c2VyIGNhbiBzZWUgc3VjY2VzcyBtZXNzYWdlXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgfSwxNTAwKTtcblxuICAgIH0pO1xuICB9KTtcbn1cblxuLyoqKlxuICogIHNob3cgdGhlIHVzZXIgdGhlIGxvYWQgdHJlZSBwb3B1cFxuICoqKi9cbmZ1bmN0aW9uIHNob3dMb2FkVHJlZVBhbmVsKCkge1xuICAvLyByZW5kZXIgdGhlIHRyZWVzIGludG8gdGhlIHBvcHVwIGxpc3RcbiAgX3Nob3dUcmVlRmlsZXMoKTtcbiAgLy8gY2xlYXIgYW55IG1lc3NhZ2VzXG4gIF9zZXRMb2FkTWVzc2FnZShudWxsKTtcbiAgLy8gc2hvdyB0aGUgcG9wdXBcbiAgJChcIiNsb2FkLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG59XG5cbi8qKipcbiAqICBzaG93IHRoZSB1c2VyIHRoZSBzYXZlIHRyZWUgcG9wdXBcbiAqKiovXG5mdW5jdGlvbiBzaG93U2F2ZVRyZWVQYW5lbCgpIHtcbiAgLy8gc2V0IHRoZSBjdXJyZW50IG1pbWVUeXBlIHdlIGFyZSBzYXZpbmdcbiAgc2F2ZU1pbWVUeXBlID0gVFJFRV9NSU1FX1RZUEU7XG5cbiAgLy8gc2V0IHRoZSBoZWFkZXIgc28gdXNlciBrbm93cyB3aGF0IHR5cGUgdGhleSBhcmUgc2F2aW5nXG4gICQoXCIjZ2RyaXZlLXNhdmUtc3ViaGVhZGVyXCIpLmh0bWwoXCI8aDU+U2F2ZSBUcmVlPC9oNT5cIik7XG5cbiAgLy8gaWYgdGhlcmUgaXMgYSBjdXJyZW50IHRyZWUsIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICBpZiggbG9hZGVkVHJlZSAhPSBudWxsKSB7XG4gICAgLy8gZmluZCB0aGUgY3VycmVudCB0cmVlIGJhc2VkIG9uIGlkXG4gICAgdmFyIHRyZWUgPSB7fTtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRyZWVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHRyZWVMaXN0W2ldLmlkID09IGxvYWRlZFRyZWUpIHtcbiAgICAgICAgdHJlZSA9IHRyZWVMaXN0W2ldO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzaG93IHRoZSB1cGRhdGUgcGFuZWxcbiAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsXCIpLnNob3coKTtcblxuICAgIC8vIHJlbmRlciB0cmVlIG1ldGFkYXRhIG9uIHVwZGF0ZSBwYW5lbFxuICAgIHZhciBkID0gbmV3IERhdGUodHJlZS5tb2RpZmllZERhdGUpO1xuICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWwtaW5uZXJcIikuaHRtbChcIjxiPlwiK3RyZWUudGl0bGUrXCI8L2I+PGJyIC8+XCIgK1xuICAgICAgICBcIjxzcGFuIHN0eWxlPSdjb2xvcjojODg4Jz5cIit0cmVlLmRlc2NyaXB0aW9uK1wiPC9zcGFuPjxiciAvPlwiK1xuICAgICAgICBcIjxzcGFuIHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDsnPkxhc3QgTW9kaWZpZWQ6IFwiICtcbiAgICAgICAgZC50b0RhdGVTdHJpbmcoKStcIiBcIitkLnRvTG9jYWxlVGltZVN0cmluZygpK1wiIGJ5IFwiK3RyZWUubGFzdE1vZGlmeWluZ1VzZXJOYW1lK1wiPC9zcGFuPjxiciAvPlwiK1xuICAgICAgICBcIjxhIGhyZWY9J2h0dHBzOi8vZHJpdmUuZ29vZ2xlLmNvbS9maWxlL2QvXCIrdHJlZS5pZCtcIicnIHRhcmdldD0nX2JsYW5rJz48aSBjbGFzcz0naWNvbi1saW5rJz48L2k+IE9wZW4gaW4gR29vZ2xlIERyaXZlPC9hPlwiKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBkb24ndCBzaG93IHRoZSB1cGRhdGUgcGFuZWwsIHRoaXMgaXMgYSBuZXcgdHJlZVxuICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuaGlkZSgpO1xuICB9XG5cbiAgLy8gY2xlYXIgYW55IG1lc3NhZ2VcbiAgX3NldFNhdmVNZXNzYWdlKG51bGwpO1xuXG4gIC8vIHNob3cgdGhlIHBvcHVwXG4gICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xufVxuXG4vKioqXG4gKiBMb2FkIGEgbW9kZWwgYmFzZWQgb24gcGFzc2VkIGlkLiAgVGhpcyBmdW5jdGlvbiBpcyByZWFsbHkgb25seSBmb3IgbG9hZGluZyBtb2RlbCBvbiBzdGFydCwgd2hlbiBhIGZpbGUgaWRcbiAqIGhhcyBiZWVuIHBhc3NlZCBpbiB0aGUgdXJsIGVpdGhlciBmcm9tIGdvb2dsZSBkcml2ZSBvciBmcm9tIHRoZSA/ZmlsZT1pZCB1cmwuXG4gKioqL1xudmFyIGxvZ2luTW9kYWxJbml0ID0gZmFsc2U7XG5mdW5jdGlvbiBsb2FkKGlkLCBsb2FkRm4pIHtcbiAgLy8gaWYgd2UgZG9uJ3QgaGF2ZSBhbiBhY2Nlc3MgdG9rZW4sIHdlIG5lZWQgdG8gc2lnbiBpbiBmaXJzdFxuICAvLyBUT0RPOiBpZiB0aGlzIGlzIGEgcHVibGljIGZpbGUsIHRoZXJlIGlzIG5vIHJlYXNvbiB0byBzaWduIGluLi4uIHNvbHV0aW9uP1xuICBpZiggIXRva2VuICkge1xuXG4gICAgaWYoICFsb2dpbk1vZGFsSW5pdCApIHtcbiAgICAgICQoJyNnb29nbGUtbW9kYWwtbG9naW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAvLyBzaWduIHRoZSB1c2VyIGluIChmb3JjZSBvYXV0aCBwb3B1cClcbiAgICAgICAgc2lnbkluKGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgJCgnI2xvZ2luLW1vZGFsJykubW9kYWwoJ2hpZGUnKTtcblxuICAgICAgICAgIC8vIHNldCB0aGUgdXNlciBpbmZvcm1hdGlvbiBpbiB0b3AgbGVmdFxuICAgICAgICAgIF9zZXRVc2VySW5mbygpO1xuXG4gICAgICAgICAgaWYoIGxvYWRGbiApIGxvYWRGbigpO1xuXG4gICAgICAgICAgZ2V0RmlsZU1ldGFkYXRhKGlkLCBmdW5jdGlvbihtZXRhZGF0YSl7XG4gICAgICAgICAgICBnZXRGaWxlKGlkLCBtZXRhZGF0YS5kb3dubG9hZFVybCwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICAgICAgICBfb25Jbml0RmlsZUxvYWRlZChtZXRhZGF0YSxmaWxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgICQoJyNsb2dpbi1tb2RhbCcpLm1vZGFsKCk7XG4gICAgICBsb2dpbk1vZGFsSW5pdCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJyNsb2dpbi1tb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgaWYoIGxvYWRGbiApIGxvYWRGbigpO1xuXG4gICAgZ2V0RmlsZU1ldGFkYXRhKGlkLCBmdW5jdGlvbihtZXRhZGF0YSl7XG4gICAgICBnZXRGaWxlKGlkLCBtZXRhZGF0YS5kb3dubG9hZFVybCwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICBfb25Jbml0RmlsZUxvYWRlZChtZXRhZGF0YSxmaWxlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKipcbiAqIEluaXRpYWxpemUgVUkgLyBtb2RlbCB3aGVuIGEgZmlsZSBpcyBsb2FkZWQgYXQgc3RhcnRcbiAqKiovXG5mdW5jdGlvbiBfb25Jbml0RmlsZUxvYWRlZChtZXRhZGF0YSwgZmlsZSkge1xuICAvLyBiYWRkbmVzcywgbGV0IHRoZSB1c2VyIGtub3dcbiAgaWYoICFmaWxlICkge1xuICAgIGlmKCBoaWRlSW5pdExvYWRpbmcgKSBoaWRlSW5pdExvYWRpbmcoKTtcbiAgICByZXR1cm4gYWxlcnQoXCJGYWlsZWQgdG8gbG9hZCBmcm9tIEdvb2dsZSBEcml2ZSA6L1wiKTtcbiAgfVxuXG4gIC8vIG1ldGFkYXRhIGZhaWxlZCB0byBsb2FkLCBtb3JlIGJhZG5lc3NcbiAgaWYoIG1ldGFkYXRhLmNvZGUgPT0gNDA0ICkge1xuICAgIGlmKCBoaWRlSW5pdExvYWRpbmcgKSBoaWRlSW5pdExvYWRpbmcoKTtcbiAgICByZXR1cm4gYWxlcnQoXCJHb29nbGUgRHJpdmU6IFwiK21ldGFkYXRhLm1lc3NhZ2UpO1xuICB9XG5cbiAgLy8gd2UgbG9hZGVkIGEgbW9kZWwsIHNldHVwIGFuZCBydW5cbiAgaWYoIG1ldGFkYXRhLm1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICAvLyBzZXQgdGhlIGN1cnJlbnRseSBsb2FkZWQgZmlsZSBpZFxuICAgIGxvYWRlZEZpbGUgPSBtZXRhZGF0YS5pZDtcblxuICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0blxuICAgICQoXCIjc2hhcmUtYnRuXCIpLnBhcmVudCgpLnNob3coKTtcbiAgICAkKFwiI29wZW4taW4tZHJpdmVcIikuYXR0cihcImhyZWZcIixcImh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2ZpbGUvZC9cIittZXRhZGF0YS5pZCkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgLy8gc2hvdyB0aXRsZVxuICAgICQoXCIjbG9hZGVkLW1vZGVsLXRpdGxlXCIpLmh0bWwoXCI8c3BhbiBzdHlsZT0nY29sb3I6IzMzMyc+TG9hZGVkIE1vZGVsIDwvc3Bhbj4gXCIrbWV0YWRhdGEudGl0bGUpO1xuXG4gICAgLy8gc2V0dXAgbW9kZWxcbiAgICBhcHAuZ2V0TW9kZWxJTygpLmxvYWRTZXR1cChtZXRhZGF0YS5pZCwgZmlsZSk7XG5cbiAgICAvLyBzZXR1cCByZWFsdGltZSBldmVudHNcbiAgICBnZHJpdmVSVC5pbml0UnRBcGkobG9hZGVkRmlsZSk7XG4gIH0gZWxzZSBpZiAoIG1ldGFkYXRhLm1pbWVUeXBlID09IFRSRUVfTUlNRV9UWVBFICkgeyAvLyB3ZSBsb2FkZWQgYSB0cmVlXG4gICAgLy8gc2V0IHRoZSBsb2FkZWQgdHJlZSBpZFxuICAgIGxvYWRlZFRyZWUgPSBtZXRhZGF0YS5pZDtcblxuICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0blxuICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuc2hvdygpO1xuICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKG1ldGFkYXRhLnRpdGxlKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAvLyBzZXQgdGhlIGxvYWRlZCB0cmVlXG4gICAgYXBwLmdldE1vZGVsSU8oKS5sb2FkVHJlZShmaWxlKTtcblxuICAgIC8vIGhpZGUgdGhlIGxvYWRpbmcgcG9wdXBcbiAgICBpZiggaGlkZUluaXRMb2FkaW5nICkgaGlkZUluaXRMb2FkaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgYWxlcnQoXCJMb2FkZWQgdW5rbm93biBmaWxlIHR5cGUgZnJvbSBHb29nbGUgRHJpdmU6IFwiK21ldGFkYXRhLm1pbWVUeXBlKTtcbiAgfVxufVxuXG4vKioqXG4gKiB0b2tlbnMgZXhwaXJlLCBldmVyeSBvbmNlIGluIGF3aGlsZSBjaGVjayB0aGUgY3VycmVudCB0b2tlbiBoYXNuJ3RcbiAqIGlmIGl0IGhhcywgdGhlbiB1cGRhdGVcbiAqKiovXG5mdW5jdGlvbiBfY2hlY2tUb2tlbigpIHtcbiAgLy8gaWdub3JlIGlmIHRoZXJlIGlzIG5vIHRva2VuXG4gIGlmICghdG9rZW4pIHJldHVybjtcblxuICAvLyBvdGhlcndpc2UsIGxvb2sgdG8gdXBkYXRlIHRoZSBhY2Nlc3MgdG9rZW5cbiAgT2F1dGguZ2V0QWNjZXNzVG9rZW4oZnVuY3Rpb24odCkge1xuICAgIGlmKCB0ICE9IG51bGwgKSB0b2tlbiA9IHQ7XG4gIH0pO1xufTtcblxuLyoqKlxuICogaXMgdGhlIGN1cnJlbnQgdXNlciBzaWduZWQgaW4/XG4gKioqL1xuZnVuY3Rpb24gY2hlY2tTaWduZWRJbihjYWxsYmFjaykge1xuICAvLyBpZiBpc0F1dGhlcml6ZWQgcmV0dXJucyBhIHRva2VuLCB1c2VyIGlzIGxvZ2dlZCBpblxuICBPYXV0aC5pc0F1dGhvcml6ZWQoZnVuY3Rpb24odG9rZW4pe1xuICAgIGlmICh0b2tlbiAhPSBudWxsKSBjYWxsYmFjayh0cnVlKTtcbiAgICBlbHNlIGNhbGxiYWNrKGZhbHNlKTtcbiAgfSk7XG59O1xuXG4vKioqXG4gKiBTaWduIGEgdXNlciBpbiB1c2luZyB0aGUgT2F1dGggY2xhc3NcbiAqKiovXG5mdW5jdGlvbiBzaWduSW4oY2FsbGJhY2spIHtcbiAgT2F1dGguYXV0aG9yaXplKGZ1bmN0aW9uKHQpe1xuICAgIHRva2VuID0gdDtcbiAgICBpZiAodG9rZW4gIT0gbnVsbCkge1xuICAgICAgaWYoIHQuZXJyb3IgKSByZXR1cm4gY2FsbGJhY2soZmFsc2UpO1xuICAgICAgY2FsbGJhY2sodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKGZhbHNlKTtcbiAgICB9XG4gIH0pXG59O1xuXG4vKioqXG4gKiBBY2Nlc3MgbWV0aG9kIGZvciB0b2tlblxuICoqKi9cbmZ1bmN0aW9uIGdldFRva2VuKCkge1xuICByZXR1cm4gdG9rZW47XG59O1xuXG4vKioqXG4gKiBMb2FkIHRoZSBnb29nbGUgZHJpdmUgYXBpIGNvZGVcbiAqKiovXG5mdW5jdGlvbiBfbG9hZEFwaShjYWxsYmFjaykge1xuICBnYXBpLmNsaWVudC5sb2FkKFwiZHJpdmVcIiwgRFJJVkVfQVBJX1ZFUlNJT04sIGZ1bmN0aW9uKCkge1xuICAgIGNhbGxiYWNrKCk7XG4gIH0pO1xufTtcblxuLyoqKlxuICogR2V0IGEgbGlzdCBvZiBmaWxlIG1ldGFkYXRhIGZyb20gZ29vZ2xlIGRyaXZlIGJhc2VkIG9uIHF1ZXJ5XG4gKioqL1xuZnVuY3Rpb24gbGlzdEZpbGVzKHF1ZXJ5LCBjYWxsYmFjaykge1xuICBnYXBpLmNsaWVudC5kcml2ZS5maWxlcy5saXN0KHtcbiAgICBxIDogcXVlcnkgKyBcIiBhbmQgdHJhc2hlZCA9IGZhbHNlXCJcbiAgfSkuZXhlY3V0ZShmdW5jdGlvbihyZXNwKSB7XG4gICAgY2FsbGJhY2socmVzcCk7XG4gIH0pO1xufTtcblxuLyoqKlxuICogR2V0IGEgc2luZ2xlIGZpbGVzIG1ldGFkYXRhIGJhc2VkIG9uIGlkXG4gKioqL1xuZnVuY3Rpb24gZ2V0RmlsZU1ldGFkYXRhKGlkLCBjYWxsYmFjaykge1xuICBnYXBpLmNsaWVudC5kcml2ZS5maWxlcy5nZXQoe1xuICAgICdmaWxlSWQnIDogaWRcbiAgfSkuZXhlY3V0ZShmdW5jdGlvbihyZXNwKSB7XG4gICAgY2FsbGJhY2socmVzcCk7XG4gIH0pO1xufTtcblxuLyoqKlxuICogIEFjdHVhbGx5IGxvYWQgYSBmaWxlcyBkYXRhLiAgVGhlIHVybCB0byBkbyB0aGlzIGlzIHByb3ZpZGVkIGluIGEgZmlsZXMgbWV0YWRhdGEuXG4gKioqL1xuZnVuY3Rpb24gZ2V0RmlsZShpZCwgZG93bmxvYWRVcmwsIGNhbGxiYWNrKSB7XG4gICQuYWpheCh7XG4gICAgdXJsIDogZG93bmxvYWRVcmwsXG4gICAgYmVmb3JlU2VuZCA6IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiAgICAgIC8vIHNldCBhY2Nlc3MgdG9rZW4gaW4gaGVhZGVyXG4gICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsICdCZWFyZXIgJysgdG9rZW4uYWNjZXNzX3Rva2VuKTtcbiAgICB9LFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbihkYXRhLCBzdGF0dXMsIHhocikge1xuICAgICAgLy8gcGFyc2UgdGhlIHJlc3BvbnNlICh3ZSBvbmx5IHN0b3JlIGpzb24gaW4gdGhlIGdvb2dsZSBkcml2ZSlcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgY2FsbGJhY2soZGF0YSwgaWQpO1xuICAgIH0sXG4gICAgZXJyb3IgOiBmdW5jdGlvbigpIHtcbiAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgZXJyb3IgOiB0cnVlLFxuICAgICAgICBtZXNzYWdlIDogXCJGYWlsZWQgdG8gbG9hZCBmaWxlIGZyb20gR29vZ2xlIERyaXZlXCJcbiAgICAgIH0pO1xuXG4gICAgfVxuICB9KTtcbn07XG5cbi8qKipcbiAqIFNhdmUganNvbiB0byBnb29nbGUgZHJpdmVcbiAqKiovXG5mdW5jdGlvbiBzYXZlRmlsZShuYW1lLCBkZXNjcmlwdGlvbiwgbWltZVR5cGUsIGpzb24sIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gIGlmKCAhb3B0aW9ucyApIG9wdGlvbnMgPSB7fVxuXG4gIHZhciBib3VuZGFyeSA9ICctLS0tLS0tMzE0MTU5MjY1MzU4OTc5MzIzODQ2JztcbiAgdmFyIGRlbGltaXRlciA9IFwiXFxyXFxuLS1cIiArIGJvdW5kYXJ5ICsgXCJcXHJcXG5cIjtcbiAgdmFyIGNsb3NlX2RlbGltID0gXCJcXHJcXG4tLVwiICsgYm91bmRhcnkgKyBcIi0tXCI7XG5cbiAgdmFyIG1ldGFkYXRhID0ge1xuICAgICd0aXRsZScgOiBuYW1lLFxuICAgICdkZXNjcmlwdGlvbicgOiBkZXNjcmlwdGlvbixcbiAgICAnbWltZVR5cGUnIDogbWltZVR5cGVcbiAgfTtcblxuICAvLyBpZiB3ZSB3YW50IHRvIHNhdmUgdGhlIGZpbGUgdG8gYSBzcGVjaWZpZWQgZm9sZGVyXG4gIGlmKCBvcHRpb25zLnBhcmVudCApIHtcbiAgICBtZXRhZGF0YS5wYXJlbnRzID0gW3tpZDogb3B0aW9ucy5wYXJlbnR9XTtcbiAgfVxuXG4gIC8vIGlmIHRoZSBqc29uIGlzIHJlYWxseSBhbiBvYmplY3QsIHR1cm4gaXQgdG8gYSBzdHJpbmdcbiAgaWYgKHR5cGVvZiBqc29uID09ICdvYmplY3QnKSBqc29uID0gSlNPTi5zdHJpbmdpZnkoanNvbik7XG5cbiAgLy8gZGF0YSBuZWVkcyB0byBiZSBiYXNlNjQgZW5jb2RlZCBmb3IgdGhlIFBPU1RcbiAgdmFyIGJhc2U2NERhdGEgPSBidG9hKGpzb24pO1xuXG4gIC8vIGNyZWF0ZSBvdXIgbXVsdGlwYXJ0IFBPU1QgcmVxdWVzdFxuICB2YXIgbXVsdGlwYXJ0UmVxdWVzdEJvZHkgPSBkZWxpbWl0ZXJcbiAgICAgICsgJ0NvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxcclxcblxcclxcbidcbiAgICAgICsgSlNPTi5zdHJpbmdpZnkobWV0YWRhdGEpO1xuXG4gIGlmKCBqc29uLmxlbmd0aCA+IDAgKSB7XG4gICAgbXVsdGlwYXJ0UmVxdWVzdEJvZHkgKz0gZGVsaW1pdGVyICsgJ0NvbnRlbnQtVHlwZTogJ1xuICAgICAgKyBtaW1lVHlwZSArICdcXHJcXG4nICsgJ0NvbnRlbnQtVHJhbnNmZXItRW5jb2Rpbmc6IGJhc2U2NFxcclxcbidcbiAgICAgICsgJ1xcclxcbicgKyBiYXNlNjREYXRhO1xuICB9XG4gIG11bHRpcGFydFJlcXVlc3RCb2R5ICs9IGNsb3NlX2RlbGltO1xuXG4gICAgIC8vIHNldHVwIFBPU1QgcmVxdWVzdFxuICAgICAvLyBpZiB0aGUgb3B0aW9ucy5jb252ZXI9dHJ1ZSBmbGFnIGlzIHNldCwgZ29vZ2xlIGF0dGVtcHRzIHRvIGNvbnZlcnQgdGhlIGZpbGUgdG9cbiAgICAgLy8gYSBnb29nbGUgZG9jIGZpbGUuICBNb3N0bHksIHdlIHVzZSB0aGlzIGZvciBleHBvcnRpbmcgY3N2IC0+IEdvb2dsZSBTcHJlYWRzaGVldHNcbiAgdmFyIHJlcXVlc3QgPSBnYXBpLmNsaWVudC5yZXF1ZXN0KHtcbiAgICAncGF0aCcgOiAnL3VwbG9hZC9kcml2ZS92Mi9maWxlcycgKyAoIG9wdGlvbnMuY29udmVydCA/ICc/Y29udmVydD10cnVlJyA6ICcnKSxcbiAgICAnbWV0aG9kJyA6ICdQT1NUJyxcbiAgICAncGFyYW1zJyA6IHtcbiAgICAgICd1cGxvYWRUeXBlJyA6ICdtdWx0aXBhcnQnXG4gICAgfSxcbiAgICAnaGVhZGVycycgOiB7XG4gICAgICAnQ29udGVudC1UeXBlJyA6ICdtdWx0aXBhcnQvbWl4ZWQ7IGJvdW5kYXJ5PVwiJyArIGJvdW5kYXJ5ICsgJ1wiJ1xuICAgIH0sXG4gICAgJ2JvZHknIDogbXVsdGlwYXJ0UmVxdWVzdEJvZHlcbiAgfSk7XG5cbiAgLy8gc2VuZCB0aGUgcmVxdWVzdFxuICByZXF1ZXN0LmV4ZWN1dGUoZnVuY3Rpb24ocmVzcCkge1xuICAgIGlmIChyZXNwLmlkKVxuICAgICAgY2FsbGJhY2socmVzcCk7XG4gICAgZWxzZVxuICAgICAgY2FsbGJhY2soe1xuICAgICAgICBlcnJvciA6IHRydWUsXG4gICAgICAgIG1lc3NhZ2UgOiBcIkZhaWxlZCB0byBzYXZlXCJcbiAgICAgIH0pO1xuICB9KTtcbn07XG5cbi8qKipcbiAqIFVwZGF0ZSBhIGZpbGUgYmFzZWQgb24gaWQgYW5kIGdpdmVuIGpzb24gZGF0YVxuICoqKi9cbmZ1bmN0aW9uIHVwZGF0ZUZpbGUoZmlsZUlkLCBqc29uLCBjYWxsYmFjaykge1xuICAvLyBzdGFydCBjcmVhdGluZyB0aGUgbXVsdGlwYXJ0IFBPU1QgcmVxdWVzdFxuICB2YXIgYm91bmRhcnkgPSAnLS0tLS0tLTMxNDE1OTI2NTM1ODk3OTMyMzg0Nic7XG4gIHZhciBkZWxpbWl0ZXIgPSBcIlxcclxcbi0tXCIgKyBib3VuZGFyeSArIFwiXFxyXFxuXCI7XG4gIHZhciBjbG9zZV9kZWxpbSA9IFwiXFxyXFxuLS1cIiArIGJvdW5kYXJ5ICsgXCItLVwiO1xuXG4gIHZhciBtZXRhZGF0YSA9IHt9O1xuXG4gIC8vIHN0cmluaWZ5IHRoZW4gYmFzZTY0IGVuY29kZSB0aGVuIG9iamVjdFxuICAgIHZhciBiYXNlNjREYXRhID0gYnRvYShKU09OLnN0cmluZ2lmeShqc29uKSk7XG5cbiAgICAvLyBzZXQgdXAgdGhlIFBPU1QgYm9keVxuICAgIHZhciBtdWx0aXBhcnRSZXF1ZXN0Qm9keSA9XG4gICAgICBkZWxpbWl0ZXIgK1xuICAgICAgICAnQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXFxyXFxuXFxyXFxuJyArXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KG1ldGFkYXRhKSArXG4gICAgICAgIGRlbGltaXRlciArXG4gICAgICAgICdDb250ZW50LVR5cGU6ICcgKyBNSU1FX1RZUEUgKyAnXFxyXFxuJyArXG4gICAgICAgICdDb250ZW50LVRyYW5zZmVyLUVuY29kaW5nOiBiYXNlNjRcXHJcXG4nICtcbiAgICAgICAgJ1xcclxcbicgK1xuICAgICAgICBiYXNlNjREYXRhICtcbiAgICAgICAgY2xvc2VfZGVsaW07XG5cbiAgLy8gc2V0dXAgUE9TVCByZXF1ZXN0XG4gICAgdmFyIHJlcXVlc3QgPSBnYXBpLmNsaWVudC5yZXF1ZXN0KHtcbiAgICAgICAgJ3BhdGgnOiAnL3VwbG9hZC9kcml2ZS92Mi9maWxlcy8nK2ZpbGVJZCxcbiAgICAgICAgJ21ldGhvZCc6ICdQVVQnLFxuICAgICAgICAncGFyYW1zJzogeyd1cGxvYWRUeXBlJzogJ211bHRpcGFydCd9LFxuICAgICAgICAnaGVhZGVycyc6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9taXhlZDsgYm91bmRhcnk9XCInICsgYm91bmRhcnkgKyAnXCInXG4gICAgICAgIH0sXG4gICAgICAgICdib2R5JzogbXVsdGlwYXJ0UmVxdWVzdEJvZHl9KTtcblxuICAgIC8vIHNldCByZXF1ZXN0XG4gICAgcmVxdWVzdC5leGVjdXRlKGZ1bmN0aW9uKHJlc3Ape1xuICAgICAgaWYoIHJlc3AuaWQgKSB7XG4gICAgICAgIGNhbGxiYWNrKHJlc3ApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICBlcnJvciA6IHRydWUsXG4gICAgICAgIG1lc3NhZ2UgOiBcIkZhaWxlZCB0byB1cGRhdGVcIlxuICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJ1bk1vZGVsUnQoKSB7XG4gIGlmKCBvZmZsaW5lTW9kZSApIHJldHVybjtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAncnVuLW1vZGVsLXJlbW90ZScsIDEpO1xuICBnZHJpdmVSVC5ydW5Nb2RlbFJ0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0IDogaW5pdCxcbiAgY2hlY2tTaWduZWRJbiA6IGNoZWNrU2lnbmVkSW4sXG4gIHNpZ25JbiA6IHNpZ25JbixcbiAgZ2V0VG9rZW4gOiBnZXRUb2tlbixcbiAgbGlzdEZpbGVzIDogbGlzdEZpbGVzLFxuICBnZXRGaWxlTWV0YWRhdGEgOiBnZXRGaWxlTWV0YWRhdGEsXG4gIGxvYWQgOiBsb2FkLFxuICBzYXZlRmlsZTogc2F2ZUZpbGUsXG4gIHNob3dMb2FkVHJlZVBhbmVsIDogc2hvd0xvYWRUcmVlUGFuZWwsXG4gIHNob3dTYXZlVHJlZVBhbmVsIDogc2hvd1NhdmVUcmVlUGFuZWwsXG4gIHJ1bk1vZGVsUnQgOiBydW5Nb2RlbFJ0LFxuXG4gIE1JTUVfVFlQRSA6IE1JTUVfVFlQRVxufVxuIiwiLy8gUkVBTFRJTUUgKHJ0KSBPYmplY3RzXG4vLyBydCBqc29uIGZpZWxkLCB1c2VkIHRvIHNlbmQgdXBkYXRlcyB0byBwZWVyc1xudmFyIHJ0SnNvbiA9IG51bGw7XG4vLyBydCBkb2N1bWVudFxudmFyIHJ0RG9jID0gbnVsbDtcbi8vIGhhcyB0aGUgcnQgYXBpIGJlZW4gbG9hZGVkP1xudmFyIF9ydExvYWRlZCA9IGZhbHNlO1xuLy8gdGltZXIgdG8gYnVmZmVyIHRoZSBmaXJpbmcgb2YgdXBkYXRlcyBmcm9tIHJ0IGV2ZW50c1xudmFyIF9ydFRpbWVyID0gLTE7XG5cbi8vIGxpc3Qgb2YgY3VycmVudCBydCBlZGl0cyB0byBpbnB1dCBmaWxlc1xudmFyIHJ0RWRpdHMgPSB7fTtcbi8vIGdvb2dsZSBkcml2ZSBydCBtb2RlbCAtIG1hcFxudmFyIGxpdmVFZGl0cyA9IG51bGw7XG4vLyBsb2NhbCBsb2NrIG9uIGFuIGVsZW1lbnRcbnZhciBsb2NrID0ge307XG5cbnZhciBhcHA7XG5cbi8vIGxvYWRlZCBmaWxlIGlkXG52YXIgbG9hZGVkRmlsZTtcblxuLyoqKlxuICogU2V0dXAgdGhlIHJ0IGFwaSBmb3IgdGhlIGN1cnJlbnQgZmlsZS4gIFRoaXMgd2lsbCBhY3R1YWxseSBsb2FkIHRoZSBhcGkgaWYgbmVlZGVkXG4gKioqL1xuZnVuY3Rpb24gaW5pdFJ0QXBpKGZpbGUpIHtcbiAgcnRKc29uID0gbnVsbDsgLy8ga2lsbCBvZmYgYW55IG9sZCBsaXN0bmVyc1xuICBsb2FkZWRGaWxlID0gZmlsZTtcblxuICAvLyBjbG9zZSBhbnkgb2xkIGNvbm5lY3Rpb25cbiAgaWYoIHJ0RG9jICkgcnREb2MuY2xvc2UoKTtcblxuICAvLyBnZXQgb3V0IG9mIGhlcmUgaWYgd2UgZG9uJ3QgaGF2ZSBhIGxvYWRlZCBmaWxlXG4gIGlmKCBsb2FkZWRGaWxlID09IG51bGwgKSByZXR1cm47XG5cbiAgLy8gbG9hZCBhcGkgaWYgbmVlZGVkXG4gIGlmKCAhX3J0TG9hZGVkICkge1xuICAgIGdhcGkubG9hZCgnZHJpdmUtcmVhbHRpbWUnLCBmdW5jdGlvbigpe1xuICAgICAgLy8gc2V0dXAgcnQgaG9va3NcbiAgICAgIF9ydExvYWRlZCA9IHRydWU7XG4gICAgICBfbG9hZFJ0RmlsZSgpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIC8vIHNldHVwIHJ0IGhvb2tzXG4gICAgX2xvYWRSdEZpbGUoKTtcbiAgfVxuXG4gIC8vIHNldHVwIGlucHV0IGhhbmRsZXJzXG4gICQoJyNpbnB1dHMgaW5wdXQnKS5vbignZm9jdXMnLGZ1bmN0aW9uKGUpe1xuICAgIHZhciBlbGUgPSAkKGUudGFyZ2V0KTtcbiAgICBfc2V0TG9jYWxMb2NrKHtcbiAgICAgIGlkICAgICAgICA6IGVsZS5hdHRyKFwiaWRcIiksXG4gICAgICB2YWx1ZSAgICAgOiBlbGUudmFsKCksXG4gICAgICB0aW1lc3RhbXAgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgIHVzZXIgICAgICA6IHdpbmRvdy51c2VyaW5mbyA/IHdpbmRvdy51c2VyaW5mby5uYW1lIDogXCJ1bmtub3duXCJcbiAgICB9KTtcbiAgfSk7XG4gICQoJyNpbnB1dHMgaW5wdXQnKS5vbignYmx1cicsZnVuY3Rpb24oZSl7XG4gICAgX3JlbW92ZUxvY2FsTG9jaygkKGUudGFyZ2V0KS5hdHRyKFwiaWRcIikpO1xuICB9KTtcbiAgJCgnI2lucHV0cyBpbnB1dCcpLm9uKCdrZXl1cCcsZnVuY3Rpb24oZSl7XG4gICAgaWYoIGUud2hpY2ggPT0gMTMgKSByZXR1cm47XG4gICAgdmFyIGVsZSA9ICQoZS50YXJnZXQpO1xuICAgIF91cGRhdGVMb2NhbExvY2soZWxlLmF0dHIoXCJpZFwiKSwgZWxlLnZhbCgpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF9zZXRMb2NhbExvY2sobG9jaykge1xuICAvLyBUT0RPOiB0aGlzIHNob3VsZCBtYXJrIHRoZSBjdXJyZW50IGxvY2tcbiAgaWYoIGxpdmVFZGl0cy5oYXNbbG9jay5pZF0gKSByZXR1cm47XG4gIGxpdmVFZGl0cy5zZXQobG9jay5pZCwgbG9jayk7XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVMb2NhbExvY2soaWQsIHZhbCkge1xuICB2YXIgbG9jayA9IHtcbiAgICBpZCA6IGlkLFxuICAgIHZhbHVlIDogdmFsLFxuICAgIHRpbWVzdGFtcCA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgIHVzZXIgICAgICA6IHdpbmRvdy51c2VyaW5mbyA/IHdpbmRvdy51c2VyaW5mby5uYW1lIDogXCJ1bmtub3duXCJcbiAgfVxuXG4gIGxpdmVFZGl0cy5zZXQoaWQsIGxvY2spO1xufVxuXG5mdW5jdGlvbiBfcmVtb3ZlTG9jYWxMb2NrKGlkKSB7XG4gIGxpdmVFZGl0cy5kZWxldGUoaWQpO1xufVxuXG5mdW5jdGlvbiBfcmVtb3ZlUmVtb3RlTG9jayhsb2NrKSB7XG4gICQoXCIjXCIrbG9jay5pZCkucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICAkKFwiI1wiK2xvY2suaWQrXCItZWRpdGluZ1wiKS5yZW1vdmUoKTtcbiAgZGVsZXRlIHJ0RWRpdHNbbG9jay5pZF07XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVMb2NrKGxvY2spIHtcbiAgJChcIiNcIitsb2NrLmlkKS52YWwobG9jay52YWx1ZSkuYXR0cihcImRpc2FibGVkXCIsXCJkaXNhYmxlZFwiKTtcbiAgaWYoICQoXCIjXCIrbG9jay5pZCtcIi1lZGl0aW5nXCIpLmxlbmd0aCA9PSAwICkge1xuICAgICQoXCIjXCIrbG9jay5pZCkucGFyZW50KCkuYWZ0ZXIoXCI8c3BhbiBpZD0nXCIrbG9jay5pZCtcIi1lZGl0aW5nJyBjbGFzcz0nbGFiZWwgbGFiZWwtd2FybmluZyc+PC9zcGFuPlwiKTtcbiAgfVxuICAkKFwiI1wiK2xvY2suaWQrXCItZWRpdGluZ1wiKS5odG1sKGxvY2sudXNlcik7XG4gIHJ0RWRpdHNbbG9jay5pZF0gPSBsb2NrO1xufVxuXG4vKioqXG4gKiBVcGRhdGUgdGhlIGxpc3Qgb2YgcmVhbHRpbWUgZWRpdHMgYXMgd2VsbCBhcyB0aGUgaW5wdXQgVUkgYmFzZWQgb24gdGhlIHJ0RG9jIGV2ZW50XG4gKiBUT0RPOiB0aGlzIGlzIGEgYml0IG5hc3R5IHJpZ2h0IG5vd1xuICoqL1xuZnVuY3Rpb24gX3VwZGF0ZVJ0RWRpdHMoZSkge1xuICBpZiggZS5pc0xvY2FsICkgcmV0dXJuO1xuXG4gIHZhciBrZXlzID0gbGl2ZUVkaXRzLmtleXMoKTtcblxuICAvLyByZW1vdmUgb2xkIHRpbWVzdGFtcHMgVE9ET1xuICAvKmZvciggdmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrICkge1xuICAgIGlmKCBub3cgLSB2YWx1ZXNbaV0udGltZXN0YW1wID4gMTAwMCAqIDYwICkge1xuICAgICAgX3JlbW92ZUxvY2sodmFsdWVzW2ldKTsgLy8gZG9lcyB0aGlzIGZpcmUgdXBkYXRlcz9cbiAgICB9XG4gIH0qL1xuXG5cbiAgLy8gc2V0IG5ldyBlZGl0c1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKysgKSB7XG4gICAgX3VwZGF0ZUxvY2sobGl2ZUVkaXRzLmdldChrZXlzW2ldKSk7XG4gIH1cblxuICAvLyByZW1vdmUgb2xkIGVkaXRzXG4gIGZvciggdmFyIGtleSBpbiBydEVkaXRzICkge1xuICAgIGlmKCBrZXlzLmluZGV4T2Yoa2V5KSA9PSAtMSApIHtcbiAgICAgIF9yZW1vdmVSZW1vdGVMb2NrKHJ0RWRpdHNba2V5XSk7XG4gICAgfVxuICB9XG59XG5cbi8qKipcbiAqICBTZXR1cCB0aGUgcnQgaG9va3MgZm9yIHRoZSBjdXJyZW50IGZpbGUuICBUaGUgYXBpIG5lZWRzIHRvIGFscmVhZHkgYmUgbG9hZGVkXG4gKioqL1xuZnVuY3Rpb24gX2xvYWRSdEZpbGUoKSB7XG4gIC8vIGdldCB0aGUgcnQgZG9jXG4gIGdhcGkuZHJpdmUucmVhbHRpbWUubG9hZChsb2FkZWRGaWxlLFxuICAgIC8vIHJ0IGRvYyBsb2FkZWRcbiAgICBmdW5jdGlvbihmaWxlKXtcbiAgICAgIHJ0RG9jID0gZmlsZTtcblxuICAgICAgLy8gZ2V0IG91ciBydCBhdHRyaWJ1dGUuICBUcmlnZ2VyaW5nIGNoYW5nZXMgb24gcnRKc29uIHdpbGwgcHVzaCBldmVudHNcbiAgICAgIC8vIHRvIGFsbCBsaXN0ZW5pbmcgY2xpZW50c1xuICAgICAgdmFyIGpzb24gPSBmaWxlLmdldE1vZGVsKCkuZ2V0Um9vdCgpLmdldChcImpzb25cIik7XG4gICAgICBsaXZlRWRpdHMgPSBmaWxlLmdldE1vZGVsKCkuZ2V0Um9vdCgpLmdldChcImxpdmVFZGl0c1wiKTtcblxuICAgICAgLy8gaWYgdGhlcmUgaXMgbm8ganNvbiBhdHRyLCB3ZSBuZWVkIHRvIGluaXRpYWxpemUgdGhlIG1vZGVsXG4gICAgICBpZigganNvbiA9PSBudWxsIHx8IGxpdmVFZGl0cyA9PSBudWxsKSB7XG4gICAgICAgIC8vIGluaXRpYWxpemUgb3VyIHJ0IG1vZGVsXG4gICAgICAgIF9vblJ0TW9kZWxMb2FkKGZpbGUuZ2V0TW9kZWwoKSk7XG4gICAgICAgIC8vIGdyYWIgcnQganNvbiBhdHRyIG5vdyB0aGF0IHdlIGFyZSBpbml0aWFsaXplZFxuICAgICAgICBqc29uID0gZmlsZS5nZXRNb2RlbCgpLmdldFJvb3QoKS5nZXQoXCJqc29uXCIpO1xuICAgICAgICBsaXZlRWRpdHMgPSBmaWxlLmdldE1vZGVsKCkuZ2V0Um9vdCgpLmdldChcImxpdmVFZGl0c1wiKTtcbiAgICAgIH1cblxuICAgICAgLy8gYmFkbmVzcyBoYXBwZW5lZCA6KFxuICAgICAgaWYoICFqc29uICkgcmV0dXJuIGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIGNvbm5lY3QgdG8gcnQganNvblwiKTtcbiAgICAgIC8vIHNldCB0aGF0IGF0dHIgZ2xvYmFsIHRvIGNsYXNzXG4gICAgICBydEpzb24gPSBqc29uO1xuXG4gICAgICAvLyBnZXQgY3VycmVudCBsaXN0IG9mIHVzZXJzXG4gICAgICB2YXIgdXNlcnMgPSBmaWxlLmdldENvbGxhYm9yYXRvcnMoKTtcblxuICAgICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVycyBmb3Igd2hlbiBwZW9wbGUgY29tZSBhbmQgZ29cbiAgICAgIGZpbGUuYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5DT0xMQUJPUkFUT1JfSk9JTkVELCBmdW5jdGlvbihlKXtcbiAgICAgICAgdXNlcnMgPSBmaWxlLmdldENvbGxhYm9yYXRvcnMoKTtcbiAgICAgICAgX3VwZGF0ZUFjdGl2ZVVzZXJzKHVzZXJzKTtcbiAgICAgIH0pO1xuICAgICAgZmlsZS5hZGRFdmVudExpc3RlbmVyKGdhcGkuZHJpdmUucmVhbHRpbWUuRXZlbnRUeXBlLkNPTExBQk9SQVRPUl9MRUZULCBmdW5jdGlvbihlKXtcbiAgICAgICAgdXNlcnMgPSBmaWxlLmdldENvbGxhYm9yYXRvcnMoKTtcbiAgICAgICAgX3VwZGF0ZUFjdGl2ZVVzZXJzKHVzZXJzKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzIGZvciB0aGUgcnRKc29uIG9iamVjdFxuICAgICAgLy8gd2hlbiB0aGlzIHVwZGF0ZXMsIHdlIHdhbnQgdG8gcmUtcnVuIHRoZSBtb2RlbFxuICAgICAganNvbi5hZGRFdmVudExpc3RlbmVyKGdhcGkuZHJpdmUucmVhbHRpbWUuRXZlbnRUeXBlLlRFWFRfSU5TRVJURUQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpZiggZS5pc0xvY2FsICkgcmV0dXJuO1xuICAgICAgICBfcmVydW5SdCh1c2VycywgZS51c2VySWQpO1xuICAgICAgICB9KTtcbiAgICAgICAganNvbi5hZGRFdmVudExpc3RlbmVyKGdhcGkuZHJpdmUucmVhbHRpbWUuRXZlbnRUeXBlLlRFWFRfREVMRVRFRCwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgaWYoIGUuaXNMb2NhbCApIHJldHVybjtcbiAgICAgICAgICBfcmVydW5SdCh1c2VycywgZS51c2VySWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBsaXZlIGVkaXQgdXBkYXRlc1xuICAgICAgICAgICAgICBsaXZlRWRpdHMuYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5WQUxVRV9DSEFOR0VELCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICBfdXBkYXRlUnRFZGl0cyhlKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gc2hvdyB3aG8gaXMgbGlzdGVuaW5nXG4gICAgICAgIF91cGRhdGVBY3RpdmVVc2Vycyh1c2Vycyk7XG5cbiAgICAgICAgLy8gc2V0IGlucHV0IGhhbmRsZXJzIGZvciBydCBldmVudHNcbiAgICB9LFxuICAgIC8vIG1vZGVsIGxvYWRlZFxuICAgIGZ1bmN0aW9uKG1vZGVsKXtcbiAgICAgIF9vblJ0TW9kZWxMb2FkKG1vZGVsKTtcbiAgICB9LFxuICAgIC8vIGVycm9yc1xuICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgY29uc29sZS5sb2coXCJSVCBFUlJPUlM6IFwiKTtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxuICApO1xufVxuXG5cbi8qKipcbiAqIFVwZGF0ZSB0aGUgZGlzcGxheSBvZiBhY3RpdmUgdXNlcnMgZm9yIHRoZSBtb2RlbC5cbiAqKiovXG5mdW5jdGlvbiBfdXBkYXRlQWN0aXZlVXNlcnModXNlcnMpIHtcbiAgLy8gaWYgaXQncyBqdXN0IHVzLCBkb24ndCBzaG93IGFueXRoaW5nXG4gIGlmKCAhdXNlcnMgKSByZXR1cm4gJChcIiNhY3RpdmUtdXNlcnNcIikuaHRtbChcIlwiKTtcbiAgaWYoIHVzZXJzLmxlbmd0aCA8PSAxICkgcmV0dXJuICQoXCIjYWN0aXZlLXVzZXJzXCIpLmh0bWwoXCJcIik7XG5cbiAgLy8gd2Ugb25seSB3YW50IHVuaXF1ZSB1c2Vyc1xuICB2YXIgdW5pcXVlID0gW107XG4gIHZhciB1dXNlcnMgPSBbXTtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCB1c2Vycy5sZW5ndGg7IGkrKyApIHtcbiAgICBpZiggdW5pcXVlLmluZGV4T2YodXNlcnNbaV0udXNlcklkKSA9PSAtMSApIHtcbiAgICAgIHVuaXF1ZS5wdXNoKHVzZXJzW2ldLnVzZXJJZCk7XG4gICAgICB1dXNlcnMucHVzaCh1c2Vyc1tpXSk7XG4gICAgfVxuICB9XG4gIGlmKCB1dXNlcnMubGVuZ3RoIDw9IDEgKSByZXR1cm4gJChcIiNhY3RpdmUtdXNlcnNcIikuaHRtbChcIlwiKTtcblxuICAvLyBhZGQgcGljIG9mIHVzZXIgdG8gZGlzcGxheSBwYW5lbFxuICB2YXIgaHRtbCA9IFwiQWN0aXZlIFVzZXJzIFwiO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IHV1c2Vycy5sZW5ndGg7IGkrKyApIHtcbiAgICBpZiggdXVzZXJzW2ldLnBob3RvVXJsICkge1xuICAgICAgaHRtbCArPSBcIjxpbWcgc3JjPSdcIit1dXNlcnNbaV0ucGhvdG9VcmwrXCInIHRpdGxlPSdcIit1dXNlcnNbaV0uZGlzcGxheU5hbWUrXCInIHN0eWxlPSdtYXJnaW46MCA1cHg7d2lkdGg6MzJweDtoZWlnaHQ6MzJweCcgY2xhc3M9J2ltZy1yb3VuZGVkJyAvPiBcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgaHRtbCArPSBcIjxzcGFuIHN0eWxlPSd3aWR0aDozMnB4O2hlaWdodDozMnB4O21hcmdpbjowIDVweDtiYWNrZ3JvdW5kLWNvbG9yOlwiK3V1c2Vyc1tpXS5jb2xvcitcIicgdGl0bGU9J1wiK3V1c2Vyc1tpXS5kaXNwbGF5TmFtZStcIicgPjwvc3Bhbj4gXCI7XG4gICAgfVxuICB9XG4gICQoXCIjYWN0aXZlLXVzZXJzXCIpLmh0bWwoaHRtbCk7XG59XG5cbi8qKipcbiAgICogIFJlLXJ1biB0aGUgbW9kZWwuICBFdmVudHMgY2FuIGNvbWUgaW4gcXVpY2tseSBpbiBtYW55IHBhcnRzLiAgQnVmZmVyIHRoZSBldmVudHMgc28gd2UgZG9uJ3QgcmUtcnVuIHRoZSBtb2RlbCB0b28gbWFueSB0aW1lcy5cbiAgICoqKi9cbmZ1bmN0aW9uIF9yZXJ1blJ0KHVzZXJzLCB1c2VySWQpIHtcbiAgLy8gdGhpcyBpcyBiYWRuZXNzXG4gIGlmKCAhcnRKc29uICkgcmV0dXJuO1xuXG4gIC8vIGNsZWFyIGFueSBxdWV1ZWQgcnVuXG4gIGlmKCBfcnRUaW1lciAhPSAtMSApIGNsZWFyVGltZW91dChfcnRUaW1lcik7XG5cbiAgLy8gcXVldWUgdXAgYSBydW4gYW5kIHdhaXQgdG8gbWFrZSBzdXJlIHRoZXJlIGFyZSBubyB1cGRhdGVzXG4gIF9ydFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIF9ydFRpbWVyID0gLTE7XG5cbiAgICAvLyBmaW5kIHRoZSB1c2VyIHdobyBpcyBydW5uaW5nIHRoZSBtb2RlbCBhbmQgZGlwbGF5IHBvcHVwIG9mIHRoYXQgdXNlcnMgaW5mb3JtYXRpb25cbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHVzZXJzLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHVzZXJzW2ldLnVzZXJJZCA9PSB1c2VySWQgKSB7XG4gICAgICAgIHZhciBwYW5lbCA9ICQoXCI8ZGl2IGNsYXNzPSdpbml0LWxvYWRpbmctb3V0ZXInID48ZGl2IGNsYXNzPSdpbml0LWxvYWRpbmcnIHN0eWxlPSd3aWR0aDo0MDBweCc+IFwiK1xuICAgICAgICAgICAgICAgICh1c2Vyc1tpXS5waG90b1VybCA/IFwiPGltZyBzcmM9J1wiK3VzZXJzW2ldLnBob3RvVXJsK1wiJyAvPiBcIiA6IFwiXCIpK3VzZXJzW2ldLmRpc3BsYXlOYW1lK1wiIGlzIHVwZGF0aW5nIHRoZSBtb2RlbC4uLjwvZGl2PjwvZGl2PlwiKTtcbiAgICAgICAgICAgICQoXCJib2R5XCIpLmFwcGVuZChwYW5lbCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcGFuZWwuY3NzKFwib3BhY2l0eVwiLFwiLjlcIik7XG4gICAgICAgICAgICB9LDUwKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBwYW5lbC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0sIDM1MDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcGFyc2UgdGhlIG5ldyBtb2RlbCBkYXRhIGFuZCBsb2FkIGl0IGFzIG91ciBjdXJyZW50IHNldHVwXG4gICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHJ0SnNvbi5nZXRUZXh0KCkpO1xuICAgIGFwcC5nZXRNb2RlbElPKCkubG9hZFNldHVwKGxvYWRlZEZpbGUsIGRhdGEsIHRydWUpO1xuICB9LCAzMDApO1xufVxuXG4vKioqXG4gKiBpbml0aWFsaXplIGEgbmV3IHJ0IG1vZGVsXG4gKioqL1xuZnVuY3Rpb24gX29uUnRNb2RlbExvYWQobW9kZWwpIHtcbiAgLy8gY3VycmVudGx5IHdlIGp1c3Qgd2FudCB0byB1c2UgdGhpcyBzaW5nbGUgYXR0cmlidXRlIHRvIGJyb2FkY2FzdCBldmVudHNcbiAgdmFyIGpzb24gPSBtb2RlbC5nZXRSb290KCkuZ2V0KFwianNvblwiKTtcbiAgaWYoIGpzb24gPT0gbnVsbCApIHtcbiAgICB2YXIgc3RyaW5nID0gbW9kZWwuY3JlYXRlU3RyaW5nKFwie31cIik7XG4gICAgbW9kZWwuZ2V0Um9vdCgpLnNldChcImpzb25cIiwgc3RyaW5nKTtcbiAgfVxuXG4gIHZhciBsaXZlRWRpdHMgPSBtb2RlbC5nZXRSb290KCkuZ2V0KFwibGl2ZUVkaXRzXCIpO1xuICBpZiggbGl2ZUVkaXRzID09IG51bGwgKSB7XG4gICAgdmFyIGZpZWxkID0gbW9kZWwuY3JlYXRlTWFwKCk7XG4gICAgbW9kZWwuZ2V0Um9vdCgpLnNldChcImxpdmVFZGl0c1wiLCBmaWVsZCk7XG4gIH1cblxufVxuXG4vKioqXG4gKiBsZXQgdGhlIHdvcmxkIGtub3cgd2hhdCB3ZSBhcmUgZG9pbmcgOilcbiAqIFRoaXMgc2hvdWxkIGJlIGNhbGxlZCB3aGVuIGEgbG9jYWwgdXNlciBydW5zIHRoZSBtb2RlbC4gIEl0IHVwZGF0ZXMgdGhlICdqc29uJ1xuICogYXR0cmlidXRlIHdoaWNoIGlzIHRoZW4gYnJvYWRjYXN0IHRvIGFsbCBsaXN0ZW5pbmcgcGFydGllc1xuICoqKi9cbmZ1bmN0aW9uIHJ1bk1vZGVsUnQoKSB7XG4gIGlmKCBydEpzb24gKSBydEpzb24uc2V0VGV4dChKU09OLnN0cmluZ2lmeSggYXBwLmdldE1vZGVsSU8oKS5leHBvcnRTZXR1cCgpICkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcnVuTW9kZWxSdCA6IHJ1bk1vZGVsUnQsXG4gIGluaXRSdEFwaSAgOiBpbml0UnRBcGksXG4gIHNldEFwcCA6IGZ1bmN0aW9uKGFwcGxpY2F0aW9uKSB7XG4gICAgYXBwID0gYXBwbGljYXRpb247XG4gIH1cbn07XG4iLCJ2YXIgb2ZmbGluZSA9IHJlcXVpcmUoJy4vb2ZmbGluZScpO1xudmFyIGdkcml2ZSA9IHJlcXVpcmUoJy4vZ2RyaXZlJyk7XG52YXIgY2hhcnRzID0gcmVxdWlyZSgnLi9jaGFydHMnKTtcbnZhciB3ZWF0aGVyRmlsZVJlYWRlciA9IHJlcXVpcmUoJy4vd2VhdGhlckZpbGVSZWFkZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcblxudmFyIHdlYXRoZXJBdmVyYWdlQ2hhcnQgPSBudWxsO1xudmFyIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhID0ge307XG5cbnZhciBTRVRVUF9URU1QTEFURSA9XG4gICc8ZGl2PicrXG4gICc8aDQ+Q2hhcnQgT3B0aW9uczwvaDQ+JytcbiAgJzxkaXY+JytcbiAgICAgICc8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPicrXG4gICAgICAgICAgJzx0cj4nK1xuICAgICAgICAgICAgICAnPHRkIHN0eWxlPVwid2lkdGg6NTAlXCI+T3V0cHV0IHZhcmlhYmxlKHMpIHRvIGNoYXJ0IDwvdGQ+JytcbiAgICAgICAgICAgICAgJzx0ZD4gPGEgaWQ9XCJzZWxlY3QtY2hhcnRzLWJ0blwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+U2VsZWN0IENoYXJ0czwvYT48L3RkPicrXG4gICAgICAgICAgJzwvdHI+JytcbiAgICAgICAgICAnPHRyPicrXG4gICAgICAgICAgICAgICc8dGQgc3R5bGU9XCJ3aWR0aDo1MCVcIj5WYXJpYXRpb24gYW5hbHlzaXMgcGFyYW1ldGVyKHMpIDwvdGQ+JytcbiAgICAgICAgICAgICAgJzx0ZD48ZGl2IGlkPVwidmFyaWF0aW9uQW5hbHlzaXNTdGF0dXNcIj5Ob25lPC9kaXY+PC90ZD4nK1xuICAgICAgICAgICc8L3RyPicrXG4gICAgICAnPC90YWJsZT4nK1xuICAnPC9kaXY+JytcbiAgJzxoND5Mb2NhdGlvbjwvaDQ+JytcbiAgICc8ZGl2IHN0eWxlPVwiYm9yZGVyLXRvcDoxcHggc29saWQgI2RkZDtwYWRkaW5nOjhweDtoZWlnaHQ6NjBweFwiPicrXG4gICAgICc8c3BhbiBpZD1cImN1cnJlbnQtbG9jYXRpb25cIiBzdHlsZT1cImNvbG9yOiM4ODhcIj48L3NwYW4+JytcbiAgICAgJzxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IHB1bGwtcmlnaHQgc2VsZWN0LXdlYXRoZXItbG9jYXRpb25cIj48aSBjbGFzcz1cImljb24tbWFwLW1hcmtlclwiPjwvaT4gU2VsZWN0IExvY2F0aW9uPC9hPicrXG4gICAgICc8L2Rpdj4nK1xuICAgICAnPGRpdj4nO1xuXG52YXIgR09PTEVEUklWRV9UUkVFX1RFTVBMQVRFID1cbiAgJzxkaXYgc3R5bGU9XCJwYWRkaW5nOjE1cHggMCA1cHggMDttYXJnaW4tYm90dG9tOjVweDtoZWlnaHQ6IDUwcHhcIj4nK1xuICAgICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIHB1bGwtcmlnaHRcIiBpZD1cInRyZWUtc3ViLW1lbnVcIj4nK1xuICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj4nK1xuICAgICAgICAnPHNwYW4gaWQ9XCJsb2FkZWQtdHJlZS1uYW1lXCI+RGVmYXVsdCBUcmVlPC9zcGFuPiA8c3BhbiBjbGFzcz1cImNhcmV0XCI+PC9zcGFuPicrXG4gICAgICAnPC9idXR0b24+JytcbiAgICAgICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIj4nK1xuICAgICAgICAnPGxpPjxhIGlkPVwiZ2RyaXZlLXRyZWVwYW5lbC1sb2FkXCI+PGkgY2xhc3M9XCJpY29uLWNsb3VkLWRvd25sb2FkXCI+PC9pPiBMb2FkIFRyZWU8L2E+PC9saT4nK1xuICAgICAgICAnPGxpPjxhIGlkPVwiZ2RyaXZlLXRyZWVwYW5lbC1zYXZlXCI+PGkgY2xhc3M9XCJpY29uLWNsb3VkLXVwbG9hZFwiPjwvaT4gU2F2ZSBUcmVlPC9hPjwvbGk+JytcbiAgICAgICAgJzxsaSBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxhIGlkPVwic2hhcmUtdHJlZS1idG5cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHN0eWxlPVwiZGlzcGxheTpub25lO21hcmdpbi1sZWZ0OjEwcHhcIj48aSBjbGFzcz1cImljb24tc2hhcmVcIj48L2k+IFNoYXJlIFRyZWU8L2E+PC9saT4nK1xuICAgICAgJzwvdWw+JytcbiAgJzwvZGl2PicrXG4gICc8ZGl2IHN0eWxlPVwiZGlzcGxheTpub25lXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY29tcGFyZS10cmVlc1wiIC8+IENvbXBhcmUgVHJlZXM8L2Rpdj4nK1xuJzwvZGl2Pic7XG5cbnZhciBJTlBVVF9URU1QTEFURSA9XG4gICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicrXG4gICAgJzxsYWJlbCBmb3I9XCJ7e2lkfX1cIiBjbGFzcz1cImNvbC1sZy00IGNvbnRyb2wtbGFiZWxcIj57e2xhYmVsfX08L2xhYmVsPicrXG4gICAgJzxkaXYgY2xhc3M9XCJjb2wtbGctOFwiPicrXG4gICAgICAnPGlucHV0IHR5cGU9XCJ7e3R5cGV9fVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJ7e2lkfX1cIiBzdHlsZT1cIndpZHRoOjIwMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrXCIgdmFsdWU9XCJ7e3ZhbHVlfX1cIj4mbmJzcDsmbmJzcDt7e3VuaXRzfX0nK1xuICAgICAgJzxwIGNsYXNzPVwiaGVscC1ibG9ja1wiPnt7ZGVzY3JpcHRpb259fTwvcD4nICtcbiAgICAnPC9kaXY+JytcbiAgJzwvZGl2Pic7XG5cbnZhciBBUlJBWV9JTlBVVF9URU1QTEFURSA9XG4gICc8ZGl2IGNsYXNzPVwiY29sLWxnLTZcIj48ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicrXG4gICAgJzxsYWJlbCBmb3I9XCJ7e2lkfX1cIiBjbGFzcz1cImNvbC1sZy00IGNvbnRyb2wtbGFiZWxcIj57e2xhYmVsfX08L2xhYmVsPicrXG4gICAgJzxkaXYgY2xhc3M9XCJjb2wtbGctOFwiPicrXG4gICAgICAne3tpbnB1dHN9fScrXG4gICAgICAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+e3tkZXNjcmlwdGlvbn19PC9wPicgK1xuICAgICc8L2Rpdj4nK1xuICAnPC9kaXY+PC9kaXY+JztcblxudmFyIHRhYkhlYWRlciA9ICc8dWwgY2xhc3M9XCJuYXYgbmF2LXBpbGxzXCIgaWQ9XCJpbnB1dF9waWxsc1wiPic7XG52YXIgY29udGVudCA9ICc8ZGl2IGNsYXNzPVwicGlsbC1jb250ZW50XCI+JztcblxudmFyIHRyZWVIZWFkZXIgPSAnPGRpdiBjbGFzcz1cInBhbmVsLWdyb3VwXCIgaWQ9XCJ0cmVlLWFjY29yZGlvblwiPic7XG52YXIgVFJFRV9QQU5FTF9URU1QTEFURSA9ICc8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPicrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPicrXG4gICAgICAgICAgICAnPGg0IGNsYXNzPVwicGFuZWwtdGl0bGVcIj4nK1xuICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImFjY29yZGlvbi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS1wYXJlbnQ9XCIjdHJlZS1hY2NvcmRpb25cIiBocmVmPVwiI2NvbGxhcHNle3tpZH19XCI+JytcbiAgICAgICAgICAgICAgICAgICAgJ3t7dGl0bGV9fScrXG4gICAgICAgICAgICAgICAgJzwvYT4nK1xuICAgICAgICAgICAgJzwvaDQ+JytcbiAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8ZGl2IGlkPVwiY29sbGFwc2V7e2lkfX1cIiBjbGFzcz1cInBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlXCI+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPnt7Ym9keX19PC9kaXY+JytcbiAgICAgICAgJzwvZGl2PicrXG4gICAgICc8L2Rpdj4nO1xuXG52YXIgaW5wdXRzID0ge307XG5cbi8vIGZvciB3ZWF0aGVyIGRhdGFcbnZhciBjb2xzID0gW107XG5cbnZhciBtYXAgPSBudWxsO1xuXG4vKipcbiAqIE9wdGlvbnMgOlxuICogICBtb2RlbCAtIHR5cGUgb2YgbW9kZWwgdG8gYXBwZW5kIHRvXG4gKiAgIGxhYmVsIC0gYXR0cmlidXRlIGxhYmVsXG4gKiAgIHZhbHVlIC0gZGVmYXVsdCB2YWx1ZVxuICogICBkZXNjcmlwdGlvbiAtIGRlc2NyaXB0aW9uIG9mIGF0dHJpYnV0ZVxuICogICB1bml0cyAtIGF0dHJpYnV0ZSB1bml0c1xuICovXG5mdW5jdGlvbiBfYWRkSW5wdXQob3B0aW9ucykge1xuICBpZiggIWlucHV0c1tvcHRpb25zLm1vZGVsXSApIGlucHV0c1tvcHRpb25zLm1vZGVsXSA9IFtdO1xuICBpbnB1dHNbb3B0aW9ucy5tb2RlbF0ucHVzaChvcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZVdlYXRoZXJJbnB1dHMoKSB7XG4gIGZvciggdmFyIGF0dHIgaW4gYXBwLmdldE1vZGVsKCkuZ2V0RGF0YU1vZGVsKCkud2VhdGhlciApIHtcbiAgICBpZiggYXR0ciAhPSBcIm5yZWxcIiApIGNvbHMucHVzaChhdHRyKTtcbiAgfVxuXG4gIHZhciB0YWJsZSA9ICc8ZGl2IHN0eWxlPVwicGFkZGluZy10b3A6MjVweFwiPjxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IHB1bGwtcmlnaHRcIiBpZD1cImxvYWQtd2VhdGhlci1idG5cIj48aSBjbGFzcz1cImljb24tdXBsb2FkLWFsdFwiPjwvaT4gVXBsb2FkPC9hPicrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgaWQ9XCJ3ZWF0aGVyLWlucHV0LXRvZ2dsZVwiPicrXG4gICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGFjdGl2ZVwiPkF2ZXJhZ2VzPC9idXR0b24+JytcbiAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5BY3R1YWw8L2J1dHRvbj4nK1xuICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8ZGl2IGlkPVwiY3VzdG9tLXdlYXRoZXItcGFuZWxcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTttYXJnaW4tdG9wOjIwcHhcIj48L2Rpdj4nK1xuICAgICAgICAnPGRpdiBpZD1cImF2ZXJhZ2Utd2VhdGhlci1wYW5lbFwiPicrXG4gICAgICAgICc8ZGl2IHN0eWxlPVwicGFkZGluZzoxMHB4O2NvbG9yOiM4ODhcIj5TZWxlY3QgbG9jYXRpb24gdG8gc2V0IHRoZSBhdmVyYWdlIHdlYXRoZXIgZGF0YTwvZGl2PicrXG4gICAgICAgICc8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWNvbmRlbnNlZCB3ZWF0aGVyLXRhYmxlXCIgc3R5bGU9XCJtYXJnaW4tdG9wOjIwcHhcIj4nO1xuXG4gIHRhYmxlICs9IFwiPHRyPlwiO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNvbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgdGFibGUgKz0gXCI8dGQ+XCIrY29sc1tpXStcIjwvdGQ+XCI7XG4gIH1cbiAgdGFibGUgKz0gXCI8L3RyPlwiO1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgMTI7IGkrKyApIHtcbiAgICB0YWJsZSArPSBcIjx0cj5cIjtcbiAgICBmb3IoIHZhciBqID0gMDsgaiA8IGNvbHMubGVuZ3RoOyBqKysgKSB7XG4gICAgICBpZiggaiA9PSAwICkge1xuICAgICAgICB0YWJsZSArPSBcIjx0ZD5cIisoaSsxKStcIjwvdGQ+XCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2Zvcm0tY29udHJvbCcgaWQ9J2lucHV0LXdlYXRoZXItXCIrY29sc1tqXStcIi1cIitpK1wiJyB0eXBlPSd0ZXh0JyAvPjwvdGQ+XCI7XG4gICAgICB9XG4gICAgfVxuICAgIHRhYmxlICs9IFwiPC90cj5cIjtcbiAgfVxuICByZXR1cm4gdGFibGUrJzwvdGFibGU+PGRpdiBpZD1cImF2ZXJhZ2Utd2VhdGhlci1jaGFydFwiPjwvZGl2PjwvZGl2Pic7XG5cbn1cblxuZnVuY3Rpb24gX3NldFdlYXRoZXJEYXRhKCkge1xuICB2YXIgbGwgPSBhcHAucXMoXCJsbFwiKTtcbiAgaWYoIGxsICkge1xuICAgIGxsID0gbGwuc3BsaXQoXCIsXCIpO1xuICAgIF9xdWVyeVdlYXRoZXJEYXRhKGxsWzBdLCBsbFsxXSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFwcC5ydW5Nb2RlbCgpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgICQoXCIjY3VycmVudC1sb2NhdGlvblwiKS5odG1sKFwiTm90IFNldFwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfcXVlcnlXZWF0aGVyRGF0YShsbmcsIGxhdCwgY2FsbGJhY2spIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnd2VhdGhlci1kYXRhLXF1ZXJ5JywgMSk7XG5cbiAgdmFyIHVybCA9IFwiaHR0cDovL2FsZGVyLmJpb2VuZXJneS5jYXNpbC51Y2RhdmlzLmVkdTo4MDgwL3ZpenNvdXJjZS9yZXN0P3ZpZXc9cG9pbnRUb1dlYXRoZXIoXCIrbG5nK1wiLFwiK2xhdCtcIiw4MTkyKVwiXG4gIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gIHZhciByZXNwcyA9IDA7XG5cbiAgZnVuY3Rpb24gY2hlY2tEb25lKCkge1xuICAgICAgcmVzcHMrKztcbiAgICAgIGlmKCByZXNwcyA9PSAyICYmIGNhbGxiYWNrICkgY2FsbGJhY2soKTtcbiAgfVxuXG4gIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgdmFyIHRhYmxlID0gSlNPTi5wYXJzZShyZXNwb25zZS5nZXREYXRhVGFibGUoKS50b0pTT04oKSk7XG5cbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRhYmxlLnJvd3MubGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgbSA9IGkrJyc7XG4gICAgICB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YVttXSA9IHt9O1xuICAgICAgZm9yKCB2YXIgaiA9IDE7IGogPCB0YWJsZS5jb2xzLmxlbmd0aDsgaisrICkge1xuICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIrY29sc1tqXStcIi1cIitpKS52YWwodGFibGUucm93c1tpXS5jW2pdID8gdGFibGUucm93c1tpXS5jW2pdLnYgOiBcIlwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVBdmVyYWdlQ2hhcnQoKTtcbiAgICBjaGVja0RvbmUoKTtcbiAgfSk7XG5cbiAgdmFyIHVybCA9IFwiaHR0cDovL2FsZGVyLmJpb2VuZXJneS5jYXNpbC51Y2RhdmlzLmVkdTo4MDgwL3ZpenNvdXJjZS9yZXN0P3ZpZXc9cG9pbnRUb1NPSUwoXCIrbG5nK1wiLFwiK2xhdCtcIiw4MTkyKVwiXG4gIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgdmFyIGVycm9yID0gZmFsc2U7XG4gICAgdmFyIHRhYmxlID0gSlNPTi5wYXJzZShyZXNwb25zZS5nZXREYXRhVGFibGUoKS50b0pTT04oKSk7XG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB0YWJsZS5jb2xzLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHRhYmxlLnJvd3NbMF0gPT0gbnVsbCApIHtcbiAgICAgICAgZXJyb3IgPSB0cnVlO1xuICAgICAgICBhbGVydChcIkludmFsaWQgbG9jYXRpb24gc2VsZWN0ZWRcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgJChcIiNpbnB1dC1zb2lsLVwiK3RhYmxlLmNvbHNbaV0uaWQpLnZhbCh0YWJsZS5yb3dzWzBdLmNbaV0udik7XG4gICAgfVxuXG4gICAgaWYoICFlcnJvciApIGNoZWNrRG9uZSgpO1xuICB9KTtcblxuICAkKFwiI2N1cnJlbnQtbG9jYXRpb25cIikuaHRtbChsbmcrXCIsIFwiK2xhdCtcIiA8YSBocmVmPSdcIit3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC8jLiovLCcnKStcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiP2xsPVwiK2xuZytcIixcIitsYXQrXCInIHRhcmdldD0nX2JsYW5rJz48aSBjbGFzcz0naWNvbi1saW5rJz48L2k+PC9hPlwiKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXZlcmFnZUNoYXJ0KCkge1xuICB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YSA9IHt9O1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgMTI7IGkrKyApIHtcbiAgICB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YVtpKycnXSA9IHt9O1xuICAgIGZvciggdmFyIGogPSAxOyBqIDwgY29scy5sZW5ndGg7IGorKyApIHtcbiAgICAgIHZhciB2YWwgPSAkKFwiI2lucHV0LXdlYXRoZXItXCIrY29sc1tqXStcIi1cIitpKS52YWwoKTtcbiAgICAgIGlmKCB2YWwgJiYgdmFsLmxlbmd0aCA+IDAgKSB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YVtpKycnXVtjb2xzW2pdXSA9IHBhcnNlSW50KHZhbCk7XG4gICAgICBlbHNlIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhW2krJyddW2NvbHNbal1dID0gMDtcbiAgICB9XG4gIH1cbiAgd2VhdGhlckF2ZXJhZ2VDaGFydCA9IGNoYXJ0cy5jcmVhdGVXZWF0aGVyQ2hhcnQoJCgnI2F2ZXJhZ2Utd2VhdGhlci1jaGFydCcpWzBdLCB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YSk7XG59XG5cbmZ1bmN0aW9uIF9zZWxlY3RXZWF0aGVyTG9jYXRpb24oKSB7XG4gIGlmKCAhbWFwICkge1xuICAgICQoXCIjc2VsZWN0LXdlYXRoZXItbW9kYWxcIikubW9kYWwoe30pO1xuXG4gICAgJChcIiNsb2NhdGUtYnV0dG9uXCIpLm9uKCdjbGljaycsIF9nZXRMb2NhdGlvbik7XG5cblxuICAgIC8vIHdhaXQgZm9yIHRoZSBtb2RhbCB0byBpbml0XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgaWYoIG9mZmxpbmVNb2RlICkgcmV0dXJuO1xuXG4gICAgICBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKCQoXCIjZ21hcFwiKVswXSwge1xuICAgICAgICBjZW50ZXIgOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDM1LCAtMTIxKSxcbiAgICAgICAgem9vbTogNSxcbiAgICAgICAgbWFwVHlwZUlkIDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVBcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgZGVmYXVsdFN0eWxlID0ge1xuICAgICAgICAgICAgcG9seWdvbk9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgc3Ryb2tlQ29sb3IgICA6IFwiIzAwMDBGRlwiLFxuICAgICAgICAgICAgICBzdHJva2VPcGFjaXR5IDogMC41LFxuICAgICAgICAgICAgICBmaWxsQ29sb3IgICAgIDogJyNGRUZFRkUnLFxuICAgICAgICAgICAgICBmaWxsT3BhY2l0eSAgIDogMC4yXG4gICAgICAgICAgICB9LFxuICAgICAgfTtcblxuXG4gICAgICB2YXIgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgIHNlbGVjdDogJ2JvdW5kYXJ5JyxcbiAgICAgICAgICAgIGZyb206ICcxaFY5dlFHM1NjMEpMUGR1RnBXSnp0ZkxLLWV4NmNjeU1nX3B0RV9zJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc3R5bGVzOiBbZGVmYXVsdFN0eWxlXSxcbiAgICAgICAgICBzdXBwcmVzc0luZm9XaW5kb3dzIDogdHJ1ZVxuICAgICAgfTtcblxuICAgICAgdmFyIGZ1c2lvbkxheWVyID0gbmV3IGdvb2dsZS5tYXBzLkZ1c2lvblRhYmxlc0xheWVyKGRlZmF1bHRPcHRpb25zKTtcbiAgICAgIGZ1c2lvbkxheWVyLm9wYWNpdHkgPSAuODtcbiAgICAgIGZ1c2lvbkxheWVyLnNldE1hcChtYXApO1xuXG4gICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXAsICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYoICQoJyNsb2NhdGUtY2FjaGUtbW9kZScpLmlzKCc6Y2hlY2tlZCcpICkge1xuICAgICAgICAgIGFsZXJ0KCdZb3UgbXVzdCBjbGljayBvbiBhIGdlb21ldHJ5IHRvIGNhY2hlJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgX3F1ZXJ5V2VhdGhlckRhdGEoZS5sYXRMbmcubG5nKCksIGUubGF0TG5nLmxhdCgpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGFwcC5ydW5Nb2RlbCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgfSk7XG4gICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihmdXNpb25MYXllciwgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiggJCgnI2xvY2F0ZS1jYWNoZS1tb2RlJykuaXMoJzpjaGVja2VkJykgKSB7XG4gICAgICAgICAgb2ZmbGluZS5jYWNoZVRpbGUoZSwgZnVzaW9uTGF5ZXIsIGRlZmF1bHRPcHRpb25zLCBkZWZhdWx0U3R5bGUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIF9xdWVyeVdlYXRoZXJEYXRhKGUubGF0TG5nLmxuZygpLCBlLmxhdExuZy5sYXQoKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBhcHAucnVuTW9kZWwoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICQoXCIjc2VsZWN0LXdlYXRoZXItbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBzZXR1cCBpbnB1dCBmb3IgY2xlYXJpbmcgY2FjaGVcbiAgICAgICAgICAkKCcjY2xlYXItY2FjaGVkLXRpbGVzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgb2ZmbGluZS5jbGVhckNhY2hlKCk7XG4gICAgICAgICAgICAgIG9mZmxpbmUucmVuZGVyQ2FjaGVkVGlsZXNPbk1hcChmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgIG9mZmxpbmUucmVuZGVyQ2FjaGVkVGlsZXNPbk1hcChmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSk7XG5cbiAgICB9LDUwMCk7XG4gIH0gZWxzZSB7XG4gICAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuXG4gICAgLy8gd2Ugc2VlbSB0byBiZSBoYW5naW5nIHNvbWV0aW1lcy4uLi5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG1hcCwgXCJyZXNpemVcIik7XG4gICAgfSwgNTAwKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZ2V0TG9jYXRpb24oKSB7XG4gIGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHNob3dQb3NpdGlvbik7XG4gICAgJChcIiNsb2NhdGUtYnV0dG9uXCIpLmFkZENsYXNzKFwiYnRuLXdhcm5pbmdcIik7XG4gIH0gZWxzZXtcbiAgICB3aW5kb3cuYWxlcnQoXCJHZW9sb2NhdGlvbiBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgYnJvd3Nlci5cIik7XG4gIH1cbiAgZnVuY3Rpb24gc2hvd1Bvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgJChcIiNsb2NhdGUtYnV0dG9uXCIpLnJlbW92ZUNsYXNzKFwiYnRuLXdhcm5cIikuYWRkQ2xhc3MoXCJidG4tc3VjY2Vzc1wiKTtcbiAgICBtYXAuc2V0Wm9vbSgxMCk7XG4gICAgbWFwLnNldENlbnRlcihuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSwgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSkpO1xuICAgIC8vX3F1ZXJ5V2VhdGhlckRhdGEocG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSwgcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZ2VuZXJhdGVJbnB1dHMoaSwgdHlwZSwgcHJlZml4LCBuYW1lLCBhdHRycykge1xuICB2YXIgaWQgPSBwcmVmaXgubGVuZ3RoID4gMCA/IHByZWZpeCsnLScrbmFtZSA6ICdpbnB1dC0nK25hbWU7XG4gIHZhciBpbnB1dCA9ICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwibWFyZ2luLWxlZnQ6JysoaSoyMCkrJ3B4O21hcmdpbi10b3A6MHB4O21hcmdpbi1yaWdodDo1cHhcIj4nO1xuXG4gIHZhciB0cmVlYm9keSA9IFwiXCI7XG5cbiAgaWYoICEoaSA9PSAxKSApIHtcbiAgICAgIGlmKCBpICE9IDAgKSBpbnB1dCArPSAnPGxhYmVsIGZvcj1cIicraWQrJ1wiIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiPicrbmFtZSArJzwvbGFiZWw+JztcbiAgICAgIGlucHV0ICs9ICc8ZGl2Pic7XG4gIH1cblxuXG4gICAgICBpZiAoIHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnb2JqZWN0JyAmJiBpID09IDEgICkgeyAvLyAmJiB0eXBlID09ICd0cmVlJyApIHtcbiAgICAgIGZvciggdmFyIGtleSBpbiBhdHRycy52YWx1ZSApIHtcbiAgICAgICAgICAgICAgdHJlZWJvZHkgKz0gX2dlbmVyYXRlSW5wdXRzKGkrMSwgdHlwZSwgaWQsIGtleSwgYXR0cnMudmFsdWVba2V5XSk7XG4gICAgICAgICAgfVxuICB9IGVsc2UgaWYgKCB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ29iamVjdCcgKSB7XG4gICAgICBpZiggYXR0cnMuZGVzY3JpcHRpb24gKSBpbnB1dCArPSAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+JythdHRycy5kZXNjcmlwdGlvbisnPC9wPic7XG4gICAgICAgICAgZm9yKCB2YXIga2V5IGluIGF0dHJzLnZhbHVlICkge1xuICAgICAgICAgICAgICBpbnB1dCArPSBfZ2VuZXJhdGVJbnB1dHMoaSsxLCB0eXBlLCBpZCwga2V5LCBhdHRycy52YWx1ZVtrZXldKTtcbiAgICAgICAgICB9XG4gIH0gZWxzZSBpZiAoICh0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ251bWJlcicgfHwgdHlwZW9mIGF0dHJzLnZhbHVlID09ICdzdHJpbmcnKSAmJiBpID09IDEgKSB7IC8vICYmIHR5cGUgPT0gJ3RyZWUnICkge1xuXG4gICAgICB0cmVlYm9keSArPVxuICAgICAgICAgICc8ZGl2PjxpbnB1dCB0eXBlPVwiJysoYXR0cnMudmFsdWUgPT0gJ19kYXRlXycgPyAnZGF0ZScgOiAndGV4dCcpKydcIiAnK1xuICAgICAgICAgICh0eXBlPT0nY29uc3RhbnRzJz8nZGlzYWJsZWQnOicnKSsnIGNsYXNzPVwiZm9ybS1jb250cm9sICcrdHlwZSsnXCIgaWQ9XCInK1xuICAgICAgICAgIGlkKydcIiBzdHlsZT1cIndpZHRoOjIwMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrXCIgdmFsdWU9XCInXG4gICAgICAgICAgICAgICsoYXR0cnMudmFsdWUgPT0gJ19kYXRlXycgPyAnJyA6IGF0dHJzLnZhbHVlKSsnXCI+Jm5ic3A7Jm5ic3A7J1xuICAgICAgICAgICAgICArKGF0dHJzLnVuaXRzID8gYXR0cnMudW5pdHMgOiAnJykrJzwvZGl2Pic7XG5cbiAgfSBlbHNlIGlmICggIHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnc3RyaW5nJyB8fCB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ251bWJlcicgKSB7XG5cbiAgICBpbnB1dCArPSAnPGRpdj48aW5wdXQgdHlwZT1cIicrKGF0dHJzLnZhbHVlID09ICdfZGF0ZV8nID8gJ2RhdGUnIDogJ3RleHQnKSsnXCIgJ1xuICAgICAgICAgICsodHlwZT09J2NvbnN0YW50cyc/J2Rpc2FibGVkJzonJykrJyBjbGFzcz1cImZvcm0tY29udHJvbCAnK3R5cGUrXG4gICAgICAgICAgICdcIiBpZD1cIicraWQrJ1wiIHN0eWxlPVwid2lkdGg6MjAwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2tcIiB2YWx1ZT1cIidcbiAgICAgICAgICArKGF0dHJzLnZhbHVlID09ICdfZGF0ZV8nID8gJycgOiBhdHRycy52YWx1ZSkrJ1wiPiZuYnNwOyZuYnNwOydcbiAgICAgICAgICArKGF0dHJzLnVuaXRzID8gYXR0cnMudW5pdHMgOiAnJykrJzwvZGl2Pic7XG5cbiAgICBpZiggYXR0cnMuZGVzY3JpcHRpb24gKSBpbnB1dCArPSAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+JythdHRycy5kZXNjcmlwdGlvbisnPC9wPic7XG4gIH1cblxuICBpZiggIShpID09IDEgLyomJiB0eXBlID09ICd0cmVlJyovKSApIHtcbiAgICAgIGlucHV0ICs9ICc8L2Rpdj48L2Rpdj4nO1xuICB9IGVsc2Uge1xuICAgICAgaW5wdXQgKz0gVFJFRV9QQU5FTF9URU1QTEFURVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3t7aWR9fS9nLGlkKVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJ3t7dGl0bGV9fScsbmFtZStcIiA8c3BhbiBzdHlsZT0nY29sb3I6Izg4ODtmb250LXNpemU6MTJweCc+IC0gXCIrYXR0cnMuZGVzY3JpcHRpb24rXCI8L3NwYW4+XCIpXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgne3tib2R5fX0nLHRyZWVib2R5KSsnPC9kaXY+J1xuICB9XG5cbiAgcmV0dXJuIGlucHV0O1xufVxuXG5mdW5jdGlvbiBjcmVhdGUoZWxlKSB7XG4gIHdlYXRoZXJGaWxlUmVhZGVyLmluaXQoKTtcbiAgdmFyIG1vZGVsLCBtLCBhdHRyLCBjb25maWc7XG5cbiAgdmFyIGlucHV0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBhcHAuZ2V0TW9kZWwoKS5nZXREYXRhTW9kZWwoKSk7XG5cbiAgaW5wdXRzWydzZXR1cCddID0ge307XG4gIGZvciggbW9kZWwgaW4gaW5wdXRzICkge1xuICAgIG0gPSBpbnB1dHNbbW9kZWxdO1xuICAgIGZvciggYXR0ciBpbiBtICkge1xuICAgICAgY29uZmlnID0gbVthdHRyXTtcblxuICAgICAgaWYoIHR5cGVvZiBjb25maWcgPT0gJ29iamVjdCcgKSB7XG4gICAgICAgIF9hZGRJbnB1dCh7XG4gICAgICAgICAgbW9kZWwgICAgICAgOiBtb2RlbCxcbiAgICAgICAgICBsYWJlbCAgICAgICA6IGF0dHIsXG4gICAgICAgICAgZGVzY3JpcHRpb24gOiBjb25maWcuZGVzY3JpcHRpb24sXG4gICAgICAgICAgdmFsdWUgICAgICAgOiBjb25maWcudmFsdWUsXG4gICAgICAgICAgdW5pdHMgICAgICAgOiBjb25maWcudW5pdHNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfYWRkSW5wdXQoe1xuICAgICAgICAgIG1vZGVsICAgICAgIDogbW9kZWwsXG4gICAgICAgICAgbGFiZWwgICAgICAgOiBhdHRyXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgZm9yKCBtb2RlbCBpbiBpbnB1dHMgKSB7XG4gICAgaWYoIG1vZGVsID09IFwicGxhbnRhdGlvbl9zdGF0ZVwiICkgY29udGludWU7XG5cbiAgICB0YWJIZWFkZXIgKz0gJzxsaT48YSBocmVmPVwiI2lucHV0c18nK21vZGVsKydcIiBpZD1cInRhYl9pbnB1dHNfJyttb2RlbCsnXCIgZGF0YS10b2dnbGU9XCJwaWxsXCI+J1xuICAgICAgICAgICAgICAgICttb2RlbC5zdWJzdHIoMCwxKS50b1VwcGVyQ2FzZSgpK21vZGVsLnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpKyc8L2E+PC9saT4nO1xuICAgIHZhciBhdHRyaWJ1dGVzID0gaW5wdXRzW21vZGVsXTtcblxuICAgIGNvbnRlbnQgKz0gJyA8ZGl2IGNsYXNzPVwicGlsbC1wYW5lXCIgaWQ9XCJpbnB1dHNfJyttb2RlbCsnXCI+JztcblxuICAgIHZhciByb3cxID0gXCJcIjtcbiAgICB2YXIgcm93MiA9IFwiPGRpdiBjbGFzcz0nY29sLWxnLTY+XCI7XG5cbiAgICBpZiggbW9kZWwgPT0gJ3dlYXRoZXInICkge1xuICAgICAgY29udGVudCArPSBfY3JlYXRlV2VhdGhlcklucHV0cygpO1xuICAgIH0gZWxzZSBpZiggbW9kZWwgPT0gJ3NldHVwJyApIHtcbiAgICAgIGNvbnRlbnQgKz0gU0VUVVBfVEVNUExBVEU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29udGVudCArPSB0cmVlSGVhZGVyO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgZ29vZ2xlIGRyaXZlIGJ0biBmcm9tIHRyZWVzXG4gICAgICAgIGlmKCBtb2RlbCA9PSd0cmVlJyApIHtcbiAgICAgICAgICBjb250ZW50ICs9IF9jcmVhdGVUcmVlSW5wdXQobW9kZWwsIGlucHV0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGVudCArPSBfZ2VuZXJhdGVJbnB1dHMoMCwgbW9kZWwsICcnLCBtb2RlbCwgaW5wdXRzW21vZGVsXSk7XG4gICAgICAgIH1cblxuICAgICAgY29udGVudCArPSAnPC9kaXY+JztcbiAgICB9XG5cblxuICAgIGNvbnRlbnQgKz0gJzwvZGl2Pic7XG4gIH1cbiAgY29udGVudCArPSAnPC9kaXY+JztcbiAgdGFiSGVhZGVyICs9IFwiPC91bD5cIjtcblxuICBlbGUuaHRtbCh0YWJIZWFkZXIrXCI8ZGl2IGNsYXNzPSdmb3JtLWhvcml6b250YWwnPlwiK2NvbnRlbnQrXCI8L2Rpdj5cIik7XG5cbiAgLy8gcnVuIHRoZSBtb2RlbCB3aGVuZXZlciBzb21lIGhpdHMgJ2VudGVyJ1xuICBlbGUuZmluZCgnaW5wdXQnKS5vbigna2V5dXAnLGZ1bmN0aW9uKGUpe1xuICAgIGlmKCBlLndoaWNoID09IDEzICkgYXBwLnJ1bk1vZGVsKCk7XG4gIH0pO1xuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIGZvciBsb2FkaW5nIGEgdHJlZVxuICBlbGUuZmluZChcIiNnZHJpdmUtdHJlZXBhbmVsLWxvYWRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnZHJpdmUuc2hvd0xvYWRUcmVlUGFuZWwoKTtcbiAgfSk7XG4gIGVsZS5maW5kKFwiI2dkcml2ZS10cmVlcGFuZWwtc2F2ZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGdkcml2ZS5zaG93U2F2ZVRyZWVQYW5lbCgpO1xuICB9KTtcblxuICAvLyBzZXQgdHJlZSBpbnB1dCBoYW5kbGVyc1xuICAkKFwiI2NvbXBhcmUtdHJlZXNcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBpZiggJCh0aGlzKS5pcygnOmNoZWNrZWQnKSApIHtcbiAgICAgICQoXCIjc2luZ2xlLXRyZWUtY29udGVudFwiKS5oaWRlKCk7XG4gICAgICAkKFwiI2NvbXBhcmUtdHJlZS1jb250ZW50XCIpLnNob3coKTtcbiAgICAgICQoXCIjdHJlZS1zdWItbWVudVwiKS5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjc2luZ2xlLXRyZWUtY29udGVudFwiKS5zaG93KCk7XG4gICAgICAkKFwiI2NvbXBhcmUtdHJlZS1jb250ZW50XCIpLmhpZGUoKTtcbiAgICAgICQoXCIjdHJlZS1zdWItbWVudVwiKS5zaG93KCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBzZXQgcGlsbCBjbGljayBoYW5kbGVyc1xuICAkKCcjaW5wdXRfdGFicyBhJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgJCh0aGlzKS50YWIoJ3Nob3cnKVxuICB9KTtcbiAgJCgnI3RhYl9pbnB1dHNfd2VhdGhlcicpLnRhYignc2hvdycpO1xuXG4gICQoJy5zZWxlY3Qtd2VhdGhlci1sb2NhdGlvbicpLm9uKCdjbGljaycsIF9zZWxlY3RXZWF0aGVyTG9jYXRpb24pO1xuXG5cbiAgJCgnI3dlYXRoZXJSZWFkZXItbW9kYWwnKS5tb2RhbCh7c2hvdzpmYWxzZX0pO1xuICAkKCcjbG9hZC13ZWF0aGVyLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCgnI3dlYXRoZXJSZWFkZXItbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICAkKFwiI3dlYXRoZXItaW5wdXQtdG9nZ2xlIC5idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkKCcjd2VhdGhlci1pbnB1dC10b2dnbGUgLmJ0bi5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICBpZiggJCh0aGlzKS5odG1sKCkgPT0gJ0F2ZXJhZ2VzJyApIHtcbiAgICAgICQoJyNhdmVyYWdlLXdlYXRoZXItcGFuZWwnKS5zaG93KCk7XG4gICAgICAkKCcjY3VzdG9tLXdlYXRoZXItcGFuZWwnKS5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcC5zZXRXZWF0aGVyKCk7XG4gICAgICAkKCcjYXZlcmFnZS13ZWF0aGVyLXBhbmVsJykuaGlkZSgpO1xuICAgICAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuc2hvdygpO1xuICAgIH1cbiAgfSk7XG5cbiAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbigpe1xuICAgIGlmKCB3ZWF0aGVyQXZlcmFnZUNoYXJ0ICl7XG4gICAgICB3ZWF0aGVyQXZlcmFnZUNoYXJ0ID0gY2hhcnRzLmNyZWF0ZVdlYXRoZXJDaGFydCgkKCcjYXZlcmFnZS13ZWF0aGVyLWNoYXJ0JylbMF0sIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhKTtcbiAgICB9XG4gIH0pO1xuXG4gIF9zZXRXZWF0aGVyRGF0YSgpO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlVHJlZUlucHV0KG1vZGVsLCBpbnB1dHMpIHtcbiAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICBjb250ZW50ICs9IEdPT0xFRFJJVkVfVFJFRV9URU1QTEFURTtcblxuICBjb250ZW50ICs9ICc8ZGl2IGlkPVwic2luZ2xlLXRyZWUtY29udGVudFwiPic7XG4gIGNvbnRlbnQgKz0gX2dlbmVyYXRlSW5wdXRzKDAsIG1vZGVsLCAnJywgbW9kZWwsIGlucHV0c1ttb2RlbF0pO1xuICBjb250ZW50ICs9ICc8L2Rpdj4nO1xuXG4gIGNvbnRlbnQgKz0gJzxkaXYgaWQ9XCJjb21wYXJlLXRyZWUtY29udGVudFwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+JytcbiAgICAgICAgJzx1bCBjbGFzcz1cIm5hdiBuYXYtdGFic1wiPicrXG4gICAgICAgICAgJzxsaSBjbGFzcz1cImFjdGl2ZVwiPjxhIGhyZWY9XCIjdHJlZTFcIiBkYXRhLXRvZ2dsZT1cInRhYlwiPlRyZWUgMTwvYT48L2xpPicrXG4gICAgICAgICAgICAnPGxpPjxhIGhyZWY9XCIjdHJlZTJcIiBkYXRhLXRvZ2dsZT1cInRhYlwiPlRyZWUgMjwvYT48L2xpPicrXG4gICAgICAgICc8L3VsPicrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ0YWItcGFuZSBhY3RpdmVcIiBpZD1cInRyZWUxXCI+JytcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ3ZWxsXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW4tdG9wOjEwcHhcIj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+JytcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYWN0aXZlXCI+Q3VzdG9tPC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5TZWxlY3QgVHJlZTwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgX2dlbmVyYXRlSW5wdXRzKDAsIG1vZGVsLCAndDEnLCBtb2RlbCwgaW5wdXRzW21vZGVsXSkrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidGFiLXBhbmUgYWN0aXZlXCIgaWQ9XCJ0cmVlMlwiPicrXG4gICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwid2VsbFwiIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luLXRvcDoxMHB4XCIgPicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj4nK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBhY3RpdmVcIj5DdXN0b208L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPlNlbGVjdCBUcmVlPC9idXR0b24+JytcbiAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICBfZ2VuZXJhdGVJbnB1dHMoMCwgbW9kZWwsICd0MicsIG1vZGVsLCBpbnB1dHNbbW9kZWxdKStcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgJzwvZGl2Pic7XG5cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cblxucmV0dXJuIHtcbiAgY3JlYXRlIDogY3JlYXRlLFxuICB1cGRhdGVBdmVyYWdlQ2hhcnQ6IHVwZGF0ZUF2ZXJhZ2VDaGFydFxufTtcblxufTtcbiIsIi8vIFNwZWNpYWwgU2F1Y2UuLi5cbi8vIGJhc2ljYWxseSB0aGUgY29kZSBsb2FkZWQgZnJvbSBHaXRIdWIgZXhwZWN0cyB0aGUgZm9sbG93aW5nIHRvIGV4aXN0cyBpbiB0aGUgd2luZG93IHNjb3BlXG4vLyAgIG0zUEdJT1xuLy8gICAgIC0gcmVhZEFsbENvbnRhbnRzXG4vLyAgICAgLSByZWFkV2VhdGhlclxuLy8gICAgIC0gZHVtcFxuLy8gICAgIC0gcmVhZEZyb21JbnB1dHNcbi8vIFNvIHdlIGluamVjdCBmdW5jdGlvbnMgdGhhdCBpbnRlcmFjdCB3LyBvdXIgVUksIG1vZGVsIGluIG5vIHdheSBjYXJlc1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlYWQgOiBmdW5jdGlvbihtb2RlbCkge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgIGlmKCAhbW9kZWwucGxhbnRhdGlvbiApIG1vZGVsLnBsYW50YXRpb24gPSB7fTtcbiAgICB0aGlzLnJlYWRBbGxDb25zdGFudHMobW9kZWwucGxhbnRhdGlvbik7XG5cbiAgICBpZiggIW1vZGVsLndlYXRoZXIgKSBtb2RlbC53ZWF0aGVyID0ge307XG4gICAgaWYoICFtb2RlbC5wbGFudGluZ1BhcmFtcyApIG1vZGVsLnBsYW50aW5nUGFyYW1zID0ge307XG4gICAgaWYoICFtb2RlbC5jdXN0b21fd2VhdGhlciApIG1vZGVsLmN1c3RvbV93ZWF0aGVyID0ge307XG5cbiAgICB0aGlzLnJlYWRXZWF0aGVyKG1vZGVsLndlYXRoZXIsIG1vZGVsLnBsYW50aW5nUGFyYW1zLCBtb2RlbC5jdXN0b21fd2VhdGhlcik7XG4gIH0sXG4gIHJlYWRBbGxDb25zdGFudHMgOiBmdW5jdGlvbihwbGFudGF0aW9uKSB7XG4gICAgICB0aGlzLnJlYWRGcm9tSW5wdXRzKCk7XG5cbiAgICAgIC8vZm9yICggdmFyIGtleSBpbiB0aGlzLm1vZGVsLnBsYW50YXRpb24pIHtcbiAgICAgIC8vICAgIHBsYW50YXRpb25ba2V5XSA9IHRoaXMubW9kZWwucGxhbnRhdGlvbltrZXldO1xuICAgICAgLy99XG5cbiAgICAgIHBsYW50YXRpb24uY29wcGljZWRUcmVlID0gdGhpcy5tb2RlbC50cmVlO1xuXG4gICAgICAvLyBzZXR1cCBzZWVkbGluZyBUcmVlXG4gICAgICAvLyBUT0RPOiBoYXJkY29kZWQgZm9yIG5vdywgdGhpcyBzaG91bGRuJ3QgYmVcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMubW9kZWwudHJlZSk7XG4gICAgICBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZS5zdGVtc1BlclN0dW1wID0gMTtcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlLnBmcy5zdGVtQ250ID0gMTtcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlLnJvb3RQID0ge1xuICAgICAgICAgIExBSVRhcmdldCA6IDEwLFxuICAgICAgICAgIGVmZmljaWVuY3kgOiAwLjYsXG4gICAgICAgICAgZnJhYyA6IDAuMDFcbiAgICAgIH07XG4gIH0sXG4gIHJlYWRXZWF0aGVyIDogZnVuY3Rpb24od2VhdGhlck1hcCwgcGxhbnRpbmdQYXJhbXMsIGN1c3RvbVdlYXRoZXJNYXApIHtcbiAgICAgIHZhciBkYXRlUGxhbnRlZCA9ICQoXCIjaW5wdXQtbWFuYWdlLURhdGVQbGFudGVkXCIpLnZhbCgpO1xuICAgICAgaWYgKGRhdGVQbGFudGVkICYmIGRhdGVQbGFudGVkICE9IFwiXCIpIHtcbiAgICAgICAgICBwbGFudGluZ1BhcmFtcy5kYXRlUGxhbnRlZCA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLURhdGVQbGFudGVkXCIpLnZhbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGxhbnRpbmdQYXJhbXMuZGF0ZVBsYW50ZWQgPSBuZXcgRGF0ZSgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGF0ZUNvcHBpY2VkID0gJChcIiNpbnB1dC1tYW5hZ2UtRGF0ZUNvcHBpY2VkXCIpLnZhbCgpO1xuICAgICAgaWYgKGRhdGVDb3BwaWNlZCAmJiBkYXRlQ29wcGljZWQgIT0gXCJcIikge1xuICAgICAgICAgIHBsYW50aW5nUGFyYW1zLmRhdGVDb3BwaWNlZCA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLURhdGVDb3BwaWNlZFwiKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgLy8gc2V0IGVycm9yIGNvbmRpdGlvbiA6IFRPRE9cbiAgICAgIH1cblxuICAgICAgdmFyIERhdGVGaW5hbEhhcnZlc3QgPSAkKFwiI2lucHV0LW1hbmFnZS1EYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpO1xuICAgICAgaWYgKERhdGVGaW5hbEhhcnZlc3QgJiYgRGF0ZUZpbmFsSGFydmVzdCAhPSBcIlwiKSB7XG4gICAgICAgICAgcGxhbnRpbmdQYXJhbXMuRGF0ZUZpbmFsSGFydmVzdCA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLURhdGVGaW5hbEhhcnZlc3RcIikudmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIC8vIHNldCBlcnJvciBjb25kaXRpb24gOiBUT0RPXG4gICAgICB9XG5cbiAgICAgIHZhciB5ZWFyc1BlckNvcHBpY2UgPSAkKFwiI2lucHV0LW1hbmFnZS1Db3BwaWNlSW50ZXJ2YWxcIikudmFsKCk7XG4gICAgICBpZiAoeWVhcnNQZXJDb3BwaWNlICYmIHllYXJzUGVyQ29wcGljZSAhPSBcIlwiKSB7XG4gICAgICAgICAgcGxhbnRpbmdQYXJhbXMueWVhcnNQZXJDb3BwaWNlID0gcGFyc2VJbnQoJChcIiNpbnB1dC1tYW5hZ2UtQ29wcGljZUludGVydmFsXCIpLnZhbCgpKTtcbiAgICAgIH1cblxuXG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgICAgICAgIG1vbnRoIDogKGkgKyAxKVxuICAgICAgICAgIH07XG4gICAgICAgICAgZm9yICggdmFyIGogPSAxOyBqIDwgdGhpcy5hcHAuaW5wdXRzLndlYXRoZXIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgdmFyIGMgPSB0aGlzLmFwcC5pbnB1dHMud2VhdGhlcltqXTtcbiAgICAgICAgICAgICAgaXRlbVtjXSA9IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC13ZWF0aGVyLVwiICsgYyArIFwiLVwiICsgaSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpdGVtLm5yZWwgPSBpdGVtLnJhZCAvIDAuMDAzNjtcblxuICAgICAgICAgIHdlYXRoZXJNYXBbaV0gPSBpdGVtO1xuICAgICAgfVxuXG4gICAgICBpZiggdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlciApIHtcbiAgICAgICAgICBmb3IoIHZhciBkYXRlIGluIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXIgKSB7XG4gICAgICAgICAgICAgIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0ubnJlbCA9IHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0ucmFkIC8gMC4wMDM2O1xuICAgICAgICAgICAgICAvL2N1c3RvbVdlYXRoZXJNYXBbZGF0ZV0gPSBjdXN0b21fd2VhdGhlcltkYXRlXTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gd2VhdGhlck1hcDtcbiAgfSxcbiAgZHVtcCA6IGZ1bmN0aW9uKHJvd3MsIHNoZWV0KSB7XG4gICAgICAvLyBzZXQgdGhlIHJhdyBvdXRwdXRcbiAgICAgIHRoaXMuYXBwLnJ1bkNvbXBsZXRlKHJvd3MpO1xuICB9LFxuXG4gIC8vIHJlYWQgYSB2YWx1ZSBmcm9tIHRoZSBpbnB1dFxuICAvLyBpdCBoYXMgYSAnLCcgaXMgc2V0IGZvciB2YXJpYXRpb25cbiAgX3JlYWRWYWwgOiBmdW5jdGlvbihlbGUpIHtcbiAgICAgIHZhciB2YWwgPSBlbGUudmFsKCk7XG4gICAgICBpZiggdmFsLm1hdGNoKC9cXGQqLVxcZCotXFxkKiQvKSApIHtcbiAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfSBlbHNlIGlmKCB2YWwubWF0Y2goLy4qLC4qLykgKSB7XG4gICAgICAgICAgdmFsID0gdmFsLnJlcGxhY2UoL1xccy9nLCcnKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgdmFyIGlkID0gZWxlLmF0dHIoXCJpZFwiKS5yZXBsYWNlKC9eaW5wdXQtLywnJykucmVwbGFjZSgvLS9nLCcuJyk7XG4gICAgICAgICAgdGhpcy5tb2RlbC52YXJpYXRpb25zW2lkXSA9IFtdO1xuICAgICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgICB0aGlzLm1vZGVsLnZhcmlhdGlvbnNbaWRdLnB1c2gocGFyc2VGbG9hdCh2YWxbaV0pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwudmFyaWF0aW9uc1tpZF1bMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWwpO1xuICB9LFxuXG4gIHJlYWRGcm9tSW5wdXRzIDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyByZWFkIHNvaWxcbiAgICAgIHRoaXMubW9kZWwuc29pbCA9IHt9O1xuICAgICAgdGhpcy5tb2RlbC5zb2lsLm1heEFXUyA9IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC1zb2lsLW1heGF3c1wiKSk7XG4gICAgICB0aGlzLm1vZGVsLnNvaWwuc3dwb3dlciA9IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC1zb2lsLXN3cG93ZXJcIikpO1xuICAgICAgdGhpcy5tb2RlbC5zb2lsLnN3Y29uc3QgPSB0aGlzLl9yZWFkVmFsKCQoXCIjaW5wdXQtc29pbC1zd2NvbnN0XCIpKTtcblxuICAgICAgLy8gcmVhZCBtYW5hZ2VcbiAgICAgIHRoaXMubW9kZWwubWFuYWdlID0ge1xuICAgICAgICAgIGNvcHBpY2UgOiBmYWxzZVxuICAgICAgfTtcbiAgICAgIHZhciBlbGVzID0gJChcIi5tYW5hZ2VcIik7XG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGVsZSA9ICQoZWxlc1tpXSk7XG4gICAgICAgICAgdGhpcy5tb2RlbC5tYW5hZ2VbZWxlLmF0dHIoXCJpZFwiKS5yZXBsYWNlKFwiaW5wdXQtbWFuYWdlLVwiLCBcIlwiKV0gPSB0aGlzLl9yZWFkVmFsKGVsZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlYWQgcGxhbnRhdGlvblxuICAgICAgaWYoICF0aGlzLm1vZGVsLnBsYW50YXRpb24gKSB0aGlzLm1vZGVsLnBsYW50YXRpb24gPSB7fTtcbiAgICAgIGVsZXMgPSAkKFwiLnBsYW50YXRpb25cIik7XG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGVsZSA9ICQoZWxlc1tpXSk7XG4gICAgICAgICAgdGhpcy5tb2RlbC5wbGFudGF0aW9uW2VsZS5hdHRyKFwiaWRcIikucmVwbGFjZShcImlucHV0LXBsYW50YXRpb24tXCIsIFwiXCIpXSA9IHRoaXMuX3JlYWRWYWwoZWxlKTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVhZCB0cmVlXG4gICAgICB2YXIgdHJlZUlucHV0cyA9ICQoXCIudHJlZVwiKTtcbiAgICAgIHRoaXMubW9kZWwudHJlZSA9IHt9O1xuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgdHJlZUlucHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBlbGUgPSAkKHRyZWVJbnB1dHNbaV0pO1xuXG4gICAgICAgICAgdmFyIHBhcnRzID0gZWxlLmF0dHIoXCJpZFwiKS5yZXBsYWNlKFwiaW5wdXQtdHJlZS1cIiwgXCJcIikuc3BsaXQoXCItXCIpO1xuICAgICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICB0aGlzLm1vZGVsLnRyZWVbcGFydHNbMF1dID0gdGhpcy5fcmVhZFZhbChlbGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICghdGhpcy5tb2RlbC50cmVlW3BhcnRzWzBdXSlcbiAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudHJlZVtwYXJ0c1swXV0gPSB7fTtcbiAgICAgICAgICAgICAgdGhpcy5tb2RlbC50cmVlW3BhcnRzWzBdXVtwYXJ0c1sxXV0gPSB0aGlzLl9yZWFkVmFsKGVsZSk7XG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyByZWFkIHBsYW50YXRpb24gc3RhdGVcbiAgICAgIGlmKCAhdGhpcy5tb2RlbC5wbGFudGF0aW9uX3N0YXRlICkgdGhpcy5tb2RlbC5wbGFudGF0aW9uX3N0YXRlID0ge307XG4gICAgICBmb3IgKCB2YXIga2V5IGluIHRoaXMubW9kZWwuZ2V0RGF0YU1vZGVsKCkucGxhbnRhdGlvbl9zdGF0ZS52YWx1ZSApIHtcbiAgICAgICAgICB0aGlzLm1vZGVsLnBsYW50YXRpb25fc3RhdGVba2V5XSA9IC0xO1xuICAgICAgfVxuXG4gIH0sXG4gIGV4cG9ydFNldHVwIDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLm1vZGVsLnZhcmlhdGlvbnMgPSB7fTtcbiAgICAgIHRoaXMucmVhZEZyb21JbnB1dHMoKTtcbiAgICAgIHRoaXMucmVhZFdlYXRoZXIoW10sIHt9LCB7fSk7XG5cbiAgICAgIHZhciBleCA9IHtcbiAgICAgICAgICB3ZWF0aGVyIDogdGhpcy5tb2RlbC53ZWF0aGVyLFxuICAgICAgICAgIGN1c3RvbV93ZWF0aGVyIDogdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlcixcbiAgICAgICAgICB0cmVlIDogdGhpcy5tb2RlbC50cmVlLFxuICAgICAgICAgIHBsYW50YXRpb24gOiB0aGlzLm1vZGVsLnBsYW50YXRpb24sXG4gICAgICAgICAgbWFuYWdlIDogdGhpcy5tb2RlbC5tYW5hZ2UsXG4gICAgICAgICAgc29pbCA6IHRoaXMubW9kZWwuc29pbCxcbiAgICAgICAgICBwbGFudGluZ1BhcmFtcyA6IHRoaXMubW9kZWwucGxhbnRpbmdQYXJhbXMsXG4gICAgICAgICAgcGxhbnRhdGlvbl9zdGF0ZSA6IHRoaXMubW9kZWwucGxhbnRhdGlvbl9zdGF0ZSxcbiAgICAgICAgICBjb25maWcgOiB7XG4gICAgICAgICAgICAgIGNoYXJ0VHlwZUlucHV0IDogJChcIiNjaGFydFR5cGVJbnB1dFwiKS52YWwoKSxcbiAgICAgICAgICAgICAgbW9udGhzVG9SdW4gOiB0aGlzLmFwcC5tb250aHNUb1J1bigpLFxuICAgICAgICAgICAgICBjdXJyZW50TG9jYXRpb24gOiAkKFwiI2N1cnJlbnQtbG9jYXRpb25cIikuaHRtbCgpLFxuICAgICAgICAgICAgICBsb2FkZWRUcmVlIDogJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwoKSxcbiAgICAgICAgICAgICAgdmVyc2lvbiA6IHRoaXMuYXBwLnFzKFwidmVyc2lvblwiKSA/IHRoaXMuYXBwLnFzKFwidmVyc2lvblwiKSA6IFwibWFzdGVyXCJcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGJ5IGRlZmF1bHQgdGhlIHJlYWQgZnVuY3Rpb24gc2V0IHRoZSB2YXJpYXRpb25zIHZhcmlhYmxlcyBidXQgb25seVxuICAgICAgLy8gcmV0dXJucyB0aGUgZmlyc3QsIHNldCB0aGUgdmFyaWF0aW9uIHBhcmFtcyB0byB0aGVpciBjb3JyZWN0IHZhbHVlc1xuICAgICAgZm9yKCB2YXIga2V5IGluIHRoaXMubW9kZWwudmFyaWF0aW9ucyApIHtcbiAgICAgICAgICB2YXIgcGFydHMgPSBrZXkuc3BsaXQoXCIuXCIpO1xuICAgICAgICAgIHZhciBwYXJhbSA9IGV4O1xuICAgICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoLTE7IGkrKyApIHtcbiAgICAgICAgICAgICAgcGFyYW0gPSBwYXJhbVtwYXJ0c1tpXV07XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhcmFtW3BhcnRzW3BhcnRzLmxlbmd0aC0xXV0gPSB0aGlzLm1vZGVsLnZhcmlhdGlvbnNba2V5XS5qb2luKFwiLCBcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBleDtcbiAgfSxcbiAgbG9hZFRyZWUgOiBmdW5jdGlvbih0cmVlKSB7XG4gICAgICBmb3IgKCB2YXIgcm9vdEtleSBpbiB0cmVlKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB0cmVlW3Jvb3RLZXldICE9ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICQoXCIjaW5wdXQtdHJlZS1cIiArIHJvb3RLZXkpLnZhbCh0cmVlW3Jvb3RLZXldKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmb3IgKCB2YXIgY2hpbGRLZXkgaW4gdHJlZVtyb290S2V5XSkge1xuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC10cmVlLVwiICsgcm9vdEtleSArIFwiLVwiICsgY2hpbGRLZXkpLnZhbCh0cmVlW3Jvb3RLZXldW2NoaWxkS2V5XSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gIH0sXG4gIGxvYWRTZXR1cCA6IGZ1bmN0aW9uKGZpbGVpZCwgc2V0dXAsIGlzUnQpIHtcblxuICAgICAgLy8gbG9hZCBjb25maWdcbiAgICAgIGlmIChzZXR1cC5jb25maWcuY2hhcnRUeXBlSW5wdXQpIHtcbiAgICAgICAgICB0aGlzLmNoYXJ0cy51bnNlbGVjdEFsbCgpO1xuICAgICAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHNldHVwLmNvbmZpZy5jaGFydFR5cGVJbnB1dC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB0aGlzLmNoYXJ0cy5zZWxlY3Qoc2V0dXAuY29uZmlnLmNoYXJ0VHlwZUlucHV0W2ldKTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc2V0dXAuY29uZmlnLmN1cnJlbnRMb2NhdGlvbikge1xuICAgICAgICAgICQoXCIjY3VycmVudC1sb2NhdGlvblwiKS5odG1sKHNldHVwLmNvbmZpZy5jdXJyZW50TG9jYXRpb24pO1xuICAgICAgfVxuICAgICAgaWYoIHNldHVwLmNvbmZpZy5sb2FkZWRUcmVlICkge1xuICAgICAgICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKHNldHVwLmNvbmZpZy5sb2FkZWRUcmVlKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGxvYWQgd2VhdGhlclxuICAgICAgaWYoIEFycmF5LmlzQXJyYXkoc2V0dXAud2VhdGhlcikgKSB7XG4gICAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHNldHVwLndlYXRoZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAoIHZhciBrZXkgaW4gc2V0dXAud2VhdGhlcltpXSkge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gJ21vbnRoJylcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgaWYgKHNldHVwLndlYXRoZXJbaV1ba2V5XSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBrZXkgKyBcIi1cIiArIGkpLnZhbChzZXR1cC53ZWF0aGVyW2ldW2tleV0pXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBrZXkgKyBcIi1cIiArIGkpLnZhbChcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICggdmFyIGkgaW4gc2V0dXAud2VhdGhlciApIHtcbiAgICAgICAgICAgIGZvciAoIHZhciBrZXkgaW4gc2V0dXAud2VhdGhlcltpXSkge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gJ21vbnRoJylcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgaWYgKHNldHVwLndlYXRoZXJbaV1ba2V5XSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBrZXkgKyBcIi1cIiArIGkpLnZhbChzZXR1cC53ZWF0aGVyW2ldW2tleV0pXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBrZXkgKyBcIi1cIiArIGkpLnZhbChcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiggc2V0dXAuY3VzdG9tX3dlYXRoZXIgKSB7XG4gICAgICAgICAgdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlciA9IHNldHVwLmN1c3RvbV93ZWF0aGVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1vZGVsLmN1c3RvbV93ZWF0aGVyID0ge307XG4gICAgICB9XG5cbiAgICAgIC8vIGNyZWF0ZSB0aGUgY2hhcnRcbiAgICAgIHRoaXMuaW5wdXRGb3JtLnVwZGF0ZUF2ZXJhZ2VDaGFydCgpO1xuXG4gICAgICAvLyBsb2FkIHRyZWVcbiAgICAgIHRoaXMubG9hZFRyZWUoc2V0dXAudHJlZSk7XG5cbiAgICAgIC8vIGxvYWQgcGxhbnRpbmcgcGFyYW1zXG4gICAgICAvLyBOb3cgcGFydCBvZiBtYW5hZ2UuLi4uXG4gICAgICAvLyBmb1xuICAgICAgaWYgKHNldHVwLnBsYW50aW5nUGFyYW1zKSB7XG4gICAgICAgICAgdmFyIG1hcCA9IHtcbiAgICAgICAgICAgICAgXCJkYXRlUGxhbnRlZFwiIDogXCJEYXRlUGxhbnRlZFwiLFxuICAgICAgICAgICAgICBcImRhdGVDb3BwaWNlZFwiIDogXCJEYXRlQ29wcGljZWRcIixcbiAgICAgICAgICAgICAgXCJ5ZWFyc1BlckNvcHBpY2VcIiA6IFwiQ29wcGljZUludGVydmFsXCJcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3IgKCB2YXIga2V5IGluIHNldHVwLnBsYW50aW5nUGFyYW1zKSB7XG4gICAgICAgICAgICAgIHZhciBuZXdLZXkgPSBrZXk7XG4gICAgICAgICAgICAgIGlmKCBtYXBba2V5XSApIG5ld0tleSA9IG1hcFtrZXldO1xuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2V0dXAucGxhbnRpbmdQYXJhbXNba2V5XSA9PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtbWFuYWdlLVwiICsgbmV3S2V5KS52YWwoc2V0dXAucGxhbnRpbmdQYXJhbXNba2V5XS5yZXBsYWNlKC9ULiovLCAnJykpO1xuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LW1hbmFnZS1cIiArIG5ld0tleSkudmFsKHNldHVwLnBsYW50aW5nUGFyYW1zW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gdGhpcyB2YWx1ZSBpcyBkZXByZWNhdGVkLCBzZXQgdG8gbmV3IGlucHV0XG4gICAgICBpZiggc2V0dXAuY29uZmlnLm1vbnRoc1RvUnVuICkge1xuICAgICAgICAgIHZhciBkID0gbmV3IERhdGUoc2V0dXAucGxhbnRpbmdQYXJhbXMuZGF0ZVBsYW50ZWQpO1xuICAgICAgICAgIGQgPSBuZXcgRGF0ZShuZXcgRGF0ZShkKS5zZXRNb250aChkLmdldE1vbnRoKCkrcGFyc2VJbnQoc2V0dXAuY29uZmlnLm1vbnRoc1RvUnVuKSkpO1xuICAgICAgICAgICQoXCIjaW5wdXQtbWFuYWdlLURhdGVGaW5hbEhhcnZlc3RcIikudmFsKGQudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULiovLCAnJykpO1xuICAgICAgfVxuXG5cbiAgICAgIC8vIGxvYWQgcmVzdFxuICAgICAgdmFyIGlucHV0cyA9IFsgXCJwbGFudGF0aW9uXCIsIFwic29pbFwiLCBcIm1hbmFnZVwiIF07XG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBmb3IgKCB2YXIga2V5IGluIHNldHVwW2lucHV0c1tpXV0pIHtcbiAgICAgICAgICAgICAgaWYgKGtleSA9PSAnbWF4QVdTJykge1xuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC1zb2lsLW1heGF3c1wiKS52YWwoc2V0dXAuc29pbC5tYXhBV1MpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2Ygc2V0dXBbaW5wdXRzW2ldXVtrZXldID09ICdzdHJpbmcnICYmIHNldHVwW2lucHV0c1tpXV1ba2V5XS5tYXRjaCgvLipULipaJC8pICkge1xuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC1cIiArIGlucHV0c1tpXSArIFwiLVwiICsga2V5KS52YWwoc2V0dXBbaW5wdXRzW2ldXVtrZXldLnJlcGxhY2UoL1QuKi8sICcnKSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LVwiICsgaW5wdXRzW2ldICsgXCItXCIgKyBrZXkpLnZhbChzZXR1cFtpbnB1dHNbaV1dW2tleV0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5hcHAucnVuTW9kZWwoaXNSdCk7XG4gIH1cbn07XG4iLCJcbiAgLy8gbXVzdCBpbnN0YWxsIHRoaXMgZm9yIG5hdGl2ZSBwaG9uZWdhcCBzdXBwb3J0OlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vcGhvbmVnYXAtYnVpbGQvQ2hpbGRCcm93c2VyXG5cbnZhciB3aW4gPSBudWxsO1xuXG4vKiB0aGUga2V5IGZvciByZWZyZXNoIFRva2VuIGluIGxvY2FsIFN0b3JhZ2UgKi9cbnZhciB0b2tlbktleSA9ICdyZWZyZXNoX3Rva2VuJztcblxuLyogc3RvcmVzIHRoZSBhY2Nlc3NUb2tlbiBhZnRlciByZXRyaWV2YWwgZnJvbSBnb29nbGUgc2VydmVyICovXG52YXIgYWNjZXNzVG9rZW4gPSBudWxsO1xuXG4vKiBzdG9yZXMgdGhlIFRpbWUgd2hlbiBhY2Nlc3MgdG9rZW4gd2FzIGxhc3QgcmVjZWl2ZWQgZnJvbSBzZXJ2ZXIgKi9cbnZhciBhY2Nlc3NUb2tlblRpbWUgPSBudWxsO1xuXG4vKiBzdG9yZXMgYWNjZXNzIFRva2VuJ3MgRXhwaXJ5IExpbWl0LiBVc2VzIDU4IG1pbi4gaW5zdGVhZCBvZiA2MCBtaW4uICovXG52YXIgYWNjZXNzVG9rZW5FeHBpcnlMaW1pdCA9IDU4ICogNjAgKiAxMDAwO1xuXG4vKiBBIHRlbXBvcmFyeSB2YXJpYWJsZSBzdG9yaW5nIGNhbGxiYWNrIGZ1bmN0aW9uICovXG52YXIgY2FsbGJhY2tGdW5jID0gZmFsc2U7XG5cbi8vIGFyZSB3ZSBydW5uaW5nIG5hdGl2ZSBvciBicm93c2VyIG1vZGU/XG52YXIgaXNOYXRpdmUgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvXmZpbGUuKi8pID8gdHJ1ZSA6IGZhbHNlO1xuXG52YXIgQ0xJRU5UX0lEID0gaXNOYXRpdmUgP1xuICAgICAgICBcIjM0NDE5MDcxMzQ2NS1kaWltdGZlcmg0dGpiMDMxNjlia2w5bWtvcXZxMnJ1OS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwiIDpcbiAgICAgICAgIFwiMzQ0MTkwNzEzNDY1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tXCI7XG5cbnZhciBBUFBfSUQgPSBcIjM0NDE5MDcxMzQ2NVwiO1xuXG52YXIgT0FVVEhfU0NPUEVTID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUuZmlsZSAnXG4gICsgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUuaW5zdGFsbCAnXG4gICsgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8ucHJvZmlsZSc7XG5cbi8qIGNvbmZpZyB2YWx1ZXMgZm9yIEdvb2dsZSBBUEkgKGdhcGkpICovXG52YXIgZ2FwaUNvbmZpZyA9IHtcbiAgZW5kcG9pbnQ6IFwiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGhcIixcbiAgZW5kdG9rZW46IFwiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL3Rva2VuXCIsIC8vIHRva2VuIGVuZHBvaW50XG4gIHJlZGlyZWN0X3VyaSA6IFwiaHR0cDovL2xvY2FsaG9zdFwiLFxuICBjbGllbnRfc2VjcmV0IDogJzZyT1E5bDBmeW5oMTM3TVJYR0stR19aZycsXG4gIHJlc3BvbnNlX3R5cGUgOiBcImNvZGVcIixcbiAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICBzdGF0ZSA6IFwiZ2RyaXZlaW5pdFwiLFxuICBhY2Nlc3NfdHlwZSA6IFwib2ZmbGluZVwiLFxuICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcblxuICAvKiBBcyBkZWZpbmVkIGluIHRoZSBPQXV0aCAyLjAgc3BlY2lmaWNhdGlvbiwgdGhpcyBmaWVsZCBtdXN0IGNvbnRhaW4gYSB2YWx1ZVxuICAgICAqIG9mIFwiYXV0aG9yaXphdGlvbl9jb2RlXCIgb3IgXCJyZWZyZXNoX3Rva2VuXCIgKi9cbiAgICBncmFudFR5cGVzOiB7IEFVVEhPUklaRTogXCJhdXRob3JpemF0aW9uX2NvZGVcIiwgUkVGUkVTSDogXCJyZWZyZXNoX3Rva2VuXCIgfSxcbiB9O1xuXG4vKipcbiAqIEVudW0gZm9yIFN0YXR1cyB2YWx1ZXNcbiAqXG4gKiBAZW51bSB7bnVtYmVyfVxuICpcbiAqIFNVQ0NFU1MgLSBTdWNjZXNzZnVsbHkgZGF0YSByZWNlaXZlZCBmcm9tIHNlcnZlclxuICogRVJST1IgLSBFcnJvciBvY2N1cnJlZCB3aGVuIHRyeWluZyB0byByZWNlaXZlIGZyb20gc2VydmVyXG4gKiBOT1RfREVURVJNSU5FRCAtIHVuZGV0ZXJtaW5lZFxuICovXG52YXIgc3RhdHVzID0ge1xuICAgICAgICBTVUNFU1M6IDEsXG4gICAgICAgIEVSUk9SOiAtMSxcbiAgICAgICAgTk9UX0RFVEVSTUlORUQ6IDBcbn1cblxucmVxdWVzdFN0YXR1cyA9IDA7XG5cbi8qIHN0b3JlcyB0aGUgYXV0aG9yaXphdGlvbiBDb2RlIGludGVybmFsbHkgKi9cbmF1dGhDb2RlID0gZmFsc2U7XG5cbi8qIHN0b3JlcyB0aGUgZXJyb3IgbWVzc2FnZSB3aGVuIGFuIGVycm9yIGhhcHBlbnMgZnJvbSBnb29nbGUgc2VydmVyICovXG5lcnJvck1lc3NhZ2UgPSBmYWxzZTtcblxudmFyIGxvZyA9IGZ1bmN0aW9uKG1zZykge1xuICBjb25zb2xlLmxvZyhcIioqKk9BVVRIKioqOiBcIittc2cpO1xufVxuXG4vKipcbiAqIEF0dGVtcHRzIHRvIGF1dGhvcml6ZSB1c2VyIHVzaW5nIE9BdXRoXG4gKiBPcGVucyB1cCBBbm90aGVyIHdpbmRvdyB3aGVyZSB1c2VyIGFsbG93cyBhY2Nlc3Mgb3IgZGVuaWVzIGl0LlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxCYWNrICAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aGljaCBpcyBpbnZva2VkXG4gKi9cbnZhciBhdXRob3JpemUgPSBmdW5jdGlvbihjYWxsQmFjaykge1xuICBsb2coXCJhdHRlbXB0aW5nIHRvIGF1dGhvcml6ZVwiKTtcblxuICAgIHZhciBhdXRoVXJpID0gZ2FwaUNvbmZpZy5lbmRwb2ludCArICc/J1xuICAgICsgJ3Njb3BlPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5zY29wZSlcbiAgICArICcmJyArICdyZWRpcmVjdF91cmk9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLnJlZGlyZWN0X3VyaSlcbiAgICArICcmJyArICdyZXNwb25zZV90eXBlPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5yZXNwb25zZV90eXBlKVxuICAgICsgJyYnICsgJ2NsaWVudF9pZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcuY2xpZW50X2lkKTtcbiAgICAvLysgJyYnICsgJ3N0YXRlPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5zdGF0ZSlcbiAgICAvLysgJyYnICsgJ2FjY2Vzc190eXBlPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5hY2Nlc3NfdHlwZSlcbiAgICAvLysgJyYnICsgJ2FwcHJvdmFsX3Byb21wdD1mb3JjZSc7IC8vIEBUT0RPIC0gY2hlY2sgaWYgd2UgcmVhbGx5IG5lZWQgdGhpcyBwYXJhbVxuXG4gICAgY2FsbGJhY2tGdW5jID0gY2FsbEJhY2s7XG4gICAgcmVxdWVzdFN0YXR1cyA9IHN0YXR1cy5OT1RfREVURVJNSU5FRDtcblxuXG5cblxuICAgIGxvZyhcIm9wZW5pbmcgSW5BcHBCcm93c2VyXCIpO1xuXG4gICAgdHJ5IHtcblxuICAgICAgLy8gTm93IG9wZW4gbmV3IGJyb3dzZXJcbiAgICAgIHdpbiA9IHdpbmRvdy5vcGVuKGF1dGhVcmksICdfYmxhbmsnLCAnbG9jYXRpb249bm8sdG9vbGJhcj1ubycpO1xuXG4gICAgICAkKHdpbikub24oJ2xvYWRzdGFydCcsZnVuY3Rpb24oZSl7XG4gICAgICAgIGxvZyhcIkluQXBwQnJvd3NlciBsb2Fkc3RhcnRcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGUub3JpZ2luYWxFdmVudC51cmwpO1xuICAgICAgICBvbkF1dGhVcmxDaGFuZ2UoZS5vcmlnaW5hbEV2ZW50LnVybCk7XG4gICAgICB9KTtcblxuICAgICAgLy93aW5kb3cucGx1Z2lucy5jaGlsZEJyb3dzZXIuc2hvd1dlYlBhZ2UoYXV0aFVyaSwge3Nob3dMb2NhdGlvbkJhciA6IHRydWV9KTtcbiAgICAgIC8vd2luZG93LnBsdWdpbnMuY2hpbGRCcm93c2VyLm9uQ2xvc2UgPSBvbkF1dGhDbG9zZTtcbiAgICAgIC8vd2luZG93LnBsdWdpbnMuY2hpbGRCcm93c2VyLm9uTG9jYXRpb25DaGFuZ2UgPSBvbkF1dGhVcmxDaGFuZ2U7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBsb2coXCJFcnJvciBvcGVuaW5nIEluQXBwQnJvd3NlclwiKTtcbiAgICAgIGxvZyhlKTtcbiAgICB9XG5cbn07XG5cbmlmKCAhaXNOYXRpdmUgKSB7XG4gIGF1dGhvcml6ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBpbW1lZGlhdGUpIHtcbiAgZ2FwaS5hdXRoLmF1dGhvcml6ZSh7XG4gICAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICAgIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuICAgIGltbWVkaWF0ZSA6IGltbWVkaWF0ZVxuICB9LCBmdW5jdGlvbigpIHtcbiAgICBhdXRoQ29kZSA9IGdhcGkuYXV0aC5nZXRUb2tlbigpO1xuICAgIGNhbGxiYWNrKGF1dGhDb2RlKTtcbiAgfSk7XG5cbiAgfVxufVxuXG4vKiBBdXRoIFdpbmRvdyBjbG9zZWQgKi9cbnZhciBvbkF1dGhDbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQXV0aCB3aW5kb3cgY2xvc2VkXCIpO1xufTtcblxuLyogT0F1dGggU3VjY2Vzc2Z1bGx5IGRvbmUgKi9cbnZhciBvbkF1dGhTdWNjZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ0F1dGggU3VjY2Vzcz8nKTtcbn07XG5cbi8qKlxuICogR2V0cyBJbnZva2VkIHdoZW4gdGhlIFVSTCBjaGFuZ2VzIG9uIE9BdXRoIGF1dGhvcml6YXRpb24gcHJvY2Vzc1xuICpcbiAqIFN1Y2Nlc3MgVVJMIFBhdHRlcm46XG4gKiBcInJlZGlyZWN0X3VyaVwiICsgXCI/Y29kZT1cIiBbc2VjcmV0IGNvZGUgdmFsXVxuICpcbiAqIFN1Y2Nlc3MgU2FtcGxlIFVSTDpcbiAqIGh0dHA6Ly9sb2NhbGhvc3QvP2NvZGU9NC9XT3BSTFFmdnZoSEUwdHVNVUREcW5uNzZsQ1RULjhuWEM0SWViTUVBVXVKSlZuTDQ5Q2M4QVFHcjhjUUlcbiAqXG4gKiBEZW5pZWQgQWNjZXNzIFVSTCBQYXR0ZXJuOiBcInJlZGlyZWN0X3VyaVwiICsgP2Vycm9yPWFjY2Vzc19kZW5pZWRcbiAqIERlbmllZCBBY2Nlc3MgU2FtcGxlOiBodHRwOi8vbG9jYWxob3N0Lz9lcnJvcj1hY2Nlc3NfZGVuaWVkXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVyaUxvY2F0aW9uIFRoZSBVUkkgTG9jYXRpb25cbiAqL1xudmFyIG9uQXV0aFVybENoYW5nZSA9IGZ1bmN0aW9uKHVyaUxvY2F0aW9uKSB7XG4gICAgY29uc29sZS5sb2coXCJJbkFwcEJyb3dzZXIgdXJsIGNoYW5nZWQgXCIrdXJpTG9jYXRpb24pO1xuICAgIGlmKHVyaUxvY2F0aW9uLmluZGV4T2YoXCJjb2RlPVwiKSAhPSAtMSkge1xuICAgICAgICByZXF1ZXN0U3RhdHVzID0gc3RhdHVzLlNVQ0NFU1M7XG5cbiAgICAgICAgLyogU3RvcmUgdGhlIGF1dGhDb2RlIHRlbXBvcmFyaWx5ICovXG4gICAgICAgIGF1dGhDb2RlID0gZ2V0UGFyYW1ldGVyQnlOYW1lKFwiY29kZVwiLCB1cmlMb2NhdGlvbik7XG4gICAgICAgIGxvZyhcIkZvdW5kIGF1dGggY29kZTogXCIrYXV0aENvZGUpO1xuXG4gICAgICAgIGdldFJlZnJlc2hUb2tlbihjYWxsYmFja0Z1bmMpO1xuXG4gICAgICAgIC8vIGNsb3NlIHRoZSBjaGlsZEJyb3dzZXJcbiAgICAgICAgd2luLmNsb3NlKCk7XG4gICAgfSBlbHNlIGlmKHVyaUxvY2F0aW9uLmluZGV4T2YoXCJlcnJvcj1cIikgIT0gLTEpICB7XG4gICAgICAgIHJlcXVlc3RTdGF0dXMgPSBzdGF0dXMuRVJST1I7XG4gICAgICAgIGVycm9yTWVzc2FnZSA9IGdldFBhcmFtZXRlckJ5TmFtZShcImVycm9yXCIsIHVyaUxvY2F0aW9uKTtcbiAgICAgICAgY2FsbGJhY2tGdW5jKCk7XG4gICAgICAgIHdpbi5jbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcXVlc3RTdGF0dXMgPSBzdGF0dXMuTk9UX0RFVEVSTUlORUQ7XG4gICAgICAgIC8vY2FsbGJhY2tGdW5jKCk7XG4gICAgfVxufTtcblxuXG4vKipcbiogR2V0cyB0aGUgUmVmcmVzaCBmcm9tIEFjY2VzcyBUb2tlbi4gVGhpcyBtZXRob2QgaXMgb25seSBjYWxsZWQgaW50ZXJuYWxseSxcbiogYW5kIG9uY2UsIG9ubHkgYWZ0ZXIgd2hlbiBhdXRob3JpemF0aW9uIG9mIEFwcGxpY2F0aW9uIGhhcHBlbnMuXG4qXG4qIEBwYXJhbSBwYXJhbU9iaiBBbiBPYmplY3QgY29udGFpbmluZyBhdXRob3JpemF0aW9uIGNvZGVcbiogQHBhcmFtIHBhcmFtT2JqLmF1dGhfY29kZSBUaGUgQXV0aG9yaXphdGlvbiBDb2RlIGZvciBnZXR0aW5nIFJlZnJlc2ggVG9rZW5cbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgY2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgdG8gYmUgaW52b2tlZCBhZnRlclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzZnVsIHJldHJpZXZhbCBvZiBkYXRhIGZyb20gZ29vZ2xlJ3Mgc2VydmVyXG4qXG4qL1xudmFyIGdldFJlZnJlc2hUb2tlbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIGNvbnNvbGUubG9nKFwiYWNjZXNzIHJlZnJlc2ggdG9rZW5cIik7XG4gICAkLmFqYXgoe1xuICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgIHVybDogZ2FwaUNvbmZpZy5lbmR0b2tlbixcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgY2xpZW50X2lkICAgIDogZ2FwaUNvbmZpZy5jbGllbnRfaWQsXG4gICAgICAgICAgICAgICAgICAgY2xpZW50X3NlY3JldDogZ2FwaUNvbmZpZy5jbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgICAgICAgIGNvZGUgICAgICAgICA6IGF1dGhDb2RlLFxuICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0X3VyaSA6IGdhcGlDb25maWcucmVkaXJlY3RfdXJpLFxuICAgICAgICAgICAgICAgICAgIGdyYW50X3R5cGUgICA6IGdhcGlDb25maWcuZ3JhbnRUeXBlcy5BVVRIT1JJWkVcbiAgICAgICAgICAgfVxuICAgIH0pXG4gICAgLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3MgZ2V0dGluZyByZWZyZXNoIHRva2VuXCIpO1xuXG4gICAgICAgIC8qIHVwb24gc3VjZXNzLCBkbyBhIGNhbGxiYWNrIHdpdGggdGhlIGRhdGEgcmVjZWl2ZWQgKi9cbiAgICAgICAgLy8gdGVtcG9yYXJ5IHN0b3JpbmcgYWNjZXNzIHRva2VuXG4gICAgICAgIGFjY2Vzc1Rva2VuICAgICA9IGRhdGEuYWNjZXNzX3Rva2VuO1xuICAgICAgICBhY2Nlc3NUb2tlblRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgdG9rZW4gZm9yIHRoZSBqcyBhcGlcbiAgICAgICAgZ2FwaS5hdXRoLnNldFRva2VuKGRhdGEpO1xuXG4gICAgICAgIC8qIHNldCB0aGUgZXJyb3Igb2YgZGF0YSB0byBmYWxzZSwgYXMgaXQgd2FzIHN1Y2Nlc3NmdWwgKi9cbiAgICAgICAgZGF0YS5lcnJvciA9IGZhbHNlO1xuXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0b2tlbktleSwgZGF0YS5yZWZyZXNoX3Rva2VuKTtcblxuICAgICAgICAvKiBub3cgaW52b2tlIHRoZSBjYWxsYmFjayAqL1xuICAgICAgICBjYWxsYmFjayh7YWNjZXNzX3Rva2VuOiBhY2Nlc3NUb2tlbn0pO1xuICAgIH0pXG4gICAgLmZhaWwoZnVuY3Rpb24oeGhyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICB9KTtcbiAgICB9KVxuICAgIC5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVG9rZW4gcmVxdWVzdCBjb21wbGV0ZVwiKTtcbiAgICB9KTtcbn07XG5cbmlmKCAhaXNOYXRpdmUgKSB7XG4gIGdldFJlZnJlc2hUb2tlbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIGdhcGkuYXV0aC5hdXRob3JpemUoe1xuICAgIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcbiAgICBpbW1lZGlhdGUgOiB0cnVlXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIHRva2VuID0gZ2FwaS5hdXRoLmdldFRva2VuKCk7XG4gICAgaWYoIGNhbGxiYWNrICkgY2FsbGJhY2sodG9rZW4pO1xuICB9KTtcbiAgfVxufVxuXG5cbi8qKlxuKiBUaGlzIG1ldGhvZCBzaG91bGQgT05MWSBiZSBjYWxsZWQgbG9jYWxseSBmcm9tIHdpdGhpbiB0aGlzIGNsYXNzLlxuKiBSZXR1cm5zIHRoZSBSZWZyZXNoIFRva2VuIGZyb20gdGhlIGxvY2FsIGRhdGFiYXNlLlxuKlxuKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSByZWZyZXNoIFRva2VuXG4qXG4qL1xudmFyIGdldFRva2VuID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0b2tlbktleSk7XG59O1xuXG5cbi8qKlxuKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGV4dGVybmFsbHkuIEl0IHJldHJpZXZlcyB0aGUgQWNjZXNzIFRva2VuIGJ5IGF0IGZpcnN0XG4qIGNoZWNraW5nIGlmIGN1cnJlbnQgYWNjZXNzIHRva2VuIGhhcyBleHBpcmVkIG9yIG5vdC4gSWYgaXRzIG5vdCBleHBpcmVkLCBpdFxuKiBzaW1wbHkgcmV0dXJucyB0aGF0LCBvdGhlcndpc2UsIGl0IGdldHMgdGhlIHJlZnJlc2ggVG9rZW4gZnJvbSB0aGUgbG9jYWwgZGF0YWJhc2VcbiogKGJ5IGludm9raW5nIGdldFRva2VuKSBhbmQgdGhlbiBjb25uZWN0aW5nIHdpdGggR29vZ2xlJ3MgU2VydmVyICh1c2luZyBPQXV0aClcbiogdG8gZ2V0IHRoZSBBY2Nlc3MgVG9rZW4uXG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrICAgQSBjYWxsQmFjayBmdW5jdGlvbiB3aGljaCBpcyB0byBiZSBpbnZva2VkIGFmdGVyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhIGlzIHJldHJpZXZlZCBmcm9tIHRoZSBnb29nbGUncyBzZXJ2ZXIuIFRoZSBkYXRhXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIGdvb2dsZSBzZXJ2ZXIgaXMgcGFzc2VkIHRvIGNhbGxiYWNrIGFzIGFyZ3MuXG4qXG4qL1xudmFyIGdldEFjY2Vzc1Rva2VuID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgIHZhciBjdXJyZW50VGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cbiAgIGNvbnNvbGUubG9nKFwiZ2V0dGluZyBhY2Nlc3MgdG9rZW5cIik7XG5cbiAgIC8qIGNoZWNrIGlmIGN1cnJlbnQgVG9rZW4gaGFzIG5vdCBleHBpcmVkIChzdGlsbCB2YWxpZCkgKi9cbiAgIGlmIChhY2Nlc3NUb2tlbiAmJiBhY2Nlc3NUb2tlbiAhPSBmYWxzZSAmJlxuICAgICAgICAgICBjdXJyZW50VGltZSA8IChhY2Nlc3NUb2tlblRpbWUgKyBhY2Nlc3NUb2tlbkV4cGlyeUxpbWl0KSkge1xuICAgICAgICAgICBjYWxsYmFjayh7IGFjY2Vzc190b2tlbjogYWNjZXNzVG9rZW4gfSk7XG5cbiAgICAgICAgICAgcmV0dXJuO1xuICAgfVxuXG4gICBjb25zb2xlLmxvZyhcIkFDQ0VTUyBUT0tFTiBQQVJBTVM6IFwiK2FjY2Vzc1Rva2VuK1wiIFwiK2FjY2Vzc1Rva2VuVGltZStcIiBcIithY2Nlc3NUb2tlbkV4cGlyeUxpbWl0KTtcblxuICAgLyogZWxzZSwgZ2V0IHRoZSByZWZyZXNoVG9rZW4gZnJvbSBsb2NhbCBzdG9yYWdlIGFuZCBnZXQgYSBuZXcgYWNjZXNzIFRva2VuICovXG4gICB2YXIgcmVmcmVzaFRva2VuID0gZ2V0VG9rZW4oKTtcblxuICAgLy8gICBjb25zb2xlLmxvZyhcIlJlZnJlc2ggVG9rZW4gPj4gXCIgKyByZWZyZXNoVG9rZW4pO1xuICAgJC5hamF4KHtcbiAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICB1cmw6IGdhcGlDb25maWcuZW5kdG9rZW4sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgY2xpZW50X2lkICAgIDogZ2FwaUNvbmZpZy5jbGllbnRfaWQsXG4gICAgICAgICAgICAgICAgICBjbGllbnRfc2VjcmV0OiBnYXBpQ29uZmlnLmNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW4sXG4gICAgICAgICAgICAgICAgICBncmFudF90eXBlICAgOiBnYXBpQ29uZmlnLmdyYW50VHlwZXMuUkVGUkVTSCxcbiAgICAgICAgICB9XG4gICAgfSlcbiAgICAuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAvKiB1cG9uIHN1Y2VzcywgZG8gYSBjYWxsYmFjayB3aXRoIHRoZSBkYXRhIHJlY2VpdmVkICovXG4gICAgICAgICAgICAvLyB0ZW1wb3Jhcnkgc3RvcmluZyBhY2Nlc3MgdG9rZW5cbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuID0gZGF0YS5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICBhY2Nlc3NUb2tlblRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIHRva2VuIGZvciB0aGUganMgYXBpXG4gICAgICAgICAgICBnYXBpLmF1dGguc2V0VG9rZW4oZGF0YSk7XG5cbiAgICAgICAgICAgIC8qIHNldCB0aGUgZXJyb3IgdG8gZmFsc2UgKi9cbiAgICAgICAgICAgIGRhdGEuZXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICB9KVxuICAgIC5mYWlsKGZ1bmN0aW9uKHhociwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUb2tlbiByZXF1ZXN0IGVycm9yID8/ID4+XCIgKyB4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgIH0pO1xuICAgIH0pXG4gICAgLmFsd2F5cyhmdW5jdGlvbigpIHsgLy9jb25zb2xlLmxvZyhcIlRva2VuIHJlcXVlc3QgY29tcGxldGVcIik7XG4gICAgfSk7XG59O1xuXG5pZiggIWlzTmF0aXZlICkge1xuICBnZXRBY2Nlc3NUb2tlbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgIHZhciBjdXJyZW50VGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cbiAgICAgaWYgKGFjY2Vzc1Rva2VuICYmXG4gICAgICAgICAgICAgY3VycmVudFRpbWUgPCAoYWNjZXNzVG9rZW5UaW1lICsgYWNjZXNzVG9rZW5FeHBpcnlMaW1pdCkpIHtcbiAgICAgICAgICAgICBjYWxsYmFjayhhY2Nlc3NUb2tlbik7XG5cbiAgICAgICAgICAgICByZXR1cm47XG4gICAgIH1cblxuICAgIGdhcGkuYXV0aC5hdXRob3JpemUoe1xuICAgIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcbiAgICBpbW1lZGlhdGUgOiB0cnVlXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIHRva2VuID0gZ2FwaS5hdXRoLmdldFRva2VuKCk7XG4gICAgYWNjZXNzVG9rZW4gPSB0b2tlbjtcbiAgICBhY2Nlc3NUb2tlblRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgIGlmKCBjYWxsYmFjayApIGNhbGxiYWNrKHRva2VuKTtcbiAgfSk7XG4gIH1cbn1cblxuXG5cbi8qKlxuKiBTYXZlcyB0aGUgUmVmcmVzaCBUb2tlbiBpbiBhIGxvY2FsIGRhdGFiYXNlIG9yIGxvY2FsU3RvcmFnZVxuKiBUaGlzIG1ldGhvZCBzaGFsbCBiZSBpbnZva2VkIGZyb20gZXh0ZXJuYWxseSBvbmx5IDxiPm9uY2U8L2I+IGFmdGVyIGFuXG4qIGF1dGhvcml6YXRpb24gY29kZSBpcyByZWNlaXZlZCBmcm9tIGdvb2dsZSdzIHNlcnZlci4gVGhpcyBtZXRob2RcbiogY2FsbHMgdGhlIG90aGVyIG1ldGhvZCAoZ2V0UmVmcmVzaFRva2VuKSB0byBnZXQgdGhlIHJlZnJlc2ggVG9rZW4gYW5kXG4qIHRoZW4gc2F2ZXMgaXQgbG9jYWxseSBvbiBkYXRhYmFzZSBhbmQgaW52b2tlcyBhIGNhbGxiYWNrIGZ1bmN0aW9uXG4qXG4qIEBwYXJhbSB0b2tlbk9iaiBBIE9iamVjdCBjb250YWluaW5nIGF1dGhvcml6YXRpb24gY29kZVxuKiBAcGFyYW0ge1N0cmluZ30gdG9rZW5PYmouYXV0aF9jb2RlIFRoZSBhdXRob3JpemF0aW9uIGNvZGUgZnJvbSBnb29nbGUncyBzZXJ2ZXJcbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2l0aCBwYXJhbWV0ZXJzXG4qL1xudmFyIHNhdmVSZWZyZXNoVG9rZW4gPSBmdW5jdGlvbih0b2tlbk9iaiwgY2FsbGJhY2spIHtcbiAgICAgZ2V0UmVmcmVzaFRva2VuKHRva2VuT2JqLCBmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgICAgICAgICAvKiBpZiB0aGVyZSdzIG5vIGVycm9yICovXG4gICAgICAgICAgICAgaWYgKCFkYXRhLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEBUT0RPOiBtYWtlIGFub3RoZXIgbWV0aG9kIHNhdmVUb2tlbiB0byBhYnN0cmFjdCB0aGUgc3RvcmluZyBvZiB0b2tlblxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0b2tlbktleSwgZGF0YS5yZWZyZXNoX3Rva2VuKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgIH0pO1xufTtcblxuXG5cbi8qKlxuKiBDaGVja3MgaWYgdXNlciBoYXMgYXV0aG9yaXplZCB0aGUgQXBwIG9yIG5vdFxuKiBJdCBkb2VzIHNvIGJ5IGNoZWNraW5nIGlmIHRoZXJlJ3MgYSByZWZyZXNoX3Rva2VuXG4qIGF2YWlsYWJsZSBvbiB0aGUgY3VycmVudCBkYXRhYmFzZSB0YWJsZS5cbipcbiogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBhdXRob3JpemVkLCBmYWxzZSBvdGhlcndpc2VcbiovXG52YXIgaXNBdXRob3JpemVkID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgIHZhciB0b2tlblZhbHVlID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKHRva2VuS2V5KTtcblxuICAgICAgY2FsbGJhY2soKCh0b2tlblZhbHVlICE9PSBudWxsKSAmJiAodHlwZW9mIHRva2VuVmFsdWUgIT09ICd1bmRlZmluZWQnKSkpO1xufTtcblxuaWYoICFpc05hdGl2ZSApIHtcbiAgaXNBdXRob3JpemVkID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICBnYXBpLmF1dGguYXV0aG9yaXplKHtcbiAgICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gICAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG4gICAgaW1tZWRpYXRlIDogdHJ1ZVxuICB9LCBmdW5jdGlvbigpIHtcbiAgICB0b2tlbiA9IGdhcGkuYXV0aC5nZXRUb2tlbigpO1xuICAgIGlmKCBjYWxsYmFjayApIGNhbGxiYWNrKHRva2VuKTtcbiAgfSk7XG4gIH1cbn1cblxuXG4vKipcbiogRXh0cmFjdHMgdGhlIGNvZGUgZnJvbSB0aGUgdXJsLiBDb3BpZWQgZnJvbSBvbmxpbmVcbiogQFRPRE8gbmVlZHMgdG8gYmUgc2ltcGxpZmllZC5cbipcbiogQHBhcmFtIG5hbWUgVGhlIHBhcmFtZXRlciB3aG9zZSB2YWx1ZSBpcyB0byBiZSBncmFiYmVkIGZyb20gdXJsXG4qIEBwYXJhbSB1cmwgIFRoZSB1cmwgdG8gYmUgZ3JhYmJlZCBmcm9tLlxuKlxuKiBAcmV0dXJuIFJldHVybnMgdGhlIFZhbHVlIGNvcnJlc3BvbmRpbmcgdG8gdGhlIG5hbWUgcGFzc2VkXG4qL1xudmFyIGdldFBhcmFtZXRlckJ5TmFtZSA9IGZ1bmN0aW9uKG5hbWUsIHVybCkge1xuICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXS8sIFwiXFxcXFxcW1wiKS5yZXBsYWNlKC9bXFxdXS8sIFwiXFxcXFxcXVwiKTtcbiAgdmFyIHJlZ2V4UyA9IFwiW1xcXFw/Jl1cIiArIG5hbWUgKyBcIj0oW14mI10qKVwiO1xuICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKHJlZ2V4Uyk7XG4gIHZhciByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xuXG4gIGlmKHJlc3VsdHMgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBlbHNlXG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzFdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXV0aG9yaXplIDogYXV0aG9yaXplLFxuICBpc0F1dGhvcml6ZWQgOiBpc0F1dGhvcml6ZWQsXG4gIGdldEFjY2Vzc1Rva2VuIDogZ2V0QWNjZXNzVG9rZW4sXG4gIEFQUF9JRCA6IEFQUF9JRFxufTtcbiIsInZhciBhcHAgPSByZXF1aXJlKCcuL2FwcCcpO1xuXG52YXIgY2FjaGVkVGlsZVN0eWxlID0ge1xuICB3aGVyZTogXCJwaWQgaW4gKClcIixcbiAgcG9seWdvbk9wdGlvbnM6IHtcbiAgICBmaWxsQ29sb3I6IFwiIzAwMDAwMFwiLFxuICAgIHN0cm9rZUNvbG9yOiBcIiNGRjAwMDBcIixcbiAgICBzdHJva2VXZWlnaHQ6IDNcbiAgfVxufVxuXG52YXIgY2FjaGVkVGlsZXMgPSBbXTtcbnZhciBjYWNoZWRUaWxlc0xvYWRlZCA9IGZhbHNlO1xudmFyIGNhY2hlZFRpbGVQcmVmaXggPSAnY2FjaGVkX3RpdGxlXyc7XG52YXIgY2FjaGluZyA9IGZhbHNlO1xudmFyIHNhdmVDYWNoZU9uQ2xpY2tTZXQgPSBmYWxzZTtcbnZhciBjTWFwRGF0YSA9IHt9O1xuXG52YXIgY29scyA9IFtdO1xudmFyIGFwcCA9IG51bGw7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIF9sb2FkRnJvbUNhY2hlKCk7XG4gIF9sb2FkQ2FjaGVkVGlsZXMoKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgaWYoICFjb25maXJtKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2xlYXIgYWxsIHRpbGUgZGF0YSBmcm9tIHRoZSBjYWNoZT8nKSApIHJldHVybjtcblxuICBmb3IoIHZhciBrZXkgaW4gd2luZG93LmxvY2FsU3RvcmFnZSApIHtcbiAgICBpZigga2V5LmluZGV4T2YoY2FjaGVkVGlsZVByZWZpeCkgPiAtMSApIHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgIH1cbiAgfVxuICBjYWNoZWRUaWxlcyA9IFtdO1xufVxuXG4vLyBlIGlzIHRoZSBldmVudCBvYmplY3QgZnJvbSBnb29nbGUgbWFwc1xuZnVuY3Rpb24gY2FjaGVUaWxlKGUsIGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKSB7XG4gIGlmKCAhc2F2ZUNhY2hlT25DbGlja1NldCApIHtcbiAgICBzYXZlQ2FjaGVPbkNsaWNrU2V0ID0gdHJ1ZTtcbiAgICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIF9zYXZlVGlsZSgpO1xuICAgIH0pO1xuICAgICQoJyNsb2NhdGUtY2FjaGUtbW9kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICBpZiggISQodGhpcykuaXMoJ2NoZWNrZWQnKSApICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1wYW5lbCcpLmhpZGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmKCBjYWNoaW5nICkgcmV0dXJuO1xuICBjYWNoaW5nID0gdHJ1ZTtcblxuICBjTWFwRGF0YSA9IHtcbiAgICBmdXNpb25MYXllciA6IGZ1c2lvbkxheWVyLFxuICAgIGRlZmF1bHRPcHRpb25zIDogZGVmYXVsdE9wdGlvbnMsXG4gICAgZGVmYXVsdFN0eWxlIDogZGVmYXVsdFN0eWxlLFxuICAgIHBpZCA6ICBlLnJvdy5waWQudmFsdWVcbiAgfVxuXG4gICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1uYW1lJykudmFsKCcnKTtcbiAgJCgnI2xvY2F0ZS1jYWNoZS1tb2RlLWxvYWRpbmcnKS5zaG93KCk7XG4gICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1wYW5lbCcpLmhpZGUoKTtcblxuICBfbG9hZFRpbGUoZS5sYXRMbmcubG5nKCksIGUubGF0TG5nLmxhdCgpLCBmdW5jdGlvbihkYXRhKXtcbiAgICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGFuZWwnKS5zaG93KCk7XG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1tb2RlLWxvYWRpbmcnKS5oaWRlKCk7XG5cbiAgICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGlkJykuaHRtbChjTWFwRGF0YS5waWQpO1xuICAgIGNNYXBEYXRhLmRhdGEgPSBkYXRhO1xuICAgIGNhY2hpbmcgPSBmYWxzZTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgZm9yKCB2YXIgYXR0ciBpbiBhcHAuZ2V0TW9kZWwoKS53ZWF0aGVyICkge1xuICAgIGlmKCBhdHRyICE9IFwibnJlbFwiICkgY29scy5wdXNoKGF0dHIpO1xuICB9XG5cbiAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAkKFwiI2hlbHAtbW9kYWxcIikubW9kYWwoe1xuICAgIHNob3cgOiBmYWxzZVxuICB9KTtcblxuICBfY3JlYXRlTmF2TWVudSgpO1xuXG4gIC8vIGhpZGUgdGhlIHNlbGVjdCB0cmVlIGJ1dHRvblxuICAkKCcjdHJlZS1zdWItbWVudScpLnBhcmVudCgpLmhpZGUoKTtcblxuICAvLyBoaWRlIHRoZSBzZWxlY3RvciBmb3IgdXBsb2FkaW5nIHdlYXRoZXIgZGF0YSBmcm9tIGEgZ29vZ2xlIHNwcmVhZHNoZWV0XG4gICQoJyN3ZWF0aGVyUmVhZGVyLXNwcmVhZHNoZWV0JykucGFyZW50KCkuaGlkZSgpO1xuXG4gIC8vIHNob3cgdGhlIGNhY2hlIHZlcnNpb24gb2YgdGhlIGxvY2F0aW9uIHNlbGVjdG9yXG4gICQoJyNzZWxlY3QtbG9jYXRpb24tb25saW5lJykuaGlkZSgpO1xuICAkKCcjc2VsZWN0LWxvY2F0aW9uLW9mZmxpbmUnKS5zaG93KCk7XG5cbiAgLy8gc2V0IHRoZSBsb2NhdGlvbiBzZWxlY3RvciB1aSBsaXN0IGJhc2VkIG9uIGNhY2hlZCB0aWxlc1xuICBfdXBkYXRlQ2FjaGVUaWxlVWlMaXN0KCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNhY2hlZFRpbGVzT25NYXAoZnVzaW9uTGF5ZXIsIGRlZmF1bHRPcHRpb25zLCBkZWZhdWx0U3R5bGUpIHtcbiAgaWYoICFjYWNoZWRUaWxlc0xvYWRlZCApIF9sb2FkQ2FjaGVkVGlsZXMoKTtcblxuICBkZWZhdWx0T3B0aW9ucy5zdHlsZXMgPSBbZGVmYXVsdFN0eWxlXTtcblxuICBpZiggY2FjaGVkVGlsZXMubGVuZ3RoID4gMCApIHtcbiAgICBjYWNoZWRUaWxlU3R5bGUud2hlcmUgPSAncGlkIGluICgnK2NhY2hlZFRpbGVzLmpvaW4oJywnKSsnKSc7XG4gICAgZGVmYXVsdE9wdGlvbnMuc3R5bGVzLnB1c2goY2FjaGVkVGlsZVN0eWxlKTtcbiAgfVxuXG4gIGZ1c2lvbkxheWVyLnNldE9wdGlvbnMoZGVmYXVsdE9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBfc2F2ZVRpbGUoKSB7XG4gIHZhciBuYW1lID0gJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLW5hbWUnKS52YWwoKTtcbiAgaWYoIG5hbWUubGVuZ3RoID09IDAgKSByZXR1cm4gYWxlcnQoJ1BsZWFzZSBwcm92aWRlIGEgbmFtZScpO1xuXG4gIGNNYXBEYXRhLmRhdGEubmFtZSA9IG5hbWU7XG5cbiAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGNhY2hlZFRpbGVQcmVmaXgrY01hcERhdGEucGlkLCBKU09OLnN0cmluZ2lmeShjTWFwRGF0YS5kYXRhKSk7XG5cbiAgY2FjaGVkVGlsZXMucHVzaChjTWFwRGF0YS5waWQpO1xuICByZW5kZXJDYWNoZWRUaWxlc09uTWFwKGNNYXBEYXRhLmZ1c2lvbkxheWVyLCBjTWFwRGF0YS5kZWZhdWx0T3B0aW9ucywgY01hcERhdGEuZGVmYXVsdFN0eWxlKTtcbiAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBhbmVsJykuaGlkZSgpO1xufVxuXG5mdW5jdGlvbiBfbG9hZFRpbGUobG5nLCBsYXQsIGNhbGxiYWNrKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3RpbGUtZGF0YS1jYWNoZScsIDEpO1xuXG4gIHZhciB1cmwgPSBcImh0dHA6Ly9hbGRlci5iaW9lbmVyZ3kuY2FzaWwudWNkYXZpcy5lZHU6ODA4MC92aXpzb3VyY2UvcmVzdD92aWV3PXBvaW50VG9XZWF0aGVyKFwiK2xuZytcIixcIitsYXQrXCIsODE5MilcIlxuICB2YXIgcSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5RdWVyeSh1cmwpO1xuICB2YXIgcmVzcHMgPSAwO1xuICB2YXIgd2VhdGhlclRhYmxlID0ge307XG4gIHZhciBzb2lsVGFibGUgPSB7fTtcblxuICBmdW5jdGlvbiBjaGVja0RvbmUoKSB7XG4gICAgICByZXNwcysrO1xuICAgICAgaWYoIHJlc3BzID09IDIgJiYgY2FsbGJhY2sgKSBjYWxsYmFjayh7d2VhdGhlcjp3ZWF0aGVyVGFibGUsIHNvaWw6c29pbFRhYmxlfSk7XG4gIH1cblxuICBxLnNldFF1ZXJ5KCdTRUxFQ1QgKicpO1xuICBxLnNlbmQoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIHdlYXRoZXJUYWJsZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZ2V0RGF0YVRhYmxlKCkudG9KU09OKCkpO1xuICAgIGNoZWNrRG9uZSgpO1xuICB9KTtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vYWxkZXIuYmlvZW5lcmd5LmNhc2lsLnVjZGF2aXMuZWR1OjgwODAvdml6c291cmNlL3Jlc3Q/dmlldz1wb2ludFRvU09JTChcIitsbmcrXCIsXCIrbGF0K1wiLDgxOTIpXCJcbiAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICBzb2lsVGFibGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmdldERhdGFUYWJsZSgpLnRvSlNPTigpKTtcbiAgICBjaGVja0RvbmUoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVDYWNoZVRpbGVVaUxpc3QoKSB7XG4gIGlmKCBjYWNoZWRUaWxlcy5sZW5ndGggPT0gMCApIHtcbiAgICAkKCcjc2VsZWN0LWxvY2F0aW9uLW9mZmxpbmUtbm9uZScpLnNob3coKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgbGlzdEVsZSA9ICQoJyNzZWxlY3QtbG9jYXRpb24tb2ZmbGluZS1saXN0JykuaHRtbCgnPGRpdj5TZWxlY3QgQ2FjaGVkIFRpbGU8L2Rpdj4nKSwgZWxlO1xuICAkKCcjc2VsZWN0LWxvY2F0aW9uLW9mZmxpbmUtbm9uZScpO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNhY2hlZFRpbGVzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBqc29uID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGNhY2hlZFRpbGVQcmVmaXgrY2FjaGVkVGlsZXNbaV0pO1xuICAgIGpzb24gPSBKU09OLnBhcnNlKGpzb24pO1xuXG4gICAgZWxlID0gJCgnPGRpdj48YSBjYWNoZWlkPVwiJytpKydcIiBzdHlsZT1cImN1cnNvcjpwb2ludGVyXCI+JytjYWNoZWRUaWxlc1tpXSsnOiAnK2pzb24ubmFtZSsnPC9hPjwvZGl2PicpO1xuICAgIGVsZS5maW5kKCdhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBfcnVuQ2FjaGVkVGlsZShwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2NhY2hlaWQnKSkpO1xuICAgIH0pO1xuICAgIGxpc3RFbGUuYXBwZW5kKGVsZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBfcnVuQ2FjaGVkVGlsZShpbmRleCkge1xuICB2YXIganNvbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShjYWNoZWRUaWxlUHJlZml4K2NhY2hlZFRpbGVzW2luZGV4XSk7XG4gIGpzb24gPSBKU09OLnBhcnNlKGpzb24pO1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwganNvbi53ZWF0aGVyLnJvd3MubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIG0gPSBpKycnO1xuICAgIGZvciggdmFyIGogPSAxOyBqIDwganNvbi53ZWF0aGVyLmNvbHMubGVuZ3RoOyBqKysgKSB7XG4gICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIrY29sc1tqXStcIi1cIitpKS52YWwoanNvbi53ZWF0aGVyLnJvd3NbaV0uY1tqXSA/IGpzb24ud2VhdGhlci5yb3dzW2ldLmNbal0udiA6IFwiXCIpO1xuICAgIH1cbiAgfVxuXG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBqc29uLnNvaWwuY29scy5sZW5ndGg7IGkrKyApIHtcbiAgICBpZigganNvbi5zb2lsLnJvd3NbMF0gPT0gbnVsbCApIGNvbnRpbnVlO1xuICAgICQoXCIjaW5wdXQtc29pbC1cIitqc29uLnNvaWwuY29sc1tpXS5pZCkudmFsKGpzb24uc29pbC5yb3dzWzBdLmNbaV0udik7XG4gIH1cblxuICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIGFwcC5ydW5Nb2RlbCgpO1xuICB9LCA1MDApO1xufVxuXG5mdW5jdGlvbiBfbG9hZENhY2hlZFRpbGVzKCkge1xuICBjYWNoZWRUaWxlcyA9IFtdO1xuICBmb3IoIHZhciBrZXkgaW4gd2luZG93LmxvY2FsU3RvcmFnZSApIHtcbiAgICBpZigga2V5LmluZGV4T2YoY2FjaGVkVGlsZVByZWZpeCkgPiAtMSApIHtcbiAgICAgIGNhY2hlZFRpbGVzLnB1c2goa2V5LnJlcGxhY2UoY2FjaGVkVGlsZVByZWZpeCwnJykpO1xuICAgIH1cbiAgfVxuICBjYWNoZWRUaWxlc0xvYWRlZCA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVOYXZNZW51KCkge1xuICB2YXIgYnRuID0gJCgnPGxpIGNsYXNzPVwiZHJvcGRvd25cIj4nXG4gICAgICArICc8YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZVwiPk9GRkxJTkUgTU9ERTxiIGNsYXNzPVwiY2FyZXRcIj48L2I+PC9hPidcbiAgICAgICsgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJoZWxwXCI+PGkgY2xhc3M9XCJpY29uLXF1ZXN0aW9uLXNpZ25cIj48L2k+IEhlbHA8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJhYm91dFwiPjxpIGNsYXNzPVwiaWNvbi1pbmZvLXNpZ25cIj48L2k+IEFib3V0PC9hPjwvbGk+J1xuICAgICAgKyAnPC91bD48L2xpPicpO1xuXG4gIC8vIHNldCBjbGljayBoYW5kbGVycyBmb3IgcG9wdXBcbiAgYnRuLmZpbmQoJ2EuZHJvcGRvd24tdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gIH0pO1xuXG4gIC8vIGFib3V0IGNsaWNrIGhhbmRsZXJcbiAgYnRuLmZpbmQoJyNhYm91dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICQoXCIjYWJvdXQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgYnRuLmZpbmQoJyNoZWxwJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgc2hvd0hlbHAoKTtcbiAgfSk7XG5cbiAgLy8gYWRkIG1lbnVcbiAgJChcIiNsb2dpbi1oZWFkZXJcIikuaHRtbChcIlwiKS5hcHBlbmQoYnRuKTtcbn07XG5cbmZ1bmN0aW9uIF9sb2FkRnJvbUNhY2hlKCkge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnY2FjaGUvanNhcGknLFxuICAgICAgICBkYXRhVHlwZTogXCJzY3JpcHRcIixcbiAgICAgICAgY2FjaGUgOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xuICAgICAgICAgICQoJ2hlYWQnKS5hcHBlbmQoICQoJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiAvPicpLmF0dHIoJ2hyZWYnLCAnY2FjaGUvY2hhcnQuY3NzJykgKTtcbiAgICAgICAgICAkKCdoZWFkJykuYXBwZW5kKCAkKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgLz4nKS5hdHRyKCdocmVmJywgJ2NhY2hlL2Fubm90YXRlZHRpbWVsaW5lLmNzcycpICk7XG4gICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogJ2NhY2hlL2NoYXJ0LmpzJyxcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcInNjcmlwdFwiLFxuICAgICAgICAgICAgY2FjaGUgOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgY2hhcnRzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaWYoIGNoYXJ0c0NhbGxiYWNrICkgY2hhcnRzQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0IDogaW5pdCxcbiAgcmVuZGVyIDogcmVuZGVyLFxuICBjYWNoZVRpbGUgOiBjYWNoZVRpbGUsXG4gIHJlbmRlckNhY2hlZFRpbGVzT25NYXAgOiByZW5kZXJDYWNoZWRUaWxlc09uTWFwLFxuICBjbGVhckNhY2hlIDogY2xlYXJDYWNoZVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBWUEQgOiB7XG4gICAgICBsYWJlbCA6IFwiTWVhbiBWYXBvciBQcmVzc3VyZSBEZWZpY2l0XCIsXG4gICAgICB1bml0cyA6IFwia1BBXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwidGhlIGRpZmZlcmVuY2UgKGRlZmljaXQpIGJldHdlZW4gdGhlIGFtb3VudCBvZiBtb2lzdHVyZSBpbiB0aGUgYWlyIGFuZCBob3cgbXVjaCBcIiArXG4gICAgICBcdFx0XCJtb2lzdHVyZSB0aGUgYWlyIGNhbiBob2xkIHdoZW4gaXQgaXMgc2F0dXJhdGVkXCJcbiAgfSxcbiAgZlZQRCA6IHtcbiAgICAgIGxhYmVsIDogXCJWYXBvciBQcmVzc3VyZSBEZWZpY2l0IE1vZGlmaWVyXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBIGVudmlyb25tZW50YWwgZmFjdG9yIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIGZUIDoge1xuICAgICAgbGFiZWwgOiBcIlRlbXBlcmF0dXJlIE1vZGlmaWVyXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBIGVudmlyb25tZW50YWwgZmFjdG9yIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIGZGcm9zdCA6IHtcbiAgICAgIGxhYmVsIDogXCJGcm9zdCBNb2RpZmllclwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiTnVtYmVyIG9mIGZyb3N0IGRheXMgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgUEFSIDoge1xuICAgICAgbGFiZWwgOiBcIk1vbnRobHkgUGhvdG9zeW50aGV0aWNhbGx5IEFjdGl2ZSBSYWRpYXRpb25cIixcbiAgICAgIHVuaXRzIDogXCJtb2xzIC8gbV4yIG1vbnRoXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiRGVzaWduYXRlcyB0aGUgc3BlY3RyYWwgcmFuZ2UgKHdhdmUgYmFuZCkgb2Ygc29sYXIgcmFkaWF0aW9uIGZyb20gNDAwIHRvIDcwMCBuYW5vbWV0ZXJzIFwiICtcbiAgICAgIFx0XHRcInRoYXQgcGhvdG9zeW50aGV0aWMgb3JnYW5pc21zIGFyZSBhYmxlIHRvIHVzZSBpbiB0aGUgcHJvY2VzcyBvZiBwaG90b3N5bnRoZXNpc1wiXG4gIH0sXG4gIHhQUCA6IHtcbiAgICAgIGxhYmVsIDogXCJNYXhpbXVtIFBvdGVudGlhbCBQcmltYXJ5IFByb2R1Y3Rpb25cIixcbiAgICAgIHVuaXRzIDogXCJNZXRyaWMgVG9ucyBEcnkgTWF0dGVyL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgSW50Y3B0biA6IHtcbiAgICAgIGxhYmVsIDogXCJDYW5vcHkgUmFpbmZhbGwgSW50ZXJjZXB0aW9uXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiUHJlY2lwaXRhdGlvbiB0aGF0IGRvZXMgbm90IHJlYWNoIHRoZSBzb2lsLCBidXQgaXMgaW5zdGVhZCBpbnRlcmNlcHRlZCBieSB0aGUgbGVhdmVzIGFuZCBicmFuY2hlcyBvZiBwbGFudHMgYW5kIHRoZSBmb3Jlc3QgZmxvb3IuXCJcbiAgfSxcbiAgQVNXIDoge1xuICAgICAgbGFiZWwgOiBcIkF2YWlsYWJsZSBTb2lsIFdhdGVyXCIsXG4gICAgICB1bml0cyA6IFwibW1cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBDdW1JcnJpZyA6IHtcbiAgICAgIGxhYmVsIDogXCJDdW11bGF0aXZlIFJlcXVpcmVkIElycmlnYXRpb25cIixcbiAgICAgIHVuaXRzIDogXCJtbS9tb25cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBJcnJpZyA6IHtcbiAgICAgIGxhYmVsIDogXCJSZXF1aXJlZCBJcnJpZ2F0aW9uXCIsXG4gICAgICB1bml0cyA6IFwibW0vbW9uXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgU3RhbmRBZ2UgOiB7XG4gICAgICBsYWJlbCA6IFwiU3RhbmQgQWdlXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgTEFJIDoge1xuICAgICAgbGFiZWwgOiBcIkxlYWYgQXJlYSBJbmRleFwiLFxuICAgICAgdW5pdHMgOiBcIm0yIC8gbTJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJUaGUgb25lLXNpZGVkIGdyZWVuIGxlYWYgYXJlYSBwZXIgdW5pdCBncm91bmQgc3VyZmFjZSBhcmVhXCJcbiAgfSxcbiAgQ2FuQ29uZCA6IHtcbiAgICAgIGxhYmVsIDogXCJDYW5vcHkgQ29uZHVjdGFuY2VcIixcbiAgICAgIHVuaXRzIDogXCJnYyxtL3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBUcmFuc3AgOiB7XG4gICAgICBsYWJlbCA6IFwiQ2Fub3B5IE1vbnRobHkgVHJhbnNwaXJhdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIm1tL21vblwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIldhdGVyIG1vdmVtZW50IHRocm91Z2ggYSBwbGFudCBhbmQgaXRzIGV2YXBvcmF0aW9uIGZyb20gYWVyaWFsIHBhcnRzXCJcbiAgfSxcbiAgZlNXIDoge1xuICAgICAgbGFiZWwgOiBcIlNvaWwgV2F0ZXIgTW9kaWZpZXJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkEgZW52aXJvbm1lbnRhbCBmYWN0b3IgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgZkFnZSA6IHtcbiAgICAgIGxhYmVsIDogXCJTdGFuZCBhZ2VcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkEgZW52aXJvbm1lbnRhbCBmYWN0b3IgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgUGh5c01vZCA6IHtcbiAgICAgIGxhYmVsIDogXCJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlBoeXNpb2xvZ2ljYWwgTW9kaWZpZXIgdG8gQ2Fub3B5IENvbmR1Y3RhbmNlXCJcbiAgfSxcbiAgcFIgOiB7XG4gICAgICBsYWJlbCA6IFwiXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQWxvbmcgd2l0aCBhIFBoeXNpb2xvZ2lhbCBwYXJhbWV0ZXIsIHNwZWNpZmllcyB0aGUgYW1vdW50IG9mIG5ldyBncm93dGggYWxsb2NhdGVkIHRvIHRoZSByb290IHN5c3RlbSwgYW5kIHRoZSB0dXJub3ZlciByYXRlLlwiXG4gIH0sXG4gIHBTIDoge1xuICAgICAgbGFiZWwgOiBcIlwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkRlZmluZXMgdGhlIGZvbGlhZ2UgdG8gc3RlbSAoV0YvV1MpIGZyYWN0aW9uIGluIGFsbG9jYXRpbmcgYWJvdmVncm91bmQgYmlvbWFzcyBvZiB0aGUgdHJlZVwiXG4gIH0sXG4gIGxpdHRlcmZhbGwgOiB7XG4gICAgICBsYWJlbCA6IFwiXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcml0aW9uIDogXCJcIixcbiAgICAgIGFsdEZuTmFtZSA6IFwidGRwXCJcbiAgfSxcbiAgTlBQIDoge1xuICAgICAgbGFiZWwgOiBcIk5ldCBDYW5vcHkgUHJvZHVjdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgV0YgOiB7XG4gICAgICBsYWJlbCA6IFwiTGVhZiBCaW9tYXNzXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIixcbiAgICAgIGZuIDogZnVuY3Rpb24ocHJlX1dGLCBjdXJfZFcsIGN1cl9wRiwgY3VyX2xpdHRlcmZhbGwsIHByZXZfV0YpIHtcbiAgICAgICAgICByZXR1cm4gcHJldl9XRiArIGN1cl9kVyAqIGN1cl9wRiAtIGN1cl9saXR0ZXJmYWxsICogcHJldl9XRlxuICAgICAgfVxuICB9LFxuICBXUiA6IHtcbiAgICAgIGxhYmVsIDogXCJSb290IEJpb21hc3NcIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiLFxuICAgICAgZm4gOiBmdW5jdGlvbihwcmV2X1dSLCBjdXJfZFcsIGN1cl9wUiwgdHVybm92ZXIsIHByZXZfV1IsIGN1cl9Sb290UCkge1xuICAgICAgICAgIHJldHVybiBwcmV2X1dSICsgY3VyX2RXICogY3VyX3BSIC0gdHJlZS5wUi50dXJub3ZlciAqIHByZXZfV1IgLSBjdXJfUm9vdFA7XG4gICAgICB9XG4gIH0sXG4gIFdTIDoge1xuICAgICAgbGFiZWwgOiBcIlN0ZW0gQmlvbWFzc1wiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXG4gICAgICBmbiA6IGZ1bmN0aW9uKHByZXZfV1MsIGN1cl9kVywgY3VyX3BTKSB7IHJldHVybiBwcmV2X1dTICsgY3VyX2RXICogY3VyX3BTIH1cbiAgfSxcbiAgVyA6IHtcbiAgICAgIGxhYmVsIDogXCJUb3RhbCBCaW9tYXNzXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIixcbiAgICAgIGZuIDogZnVuY3Rpb24oY3VyX1dGLCBjdXJfV1IsIGN1cl9XUykgeyByZXR1cm4gY3VyX1dGK2N1cl9XUitjdXJfV1MgfVxuICB9XG59XG4iLCJ2YXIgYXBwID0gcmVxdWlyZSgnLi9hcHAnKTtcblxuLy8gYWRkIHNwcmVhZHNoZWV0IHZpeiBzb3VyY2Vcbi8vIGh0dHBzOi8vc3ByZWFkc2hlZXRzLmdvb2dsZS5jb20vdHE/dHE9c2VsZWN0JTIwKiZrZXk9MEF2N2NVVi1vMlFRWWRIWkZZV0pOTldwUlMxaElWV2hHUVRobExXWndaV2MmdXNwPWRyaXZlX3dlYiNnaWQ9MFxuXG5mdW5jdGlvbiBpbml0KCkge1xudmFyIGRyb3Bab25lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Ryb3Bfem9uZScpO1xuZHJvcFpvbmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBfaGFuZGxlRHJhZ092ZXIsIGZhbHNlKTtcbmRyb3Bab25lLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBfaGFuZGxlRmlsZVNlbGVjdCwgZmFsc2UpO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZXMnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBfaGFuZGxlRmlsZVNlbGVjdCwgZmFsc2UpO1xuXG4gICAgJCgnI3NwcmVhZHNoZWV0LXdlYXRoZXItaW5wdXQtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgX2hhbmRsZUdvb2dsZVNwcmVhZHNoZWV0KCk7XG4gICAgfSk7XG4gICAgJCgnI3NwcmVhZHNoZWV0LXdlYXRoZXItaW5wdXQnKS5vbigna2V5dXAnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaWYoIGUud2hpY2ggPT0gMTMgKSBfaGFuZGxlR29vZ2xlU3ByZWFkc2hlZXQoKTtcbiAgICB9KTtcblxuICAgICQoJyN3ZWF0aGVyUmVhZGVyLWxvY2FsZmlsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJyN3ZWF0aGVyUmVhZGVyLWxvY2FsZmlsZS1wYW5lbCcpLnRvZ2dsZSgnc2xvdycpO1xuICAgIH0pO1xuICAgICQoJyN3ZWF0aGVyUmVhZGVyLXNwcmVhZHNoZWV0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnI3dlYXRoZXJSZWFkZXItc3ByZWFkc2hlZXQtcGFuZWwnKS50b2dnbGUoJ3Nsb3cnKTtcbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBfaGFuZGxlR29vZ2xlU3ByZWFkc2hlZXQoKSB7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbG9hZC13ZWF0aGVyLWRyaXZlLWZpbGUnLCAxKTtcblxuICAgIHZhciB2YWwgPSAkKCcjc3ByZWFkc2hlZXQtd2VhdGhlci1pbnB1dCcpLnZhbCgpO1xuICAgIGlmKCB2YWwubGVuZ3RoID09IDAgKSByZXR1cm47XG5cbiAgICBpZiggIXZhbC5tYXRjaCgvXmh0dHAuKi8gKSApIHZhbCA9ICdodHRwczovLycrdmFsO1xuXG4gICAgdmFyIGZpbGVQYW5lbCA9IG5ldyBXZWF0aGVyRmlsZSgpO1xuICAgIHZhciByb290ID0gJChcIiNmaWxlX2xpc3RcIik7XG4gICAgZmlsZVBhbmVsLmluaXRGcm9tVXJsKHZhbCwgcm9vdCk7XG4gICAgJCgnI3NwcmVhZHNoZWV0LXdlYXRoZXItaW5wdXQnKS52YWwoJycpO1xufVxuXG5mdW5jdGlvbiBfaGFuZGxlRmlsZVNlbGVjdChldnQpIHtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLXdlYXRoZXItbG9jYWwtZmlsZScsIDEpO1xuXG4gIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgdmFyIGZpbGVzID0gZXZ0LmRhdGFUcmFuc2ZlciA/IGV2dC5kYXRhVHJhbnNmZXIuZmlsZXMgOiBldnQudGFyZ2V0LmZpbGVzOyAvLyBGaWxlTGlzdCBvYmplY3QuXG5cbiAgLy8gZmlsZXMgaXMgYSBGaWxlTGlzdCBvZiBGaWxlIG9iamVjdHMuIExpc3Qgc29tZSBwcm9wZXJ0aWVzLlxuICB2YXIgcm9vdCA9ICQoXCIjZmlsZV9saXN0XCIpO1xuICBmb3IgKHZhciBpID0gMCwgZjsgZiA9IGZpbGVzW2ldOyBpKyspIHtcbiAgICB2YXIgZmlsZVBhbmVsID0gbmV3IFdlYXRoZXJGaWxlKCk7XG4gICAgZmlsZVBhbmVsLmluaXQoZiwgcm9vdCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2hhbmRsZURyYWdPdmVyKGV2dCkge1xuZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5ldnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSc7IC8vIEV4cGxpY2l0bHkgc2hvdyB0aGlzIGlzIGEgY29weS5cbn1cblxuLy8gb24gYWRkLCBpZiB0aGUgbGlzdCBpcyBlbXB0eSwgbGV0J3MgY2xvc2UgdGhlIHBvcHVwXG5mdW5jdGlvbiBfb25Db21wbGV0ZSgpIHtcbiAgICBpZiggJChcIiNmaWxlX2xpc3RcIikuY2hpbGRyZW4oKS5sZW5ndGggPT0gMCApIHtcbiAgICAgICAgJCgnI3dlYXRoZXJSZWFkZXItbW9kYWwnKS5tb2RhbCgnaGlkZScpO1xuICAgIH1cbn1cblxudmFyIFdlYXRoZXJGaWxlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBoZWFkZXJzID0ge1xuICAgICAgICBkYXRlICAgICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ0RhdGUnLFxuICAgICAgICAgICAgdW5pdHMgOiAnRGF0ZScsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHRtaW4gICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnTWluIFRlbXBlcmF0dXJlJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ0MnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICB0bWF4ICAgICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ01heCBUZW1wZXJhdHVyZScsXG4gICAgICAgICAgICB1bml0cyA6ICdDJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgdGRtZWFuICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdNZWFuIFRlbXBlcmF0dXJlJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ0MnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICBwcHQgICAgICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ1ByZWNpcGl0aW9uJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ21tJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgcmFkICAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdSYWRpYXRpb24nLFxuICAgICAgICAgICAgdW5pdHMgOiAnTUogbS0yIGRheS0xJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgZGF5bGlnaHQgOiB7XG4gICAgICAgICAgICBsYW5lbCA6ICdEYXlsaWdodCBIb3VycycsXG4gICAgICAgICAgICB1bml0cyA6ICdob3VycycsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgdmFyIGVsZSA9ICQoJzxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOiBsZWZ0XCI+JytcbiAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvYnV0dG9uPicrXG4gICAgICAnPGRpdiBjbGFzcz1cImZpbGVuYW1lXCI+PC9kaXY+JytcbiAgICAgICc8ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIj4nK1xuICAgICAgJzxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXJcIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBhcmlhLXZhbHVlbm93PVwiMFwiIGFyaWEtdmFsdWVtaW49XCIwXCIgYXJpYS12YWx1ZW1heD1cIjEwMFwiIHN0eWxlPVwid2lkdGg6IDAlO1wiPicrXG4gICAgICAgICc8c3BhbiBjbGFzcz1cInNyLW9ubHlcIj4wJSBDb21wbGV0ZTwvc3Bhbj4nK1xuICAgICAgJzwvZGl2PicrXG4gICAgJzwvZGl2PicrXG4gICAgICAnPGRpdiBjbGFzcz1cInN0YXR1c1wiPicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJkYXRlLXJhbmdlXCI+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInByZXZpZXctZGF0YVwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+JytcbiAgICAgICAgICAgICAgICAgICAgJzxkaXY+PGEgY2xhc3M9XCJidG4gYnRuLWxpbmsgcHJldmlldy1kYXRhLWJ0blwiPlByZXZpZXcgRGF0YTwvYT48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInByZXZpZXctZGF0YS10YWJsZVwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNvbC1zdGF0dXNcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCJoZWlnaHQ6NTBweFwiPicrXG4gICAgICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImJ0biBidG4tbGluayBtYXAtZGF0YS1idG5cIj5NYXAgQ1NWIENvbHVtbnM8L2E+JytcbiAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGRpc2FibGVkIHB1bGwtcmlnaHRcIj5BZGQgRGF0YTwvYT4nK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgJzwvZGl2PicpO1xuXG4gIHZhciBkYXRhID0ge307XG4gICAgdmFyIGNzdlRhYmxlID0gW107XG5cbiAgICAvLyBvbmx5IGF1dG8gaGlkZSB0aGUgZmlyc3QgdGltZVxuICAgIHZhciBhdXRvSGlkZSA9IHRydWU7XG5cbiAgLy8gdGhlIGZpbGUgcmVhZGVyIG9iamVjdCBhbmQgdGhlIGVsZW1lbnRcbiAgZnVuY3Rpb24gaW5pdChmaWxlLCByb290RWxlKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9uZXJyb3IgPSBlcnJvckhhbmRsZXI7XG4gICAgcmVhZGVyLm9ucHJvZ3Jlc3MgPSB1cGRhdGVQcm9ncmVzcztcbiAgICByZWFkZXIub25sb2Fkc3RhcnQgPSBmdW5jdGlvbihlKSB7fTtcbiAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZSkge1xuICAgICAgZWxlLmZpbmQoJy5wcm9ncmVzcycpLnJlbW92ZSgpO1xuICAgICAgcGFyc2UoZS50YXJnZXQucmVzdWx0KTtcbiAgICB9XG4gICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZSlcblxuICAgIGVsZS5maW5kKCcuZmlsZW5hbWUnKS5odG1sKGdldE5hbWUoZmlsZSkpO1xuICAgIHJvb3RFbGUuYXBwZW5kKGVsZSk7XG5cbiAgICAgICAgX3NldEhhbmRsZXJzKCk7XG4gIH1cblxuICAgIGZ1bmN0aW9uIGluaXRGcm9tVXJsKHVybCwgcm9vdEVsZSkge1xuICAgICAgICB2YXIgcSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5RdWVyeSh1cmwpO1xuICAgICAgICBlbGUuZmluZCgnLnByb2dyZXNzJykuaHRtbCgnUXVlcnlpbmcgc3ByZWFkc2hlZXQuLi4nKTtcblxuICAgICAgICB2YXIga2V5ID0gZ2V0S2V5KHVybCk7XG4gICAgICAgIGVsZS5maW5kKCcuZmlsZW5hbWUnKS5odG1sKCc8aDMgc3R5bGU9XCJib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZWVlO3BhZGRpbmc6MTVweCAwIDRweCAwXCI+PGkgY2xhc3M9XCJpY29uLXRpbnRcIj48L2k+ICcrXG4gICAgICAgICAgICAnR29vZ2xlIFNwcmVhZHNoZWV0Jysoa2V5Lmxlbmd0aCA+IDAgPyAnPGJyIC8+PHNwYW4gc3R5bGU9XCJjb2xvcjojODg4O2ZvbnQtc2l6ZToxNHB4XCI+JytrZXkrJzwvc3Bhbj4nIDogJycpKyc8L2gzPicpO1xuXG4gICAgICAgIHJvb3RFbGUuYXBwZW5kKGVsZSk7XG5cbiAgICAgICAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgICAgICAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICAgIGVsZS5maW5kKCcucHJvZ3Jlc3MnKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmlzRXJyb3IoKSkge1xuICAgICAgICAgICAgICAgIHNldEVycm9yKCdFcnJvciBpbiBxdWVyeTogJyArIHJlc3BvbnNlLmdldE1lc3NhZ2UoKSArICcgJyArIHJlc3BvbnNlLmdldERldGFpbGVkTWVzc2FnZSgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBhcnNlKGR0VG9Dc3YocmVzcG9uc2UuZ2V0RGF0YVRhYmxlKCkpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgX3NldEhhbmRsZXJzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3NldEhhbmRsZXJzKCkge1xuICAgICAgICBlbGUuZmluZCgnLm1hcC1kYXRhLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBlbGUuZmluZCgnLmNvbC1zdGF0dXMnKS50b2dnbGUoJ3Nsb3cnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhLXRhYmxlJykudG9nZ2xlKCdzbG93Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsZS5maW5kKCcuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZWxlLnJlbW92ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlbGUuZmluZCgnLmJ0bi1zdWNjZXNzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGFwcC5zZXRXZWF0aGVyKGRhdGEpO1xuICAgICAgICAgICAgZWxlLnJlbW92ZSgpO1xuICAgICAgICAgICAgX29uQ29tcGxldGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHRUb0NzdihkdCkge1xuICAgICAgICB2YXIgYXJyID0gW1tdXTtcblxuICAgICAgICBkdCA9IEpTT04ucGFyc2UoZHQudG9KU09OKCkpO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGR0LmNvbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBhcnJbMF0ucHVzaChkdC5jb2xzW2ldLmxhYmVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZHQucm93cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGFyci5wdXNoKFtdKTtcbiAgICAgICAgICAgIGZvciggdmFyIGogPSAwOyBqIDwgZHQucm93c1tpXS5jLmxlbmd0aDsgaisrICkge1xuICAgICAgICAgICAgICAgIGlmKCAhZHQucm93c1tpXS5jW2pdICkgYXJyW2krMV0ucHVzaCgnJyk7XG4gICAgICAgICAgICAgICAgZWxzZSBhcnJbaSsxXS5wdXNoKGR0LnJvd3NbaV0uY1tqXS52KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjc3YgPSAnJztcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBjc3YgKz0gYXJyW2ldLmpvaW4oJywnKSsnXFxuJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjc3Y7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0S2V5KHVybCkge1xuICAgICAgICB2YXIgcGFydHMgPSB1cmwuc3BsaXQoJz8nKTtcbiAgICAgICAgaWYoIHBhcnRzLmxlbmd0aCA9PSAxICkgcmV0dXJuICcnO1xuXG4gICAgICAgIHBhcnRzID0gcGFydHNbMV0uc3BsaXQoJyYnKTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGlmKCBwYXJ0c1tpXS5zcGxpdCgnPScpWzBdID09ICdrZXknICkgcmV0dXJuIHBhcnRzW2ldLnNwbGl0KCc9JylbMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICBmdW5jdGlvbiBnZXROYW1lKGYpIHtcbiAgICByZXR1cm4gWyc8aDMgc3R5bGU9XCJib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZWVlO3BhZGRpbmc6MTVweCAwIDRweCAwXCI+PGkgY2xhc3M9XCJpY29uLXRpbnRcIj48L2k+ICcsIGYubmFtZSxcbiAgICAgICAgICAgICAgICAnIDxzcGFuIHN0eWxlPVwiY29sb3I6Izg4ODtmb250LXNpemU6MTZweFwiPignLCBmLnR5cGUgfHwgJ24vYScsXG4gICAgICAgICAgICAgICAgJyk8L3NwYW4+IC0gPHNwYW4gc3R5bGU9XCJmb250LXNpemU6MTZweFwiPicsIGYuc2l6ZSwgJyBieXRlczwvc3Bhbj4nLCAnPC9oMz4nXS5qb2luKCcnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlKGRhdGEpIHtcbiAgICBkYXRhID0gZGF0YS5yZXBsYWNlKC9eXFxzKlxcbi9nLCcnKS5zcGxpdCgnXFxuJyk7XG5cbiAgICB2YXIgdGFibGUgPSBbXTtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKysgKSB7XG4gICAgICB0YWJsZS5wdXNoKGRhdGFbaV0uc3BsaXQoJywnKSk7XG4gICAgfVxuXG4gICAgICAgIGlmKCB0YWJsZS5sZW5ndGggPT0gMCApIHJldHVybiBzZXRFcnJvcignRmlsZSBkaWQgbm90IGNvbnRhaW4gYW55IGluZm9ybWF0aW9uLicpO1xuICAgICAgICBjc3ZUYWJsZSA9IHRhYmxlO1xuXG4gICAgICAgIHBhcnNlSGVhZGVyKHRhYmxlWzBdKTtcbiAgICAgICAgZ2V0RGF0ZVJhbmdlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGF0ZVJhbmdlKCkge1xuICAgICAgICBlbGUuZmluZCgnLmRhdGUtcmFuZ2UnKS5odG1sKCcnKTtcbiAgICAgICAgaWYoIGhlYWRlcnMuZGF0ZS5jb2wgPT0gLTEgKSByZXR1cm4gZWxlLmZpbmQoJy5kYXRlLXJhbmdlJykuaHRtbCgnRGF0ZSBjb2x1bW4gbmVlZHMgdG8gYmUgbWF0Y2hlZC4nKTtcbiAgICAgICAgaWYoIHR5cGVvZiBoZWFkZXJzLmRhdGUuY29sID09ICdzdHJpbmcnICkgaGVhZGVycy5kYXRlLmNvbCA9IHBhcnNlSW50KGhlYWRlcnMuZGF0ZS5jb2wpO1xuXG4gICAgICAgIHZhciBkYXRlcyA9IHt9O1xuICAgICAgICB2YXIgZGlzcGxheURhdGVzID0gW107XG4gICAgICAgIGZvciggdmFyIGkgPSAxOyBpIDwgY3N2VGFibGUubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBpZiggaGVhZGVycy5kYXRlLmNvbCA8IGNzdlRhYmxlW2ldLmxlbmd0aCAmJiBjc3ZUYWJsZVtpXS5sZW5ndGggPj0gNyApwqB7XG4gICAgICAgICAgICAgICAgdmFyIHAgPSBjc3ZUYWJsZVtpXVtoZWFkZXJzLmRhdGUuY29sXS5zcGxpdChcIi1cIik7XG4gICAgICAgICAgICAgICAgaWYoIHAubGVuZ3RoICE9IDMgJiYgcC5sZW5ndGggIT0gMiApIHJldHVybiBzZXRFcnJvcihcIkRhdGU6IFwiK2NzdlRhYmxlW2ldW2hlYWRlcnMuZGF0ZS5jb2xdK1wiIGlzIG5vdCBhIHZhbGlkIGZvcm1hdCAoeXl5eS1tbS1kZCBvciB5eXl5LW1tKVwiKTtcblxuICAgICAgICAgICAgICAgIGlmKCAhZGF0ZXNbcFswXV0gKSBkYXRlc1twWzBdXSA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBtbWRkID0gcFsxXTtcblxuICAgICAgICAgICAgICAgIGlmKCBkYXRlc1twWzBdXS5pbmRleE9mKG1tZGQpICE9IC0xICkgcmV0dXJuIHNldEVycm9yKFwiRGF0ZTogXCIrY3N2VGFibGVbaV1baGVhZGVycy5kYXRlLmNvbF0rXCIgaXMgaW4gZGF0YXNldCB0d2ljZVwiKTtcbiAgICAgICAgICAgICAgICBkYXRlc1twWzBdXS5wdXNoKG1tZGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKCB2YXIgeWVhciBpbiBkYXRlcyApIHtcbiAgICAgICAgICAgIGlmKCBkYXRlc1t5ZWFyXS5sZW5ndGggPT0gMTIpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0ZXMucHVzaCh5ZWFyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGVzLnB1c2goeWVhcisnIFsnK2RhdGVzW3llYXJdLmpvaW4oJywgJykrJ10nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsZS5maW5kKCcuZGF0ZS1yYW5nZScpLmh0bWwoJzxiPkRhdGUgUmFuZ2U6PC9iPiAnK2Rpc3BsYXlEYXRlcy5qb2luKCcsICcpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUhlYWRlcihoZWFkZXJSb3cpIHtcbiAgICAgICAgdmFyIG1hdGNoZWQgPSBbXTtcblxuICAgICAgICB2YXIgaHRtbCA9ICc8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkXCI+JztcbiAgICAgICAgaHRtbCArPSAnPHRyPjx0aD5LZXk8L3RoPjx0aD5Db2x1bW4gIzwvdGg+PC90cj4nO1xuXG4gICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICkge1xuICAgICAgICAgICAgaWYoIGhlYWRlclJvdy5pbmRleE9mKGtleSkgIT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyc1trZXldLmNvbCA9IGhlYWRlclJvdy5pbmRleE9mKGtleSk7XG4gICAgICAgICAgICAgICAgbWF0Y2hlZC5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZD4nK2tleSsnPC90ZD48dGQ+PHNwYW4gY2xhc3M9XCJsYWJlbCBsYWJlbC1zdWNjZXNzXCI+JytoZWFkZXJzW2tleV0uY29sKycgPGkgY2xhc3M9XCJpY29uLW9rXCI+PC9pPjwvc3Bhbj48L3RkPjwvdHI+JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZD4nK2tleSsnPC90ZD48dGQ+PHNlbGVjdCBjbGFzcz1cInNlbGVjdC0nK2tleSsnXCJcIj48L3NlbGVjdD48L3RkPjwvdHI+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbGUuZmluZCgnLmNvbC1zdGF0dXMnKS5odG1sKGh0bWwrJzwvdGFibGU+Jyk7XG5cblxuICAgICAgICBpZiggbWF0Y2hlZC5sZW5ndGggIT0gNyApIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBzZWxlY3QgZWxlbWVudCBmb3IgbWlzc2luZyBjb2wnc1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5zdGF0dXMgc2VsZWN0JykuYXBwZW5kKCQoJzxvcHRpb24gdmFsdWU9XCJcIj5bU2VsZWN0IENvbHVtbl08L29wdGlvbj4nKSk7XG5cbiAgICAgICAgICAgIC8vIGlmIGl0J3MgcmFkaWF0aW9uLCBhZGQgb3B0aW9uIGZvciBjYWxjdWxhdGluZ1xuICAgICAgICAgICAgLy8gVE9ET1xuXG4gICAgICAgICAgICAvLyBhcHBlbmQgbWlzc2luZyBjb2xzXG4gICAgICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGhlYWRlclJvdy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgICAgICBpZiggbWF0Y2hlZC5pbmRleE9mKGhlYWRlclJvd1tpXSkgPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZS5maW5kKCcuc3RhdHVzIHNlbGVjdCcpLmFwcGVuZCgkKCc8b3B0aW9uIHZhbHVlPVwiJytpKydcIj4nK2krJyAtICcraGVhZGVyUm93W2ldKyc8L29wdGlvbj4nKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIGNoYW5nZSBoYW5kbGVycyBmb3IgdGhlIHNlbGVjdG9yc1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5zdGF0dXMgc2VsZWN0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLmF0dHIoJ3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgaWYoIHZhbCAhPSAnJyApIGhlYWRlcnNbdGhpcy5jbGFzc05hbWUucmVwbGFjZSgvc2VsZWN0LS8sJycpXS5jb2wgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBhbGwgY29sdW1ucyBhcmUgc2V0LCByZW1vdmUgZGlzYWJsZWQgZnJvbSBidG5cbiAgICAgICAgICAgICAgICB2YXIgcmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggaGVhZGVyc1trZXldLmNvbCA9PSAtMSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKCByZWFkeSApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIGF1dG9IaWRlICkgZWxlLmZpbmQoJy5jb2wtc3RhdHVzJykuaGlkZSgnc2xvdycpO1xuICAgICAgICAgICAgICAgICAgICBvblJlYWR5KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBlbGUuZmluZCgnLmJ0bi1zdWNjZXNzJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBzaG93IHRoZSB0YWJsZVxuICAgICAgICAgICAgZWxlLmZpbmQoJy5jb2wtc3RhdHVzJykuc2hvdygnc2xvdycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb25SZWFkeSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZWFkeSgpIHtcbiAgICAgICAgYXV0b0hpZGUgPSBmYWxzZTtcbiAgICAgICAgZWxlLmZpbmQoJy5idG4tc3VjY2VzcycpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICBzZXREYXRhKCk7XG4gICAgICAgIHNldFByZXZpZXcoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRQcmV2aWV3KCkge1xuICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YScpLnNob3coKTtcblxuICAgICAgICB2YXIgaHRtbCA9ICc8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkXCI+PHRyPjx0aD5kYXRlPC90aD4nO1xuICAgICAgICBmb3IoIHZhciBrZXkgaW4gaGVhZGVycyApe1xuICAgICAgICAgICAgaWYoIGtleSA9PSAnZGF0ZScgKSBjb250aW51ZTtcbiAgICAgICAgICAgIGh0bWwgKz0gJzx0aD4nK2tleSsnPC90aD4nO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGMgPSAwO1xuICAgICAgICBmb3IoIHZhciBkYXRlIGluIGRhdGEgKXtcbiAgICAgICAgICAgIGlmKCBjID09IDEwICkge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0cj48dGQgY29sc3Bhbj1cIjdcIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyXCI+Li4uPC90ZD48L3RyPic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGh0bWwgKz0gJzx0cj48dGQ+JytkYXRlKyc8L3RkPic7XG4gICAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gaGVhZGVycyApe1xuICAgICAgICAgICAgICAgIGlmKCBrZXkgPT0gJ2RhdGUnICkgY29udGludWU7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRkPicrZGF0YVtkYXRlXVtrZXldKyc8L3RkPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBodG1sICs9ICc8L3RyPic7XG5cbiAgICAgICAgICAgIGMrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhLXRhYmxlJykuaHRtbChodG1sKTtcbiAgICB9XG5cbiAgLy8gc2V0IHRoZSBtYXAgb2YgY3N2IGhlYWRlcnNcbiAgZnVuY3Rpb24gc2V0RGF0YSgpIHtcbiAgICAgICAgZGF0YSA9IHt9O1xuICAgICAgICBmb3IoIHZhciBpID0gMTsgaSA8IGNzdlRhYmxlLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgaWYoIGNzdlRhYmxlW2ldLmxlbmd0aCA8IDcgKSBjb250aW51ZTsgLy8gYmFkIHJvd1xuXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IGNzdlRhYmxlW2ldW2hlYWRlcnMuZGF0ZS5jb2xdO1xuXG4gICAgICAgICAgICBpZiggIWRhdGUgKSBjb250aW51ZTsgLy8gYmFkIHJvd1xuXG4gICAgICAgICAgICBpZiggZGF0ZS5zcGxpdCgnLScpLmxlbmd0aCA9PSAzICkgZGF0ZSA9IGRhdGUuc3BsaXQoXCItXCIpLnNwbGljZSgwLDIpLmpvaW4oXCItXCIpO1xuICAgICAgICAgICAgZGF0YVtkYXRlXSA9IHt9O1xuXG4gICAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gaGVhZGVycyApIHtcbiAgICAgICAgICAgICAgICBpZigga2V5ID09ICdkYXRlJyApIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgZGF0YVtkYXRlXVtrZXldID0gcGFyc2VGbG9hdChjc3ZUYWJsZVtpXVtoZWFkZXJzW2tleV0uY29sXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVByb2dyZXNzKGV2dCkge1xuICAgIC8vIGV2dCBpcyBhbiBQcm9ncmVzc0V2ZW50LlxuICAgIGlmIChldnQubGVuZ3RoQ29tcHV0YWJsZSkge1xuICAgICAgICB2YXIgcGVyY2VudExvYWRlZCA9IE1hdGgucm91bmQoKGV2dC5sb2FkZWQgLyBldnQudG90YWwpICogMTAwKTtcbiAgICAgICAgZWxlLmZpbmQoJy5wcm9ncmVzcy1iYXInKS5hdHRyKCdhcmlhLXZhbHVlbm93JyxwZXJjZW50TG9hZGVkKS53aWR0aChwZXJjZW50TG9hZGVkK1wiJVwiKTtcbiAgICAgICAgZWxlLmZpbmQoJy5zci1vbmx5JykuaHRtbChNYXRoLmNlaWwocGVyY2VudExvYWRlZCkrJyUgQ29tcGxldGUnKTtcbiAgICB9XG59XG5cbiAgZnVuY3Rpb24gZXJyb3JIYW5kbGVyKGV2dCkge1xuICAgIHN3aXRjaChldnQudGFyZ2V0LmVycm9yLmNvZGUpIHtcbiAgICAgIGNhc2UgZXZ0LnRhcmdldC5lcnJvci5OT1RfRk9VTkRfRVJSOlxuICAgICAgICBzZXRFcnJvcignRmlsZSBOb3QgRm91bmQhJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBldnQudGFyZ2V0LmVycm9yLk5PVF9SRUFEQUJMRV9FUlI6XG4gICAgICAgIHNldEVycm9yKCdGaWxlIGlzIG5vdCByZWFkYWJsZScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZXZ0LnRhcmdldC5lcnJvci5BQk9SVF9FUlI6XG4gICAgICAgIGJyZWFrOyAvLyBub29wXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzZXRFcnJvcignQW4gZXJyb3Igb2NjdXJyZWQgcmVhZGluZyB0aGlzIGZpbGUuJyk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEVycm9yKG1zZykge1xuICAgICAgZWxlLmZpbmQoJy5zdGF0dXMnKS5odG1sKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCI+Jyttc2crJzwvZGl2PicpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0IDogaW5pdCxcbiAgICBpbml0RnJvbVVybCA6IGluaXRGcm9tVXJsXG4gIH07XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0IDogaW5pdFxufTtcbiIsInZhciBpbyA9IHJlcXVpcmUoJy4vbGliL2lvJyk7XG52YXIgcnVuID0gcmVxdWlyZSgnLi9saWIvcnVuJykoaW8pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gcnVuO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiVGhlc2UgYXJlIGNvbnN0YW50cy5cIixcbiAgICB2YWx1ZToge1xuICAgICAgICBkYXlzX3Blcl9tb250aDoge1xuICAgICAgICAgICAgdmFsdWU6IDMwLjQsXG4gICAgICAgICAgICB1bml0czogXCJkYXlzL21vXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOdW1iZXIgb2YgRGF5cyBpbiBhbiBhdmVyYWdlIG1vbnRoXCJcbiAgICAgICAgfSxcbiAgICAgICAgZTIwOiB7XG4gICAgICAgICAgICB2YWx1ZTogMi4yLFxuICAgICAgICAgICAgdW5pdHM6IFwidnAvdFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmF0ZSBvZiBjaGFuZ2Ugb2Ygc2F0dXJhdGVkIFZQIHdpdGggVCBhdCAyMENcIlxuICAgICAgICB9LFxuICAgICAgICByaG9BaXI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAxLjIsXG4gICAgICAgICAgICB1bml0czogXCJrZy9tXjNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlbnNpdHkgb2YgYWlyXCJcbiAgICAgICAgfSxcbiAgICAgICAgbGFtYmRhOiB7XG4gICAgICAgICAgICB2YWx1ZTogMjQ2MDAwMCxcbiAgICAgICAgICAgIHVuaXRzOiBcIkova2dcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxhdGVudCBoZWF0IG9mIHZhcG91cmlzYXRpb24gb2YgaDJvXCJcbiAgICAgICAgfSxcbiAgICAgICAgVlBEY29udjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuMDAwNjIyLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb252ZXJ0IFZQRCB0byBzYXR1cmF0aW9uIGRlZmljaXQgPSAxOC8yOS8xMDAwXCJcbiAgICAgICAgfSxcbiAgICAgICAgUWE6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtOTAsXG4gICAgICAgICAgICB1bml0czogXCJXL21eMlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW50ZXJjZXB0IG9mIG5ldCByYWRpYXRpb24gdmVyc3VzIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXBcIlxuICAgICAgICB9LFxuICAgICAgICBRYjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuOCxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzbG9wZSBvZiBuZXQgdnMuIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXBcIlxuICAgICAgICB9LFxuICAgICAgICBnRE1fbW9sOiB7XG4gICAgICAgICAgICB2YWx1ZTogMjQsXG4gICAgICAgICAgICB1bml0czogXCJnL21vbChDKVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTW9sZWN1bGFyIHdlaWdodCBvZiBkcnkgbWF0dGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgbW9sUEFSX01KOiB7XG4gICAgICAgICAgICB2YWx1ZTogMi4zLFxuICAgICAgICAgICAgdW5pdHM6IFwibW9sKEMpL01KXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb252ZXJzaW9uIG9mIHNvbGFyIHJhZGlhdGlvbiB0byBQQVJcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICB0cmVlIDogcmVxdWlyZSgnLi90cmVlJyksXG4gIHBsYW50YXRpb24gOiByZXF1aXJlKCcuL3BsYW50YXRpb24nKSxcbiAgcGxhbnRhdGlvbl9zdGF0ZSA6IHJlcXVpcmUoJy4vcGxhbnRhdGlvbl9zdGF0ZScpLFxuICBzb2lsIDogcmVxdWlyZSgnLi9zb2lsJyksXG4gIHdlYXRoZXIgOiByZXF1aXJlKCcuL3dlYXRoZXInKSxcbiAgbWFuYWdlIDogcmVxdWlyZSgnLi9tYW5hZ2UnKSxcbiAgY29uc3RhdHMgOiByZXF1aXJlKCcuL2NvbnN0YW50cycpXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGRlc2NyaXB0aW9uIDogXCJDcm9wIE1hbmFnZW1lbnQgUGFyYW1ldGVyc1wiLFxuICB2YWx1ZSA6IHtcbiAgICBpcnJpZ0ZyYWMgOiB7XG4gICAgICB2YWx1ZSA6IDEsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiSXJyaWdhdGlvbiBmcmFjdGlvbjogMSA9IGZ1bGx5IGlycmlnYXRlZCwgMCA9IG5vIGlycmlnYXRpb24uIEFueSB2YWx1ZXMgYmV0d2VlbiAwIGFuZCAxIGFyZSBhY2NlcHRhYmxlXCJcbiAgICB9LFxuICAgIGZlcnRpbGl0eSA6IHtcbiAgICAgIHZhbHVlIDogMC43LFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlNvaWwgZmVydGlsaXR5XCJcbiAgICB9LFxuICAgIERhdGVQbGFudGVkIDoge1xuICAgICAgICB2YWx1ZSA6IFwiX2RhdGVfXCIsXG4gICAgICAgIHVuaXRzIDogXCJkYXRlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJEYXRlIHRoZSBjcm9wIHdhcyBwbGFudGVkXCJcbiAgICB9LFxuICAgIERhdGVDb3BwaWNlZCA6IHtcbiAgICAgICAgdmFsdWUgOiBcIl9kYXRlX1wiLFxuICAgICAgICB1bml0cyA6IFwiZGF0ZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGF0ZSBvZiB0aGUgZmlyc3QgY29wcGljZVwiXG4gICAgfSxcbiAgICBDb3BwaWNlSW50ZXJ2YWwgOiB7XG4gICAgICAgIHZhbHVlIDogMyxcbiAgICAgICAgdW5pdHMgOiBcIlllYXJzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uIDogXCJIb3cgYWZ0ZXIgdGhlIGNyb3AgaXMgY29wcGljZWQgYWZ0ZXIgdGhlIGZpcnN0IGNvcHBpY2VcIlxuICAgIH0sXG4gICAgRGF0ZUZpbmFsSGFydmVzdCA6IHtcbiAgICAgICAgdmFsdWUgOiBcIl9kYXRlX1wiLFxuICAgICAgICB1bml0cyA6IFwiZGF0ZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGF0ZSB3aGVuIHRoZSBjcm9wIGlzIGNvbXBsZXRlbHkgaGFydmVzdGVkXCJcbiAgICB9XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJHcmVlbndvb2QgUEcgVmFsdWVzIChkZWZhdWx0KVwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgU3RvY2tpbmdEZW5zaXR5OiB7XG4gICAgICAgICAgICB2YWx1ZTogMzU4NyxcbiAgICAgICAgICAgIHVuaXRzOiBcIlRyZWVzL2hlY3RhclwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTnVtYmVyIG9mIHRyZWVzIHBsYW50ZWQgcGVyIGhlY3RhclwiXG4gICAgICAgIH0sXG4gICAgICAgIFNlZWRsaW5nTWFzczoge1xuICAgICAgICAgICAgdmFsdWU6IDAuMDAwNCxcbiAgICAgICAgICAgIHVuaXRzOiBcImtHXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXNzIG9mIHRoZSBzZWVkbGluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHBTOiB7XG4gICAgICAgICAgICB2YWx1ZTogMC4xLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlByb3BvcnRpb24gb2Ygc2VlZGxpbmcgbWFzcyBnb2luZyBpbnRvIHN0ZW1cIlxuICAgICAgICB9LFxuICAgICAgICBwRjoge1xuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUHJvcG9ydGlvbiBvZiBzZWVkbGluZyBtYXNzIGdvaW5nIGludG8gZm9saWFnZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHBSOiB7XG4gICAgICAgICAgICB2YWx1ZTogMC45LFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlByb3BvcnRpb24gb2Ygc2VlZGxpbmcgbWFzcyBnb2luZyBpbnRvIHJvb3RcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlBsYW50YXRpb24gc3RhdGUgY2xhc3MsIGNvbnRhaW5pbmcgYWxsIGludGVtZWRpYXRlIHZhbHVlcyBhdCBldmVyeSB0aW1lc3RlcCBvZiB0aGUgbW9kZWxcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBmZWVkc3RvY2tIYXJ2ZXN0OiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIGNvcHBpY2VDb3VudDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBjb3BwaWNlQWdlOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtb250aFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQWdlIG9mIHRyZWUgYXQgdGhlIHRpbWUgb2YgY29wcGljZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFZQRDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6XCJrUEFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiTWVhbiB2YXBvciBwcmVzc3VyZSBkZWZpY2l0XCJcbiAgICAgICAgfSxcbiAgICAgICAgZlZQRDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcIlZhcG9yIFByZXNzdXJlIERlZmljaXQgTW9kaWZpZXIgKFBvcGxhcilcIlxuICAgICAgICB9LFxuICAgICAgICBmVDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6XCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246XCJUZW1wZXJhdHVyZSBtb2RpZmllclwiXG4gICAgICAgIH0sXG4gICAgICAgIGZGcm9zdDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiTnVtYmVyIG9mIEZyZWV6ZSBEYXlzIE1vZGlmaWVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgZk51dHI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiTnV0cml0aW9uYWwgRnJhY3Rpb24sIG1pZ2h0IGJlIGJhc2VkIG9uIHNvaWwgYW5kIGZlcnRpbGl6ZXIgYXQgc29tZSBwb2ludFwiXG4gICAgICAgIH0sXG4gICAgICAgIGZTVzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTb2lsIHdhdGVyIG1vZGlmaWVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgZkFnZToge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBQQVI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwibW9sc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246XCJNb250aGx5IFBBUiBpbiBtb2xzIC8gbV4yIG1vbnRoXCJcbiAgICAgICAgfSxcbiAgICAgICAgeFBQOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtZXRyaWMgdG9ucyBEcnkgTWF0dGVyL2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJtYXhpbXVtIHBvdGVudGlhbCBQcmltYXJ5IFByb2R1Y3Rpb25cIlxuICAgICAgICB9LFxuICAgICAgICBJbnRjcHRuOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IHJhaW5mYWxsIGludGVyY2VwdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIEFTVzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibW1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkF2YWlsYWJsZSBzb2lsIHdhdGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgQ3VtSXJyaWc6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDdW11bGF0aXZlIGlycmlnYXRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBJcnJpZzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibW0vbW9uXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSZXF1aXJlZCBpcnJpZ2F0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgU3RhbmRBZ2U6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1vbnRoXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBZ2Ugb2YgdGhlIHRyZWVcIlxuICAgICAgICB9LFxuICAgICAgICBMQUk6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTGVhZiBhcmVhIGluZGV4XCJcbiAgICAgICAgfSxcbiAgICAgICAgQ2FuQ29uZDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDYW5vcHkgY29uZHVjdGFuY2VcIlxuICAgICAgICB9LFxuICAgICAgICBUcmFuc3A6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tL21vblwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IG1vbnRobHkgdHJhbnNwaXJhdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIFBoeXNNb2Q6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQaHlzaW9sb2dpY2FsIE1vZGlmaWVyIHRvIGNvbmR1Y3RhbmNlIGFuZCBBUEFSdVwiXG4gICAgICAgIH0sXG4gICAgICAgIHBmczoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSYXRpbyBvZiBmb2xpYWdlIHRvIHN0ZW0gcGFydGl0aW9uaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgcFI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgcFM6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgcEY6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgbGl0dGVyZmFsbDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBOUFA6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1ldHJpYyB0b25zIERyeSBNYXR0ZXIvaGFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk5ldCBQcmltYXJ5IFByb2R1Y3Rpdml0eVwiXG4gICAgICAgIH0sXG4gICAgICAgIFJvb3RQOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJvb3QgcHJvZHVjdGl2aXR5XCJcbiAgICAgICAgfSxcbiAgICAgICAgZFc6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgV0Y6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcImJkdC9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRm9saWFnZSB5aWVsZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFdSOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJiZHQvaGFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJvb3QgeWllbGRcIlxuICAgICAgICB9LFxuICAgICAgICBXUzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiYmR0L2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTdGVtIHlpZWxkXCJcbiAgICAgICAgfSxcbiAgICAgICAgVzoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiYmR0L2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUb3RhbCB5aWVsZDogcm9vdCArIHN0ZW0gKyBmb2xpYWdlXCJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJTb2lsIGluZm9ybWF0aW9uIGJhc2VkIG9uIGN1cnJlbnQgbG9jYXRpb25cIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtYXhhd3M6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSBhdmFpbGFibGUgc29pbCB3YXRlclwiXG4gICAgICAgIH0sXG4gICAgICAgIHN3cG93ZXI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwicG93ZXIgcGFyYW1ldGVyIGJhc2VkIG9uIGNsYXkgY29udGVudCBvZiBzb2lsXCJcbiAgICAgICAgfSxcbiAgICAgICAgc3djb25zdDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJjb25zdGFudCBwYXJhbWV0ZXIgYmFzZWQgb24gY2xheSBjb250ZW50IG9mIHNvaWxcIlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcIltnYyBtL3NdP1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFsb25nIHdpdGggYSBQaHlzaW9sb2dpY2FsIG1vZGlmZXIsIHNwZWNpZmllcyB0aGUgY2Fub3B5IGNvbmR1Y3RhbmNlLiAgVXNlZCBpbiBjYWxjdWxhdGlvbiBvZiB0cmFuc3BpcmF0aW9uXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgbW46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1pbmltdW0gdmFsdWUsIHdoZW4gbGFpPTBcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjAwMDFcbiAgICAgICAgfSxcbiAgICAgICAgbXg6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gdmFsdWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjAyXG4gICAgICAgIH0sXG4gICAgICAgIGxhaToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW21eMi9tXjJdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMZWFmIEFyZWEgSW5kZXggd2hlcmUgcGFyYW1ldGVyIHJlYWNoZXMgYSBtYXhpbXVtIHZhbHVlLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDIuNlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBncm93dGggbGltaXRlciBhcyBhIGZ1bmN0aW9uIG9mIHRoZSB0cmVlIGFnZS4gIFRoaXMgaXMgYSB0aW1lIGRlcGVuZGFuY3kgcGFyYW1ldGVyLiAgVGhlIGdyYXBoIG9mIHRoZSBmdW5jdGlvbiBpcyBhdmFpbGFibGUgYXQ6IGh0dHBzOi8vd3d3LmRlc21vcy5jb20vY2FsY3VsYXRvci93YTBxMmloMThoXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZjA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluaXRpYWwgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDFcbiAgICAgICAgfSxcbiAgICAgICAgZjE6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluZmluaXRlIFRpbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgIH0sXG4gICAgICAgIHRtOiB7XG4gICAgICAgICAgICB1bml0czogXCJbeV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRpbWUgaW4geWVhcnMgd2hlcmUgdmFsdWUgaXMgdGhlIGF2ZXJhZ2Ugb2YgZjAgYW5kIGYxXCIsXG4gICAgICAgICAgICB2YWx1ZTogNDcuNVxuICAgICAgICB9LFxuICAgICAgICBuOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJuPj0xOyBQYXJhbWV0ZXIgc3BlY2lmaW5nIHRoZSByYXRlIG9mIGNoYW5nZSBhcm91bmQgdG0uICBuPTEgaXMgYXBwcm94aW1hdGVseSBhIGxpbmVhciBjaGFuZ2UsIGFzIG4gaW5jcmVhc2VzLCBjaGFuZ2UgYmVjb21lcyBtb3JlIGxvY2FsaXplZCBhcm91bmQgdG0uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMy41XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBwYXJhbWV0ZXJzIGFmZmVjdGluZyB0ZW1wZXJhdHVyZSBtb2RpZmllciwgZlQuIEEgZ3JhcGggb2YgaG93IHRoZXNlIHBhcmFtZXRlcnMgYWZmZWN0IHRoZSB0ZW1wZXJhdHVyZSBtb2RpZmllciBpcyBmb3VuZCBoZXJlOiBodHRwczovL3d3dy5kZXNtb3MuY29tL2NhbGN1bGF0b3IvNjlpd3F0bmwyOFwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIG1uOiB7XG4gICAgICAgICAgICB1bml0czogXCJbQ11cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgbWluaW11bSB0ZW1wZXJhdHVyZSBvZiByZXNwaXJhdGlvblwiLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfSxcbiAgICAgICAgb3B0OiB7XG4gICAgICAgICAgICB1bml0czogXCJbQ11cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgb3B0aW11bSB0ZW1wZXJhdHVyZSBvZiByZXNwaXJhdGlvblwiLFxuICAgICAgICAgICAgdmFsdWU6IDIwXG4gICAgICAgIH0sXG4gICAgICAgIG14OiB7XG4gICAgICAgICAgICB1bml0czogXCJbQ11cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgbWF4aW11bSB0ZW1wZXJhdHVyZSBvZiByZXNwaXJhdGlvblwiLFxuICAgICAgICAgICAgdmFsdWU6IDUwXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiVGhlc2Ugc3BlY2lmeSBncm93dGggcGFyYW1ldGVycyBzcGVjaWZpYyB0byB0aGUgc3BlY2llcyBvZiB0cmVlLlwiLFxuICAgIHZhbHVlIDoge1xuICAgICAgICBrOiB7XG4gICAgICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmFkaWF0aW9uIEV4dGluY3Rpb24gQ29lZmZpY2llbnQuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC41XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bGxDYW5BZ2U6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlt5XVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiWWVhciB3aGVyZSB0cmVlIHJlYWNoZXMgZnVsbCBDYW5vcHkgQ292ZXIuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMS41XG4gICAgICAgIH0sXG4gICAgICAgIGtHOiB7XG4gICAgICAgICAgICB1bml0czogXCJba1BBXi0xXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRGV0ZXJtaW5lcyB0aGUgcmVzcG9uc2Ugb2YgdGhlIGNhbm9weSBjb25kdWN0YW5jZSB0byB0aGUgdmFwb3IgcHJlc3N1cmUgZGVmaWNpdC5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjVcbiAgICAgICAgfSxcbiAgICAgICAgYWxwaGE6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltrZy9tb2wgP11cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSBxdWFudHVtIGVmZmljaWVuY3kuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wOFxuICAgICAgICB9LFxuICAgICAgICBmVCA6IHJlcXVpcmUoJy4vZnQnKSxcbiAgICAgICAgQkxjb25kOiB7XG4gICAgICAgICAgICB1bml0czogXCJbXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IGJvdW5kYXJ5IGxheWVyIGNvbmR1Y3RhbmNlLiBVc2VkIGluIHRoZSBjYWxjdWF0aW9uIG9mIHRyYW5zcGlyYXRpb25cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjA0XG4gICAgICAgIH0sXG4gICAgICAgIGZBZ2U6IHJlcXVpcmUoJy4vZmFnZScpLFxuICAgICAgICBmTjA6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJVc2VkIGluIHRoZSBjYWxjdWxhdGlvbiBvZiB0aGUgbnV0cml0aW9uYWwgbW9kaWZpZXIsZk51dHIuICBmTnV0ciByYW5nZXMgZnJvbSBbZk5PLDEpIGJhc2VkIG9uIHRoZSBmZXJ0aWxpdHkgaW5kZXggd2hpY2ggcmFuZ2VzIGZyb20gMCB0byAxLiAgV2hlbiBmTjA9MSBpbmRpY2F0ZXMgZk51dHIgaXMgMVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMjZcbiAgICAgICAgfSxcbiAgICAgICAgU0xBOiByZXF1aXJlKCcuL3NsYScpLFxuICAgICAgICAvL0NoZWNrVW5pdHNDaGFuZ2V0b2xpbmVhckZ1bmN0aW9uXG4gICAgICAgIENvbmR1Y3RhbmNlOiByZXF1aXJlKCcuL2NvbmR1Y3RhbmNlJyksXG4gICAgICAgIEludGNwdG46IHJlcXVpcmUoJy4vaW50Y3B0bicpLFxuICAgICAgICB5OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBc3NpbWlsYXRpb24gdXNlIGVmZmljaWVuY3kuICBVc2VkIGluIGNhbGN1bGF0aW9uIG9mIHRoZSBOUFAuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC40N1xuICAgICAgICB9LFxuICAgICAgICBwZnM6IHJlcXVpcmUoJy4vcGZzJyksXG4gICAgICAgIHBSOiByZXF1aXJlKCcuL3ByJyksXG4gICAgICAgIHJvb3RQOiByZXF1aXJlKCcuL3Jvb3RwJyksXG4gICAgICAgIGxpdHRlcmZhbGw6IHJlcXVpcmUoJy4vbGl0dGVyZmFsbCcpXG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiUmFpbmZhbGwgaW50ZXJjZXB0aW9uIGZyYWN0aW9uLiAgQSBsaW5lYXIgZnVuY3Rpb24gdy5yLnQuIExBSVwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIG1uOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNaW5pbXVtIHZhbHVlLCB3aGVuIGxhaT0wXCIsXG4gICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9LFxuICAgICAgICBteDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSB2YWx1ZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMjRcbiAgICAgICAgfSxcbiAgICAgICAgbGFpOiB7XG4gICAgICAgICAgICB1bml0czogXCJbbV4yL21eMl1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxlYWYgQXJlYSBJbmRleCB3aGVyZSBwYXJhbWV0ZXIgcmVhY2hlcyBhIG1heGltdW0gdmFsdWUuXCIsXG4gICAgICAgICAgICB2YWx1ZTogNy4zXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGZyYWN0aW9uYWwgbW9udGhseSBsb3NzIG9mIGZvbGlhZ2UuIFRoaXMgaXMgYSB0aW1lIGRlcGVuZGFueSBwYXJhbWV0ZXIuICBUaGUgZ3JhcGggb2YgdGhlIGZ1bmN0aW9uIGlzIGF2YWlsYWJsZSBhdDogaHR0cHM6Ly93d3cuZGVzbW9zLmNvbS9jYWxjdWxhdG9yLzZpcTlwcGRxczdcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBmMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5pdGlhbCBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wMDE1XG4gICAgICAgIH0sXG4gICAgICAgIGYxOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbmZpbml0ZSBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wM1xuICAgICAgICB9LFxuICAgICAgICB0bToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW3ldXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUaW1lIGluIHllYXJzIHdoZXJlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIG9mIGYwIGFuZCBmMVwiLFxuICAgICAgICAgICAgdmFsdWU6IDJcbiAgICAgICAgfSxcbiAgICAgICAgbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibj49MTsgUGFyYW1ldGVyIHNwZWNpZmluZyB0aGUgcmF0ZSBvZiBjaGFuZ2UgYXJvdW5kIHRtLiAgbj0xIGlzIGFwcHJveGltYXRlbHkgYSBsaW5lYXIgY2hhbmdlLCBhcyBuIGluY3JlYXNlcywgY2hhbmdlIGJlY29tZXMgbW9yZSBsb2NhbGl6ZWQgYXJvdW5kIHRtLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDIuNVxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiVGhpcyBkZWZpbmVzIHRoZSBmb2xpYWdlIHRvIHN0ZW0gKFdGL1dTKSBmcmFjdGlvbiBpbiBhbGxvY2F0aW5nIGFib3ZlZ3JvdW5kIGJpb21hc3Mgb2YgdGhlIHRyZWUuIFRoaXMgaXMgY2FsY3VsYXRlZCB3aXRoIGEgcGFpciBvZiBhbGxvbWV0cmljIHBvd2VyIGVxdWF0aW9ucy4gIFRoZSBmaXJzdCByZWxhdGVzIGJhc2FsIGRpYW1ldGVyLCAoRE9CKSB0byB0b3RhbCB3b29keSBiaW9tYXNzLCB3aGlsZSB0aGUgc2Vjb25kIHJlbGF0ZXMgRE9CIHRvIHBmcy4gIFRoZSBwYXJhbWV0ZXJpemF0aW9uIG9mIHRoZSByZWxhdGlvbnNoaXAgYmV0d2VlbiBET0IgYW5kIHdvb2R5IGJpb21hc3MgaXMgaW52ZXJ0ZWQgdG8gZGV0ZXJtaW5lIHRoZSBET0IgZnJvbSB0aGUgbW9kZWxlZCB3b29keSBmcmFjdGlvbi4gIFRoaXMgcmVsYXRpb24gaXMgcGxvdHRlZCBhdDogLiAgVGhlIG1vZGVsIGFsbG9jYXRlcyB0aGUgYXBwcm9wcmlhdGUgZnJhY3Rpb24gb2Ygd29vZCBiYXNlZCBvbiB0aGUgU3RvY2tpbmcgZGVuc2l0eSBvZiB0aGUgcGxhbnRhdGlvbi4gRE9CIHJhdGhlciB0aGFuIERCSCBpcyB1c2VkIGZvciBjb21wYXJpc29uIG9mIHRyZWVzIHdpdGggYSBoaWdoIHN0ZW1DbnQgYW5kIHJhcGlkIGNvcHBpY2luZyB2YWx1ZS5cIixcbiAgICB2YWx1ZToge1xuICAgICAgICBzdGVtQ250OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBdmVyYWdlIG51bWJlciBvZiBzdGVtcyBwZXIgc3R1bXBcIixcbiAgICAgICAgICAgIHZhbHVlOiAyLjhcbiAgICAgICAgfSxcbiAgICAgICAgc3RlbUM6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltjbV4tMV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbnN0YW50IGluIHJlbGF0aW9uIG9mIERPQiB0byB3b29keSBiaW9tYXNzXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4xOFxuICAgICAgICB9LFxuICAgICAgICBzdGVtUDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUG93ZXIgaW4gcmVsYXRpb24gb2YgRE9CIHRvIHdvb2R5IGJpb21hc3MuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMi40XG4gICAgICAgIH0sXG4gICAgICAgIHBmc014OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIHBvc3NpYmxlIHBmcyB2YWx1ZSBhbGxvd2VkXCIsXG4gICAgICAgICAgICB2YWx1ZTogMlxuICAgICAgICB9LFxuICAgICAgICBwZnNQOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQb3dlciBpbiByZWxhdGlvbiBvZiBEQk8gdG8gcGZzXCIsXG4gICAgICAgICAgICB2YWx1ZTogLTAuNzcyXG4gICAgICAgIH0sXG4gICAgICAgIHBmc0M6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIltjbV4tMV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbnN0YW50IGluIHJlbGF0aW9uIG9mIERPQiB0byBwZnMuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMS4zXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiZnJhY3Rpb25cIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbG9uZyB3aXRoIGEgUGh5c2lvbG9naWFsIHBhcmFtZXRlciwgc3BlY2lmaWVzIHRoZSBhbW91bnQgb2YgbmV3IGdyb3d0aCBhbGxvY2F0ZWQgdG8gdGhlIHJvb3Qgc3lzdGVtLCBhbmQgdGhlIHR1cm5vdmVyIHJhdGUuXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgbW46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1pbmltdW0gYWxsb2NhdGlvbiB0byB0aGUgcm9vdCwgd2hlbiB0aGUgcGh5c2lvbG9nYWwgcGFyYW1ldGVyIGlzIDEuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4xN1xuICAgICAgICB9LFxuICAgICAgICBteDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSBhbGxvY2F0aW9uIHRvIHRoZSByb290LCB3aGVuIG0wLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuN1xuICAgICAgICB9LFxuICAgICAgICBtMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRGVwZW5kYW5jZSBvbiB0aGUgZmVydGlsaXR5IGluZGV4LiAwIGluZGljYXRlcyBmdWxsIGRlcGVuZGFuY2Ugb24gZmVydGlsaXR5LCAxIGluZGljYXRlcyBhIGNvbnN0YW50IGFsbG9jYXRpb24sIGluZGVwZW5kYW50IG9mIGZlcnRpbGl0eVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuNVxuICAgICAgICB9LFxuICAgICAgICB0dXJub3Zlcjoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW21vbnRoXi0xXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBtb250aGx5IHJvb3QgdHVybm92ZXIgcmF0ZS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjAyXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiVGhlc2UgcGFyYW1ldGVycyBzcGVjaWZ5IHJvb3QgYWxsb2NhdGlvbiB0byBncm93dGggYWZ0ZXIgY29wcGljaW5nLlwiLFxuICAgIHZhbHVlIDoge1xuICAgICAgZnJhYzoge1xuICAgICAgICAgIHVuaXRzOiBcIlttb250aF4xXVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgZnJhY3Rpb25hbCBhbW91bnQgb2Ygcm9vdCBiaW9tYXNzIHRoYXQgZXhjZWVkcyB0aGUgYWJvdmVncm91bmQgcmVxdWlyZW1lbnRzIHRoYXQgY2FuIGJlIHN1cHBsaWVkIGluIGEgZ2l2ZW4gbW9udGguXCIsXG4gICAgICAgICAgdmFsdWU6IDAuMlxuICAgICAgfSxcbiAgICAgIExBSVRhcmdldDoge1xuICAgICAgICAgIHVuaXRzOiBcIlttXjIvbV4yXVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyBhIHRhcmdldCBMQUkgcmF0ZS4gIFRoZSBUYXJnZXQgTEFJIGlzIGluY2x1ZGVkIGluIHRoZSBjYWxjdWxhdGlvbiBvZiBhIHRhcmdldCBOUFAsIGJhc2VkIG9uIHdlYXRoZXIgcGFyYW1hdGVycy4gIEJlbG93IHRoaXMgdGFyZ2V0LCB0aGUgcm9vdHMgd2lsbCBjb250cmlidXRlIGJpb21hc3MgaWYgdGhlIGJlbG93IGdyb3VuZCByb290IG1hc3MgZXhjZWVkcyB0aGUgcmVxdWlyZW1lbnRzIG9mIHRoZSBhYm92ZWdyb3VuZCBiaW9tYXNzLiBUaGUgdGFyZ2V0IGlzIHNwZWNpZmllZCBpbiBMQUkgdG8gdGltZSByb290IGNvbnRyaWJ1dGlvbnMgdG8gcGVyaW9kcyBvZiBncm93dGhcIixcbiAgICAgICAgICB2YWx1ZTogMTBcbiAgICAgIH0sXG4gICAgICBlZmZpY2llbmN5OiB7XG4gICAgICAgICAgdW5pdHM6IFwiW2tnL2tnXVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgZWZmaWNpZW5jeSBpbiBjb252ZXJ0aW5nIHJvb3QgYmlvbWFzcyBpbnRvIGFib3ZlZ3JvdW5kIGJpb21hc3MuXCIsXG4gICAgICAgICAgdmFsdWU6IDAuN1xuICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJbbV4yL2tnXVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgU3BlY2lmaWMgTGVhZiBBcmVhIGFzIGEgZnVuY3Rpb24gb2YgdGhlIHRyZWUgYWdlLiAgVGhpcyBpcyBhIHRpbWUgZGVwZW5kYW5jeSBwYXJhbWV0ZXIuICBVc2VkIGluIHRoZSBjYWxjdWxhdGlvbiBvZiBMQUkuICBUaGUgZ3JhcGggb2YgdGhlIGZ1bmN0aW9uIGlzIGF2YWlsYWJsZSBhdDogaHR0cHM6Ly93d3cuZGVzbW9zLmNvbS9jYWxjdWxhdG9yL3dhMHEyaWgxOGhcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBmMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5pdGlhbCBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMTlcbiAgICAgICAgfSxcbiAgICAgICAgZjE6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluZmluaXRlIFRpbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAxMC44XG4gICAgICAgIH0sXG4gICAgICAgIHRtOiB7XG4gICAgICAgICAgICB1bml0czogXCJbeV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRpbWUgaW4geWVhcnMgd2hlcmUgdmFsdWUgaXMgdGhlIGF2ZXJhZ2Ugb2YgZjAgYW5kIGYxXCIsXG4gICAgICAgICAgICB2YWx1ZTogNVxuICAgICAgICB9LFxuICAgICAgICBuOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJuPj0xOyBQYXJhbWV0ZXIgc3BlY2lmaW5nIHRoZSByYXRlIG9mIGNoYW5nZSBhcm91bmQgdG0uICBuPTEgaXMgYXBwcm94aW1hdGVseSBhIGxpbmVhciBjaGFuZ2UsIGFzIG4gaW5jcmVhc2VzLCBjaGFuZ2UgYmVjb21lcyBtb3JlIGxvY2FsaXplZCBhcm91bmQgdG0uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1vbnRoOiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIG1vbnRoIG51bWJlciBzaW5jZSBwbGFudGluZ1wiXG4gICAgfSxcbiAgICB0bWluOiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiQ2VsY2l1c1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJNaW5pbXVtIHRlbXBlcmF0dXJlIGZvciBncm93dGhcIlxuICAgIH0sXG4gICAgdG1heDoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIkNlbGNpdXNcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSB0ZW1wZXJhdHVyZSBmb3IgZ3Jvd3RoXCJcbiAgICB9LFxuICAgIHRkbWVhbjoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIkNlbGNpdXNcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRGV3IHBvaW50IHRlbXBlcmF0dXJlXCJcbiAgICB9LFxuICAgIHBwdDoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJQcmVjaXBpdGF0aW9uXCJcbiAgICB9LFxuICAgIHJhZDoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJTb2xhciByYWRpYXRpb25cIlxuICAgIH0sXG4gICAgbnJlbDoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgIH0sXG4gICAgZGF5bGlnaHQ6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICB9XG59O1xuIiwiLyoqXG5cbkBtb2R1bGUgM1BHIE1vZHVsZVxuKiovXG5cblxuLyoqXG5DbGFzcyBmb3IgYWxsIHRoZSBmdW5jdGlvbnMgdGhhdCBydW4gaW4gYSBzaW5nbGUgc3RlcCBvZiB0aGUgbW9kZWxcblxuQGNsYXNzIG1vZHVsZS5leHBvcnRzXG4qKi9cblxuXG4vKipcbmxpc3Qgb2YgY29uc3RhbnRzIHVzZWQgZm9yIGNvbXB1dGF0aW9uc1xuXG5AYXR0cmlidXRlIGNvbnN0YW50XG4qKi9cbnZhciBjb25zdGFudHMgPSB7XG4gIGRheXNfcGVyX21vbnRoOntcbiAgICAgIHZhbHVlOjMwLjQsXG4gICAgICB1bml0czpcImRheXMvbW9cIixcbiAgICAgIGRlc2NyaXB0aW9uOlwiTnVtYmVyIG9mIERheXMgaW4gYW4gYXZlcmFnZSBtb250aFwiXG4gIH0sXG4gIGUyMDp7XG4gICAgICB2YWx1ZToyLjIsXG4gICAgICB1bml0czpcInZwL3RcIixcbiAgICAgIGRlc2NyaXB0aW9uOlwiUmF0ZSBvZiBjaGFuZ2Ugb2Ygc2F0dXJhdGVkIFZQIHdpdGggVCBhdCAyMENcIlxuICB9LFxuICByaG9BaXI6e1xuICAgICAgdmFsdWU6MS4yLFxuICAgICAgdW5pdHM6XCJrZy9tXjNcIixcbiAgICAgIGRlc2NyaXB0aW9uOlwiRGVuc2l0eSBvZiBhaXJcIlxuICB9LFxuICBsYW1iZGE6e1xuICAgICAgdmFsdWU6MjQ2MDAwMCxcbiAgICAgIHVuaXRzOlwiSi9rZ1wiLFxuICAgICAgZGVzY3JpcHRpb246XCJMYXRlbnQgaGVhdCBvZiB2YXBvdXJpc2F0aW9uIG9mIGgyb1wiXG4gIH0sXG4gIFZQRGNvbnY6e1xuICAgICAgdmFsdWU6MC4wMDA2MjIsXG4gICAgICB1bml0czpcIj9cIixcbiAgICAgIGRlc2NyaXB0aW9uOlwiQ29udmVydCBWUEQgdG8gc2F0dXJhdGlvbiBkZWZpY2l0ID0gMTgvMjkvMTAwMFwiXG4gIH0sXG4gIFFhOntcbiAgICAgIHZhbHVlOi05MCxcbiAgICAgIHVuaXRzOlwiVy9tXjJcIixcbiAgICAgIGRlc2NyaXB0aW9uOlwiSW50ZXJjZXB0IG9mIG5ldCByYWRpYXRpb24gdmVyc3VzIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXBcIlxuICB9LFxuICBRYjp7XG4gICAgICB2YWx1ZTowLjgsXG4gICAgICB1bml0czpcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbjpcInNsb3BlIG9mIG5ldCB2cy4gc29sYXIgcmFkaWF0aW9uIHJlbGF0aW9uc2hpcFwiXG4gIH0sXG4gIGdETV9tb2w6e1xuICAgICAgdmFsdWU6MjQsXG4gICAgICB1bml0czpcImcvbW9sKEMpXCIsXG4gICAgICBkZXNjcmlwdGlvbjpcIk1vbGVjdWxhciB3ZWlnaHQgb2YgZHJ5IG1hdHRlclwiXG4gIH0sXG4gIG1vbFBBUl9NSjp7XG4gICAgICB2YWx1ZToyLjMsXG4gICAgICB1bml0czpcIm1vbChDKS9NSlwiLFxuICAgICAgZGVzY3JpcHRpb246XCJDb252ZXJzaW9uIG9mIHNvbGFyIHJhZGlhdGlvbiB0byBQQVJcIlxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5jb25zdGFudCA9IGNvbnN0YW50O1xuZnVuY3Rpb24gY29uc3RhbnQoYykge1xuICAgIHJldHVybiBjb25zdGFudHNbY10udmFsdWU7XG59XG5cbi8qKlxuVGltZSBEZXBlbmRhbnQgQXR0cmlidXRlLFxudW5pdHM9J3ZhcmlvdXMnLFxuZGVzY3JpcHRpb249J1RoaXMgZnVuY3Rpb24gY3JlYXRlcyBhIHRpbWUgZGVwZW5kYW50IGZ1bmN0aW9uIHRoYXQgZGVjYXlzXG4ob3IgcmlzZXMgZnJvbSBmMCB0byBmMS4gIFRoZSB2YWx1ZSAoZjArZjEpLzIgaXMgcmVhY2hlZCBhdCB0bSxcbmFuZCB0aGUgc2xvcGUgb2YgdGhlIGxpbmUgYXQgdG0gaXMgZ2l2ZW4gYnkgcC5cbkBtZXRob2QgdGRwXG5AcGFyYW0geFxuQHBhcmFtIGZcbioqL1xubW9kdWxlLmV4cG9ydHMudGRwID0gZnVuY3Rpb24oeCxmKSB7XG4gIHZhciBwPWYuZjEgKyAoZi5mMC1mLmYxKSpNYXRoLmV4cCgtTWF0aC5sb2coMikqTWF0aC5wb3coKHgvZi50bSksZi5uKSk7XG4gIHJldHVybiBwO1xufVxuXG4vKipcbkBtZXRob2QgbGluXG5AcGFyYW0geFxuQHBhcmFtIHBcbiovXG5tb2R1bGUuZXhwb3J0cy5saW4gPSBmdW5jdGlvbih4LCBwKXtcbiAgaWYoIHggPCAwICkge1xuICAgIHJldHVybiBwLm1uO1xuICB9XG4gIGlmKCB4ID4gcC54bWF4ICkge1xuICAgIHJldHVybiBwLnhtYXg7XG4gIH1cbiAgcmV0dXJuIHAubW4gKyAocC5teC1wLm1uKSooeC9wLnhtYXgpO1xufTtcblxuLyoqXG51bml0cz0ndW5pdGxlc3MnLFxuZGVzY3JpcHRpb249J0Nhbm9weSBSYWluZmFsbCBpbnRlcmNlcHRpb24nXG5AbWV0aG9kIEludGNwdG5cbkBwYXJhbSBjdXJfTEFJXG5AcGFyYW0gY1xuKi9cbm1vZHVsZS5leHBvcnRzLkludGNwdG4gPSBmdW5jdGlvbihjdXJfTEFJLCBjKXtcbiAgcmV0dXJuIE1hdGgubWF4KGMubW4sYy5tbiArIChjLm14IC0gYy5tbikgKiBNYXRoLm1pbigxICwgY3VyX0xBSSAvIGMubGFpKSk7XG59O1xuXG4vKipcbnVuaXRzPSdtbScsXG5kZXNjcmlwdGlvbj0nQXZhaWxhYmxlIFNvaWwgV2F0ZXInXG5AbWV0aG9kIEFTV1xuQHBhcmFtIG1heEFTV1xuQHBhcmFtIHByZXZfQVNXXG5AcGFyYW0gZGF0ZV9wcHRcbkBwYXJhbSBjdXJfVHJhbnNwXG5AcGFyYW0gY3VyX0ludGNwdG5cbkBwYXJhbSBjdXJfSXJyaWdcbiovXG5tb2R1bGUuZXhwb3J0cy5BU1cgPSBmdW5jdGlvbihtYXhBU1csIHByZXZfQVNXLCBkYXRlX3BwdCwgY3VyX1RyYW5zcCwgY3VyX0ludGNwdG4sIGN1cl9JcnJpZyl7XG4gIHJldHVybiBNYXRoLm1pbihtYXhBU1cqMTAsIE1hdGgubWF4KHByZXZfQVNXICsgZGF0ZV9wcHQgLSAoY3VyX1RyYW5zcCArIGN1cl9JbnRjcHRuICogZGF0ZV9wcHQpICsgY3VyX0lycmlnLCAwKSk7XG59O1xuXG4vL1RPRE86IGRvdWJsZSBjaGVjayB0aGUgYXBwcm9wcmlhdGUgdXNlIG9mIHRkbWVhbiAoZGV3IHBvaW50IHRlbXApXG4vL1RPRE86IHRha2UgY29uc3RhbnRzIG91dFxuLyoqXG51bml0cz0na1BBJyxcbmRlc2NyaXB0aW9uPSdNZWFuIHZhcG9yIHByZXNzdXJlIGRlZmljaXQnXG5AbWV0aG9kIFZQRFxuQHBhcmFtIGRhdGVfdG1pblxuQHBhcmFtIGRhdGVfdG1heFxuQHBhcmFtIGRhdGVfdGRtZWFuXG4qL1xubW9kdWxlLmV4cG9ydHMuVlBEID0gZnVuY3Rpb24oZGF0ZV90bWluLCBkYXRlX3RtYXgsIGRhdGVfdGRtZWFuKXtcbiAgcmV0dXJuICgwLjYxMDggLyAyICogKE1hdGguZXhwKGRhdGVfdG1pbiAqIDE3LjI3IC8gKGRhdGVfdG1pbiArIDIzNy4zKSApICsgTWF0aC5leHAoZGF0ZV90bWF4ICogMTcuMjcgLyAoZGF0ZV90bWF4ICsgMjM3LjMpICkgKSApIC0gKDAuNjEwOCAqIE1hdGguZXhwKGRhdGVfdGRtZWFuICogMTcuMjcgLyAoZGF0ZV90ZG1lYW4gKyAyMzcuMykgKSApO1xufTtcblxuXG4vKipcbnVuaXRzID0gdW5pdGxlc3MsXG5kZXNjcmlwdGlvbj0nVmFwb3IgUHJlc3N1cmUgRGVmaWNpdCBNb2RpZmllciAoUG9wbGFyKSdcbkBtZXRob2QgZlZQRFxuQHBhcmFtIGtHXG5AcGFyYW0gY3VyX1ZQRFxuKi9cbm1vZHVsZS5leHBvcnRzLmZWUEQgPSBmdW5jdGlvbihrRywgY3VyX1ZQRCl7XG4gIHJldHVybiBNYXRoLmV4cCgtMSAqIGtHICogY3VyX1ZQRCk7XG59O1xuXG4vL1RPRE86IHRha2UgY29uc3RhbnRzIG91dFxuLy8gbWFrZSBhIG1lYW5pbmdmdWwgdGVtcHZhciBuYW1lXG4vKipcbnVuaXRzID0gdW5pdGxlc3MsXG5kZXNjcmlwdGlvbiA9ICdOdW1iZXIgb2YgRnJlZXplIERheXMgTW9kaWZpZXInXG5AbWV0aG9kIGZGcm9zdFxuQHBhcmFtIGRhdGVfdG1pblxuKi9cbm1vZHVsZS5leHBvcnRzLmZGcm9zdCA9IGZ1bmN0aW9uKGRhdGVfdG1pbikge1xuICB2YXIgdGVtcFZhciA9IC0xLjA7XG5cbiAgaWYoIGRhdGVfdG1pbiA+PSAwICl7XG4gICAgdGVtcFZhciA9IDEuMDtcbiAgfSAvL2Vsc2UgLTEuMFxuXG4gIHJldHVybiAwLjUgKiAoMS4wICsgdGVtcFZhciAqIE1hdGguc3FydCgxIC0gTWF0aC5leHAoLTEgKiBNYXRoLnBvdygoMC4xNyAqIGRhdGVfdG1pbikgLCAyKSAqICg0IC8gMy4xNDE1OSArIDAuMTQgKiBNYXRoLnBvdyggKDAuMTcgKiBkYXRlX3RtaW4pICwgMikgKSAvICgxICsgMC4xNCAqIE1hdGgucG93KCgwLjE3ICogZGF0ZV90bWluKSAsIDIpICkgKSApICk7XG59O1xuXG4vL1RPRE8gLSBiZXR0ZXIgbmFtaW5nPzogdG1pbiwgdG1heCA9IHdlYXRoZXIgVG9wdCwgVG1heCwgVG1pbiA9IHRyZWUgcGFyYW1zXG4vKipcbnVuaXRzPXVuaXRsZXNzLFxuZGVzY3JpcHRpb249J1RlbXBlcmF0dXJlIG1vZGlmaWVyJ1xuQG1ldGhvZCBmVFxuQHBhcmFtIHRhdmdcbkBwYXJhbSBmVFxuKi9cbm1vZHVsZS5leHBvcnRzLmZUID0gZnVuY3Rpb24odGF2ZywgZlQpe1xuICB2YXIgZjtcbiAgaWYodGF2ZyA8PSBmVC5tbiB8fCB0YXZnID49IGZULm14KXtcbiAgICBmID0gMDtcbiAgfSBlbHNlIHtcbiAgICBmID0gKCAodGF2ZyAtIGZULm1uKSAvIChmVC5vcHQgLSBmVC5tbikgKSAgKlxuICAgICAgICAgICBNYXRoLnBvdyAoICggKGZULm14IC0gdGF2ZykgLyAoZlQubXggLSBmVC5vcHQpICksXG4gICAgICAgICAgICAgICAgICAgICAgKCAoZlQubXggLSBmVC5vcHQpIC8gKGZULm9wdCAtIGZULm1uKSApXG4gICAgICAgICAgICAgICAgICAgICk7XG4gIH1cbiAgcmV0dXJuKGYpO1xufVxuXG4vKipcbnVuaXRzPSdtbS9tb24nLFxuZGVzY3JpcHRpb249J1JlcXVpcmVkIElycmlnYXRpb24nXG5AbWV0aG9kIElycmlnXG5AcGFyYW0gaXJyaWdGcmFjXG5AcGFyYW0gY3VyX1RyYW5zcFxuQHBhcmFtIGN1cl9JbnRjcHRuXG5AcGFyYW0gZGF0ZV9wcHRcbiovXG5tb2R1bGUuZXhwb3J0cy5JcnJpZyA9IGZ1bmN0aW9uKGlycmlnRnJhYywgY3VyX1RyYW5zcCwgY3VyX0ludGNwdG4sIGRhdGVfcHB0KXtcbiAgICByZXR1cm4gTWF0aC5tYXgoMCAsIGlycmlnRnJhYyAqIChjdXJfVHJhbnNwIC0gKDEgLSBjdXJfSW50Y3B0bikgKiBkYXRlX3BwdCkgKTtcbn07XG5cbi8vVE9ETzogZ2V0IHVuaXRzIGFuZCBkZXNjcmlwdGlvblxuLyoqXG5AbWV0aG9kIGZTV1xuQHBhcmFtIEFTV1xuQHBhcmFtIG1heEFXU1xuQHBhcmFtIHN3Y29uc3RcbkBwYXJhbSBzd3Bvd2VyXG4qL1xubW9kdWxlLmV4cG9ydHMuZlNXID0gZnVuY3Rpb24oQVNXLCBtYXhBV1MsIHN3Y29uc3QsIHN3cG93ZXIpIHtcbiAgdmFyIGZTVztcbiAgaWYoc3djb25zdCA9PSAwIHx8IG1heEFXUyA9PSAwKSB7XG4gICAgZlNXID0gMDtcbiAgfSBlbHNlIHtcbiAgICB2YXIgb21yID0gMSAtIChBU1cvMTApL21heEFXUzsgLy8gT25lIE1pbnVzIFJhdGlvXG5cbiAgICBpZihvbXIgPCAwLjAwMSkge1xuICAgICAgZlNXID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgZlNXID0gKDEtTWF0aC5wb3cob21yLHN3cG93ZXIpKS8oMStNYXRoLnBvdyhvbXIvc3djb25zdCxzd3Bvd2VyKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmU1c7XG59O1xuXG4vKipcbnVuaXRzPSd1bml0bGVzcycsXG5kZXNjcmlwdGlvbj0nTnV0cml0aW9uYWwgRnJhY3Rpb24sIG1pZ2h0IGJlIGJhc2VkIG9uIHNvaWwgYW5kIGZlcnRpbGl6ZXIgYXQgc29tZSBwb2ludCdcbkBtZXRob2QgZk51dHJcbkBwYXJhbSBmTjBcbkBwYXJhbSBGUlxuKi9cbm1vZHVsZS5leHBvcnRzLmZOdXRyID0gZnVuY3Rpb24oZk4wLCBGUil7XG4gIHJldHVybiBmTjAgKyAoMSAtIGZOMCkgKiBGUjtcbn07XG5cbi8qKlxuVE9ETzogd2h5ICQzIGluIG1ha2VmaWxlIC0gYXNrIGFib3V0IGl0XG51bml0cz11bml0bGVzc1xuZGVzY3JpcHRpb249J1BoeXNpb2xvZ2ljYWwgTW9kaWZpZXIgdG8gY29uZHVjdGFuY2UgYW5kIEFQQVJ1J1xuQG1ldGhvZCBQaHlzTW9kXG5AcGFyYW0gY3VyX2ZWUERcbkBwYXJhbSBjdXJfZlNXXG5AcGFyYW0gY3VyX2ZBZ2VcbiovXG5tb2R1bGUuZXhwb3J0cy5QaHlzTW9kID0gZnVuY3Rpb24oY3VyX2ZWUEQsIGN1cl9mU1csIGN1cl9mQWdlKXtcbiAgIHJldHVybiBNYXRoLm1pbihjdXJfZlZQRCAsIGN1cl9mU1cpICogY3VyX2ZBZ2U7XG59O1xuXG4vKipcbnVuaXRzPSdnYyxtL3MnLFxuZGVzY3JpcHRpb249J0Nhbm9weSBDb25kdWN0YW5jZSdcbkBtZXRob2QgQ2FuQ29uZFxuQHBhcmFtIFBoeXNNb2RcbkBwYXJhbSBMQUlcbkBwYXJhbSBjb25kXG4qL1xubW9kdWxlLmV4cG9ydHMuQ2FuQ29uZCA9IGZ1bmN0aW9uKFBoeXNNb2QsIExBSSwgY29uZCl7XG4gICByZXR1cm4gTWF0aC5tYXgoY29uZC5tbiAsIGNvbmQubXggKiBQaHlzTW9kICogTWF0aC5taW4oMSAsIExBSSAvIGNvbmQubGFpKSApO1xufTtcblxuLyoqXG51bml0cz0nbW0vbW9uJyB3aGljaCBpcyBhbHNvIGtnL20yL21vblxuZGVzY3JpcHRpb249J0Nhbm9weSBNb250aGx5IFRyYW5zcGlyYXRpb24nXG5AbWV0aG9kIFRyYW5zcFxuQHBhcmFtIGRhdGVfbnJlbFxuQHBhcmFtIGRhdGVfZGF5bGlnaHRcbkBwYXJhbSBjdXJfVlBEXG5AcGFyYW0gQkxjb25kXG5AcGFyYW0gY3VyX0NhbkNvbmRcbkBwYXJhbSBkYXlzX3Blcl9tb250aFxuKi9cbm1vZHVsZS5leHBvcnRzLlRyYW5zcCA9IGZ1bmN0aW9uKGRhdGVfbnJlbCwgZGF0ZV9kYXlsaWdodCwgY3VyX1ZQRCwgQkxjb25kLCBjdXJfQ2FuQ29uZCwgZGF5c19wZXJfbW9udGgpe1xuICB2YXIgVlBEY29udiA9IGNvbnN0YW50KCdWUERjb252Jyk7XG4gIHZhciBsYW1iZGEgPSBjb25zdGFudCgnbGFtYmRhJyk7XG4gIHZhciByaG9BaXIgPSBjb25zdGFudCgncmhvQWlyJyk7XG4gIHZhciBlMjAgPSBjb25zdGFudCgnZTIwJyk7XG4gIHZhciBRYSA9IGNvbnN0YW50KCdRYScpO1xuICB2YXIgUWIgPSBjb25zdGFudCgnUWInKTtcbiAgdmFyIGRheXNfcGVyX21vbnRoID0gdHlwZW9mIGRheXNfcGVyX21vbnRoICE9PSAndW5kZWZpbmVkJyA/IGRheXNfcGVyX21vbnRoIDogY29uc3RhbnQoJ2RheXNfcGVyX21vbnRoJyk7XG5cbiAgLy8gZGF0ZV9kYXlsaWdodCA9IGhvdXJzXG4gIC8vIG5yZWwgaXMgaW4gTUovbV4yL2RheSBjb252ZXJ0IHRvIFdoL21eMi9kYXlcbiAgdmFyIG5ldFJhZCA9IFFhICsgUWIgKiAoKGRhdGVfbnJlbCAqIDI3Ny43NzgpIC8gZGF0ZV9kYXlsaWdodCk7XG4gIHZhciBkZWZUZXJtID0gcmhvQWlyICogbGFtYmRhICogVlBEY29udiAqIGN1cl9WUEQgKiBCTGNvbmQ7XG4gIHZhciBkaXYgPSAxICsgZTIwICsgQkxjb25kIC8gY3VyX0NhbkNvbmQ7XG4gIC8vIENvbnZlcnQgZGF5bGlnaHQgdG8gc2Vjcy5cbiAgdmFyIFRyYW5zcD0gIGRheXNfcGVyX21vbnRoICogKCAoZTIwICogbmV0UmFkICsgZGVmVGVybSApIC8gZGl2ICkgKiBkYXRlX2RheWxpZ2h0ICogMzYwMCAvIGxhbWJkYTtcblxuICByZXR1cm4gVHJhbnNwO1xufTtcblxuLy9UT0RPOiBkZXNjcmlwdGlvblxuLyoqXG51bml0cz0nbWV0cmljIHRvbnMgRHJ5IE1hdHRlci9oYScsXG5AbWV0aG9kIE5QUFxuQHBhcmFtIHByZXZfU3RhbmRBZ2VcbkBwYXJhbSBmdWxsQ2FuQWdlXG5AcGFyYW0geFBQXG5AcGFyYW0ga1xuQHBhcmFtIHByZXZfTEFJXG5AcGFyYW0gZlZQRFxuQHBhcmFtIGZTV1xuQHBhcmFtIGZBZ2VcbkBwYXJhbSBhbHBoYVxuQHBhcmFtIGZOdXRyXG5AcGFyYW0gZlRcbkBwYXJhbSBmRnJvc3RcbiovXG5tb2R1bGUuZXhwb3J0cy5OUFAgPSBmdW5jdGlvbihwcmV2X1N0YW5kQWdlLCBmdWxsQ2FuQWdlLCB4UFAsIGssIHByZXZfTEFJLCBmVlBELCBmU1csIGZBZ2UsIGFscGhhLCBmTnV0ciwgZlQsIGZGcm9zdCl7XG4gIHZhciBDYW5Db3ZlciA9IDE7XG4gIGlmKCBwcmV2X1N0YW5kQWdlIDwgZnVsbENhbkFnZSApe1xuICAgIENhbkNvdmVyID0gcHJldl9TdGFuZEFnZSAvIGZ1bGxDYW5BZ2U7XG4gIH1cblxuICByZXR1cm4geFBQICogKDEgLSAoTWF0aC5leHAoLWsgKiBwcmV2X0xBSSkgKSApICogQ2FuQ292ZXIgKiBNYXRoLm1pbihmVlBEICwgZlNXKSAqIGZBZ2UgKiBhbHBoYSAqIGZOdXRyICogZlQgKiBmRnJvc3Q7XG59O1xuXG4vL1RPRE86IHVuaXRzIGFuZCBkZXNjcmlwdGlvblxuLyoqXG5AbWV0aG9kIHBSXG5AcGFyYW0gY3VyX1BoeXNNb2RcbkBwYXJhbSBjdXJfcFJcbkBwYXJhbSBGUlxuQHBhcmFtIHBSXG4qL1xubW9kdWxlLmV4cG9ydHMucFIgPSBmdW5jdGlvbihjdXJfUGh5c01vZCwgY3VyX3BSLEZSLHBSKXtcbiAgdmFyIHAgPShwUi5teCAqIHBSLm1uKSAvXG4gICAgICAgICAocFIubW4gKyAocFIubXggLSBwUi5tbikgKiBjdXJfUGh5c01vZCAqIChwUi5tMCArICgxIC0gcFIubTApICogRlIpICk7XG5cbiAgLy8gVGhpcyB3YXMgYWRkZWQgYnkgcXVpbm4gdG8gbGltaXQgcm9vdCBncm93dGguXG4gIHJldHVybiBwICogTWF0aC5wb3cocC9jdXJfcFIsMik7XG59XG5cblxuLy9UT0RPOiBtb2xzIG9yIG1vbHMgcGVyIG1eMj9cbi8qKlxudW5pdHM9bW9sc1xuZGVzY3JpcHRpb249J01vbnRobHkgUEFSIGluIG1vbHMgLyBtXjIgbW9udGgnXG5tb2xQQVJfTUogW21vbC9NSl0gaXMgYSBjb25zdGFudCBDb252ZXJzaW9uIG9mIHNvbGFyIHJhZGlhdGlvbiB0byBQQVJcbkBtZXRob2QgUEFSXG5AcGFyYW0gZGF0ZV9yYWRcbkBwYXJhbSBtb2xQQVJfTUpcbiovXG5tb2R1bGUuZXhwb3J0cy5QQVIgPSBmdW5jdGlvbihkYXRlX3JhZCwgbW9sUEFSX01KKXtcbiAgdmFyIG1vbFBBUl9NSiA9IHR5cGVvZiBtb2xQQVJfTUogIT09ICd1bmRlZmluZWQnID9cbiAgICAgICAgICAgICAgICAgICAgbW9sUEFSX01KIDogY29uc3RhbnQoJ21vbFBBUl9NSicpO1xuXG4gIHJldHVybiBkYXRlX3JhZCAqIGNvbnN0YW50KCdkYXlzX3Blcl9tb250aCcpICogbW9sUEFSX01KO1xufVxuXG4vKipcbnVuaXRzPSdtZXRyaWMgdG9ucyBEcnkgTWF0dGVyL2hhJyxcbmRlc2NyaXB0aW9uPSdtYXhpbXVtIHBvdGVudGlhbCBQcmltYXJ5IFByb2R1Y3Rpb24gW3RETSAvIGhhIG1vbnRoXSxcbk5PVEU6IDEwMDAwLzEwXjYgW2hhL20yXVt0RG0vZ0RNXVxuZ0dNX21vbCBbZy9tb2xdIGlzIHRoZSBtb2xlY3VsYXIgd2VpZ2h0IG9mIGRyeSBtYXR0ZXJcbkBtZXRob2QgeFBQXG5AcGFyYW0geVxuQHBhcmFtIGN1cl9QQVJcbkBwYXJhbSBnRE1fbW9sXG4qL1xubW9kdWxlLmV4cG9ydHMueFBQID0gZnVuY3Rpb24oeSwgY3VyX1BBUiwgZ0RNX21vbCl7XG4gICAgZ0RNX21vbCA9IHR5cGVvZiBnRE1fbW9sICE9PSAndW5kZWZpbmVkJyA/XG4gICAgZ0RNX21vbCA6IGNvbnN0YW50KCdnRE1fbW9sJyk7XG4gICAgcmV0dXJuIHkgKiBjdXJfUEFSICogZ0RNX21vbCAvIDEwMDtcbn1cblxuLyoqKiBGVU5DVElPTlMgRk9SIENPUFBJQ0lORyAqL1xuLyoqXG5jb3BwaWNlIHJlbGF0ZWQgZnVuY3Rpb25zXG5AbWV0aG9kIGNvcHBpY2VcbiovXG5tb2R1bGUuZXhwb3J0cy5jb3BwaWNlID0ge1xuICAvLyBDb3BwaWNlIEZ1bmN0aW9ucyBhcmUgYmFzZWQgb24gRGlhbWV0ZXIgb24gU3R1bXAsIE5PVCBEQkguXG4gIC8vIENhbGN1bGF0ZXMgdGhlIHBmcyBiYXNlZCBvbiB0aGUgc3RlbSB3ZWlnaHQgaW4gS0dcbiAgcGZzIDogZnVuY3Rpb24oc3RlbSwgcCkge1xuICAgIHZhciBhdkRPQiA9IE1hdGgucG93KCAoIHN0ZW0gLyBwLnN0ZW1DbnQgLyBwLnN0ZW1DKSAsICgxIC8gcC5zdGVtUCkgKTtcbiAgICB2YXIgcHBmcz0gcC5wZnNDICogTWF0aC5wb3coYXZET0IgLCBwLnBmc1ApO1xuXG4gICAgcmV0dXJuIE1hdGgubWluKHAucGZzTXgscHBmcyk7XG4gIH0sXG5cbiAgLy8gQ2FsY3VsYXRlcyB0aGUgcGZzIGJhc2VkIG9uIHN0ZW0gd2l0aCBpbiBHLiAgVXNlcyB2b2x1bWUgSW5kZXggYXMgZ3VpZGVcbiAgcGZzX3ZpYV9WSSA6IGZ1bmN0aW9uIChzdGVtRywgd3NWSSwgbGFWSSwgU0xBKSB7XG4gICAgaWYgKHN0ZW1HIDwgMTApIHtcbiAgICAgIHN0ZW1HPTEwO1xuICAgIH1cbiAgICB2YXIgVkkgPSBNYXRoLnBvdyggKHN0ZW1HIC8gd3NWSS5zdGVtc19wZXJfc3R1bXAgLyB3c1ZJLmNvbnN0YW50KSwoMSAvIHdzVkkucG93ZXIpICk7XG5cbiAgICAvLyBBZGQgdXAgZm9yIGFsbCBzdGVtc1xuICAgIHZhciBsYSA9IGxhVkkuY29uc3RhbnQgKiBNYXRoLnBvdyhWSSxsYVZJLnBvd2VyKSAqIHdzVkkuc3RlbXNfcGVyX3N0dW1wO1xuICAgIHZhciB3ZiA9IDEwMDAgKiAobGEgLyBTTEEpOyAgLy8gRm9pbGFnZSBXZWlnaHQgaW4gZztcbiAgICB2YXIgcGZzID0gd2Yvc3RlbUc7XG4gICAgcmV0dXJuIHBmcztcbiAgfSxcblxuICBSb290UCA6IGZ1bmN0aW9uKGN1cl9ucHAsIGN1cl9ucHBUYXJnZXQsIFdSLFcscFJ4LGZyYWMpIHtcbiAgICB2YXIgbnBwUmVzID0gY3VyX25wcFRhcmdldCAtIGN1cl9ucHA7XG4gICAgdmFyIHJvb3RQUDtcbiAgICBpZiggbnBwUmVzID4gMCAmJiBXUi9XID4gcFJ4ICkge1xuICAgICAgICByb290UFAgPSBNYXRoLm1pbihucHBSZXMsIFdSKihXUi9XIC0gcFJ4KSpmcmFjKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcm9vdFBQID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gcm9vdFBQO1xuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlYWQgOiBmdW5jdGlvbihtb2RlbCkge1xuICAgIC8vIFRPRE8gOiBpbXBsZW1lbnRcbiAgICAvLyBZb3UgbmVlZCB0byBzZXQgeW91ciBJTyBoZXJlIGFuZCBtYWtlIHN1cmUgYWxsIHBhcmFtZXRlcnMgZm9yIG1vZGVsIGFyZSBjb3JyZWN0bHkgc2V0XG4gIH0sXG4gIGR1bXAgOiBmdW5jdGlvbigpIHtcbiAgICAvLyBUT0RPIDogaW1wbGVtZW50XG4gIH1cbn07XG4iLCJ2YXIgZm4gPSByZXF1aXJlKCcuL2ZuJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgZGF0YU1vZGVsID0gcmVxdWlyZSgnLi9kYXRhTW9kZWwnKTtcblxuZnVuY3Rpb24gcnVuKGxlbmd0aE9mR3Jvd3RoKSB7XG5cbiAgICB2YXIgeWVhclRvQ29wcGljZTsgLy95ZWFyIG9mIHRoZSBmaXJzdCBvciBzdWJzZXF1ZW50IGhhcnZlc3RzXG4gICAgdmFyIGNvcHBpY2VJbnRlcnZhbDsgLy90aGUgIyBvZiBtb250aHMgaW4gYSBzaW5nbGUgY29wcGljZSBjeWNsZVxuICAgIHZhciBtb250aFRvQ29wcGljZTsgLy9hdCB3aGljaCBtb250aCB0aGUgaGFydmVzdCBpcyB0byBiZSBwZXJmb3JtZWQgOjogY3VycmVudGx5IHRoZSB0cmVlIHdpbGwgYmUgY3V0IGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhhdCBtb250aFxuXG4gICAgLy9SZWFkIHRoZSBpbnB1dCBwYXJhbWV0ZXJzIGludG8gb2JqZWN0IDIgZnVuY3Rpb25zIGNhbiBiZSBjb21iaW5lZCBpbnRvIDEuXG4gICAgLy92YXIgcGxhbnRhdGlvbiA9IHt9O1xuXG4gICAgLy90aGlzLmlvLnJlYWRBbGxDb25zdGFudHMocGxhbnRhdGlvbik7IC8vYm90aCB0cmVlIGNvbnN0YW50cyBhbmQgcGxhbnRhdGlvbi9tYW5hZ2VtZW50IGNvbnN0YW50c1xuXG5cbiAgICB0aGlzLmlvLnJlYWQodGhpcyk7XG4gICAgLy90aGlzLmlvLnJlYWRXZWF0aGVyKHdlYXRoZXJNYXAsIHBsYW50aW5nUGFyYW1zLCBjdXN0b21XZWF0aGVyTWFwKTsgLy9hdCB0aGlzIHBvaW50IHdlYXRoZXIgbWFwIGlzIGEgbWFwIG9mIHdlYXRoZXIganNvbiBvYmplY3RzLCBpbmRleGVkIGF0IG1vbnRoIDBcbiAgICAvL2Fsc28gcmVhZHMgaW4gdGhlIG1hbmFnZSBzdHVmZiAoZGF0ZSBjb3BwaWNlLCBldGMpIGFuZCBzb2lsIHBhcmFtZXRlcnMuXG5cbiAgICB0aGlzLmN1cnJlbnREYXRlID0gdGhpcy5wbGFudGluZ1BhcmFtc1tcImRhdGVQbGFudGVkXCJdO1xuXG4gICAgdmFyIHBsYW50ZWRNb250aCA9IHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKTtcbiAgICB2YXIgY3VycmVudE1vbnRoID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpO1xuXG5cbiAgICAvL1RPRE86IHRlc3Qgbm8gZGF0ZWNvcHBpY2UgYXMgaW5wdXRcbiAgICBpZiAoIHRoaXMucGxhbnRpbmdQYXJhbXNbXCJkYXRlQ29wcGljZWRcIl0gIT0gdW5kZWZpbmVkICl7XG4gICAgICB5ZWFyVG9Db3BwaWNlID0gdGhpcy5wbGFudGluZ1BhcmFtc1tcImRhdGVDb3BwaWNlZFwiXS5nZXRZZWFyKCk7XG4gICAgICBtb250aFRvQ29wcGljZSA9IHRoaXMucGxhbnRpbmdQYXJhbXNbXCJkYXRlQ29wcGljZWRcIl0uZ2V0TW9udGgoKTtcbiAgICAgIGNvcHBpY2VJbnRlcnZhbCA9IHRoaXMucGxhbnRpbmdQYXJhbXNbXCJ5ZWFyc1BlckNvcHBpY2VcIl07XG4gICAgICB3aWxsQ29wcGljZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5tYW5hZ2UuY29wcGljZSA9IGZhbHNlO1xuXG4gICAgdmFyIHN0ZXAgPSAwO1xuXG4gICAgdmFyIHNldHVwID0ge1xuICAgICAgbGVuZ3RoT2ZHcm93dGggOiBsZW5ndGhPZkdyb3d0aCxcbiAgICAgIHN0ZXAgOiAwLFxuICAgICAgcGxhbnRlZE1vbnRoIDogcGxhbnRlZE1vbnRoLFxuICAgICAgY3VycmVudERhdGUgOiB0aGlzLmN1cnJlbnREYXRlLFxuICAgICAgY3VycmVudE1vbnRoIDogY3VycmVudE1vbnRoLFxuICAgICAgeWVhclRvQ29wcGljZSA6IHllYXJUb0NvcHBpY2UsXG4gICAgICBtb250aFRvQ29wcGljZSA6IG1vbnRoVG9Db3BwaWNlLFxuICAgICAgY29wcGljZUludGVydmFsIDogY29wcGljZUludGVydmFsXG4gICAgfVxuXG4gICAgdGhpcy5ydW5TZXR1cChzZXR1cCk7XG59XG5cbmZ1bmN0aW9uIHJ1blNldHVwKHNldHVwKXtcbiAgICB2YXIgbSA9IChzZXR1cC5jdXJyZW50TW9udGgrMSkrJyc7XG4gICAgaWYoIG0ubGVuZ3RoID09IDEgKSBtID0gJzAnK207XG5cbiAgICB2YXIgd2VhdGhlclRoaXNNb250aDtcbiAgICBpZiggdGhpcy5jdXN0b21fd2VhdGhlcltzZXR1cC5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttXSApIHtcbiAgICBcdHdlYXRoZXJUaGlzTW9udGggPSB0aGlzLmN1c3RvbV93ZWF0aGVyW3NldHVwLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK21dO1xuICAgIH0gZWxzZSB7XG4gICAgXHR3ZWF0aGVyVGhpc01vbnRoID0gdGhpcy53ZWF0aGVyW3NldHVwLmN1cnJlbnRNb250aF07XG4gICAgfVxuXG4gICAgdmFyIGZpcnN0TW9udGhSZXN1bHRzID0gdGhpcy5pbml0KHRoaXMucGxhbnRhdGlvbiwgdGhpcy5zb2lsKTtcblxuICAgIHZhciBrZXlzSW5PcmRlcj1bXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5wbGFudGF0aW9uX3N0YXRlKXtcbiAgICAgIGtleXNJbk9yZGVyLnB1c2goa2V5KTtcbiAgICB9XG5cbiAgICBmaXJzdE1vbnRoUmVzdWx0cy5EYXRlID0gKHNldHVwLmN1cnJlbnREYXRlLmdldE1vbnRoKCkrMSkgKyBcIi9cIiArIHNldHVwLmN1cnJlbnREYXRlLmdldFllYXIoKTtcblxuICAgIHZhciByb3dzID0gW107IC8vdGhlc2Ugd2lsbCBiZWNvbWUgcm93c1xuXG4gICAgdXRpbHMubG9nKFwiUmVzdWx0cyBvZiB0aGUgZmlyc3QgbW9udGg6IFwiICtmaXJzdE1vbnRoUmVzdWx0cyk7XG5cbiAgICByb3dzLnB1c2goa2V5c0luT3JkZXIpO1xuXG4gICAgdmFyIGZpcnN0Um93ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzSW5PcmRlci5sZW5ndGg7IGkrKyl7XG4gICAgICB2YXIga2V5ID0ga2V5c0luT3JkZXJbaV07XG4gICAgICB1dGlscy5sb2coa2V5ICArIFwiOiBcIiArIGZpcnN0TW9udGhSZXN1bHRzW2tleV0pO1xuICAgICAgZmlyc3RSb3cucHVzaChmaXJzdE1vbnRoUmVzdWx0c1trZXldKTtcbiAgICB9XG5cbiAgICByb3dzLnB1c2goZmlyc3RSb3cpO1xuXG4gICAgdmFyIGN1cnJlbnRNb250aFJlc3VsdHMgPSBmaXJzdE1vbnRoUmVzdWx0cztcbiAgICB2YXIgbmV4dE1vbnRoUmVzdWx0cztcblxuICAgIGZvciAodmFyIHN0ZXAgPSAxOyBzdGVwIDwgc2V0dXAubGVuZ3RoT2ZHcm93dGg7IHN0ZXArKykge1xuICAgICAgc2V0dXAuY3VycmVudERhdGUuc2V0TW9udGgoc2V0dXAuY3VycmVudERhdGUuZ2V0TW9udGgoKSArIDEpOyAvLyBhZGQgYSBtb250aCB0byBjdXJyZW50IGRhdGVcblxuICAgICAgdXRpbHMubG9nKFwiY3VycmVudERhdGUgPSBcIiArIHNldHVwLmN1cnJlbnREYXRlKTtcbiAgICAgIHNldHVwLmN1cnJlbnRNb250aCA9IHNldHVwLmN1cnJlbnREYXRlLmdldE1vbnRoKCk7XG5cbiAgICAgIC8vVE9ETzogZmlndXJlIG91dCB3aWxsQ29wcGljZSBmdW5jdGlvbmFsaXR5XG4gICAgICBpZiAoc2V0dXAuY3VycmVudERhdGUuZ2V0WWVhcigpID09IHNldHVwLnllYXJUb0NvcHBpY2UgJiYgc2V0dXAuY3VycmVudE1vbnRoID09IHNldHVwLm1vbnRoVG9Db3BwaWNlKXtcbiAgICAgICAgdXRpbHMubG9nKFwiVGltZSB0byBDb3BwaWNlIVwiKTtcbiAgICAgICAgdGhpcy5tYW5hZ2UuY29wcGljZSA9IHRydWU7XG4gICAgICAgIC8vVE9ETzogdXBkYXRlIHRyZWVzXG5cblxuICAgICAgICBzZXR1cC55ZWFyVG9Db3BwaWNlID0gc2V0dXAueWVhclRvQ29wcGljZSArIHNldHVwLmNvcHBpY2VJbnRlcnZhbDsgLy9uZXh0IGNvcHBpY2UgeWVhclxuXG4gICAgICAgIHJvd3MucHVzaChrZXlzSW5PcmRlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1hbmFnZS5jb3BwaWNlID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIG0gPSAoc2V0dXAuY3VycmVudE1vbnRoKzEpKycnO1xuICAgICAgaWYoIG0ubGVuZ3RoID09IDEgKSB7XG4gICAgICAgIG0gPSAnMCcrbTtcbiAgICAgIH1cblxuICAgICAgdmFyIHdlYXRoZXJUaGlzTW9udGg7XG5cdCAgICBpZiggdGhpcy5jdXN0b21fd2VhdGhlcltzZXR1cC5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttXSApIHtcblx0ICAgIFx0d2VhdGhlclRoaXNNb250aCA9IHRoaXMuY3VzdG9tX3dlYXRoZXJbc2V0dXAuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSsnLScrbV07XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHR3ZWF0aGVyVGhpc01vbnRoID0gdGhpcy53ZWF0aGVyW3NldHVwLmN1cnJlbnRNb250aF07XG5cdCAgICB9XG5cbiAgICAgIG5leHRNb250aFJlc3VsdHMgPSBzaW5nbGVTdGVwKHRoaXMucGxhbnRhdGlvbiwgdGhpcy5zb2lsLCB3ZWF0aGVyVGhpc01vbnRoLCB0aGlzLm1hbmFnZSwgY3VycmVudE1vbnRoUmVzdWx0cyk7IC8vVE9ETzogc3dpdGNoIHVwIHRyZWVzIGhlcmUgd2hlbiBhZnRlciB0aGUgZmlyc3QgaGFydmVzdFxuXG4gICAgICBuZXh0TW9udGhSZXN1bHRzLkRhdGUgPSAoc2V0dXAuY3VycmVudERhdGUuZ2V0TW9udGgoKSsxKSAgKyBcIi9cIiArIHNldHVwLmN1cnJlbnREYXRlLmdldFllYXIoKTtcbiAgICAgIHV0aWxzLmxvZyhcIlxcbiBSZXN1bHRzIG9mIHRoZSBuZXh0IG1vbnRoOiBcIiArIG5leHRNb250aFJlc3VsdHMpO1xuXG4gICAgICB2YXIgdGhpc1JvdyA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzSW5PcmRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIga2V5ID0ga2V5c0luT3JkZXJbaV07XG4gICAgICAgIHV0aWxzLmxvZygga2V5ICArIFwiOiBcIiArIG5leHRNb250aFJlc3VsdHNba2V5XSk7XG4gICAgICAgIHRoaXNSb3cucHVzaChuZXh0TW9udGhSZXN1bHRzW2tleV0pO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50TW9udGhSZXN1bHRzID0gbmV4dE1vbnRoUmVzdWx0cztcbiAgICAgIHJvd3MucHVzaCh0aGlzUm93KTtcbiAgICB9XG5cbiAgICB0aGlzLmlvLmR1bXAocm93cyk7XG5cbiAgICByZXR1cm4gcm93cztcbn1cblxuZnVuY3Rpb24gc2luZ2xlU3RlcChwbGFudGF0aW9uLCBzb2lsLCB3ZWF0aGVyLCBtYW5hZ2UsIHApIHsgLy9wID0gcHJldmlvdXMgc3RhdGVcbiAgdmFyIGMgPSB7fTsgLy9jdXJyZW50IHN0YXRlXG5cbiAgaWYoIG1hbmFnZS5jb3BwaWNlID09PSB0cnVlICkgeyAvL2NoYW5nZSB0aGlzIGd1eSBmb3IgdGhlIG1vbnRoIHdoZW4gY29wcGljZVxuICAgIC8vIEFkZCBpbiBhIHN0dW1wIG1hcmdpbi4uLi5cbiAgICBjLmZlZWRzdG9ja0hhcnZlc3QgPSBwLmZlZWRzdG9ja0hhcnZlc3QgKyBwLldTO1xuICAgIGMuY29wcGljZUNvdW50ID0gcC5jb3BwaWNlQ291bnQgKyAxO1xuICAgIGMuY29wcGljZUFnZSA9IDA7XG4gICAgcC5MQUk9MDtcbiAgICBwLldTID0gMDtcbiAgICBwLldGID0gMDtcbiAgICBwLlcgPSBwLldSO1xuICB9IGVsc2Uge1xuICAgIGMuZmVlZHN0b2NrSGFydmVzdCA9IHAuZmVlZHN0b2NrSGFydmVzdDtcbiAgICBjLmNvcHBpY2VDb3VudCA9IHAuY29wcGljZUNvdW50O1xuICAgIGMuY29wcGljZUFnZSA9IHAuY29wcGljZUFnZSArIDEuMC8xMjtcbiAgfVxuXG4gIHZhciB0cmVlOyAvL3RyZWVcbiAgaWYoIGMuY29wcGljZUNvdW50ID09PSAwICkgeyAvL1RPRE86IGNoZWNrIHRoZSBjYXNlIHdoZXJlIHdlIHN0YXJ0IHdpdGggYSBjb3BwaWNlZCBtdWx0aSBzdHVtcCB0cmVlXG4gICAgICB0cmVlID0gcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWU7XG4gIH0gZWxzZSB7XG4gICAgICB0cmVlID0gcGxhbnRhdGlvbi5jb3BwaWNlZFRyZWU7XG4gIH1cblxuICBjLlN0YW5kQWdlID0gcC5TdGFuZEFnZSsxLjAvMTI7XG4gIHZhciBzbGEgPSBmbi50ZHAocC5TdGFuZEFnZSx0cmVlLlNMQSk7XG4gIGMuTEFJID0gcC5XRiAqIDAuMSAqIHNsYTsgLy8gTGFuZHNidXJnIGVxIDkuNVxuICBjLlZQRCA9IGZuLlZQRCh3ZWF0aGVyLnRtaW4sIHdlYXRoZXIudG1heCwgd2VhdGhlci50ZG1lYW4pO1xuICBjLmZWUEQgPSBmbi5mVlBEKHRyZWUua0csIGMuVlBEKTtcblxuICBjLmZTVyA9IGZuLmZTVyhwLkFTVywgc29pbC5tYXhBV1MsIHNvaWwuc3djb25zdCwgc29pbC5zd3Bvd2VyKTtcbiAgYy5mQWdlPWZuLnRkcChwLlN0YW5kQWdlLHRyZWUuZkFnZSk7XG4gIGMuZkZyb3N0ID0gZm4uZkZyb3N0KHdlYXRoZXIudG1pbik7XG4gIGMuUEFSID0gZm4uUEFSKHdlYXRoZXIucmFkKTtcbiAgYy5mVCA9IGZuLmZUKCh3ZWF0aGVyLnRtaW4rd2VhdGhlci50bWF4KS8yLCB0cmVlLmZUKTtcbiAgYy54UFAgPSBmbi54UFAodHJlZS55LCBjLlBBUik7XG4gIGMuUGh5c01vZCA9IGZuLlBoeXNNb2QoYy5mVlBELCBjLmZTVywgYy5mQWdlKTtcbiAgYy5mTnV0cj1mbi5mTnV0cih0cmVlLmZOMCwgbWFuYWdlLmZlcnRpbGl0eSk7XG4gIGMuTlBQID0gZm4uTlBQKHAuY29wcGljZUFnZSwgdHJlZS5mdWxsQ2FuQWdlLCBjLnhQUCwgdHJlZS5rLCBwLkxBSSwgYy5mVlBELCBjLmZTVywgYy5mQWdlLCB0cmVlLmFscGhhLCBjLmZOdXRyLCBjLmZULCBjLmZGcm9zdCk7XG5cbiAgdmFyIE5QUF90YXJnZXQgPSBmbi5OUFAodHJlZS5mdWxsQ2FuQWdlLCB0cmVlLmZ1bGxDYW5BZ2UsIGMueFBQLCB0cmVlLmssIHRyZWUucm9vdFAuTEFJVGFyZ2V0LCBjLmZWUEQsIGMuZlNXLCBjLmZBZ2UsIHRyZWUuYWxwaGEsIGMuZk51dHIsIGMuZlQsIGMuZkZyb3N0KTtcbiAgYy5Sb290UCA9IGZuLmNvcHBpY2UuUm9vdFAoYy5OUFAsIE5QUF90YXJnZXQsIHAuV1IsIHAuVywgdHJlZS5wUi5teCx0cmVlLnJvb3RQLmZyYWMpO1xuXG4gIGlmICh0cmVlLmxhVkkgJiYgdHJlZS5sYVZJLmNvbnN0YW50ICkgeyAvLyBUZXN0IGZvciB0aGF0IGZ1bmN0aW9uXG4gICAgYy5wZnMgPSBmbi5jb3BwaWNlLnBmc192aWFfVkkocC5XUyoxMDAwMDAwL3BsYW50YXRpb24uU3RvY2tpbmdEZW5zaXR5LCB0cmVlLndzVkksdHJlZS5sYVZJLHNsYSk7XG4gIH0gZWxzZSB7XG4gICAgYy5wZnMgPSBmbi5jb3BwaWNlLnBmcyhwLldTKjEwMDAvcGxhbnRhdGlvbi5TdG9ja2luZ0RlbnNpdHksIHRyZWUucGZzKTtcbiAgfVxuXG4gIGMuZFcgPSBjLk5QUCt0cmVlLnJvb3RQLmVmZmljaWVuY3kqYy5Sb290UDtcblxuICBjLkludGNwdG4gPSBmbi5JbnRjcHRuKGMuTEFJLCB0cmVlLkludGNwdG4pO1xuICBjLkNhbkNvbmQgPSBmbi5DYW5Db25kKGMuUGh5c01vZCwgYy5MQUksIHRyZWUuQ29uZHVjdGFuY2UpO1xuXG4gIGMucFIgPSBmbi5wUihjLlBoeXNNb2QscC5XUi9wLlcsbWFuYWdlLmZlcnRpbGl0eSx0cmVlLnBSKTtcbiAgYy5saXR0ZXJmYWxsPWZuLnRkcChwLlN0YW5kQWdlLHRyZWUubGl0dGVyZmFsbCk7XG5cbiAgYy5UcmFuc3AgPSBmbi5UcmFuc3Aod2VhdGhlci5yYWQsIHdlYXRoZXIuZGF5bGlnaHQsIGMuVlBELCB0cmVlLkJMY29uZCwgYy5DYW5Db25kKTtcblxuICAvLyBDYWxjdWxhdGVkIGZyb20gcGZzXG4gIGMucFMgPSAoMSAtIGMucFIpIC8gKDEgKyBjLnBmcyApO1xuICBjLnBGID0gKDEgLSBjLnBSKSAvICgxICsgMS9jLnBmcyApO1xuXG4gIGMuSXJyaWcgPSBmbi5JcnJpZyhtYW5hZ2UuaXJyaWdGcmFjLCBjLlRyYW5zcCwgYy5JbnRjcHRuLCB3ZWF0aGVyLnBwdCk7XG4gIGMuQ3VtSXJyaWcgPSBwLkN1bUlycmlnICsgYy5JcnJpZztcblxuICBjLkFTVyA9IGZuLkFTVyhzb2lsLm1heEFXUywgcC5BU1csIHdlYXRoZXIucHB0LCBjLlRyYW5zcCwgYy5JbnRjcHRuLCBjLklycmlnKTsgLy9mb3Igc29tZSByZWFzb24gc3BlbGxlZCBtYXhBV1NcblxuICBjLldGID0gcC5XRiArIGMuZFcgKiBjLnBGIC0gYy5saXR0ZXJmYWxsICogcC5XRjtcbiAgLy8gSW5jbHVkZSBjb250cmlidXRpb24gb2YgUm9vdFAgLy8gRXJyb3IgaW4gb2xkIGNvZGUgIVxuICBjLldSID0gcC5XUiArIGMuZFcgKiBjLnBSIC0gdHJlZS5wUi50dXJub3ZlciAqIHAuV1IgLSBjLlJvb3RQO1xuICBjLldTID0gcC5XUyArIGMuZFcgKiBjLnBTO1xuICBjLlcgPSBjLldGK2MuV1IrYy5XUztcblxuICByZXR1cm4gYztcbn1cblxuZnVuY3Rpb24gaW5pdChwbGFudGF0aW9uLCBzb2lsKSB7XG4gIHZhciBwID0ge307XG4gIHZhciB0cmVlID0gcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWU7IC8vVE9ETzogZGVjaWRlIHRoZSBjYXNlIHdoZXJlIHdlIHN0YXJ0IHdpdGggYSBjb3BwaWNlZCB0cmVlP1xuXG4gIHAuZmVlZHN0b2NrSGFydmVzdD0wO1xuICBwLmNvcHBpY2VDb3VudD0wO1xuICBwLmNvcHBpY2VBZ2UgPSAwO1xuXG4gIHAuQ3VtSXJyaWcgPTA7XG4gIHAuZFcgPSAwO1xuICBwLlcgPSB0aGlzLnBsYW50YXRpb24uU3RvY2tpbmdEZW5zaXR5ICogdGhpcy5wbGFudGF0aW9uLlNlZWRsaW5nTWFzcztcbiAgcC5XRiA9IHRoaXMucGxhbnRhdGlvbi5wRiAqIHAuV1xuICBwLldTID0gdGhpcy5wbGFudGF0aW9uLnBTICogcC5XO1xuICBwLldSID0gdGhpcy5wbGFudGF0aW9uLnBSICogcC5XO1xuICBwLkFTVyA9IDAuOCAqIDEwICogdGhpcy5zb2lsLm1heEFXUzsgLy8gVGhlIDEwIGlzIGJlY2F1c2UgbWF4QVdTIGlzIGluIGNtIGFuZCBBU1cgaW4gbW0gKD8pIFdoeSAoPylcbiAgcC5TdGFuZEFnZSA9IDA7XG5cbiAgdmFyIHRyZWUgPSB0aGlzLnBsYW50YXRpb24uc2VlZGxpbmdUcmVlO1xuXG4gIC8vIHNsYSA9IFNwZWNpZmljIExlYWYgQXJlYVxuICB2YXIgc2xhID0gZm4udGRwKHAuU3RhbmRBZ2UsdHJlZS5TTEEpO1xuXG4gIHAuTEFJID0gcC5XRiAqIDAuMSAqIHNsYTsgLy8gTGFuZHNidXJnIGVxIDkuNVxuXG4gIC8vIFRoZXNlIGFyZW4ndCB1c2VkIHNvIGNhbiBiZSBzZXQgdG8gYW55dGhpbmc7ICBUaGV5IGFyZSBzZXQgdG8gbWF0Y2ggdGhlIHBvc3RncmVzIHR5cGVcbiAgcC5WUEQ9MDtcbiAgcC5mVlBEPTA7XG4gIHAuZlQgPTA7XG4gIHAuZkZyb3N0ID0gMDtcbiAgcC5mTnV0cj0wO1xuICBwLmZTVz0wO1xuICBwLmZBZ2U9MDtcbiAgcC5QQVIgPSAwO1xuICBwLnhQUCA9IDA7XG4gIHAuSW50Y3B0biA9IDA7XG4gIHAuSXJyaWcgPSAwO1xuICBwLkNhbkNvbmQgPSAwO1xuICBwLlRyYW5zcCA9IDA7XG4gIHAuUGh5c01vZCA9IDA7XG4gIHAucGZzID0gMDtcbiAgcC5wUj0wO1xuICBwLnBTPTA7XG4gIHAucEY9MDtcbiAgcC5saXR0ZXJmYWxsID0gMDtcbiAgcC5OUFAgPSAwO1xuICBwLlJvb3RQID0gMDtcbiAgcmV0dXJuIHA7XG59O1xuXG5mdW5jdGlvbiBnZXRGdW5jdGlvbihuYW1lKSB7XG4gIGlmKCBmbltuYW1lXSApIHJldHVybiBmbltuYW1lXTtcbiAgaWYoIGZuLmNvcHBpY2VbbmFtZV0gKSByZXR1cm4gZm4uY29wcGljZVtuYW1lXTtcbiAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW8pIHtcbiAgcmV0dXJuIHtcbiAgICBpbyA6IGlvLFxuICAgIHJ1biA6IHJ1bixcbiAgICBzaW5nbGVTdGVwIDogc2luZ2xlU3RlcCxcbiAgICBydW5TZXR1cCA6IHJ1blNldHVwLFxuICAgIGluaXQgOiBpbml0LFxuICAgIGdldEZ1bmN0aW9uIDogZ2V0RnVuY3Rpb24sXG4gICAgc2V0SU8gOiBmdW5jdGlvbihpbykge1xuICAgICAgdGhpcy5pbyA9IGlvO1xuICAgIH0sXG4gICAgZ2V0RGF0YU1vZGVsIDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZGF0YU1vZGVsO1xuICAgIH1cbiAgfTtcbn07XG4iLCJmdW5jdGlvbiBlbnYoKSB7XG4gIGlmKCB0eXBlb2YgcGx2OCAhPT0gJ3VuZGVmaW5lZCcgKSByZXR1cm4gXCJwbHY4XCI7XG4gIGlmKCB0eXBlb2YgTG9nZ2VyICE9PSAndW5kZWZpbmVkJyApIHJldHVybiBcImFwcHNjcmlwdFwiO1xuICBpZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHJldHVybiBcIm5vZGVcIjtcbn1cblxuZnVuY3Rpb24gbG9nKG1zZykge1xuICBpZiggZW52KCkgPT0gXCJwbHY4XCIgKSBwbHY4LmVsb2coTk9USUNFLCAnbm90aWNlJywgbXNnKTtcbiAgaWYoIGVudigpID09IFwiYXBwc2NyaXB0XCIgKSBMb2dnZXIubG9nKG1zZyk7XG59XG5cbmZ1bmN0aW9uIGNsb25lKG9iaikge1xuICBpZiAobnVsbCA9PSBvYmogfHwgXCJvYmplY3RcIiAhPSB0eXBlb2Ygb2JqKSByZXR1cm4gb2JqO1xuICB2YXIgY29weSA9IG9iai5jb25zdHJ1Y3RvcigpO1xuICBmb3IgKHZhciBhdHRyIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoYXR0cikpIGNvcHlbYXR0cl0gPSBvYmpbYXR0cl07XG4gIH1cbiAgcmV0dXJuIGNvcHk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBlbnYgOiBlbnYsXG4gIGxvZyA6IGxvZyxcbiAgY2xvbmUgOiBjbG9uZVxufVxuIl19
