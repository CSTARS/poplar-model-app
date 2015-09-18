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
	modelIO.app = this;
	modelIO.model = model;
	inputForm = require('./inputForm')(this);
	charts = require('./charts');
	charts.setApp(this);

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
	runComplete : runComplete
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
  function init(callback) {

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
      data = m3PGIO.exportSetup();
    } else if ( saveMimeType == TREE_MIME_TYPE ) {
      data = m3PGIO.exportSetup().tree;
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
      data = m3PGIO.exportSetup();
    } else if ( saveMimeType == TREE_MIME_TYPE ) {
      file = loadedTree;
      data = m3PGIO.exportSetup().tree;
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
        m3PGIO.loadSetup(id, file);

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
        m3PGIO.loadTree(file);

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
      m3PGIO.loadSetup(metadata.id, file);

      // setup realtime events
      gdriveRT.initRtApi(loadedFile);
    } else if ( metadata.mimeType == TREE_MIME_TYPE ) { // we loaded a tree
      // set the loaded tree id
      loadedTree = metadata.id;

      // show the share btn
      $("#share-tree-btn").show();
      $("#loaded-tree-name").html(metadata.title).parent().show();

      // set the loaded tree
      m3PGIO.loadTree(file);

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

        // TODO: this needs works ...
        // see if there are active changes to the model
        /*if( users.length > 0 && JSON.stringify(m3PGIO.exportSetup()) != rtJson.getText() ) {
          // let things settle
          setTimeout(function(){
            if( confirm("There are active changes to this model, would you like to load them?") ) {
              var data = JSON.parse(rtJson.getText());
              m3PGIO.loadSetup(loadedFile, data, true);
            }
          }, 2000);
        }*/

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
      m3PGIO.loadSetup(loadedFile, data, true);
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
    if( rtJson ) rtJson.setText(JSON.stringify( m3PGIO.exportSetup() ));
  }

module.exports = {
  runModelRt : runModelRt,
  initRtApi  : initRtApi
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
          charts.unselectAll();
          for ( var i = 0; i < setup.config.chartTypeInput.length; i++) {
              charts.select(setup.config.chartTypeInput[i]);
          }
      }
      if (setup.config.currentLocation) {
          $("#current-location").html(setup.config.currentLocation);
      }
      if( setup.config.loadedTree ) {
          $("#loaded-tree-name").html(setup.config.loadedTree).parent().show();
      }

      // load weather
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

      if( setup.custom_weather ) {
          this.model.custom_weather = setup.custom_weather;
      } else {
          this.model.custom_weather = {};
      }

      // create the chart
      inputForm.updateAverageChart();

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
      this.model.runModel(isRt);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc2xpYi9hcHAuanMiLCJqc2xpYi9jaGFydHMuanMiLCJqc2xpYi9leHBvcnQuanMiLCJqc2xpYi9mbGFzaEJsb2NrLWRldGVjdG9yLmpzIiwianNsaWIvZ2RyaXZlLmpzIiwianNsaWIvZ2RyaXZlUlQuanMiLCJqc2xpYi9pbnB1dEZvcm0uanMiLCJqc2xpYi9tb2RlbElPLmpzIiwianNsaWIvb2F1dGguanMiLCJqc2xpYi9vZmZsaW5lLmpzIiwianNsaWIvb3V0cHV0RGVmaW5pdGlvbnMuanMiLCJqc2xpYi93ZWF0aGVyRmlsZVJlYWRlci5qcyIsIm5vZGVfbW9kdWxlcy9wb3BsYXItM3BnLW1vZGVsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9jb25zdGFudHMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC9tYW5hZ2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3BsYW50YXRpb24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3BsYW50YXRpb25fc3RhdGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3NvaWwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvY29uZHVjdGFuY2UuanMiLCJub2RlX21vZHVsZXMvcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvZmFnZS5qcyIsIm5vZGVfbW9kdWxlcy9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9mdC5qcyIsIm5vZGVfbW9kdWxlcy9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvdHJlZS9pbnRjcHRuLmpzIiwibm9kZV9tb2R1bGVzL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL2xpdHRlcmZhbGwuanMiLCJub2RlX21vZHVsZXMvcG9wbGFyLTNwZy1tb2RlbC9saWIvZGF0YU1vZGVsL3RyZWUvcGZzLmpzIiwibm9kZV9tb2R1bGVzL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL3ByLmpzIiwibm9kZV9tb2R1bGVzL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL3Jvb3RwLmpzIiwibm9kZV9tb2R1bGVzL3BvcGxhci0zcGctbW9kZWwvbGliL2RhdGFNb2RlbC90cmVlL3NsYS5qcyIsIm5vZGVfbW9kdWxlcy9wb3BsYXItM3BnLW1vZGVsL2xpYi9kYXRhTW9kZWwvd2VhdGhlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wb3BsYXItM3BnLW1vZGVsL2xpYi9mbi5qcyIsIm5vZGVfbW9kdWxlcy9wb3BsYXItM3BnLW1vZGVsL2xpYi9pby5qcyIsIm5vZGVfbW9kdWxlcy9wb3BsYXItM3BnLW1vZGVsL2xpYi9ydW4uanMiLCJub2RlX21vZHVsZXMvcG9wbGFyLTNwZy1tb2RlbC9saWIvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2ZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3QrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDclNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3piQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1WkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgZ2RyaXZlID0gcmVxdWlyZSgnLi9nZHJpdmUnKTtcbnZhciBjaGFydHM7XG52YXIgaW5wdXRGb3JtO1xudmFyIGV4cG9ydGVyID0gcmVxdWlyZSgnLi9leHBvcnQnKTtcbnZhciBvZmZsaW5lID0gcmVxdWlyZSgnLi9vZmZsaW5lJyk7XG5cbi8vIGltcG9ydCBtb2RlbCBzdHVmZlxudmFyIG1vZGVsID0gcmVxdWlyZSgncG9wbGFyLTNwZy1tb2RlbCcpO1xudmFyIG1vZGVsSU8gPSByZXF1aXJlKCcuL21vZGVsSU8nKTtcbm1vZGVsLnNldElPKG1vZGVsSU8pO1xuXG52YXIgcnVuQ2FsbGJhY2sgPSBudWxsO1xudmFyIF8zcGdNb2RlbCA9IG51bGw7XG5cbnZhciBpbnB1dHMgPSB7XG5cdHdlYXRoZXIgOiBbXCJtb250aFwiLFwidG1pblwiLFwidG1heFwiLFwidGRtZWFuXCIsXCJwcHRcIixcInJhZFwiLFwiZGF5bGlnaHRcIl1cbn07XG52YXIgb3V0cHV0cyA9IFtcIlZQRFwiLFwiZlZQRFwiLFwiZlRcIixcImZGcm9zdFwiLFwiUEFSXCIsXCJ4UFBcIixcIkludGNwdG5cIixcIkFTV1wiLFwiQ3VtSXJyaWdcIixcbiAgICAgICAgICAgXCJJcnJpZ1wiLFwiU3RhbmRBZ2VcIixcIkxBSVwiLFwiQ2FuQ29uZFwiLFwiVHJhbnNwXCIsXCJmU1dcIixcImZBZ2VcIixcbiAgICAgICAgICAgXCJQaHlzTW9kXCIsXCJwUlwiLFwicFNcIixcImxpdHRlcmZhbGxcIixcIk5QUFwiLFwiV0ZcIixcIldSXCIsXCJXU1wiLFwiV1wiXTtcbnZhciBkZWJ1ZyA9IGZhbHNlO1xudmFyIGRldm1vZGUgPSBmYWxzZTtcblxudmFyIHdlYXRoZXJDdXN0b21DaGFydCA9IG51bGw7XG5cbi8vIHJvdyByYXcgZGF0YSBkb2VzIGEgbG90IG9mIHByb2Nlc3Npbmcgb2YgdGhlIHJlc3VsdHMgYW5kIHRoZSBjdXJyZW50IHN0YXRlIG9mIHdoYXQnc1xuLy8gYmVpbmcgZGlzcGxheWVkLiAgR28gYWhlYWQgYW4gc2V0dXAgdGhlIGNzdiBkYXRhIGF0IHRoaXMgcG9pbnQsIHRoZW4gaWYgdGhlIHVzZXJcbi8vIGRlY2lkZXMgdG8gZXhwb3J0LCB3ZSBhcmUgYWxsIHNldCB0byB0bztcbnZhciBjc3ZSZXN1bHRzID0gbnVsbDtcblxudmFyIGdldE1vZGVsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBtb2RlbDtcbn1cblxudmFyIGdldE91dHB1dHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG91dHB1dHM7XG59XG5cbnZhciBvdXRwdXREZWZpbml0aW9ucyA9IHJlcXVpcmUoJy4vb3V0cHV0RGVmaW5pdGlvbnMnKTtcblxuXG5mdW5jdGlvbiBxcyhrZXkpIHtcbiAga2V5ID0ga2V5LnJlcGxhY2UoL1sqKz9eJC5cXFtcXF17fSgpfFxcXFxcXC9dL2csIFwiXFxcXCQmXCIpO1xuICB2YXIgbWF0Y2ggPSBsb2NhdGlvbi5zZWFyY2gubWF0Y2gobmV3IFJlZ0V4cChcIls/Jl1cIiArIGtleSArIFwiPShbXiZdKykoJnwkKVwiKSk7XG4gIHJldHVybiBtYXRjaCAmJiBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbMV0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0bW9kZWxJTy5hcHAgPSB0aGlzO1xuXHRtb2RlbElPLm1vZGVsID0gbW9kZWw7XG5cdGlucHV0Rm9ybSA9IHJlcXVpcmUoJy4vaW5wdXRGb3JtJykodGhpcyk7XG5cdGNoYXJ0cyA9IHJlcXVpcmUoJy4vY2hhcnRzJyk7XG5cdGNoYXJ0cy5zZXRBcHAodGhpcyk7XG5cbiAgLy8gY2hlY2sgaWYgZmxhc2ggaXMgaW5zdGFsbGVkLiAgSWYgbm90LCBoaWRlIHRoZSBjaGFydCB0eXBlIHRvZ2dsZS5cbiAgcmVxdWlyZSgnLi9mbGFzaEJsb2NrLWRldGVjdG9yJykoZnVuY3Rpb24odmFsKXtcbiAgICAgIGlmKCB2YWwgPiAwICkgJChcIiNjaGFydC10eXBlLWJ0bi1ncm91cFwiKS5oaWRlKCk7XG4gIH0pO1xuXG4gIC8vIHNldHVwIGV4cG9ydCBtb2RhbFxuICBleHBvcnRlci5pbml0KCk7XG4gICQoXCIjZXhwb3J0LWNzdlwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgZXhwb3J0ZXIuZXhwb3J0Q3N2KGNzdlJlc3VsdHMpO1xuICB9KTtcblxuICB2YXIgZWxlID0gJChcIiNpbnB1dHMtY29udGVudFwiKTtcbiAgaW5wdXRGb3JtLmNyZWF0ZShlbGUpO1xuXG4gICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgcnVuTW9kZWwoKTtcbiAgfSk7XG5cbiAgLy8gaW5pdGlhbGl6ZSB0aGUgY2hhcnRzXG4gIGNoYXJ0cy5pbml0KCk7XG5cbiAgLy8gc2V0IGRlZmF1bHQgY29uZmlnXG4gICQoXCIjaW5wdXQtbWFuYWdlLURhdGVQbGFudGVkXCIpLnZhbChuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC4qLywnJykpO1xuICAkKFwiI2lucHV0LW1hbmFnZS1EYXRlQ29wcGljZWRcIikudmFsKG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpKyg4NjQwMDAwMCoyKjM2NSkpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC4qLywnJykpO1xuICAkKFwiI2lucHV0LW1hbmFnZS1EYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbChuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSsoODY0MDAwMDAqMTAqMzY1KSkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULiovLCcnKSk7XG5cbiAgLy8gc2V0dXAgbmljZSBzY3JvbGxpbmdcbiAgJCgnLmFwcC1uYXYnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiAkKHRoaXMuaGFzaCkub2Zmc2V0KCkudG9wLTU1XG4gICAgICAgfSwgNzAwKTtcbiB9KTtcblxuICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XG4gICAgICBjaGFydHMucmVzaXplKCk7XG5cbiAgICAgIGlmKCB3ZWF0aGVyQ3VzdG9tQ2hhcnQgKSB7XG4gICAgICAgICAgd2VhdGhlckN1c3RvbUNoYXJ0ID0gY2hhcnRzLmNyZWF0ZVdlYXRoZXJDaGFydCgkKCcjY3VzdG9tLXdlYXRoZXItY2hhcnQnKVswXSwgbW9kZWwuY3VzdG9tX3dlYXRoZXIpO1xuICAgICAgfVxuICB9KTtcblxuICBjYWxsYmFjaygpO1xufVxuXG5cbnZhciBydW5Db21wbGV0ZSA9IGZ1bmN0aW9uKHJvd3MpIHtcbiAgaWYgKCBydW5DYWxsYmFjayApIHJ1bkNhbGxiYWNrKHJvd3MpO1xuICBpZiggaGlkZUluaXRMb2FkaW5nICkgaGlkZUluaXRMb2FkaW5nKCk7XG4gIHJ1bkNhbGxiYWNrID0gbnVsbDtcbn1cblxudmFyIG1vbnRoc1RvUnVuID0gZnVuY3Rpb24oKSB7XG4gIHZhciBkMSA9ICQoXCIjaW5wdXQtbWFuYWdlLURhdGVQbGFudGVkXCIpLnZhbCgpO1xuICBpZiAoZDEgJiYgZDEgIT0gXCJcIikge1xuICAgICAgZDEgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1EYXRlUGxhbnRlZFwiKS52YWwoKSk7XG4gIH0gZWxzZSB7XG4gICAgICBkMSA9IG5ldyBEYXRlKCk7XG4gIH1cblxuICB2YXIgZDIgPSAkKFwiI2lucHV0LW1hbmFnZS1EYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpO1xuICBpZiAoZDIgJiYgZDIgIT0gXCJcIikge1xuICAgICAgZDIgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1EYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpKTtcbiAgfSBlbHNlIHtcbiAgICAgIGQyID0gbmV3IERhdGUoKTtcbiAgfVxuXG4gIHZhciBtb250aHM7XG4gIG1vbnRocyA9IChkMi5nZXRGdWxsWWVhcigpIC0gZDEuZ2V0RnVsbFllYXIoKSkgKiAxMjtcbiAgbW9udGhzIC09IGQxLmdldE1vbnRoKCkgKyAxO1xuICBtb250aHMgKz0gZDIuZ2V0TW9udGgoKTtcbiAgcmV0dXJuIG1vbnRocyA8PSAwID8gMSA6IG1vbnRocysxO1xufVxuXG5cbnZhciBydW5Nb2RlbCA9IGZ1bmN0aW9uKGlzUnQpIHtcblxuICBpZiAoJChcIiNydW5idG4sICNydW5idG4tc21cIikuaGFzQ2xhc3MoXCJkaXNhYmxlZFwiKSkgcmV0dXJuO1xuICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJSdW5uaW5nLi4uXCIpO1xuXG4gIGlmKCAhY2hlY2tXZWF0aGVyKCkgKSByZXR1cm47XG5cbiAgLy8gbGV0IFVJIHByb2Nlc3MgZm9yIGEgc2VjIGJlZm9yZSB3ZSB0YW5rIGl0XG4gIC8vIFRPRE86IHRoaXMgc2hvdWxkIGJlIHByZWZvcm1lZCB3LyBhIHdlYndvcmtlclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbW9kZWwtcnVuJywgMSk7XG5cbiAgICAgIC8vIHJlYWQgZXZlcnl0aGluZyBzbyB0aGUgdmFyaWF0aW9ucyBhcmUgc2V0XG4gICAgICBtb2RlbC52YXJpYXRpb25zID0ge307XG4gICAgICBtb2RlbElPLnJlYWRGcm9tSW5wdXRzKCk7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBhcmUgb25seSBzZXR0aW5nIDIgdmFyaWF0aW9uIHBhcmFtZXRlcnNcbiAgICAgIHZhciBwYXJhbXMgPSBbXTtcbiAgICAgIGZvciggdmFyIGtleSBpbiBtb2RlbC52YXJpYXRpb25zICkgcGFyYW1zLnB1c2goa2V5KTtcbiAgICAgIGlmKCBwYXJhbXMubGVuZ3RoID4gMiApIHtcbiAgICAgICAgICBhbGVydChcIlRoZXJlIGlzIGEgbGltaXQgb2YgMiB2YXJpYXRpb24gcGFyYW1ldGVycyBwZXIgcnVuLiAgQ3VycmVudGx5IHlvdSBhcmUgdmFyeWluZyBcIitcbiAgICAgICAgICAgICAgICBcInRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczpcXG5cXG4gLVwiK3BhcmFtcy5qb2luKFwiXFxuIC1cIikpO1xuICAgICAgICAgICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIjxpIGNsYXNzPSdpY29uLXBsYXknPjwvaT4gUnVuXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gbGV0IHRoZSB3b3JsZCBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgICBpZiggIWlzUnQgKSBnZHJpdmUucnVuTW9kZWxSdCgpO1xuXG4gICAgICAvLyBzaG93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgICAkKFwiI3ZhcmlhdGlvbkFuYWx5c2lzU3RhdHVzXCIpLmh0bWwoXCI8Yj5cIisocGFyYW1zLmxlbmd0aCA9PSAwID8gXCJOb25lXCIgOiBwYXJhbXMuam9pbihcIiwgXCIpKStcIjwvYj5cIik7XG5cbiAgICAgIC8vIHdlIGFyZSBvbmx5IHJ1bm5pbmcgb25jZVxuICAgICAgaWYgKCBwYXJhbXMubGVuZ3RoID09IDAgKSB7XG4gICAgICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbW9kZWwtcnVuLXNpbmdsZVBhcmFtJywgMSk7XG5cbiAgICAgICAgICBydW5DYWxsYmFjayA9IGZ1bmN0aW9uKHJvd3MpIHtcbiAgICAgICAgICAgICAgc2hvd1Jlc3VsdHMocm93cyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1vZGVsLnJ1bihtb250aHNUb1J1bigpKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdtb2RlbC1ydW4tdmFyaWF0aW9uJywgMSk7XG5cbiAgICAgICAgICAvLyBzZXQgdmFyaWF0aW9uIG9yZGVyXG4gICAgICAgICAgdmFyIHJ1bnMgPSBbXTtcbiAgICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IG1vZGVsLnZhcmlhdGlvbnNbcGFyYW1zWzBdXS5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgICAgICAgICAgIGlucHV0cyA6IHt9LFxuICAgICAgICAgICAgICAgICAgb3V0cHV0IDogbnVsbFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG9iai5pbnB1dHNbcGFyYW1zWzBdXSA9IG1vZGVsLnZhcmlhdGlvbnNbcGFyYW1zWzBdXVtpXTtcbiAgICAgICAgICAgICAgaWYoIHBhcmFtcy5sZW5ndGggPiAxICkge1xuICAgICAgICAgICAgICAgICAgZm9yKCB2YXIgaiA9IDA7IGogPCBtb2RlbC52YXJpYXRpb25zW3BhcmFtc1sxXV0ubGVuZ3RoOyBqKysgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSAkLmV4dGVuZCh0cnVlLCB7fSwgb2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICB0LmlucHV0c1twYXJhbXNbMV1dID0gbW9kZWwudmFyaWF0aW9uc1twYXJhbXNbMV1dW2pdO1xuICAgICAgICAgICAgICAgICAgICAgIHJ1bnMucHVzaCh0KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJ1bnMucHVzaChvYmopO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcnVuVmFyaWF0aW9uKDAsIHJ1bnMpO1xuICAgICAgfVxuICB9LCAyNTApO1xufVxuXG52YXIgcnVuVmFyaWF0aW9uID0gZnVuY3Rpb24oaW5kZXgsIHJ1bnMpIHtcbiAgLy8gc2V0IGlucHV0IHZhcmlhYmxlcyBmb3IgcnVuXG4gIHZhciBydW4gPSBydW5zW2luZGV4XTtcbiAgZm9yKCB2YXIga2V5IGluIHJ1bi5pbnB1dHMgKSB7XG4gICAgICAkKFwiI2lucHV0LVwiK2tleS5yZXBsYWNlKC9cXC4vZywgJy0nKSkudmFsKHJ1bi5pbnB1dHNba2V5XSk7XG4gIH1cblxuICBydW5DYWxsYmFjayA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJ1bnNbaW5kZXhdLm91dHB1dCA9IGRhdGE7XG4gICAgICBpbmRleCsrO1xuXG4gICAgICBpZiAocnVucy5sZW5ndGggPT0gaW5kZXgpIHtcbiAgICAgICAgICAvLyByZXNldCB0aGUgY29uc3RhbnQgdG8gdGhlIGZpcnN0IHZhbHVlXG4gICAgICAgICAgZm9yKCB2YXIga2V5IGluIG1vZGVsLnZhcmlhdGlvbnMgKSB7XG4gICAgICAgICAgICAgICQoXCIjaW5wdXQtXCIra2V5LnJlcGxhY2UoL1xcLi9nLCAnLScpKS52YWwobW9kZWwudmFyaWF0aW9uc1trZXldLmpvaW4oXCIsIFwiKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNob3dSZXN1bHRzKHJ1bnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBydW5WYXJpYXRpb24oaW5kZXgsIHJ1bnMpO1xuICAgICAgfVxuICB9XG5cbiAgbW9kZWwucnVuKG1vbnRoc1RvUnVuKCkpO1xufVxuXG5cbnZhciBzaG93UmVzdWx0cyA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICBpZiggcmVzdWx0WzBdIGluc3RhbmNlb2YgQXJyYXkgKSB7XG4gICAgICByZXN1bHQgPSBbe1xuICAgICAgICAgIHNpbmdsZVJ1biA6IHRydWUsXG4gICAgICAgICAgaW5wdXRzIDoge30sXG4gICAgICAgICAgb3V0cHV0IDogcmVzdWx0XG4gICAgICB9XVxuICB9XG5cbiAgY3VycmVudFJlc3VsdHMgPSByZXN1bHQ7XG5cbiAgc2hvd1Jhd091dHB1dChyZXN1bHQpO1xuICBjaGFydHMudXBkYXRlQ2hhcnRzKHJlc3VsdCwgdHJ1ZSk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIjxpIGNsYXNzPSdpY29uLXBsYXknPjwvaT4gUnVuXCIpO1xuICB9LCAyNTApO1xuXG59XG5cbi8vIG1ha2Ugc3VyZSBhbGwgdGhlIHdlYXRoZXIgaXMgc2V0LiAgIzEgdGhpbmcgcGVvcGxlIHdpbGwgbWVzcyB1cFxudmFyIGNoZWNrV2VhdGhlciA9IGZ1bmN0aW9uKCkge1xuICAvLyBmaXJzdCBnZXQgY3VycmVudCBtb250aHMgd2UgYXJlIGdvaW5nIHRvIHJ1bixcbiAgdmFyIHN0YXJ0ID0gJChcIiNpbnB1dC1tYW5hZ2UtRGF0ZVBsYW50ZWRcIikudmFsKCk7XG5cbiAgdmFyIGVuZCA9ICQoXCIjaW5wdXQtbWFuYWdlLURhdGVGaW5hbEhhcnZlc3RcIikudmFsKCkuc3BsaXQoXCItXCIpO1xuICB2YXIgZU1vbnRoID0gcGFyc2VJbnQoZW5kWzFdKTtcbiAgdmFyIGVZZWFyID0gcGFyc2VJbnQoZW5kWzBdKTtcblxuICB2YXIgY0RhdGUgPSBuZXcgRGF0ZShzdGFydCk7XG5cbiAgLy8gbm93IHNlZSBpZiB3ZSBoYXZlIGN1c3RvbSB3ZWF0aGVyIGNvdmVyYWdlXG4gIHZhciBoYXNDb3ZlcmFnZSA9IHRydWU7XG4gIHZhciBjb3VudCA9IDA7XG4gIHdoaWxlKCBjb3VudCA8IDEwMDAwICkge1xuICAgICAgaWYoICFtb2RlbC5jdXN0b21fd2VhdGhlciApIHtcbiAgICAgICAgICBoYXNDb3ZlcmFnZSA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB2YXIgbSA9IChjRGF0ZS5nZXRNb250aCgpKzEpKycnO1xuICAgICAgdmFyIHkgPSBjRGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgaWYoIG0ubGVuZ3RoID09IDEgKSBtID0gJzAnK207XG5cbiAgICAgIGlmKCBjRGF0ZS5nZXRNb250aCgpKzEgPT0gZU1vbnRoICYmIHkgPT0gZVllYXIgKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2UgaWYoICFtb2RlbC5jdXN0b21fd2VhdGhlclt5KyctJyttXSApIHtcbiAgICAgICAgICBoYXNDb3ZlcmFnZSA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjRGF0ZS5zZXRNb250aChjRGF0ZS5nZXRNb250aCgpKzEpO1xuICAgICAgY291bnQrKztcbiAgfVxuXG4gIGlmKCBoYXNDb3ZlcmFnZSApIHJldHVybiB0cnVlO1xuXG4gIC8vIGlmIG5vdCBtYWtlIHN1cmUgd2UgaGF2ZSBhdmVyYWdlcyBzZWxlY3RlZFxuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICBmb3IgKCB2YXIgaiA9IDE7IGogPCBpbnB1dHMud2VhdGhlci5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHZhciBjID0gaW5wdXRzLndlYXRoZXJbal07XG4gICAgICAgICAgdmFyIHZhbCA9IHBhcnNlRmxvYXQoJChcIiNpbnB1dC13ZWF0aGVyLVwiICsgYyArIFwiLVwiICsgaSkudmFsKCkpO1xuICAgICAgICAgIGlmKCAhdmFsICYmIHZhbCAhPSAwICkge1xuICAgICAgICAgICAgICBhbGVydChcIk1pc3Npbmcgd2VhdGhlciBkYXRhOiBcIitjK1wiIGZvciBtb250aCBcIitpK1wiXFxuXFxuXCIrXG4gICAgICAgICAgICAgICAgICAgIFwiRGlkIHlvdSBzZWxlY3QgYSBsb2NhdGlvbiAoU2V0dXApIGFuZC9vciBhcmUgYWxsIHdlYXRoZXIvc29pbCBmaWVsZHMgZmlsbGVkIG91dD9cIik7XG4gICAgICAgICAgICAgICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIjxpIGNsYXNzPSdpY29uLXBsYXknPjwvaT4gUnVuXCIpO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbnZhciBzZXRXZWF0aGVyID0gZnVuY3Rpb24oZGF0YSkge1xuICBpZiggIW1vZGVsLmN1c3RvbV93ZWF0aGVyICkgbW9kZWwuY3VzdG9tX3dlYXRoZXIgPSB7fTtcblxuICBpZiggZGF0YSApIHtcbiAgICAgIGZvciggdmFyIGtleSBpbiBkYXRhICkge1xuXG4gICAgICAgICAgLy8gY2xlYW4gdXAgZGF0ZSBmb3JtYXRcbiAgICAgICAgICB2YXIgZGF0ZSA9IGtleS5yZXBsYWNlKC9bXlxcZC1dLywnJyk7XG4gICAgICAgICAgdmFyIHBhcnRzID0gZGF0ZS5zcGxpdCgnLScpO1xuXG4gICAgICAgICAgaWYoIHBhcnRzLmxlbmd0aCA8IDIgKSB7XG4gICAgICAgICAgICAgIHJldHVybiBhbGVydCgnSW52YWxpZCBEYXRlIEZvcm1hdC4gIERhdGVzIHNob3VsZCBiZSBpbiBZWVlZLU1NIGZvcm1hdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIHBhcnRzWzFdLmxlbmd0aCAhPSAyICkge1xuICAgICAgICAgICAgICBkYXRlID0gcGFydHNbMF0rXCItMFwiK3BhcnRzWzFdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1vZGVsLmN1c3RvbV93ZWF0aGVyW2RhdGVdID0gZGF0YVtrZXldO1xuICAgICAgfVxuICB9XG5cbiAgLy8gY3JlYXRlIGFycmF5IHNvIHdlIGNhbiBzb3J0XG4gIHZhciBhcnIgPSBbXTtcbiAgdmFyIGhlYWRlcnMgPSBbJ2RhdGUnXTtcbiAgZm9yKCB2YXIgZGF0ZSBpbiBtb2RlbC5jdXN0b21fd2VhdGhlciApIHtcblxuICAgICAgdmFyIHQgPSBbZGF0ZV07XG4gICAgICBmb3IoIHZhciBrZXkgaW4gbW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0gKSB7XG4gICAgICAgICAgaWYoIGtleSA9PSAnbnJlbCcgKSBjb250aW51ZTtcbiAgICAgICAgICBpZiggYXJyLmxlbmd0aCA9PSAwICkgaGVhZGVycy5wdXNoKGtleSk7XG4gICAgICAgICAgdC5wdXNoKG1vZGVsLmN1c3RvbV93ZWF0aGVyW2RhdGVdW2tleV0pO1xuICAgICAgfVxuXG4gICAgICBhcnIucHVzaCh0KTtcbiAgfVxuXG4gIGlmKCBhcnIubGVuZ3RoID09IDAgKSB7XG4gICAgICAkKCcjY3VzdG9tLXdlYXRoZXItcGFuZWwnKS5odG1sKFwiTm8gd2VhdGhlciBkYXRhIGhhcyBiZWVuIHVwbG9hZGVkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBodG1sID0gJzxkaXYgc3R5bGU9XCJvdmVyZmxvdzphdXRvO21heC1oZWlnaHQ6NjAwcHhcIj48dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkXCI+PHRyPic7XG5cbiAgYXJyLnNvcnQoZnVuY3Rpb24oYSwgYil7XG4gICAgICB2YXIgZDEgPSBuZXcgRGF0ZShhWzBdK1wiLTAxXCIpLmdldFRpbWUoKTtcbiAgICAgIHZhciBkMiA9IG5ldyBEYXRlKGJbMF0rXCItMDFcIikuZ2V0VGltZSgpO1xuXG4gICAgICBpZiggZDEgPCBkMiApIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgIH0gZWxzZSBpZiggZDEgPiBkMiApIHtcbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAwO1xuICB9KTtcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IGhlYWRlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBodG1sICs9ICc8dGg+JytoZWFkZXJzW2ldKyc8L3RoPic7XG4gIH1cbiAgaHRtbCArPSAnPC90cj4nO1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrICkge1xuICAgICAgaHRtbCArPSAnPHRyPjx0ZD4nK2FycltpXS5qb2luKCc8L3RkPjx0ZD4nKSsnPC90ZD48L3RyPic7XG4gIH1cblxuICAkKCcjY3VzdG9tLXdlYXRoZXItcGFuZWwnKS5odG1sKGh0bWwrJzwvdGFibGU+PC9kaXY+PGRpdiBpZD1cImN1c3RvbS13ZWF0aGVyLWNoYXJ0XCI+PC9kaXY+Jyk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgd2VhdGhlckN1c3RvbUNoYXJ0ID0gY2hhcnRzLmNyZWF0ZVdlYXRoZXJDaGFydCgkKCcjY3VzdG9tLXdlYXRoZXItY2hhcnQnKVswXSwgbW9kZWwuY3VzdG9tX3dlYXRoZXIpO1xuICB9LCAxMDAwKTtcblxufTtcblxudmFyIHNob3dSYXdPdXRwdXQgPSBmdW5jdGlvbihyZXN1bHRzKSB7XG5cbiAgLy8gc2VsZWN0ZWQgaW4gdGhlIGNoYXJ0cyBvdXRwdXRcbiAgdmFyIHZhcnMgPSAkKFwiI2NoYXJ0VHlwZUlucHV0XCIpLnZhbCgpO1xuXG4gIC8vIGZpbmQgdGhlIHJvd3Mgd2UgY2FyZSBhYm91dFxuICB2YXIgY2hhcnRSb3dzID0ge307XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgcmVzdWx0c1swXS5vdXRwdXRbMF0ubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggdmFycy5pbmRleE9mKHJlc3VsdHNbMF0ub3V0cHV0WzBdW2ldKSA+IC0xICkgY2hhcnRSb3dzW3Jlc3VsdHNbMF0ub3V0cHV0WzBdW2ldXSA9IGk7XG4gIH1cblxuICB2YXIgdGFicyA9ICQoJzx1bCBjbGFzcz1cIm5hdiBuYXYtcGlsbHNcIiBpZD1cInJhd091dHB1dFRhYnNcIiAgZGF0YS10YWJzPVwicGlsbFwiPjwvdWw+Jyk7XG4gIHZhciBjb250ZW50cyA9ICQoJzxkaXYgY2xhc3M9XCJwaWxsLWNvbnRlbnRcIiBzdHlsZT1cIm92ZXJmbG93OmF1dG87bWFyZ2luLXRvcDoxNXB4XCI+PC9kaXY+Jyk7XG5cbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgdmFycy5sZW5ndGg7IGkrKykge1xuICAgICAgdGFicy5hcHBlbmQoJCgnPGxpICcrKGkgPT0gMCA/ICdjbGFzcz1cImFjdGl2ZVwiJyA6IFwiXCIpKyc+PGEgaHJlZj1cIiNyYXdvdXQnXG4gICAgICAgICAgK3ZhcnNbaV0rJ1wiIGRhdGEtdG9nZ2xlPVwidGFiXCI+Jyt2YXJzW2ldKyc8L2E+PC9saT4nKSk7XG5cbiAgICAgIGNvbnRlbnRzLmFwcGVuZCgkKCc8ZGl2IGNsYXNzPVwicGlsbC1wYW5lICcgKyAoaSA9PSAwID8gJ2FjdGl2ZScgOiBcIlwiKVxuICAgICAgICAgICsgJ1wiIGlkPVwicmF3b3V0JyArIHZhcnNbaV0gKyAnXCI+PC9kaXY+JykpO1xuICB9XG5cbiAgJChcIiNvdXRwdXQtY29udGVudFwiKS5odG1sKFwiXCIpLmFwcGVuZCh0YWJzKS5hcHBlbmQoY29udGVudHMpO1xuICAkKFwiI3Jhd091dHB1dFRhYnNcIikudGFiKCk7XG5cbiAgY3N2UmVzdWx0cyA9IHtcbiAgICAgIGNvbmZpZyA6IG1vZGVsSU8uZXhwb3J0U2V0dXAoKSxcbiAgICAgIGRhdGEgOiB7fVxuICB9O1xuXG4gIC8vIHNvbWUgcm93cyBoYXZlIHN0cmluZ3MsIHdlIGRvbid0IHdhbnQgdGhlc2VcbiAgLy8gaWdub3JlIHN0cmluZyByb3dzXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBjbGVhbiA9IFtyZXN1bHRzW2ldLm91dHB1dFswXV07XG4gICAgICBmb3IoIHZhciBqID0gMTsgaiA8IHJlc3VsdHNbaV0ub3V0cHV0Lmxlbmd0aDsgaisrICkge1xuICAgICAgICAgIGlmKCB0eXBlb2YgcmVzdWx0c1tpXS5vdXRwdXRbal1bMF0gIT0gJ3N0cmluZycgKSBjbGVhbi5wdXNoKHJlc3VsdHNbaV0ub3V0cHV0W2pdKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdHNbaV0ub3V0cHV0ID0gY2xlYW47XG4gIH1cblxuICB2YXIgY0RhdGUgPSBuZXcgRGF0ZSgkKFwiI2lucHV0LW1hbmFnZS1EYXRlUGxhbnRlZFwiKS52YWwoKSk7XG5cbiAgdmFyIHRhYmxlLCByb3c7XG4gIGZvciggdmFyIGtleSBpbiBjaGFydFJvd3MgKSB7XG4gICAgICB0YWJsZSA9IFwiPHRhYmxlIGNsYXNzPSd0YWJsZSB0YWJsZS1zdHJpcGVkJz5cIjtcblxuICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV0gPSBbXTtcblxuICAgICAgZm9yKCB2YXIgaiA9IDA7IGogPCByZXN1bHRzWzBdLm91dHB1dC5sZW5ndGg7IGorKyApe1xuICAgICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldW2pdID0gW107XG5cbiAgICAgICAgICAvLyBzZXQgaGVhZGVyIHJvd1xuICAgICAgICAgIGlmKCBqID09IDAgKSB7XG4gICAgICAgICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldW2pdLnB1c2goJ21vbnRoJyk7XG4gICAgICAgICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldW2pdLnB1c2goJ2RhdGUnKTtcblxuICAgICAgICAgICAgICB0YWJsZSArPSBcIjx0cj48dGg+TW9udGg8L3RoPjx0aD5EYXRlPC90aD5cIjtcbiAgICAgICAgICAgICAgZm9yKCB2YXIgeiA9IDA7IHogPCByZXN1bHRzLmxlbmd0aDsgeisrICkge1xuICAgICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8dGg+XCI7XG4gICAgICAgICAgICAgICAgICB2YXIgdG1wID0gW107XG5cbiAgICAgICAgICAgICAgICAgIGZvciggdmFyIG1UeXBlIGluIHJlc3VsdHNbel0uaW5wdXRzICkge1xuICAgICAgICAgICAgICAgICAgICAgIHRtcC5wdXNoKG1UeXBlK1wiPVwiK3Jlc3VsdHNbel0uaW5wdXRzW21UeXBlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8ZGl2PlwiK21UeXBlK1wiPVwiK3Jlc3VsdHNbel0uaW5wdXRzW21UeXBlXStcIjwvZGl2PlwiO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBpZiggdG1wLmxlbmd0aCA9PSAwICkge1xuICAgICAgICAgICAgICAgICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldW2pdLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICB0YWJsZSArPSBrZXk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldW2pdLnB1c2godG1wLmpvaW4oXCIgXCIpKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHRhYmxlICs9IFwiPC90aD5cIjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRhYmxlICs9IFwiPC90cj5cIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKGNEYXRlLmdldFllYXIoKSsxOTAwLCBjRGF0ZS5nZXRNb250aCgpK2osIGNEYXRlLmdldERhdGUoKSk7XG4gICAgICAgICAgICAgIHZhciBtID0gZGF0ZS5nZXRNb250aCgpKzE7XG4gICAgICAgICAgICAgIGlmKCBtIDwgMTAgKSBtID0gJzAnK207XG5cbiAgICAgICAgICAgICAgdGFibGUgKz0gXCI8dHI+PHRkPlwiK2orXCI8L3RkPjx0ZD5cIitkYXRlLmdldEZ1bGxZZWFyKCkrJy0nK20rXCI8L3RkPlwiO1xuXG4gICAgICAgICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldW2pdLnB1c2goaik7XG4gICAgICAgICAgICAgIGNzdlJlc3VsdHMuZGF0YVtrZXldW2pdLnB1c2goZGF0ZS5nZXRGdWxsWWVhcigpKyctJyttKTtcblxuICAgICAgICAgICAgICB2YXIgdjtcbiAgICAgICAgICAgICAgZm9yKCB2YXIgeiA9IDA7IHogPCByZXN1bHRzLmxlbmd0aDsgeisrICkge1xuICAgICAgICAgICAgICAgICAgdiA9IHJlc3VsdHNbel0ub3V0cHV0W2pdW2NoYXJ0Um93c1trZXldXTtcbiAgICAgICAgICAgICAgICAgIHRhYmxlICs9IFwiPHRkPlwiK3YrXCI8L3RkPlwiO1xuICAgICAgICAgICAgICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV1bal0ucHVzaCh2KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0YWJsZSArPSBcIjwvdHI+XCI7XG4gICAgICAgICAgfVxuXG4gICAgICB9XG4gICAgICAkKFwiI3Jhd291dFwiICsga2V5KS5odG1sKHRhYmxlK1wiPC90YWJsZT5cIik7XG4gIH1cblxuICAvLyBtYWtlIHN1cmUgd2UgY2FuIHNlZSB0aGUgZXhwb3J0IGJ0blxuICBpZiggIW9mZmxpbmVNb2RlICkgJChcIiNzaG93LWV4cG9ydC1jc3ZcIikuc2hvdygpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXQgOiBpbml0LFxuICBvdXRwdXRzIDogb3V0cHV0cyxcblx0aW5wdXRzIDogaW5wdXRzLFxuICBnZXRNb2RlbCA6IGdldE1vZGVsLFxuICBydW5Nb2RlbCA6IHJ1bk1vZGVsLFxuICBzaG93UmF3T3V0cHV0IDogc2hvd1Jhd091dHB1dCxcblx0bW9udGhzVG9SdW4gOiBtb250aHNUb1J1bixcbiAgb3V0cHV0RGVmaW5pdGlvbnMgOiBvdXRwdXREZWZpbml0aW9ucyxcbiAgcXMgOiBxcyxcbiAgc2V0V2VhdGhlciA6IHNldFdlYXRoZXIsXG5cdGdkcml2ZSA6IGdkcml2ZSxcblx0cnVuQ29tcGxldGUgOiBydW5Db21wbGV0ZVxufTtcbiIsInZhciBhcHA7XG5cbi8vIG9ubHkgZHJhdyBjaGFydHMgaWYgd2lkdGggaGFzIGNoYW5nZWRcbnZhciBjV2lkdGggPSAwO1xuXG4vLyB0aGVyZSBpcyBubyB3YXkgdG8gZ2V0IHRoZSBjb2xvcnMgZm9yIHRoZSBsZWdlbmRzICh0byBtYWtlIHlvdXIgb3duKVxuLy8gdGhpcyBwb3N0OlxuLy8gZ2l2ZXMgdGhlc2UgdmFsdWVzLiAgVGhpcyBpcyBhIEhBQ0ssIGlmIHRoZXkgZXZlciBjaGFuZ2UsIHdlIG5lZWQgdG8gdXBkYXRlXG52YXIgZ29vZ2xlQ2hhcnRDb2xvcnMgPSBbXCIjMzM2NmNjXCIsXCIjZGMzOTEyXCIsXCIjZmY5OTAwXCIsXCIjMTA5NjE4XCIsXCIjOTkwMDk5XCIsXCIjMDA5OWM2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIjZGQ0NDc3XCIsXCIjNjZhYTAwXCIsXCIjYjgyZTJlXCIsXCIjMzE2Mzk1XCIsXCIjOTk0NDk5XCIsXCIjMjJhYTk5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIjYWFhYTExXCIsXCIjNjYzM2NjXCIsXCIjZTY3MzAwXCIsXCIjOGIwNzA3XCIsXCIjNjUxMDY3XCIsXCIjMzI5MjYyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIjNTU3NGE2XCIsXCIjM2IzZWFjXCIsXCIjYjc3MzIyXCIsXCIjMTZkNjIwXCIsXCIjYjkxMzgzXCIsXCIjZjQzNTllXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCIjOWM1OTM1XCIsXCIjYTljNDEzXCIsXCIjMmE3NzhkXCIsXCIjNjY4ZDFjXCIsXCIjYmVhNDEzXCIsXCIjMGM1OTIyXCJcbiAgICAgICAgICAgICAgICAgICAgICAsXCIjNzQzNDExXCJdO1xuXG52YXIgd2VhdGhlckNoYXJ0T3B0aW9ucyA9IHtcbiAgdGl0bGUgOiAnV2VhdGhlcicsXG4gIGhlaWdodCA6IDMwMCxcbiAgdkF4ZXM6IFt7XG4gICAgICAgICAgdGl0bGU6IFwiUmFkaWF0aW9uIChNSi9kYXkpOyBUZW1wZXJhdHVyZSAoXkMpOyBEZXcgUG9pbnQgKF5DKTsgRGF5bGlnaHQgKGgpXCIsXG4gICAgICAgICAgbWluVmFsdWUgOiAtNSxcbiAgICAgICAgICBtYXhWYWx1ZSA6IDM1XG4gICAgICAgIH0se1xuICAgICAgICAgIHRpdGxlOiBcIlByZWNpcGl0YXRpb24gKG1tKVwiLFxuICAgICAgICAgIG1pblZhbHVlIDogLTUwLFxuICAgICAgICAgIG1heFZhbHVlIDogMzUwXG4gICAgICAgIH1dLFxuICBoQXhpczoge3RpdGxlOiBcIk1vbnRoXCJ9LFxuICBzZXJpZXNUeXBlOiBcImJhcnNcIixcbiAgc2VyaWVzOiB7XG4gICAgICAwOiB7dHlwZTogXCJsaW5lXCIsIHRhcmdldEF4aXNJbmRleDowfSxcbiAgICAgIDE6IHt0eXBlOiBcImxpbmVcIiwgdGFyZ2V0QXhpc0luZGV4OjB9LFxuICAgICAgMjoge3R5cGU6IFwibGluZVwiLCB0YXJnZXRBeGlzSW5kZXg6MH0sXG4gICAgICAzOiB7dHlwZTogXCJhcmVhXCIsIHRhcmdldEF4aXNJbmRleDoxfSxcbiAgICAgIDQ6IHt0YXJnZXRBeGlzSW5kZXg6MH1cbiAgfVxufVxuXG4vLyB0ZW1wbGF0ZSBmb3IgdGhlIHBvcHVwXG52YXIgc2xpZGVyUG9wdXAgPSAkKFxuICAgICAgXCI8ZGl2IGNsYXNzPSdzbGlkZS1wb3B1cCc+XCIgK1xuICAgICAgICAgIFwiPGkgY2xhc3M9J2ljb24tcmVtb3ZlLWNpcmNsZSBwdWxsLXJpZ2h0IHNsaWRlLXBvcHVwLWNsb3NlJz48L2k+XCIrXG4gICAgICAgICAgXCI8ZGl2IGlkPSdjYXJvdXNlbCcgY2xhc3M9J293bC1jYXJvdXNlbCBvd2wtdGhlbWUnIHN0eWxlPSdtYXJnaW4tdG9wOjE1cHgnPjwvZGl2PlwiICtcblx0XCI8L2Rpdj5cIik7XG5cbnZhciBzbGlkZXJQb3B1cEJnID0gJChcIjxkaXYgY2xhc3M9J3NsaWRlLXBvcHVwLWJnJz4mbmJzcDs8L2Rpdj5cIik7XG5cbi8vIG9ubHkgZHJhdyBjaGFydHMgaWYgc29tZW9uZSBoYXMgY2xpY2sgYSBjaGVja2JveFxudmFyIGNoYW5nZXMgPSBmYWxzZTtcblxuLy8gd2hlbiBzaXppbmcsIHdhaXQgYSB+MzAwbXMgYmVmb3JlIHRyaWdnZXJpbmcgcmVkcmF3XG52YXIgcmVzaXplVGltZXIgPSAtMTtcblxudmFyIGNoYXJ0VHlwZVNlbGVjdG9yLCBjaGFydENoZWNrYm94ZXMsIGNEYXRhO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuXG4gICQoXCIjc2hvdy1jaGFydHNwb3B1cC1idG5cIikub24oJ2NsaWNrJyxmdW5jdGlvbigpIHtcbiAgICAgIHNob3dQb3B1cCgpO1xuICB9KTtcblxuICAvLyBzZXR1cCBjaGFydCBzZWxlY3RvcnNcbiAgJChcIiNjaGFydC1tb2RhbFwiKS5tb2RhbCh7c2hvdzpmYWxzZX0pO1xuXG4gIC8vIHNldCBwb3B1cCBjbGljayBoYW5kbGVyc1xuICAkKFwiI2NoYXJ0VHlwZS1zZWxlY3RBbGxcIikub24oJ2NsaWNrJyxzZWxlY3RBbGwpO1xuICAkKFwiI2NoYXJ0VHlwZS11bnNlbGVjdEFsbFwiKS5vbignY2xpY2snLHVuc2VsZWN0QWxsKTtcblxuICBjaGFydFR5cGVTZWxlY3RvciA9ICQoXCIjY2hhcnRUeXBlSW5wdXRcIik7XG4gIGNoYXJ0Q2hlY2tib3hlcyA9ICQoXCIjY2hhcnRTZWxlY3Rpb25zXCIpO1xuXG4gIHZhciBjMSA9ICQoXCIjY2hhcnRTZWxlY3Rpb25zLWMxXCIpO1xuICB2YXIgYzIgPSAkKFwiI2NoYXJ0U2VsZWN0aW9ucy1jMlwiKTtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBhcHAub3V0cHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHZhbCA9IGFwcC5vdXRwdXRzW2ldO1xuICAgICAgY2hhcnRUeXBlU2VsZWN0b3IuYXBwZW5kKCQoXCI8b3B0aW9uIHZhbHVlPSdcIiArIHZhbCArIFwiJyBcIlxuICAgICAgICAgICAgICArICh2YWwgPT0gJ1dSJyB8fCB2YWwgPT0gJ1dTJyB8fCB2YWwgPT0gJ1dGJyA/ICdzZWxlY3RlZCcgOiAnJylcbiAgICAgICAgICAgICAgKyBcIj5cIiArIHZhbCArIFwiPC9vcHRpb24+XCIpKTtcblxuICAgICAgaWYoIGkgJSAyID09IDAgKSB7XG4gICAgICAgICAgYzEuYXBwZW5kKCQoJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCInXG4gICAgICAgICAgICAgICAgICArICh2YWwgPT0gJ1dSJyB8fCB2YWwgPT0gJ1dTJyB8fCB2YWwgPT0gJ1dGJyA/ICdjaGVja2VkPVwiY2hlY2tlZFwiJyA6ICcnKVxuICAgICAgICAgICAgICAgICAgKyAnIHZhbHVlPVwiJyt2YWwrJ1wiPiAnK19jcmVhdGVEZXNjcmlwdGlvbih2YWwpKyc8L2Rpdj4nKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIGMyLmFwcGVuZCgkKCc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj48bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiJ1xuICAgICAgICAgICAgICAgICAgKyAodmFsID09ICdXUicgfHwgdmFsID09ICdXUycgfHwgdmFsID09ICdXRicgPyAnY2hlY2tlZD1cImNoZWNrZWRcIicgOiAnJylcbiAgICAgICAgICAgICAgICAgICsgJyB2YWx1ZT1cIicrdmFsKydcIj4gJytfY3JlYXRlRGVzY3JpcHRpb24odmFsKSsnPC9kaXY+JykpO1xuICAgICAgfVxuICB9XG5cbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCIuZm4tdG9nZ2xlXCIpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjXCIrJCh0aGlzKS5hdHRyKFwiZGF0YXRhcmdldFwiKSkudG9nZ2xlKCdzbG93Jyk7XG4gIH0pO1xuXG4gIGNoYXJ0Q2hlY2tib3hlcy5maW5kKFwiaW5wdXRbdHlwZT1jaGVja2JveF1cIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICBpZiggJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpICkgc2VsZWN0KCQodGhpcykuYXR0cihcInZhbHVlXCIpKTtcbiAgICAgIGVsc2UgdW5zZWxlY3QoJCh0aGlzKS5hdHRyKFwidmFsdWVcIikpO1xuICB9KTtcblxuICAkKFwiI3NlbGVjdC1jaGFydHMtYnRuLCAjc2VsZWN0LWNoYXJ0cy10aXRsZS1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjY2hhcnQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgICAgIGNoYW5nZXMgPSBmYWxzZTtcbiAgfSk7XG5cbiAgJChcIi5jaGFydC1tb2RhbC1jbG9zZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgJChcIiNjaGFydC1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgaWYoIGNoYW5nZXMgJiYgY0RhdGEgKSB7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICB1cGRhdGVDaGFydHMoKTtcbiAgICAgICAgICAgICAgLy8gdXBkYXRlIHJhdyBkYXRhIGFzIHdlbGxcbiAgICAgICAgICAgICAgYXBwLnNob3dSYXdPdXRwdXQoY0RhdGEpO1xuICAgICAgICAgIH0sNDAwKTtcblxuICAgICAgfVxuICB9KTtcblxuICAkKFwiLmNoYXJ0LXR5cGUtdG9nZ2xlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICBpZiggISQodGhpcykuaGFzQ2xhc3MoXCJhY3RpdmVcIikgKSB7XG4gICAgICAgICAgJChcIi5jaGFydC10eXBlLXRvZ2dsZS5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgICB1cGRhdGVDaGFydHMoKTtcbiAgICAgIH1cbiAgfSk7XG59XG5cbi8vIG1ha2Ugc3VyZSBhbmQgZW5kIGxhYmVsIHRhZ1xuZnVuY3Rpb24gX2NyZWF0ZURlc2NyaXB0aW9uKHZhbCkge1xuICBpZiggIWFwcC5vdXRwdXREZWZpbml0aW9uc1t2YWxdICkgcmV0dXJuIFwiPGI+XCIrdmFsK1wiPC9iPjwvbGFiZWw+XCI7XG5cbiAgdmFyIGRlc2MgPSBhcHAub3V0cHV0RGVmaW5pdGlvbnNbdmFsXTtcbiAgdmFyIGxhYmVsID0gZGVzYy5sYWJlbCAmJiBkZXNjLmxhYmVsLmxlbmd0aCA+IDAgPyBcIiAtIFwiK2Rlc2MubGFiZWwgOiBcIlwiO1xuICB2YXIgdW5pdHMgPSBkZXNjLnVuaXRzICYmIGRlc2MudW5pdHMubGVuZ3RoID4gMCA/IFwiIFtcIitkZXNjLnVuaXRzK1wiXVwiIDogXCJcIjtcblxuICB2YXIgbGFiZWwgPSBcIjxiPlwiK3ZhbCtcIjwvYj48c3BhbiBzdHlsZT0nZm9udC1zaXplOjEycHgnPlwiK2xhYmVsK3VuaXRzK1wiPC9zcGFuPjwvbGFiZWw+XCI7XG4gIHZhciBoYXNEZXNjID0gZGVzYy5kZXNjcmlwdGlvbiAmJiBkZXNjLmRlc2NyaXB0aW9uLmxlbmd0aCA+IDA7XG4gIGlmKCBoYXNEZXNjICkge1xuICAgICAgbGFiZWwgKz0gXCI8ZGl2IHN0eWxlPSdmb250LXNpemU6MTFweDtjb2xvcjojODg4O2ZvbnQtc3R5bGU6aXRhbGljJz5cIitkZXNjLmRlc2NyaXB0aW9uO1xuICB9XG5cbiAgdmFyIGZOYW1lID0gZGVzYy5hbHRGbk5hbWUgfHwgdmFsO1xuICB2YXIgZm4gPSBhcHAuZ2V0TW9kZWwoKS5nZXRGdW5jdGlvbihmTmFtZSk7XG5cbiAgaWYoIGZuIHx8IGRlc2MuZm4gKSB7XG4gICAgICBpZiggIWhhc0Rlc2MgKSBsYWJlbCArPSBcIjxkaXYgc3R5bGU9J2ZvbnQtc2l6ZToxMXB4Jz5cIjtcbiAgICAgIGxhYmVsICs9IFwiIDxhIHN0eWxlPSdmb250LXN0eWxlOm5vcm1hbDtjdXJzb3I6cG9pbnRlcicgZGF0YXRhcmdldD0nZm4tZGVzYy1cIit2YWwrXCInIGNsYXNzPSdmbi10b2dnbGUnPmZuKCk8L2E+PC9kaXY+XCI7XG5cbiAgICAgIGxhYmVsICs9IFwiPGRpdiBpZD0nZm4tZGVzYy1cIit2YWwrXCInIHN0eWxlPSdkaXNwbGF5Om5vbmU7Zm9udC1zaXplOjExcHg7b3ZlcmZsb3c6YXV0bycgY2xhc3M9J3dlbGwgd2VsbC1zbSc+XCIrXG4gICAgICAgICAgICAgICAgICAoZm58fGRlc2MuZm4pLnRvU3RyaW5nKCkucmVwbGFjZSgvIC9nLCcmbmJzcDsnKS5yZXBsYWNlKC9cXG4vZywnPGJyIC8+JykrXCI8L2Rpdj5cIjtcbiAgfSBlbHNlIGlmICggaGFzRGVzYyApIHtcbiAgICAgIGxhYmVsICs9IFwiPC9kaXY+XCI7XG4gIH1cblxuICAvLyBUT0RPOiBhZGQgZm4gd2VsbFxuICByZXR1cm4gbGFiZWwrXCI8YnIgLz5cIjtcbn1cblxuZnVuY3Rpb24gc2VsZWN0KHZhbCkge1xuICBjaGFydFR5cGVTZWxlY3Rvci5maW5kKFwib3B0aW9uW3ZhbHVlPVwiK3ZhbCtcIl1cIikuYXR0cihcInNlbGVjdGVkXCIsXCJzZWxlY3RlZFwiKTtcbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCJpbnB1dFt2YWx1ZT1cIit2YWwrXCJdXCIpLnByb3AoXCJjaGVja2VkXCIsdHJ1ZSk7XG4gIGNoYW5nZXMgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiB1bnNlbGVjdCh2YWwpIHtcbiAgY2hhcnRUeXBlU2VsZWN0b3IuZmluZChcIm9wdGlvblt2YWx1ZT1cIit2YWwrXCJdXCIpLnJlbW92ZUF0dHIoXCJzZWxlY3RlZFwiKTtcbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCJpbnB1dFt2YWx1ZT1cIit2YWwrXCJdXCIpLnByb3AoXCJjaGVja2VkXCIsZmFsc2UpO1xuICBjaGFuZ2VzID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0QWxsKCkge1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGFwcC5vdXRwdXRzLmxlbmd0aDsgaSsrKSBzZWxlY3QoYXBwLm91dHB1dHNbaV0pO1xufVxuXG5mdW5jdGlvbiB1bnNlbGVjdEFsbCgpIHtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBhcHAub3V0cHV0cy5sZW5ndGg7IGkrKykgdW5zZWxlY3QoYXBwLm91dHB1dHNbaV0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmUoZWxlKSB7XG4gIGVsZS5wYXJlbnQoKS5oaWRlKCdzbG93JywgZnVuY3Rpb24oKXtcbiAgICAgIGVsZS5wYXJlbnQoKS5yZW1vdmUoKTtcbiAgICAgIHVuc2VsZWN0KGVsZS5hdHRyKCd0eXBlJykpO1xuICB9KTtcblxufVxuXG5mdW5jdGlvbiBwcmludChjaGFydENvbnRhaW5lcikge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdwcmludC1jaGFydCcsIDEpO1xuXG5cbnZhciBkaXNwX3NldHRpbmc9XCJ0b29sYmFyPXllcyxsb2NhdGlvbj1ubyxkaXJlY3Rvcmllcz15ZXMsbWVudWJhcj15ZXMsXCI7XG4gIGRpc3Bfc2V0dGluZys9XCJzY3JvbGxiYXJzPXllcyx3aWR0aD04MDAsIGhlaWdodD02MDAsIGxlZnQ9MjUsIHRvcD0yNVwiO1xuXG4gIHZhciBzdmcgPSBjaGFydENvbnRhaW5lci5maW5kKFwic3ZnXCIpO1xuICB2YXIgaHRtbCA9IGNoYXJ0Q29udGFpbmVyLmZpbmQoXCJkaXZcIikuaHRtbCgpO1xuXG4gIHZhciBkb2NwcmludD13aW5kb3cub3BlbihcIlwiLFwiXCIsZGlzcF9zZXR0aW5nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQub3BlbigpO1xuICBkb2NwcmludC5kb2N1bWVudC53cml0ZSgnPGh0bWw+PGhlYWQ+PHRpdGxlPjwvdGl0bGU+Jyk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKCc8L2hlYWQ+PGJvZHkgbWFyZ2lud2lkdGg9XCIwXCIgbWFyZ2luaGVpZ2h0PVwiMFwiIG9uTG9hZD1cInNlbGYucHJpbnQoKVwiPjxjZW50ZXI+Jyk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKGh0bWwpO1xuICBkb2NwcmludC5kb2N1bWVudC53cml0ZSgnPC9jZW50ZXI+PC9ib2R5PjwvaHRtbD4nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQuY2xvc2UoKTtcbiAgZG9jcHJpbnQuZm9jdXMoKTtcblxufVxuXG5cbmZ1bmN0aW9uIHNldERhdGEoZGF0YSkge1xuICBjRGF0YSA9IGRhdGE7XG59XG5cbi8vIGJhc2ljYWxseSByZWRyYXcgZXZlcnl0aGluZ1xuZnVuY3Rpb24gcmVzaXplKCkge1xuICAvLyByZXF1aXJlIG1vcmUgdGhhbiBhIDMwIHBpeGVsIHdpZHRoIGNoYW5nZSAoc28gd2UgZG9uJ3QgcmVkcmF3IHcvIHNjcm9sbCBiYXJzIGFkZGVkKVxuICB2YXIgd2luV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgaWYoIGNXaWR0aCA+IHdpbldpZHRoIC0gMTUgJiYgY1dpZHRoIDwgd2luV2lkdGggKyAxNSApIHJldHVybjtcbiAgY1dpZHRoID0gd2luV2lkdGg7XG5cbiAgaWYoIHJlc2l6ZVRpbWVyICE9IC0xICkgY2xlYXJUaW1lb3V0KHJlc2l6ZVRpbWVyKTtcbiAgcmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgcmVzaXplVGltZXIgPSAtMTtcbiAgICAgIHVwZGF0ZUNoYXJ0cygpO1xuICB9LDMwMCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNoYXJ0cyhyZXN1bHRzLCBhbmltYXRlKSB7XG4gIGlmKCByZXN1bHRzICkgc2V0RGF0YShyZXN1bHRzKTtcbiAgaWYoICFjRGF0YSApIHJldHVybjtcblxuICAkKFwiI3Nob3ctY2hhcnRzcG9wdXAtYnRuXCIpLnNob3coKTtcblxuICAvLyBjcmVhdGUgYSBsZWdlbmQgaWYgdGhlcmUgaXMgbW9yZSB0aGFuIG9uZSBydW5cbiAgdmFyIGxlZ2VuZCA9IFwiXCI7XG4gIGlmKCAhY0RhdGFbMF0uc2luZ2xlUnVuICkge1xuICAgICAgdmFyIGMxID0gXCJcIjtcbiAgICAgIHZhciBjMiA9IFwiXCI7XG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGNEYXRhLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgIHZhciBlbGUgPSBcIjxkaXYgc3R5bGU9J21pbi1oZWlnaHQ6NDBweDttYXJnaW4tYm90dG9tOjEwcHgnPjxkaXYgY2xhc3M9J2xlZ2VuZC1zcXVhcmUnIHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOlwiK2dvb2dsZUNoYXJ0Q29sb3JzW2ldK1wiJz4mbmJzcDs8L2Rpdj5cIjtcbiAgICAgICAgICBmb3IoIHZhciBtVHlwZSBpbiBjRGF0YVtpXS5pbnB1dHMgKSB7XG4gICAgICAgICAgICAgIGVsZSArPSBcIjxkaXYgY2xhc3M9J2xlZ2VuZC10ZXh0Jz5cIittVHlwZStcIj1cIitjRGF0YVtpXS5pbnB1dHNbbVR5cGVdK1wiPC9kaXY+XCI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYoIGkgJSAyID09IDAgKSBjMSArPSBlbGUgKyBcIjwvZGl2PlwiXG4gICAgICAgICAgZWxzZSBjMiArPSBlbGUgKyBcIjwvZGl2PlwiXG4gICAgICB9XG4gICAgICBsZWdlbmQgPSBcIjxkaXY+PGEgaWQ9J2xlZ2VuZC1wYW5lbC10b2dnbGUnIHN0eWxlPSdtYXJnaW4tbGVmdDo1cHg7Y3Vyc29yOnBvaW50ZXInPkxlZ2VuZDwvYT48L2Rpdj5cIitcbiAgICAgICAgICAgICAgIFwiPGRpdiBzdHlsZT0nYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2VlZTtwYWRkaW5nLWJvdHRvbTo1cHg7bWFyZ2luLWJvdHRvbToxNXB4Jz5cIitcbiAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0ncm93JyBpZD0nbGVnZW5kLXBhbmVsJz48ZGl2IGNsYXNzPSdjb2wtc20tNic+XCIrYzErXCI8L2Rpdj5cIitcbiAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nY29sLXNtLTYnPlwiK2MyK1wiPC9kaXY+XCIrXG4gICAgICAgICAgICAgICBcIjwvZGl2PjwvZGl2PlwiO1xuICB9XG4gICQoXCIjY2hhcnQtY29udGVudFwiKS5odG1sKGxlZ2VuZCk7XG4gICQoXCIjbGVnZW5kLXBhbmVsLXRvZ2dsZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgJChcIiNsZWdlbmQtcGFuZWxcIikudG9nZ2xlKFwic2xvd1wiKTtcbiAgfSk7XG5cblxuICB2YXIgdHlwZXMgPSBjaGFydFR5cGVTZWxlY3Rvci52YWwoKTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIF9zaG93TWFpbkNoYXJ0KHR5cGVzW2ldLCBhbmltYXRlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzaG93UG9wdXAoKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3Nob3ctY2hhcnQtcG9wdXAnLCAxKTtcblxuXG4gIHNsaWRlclBvcHVwLmZpbmQoXCIub3dsLXRoZW1lXCIpLmh0bWwoXCJcIik7XG4gICQoJ2JvZHknKS5zY3JvbGxUb3AoMCkuY3NzKCdvdmVyZmxvdycsJ2hpZGRlbicpLmFwcGVuZChzbGlkZXJQb3B1cEJnKS5hcHBlbmQoc2xpZGVyUG9wdXApO1xuXG4gIC8vIHRoaXMgY291bGQgY2FzZSBiYWRuZXNzLi4uLiAgd2h5IGRvZXNuJ3QgaXQgbGl2ZSB3aGVuIHJlbW92ZWQgZnJvbSBET00/XG4gIHNsaWRlclBvcHVwLmZpbmQoJy5zbGlkZS1wb3B1cC1jbG9zZScpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgIGhpZGVQb3B1cCgpO1xuICB9KTtcblxuICB2YXIgdHlwZXMgPSBjaGFydFR5cGVTZWxlY3Rvci52YWwoKTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIF9zaG93UG9wdXBDaGFydCh0eXBlc1tpXSk7XG4gIH1cblxuICAkKCcjY2Fyb3VzZWwnKS5vd2xDYXJvdXNlbCh7XG4gICAgICBuYXZpZ2F0aW9uIDogdHJ1ZSwgLy8gU2hvdyBuZXh0IGFuZCBwcmV2IGJ1dHRvbnNcbiAgICAgIHNsaWRlU3BlZWQgOiAzMDAsXG4gICAgICBwYWdpbmF0aW9uU3BlZWQgOiA0MDAsXG4gICAgICBzaW5nbGVJdGVtOnRydWVcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGhpZGVQb3B1cCgpIHtcbiAgc2xpZGVyUG9wdXBCZy5yZW1vdmUoKTtcbiAgc2xpZGVyUG9wdXAucmVtb3ZlKCk7XG4gICQoJ2JvZHknKS5jc3MoJ292ZXJmbG93JywnYXV0bycpO1xufVxuXG5mdW5jdGlvbiBfc2hvd01haW5DaGFydCh0eXBlLCBhbmltYXRlKSB7XG4gIHZhciBjaGFydFR5cGUgPSAkKFwiLmNoYXJ0LXR5cGUtdG9nZ2xlLmFjdGl2ZVwiKS5hdHRyKFwidmFsdWVcIik7XG4gIHZhciBwYW5lbCA9ICQoXCI8ZGl2IC8+XCIpO1xuICB2YXIgb3V0ZXJQYW5lbCA9ICQoXCI8ZGl2PlwiK1xuICBcdFwiPGEgY2xhc3M9J2J0biBidG4teHMgYnRuLWRlZmF1bHQnIHN0eWxlPSdcIisoY2hhcnRUeXBlICE9IFwidGltZWxpbmVcIiA/IFwicG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDttYXJnaW46MCAwIC0yMHB4IDIwcHhcIiA6IFwibWFyZ2luLWJvdHRvbTo1cHhcIikrXG4gICAgICBcIicgdHlwZT0nXCIrdHlwZStcIic+XCIgK1xuICBcdFwiPGkgY2xhc3M9J2ljb24tcmVtb3ZlJz48L2k+IFwiK3R5cGUrXCI8L2E+PC9kaXY+XCIpO1xuICBvdXRlclBhbmVsLmZpbmQoXCJhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgcmVtb3ZlKCQodGhpcykpO1xuICB9KTtcbiAgaWYoIGNoYXJ0VHlwZSA9PSBcInRpbWVsaW5lXCIgKSBvdXRlclBhbmVsLmNzcyhcIm1hcmdpbi1ib3R0b21cIixcIjIwcHhcIik7XG4gICQoXCIjY2hhcnQtY29udGVudFwiKS5hcHBlbmQob3V0ZXJQYW5lbC5hcHBlbmQocGFuZWwpKTtcbiAgX2NyZWF0ZUNoYXJ0KHR5cGUsIGNoYXJ0VHlwZSwgcGFuZWwsIGZhbHNlLCBudWxsLCBhbmltYXRlKTtcbn1cblxuZnVuY3Rpb24gX3Nob3dQb3B1cENoYXJ0KHR5cGUpIHtcbiAgdmFyIHBhbmVsID0gJChcIjxkaXYgY2xhc3M9J2l0ZW0nPjwvZGl2PlwiKTtcblxuICB2YXIgcHJpbnRCdG4gPSAkKFwiPGEgY2xhc3M9J2J0biBidG4tc20gYnRuLWRlZmF1bHQnIHN0eWxlPSdtYXJnaW4tbGVmdDoxNnB4Jz48aSBjbGFzcz0naWNvbi1wcmludCc+PC9pPiBQcmludDwvYT5cIikub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICBwcmludChjaGFydFBhbmVsKTtcbiAgfSk7XG4gIHBhbmVsLmFwcGVuZChwcmludEJ0bik7XG5cbiAgdmFyIGNoYXJ0UGFuZWwgPSAkKFwiPGRpdj48L2Rpdj5cIik7XG4gIHBhbmVsLmFwcGVuZChjaGFydFBhbmVsKTtcblxuICBzbGlkZXJQb3B1cC5maW5kKFwiLm93bC10aGVtZVwiKS5hcHBlbmQocGFuZWwpO1xuICBfY3JlYXRlQ2hhcnQodHlwZSwgJ2xpbmUnLCBjaGFydFBhbmVsLCB0cnVlLCBbTWF0aC5yb3VuZCgkKHdpbmRvdykud2lkdGgoKSouODgpLCBNYXRoLnJvdW5kKCgkKHdpbmRvdykuaGVpZ2h0KCkqLjkwKS0xMjUpXSk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDaGFydCh0eXBlLCBjaGFydFR5cGUsIHBhbmVsLCBzaG93TGVnZW5kLCBzaXplLCBhbmltYXRlKSB7XG4gIHZhciBjb2wgPSAwO1xuXG4gIHZhciBkdCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5EYXRhVGFibGUoKTtcblxuICBpZiggY2hhcnRUeXBlID09ICd0aW1lbGluZScgKSB7XG4gICAgICBkdC5hZGRDb2x1bW4oJ2RhdGUnLCAnTW9udGgnKTtcbiAgfSBlbHNlIHtcbiAgICAgIC8vZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnTW9udGgnKTtcbiAgICAgIGR0LmFkZENvbHVtbignc3RyaW5nJywgJ01vbnRoJyk7XG4gIH1cblxuICAvLyBzZXQgdGhlIGZpcnN0IGNvbHVtblxuICBpZiggIWNEYXRhWzBdLnNpbmdsZVJ1biApIHtcbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgY0RhdGEubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgdmFyIGxhYmVsID0gXCJcIjtcbiAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gY0RhdGFbaV0uaW5wdXRzICkge1xuICAgICAgICAgICAgICBsYWJlbCArPSBrZXkucmVwbGFjZSgvLipcXC4vLCcnKStcIj1cIitjRGF0YVtpXS5pbnB1dHNba2V5XStcIiBcXG5cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGFiZWwgPSBsYWJlbC5yZXBsYWNlKC8sXFxzJC8sJycpO1xuICAgICAgICAgIGR0LmFkZENvbHVtbignbnVtYmVyJywgbGFiZWwpO1xuICAgICAgfVxuICB9IGVsc2Uge1xuICAgICAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCB0eXBlKTtcbiAgfVxuXG4gIC8vIGZpbmQgdGhlIGNvbHVtbiB3ZSB3YW50IHRvIGNoYXJ0XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGNEYXRhWzBdLm91dHB1dFswXS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGNEYXRhWzBdLm91dHB1dFswXVtpXSA9PSB0eXBlKSB7XG4gICAgICAgICAgY29sID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgfVxuXG4gIHZhciBjRGF0ZSA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLURhdGVQbGFudGVkXCIpLnZhbCgpKTtcblxuICB2YXIgZGF0YSA9IFtdO1xuICB2YXIgbWF4ID0gMDtcbiAgLy8gY3JlYXRlIHRoZSBbXVtdIGFycmF5IGZvciB0aGUgZ29vZ2xlIGNoYXJ0XG4gIGZvciAoIHZhciBpID0gMTsgaSA8IGNEYXRhWzBdLm91dHB1dC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHR5cGVvZiBjRGF0YVswXS5vdXRwdXRbaV1bY29sXSA9PT0gJ3N0cmluZycpIGNvbnRpbnVlO1xuXG4gICAgICB2YXIgcm93ID0gW107XG4gICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKGNEYXRlLmdldFllYXIoKSsxOTAwLCBjRGF0ZS5nZXRNb250aCgpK2ksIGNEYXRlLmdldERhdGUoKSk7XG4gICAgICBpZiggY2hhcnRUeXBlID09IFwidGltZWxpbmVcIiApIHtcbiAgICAgICAgICAvLyBhZGQgb24gbW9udGhcbiAgICAgICAgICByb3cucHVzaChkYXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIG0gPSBkYXRlLmdldE1vbnRoKCkrMTtcbiAgICAgICAgICBpZiggbSA8IDEwICkgbSA9ICcwJyttO1xuICAgICAgICAgIHJvdy5wdXNoKGkrJzogJytkYXRlLmdldEZ1bGxZZWFyKCkrJy0nK20pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKCB2YXIgaiA9IDA7IGogPCBjRGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmKCBjRGF0YVtqXS5vdXRwdXRbaV1bY29sXSA+IG1heCApIG1heCA9IGNEYXRhW2pdLm91dHB1dFtpXVtjb2xdO1xuICAgICAgICAgIHJvdy5wdXNoKGNEYXRhW2pdLm91dHB1dFtpXVtjb2xdKTtcbiAgICAgIH1cbiAgICAgIGRhdGEucHVzaChyb3cpO1xuICB9XG5cbiAgZHQuYWRkUm93cyhkYXRhKTtcblxuICBpZiggYXBwLm91dHB1dERlZmluaXRpb25zW3R5cGVdICkge1xuICAgICAgdmFyIGRlc2MgPSBhcHAub3V0cHV0RGVmaW5pdGlvbnNbdHlwZV07XG4gICAgICB2YXIgbGFiZWwgPSBkZXNjLmxhYmVsICYmIGRlc2MubGFiZWwubGVuZ3RoID4gMCA/IFwiIC0gXCIrZGVzYy5sYWJlbCA6IFwiXCI7XG4gICAgICB2YXIgdW5pdHMgPSBkZXNjLnVuaXRzICYmIGRlc2MudW5pdHMubGVuZ3RoID4gMCA/IFwiIFtcIitkZXNjLnVuaXRzK1wiXVwiIDogXCJcIjtcbiAgICAgIHR5cGUgPSB0eXBlK2xhYmVsK3VuaXRzO1xuICB9XG5cblxuICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICB2QXhpcyA6IHtcbiAgICAgICAgICAgICAgdGl0bGUgOiB0eXBlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBoQXhpcyA6IHtcbiAgICAgICAgICAgICAgdGl0bGUgOiBcIk1vbnRoXCJcbiAgICAgICAgICB9XG4gIH1cbiAgaWYoICFzaG93TGVnZW5kICkgb3B0aW9ucy5sZWdlbmQgPSB7cG9zaXRpb246XCJub25lXCJ9O1xuXG4gIGlmKCBzaXplICkge1xuICAgICAgb3B0aW9ucy53aWR0aCA9IHNpemVbMF07XG4gICAgICBvcHRpb25zLmhlaWdodCA9IHNpemVbMV07XG4gIH0gZWxzZSB7XG4gICAgICBvcHRpb25zLndpZHRoID0gcGFuZWwud2lkdGgoKTtcbiAgICAgIG9wdGlvbnMuaGVpZ2h0ID0gb3B0aW9ucy53aWR0aCouNDtcbiAgfVxuICBwYW5lbC53aWR0aChvcHRpb25zLndpZHRoKS5oZWlnaHQob3B0aW9ucy5oZWlnaHQpO1xuXG4gIGlmKCBjaGFydFR5cGUgPT0gJ3RpbWVsaW5lJyApIHtcbiAgICAgIG9wdGlvbnMuZGlzcGxheUFubm90YXRpb25zID0gdHJ1ZTtcbiAgICAgIHZhciBjaGFydCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5Bbm5vdGF0ZWRUaW1lTGluZShwYW5lbFswXSk7XG4gICAgICBjaGFydC5kcmF3KGR0LCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICAgIHZhciBjaGFydCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5MaW5lQ2hhcnQocGFuZWxbMF0pO1xuICAgICAgY2hhcnQuZHJhdyhkdCwgb3B0aW9ucyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlV2VhdGhlckNoYXJ0KHJvb3QsIGRhdGEpIHtcbiAgJChyb290KS5odG1sKCcnKTtcblxuICB2YXIgZHQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uRGF0YVRhYmxlKCk7XG4gIGR0LmFkZENvbHVtbignc3RyaW5nJywgJ01vbnRoJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ01pbiBUZW1wZXJhdHVyZScpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdNYXggVGVtcGVyYXR1cmUnKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnRGV3IFBvaW50Jyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ1ByZWNpcGl0YXRpb24nKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnUmFkaWF0aW9uJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ0RheWxpZ2h0Jyk7XG5cbiAgZm9yKCB2YXIgZGF0ZSBpbiBkYXRhICkge1xuICAgICAgdmFyIG9iaiA9IGRhdGFbZGF0ZV07XG4gICAgICBkdC5hZGRSb3coW1xuICAgICAgICAgIGRhdGUrJycsXG4gICAgICAgICAgb2JqLnRtaW4gfHwgMCxcbiAgICAgICAgICBvYmoudG1heCB8fCAwLFxuICAgICAgICAgIG9iai50ZG1lYW4gfHwgMCxcbiAgICAgICAgICBvYmoucHB0IHx8IDAsXG4gICAgICAgICAgb2JqLnJhZCB8fCAwLFxuICAgICAgICAgIG9iai5kYXlsaWdodCB8fCAwXG4gICAgICBdKTtcbiAgfVxuXG4gIHZhciBjaGFydCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5Db21ib0NoYXJ0KHJvb3QpO1xuICBjaGFydC5kcmF3KGR0LCB3ZWF0aGVyQ2hhcnRPcHRpb25zKTtcblxuICByZXR1cm4gY2hhcnQ7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldEFwcCA6IGZ1bmN0aW9uKGEpIHtcbiAgICBhcHAgPSBhO1xuICB9LFxuICAgIGluaXQgOiBpbml0LFxuICAgIHNldERhdGEgOiBzZXREYXRhLFxuICAgIHNlbGVjdCA6IHNlbGVjdCxcbiAgICB1bnNlbGVjdCA6IHVuc2VsZWN0LFxuICAgIHNlbGVjdEFsbCA6IHNlbGVjdEFsbCxcbiAgICB1bnNlbGVjdEFsbCA6IHVuc2VsZWN0QWxsLFxuICAgIHVwZGF0ZUNoYXJ0cyA6IHVwZGF0ZUNoYXJ0cyxcbiAgICByZW1vdmUgOiByZW1vdmUsXG4gICAgc2hvd1BvcHVwOiBzaG93UG9wdXAsXG4gICAgaGlkZVBvcHVwOiBoaWRlUG9wdXAsXG4gICAgcmVzaXplIDogcmVzaXplLFxuICAgIGNyZWF0ZVdlYXRoZXJDaGFydCA6IGNyZWF0ZVdlYXRoZXJDaGFydFxufVxuIiwidmFyIGdkcml2ZSA9IHJlcXVpcmUoJy4vZ2RyaXZlJyk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICQoXCIjZXhwb3J0LW1vZGFsXCIpLm1vZGFsKHtcbiAgICAgICAgICBzaG93IDogZmFsc2VcbiAgICAgIH0pO1xuXG4gICAgICAkKFwiI3Nob3ctZXhwb3J0LWNzdlwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICBfc2V0TWVzc2FnZShudWxsKTtcblxuICAgICAgICAkKFwiI2V4cG9ydC1uYW1lXCIpLnZhbChcIjNQRyBNb2RlbCBSZXN1bHRzIChcIituZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC8sJyAnKS5yZXBsYWNlKC9cXC5cXGQqWi8sJycpK1wiKVwiKTtcbiAgICAgICAgICAkKFwiI2V4cG9ydC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICAgICAgfSk7XG59XG5cbmZ1bmN0aW9uIF9zZXRNZXNzYWdlKG1zZywgdHlwZSwgcHJvZ3Jlc3MpIHtcbiAgaWYoICFtc2cgKSB7XG4gICAgcmV0dXJuICQoXCIjZXhwb3J0LW1zZ1wiKS5oaWRlKCk7XG4gIH1cbiAgJChcIiNleHBvcnQtbXNnXCIpLnNob3coKTtcblxuICBpZiggcHJvZ3Jlc3MgKSB7XG4gICAgJChcIiNleHBvcnQtbXNnLXByb2dyZXNzXCIpLnNob3coKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiI2V4cG9ydC1tc2ctcHJvZ3Jlc3NcIikuaGlkZSgpO1xuICB9XG5cbiAgJCgnI2V4cG9ydC1tc2cnKS5hdHRyKFwiY2xhc3NcIiwnYWxlcnQgYWxlcnQtJyt0eXBlKTtcbiAgJCgnI2V4cG9ydC1tc2ctdGV4dCcpLmh0bWwobXNnKTtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZVByb2dyZXNzKGluZGV4LCB0b3RhbCkge1xuICBwZXJjZW50ID0gMTAwICogKCBpbmRleCAvIHRvdGFsICk7XG4gICQoXCIjZXhwb3J0LW1zZy1wcm9ncmVzcy1iYXJcIikuYXR0cihcImFyaWEtdmFsdWVub3dcIiwgcGVyY2VudCkuY3NzKFwid2lkdGhcIixwZXJjZW50K1wiJVwiKTtcbn1cblxuLy8gc2VlIGlmIGFuIGVycm9yIGV4aXN0cywgaWYgc28sIHNldCBzdGF0ZVxuZnVuY3Rpb24gX2NoZWNrRXJyb3IoZmlsZSkge1xuICB2YXIgZXJyb3JNZXNzYWdlID0gbnVsbDtcbiAgaWYoICFmaWxlICkgZXJyb3JNZXNzYWdlID0gXCJFcnJvciBjcmVhdGluZyBmaWxlIG9uIEdvb2dsZSBEcml2ZSA6KFwiO1xuICBpZiggZmlsZS5lcnJvciApIGVycm9yTWVzc2FnZSA9IGZpbGUubWVzc2FnZTtcblxuICBpZiggZXJyb3JNZXNzYWdlICkge1xuICAgIF9zZXRNZXNzYWdlKGVycm9yTWVzc2FnZSwgXCJkYW5nZXJcIik7XG4gICAgJChcIiNleHBvcnQtY3N2XCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIkV4cG9ydFwiKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbiAgLy8gZXhwb3J0IGFzIGNzdlxuZnVuY3Rpb24gZXhwb3J0Q3N2KHJlc3VsdHMpIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnZXhwb3J0LWRyaXZlLWNzdicsIDEpO1xuXG4gICQoXCIjZXhwb3J0LWNzdlwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJFeHBvcnRpbmcuLi5cIik7XG5cbiAgdmFyIG5hbWUgPSAkKFwiI2V4cG9ydC1uYW1lXCIpLnZhbCgpO1xuICBpZiggbmFtZS5sZW5ndGggPT0gMCApIHtcbiAgICBfc2V0TWVzc2FnZShcIlBsZWFzZSBwcm92aWRlIGEgZm9sZGVyIG5hbWVcIiwgXCJkYW5nZXJcIilcbiAgICAkKFwiI2V4cG9ydC1jc3ZcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0XCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBkYXRhID0gcmVzdWx0cy5kYXRhO1xuXG4gIC8vIGNyZWF0ZSBhIGxpc3Qgc28gd2UgY2FuIHJlY3Vyc2l2ZWx5IGl0ZXJhdGVcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yKCB2YXIga2V5IGluIGRhdGEgKSBrZXlzLnB1c2goa2V5KTtcblxuICAvLyBjcmVhdGUgZm9sZGVyXG4gIF9zZXRNZXNzYWdlKFwiQ3JlYXRpbmcgZXhwb3J0IGZvbGRlci4uLlwiLCBcImluZm9cIiwgdHJ1ZSk7XG4gIF91cGRhdGVQcm9ncmVzcygxLCBrZXlzLmxlbmd0aCsyKTtcbiAgZ2RyaXZlLnNhdmVGaWxlKG5hbWUsXCJBSEIgM1BHIE1vZGVsIFJlc3VsdHNcIixcImFwcGxpY2F0aW9uL3ZuZC5nb29nbGUtYXBwcy5mb2xkZXJcIixcIlwiLGZ1bmN0aW9uKGZpbGUpe1xuICAgIGlmKCBfY2hlY2tFcnJvcihmaWxlKSApIHJldHVybjtcbiAgICB2YXIgcGFyZW50ID0gZmlsZS5pZDtcbiAgICBfdXBkYXRlUHJvZ3Jlc3MoMiwga2V5cy5sZW5ndGgrMik7XG5cbiAgICAvLyBjcmVhdGUgYSBuaWNlIGZpbGUgZGVzY3JpYmluZyB0aGUgY3VycmVudCBleHBvcnRcbiAgICBfc2V0TWVzc2FnZShcIkNyZWF0aW5nIGNvbmZpZyBmaWxlLi4uXCIsIFwiaW5mb1wiLCB0cnVlKTtcbiAgICBkZWxldGUgcmVzdWx0cy5jb25maWcucGxhbnRhdGlvbl9zdGF0ZTtcbiAgICB2YXIgY29uZmlnID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0cy5jb25maWcsbnVsbCxcIiAgXCIpO1xuICAgIGdkcml2ZS5zYXZlRmlsZShcImNvbmZpZy50eHRcIixcIkFIQiAzUEcgTW9kZWwgLSBSdW4gQ29uZmlndXJhdGlvblwiLFwidGV4dC9wbGFpblwiLGNvbmZpZyxmdW5jdGlvbihmaWxlKXtcbiAgICAgIGlmKCBfY2hlY2tFcnJvcihmaWxlKSApIHJldHVybjtcbiAgICAgIF91cGRhdGVQcm9ncmVzcygzLCBrZXlzLmxlbmd0aCsyKTtcblxuICAgICAgX2NyZWF0ZUV4cG9ydCgwLCBrZXlzLCBkYXRhLCBwYXJlbnQpO1xuICAgIH0se3BhcmVudDogcGFyZW50fSlcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVFeHBvcnQoaW5kZXgsIGtleXMsIGRhdGEsIHBhcmVudCkge1xuXG4gIC8vIHdlIGFyZSBhbGwgZG9uZSA6KVxuICBpZiggaW5kZXggPT0ga2V5cy5sZW5ndGggKSB7XG4gICAgX3VwZGF0ZVByb2dyZXNzKDEsIDEpO1xuICAgIF9zZXRNZXNzYWdlKFwiRXhwb3J0IFN1Y2Nlc3NmdWwuPGJyIC8+PGEgaHJlZj0naHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tLyNmb2xkZXJzL1wiICsgcGFyZW50ICtcbiAgICAgICAgICBcIicgdGFyZ2V0PSdfYmxhbmsnPjxpIGNsYXNzPSdpY29uLWV4dGVybmFsLWxpbmstc2lnbic+PC9pPiBPcGVuIGluIEdvb2dsZSBEcml2ZTwvYT5cIiwgXCJzdWNjZXNzXCIpO1xuICAgICQoXCIjZXhwb3J0LWNzdlwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJFeHBvcnRcIik7XG4gIH0gZWxzZSB7XG5cbiAgICB2YXIga2V5ID0ga2V5c1tpbmRleF07XG4gICAgdmFyIGNzdiA9IFwiXCI7XG5cbiAgICAvLyBUT0RPOiBhZGQgbW9udGggYW5kIGRhdGVcblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZGF0YVtrZXldLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIGRhdGFba2V5XVtpXS5sZW5ndGggPT0gMCApIGNvbnRpbnVlOyAvLyBpZ25vcmUgdGhlIGJsYW5rIHJvd3NcblxuICAgICAgZm9yKCB2YXIgaiA9IDA7IGogPCBkYXRhW2tleV1baV0ubGVuZ3RoOyBqKysgKSBjc3YgKz0gZGF0YVtrZXldW2ldW2pdK1wiLFwiO1xuICAgICAgY3N2ID0gY3N2LnJlcGxhY2UoLywkLywnJykrXCJcXG5cIjtcbiAgICB9XG5cbiAgICBfc2V0TWVzc2FnZShcIkNyZWF0aW5nIFwiK2tleXNbaW5kZXhdK1wiLmNzdi4uLiBcIiwgXCJpbmZvXCIsIHRydWUpO1xuICAgIGdkcml2ZS5zYXZlRmlsZShrZXlzW2luZGV4XStcIi5jc3ZcIixcIlwiLFwidGV4dC9jc3ZcIixjc3YsZnVuY3Rpb24oZmlsZSl7XG4gICAgICBpZiggX2NoZWNrRXJyb3IoZmlsZSkgKSByZXR1cm47XG5cbiAgICAgIF91cGRhdGVQcm9ncmVzcyhpbmRleCs0LCBrZXlzLmxlbmd0aCsyKTtcblxuICAgICAgaW5kZXgrKztcbiAgICAgIF9jcmVhdGVFeHBvcnQoaW5kZXgsIGtleXMsIGRhdGEsIHBhcmVudCk7XG4gICAgfSx7Y29udmVydDogdHJ1ZSwgcGFyZW50OiBwYXJlbnR9KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGV4cG9ydENzdiA6IGV4cG9ydENzdixcbiAgaW5pdCAgICAgIDogaW5pdFxufTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9icm93c2Vyc3RhY2svZmxhc2hibG9jay1kZXRlY3RvclxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNhbGxiYWNrTWV0aG9kKXtcbiAgICB2YXIgcmV0dXJuX3ZhbHVlID0gMDtcblxuICAgIGlmKG5hdmlnYXRvci5wbHVnaW5zW1wiU2hvY2t3YXZlIEZsYXNoXCJdKSB7XG4gICAgICAgICAgZW1iZWRfbGVuZ3RoID0gJCgnZW1iZWQnKS5sZW5ndGg7XG4gICAgICAgICAgb2JqZWN0X2xlbmd0aCA9ICQoJ29iamVjdCcpLmxlbmd0aDtcblxuICAgICAgICAgIGlmKChlbWJlZF9sZW5ndGggPiAwKSB8fCAob2JqZWN0X2xlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICAgIC8qIE1hYyAvIENocm9tZSB1c2luZyBGbGFzaEJsb2NrICsgTWFjIC8gU2FmYXJpIHVzaW5nIEFkQmxvY2sgKi9cbiAgICAgICAgICAgICAgJCgnb2JqZWN0LCBlbWJlZCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCQodGhpcykuY3NzKCdkaXNwbGF5JykgPT09ICdub25lJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5fdmFsdWUgPSAyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8qIE1hYyAvIEZpcmVmb3ggdXNpbmcgRmxhc2hCbG9jayAqL1xuICAgICAgICAgICAgICBpZiggJCgnZGl2W2JnaW5hY3RpdmVdJykubGVuZ3RoID4gMCApe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5fdmFsdWUgPSAyO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgIH0gZWxzZSBpZihuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ01TSUUnKSA+IC0xKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgbmV3IEFjdGl2ZVhPYmplY3QoJ1Nob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoJyk7XG4gICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgIHJldHVybl92YWx1ZSA9IDI7XG4gICAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgICAgLyogSWYgZmxhc2ggaXMgbm90IGluc3RhbGxlZCAqL1xuICAgICAgICAgIHJldHVybl92YWx1ZSA9IDE7XG4gICAgfVxuXG4gICAgaWYoY2FsbGJhY2tNZXRob2QgJiYgdHlwZW9mKGNhbGxiYWNrTWV0aG9kKSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY2FsbGJhY2tNZXRob2QocmV0dXJuX3ZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByZXR1cm5fdmFsdWU7XG4gICAgfVxufTtcbiIsInZhciBPYXV0aCA9IHJlcXVpcmUoJy4vb2F1dGgnKTtcbnZhciBnZHJpdmVSVCA9IHJlcXVpcmUoJy4vZ2RyaXZlUlQnKTtcblxuXG4gIHZhciBNSU1FX1RZUEUgPSBcImFwcGxpY2F0aW9uL3ZuZC5haGItM3BnLnJ1blwiO1xuICB2YXIgVFJFRV9NSU1FX1RZUEUgPSBcImFwcGxpY2F0aW9uL3ZuZC5haGItM3BnLnRyZWVcIjtcbiAgdmFyIERSSVZFX0FQSV9WRVJTSU9OID0gXCJ2MlwiO1xuXG4gIC8vIGdvb2dsZSBvYXV0aCBhY2Nlc3MgdG9rZW5cbiAgdmFyIHRva2VuID0gXCJcIjtcblxuICAvLyBjdXJyZW50bHkgbG9hZGVkIGdkcml2ZSBmaWxlIGlkXG4gIHZhciBsb2FkZWRGaWxlID0gbnVsbDtcbiAgLy8gbGlzdCBvZiBjdXJyZW50bHkgbG9hZGVkIGZpbGVzIChtZXRhZGF0YSlcbiAgdmFyIGZpbGVMaXN0ID0gW107XG4gIC8vIGdvb2dsZSBkcml2ZSBzaGFyZSBjbGllbnRcbiAgdmFyIGNsaWVudCA9IG51bGw7XG5cbiAgLy8gbG9hZGVkIHRyZWUgYW5kIG1hbmFnZW1lbnRcbiAgdmFyIGxvYWRlZFRyZWUgPSBudWxsO1xuICAvLyBsaXN0IG9mIGN1cnJlbnRseSBsb2FkZWQgdHJlZSBmaWxlcyAobWV0YWRhdGEpXG4gIHZhciB0cmVlTGlzdCA9IFtdO1xuXG4gIC8vIGN1cnJlbnQgTUlNRSBUWVBFIHdlIGFyZSBzYXZpbmdcbiAgdmFyIHNhdmVNaW1lVHlwZSA9IFwiXCI7XG5cbiAgLyoqKlxuICAgKiAgSW5pdGlhbGl6ZSBnb29nbGUgZHJpdmUgcGFuZWxzLCBidG5zIGFuZCBsb2dpblxuICAgKioqL1xuICBmdW5jdGlvbiBpbml0KGNhbGxiYWNrKSB7XG5cbiAgICAvLyBpbml0IGJvb3RzdHJhcCBtb2RhbFxuICAgICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCh7XG4gICAgICBzaG93IDogZmFsc2VcbiAgICB9KTtcblxuICAgIC8vIGluaXQgYm9vdHN0cmFwIG1vZGFsXG4gICAgJChcIiNsb2FkLW1vZGFsXCIpLm1vZGFsKHtcbiAgICAgIHNob3cgOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAgICQoXCIjYWJvdXQtbW9kYWxcIikubW9kYWwoe1xuICAgICAgc2hvdyA6IGZhbHNlXG4gICAgfSk7XG5cbiAgICAvLyB0aGUgYWJvdXQgbW9kYWwgbGluayBpcyBjcmVhdGVkIGJlbG93LCBzbyB3aHkgbm90Li4uXG4gICAgJChcIiNoZWxwLW1vZGFsXCIpLm1vZGFsKHtcbiAgICAgIHNob3cgOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgLy8gc2V0IHRoZSAndXBkYXRlJyBidG4gY2xpY2sgaGFuZGxlclxuICAgICQoXCIjc2F2ZS11cGRhdGUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgX3VwZGF0ZUN1cnJlbnRGaWxlKCk7XG4gICAgfSk7XG5cbiAgICAvLyBzZXQgdGhlICduZXcnIGJ0biBjbGljayBoYW5kbGVyXG4gICAgJChcIiNzYXZlLW5ldy1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBfc2F2ZU5ld0ZpbGUoKTtcbiAgICB9KTtcblxuICAgIC8vIGNyZWF0ZSB0aGUgdG9wIHJpZ2h0IG1lbnVcbiAgICBfY3JlYXRlTG9naW5CdG4oKTtcblxuICAgIC8vIGxvYWQgdGhlIGdvb2dsZSBhdXRoIGFuZCBkcml2ZSBhcGknc1xuICAgIF9sb2FkQXBpKGZ1bmN0aW9uKCkge1xuICAgICAgLy8gaWYgdGhlIHVzZXIgaXMgYXV0aG9yaXplZCBncmFiIHRoZSByZWZyZXNoIHRva2VuXG4gICAgICBPYXV0aC5pc0F1dGhvcml6ZWQoZnVuY3Rpb24ocmVmcmVzaFRva2VuKXtcbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gcmVmcmVzaCB0b2tlbiwgbGVhdmUsIHdlIGFyZSBpbml0aWFsaXplZFxuICAgICAgICBpZiggIXJlZnJlc2hUb2tlbiApIHJldHVybiBjYWxsYmFjaygpO1xuXG4gICAgICAgIC8vIGlmIHdlIGhhdmUgYSByZWZlc2ggdG9rZW4sIHRoZW4gdXNlciBpcyBhbGwgc2V0LFxuICAgICAgICAvLyBnZXQgYSBuZXcgYWNjZXNzIHRva2VuIHNvIHdlIGNhbiBzdGFydCB1c2luZyB0aGUgYXBpJ3NcbiAgICAgICAgLy8gZ3JhYiB0aGVpciBpbmZvcm1hdGlvbiBhbmQgZGlzcGxheVxuICAgICAgICBPYXV0aC5nZXRBY2Nlc3NUb2tlbihmdW5jdGlvbih0KXtcbiAgICAgICAgICB0b2tlbiA9IHQ7XG4gICAgICAgICAgaWYoIHRva2VuICkgX3NldFVzZXJJbmZvKCk7XG4gICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gY2hlY2sgaWYgYWNjZXNzIHRva2VuIGhhcyBleHBpcmVkXG4gICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgX2NoZWNrVG9rZW4oKTtcbiAgICAgIH0sIDEwMDAgKiA1ICogNjApO1xuICAgIH0pO1xuXG4gICAgLy8gc2V0dXAgdGhlIHRyZWUgJ3NoYXJlJyBidG5cbiAgICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAvLyBzZWUgaWYgd2UgaGF2ZSBhIHNoYXJlIGNsaWVudFxuICAgICAgaWYoIGNsaWVudCA9PSBudWxsICkge1xuICAgICAgICAvLyBubyBjbGllbnQsIGxvYWQgYXBpXG4gICAgICAgIGdhcGkubG9hZCgnZHJpdmUtc2hhcmUnLCBmdW5jdGlvbigpe1xuICAgICAgICAgIC8vIG9uIGxvYWQsIHNob3cgdGhlIHNoYXJlIHBvcHVwIHdpdGggdGhlIGN1cnJlbnQgdHJlZVxuICAgICAgICAgICBjbGllbnQgPSBuZXcgZ2FwaS5kcml2ZS5zaGFyZS5TaGFyZUNsaWVudChPYXV0aC5BUFBfSUQpO1xuICAgICAgICAgICAgY2xpZW50LnNldEl0ZW1JZHMoW2xvYWRlZFRyZWVdKTtcbiAgICAgICAgICAgY2xpZW50LnNob3dTZXR0aW5nc0RpYWxvZygpO1xuICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB3ZSBoYXZlIGEgY2xpZW50LCBzaG93IHRoZSBzaGFyZSBwb3B1cCB3aXRoIGN1cnJlbnQgdHJlZVxuICAgICAgICBjbGllbnQuc2V0SXRlbUlkcyhbbG9hZGVkRmlsZV0pO1xuICAgICAgICAgY2xpZW50LnNob3dTZXR0aW5nc0RpYWxvZygpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICAvKioqXG4gICAqIFNhdmUgdGhlIGN1cnJlbnQgbW9kZWwgYXMgYSBuZXcgZ29vZ2xlIGRyaXZlIGZpbGVcbiAgICoqKi9cbiAgZnVuY3Rpb24gX3NhdmVOZXdGaWxlKCkge1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3NhdmUtZHJpdmUtZmlsZScsIDEpO1xuXG4gICAgLy8gZ3JhYiB0aGUgbmFtZSBvZiB0aGUgbmV3IGZpbGVcbiAgICB2YXIgbmFtZSA9ICQoXCIjc2F2ZS1uYW1lLWlucHV0XCIpLnZhbCgpO1xuICAgIGlmKCBuYW1lLmxlbmd0aCA9PSAwICkgeyAvLyB3ZSBhbHdheXMgd2FudCBhIG5hbWUsIGFsZXJ0IGFuZCBxdWl0XG4gICAgICBfc2V0U2F2ZU1lc3NhZ2UoJ1BsZWFzZSBwcm92aWRlIGEgZmlsZW5hbWUuJywnaW5mbycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHNlZSB3aGF0IGtpbmQgb2YgZmlsZSB3ZSBhcmUgY3JlYXRpbmcgYmFzZWQgb24gdGhlIHNhdmVNaW1lVHlwZSB2YXJcbiAgICBpZiggc2F2ZU1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICAgIGRhdGEgPSBtM1BHSU8uZXhwb3J0U2V0dXAoKTtcbiAgICB9IGVsc2UgaWYgKCBzYXZlTWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7XG4gICAgICBkYXRhID0gbTNQR0lPLmV4cG9ydFNldHVwKCkudHJlZTtcbiAgICB9IGVsc2UgeyAvLyBiYWRuZXNzXG4gICAgICBhbGVydChcIlVua25vd24gTUlNRV9UWVBFOiBcIitzYXZlTWltZVR5cGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHNldCB0aGUgdXNlciBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgX3NldFNhdmVNZXNzYWdlKCc8aSBjbGFzcz1cImljb24tc3Bpbm5lciBpY29uLXNwaW5cIj48L2k+IFNhdmluZyBGaWxlLi4uJywnaW5mbycpO1xuXG4gICAgLy8gc2F2ZSB0aGUgZmlsZVxuICAgIHNhdmVGaWxlKG5hbWUsXG4gICAgICAgICQoXCIjc2F2ZS1kZXNjcmlwdGlvbi1pbnB1dFwiKS52YWwoKSxcbiAgICAgICAgc2F2ZU1pbWVUeXBlLFxuICAgICAgICBkYXRhLFxuICAgICAgICBmdW5jdGlvbihyZXNwKSB7XG4gICAgICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2hhdCBoYXBwZW5lZFxuICAgICAgICAgIGlmKCByZXNwLmVycm9yICkgcmV0dXJuIF9zZXRTYXZlTWVzc2FnZSgnRmFpbGVkIHRvIHNhdmUgdG8gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICAgICAgZWxzZSBfc2V0U2F2ZU1lc3NhZ2UoJ1N1Y2Vzc2Z1bGx5IHNhdmVkLicsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAgIC8vIHdhaXQgYSB0aWNrIHRvIGhpZGUgdGhlIHBvcHVwLCBzbyB1c2VyIHNlZXMgc3VjY2VzcyBtZXNzYWdlXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgJChcIiNzYXZlLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICAgICAgfSwxNTAwKTtcblxuICAgICAgICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0blxuICAgICAgICAgIGlmKCBzYXZlTWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIG5ldyBmaWxlLCB1cGRhdGUgb3VyIGxpc3RcbiAgICAgICAgICAgIF91cGRhdGVGaWxlTGlzdCgpO1xuXG4gICAgICAgICAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5zXG4gICAgICAgICAgICAkKFwiI3NoYXJlLWJ0blwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgICAgICAkKFwiI29wZW4taW4tZHJpdmVcIikuYXR0cihcImhyZWZcIixcImh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2ZpbGUvZC9cIityZXNwLmlkKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgbG9hZGVkIGZpbGUgaWRcbiAgICAgICAgICAgIGxvYWRlZEZpbGUgPSByZXNwLmlkO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIHNhdmVNaW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHtcbiAgICAgICAgICAgIC8vIHdlIGhhdmUgYSBuZXcgdHJlZSwgdXBkYXRlIHRoZSBsaXN0XG4gICAgICAgICAgICBfdXBkYXRlVHJlZUxpc3QoKTtcblxuICAgICAgICAgICAgLy8gc2hvdyB0aGUgdHJlZSBzaGFyZSBidG5zXG4gICAgICAgICAgICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLnNob3coKTtcbiAgICAgICAgICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKG5hbWUpLnBhcmVudCgpLnNob3coKTtcblxuICAgICAgICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgdHJlZXNcbiAgICAgICAgICAgIGxvYWRlZFRyZWUgPSByZXNwLmlkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICk7XG4gIH1cblxuICAvKioqXG4gICAqIFVwZGF0ZSB0aGUgY3VycmVudGx5IGxvYWRlZCBnb29nbGUgZHJpdmUgZmlsZVxuICAgKioqL1xuICBmdW5jdGlvbiBfdXBkYXRlQ3VycmVudEZpbGUoKSB7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAndXBkYXRlLWRyaXZlLWZpbGUnLCAxKTtcblxuICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgX3NldFNhdmVNZXNzYWdlKCc8aSBjbGFzcz1cImljb24tc3Bpbm5lciBpY29uLXNwaW5cIj48L2k+IFVwZGF0aW5nLi4uJywnaW5mbycpO1xuXG4gICAgdmFyIGZpbGUgPSB7fTtcbiAgICB2YXIgZGF0YSA9IHt9O1xuXG4gICAgLy8gZ3JhYiB0aGUgY29ycmVudCBkYXRhIGFuZCBmaWxlaWQgYmFzZWQgb24gbWltZVR5cGVcbiAgICBpZiggc2F2ZU1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICAgIGZpbGUgPSBsb2FkZWRGaWxlO1xuICAgICAgZGF0YSA9IG0zUEdJTy5leHBvcnRTZXR1cCgpO1xuICAgIH0gZWxzZSBpZiAoIHNhdmVNaW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHtcbiAgICAgIGZpbGUgPSBsb2FkZWRUcmVlO1xuICAgICAgZGF0YSA9IG0zUEdJTy5leHBvcnRTZXR1cCgpLnRyZWU7XG4gICAgfSBlbHNlIHsgLy8gYmFkbmVzc1xuICAgICAgYWxlcnQoXCJVbmtub3duIE1JTUVfVFlQRTogXCIrc2F2ZU1pbWVUeXBlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgdGhlIGdvb2dsZSBkcml2ZSBmaWxlXG4gICAgdXBkYXRlRmlsZShmaWxlLFxuICAgICAgICBkYXRhLFxuICAgICAgICBmdW5jdGlvbihyZXNwKXtcbiAgICAgICAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3aGF0IGhhcHBlbmVkXG4gICAgICAgICAgaWYoIHJlc3AuZXJyb3IgKSByZXR1cm4gX3NldFNhdmVNZXNzYWdlKCdGYWlsZWQgdG8gdXBkYXRlIG9uIEdvb2dsZSBEcml2ZSA6KCcsJ2RhbmdlcicpO1xuICAgICAgICAgIGVsc2UgX3NldFNhdmVNZXNzYWdlKCdVcGRhdGUgU3VjY2Vzc2Z1bC4nLCdzdWNjZXNzJyk7XG5cbiAgICAgICAgICAvLyB3YWl0IGEgdGljayBzbyB0aGUgdXNlciBrbm93cyB1cGRhdGUgd2FzIHN1Y2Nlc3NcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKFwiI3NhdmUtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgICB9LDE1MDApO1xuXG4gICAgICAgICAgLy8gdXBkYXRlIHRoZSBsaXN0IGZvciB3aGF0ZXZlciB0eXBlIHdhcyB1cGRhdGVkXG4gICAgICAgICAgaWYoIHNhdmVNaW1lVHlwZSA9PSBNSU1FX1RZUEUgKSB7XG4gICAgICAgICAgICBfdXBkYXRlRmlsZUxpc3QoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCBzYXZlTWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7XG4gICAgICAgICAgICBfdXBkYXRlVHJlZUxpc3QoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgLyoqKlxuICAgKiBzZXQgYSBtZXNzYWdlIGZvciB0aGUgJ2xvYWQgZnJvbSBkcml2ZScgcG9wdXAuXG4gICAqICB0eXBlIC0gYm9vc3RyYXAgYWxlcnQgdHlwZVxuICAgKioqL1xuICBmdW5jdGlvbiBfc2V0TG9hZE1lc3NhZ2UobXNnLCB0eXBlKSB7XG4gICAgaWYoICFtc2cgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1tc2dcIikuaHRtbChcIlwiKTtcbiAgICAkKCcjZ2RyaXZlLWZpbGUtbXNnJykuaHRtbCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LScrdHlwZSsnXCI+Jyttc2crJzwvZGl2PicpO1xuICB9XG5cbiAgLyoqKlxuICAgKiBzZXQgYSBtZXNzYWdlIGZvciB0aGUgJ3NhdmUgdG8gZHJpdmUnIHBvcHVwXG4gICAqIHR5cGUgLSBib29zdHJhcCBhbGVydCB0eXBlXG4gICAqKiovXG4gIGZ1bmN0aW9uIF9zZXRTYXZlTWVzc2FnZShtc2csIHR5cGUpIHtcbiAgICBpZiggIW1zZyApIHJldHVybiAkKFwiI2dkcml2ZS1zYXZlLW1zZ1wiKS5odG1sKFwiXCIpO1xuICAgICQoJyNnZHJpdmUtc2F2ZS1tc2cnKS5odG1sKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtJyt0eXBlKydcIj4nK21zZysnPC9kaXY+Jyk7XG4gIH1cblxuICAvKioqXG4gICAqIGNyZWF0ZSB0aGUgdG9wIHJpZ2h0IG1lbnUuIFRoaXMgbWVudSBpcyBmb3Igd2hlbiB0aGUgdXNlciBpcyBub3QgbG9nZ2VkIGluXG4gICAqKiovXG4gIGZ1bmN0aW9uIF9jcmVhdGVMb2dpbkJ0bigpIHtcbiAgICB2YXIgYnRuID0gJCgnPGxpIGNsYXNzPVwiZHJvcGRvd25cIj4nXG4gICAgICAgICsgJzxhIGNsYXNzPVwiZHJvcGRvd24tdG9nZ2xlXCIgc3R5bGU9XCJjdXJzb3I6cG9pbnRlclwiPkxvZ2luPGIgY2xhc3M9XCJjYXJldFwiPjwvYj48L2E+J1xuICAgICAgICArICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+J1xuICAgICAgICArICc8bGk+PGEgaWQ9XCJoZWxwXCI+PGkgY2xhc3M9XCJpY29uLXF1ZXN0aW9uLXNpZ25cIj48L2k+IEhlbHA8L2E+PC9saT4nXG4gICAgICAgICsgJzxsaT48YSBpZD1cImFib3V0XCI+PGkgY2xhc3M9XCJpY29uLWluZm8tc2lnblwiPjwvaT4gQWJvdXQ8L2E+PC9saT4nXG4gICAgICAgICsgJzxsaT48YSBpZD1cImxvZ2luLXdpdGgtZ29vZ2xlXCI+PGkgY2xhc3M9XCJpY29uLXNpZ25pblwiPjwvaT4gTG9naW4gd2l0aCBHb29nbGU8L2E+PC9saT4nXG4gICAgICAgICsgJzwvdWw+PC9saT4nKTtcblxuICAgIC8vIHNldCBjbGljayBoYW5kbGVycyBmb3IgcG9wdXBcbiAgICBidG4uZmluZCgnYS5kcm9wZG93bi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIH0pO1xuXG4gICAgLy8gYWJvdXQgY2xpY2sgaGFuZGxlclxuICAgIGJ0bi5maW5kKCcjYWJvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICAgIH0pO1xuXG4gICAgYnRuLmZpbmQoJyNoZWxwJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAgIHNob3dIZWxwKCk7XG4gICAgfSk7XG5cbiAgICAvLyBsb2dpbiBjbGljayBoYW5kbGVyXG4gICAgYnRuLmZpbmQoJyNsb2dpbi13aXRoLWdvb2dsZScpLm9uKCdjbGljaycsZnVuY3Rpb24oKSB7XG4gICAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd1c2VyLWxvZ2luJywgMSk7XG4gICAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAgIHNpZ25JbihmdW5jdGlvbih0b2tlbikge1xuICAgICAgICBfc2V0VXNlckluZm8oKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gYWRkIG1lbnVcbiAgICAkKFwiI2xvZ2luLWhlYWRlclwiKS5odG1sKFwiXCIpLmFwcGVuZChidG4pO1xuICB9O1xuXG4gIC8qKipcbiAgICogQ3JlYXRlIHRoZSB0b3AgcmlnaHQgbWVudSBmb3Igd2hlbiB0aGUgdXNlciBpcyBsb2dnZWQgaW5cbiAgICoqKi9cbiAgZnVuY3Rpb24gX2NyZWF0ZUxvZ291dEJ0bih1c2VyZGF0YSkge1xuICAgIC8vIHNldCBidG4gaHRtbFxuICAgIHZhciBidG4gPSAkKCc8bGkgY2xhc3M9XCJkcm9wZG93blwiPidcbiAgICAgICAgKyAnPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGVcIiBzdHlsZT1cImN1cnNvcjpwb2ludGVyXCI+PGltZyBjbGFzcz1cImltZy1yb3VuZGVkXCIgc3JjPVwiJyt1c2VyZGF0YS5waWN0dXJlXG4gICAgICAgICsgJ1wiIHN0eWxlPVwibWFyZ2luOi01cHggNXB4IC01cHggMDt3aWR0aDoyOHB4O2hlaWdodDoyOHB4O2JvcmRlcjoxcHggc29saWQgd2hpdGVcIiAvPiAnICsgdXNlcmRhdGEubmFtZVxuICAgICAgICArICc8YiBjbGFzcz1cImNhcmV0XCI+PC9iPjwvYT4nICsgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nXG4gICAgICAgICsgJzxsaT48YSBpZD1cInNhdmVcIj48aSBjbGFzcz1cImljb24tY2xvdWQtdXBsb2FkXCI+PC9pPiBTYXZlIE1vZGVsPC9hPjwvbGk+J1xuICAgICAgICArICc8bGkgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48YSBpZD1cInNoYXJlLWJ0blwiPjxpIGNsYXNzPVwiaWNvbi1zaGFyZVwiPjwvaT4gU2hhcmUgTW9kZWw8L2E+PC9saT4nXG4gICAgICAgICsgJzxsaSBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxhIGlkPVwib3Blbi1pbi1kcml2ZVwiIHRhcmdldD1cIl9ibGFua1wiPjxpIGNsYXNzPVwiaWNvbi1leHRlcm5hbC1saW5rLXNpZ25cIj48L2k+IE9wZW4gaW4gR29vZ2xlIERyaXZlPC9hPjwvbGk+J1xuICAgICAgICArICc8bGk+PGEgaWQ9XCJsb2FkXCI+PGkgY2xhc3M9XCJpY29uLWNsb3VkLWRvd25sb2FkXCI+PC9pPiBMb2FkIE1vZGVsPC9hPjwvbGk+J1xuICAgICAgICArICc8bGk+PGEgaWQ9XCJoZWxwXCI+PGkgY2xhc3M9XCJpY29uLXF1ZXN0aW9uLXNpZ25cIj48L2k+IEhlbHA8L2E+PC9saT4nXG4gICAgICAgICsgJzxsaT48YSBpZD1cImFib3V0XCI+PGkgY2xhc3M9XCJpY29uLWluZm8tc2lnblwiPjwvaT4gQWJvdXQ8L2E+PC9saT4nXG4gICAgICAgICsgJzxsaT48YSBpZD1cImxvZ291dFwiPjxpIGNsYXNzPVwiaWNvbi1zaWdub3V0XCI+PC9pPiBMb2dvdXQ8L2E+PC9saT4nXG4gICAgICAgICsgJzwvdWw+PC9saT4nKTtcblxuICAgIC8vIGFkZCBjbGljayBoYW5kbGVyIHRvIHNob3cgbWVudVxuICAgIGJ0bi5maW5kKCdhLmRyb3Bkb3duLXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgfSk7XG5cbiAgICAvLyBzaG93IHRoZSBzYXZlIHBvcHVwXG4gICAgYnRuLmZpbmQoJyNzYXZlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAvLyBzZXQgdGhlIGN1cnJlbnQgc2F2ZSBtaW1lVHlwZVxuICAgICAgc2F2ZU1pbWVUeXBlID0gTUlNRV9UWVBFO1xuXG4gICAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3aGF0IHR5cCB0aGV5IGFyZSBzYXZpbmdcbiAgICAgICQoXCIjZ2RyaXZlLXNhdmUtc3ViaGVhZGVyXCIpLmh0bWwoXCI8aDU+U2F2ZSBNb2RlbDwvaDU+XCIpO1xuXG4gICAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblxuICAgICAgLy8gaWYgdGhlIGZpbGUgaXMgbG9hZGVkLCBzaG93IHRoZSB1cGRhdGUgcGFuZWxcbiAgICAgIGlmKCBsb2FkZWRGaWxlICE9IG51bGwpIHtcbiAgICAgICAgLy8gZ3JhYiB0aGUgY3VycmVudCBmaWxlcyBtZXRhZGF0YVxuICAgICAgICB2YXIgZmlsZSA9IHt9O1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgIGlmKCBmaWxlTGlzdFtpXS5pZCA9PSBsb2FkZWRGaWxlKSB7XG4gICAgICAgICAgICBmaWxlID0gZmlsZUxpc3RbaV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzaG93IHRoZSB1cGRhdGUgcGFuZWxcbiAgICAgICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbFwiKS5zaG93KCk7XG5cbiAgICAgICAgLy8gcmVuZGVyIHRoZSBmaWxlcyBtZXRhZGF0YSBpbiB0aGUgdXBkYXRlIHBhbmVsXG4gICAgICAgIHZhciBkID0gbmV3IERhdGUoZmlsZS5tb2RpZmllZERhdGUpO1xuICAgICAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsLWlubmVyXCIpLmh0bWwoXCI8Yj5cIitmaWxlLnRpdGxlK1wiPC9iPjxiciAvPlwiICtcbiAgICAgICAgICAgIFwiPHNwYW4gc3R5bGU9J2NvbG9yOiM4ODgnPlwiK2ZpbGUuZGVzY3JpcHRpb24rXCI8L3NwYW4+PGJyIC8+XCIrXG4gICAgICAgICAgICBcIjxzcGFuIHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDsnPkxhc3QgTW9kaWZpZWQ6IFwiICtcbiAgICAgICAgICAgIGQudG9EYXRlU3RyaW5nKCkrXCIgXCIrZC50b0xvY2FsZVRpbWVTdHJpbmcoKStcIiBieSBcIitmaWxlLmxhc3RNb2RpZnlpbmdVc2VyTmFtZStcIjwvc3Bhbj48YnIgLz5cIitcbiAgICAgICAgICAgIFwiPGEgaHJlZj0naHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC9cIitmaWxlLmlkK1wiJycgdGFyZ2V0PSdfYmxhbmsnPjxpIGNsYXNzPSdpY29uLWxpbmsnPjwvaT4gXCIgK1xuICAgICAgICAgICAgXCJMaW5rIHRvIFNoYXJlPC9hPiA8c3BhbiBzdHlsZT0nY29sb3I6Izg4OCc+KG11c3QgaGF2ZSBwZXJtaXNzaW9uKTwvc3Bhbj48YnIgLz48YnIgLz5cIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsXCIpLmhpZGUoKTtcbiAgICAgIH1cblxuICAgICAgLy8gY2xlYXIgYW55IG1lc3NhZ2VcbiAgICAgIF9zZXRTYXZlTWVzc2FnZShudWxsKTtcblxuICAgICAgLy8gc2hvdyB0aGUgc2F2ZSBwb3B1cFxuICAgICAgJChcIiNzYXZlLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gICAgfSk7XG5cbiAgICAvLyBjbGljayBoYW5kbGVyIGZvciBzaGFyZSBidG5cbiAgICBidG4uZmluZChcIiNzaGFyZS1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ29wZW4tZHJpdmUtc2hhcmUnLCAxKTtcblxuICAgICAgLy8gaGFzIHRoZSBzaGFyZSBjbGllbnQgYmVlbiBsb2FkZWRcbiAgICAgIGlmKCBjbGllbnQgPT0gbnVsbCApIHtcbiAgICAgICAgLy8gbG9hZCB0aGUgc2hhcmUgcG9wdXBcbiAgICAgICAgZ2FwaS5sb2FkKCdkcml2ZS1zaGFyZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgLy8gY3JlYXRlIGFuZCBzaG93IHRoZSBzaGFyZSBwb3B1cFxuICAgICAgICAgICBjbGllbnQgPSBuZXcgZ2FwaS5kcml2ZS5zaGFyZS5TaGFyZUNsaWVudChPYXV0aC5BUFBfSUQpO1xuICAgICAgICAgICAgY2xpZW50LnNldEl0ZW1JZHMoW2xvYWRlZEZpbGVdKTtcbiAgICAgICAgICAgY2xpZW50LnNob3dTZXR0aW5nc0RpYWxvZygpO1xuICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzaG93IHRoZSBzaGFyZSBwb3B1cFxuICAgICAgICBjbGllbnQuc2V0SXRlbUlkcyhbbG9hZGVkRmlsZV0pO1xuICAgICAgICAgY2xpZW50LnNob3dTZXR0aW5nc0RpYWxvZygpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gc2hvdyBhYm91dCBwYW5lbFxuICAgIGJ0bi5maW5kKCcjYWJvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICAgIH0pO1xuXG4gICAgYnRuLmZpbmQoJyNoZWxwJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAgIHNob3dIZWxwKCk7XG4gICAgfSk7XG5cbiAgICAvLyBzaG93IHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwYW5lbFxuICAgIGJ0bi5maW5kKCcjbG9hZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG5cbiAgICAgIC8vIGhpZGUgYW55IGV4aXN0aW5nIG1lc3NhZ2VcbiAgICAgIF9zZXRMb2FkTWVzc2FnZShudWxsKTtcblxuICAgICAgLy8gcmVuZGVyIHRoZSBtb2RlbCBmaWxlcyBpbiB0aGUgcG9wdXAgZmlsZXNcbiAgICAgIF9zaG93RHJpdmVGaWxlcygpO1xuXG4gICAgICAvLyBzaG93IHRoZSBtb2RhbFxuICAgICAgJChcIiNsb2FkLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gICAgfSk7XG5cbiAgICAvLyBsb2FkIHRoZSB1c2VyIG91dFxuICAgIGJ0bi5maW5kKCcjbG9nb3V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd1c2VyLWxvZ291dCcsIDEpO1xuXG4gICAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblxuICAgICAgLy8ga2lsbCB0aGUgYWNjZXNzIHRva2VuXG4gICAgICB0b2tlbiA9IG51bGw7XG5cbiAgICAgIC8vIHVwZGF0ZSB0aGUgbWVudSBwYW5lbFxuICAgICAgX2NyZWF0ZUxvZ2luQnRuKCk7XG4gICAgfSk7XG5cbiAgICAvLyBhdHRhY2ggdGhlIG1lbnVcbiAgICAkKFwiI2xvZ2luLWhlYWRlclwiKS5odG1sKFwiXCIpLmFwcGVuZChidG4pO1xuICB9O1xuXG4gIC8qKipcbiAgICogIFJlcXVlc3QgdGhlIHVzZXIncyBpbmZvcm1hdGlvbi4gIFdoZW4gbG9hZGVkLCB1cGRhdGUgdGhlIHRvcCByaWdodCBtZW51XG4gICAqKiovXG4gIGZ1bmN0aW9uIF9zZXRVc2VySW5mbygpIHtcbiAgICAvLyBsb2FkIHVzZXIgbmFtZVxuICAgICQuYWpheCh7XG4gICAgICB1cmwgOiBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL29hdXRoMi92MS91c2VyaW5mb1wiLFxuICAgICAgYmVmb3JlU2VuZCA6IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiAgICAgICAgLy8gYWx3YXlzIHNldCB5b3VyIGFjY2VzcyBzdG9rZW5cbiAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCdCZWFyZXIgJysgdG9rZW4uYWNjZXNzX3Rva2VuKTtcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSwgc3RhdHVzLHhocikge1xuICAgICAgICAvLyBwYXJzZSB5b3VyIGpzb24gcmVzcG9uc2VcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgICAvLyB1cGRhdGUgdG9wIHJpZ2h0IG1lbnVcbiAgICAgICAgX2NyZWF0ZUxvZ291dEJ0bihkYXRhKTtcblxuICAgICAgICAvLyBzZXQgdG8gd2luZG93IHNjb3BlXG4gICAgICAgIHdpbmRvdy51c2VyaW5mbyA9IGRhdGE7XG4gICAgICB9LFxuICAgICAgZXJyb3IgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gVE9ETzogc2hvdWxkIHdlIGFsZXJ0IHRoaXM/XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBsb2FkIHVzZXIgZmlsZXMsIHRyZWVzXG4gICAgX3VwZGF0ZUZpbGVMaXN0KCk7XG4gICAgX3VwZGF0ZVRyZWVMaXN0KCk7XG4gIH1cblxuICAvKioqXG4gICAqICBTZWFyY2ggZm9yIHRoZSB1c2VycyBtb2RlbHNcbiAgICpcbiAgICogVE9ETzogYWRkIHNlYXJjaCB0byB0aGUgZm9sbG93aW5nIGZ1bmN0aW9ucyxcbiAgICogIGxpbWl0IHRvIDEwIHJlc3VsdHNcbiAgICoqKi9cbiAgZnVuY3Rpb24gX3VwZGF0ZUZpbGVMaXN0KCkge1xuICAgIGxpc3RGaWxlcyhcIm1pbWVUeXBlID0gJ1wiK01JTUVfVFlQRStcIidcIiwgZnVuY3Rpb24ocmVzcCl7XG4gICAgICBmaWxlTGlzdCA9IHJlc3AucmVzdWx0Lml0ZW1zO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqKlxuICAgKiAgU2VhcmNoIGZvciB0aGUgdXNlcnMgdHJlZXNcbiAgICpcbiAgICogVE9ETzogYWRkIHNlYXJjaCB0byB0aGUgZm9sbG93aW5nIGZ1bmN0aW9ucyxcbiAgICogIGxpbWl0IHRvIDEwIHJlc3VsdHNcbiAgICoqKi9cbiAgZnVuY3Rpb24gX3VwZGF0ZVRyZWVMaXN0KCkge1xuICAgIGxpc3RGaWxlcyhcIm1pbWVUeXBlID0gJ1wiK1RSRUVfTUlNRV9UWVBFK1wiJ1wiLCBmdW5jdGlvbihyZXNwKXtcbiAgICAgIHRyZWVMaXN0ID0gcmVzcC5yZXN1bHQuaXRlbXM7XG4gICAgfSk7XG4gIH1cblxuICAvKioqXG4gICAqICBSZW5kZXIgdGhlIHVzZXJzIGN1cnJlbnQgbW9kZWxzIG9udG8gdGhlICdsb2FkIGZyb20gZHJpdmUnIHBvcHVwXG4gICAqKiovXG4gIGZ1bmN0aW9uIF9zaG93RHJpdmVGaWxlcygpIHtcbiAgICAvLyBpZiB0aGV5IGhhdmUgbm8gZmlsZXMsIHNheSBzbyBhbmQgZ2V0IG91dCBvZiBoZXJlXG4gICAgaWYoICFmaWxlTGlzdCApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIjxsaT5ObyBGaWxlczwvbGk+XCIpO1xuICAgIGlmKCBmaWxlTGlzdC5sZW5ndGggPT0gMCApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIjxsaT5ObyBGaWxlczwvbGk+XCIpO1xuXG4gICAgLy8gc2hvdyBhIHRpdGxlLCB0aGVyZSBhcmUgbXVsdGlwbGUgdHlwZXMgdGhhdCBjYW4gYmUgbG9hZGVkIGZyb20gZHJpdmVcbiAgICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuaHRtbChcIjxoND5TZWxlY3QgRmlsZTwvaDQ+XCIpO1xuXG4gICAgLy8gY3JlYXRlIHRoZSBsaXN0IGVsZW1lbnRzIGZvciBlYWNoIGZpbGVzIG1ldGFkYXRhXG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBmaWxlTGlzdC5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBpdGVtID0gZmlsZUxpc3RbaV07XG4gICAgICB2YXIgZCA9IG5ldyBEYXRlKGl0ZW0ubW9kaWZpZWREYXRlKTtcbiAgICAgICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5hcHBlbmQoXG4gICAgICAgICQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+PGEgaWQ9J1wiK2l0ZW0uaWQrXCInIHVybD0nXCIraXRlbS5kb3dubG9hZFVybCtcIicgc3R5bGU9J2N1cnNvcjpwb2ludGVyJz48aSBjbGFzcz0naWNvbi1maWxlJz48L2k+IFwiK2l0ZW0udGl0bGUrXCI8L2E+XCIgK1xuICAgICAgICAgIFwiPGRpdiBzdHlsZT0nY29sb3I6Izg4ODtwYWRkaW5nOiA1cHggMCAwIDEwcHgnPlwiK2l0ZW0uZGVzY3JpcHRpb24rXCI8L2Rpdj5cIitcbiAgICAgICAgICBcIjxkaXYgc3R5bGU9J2ZvbnQtc3R5bGU6aXRhbGljO2ZvbnQtc2l6ZToxMXB4O3BhZGRpbmctbGVmdDoxMHB4Jz5MYXN0IE1vZGlmaWVkOiBcIitkLnRvRGF0ZVN0cmluZygpK1wiIFwiK2QudG9Mb2NhbGVUaW1lU3RyaW5nKCkrXCIgYnkgXCIraXRlbS5sYXN0TW9kaWZ5aW5nVXNlck5hbWUrXCI8ZGl2PjwvbGk+XCJcbiAgICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGFkZCBjbGljayBoYW5kbGVyIGZvciBlYWNoIGZpbGVcbiAgICAkKFwiI2dkcml2ZS1maWxlLWxpc3QgYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbG9hZC1kcml2ZS1tb2RlbCcsIDEpO1xuXG4gICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcblxuICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2hhdCB3ZSBhcmUgZG9pbmdcbiAgICAgIF9zZXRMb2FkTWVzc2FnZSgnPGkgY2xhc3M9XCJpY29uLXNwaW5uZXIgaWNvbi1zcGluXCI+PC9pPiBMb2FkaW5nIEZpbGUuLi4nLCdpbmZvJyk7XG5cbiAgICAgIC8vIGdyYWIgdGhlIGZpdmUgZnJvbSBkcml2ZVxuICAgICAgZ2V0RmlsZShpZCwgJCh0aGlzKS5hdHRyKFwidXJsXCIpLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgIC8vIGlmIGJhZG5lc3MsIGxldCB0aGUgdXNlciBrbm93XG4gICAgICAgIGlmKCAhZmlsZSAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCBmaWxlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICAgIGlmKCBmaWxlLmVycm9yICApIHJldHVybiBfc2V0TG9hZE1lc3NhZ2UoJ0ZhaWxlZCB0byBsb2FkIGZpbGUgZnJvbSBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcblxuICAgICAgICAvLyBoaWRlIGFueSBsb2FkZWQgdHJlZXMsXG4gICAgICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuaGlkZSgpO1xuICAgICAgICAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbChcIlwiKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgIGxvYWRlZFRyZWUgPSBudWxsO1xuXG4gICAgICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdlIGFyZSBhbGwgZ29vZFxuICAgICAgICBfc2V0TG9hZE1lc3NhZ2UoJ0ZpbGUgTG9hZGVkLicsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAvLyBzZXQgdGhlIGxvYWRlZCBmaWxlIGlkXG4gICAgICAgIGxvYWRlZEZpbGUgPSBpZDtcblxuICAgICAgICAvLyBzZXQgdGhlIGxvYWRlZCBmaWxlIG5hbWVcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBmaWxlTGlzdC5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICBpZiggaWQgPT0gZmlsZUxpc3RbaV0uaWQgKSB7XG4gICAgICAgICAgICAkKFwiI2xvYWRlZC1tb2RlbC10aXRsZVwiKS5odG1sKFwiPHNwYW4gc3R5bGU9J2NvbG9yOiMzMzMnPkxvYWRlZCBNb2RlbCA8L3NwYW4+IFwiK2ZpbGVMaXN0W2ldLnRpdGxlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5cbiAgICAgICAgJChcIiNzaGFyZS1idG5cIikucGFyZW50KCkuc2hvdygpO1xuICAgICAgICAkKFwiI29wZW4taW4tZHJpdmVcIikuYXR0cihcImhyZWZcIixcImh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2ZpbGUvZC9cIitpZCkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAgIC8vIHNldHVwIG1vZGVsXG4gICAgICAgIG0zUEdJTy5sb2FkU2V0dXAoaWQsIGZpbGUpO1xuXG4gICAgICAgIC8vIHNldHVwIHJlYWx0aW1lIGV2ZW50c1xuICAgICAgICBnZHJpdmVSVC5pbml0UnRBcGkobG9hZGVkRmlsZSk7XG5cbiAgICAgICAgLy8gd2FpdCBhIHRpY2sgc28gdXNlciBjYW4gc2VlIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgLy8gaGlkZSB0aGUgbW9kYWxcbiAgICAgICAgICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgfSwxNTAwKTtcblxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKioqXG4gICAqICBSZW5kZXIgdGhlIHVzZXJzIGN1cnJlbnQgdHJlZXMgb250byB0aGUgJ2xvYWQgZnJvbSBkcml2ZScgcG9wdXBcbiAgICoqKi9cbiAgZnVuY3Rpb24gX3Nob3dUcmVlRmlsZXMoKSB7XG4gICAgLy8gdXBkYXRlIHRoZSBsaXN0IGhlYWRlciwgbGV0IHVzZXIga25vdyB3aGF0IHRoZXkgYXJlIHNlbGVjdGluZ1xuICAgICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5odG1sKFwiXCIpO1xuICAgICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5hcHBlbmQoJChcIjxsaSBjbGFzcz0nbGlzdC1ncm91cC1pdGVtJz48aDU+U2VsZWN0IFRyZWU8L2g1PjwvbGk+XCIpKTtcblxuICAgIC8vIGlmIHRoZXJlIGFyZSBubyB0cmVlcywgc2F5IHNvIGFuZCBnZXQgb3V0IG9mIGhlcmVcbiAgICBpZiggIXRyZWVMaXN0ICkgcmV0dXJuICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5hcHBlbmQoJChcIjxsaSBjbGFzcz0nbGlzdC1ncm91cC1pdGVtJz5ObyBUcmVlcyBBdmFpbGFibGU8L2xpPlwiKSk7XG4gICAgaWYoIHRyZWVMaXN0Lmxlbmd0aCA9PSAwICkgcmV0dXJuICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5hcHBlbmQoJChcIjxsaSBjbGFzcz0nbGlzdC1ncm91cC1pdGVtJz5ObyBUcmVlcyBBdmFpbGFibGU8L2xpPlwiKSk7XG5cbiAgICAvLyBjcmVhdGUgdGhlIHRyZWUgbGlzdCBlbGVtZW50c1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdHJlZUxpc3QubGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgaXRlbSA9IHRyZWVMaXN0W2ldO1xuICAgICAgdmFyIGQgPSBuZXcgRGF0ZShpdGVtLm1vZGlmaWVkRGF0ZSk7XG4gICAgICAkKFwiI2dkcml2ZS1maWxlLWxpc3RcIikuYXBwZW5kKFxuICAgICAgICAkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPjxhIGlkPSdcIitpdGVtLmlkK1wiJyBuYW1lPSdcIitpdGVtLnRpdGxlK1wiJyB1cmw9J1wiK2l0ZW0uZG93bmxvYWRVcmwrXCInIHN0eWxlPSdjdXJzb3I6cG9pbnRlcic+PGkgY2xhc3M9J2ljb24tbGVhZic+PC9pPiBcIitpdGVtLnRpdGxlK1wiPC9hPlwiICtcbiAgICAgICAgICBcIjxkaXYgc3R5bGU9J2NvbG9yOiM4ODg7cGFkZGluZzogNXB4IDAgMCAxMHB4Jz5cIitpdGVtLmRlc2NyaXB0aW9uK1wiPC9kaXY+XCIrXG4gICAgICAgICAgXCI8ZGl2IHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDtwYWRkaW5nLWxlZnQ6MTBweCc+TGFzdCBNb2RpZmllZDogXCIrZC50b0RhdGVTdHJpbmcoKStcIiBcIitkLnRvTG9jYWxlVGltZVN0cmluZygpK1wiIGJ5IFwiK2l0ZW0ubGFzdE1vZGlmeWluZ1VzZXJOYW1lK1wiPGRpdj48L2xpPlwiXG4gICAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgY2xpY2sgaGFuZGxlciBmb3IgdGl0bGVzXG4gICAgJChcIiNnZHJpdmUtZmlsZS1saXN0IGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2xvYWQtZHJpdmUtdHJlZScsIDEpO1xuXG4gICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcbiAgICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKFwibmFtZVwiKTtcblxuICAgICAgLy8gdGVsbCB0aGUgdXNlciB3ZSBhcmUgbG9hZGluZ1xuICAgICAgX3NldExvYWRNZXNzYWdlKCc8aSBjbGFzcz1cImljb24tc3Bpbm5lciBpY29uLXNwaW5cIj48L2k+IExvYWRpbmcgVHJlZS4uLicsJ2luZm8nKTtcblxuICAgICAgLy8gbG9hZCBmaWxlIGZyb20gZHJpdmVcbiAgICAgIGdldEZpbGUoaWQsICQodGhpcykuYXR0cihcInVybFwiKSwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICAvLyBpZiBiYWRuZXNzLCBsZXQgdXNlciBrbm93XG4gICAgICAgIGlmKCAhZmlsZSAgKSByZXR1cm4gX3NldExvYWRNZXNzYWdlKCdGYWlsZWQgdG8gbG9hZCB0cmVlIGZyb20gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICAgIGlmKCBmaWxlLmVycm9yICApIHJldHVybiBfc2V0TG9hZE1lc3NhZ2UoJ0ZhaWxlZCB0byBsb2FkIHRyZWUgZnJvbSBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcblxuICAgICAgICAvLyBzaG93IHRoZSB0cmVlIHNoYXJpbmcgYnRuc1xuICAgICAgICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLnNob3coKTtcbiAgICAgICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwobmFtZSkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdlIGFyZSBzdWNjZXNmdWxsXG4gICAgICAgIF9zZXRMb2FkTWVzc2FnZSgnVHJlZSBMb2FkZWQuJywnc3VjY2VzcycpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgbG9hZGVkIHRyZWUgaWRcbiAgICAgICAgbG9hZGVkVHJlZSA9IGlkO1xuXG4gICAgICAgIC8vIGxvYWRlZCB0cmVlIGludG8gbW9kZWwgLyBVSVxuICAgICAgICBtM1BHSU8ubG9hZFRyZWUoZmlsZSk7XG5cbiAgICAgICAgLy8gd2FpdCBhIHNlYyBzbyB1c2VyIGNhbiBzZWUgc3VjY2VzcyBtZXNzYWdlXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgfSwxNTAwKTtcblxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKioqXG4gICAqICBzaG93IHRoZSB1c2VyIHRoZSBsb2FkIHRyZWUgcG9wdXBcbiAgICoqKi9cbiAgZnVuY3Rpb24gc2hvd0xvYWRUcmVlUGFuZWwoKSB7XG4gICAgLy8gcmVuZGVyIHRoZSB0cmVlcyBpbnRvIHRoZSBwb3B1cCBsaXN0XG4gICAgX3Nob3dUcmVlRmlsZXMoKTtcbiAgICAvLyBjbGVhciBhbnkgbWVzc2FnZXNcbiAgICBfc2V0TG9hZE1lc3NhZ2UobnVsbCk7XG4gICAgLy8gc2hvdyB0aGUgcG9wdXBcbiAgICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgfVxuXG4gIC8qKipcbiAgICogIHNob3cgdGhlIHVzZXIgdGhlIHNhdmUgdHJlZSBwb3B1cFxuICAgKioqL1xuICBmdW5jdGlvbiBzaG93U2F2ZVRyZWVQYW5lbCgpIHtcbiAgICAvLyBzZXQgdGhlIGN1cnJlbnQgbWltZVR5cGUgd2UgYXJlIHNhdmluZ1xuICAgIHNhdmVNaW1lVHlwZSA9IFRSRUVfTUlNRV9UWVBFO1xuXG4gICAgLy8gc2V0IHRoZSBoZWFkZXIgc28gdXNlciBrbm93cyB3aGF0IHR5cGUgdGhleSBhcmUgc2F2aW5nXG4gICAgJChcIiNnZHJpdmUtc2F2ZS1zdWJoZWFkZXJcIikuaHRtbChcIjxoNT5TYXZlIFRyZWU8L2g1PlwiKTtcblxuICAgIC8vIGlmIHRoZXJlIGlzIGEgY3VycmVudCB0cmVlLCBzaG93IHRoZSB1cGRhdGUgcGFuZWxcbiAgICBpZiggbG9hZGVkVHJlZSAhPSBudWxsKSB7XG4gICAgICAvLyBmaW5kIHRoZSBjdXJyZW50IHRyZWUgYmFzZWQgb24gaWRcbiAgICAgIHZhciB0cmVlID0ge307XG4gICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRyZWVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgICBpZiggdHJlZUxpc3RbaV0uaWQgPT0gbG9hZGVkVHJlZSkge1xuICAgICAgICAgIHRyZWUgPSB0cmVlTGlzdFtpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBzaG93IHRoZSB1cGRhdGUgcGFuZWxcbiAgICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuc2hvdygpO1xuXG4gICAgICAvLyByZW5kZXIgdHJlZSBtZXRhZGF0YSBvbiB1cGRhdGUgcGFuZWxcbiAgICAgIHZhciBkID0gbmV3IERhdGUodHJlZS5tb2RpZmllZERhdGUpO1xuICAgICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbC1pbm5lclwiKS5odG1sKFwiPGI+XCIrdHJlZS50aXRsZStcIjwvYj48YnIgLz5cIiArXG4gICAgICAgICAgXCI8c3BhbiBzdHlsZT0nY29sb3I6Izg4OCc+XCIrdHJlZS5kZXNjcmlwdGlvbitcIjwvc3Bhbj48YnIgLz5cIitcbiAgICAgICAgICBcIjxzcGFuIHN0eWxlPSdmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTFweDsnPkxhc3QgTW9kaWZpZWQ6IFwiICtcbiAgICAgICAgICBkLnRvRGF0ZVN0cmluZygpK1wiIFwiK2QudG9Mb2NhbGVUaW1lU3RyaW5nKCkrXCIgYnkgXCIrdHJlZS5sYXN0TW9kaWZ5aW5nVXNlck5hbWUrXCI8L3NwYW4+PGJyIC8+XCIrXG4gICAgICAgICAgXCI8YSBocmVmPSdodHRwczovL2RyaXZlLmdvb2dsZS5jb20vZmlsZS9kL1wiK3RyZWUuaWQrXCInJyB0YXJnZXQ9J19ibGFuayc+PGkgY2xhc3M9J2ljb24tbGluayc+PC9pPiBPcGVuIGluIEdvb2dsZSBEcml2ZTwvYT5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGRvbid0IHNob3cgdGhlIHVwZGF0ZSBwYW5lbCwgdGhpcyBpcyBhIG5ldyB0cmVlXG4gICAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsXCIpLmhpZGUoKTtcbiAgICB9XG5cbiAgICAvLyBjbGVhciBhbnkgbWVzc2FnZVxuICAgIF9zZXRTYXZlTWVzc2FnZShudWxsKTtcblxuICAgIC8vIHNob3cgdGhlIHBvcHVwXG4gICAgJChcIiNzYXZlLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH1cblxuICAvKioqXG4gICAqIExvYWQgYSBtb2RlbCBiYXNlZCBvbiBwYXNzZWQgaWQuICBUaGlzIGZ1bmN0aW9uIGlzIHJlYWxseSBvbmx5IGZvciBsb2FkaW5nIG1vZGVsIG9uIHN0YXJ0LCB3aGVuIGEgZmlsZSBpZFxuICAgKiBoYXMgYmVlbiBwYXNzZWQgaW4gdGhlIHVybCBlaXRoZXIgZnJvbSBnb29nbGUgZHJpdmUgb3IgZnJvbSB0aGUgP2ZpbGU9aWQgdXJsLlxuICAgKioqL1xuICB2YXIgbG9naW5Nb2RhbEluaXQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gbG9hZChpZCwgbG9hZEZuKSB7XG4gICAgLy8gaWYgd2UgZG9uJ3QgaGF2ZSBhbiBhY2Nlc3MgdG9rZW4sIHdlIG5lZWQgdG8gc2lnbiBpbiBmaXJzdFxuICAgIC8vIFRPRE86IGlmIHRoaXMgaXMgYSBwdWJsaWMgZmlsZSwgdGhlcmUgaXMgbm8gcmVhc29uIHRvIHNpZ24gaW4uLi4gc29sdXRpb24/XG4gICAgaWYoICF0b2tlbiApIHtcblxuICAgICAgaWYoICFsb2dpbk1vZGFsSW5pdCApIHtcbiAgICAgICAgJCgnI2dvb2dsZS1tb2RhbC1sb2dpbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgLy8gc2lnbiB0aGUgdXNlciBpbiAoZm9yY2Ugb2F1dGggcG9wdXApXG4gICAgICAgICAgc2lnbkluKGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICAkKCcjbG9naW4tbW9kYWwnKS5tb2RhbCgnaGlkZScpO1xuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIHVzZXIgaW5mb3JtYXRpb24gaW4gdG9wIGxlZnRcbiAgICAgICAgICAgIF9zZXRVc2VySW5mbygpO1xuXG4gICAgICAgICAgICBpZiggbG9hZEZuICkgbG9hZEZuKCk7XG5cbiAgICAgICAgICAgIGdldEZpbGVNZXRhZGF0YShpZCwgZnVuY3Rpb24obWV0YWRhdGEpe1xuICAgICAgICAgICAgICBnZXRGaWxlKGlkLCBtZXRhZGF0YS5kb3dubG9hZFVybCwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICAgICAgICAgIF9vbkluaXRGaWxlTG9hZGVkKG1ldGFkYXRhLGZpbGUpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNsb2dpbi1tb2RhbCcpLm1vZGFsKCk7XG4gICAgICAgIGxvZ2luTW9kYWxJbml0ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJyNsb2dpbi1tb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgaWYoIGxvYWRGbiApIGxvYWRGbigpO1xuXG4gICAgICBnZXRGaWxlTWV0YWRhdGEoaWQsIGZ1bmN0aW9uKG1ldGFkYXRhKXtcbiAgICAgICAgZ2V0RmlsZShpZCwgbWV0YWRhdGEuZG93bmxvYWRVcmwsIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgICBfb25Jbml0RmlsZUxvYWRlZChtZXRhZGF0YSxmaWxlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKioqXG4gICAqIEluaXRpYWxpemUgVUkgLyBtb2RlbCB3aGVuIGEgZmlsZSBpcyBsb2FkZWQgYXQgc3RhcnRcbiAgICoqKi9cbiAgZnVuY3Rpb24gX29uSW5pdEZpbGVMb2FkZWQobWV0YWRhdGEsIGZpbGUpIHtcbiAgICAvLyBiYWRkbmVzcywgbGV0IHRoZSB1c2VyIGtub3dcbiAgICBpZiggIWZpbGUgKSB7XG4gICAgICBpZiggaGlkZUluaXRMb2FkaW5nICkgaGlkZUluaXRMb2FkaW5nKCk7XG4gICAgICByZXR1cm4gYWxlcnQoXCJGYWlsZWQgdG8gbG9hZCBmcm9tIEdvb2dsZSBEcml2ZSA6L1wiKTtcbiAgICB9XG5cbiAgICAvLyBtZXRhZGF0YSBmYWlsZWQgdG8gbG9hZCwgbW9yZSBiYWRuZXNzXG4gICAgaWYoIG1ldGFkYXRhLmNvZGUgPT0gNDA0ICkge1xuICAgICAgaWYoIGhpZGVJbml0TG9hZGluZyApIGhpZGVJbml0TG9hZGluZygpO1xuICAgICAgcmV0dXJuIGFsZXJ0KFwiR29vZ2xlIERyaXZlOiBcIittZXRhZGF0YS5tZXNzYWdlKTtcbiAgICB9XG5cbiAgICAvLyB3ZSBsb2FkZWQgYSBtb2RlbCwgc2V0dXAgYW5kIHJ1blxuICAgIGlmKCBtZXRhZGF0YS5taW1lVHlwZSA9PSBNSU1FX1RZUEUgKSB7XG4gICAgICAvLyBzZXQgdGhlIGN1cnJlbnRseSBsb2FkZWQgZmlsZSBpZFxuICAgICAgbG9hZGVkRmlsZSA9IG1ldGFkYXRhLmlkO1xuXG4gICAgICAvLyBzaG93IHRoZSBzaGFyZSBidG5cbiAgICAgICQoXCIjc2hhcmUtYnRuXCIpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICQoXCIjb3Blbi1pbi1kcml2ZVwiKS5hdHRyKFwiaHJlZlwiLFwiaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZmlsZS9kL1wiK21ldGFkYXRhLmlkKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAgIC8vIHNob3cgdGl0bGVcbiAgICAgICQoXCIjbG9hZGVkLW1vZGVsLXRpdGxlXCIpLmh0bWwoXCI8c3BhbiBzdHlsZT0nY29sb3I6IzMzMyc+TG9hZGVkIE1vZGVsIDwvc3Bhbj4gXCIrbWV0YWRhdGEudGl0bGUpO1xuXG4gICAgICAvLyBzZXR1cCBtb2RlbFxuICAgICAgbTNQR0lPLmxvYWRTZXR1cChtZXRhZGF0YS5pZCwgZmlsZSk7XG5cbiAgICAgIC8vIHNldHVwIHJlYWx0aW1lIGV2ZW50c1xuICAgICAgZ2RyaXZlUlQuaW5pdFJ0QXBpKGxvYWRlZEZpbGUpO1xuICAgIH0gZWxzZSBpZiAoIG1ldGFkYXRhLm1pbWVUeXBlID09IFRSRUVfTUlNRV9UWVBFICkgeyAvLyB3ZSBsb2FkZWQgYSB0cmVlXG4gICAgICAvLyBzZXQgdGhlIGxvYWRlZCB0cmVlIGlkXG4gICAgICBsb2FkZWRUcmVlID0gbWV0YWRhdGEuaWQ7XG5cbiAgICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0blxuICAgICAgJChcIiNzaGFyZS10cmVlLWJ0blwiKS5zaG93KCk7XG4gICAgICAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbChtZXRhZGF0YS50aXRsZSkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAvLyBzZXQgdGhlIGxvYWRlZCB0cmVlXG4gICAgICBtM1BHSU8ubG9hZFRyZWUoZmlsZSk7XG5cbiAgICAgIC8vIGhpZGUgdGhlIGxvYWRpbmcgcG9wdXBcbiAgICAgIGlmKCBoaWRlSW5pdExvYWRpbmcgKSBoaWRlSW5pdExvYWRpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoXCJMb2FkZWQgdW5rbm93biBmaWxlIHR5cGUgZnJvbSBHb29nbGUgRHJpdmU6IFwiK21ldGFkYXRhLm1pbWVUeXBlKTtcbiAgICB9XG4gIH1cblxuICAvKioqXG4gICAqIHRva2VucyBleHBpcmUsIGV2ZXJ5IG9uY2UgaW4gYXdoaWxlIGNoZWNrIHRoZSBjdXJyZW50IHRva2VuIGhhc24ndFxuICAgKiBpZiBpdCBoYXMsIHRoZW4gdXBkYXRlXG4gICAqKiovXG4gIGZ1bmN0aW9uIF9jaGVja1Rva2VuKCkge1xuICAgIC8vIGlnbm9yZSBpZiB0aGVyZSBpcyBubyB0b2tlblxuICAgIGlmICghdG9rZW4pIHJldHVybjtcblxuICAgIC8vIG90aGVyd2lzZSwgbG9vayB0byB1cGRhdGUgdGhlIGFjY2VzcyB0b2tlblxuICAgIE9hdXRoLmdldEFjY2Vzc1Rva2VuKGZ1bmN0aW9uKHQpIHtcbiAgICAgIGlmKCB0ICE9IG51bGwgKSB0b2tlbiA9IHQ7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqKlxuICAgKiBpcyB0aGUgY3VycmVudCB1c2VyIHNpZ25lZCBpbj9cbiAgICoqKi9cbiAgZnVuY3Rpb24gY2hlY2tTaWduZWRJbihjYWxsYmFjaykge1xuICAgIC8vIGlmIGlzQXV0aGVyaXplZCByZXR1cm5zIGEgdG9rZW4sIHVzZXIgaXMgbG9nZ2VkIGluXG4gICAgT2F1dGguaXNBdXRob3JpemVkKGZ1bmN0aW9uKHRva2VuKXtcbiAgICAgIGlmICh0b2tlbiAhPSBudWxsKSBjYWxsYmFjayh0cnVlKTtcbiAgICAgIGVsc2UgY2FsbGJhY2soZmFsc2UpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKipcbiAgICogU2lnbiBhIHVzZXIgaW4gdXNpbmcgdGhlIE9hdXRoIGNsYXNzXG4gICAqKiovXG4gIGZ1bmN0aW9uIHNpZ25JbihjYWxsYmFjaykge1xuICAgIE9hdXRoLmF1dGhvcml6ZShmdW5jdGlvbih0KXtcbiAgICAgIHRva2VuID0gdDtcbiAgICAgIGlmICh0b2tlbiAhPSBudWxsKSB7XG4gICAgICAgIGlmKCB0LmVycm9yICkgcmV0dXJuIGNhbGxiYWNrKGZhbHNlKTtcbiAgICAgICAgY2FsbGJhY2sodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayhmYWxzZSk7XG4gICAgICB9XG4gICAgfSlcbiAgfTtcblxuICAvKioqXG4gICAqIEFjY2VzcyBtZXRob2QgZm9yIHRva2VuXG4gICAqKiovXG4gIGZ1bmN0aW9uIGdldFRva2VuKCkge1xuICAgIHJldHVybiB0b2tlbjtcbiAgfTtcblxuICAvKioqXG4gICAqIExvYWQgdGhlIGdvb2dsZSBkcml2ZSBhcGkgY29kZVxuICAgKioqL1xuICBmdW5jdGlvbiBfbG9hZEFwaShjYWxsYmFjaykge1xuICAgIGdhcGkuY2xpZW50LmxvYWQoXCJkcml2ZVwiLCBEUklWRV9BUElfVkVSU0lPTiwgZnVuY3Rpb24oKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKipcbiAgICogR2V0IGEgbGlzdCBvZiBmaWxlIG1ldGFkYXRhIGZyb20gZ29vZ2xlIGRyaXZlIGJhc2VkIG9uIHF1ZXJ5XG4gICAqKiovXG4gIGZ1bmN0aW9uIGxpc3RGaWxlcyhxdWVyeSwgY2FsbGJhY2spIHtcbiAgICBnYXBpLmNsaWVudC5kcml2ZS5maWxlcy5saXN0KHtcbiAgICAgIHEgOiBxdWVyeSArIFwiIGFuZCB0cmFzaGVkID0gZmFsc2VcIlxuICAgIH0pLmV4ZWN1dGUoZnVuY3Rpb24ocmVzcCkge1xuICAgICAgY2FsbGJhY2socmVzcCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqKlxuICAgKiBHZXQgYSBzaW5nbGUgZmlsZXMgbWV0YWRhdGEgYmFzZWQgb24gaWRcbiAgICoqKi9cbiAgZnVuY3Rpb24gZ2V0RmlsZU1ldGFkYXRhKGlkLCBjYWxsYmFjaykge1xuICAgIGdhcGkuY2xpZW50LmRyaXZlLmZpbGVzLmdldCh7XG4gICAgICAnZmlsZUlkJyA6IGlkXG4gICAgfSkuZXhlY3V0ZShmdW5jdGlvbihyZXNwKSB7XG4gICAgICBjYWxsYmFjayhyZXNwKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKioqXG4gICAqICBBY3R1YWxseSBsb2FkIGEgZmlsZXMgZGF0YS4gIFRoZSB1cmwgdG8gZG8gdGhpcyBpcyBwcm92aWRlZCBpbiBhIGZpbGVzIG1ldGFkYXRhLlxuICAgKioqL1xuICBmdW5jdGlvbiBnZXRGaWxlKGlkLCBkb3dubG9hZFVybCwgY2FsbGJhY2spIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsIDogZG93bmxvYWRVcmwsXG4gICAgICBiZWZvcmVTZW5kIDogZnVuY3Rpb24ocmVxdWVzdCkge1xuICAgICAgICAvLyBzZXQgYWNjZXNzIHRva2VuIGluIGhlYWRlclxuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsICdCZWFyZXIgJysgdG9rZW4uYWNjZXNzX3Rva2VuKTtcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCB4aHIpIHtcbiAgICAgICAgLy8gcGFyc2UgdGhlIHJlc3BvbnNlICh3ZSBvbmx5IHN0b3JlIGpzb24gaW4gdGhlIGdvb2dsZSBkcml2ZSlcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgICBjYWxsYmFjayhkYXRhLCBpZCk7XG4gICAgICB9LFxuICAgICAgZXJyb3IgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgIGVycm9yIDogdHJ1ZSxcbiAgICAgICAgICBtZXNzYWdlIDogXCJGYWlsZWQgdG8gbG9hZCBmaWxlIGZyb20gR29vZ2xlIERyaXZlXCJcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAvKioqXG4gICAqIFNhdmUganNvbiB0byBnb29nbGUgZHJpdmVcbiAgICoqKi9cbiAgZnVuY3Rpb24gc2F2ZUZpbGUobmFtZSwgZGVzY3JpcHRpb24sIG1pbWVUeXBlLCBqc29uLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgIGlmKCAhb3B0aW9ucyApIG9wdGlvbnMgPSB7fVxuXG4gICAgdmFyIGJvdW5kYXJ5ID0gJy0tLS0tLS0zMTQxNTkyNjUzNTg5NzkzMjM4NDYnO1xuICAgIHZhciBkZWxpbWl0ZXIgPSBcIlxcclxcbi0tXCIgKyBib3VuZGFyeSArIFwiXFxyXFxuXCI7XG4gICAgdmFyIGNsb3NlX2RlbGltID0gXCJcXHJcXG4tLVwiICsgYm91bmRhcnkgKyBcIi0tXCI7XG5cbiAgICB2YXIgbWV0YWRhdGEgPSB7XG4gICAgICAndGl0bGUnIDogbmFtZSxcbiAgICAgICdkZXNjcmlwdGlvbicgOiBkZXNjcmlwdGlvbixcbiAgICAgICdtaW1lVHlwZScgOiBtaW1lVHlwZVxuICAgIH07XG5cbiAgICAvLyBpZiB3ZSB3YW50IHRvIHNhdmUgdGhlIGZpbGUgdG8gYSBzcGVjaWZpZWQgZm9sZGVyXG4gICAgaWYoIG9wdGlvbnMucGFyZW50ICkge1xuICAgICAgbWV0YWRhdGEucGFyZW50cyA9IFt7aWQ6IG9wdGlvbnMucGFyZW50fV07XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlIGpzb24gaXMgcmVhbGx5IGFuIG9iamVjdCwgdHVybiBpdCB0byBhIHN0cmluZ1xuICAgIGlmICh0eXBlb2YganNvbiA9PSAnb2JqZWN0JykganNvbiA9IEpTT04uc3RyaW5naWZ5KGpzb24pO1xuXG4gICAgLy8gZGF0YSBuZWVkcyB0byBiZSBiYXNlNjQgZW5jb2RlZCBmb3IgdGhlIFBPU1RcbiAgICB2YXIgYmFzZTY0RGF0YSA9IGJ0b2EoanNvbik7XG5cbiAgICAvLyBjcmVhdGUgb3VyIG11bHRpcGFydCBQT1NUIHJlcXVlc3RcbiAgICB2YXIgbXVsdGlwYXJ0UmVxdWVzdEJvZHkgPSBkZWxpbWl0ZXJcbiAgICAgICAgKyAnQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXFxyXFxuXFxyXFxuJ1xuICAgICAgICArIEpTT04uc3RyaW5naWZ5KG1ldGFkYXRhKTtcblxuICAgIGlmKCBqc29uLmxlbmd0aCA+IDAgKSB7XG4gICAgICBtdWx0aXBhcnRSZXF1ZXN0Qm9keSArPSBkZWxpbWl0ZXIgKyAnQ29udGVudC1UeXBlOiAnXG4gICAgICAgICsgbWltZVR5cGUgKyAnXFxyXFxuJyArICdDb250ZW50LVRyYW5zZmVyLUVuY29kaW5nOiBiYXNlNjRcXHJcXG4nXG4gICAgICAgICsgJ1xcclxcbicgKyBiYXNlNjREYXRhO1xuICAgIH1cbiAgICBtdWx0aXBhcnRSZXF1ZXN0Qm9keSArPSBjbG9zZV9kZWxpbTtcblxuICAgICAgIC8vIHNldHVwIFBPU1QgcmVxdWVzdFxuICAgICAgIC8vIGlmIHRoZSBvcHRpb25zLmNvbnZlcj10cnVlIGZsYWcgaXMgc2V0LCBnb29nbGUgYXR0ZW1wdHMgdG8gY29udmVydCB0aGUgZmlsZSB0b1xuICAgICAgIC8vIGEgZ29vZ2xlIGRvYyBmaWxlLiAgTW9zdGx5LCB3ZSB1c2UgdGhpcyBmb3IgZXhwb3J0aW5nIGNzdiAtPiBHb29nbGUgU3ByZWFkc2hlZXRzXG4gICAgdmFyIHJlcXVlc3QgPSBnYXBpLmNsaWVudC5yZXF1ZXN0KHtcbiAgICAgICdwYXRoJyA6ICcvdXBsb2FkL2RyaXZlL3YyL2ZpbGVzJyArICggb3B0aW9ucy5jb252ZXJ0ID8gJz9jb252ZXJ0PXRydWUnIDogJycpLFxuICAgICAgJ21ldGhvZCcgOiAnUE9TVCcsXG4gICAgICAncGFyYW1zJyA6IHtcbiAgICAgICAgJ3VwbG9hZFR5cGUnIDogJ211bHRpcGFydCdcbiAgICAgIH0sXG4gICAgICAnaGVhZGVycycgOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnIDogJ211bHRpcGFydC9taXhlZDsgYm91bmRhcnk9XCInICsgYm91bmRhcnkgKyAnXCInXG4gICAgICB9LFxuICAgICAgJ2JvZHknIDogbXVsdGlwYXJ0UmVxdWVzdEJvZHlcbiAgICB9KTtcblxuICAgIC8vIHNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LmV4ZWN1dGUoZnVuY3Rpb24ocmVzcCkge1xuICAgICAgaWYgKHJlc3AuaWQpXG4gICAgICAgIGNhbGxiYWNrKHJlc3ApO1xuICAgICAgZWxzZVxuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgZXJyb3IgOiB0cnVlLFxuICAgICAgICAgIG1lc3NhZ2UgOiBcIkZhaWxlZCB0byBzYXZlXCJcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqKlxuICAgKiBVcGRhdGUgYSBmaWxlIGJhc2VkIG9uIGlkIGFuZCBnaXZlbiBqc29uIGRhdGFcbiAgICoqKi9cbiAgZnVuY3Rpb24gdXBkYXRlRmlsZShmaWxlSWQsIGpzb24sIGNhbGxiYWNrKSB7XG4gICAgLy8gc3RhcnQgY3JlYXRpbmcgdGhlIG11bHRpcGFydCBQT1NUIHJlcXVlc3RcbiAgICB2YXIgYm91bmRhcnkgPSAnLS0tLS0tLTMxNDE1OTI2NTM1ODk3OTMyMzg0Nic7XG4gICAgdmFyIGRlbGltaXRlciA9IFwiXFxyXFxuLS1cIiArIGJvdW5kYXJ5ICsgXCJcXHJcXG5cIjtcbiAgICB2YXIgY2xvc2VfZGVsaW0gPSBcIlxcclxcbi0tXCIgKyBib3VuZGFyeSArIFwiLS1cIjtcblxuICAgIHZhciBtZXRhZGF0YSA9IHt9O1xuXG4gICAgLy8gc3RyaW5pZnkgdGhlbiBiYXNlNjQgZW5jb2RlIHRoZW4gb2JqZWN0XG4gICAgICB2YXIgYmFzZTY0RGF0YSA9IGJ0b2EoSlNPTi5zdHJpbmdpZnkoanNvbikpO1xuXG4gICAgICAvLyBzZXQgdXAgdGhlIFBPU1QgYm9keVxuICAgICAgdmFyIG11bHRpcGFydFJlcXVlc3RCb2R5ID1cbiAgICAgICAgZGVsaW1pdGVyICtcbiAgICAgICAgICAnQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXFxyXFxuXFxyXFxuJyArXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkobWV0YWRhdGEpICtcbiAgICAgICAgICBkZWxpbWl0ZXIgK1xuICAgICAgICAgICdDb250ZW50LVR5cGU6ICcgKyBNSU1FX1RZUEUgKyAnXFxyXFxuJyArXG4gICAgICAgICAgJ0NvbnRlbnQtVHJhbnNmZXItRW5jb2Rpbmc6IGJhc2U2NFxcclxcbicgK1xuICAgICAgICAgICdcXHJcXG4nICtcbiAgICAgICAgICBiYXNlNjREYXRhICtcbiAgICAgICAgICBjbG9zZV9kZWxpbTtcblxuICAgIC8vIHNldHVwIFBPU1QgcmVxdWVzdFxuICAgICAgdmFyIHJlcXVlc3QgPSBnYXBpLmNsaWVudC5yZXF1ZXN0KHtcbiAgICAgICAgICAncGF0aCc6ICcvdXBsb2FkL2RyaXZlL3YyL2ZpbGVzLycrZmlsZUlkLFxuICAgICAgICAgICdtZXRob2QnOiAnUFVUJyxcbiAgICAgICAgICAncGFyYW1zJzogeyd1cGxvYWRUeXBlJzogJ211bHRpcGFydCd9LFxuICAgICAgICAgICdoZWFkZXJzJzoge1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvbWl4ZWQ7IGJvdW5kYXJ5PVwiJyArIGJvdW5kYXJ5ICsgJ1wiJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ2JvZHknOiBtdWx0aXBhcnRSZXF1ZXN0Qm9keX0pO1xuXG4gICAgICAvLyBzZXQgcmVxdWVzdFxuICAgICAgcmVxdWVzdC5leGVjdXRlKGZ1bmN0aW9uKHJlc3Ape1xuICAgICAgICBpZiggcmVzcC5pZCApIHtcbiAgICAgICAgICBjYWxsYmFjayhyZXNwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgZXJyb3IgOiB0cnVlLFxuICAgICAgICAgIG1lc3NhZ2UgOiBcIkZhaWxlZCB0byB1cGRhdGVcIlxuICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBydW5Nb2RlbFJ0KCkge1xuICAgIGlmKCBvZmZsaW5lTW9kZSApIHJldHVybjtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdydW4tbW9kZWwtcmVtb3RlJywgMSk7XG4gICAgZ2RyaXZlUlQucnVuTW9kZWxSdCgpO1xuICB9XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0IDogaW5pdCxcbiAgY2hlY2tTaWduZWRJbiA6IGNoZWNrU2lnbmVkSW4sXG4gIHNpZ25JbiA6IHNpZ25JbixcbiAgZ2V0VG9rZW4gOiBnZXRUb2tlbixcbiAgbGlzdEZpbGVzIDogbGlzdEZpbGVzLFxuICBnZXRGaWxlTWV0YWRhdGEgOiBnZXRGaWxlTWV0YWRhdGEsXG4gIGxvYWQgOiBsb2FkLFxuICBzYXZlRmlsZTogc2F2ZUZpbGUsXG4gIHNob3dMb2FkVHJlZVBhbmVsIDogc2hvd0xvYWRUcmVlUGFuZWwsXG4gIHNob3dTYXZlVHJlZVBhbmVsIDogc2hvd1NhdmVUcmVlUGFuZWwsXG4gIHJ1bk1vZGVsUnQgOiBydW5Nb2RlbFJ0LFxuXG4gIE1JTUVfVFlQRSA6IE1JTUVfVFlQRVxufVxuIiwiICAvLyBSRUFMVElNRSAocnQpIE9iamVjdHNcbiAgLy8gcnQganNvbiBmaWVsZCwgdXNlZCB0byBzZW5kIHVwZGF0ZXMgdG8gcGVlcnNcbiAgdmFyIHJ0SnNvbiA9IG51bGw7XG4gIC8vIHJ0IGRvY3VtZW50XG4gIHZhciBydERvYyA9IG51bGw7XG4gIC8vIGhhcyB0aGUgcnQgYXBpIGJlZW4gbG9hZGVkP1xuICB2YXIgX3J0TG9hZGVkID0gZmFsc2U7XG4gIC8vIHRpbWVyIHRvIGJ1ZmZlciB0aGUgZmlyaW5nIG9mIHVwZGF0ZXMgZnJvbSBydCBldmVudHNcbiAgdmFyIF9ydFRpbWVyID0gLTE7XG5cbiAgLy8gbGlzdCBvZiBjdXJyZW50IHJ0IGVkaXRzIHRvIGlucHV0IGZpbGVzXG4gIHZhciBydEVkaXRzID0ge307XG4gIC8vIGdvb2dsZSBkcml2ZSBydCBtb2RlbCAtIG1hcFxuICB2YXIgbGl2ZUVkaXRzID0gbnVsbDtcbiAgLy8gbG9jYWwgbG9jayBvbiBhbiBlbGVtZW50XG4gIHZhciBsb2NrID0ge307XG5cbiAgLy8gbG9hZGVkIGZpbGUgaWRcbiAgdmFyIGxvYWRlZEZpbGU7XG5cbiAgLyoqKlxuICAgKiBTZXR1cCB0aGUgcnQgYXBpIGZvciB0aGUgY3VycmVudCBmaWxlLiAgVGhpcyB3aWxsIGFjdHVhbGx5IGxvYWQgdGhlIGFwaSBpZiBuZWVkZWRcbiAgICoqKi9cbiAgZnVuY3Rpb24gaW5pdFJ0QXBpKGZpbGUpIHtcbiAgICBydEpzb24gPSBudWxsOyAvLyBraWxsIG9mZiBhbnkgb2xkIGxpc3RuZXJzXG4gICAgbG9hZGVkRmlsZSA9IGZpbGU7XG5cbiAgICAvLyBjbG9zZSBhbnkgb2xkIGNvbm5lY3Rpb25cbiAgICBpZiggcnREb2MgKSBydERvYy5jbG9zZSgpO1xuXG4gICAgLy8gZ2V0IG91dCBvZiBoZXJlIGlmIHdlIGRvbid0IGhhdmUgYSBsb2FkZWQgZmlsZVxuICAgIGlmKCBsb2FkZWRGaWxlID09IG51bGwgKSByZXR1cm47XG5cbiAgICAvLyBsb2FkIGFwaSBpZiBuZWVkZWRcbiAgICBpZiggIV9ydExvYWRlZCApIHtcbiAgICAgIGdhcGkubG9hZCgnZHJpdmUtcmVhbHRpbWUnLCBmdW5jdGlvbigpe1xuICAgICAgICAvLyBzZXR1cCBydCBob29rc1xuICAgICAgICBfcnRMb2FkZWQgPSB0cnVlO1xuICAgICAgICBfbG9hZFJ0RmlsZSgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNldHVwIHJ0IGhvb2tzXG4gICAgICBfbG9hZFJ0RmlsZSgpO1xuICAgIH1cblxuICAgIC8vIHNldHVwIGlucHV0IGhhbmRsZXJzXG4gICAgJCgnI2lucHV0cyBpbnB1dCcpLm9uKCdmb2N1cycsZnVuY3Rpb24oZSl7XG4gICAgICB2YXIgZWxlID0gJChlLnRhcmdldCk7XG4gICAgICBfc2V0TG9jYWxMb2NrKHtcbiAgICAgICAgaWQgICAgICAgIDogZWxlLmF0dHIoXCJpZFwiKSxcbiAgICAgICAgdmFsdWUgICAgIDogZWxlLnZhbCgpLFxuICAgICAgICB0aW1lc3RhbXAgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgdXNlciAgICAgIDogd2luZG93LnVzZXJpbmZvID8gd2luZG93LnVzZXJpbmZvLm5hbWUgOiBcInVua25vd25cIlxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgJCgnI2lucHV0cyBpbnB1dCcpLm9uKCdibHVyJyxmdW5jdGlvbihlKXtcbiAgICAgIF9yZW1vdmVMb2NhbExvY2soJChlLnRhcmdldCkuYXR0cihcImlkXCIpKTtcbiAgICB9KTtcbiAgICAkKCcjaW5wdXRzIGlucHV0Jykub24oJ2tleXVwJyxmdW5jdGlvbihlKXtcbiAgICAgIGlmKCBlLndoaWNoID09IDEzICkgcmV0dXJuO1xuICAgICAgdmFyIGVsZSA9ICQoZS50YXJnZXQpO1xuICAgICAgX3VwZGF0ZUxvY2FsTG9jayhlbGUuYXR0cihcImlkXCIpLCBlbGUudmFsKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gX3NldExvY2FsTG9jayhsb2NrKSB7XG4gICAgLy8gVE9ETzogdGhpcyBzaG91bGQgbWFyayB0aGUgY3VycmVudCBsb2NrXG4gICAgaWYoIGxpdmVFZGl0cy5oYXNbbG9jay5pZF0gKSByZXR1cm47XG4gICAgbGl2ZUVkaXRzLnNldChsb2NrLmlkLCBsb2NrKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF91cGRhdGVMb2NhbExvY2soaWQsIHZhbCkge1xuICAgIHZhciBsb2NrID0ge1xuICAgICAgaWQgOiBpZCxcbiAgICAgIHZhbHVlIDogdmFsLFxuICAgICAgdGltZXN0YW1wIDogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICB1c2VyICAgICAgOiB3aW5kb3cudXNlcmluZm8gPyB3aW5kb3cudXNlcmluZm8ubmFtZSA6IFwidW5rbm93blwiXG4gICAgfVxuXG4gICAgbGl2ZUVkaXRzLnNldChpZCwgbG9jayk7XG4gIH1cblxuICBmdW5jdGlvbiBfcmVtb3ZlTG9jYWxMb2NrKGlkKSB7XG4gICAgbGl2ZUVkaXRzLmRlbGV0ZShpZCk7XG4gIH1cblxuICBmdW5jdGlvbiBfcmVtb3ZlUmVtb3RlTG9jayhsb2NrKSB7XG4gICAgJChcIiNcIitsb2NrLmlkKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG4gICAgJChcIiNcIitsb2NrLmlkK1wiLWVkaXRpbmdcIikucmVtb3ZlKCk7XG4gICAgZGVsZXRlIHJ0RWRpdHNbbG9jay5pZF07XG4gIH1cblxuICBmdW5jdGlvbiBfdXBkYXRlTG9jayhsb2NrKSB7XG4gICAgJChcIiNcIitsb2NrLmlkKS52YWwobG9jay52YWx1ZSkuYXR0cihcImRpc2FibGVkXCIsXCJkaXNhYmxlZFwiKTtcbiAgICBpZiggJChcIiNcIitsb2NrLmlkK1wiLWVkaXRpbmdcIikubGVuZ3RoID09IDAgKSB7XG4gICAgICAkKFwiI1wiK2xvY2suaWQpLnBhcmVudCgpLmFmdGVyKFwiPHNwYW4gaWQ9J1wiK2xvY2suaWQrXCItZWRpdGluZycgY2xhc3M9J2xhYmVsIGxhYmVsLXdhcm5pbmcnPjwvc3Bhbj5cIik7XG4gICAgfVxuICAgICQoXCIjXCIrbG9jay5pZCtcIi1lZGl0aW5nXCIpLmh0bWwobG9jay51c2VyKTtcbiAgICBydEVkaXRzW2xvY2suaWRdID0gbG9jaztcbiAgfVxuXG4gIC8qKipcbiAgICogVXBkYXRlIHRoZSBsaXN0IG9mIHJlYWx0aW1lIGVkaXRzIGFzIHdlbGwgYXMgdGhlIGlucHV0IFVJIGJhc2VkIG9uIHRoZSBydERvYyBldmVudFxuICAgKiBUT0RPOiB0aGlzIGlzIGEgYml0IG5hc3R5IHJpZ2h0IG5vd1xuICAgKiovXG4gIGZ1bmN0aW9uIF91cGRhdGVSdEVkaXRzKGUpIHtcbiAgICBpZiggZS5pc0xvY2FsICkgcmV0dXJuO1xuXG4gICAgdmFyIGtleXMgPSBsaXZlRWRpdHMua2V5cygpO1xuXG4gICAgLy8gcmVtb3ZlIG9sZCB0aW1lc3RhbXBzIFRPRE9cbiAgICAvKmZvciggdmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIG5vdyAtIHZhbHVlc1tpXS50aW1lc3RhbXAgPiAxMDAwICogNjAgKSB7XG4gICAgICAgIF9yZW1vdmVMb2NrKHZhbHVlc1tpXSk7IC8vIGRvZXMgdGhpcyBmaXJlIHVwZGF0ZXM/XG4gICAgICB9XG4gICAgfSovXG5cblxuICAgIC8vIHNldCBuZXcgZWRpdHNcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBfdXBkYXRlTG9jayhsaXZlRWRpdHMuZ2V0KGtleXNbaV0pKTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgb2xkIGVkaXRzXG4gICAgZm9yKCB2YXIga2V5IGluIHJ0RWRpdHMgKSB7XG4gICAgICBpZigga2V5cy5pbmRleE9mKGtleSkgPT0gLTEgKSB7XG4gICAgICAgIF9yZW1vdmVSZW1vdGVMb2NrKHJ0RWRpdHNba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqKlxuICAgKiAgU2V0dXAgdGhlIHJ0IGhvb2tzIGZvciB0aGUgY3VycmVudCBmaWxlLiAgVGhlIGFwaSBuZWVkcyB0byBhbHJlYWR5IGJlIGxvYWRlZFxuICAgKioqL1xuICBmdW5jdGlvbiBfbG9hZFJ0RmlsZSgpIHtcbiAgICAvLyBnZXQgdGhlIHJ0IGRvY1xuICAgIGdhcGkuZHJpdmUucmVhbHRpbWUubG9hZChsb2FkZWRGaWxlLFxuICAgICAgLy8gcnQgZG9jIGxvYWRlZFxuICAgICAgZnVuY3Rpb24oZmlsZSl7XG4gICAgICAgIHJ0RG9jID0gZmlsZTtcblxuICAgICAgICAvLyBnZXQgb3VyIHJ0IGF0dHJpYnV0ZS4gIFRyaWdnZXJpbmcgY2hhbmdlcyBvbiBydEpzb24gd2lsbCBwdXNoIGV2ZW50c1xuICAgICAgICAvLyB0byBhbGwgbGlzdGVuaW5nIGNsaWVudHNcbiAgICAgICAgdmFyIGpzb24gPSBmaWxlLmdldE1vZGVsKCkuZ2V0Um9vdCgpLmdldChcImpzb25cIik7XG4gICAgICAgIGxpdmVFZGl0cyA9IGZpbGUuZ2V0TW9kZWwoKS5nZXRSb290KCkuZ2V0KFwibGl2ZUVkaXRzXCIpO1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIGpzb24gYXR0ciwgd2UgbmVlZCB0byBpbml0aWFsaXplIHRoZSBtb2RlbFxuICAgICAgICBpZigganNvbiA9PSBudWxsIHx8IGxpdmVFZGl0cyA9PSBudWxsKSB7XG4gICAgICAgICAgLy8gaW5pdGlhbGl6ZSBvdXIgcnQgbW9kZWxcbiAgICAgICAgICBfb25SdE1vZGVsTG9hZChmaWxlLmdldE1vZGVsKCkpO1xuICAgICAgICAgIC8vIGdyYWIgcnQganNvbiBhdHRyIG5vdyB0aGF0IHdlIGFyZSBpbml0aWFsaXplZFxuICAgICAgICAgIGpzb24gPSBmaWxlLmdldE1vZGVsKCkuZ2V0Um9vdCgpLmdldChcImpzb25cIik7XG4gICAgICAgICAgbGl2ZUVkaXRzID0gZmlsZS5nZXRNb2RlbCgpLmdldFJvb3QoKS5nZXQoXCJsaXZlRWRpdHNcIik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBiYWRuZXNzIGhhcHBlbmVkIDooXG4gICAgICAgIGlmKCAhanNvbiApIHJldHVybiBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBjb25uZWN0IHRvIHJ0IGpzb25cIik7XG4gICAgICAgIC8vIHNldCB0aGF0IGF0dHIgZ2xvYmFsIHRvIGNsYXNzXG4gICAgICAgIHJ0SnNvbiA9IGpzb247XG5cbiAgICAgICAgLy8gZ2V0IGN1cnJlbnQgbGlzdCBvZiB1c2Vyc1xuICAgICAgICB2YXIgdXNlcnMgPSBmaWxlLmdldENvbGxhYm9yYXRvcnMoKTtcblxuICAgICAgICAvLyBUT0RPOiB0aGlzIG5lZWRzIHdvcmtzIC4uLlxuICAgICAgICAvLyBzZWUgaWYgdGhlcmUgYXJlIGFjdGl2ZSBjaGFuZ2VzIHRvIHRoZSBtb2RlbFxuICAgICAgICAvKmlmKCB1c2Vycy5sZW5ndGggPiAwICYmIEpTT04uc3RyaW5naWZ5KG0zUEdJTy5leHBvcnRTZXR1cCgpKSAhPSBydEpzb24uZ2V0VGV4dCgpICkge1xuICAgICAgICAgIC8vIGxldCB0aGluZ3Mgc2V0dGxlXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYoIGNvbmZpcm0oXCJUaGVyZSBhcmUgYWN0aXZlIGNoYW5nZXMgdG8gdGhpcyBtb2RlbCwgd291bGQgeW91IGxpa2UgdG8gbG9hZCB0aGVtP1wiKSApIHtcbiAgICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHJ0SnNvbi5nZXRUZXh0KCkpO1xuICAgICAgICAgICAgICBtM1BHSU8ubG9hZFNldHVwKGxvYWRlZEZpbGUsIGRhdGEsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9Ki9cblxuICAgICAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzIGZvciB3aGVuIHBlb3BsZSBjb21lIGFuZCBnb1xuICAgICAgICBmaWxlLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuQ09MTEFCT1JBVE9SX0pPSU5FRCwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgdXNlcnMgPSBmaWxlLmdldENvbGxhYm9yYXRvcnMoKTtcbiAgICAgICAgICBfdXBkYXRlQWN0aXZlVXNlcnModXNlcnMpO1xuICAgICAgICB9KTtcbiAgICAgICAgZmlsZS5hZGRFdmVudExpc3RlbmVyKGdhcGkuZHJpdmUucmVhbHRpbWUuRXZlbnRUeXBlLkNPTExBQk9SQVRPUl9MRUZULCBmdW5jdGlvbihlKXtcbiAgICAgICAgICB1c2VycyA9IGZpbGUuZ2V0Q29sbGFib3JhdG9ycygpO1xuICAgICAgICAgIF91cGRhdGVBY3RpdmVVc2Vycyh1c2Vycyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBydEpzb24gb2JqZWN0XG4gICAgICAgIC8vIHdoZW4gdGhpcyB1cGRhdGVzLCB3ZSB3YW50IHRvIHJlLXJ1biB0aGUgbW9kZWxcbiAgICAgICAganNvbi5hZGRFdmVudExpc3RlbmVyKGdhcGkuZHJpdmUucmVhbHRpbWUuRXZlbnRUeXBlLlRFWFRfSU5TRVJURUQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgIGlmKCBlLmlzTG9jYWwgKSByZXR1cm47XG4gICAgICAgICAgX3JlcnVuUnQodXNlcnMsIGUudXNlcklkKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBqc29uLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuVEVYVF9ERUxFVEVELCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKCBlLmlzTG9jYWwgKSByZXR1cm47XG4gICAgICAgICAgICBfcmVydW5SdCh1c2VycywgZS51c2VySWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gbGl2ZSBlZGl0IHVwZGF0ZXNcbiAgICAgICAgICAgICAgICBsaXZlRWRpdHMuYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5WQUxVRV9DSEFOR0VELCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICAgIF91cGRhdGVSdEVkaXRzKGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gc2hvdyB3aG8gaXMgbGlzdGVuaW5nXG4gICAgICAgICAgX3VwZGF0ZUFjdGl2ZVVzZXJzKHVzZXJzKTtcblxuICAgICAgICAgIC8vIHNldCBpbnB1dCBoYW5kbGVycyBmb3IgcnQgZXZlbnRzXG4gICAgICB9LFxuICAgICAgLy8gbW9kZWwgbG9hZGVkXG4gICAgICBmdW5jdGlvbihtb2RlbCl7XG4gICAgICAgIF9vblJ0TW9kZWxMb2FkKG1vZGVsKTtcbiAgICAgIH0sXG4gICAgICAvLyBlcnJvcnNcbiAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJUIEVSUk9SUzogXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuXG4gIC8qKipcbiAgICogVXBkYXRlIHRoZSBkaXNwbGF5IG9mIGFjdGl2ZSB1c2VycyBmb3IgdGhlIG1vZGVsLlxuICAgKioqL1xuICBmdW5jdGlvbiBfdXBkYXRlQWN0aXZlVXNlcnModXNlcnMpIHtcbiAgICAvLyBpZiBpdCdzIGp1c3QgdXMsIGRvbid0IHNob3cgYW55dGhpbmdcbiAgICBpZiggIXVzZXJzICkgcmV0dXJuICQoXCIjYWN0aXZlLXVzZXJzXCIpLmh0bWwoXCJcIik7XG4gICAgaWYoIHVzZXJzLmxlbmd0aCA8PSAxICkgcmV0dXJuICQoXCIjYWN0aXZlLXVzZXJzXCIpLmh0bWwoXCJcIik7XG5cbiAgICAvLyB3ZSBvbmx5IHdhbnQgdW5pcXVlIHVzZXJzXG4gICAgdmFyIHVuaXF1ZSA9IFtdO1xuICAgIHZhciB1dXNlcnMgPSBbXTtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHVzZXJzLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHVuaXF1ZS5pbmRleE9mKHVzZXJzW2ldLnVzZXJJZCkgPT0gLTEgKSB7XG4gICAgICAgIHVuaXF1ZS5wdXNoKHVzZXJzW2ldLnVzZXJJZCk7XG4gICAgICAgIHV1c2Vycy5wdXNoKHVzZXJzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoIHV1c2Vycy5sZW5ndGggPD0gMSApIHJldHVybiAkKFwiI2FjdGl2ZS11c2Vyc1wiKS5odG1sKFwiXCIpO1xuXG4gICAgLy8gYWRkIHBpYyBvZiB1c2VyIHRvIGRpc3BsYXkgcGFuZWxcbiAgICB2YXIgaHRtbCA9IFwiQWN0aXZlIFVzZXJzIFwiO1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdXVzZXJzLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHV1c2Vyc1tpXS5waG90b1VybCApIHtcbiAgICAgICAgaHRtbCArPSBcIjxpbWcgc3JjPSdcIit1dXNlcnNbaV0ucGhvdG9VcmwrXCInIHRpdGxlPSdcIit1dXNlcnNbaV0uZGlzcGxheU5hbWUrXCInIHN0eWxlPSdtYXJnaW46MCA1cHg7d2lkdGg6MzJweDtoZWlnaHQ6MzJweCcgY2xhc3M9J2ltZy1yb3VuZGVkJyAvPiBcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGh0bWwgKz0gXCI8c3BhbiBzdHlsZT0nd2lkdGg6MzJweDtoZWlnaHQ6MzJweDttYXJnaW46MCA1cHg7YmFja2dyb3VuZC1jb2xvcjpcIit1dXNlcnNbaV0uY29sb3IrXCInIHRpdGxlPSdcIit1dXNlcnNbaV0uZGlzcGxheU5hbWUrXCInID48L3NwYW4+IFwiO1xuICAgICAgfVxuICAgIH1cbiAgICAkKFwiI2FjdGl2ZS11c2Vyc1wiKS5odG1sKGh0bWwpO1xuICB9XG5cbiAgLyoqKlxuICAgICAqICBSZS1ydW4gdGhlIG1vZGVsLiAgRXZlbnRzIGNhbiBjb21lIGluIHF1aWNrbHkgaW4gbWFueSBwYXJ0cy4gIEJ1ZmZlciB0aGUgZXZlbnRzIHNvIHdlIGRvbid0IHJlLXJ1biB0aGUgbW9kZWwgdG9vIG1hbnkgdGltZXMuXG4gICAgICoqKi9cbiAgZnVuY3Rpb24gX3JlcnVuUnQodXNlcnMsIHVzZXJJZCkge1xuICAgIC8vIHRoaXMgaXMgYmFkbmVzc1xuICAgIGlmKCAhcnRKc29uICkgcmV0dXJuO1xuXG4gICAgLy8gY2xlYXIgYW55IHF1ZXVlZCBydW5cbiAgICBpZiggX3J0VGltZXIgIT0gLTEgKSBjbGVhclRpbWVvdXQoX3J0VGltZXIpO1xuXG4gICAgLy8gcXVldWUgdXAgYSBydW4gYW5kIHdhaXQgdG8gbWFrZSBzdXJlIHRoZXJlIGFyZSBubyB1cGRhdGVzXG4gICAgX3J0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBfcnRUaW1lciA9IC0xO1xuXG4gICAgICAvLyBmaW5kIHRoZSB1c2VyIHdobyBpcyBydW5uaW5nIHRoZSBtb2RlbCBhbmQgZGlwbGF5IHBvcHVwIG9mIHRoYXQgdXNlcnMgaW5mb3JtYXRpb25cbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdXNlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIGlmKCB1c2Vyc1tpXS51c2VySWQgPT0gdXNlcklkICkge1xuICAgICAgICAgIHZhciBwYW5lbCA9ICQoXCI8ZGl2IGNsYXNzPSdpbml0LWxvYWRpbmctb3V0ZXInID48ZGl2IGNsYXNzPSdpbml0LWxvYWRpbmcnIHN0eWxlPSd3aWR0aDo0MDBweCc+IFwiK1xuICAgICAgICAgICAgICAgICAgKHVzZXJzW2ldLnBob3RvVXJsID8gXCI8aW1nIHNyYz0nXCIrdXNlcnNbaV0ucGhvdG9VcmwrXCInIC8+IFwiIDogXCJcIikrdXNlcnNbaV0uZGlzcGxheU5hbWUrXCIgaXMgdXBkYXRpbmcgdGhlIG1vZGVsLi4uPC9kaXY+PC9kaXY+XCIpO1xuICAgICAgICAgICAgICAkKFwiYm9keVwiKS5hcHBlbmQocGFuZWwpO1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICBwYW5lbC5jc3MoXCJvcGFjaXR5XCIsXCIuOVwiKTtcbiAgICAgICAgICAgICAgfSw1MCk7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgIHBhbmVsLnJlbW92ZSgpO1xuICAgICAgICAgICAgICB9LCAzNTAwKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcGFyc2UgdGhlIG5ldyBtb2RlbCBkYXRhIGFuZCBsb2FkIGl0IGFzIG91ciBjdXJyZW50IHNldHVwXG4gICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocnRKc29uLmdldFRleHQoKSk7XG4gICAgICBtM1BHSU8ubG9hZFNldHVwKGxvYWRlZEZpbGUsIGRhdGEsIHRydWUpO1xuICAgIH0sIDMwMCk7XG4gIH1cblxuICAvKioqXG4gICAqIGluaXRpYWxpemUgYSBuZXcgcnQgbW9kZWxcbiAgICoqKi9cbiAgZnVuY3Rpb24gX29uUnRNb2RlbExvYWQobW9kZWwpIHtcbiAgICAvLyBjdXJyZW50bHkgd2UganVzdCB3YW50IHRvIHVzZSB0aGlzIHNpbmdsZSBhdHRyaWJ1dGUgdG8gYnJvYWRjYXN0IGV2ZW50c1xuICAgIHZhciBqc29uID0gbW9kZWwuZ2V0Um9vdCgpLmdldChcImpzb25cIik7XG4gICAgaWYoIGpzb24gPT0gbnVsbCApIHtcbiAgICAgIHZhciBzdHJpbmcgPSBtb2RlbC5jcmVhdGVTdHJpbmcoXCJ7fVwiKTtcbiAgICAgIG1vZGVsLmdldFJvb3QoKS5zZXQoXCJqc29uXCIsIHN0cmluZyk7XG4gICAgfVxuXG4gICAgdmFyIGxpdmVFZGl0cyA9IG1vZGVsLmdldFJvb3QoKS5nZXQoXCJsaXZlRWRpdHNcIik7XG4gICAgaWYoIGxpdmVFZGl0cyA9PSBudWxsICkge1xuICAgICAgdmFyIGZpZWxkID0gbW9kZWwuY3JlYXRlTWFwKCk7XG4gICAgICBtb2RlbC5nZXRSb290KCkuc2V0KFwibGl2ZUVkaXRzXCIsIGZpZWxkKTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKipcbiAgICogbGV0IHRoZSB3b3JsZCBrbm93IHdoYXQgd2UgYXJlIGRvaW5nIDopXG4gICAqIFRoaXMgc2hvdWxkIGJlIGNhbGxlZCB3aGVuIGEgbG9jYWwgdXNlciBydW5zIHRoZSBtb2RlbC4gIEl0IHVwZGF0ZXMgdGhlICdqc29uJ1xuICAgKiBhdHRyaWJ1dGUgd2hpY2ggaXMgdGhlbiBicm9hZGNhc3QgdG8gYWxsIGxpc3RlbmluZyBwYXJ0aWVzXG4gICAqKiovXG4gIGZ1bmN0aW9uIHJ1bk1vZGVsUnQoKSB7XG4gICAgaWYoIHJ0SnNvbiApIHJ0SnNvbi5zZXRUZXh0KEpTT04uc3RyaW5naWZ5KCBtM1BHSU8uZXhwb3J0U2V0dXAoKSApKTtcbiAgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcnVuTW9kZWxSdCA6IHJ1bk1vZGVsUnQsXG4gIGluaXRSdEFwaSAgOiBpbml0UnRBcGlcbn07XG4iLCJ2YXIgb2ZmbGluZSA9IHJlcXVpcmUoJy4vb2ZmbGluZScpO1xudmFyIGdkcml2ZSA9IHJlcXVpcmUoJy4vZ2RyaXZlJyk7XG52YXIgY2hhcnRzID0gcmVxdWlyZSgnLi9jaGFydHMnKTtcbnZhciB3ZWF0aGVyRmlsZVJlYWRlciA9IHJlcXVpcmUoJy4vd2VhdGhlckZpbGVSZWFkZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcblxudmFyIHdlYXRoZXJBdmVyYWdlQ2hhcnQgPSBudWxsO1xudmFyIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhID0ge307XG5cbnZhciBTRVRVUF9URU1QTEFURSA9XG4gICc8ZGl2PicrXG4gICc8aDQ+Q2hhcnQgT3B0aW9uczwvaDQ+JytcbiAgJzxkaXY+JytcbiAgICAgICc8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPicrXG4gICAgICAgICAgJzx0cj4nK1xuICAgICAgICAgICAgICAnPHRkIHN0eWxlPVwid2lkdGg6NTAlXCI+T3V0cHV0IHZhcmlhYmxlKHMpIHRvIGNoYXJ0IDwvdGQ+JytcbiAgICAgICAgICAgICAgJzx0ZD4gPGEgaWQ9XCJzZWxlY3QtY2hhcnRzLWJ0blwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+U2VsZWN0IENoYXJ0czwvYT48L3RkPicrXG4gICAgICAgICAgJzwvdHI+JytcbiAgICAgICAgICAnPHRyPicrXG4gICAgICAgICAgICAgICc8dGQgc3R5bGU9XCJ3aWR0aDo1MCVcIj5WYXJpYXRpb24gYW5hbHlzaXMgcGFyYW1ldGVyKHMpIDwvdGQ+JytcbiAgICAgICAgICAgICAgJzx0ZD48ZGl2IGlkPVwidmFyaWF0aW9uQW5hbHlzaXNTdGF0dXNcIj5Ob25lPC9kaXY+PC90ZD4nK1xuICAgICAgICAgICc8L3RyPicrXG4gICAgICAnPC90YWJsZT4nK1xuICAnPC9kaXY+JytcbiAgJzxoND5Mb2NhdGlvbjwvaDQ+JytcbiAgICc8ZGl2IHN0eWxlPVwiYm9yZGVyLXRvcDoxcHggc29saWQgI2RkZDtwYWRkaW5nOjhweDtoZWlnaHQ6NjBweFwiPicrXG4gICAgICc8c3BhbiBpZD1cImN1cnJlbnQtbG9jYXRpb25cIiBzdHlsZT1cImNvbG9yOiM4ODhcIj48L3NwYW4+JytcbiAgICAgJzxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IHB1bGwtcmlnaHQgc2VsZWN0LXdlYXRoZXItbG9jYXRpb25cIj48aSBjbGFzcz1cImljb24tbWFwLW1hcmtlclwiPjwvaT4gU2VsZWN0IExvY2F0aW9uPC9hPicrXG4gICAgICc8L2Rpdj4nK1xuICAgICAnPGRpdj4nO1xuXG52YXIgR09PTEVEUklWRV9UUkVFX1RFTVBMQVRFID1cbiAgJzxkaXYgc3R5bGU9XCJwYWRkaW5nOjE1cHggMCA1cHggMDttYXJnaW4tYm90dG9tOjVweDtoZWlnaHQ6IDUwcHhcIj4nK1xuICAgICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIHB1bGwtcmlnaHRcIiBpZD1cInRyZWUtc3ViLW1lbnVcIj4nK1xuICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIj4nK1xuICAgICAgICAnPHNwYW4gaWQ9XCJsb2FkZWQtdHJlZS1uYW1lXCI+RGVmYXVsdCBUcmVlPC9zcGFuPiA8c3BhbiBjbGFzcz1cImNhcmV0XCI+PC9zcGFuPicrXG4gICAgICAnPC9idXR0b24+JytcbiAgICAgICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIj4nK1xuICAgICAgICAnPGxpPjxhIGlkPVwiZ2RyaXZlLXRyZWVwYW5lbC1sb2FkXCI+PGkgY2xhc3M9XCJpY29uLWNsb3VkLWRvd25sb2FkXCI+PC9pPiBMb2FkIFRyZWU8L2E+PC9saT4nK1xuICAgICAgICAnPGxpPjxhIGlkPVwiZ2RyaXZlLXRyZWVwYW5lbC1zYXZlXCI+PGkgY2xhc3M9XCJpY29uLWNsb3VkLXVwbG9hZFwiPjwvaT4gU2F2ZSBUcmVlPC9hPjwvbGk+JytcbiAgICAgICAgJzxsaSBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxhIGlkPVwic2hhcmUtdHJlZS1idG5cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHN0eWxlPVwiZGlzcGxheTpub25lO21hcmdpbi1sZWZ0OjEwcHhcIj48aSBjbGFzcz1cImljb24tc2hhcmVcIj48L2k+IFNoYXJlIFRyZWU8L2E+PC9saT4nK1xuICAgICAgJzwvdWw+JytcbiAgJzwvZGl2PicrXG4gICc8ZGl2IHN0eWxlPVwiZGlzcGxheTpub25lXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY29tcGFyZS10cmVlc1wiIC8+IENvbXBhcmUgVHJlZXM8L2Rpdj4nK1xuJzwvZGl2Pic7XG5cbnZhciBJTlBVVF9URU1QTEFURSA9XG4gICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicrXG4gICAgJzxsYWJlbCBmb3I9XCJ7e2lkfX1cIiBjbGFzcz1cImNvbC1sZy00IGNvbnRyb2wtbGFiZWxcIj57e2xhYmVsfX08L2xhYmVsPicrXG4gICAgJzxkaXYgY2xhc3M9XCJjb2wtbGctOFwiPicrXG4gICAgICAnPGlucHV0IHR5cGU9XCJ7e3R5cGV9fVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJ7e2lkfX1cIiBzdHlsZT1cIndpZHRoOjIwMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrXCIgdmFsdWU9XCJ7e3ZhbHVlfX1cIj4mbmJzcDsmbmJzcDt7e3VuaXRzfX0nK1xuICAgICAgJzxwIGNsYXNzPVwiaGVscC1ibG9ja1wiPnt7ZGVzY3JpcHRpb259fTwvcD4nICtcbiAgICAnPC9kaXY+JytcbiAgJzwvZGl2Pic7XG5cbnZhciBBUlJBWV9JTlBVVF9URU1QTEFURSA9XG4gICc8ZGl2IGNsYXNzPVwiY29sLWxnLTZcIj48ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicrXG4gICAgJzxsYWJlbCBmb3I9XCJ7e2lkfX1cIiBjbGFzcz1cImNvbC1sZy00IGNvbnRyb2wtbGFiZWxcIj57e2xhYmVsfX08L2xhYmVsPicrXG4gICAgJzxkaXYgY2xhc3M9XCJjb2wtbGctOFwiPicrXG4gICAgICAne3tpbnB1dHN9fScrXG4gICAgICAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+e3tkZXNjcmlwdGlvbn19PC9wPicgK1xuICAgICc8L2Rpdj4nK1xuICAnPC9kaXY+PC9kaXY+JztcblxudmFyIHRhYkhlYWRlciA9ICc8dWwgY2xhc3M9XCJuYXYgbmF2LXBpbGxzXCIgaWQ9XCJpbnB1dF9waWxsc1wiPic7XG52YXIgY29udGVudCA9ICc8ZGl2IGNsYXNzPVwicGlsbC1jb250ZW50XCI+JztcblxudmFyIHRyZWVIZWFkZXIgPSAnPGRpdiBjbGFzcz1cInBhbmVsLWdyb3VwXCIgaWQ9XCJ0cmVlLWFjY29yZGlvblwiPic7XG52YXIgVFJFRV9QQU5FTF9URU1QTEFURSA9ICc8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPicrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPicrXG4gICAgICAgICAgICAnPGg0IGNsYXNzPVwicGFuZWwtdGl0bGVcIj4nK1xuICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImFjY29yZGlvbi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS1wYXJlbnQ9XCIjdHJlZS1hY2NvcmRpb25cIiBocmVmPVwiI2NvbGxhcHNle3tpZH19XCI+JytcbiAgICAgICAgICAgICAgICAgICAgJ3t7dGl0bGV9fScrXG4gICAgICAgICAgICAgICAgJzwvYT4nK1xuICAgICAgICAgICAgJzwvaDQ+JytcbiAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8ZGl2IGlkPVwiY29sbGFwc2V7e2lkfX1cIiBjbGFzcz1cInBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlXCI+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPnt7Ym9keX19PC9kaXY+JytcbiAgICAgICAgJzwvZGl2PicrXG4gICAgICc8L2Rpdj4nO1xuXG52YXIgaW5wdXRzID0ge307XG5cbi8vIGZvciB3ZWF0aGVyIGRhdGFcbnZhciBjb2xzID0gW107XG5cbnZhciBtYXAgPSBudWxsO1xuXG4vKipcbiAqIE9wdGlvbnMgOlxuICogICBtb2RlbCAtIHR5cGUgb2YgbW9kZWwgdG8gYXBwZW5kIHRvXG4gKiAgIGxhYmVsIC0gYXR0cmlidXRlIGxhYmVsXG4gKiAgIHZhbHVlIC0gZGVmYXVsdCB2YWx1ZVxuICogICBkZXNjcmlwdGlvbiAtIGRlc2NyaXB0aW9uIG9mIGF0dHJpYnV0ZVxuICogICB1bml0cyAtIGF0dHJpYnV0ZSB1bml0c1xuICovXG5mdW5jdGlvbiBfYWRkSW5wdXQob3B0aW9ucykge1xuICBpZiggIWlucHV0c1tvcHRpb25zLm1vZGVsXSApIGlucHV0c1tvcHRpb25zLm1vZGVsXSA9IFtdO1xuICBpbnB1dHNbb3B0aW9ucy5tb2RlbF0ucHVzaChvcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZVdlYXRoZXJJbnB1dHMoKSB7XG4gIGZvciggdmFyIGF0dHIgaW4gYXBwLmdldE1vZGVsKCkuZ2V0RGF0YU1vZGVsKCkud2VhdGhlciApIHtcbiAgICBpZiggYXR0ciAhPSBcIm5yZWxcIiApIGNvbHMucHVzaChhdHRyKTtcbiAgfVxuXG4gIHZhciB0YWJsZSA9ICc8ZGl2IHN0eWxlPVwicGFkZGluZy10b3A6MjVweFwiPjxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IHB1bGwtcmlnaHRcIiBpZD1cImxvYWQtd2VhdGhlci1idG5cIj48aSBjbGFzcz1cImljb24tdXBsb2FkLWFsdFwiPjwvaT4gVXBsb2FkPC9hPicrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgaWQ9XCJ3ZWF0aGVyLWlucHV0LXRvZ2dsZVwiPicrXG4gICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGFjdGl2ZVwiPkF2ZXJhZ2VzPC9idXR0b24+JytcbiAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5BY3R1YWw8L2J1dHRvbj4nK1xuICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8ZGl2IGlkPVwiY3VzdG9tLXdlYXRoZXItcGFuZWxcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTttYXJnaW4tdG9wOjIwcHhcIj48L2Rpdj4nK1xuICAgICAgICAnPGRpdiBpZD1cImF2ZXJhZ2Utd2VhdGhlci1wYW5lbFwiPicrXG4gICAgICAgICc8ZGl2IHN0eWxlPVwicGFkZGluZzoxMHB4O2NvbG9yOiM4ODhcIj5TZWxlY3QgbG9jYXRpb24gdG8gc2V0IHRoZSBhdmVyYWdlIHdlYXRoZXIgZGF0YTwvZGl2PicrXG4gICAgICAgICc8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWNvbmRlbnNlZCB3ZWF0aGVyLXRhYmxlXCIgc3R5bGU9XCJtYXJnaW4tdG9wOjIwcHhcIj4nO1xuXG4gIHRhYmxlICs9IFwiPHRyPlwiO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNvbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgdGFibGUgKz0gXCI8dGQ+XCIrY29sc1tpXStcIjwvdGQ+XCI7XG4gIH1cbiAgdGFibGUgKz0gXCI8L3RyPlwiO1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgMTI7IGkrKyApIHtcbiAgICB0YWJsZSArPSBcIjx0cj5cIjtcbiAgICBmb3IoIHZhciBqID0gMDsgaiA8IGNvbHMubGVuZ3RoOyBqKysgKSB7XG4gICAgICBpZiggaiA9PSAwICkge1xuICAgICAgICB0YWJsZSArPSBcIjx0ZD5cIisoaSsxKStcIjwvdGQ+XCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YWJsZSArPSBcIjx0ZD48aW5wdXQgY2xhc3M9J2Zvcm0tY29udHJvbCcgaWQ9J2lucHV0LXdlYXRoZXItXCIrY29sc1tqXStcIi1cIitpK1wiJyB0eXBlPSd0ZXh0JyAvPjwvdGQ+XCI7XG4gICAgICB9XG4gICAgfVxuICAgIHRhYmxlICs9IFwiPC90cj5cIjtcbiAgfVxuICByZXR1cm4gdGFibGUrJzwvdGFibGU+PGRpdiBpZD1cImF2ZXJhZ2Utd2VhdGhlci1jaGFydFwiPjwvZGl2PjwvZGl2Pic7XG5cbn1cblxuZnVuY3Rpb24gX3NldFdlYXRoZXJEYXRhKCkge1xuICB2YXIgbGwgPSBhcHAucXMoXCJsbFwiKTtcbiAgaWYoIGxsICkge1xuICAgIGxsID0gbGwuc3BsaXQoXCIsXCIpO1xuICAgIF9xdWVyeVdlYXRoZXJEYXRhKGxsWzBdLCBsbFsxXSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFwcC5ydW5Nb2RlbCgpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgICQoXCIjY3VycmVudC1sb2NhdGlvblwiKS5odG1sKFwiTm90IFNldFwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfcXVlcnlXZWF0aGVyRGF0YShsbmcsIGxhdCwgY2FsbGJhY2spIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnd2VhdGhlci1kYXRhLXF1ZXJ5JywgMSk7XG5cbiAgdmFyIHVybCA9IFwiaHR0cDovL2FsZGVyLmJpb2VuZXJneS5jYXNpbC51Y2RhdmlzLmVkdTo4MDgwL3ZpenNvdXJjZS9yZXN0P3ZpZXc9cG9pbnRUb1dlYXRoZXIoXCIrbG5nK1wiLFwiK2xhdCtcIiw4MTkyKVwiXG4gIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gIHZhciByZXNwcyA9IDA7XG5cbiAgZnVuY3Rpb24gY2hlY2tEb25lKCkge1xuICAgICAgcmVzcHMrKztcbiAgICAgIGlmKCByZXNwcyA9PSAyICYmIGNhbGxiYWNrICkgY2FsbGJhY2soKTtcbiAgfVxuXG4gIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgdmFyIHRhYmxlID0gSlNPTi5wYXJzZShyZXNwb25zZS5nZXREYXRhVGFibGUoKS50b0pTT04oKSk7XG5cbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRhYmxlLnJvd3MubGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgbSA9IGkrJyc7XG4gICAgICB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YVttXSA9IHt9O1xuICAgICAgZm9yKCB2YXIgaiA9IDE7IGogPCB0YWJsZS5jb2xzLmxlbmd0aDsgaisrICkge1xuICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIrY29sc1tqXStcIi1cIitpKS52YWwodGFibGUucm93c1tpXS5jW2pdID8gdGFibGUucm93c1tpXS5jW2pdLnYgOiBcIlwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVBdmVyYWdlQ2hhcnQoKTtcbiAgICBjaGVja0RvbmUoKTtcbiAgfSk7XG5cbiAgdmFyIHVybCA9IFwiaHR0cDovL2FsZGVyLmJpb2VuZXJneS5jYXNpbC51Y2RhdmlzLmVkdTo4MDgwL3ZpenNvdXJjZS9yZXN0P3ZpZXc9cG9pbnRUb1NPSUwoXCIrbG5nK1wiLFwiK2xhdCtcIiw4MTkyKVwiXG4gIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgdmFyIGVycm9yID0gZmFsc2U7XG4gICAgdmFyIHRhYmxlID0gSlNPTi5wYXJzZShyZXNwb25zZS5nZXREYXRhVGFibGUoKS50b0pTT04oKSk7XG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB0YWJsZS5jb2xzLmxlbmd0aDsgaSsrICkge1xuICAgICAgaWYoIHRhYmxlLnJvd3NbMF0gPT0gbnVsbCApIHtcbiAgICAgICAgZXJyb3IgPSB0cnVlO1xuICAgICAgICBhbGVydChcIkludmFsaWQgbG9jYXRpb24gc2VsZWN0ZWRcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgJChcIiNpbnB1dC1zb2lsLVwiK3RhYmxlLmNvbHNbaV0uaWQpLnZhbCh0YWJsZS5yb3dzWzBdLmNbaV0udik7XG4gICAgfVxuXG4gICAgaWYoICFlcnJvciApIGNoZWNrRG9uZSgpO1xuICB9KTtcblxuICAkKFwiI2N1cnJlbnQtbG9jYXRpb25cIikuaHRtbChsbmcrXCIsIFwiK2xhdCtcIiA8YSBocmVmPSdcIit3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC8jLiovLCcnKStcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiP2xsPVwiK2xuZytcIixcIitsYXQrXCInIHRhcmdldD0nX2JsYW5rJz48aSBjbGFzcz0naWNvbi1saW5rJz48L2k+PC9hPlwiKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQXZlcmFnZUNoYXJ0KCkge1xuICB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YSA9IHt9O1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgMTI7IGkrKyApIHtcbiAgICB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YVtpKycnXSA9IHt9O1xuICAgIGZvciggdmFyIGogPSAxOyBqIDwgY29scy5sZW5ndGg7IGorKyApIHtcbiAgICAgIHZhciB2YWwgPSAkKFwiI2lucHV0LXdlYXRoZXItXCIrY29sc1tqXStcIi1cIitpKS52YWwoKTtcbiAgICAgIGlmKCB2YWwgJiYgdmFsLmxlbmd0aCA+IDAgKSB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YVtpKycnXVtjb2xzW2pdXSA9IHBhcnNlSW50KHZhbCk7XG4gICAgICBlbHNlIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhW2krJyddW2NvbHNbal1dID0gMDtcbiAgICB9XG4gIH1cbiAgd2VhdGhlckF2ZXJhZ2VDaGFydCA9IGNoYXJ0cy5jcmVhdGVXZWF0aGVyQ2hhcnQoJCgnI2F2ZXJhZ2Utd2VhdGhlci1jaGFydCcpWzBdLCB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YSk7XG59XG5cbmZ1bmN0aW9uIF9zZWxlY3RXZWF0aGVyTG9jYXRpb24oKSB7XG4gIGlmKCAhbWFwICkge1xuICAgICQoXCIjc2VsZWN0LXdlYXRoZXItbW9kYWxcIikubW9kYWwoe30pO1xuXG4gICAgJChcIiNsb2NhdGUtYnV0dG9uXCIpLm9uKCdjbGljaycsIF9nZXRMb2NhdGlvbik7XG5cblxuICAgIC8vIHdhaXQgZm9yIHRoZSBtb2RhbCB0byBpbml0XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgaWYoIG9mZmxpbmVNb2RlICkgcmV0dXJuO1xuXG4gICAgICBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKCQoXCIjZ21hcFwiKVswXSwge1xuICAgICAgICBjZW50ZXIgOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDM1LCAtMTIxKSxcbiAgICAgICAgem9vbTogNSxcbiAgICAgICAgbWFwVHlwZUlkIDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVBcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgZGVmYXVsdFN0eWxlID0ge1xuICAgICAgICAgICAgcG9seWdvbk9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgc3Ryb2tlQ29sb3IgICA6IFwiIzAwMDBGRlwiLFxuICAgICAgICAgICAgICBzdHJva2VPcGFjaXR5IDogMC41LFxuICAgICAgICAgICAgICBmaWxsQ29sb3IgICAgIDogJyNGRUZFRkUnLFxuICAgICAgICAgICAgICBmaWxsT3BhY2l0eSAgIDogMC4yXG4gICAgICAgICAgICB9LFxuICAgICAgfTtcblxuXG4gICAgICB2YXIgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgIHNlbGVjdDogJ2JvdW5kYXJ5JyxcbiAgICAgICAgICAgIGZyb206ICcxaFY5dlFHM1NjMEpMUGR1RnBXSnp0ZkxLLWV4NmNjeU1nX3B0RV9zJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc3R5bGVzOiBbZGVmYXVsdFN0eWxlXSxcbiAgICAgICAgICBzdXBwcmVzc0luZm9XaW5kb3dzIDogdHJ1ZVxuICAgICAgfTtcblxuICAgICAgdmFyIGZ1c2lvbkxheWVyID0gbmV3IGdvb2dsZS5tYXBzLkZ1c2lvblRhYmxlc0xheWVyKGRlZmF1bHRPcHRpb25zKTtcbiAgICAgIGZ1c2lvbkxheWVyLm9wYWNpdHkgPSAuODtcbiAgICAgIGZ1c2lvbkxheWVyLnNldE1hcChtYXApO1xuXG4gICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXAsICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYoICQoJyNsb2NhdGUtY2FjaGUtbW9kZScpLmlzKCc6Y2hlY2tlZCcpICkge1xuICAgICAgICAgIGFsZXJ0KCdZb3UgbXVzdCBjbGljayBvbiBhIGdlb21ldHJ5IHRvIGNhY2hlJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgX3F1ZXJ5V2VhdGhlckRhdGEoZS5sYXRMbmcubG5nKCksIGUubGF0TG5nLmxhdCgpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGFwcC5ydW5Nb2RlbCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgfSk7XG4gICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihmdXNpb25MYXllciwgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiggJCgnI2xvY2F0ZS1jYWNoZS1tb2RlJykuaXMoJzpjaGVja2VkJykgKSB7XG4gICAgICAgICAgb2ZmbGluZS5jYWNoZVRpbGUoZSwgZnVzaW9uTGF5ZXIsIGRlZmF1bHRPcHRpb25zLCBkZWZhdWx0U3R5bGUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIF9xdWVyeVdlYXRoZXJEYXRhKGUubGF0TG5nLmxuZygpLCBlLmxhdExuZy5sYXQoKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBhcHAucnVuTW9kZWwoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICQoXCIjc2VsZWN0LXdlYXRoZXItbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBzZXR1cCBpbnB1dCBmb3IgY2xlYXJpbmcgY2FjaGVcbiAgICAgICAgICAkKCcjY2xlYXItY2FjaGVkLXRpbGVzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgb2ZmbGluZS5jbGVhckNhY2hlKCk7XG4gICAgICAgICAgICAgIG9mZmxpbmUucmVuZGVyQ2FjaGVkVGlsZXNPbk1hcChmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgIG9mZmxpbmUucmVuZGVyQ2FjaGVkVGlsZXNPbk1hcChmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSk7XG5cbiAgICB9LDUwMCk7XG4gIH0gZWxzZSB7XG4gICAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuXG4gICAgLy8gd2Ugc2VlbSB0byBiZSBoYW5naW5nIHNvbWV0aW1lcy4uLi5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG1hcCwgXCJyZXNpemVcIik7XG4gICAgfSwgNTAwKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZ2V0TG9jYXRpb24oKSB7XG4gIGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHNob3dQb3NpdGlvbik7XG4gICAgJChcIiNsb2NhdGUtYnV0dG9uXCIpLmFkZENsYXNzKFwiYnRuLXdhcm5pbmdcIik7XG4gIH0gZWxzZXtcbiAgICB3aW5kb3cuYWxlcnQoXCJHZW9sb2NhdGlvbiBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgYnJvd3Nlci5cIik7XG4gIH1cbiAgZnVuY3Rpb24gc2hvd1Bvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgJChcIiNsb2NhdGUtYnV0dG9uXCIpLnJlbW92ZUNsYXNzKFwiYnRuLXdhcm5cIikuYWRkQ2xhc3MoXCJidG4tc3VjY2Vzc1wiKTtcbiAgICBtYXAuc2V0Wm9vbSgxMCk7XG4gICAgbWFwLnNldENlbnRlcihuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSwgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSkpO1xuICAgIC8vX3F1ZXJ5V2VhdGhlckRhdGEocG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSwgcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfZ2VuZXJhdGVJbnB1dHMoaSwgdHlwZSwgcHJlZml4LCBuYW1lLCBhdHRycykge1xuICB2YXIgaWQgPSBwcmVmaXgubGVuZ3RoID4gMCA/IHByZWZpeCsnLScrbmFtZSA6ICdpbnB1dC0nK25hbWU7XG4gIHZhciBpbnB1dCA9ICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwibWFyZ2luLWxlZnQ6JysoaSoyMCkrJ3B4O21hcmdpbi10b3A6MHB4O21hcmdpbi1yaWdodDo1cHhcIj4nO1xuXG4gIHZhciB0cmVlYm9keSA9IFwiXCI7XG5cbiAgaWYoICEoaSA9PSAxKSApIHtcbiAgICAgIGlmKCBpICE9IDAgKSBpbnB1dCArPSAnPGxhYmVsIGZvcj1cIicraWQrJ1wiIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiPicrbmFtZSArJzwvbGFiZWw+JztcbiAgICAgIGlucHV0ICs9ICc8ZGl2Pic7XG4gIH1cblxuXG4gICAgICBpZiAoIHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnb2JqZWN0JyAmJiBpID09IDEgICkgeyAvLyAmJiB0eXBlID09ICd0cmVlJyApIHtcbiAgICAgIGZvciggdmFyIGtleSBpbiBhdHRycy52YWx1ZSApIHtcbiAgICAgICAgICAgICAgdHJlZWJvZHkgKz0gX2dlbmVyYXRlSW5wdXRzKGkrMSwgdHlwZSwgaWQsIGtleSwgYXR0cnMudmFsdWVba2V5XSk7XG4gICAgICAgICAgfVxuICB9IGVsc2UgaWYgKCB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ29iamVjdCcgKSB7XG4gICAgICBpZiggYXR0cnMuZGVzY3JpcHRpb24gKSBpbnB1dCArPSAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+JythdHRycy5kZXNjcmlwdGlvbisnPC9wPic7XG4gICAgICAgICAgZm9yKCB2YXIga2V5IGluIGF0dHJzLnZhbHVlICkge1xuICAgICAgICAgICAgICBpbnB1dCArPSBfZ2VuZXJhdGVJbnB1dHMoaSsxLCB0eXBlLCBpZCwga2V5LCBhdHRycy52YWx1ZVtrZXldKTtcbiAgICAgICAgICB9XG4gIH0gZWxzZSBpZiAoICh0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ251bWJlcicgfHwgdHlwZW9mIGF0dHJzLnZhbHVlID09ICdzdHJpbmcnKSAmJiBpID09IDEgKSB7IC8vICYmIHR5cGUgPT0gJ3RyZWUnICkge1xuXG4gICAgICB0cmVlYm9keSArPVxuICAgICAgICAgICc8ZGl2PjxpbnB1dCB0eXBlPVwiJysoYXR0cnMudmFsdWUgPT0gJ19kYXRlXycgPyAnZGF0ZScgOiAndGV4dCcpKydcIiAnK1xuICAgICAgICAgICh0eXBlPT0nY29uc3RhbnRzJz8nZGlzYWJsZWQnOicnKSsnIGNsYXNzPVwiZm9ybS1jb250cm9sICcrdHlwZSsnXCIgaWQ9XCInK1xuICAgICAgICAgIGlkKydcIiBzdHlsZT1cIndpZHRoOjIwMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrXCIgdmFsdWU9XCInXG4gICAgICAgICAgICAgICsoYXR0cnMudmFsdWUgPT0gJ19kYXRlXycgPyAnJyA6IGF0dHJzLnZhbHVlKSsnXCI+Jm5ic3A7Jm5ic3A7J1xuICAgICAgICAgICAgICArKGF0dHJzLnVuaXRzID8gYXR0cnMudW5pdHMgOiAnJykrJzwvZGl2Pic7XG5cbiAgfSBlbHNlIGlmICggIHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnc3RyaW5nJyB8fCB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ251bWJlcicgKSB7XG5cbiAgICBpbnB1dCArPSAnPGRpdj48aW5wdXQgdHlwZT1cIicrKGF0dHJzLnZhbHVlID09ICdfZGF0ZV8nID8gJ2RhdGUnIDogJ3RleHQnKSsnXCIgJ1xuICAgICAgICAgICsodHlwZT09J2NvbnN0YW50cyc/J2Rpc2FibGVkJzonJykrJyBjbGFzcz1cImZvcm0tY29udHJvbCAnK3R5cGUrXG4gICAgICAgICAgICdcIiBpZD1cIicraWQrJ1wiIHN0eWxlPVwid2lkdGg6MjAwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2tcIiB2YWx1ZT1cIidcbiAgICAgICAgICArKGF0dHJzLnZhbHVlID09ICdfZGF0ZV8nID8gJycgOiBhdHRycy52YWx1ZSkrJ1wiPiZuYnNwOyZuYnNwOydcbiAgICAgICAgICArKGF0dHJzLnVuaXRzID8gYXR0cnMudW5pdHMgOiAnJykrJzwvZGl2Pic7XG5cbiAgICBpZiggYXR0cnMuZGVzY3JpcHRpb24gKSBpbnB1dCArPSAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+JythdHRycy5kZXNjcmlwdGlvbisnPC9wPic7XG4gIH1cblxuICBpZiggIShpID09IDEgLyomJiB0eXBlID09ICd0cmVlJyovKSApIHtcbiAgICAgIGlucHV0ICs9ICc8L2Rpdj48L2Rpdj4nO1xuICB9IGVsc2Uge1xuICAgICAgaW5wdXQgKz0gVFJFRV9QQU5FTF9URU1QTEFURVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3t7aWR9fS9nLGlkKVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJ3t7dGl0bGV9fScsbmFtZStcIiA8c3BhbiBzdHlsZT0nY29sb3I6Izg4ODtmb250LXNpemU6MTJweCc+IC0gXCIrYXR0cnMuZGVzY3JpcHRpb24rXCI8L3NwYW4+XCIpXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgne3tib2R5fX0nLHRyZWVib2R5KSsnPC9kaXY+J1xuICB9XG5cbiAgcmV0dXJuIGlucHV0O1xufVxuXG5mdW5jdGlvbiBjcmVhdGUoZWxlKSB7XG4gIHdlYXRoZXJGaWxlUmVhZGVyLmluaXQoKTtcbiAgdmFyIG1vZGVsLCBtLCBhdHRyLCBjb25maWc7XG5cbiAgdmFyIGlucHV0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBhcHAuZ2V0TW9kZWwoKS5nZXREYXRhTW9kZWwoKSk7XG5cbiAgaW5wdXRzWydzZXR1cCddID0ge307XG4gIGZvciggbW9kZWwgaW4gaW5wdXRzICkge1xuICAgIG0gPSBpbnB1dHNbbW9kZWxdO1xuICAgIGZvciggYXR0ciBpbiBtICkge1xuICAgICAgY29uZmlnID0gbVthdHRyXTtcblxuICAgICAgaWYoIHR5cGVvZiBjb25maWcgPT0gJ29iamVjdCcgKSB7XG4gICAgICAgIF9hZGRJbnB1dCh7XG4gICAgICAgICAgbW9kZWwgICAgICAgOiBtb2RlbCxcbiAgICAgICAgICBsYWJlbCAgICAgICA6IGF0dHIsXG4gICAgICAgICAgZGVzY3JpcHRpb24gOiBjb25maWcuZGVzY3JpcHRpb24sXG4gICAgICAgICAgdmFsdWUgICAgICAgOiBjb25maWcudmFsdWUsXG4gICAgICAgICAgdW5pdHMgICAgICAgOiBjb25maWcudW5pdHNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfYWRkSW5wdXQoe1xuICAgICAgICAgIG1vZGVsICAgICAgIDogbW9kZWwsXG4gICAgICAgICAgbGFiZWwgICAgICAgOiBhdHRyXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgZm9yKCBtb2RlbCBpbiBpbnB1dHMgKSB7XG4gICAgaWYoIG1vZGVsID09IFwicGxhbnRhdGlvbl9zdGF0ZVwiICkgY29udGludWU7XG5cbiAgICB0YWJIZWFkZXIgKz0gJzxsaT48YSBocmVmPVwiI2lucHV0c18nK21vZGVsKydcIiBpZD1cInRhYl9pbnB1dHNfJyttb2RlbCsnXCIgZGF0YS10b2dnbGU9XCJwaWxsXCI+J1xuICAgICAgICAgICAgICAgICttb2RlbC5zdWJzdHIoMCwxKS50b1VwcGVyQ2FzZSgpK21vZGVsLnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpKyc8L2E+PC9saT4nO1xuICAgIHZhciBhdHRyaWJ1dGVzID0gaW5wdXRzW21vZGVsXTtcblxuICAgIGNvbnRlbnQgKz0gJyA8ZGl2IGNsYXNzPVwicGlsbC1wYW5lXCIgaWQ9XCJpbnB1dHNfJyttb2RlbCsnXCI+JztcblxuICAgIHZhciByb3cxID0gXCJcIjtcbiAgICB2YXIgcm93MiA9IFwiPGRpdiBjbGFzcz0nY29sLWxnLTY+XCI7XG5cbiAgICBpZiggbW9kZWwgPT0gJ3dlYXRoZXInICkge1xuICAgICAgY29udGVudCArPSBfY3JlYXRlV2VhdGhlcklucHV0cygpO1xuICAgIH0gZWxzZSBpZiggbW9kZWwgPT0gJ3NldHVwJyApIHtcbiAgICAgIGNvbnRlbnQgKz0gU0VUVVBfVEVNUExBVEU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29udGVudCArPSB0cmVlSGVhZGVyO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgZ29vZ2xlIGRyaXZlIGJ0biBmcm9tIHRyZWVzXG4gICAgICAgIGlmKCBtb2RlbCA9PSd0cmVlJyApIHtcbiAgICAgICAgICBjb250ZW50ICs9IF9jcmVhdGVUcmVlSW5wdXQobW9kZWwsIGlucHV0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGVudCArPSBfZ2VuZXJhdGVJbnB1dHMoMCwgbW9kZWwsICcnLCBtb2RlbCwgaW5wdXRzW21vZGVsXSk7XG4gICAgICAgIH1cblxuICAgICAgY29udGVudCArPSAnPC9kaXY+JztcbiAgICB9XG5cblxuICAgIGNvbnRlbnQgKz0gJzwvZGl2Pic7XG4gIH1cbiAgY29udGVudCArPSAnPC9kaXY+JztcbiAgdGFiSGVhZGVyICs9IFwiPC91bD5cIjtcblxuICBlbGUuaHRtbCh0YWJIZWFkZXIrXCI8ZGl2IGNsYXNzPSdmb3JtLWhvcml6b250YWwnPlwiK2NvbnRlbnQrXCI8L2Rpdj5cIik7XG5cbiAgLy8gcnVuIHRoZSBtb2RlbCB3aGVuZXZlciBzb21lIGhpdHMgJ2VudGVyJ1xuICBlbGUuZmluZCgnaW5wdXQnKS5vbigna2V5dXAnLGZ1bmN0aW9uKGUpe1xuICAgIGlmKCBlLndoaWNoID09IDEzICkgYXBwLnJ1bk1vZGVsKCk7XG4gIH0pO1xuXG4gIC8vIGFkZCBjbGljayBoYW5kbGVyIGZvciBsb2FkaW5nIGEgdHJlZVxuICBlbGUuZmluZChcIiNnZHJpdmUtdHJlZXBhbmVsLWxvYWRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnZHJpdmUuc2hvd0xvYWRUcmVlUGFuZWwoKTtcbiAgfSk7XG4gIGVsZS5maW5kKFwiI2dkcml2ZS10cmVlcGFuZWwtc2F2ZVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGdkcml2ZS5zaG93U2F2ZVRyZWVQYW5lbCgpO1xuICB9KTtcblxuICAvLyBzZXQgdHJlZSBpbnB1dCBoYW5kbGVyc1xuICAkKFwiI2NvbXBhcmUtdHJlZXNcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBpZiggJCh0aGlzKS5pcygnOmNoZWNrZWQnKSApIHtcbiAgICAgICQoXCIjc2luZ2xlLXRyZWUtY29udGVudFwiKS5oaWRlKCk7XG4gICAgICAkKFwiI2NvbXBhcmUtdHJlZS1jb250ZW50XCIpLnNob3coKTtcbiAgICAgICQoXCIjdHJlZS1zdWItbWVudVwiKS5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjc2luZ2xlLXRyZWUtY29udGVudFwiKS5zaG93KCk7XG4gICAgICAkKFwiI2NvbXBhcmUtdHJlZS1jb250ZW50XCIpLmhpZGUoKTtcbiAgICAgICQoXCIjdHJlZS1zdWItbWVudVwiKS5zaG93KCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBzZXQgcGlsbCBjbGljayBoYW5kbGVyc1xuICAkKCcjaW5wdXRfdGFicyBhJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgJCh0aGlzKS50YWIoJ3Nob3cnKVxuICB9KTtcbiAgJCgnI3RhYl9pbnB1dHNfd2VhdGhlcicpLnRhYignc2hvdycpO1xuXG4gICQoJy5zZWxlY3Qtd2VhdGhlci1sb2NhdGlvbicpLm9uKCdjbGljaycsIF9zZWxlY3RXZWF0aGVyTG9jYXRpb24pO1xuXG5cbiAgJCgnI3dlYXRoZXJSZWFkZXItbW9kYWwnKS5tb2RhbCh7c2hvdzpmYWxzZX0pO1xuICAkKCcjbG9hZC13ZWF0aGVyLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCgnI3dlYXRoZXJSZWFkZXItbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuICB9KTtcblxuICAkKFwiI3dlYXRoZXItaW5wdXQtdG9nZ2xlIC5idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkKCcjd2VhdGhlci1pbnB1dC10b2dnbGUgLmJ0bi5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICBpZiggJCh0aGlzKS5odG1sKCkgPT0gJ0F2ZXJhZ2VzJyApIHtcbiAgICAgICQoJyNhdmVyYWdlLXdlYXRoZXItcGFuZWwnKS5zaG93KCk7XG4gICAgICAkKCcjY3VzdG9tLXdlYXRoZXItcGFuZWwnKS5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcC5zZXRXZWF0aGVyKCk7XG4gICAgICAkKCcjYXZlcmFnZS13ZWF0aGVyLXBhbmVsJykuaGlkZSgpO1xuICAgICAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuc2hvdygpO1xuICAgIH1cbiAgfSk7XG5cbiAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbigpe1xuICAgIGlmKCB3ZWF0aGVyQXZlcmFnZUNoYXJ0ICl7XG4gICAgICB3ZWF0aGVyQXZlcmFnZUNoYXJ0ID0gY2hhcnRzLmNyZWF0ZVdlYXRoZXJDaGFydCgkKCcjYXZlcmFnZS13ZWF0aGVyLWNoYXJ0JylbMF0sIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhKTtcbiAgICB9XG4gIH0pO1xuXG4gIF9zZXRXZWF0aGVyRGF0YSgpO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlVHJlZUlucHV0KG1vZGVsLCBpbnB1dHMpIHtcbiAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICBjb250ZW50ICs9IEdPT0xFRFJJVkVfVFJFRV9URU1QTEFURTtcblxuICBjb250ZW50ICs9ICc8ZGl2IGlkPVwic2luZ2xlLXRyZWUtY29udGVudFwiPic7XG4gIGNvbnRlbnQgKz0gX2dlbmVyYXRlSW5wdXRzKDAsIG1vZGVsLCAnJywgbW9kZWwsIGlucHV0c1ttb2RlbF0pO1xuICBjb250ZW50ICs9ICc8L2Rpdj4nO1xuXG4gIGNvbnRlbnQgKz0gJzxkaXYgaWQ9XCJjb21wYXJlLXRyZWUtY29udGVudFwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+JytcbiAgICAgICAgJzx1bCBjbGFzcz1cIm5hdiBuYXYtdGFic1wiPicrXG4gICAgICAgICAgJzxsaSBjbGFzcz1cImFjdGl2ZVwiPjxhIGhyZWY9XCIjdHJlZTFcIiBkYXRhLXRvZ2dsZT1cInRhYlwiPlRyZWUgMTwvYT48L2xpPicrXG4gICAgICAgICAgICAnPGxpPjxhIGhyZWY9XCIjdHJlZTJcIiBkYXRhLXRvZ2dsZT1cInRhYlwiPlRyZWUgMjwvYT48L2xpPicrXG4gICAgICAgICc8L3VsPicrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ0YWItcGFuZSBhY3RpdmVcIiBpZD1cInRyZWUxXCI+JytcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ3ZWxsXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW4tdG9wOjEwcHhcIj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+JytcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYWN0aXZlXCI+Q3VzdG9tPC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5TZWxlY3QgVHJlZTwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgX2dlbmVyYXRlSW5wdXRzKDAsIG1vZGVsLCAndDEnLCBtb2RlbCwgaW5wdXRzW21vZGVsXSkrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidGFiLXBhbmUgYWN0aXZlXCIgaWQ9XCJ0cmVlMlwiPicrXG4gICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwid2VsbFwiIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luLXRvcDoxMHB4XCIgPicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj4nK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBhY3RpdmVcIj5DdXN0b208L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPlNlbGVjdCBUcmVlPC9idXR0b24+JytcbiAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICBfZ2VuZXJhdGVJbnB1dHMoMCwgbW9kZWwsICd0MicsIG1vZGVsLCBpbnB1dHNbbW9kZWxdKStcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgJzwvZGl2Pic7XG5cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cblxucmV0dXJuIHtcbiAgY3JlYXRlIDogY3JlYXRlLFxuICB1cGRhdGVBdmVyYWdlQ2hhcnQ6IHVwZGF0ZUF2ZXJhZ2VDaGFydFxufTtcblxufTtcbiIsIi8vIFNwZWNpYWwgU2F1Y2UuLi5cbi8vIGJhc2ljYWxseSB0aGUgY29kZSBsb2FkZWQgZnJvbSBHaXRIdWIgZXhwZWN0cyB0aGUgZm9sbG93aW5nIHRvIGV4aXN0cyBpbiB0aGUgd2luZG93IHNjb3BlXG4vLyAgIG0zUEdJT1xuLy8gICAgIC0gcmVhZEFsbENvbnRhbnRzXG4vLyAgICAgLSByZWFkV2VhdGhlclxuLy8gICAgIC0gZHVtcFxuLy8gICAgIC0gcmVhZEZyb21JbnB1dHNcbi8vIFNvIHdlIGluamVjdCBmdW5jdGlvbnMgdGhhdCBpbnRlcmFjdCB3LyBvdXIgVUksIG1vZGVsIGluIG5vIHdheSBjYXJlc1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlYWQgOiBmdW5jdGlvbihtb2RlbCkge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgIGlmKCAhbW9kZWwucGxhbnRhdGlvbiApIG1vZGVsLnBsYW50YXRpb24gPSB7fTtcbiAgICB0aGlzLnJlYWRBbGxDb25zdGFudHMobW9kZWwucGxhbnRhdGlvbik7XG5cbiAgICBpZiggIW1vZGVsLndlYXRoZXIgKSBtb2RlbC53ZWF0aGVyID0ge307XG4gICAgaWYoICFtb2RlbC5wbGFudGluZ1BhcmFtcyApIG1vZGVsLnBsYW50aW5nUGFyYW1zID0ge307XG4gICAgaWYoICFtb2RlbC5jdXN0b21fd2VhdGhlciApIG1vZGVsLmN1c3RvbV93ZWF0aGVyID0ge307XG5cbiAgICB0aGlzLnJlYWRXZWF0aGVyKG1vZGVsLndlYXRoZXIsIG1vZGVsLnBsYW50aW5nUGFyYW1zLCBtb2RlbC5jdXN0b21fd2VhdGhlcik7XG4gIH0sXG4gIHJlYWRBbGxDb25zdGFudHMgOiBmdW5jdGlvbihwbGFudGF0aW9uKSB7XG4gICAgICB0aGlzLnJlYWRGcm9tSW5wdXRzKCk7XG5cbiAgICAgIC8vZm9yICggdmFyIGtleSBpbiB0aGlzLm1vZGVsLnBsYW50YXRpb24pIHtcbiAgICAgIC8vICAgIHBsYW50YXRpb25ba2V5XSA9IHRoaXMubW9kZWwucGxhbnRhdGlvbltrZXldO1xuICAgICAgLy99XG5cbiAgICAgIHBsYW50YXRpb24uY29wcGljZWRUcmVlID0gdGhpcy5tb2RlbC50cmVlO1xuXG4gICAgICAvLyBzZXR1cCBzZWVkbGluZyBUcmVlXG4gICAgICAvLyBUT0RPOiBoYXJkY29kZWQgZm9yIG5vdywgdGhpcyBzaG91bGRuJ3QgYmVcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMubW9kZWwudHJlZSk7XG4gICAgICBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZS5zdGVtc1BlclN0dW1wID0gMTtcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlLnBmcy5zdGVtQ250ID0gMTtcbiAgICAgIHBsYW50YXRpb24uc2VlZGxpbmdUcmVlLnJvb3RQID0ge1xuICAgICAgICAgIExBSVRhcmdldCA6IDEwLFxuICAgICAgICAgIGVmZmljaWVuY3kgOiAwLjYsXG4gICAgICAgICAgZnJhYyA6IDAuMDFcbiAgICAgIH07XG4gIH0sXG4gIHJlYWRXZWF0aGVyIDogZnVuY3Rpb24od2VhdGhlck1hcCwgcGxhbnRpbmdQYXJhbXMsIGN1c3RvbVdlYXRoZXJNYXApIHtcbiAgICAgIHZhciBkYXRlUGxhbnRlZCA9ICQoXCIjaW5wdXQtbWFuYWdlLURhdGVQbGFudGVkXCIpLnZhbCgpO1xuICAgICAgaWYgKGRhdGVQbGFudGVkICYmIGRhdGVQbGFudGVkICE9IFwiXCIpIHtcbiAgICAgICAgICBwbGFudGluZ1BhcmFtcy5kYXRlUGxhbnRlZCA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLURhdGVQbGFudGVkXCIpLnZhbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGxhbnRpbmdQYXJhbXMuZGF0ZVBsYW50ZWQgPSBuZXcgRGF0ZSgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGF0ZUNvcHBpY2VkID0gJChcIiNpbnB1dC1tYW5hZ2UtRGF0ZUNvcHBpY2VkXCIpLnZhbCgpO1xuICAgICAgaWYgKGRhdGVDb3BwaWNlZCAmJiBkYXRlQ29wcGljZWQgIT0gXCJcIikge1xuICAgICAgICAgIHBsYW50aW5nUGFyYW1zLmRhdGVDb3BwaWNlZCA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLURhdGVDb3BwaWNlZFwiKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgLy8gc2V0IGVycm9yIGNvbmRpdGlvbiA6IFRPRE9cbiAgICAgIH1cblxuICAgICAgdmFyIERhdGVGaW5hbEhhcnZlc3QgPSAkKFwiI2lucHV0LW1hbmFnZS1EYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpO1xuICAgICAgaWYgKERhdGVGaW5hbEhhcnZlc3QgJiYgRGF0ZUZpbmFsSGFydmVzdCAhPSBcIlwiKSB7XG4gICAgICAgICAgcGxhbnRpbmdQYXJhbXMuRGF0ZUZpbmFsSGFydmVzdCA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLURhdGVGaW5hbEhhcnZlc3RcIikudmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIC8vIHNldCBlcnJvciBjb25kaXRpb24gOiBUT0RPXG4gICAgICB9XG5cbiAgICAgIHZhciB5ZWFyc1BlckNvcHBpY2UgPSAkKFwiI2lucHV0LW1hbmFnZS1Db3BwaWNlSW50ZXJ2YWxcIikudmFsKCk7XG4gICAgICBpZiAoeWVhcnNQZXJDb3BwaWNlICYmIHllYXJzUGVyQ29wcGljZSAhPSBcIlwiKSB7XG4gICAgICAgICAgcGxhbnRpbmdQYXJhbXMueWVhcnNQZXJDb3BwaWNlID0gcGFyc2VJbnQoJChcIiNpbnB1dC1tYW5hZ2UtQ29wcGljZUludGVydmFsXCIpLnZhbCgpKTtcbiAgICAgIH1cblxuXG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgICAgICAgIG1vbnRoIDogKGkgKyAxKVxuICAgICAgICAgIH07XG4gICAgICAgICAgZm9yICggdmFyIGogPSAxOyBqIDwgdGhpcy5hcHAuaW5wdXRzLndlYXRoZXIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgdmFyIGMgPSB0aGlzLmFwcC5pbnB1dHMud2VhdGhlcltqXTtcbiAgICAgICAgICAgICAgaXRlbVtjXSA9IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC13ZWF0aGVyLVwiICsgYyArIFwiLVwiICsgaSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpdGVtLm5yZWwgPSBpdGVtLnJhZCAvIDAuMDAzNjtcblxuICAgICAgICAgIHdlYXRoZXJNYXBbaV0gPSBpdGVtO1xuICAgICAgfVxuXG4gICAgICBpZiggdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlciApIHtcbiAgICAgICAgICBmb3IoIHZhciBkYXRlIGluIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXIgKSB7XG4gICAgICAgICAgICAgIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0ubnJlbCA9IHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXJbZGF0ZV0ucmFkIC8gMC4wMDM2O1xuICAgICAgICAgICAgICAvL2N1c3RvbVdlYXRoZXJNYXBbZGF0ZV0gPSBjdXN0b21fd2VhdGhlcltkYXRlXTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gd2VhdGhlck1hcDtcbiAgfSxcbiAgZHVtcCA6IGZ1bmN0aW9uKHJvd3MsIHNoZWV0KSB7XG4gICAgICAvLyBzZXQgdGhlIHJhdyBvdXRwdXRcbiAgICAgIHRoaXMuYXBwLnJ1bkNvbXBsZXRlKHJvd3MpO1xuICB9LFxuXG4gIC8vIHJlYWQgYSB2YWx1ZSBmcm9tIHRoZSBpbnB1dFxuICAvLyBpdCBoYXMgYSAnLCcgaXMgc2V0IGZvciB2YXJpYXRpb25cbiAgX3JlYWRWYWwgOiBmdW5jdGlvbihlbGUpIHtcbiAgICAgIHZhciB2YWwgPSBlbGUudmFsKCk7XG4gICAgICBpZiggdmFsLm1hdGNoKC9cXGQqLVxcZCotXFxkKiQvKSApIHtcbiAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfSBlbHNlIGlmKCB2YWwubWF0Y2goLy4qLC4qLykgKSB7XG4gICAgICAgICAgdmFsID0gdmFsLnJlcGxhY2UoL1xccy9nLCcnKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgdmFyIGlkID0gZWxlLmF0dHIoXCJpZFwiKS5yZXBsYWNlKC9eaW5wdXQtLywnJykucmVwbGFjZSgvLS9nLCcuJyk7XG4gICAgICAgICAgdGhpcy5tb2RlbC52YXJpYXRpb25zW2lkXSA9IFtdO1xuICAgICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgICB0aGlzLm1vZGVsLnZhcmlhdGlvbnNbaWRdLnB1c2gocGFyc2VGbG9hdCh2YWxbaV0pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwudmFyaWF0aW9uc1tpZF1bMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWwpO1xuICB9LFxuXG4gIHJlYWRGcm9tSW5wdXRzIDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyByZWFkIHNvaWxcbiAgICAgIHRoaXMubW9kZWwuc29pbCA9IHt9O1xuICAgICAgdGhpcy5tb2RlbC5zb2lsLm1heEFXUyA9IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC1zb2lsLW1heGF3c1wiKSk7XG4gICAgICB0aGlzLm1vZGVsLnNvaWwuc3dwb3dlciA9IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC1zb2lsLXN3cG93ZXJcIikpO1xuICAgICAgdGhpcy5tb2RlbC5zb2lsLnN3Y29uc3QgPSB0aGlzLl9yZWFkVmFsKCQoXCIjaW5wdXQtc29pbC1zd2NvbnN0XCIpKTtcblxuICAgICAgLy8gcmVhZCBtYW5hZ2VcbiAgICAgIHRoaXMubW9kZWwubWFuYWdlID0ge1xuICAgICAgICAgIGNvcHBpY2UgOiBmYWxzZVxuICAgICAgfTtcbiAgICAgIHZhciBlbGVzID0gJChcIi5tYW5hZ2VcIik7XG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGVsZSA9ICQoZWxlc1tpXSk7XG4gICAgICAgICAgdGhpcy5tb2RlbC5tYW5hZ2VbZWxlLmF0dHIoXCJpZFwiKS5yZXBsYWNlKFwiaW5wdXQtbWFuYWdlLVwiLCBcIlwiKV0gPSB0aGlzLl9yZWFkVmFsKGVsZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlYWQgcGxhbnRhdGlvblxuICAgICAgaWYoICF0aGlzLm1vZGVsLnBsYW50YXRpb24gKSB0aGlzLm1vZGVsLnBsYW50YXRpb24gPSB7fTtcbiAgICAgIGVsZXMgPSAkKFwiLnBsYW50YXRpb25cIik7XG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGVsZSA9ICQoZWxlc1tpXSk7XG4gICAgICAgICAgdGhpcy5tb2RlbC5wbGFudGF0aW9uW2VsZS5hdHRyKFwiaWRcIikucmVwbGFjZShcImlucHV0LXBsYW50YXRpb24tXCIsIFwiXCIpXSA9IHRoaXMuX3JlYWRWYWwoZWxlKTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVhZCB0cmVlXG4gICAgICB2YXIgdHJlZUlucHV0cyA9ICQoXCIudHJlZVwiKTtcbiAgICAgIHRoaXMubW9kZWwudHJlZSA9IHt9O1xuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgdHJlZUlucHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBlbGUgPSAkKHRyZWVJbnB1dHNbaV0pO1xuXG4gICAgICAgICAgdmFyIHBhcnRzID0gZWxlLmF0dHIoXCJpZFwiKS5yZXBsYWNlKFwiaW5wdXQtdHJlZS1cIiwgXCJcIikuc3BsaXQoXCItXCIpO1xuICAgICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICB0aGlzLm1vZGVsLnRyZWVbcGFydHNbMF1dID0gdGhpcy5fcmVhZFZhbChlbGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICghdGhpcy5tb2RlbC50cmVlW3BhcnRzWzBdXSlcbiAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudHJlZVtwYXJ0c1swXV0gPSB7fTtcbiAgICAgICAgICAgICAgdGhpcy5tb2RlbC50cmVlW3BhcnRzWzBdXVtwYXJ0c1sxXV0gPSB0aGlzLl9yZWFkVmFsKGVsZSk7XG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyByZWFkIHBsYW50YXRpb24gc3RhdGVcbiAgICAgIGlmKCAhdGhpcy5tb2RlbC5wbGFudGF0aW9uX3N0YXRlICkgdGhpcy5tb2RlbC5wbGFudGF0aW9uX3N0YXRlID0ge307XG4gICAgICBmb3IgKCB2YXIga2V5IGluIHRoaXMubW9kZWwuZ2V0RGF0YU1vZGVsKCkucGxhbnRhdGlvbl9zdGF0ZS52YWx1ZSApIHtcbiAgICAgICAgICB0aGlzLm1vZGVsLnBsYW50YXRpb25fc3RhdGVba2V5XSA9IC0xO1xuICAgICAgfVxuXG4gIH0sXG4gIGV4cG9ydFNldHVwIDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLm1vZGVsLnZhcmlhdGlvbnMgPSB7fTtcbiAgICAgIHRoaXMucmVhZEZyb21JbnB1dHMoKTtcbiAgICAgIHRoaXMucmVhZFdlYXRoZXIoW10sIHt9LCB7fSk7XG5cbiAgICAgIHZhciBleCA9IHtcbiAgICAgICAgICB3ZWF0aGVyIDogdGhpcy5tb2RlbC53ZWF0aGVyLFxuICAgICAgICAgIGN1c3RvbV93ZWF0aGVyIDogdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlcixcbiAgICAgICAgICB0cmVlIDogdGhpcy5tb2RlbC50cmVlLFxuICAgICAgICAgIHBsYW50YXRpb24gOiB0aGlzLm1vZGVsLnBsYW50YXRpb24sXG4gICAgICAgICAgbWFuYWdlIDogdGhpcy5tb2RlbC5tYW5hZ2UsXG4gICAgICAgICAgc29pbCA6IHRoaXMubW9kZWwuc29pbCxcbiAgICAgICAgICBwbGFudGluZ1BhcmFtcyA6IHRoaXMubW9kZWwucGxhbnRpbmdQYXJhbXMsXG4gICAgICAgICAgcGxhbnRhdGlvbl9zdGF0ZSA6IHRoaXMubW9kZWwucGxhbnRhdGlvbl9zdGF0ZSxcbiAgICAgICAgICBjb25maWcgOiB7XG4gICAgICAgICAgICAgIGNoYXJ0VHlwZUlucHV0IDogJChcIiNjaGFydFR5cGVJbnB1dFwiKS52YWwoKSxcbiAgICAgICAgICAgICAgbW9udGhzVG9SdW4gOiB0aGlzLmFwcC5tb250aHNUb1J1bigpLFxuICAgICAgICAgICAgICBjdXJyZW50TG9jYXRpb24gOiAkKFwiI2N1cnJlbnQtbG9jYXRpb25cIikuaHRtbCgpLFxuICAgICAgICAgICAgICBsb2FkZWRUcmVlIDogJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwoKSxcbiAgICAgICAgICAgICAgdmVyc2lvbiA6IHRoaXMuYXBwLnFzKFwidmVyc2lvblwiKSA/IHRoaXMuYXBwLnFzKFwidmVyc2lvblwiKSA6IFwibWFzdGVyXCJcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGJ5IGRlZmF1bHQgdGhlIHJlYWQgZnVuY3Rpb24gc2V0IHRoZSB2YXJpYXRpb25zIHZhcmlhYmxlcyBidXQgb25seVxuICAgICAgLy8gcmV0dXJucyB0aGUgZmlyc3QsIHNldCB0aGUgdmFyaWF0aW9uIHBhcmFtcyB0byB0aGVpciBjb3JyZWN0IHZhbHVlc1xuICAgICAgZm9yKCB2YXIga2V5IGluIHRoaXMubW9kZWwudmFyaWF0aW9ucyApIHtcbiAgICAgICAgICB2YXIgcGFydHMgPSBrZXkuc3BsaXQoXCIuXCIpO1xuICAgICAgICAgIHZhciBwYXJhbSA9IGV4O1xuICAgICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoLTE7IGkrKyApIHtcbiAgICAgICAgICAgICAgcGFyYW0gPSBwYXJhbVtwYXJ0c1tpXV07XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhcmFtW3BhcnRzW3BhcnRzLmxlbmd0aC0xXV0gPSB0aGlzLm1vZGVsLnZhcmlhdGlvbnNba2V5XS5qb2luKFwiLCBcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBleDtcbiAgfSxcbiAgbG9hZFRyZWUgOiBmdW5jdGlvbih0cmVlKSB7XG4gICAgICBmb3IgKCB2YXIgcm9vdEtleSBpbiB0cmVlKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB0cmVlW3Jvb3RLZXldICE9ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICQoXCIjaW5wdXQtdHJlZS1cIiArIHJvb3RLZXkpLnZhbCh0cmVlW3Jvb3RLZXldKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmb3IgKCB2YXIgY2hpbGRLZXkgaW4gdHJlZVtyb290S2V5XSkge1xuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC10cmVlLVwiICsgcm9vdEtleSArIFwiLVwiICsgY2hpbGRLZXkpLnZhbCh0cmVlW3Jvb3RLZXldW2NoaWxkS2V5XSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gIH0sXG4gIGxvYWRTZXR1cCA6IGZ1bmN0aW9uKGZpbGVpZCwgc2V0dXAsIGlzUnQpIHtcblxuICAgICAgLy8gbG9hZCBjb25maWdcbiAgICAgIGlmIChzZXR1cC5jb25maWcuY2hhcnRUeXBlSW5wdXQpIHtcbiAgICAgICAgICBjaGFydHMudW5zZWxlY3RBbGwoKTtcbiAgICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBzZXR1cC5jb25maWcuY2hhcnRUeXBlSW5wdXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgY2hhcnRzLnNlbGVjdChzZXR1cC5jb25maWcuY2hhcnRUeXBlSW5wdXRbaV0pO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzZXR1cC5jb25maWcuY3VycmVudExvY2F0aW9uKSB7XG4gICAgICAgICAgJChcIiNjdXJyZW50LWxvY2F0aW9uXCIpLmh0bWwoc2V0dXAuY29uZmlnLmN1cnJlbnRMb2NhdGlvbik7XG4gICAgICB9XG4gICAgICBpZiggc2V0dXAuY29uZmlnLmxvYWRlZFRyZWUgKSB7XG4gICAgICAgICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwoc2V0dXAuY29uZmlnLmxvYWRlZFRyZWUpLnBhcmVudCgpLnNob3coKTtcbiAgICAgIH1cblxuICAgICAgLy8gbG9hZCB3ZWF0aGVyXG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBzZXR1cC53ZWF0aGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgZm9yICggdmFyIGtleSBpbiBzZXR1cC53ZWF0aGVyW2ldKSB7XG4gICAgICAgICAgICAgIGlmIChrZXkgPT0gJ21vbnRoJylcbiAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICBpZiAoc2V0dXAud2VhdGhlcltpXVtrZXldICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBrZXkgKyBcIi1cIiArIGkpLnZhbChzZXR1cC53ZWF0aGVyW2ldW2tleV0pXG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGtleSArIFwiLVwiICsgaSkudmFsKFwiXCIpO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYoIHNldHVwLmN1c3RvbV93ZWF0aGVyICkge1xuICAgICAgICAgIHRoaXMubW9kZWwuY3VzdG9tX3dlYXRoZXIgPSBzZXR1cC5jdXN0b21fd2VhdGhlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tb2RlbC5jdXN0b21fd2VhdGhlciA9IHt9O1xuICAgICAgfVxuXG4gICAgICAvLyBjcmVhdGUgdGhlIGNoYXJ0XG4gICAgICBpbnB1dEZvcm0udXBkYXRlQXZlcmFnZUNoYXJ0KCk7XG5cbiAgICAgIC8vIGxvYWQgdHJlZVxuICAgICAgdGhpcy5sb2FkVHJlZShzZXR1cC50cmVlKTtcblxuICAgICAgLy8gbG9hZCBwbGFudGluZyBwYXJhbXNcbiAgICAgIC8vIE5vdyBwYXJ0IG9mIG1hbmFnZS4uLi5cbiAgICAgIC8vIGZvXG4gICAgICBpZiAoc2V0dXAucGxhbnRpbmdQYXJhbXMpIHtcbiAgICAgICAgICB2YXIgbWFwID0ge1xuICAgICAgICAgICAgICBcImRhdGVQbGFudGVkXCIgOiBcIkRhdGVQbGFudGVkXCIsXG4gICAgICAgICAgICAgIFwiZGF0ZUNvcHBpY2VkXCIgOiBcIkRhdGVDb3BwaWNlZFwiLFxuICAgICAgICAgICAgICBcInllYXJzUGVyQ29wcGljZVwiIDogXCJDb3BwaWNlSW50ZXJ2YWxcIlxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvciAoIHZhciBrZXkgaW4gc2V0dXAucGxhbnRpbmdQYXJhbXMpIHtcbiAgICAgICAgICAgICAgdmFyIG5ld0tleSA9IGtleTtcbiAgICAgICAgICAgICAgaWYoIG1hcFtrZXldICkgbmV3S2V5ID0gbWFwW2tleV07XG5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZXR1cC5wbGFudGluZ1BhcmFtc1trZXldID09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC1tYW5hZ2UtXCIgKyBuZXdLZXkpLnZhbChzZXR1cC5wbGFudGluZ1BhcmFtc1trZXldLnJlcGxhY2UoL1QuKi8sICcnKSk7XG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtbWFuYWdlLVwiICsgbmV3S2V5KS52YWwoc2V0dXAucGxhbnRpbmdQYXJhbXNba2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB0aGlzIHZhbHVlIGlzIGRlcHJlY2F0ZWQsIHNldCB0byBuZXcgaW5wdXRcbiAgICAgIGlmKCBzZXR1cC5jb25maWcubW9udGhzVG9SdW4gKSB7XG4gICAgICAgICAgdmFyIGQgPSBuZXcgRGF0ZShzZXR1cC5wbGFudGluZ1BhcmFtcy5kYXRlUGxhbnRlZCk7XG4gICAgICAgICAgZCA9IG5ldyBEYXRlKG5ldyBEYXRlKGQpLnNldE1vbnRoKGQuZ2V0TW9udGgoKStwYXJzZUludChzZXR1cC5jb25maWcubW9udGhzVG9SdW4pKSk7XG4gICAgICAgICAgJChcIiNpbnB1dC1tYW5hZ2UtRGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoZC50b0lTT1N0cmluZygpLnJlcGxhY2UoL1QuKi8sICcnKSk7XG4gICAgICB9XG5cblxuICAgICAgLy8gbG9hZCByZXN0XG4gICAgICB2YXIgaW5wdXRzID0gWyBcInBsYW50YXRpb25cIiwgXCJzb2lsXCIsIFwibWFuYWdlXCIgXTtcbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGZvciAoIHZhciBrZXkgaW4gc2V0dXBbaW5wdXRzW2ldXSkge1xuICAgICAgICAgICAgICBpZiAoa2V5ID09ICdtYXhBV1MnKSB7XG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXNvaWwtbWF4YXdzXCIpLnZhbChzZXR1cC5zb2lsLm1heEFXUyk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBzZXR1cFtpbnB1dHNbaV1dW2tleV0gPT0gJ3N0cmluZycgJiYgc2V0dXBbaW5wdXRzW2ldXVtrZXldLm1hdGNoKC8uKlQuKlokLykgKSB7XG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LVwiICsgaW5wdXRzW2ldICsgXCItXCIgKyBrZXkpLnZhbChzZXR1cFtpbnB1dHNbaV1dW2tleV0ucmVwbGFjZSgvVC4qLywgJycpKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtXCIgKyBpbnB1dHNbaV0gKyBcIi1cIiArIGtleSkudmFsKHNldHVwW2lucHV0c1tpXV1ba2V5XSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLm1vZGVsLnJ1bk1vZGVsKGlzUnQpO1xuICB9XG59O1xuIiwiXG4gIC8vIG11c3QgaW5zdGFsbCB0aGlzIGZvciBuYXRpdmUgcGhvbmVnYXAgc3VwcG9ydDpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Bob25lZ2FwLWJ1aWxkL0NoaWxkQnJvd3NlclxuXG52YXIgd2luID0gbnVsbDtcblxuLyogdGhlIGtleSBmb3IgcmVmcmVzaCBUb2tlbiBpbiBsb2NhbCBTdG9yYWdlICovXG52YXIgdG9rZW5LZXkgPSAncmVmcmVzaF90b2tlbic7XG5cbi8qIHN0b3JlcyB0aGUgYWNjZXNzVG9rZW4gYWZ0ZXIgcmV0cmlldmFsIGZyb20gZ29vZ2xlIHNlcnZlciAqL1xudmFyIGFjY2Vzc1Rva2VuID0gbnVsbDtcblxuLyogc3RvcmVzIHRoZSBUaW1lIHdoZW4gYWNjZXNzIHRva2VuIHdhcyBsYXN0IHJlY2VpdmVkIGZyb20gc2VydmVyICovXG52YXIgYWNjZXNzVG9rZW5UaW1lID0gbnVsbDtcblxuLyogc3RvcmVzIGFjY2VzcyBUb2tlbidzIEV4cGlyeSBMaW1pdC4gVXNlcyA1OCBtaW4uIGluc3RlYWQgb2YgNjAgbWluLiAqL1xudmFyIGFjY2Vzc1Rva2VuRXhwaXJ5TGltaXQgPSA1OCAqIDYwICogMTAwMDtcblxuLyogQSB0ZW1wb3JhcnkgdmFyaWFibGUgc3RvcmluZyBjYWxsYmFjayBmdW5jdGlvbiAqL1xudmFyIGNhbGxiYWNrRnVuYyA9IGZhbHNlO1xuXG4vLyBhcmUgd2UgcnVubmluZyBuYXRpdmUgb3IgYnJvd3NlciBtb2RlP1xudmFyIGlzTmF0aXZlID0gd2luZG93LmxvY2F0aW9uLmhyZWYubWF0Y2goL15maWxlLiovKSA/IHRydWUgOiBmYWxzZTtcblxudmFyIENMSUVOVF9JRCA9IGlzTmF0aXZlID9cbiAgICAgICAgXCIzNDQxOTA3MTM0NjUtZGlpbXRmZXJoNHRqYjAzMTY5YmtsOW1rb3F2cTJydTkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb21cIiA6XG4gICAgICAgICBcIjM0NDE5MDcxMzQ2NS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwiO1xuXG52YXIgQVBQX0lEID0gXCIzNDQxOTA3MTM0NjVcIjtcblxudmFyIE9BVVRIX1NDT1BFUyA9ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlLmZpbGUgJ1xuICArICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlLmluc3RhbGwgJ1xuICArICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLnByb2ZpbGUnO1xuXG4vKiBjb25maWcgdmFsdWVzIGZvciBHb29nbGUgQVBJIChnYXBpKSAqL1xudmFyIGdhcGlDb25maWcgPSB7XG4gIGVuZHBvaW50OiBcImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoXCIsXG4gIGVuZHRva2VuOiBcImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi90b2tlblwiLCAvLyB0b2tlbiBlbmRwb2ludFxuICByZWRpcmVjdF91cmkgOiBcImh0dHA6Ly9sb2NhbGhvc3RcIixcbiAgY2xpZW50X3NlY3JldCA6ICc2ck9ROWwwZnluaDEzN01SWEdLLUdfWmcnLFxuICByZXNwb25zZV90eXBlIDogXCJjb2RlXCIsXG4gIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgc3RhdGUgOiBcImdkcml2ZWluaXRcIixcbiAgYWNjZXNzX3R5cGUgOiBcIm9mZmxpbmVcIixcbiAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG5cbiAgLyogQXMgZGVmaW5lZCBpbiB0aGUgT0F1dGggMi4wIHNwZWNpZmljYXRpb24sIHRoaXMgZmllbGQgbXVzdCBjb250YWluIGEgdmFsdWVcbiAgICAgKiBvZiBcImF1dGhvcml6YXRpb25fY29kZVwiIG9yIFwicmVmcmVzaF90b2tlblwiICovXG4gICAgZ3JhbnRUeXBlczogeyBBVVRIT1JJWkU6IFwiYXV0aG9yaXphdGlvbl9jb2RlXCIsIFJFRlJFU0g6IFwicmVmcmVzaF90b2tlblwiIH0sXG4gfTtcblxuLyoqXG4gKiBFbnVtIGZvciBTdGF0dXMgdmFsdWVzXG4gKlxuICogQGVudW0ge251bWJlcn1cbiAqXG4gKiBTVUNDRVNTIC0gU3VjY2Vzc2Z1bGx5IGRhdGEgcmVjZWl2ZWQgZnJvbSBzZXJ2ZXJcbiAqIEVSUk9SIC0gRXJyb3Igb2NjdXJyZWQgd2hlbiB0cnlpbmcgdG8gcmVjZWl2ZSBmcm9tIHNlcnZlclxuICogTk9UX0RFVEVSTUlORUQgLSB1bmRldGVybWluZWRcbiAqL1xudmFyIHN0YXR1cyA9IHtcbiAgICAgICAgU1VDRVNTOiAxLFxuICAgICAgICBFUlJPUjogLTEsXG4gICAgICAgIE5PVF9ERVRFUk1JTkVEOiAwXG59XG5cbnJlcXVlc3RTdGF0dXMgPSAwO1xuXG4vKiBzdG9yZXMgdGhlIGF1dGhvcml6YXRpb24gQ29kZSBpbnRlcm5hbGx5ICovXG5hdXRoQ29kZSA9IGZhbHNlO1xuXG4vKiBzdG9yZXMgdGhlIGVycm9yIG1lc3NhZ2Ugd2hlbiBhbiBlcnJvciBoYXBwZW5zIGZyb20gZ29vZ2xlIHNlcnZlciAqL1xuZXJyb3JNZXNzYWdlID0gZmFsc2U7XG5cbnZhciBsb2cgPSBmdW5jdGlvbihtc2cpIHtcbiAgY29uc29sZS5sb2coXCIqKipPQVVUSCoqKjogXCIrbXNnKTtcbn1cblxuLyoqXG4gKiBBdHRlbXB0cyB0byBhdXRob3JpemUgdXNlciB1c2luZyBPQXV0aFxuICogT3BlbnMgdXAgQW5vdGhlciB3aW5kb3cgd2hlcmUgdXNlciBhbGxvd3MgYWNjZXNzIG9yIGRlbmllcyBpdC5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsQmFjayAgIEEgY2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgaW52b2tlZFxuICovXG52YXIgYXV0aG9yaXplID0gZnVuY3Rpb24oY2FsbEJhY2spIHtcbiAgbG9nKFwiYXR0ZW1wdGluZyB0byBhdXRob3JpemVcIik7XG5cbiAgICB2YXIgYXV0aFVyaSA9IGdhcGlDb25maWcuZW5kcG9pbnQgKyAnPydcbiAgICArICdzY29wZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcuc2NvcGUpXG4gICAgKyAnJicgKyAncmVkaXJlY3RfdXJpPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5yZWRpcmVjdF91cmkpXG4gICAgKyAnJicgKyAncmVzcG9uc2VfdHlwZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcucmVzcG9uc2VfdHlwZSlcbiAgICArICcmJyArICdjbGllbnRfaWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLmNsaWVudF9pZCk7XG4gICAgLy8rICcmJyArICdzdGF0ZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcuc3RhdGUpXG4gICAgLy8rICcmJyArICdhY2Nlc3NfdHlwZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcuYWNjZXNzX3R5cGUpXG4gICAgLy8rICcmJyArICdhcHByb3ZhbF9wcm9tcHQ9Zm9yY2UnOyAvLyBAVE9ETyAtIGNoZWNrIGlmIHdlIHJlYWxseSBuZWVkIHRoaXMgcGFyYW1cblxuICAgIGNhbGxiYWNrRnVuYyA9IGNhbGxCYWNrO1xuICAgIHJlcXVlc3RTdGF0dXMgPSBzdGF0dXMuTk9UX0RFVEVSTUlORUQ7XG5cblxuXG5cbiAgICBsb2coXCJvcGVuaW5nIEluQXBwQnJvd3NlclwiKTtcblxuICAgIHRyeSB7XG5cbiAgICAgIC8vIE5vdyBvcGVuIG5ldyBicm93c2VyXG4gICAgICB3aW4gPSB3aW5kb3cub3BlbihhdXRoVXJpLCAnX2JsYW5rJywgJ2xvY2F0aW9uPW5vLHRvb2xiYXI9bm8nKTtcblxuICAgICAgJCh3aW4pLm9uKCdsb2Fkc3RhcnQnLGZ1bmN0aW9uKGUpe1xuICAgICAgICBsb2coXCJJbkFwcEJyb3dzZXIgbG9hZHN0YXJ0XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhlLm9yaWdpbmFsRXZlbnQudXJsKTtcbiAgICAgICAgb25BdXRoVXJsQ2hhbmdlKGUub3JpZ2luYWxFdmVudC51cmwpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vd2luZG93LnBsdWdpbnMuY2hpbGRCcm93c2VyLnNob3dXZWJQYWdlKGF1dGhVcmksIHtzaG93TG9jYXRpb25CYXIgOiB0cnVlfSk7XG4gICAgICAvL3dpbmRvdy5wbHVnaW5zLmNoaWxkQnJvd3Nlci5vbkNsb3NlID0gb25BdXRoQ2xvc2U7XG4gICAgICAvL3dpbmRvdy5wbHVnaW5zLmNoaWxkQnJvd3Nlci5vbkxvY2F0aW9uQ2hhbmdlID0gb25BdXRoVXJsQ2hhbmdlO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgbG9nKFwiRXJyb3Igb3BlbmluZyBJbkFwcEJyb3dzZXJcIik7XG4gICAgICBsb2coZSk7XG4gICAgfVxuXG59O1xuXG5pZiggIWlzTmF0aXZlICkge1xuICBhdXRob3JpemUgPSBmdW5jdGlvbihjYWxsYmFjaywgaW1tZWRpYXRlKSB7XG4gIGdhcGkuYXV0aC5hdXRob3JpemUoe1xuICAgIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcbiAgICBpbW1lZGlhdGUgOiBpbW1lZGlhdGVcbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgYXV0aENvZGUgPSBnYXBpLmF1dGguZ2V0VG9rZW4oKTtcbiAgICBjYWxsYmFjayhhdXRoQ29kZSk7XG4gIH0pO1xuXG4gIH1cbn1cblxuLyogQXV0aCBXaW5kb3cgY2xvc2VkICovXG52YXIgb25BdXRoQ2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkF1dGggd2luZG93IGNsb3NlZFwiKTtcbn07XG5cbi8qIE9BdXRoIFN1Y2Nlc3NmdWxseSBkb25lICovXG52YXIgb25BdXRoU3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdBdXRoIFN1Y2Nlc3M/Jyk7XG59O1xuXG4vKipcbiAqIEdldHMgSW52b2tlZCB3aGVuIHRoZSBVUkwgY2hhbmdlcyBvbiBPQXV0aCBhdXRob3JpemF0aW9uIHByb2Nlc3NcbiAqXG4gKiBTdWNjZXNzIFVSTCBQYXR0ZXJuOlxuICogXCJyZWRpcmVjdF91cmlcIiArIFwiP2NvZGU9XCIgW3NlY3JldCBjb2RlIHZhbF1cbiAqXG4gKiBTdWNjZXNzIFNhbXBsZSBVUkw6XG4gKiBodHRwOi8vbG9jYWxob3N0Lz9jb2RlPTQvV09wUkxRZnZ2aEhFMHR1TVVERHFubjc2bENUVC44blhDNEllYk1FQVV1SkpWbkw0OUNjOEFRR3I4Y1FJXG4gKlxuICogRGVuaWVkIEFjY2VzcyBVUkwgUGF0dGVybjogXCJyZWRpcmVjdF91cmlcIiArID9lcnJvcj1hY2Nlc3NfZGVuaWVkXG4gKiBEZW5pZWQgQWNjZXNzIFNhbXBsZTogaHR0cDovL2xvY2FsaG9zdC8/ZXJyb3I9YWNjZXNzX2RlbmllZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmlMb2NhdGlvbiBUaGUgVVJJIExvY2F0aW9uXG4gKi9cbnZhciBvbkF1dGhVcmxDaGFuZ2UgPSBmdW5jdGlvbih1cmlMb2NhdGlvbikge1xuICAgIGNvbnNvbGUubG9nKFwiSW5BcHBCcm93c2VyIHVybCBjaGFuZ2VkIFwiK3VyaUxvY2F0aW9uKTtcbiAgICBpZih1cmlMb2NhdGlvbi5pbmRleE9mKFwiY29kZT1cIikgIT0gLTEpIHtcbiAgICAgICAgcmVxdWVzdFN0YXR1cyA9IHN0YXR1cy5TVUNDRVNTO1xuXG4gICAgICAgIC8qIFN0b3JlIHRoZSBhdXRoQ29kZSB0ZW1wb3JhcmlseSAqL1xuICAgICAgICBhdXRoQ29kZSA9IGdldFBhcmFtZXRlckJ5TmFtZShcImNvZGVcIiwgdXJpTG9jYXRpb24pO1xuICAgICAgICBsb2coXCJGb3VuZCBhdXRoIGNvZGU6IFwiK2F1dGhDb2RlKTtcblxuICAgICAgICBnZXRSZWZyZXNoVG9rZW4oY2FsbGJhY2tGdW5jKTtcblxuICAgICAgICAvLyBjbG9zZSB0aGUgY2hpbGRCcm93c2VyXG4gICAgICAgIHdpbi5jbG9zZSgpO1xuICAgIH0gZWxzZSBpZih1cmlMb2NhdGlvbi5pbmRleE9mKFwiZXJyb3I9XCIpICE9IC0xKSAge1xuICAgICAgICByZXF1ZXN0U3RhdHVzID0gc3RhdHVzLkVSUk9SO1xuICAgICAgICBlcnJvck1lc3NhZ2UgPSBnZXRQYXJhbWV0ZXJCeU5hbWUoXCJlcnJvclwiLCB1cmlMb2NhdGlvbik7XG4gICAgICAgIGNhbGxiYWNrRnVuYygpO1xuICAgICAgICB3aW4uY2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXF1ZXN0U3RhdHVzID0gc3RhdHVzLk5PVF9ERVRFUk1JTkVEO1xuICAgICAgICAvL2NhbGxiYWNrRnVuYygpO1xuICAgIH1cbn07XG5cblxuLyoqXG4qIEdldHMgdGhlIFJlZnJlc2ggZnJvbSBBY2Nlc3MgVG9rZW4uIFRoaXMgbWV0aG9kIGlzIG9ubHkgY2FsbGVkIGludGVybmFsbHksXG4qIGFuZCBvbmNlLCBvbmx5IGFmdGVyIHdoZW4gYXV0aG9yaXphdGlvbiBvZiBBcHBsaWNhdGlvbiBoYXBwZW5zLlxuKlxuKiBAcGFyYW0gcGFyYW1PYmogQW4gT2JqZWN0IGNvbnRhaW5pbmcgYXV0aG9yaXphdGlvbiBjb2RlXG4qIEBwYXJhbSBwYXJhbU9iai5hdXRoX2NvZGUgVGhlIEF1dGhvcml6YXRpb24gQ29kZSBmb3IgZ2V0dGluZyBSZWZyZXNoIFRva2VuXG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGNhbGxiYWNrIGZ1bmN0aW9uIHdoaWNoIGlzIHRvIGJlIGludm9rZWQgYWZ0ZXJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc2Z1bCByZXRyaWV2YWwgb2YgZGF0YSBmcm9tIGdvb2dsZSdzIHNlcnZlclxuKlxuKi9cbnZhciBnZXRSZWZyZXNoVG9rZW4gPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICBjb25zb2xlLmxvZyhcImFjY2VzcyByZWZyZXNoIHRva2VuXCIpO1xuICAgJC5hamF4KHtcbiAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICB1cmw6IGdhcGlDb25maWcuZW5kdG9rZW4sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgIGNsaWVudF9pZCAgICA6IGdhcGlDb25maWcuY2xpZW50X2lkLFxuICAgICAgICAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IGdhcGlDb25maWcuY2xpZW50X3NlY3JldCxcbiAgICAgICAgICAgICAgICAgICBjb2RlICAgICAgICAgOiBhdXRoQ29kZSxcbiAgICAgICAgICAgICAgICAgICByZWRpcmVjdF91cmkgOiBnYXBpQ29uZmlnLnJlZGlyZWN0X3VyaSxcbiAgICAgICAgICAgICAgICAgICBncmFudF90eXBlICAgOiBnYXBpQ29uZmlnLmdyYW50VHlwZXMuQVVUSE9SSVpFXG4gICAgICAgICAgIH1cbiAgICB9KVxuICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzIGdldHRpbmcgcmVmcmVzaCB0b2tlblwiKTtcblxuICAgICAgICAvKiB1cG9uIHN1Y2VzcywgZG8gYSBjYWxsYmFjayB3aXRoIHRoZSBkYXRhIHJlY2VpdmVkICovXG4gICAgICAgIC8vIHRlbXBvcmFyeSBzdG9yaW5nIGFjY2VzcyB0b2tlblxuICAgICAgICBhY2Nlc3NUb2tlbiAgICAgPSBkYXRhLmFjY2Vzc190b2tlbjtcbiAgICAgICAgYWNjZXNzVG9rZW5UaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuICAgICAgICAvLyBzZXQgdGhlIHRva2VuIGZvciB0aGUganMgYXBpXG4gICAgICAgIGdhcGkuYXV0aC5zZXRUb2tlbihkYXRhKTtcblxuICAgICAgICAvKiBzZXQgdGhlIGVycm9yIG9mIGRhdGEgdG8gZmFsc2UsIGFzIGl0IHdhcyBzdWNjZXNzZnVsICovXG4gICAgICAgIGRhdGEuZXJyb3IgPSBmYWxzZTtcblxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0odG9rZW5LZXksIGRhdGEucmVmcmVzaF90b2tlbik7XG5cbiAgICAgICAgLyogbm93IGludm9rZSB0aGUgY2FsbGJhY2sgKi9cbiAgICAgICAgY2FsbGJhY2soe2FjY2Vzc190b2tlbjogYWNjZXNzVG9rZW59KTtcbiAgICB9KVxuICAgIC5mYWlsKGZ1bmN0aW9uKHhociwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgfSk7XG4gICAgfSlcbiAgICAuYWx3YXlzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlRva2VuIHJlcXVlc3QgY29tcGxldGVcIik7XG4gICAgfSk7XG59O1xuXG5pZiggIWlzTmF0aXZlICkge1xuICBnZXRSZWZyZXNoVG9rZW4gPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICBnYXBpLmF1dGguYXV0aG9yaXplKHtcbiAgICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gICAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG4gICAgaW1tZWRpYXRlIDogdHJ1ZVxuICB9LCBmdW5jdGlvbigpIHtcbiAgICB0b2tlbiA9IGdhcGkuYXV0aC5nZXRUb2tlbigpO1xuICAgIGlmKCBjYWxsYmFjayApIGNhbGxiYWNrKHRva2VuKTtcbiAgfSk7XG4gIH1cbn1cblxuXG4vKipcbiogVGhpcyBtZXRob2Qgc2hvdWxkIE9OTFkgYmUgY2FsbGVkIGxvY2FsbHkgZnJvbSB3aXRoaW4gdGhpcyBjbGFzcy5cbiogUmV0dXJucyB0aGUgUmVmcmVzaCBUb2tlbiBmcm9tIHRoZSBsb2NhbCBkYXRhYmFzZS5cbipcbiogQHJldHVybiB7U3RyaW5nfSBUaGUgcmVmcmVzaCBUb2tlblxuKlxuKi9cbnZhciBnZXRUb2tlbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odG9rZW5LZXkpO1xufTtcblxuXG4vKipcbiogVGhpcyBtZXRob2QgaXMgaW52b2tlZCBleHRlcm5hbGx5LiBJdCByZXRyaWV2ZXMgdGhlIEFjY2VzcyBUb2tlbiBieSBhdCBmaXJzdFxuKiBjaGVja2luZyBpZiBjdXJyZW50IGFjY2VzcyB0b2tlbiBoYXMgZXhwaXJlZCBvciBub3QuIElmIGl0cyBub3QgZXhwaXJlZCwgaXRcbiogc2ltcGx5IHJldHVybnMgdGhhdCwgb3RoZXJ3aXNlLCBpdCBnZXRzIHRoZSByZWZyZXNoIFRva2VuIGZyb20gdGhlIGxvY2FsIGRhdGFiYXNlXG4qIChieSBpbnZva2luZyBnZXRUb2tlbikgYW5kIHRoZW4gY29ubmVjdGluZyB3aXRoIEdvb2dsZSdzIFNlcnZlciAodXNpbmcgT0F1dGgpXG4qIHRvIGdldCB0aGUgQWNjZXNzIFRva2VuLlxuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAgIEEgY2FsbEJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgdG8gYmUgaW52b2tlZCBhZnRlclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSBpcyByZXRyaWV2ZWQgZnJvbSB0aGUgZ29vZ2xlJ3Mgc2VydmVyLiBUaGUgZGF0YVxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBnb29nbGUgc2VydmVyIGlzIHBhc3NlZCB0byBjYWxsYmFjayBhcyBhcmdzLlxuKlxuKi9cbnZhciBnZXRBY2Nlc3NUb2tlbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICB2YXIgY3VycmVudFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4gICBjb25zb2xlLmxvZyhcImdldHRpbmcgYWNjZXNzIHRva2VuXCIpO1xuXG4gICAvKiBjaGVjayBpZiBjdXJyZW50IFRva2VuIGhhcyBub3QgZXhwaXJlZCAoc3RpbGwgdmFsaWQpICovXG4gICBpZiAoYWNjZXNzVG9rZW4gJiYgYWNjZXNzVG9rZW4gIT0gZmFsc2UgJiZcbiAgICAgICAgICAgY3VycmVudFRpbWUgPCAoYWNjZXNzVG9rZW5UaW1lICsgYWNjZXNzVG9rZW5FeHBpcnlMaW1pdCkpIHtcbiAgICAgICAgICAgY2FsbGJhY2soeyBhY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VuIH0pO1xuXG4gICAgICAgICAgIHJldHVybjtcbiAgIH1cblxuICAgY29uc29sZS5sb2coXCJBQ0NFU1MgVE9LRU4gUEFSQU1TOiBcIithY2Nlc3NUb2tlbitcIiBcIithY2Nlc3NUb2tlblRpbWUrXCIgXCIrYWNjZXNzVG9rZW5FeHBpcnlMaW1pdCk7XG5cbiAgIC8qIGVsc2UsIGdldCB0aGUgcmVmcmVzaFRva2VuIGZyb20gbG9jYWwgc3RvcmFnZSBhbmQgZ2V0IGEgbmV3IGFjY2VzcyBUb2tlbiAqL1xuICAgdmFyIHJlZnJlc2hUb2tlbiA9IGdldFRva2VuKCk7XG5cbiAgIC8vICAgY29uc29sZS5sb2coXCJSZWZyZXNoIFRva2VuID4+IFwiICsgcmVmcmVzaFRva2VuKTtcbiAgICQuYWpheCh7XG4gICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgdXJsOiBnYXBpQ29uZmlnLmVuZHRva2VuLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgIGNsaWVudF9pZCAgICA6IGdhcGlDb25maWcuY2xpZW50X2lkLFxuICAgICAgICAgICAgICAgICAgY2xpZW50X3NlY3JldDogZ2FwaUNvbmZpZy5jbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuLFxuICAgICAgICAgICAgICAgICAgZ3JhbnRfdHlwZSAgIDogZ2FwaUNvbmZpZy5ncmFudFR5cGVzLlJFRlJFU0gsXG4gICAgICAgICAgfVxuICAgIH0pXG4gICAgLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgLyogdXBvbiBzdWNlc3MsIGRvIGEgY2FsbGJhY2sgd2l0aCB0aGUgZGF0YSByZWNlaXZlZCAqL1xuICAgICAgICAgICAgLy8gdGVtcG9yYXJ5IHN0b3JpbmcgYWNjZXNzIHRva2VuXG4gICAgICAgICAgICBhY2Nlc3NUb2tlbiA9IGRhdGEuYWNjZXNzX3Rva2VuO1xuICAgICAgICAgICAgYWNjZXNzVG9rZW5UaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuICAgICAgICAgICAgLy8gc2V0IHRoZSB0b2tlbiBmb3IgdGhlIGpzIGFwaVxuICAgICAgICAgICAgZ2FwaS5hdXRoLnNldFRva2VuKGRhdGEpO1xuXG4gICAgICAgICAgICAvKiBzZXQgdGhlIGVycm9yIHRvIGZhbHNlICovXG4gICAgICAgICAgICBkYXRhLmVycm9yID0gZmFsc2U7XG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgICAgfSlcbiAgICAuZmFpbChmdW5jdGlvbih4aHIsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVG9rZW4gcmVxdWVzdCBlcnJvciA/PyA+PlwiICsgeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICB9KTtcbiAgICB9KVxuICAgIC5hbHdheXMoZnVuY3Rpb24oKSB7IC8vY29uc29sZS5sb2coXCJUb2tlbiByZXF1ZXN0IGNvbXBsZXRlXCIpO1xuICAgIH0pO1xufTtcblxuaWYoICFpc05hdGl2ZSApIHtcbiAgZ2V0QWNjZXNzVG9rZW4gPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICB2YXIgY3VycmVudFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4gICAgIGlmIChhY2Nlc3NUb2tlbiAmJlxuICAgICAgICAgICAgIGN1cnJlbnRUaW1lIDwgKGFjY2Vzc1Rva2VuVGltZSArIGFjY2Vzc1Rva2VuRXhwaXJ5TGltaXQpKSB7XG4gICAgICAgICAgICAgY2FsbGJhY2soYWNjZXNzVG9rZW4pO1xuXG4gICAgICAgICAgICAgcmV0dXJuO1xuICAgICB9XG5cbiAgICBnYXBpLmF1dGguYXV0aG9yaXplKHtcbiAgICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gICAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG4gICAgaW1tZWRpYXRlIDogdHJ1ZVxuICB9LCBmdW5jdGlvbigpIHtcbiAgICB0b2tlbiA9IGdhcGkuYXV0aC5nZXRUb2tlbigpO1xuICAgIGFjY2Vzc1Rva2VuID0gdG9rZW47XG4gICAgYWNjZXNzVG9rZW5UaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgICBpZiggY2FsbGJhY2sgKSBjYWxsYmFjayh0b2tlbik7XG4gIH0pO1xuICB9XG59XG5cblxuXG4vKipcbiogU2F2ZXMgdGhlIFJlZnJlc2ggVG9rZW4gaW4gYSBsb2NhbCBkYXRhYmFzZSBvciBsb2NhbFN0b3JhZ2VcbiogVGhpcyBtZXRob2Qgc2hhbGwgYmUgaW52b2tlZCBmcm9tIGV4dGVybmFsbHkgb25seSA8Yj5vbmNlPC9iPiBhZnRlciBhblxuKiBhdXRob3JpemF0aW9uIGNvZGUgaXMgcmVjZWl2ZWQgZnJvbSBnb29nbGUncyBzZXJ2ZXIuIFRoaXMgbWV0aG9kXG4qIGNhbGxzIHRoZSBvdGhlciBtZXRob2QgKGdldFJlZnJlc2hUb2tlbikgdG8gZ2V0IHRoZSByZWZyZXNoIFRva2VuIGFuZFxuKiB0aGVuIHNhdmVzIGl0IGxvY2FsbHkgb24gZGF0YWJhc2UgYW5kIGludm9rZXMgYSBjYWxsYmFjayBmdW5jdGlvblxuKlxuKiBAcGFyYW0gdG9rZW5PYmogQSBPYmplY3QgY29udGFpbmluZyBhdXRob3JpemF0aW9uIGNvZGVcbiogQHBhcmFtIHtTdHJpbmd9IHRva2VuT2JqLmF1dGhfY29kZSBUaGUgYXV0aG9yaXphdGlvbiBjb2RlIGZyb20gZ29vZ2xlJ3Mgc2VydmVyXG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0byBiZSBpbnZva2VkIHdpdGggcGFyYW1ldGVyc1xuKi9cbnZhciBzYXZlUmVmcmVzaFRva2VuID0gZnVuY3Rpb24odG9rZW5PYmosIGNhbGxiYWNrKSB7XG4gICAgIGdldFJlZnJlc2hUb2tlbih0b2tlbk9iaiwgZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICAgICAgLyogaWYgdGhlcmUncyBubyBlcnJvciAqL1xuICAgICAgICAgICAgIGlmICghZGF0YS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBAVE9ETzogbWFrZSBhbm90aGVyIG1ldGhvZCBzYXZlVG9rZW4gdG8gYWJzdHJhY3QgdGhlIHN0b3Jpbmcgb2YgdG9rZW5cbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0odG9rZW5LZXksIGRhdGEucmVmcmVzaF90b2tlbik7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICB9KTtcbn07XG5cblxuXG4vKipcbiogQ2hlY2tzIGlmIHVzZXIgaGFzIGF1dGhvcml6ZWQgdGhlIEFwcCBvciBub3RcbiogSXQgZG9lcyBzbyBieSBjaGVja2luZyBpZiB0aGVyZSdzIGEgcmVmcmVzaF90b2tlblxuKiBhdmFpbGFibGUgb24gdGhlIGN1cnJlbnQgZGF0YWJhc2UgdGFibGUuXG4qXG4qIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYXV0aG9yaXplZCwgZmFsc2Ugb3RoZXJ3aXNlXG4qL1xudmFyIGlzQXV0aG9yaXplZCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICB2YXIgdG9rZW5WYWx1ZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0b2tlbktleSk7XG5cbiAgICAgIGNhbGxiYWNrKCgodG9rZW5WYWx1ZSAhPT0gbnVsbCkgJiYgKHR5cGVvZiB0b2tlblZhbHVlICE9PSAndW5kZWZpbmVkJykpKTtcbn07XG5cbmlmKCAhaXNOYXRpdmUgKSB7XG4gIGlzQXV0aG9yaXplZCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgZ2FwaS5hdXRoLmF1dGhvcml6ZSh7XG4gICAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICAgIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuICAgIGltbWVkaWF0ZSA6IHRydWVcbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgdG9rZW4gPSBnYXBpLmF1dGguZ2V0VG9rZW4oKTtcbiAgICBpZiggY2FsbGJhY2sgKSBjYWxsYmFjayh0b2tlbik7XG4gIH0pO1xuICB9XG59XG5cblxuLyoqXG4qIEV4dHJhY3RzIHRoZSBjb2RlIGZyb20gdGhlIHVybC4gQ29waWVkIGZyb20gb25saW5lXG4qIEBUT0RPIG5lZWRzIHRvIGJlIHNpbXBsaWZpZWQuXG4qXG4qIEBwYXJhbSBuYW1lIFRoZSBwYXJhbWV0ZXIgd2hvc2UgdmFsdWUgaXMgdG8gYmUgZ3JhYmJlZCBmcm9tIHVybFxuKiBAcGFyYW0gdXJsICBUaGUgdXJsIHRvIGJlIGdyYWJiZWQgZnJvbS5cbipcbiogQHJldHVybiBSZXR1cm5zIHRoZSBWYWx1ZSBjb3JyZXNwb25kaW5nIHRvIHRoZSBuYW1lIHBhc3NlZFxuKi9cbnZhciBnZXRQYXJhbWV0ZXJCeU5hbWUgPSBmdW5jdGlvbihuYW1lLCB1cmwpIHtcbiAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW10vLCBcIlxcXFxcXFtcIikucmVwbGFjZSgvW1xcXV0vLCBcIlxcXFxcXF1cIik7XG4gIHZhciByZWdleFMgPSBcIltcXFxcPyZdXCIgKyBuYW1lICsgXCI9KFteJiNdKilcIjtcbiAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChyZWdleFMpO1xuICB2YXIgcmVzdWx0cyA9IHJlZ2V4LmV4ZWModXJsKTtcblxuICBpZihyZXN1bHRzID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZWxzZVxuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1sxXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGF1dGhvcml6ZSA6IGF1dGhvcml6ZSxcbiAgaXNBdXRob3JpemVkIDogaXNBdXRob3JpemVkLFxuICBnZXRBY2Nlc3NUb2tlbiA6IGdldEFjY2Vzc1Rva2VuLFxuICBBUFBfSUQgOiBBUFBfSURcbn07XG4iLCJ2YXIgYXBwID0gcmVxdWlyZSgnLi9hcHAnKTtcblxudmFyIGNhY2hlZFRpbGVTdHlsZSA9IHtcbiAgd2hlcmU6IFwicGlkIGluICgpXCIsXG4gIHBvbHlnb25PcHRpb25zOiB7XG4gICAgZmlsbENvbG9yOiBcIiMwMDAwMDBcIixcbiAgICBzdHJva2VDb2xvcjogXCIjRkYwMDAwXCIsXG4gICAgc3Ryb2tlV2VpZ2h0OiAzXG4gIH1cbn1cblxudmFyIGNhY2hlZFRpbGVzID0gW107XG52YXIgY2FjaGVkVGlsZXNMb2FkZWQgPSBmYWxzZTtcbnZhciBjYWNoZWRUaWxlUHJlZml4ID0gJ2NhY2hlZF90aXRsZV8nO1xudmFyIGNhY2hpbmcgPSBmYWxzZTtcbnZhciBzYXZlQ2FjaGVPbkNsaWNrU2V0ID0gZmFsc2U7XG52YXIgY01hcERhdGEgPSB7fTtcblxudmFyIGNvbHMgPSBbXTtcbnZhciBhcHAgPSBudWxsO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBfbG9hZEZyb21DYWNoZSgpO1xuICBfbG9hZENhY2hlZFRpbGVzKCk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyQ2FjaGUoKSB7XG4gIGlmKCAhY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNsZWFyIGFsbCB0aWxlIGRhdGEgZnJvbSB0aGUgY2FjaGU/JykgKSByZXR1cm47XG5cbiAgZm9yKCB2YXIga2V5IGluIHdpbmRvdy5sb2NhbFN0b3JhZ2UgKSB7XG4gICAgaWYoIGtleS5pbmRleE9mKGNhY2hlZFRpbGVQcmVmaXgpID4gLTEgKSB7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICB9XG4gIH1cbiAgY2FjaGVkVGlsZXMgPSBbXTtcbn1cblxuLy8gZSBpcyB0aGUgZXZlbnQgb2JqZWN0IGZyb20gZ29vZ2xlIG1hcHNcbmZ1bmN0aW9uIGNhY2hlVGlsZShlLCBmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSkge1xuICBpZiggIXNhdmVDYWNoZU9uQ2xpY2tTZXQgKSB7XG4gICAgc2F2ZUNhY2hlT25DbGlja1NldCA9IHRydWU7XG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICBfc2F2ZVRpbGUoKTtcbiAgICB9KTtcbiAgICAkKCcjbG9jYXRlLWNhY2hlLW1vZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgaWYoICEkKHRoaXMpLmlzKCdjaGVja2VkJykgKSAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGFuZWwnKS5oaWRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBpZiggY2FjaGluZyApIHJldHVybjtcbiAgY2FjaGluZyA9IHRydWU7XG5cbiAgY01hcERhdGEgPSB7XG4gICAgZnVzaW9uTGF5ZXIgOiBmdXNpb25MYXllcixcbiAgICBkZWZhdWx0T3B0aW9ucyA6IGRlZmF1bHRPcHRpb25zLFxuICAgIGRlZmF1bHRTdHlsZSA6IGRlZmF1bHRTdHlsZSxcbiAgICBwaWQgOiAgZS5yb3cucGlkLnZhbHVlXG4gIH1cblxuICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtbmFtZScpLnZhbCgnJyk7XG4gICQoJyNsb2NhdGUtY2FjaGUtbW9kZS1sb2FkaW5nJykuc2hvdygpO1xuICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGFuZWwnKS5oaWRlKCk7XG5cbiAgX2xvYWRUaWxlKGUubGF0TG5nLmxuZygpLCBlLmxhdExuZy5sYXQoKSwgZnVuY3Rpb24oZGF0YSl7XG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBhbmVsJykuc2hvdygpO1xuICAgICQoJyNsb2NhdGUtY2FjaGUtbW9kZS1sb2FkaW5nJykuaGlkZSgpO1xuXG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBpZCcpLmh0bWwoY01hcERhdGEucGlkKTtcbiAgICBjTWFwRGF0YS5kYXRhID0gZGF0YTtcbiAgICBjYWNoaW5nID0gZmFsc2U7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXIoKSB7XG4gIGZvciggdmFyIGF0dHIgaW4gYXBwLmdldE1vZGVsKCkud2VhdGhlciApIHtcbiAgICBpZiggYXR0ciAhPSBcIm5yZWxcIiApIGNvbHMucHVzaChhdHRyKTtcbiAgfVxuXG4gIC8vIHRoZSBhYm91dCBtb2RhbCBsaW5rIGlzIGNyZWF0ZWQgYmVsb3csIHNvIHdoeSBub3QuLi5cbiAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgc2hvdyA6IGZhbHNlXG4gIH0pO1xuXG4gIC8vIHRoZSBhYm91dCBtb2RhbCBsaW5rIGlzIGNyZWF0ZWQgYmVsb3csIHNvIHdoeSBub3QuLi5cbiAgJChcIiNoZWxwLW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgX2NyZWF0ZU5hdk1lbnUoKTtcblxuICAvLyBoaWRlIHRoZSBzZWxlY3QgdHJlZSBidXR0b25cbiAgJCgnI3RyZWUtc3ViLW1lbnUnKS5wYXJlbnQoKS5oaWRlKCk7XG5cbiAgLy8gaGlkZSB0aGUgc2VsZWN0b3IgZm9yIHVwbG9hZGluZyB3ZWF0aGVyIGRhdGEgZnJvbSBhIGdvb2dsZSBzcHJlYWRzaGVldFxuICAkKCcjd2VhdGhlclJlYWRlci1zcHJlYWRzaGVldCcpLnBhcmVudCgpLmhpZGUoKTtcblxuICAvLyBzaG93IHRoZSBjYWNoZSB2ZXJzaW9uIG9mIHRoZSBsb2NhdGlvbiBzZWxlY3RvclxuICAkKCcjc2VsZWN0LWxvY2F0aW9uLW9ubGluZScpLmhpZGUoKTtcbiAgJCgnI3NlbGVjdC1sb2NhdGlvbi1vZmZsaW5lJykuc2hvdygpO1xuXG4gIC8vIHNldCB0aGUgbG9jYXRpb24gc2VsZWN0b3IgdWkgbGlzdCBiYXNlZCBvbiBjYWNoZWQgdGlsZXNcbiAgX3VwZGF0ZUNhY2hlVGlsZVVpTGlzdCgpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJDYWNoZWRUaWxlc09uTWFwKGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKSB7XG4gIGlmKCAhY2FjaGVkVGlsZXNMb2FkZWQgKSBfbG9hZENhY2hlZFRpbGVzKCk7XG5cbiAgZGVmYXVsdE9wdGlvbnMuc3R5bGVzID0gW2RlZmF1bHRTdHlsZV07XG5cbiAgaWYoIGNhY2hlZFRpbGVzLmxlbmd0aCA+IDAgKSB7XG4gICAgY2FjaGVkVGlsZVN0eWxlLndoZXJlID0gJ3BpZCBpbiAoJytjYWNoZWRUaWxlcy5qb2luKCcsJykrJyknO1xuICAgIGRlZmF1bHRPcHRpb25zLnN0eWxlcy5wdXNoKGNhY2hlZFRpbGVTdHlsZSk7XG4gIH1cblxuICBmdXNpb25MYXllci5zZXRPcHRpb25zKGRlZmF1bHRPcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gX3NhdmVUaWxlKCkge1xuICB2YXIgbmFtZSA9ICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1uYW1lJykudmFsKCk7XG4gIGlmKCBuYW1lLmxlbmd0aCA9PSAwICkgcmV0dXJuIGFsZXJ0KCdQbGVhc2UgcHJvdmlkZSBhIG5hbWUnKTtcblxuICBjTWFwRGF0YS5kYXRhLm5hbWUgPSBuYW1lO1xuXG4gIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShjYWNoZWRUaWxlUHJlZml4K2NNYXBEYXRhLnBpZCwgSlNPTi5zdHJpbmdpZnkoY01hcERhdGEuZGF0YSkpO1xuXG4gIGNhY2hlZFRpbGVzLnB1c2goY01hcERhdGEucGlkKTtcbiAgcmVuZGVyQ2FjaGVkVGlsZXNPbk1hcChjTWFwRGF0YS5mdXNpb25MYXllciwgY01hcERhdGEuZGVmYXVsdE9wdGlvbnMsIGNNYXBEYXRhLmRlZmF1bHRTdHlsZSk7XG4gICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1wYW5lbCcpLmhpZGUoKTtcbn1cblxuZnVuY3Rpb24gX2xvYWRUaWxlKGxuZywgbGF0LCBjYWxsYmFjaykge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd0aWxlLWRhdGEtY2FjaGUnLCAxKTtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vYWxkZXIuYmlvZW5lcmd5LmNhc2lsLnVjZGF2aXMuZWR1OjgwODAvdml6c291cmNlL3Jlc3Q/dmlldz1wb2ludFRvV2VhdGhlcihcIitsbmcrXCIsXCIrbGF0K1wiLDgxOTIpXCJcbiAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgdmFyIHJlc3BzID0gMDtcbiAgdmFyIHdlYXRoZXJUYWJsZSA9IHt9O1xuICB2YXIgc29pbFRhYmxlID0ge307XG5cbiAgZnVuY3Rpb24gY2hlY2tEb25lKCkge1xuICAgICAgcmVzcHMrKztcbiAgICAgIGlmKCByZXNwcyA9PSAyICYmIGNhbGxiYWNrICkgY2FsbGJhY2soe3dlYXRoZXI6d2VhdGhlclRhYmxlLCBzb2lsOnNvaWxUYWJsZX0pO1xuICB9XG5cbiAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICB3ZWF0aGVyVGFibGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmdldERhdGFUYWJsZSgpLnRvSlNPTigpKTtcbiAgICBjaGVja0RvbmUoKTtcbiAgfSk7XG5cbiAgdmFyIHVybCA9IFwiaHR0cDovL2FsZGVyLmJpb2VuZXJneS5jYXNpbC51Y2RhdmlzLmVkdTo4MDgwL3ZpenNvdXJjZS9yZXN0P3ZpZXc9cG9pbnRUb1NPSUwoXCIrbG5nK1wiLFwiK2xhdCtcIiw4MTkyKVwiXG4gIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgc29pbFRhYmxlID0gSlNPTi5wYXJzZShyZXNwb25zZS5nZXREYXRhVGFibGUoKS50b0pTT04oKSk7XG4gICAgY2hlY2tEb25lKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlQ2FjaGVUaWxlVWlMaXN0KCkge1xuICBpZiggY2FjaGVkVGlsZXMubGVuZ3RoID09IDAgKSB7XG4gICAgJCgnI3NlbGVjdC1sb2NhdGlvbi1vZmZsaW5lLW5vbmUnKS5zaG93KCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGxpc3RFbGUgPSAkKCcjc2VsZWN0LWxvY2F0aW9uLW9mZmxpbmUtbGlzdCcpLmh0bWwoJzxkaXY+U2VsZWN0IENhY2hlZCBUaWxlPC9kaXY+JyksIGVsZTtcbiAgJCgnI3NlbGVjdC1sb2NhdGlvbi1vZmZsaW5lLW5vbmUnKTtcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjYWNoZWRUaWxlcy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIganNvbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShjYWNoZWRUaWxlUHJlZml4K2NhY2hlZFRpbGVzW2ldKTtcbiAgICBqc29uID0gSlNPTi5wYXJzZShqc29uKTtcblxuICAgIGVsZSA9ICQoJzxkaXY+PGEgY2FjaGVpZD1cIicraSsnXCIgc3R5bGU9XCJjdXJzb3I6cG9pbnRlclwiPicrY2FjaGVkVGlsZXNbaV0rJzogJytqc29uLm5hbWUrJzwvYT48L2Rpdj4nKTtcbiAgICBlbGUuZmluZCgnYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgX3J1bkNhY2hlZFRpbGUocGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdjYWNoZWlkJykpKTtcbiAgICB9KTtcbiAgICBsaXN0RWxlLmFwcGVuZChlbGUpXG4gIH1cbn1cblxuZnVuY3Rpb24gX3J1bkNhY2hlZFRpbGUoaW5kZXgpIHtcbiAgdmFyIGpzb24gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oY2FjaGVkVGlsZVByZWZpeCtjYWNoZWRUaWxlc1tpbmRleF0pO1xuICBqc29uID0gSlNPTi5wYXJzZShqc29uKTtcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IGpzb24ud2VhdGhlci5yb3dzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBtID0gaSsnJztcbiAgICBmb3IoIHZhciBqID0gMTsgaiA8IGpzb24ud2VhdGhlci5jb2xzLmxlbmd0aDsgaisrICkge1xuICAgICAgJChcIiNpbnB1dC13ZWF0aGVyLVwiK2NvbHNbal0rXCItXCIraSkudmFsKGpzb24ud2VhdGhlci5yb3dzW2ldLmNbal0gPyBqc29uLndlYXRoZXIucm93c1tpXS5jW2pdLnYgOiBcIlwiKTtcbiAgICB9XG4gIH1cblxuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwganNvbi5zb2lsLmNvbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgaWYoIGpzb24uc29pbC5yb3dzWzBdID09IG51bGwgKSBjb250aW51ZTtcbiAgICAkKFwiI2lucHV0LXNvaWwtXCIranNvbi5zb2lsLmNvbHNbaV0uaWQpLnZhbChqc29uLnNvaWwucm93c1swXS5jW2ldLnYpO1xuICB9XG5cbiAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICBhcHAucnVuTW9kZWwoKTtcbiAgfSwgNTAwKTtcbn1cblxuZnVuY3Rpb24gX2xvYWRDYWNoZWRUaWxlcygpIHtcbiAgY2FjaGVkVGlsZXMgPSBbXTtcbiAgZm9yKCB2YXIga2V5IGluIHdpbmRvdy5sb2NhbFN0b3JhZ2UgKSB7XG4gICAgaWYoIGtleS5pbmRleE9mKGNhY2hlZFRpbGVQcmVmaXgpID4gLTEgKSB7XG4gICAgICBjYWNoZWRUaWxlcy5wdXNoKGtleS5yZXBsYWNlKGNhY2hlZFRpbGVQcmVmaXgsJycpKTtcbiAgICB9XG4gIH1cbiAgY2FjaGVkVGlsZXNMb2FkZWQgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlTmF2TWVudSgpIHtcbiAgdmFyIGJ0biA9ICQoJzxsaSBjbGFzcz1cImRyb3Bkb3duXCI+J1xuICAgICAgKyAnPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGVcIj5PRkZMSU5FIE1PREU8YiBjbGFzcz1cImNhcmV0XCI+PC9iPjwvYT4nXG4gICAgICArICc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwiaGVscFwiPjxpIGNsYXNzPVwiaWNvbi1xdWVzdGlvbi1zaWduXCI+PC9pPiBIZWxwPC9hPjwvbGk+J1xuICAgICAgKyAnPGxpPjxhIGlkPVwiYWJvdXRcIj48aSBjbGFzcz1cImljb24taW5mby1zaWduXCI+PC9pPiBBYm91dDwvYT48L2xpPidcbiAgICAgICsgJzwvdWw+PC9saT4nKTtcblxuICAvLyBzZXQgY2xpY2sgaGFuZGxlcnMgZm9yIHBvcHVwXG4gIGJ0bi5maW5kKCdhLmRyb3Bkb3duLXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcygnb3BlbicpO1xuICB9KTtcblxuICAvLyBhYm91dCBjbGljayBoYW5kbGVyXG4gIGJ0bi5maW5kKCcjYWJvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gIH0pO1xuXG4gIGJ0bi5maW5kKCcjaGVscCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgIHNob3dIZWxwKCk7XG4gIH0pO1xuXG4gIC8vIGFkZCBtZW51XG4gICQoXCIjbG9naW4taGVhZGVyXCIpLmh0bWwoXCJcIikuYXBwZW5kKGJ0bik7XG59O1xuXG5mdW5jdGlvbiBfbG9hZEZyb21DYWNoZSgpIHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJ2NhY2hlL2pzYXBpJyxcbiAgICAgICAgZGF0YVR5cGU6IFwic2NyaXB0XCIsXG4gICAgICAgIGNhY2hlIDogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKCdoZWFkJykuYXBwZW5kKCAkKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgLz4nKS5hdHRyKCdocmVmJywgJ2NhY2hlL2NoYXJ0LmNzcycpICk7XG4gICAgICAgICAgJCgnaGVhZCcpLmFwcGVuZCggJCgnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIC8+JykuYXR0cignaHJlZicsICdjYWNoZS9hbm5vdGF0ZWR0aW1lbGluZS5jc3MnKSApO1xuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICdjYWNoZS9jaGFydC5qcycsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJzY3JpcHRcIixcbiAgICAgICAgICAgIGNhY2hlIDogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIGNoYXJ0c0xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGlmKCBjaGFydHNDYWxsYmFjayApIGNoYXJ0c0NhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdCA6IGluaXQsXG4gIHJlbmRlciA6IHJlbmRlcixcbiAgY2FjaGVUaWxlIDogY2FjaGVUaWxlLFxuICByZW5kZXJDYWNoZWRUaWxlc09uTWFwIDogcmVuZGVyQ2FjaGVkVGlsZXNPbk1hcCxcbiAgY2xlYXJDYWNoZSA6IGNsZWFyQ2FjaGVcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgVlBEIDoge1xuICAgICAgbGFiZWwgOiBcIk1lYW4gVmFwb3IgUHJlc3N1cmUgRGVmaWNpdFwiLFxuICAgICAgdW5pdHMgOiBcImtQQVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcInRoZSBkaWZmZXJlbmNlIChkZWZpY2l0KSBiZXR3ZWVuIHRoZSBhbW91bnQgb2YgbW9pc3R1cmUgaW4gdGhlIGFpciBhbmQgaG93IG11Y2ggXCIgK1xuICAgICAgXHRcdFwibW9pc3R1cmUgdGhlIGFpciBjYW4gaG9sZCB3aGVuIGl0IGlzIHNhdHVyYXRlZFwiXG4gIH0sXG4gIGZWUEQgOiB7XG4gICAgICBsYWJlbCA6IFwiVmFwb3IgUHJlc3N1cmUgRGVmaWNpdCBNb2RpZmllclwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQSBlbnZpcm9ubWVudGFsIGZhY3RvciBncm93dGggbW9kaWZpZXJcIlxuICB9LFxuICBmVCA6IHtcbiAgICAgIGxhYmVsIDogXCJUZW1wZXJhdHVyZSBNb2RpZmllclwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQSBlbnZpcm9ubWVudGFsIGZhY3RvciBncm93dGggbW9kaWZpZXJcIlxuICB9LFxuICBmRnJvc3QgOiB7XG4gICAgICBsYWJlbCA6IFwiRnJvc3QgTW9kaWZpZXJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIk51bWJlciBvZiBmcm9zdCBkYXlzIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIFBBUiA6IHtcbiAgICAgIGxhYmVsIDogXCJNb250aGx5IFBob3Rvc3ludGhldGljYWxseSBBY3RpdmUgUmFkaWF0aW9uXCIsXG4gICAgICB1bml0cyA6IFwibW9scyAvIG1eMiBtb250aFwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkRlc2lnbmF0ZXMgdGhlIHNwZWN0cmFsIHJhbmdlICh3YXZlIGJhbmQpIG9mIHNvbGFyIHJhZGlhdGlvbiBmcm9tIDQwMCB0byA3MDAgbmFub21ldGVycyBcIiArXG4gICAgICBcdFx0XCJ0aGF0IHBob3Rvc3ludGhldGljIG9yZ2FuaXNtcyBhcmUgYWJsZSB0byB1c2UgaW4gdGhlIHByb2Nlc3Mgb2YgcGhvdG9zeW50aGVzaXNcIlxuICB9LFxuICB4UFAgOiB7XG4gICAgICBsYWJlbCA6IFwiTWF4aW11bSBQb3RlbnRpYWwgUHJpbWFyeSBQcm9kdWN0aW9uXCIsXG4gICAgICB1bml0cyA6IFwiTWV0cmljIFRvbnMgRHJ5IE1hdHRlci9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIEludGNwdG4gOiB7XG4gICAgICBsYWJlbCA6IFwiQ2Fub3B5IFJhaW5mYWxsIEludGVyY2VwdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlByZWNpcGl0YXRpb24gdGhhdCBkb2VzIG5vdCByZWFjaCB0aGUgc29pbCwgYnV0IGlzIGluc3RlYWQgaW50ZXJjZXB0ZWQgYnkgdGhlIGxlYXZlcyBhbmQgYnJhbmNoZXMgb2YgcGxhbnRzIGFuZCB0aGUgZm9yZXN0IGZsb29yLlwiXG4gIH0sXG4gIEFTVyA6IHtcbiAgICAgIGxhYmVsIDogXCJBdmFpbGFibGUgU29pbCBXYXRlclwiLFxuICAgICAgdW5pdHMgOiBcIm1tXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgQ3VtSXJyaWcgOiB7XG4gICAgICBsYWJlbCA6IFwiQ3VtdWxhdGl2ZSBSZXF1aXJlZCBJcnJpZ2F0aW9uXCIsXG4gICAgICB1bml0cyA6IFwibW0vbW9uXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgSXJyaWcgOiB7XG4gICAgICBsYWJlbCA6IFwiUmVxdWlyZWQgSXJyaWdhdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIm1tL21vblwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIFN0YW5kQWdlIDoge1xuICAgICAgbGFiZWwgOiBcIlN0YW5kIEFnZVwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIExBSSA6IHtcbiAgICAgIGxhYmVsIDogXCJMZWFmIEFyZWEgSW5kZXhcIixcbiAgICAgIHVuaXRzIDogXCJtMiAvIG0yXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiVGhlIG9uZS1zaWRlZCBncmVlbiBsZWFmIGFyZWEgcGVyIHVuaXQgZ3JvdW5kIHN1cmZhY2UgYXJlYVwiXG4gIH0sXG4gIENhbkNvbmQgOiB7XG4gICAgICBsYWJlbCA6IFwiQ2Fub3B5IENvbmR1Y3RhbmNlXCIsXG4gICAgICB1bml0cyA6IFwiZ2MsbS9zXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgVHJhbnNwIDoge1xuICAgICAgbGFiZWwgOiBcIkNhbm9weSBNb250aGx5IFRyYW5zcGlyYXRpb25cIixcbiAgICAgIHVuaXRzIDogXCJtbS9tb25cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJXYXRlciBtb3ZlbWVudCB0aHJvdWdoIGEgcGxhbnQgYW5kIGl0cyBldmFwb3JhdGlvbiBmcm9tIGFlcmlhbCBwYXJ0c1wiXG4gIH0sXG4gIGZTVyA6IHtcbiAgICAgIGxhYmVsIDogXCJTb2lsIFdhdGVyIE1vZGlmaWVyXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBIGVudmlyb25tZW50YWwgZmFjdG9yIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIGZBZ2UgOiB7XG4gICAgICBsYWJlbCA6IFwiU3RhbmQgYWdlXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBIGVudmlyb25tZW50YWwgZmFjdG9yIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIFBoeXNNb2QgOiB7XG4gICAgICBsYWJlbCA6IFwiXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJQaHlzaW9sb2dpY2FsIE1vZGlmaWVyIHRvIENhbm9weSBDb25kdWN0YW5jZVwiXG4gIH0sXG4gIHBSIDoge1xuICAgICAgbGFiZWwgOiBcIlwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkFsb25nIHdpdGggYSBQaHlzaW9sb2dpYWwgcGFyYW1ldGVyLCBzcGVjaWZpZXMgdGhlIGFtb3VudCBvZiBuZXcgZ3Jvd3RoIGFsbG9jYXRlZCB0byB0aGUgcm9vdCBzeXN0ZW0sIGFuZCB0aGUgdHVybm92ZXIgcmF0ZS5cIlxuICB9LFxuICBwUyA6IHtcbiAgICAgIGxhYmVsIDogXCJcIixcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJEZWZpbmVzIHRoZSBmb2xpYWdlIHRvIHN0ZW0gKFdGL1dTKSBmcmFjdGlvbiBpbiBhbGxvY2F0aW5nIGFib3ZlZ3JvdW5kIGJpb21hc3Mgb2YgdGhlIHRyZWVcIlxuICB9LFxuICBsaXR0ZXJmYWxsIDoge1xuICAgICAgbGFiZWwgOiBcIlwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpdGlvbiA6IFwiXCIsXG4gICAgICBhbHRGbk5hbWUgOiBcInRkcFwiXG4gIH0sXG4gIE5QUCA6IHtcbiAgICAgIGxhYmVsIDogXCJOZXQgQ2Fub3B5IFByb2R1Y3Rpb25cIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiXG4gIH0sXG4gIFdGIDoge1xuICAgICAgbGFiZWwgOiBcIkxlYWYgQmlvbWFzc1wiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXG4gICAgICBmbiA6IGZ1bmN0aW9uKHByZV9XRiwgY3VyX2RXLCBjdXJfcEYsIGN1cl9saXR0ZXJmYWxsLCBwcmV2X1dGKSB7XG4gICAgICAgICAgcmV0dXJuIHByZXZfV0YgKyBjdXJfZFcgKiBjdXJfcEYgLSBjdXJfbGl0dGVyZmFsbCAqIHByZXZfV0ZcbiAgICAgIH1cbiAgfSxcbiAgV1IgOiB7XG4gICAgICBsYWJlbCA6IFwiUm9vdCBCaW9tYXNzXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIixcbiAgICAgIGZuIDogZnVuY3Rpb24ocHJldl9XUiwgY3VyX2RXLCBjdXJfcFIsIHR1cm5vdmVyLCBwcmV2X1dSLCBjdXJfUm9vdFApIHtcbiAgICAgICAgICByZXR1cm4gcHJldl9XUiArIGN1cl9kVyAqIGN1cl9wUiAtIHRyZWUucFIudHVybm92ZXIgKiBwcmV2X1dSIC0gY3VyX1Jvb3RQO1xuICAgICAgfVxuICB9LFxuICBXUyA6IHtcbiAgICAgIGxhYmVsIDogXCJTdGVtIEJpb21hc3NcIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiLFxuICAgICAgZm4gOiBmdW5jdGlvbihwcmV2X1dTLCBjdXJfZFcsIGN1cl9wUykgeyByZXR1cm4gcHJldl9XUyArIGN1cl9kVyAqIGN1cl9wUyB9XG4gIH0sXG4gIFcgOiB7XG4gICAgICBsYWJlbCA6IFwiVG90YWwgQmlvbWFzc1wiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXG4gICAgICBmbiA6IGZ1bmN0aW9uKGN1cl9XRiwgY3VyX1dSLCBjdXJfV1MpIHsgcmV0dXJuIGN1cl9XRitjdXJfV1IrY3VyX1dTIH1cbiAgfVxufVxuIiwidmFyIGFwcCA9IHJlcXVpcmUoJy4vYXBwJyk7XG5cbi8vIGFkZCBzcHJlYWRzaGVldCB2aXogc291cmNlXG4vLyBodHRwczovL3NwcmVhZHNoZWV0cy5nb29nbGUuY29tL3RxP3RxPXNlbGVjdCUyMComa2V5PTBBdjdjVVYtbzJRUVlkSFpGWVdKTk5XcFJTMWhJVldoR1FUaGxMV1p3WldjJnVzcD1kcml2ZV93ZWIjZ2lkPTBcblxuZnVuY3Rpb24gaW5pdCgpIHtcbnZhciBkcm9wWm9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkcm9wX3pvbmUnKTtcbmRyb3Bab25lLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgX2hhbmRsZURyYWdPdmVyLCBmYWxzZSk7XG5kcm9wWm9uZS5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgX2hhbmRsZUZpbGVTZWxlY3QsIGZhbHNlKTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVzJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgX2hhbmRsZUZpbGVTZWxlY3QsIGZhbHNlKTtcblxuICAgICQoJyNzcHJlYWRzaGVldC13ZWF0aGVyLWlucHV0LWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIF9oYW5kbGVHb29nbGVTcHJlYWRzaGVldCgpO1xuICAgIH0pO1xuICAgICQoJyNzcHJlYWRzaGVldC13ZWF0aGVyLWlucHV0Jykub24oJ2tleXVwJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlmKCBlLndoaWNoID09IDEzICkgX2hhbmRsZUdvb2dsZVNwcmVhZHNoZWV0KCk7XG4gICAgfSk7XG5cbiAgICAkKCcjd2VhdGhlclJlYWRlci1sb2NhbGZpbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAkKCcjd2VhdGhlclJlYWRlci1sb2NhbGZpbGUtcGFuZWwnKS50b2dnbGUoJ3Nsb3cnKTtcbiAgICB9KTtcbiAgICAkKCcjd2VhdGhlclJlYWRlci1zcHJlYWRzaGVldCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJyN3ZWF0aGVyUmVhZGVyLXNwcmVhZHNoZWV0LXBhbmVsJykudG9nZ2xlKCdzbG93Jyk7XG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gX2hhbmRsZUdvb2dsZVNwcmVhZHNoZWV0KCkge1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2xvYWQtd2VhdGhlci1kcml2ZS1maWxlJywgMSk7XG5cbiAgICB2YXIgdmFsID0gJCgnI3NwcmVhZHNoZWV0LXdlYXRoZXItaW5wdXQnKS52YWwoKTtcbiAgICBpZiggdmFsLmxlbmd0aCA9PSAwICkgcmV0dXJuO1xuXG4gICAgaWYoICF2YWwubWF0Y2goL15odHRwLiovICkgKSB2YWwgPSAnaHR0cHM6Ly8nK3ZhbDtcblxuICAgIHZhciBmaWxlUGFuZWwgPSBuZXcgV2VhdGhlckZpbGUoKTtcbiAgICB2YXIgcm9vdCA9ICQoXCIjZmlsZV9saXN0XCIpO1xuICAgIGZpbGVQYW5lbC5pbml0RnJvbVVybCh2YWwsIHJvb3QpO1xuICAgICQoJyNzcHJlYWRzaGVldC13ZWF0aGVyLWlucHV0JykudmFsKCcnKTtcbn1cblxuZnVuY3Rpb24gX2hhbmRsZUZpbGVTZWxlY3QoZXZ0KSB7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbG9hZC13ZWF0aGVyLWxvY2FsLWZpbGUnLCAxKTtcblxuICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHZhciBmaWxlcyA9IGV2dC5kYXRhVHJhbnNmZXIgPyBldnQuZGF0YVRyYW5zZmVyLmZpbGVzIDogZXZ0LnRhcmdldC5maWxlczsgLy8gRmlsZUxpc3Qgb2JqZWN0LlxuXG4gIC8vIGZpbGVzIGlzIGEgRmlsZUxpc3Qgb2YgRmlsZSBvYmplY3RzLiBMaXN0IHNvbWUgcHJvcGVydGllcy5cbiAgdmFyIHJvb3QgPSAkKFwiI2ZpbGVfbGlzdFwiKTtcbiAgZm9yICh2YXIgaSA9IDAsIGY7IGYgPSBmaWxlc1tpXTsgaSsrKSB7XG4gICAgdmFyIGZpbGVQYW5lbCA9IG5ldyBXZWF0aGVyRmlsZSgpO1xuICAgIGZpbGVQYW5lbC5pbml0KGYsIHJvb3QpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9oYW5kbGVEcmFnT3ZlcihldnQpIHtcbmV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbmV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuZXZ0LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknOyAvLyBFeHBsaWNpdGx5IHNob3cgdGhpcyBpcyBhIGNvcHkuXG59XG5cbi8vIG9uIGFkZCwgaWYgdGhlIGxpc3QgaXMgZW1wdHksIGxldCdzIGNsb3NlIHRoZSBwb3B1cFxuZnVuY3Rpb24gX29uQ29tcGxldGUoKSB7XG4gICAgaWYoICQoXCIjZmlsZV9saXN0XCIpLmNoaWxkcmVuKCkubGVuZ3RoID09IDAgKSB7XG4gICAgICAgICQoJyN3ZWF0aGVyUmVhZGVyLW1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICB9XG59XG5cbnZhciBXZWF0aGVyRmlsZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaGVhZGVycyA9IHtcbiAgICAgICAgZGF0ZSAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdEYXRlJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ0RhdGUnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICB0bWluICAgICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ01pbiBUZW1wZXJhdHVyZScsXG4gICAgICAgICAgICB1bml0cyA6ICdDJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgdG1heCAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdNYXggVGVtcGVyYXR1cmUnLFxuICAgICAgICAgICAgdW5pdHMgOiAnQycsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHRkbWVhbiAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnTWVhbiBUZW1wZXJhdHVyZScsXG4gICAgICAgICAgICB1bml0cyA6ICdDJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgcHB0ICAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdQcmVjaXBpdGlvbicsXG4gICAgICAgICAgICB1bml0cyA6ICdtbScsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHJhZCAgICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnUmFkaWF0aW9uJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ01KIG0tMiBkYXktMScsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIGRheWxpZ2h0IDoge1xuICAgICAgICAgICAgbGFuZWwgOiAnRGF5bGlnaHQgSG91cnMnLFxuICAgICAgICAgICAgdW5pdHMgOiAnaG91cnMnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gIHZhciBlbGUgPSAkKCc8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjogbGVmdFwiPicrXG4gICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L2J1dHRvbj4nK1xuICAgICAgJzxkaXYgY2xhc3M9XCJmaWxlbmFtZVwiPjwvZGl2PicrXG4gICAgICAnPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+JytcbiAgICAgICc8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgYXJpYS12YWx1ZW5vdz1cIjBcIiBhcmlhLXZhbHVlbWluPVwiMFwiIGFyaWEtdmFsdWVtYXg9XCIxMDBcIiBzdHlsZT1cIndpZHRoOiAwJTtcIj4nK1xuICAgICAgICAnPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+MCUgQ29tcGxldGU8L3NwYW4+JytcbiAgICAgICc8L2Rpdj4nK1xuICAgICc8L2Rpdj4nK1xuICAgICAgJzxkaXYgY2xhc3M9XCJzdGF0dXNcIj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0ZS1yYW5nZVwiPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwcmV2aWV3LWRhdGFcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPicrXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2PjxhIGNsYXNzPVwiYnRuIGJ0bi1saW5rIHByZXZpZXctZGF0YS1idG5cIj5QcmV2aWV3IERhdGE8L2E+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwcmV2aWV3LWRhdGEtdGFibGVcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjb2wtc3RhdHVzXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwiaGVpZ2h0OjUwcHhcIj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJidG4gYnRuLWxpbmsgbWFwLWRhdGEtYnRuXCI+TWFwIENTViBDb2x1bW5zPC9hPicrXG4gICAgICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBkaXNhYmxlZCBwdWxsLXJpZ2h0XCI+QWRkIERhdGE8L2E+JytcbiAgICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICc8L2Rpdj4nKTtcblxuICB2YXIgZGF0YSA9IHt9O1xuICAgIHZhciBjc3ZUYWJsZSA9IFtdO1xuXG4gICAgLy8gb25seSBhdXRvIGhpZGUgdGhlIGZpcnN0IHRpbWVcbiAgICB2YXIgYXV0b0hpZGUgPSB0cnVlO1xuXG4gIC8vIHRoZSBmaWxlIHJlYWRlciBvYmplY3QgYW5kIHRoZSBlbGVtZW50XG4gIGZ1bmN0aW9uIGluaXQoZmlsZSwgcm9vdEVsZSkge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5vbmVycm9yID0gZXJyb3JIYW5kbGVyO1xuICAgIHJlYWRlci5vbnByb2dyZXNzID0gdXBkYXRlUHJvZ3Jlc3M7XG4gICAgcmVhZGVyLm9ubG9hZHN0YXJ0ID0gZnVuY3Rpb24oZSkge307XG4gICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGVsZS5maW5kKCcucHJvZ3Jlc3MnKS5yZW1vdmUoKTtcbiAgICAgIHBhcnNlKGUudGFyZ2V0LnJlc3VsdCk7XG4gICAgfVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUpXG5cbiAgICBlbGUuZmluZCgnLmZpbGVuYW1lJykuaHRtbChnZXROYW1lKGZpbGUpKTtcbiAgICByb290RWxlLmFwcGVuZChlbGUpO1xuXG4gICAgICAgIF9zZXRIYW5kbGVycygpO1xuICB9XG5cbiAgICBmdW5jdGlvbiBpbml0RnJvbVVybCh1cmwsIHJvb3RFbGUpIHtcbiAgICAgICAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgICAgICAgZWxlLmZpbmQoJy5wcm9ncmVzcycpLmh0bWwoJ1F1ZXJ5aW5nIHNwcmVhZHNoZWV0Li4uJyk7XG5cbiAgICAgICAgdmFyIGtleSA9IGdldEtleSh1cmwpO1xuICAgICAgICBlbGUuZmluZCgnLmZpbGVuYW1lJykuaHRtbCgnPGgzIHN0eWxlPVwiYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2VlZTtwYWRkaW5nOjE1cHggMCA0cHggMFwiPjxpIGNsYXNzPVwiaWNvbi10aW50XCI+PC9pPiAnK1xuICAgICAgICAgICAgJ0dvb2dsZSBTcHJlYWRzaGVldCcrKGtleS5sZW5ndGggPiAwID8gJzxiciAvPjxzcGFuIHN0eWxlPVwiY29sb3I6Izg4ODtmb250LXNpemU6MTRweFwiPicra2V5Kyc8L3NwYW4+JyA6ICcnKSsnPC9oMz4nKTtcblxuICAgICAgICByb290RWxlLmFwcGVuZChlbGUpO1xuXG4gICAgICAgIHEuc2V0UXVlcnkoJ1NFTEVDVCAqJyk7XG4gICAgICAgIHEuc2VuZChmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICAgICBlbGUuZmluZCgnLnByb2dyZXNzJykucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5pc0Vycm9yKCkpIHtcbiAgICAgICAgICAgICAgICBzZXRFcnJvcignRXJyb3IgaW4gcXVlcnk6ICcgKyByZXNwb25zZS5nZXRNZXNzYWdlKCkgKyAnICcgKyByZXNwb25zZS5nZXREZXRhaWxlZE1lc3NhZ2UoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYXJzZShkdFRvQ3N2KHJlc3BvbnNlLmdldERhdGFUYWJsZSgpKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF9zZXRIYW5kbGVycygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9zZXRIYW5kbGVycygpIHtcbiAgICAgICAgZWxlLmZpbmQoJy5tYXAtZGF0YS1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5jb2wtc3RhdHVzJykudG9nZ2xlKCdzbG93Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YS10YWJsZScpLnRvZ2dsZSgnc2xvdycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlbGUuZmluZCgnLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVsZS5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlLmZpbmQoJy5idG4tc3VjY2VzcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBhcHAuc2V0V2VhdGhlcihkYXRhKTtcbiAgICAgICAgICAgIGVsZS5yZW1vdmUoKTtcbiAgICAgICAgICAgIF9vbkNvbXBsZXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGR0VG9Dc3YoZHQpIHtcbiAgICAgICAgdmFyIGFyciA9IFtbXV07XG5cbiAgICAgICAgZHQgPSBKU09OLnBhcnNlKGR0LnRvSlNPTigpKTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBkdC5jb2xzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgYXJyWzBdLnB1c2goZHQuY29sc1tpXS5sYWJlbCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGR0LnJvd3MubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBhcnIucHVzaChbXSk7XG4gICAgICAgICAgICBmb3IoIHZhciBqID0gMDsgaiA8IGR0LnJvd3NbaV0uYy5sZW5ndGg7IGorKyApIHtcbiAgICAgICAgICAgICAgICBpZiggIWR0LnJvd3NbaV0uY1tqXSApIGFycltpKzFdLnB1c2goJycpO1xuICAgICAgICAgICAgICAgIGVsc2UgYXJyW2krMV0ucHVzaChkdC5yb3dzW2ldLmNbal0udik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY3N2ID0gJyc7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgY3N2ICs9IGFycltpXS5qb2luKCcsJykrJ1xcbic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY3N2O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEtleSh1cmwpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gdXJsLnNwbGl0KCc/Jyk7XG4gICAgICAgIGlmKCBwYXJ0cy5sZW5ndGggPT0gMSApIHJldHVybiAnJztcblxuICAgICAgICBwYXJ0cyA9IHBhcnRzWzFdLnNwbGl0KCcmJyk7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBpZiggcGFydHNbaV0uc3BsaXQoJz0nKVswXSA9PSAna2V5JyApIHJldHVybiBwYXJ0c1tpXS5zcGxpdCgnPScpWzFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgZnVuY3Rpb24gZ2V0TmFtZShmKSB7XG4gICAgcmV0dXJuIFsnPGgzIHN0eWxlPVwiYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2VlZTtwYWRkaW5nOjE1cHggMCA0cHggMFwiPjxpIGNsYXNzPVwiaWNvbi10aW50XCI+PC9pPiAnLCBmLm5hbWUsXG4gICAgICAgICAgICAgICAgJyA8c3BhbiBzdHlsZT1cImNvbG9yOiM4ODg7Zm9udC1zaXplOjE2cHhcIj4oJywgZi50eXBlIHx8ICduL2EnLFxuICAgICAgICAgICAgICAgICcpPC9zcGFuPiAtIDxzcGFuIHN0eWxlPVwiZm9udC1zaXplOjE2cHhcIj4nLCBmLnNpemUsICcgYnl0ZXM8L3NwYW4+JywgJzwvaDM+J10uam9pbignJyk7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZShkYXRhKSB7XG4gICAgZGF0YSA9IGRhdGEucmVwbGFjZSgvXlxccypcXG4vZywnJykuc3BsaXQoJ1xcbicpO1xuXG4gICAgdmFyIHRhYmxlID0gW107XG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrICkge1xuICAgICAgdGFibGUucHVzaChkYXRhW2ldLnNwbGl0KCcsJykpO1xuICAgIH1cblxuICAgICAgICBpZiggdGFibGUubGVuZ3RoID09IDAgKSByZXR1cm4gc2V0RXJyb3IoJ0ZpbGUgZGlkIG5vdCBjb250YWluIGFueSBpbmZvcm1hdGlvbi4nKTtcbiAgICAgICAgY3N2VGFibGUgPSB0YWJsZTtcblxuICAgICAgICBwYXJzZUhlYWRlcih0YWJsZVswXSk7XG4gICAgICAgIGdldERhdGVSYW5nZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERhdGVSYW5nZSgpIHtcbiAgICAgICAgZWxlLmZpbmQoJy5kYXRlLXJhbmdlJykuaHRtbCgnJyk7XG4gICAgICAgIGlmKCBoZWFkZXJzLmRhdGUuY29sID09IC0xICkgcmV0dXJuIGVsZS5maW5kKCcuZGF0ZS1yYW5nZScpLmh0bWwoJ0RhdGUgY29sdW1uIG5lZWRzIHRvIGJlIG1hdGNoZWQuJyk7XG4gICAgICAgIGlmKCB0eXBlb2YgaGVhZGVycy5kYXRlLmNvbCA9PSAnc3RyaW5nJyApIGhlYWRlcnMuZGF0ZS5jb2wgPSBwYXJzZUludChoZWFkZXJzLmRhdGUuY29sKTtcblxuICAgICAgICB2YXIgZGF0ZXMgPSB7fTtcbiAgICAgICAgdmFyIGRpc3BsYXlEYXRlcyA9IFtdO1xuICAgICAgICBmb3IoIHZhciBpID0gMTsgaSA8IGNzdlRhYmxlLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgaWYoIGhlYWRlcnMuZGF0ZS5jb2wgPCBjc3ZUYWJsZVtpXS5sZW5ndGggJiYgY3N2VGFibGVbaV0ubGVuZ3RoID49IDcgKcKge1xuICAgICAgICAgICAgICAgIHZhciBwID0gY3N2VGFibGVbaV1baGVhZGVycy5kYXRlLmNvbF0uc3BsaXQoXCItXCIpO1xuICAgICAgICAgICAgICAgIGlmKCBwLmxlbmd0aCAhPSAzICYmIHAubGVuZ3RoICE9IDIgKSByZXR1cm4gc2V0RXJyb3IoXCJEYXRlOiBcIitjc3ZUYWJsZVtpXVtoZWFkZXJzLmRhdGUuY29sXStcIiBpcyBub3QgYSB2YWxpZCBmb3JtYXQgKHl5eXktbW0tZGQgb3IgeXl5eS1tbSlcIik7XG5cbiAgICAgICAgICAgICAgICBpZiggIWRhdGVzW3BbMF1dICkgZGF0ZXNbcFswXV0gPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgbW1kZCA9IHBbMV07XG5cbiAgICAgICAgICAgICAgICBpZiggZGF0ZXNbcFswXV0uaW5kZXhPZihtbWRkKSAhPSAtMSApIHJldHVybiBzZXRFcnJvcihcIkRhdGU6IFwiK2NzdlRhYmxlW2ldW2hlYWRlcnMuZGF0ZS5jb2xdK1wiIGlzIGluIGRhdGFzZXQgdHdpY2VcIik7XG4gICAgICAgICAgICAgICAgZGF0ZXNbcFswXV0ucHVzaChtbWRkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciggdmFyIHllYXIgaW4gZGF0ZXMgKSB7XG4gICAgICAgICAgICBpZiggZGF0ZXNbeWVhcl0ubGVuZ3RoID09IDEyKSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGVzLnB1c2goeWVhcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRlcy5wdXNoKHllYXIrJyBbJytkYXRlc1t5ZWFyXS5qb2luKCcsICcpKyddJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbGUuZmluZCgnLmRhdGUtcmFuZ2UnKS5odG1sKCc8Yj5EYXRlIFJhbmdlOjwvYj4gJytkaXNwbGF5RGF0ZXMuam9pbignLCAnKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VIZWFkZXIoaGVhZGVyUm93KSB7XG4gICAgICAgIHZhciBtYXRjaGVkID0gW107XG5cbiAgICAgICAgdmFyIGh0bWwgPSAnPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZFwiPic7XG4gICAgICAgIGh0bWwgKz0gJzx0cj48dGg+S2V5PC90aD48dGg+Q29sdW1uICM8L3RoPjwvdHI+JztcblxuICAgICAgICBmb3IoIHZhciBrZXkgaW4gaGVhZGVycyApIHtcbiAgICAgICAgICAgIGlmKCBoZWFkZXJSb3cuaW5kZXhPZihrZXkpICE9IC0xICkge1xuICAgICAgICAgICAgICAgIGhlYWRlcnNba2V5XS5jb2wgPSBoZWFkZXJSb3cuaW5kZXhPZihrZXkpO1xuICAgICAgICAgICAgICAgIG1hdGNoZWQucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0cj48dGQ+JytrZXkrJzwvdGQ+PHRkPjxzcGFuIGNsYXNzPVwibGFiZWwgbGFiZWwtc3VjY2Vzc1wiPicraGVhZGVyc1trZXldLmNvbCsnIDxpIGNsYXNzPVwiaWNvbi1va1wiPjwvaT48L3NwYW4+PC90ZD48L3RyPic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0cj48dGQ+JytrZXkrJzwvdGQ+PHRkPjxzZWxlY3QgY2xhc3M9XCJzZWxlY3QtJytrZXkrJ1wiXCI+PC9zZWxlY3Q+PC90ZD48L3RyPic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxlLmZpbmQoJy5jb2wtc3RhdHVzJykuaHRtbChodG1sKyc8L3RhYmxlPicpO1xuXG5cbiAgICAgICAgaWYoIG1hdGNoZWQubGVuZ3RoICE9IDcgKSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgc2VsZWN0IGVsZW1lbnQgZm9yIG1pc3NpbmcgY29sJ3NcbiAgICAgICAgICAgIGVsZS5maW5kKCcuc3RhdHVzIHNlbGVjdCcpLmFwcGVuZCgkKCc8b3B0aW9uIHZhbHVlPVwiXCI+W1NlbGVjdCBDb2x1bW5dPC9vcHRpb24+JykpO1xuXG4gICAgICAgICAgICAvLyBpZiBpdCdzIHJhZGlhdGlvbiwgYWRkIG9wdGlvbiBmb3IgY2FsY3VsYXRpbmdcbiAgICAgICAgICAgIC8vIFRPRE9cblxuICAgICAgICAgICAgLy8gYXBwZW5kIG1pc3NpbmcgY29sc1xuICAgICAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBoZWFkZXJSb3cubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgaWYoIG1hdGNoZWQuaW5kZXhPZihoZWFkZXJSb3dbaV0pID09IC0xICkge1xuICAgICAgICAgICAgICAgICAgICBlbGUuZmluZCgnLnN0YXR1cyBzZWxlY3QnKS5hcHBlbmQoJCgnPG9wdGlvbiB2YWx1ZT1cIicraSsnXCI+JytpKycgLSAnK2hlYWRlclJvd1tpXSsnPC9vcHRpb24+JykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2V0IHRoZSBjaGFuZ2UgaGFuZGxlcnMgZm9yIHRoZSBzZWxlY3RvcnNcbiAgICAgICAgICAgIGVsZS5maW5kKCcuc3RhdHVzIHNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS5hdHRyKCd2YWx1ZScpO1xuICAgICAgICAgICAgICAgIGlmKCB2YWwgIT0gJycgKSBoZWFkZXJzW3RoaXMuY2xhc3NOYW1lLnJlcGxhY2UoL3NlbGVjdC0vLCcnKV0uY29sID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgYWxsIGNvbHVtbnMgYXJlIHNldCwgcmVtb3ZlIGRpc2FibGVkIGZyb20gYnRuXG4gICAgICAgICAgICAgICAgdmFyIHJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gaGVhZGVycyApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIGhlYWRlcnNba2V5XS5jb2wgPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiggcmVhZHkgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBhdXRvSGlkZSApIGVsZS5maW5kKCcuY29sLXN0YXR1cycpLmhpZGUoJ3Nsb3cnKTtcbiAgICAgICAgICAgICAgICAgICAgb25SZWFkeSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZWxlLmZpbmQoJy5idG4tc3VjY2VzcycpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gc2hvdyB0aGUgdGFibGVcbiAgICAgICAgICAgIGVsZS5maW5kKCcuY29sLXN0YXR1cycpLnNob3coJ3Nsb3cnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uUmVhZHkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUmVhZHkoKSB7XG4gICAgICAgIGF1dG9IaWRlID0gZmFsc2U7XG4gICAgICAgIGVsZS5maW5kKCcuYnRuLXN1Y2Nlc3MnKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgc2V0RGF0YSgpO1xuICAgICAgICBzZXRQcmV2aWV3KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0UHJldmlldygpIHtcbiAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEnKS5zaG93KCk7XG5cbiAgICAgICAgdmFyIGh0bWwgPSAnPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZFwiPjx0cj48dGg+ZGF0ZTwvdGg+JztcbiAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKXtcbiAgICAgICAgICAgIGlmKCBrZXkgPT0gJ2RhdGUnICkgY29udGludWU7XG4gICAgICAgICAgICBodG1sICs9ICc8dGg+JytrZXkrJzwvdGg+JztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjID0gMDtcbiAgICAgICAgZm9yKCB2YXIgZGF0ZSBpbiBkYXRhICl7XG4gICAgICAgICAgICBpZiggYyA9PSAxMCApIHtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+PHRkIGNvbHNwYW49XCI3XCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlclwiPi4uLjwvdGQ+PC90cj4nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBodG1sICs9ICc8dHI+PHRkPicrZGF0ZSsnPC90ZD4nO1xuICAgICAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKXtcbiAgICAgICAgICAgICAgICBpZigga2V5ID09ICdkYXRlJyApIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0ZD4nK2RhdGFbZGF0ZV1ba2V5XSsnPC90ZD4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaHRtbCArPSAnPC90cj4nO1xuXG4gICAgICAgICAgICBjKys7XG4gICAgICAgIH1cblxuICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YS10YWJsZScpLmh0bWwoaHRtbCk7XG4gICAgfVxuXG4gIC8vIHNldCB0aGUgbWFwIG9mIGNzdiBoZWFkZXJzXG4gIGZ1bmN0aW9uIHNldERhdGEoKSB7XG4gICAgICAgIGRhdGEgPSB7fTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDE7IGkgPCBjc3ZUYWJsZS5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGlmKCBjc3ZUYWJsZVtpXS5sZW5ndGggPCA3ICkgY29udGludWU7IC8vIGJhZCByb3dcblxuICAgICAgICAgICAgdmFyIGRhdGUgPSBjc3ZUYWJsZVtpXVtoZWFkZXJzLmRhdGUuY29sXTtcblxuICAgICAgICAgICAgaWYoICFkYXRlICkgY29udGludWU7IC8vIGJhZCByb3dcblxuICAgICAgICAgICAgaWYoIGRhdGUuc3BsaXQoJy0nKS5sZW5ndGggPT0gMyApIGRhdGUgPSBkYXRlLnNwbGl0KFwiLVwiKS5zcGxpY2UoMCwyKS5qb2luKFwiLVwiKTtcbiAgICAgICAgICAgIGRhdGFbZGF0ZV0gPSB7fTtcblxuICAgICAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKSB7XG4gICAgICAgICAgICAgICAgaWYoIGtleSA9PSAnZGF0ZScgKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGRhdGFbZGF0ZV1ba2V5XSA9IHBhcnNlRmxvYXQoY3N2VGFibGVbaV1baGVhZGVyc1trZXldLmNvbF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVQcm9ncmVzcyhldnQpIHtcbiAgICAvLyBldnQgaXMgYW4gUHJvZ3Jlc3NFdmVudC5cbiAgICBpZiAoZXZ0Lmxlbmd0aENvbXB1dGFibGUpIHtcbiAgICAgICAgdmFyIHBlcmNlbnRMb2FkZWQgPSBNYXRoLnJvdW5kKChldnQubG9hZGVkIC8gZXZ0LnRvdGFsKSAqIDEwMCk7XG4gICAgICAgIGVsZS5maW5kKCcucHJvZ3Jlc3MtYmFyJykuYXR0cignYXJpYS12YWx1ZW5vdycscGVyY2VudExvYWRlZCkud2lkdGgocGVyY2VudExvYWRlZCtcIiVcIik7XG4gICAgICAgIGVsZS5maW5kKCcuc3Itb25seScpLmh0bWwoTWF0aC5jZWlsKHBlcmNlbnRMb2FkZWQpKyclIENvbXBsZXRlJyk7XG4gICAgfVxufVxuXG4gIGZ1bmN0aW9uIGVycm9ySGFuZGxlcihldnQpIHtcbiAgICBzd2l0Y2goZXZ0LnRhcmdldC5lcnJvci5jb2RlKSB7XG4gICAgICBjYXNlIGV2dC50YXJnZXQuZXJyb3IuTk9UX0ZPVU5EX0VSUjpcbiAgICAgICAgc2V0RXJyb3IoJ0ZpbGUgTm90IEZvdW5kIScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZXZ0LnRhcmdldC5lcnJvci5OT1RfUkVBREFCTEVfRVJSOlxuICAgICAgICBzZXRFcnJvcignRmlsZSBpcyBub3QgcmVhZGFibGUnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGV2dC50YXJnZXQuZXJyb3IuQUJPUlRfRVJSOlxuICAgICAgICBicmVhazsgLy8gbm9vcFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgc2V0RXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkIHJlYWRpbmcgdGhpcyBmaWxlLicpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBzZXRFcnJvcihtc2cpIHtcbiAgICAgIGVsZS5maW5kKCcuc3RhdHVzJykuaHRtbCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiPicrbXNnKyc8L2Rpdj4nKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdCA6IGluaXQsXG4gICAgaW5pdEZyb21VcmwgOiBpbml0RnJvbVVybFxuICB9O1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdCA6IGluaXRcbn07XG4iLCJ2YXIgaW8gPSByZXF1aXJlKCcuL2xpYi9pbycpO1xudmFyIHJ1biA9IHJlcXVpcmUoJy4vbGliL3J1bicpKGlvKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHJ1bjtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRoZXNlIGFyZSBjb25zdGFudHMuXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZGF5c19wZXJfbW9udGg6IHtcbiAgICAgICAgICAgIHZhbHVlOiAzMC40LFxuICAgICAgICAgICAgdW5pdHM6IFwiZGF5cy9tb1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTnVtYmVyIG9mIERheXMgaW4gYW4gYXZlcmFnZSBtb250aFwiXG4gICAgICAgIH0sXG4gICAgICAgIGUyMDoge1xuICAgICAgICAgICAgdmFsdWU6IDIuMixcbiAgICAgICAgICAgIHVuaXRzOiBcInZwL3RcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJhdGUgb2YgY2hhbmdlIG9mIHNhdHVyYXRlZCBWUCB3aXRoIFQgYXQgMjBDXCJcbiAgICAgICAgfSxcbiAgICAgICAgcmhvQWlyOiB7XG4gICAgICAgICAgICB2YWx1ZTogMS4yLFxuICAgICAgICAgICAgdW5pdHM6IFwia2cvbV4zXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEZW5zaXR5IG9mIGFpclwiXG4gICAgICAgIH0sXG4gICAgICAgIGxhbWJkYToge1xuICAgICAgICAgICAgdmFsdWU6IDI0NjAwMDAsXG4gICAgICAgICAgICB1bml0czogXCJKL2tnXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMYXRlbnQgaGVhdCBvZiB2YXBvdXJpc2F0aW9uIG9mIGgyb1wiXG4gICAgICAgIH0sXG4gICAgICAgIFZQRGNvbnY6IHtcbiAgICAgICAgICAgIHZhbHVlOiAwLjAwMDYyMixcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ29udmVydCBWUEQgdG8gc2F0dXJhdGlvbiBkZWZpY2l0ID0gMTgvMjkvMTAwMFwiXG4gICAgICAgIH0sXG4gICAgICAgIFFhOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTkwLFxuICAgICAgICAgICAgdW5pdHM6IFwiVy9tXjJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkludGVyY2VwdCBvZiBuZXQgcmFkaWF0aW9uIHZlcnN1cyBzb2xhciByYWRpYXRpb24gcmVsYXRpb25zaGlwXCJcbiAgICAgICAgfSxcbiAgICAgICAgUWI6IHtcbiAgICAgICAgICAgIHZhbHVlOiAwLjgsXG4gICAgICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwic2xvcGUgb2YgbmV0IHZzLiBzb2xhciByYWRpYXRpb24gcmVsYXRpb25zaGlwXCJcbiAgICAgICAgfSxcbiAgICAgICAgZ0RNX21vbDoge1xuICAgICAgICAgICAgdmFsdWU6IDI0LFxuICAgICAgICAgICAgdW5pdHM6IFwiZy9tb2woQylcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1vbGVjdWxhciB3ZWlnaHQgb2YgZHJ5IG1hdHRlclwiXG4gICAgICAgIH0sXG4gICAgICAgIG1vbFBBUl9NSjoge1xuICAgICAgICAgICAgdmFsdWU6IDIuMyxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1vbChDKS9NSlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ29udmVyc2lvbiBvZiBzb2xhciByYWRpYXRpb24gdG8gUEFSXCJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgdHJlZSA6IHJlcXVpcmUoJy4vdHJlZScpLFxuICBwbGFudGF0aW9uIDogcmVxdWlyZSgnLi9wbGFudGF0aW9uJyksXG4gIHBsYW50YXRpb25fc3RhdGUgOiByZXF1aXJlKCcuL3BsYW50YXRpb25fc3RhdGUnKSxcbiAgc29pbCA6IHJlcXVpcmUoJy4vc29pbCcpLFxuICB3ZWF0aGVyIDogcmVxdWlyZSgnLi93ZWF0aGVyJyksXG4gIG1hbmFnZSA6IHJlcXVpcmUoJy4vbWFuYWdlJyksXG4gIGNvbnN0YXRzIDogcmVxdWlyZSgnLi9jb25zdGFudHMnKVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBkZXNjcmlwdGlvbiA6IFwiQ3JvcCBNYW5hZ2VtZW50IFBhcmFtZXRlcnNcIixcbiAgdmFsdWUgOiB7XG4gICAgaXJyaWdGcmFjIDoge1xuICAgICAgdmFsdWUgOiAxLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIklycmlnYXRpb24gZnJhY3Rpb246IDEgPSBmdWxseSBpcnJpZ2F0ZWQsIDAgPSBubyBpcnJpZ2F0aW9uLiBBbnkgdmFsdWVzIGJldHdlZW4gMCBhbmQgMSBhcmUgYWNjZXB0YWJsZVwiXG4gICAgfSxcbiAgICBmZXJ0aWxpdHkgOiB7XG4gICAgICB2YWx1ZSA6IDAuNyxcbiAgICAgIHVuaXRzIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJTb2lsIGZlcnRpbGl0eVwiXG4gICAgfSxcbiAgICBEYXRlUGxhbnRlZCA6IHtcbiAgICAgICAgdmFsdWUgOiBcIl9kYXRlX1wiLFxuICAgICAgICB1bml0cyA6IFwiZGF0ZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGF0ZSB0aGUgY3JvcCB3YXMgcGxhbnRlZFwiXG4gICAgfSxcbiAgICBEYXRlQ29wcGljZWQgOiB7XG4gICAgICAgIHZhbHVlIDogXCJfZGF0ZV9cIixcbiAgICAgICAgdW5pdHMgOiBcImRhdGVcIixcbiAgICAgICAgZGVzY3JpcHRpb24gOiBcIkRhdGUgb2YgdGhlIGZpcnN0IGNvcHBpY2VcIlxuICAgIH0sXG4gICAgQ29wcGljZUludGVydmFsIDoge1xuICAgICAgICB2YWx1ZSA6IDMsXG4gICAgICAgIHVuaXRzIDogXCJZZWFyc1wiLFxuICAgICAgICBkZXNjcmlwdGlvbiA6IFwiSG93IGFmdGVyIHRoZSBjcm9wIGlzIGNvcHBpY2VkIGFmdGVyIHRoZSBmaXJzdCBjb3BwaWNlXCJcbiAgICB9LFxuICAgIERhdGVGaW5hbEhhcnZlc3QgOiB7XG4gICAgICAgIHZhbHVlIDogXCJfZGF0ZV9cIixcbiAgICAgICAgdW5pdHMgOiBcImRhdGVcIixcbiAgICAgICAgZGVzY3JpcHRpb24gOiBcIkRhdGUgd2hlbiB0aGUgY3JvcCBpcyBjb21wbGV0ZWx5IGhhcnZlc3RlZFwiXG4gICAgfVxuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiR3JlZW53b29kIFBHIFZhbHVlcyAoZGVmYXVsdClcIixcbiAgICB2YWx1ZToge1xuICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICB2YWx1ZTogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIFN0b2NraW5nRGVuc2l0eToge1xuICAgICAgICAgICAgdmFsdWU6IDM1ODcsXG4gICAgICAgICAgICB1bml0czogXCJUcmVlcy9oZWN0YXJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk51bWJlciBvZiB0cmVlcyBwbGFudGVkIHBlciBoZWN0YXJcIlxuICAgICAgICB9LFxuICAgICAgICBTZWVkbGluZ01hc3M6IHtcbiAgICAgICAgICAgIHZhbHVlOiAwLjAwMDQsXG4gICAgICAgICAgICB1bml0czogXCJrR1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWFzcyBvZiB0aGUgc2VlZGxpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBwUzoge1xuICAgICAgICAgICAgdmFsdWU6IDAuMSxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQcm9wb3J0aW9uIG9mIHNlZWRsaW5nIG1hc3MgZ29pbmcgaW50byBzdGVtXCJcbiAgICAgICAgfSxcbiAgICAgICAgcEY6IHtcbiAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlByb3BvcnRpb24gb2Ygc2VlZGxpbmcgbWFzcyBnb2luZyBpbnRvIGZvbGlhZ2VcIlxuICAgICAgICB9LFxuICAgICAgICBwUjoge1xuICAgICAgICAgICAgdmFsdWU6IDAuOSxcbiAgICAgICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQcm9wb3J0aW9uIG9mIHNlZWRsaW5nIG1hc3MgZ29pbmcgaW50byByb290XCJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogXCJQbGFudGF0aW9uIHN0YXRlIGNsYXNzLCBjb250YWluaW5nIGFsbCBpbnRlbWVkaWF0ZSB2YWx1ZXMgYXQgZXZlcnkgdGltZXN0ZXAgb2YgdGhlIG1vZGVsXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZmVlZHN0b2NrSGFydmVzdDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBjb3BwaWNlQ291bnQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgY29wcGljZUFnZToge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibW9udGhcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFnZSBvZiB0cmVlIGF0IHRoZSB0aW1lIG9mIGNvcHBpY2VcIlxuICAgICAgICB9LFxuICAgICAgICBWUEQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwia1BBXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcIk1lYW4gdmFwb3IgcHJlc3N1cmUgZGVmaWNpdFwiXG4gICAgICAgIH0sXG4gICAgICAgIGZWUEQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246XCJWYXBvciBQcmVzc3VyZSBEZWZpY2l0IE1vZGlmaWVyIChQb3BsYXIpXCJcbiAgICAgICAgfSxcbiAgICAgICAgZlQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOlwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiVGVtcGVyYXR1cmUgbW9kaWZpZXJcIlxuICAgICAgICB9LFxuICAgICAgICBmRnJvc3Q6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb24gOiBcIk51bWJlciBvZiBGcmVlemUgRGF5cyBNb2RpZmllclwiXG4gICAgICAgIH0sXG4gICAgICAgIGZOdXRyOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czpcInVuaXRsZXNzXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpcIk51dHJpdGlvbmFsIEZyYWN0aW9uLCBtaWdodCBiZSBiYXNlZCBvbiBzb2lsIGFuZCBmZXJ0aWxpemVyIGF0IHNvbWUgcG9pbnRcIlxuICAgICAgICB9LFxuICAgICAgICBmU1c6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU29pbCB3YXRlciBtb2RpZmllclwiXG4gICAgICAgIH0sXG4gICAgICAgIGZBZ2U6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgUEFSOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czpcIm1vbHNcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOlwiTW9udGhseSBQQVIgaW4gbW9scyAvIG1eMiBtb250aFwiXG4gICAgICAgIH0sXG4gICAgICAgIHhQUDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwibWV0cmljIHRvbnMgRHJ5IE1hdHRlci9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibWF4aW11bSBwb3RlbnRpYWwgUHJpbWFyeSBQcm9kdWN0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgSW50Y3B0bjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSByYWluZmFsbCBpbnRlcmNlcHRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBBU1c6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBdmFpbGFibGUgc29pbCB3YXRlclwiXG4gICAgICAgIH0sXG4gICAgICAgIEN1bUlycmlnOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtbVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ3VtdWxhdGl2ZSBpcnJpZ2F0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgSXJyaWc6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1tL21vblwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmVxdWlyZWQgaXJyaWdhdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIFN0YW5kQWdlOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtb250aFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQWdlIG9mIHRoZSB0cmVlXCJcbiAgICAgICAgfSxcbiAgICAgICAgTEFJOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxlYWYgYXJlYSBpbmRleFwiXG4gICAgICAgIH0sXG4gICAgICAgIENhbkNvbmQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ2Fub3B5IGNvbmR1Y3RhbmNlXCJcbiAgICAgICAgfSxcbiAgICAgICAgVHJhbnNwOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtbS9tb25cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSBtb250aGx5IHRyYW5zcGlyYXRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBQaHlzTW9kOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJ1bml0bGVzc1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUGh5c2lvbG9naWNhbCBNb2RpZmllciB0byBjb25kdWN0YW5jZSBhbmQgQVBBUnVcIlxuICAgICAgICB9LFxuICAgICAgICBwZnM6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUmF0aW8gb2YgZm9saWFnZSB0byBzdGVtIHBhcnRpdGlvbmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHBSOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIHBTOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIHBGOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIGxpdHRlcmZhbGw6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgTlBQOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJtZXRyaWMgdG9ucyBEcnkgTWF0dGVyL2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOZXQgUHJpbWFyeSBQcm9kdWN0aXZpdHlcIlxuICAgICAgICB9LFxuICAgICAgICBSb290UDoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSb290IHByb2R1Y3Rpdml0eVwiXG4gICAgICAgIH0sXG4gICAgICAgIGRXOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIFdGOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJiZHQvaGFcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkZvbGlhZ2UgeWllbGRcIlxuICAgICAgICB9LFxuICAgICAgICBXUjoge1xuICAgICAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICAgICAgdW5pdHM6IFwiYmR0L2hhXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSb290IHlpZWxkXCJcbiAgICAgICAgfSxcbiAgICAgICAgV1M6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcImJkdC9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3RlbSB5aWVsZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFc6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcImJkdC9oYVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVG90YWwgeWllbGQ6IHJvb3QgKyBzdGVtICsgZm9saWFnZVwiXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVzY3JpcHRpb246IFwiU29pbCBpbmZvcm1hdGlvbiBiYXNlZCBvbiBjdXJyZW50IGxvY2F0aW9uXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgbWF4YXdzOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gYXZhaWxhYmxlIHNvaWwgd2F0ZXJcIlxuICAgICAgICB9LFxuICAgICAgICBzd3Bvd2VyOiB7XG4gICAgICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInBvd2VyIHBhcmFtZXRlciBiYXNlZCBvbiBjbGF5IGNvbnRlbnQgb2Ygc29pbFwiXG4gICAgICAgIH0sXG4gICAgICAgIHN3Y29uc3Q6IHtcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICAgIHVuaXRzOiBcIlwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiY29uc3RhbnQgcGFyYW1ldGVyIGJhc2VkIG9uIGNsYXkgY29udGVudCBvZiBzb2lsXCJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJbZ2MgbS9zXT9cIixcbiAgICBkZXNjcmlwdGlvbjogXCJBbG9uZyB3aXRoIGEgUGh5c2lvbG9naWNhbCBtb2RpZmVyLCBzcGVjaWZpZXMgdGhlIGNhbm9weSBjb25kdWN0YW5jZS4gIFVzZWQgaW4gY2FsY3VsYXRpb24gb2YgdHJhbnNwaXJhdGlvblwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIG1uOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNaW5pbXVtIHZhbHVlLCB3aGVuIGxhaT0wXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wMDAxXG4gICAgICAgIH0sXG4gICAgICAgIG14OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNYXhpbXVtIHZhbHVlXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wMlxuICAgICAgICB9LFxuICAgICAgICBsYWk6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlttXjIvbV4yXVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTGVhZiBBcmVhIEluZGV4IHdoZXJlIHBhcmFtZXRlciByZWFjaGVzIGEgbWF4aW11bSB2YWx1ZS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAyLjZcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgZ3Jvd3RoIGxpbWl0ZXIgYXMgYSBmdW5jdGlvbiBvZiB0aGUgdHJlZSBhZ2UuICBUaGlzIGlzIGEgdGltZSBkZXBlbmRhbmN5IHBhcmFtZXRlci4gIFRoZSBncmFwaCBvZiB0aGUgZnVuY3Rpb24gaXMgYXZhaWxhYmxlIGF0OiBodHRwczovL3d3dy5kZXNtb3MuY29tL2NhbGN1bGF0b3Ivd2EwcTJpaDE4aFwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIGYwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbml0aWFsIFRpbWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAxXG4gICAgICAgIH0sXG4gICAgICAgIGYxOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbmZpbml0ZSBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9LFxuICAgICAgICB0bToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW3ldXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUaW1lIGluIHllYXJzIHdoZXJlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIG9mIGYwIGFuZCBmMVwiLFxuICAgICAgICAgICAgdmFsdWU6IDQ3LjVcbiAgICAgICAgfSxcbiAgICAgICAgbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibj49MTsgUGFyYW1ldGVyIHNwZWNpZmluZyB0aGUgcmF0ZSBvZiBjaGFuZ2UgYXJvdW5kIHRtLiAgbj0xIGlzIGFwcHJveGltYXRlbHkgYSBsaW5lYXIgY2hhbmdlLCBhcyBuIGluY3JlYXNlcywgY2hhbmdlIGJlY29tZXMgbW9yZSBsb2NhbGl6ZWQgYXJvdW5kIHRtLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDMuNVxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgcGFyYW1ldGVycyBhZmZlY3RpbmcgdGVtcGVyYXR1cmUgbW9kaWZpZXIsIGZULiBBIGdyYXBoIG9mIGhvdyB0aGVzZSBwYXJhbWV0ZXJzIGFmZmVjdCB0aGUgdGVtcGVyYXR1cmUgbW9kaWZpZXIgaXMgZm91bmQgaGVyZTogaHR0cHM6Ly93d3cuZGVzbW9zLmNvbS9jYWxjdWxhdG9yLzY5aXdxdG5sMjhcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtbjoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW0NdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIG1pbmltdW0gdGVtcGVyYXR1cmUgb2YgcmVzcGlyYXRpb25cIixcbiAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgIH0sXG4gICAgICAgIG9wdDoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW0NdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIG9wdGltdW0gdGVtcGVyYXR1cmUgb2YgcmVzcGlyYXRpb25cIixcbiAgICAgICAgICAgIHZhbHVlOiAyMFxuICAgICAgICB9LFxuICAgICAgICBteDoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW0NdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIG1heGltdW0gdGVtcGVyYXR1cmUgb2YgcmVzcGlyYXRpb25cIixcbiAgICAgICAgICAgIHZhbHVlOiA1MFxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRoZXNlIHNwZWNpZnkgZ3Jvd3RoIHBhcmFtZXRlcnMgc3BlY2lmaWMgdG8gdGhlIHNwZWNpZXMgb2YgdHJlZS5cIixcbiAgICB2YWx1ZSA6IHtcbiAgICAgICAgazoge1xuICAgICAgICAgICAgdW5pdHM6IFwidW5pdGxlc3NcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJhZGlhdGlvbiBFeHRpbmN0aW9uIENvZWZmaWNpZW50LlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuNVxuICAgICAgICB9LFxuICAgICAgICBmdWxsQ2FuQWdlOiB7XG4gICAgICAgICAgICB1bml0czogXCJbeV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlllYXIgd2hlcmUgdHJlZSByZWFjaGVzIGZ1bGwgQ2Fub3B5IENvdmVyLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDEuNVxuICAgICAgICB9LFxuICAgICAgICBrRzoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW2tQQV4tMV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRldGVybWluZXMgdGhlIHJlc3BvbnNlIG9mIHRoZSBjYW5vcHkgY29uZHVjdGFuY2UgdG8gdGhlIHZhcG9yIHByZXNzdXJlIGRlZmljaXQuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC41XG4gICAgICAgIH0sXG4gICAgICAgIGFscGhhOiB7XG4gICAgICAgICAgICB1bml0czogXCJba2cvbW9sID9dXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDYW5vcHkgcXVhbnR1bSBlZmZpY2llbmN5LlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDhcbiAgICAgICAgfSxcbiAgICAgICAgZlQgOiByZXF1aXJlKCcuL2Z0JyksXG4gICAgICAgIEJMY29uZDoge1xuICAgICAgICAgICAgdW5pdHM6IFwiW11cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNhbm9weSBib3VuZGFyeSBsYXllciBjb25kdWN0YW5jZS4gVXNlZCBpbiB0aGUgY2FsY3VhdGlvbiBvZiB0cmFuc3BpcmF0aW9uXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wNFxuICAgICAgICB9LFxuICAgICAgICBmQWdlOiByZXF1aXJlKCcuL2ZhZ2UnKSxcbiAgICAgICAgZk4wOiB7XG4gICAgICAgICAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVXNlZCBpbiB0aGUgY2FsY3VsYXRpb24gb2YgdGhlIG51dHJpdGlvbmFsIG1vZGlmaWVyLGZOdXRyLiAgZk51dHIgcmFuZ2VzIGZyb20gW2ZOTywxKSBiYXNlZCBvbiB0aGUgZmVydGlsaXR5IGluZGV4IHdoaWNoIHJhbmdlcyBmcm9tIDAgdG8gMS4gIFdoZW4gZk4wPTEgaW5kaWNhdGVzIGZOdXRyIGlzIDFcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjI2XG4gICAgICAgIH0sXG4gICAgICAgIFNMQTogcmVxdWlyZSgnLi9zbGEnKSxcbiAgICAgICAgLy9DaGVja1VuaXRzQ2hhbmdldG9saW5lYXJGdW5jdGlvblxuICAgICAgICBDb25kdWN0YW5jZTogcmVxdWlyZSgnLi9jb25kdWN0YW5jZScpLFxuICAgICAgICBJbnRjcHRuOiByZXF1aXJlKCcuL2ludGNwdG4nKSxcbiAgICAgICAgeToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQXNzaW1pbGF0aW9uIHVzZSBlZmZpY2llbmN5LiAgVXNlZCBpbiBjYWxjdWxhdGlvbiBvZiB0aGUgTlBQLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuNDdcbiAgICAgICAgfSxcbiAgICAgICAgcGZzOiByZXF1aXJlKCcuL3BmcycpLFxuICAgICAgICBwUjogcmVxdWlyZSgnLi9wcicpLFxuICAgICAgICByb290UDogcmVxdWlyZSgnLi9yb290cCcpLFxuICAgICAgICBsaXR0ZXJmYWxsOiByZXF1aXJlKCcuL2xpdHRlcmZhbGwnKVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlJhaW5mYWxsIGludGVyY2VwdGlvbiBmcmFjdGlvbi4gIEEgbGluZWFyIGZ1bmN0aW9uIHcuci50LiBMQUlcIixcbiAgICB2YWx1ZToge1xuICAgICAgICBtbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWluaW11bSB2YWx1ZSwgd2hlbiBsYWk9MFwiLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfSxcbiAgICAgICAgbXg6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gdmFsdWVcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjI0XG4gICAgICAgIH0sXG4gICAgICAgIGxhaToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW21eMi9tXjJdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMZWFmIEFyZWEgSW5kZXggd2hlcmUgcGFyYW1ldGVyIHJlYWNoZXMgYSBtYXhpbXVtIHZhbHVlLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDcuM1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU3BlY2lmaWVzIHRoZSBmcmFjdGlvbmFsIG1vbnRobHkgbG9zcyBvZiBmb2xpYWdlLiBUaGlzIGlzIGEgdGltZSBkZXBlbmRhbnkgcGFyYW1ldGVyLiAgVGhlIGdyYXBoIG9mIHRoZSBmdW5jdGlvbiBpcyBhdmFpbGFibGUgYXQ6IGh0dHBzOi8vd3d3LmRlc21vcy5jb20vY2FsY3VsYXRvci82aXE5cHBkcXM3XCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZjA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluaXRpYWwgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDAxNVxuICAgICAgICB9LFxuICAgICAgICBmMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVmFsdWUgYXQgSW5maW5pdGUgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMDNcbiAgICAgICAgfSxcbiAgICAgICAgdG06IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlt5XVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGltZSBpbiB5ZWFycyB3aGVyZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBvZiBmMCBhbmQgZjFcIixcbiAgICAgICAgICAgIHZhbHVlOiAyXG4gICAgICAgIH0sXG4gICAgICAgIG46IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIm4+PTE7IFBhcmFtZXRlciBzcGVjaWZpbmcgdGhlIHJhdGUgb2YgY2hhbmdlIGFyb3VuZCB0bS4gIG49MSBpcyBhcHByb3hpbWF0ZWx5IGEgbGluZWFyIGNoYW5nZSwgYXMgbiBpbmNyZWFzZXMsIGNoYW5nZSBiZWNvbWVzIG1vcmUgbG9jYWxpemVkIGFyb3VuZCB0bS5cIixcbiAgICAgICAgICAgIHZhbHVlOiAyLjVcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB1bml0czogXCJmcmFjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlRoaXMgZGVmaW5lcyB0aGUgZm9saWFnZSB0byBzdGVtIChXRi9XUykgZnJhY3Rpb24gaW4gYWxsb2NhdGluZyBhYm92ZWdyb3VuZCBiaW9tYXNzIG9mIHRoZSB0cmVlLiBUaGlzIGlzIGNhbGN1bGF0ZWQgd2l0aCBhIHBhaXIgb2YgYWxsb21ldHJpYyBwb3dlciBlcXVhdGlvbnMuICBUaGUgZmlyc3QgcmVsYXRlcyBiYXNhbCBkaWFtZXRlciwgKERPQikgdG8gdG90YWwgd29vZHkgYmlvbWFzcywgd2hpbGUgdGhlIHNlY29uZCByZWxhdGVzIERPQiB0byBwZnMuICBUaGUgcGFyYW1ldGVyaXphdGlvbiBvZiB0aGUgcmVsYXRpb25zaGlwIGJldHdlZW4gRE9CIGFuZCB3b29keSBiaW9tYXNzIGlzIGludmVydGVkIHRvIGRldGVybWluZSB0aGUgRE9CIGZyb20gdGhlIG1vZGVsZWQgd29vZHkgZnJhY3Rpb24uICBUaGlzIHJlbGF0aW9uIGlzIHBsb3R0ZWQgYXQ6IC4gIFRoZSBtb2RlbCBhbGxvY2F0ZXMgdGhlIGFwcHJvcHJpYXRlIGZyYWN0aW9uIG9mIHdvb2QgYmFzZWQgb24gdGhlIFN0b2NraW5nIGRlbnNpdHkgb2YgdGhlIHBsYW50YXRpb24uIERPQiByYXRoZXIgdGhhbiBEQkggaXMgdXNlZCBmb3IgY29tcGFyaXNvbiBvZiB0cmVlcyB3aXRoIGEgaGlnaCBzdGVtQ250IGFuZCByYXBpZCBjb3BwaWNpbmcgdmFsdWUuXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgc3RlbUNudDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQXZlcmFnZSBudW1iZXIgb2Ygc3RlbXMgcGVyIHN0dW1wXCIsXG4gICAgICAgICAgICB2YWx1ZTogMi44XG4gICAgICAgIH0sXG4gICAgICAgIHN0ZW1DOiB7XG4gICAgICAgICAgICB1bml0czogXCJbY21eLTFdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb25zdGFudCBpbiByZWxhdGlvbiBvZiBET0IgdG8gd29vZHkgYmlvbWFzc1wiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMThcbiAgICAgICAgfSxcbiAgICAgICAgc3RlbVA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBvd2VyIGluIHJlbGF0aW9uIG9mIERPQiB0byB3b29keSBiaW9tYXNzLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDIuNFxuICAgICAgICB9LFxuICAgICAgICBwZnNNeDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTWF4aW11bSBwb3NzaWJsZSBwZnMgdmFsdWUgYWxsb3dlZFwiLFxuICAgICAgICAgICAgdmFsdWU6IDJcbiAgICAgICAgfSxcbiAgICAgICAgcGZzUDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUG93ZXIgaW4gcmVsYXRpb24gb2YgREJPIHRvIHBmc1wiLFxuICAgICAgICAgICAgdmFsdWU6IC0wLjc3MlxuICAgICAgICB9LFxuICAgICAgICBwZnNDOiB7XG4gICAgICAgICAgICB1bml0czogXCJbY21eLTFdXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb25zdGFudCBpbiByZWxhdGlvbiBvZiBET0IgdG8gcGZzLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDEuM1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHVuaXRzOiBcImZyYWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQWxvbmcgd2l0aCBhIFBoeXNpb2xvZ2lhbCBwYXJhbWV0ZXIsIHNwZWNpZmllcyB0aGUgYW1vdW50IG9mIG5ldyBncm93dGggYWxsb2NhdGVkIHRvIHRoZSByb290IHN5c3RlbSwgYW5kIHRoZSB0dXJub3ZlciByYXRlLlwiLFxuICAgIHZhbHVlOiB7XG4gICAgICAgIG1uOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNaW5pbXVtIGFsbG9jYXRpb24gdG8gdGhlIHJvb3QsIHdoZW4gdGhlIHBoeXNpb2xvZ2FsIHBhcmFtZXRlciBpcyAxLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDAuMTdcbiAgICAgICAgfSxcbiAgICAgICAgbXg6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gYWxsb2NhdGlvbiB0byB0aGUgcm9vdCwgd2hlbiBtMC5cIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjdcbiAgICAgICAgfSxcbiAgICAgICAgbTA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRlcGVuZGFuY2Ugb24gdGhlIGZlcnRpbGl0eSBpbmRleC4gMCBpbmRpY2F0ZXMgZnVsbCBkZXBlbmRhbmNlIG9uIGZlcnRpbGl0eSwgMSBpbmRpY2F0ZXMgYSBjb25zdGFudCBhbGxvY2F0aW9uLCBpbmRlcGVuZGFudCBvZiBmZXJ0aWxpdHlcIixcbiAgICAgICAgICAgIHZhbHVlOiAwLjVcbiAgICAgICAgfSxcbiAgICAgICAgdHVybm92ZXI6IHtcbiAgICAgICAgICAgIHVuaXRzOiBcIlttb250aF4tMV1cIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNwZWNpZmllcyB0aGUgbW9udGhseSByb290IHR1cm5vdmVyIHJhdGUuXCIsXG4gICAgICAgICAgICB2YWx1ZTogMC4wMlxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiBcIlRoZXNlIHBhcmFtZXRlcnMgc3BlY2lmeSByb290IGFsbG9jYXRpb24gdG8gZ3Jvd3RoIGFmdGVyIGNvcHBpY2luZy5cIixcbiAgICB2YWx1ZSA6IHtcbiAgICAgIGZyYWM6IHtcbiAgICAgICAgICB1bml0czogXCJbbW9udGheMV1cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGZyYWN0aW9uYWwgYW1vdW50IG9mIHJvb3QgYmlvbWFzcyB0aGF0IGV4Y2VlZHMgdGhlIGFib3ZlZ3JvdW5kIHJlcXVpcmVtZW50cyB0aGF0IGNhbiBiZSBzdXBwbGllZCBpbiBhIGdpdmVuIG1vbnRoLlwiLFxuICAgICAgICAgIHZhbHVlOiAwLjJcbiAgICAgIH0sXG4gICAgICBMQUlUYXJnZXQ6IHtcbiAgICAgICAgICB1bml0czogXCJbbV4yL21eMl1cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgYSB0YXJnZXQgTEFJIHJhdGUuICBUaGUgVGFyZ2V0IExBSSBpcyBpbmNsdWRlZCBpbiB0aGUgY2FsY3VsYXRpb24gb2YgYSB0YXJnZXQgTlBQLCBiYXNlZCBvbiB3ZWF0aGVyIHBhcmFtYXRlcnMuICBCZWxvdyB0aGlzIHRhcmdldCwgdGhlIHJvb3RzIHdpbGwgY29udHJpYnV0ZSBiaW9tYXNzIGlmIHRoZSBiZWxvdyBncm91bmQgcm9vdCBtYXNzIGV4Y2VlZHMgdGhlIHJlcXVpcmVtZW50cyBvZiB0aGUgYWJvdmVncm91bmQgYmlvbWFzcy4gVGhlIHRhcmdldCBpcyBzcGVjaWZpZWQgaW4gTEFJIHRvIHRpbWUgcm9vdCBjb250cmlidXRpb25zIHRvIHBlcmlvZHMgb2YgZ3Jvd3RoXCIsXG4gICAgICAgICAgdmFsdWU6IDEwXG4gICAgICB9LFxuICAgICAgZWZmaWNpZW5jeToge1xuICAgICAgICAgIHVuaXRzOiBcIltrZy9rZ11cIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIGVmZmljaWVuY3kgaW4gY29udmVydGluZyByb290IGJpb21hc3MgaW50byBhYm92ZWdyb3VuZCBiaW9tYXNzLlwiLFxuICAgICAgICAgIHZhbHVlOiAwLjdcbiAgICAgIH1cbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdW5pdHM6IFwiW21eMi9rZ11cIixcbiAgICBkZXNjcmlwdGlvbjogXCJTcGVjaWZpZXMgdGhlIFNwZWNpZmljIExlYWYgQXJlYSBhcyBhIGZ1bmN0aW9uIG9mIHRoZSB0cmVlIGFnZS4gIFRoaXMgaXMgYSB0aW1lIGRlcGVuZGFuY3kgcGFyYW1ldGVyLiAgVXNlZCBpbiB0aGUgY2FsY3VsYXRpb24gb2YgTEFJLiAgVGhlIGdyYXBoIG9mIHRoZSBmdW5jdGlvbiBpcyBhdmFpbGFibGUgYXQ6IGh0dHBzOi8vd3d3LmRlc21vcy5jb20vY2FsY3VsYXRvci93YTBxMmloMThoXCIsXG4gICAgdmFsdWU6IHtcbiAgICAgICAgZjA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlZhbHVlIGF0IEluaXRpYWwgVGltZVwiLFxuICAgICAgICAgICAgdmFsdWU6IDE5XG4gICAgICAgIH0sXG4gICAgICAgIGYxOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWYWx1ZSBhdCBJbmZpbml0ZSBUaW1lXCIsXG4gICAgICAgICAgICB2YWx1ZTogMTAuOFxuICAgICAgICB9LFxuICAgICAgICB0bToge1xuICAgICAgICAgICAgdW5pdHM6IFwiW3ldXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUaW1lIGluIHllYXJzIHdoZXJlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIG9mIGYwIGFuZCBmMVwiLFxuICAgICAgICAgICAgdmFsdWU6IDVcbiAgICAgICAgfSxcbiAgICAgICAgbjoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibj49MTsgUGFyYW1ldGVyIHNwZWNpZmluZyB0aGUgcmF0ZSBvZiBjaGFuZ2UgYXJvdW5kIHRtLiAgbj0xIGlzIGFwcHJveGltYXRlbHkgYSBsaW5lYXIgY2hhbmdlLCBhcyBuIGluY3JlYXNlcywgY2hhbmdlIGJlY29tZXMgbW9yZSBsb2NhbGl6ZWQgYXJvdW5kIHRtLlwiLFxuICAgICAgICAgICAgdmFsdWU6IDJcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtb250aDoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcInVuaXRsZXNzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBtb250aCBudW1iZXIgc2luY2UgcGxhbnRpbmdcIlxuICAgIH0sXG4gICAgdG1pbjoge1xuICAgICAgICB2YWx1ZTogLTEsXG4gICAgICAgIHVuaXRzOiBcIkNlbGNpdXNcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiTWluaW11bSB0ZW1wZXJhdHVyZSBmb3IgZ3Jvd3RoXCJcbiAgICB9LFxuICAgIHRtYXg6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJDZWxjaXVzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIk1heGltdW0gdGVtcGVyYXR1cmUgZm9yIGdyb3d0aFwiXG4gICAgfSxcbiAgICB0ZG1lYW46IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJDZWxjaXVzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkRldyBwb2ludCB0ZW1wZXJhdHVyZVwiXG4gICAgfSxcbiAgICBwcHQ6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiUHJlY2lwaXRhdGlvblwiXG4gICAgfSxcbiAgICByYWQ6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiU29sYXIgcmFkaWF0aW9uXCJcbiAgICB9LFxuICAgIG5yZWw6IHtcbiAgICAgICAgdmFsdWU6IC0xLFxuICAgICAgICB1bml0czogXCJcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiXCJcbiAgICB9LFxuICAgIGRheWxpZ2h0OiB7XG4gICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgfVxufTtcbiIsIi8qKlxuXG5AbW9kdWxlIDNQRyBNb2R1bGVcbioqL1xuXG5cbi8qKlxuQ2xhc3MgZm9yIGFsbCB0aGUgZnVuY3Rpb25zIHRoYXQgcnVuIGluIGEgc2luZ2xlIHN0ZXAgb2YgdGhlIG1vZGVsXG5cbkBjbGFzcyBtb2R1bGUuZXhwb3J0c1xuKiovXG5cblxuLyoqXG5saXN0IG9mIGNvbnN0YW50cyB1c2VkIGZvciBjb21wdXRhdGlvbnNcblxuQGF0dHJpYnV0ZSBjb25zdGFudFxuKiovXG52YXIgY29uc3RhbnRzID0ge1xuICBkYXlzX3Blcl9tb250aDp7XG4gICAgICB2YWx1ZTozMC40LFxuICAgICAgdW5pdHM6XCJkYXlzL21vXCIsXG4gICAgICBkZXNjcmlwdGlvbjpcIk51bWJlciBvZiBEYXlzIGluIGFuIGF2ZXJhZ2UgbW9udGhcIlxuICB9LFxuICBlMjA6e1xuICAgICAgdmFsdWU6Mi4yLFxuICAgICAgdW5pdHM6XCJ2cC90XCIsXG4gICAgICBkZXNjcmlwdGlvbjpcIlJhdGUgb2YgY2hhbmdlIG9mIHNhdHVyYXRlZCBWUCB3aXRoIFQgYXQgMjBDXCJcbiAgfSxcbiAgcmhvQWlyOntcbiAgICAgIHZhbHVlOjEuMixcbiAgICAgIHVuaXRzOlwia2cvbV4zXCIsXG4gICAgICBkZXNjcmlwdGlvbjpcIkRlbnNpdHkgb2YgYWlyXCJcbiAgfSxcbiAgbGFtYmRhOntcbiAgICAgIHZhbHVlOjI0NjAwMDAsXG4gICAgICB1bml0czpcIkova2dcIixcbiAgICAgIGRlc2NyaXB0aW9uOlwiTGF0ZW50IGhlYXQgb2YgdmFwb3VyaXNhdGlvbiBvZiBoMm9cIlxuICB9LFxuICBWUERjb252OntcbiAgICAgIHZhbHVlOjAuMDAwNjIyLFxuICAgICAgdW5pdHM6XCI/XCIsXG4gICAgICBkZXNjcmlwdGlvbjpcIkNvbnZlcnQgVlBEIHRvIHNhdHVyYXRpb24gZGVmaWNpdCA9IDE4LzI5LzEwMDBcIlxuICB9LFxuICBRYTp7XG4gICAgICB2YWx1ZTotOTAsXG4gICAgICB1bml0czpcIlcvbV4yXCIsXG4gICAgICBkZXNjcmlwdGlvbjpcIkludGVyY2VwdCBvZiBuZXQgcmFkaWF0aW9uIHZlcnN1cyBzb2xhciByYWRpYXRpb24gcmVsYXRpb25zaGlwXCJcbiAgfSxcbiAgUWI6e1xuICAgICAgdmFsdWU6MC44LFxuICAgICAgdW5pdHM6XCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb246XCJzbG9wZSBvZiBuZXQgdnMuIHNvbGFyIHJhZGlhdGlvbiByZWxhdGlvbnNoaXBcIlxuICB9LFxuICBnRE1fbW9sOntcbiAgICAgIHZhbHVlOjI0LFxuICAgICAgdW5pdHM6XCJnL21vbChDKVwiLFxuICAgICAgZGVzY3JpcHRpb246XCJNb2xlY3VsYXIgd2VpZ2h0IG9mIGRyeSBtYXR0ZXJcIlxuICB9LFxuICBtb2xQQVJfTUo6e1xuICAgICAgdmFsdWU6Mi4zLFxuICAgICAgdW5pdHM6XCJtb2woQykvTUpcIixcbiAgICAgIGRlc2NyaXB0aW9uOlwiQ29udmVyc2lvbiBvZiBzb2xhciByYWRpYXRpb24gdG8gUEFSXCJcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuY29uc3RhbnQgPSBjb25zdGFudDtcbmZ1bmN0aW9uIGNvbnN0YW50KGMpIHtcbiAgICByZXR1cm4gY29uc3RhbnRzW2NdLnZhbHVlO1xufVxuXG4vKipcblRpbWUgRGVwZW5kYW50IEF0dHJpYnV0ZSxcbnVuaXRzPSd2YXJpb3VzJyxcbmRlc2NyaXB0aW9uPSdUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgYSB0aW1lIGRlcGVuZGFudCBmdW5jdGlvbiB0aGF0IGRlY2F5c1xuKG9yIHJpc2VzIGZyb20gZjAgdG8gZjEuICBUaGUgdmFsdWUgKGYwK2YxKS8yIGlzIHJlYWNoZWQgYXQgdG0sXG5hbmQgdGhlIHNsb3BlIG9mIHRoZSBsaW5lIGF0IHRtIGlzIGdpdmVuIGJ5IHAuXG5AbWV0aG9kIHRkcFxuQHBhcmFtIHhcbkBwYXJhbSBmXG4qKi9cbm1vZHVsZS5leHBvcnRzLnRkcCA9IGZ1bmN0aW9uKHgsZikge1xuICB2YXIgcD1mLmYxICsgKGYuZjAtZi5mMSkqTWF0aC5leHAoLU1hdGgubG9nKDIpKk1hdGgucG93KCh4L2YudG0pLGYubikpO1xuICByZXR1cm4gcDtcbn1cblxuLyoqXG5AbWV0aG9kIGxpblxuQHBhcmFtIHhcbkBwYXJhbSBwXG4qL1xubW9kdWxlLmV4cG9ydHMubGluID0gZnVuY3Rpb24oeCwgcCl7XG4gIGlmKCB4IDwgMCApIHtcbiAgICByZXR1cm4gcC5tbjtcbiAgfVxuICBpZiggeCA+IHAueG1heCApIHtcbiAgICByZXR1cm4gcC54bWF4O1xuICB9XG4gIHJldHVybiBwLm1uICsgKHAubXgtcC5tbikqKHgvcC54bWF4KTtcbn07XG5cbi8qKlxudW5pdHM9J3VuaXRsZXNzJyxcbmRlc2NyaXB0aW9uPSdDYW5vcHkgUmFpbmZhbGwgaW50ZXJjZXB0aW9uJ1xuQG1ldGhvZCBJbnRjcHRuXG5AcGFyYW0gY3VyX0xBSVxuQHBhcmFtIGNcbiovXG5tb2R1bGUuZXhwb3J0cy5JbnRjcHRuID0gZnVuY3Rpb24oY3VyX0xBSSwgYyl7XG4gIHJldHVybiBNYXRoLm1heChjLm1uLGMubW4gKyAoYy5teCAtIGMubW4pICogTWF0aC5taW4oMSAsIGN1cl9MQUkgLyBjLmxhaSkpO1xufTtcblxuLyoqXG51bml0cz0nbW0nLFxuZGVzY3JpcHRpb249J0F2YWlsYWJsZSBTb2lsIFdhdGVyJ1xuQG1ldGhvZCBBU1dcbkBwYXJhbSBtYXhBU1dcbkBwYXJhbSBwcmV2X0FTV1xuQHBhcmFtIGRhdGVfcHB0XG5AcGFyYW0gY3VyX1RyYW5zcFxuQHBhcmFtIGN1cl9JbnRjcHRuXG5AcGFyYW0gY3VyX0lycmlnXG4qL1xubW9kdWxlLmV4cG9ydHMuQVNXID0gZnVuY3Rpb24obWF4QVNXLCBwcmV2X0FTVywgZGF0ZV9wcHQsIGN1cl9UcmFuc3AsIGN1cl9JbnRjcHRuLCBjdXJfSXJyaWcpe1xuICByZXR1cm4gTWF0aC5taW4obWF4QVNXKjEwLCBNYXRoLm1heChwcmV2X0FTVyArIGRhdGVfcHB0IC0gKGN1cl9UcmFuc3AgKyBjdXJfSW50Y3B0biAqIGRhdGVfcHB0KSArIGN1cl9JcnJpZywgMCkpO1xufTtcblxuLy9UT0RPOiBkb3VibGUgY2hlY2sgdGhlIGFwcHJvcHJpYXRlIHVzZSBvZiB0ZG1lYW4gKGRldyBwb2ludCB0ZW1wKVxuLy9UT0RPOiB0YWtlIGNvbnN0YW50cyBvdXRcbi8qKlxudW5pdHM9J2tQQScsXG5kZXNjcmlwdGlvbj0nTWVhbiB2YXBvciBwcmVzc3VyZSBkZWZpY2l0J1xuQG1ldGhvZCBWUERcbkBwYXJhbSBkYXRlX3RtaW5cbkBwYXJhbSBkYXRlX3RtYXhcbkBwYXJhbSBkYXRlX3RkbWVhblxuKi9cbm1vZHVsZS5leHBvcnRzLlZQRCA9IGZ1bmN0aW9uKGRhdGVfdG1pbiwgZGF0ZV90bWF4LCBkYXRlX3RkbWVhbil7XG4gIHJldHVybiAoMC42MTA4IC8gMiAqIChNYXRoLmV4cChkYXRlX3RtaW4gKiAxNy4yNyAvIChkYXRlX3RtaW4gKyAyMzcuMykgKSArIE1hdGguZXhwKGRhdGVfdG1heCAqIDE3LjI3IC8gKGRhdGVfdG1heCArIDIzNy4zKSApICkgKSAtICgwLjYxMDggKiBNYXRoLmV4cChkYXRlX3RkbWVhbiAqIDE3LjI3IC8gKGRhdGVfdGRtZWFuICsgMjM3LjMpICkgKTtcbn07XG5cblxuLyoqXG51bml0cyA9IHVuaXRsZXNzLFxuZGVzY3JpcHRpb249J1ZhcG9yIFByZXNzdXJlIERlZmljaXQgTW9kaWZpZXIgKFBvcGxhciknXG5AbWV0aG9kIGZWUERcbkBwYXJhbSBrR1xuQHBhcmFtIGN1cl9WUERcbiovXG5tb2R1bGUuZXhwb3J0cy5mVlBEID0gZnVuY3Rpb24oa0csIGN1cl9WUEQpe1xuICByZXR1cm4gTWF0aC5leHAoLTEgKiBrRyAqIGN1cl9WUEQpO1xufTtcblxuLy9UT0RPOiB0YWtlIGNvbnN0YW50cyBvdXRcbi8vIG1ha2UgYSBtZWFuaW5nZnVsIHRlbXB2YXIgbmFtZVxuLyoqXG51bml0cyA9IHVuaXRsZXNzLFxuZGVzY3JpcHRpb24gPSAnTnVtYmVyIG9mIEZyZWV6ZSBEYXlzIE1vZGlmaWVyJ1xuQG1ldGhvZCBmRnJvc3RcbkBwYXJhbSBkYXRlX3RtaW5cbiovXG5tb2R1bGUuZXhwb3J0cy5mRnJvc3QgPSBmdW5jdGlvbihkYXRlX3RtaW4pIHtcbiAgdmFyIHRlbXBWYXIgPSAtMS4wO1xuXG4gIGlmKCBkYXRlX3RtaW4gPj0gMCApe1xuICAgIHRlbXBWYXIgPSAxLjA7XG4gIH0gLy9lbHNlIC0xLjBcblxuICByZXR1cm4gMC41ICogKDEuMCArIHRlbXBWYXIgKiBNYXRoLnNxcnQoMSAtIE1hdGguZXhwKC0xICogTWF0aC5wb3coKDAuMTcgKiBkYXRlX3RtaW4pICwgMikgKiAoNCAvIDMuMTQxNTkgKyAwLjE0ICogTWF0aC5wb3coICgwLjE3ICogZGF0ZV90bWluKSAsIDIpICkgLyAoMSArIDAuMTQgKiBNYXRoLnBvdygoMC4xNyAqIGRhdGVfdG1pbikgLCAyKSApICkgKSApO1xufTtcblxuLy9UT0RPIC0gYmV0dGVyIG5hbWluZz86IHRtaW4sIHRtYXggPSB3ZWF0aGVyIFRvcHQsIFRtYXgsIFRtaW4gPSB0cmVlIHBhcmFtc1xuLyoqXG51bml0cz11bml0bGVzcyxcbmRlc2NyaXB0aW9uPSdUZW1wZXJhdHVyZSBtb2RpZmllcidcbkBtZXRob2QgZlRcbkBwYXJhbSB0YXZnXG5AcGFyYW0gZlRcbiovXG5tb2R1bGUuZXhwb3J0cy5mVCA9IGZ1bmN0aW9uKHRhdmcsIGZUKXtcbiAgdmFyIGY7XG4gIGlmKHRhdmcgPD0gZlQubW4gfHwgdGF2ZyA+PSBmVC5teCl7XG4gICAgZiA9IDA7XG4gIH0gZWxzZSB7XG4gICAgZiA9ICggKHRhdmcgLSBmVC5tbikgLyAoZlQub3B0IC0gZlQubW4pICkgICpcbiAgICAgICAgICAgTWF0aC5wb3cgKCAoIChmVC5teCAtIHRhdmcpIC8gKGZULm14IC0gZlQub3B0KSApLFxuICAgICAgICAgICAgICAgICAgICAgICggKGZULm14IC0gZlQub3B0KSAvIChmVC5vcHQgLSBmVC5tbikgKVxuICAgICAgICAgICAgICAgICAgICApO1xuICB9XG4gIHJldHVybihmKTtcbn1cblxuLyoqXG51bml0cz0nbW0vbW9uJyxcbmRlc2NyaXB0aW9uPSdSZXF1aXJlZCBJcnJpZ2F0aW9uJ1xuQG1ldGhvZCBJcnJpZ1xuQHBhcmFtIGlycmlnRnJhY1xuQHBhcmFtIGN1cl9UcmFuc3BcbkBwYXJhbSBjdXJfSW50Y3B0blxuQHBhcmFtIGRhdGVfcHB0XG4qL1xubW9kdWxlLmV4cG9ydHMuSXJyaWcgPSBmdW5jdGlvbihpcnJpZ0ZyYWMsIGN1cl9UcmFuc3AsIGN1cl9JbnRjcHRuLCBkYXRlX3BwdCl7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAgLCBpcnJpZ0ZyYWMgKiAoY3VyX1RyYW5zcCAtICgxIC0gY3VyX0ludGNwdG4pICogZGF0ZV9wcHQpICk7XG59O1xuXG4vL1RPRE86IGdldCB1bml0cyBhbmQgZGVzY3JpcHRpb25cbi8qKlxuQG1ldGhvZCBmU1dcbkBwYXJhbSBBU1dcbkBwYXJhbSBtYXhBV1NcbkBwYXJhbSBzd2NvbnN0XG5AcGFyYW0gc3dwb3dlclxuKi9cbm1vZHVsZS5leHBvcnRzLmZTVyA9IGZ1bmN0aW9uKEFTVywgbWF4QVdTLCBzd2NvbnN0LCBzd3Bvd2VyKSB7XG4gIHZhciBmU1c7XG4gIGlmKHN3Y29uc3QgPT0gMCB8fCBtYXhBV1MgPT0gMCkge1xuICAgIGZTVyA9IDA7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG9tciA9IDEgLSAoQVNXLzEwKS9tYXhBV1M7IC8vIE9uZSBNaW51cyBSYXRpb1xuXG4gICAgaWYob21yIDwgMC4wMDEpIHtcbiAgICAgIGZTVyA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZTVyA9ICgxLU1hdGgucG93KG9tcixzd3Bvd2VyKSkvKDErTWF0aC5wb3cob21yL3N3Y29uc3Qsc3dwb3dlcikpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZlNXO1xufTtcblxuLyoqXG51bml0cz0ndW5pdGxlc3MnLFxuZGVzY3JpcHRpb249J051dHJpdGlvbmFsIEZyYWN0aW9uLCBtaWdodCBiZSBiYXNlZCBvbiBzb2lsIGFuZCBmZXJ0aWxpemVyIGF0IHNvbWUgcG9pbnQnXG5AbWV0aG9kIGZOdXRyXG5AcGFyYW0gZk4wXG5AcGFyYW0gRlJcbiovXG5tb2R1bGUuZXhwb3J0cy5mTnV0ciA9IGZ1bmN0aW9uKGZOMCwgRlIpe1xuICByZXR1cm4gZk4wICsgKDEgLSBmTjApICogRlI7XG59O1xuXG4vKipcblRPRE86IHdoeSAkMyBpbiBtYWtlZmlsZSAtIGFzayBhYm91dCBpdFxudW5pdHM9dW5pdGxlc3NcbmRlc2NyaXB0aW9uPSdQaHlzaW9sb2dpY2FsIE1vZGlmaWVyIHRvIGNvbmR1Y3RhbmNlIGFuZCBBUEFSdSdcbkBtZXRob2QgUGh5c01vZFxuQHBhcmFtIGN1cl9mVlBEXG5AcGFyYW0gY3VyX2ZTV1xuQHBhcmFtIGN1cl9mQWdlXG4qL1xubW9kdWxlLmV4cG9ydHMuUGh5c01vZCA9IGZ1bmN0aW9uKGN1cl9mVlBELCBjdXJfZlNXLCBjdXJfZkFnZSl7XG4gICByZXR1cm4gTWF0aC5taW4oY3VyX2ZWUEQgLCBjdXJfZlNXKSAqIGN1cl9mQWdlO1xufTtcblxuLyoqXG51bml0cz0nZ2MsbS9zJyxcbmRlc2NyaXB0aW9uPSdDYW5vcHkgQ29uZHVjdGFuY2UnXG5AbWV0aG9kIENhbkNvbmRcbkBwYXJhbSBQaHlzTW9kXG5AcGFyYW0gTEFJXG5AcGFyYW0gY29uZFxuKi9cbm1vZHVsZS5leHBvcnRzLkNhbkNvbmQgPSBmdW5jdGlvbihQaHlzTW9kLCBMQUksIGNvbmQpe1xuICAgcmV0dXJuIE1hdGgubWF4KGNvbmQubW4gLCBjb25kLm14ICogUGh5c01vZCAqIE1hdGgubWluKDEgLCBMQUkgLyBjb25kLmxhaSkgKTtcbn07XG5cbi8qKlxudW5pdHM9J21tL21vbicgd2hpY2ggaXMgYWxzbyBrZy9tMi9tb25cbmRlc2NyaXB0aW9uPSdDYW5vcHkgTW9udGhseSBUcmFuc3BpcmF0aW9uJ1xuQG1ldGhvZCBUcmFuc3BcbkBwYXJhbSBkYXRlX25yZWxcbkBwYXJhbSBkYXRlX2RheWxpZ2h0XG5AcGFyYW0gY3VyX1ZQRFxuQHBhcmFtIEJMY29uZFxuQHBhcmFtIGN1cl9DYW5Db25kXG5AcGFyYW0gZGF5c19wZXJfbW9udGhcbiovXG5tb2R1bGUuZXhwb3J0cy5UcmFuc3AgPSBmdW5jdGlvbihkYXRlX25yZWwsIGRhdGVfZGF5bGlnaHQsIGN1cl9WUEQsIEJMY29uZCwgY3VyX0NhbkNvbmQsIGRheXNfcGVyX21vbnRoKXtcbiAgdmFyIFZQRGNvbnYgPSBjb25zdGFudCgnVlBEY29udicpO1xuICB2YXIgbGFtYmRhID0gY29uc3RhbnQoJ2xhbWJkYScpO1xuICB2YXIgcmhvQWlyID0gY29uc3RhbnQoJ3Job0FpcicpO1xuICB2YXIgZTIwID0gY29uc3RhbnQoJ2UyMCcpO1xuICB2YXIgUWEgPSBjb25zdGFudCgnUWEnKTtcbiAgdmFyIFFiID0gY29uc3RhbnQoJ1FiJyk7XG4gIHZhciBkYXlzX3Blcl9tb250aCA9IHR5cGVvZiBkYXlzX3Blcl9tb250aCAhPT0gJ3VuZGVmaW5lZCcgPyBkYXlzX3Blcl9tb250aCA6IGNvbnN0YW50KCdkYXlzX3Blcl9tb250aCcpO1xuXG4gIC8vIGRhdGVfZGF5bGlnaHQgPSBob3Vyc1xuICAvLyBucmVsIGlzIGluIE1KL21eMi9kYXkgY29udmVydCB0byBXaC9tXjIvZGF5XG4gIHZhciBuZXRSYWQgPSBRYSArIFFiICogKChkYXRlX25yZWwgKiAyNzcuNzc4KSAvIGRhdGVfZGF5bGlnaHQpO1xuICB2YXIgZGVmVGVybSA9IHJob0FpciAqIGxhbWJkYSAqIFZQRGNvbnYgKiBjdXJfVlBEICogQkxjb25kO1xuICB2YXIgZGl2ID0gMSArIGUyMCArIEJMY29uZCAvIGN1cl9DYW5Db25kO1xuICAvLyBDb252ZXJ0IGRheWxpZ2h0IHRvIHNlY3MuXG4gIHZhciBUcmFuc3A9ICBkYXlzX3Blcl9tb250aCAqICggKGUyMCAqIG5ldFJhZCArIGRlZlRlcm0gKSAvIGRpdiApICogZGF0ZV9kYXlsaWdodCAqIDM2MDAgLyBsYW1iZGE7XG5cbiAgcmV0dXJuIFRyYW5zcDtcbn07XG5cbi8vVE9ETzogZGVzY3JpcHRpb25cbi8qKlxudW5pdHM9J21ldHJpYyB0b25zIERyeSBNYXR0ZXIvaGEnLFxuQG1ldGhvZCBOUFBcbkBwYXJhbSBwcmV2X1N0YW5kQWdlXG5AcGFyYW0gZnVsbENhbkFnZVxuQHBhcmFtIHhQUFxuQHBhcmFtIGtcbkBwYXJhbSBwcmV2X0xBSVxuQHBhcmFtIGZWUERcbkBwYXJhbSBmU1dcbkBwYXJhbSBmQWdlXG5AcGFyYW0gYWxwaGFcbkBwYXJhbSBmTnV0clxuQHBhcmFtIGZUXG5AcGFyYW0gZkZyb3N0XG4qL1xubW9kdWxlLmV4cG9ydHMuTlBQID0gZnVuY3Rpb24ocHJldl9TdGFuZEFnZSwgZnVsbENhbkFnZSwgeFBQLCBrLCBwcmV2X0xBSSwgZlZQRCwgZlNXLCBmQWdlLCBhbHBoYSwgZk51dHIsIGZULCBmRnJvc3Qpe1xuICB2YXIgQ2FuQ292ZXIgPSAxO1xuICBpZiggcHJldl9TdGFuZEFnZSA8IGZ1bGxDYW5BZ2UgKXtcbiAgICBDYW5Db3ZlciA9IHByZXZfU3RhbmRBZ2UgLyBmdWxsQ2FuQWdlO1xuICB9XG5cbiAgcmV0dXJuIHhQUCAqICgxIC0gKE1hdGguZXhwKC1rICogcHJldl9MQUkpICkgKSAqIENhbkNvdmVyICogTWF0aC5taW4oZlZQRCAsIGZTVykgKiBmQWdlICogYWxwaGEgKiBmTnV0ciAqIGZUICogZkZyb3N0O1xufTtcblxuLy9UT0RPOiB1bml0cyBhbmQgZGVzY3JpcHRpb25cbi8qKlxuQG1ldGhvZCBwUlxuQHBhcmFtIGN1cl9QaHlzTW9kXG5AcGFyYW0gY3VyX3BSXG5AcGFyYW0gRlJcbkBwYXJhbSBwUlxuKi9cbm1vZHVsZS5leHBvcnRzLnBSID0gZnVuY3Rpb24oY3VyX1BoeXNNb2QsIGN1cl9wUixGUixwUil7XG4gIHZhciBwID0ocFIubXggKiBwUi5tbikgL1xuICAgICAgICAgKHBSLm1uICsgKHBSLm14IC0gcFIubW4pICogY3VyX1BoeXNNb2QgKiAocFIubTAgKyAoMSAtIHBSLm0wKSAqIEZSKSApO1xuXG4gIC8vIFRoaXMgd2FzIGFkZGVkIGJ5IHF1aW5uIHRvIGxpbWl0IHJvb3QgZ3Jvd3RoLlxuICByZXR1cm4gcCAqIE1hdGgucG93KHAvY3VyX3BSLDIpO1xufVxuXG5cbi8vVE9ETzogbW9scyBvciBtb2xzIHBlciBtXjI/XG4vKipcbnVuaXRzPW1vbHNcbmRlc2NyaXB0aW9uPSdNb250aGx5IFBBUiBpbiBtb2xzIC8gbV4yIG1vbnRoJ1xubW9sUEFSX01KIFttb2wvTUpdIGlzIGEgY29uc3RhbnQgQ29udmVyc2lvbiBvZiBzb2xhciByYWRpYXRpb24gdG8gUEFSXG5AbWV0aG9kIFBBUlxuQHBhcmFtIGRhdGVfcmFkXG5AcGFyYW0gbW9sUEFSX01KXG4qL1xubW9kdWxlLmV4cG9ydHMuUEFSID0gZnVuY3Rpb24oZGF0ZV9yYWQsIG1vbFBBUl9NSil7XG4gIHZhciBtb2xQQVJfTUogPSB0eXBlb2YgbW9sUEFSX01KICE9PSAndW5kZWZpbmVkJyA/XG4gICAgICAgICAgICAgICAgICAgIG1vbFBBUl9NSiA6IGNvbnN0YW50KCdtb2xQQVJfTUonKTtcblxuICByZXR1cm4gZGF0ZV9yYWQgKiBjb25zdGFudCgnZGF5c19wZXJfbW9udGgnKSAqIG1vbFBBUl9NSjtcbn1cblxuLyoqXG51bml0cz0nbWV0cmljIHRvbnMgRHJ5IE1hdHRlci9oYScsXG5kZXNjcmlwdGlvbj0nbWF4aW11bSBwb3RlbnRpYWwgUHJpbWFyeSBQcm9kdWN0aW9uIFt0RE0gLyBoYSBtb250aF0sXG5OT1RFOiAxMDAwMC8xMF42IFtoYS9tMl1bdERtL2dETV1cbmdHTV9tb2wgW2cvbW9sXSBpcyB0aGUgbW9sZWN1bGFyIHdlaWdodCBvZiBkcnkgbWF0dGVyXG5AbWV0aG9kIHhQUFxuQHBhcmFtIHlcbkBwYXJhbSBjdXJfUEFSXG5AcGFyYW0gZ0RNX21vbFxuKi9cbm1vZHVsZS5leHBvcnRzLnhQUCA9IGZ1bmN0aW9uKHksIGN1cl9QQVIsIGdETV9tb2wpe1xuICAgIGdETV9tb2wgPSB0eXBlb2YgZ0RNX21vbCAhPT0gJ3VuZGVmaW5lZCcgP1xuICAgIGdETV9tb2wgOiBjb25zdGFudCgnZ0RNX21vbCcpO1xuICAgIHJldHVybiB5ICogY3VyX1BBUiAqIGdETV9tb2wgLyAxMDA7XG59XG5cbi8qKiogRlVOQ1RJT05TIEZPUiBDT1BQSUNJTkcgKi9cbi8qKlxuY29wcGljZSByZWxhdGVkIGZ1bmN0aW9uc1xuQG1ldGhvZCBjb3BwaWNlXG4qL1xubW9kdWxlLmV4cG9ydHMuY29wcGljZSA9IHtcbiAgLy8gQ29wcGljZSBGdW5jdGlvbnMgYXJlIGJhc2VkIG9uIERpYW1ldGVyIG9uIFN0dW1wLCBOT1QgREJILlxuICAvLyBDYWxjdWxhdGVzIHRoZSBwZnMgYmFzZWQgb24gdGhlIHN0ZW0gd2VpZ2h0IGluIEtHXG4gIHBmcyA6IGZ1bmN0aW9uKHN0ZW0sIHApIHtcbiAgICB2YXIgYXZET0IgPSBNYXRoLnBvdyggKCBzdGVtIC8gcC5zdGVtQ250IC8gcC5zdGVtQykgLCAoMSAvIHAuc3RlbVApICk7XG4gICAgdmFyIHBwZnM9IHAucGZzQyAqIE1hdGgucG93KGF2RE9CICwgcC5wZnNQKTtcblxuICAgIHJldHVybiBNYXRoLm1pbihwLnBmc014LHBwZnMpO1xuICB9LFxuXG4gIC8vIENhbGN1bGF0ZXMgdGhlIHBmcyBiYXNlZCBvbiBzdGVtIHdpdGggaW4gRy4gIFVzZXMgdm9sdW1lIEluZGV4IGFzIGd1aWRlXG4gIHBmc192aWFfVkkgOiBmdW5jdGlvbiAoc3RlbUcsIHdzVkksIGxhVkksIFNMQSkge1xuICAgIGlmIChzdGVtRyA8IDEwKSB7XG4gICAgICBzdGVtRz0xMDtcbiAgICB9XG4gICAgdmFyIFZJID0gTWF0aC5wb3coIChzdGVtRyAvIHdzVkkuc3RlbXNfcGVyX3N0dW1wIC8gd3NWSS5jb25zdGFudCksKDEgLyB3c1ZJLnBvd2VyKSApO1xuXG4gICAgLy8gQWRkIHVwIGZvciBhbGwgc3RlbXNcbiAgICB2YXIgbGEgPSBsYVZJLmNvbnN0YW50ICogTWF0aC5wb3coVkksbGFWSS5wb3dlcikgKiB3c1ZJLnN0ZW1zX3Blcl9zdHVtcDtcbiAgICB2YXIgd2YgPSAxMDAwICogKGxhIC8gU0xBKTsgIC8vIEZvaWxhZ2UgV2VpZ2h0IGluIGc7XG4gICAgdmFyIHBmcyA9IHdmL3N0ZW1HO1xuICAgIHJldHVybiBwZnM7XG4gIH0sXG5cbiAgUm9vdFAgOiBmdW5jdGlvbihjdXJfbnBwLCBjdXJfbnBwVGFyZ2V0LCBXUixXLHBSeCxmcmFjKSB7XG4gICAgdmFyIG5wcFJlcyA9IGN1cl9ucHBUYXJnZXQgLSBjdXJfbnBwO1xuICAgIHZhciByb290UFA7XG4gICAgaWYoIG5wcFJlcyA+IDAgJiYgV1IvVyA+IHBSeCApIHtcbiAgICAgICAgcm9vdFBQID0gTWF0aC5taW4obnBwUmVzLCBXUiooV1IvVyAtIHBSeCkqZnJhYyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3RQUCA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvb3RQUDtcbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICByZWFkIDogZnVuY3Rpb24obW9kZWwpIHtcbiAgICAvLyBUT0RPIDogaW1wbGVtZW50XG4gICAgLy8gWW91IG5lZWQgdG8gc2V0IHlvdXIgSU8gaGVyZSBhbmQgbWFrZSBzdXJlIGFsbCBwYXJhbWV0ZXJzIGZvciBtb2RlbCBhcmUgY29ycmVjdGx5IHNldFxuICB9LFxuICBkdW1wIDogZnVuY3Rpb24oKSB7XG4gICAgLy8gVE9ETyA6IGltcGxlbWVudFxuICB9XG59O1xuIiwidmFyIGZuID0gcmVxdWlyZSgnLi9mbicpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGRhdGFNb2RlbCA9IHJlcXVpcmUoJy4vZGF0YU1vZGVsJyk7XG5cbmZ1bmN0aW9uIHJ1bihsZW5ndGhPZkdyb3d0aCkge1xuXG4gICAgdmFyIHllYXJUb0NvcHBpY2U7IC8veWVhciBvZiB0aGUgZmlyc3Qgb3Igc3Vic2VxdWVudCBoYXJ2ZXN0c1xuICAgIHZhciBjb3BwaWNlSW50ZXJ2YWw7IC8vdGhlICMgb2YgbW9udGhzIGluIGEgc2luZ2xlIGNvcHBpY2UgY3ljbGVcbiAgICB2YXIgbW9udGhUb0NvcHBpY2U7IC8vYXQgd2hpY2ggbW9udGggdGhlIGhhcnZlc3QgaXMgdG8gYmUgcGVyZm9ybWVkIDo6IGN1cnJlbnRseSB0aGUgdHJlZSB3aWxsIGJlIGN1dCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoYXQgbW9udGhcblxuICAgIC8vUmVhZCB0aGUgaW5wdXQgcGFyYW1ldGVycyBpbnRvIG9iamVjdCAyIGZ1bmN0aW9ucyBjYW4gYmUgY29tYmluZWQgaW50byAxLlxuICAgIC8vdmFyIHBsYW50YXRpb24gPSB7fTtcblxuICAgIC8vdGhpcy5pby5yZWFkQWxsQ29uc3RhbnRzKHBsYW50YXRpb24pOyAvL2JvdGggdHJlZSBjb25zdGFudHMgYW5kIHBsYW50YXRpb24vbWFuYWdlbWVudCBjb25zdGFudHNcblxuXG4gICAgdGhpcy5pby5yZWFkKHRoaXMpO1xuICAgIC8vdGhpcy5pby5yZWFkV2VhdGhlcih3ZWF0aGVyTWFwLCBwbGFudGluZ1BhcmFtcywgY3VzdG9tV2VhdGhlck1hcCk7IC8vYXQgdGhpcyBwb2ludCB3ZWF0aGVyIG1hcCBpcyBhIG1hcCBvZiB3ZWF0aGVyIGpzb24gb2JqZWN0cywgaW5kZXhlZCBhdCBtb250aCAwXG4gICAgLy9hbHNvIHJlYWRzIGluIHRoZSBtYW5hZ2Ugc3R1ZmYgKGRhdGUgY29wcGljZSwgZXRjKSBhbmQgc29pbCBwYXJhbWV0ZXJzLlxuXG4gICAgdGhpcy5jdXJyZW50RGF0ZSA9IHRoaXMucGxhbnRpbmdQYXJhbXNbXCJkYXRlUGxhbnRlZFwiXTtcblxuICAgIHZhciBwbGFudGVkTW9udGggPSB0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCk7XG4gICAgdmFyIGN1cnJlbnRNb250aCA9IHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKTtcblxuXG4gICAgLy9UT0RPOiB0ZXN0IG5vIGRhdGVjb3BwaWNlIGFzIGlucHV0XG4gICAgaWYgKCB0aGlzLnBsYW50aW5nUGFyYW1zW1wiZGF0ZUNvcHBpY2VkXCJdICE9IHVuZGVmaW5lZCApe1xuICAgICAgeWVhclRvQ29wcGljZSA9IHRoaXMucGxhbnRpbmdQYXJhbXNbXCJkYXRlQ29wcGljZWRcIl0uZ2V0WWVhcigpO1xuICAgICAgbW9udGhUb0NvcHBpY2UgPSB0aGlzLnBsYW50aW5nUGFyYW1zW1wiZGF0ZUNvcHBpY2VkXCJdLmdldE1vbnRoKCk7XG4gICAgICBjb3BwaWNlSW50ZXJ2YWwgPSB0aGlzLnBsYW50aW5nUGFyYW1zW1wieWVhcnNQZXJDb3BwaWNlXCJdO1xuICAgICAgd2lsbENvcHBpY2UgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMubWFuYWdlLmNvcHBpY2UgPSBmYWxzZTtcblxuICAgIHZhciBzdGVwID0gMDtcblxuICAgIHZhciBzZXR1cCA9IHtcbiAgICAgIGxlbmd0aE9mR3Jvd3RoIDogbGVuZ3RoT2ZHcm93dGgsXG4gICAgICBzdGVwIDogMCxcbiAgICAgIHBsYW50ZWRNb250aCA6IHBsYW50ZWRNb250aCxcbiAgICAgIGN1cnJlbnREYXRlIDogdGhpcy5jdXJyZW50RGF0ZSxcbiAgICAgIGN1cnJlbnRNb250aCA6IGN1cnJlbnRNb250aCxcbiAgICAgIHllYXJUb0NvcHBpY2UgOiB5ZWFyVG9Db3BwaWNlLFxuICAgICAgbW9udGhUb0NvcHBpY2UgOiBtb250aFRvQ29wcGljZSxcbiAgICAgIGNvcHBpY2VJbnRlcnZhbCA6IGNvcHBpY2VJbnRlcnZhbFxuICAgIH1cblxuICAgIHRoaXMucnVuU2V0dXAoc2V0dXApO1xufVxuXG5mdW5jdGlvbiBydW5TZXR1cChzZXR1cCl7XG4gICAgdmFyIG0gPSAoc2V0dXAuY3VycmVudE1vbnRoKzEpKycnO1xuICAgIGlmKCBtLmxlbmd0aCA9PSAxICkgbSA9ICcwJyttO1xuXG4gICAgdmFyIHdlYXRoZXJUaGlzTW9udGg7XG4gICAgaWYoIHRoaXMuY3VzdG9tX3dlYXRoZXJbc2V0dXAuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSsnLScrbV0gKSB7XG4gICAgXHR3ZWF0aGVyVGhpc01vbnRoID0gdGhpcy5jdXN0b21fd2VhdGhlcltzZXR1cC5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKyctJyttXTtcbiAgICB9IGVsc2Uge1xuICAgIFx0d2VhdGhlclRoaXNNb250aCA9IHRoaXMud2VhdGhlcltzZXR1cC5jdXJyZW50TW9udGhdO1xuICAgIH1cblxuICAgIHZhciBmaXJzdE1vbnRoUmVzdWx0cyA9IHRoaXMuaW5pdCh0aGlzLnBsYW50YXRpb24sIHRoaXMuc29pbCk7XG5cbiAgICB2YXIga2V5c0luT3JkZXI9W107XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMucGxhbnRhdGlvbl9zdGF0ZSl7XG4gICAgICBrZXlzSW5PcmRlci5wdXNoKGtleSk7XG4gICAgfVxuXG4gICAgZmlyc3RNb250aFJlc3VsdHMuRGF0ZSA9IChzZXR1cC5jdXJyZW50RGF0ZS5nZXRNb250aCgpKzEpICsgXCIvXCIgKyBzZXR1cC5jdXJyZW50RGF0ZS5nZXRZZWFyKCk7XG5cbiAgICB2YXIgcm93cyA9IFtdOyAvL3RoZXNlIHdpbGwgYmVjb21lIHJvd3NcblxuICAgIHV0aWxzLmxvZyhcIlJlc3VsdHMgb2YgdGhlIGZpcnN0IG1vbnRoOiBcIiArZmlyc3RNb250aFJlc3VsdHMpO1xuXG4gICAgcm93cy5wdXNoKGtleXNJbk9yZGVyKTtcblxuICAgIHZhciBmaXJzdFJvdyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5c0luT3JkZXIubGVuZ3RoOyBpKyspe1xuICAgICAgdmFyIGtleSA9IGtleXNJbk9yZGVyW2ldO1xuICAgICAgdXRpbHMubG9nKGtleSAgKyBcIjogXCIgKyBmaXJzdE1vbnRoUmVzdWx0c1trZXldKTtcbiAgICAgIGZpcnN0Um93LnB1c2goZmlyc3RNb250aFJlc3VsdHNba2V5XSk7XG4gICAgfVxuXG4gICAgcm93cy5wdXNoKGZpcnN0Um93KTtcblxuICAgIHZhciBjdXJyZW50TW9udGhSZXN1bHRzID0gZmlyc3RNb250aFJlc3VsdHM7XG4gICAgdmFyIG5leHRNb250aFJlc3VsdHM7XG5cbiAgICBmb3IgKHZhciBzdGVwID0gMTsgc3RlcCA8IHNldHVwLmxlbmd0aE9mR3Jvd3RoOyBzdGVwKyspIHtcbiAgICAgIHNldHVwLmN1cnJlbnREYXRlLnNldE1vbnRoKHNldHVwLmN1cnJlbnREYXRlLmdldE1vbnRoKCkgKyAxKTsgLy8gYWRkIGEgbW9udGggdG8gY3VycmVudCBkYXRlXG5cbiAgICAgIHV0aWxzLmxvZyhcImN1cnJlbnREYXRlID0gXCIgKyBzZXR1cC5jdXJyZW50RGF0ZSk7XG4gICAgICBzZXR1cC5jdXJyZW50TW9udGggPSBzZXR1cC5jdXJyZW50RGF0ZS5nZXRNb250aCgpO1xuXG4gICAgICAvL1RPRE86IGZpZ3VyZSBvdXQgd2lsbENvcHBpY2UgZnVuY3Rpb25hbGl0eVxuICAgICAgaWYgKHNldHVwLmN1cnJlbnREYXRlLmdldFllYXIoKSA9PSBzZXR1cC55ZWFyVG9Db3BwaWNlICYmIHNldHVwLmN1cnJlbnRNb250aCA9PSBzZXR1cC5tb250aFRvQ29wcGljZSl7XG4gICAgICAgIHV0aWxzLmxvZyhcIlRpbWUgdG8gQ29wcGljZSFcIik7XG4gICAgICAgIHRoaXMubWFuYWdlLmNvcHBpY2UgPSB0cnVlO1xuICAgICAgICAvL1RPRE86IHVwZGF0ZSB0cmVlc1xuXG5cbiAgICAgICAgc2V0dXAueWVhclRvQ29wcGljZSA9IHNldHVwLnllYXJUb0NvcHBpY2UgKyBzZXR1cC5jb3BwaWNlSW50ZXJ2YWw7IC8vbmV4dCBjb3BwaWNlIHllYXJcblxuICAgICAgICByb3dzLnB1c2goa2V5c0luT3JkZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tYW5hZ2UuY29wcGljZSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBtID0gKHNldHVwLmN1cnJlbnRNb250aCsxKSsnJztcbiAgICAgIGlmKCBtLmxlbmd0aCA9PSAxICkge1xuICAgICAgICBtID0gJzAnK207XG4gICAgICB9XG5cbiAgICAgIHZhciB3ZWF0aGVyVGhpc01vbnRoO1xuXHQgICAgaWYoIHRoaXMuY3VzdG9tX3dlYXRoZXJbc2V0dXAuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSsnLScrbV0gKSB7XG5cdCAgICBcdHdlYXRoZXJUaGlzTW9udGggPSB0aGlzLmN1c3RvbV93ZWF0aGVyW3NldHVwLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkrJy0nK21dO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0d2VhdGhlclRoaXNNb250aCA9IHRoaXMud2VhdGhlcltzZXR1cC5jdXJyZW50TW9udGhdO1xuXHQgICAgfVxuXG4gICAgICBuZXh0TW9udGhSZXN1bHRzID0gc2luZ2xlU3RlcCh0aGlzLnBsYW50YXRpb24sIHRoaXMuc29pbCwgd2VhdGhlclRoaXNNb250aCwgdGhpcy5tYW5hZ2UsIGN1cnJlbnRNb250aFJlc3VsdHMpOyAvL1RPRE86IHN3aXRjaCB1cCB0cmVlcyBoZXJlIHdoZW4gYWZ0ZXIgdGhlIGZpcnN0IGhhcnZlc3RcblxuICAgICAgbmV4dE1vbnRoUmVzdWx0cy5EYXRlID0gKHNldHVwLmN1cnJlbnREYXRlLmdldE1vbnRoKCkrMSkgICsgXCIvXCIgKyBzZXR1cC5jdXJyZW50RGF0ZS5nZXRZZWFyKCk7XG4gICAgICB1dGlscy5sb2coXCJcXG4gUmVzdWx0cyBvZiB0aGUgbmV4dCBtb250aDogXCIgKyBuZXh0TW9udGhSZXN1bHRzKTtcblxuICAgICAgdmFyIHRoaXNSb3cgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5c0luT3JkZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNJbk9yZGVyW2ldO1xuICAgICAgICB1dGlscy5sb2coIGtleSAgKyBcIjogXCIgKyBuZXh0TW9udGhSZXN1bHRzW2tleV0pO1xuICAgICAgICB0aGlzUm93LnB1c2gobmV4dE1vbnRoUmVzdWx0c1trZXldKTtcbiAgICAgIH1cblxuICAgICAgY3VycmVudE1vbnRoUmVzdWx0cyA9IG5leHRNb250aFJlc3VsdHM7XG4gICAgICByb3dzLnB1c2godGhpc1Jvdyk7XG4gICAgfVxuXG4gICAgdGhpcy5pby5kdW1wKHJvd3MpO1xuXG4gICAgcmV0dXJuIHJvd3M7XG59XG5cbmZ1bmN0aW9uIHNpbmdsZVN0ZXAocGxhbnRhdGlvbiwgc29pbCwgd2VhdGhlciwgbWFuYWdlLCBwKSB7IC8vcCA9IHByZXZpb3VzIHN0YXRlXG4gIHZhciBjID0ge307IC8vY3VycmVudCBzdGF0ZVxuXG4gIGlmKCBtYW5hZ2UuY29wcGljZSA9PT0gdHJ1ZSApIHsgLy9jaGFuZ2UgdGhpcyBndXkgZm9yIHRoZSBtb250aCB3aGVuIGNvcHBpY2VcbiAgICAvLyBBZGQgaW4gYSBzdHVtcCBtYXJnaW4uLi4uXG4gICAgYy5mZWVkc3RvY2tIYXJ2ZXN0ID0gcC5mZWVkc3RvY2tIYXJ2ZXN0ICsgcC5XUztcbiAgICBjLmNvcHBpY2VDb3VudCA9IHAuY29wcGljZUNvdW50ICsgMTtcbiAgICBjLmNvcHBpY2VBZ2UgPSAwO1xuICAgIHAuTEFJPTA7XG4gICAgcC5XUyA9IDA7XG4gICAgcC5XRiA9IDA7XG4gICAgcC5XID0gcC5XUjtcbiAgfSBlbHNlIHtcbiAgICBjLmZlZWRzdG9ja0hhcnZlc3QgPSBwLmZlZWRzdG9ja0hhcnZlc3Q7XG4gICAgYy5jb3BwaWNlQ291bnQgPSBwLmNvcHBpY2VDb3VudDtcbiAgICBjLmNvcHBpY2VBZ2UgPSBwLmNvcHBpY2VBZ2UgKyAxLjAvMTI7XG4gIH1cblxuICB2YXIgdHJlZTsgLy90cmVlXG4gIGlmKCBjLmNvcHBpY2VDb3VudCA9PT0gMCApIHsgLy9UT0RPOiBjaGVjayB0aGUgY2FzZSB3aGVyZSB3ZSBzdGFydCB3aXRoIGEgY29wcGljZWQgbXVsdGkgc3R1bXAgdHJlZVxuICAgICAgdHJlZSA9IHBsYW50YXRpb24uc2VlZGxpbmdUcmVlO1xuICB9IGVsc2Uge1xuICAgICAgdHJlZSA9IHBsYW50YXRpb24uY29wcGljZWRUcmVlO1xuICB9XG5cbiAgYy5TdGFuZEFnZSA9IHAuU3RhbmRBZ2UrMS4wLzEyO1xuICB2YXIgc2xhID0gZm4udGRwKHAuU3RhbmRBZ2UsdHJlZS5TTEEpO1xuICBjLkxBSSA9IHAuV0YgKiAwLjEgKiBzbGE7IC8vIExhbmRzYnVyZyBlcSA5LjVcbiAgYy5WUEQgPSBmbi5WUEQod2VhdGhlci50bWluLCB3ZWF0aGVyLnRtYXgsIHdlYXRoZXIudGRtZWFuKTtcbiAgYy5mVlBEID0gZm4uZlZQRCh0cmVlLmtHLCBjLlZQRCk7XG5cbiAgYy5mU1cgPSBmbi5mU1cocC5BU1csIHNvaWwubWF4QVdTLCBzb2lsLnN3Y29uc3QsIHNvaWwuc3dwb3dlcik7XG4gIGMuZkFnZT1mbi50ZHAocC5TdGFuZEFnZSx0cmVlLmZBZ2UpO1xuICBjLmZGcm9zdCA9IGZuLmZGcm9zdCh3ZWF0aGVyLnRtaW4pO1xuICBjLlBBUiA9IGZuLlBBUih3ZWF0aGVyLnJhZCk7XG4gIGMuZlQgPSBmbi5mVCgod2VhdGhlci50bWluK3dlYXRoZXIudG1heCkvMiwgdHJlZS5mVCk7XG4gIGMueFBQID0gZm4ueFBQKHRyZWUueSwgYy5QQVIpO1xuICBjLlBoeXNNb2QgPSBmbi5QaHlzTW9kKGMuZlZQRCwgYy5mU1csIGMuZkFnZSk7XG4gIGMuZk51dHI9Zm4uZk51dHIodHJlZS5mTjAsIG1hbmFnZS5mZXJ0aWxpdHkpO1xuICBjLk5QUCA9IGZuLk5QUChwLmNvcHBpY2VBZ2UsIHRyZWUuZnVsbENhbkFnZSwgYy54UFAsIHRyZWUuaywgcC5MQUksIGMuZlZQRCwgYy5mU1csIGMuZkFnZSwgdHJlZS5hbHBoYSwgYy5mTnV0ciwgYy5mVCwgYy5mRnJvc3QpO1xuXG4gIHZhciBOUFBfdGFyZ2V0ID0gZm4uTlBQKHRyZWUuZnVsbENhbkFnZSwgdHJlZS5mdWxsQ2FuQWdlLCBjLnhQUCwgdHJlZS5rLCB0cmVlLnJvb3RQLkxBSVRhcmdldCwgYy5mVlBELCBjLmZTVywgYy5mQWdlLCB0cmVlLmFscGhhLCBjLmZOdXRyLCBjLmZULCBjLmZGcm9zdCk7XG4gIGMuUm9vdFAgPSBmbi5jb3BwaWNlLlJvb3RQKGMuTlBQLCBOUFBfdGFyZ2V0LCBwLldSLCBwLlcsIHRyZWUucFIubXgsdHJlZS5yb290UC5mcmFjKTtcblxuICBpZiAodHJlZS5sYVZJICYmIHRyZWUubGFWSS5jb25zdGFudCApIHsgLy8gVGVzdCBmb3IgdGhhdCBmdW5jdGlvblxuICAgIGMucGZzID0gZm4uY29wcGljZS5wZnNfdmlhX1ZJKHAuV1MqMTAwMDAwMC9wbGFudGF0aW9uLlN0b2NraW5nRGVuc2l0eSwgdHJlZS53c1ZJLHRyZWUubGFWSSxzbGEpO1xuICB9IGVsc2Uge1xuICAgIGMucGZzID0gZm4uY29wcGljZS5wZnMocC5XUyoxMDAwL3BsYW50YXRpb24uU3RvY2tpbmdEZW5zaXR5LCB0cmVlLnBmcyk7XG4gIH1cblxuICBjLmRXID0gYy5OUFArdHJlZS5yb290UC5lZmZpY2llbmN5KmMuUm9vdFA7XG5cbiAgYy5JbnRjcHRuID0gZm4uSW50Y3B0bihjLkxBSSwgdHJlZS5JbnRjcHRuKTtcbiAgYy5DYW5Db25kID0gZm4uQ2FuQ29uZChjLlBoeXNNb2QsIGMuTEFJLCB0cmVlLkNvbmR1Y3RhbmNlKTtcblxuICBjLnBSID0gZm4ucFIoYy5QaHlzTW9kLHAuV1IvcC5XLG1hbmFnZS5mZXJ0aWxpdHksdHJlZS5wUik7XG4gIGMubGl0dGVyZmFsbD1mbi50ZHAocC5TdGFuZEFnZSx0cmVlLmxpdHRlcmZhbGwpO1xuXG4gIGMuVHJhbnNwID0gZm4uVHJhbnNwKHdlYXRoZXIucmFkLCB3ZWF0aGVyLmRheWxpZ2h0LCBjLlZQRCwgdHJlZS5CTGNvbmQsIGMuQ2FuQ29uZCk7XG5cbiAgLy8gQ2FsY3VsYXRlZCBmcm9tIHBmc1xuICBjLnBTID0gKDEgLSBjLnBSKSAvICgxICsgYy5wZnMgKTtcbiAgYy5wRiA9ICgxIC0gYy5wUikgLyAoMSArIDEvYy5wZnMgKTtcblxuICBjLklycmlnID0gZm4uSXJyaWcobWFuYWdlLmlycmlnRnJhYywgYy5UcmFuc3AsIGMuSW50Y3B0biwgd2VhdGhlci5wcHQpO1xuICBjLkN1bUlycmlnID0gcC5DdW1JcnJpZyArIGMuSXJyaWc7XG5cbiAgYy5BU1cgPSBmbi5BU1coc29pbC5tYXhBV1MsIHAuQVNXLCB3ZWF0aGVyLnBwdCwgYy5UcmFuc3AsIGMuSW50Y3B0biwgYy5JcnJpZyk7IC8vZm9yIHNvbWUgcmVhc29uIHNwZWxsZWQgbWF4QVdTXG5cbiAgYy5XRiA9IHAuV0YgKyBjLmRXICogYy5wRiAtIGMubGl0dGVyZmFsbCAqIHAuV0Y7XG4gIC8vIEluY2x1ZGUgY29udHJpYnV0aW9uIG9mIFJvb3RQIC8vIEVycm9yIGluIG9sZCBjb2RlICFcbiAgYy5XUiA9IHAuV1IgKyBjLmRXICogYy5wUiAtIHRyZWUucFIudHVybm92ZXIgKiBwLldSIC0gYy5Sb290UDtcbiAgYy5XUyA9IHAuV1MgKyBjLmRXICogYy5wUztcbiAgYy5XID0gYy5XRitjLldSK2MuV1M7XG5cbiAgcmV0dXJuIGM7XG59XG5cbmZ1bmN0aW9uIGluaXQocGxhbnRhdGlvbiwgc29pbCkge1xuICB2YXIgcCA9IHt9O1xuICB2YXIgdHJlZSA9IHBsYW50YXRpb24uc2VlZGxpbmdUcmVlOyAvL1RPRE86IGRlY2lkZSB0aGUgY2FzZSB3aGVyZSB3ZSBzdGFydCB3aXRoIGEgY29wcGljZWQgdHJlZT9cblxuICBwLmZlZWRzdG9ja0hhcnZlc3Q9MDtcbiAgcC5jb3BwaWNlQ291bnQ9MDtcbiAgcC5jb3BwaWNlQWdlID0gMDtcblxuICBwLkN1bUlycmlnID0wO1xuICBwLmRXID0gMDtcbiAgcC5XID0gdGhpcy5wbGFudGF0aW9uLlN0b2NraW5nRGVuc2l0eSAqIHRoaXMucGxhbnRhdGlvbi5TZWVkbGluZ01hc3M7XG4gIHAuV0YgPSB0aGlzLnBsYW50YXRpb24ucEYgKiBwLldcbiAgcC5XUyA9IHRoaXMucGxhbnRhdGlvbi5wUyAqIHAuVztcbiAgcC5XUiA9IHRoaXMucGxhbnRhdGlvbi5wUiAqIHAuVztcbiAgcC5BU1cgPSAwLjggKiAxMCAqIHRoaXMuc29pbC5tYXhBV1M7IC8vIFRoZSAxMCBpcyBiZWNhdXNlIG1heEFXUyBpcyBpbiBjbSBhbmQgQVNXIGluIG1tICg/KSBXaHkgKD8pXG4gIHAuU3RhbmRBZ2UgPSAwO1xuXG4gIHZhciB0cmVlID0gdGhpcy5wbGFudGF0aW9uLnNlZWRsaW5nVHJlZTtcblxuICAvLyBzbGEgPSBTcGVjaWZpYyBMZWFmIEFyZWFcbiAgdmFyIHNsYSA9IGZuLnRkcChwLlN0YW5kQWdlLHRyZWUuU0xBKTtcblxuICBwLkxBSSA9IHAuV0YgKiAwLjEgKiBzbGE7IC8vIExhbmRzYnVyZyBlcSA5LjVcblxuICAvLyBUaGVzZSBhcmVuJ3QgdXNlZCBzbyBjYW4gYmUgc2V0IHRvIGFueXRoaW5nOyAgVGhleSBhcmUgc2V0IHRvIG1hdGNoIHRoZSBwb3N0Z3JlcyB0eXBlXG4gIHAuVlBEPTA7XG4gIHAuZlZQRD0wO1xuICBwLmZUID0wO1xuICBwLmZGcm9zdCA9IDA7XG4gIHAuZk51dHI9MDtcbiAgcC5mU1c9MDtcbiAgcC5mQWdlPTA7XG4gIHAuUEFSID0gMDtcbiAgcC54UFAgPSAwO1xuICBwLkludGNwdG4gPSAwO1xuICBwLklycmlnID0gMDtcbiAgcC5DYW5Db25kID0gMDtcbiAgcC5UcmFuc3AgPSAwO1xuICBwLlBoeXNNb2QgPSAwO1xuICBwLnBmcyA9IDA7XG4gIHAucFI9MDtcbiAgcC5wUz0wO1xuICBwLnBGPTA7XG4gIHAubGl0dGVyZmFsbCA9IDA7XG4gIHAuTlBQID0gMDtcbiAgcC5Sb290UCA9IDA7XG4gIHJldHVybiBwO1xufTtcblxuZnVuY3Rpb24gZ2V0RnVuY3Rpb24obmFtZSkge1xuICBpZiggZm5bbmFtZV0gKSByZXR1cm4gZm5bbmFtZV07XG4gIGlmKCBmbi5jb3BwaWNlW25hbWVdICkgcmV0dXJuIGZuLmNvcHBpY2VbbmFtZV07XG4gIHJldHVybiBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlvKSB7XG4gIHJldHVybiB7XG4gICAgaW8gOiBpbyxcbiAgICBydW4gOiBydW4sXG4gICAgc2luZ2xlU3RlcCA6IHNpbmdsZVN0ZXAsXG4gICAgcnVuU2V0dXAgOiBydW5TZXR1cCxcbiAgICBpbml0IDogaW5pdCxcbiAgICBnZXRGdW5jdGlvbiA6IGdldEZ1bmN0aW9uLFxuICAgIHNldElPIDogZnVuY3Rpb24oaW8pIHtcbiAgICAgIHRoaXMuaW8gPSBpbztcbiAgICB9LFxuICAgIGdldERhdGFNb2RlbCA6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGRhdGFNb2RlbDtcbiAgICB9XG4gIH07XG59O1xuIiwiZnVuY3Rpb24gZW52KCkge1xuICBpZiggdHlwZW9mIHBsdjggIT09ICd1bmRlZmluZWQnICkgcmV0dXJuIFwicGx2OFwiO1xuICBpZiggdHlwZW9mIExvZ2dlciAhPT0gJ3VuZGVmaW5lZCcgKSByZXR1cm4gXCJhcHBzY3JpcHRcIjtcbiAgaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSByZXR1cm4gXCJub2RlXCI7XG59XG5cbmZ1bmN0aW9uIGxvZyhtc2cpIHtcbiAgaWYoIGVudigpID09IFwicGx2OFwiICkgcGx2OC5lbG9nKE5PVElDRSwgJ25vdGljZScsIG1zZyk7XG4gIGlmKCBlbnYoKSA9PSBcImFwcHNjcmlwdFwiICkgTG9nZ2VyLmxvZyhtc2cpO1xufVxuXG5mdW5jdGlvbiBjbG9uZShvYmopIHtcbiAgaWYgKG51bGwgPT0gb2JqIHx8IFwib2JqZWN0XCIgIT0gdHlwZW9mIG9iaikgcmV0dXJuIG9iajtcbiAgdmFyIGNvcHkgPSBvYmouY29uc3RydWN0b3IoKTtcbiAgZm9yICh2YXIgYXR0ciBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGF0dHIpKSBjb3B5W2F0dHJdID0gb2JqW2F0dHJdO1xuICB9XG4gIHJldHVybiBjb3B5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZW52IDogZW52LFxuICBsb2cgOiBsb2csXG4gIGNsb25lIDogY2xvbmVcbn1cbiJdfQ==
