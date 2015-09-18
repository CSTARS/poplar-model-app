(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PoplarApp = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var gdrive = require('./gdrive');
var charts;
var inputForm;
var exporter = require('./export');
var offline = require('./offline');

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
  return _3pgModel;
}

var getOutputs = function() {
  return outputs;
}

var outputDefinitions = {
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



function qs(key) {
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&");
  var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

var loadModelCode = function(version, callback) {

  if (typeof version === 'function') callback = version;
  if (!version || typeof version != 'string') version = "master";

  _requestModelCode(
      "https://api.github.com/repos/CSTARS/AHB-PNW/contents/models/3pg/js/Model3PG.js?ref="+ version,
      function(data) {
          // clean then base64 decode file content
          // finally, eval js
          eval(atob(data.content.replace(/[\s\n]/g, '')));

          // set m3PG object to window scope
          window.m3PG = m3PG;

          _requestModelCode(
              "https://api.github.com/repos/CSTARS/AHB-PNW/contents/models/3pg/js/SingleRunFunctions.js?ref="+ version,
              function(data) {
                  eval(atob(data.content.replace(/[\s\n]/g, '')));
                  window.m3PGFunc = m3PGFunc;
                  _requestModelCode(
                      "https://api.github.com/repos/CSTARS/AHB-PNW/contents/models/3pg/js/DataModel.js?ref="+ version,
                      function(data) {
                          eval(atob(data.content.replace(/[\s\n]/g,'')));
                          _3pgModel = model;
                          callback();
                      }
                  );
              }
          );
      }
  );
}


// github only allows 60 public requests per ip per hour. so let's cache
// code in localstorage for one hour
var _requestModelCode = function(url, callback) {
  // see if it's cached
  if (localStorage[url]) {
      var time = localStorage["_timestamp_" + url];
      // if the cache is less than an hour old, use cached copy
      if (new Date().getTime() - parseInt(time) < 60000 * 60) {
          return callback(JSON.parse(localStorage[url]));
      }
  }

  $.ajax({
      url : url,
      success : function(data, status, xhr) {
          // cache for later
          localStorage[url] = JSON.stringify(data);
          localStorage["_timestamp_" + url] = new Date().getTime();
          callback(data);
      },
      error : function() {
          // if we fail to access github but have a local copy of the code, just roll w/ that
          if ( localStorage[url] ) return callback(JSON.parse(localStorage[url]));

          // else fail :/
          alert("Failed to load " + url + " from github, no local copied found either :/");
          callback();
      }
  });
};

var init = function(callback) {
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
          weatherCustomChart = charts.createWeatherChart($('#custom-weather-chart')[0], window.custom_weather);
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
      window.variations = {};
      m3PGIO.readFromInputs();

      // make sure we are only setting 2 variation parameters
      var params = [];
      for( var key in window.variations ) params.push(key);
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
          m3PG.run(monthsToRun());

      } else {
          ga('send', 'event', 'ui', 'interaction', 'model-run-variation', 1);

          // set variation order
          var runs = [];
          for( var i = 0; i < window.variations[params[0]].length; i++ ) {
              var obj = {
                  inputs : {},
                  output : null
              }
              obj.inputs[params[0]] = window.variations[params[0]][i];
              if( params.length > 1 ) {
                  for( var j = 0; j < window.variations[params[1]].length; j++ ) {
                      var t = $.extend(true, {}, obj);
                      t.inputs[params[1]] = window.variations[params[1]][j];
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
          for( var key in window.variations ) {
              $("#input-"+key.replace(/\./g, '-')).val(window.variations[key].join(", "));
          }
          showResults(runs);
      } else {
          runVariation(index, runs);
      }
  }

  m3PG.run(monthsToRun());
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
      if( !window.custom_weather ) {
          hasCoverage = false;
          break;
      }

      var m = (cDate.getMonth()+1)+'';
      var y = cDate.getFullYear();
      if( m.length == 1 ) m = '0'+m;

      if( cDate.getMonth()+1 == eMonth && y == eYear ) {
          break;
      } else if( !window.custom_weather[y+'-'+m] ) {
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
  if( !window.custom_weather ) window.custom_weather = {};

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

          window.custom_weather[date] = data[key];
      }
  }

  // create array so we can sort
  var arr = [];
  var headers = ['date'];
  for( var date in window.custom_weather ) {

      var t = [date];
      for( var key in window.custom_weather[date] ) {
          if( key == 'nrel' ) continue;
          if( arr.length == 0 ) headers.push(key);
          t.push(window.custom_weather[date][key]);
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
      console.log(3);
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
      weatherCustomChart = charts.createWeatherChart($('#custom-weather-chart')[0], window.custom_weather);
  }, 1000);

}

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
      config : m3PGIO.exportSetup(),
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
}


// Special Sauce...
// basically the code loaded from GitHub expects the following to exists in the window scope
//   m3PGIO
//     - readAllContants
//     - readWeather
//     - dump
//     - readFromInputs
// So we inject functions that interact w/ our UI, model in no way cares
m3PGIO = {
  readAllConstants : function(plantation) {
      this.readFromInputs();

      for ( var key in window.plantation)
          plantation[key] = window.plantation[key];
      plantation.coppicedTree = window.tree;

      // setup seedling Tree
      // TODO: hardcoded for now, this shouldn't be
      plantation.seedlingTree = $.extend(true, {}, window.tree);
      plantation.seedlingTree.stemsPerStump = 1;
      plantation.seedlingTree.pfs.stemCnt = 1;
      plantation.seedlingTree.rootP = {
          LAITarget : 10,
          efficiency : 0.6,
          frac : 0.01
      }

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

      window.plantingParams = plantingParams;

      for ( var i = 0; i < 12; i++) {
          var item = {
              month : (i + 1)
          };
          for ( var j = 1; j < inputs.weather.length; j++) {
              var c = inputs.weather[j];
              item[c] = this._readVal($("#input-weather-" + c + "-" + i));
          }
          item.nrel = item.rad / 0.0036;

          weatherMap[i] = item;
      }

      window.weather = weatherMap;

      if( window.custom_weather ) {
          for( var date in window.custom_weather ) {
              window.custom_weather[date].nrel = window.custom_weather[date].rad / 0.0036;
              customWeatherMap[date] = window.custom_weather[date];
          }
      }

      return weatherMap;
  },
  dump : function(rows, sheet) {
      // set the raw output
      runComplete(rows);
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
          window.variations[id] = [];
          for( var i = 0; i < val.length; i++ ) {
              window.variations[id].push(parseFloat(val[i]));
          }
          return window.variations[id][0];
      }
      return parseFloat(val);
  },
  readFromInputs : function() {
      // read soil
      window.soil = {};
      window.soil.maxAWS = this._readVal($("#input-soil-maxaws"));
      window.soil.swpower = this._readVal($("#input-soil-swpower"));
      window.soil.swconst = this._readVal($("#input-soil-swconst"));

      // read manage
      window.manage = {
          coppice : false
      };
      var eles = $(".manage");
      for ( var i = 0; i < eles.length; i++) {
          var ele = $(eles[i]);
          window.manage[ele.attr("id").replace("input-manage-", "")] = this._readVal(ele);
      }

      // read plantation
      window.plantation = {};
      eles = $(".plantation");
      for ( var i = 0; i < eles.length; i++) {
          var ele = $(eles[i]);
          window.plantation[ele.attr("id").replace("input-plantation-", "")] = this._readVal(ele);
      }

      // read tree
      var treeInputs = $(".tree");
      window.tree = {};
      for ( var i = 0; i < treeInputs.length; i++) {
          var ele = $(treeInputs[i]);

          var parts = ele.attr("id").replace("input-tree-", "").split("-");
          if (parts.length == 1) {
              window.tree[parts[0]] = this._readVal(ele);
          } else {
              if (!window.tree[parts[0]])
                  window.tree[parts[0]] = {};
              window.tree[parts[0]][parts[1]] = this._readVal(ele);
          }
      }

      // read plantation state
      window.plantation_state = {};
      for ( var key in _3pgModel.plantation_state.value) {
          window.plantation_state[key] = -1;
      }

  },
  exportSetup : function() {
      window.variations = {};
      this.readFromInputs();
      this.readWeather([], {}, {});

      var ex = {
          weather : window.weather,
          custom_weather : window.custom_weather,
          tree : window.tree,
          plantation : window.plantation,
          manage : window.manage,
          soil : window.soil,
          plantingParams : window.plantingParams,
          plantation_state : window.plantation_state,
          config : {
              chartTypeInput : $("#chartTypeInput").val(),
              monthsToRun : monthsToRun(),
              currentLocation : $("#current-location").html(),
              loadedTree : $("#loaded-tree-name").html(),
              version : qs("version") ? qs("version") : "master"
          }
      }

      // by default the read function set the variations variables but only
      // returns the first, set the variation params to their correct values
      for( var key in window.variations ) {
          var parts = key.split(".");
          var param = ex;
          for( var i = 0; i < parts.length-1; i++ ) {
              param = param[parts[i]];
          }
          param[parts[parts.length-1]] = window.variations[key].join(", ");
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

      // first, if the version is off, we need to reload the entire app
      if (setup.config.version) {
          var cversion = qs("version") ? qs("version") : "master";
          if (cversion != setup.config.version) {
              window.location = window.location.href.replace(/#.*/, '')
                      + "?version=" + setup.config.version + "&file="
                      + fileid;
          }
      }

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
          window.custom_weather = setup.custom_weather;
      } else {
          window.custom_weather = {};
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

      runModel(isRt);
  }
};

module.exports = {
  init : init,
  outputs : outputs,
  getModel : getModel,
  runModel : runModel,
  showRawOutput : showRawOutput,
  outputDefinitions : outputDefinitions,
  qs : qs,
  loadModelCode : loadModelCode,
  setWeather : setWeather,
	gdrive : gdrive
};

},{"./charts":2,"./export":3,"./flashBlock-detector":4,"./gdrive":5,"./inputForm":7,"./offline":9}],2:[function(require,module,exports){
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
  if( m3PGFunc[fName] || m3PGFunc.coppice[fName] || desc.fn ) {
      if( !hasDesc ) label += "<div style='font-size:11px'>";
      label += " <a style='font-style:normal;cursor:pointer' datatarget='fn-desc-"+val+"' class='fn-toggle'>fn()</a></div>";

      label += "<div id='fn-desc-"+val+"' style='display:none;font-size:11px;overflow:auto' class='well well-sm'>"+
                  (m3PGFunc[fName]||m3PGFunc.coppice[fName]||desc.fn).toString().replace(/ /g,'&nbsp;').replace(/\n/g,'<br />')+"</div>";
  } else if ( hasDesc ) {
      label += "</div>"
  }

  // TODO: add fn well
  return label+"<br />"
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

},{"./gdriveRT":6,"./oauth":8}],6:[function(require,module,exports){
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
  for( var attr in app.getModel().weather ) {
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

      var inputs = $.extend(true, {}, app.getModel());

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

},{"./charts":2,"./gdrive":5,"./offline":9,"./weatherFileReader":10}],8:[function(require,module,exports){

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

},{}],9:[function(require,module,exports){
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

},{"./app":1}],10:[function(require,module,exports){
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

},{"./app":1}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc2xpYi9hcHAuanMiLCJqc2xpYi9jaGFydHMuanMiLCJqc2xpYi9leHBvcnQuanMiLCJqc2xpYi9mbGFzaEJsb2NrLWRldGVjdG9yLmpzIiwianNsaWIvZ2RyaXZlLmpzIiwianNsaWIvZ2RyaXZlUlQuanMiLCJqc2xpYi9pbnB1dEZvcm0uanMiLCJqc2xpYi9vYXV0aC5qcyIsImpzbGliL29mZmxpbmUuanMiLCJqc2xpYi93ZWF0aGVyRmlsZVJlYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2w5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3QrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqaUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3piQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBnZHJpdmUgPSByZXF1aXJlKCcuL2dkcml2ZScpO1xudmFyIGNoYXJ0cztcbnZhciBpbnB1dEZvcm07XG52YXIgZXhwb3J0ZXIgPSByZXF1aXJlKCcuL2V4cG9ydCcpO1xudmFyIG9mZmxpbmUgPSByZXF1aXJlKCcuL29mZmxpbmUnKTtcblxudmFyIHJ1bkNhbGxiYWNrID0gbnVsbDtcbnZhciBfM3BnTW9kZWwgPSBudWxsO1xuXG52YXIgaW5wdXRzID0ge1xuXHR3ZWF0aGVyIDogW1wibW9udGhcIixcInRtaW5cIixcInRtYXhcIixcInRkbWVhblwiLFwicHB0XCIsXCJyYWRcIixcImRheWxpZ2h0XCJdXG59O1xudmFyIG91dHB1dHMgPSBbXCJWUERcIixcImZWUERcIixcImZUXCIsXCJmRnJvc3RcIixcIlBBUlwiLFwieFBQXCIsXCJJbnRjcHRuXCIsXCJBU1dcIixcIkN1bUlycmlnXCIsXG4gICAgICAgICAgIFwiSXJyaWdcIixcIlN0YW5kQWdlXCIsXCJMQUlcIixcIkNhbkNvbmRcIixcIlRyYW5zcFwiLFwiZlNXXCIsXCJmQWdlXCIsXG4gICAgICAgICAgIFwiUGh5c01vZFwiLFwicFJcIixcInBTXCIsXCJsaXR0ZXJmYWxsXCIsXCJOUFBcIixcIldGXCIsXCJXUlwiLFwiV1NcIixcIldcIl07XG52YXIgZGVidWcgPSBmYWxzZTtcbnZhciBkZXZtb2RlID0gZmFsc2U7XG5cbnZhciB3ZWF0aGVyQ3VzdG9tQ2hhcnQgPSBudWxsO1xuXG4vLyByb3cgcmF3IGRhdGEgZG9lcyBhIGxvdCBvZiBwcm9jZXNzaW5nIG9mIHRoZSByZXN1bHRzIGFuZCB0aGUgY3VycmVudCBzdGF0ZSBvZiB3aGF0J3Ncbi8vIGJlaW5nIGRpc3BsYXllZC4gIEdvIGFoZWFkIGFuIHNldHVwIHRoZSBjc3YgZGF0YSBhdCB0aGlzIHBvaW50LCB0aGVuIGlmIHRoZSB1c2VyXG4vLyBkZWNpZGVzIHRvIGV4cG9ydCwgd2UgYXJlIGFsbCBzZXQgdG8gdG87XG52YXIgY3N2UmVzdWx0cyA9IG51bGw7XG5cbnZhciBnZXRNb2RlbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gXzNwZ01vZGVsO1xufVxuXG52YXIgZ2V0T3V0cHV0cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gb3V0cHV0cztcbn1cblxudmFyIG91dHB1dERlZmluaXRpb25zID0ge1xuICBWUEQgOiB7XG4gICAgICBsYWJlbCA6IFwiTWVhbiBWYXBvciBQcmVzc3VyZSBEZWZpY2l0XCIsXG4gICAgICB1bml0cyA6IFwia1BBXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwidGhlIGRpZmZlcmVuY2UgKGRlZmljaXQpIGJldHdlZW4gdGhlIGFtb3VudCBvZiBtb2lzdHVyZSBpbiB0aGUgYWlyIGFuZCBob3cgbXVjaCBcIiArXG4gICAgICBcdFx0XCJtb2lzdHVyZSB0aGUgYWlyIGNhbiBob2xkIHdoZW4gaXQgaXMgc2F0dXJhdGVkXCJcbiAgfSxcbiAgZlZQRCA6IHtcbiAgICAgIGxhYmVsIDogXCJWYXBvciBQcmVzc3VyZSBEZWZpY2l0IE1vZGlmaWVyXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBIGVudmlyb25tZW50YWwgZmFjdG9yIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIGZUIDoge1xuICAgICAgbGFiZWwgOiBcIlRlbXBlcmF0dXJlIE1vZGlmaWVyXCIsXG4gICAgICB1bml0cyA6IFwidW5pdGxlc3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJBIGVudmlyb25tZW50YWwgZmFjdG9yIGdyb3d0aCBtb2RpZmllclwiXG4gIH0sXG4gIGZGcm9zdCA6IHtcbiAgICAgIGxhYmVsIDogXCJGcm9zdCBNb2RpZmllclwiLFxuICAgICAgdW5pdHMgOiBcInVuaXRsZXNzXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiTnVtYmVyIG9mIGZyb3N0IGRheXMgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgUEFSIDoge1xuICAgICAgbGFiZWwgOiBcIk1vbnRobHkgUGhvdG9zeW50aGV0aWNhbGx5IEFjdGl2ZSBSYWRpYXRpb25cIixcbiAgICAgIHVuaXRzIDogXCJtb2xzIC8gbV4yIG1vbnRoXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiRGVzaWduYXRlcyB0aGUgc3BlY3RyYWwgcmFuZ2UgKHdhdmUgYmFuZCkgb2Ygc29sYXIgcmFkaWF0aW9uIGZyb20gNDAwIHRvIDcwMCBuYW5vbWV0ZXJzIFwiICtcbiAgICAgIFx0XHRcInRoYXQgcGhvdG9zeW50aGV0aWMgb3JnYW5pc21zIGFyZSBhYmxlIHRvIHVzZSBpbiB0aGUgcHJvY2VzcyBvZiBwaG90b3N5bnRoZXNpc1wiXG4gIH0sXG4gIHhQUCA6IHtcbiAgICAgIGxhYmVsIDogXCJNYXhpbXVtIFBvdGVudGlhbCBQcmltYXJ5IFByb2R1Y3Rpb25cIixcbiAgICAgIHVuaXRzIDogXCJNZXRyaWMgVG9ucyBEcnkgTWF0dGVyL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgSW50Y3B0biA6IHtcbiAgICAgIGxhYmVsIDogXCJDYW5vcHkgUmFpbmZhbGwgSW50ZXJjZXB0aW9uXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiUHJlY2lwaXRhdGlvbiB0aGF0IGRvZXMgbm90IHJlYWNoIHRoZSBzb2lsLCBidXQgaXMgaW5zdGVhZCBpbnRlcmNlcHRlZCBieSB0aGUgbGVhdmVzIGFuZCBicmFuY2hlcyBvZiBwbGFudHMgYW5kIHRoZSBmb3Jlc3QgZmxvb3IuXCJcbiAgfSxcbiAgQVNXIDoge1xuICAgICAgbGFiZWwgOiBcIkF2YWlsYWJsZSBTb2lsIFdhdGVyXCIsXG4gICAgICB1bml0cyA6IFwibW1cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBDdW1JcnJpZyA6IHtcbiAgICAgIGxhYmVsIDogXCJDdW11bGF0aXZlIFJlcXVpcmVkIElycmlnYXRpb25cIixcbiAgICAgIHVuaXRzIDogXCJtbS9tb25cIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBJcnJpZyA6IHtcbiAgICAgIGxhYmVsIDogXCJSZXF1aXJlZCBJcnJpZ2F0aW9uXCIsXG4gICAgICB1bml0cyA6IFwibW0vbW9uXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgU3RhbmRBZ2UgOiB7XG4gICAgICBsYWJlbCA6IFwiU3RhbmQgQWdlXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgTEFJIDoge1xuICAgICAgbGFiZWwgOiBcIkxlYWYgQXJlYSBJbmRleFwiLFxuICAgICAgdW5pdHMgOiBcIm0yIC8gbTJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJUaGUgb25lLXNpZGVkIGdyZWVuIGxlYWYgYXJlYSBwZXIgdW5pdCBncm91bmQgc3VyZmFjZSBhcmVhXCJcbiAgfSxcbiAgQ2FuQ29uZCA6IHtcbiAgICAgIGxhYmVsIDogXCJDYW5vcHkgQ29uZHVjdGFuY2VcIixcbiAgICAgIHVuaXRzIDogXCJnYyxtL3NcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIlxuICB9LFxuICBUcmFuc3AgOiB7XG4gICAgICBsYWJlbCA6IFwiQ2Fub3B5IE1vbnRobHkgVHJhbnNwaXJhdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIm1tL21vblwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIldhdGVyIG1vdmVtZW50IHRocm91Z2ggYSBwbGFudCBhbmQgaXRzIGV2YXBvcmF0aW9uIGZyb20gYWVyaWFsIHBhcnRzXCJcbiAgfSxcbiAgZlNXIDoge1xuICAgICAgbGFiZWwgOiBcIlNvaWwgV2F0ZXIgTW9kaWZpZXJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkEgZW52aXJvbm1lbnRhbCBmYWN0b3IgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgZkFnZSA6IHtcbiAgICAgIGxhYmVsIDogXCJTdGFuZCBhZ2VcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkEgZW52aXJvbm1lbnRhbCBmYWN0b3IgZ3Jvd3RoIG1vZGlmaWVyXCJcbiAgfSxcbiAgUGh5c01vZCA6IHtcbiAgICAgIGxhYmVsIDogXCJcIixcbiAgICAgIHVuaXRzIDogXCJ1bml0bGVzc1wiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlBoeXNpb2xvZ2ljYWwgTW9kaWZpZXIgdG8gQ2Fub3B5IENvbmR1Y3RhbmNlXCJcbiAgfSxcbiAgcFIgOiB7XG4gICAgICBsYWJlbCA6IFwiXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiQWxvbmcgd2l0aCBhIFBoeXNpb2xvZ2lhbCBwYXJhbWV0ZXIsIHNwZWNpZmllcyB0aGUgYW1vdW50IG9mIG5ldyBncm93dGggYWxsb2NhdGVkIHRvIHRoZSByb290IHN5c3RlbSwgYW5kIHRoZSB0dXJub3ZlciByYXRlLlwiXG4gIH0sXG4gIHBTIDoge1xuICAgICAgbGFiZWwgOiBcIlwiLFxuICAgICAgdW5pdHMgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIkRlZmluZXMgdGhlIGZvbGlhZ2UgdG8gc3RlbSAoV0YvV1MpIGZyYWN0aW9uIGluIGFsbG9jYXRpbmcgYWJvdmVncm91bmQgYmlvbWFzcyBvZiB0aGUgdHJlZVwiXG4gIH0sXG4gIGxpdHRlcmZhbGwgOiB7XG4gICAgICBsYWJlbCA6IFwiXCIsXG4gICAgICB1bml0cyA6IFwiXCIsXG4gICAgICBkZXNjcml0aW9uIDogXCJcIixcbiAgICAgIGFsdEZuTmFtZSA6IFwidGRwXCJcbiAgfSxcbiAgTlBQIDoge1xuICAgICAgbGFiZWwgOiBcIk5ldCBDYW5vcHkgUHJvZHVjdGlvblwiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCJcbiAgfSxcbiAgV0YgOiB7XG4gICAgICBsYWJlbCA6IFwiTGVhZiBCaW9tYXNzXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIixcbiAgICAgIGZuIDogZnVuY3Rpb24ocHJlX1dGLCBjdXJfZFcsIGN1cl9wRiwgY3VyX2xpdHRlcmZhbGwsIHByZXZfV0YpIHtcbiAgICAgICAgICByZXR1cm4gcHJldl9XRiArIGN1cl9kVyAqIGN1cl9wRiAtIGN1cl9saXR0ZXJmYWxsICogcHJldl9XRlxuICAgICAgfVxuICB9LFxuICBXUiA6IHtcbiAgICAgIGxhYmVsIDogXCJSb290IEJpb21hc3NcIixcbiAgICAgIHVuaXRzIDogXCJNZy9oYVwiLFxuICAgICAgZGVzY3JpcHRpb24gOiBcIlwiLFxuICAgICAgZm4gOiBmdW5jdGlvbihwcmV2X1dSLCBjdXJfZFcsIGN1cl9wUiwgdHVybm92ZXIsIHByZXZfV1IsIGN1cl9Sb290UCkge1xuICAgICAgICAgIHJldHVybiBwcmV2X1dSICsgY3VyX2RXICogY3VyX3BSIC0gdHJlZS5wUi50dXJub3ZlciAqIHByZXZfV1IgLSBjdXJfUm9vdFA7XG4gICAgICB9XG4gIH0sXG4gIFdTIDoge1xuICAgICAgbGFiZWwgOiBcIlN0ZW0gQmlvbWFzc1wiLFxuICAgICAgdW5pdHMgOiBcIk1nL2hhXCIsXG4gICAgICBkZXNjcmlwdGlvbiA6IFwiXCIsXG4gICAgICBmbiA6IGZ1bmN0aW9uKHByZXZfV1MsIGN1cl9kVywgY3VyX3BTKSB7IHJldHVybiBwcmV2X1dTICsgY3VyX2RXICogY3VyX3BTIH1cbiAgfSxcbiAgVyA6IHtcbiAgICAgIGxhYmVsIDogXCJUb3RhbCBCaW9tYXNzXCIsXG4gICAgICB1bml0cyA6IFwiTWcvaGFcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogXCJcIixcbiAgICAgIGZuIDogZnVuY3Rpb24oY3VyX1dGLCBjdXJfV1IsIGN1cl9XUykgeyByZXR1cm4gY3VyX1dGK2N1cl9XUitjdXJfV1MgfVxuICB9XG59XG5cblxuXG5mdW5jdGlvbiBxcyhrZXkpIHtcbiAga2V5ID0ga2V5LnJlcGxhY2UoL1sqKz9eJC5cXFtcXF17fSgpfFxcXFxcXC9dL2csIFwiXFxcXCQmXCIpO1xuICB2YXIgbWF0Y2ggPSBsb2NhdGlvbi5zZWFyY2gubWF0Y2gobmV3IFJlZ0V4cChcIls/Jl1cIiArIGtleSArIFwiPShbXiZdKykoJnwkKVwiKSk7XG4gIHJldHVybiBtYXRjaCAmJiBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbMV0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XG59XG5cbnZhciBsb2FkTW9kZWxDb2RlID0gZnVuY3Rpb24odmVyc2lvbiwgY2FsbGJhY2spIHtcblxuICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdmdW5jdGlvbicpIGNhbGxiYWNrID0gdmVyc2lvbjtcbiAgaWYgKCF2ZXJzaW9uIHx8IHR5cGVvZiB2ZXJzaW9uICE9ICdzdHJpbmcnKSB2ZXJzaW9uID0gXCJtYXN0ZXJcIjtcblxuICBfcmVxdWVzdE1vZGVsQ29kZShcbiAgICAgIFwiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy9DU1RBUlMvQUhCLVBOVy9jb250ZW50cy9tb2RlbHMvM3BnL2pzL01vZGVsM1BHLmpzP3JlZj1cIisgdmVyc2lvbixcbiAgICAgIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAvLyBjbGVhbiB0aGVuIGJhc2U2NCBkZWNvZGUgZmlsZSBjb250ZW50XG4gICAgICAgICAgLy8gZmluYWxseSwgZXZhbCBqc1xuICAgICAgICAgIGV2YWwoYXRvYihkYXRhLmNvbnRlbnQucmVwbGFjZSgvW1xcc1xcbl0vZywgJycpKSk7XG5cbiAgICAgICAgICAvLyBzZXQgbTNQRyBvYmplY3QgdG8gd2luZG93IHNjb3BlXG4gICAgICAgICAgd2luZG93Lm0zUEcgPSBtM1BHO1xuXG4gICAgICAgICAgX3JlcXVlc3RNb2RlbENvZGUoXG4gICAgICAgICAgICAgIFwiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy9DU1RBUlMvQUhCLVBOVy9jb250ZW50cy9tb2RlbHMvM3BnL2pzL1NpbmdsZVJ1bkZ1bmN0aW9ucy5qcz9yZWY9XCIrIHZlcnNpb24sXG4gICAgICAgICAgICAgIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgIGV2YWwoYXRvYihkYXRhLmNvbnRlbnQucmVwbGFjZSgvW1xcc1xcbl0vZywgJycpKSk7XG4gICAgICAgICAgICAgICAgICB3aW5kb3cubTNQR0Z1bmMgPSBtM1BHRnVuYztcbiAgICAgICAgICAgICAgICAgIF9yZXF1ZXN0TW9kZWxDb2RlKFxuICAgICAgICAgICAgICAgICAgICAgIFwiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy9DU1RBUlMvQUhCLVBOVy9jb250ZW50cy9tb2RlbHMvM3BnL2pzL0RhdGFNb2RlbC5qcz9yZWY9XCIrIHZlcnNpb24sXG4gICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBldmFsKGF0b2IoZGF0YS5jb250ZW50LnJlcGxhY2UoL1tcXHNcXG5dL2csJycpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF8zcGdNb2RlbCA9IG1vZGVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgfVxuICApO1xufVxuXG5cbi8vIGdpdGh1YiBvbmx5IGFsbG93cyA2MCBwdWJsaWMgcmVxdWVzdHMgcGVyIGlwIHBlciBob3VyLiBzbyBsZXQncyBjYWNoZVxuLy8gY29kZSBpbiBsb2NhbHN0b3JhZ2UgZm9yIG9uZSBob3VyXG52YXIgX3JlcXVlc3RNb2RlbENvZGUgPSBmdW5jdGlvbih1cmwsIGNhbGxiYWNrKSB7XG4gIC8vIHNlZSBpZiBpdCdzIGNhY2hlZFxuICBpZiAobG9jYWxTdG9yYWdlW3VybF0pIHtcbiAgICAgIHZhciB0aW1lID0gbG9jYWxTdG9yYWdlW1wiX3RpbWVzdGFtcF9cIiArIHVybF07XG4gICAgICAvLyBpZiB0aGUgY2FjaGUgaXMgbGVzcyB0aGFuIGFuIGhvdXIgb2xkLCB1c2UgY2FjaGVkIGNvcHlcbiAgICAgIGlmIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHBhcnNlSW50KHRpbWUpIDwgNjAwMDAgKiA2MCkge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVt1cmxdKSk7XG4gICAgICB9XG4gIH1cblxuICAkLmFqYXgoe1xuICAgICAgdXJsIDogdXJsLFxuICAgICAgc3VjY2VzcyA6IGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgeGhyKSB7XG4gICAgICAgICAgLy8gY2FjaGUgZm9yIGxhdGVyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlW3VybF0gPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2VbXCJfdGltZXN0YW1wX1wiICsgdXJsXSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgfSxcbiAgICAgIGVycm9yIDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gaWYgd2UgZmFpbCB0byBhY2Nlc3MgZ2l0aHViIGJ1dCBoYXZlIGEgbG9jYWwgY29weSBvZiB0aGUgY29kZSwganVzdCByb2xsIHcvIHRoYXRcbiAgICAgICAgICBpZiAoIGxvY2FsU3RvcmFnZVt1cmxdICkgcmV0dXJuIGNhbGxiYWNrKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW3VybF0pKTtcblxuICAgICAgICAgIC8vIGVsc2UgZmFpbCA6L1xuICAgICAgICAgIGFsZXJ0KFwiRmFpbGVkIHRvIGxvYWQgXCIgKyB1cmwgKyBcIiBmcm9tIGdpdGh1Yiwgbm8gbG9jYWwgY29waWVkIGZvdW5kIGVpdGhlciA6L1wiKTtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfVxuICB9KTtcbn07XG5cbnZhciBpbml0ID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0aW5wdXRGb3JtID0gcmVxdWlyZSgnLi9pbnB1dEZvcm0nKSh0aGlzKTtcblx0Y2hhcnRzID0gcmVxdWlyZSgnLi9jaGFydHMnKTtcblx0Y2hhcnRzLnNldEFwcCh0aGlzKTtcblxuXG4gIC8vIGNoZWNrIGlmIGZsYXNoIGlzIGluc3RhbGxlZC4gIElmIG5vdCwgaGlkZSB0aGUgY2hhcnQgdHlwZSB0b2dnbGUuXG4gIHJlcXVpcmUoJy4vZmxhc2hCbG9jay1kZXRlY3RvcicpKGZ1bmN0aW9uKHZhbCl7XG4gICAgICBpZiggdmFsID4gMCApICQoXCIjY2hhcnQtdHlwZS1idG4tZ3JvdXBcIikuaGlkZSgpO1xuICB9KTtcblxuICAvLyBzZXR1cCBleHBvcnQgbW9kYWxcbiAgZXhwb3J0ZXIuaW5pdCgpO1xuICAkKFwiI2V4cG9ydC1jc3ZcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIGV4cG9ydGVyLmV4cG9ydENzdihjc3ZSZXN1bHRzKTtcbiAgfSk7XG5cbiAgdmFyIGVsZSA9ICQoXCIjaW5wdXRzLWNvbnRlbnRcIik7XG4gIGlucHV0Rm9ybS5jcmVhdGUoZWxlKTtcblxuICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIHJ1bk1vZGVsKCk7XG4gIH0pO1xuXG4gIC8vIGluaXRpYWxpemUgdGhlIGNoYXJ0c1xuICBjaGFydHMuaW5pdCgpO1xuXG4gIC8vIHNldCBkZWZhdWx0IGNvbmZpZ1xuICAkKFwiI2lucHV0LW1hbmFnZS1EYXRlUGxhbnRlZFwiKS52YWwobmV3IERhdGUoKS50b0lTT1N0cmluZygpLnJlcGxhY2UoL1QuKi8sJycpKTtcbiAgJChcIiNpbnB1dC1tYW5hZ2UtRGF0ZUNvcHBpY2VkXCIpLnZhbChuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSsoODY0MDAwMDAqMiozNjUpKS50b0lTT1N0cmluZygpLnJlcGxhY2UoL1QuKi8sJycpKTtcbiAgJChcIiNpbnB1dC1tYW5hZ2UtRGF0ZUZpbmFsSGFydmVzdFwiKS52YWwobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkrKDg2NDAwMDAwKjEwKjM2NSkpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvVC4qLywnJykpO1xuXG4gIC8vIHNldHVwIG5pY2Ugc2Nyb2xsaW5nXG4gICQoJy5hcHAtbmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogJCh0aGlzLmhhc2gpLm9mZnNldCgpLnRvcC01NVxuICAgICAgIH0sIDcwMCk7XG4gfSk7XG5cbiAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpe1xuICAgICAgY2hhcnRzLnJlc2l6ZSgpO1xuXG4gICAgICBpZiggd2VhdGhlckN1c3RvbUNoYXJ0ICkge1xuICAgICAgICAgIHdlYXRoZXJDdXN0b21DaGFydCA9IGNoYXJ0cy5jcmVhdGVXZWF0aGVyQ2hhcnQoJCgnI2N1c3RvbS13ZWF0aGVyLWNoYXJ0JylbMF0sIHdpbmRvdy5jdXN0b21fd2VhdGhlcik7XG4gICAgICB9XG4gIH0pO1xuXG4gIGNhbGxiYWNrKCk7XG59XG5cblxudmFyIHJ1bkNvbXBsZXRlID0gZnVuY3Rpb24ocm93cykge1xuICBpZiAoIHJ1bkNhbGxiYWNrICkgcnVuQ2FsbGJhY2socm93cyk7XG4gIGlmKCBoaWRlSW5pdExvYWRpbmcgKSBoaWRlSW5pdExvYWRpbmcoKTtcbiAgcnVuQ2FsbGJhY2sgPSBudWxsO1xufVxuXG52YXIgbW9udGhzVG9SdW4gPSBmdW5jdGlvbigpIHtcbiAgdmFyIGQxID0gJChcIiNpbnB1dC1tYW5hZ2UtRGF0ZVBsYW50ZWRcIikudmFsKCk7XG4gIGlmIChkMSAmJiBkMSAhPSBcIlwiKSB7XG4gICAgICBkMSA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLURhdGVQbGFudGVkXCIpLnZhbCgpKTtcbiAgfSBlbHNlIHtcbiAgICAgIGQxID0gbmV3IERhdGUoKTtcbiAgfVxuXG4gIHZhciBkMiA9ICQoXCIjaW5wdXQtbWFuYWdlLURhdGVGaW5hbEhhcnZlc3RcIikudmFsKCk7XG4gIGlmIChkMiAmJiBkMiAhPSBcIlwiKSB7XG4gICAgICBkMiA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLURhdGVGaW5hbEhhcnZlc3RcIikudmFsKCkpO1xuICB9IGVsc2Uge1xuICAgICAgZDIgPSBuZXcgRGF0ZSgpO1xuICB9XG5cbiAgdmFyIG1vbnRocztcbiAgbW9udGhzID0gKGQyLmdldEZ1bGxZZWFyKCkgLSBkMS5nZXRGdWxsWWVhcigpKSAqIDEyO1xuICBtb250aHMgLT0gZDEuZ2V0TW9udGgoKSArIDE7XG4gIG1vbnRocyArPSBkMi5nZXRNb250aCgpO1xuICByZXR1cm4gbW9udGhzIDw9IDAgPyAxIDogbW9udGhzKzE7XG59XG5cblxudmFyIHJ1bk1vZGVsID0gZnVuY3Rpb24oaXNSdCkge1xuXG4gIGlmICgkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5oYXNDbGFzcyhcImRpc2FibGVkXCIpKSByZXR1cm47XG4gICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIlJ1bm5pbmcuLi5cIik7XG5cbiAgaWYoICFjaGVja1dlYXRoZXIoKSApIHJldHVybjtcblxuICAvLyBsZXQgVUkgcHJvY2VzcyBmb3IgYSBzZWMgYmVmb3JlIHdlIHRhbmsgaXRcbiAgLy8gVE9ETzogdGhpcyBzaG91bGQgYmUgcHJlZm9ybWVkIHcvIGEgd2Vid29ya2VyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdtb2RlbC1ydW4nLCAxKTtcblxuICAgICAgLy8gcmVhZCBldmVyeXRoaW5nIHNvIHRoZSB2YXJpYXRpb25zIGFyZSBzZXRcbiAgICAgIHdpbmRvdy52YXJpYXRpb25zID0ge307XG4gICAgICBtM1BHSU8ucmVhZEZyb21JbnB1dHMoKTtcblxuICAgICAgLy8gbWFrZSBzdXJlIHdlIGFyZSBvbmx5IHNldHRpbmcgMiB2YXJpYXRpb24gcGFyYW1ldGVyc1xuICAgICAgdmFyIHBhcmFtcyA9IFtdO1xuICAgICAgZm9yKCB2YXIga2V5IGluIHdpbmRvdy52YXJpYXRpb25zICkgcGFyYW1zLnB1c2goa2V5KTtcbiAgICAgIGlmKCBwYXJhbXMubGVuZ3RoID4gMiApIHtcbiAgICAgICAgICBhbGVydChcIlRoZXJlIGlzIGEgbGltaXQgb2YgMiB2YXJpYXRpb24gcGFyYW1ldGVycyBwZXIgcnVuLiAgQ3VycmVudGx5IHlvdSBhcmUgdmFyeWluZyBcIitcbiAgICAgICAgICAgICAgICBcInRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczpcXG5cXG4gLVwiK3BhcmFtcy5qb2luKFwiXFxuIC1cIikpO1xuICAgICAgICAgICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIjxpIGNsYXNzPSdpY29uLXBsYXknPjwvaT4gUnVuXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gbGV0IHRoZSB3b3JsZCBrbm93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgICBpZiggIWlzUnQgKSBnZHJpdmUucnVuTW9kZWxSdCgpO1xuXG4gICAgICAvLyBzaG93IHdoYXQgd2UgYXJlIGRvaW5nXG4gICAgICAkKFwiI3ZhcmlhdGlvbkFuYWx5c2lzU3RhdHVzXCIpLmh0bWwoXCI8Yj5cIisocGFyYW1zLmxlbmd0aCA9PSAwID8gXCJOb25lXCIgOiBwYXJhbXMuam9pbihcIiwgXCIpKStcIjwvYj5cIik7XG5cbiAgICAgIC8vIHdlIGFyZSBvbmx5IHJ1bm5pbmcgb25jZVxuICAgICAgaWYgKCBwYXJhbXMubGVuZ3RoID09IDAgKSB7XG4gICAgICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbW9kZWwtcnVuLXNpbmdsZVBhcmFtJywgMSk7XG5cbiAgICAgICAgICBydW5DYWxsYmFjayA9IGZ1bmN0aW9uKHJvd3MpIHtcbiAgICAgICAgICAgICAgc2hvd1Jlc3VsdHMocm93cyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG0zUEcucnVuKG1vbnRoc1RvUnVuKCkpO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ21vZGVsLXJ1bi12YXJpYXRpb24nLCAxKTtcblxuICAgICAgICAgIC8vIHNldCB2YXJpYXRpb24gb3JkZXJcbiAgICAgICAgICB2YXIgcnVucyA9IFtdO1xuICAgICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgd2luZG93LnZhcmlhdGlvbnNbcGFyYW1zWzBdXS5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgICAgICAgICAgIGlucHV0cyA6IHt9LFxuICAgICAgICAgICAgICAgICAgb3V0cHV0IDogbnVsbFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG9iai5pbnB1dHNbcGFyYW1zWzBdXSA9IHdpbmRvdy52YXJpYXRpb25zW3BhcmFtc1swXV1baV07XG4gICAgICAgICAgICAgIGlmKCBwYXJhbXMubGVuZ3RoID4gMSApIHtcbiAgICAgICAgICAgICAgICAgIGZvciggdmFyIGogPSAwOyBqIDwgd2luZG93LnZhcmlhdGlvbnNbcGFyYW1zWzFdXS5sZW5ndGg7IGorKyApIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9ICQuZXh0ZW5kKHRydWUsIHt9LCBvYmopO1xuICAgICAgICAgICAgICAgICAgICAgIHQuaW5wdXRzW3BhcmFtc1sxXV0gPSB3aW5kb3cudmFyaWF0aW9uc1twYXJhbXNbMV1dW2pdO1xuICAgICAgICAgICAgICAgICAgICAgIHJ1bnMucHVzaCh0KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJ1bnMucHVzaChvYmopO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcnVuVmFyaWF0aW9uKDAsIHJ1bnMpO1xuICAgICAgfVxuICB9LCAyNTApO1xufVxuXG52YXIgcnVuVmFyaWF0aW9uID0gZnVuY3Rpb24oaW5kZXgsIHJ1bnMpIHtcbiAgLy8gc2V0IGlucHV0IHZhcmlhYmxlcyBmb3IgcnVuXG4gIHZhciBydW4gPSBydW5zW2luZGV4XTtcbiAgZm9yKCB2YXIga2V5IGluIHJ1bi5pbnB1dHMgKSB7XG4gICAgICAkKFwiI2lucHV0LVwiK2tleS5yZXBsYWNlKC9cXC4vZywgJy0nKSkudmFsKHJ1bi5pbnB1dHNba2V5XSk7XG4gIH1cblxuICBydW5DYWxsYmFjayA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJ1bnNbaW5kZXhdLm91dHB1dCA9IGRhdGE7XG4gICAgICBpbmRleCsrO1xuXG4gICAgICBpZiAocnVucy5sZW5ndGggPT0gaW5kZXgpIHtcbiAgICAgICAgICAvLyByZXNldCB0aGUgY29uc3RhbnQgdG8gdGhlIGZpcnN0IHZhbHVlXG4gICAgICAgICAgZm9yKCB2YXIga2V5IGluIHdpbmRvdy52YXJpYXRpb25zICkge1xuICAgICAgICAgICAgICAkKFwiI2lucHV0LVwiK2tleS5yZXBsYWNlKC9cXC4vZywgJy0nKSkudmFsKHdpbmRvdy52YXJpYXRpb25zW2tleV0uam9pbihcIiwgXCIpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2hvd1Jlc3VsdHMocnVucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJ1blZhcmlhdGlvbihpbmRleCwgcnVucyk7XG4gICAgICB9XG4gIH1cblxuICBtM1BHLnJ1bihtb250aHNUb1J1bigpKTtcbn1cblxuXG52YXIgc2hvd1Jlc3VsdHMgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgaWYoIHJlc3VsdFswXSBpbnN0YW5jZW9mIEFycmF5ICkge1xuICAgICAgcmVzdWx0ID0gW3tcbiAgICAgICAgICBzaW5nbGVSdW4gOiB0cnVlLFxuICAgICAgICAgIGlucHV0cyA6IHt9LFxuICAgICAgICAgIG91dHB1dCA6IHJlc3VsdFxuICAgICAgfV1cbiAgfVxuXG4gIGN1cnJlbnRSZXN1bHRzID0gcmVzdWx0O1xuXG4gIHNob3dSYXdPdXRwdXQocmVzdWx0KTtcbiAgY2hhcnRzLnVwZGF0ZUNoYXJ0cyhyZXN1bHQsIHRydWUpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAkKFwiI3J1bmJ0biwgI3J1bmJ0bi1zbVwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCI8aSBjbGFzcz0naWNvbi1wbGF5Jz48L2k+IFJ1blwiKTtcbiAgfSwgMjUwKTtcblxufVxuXG4vLyBtYWtlIHN1cmUgYWxsIHRoZSB3ZWF0aGVyIGlzIHNldC4gICMxIHRoaW5nIHBlb3BsZSB3aWxsIG1lc3MgdXBcbnZhciBjaGVja1dlYXRoZXIgPSBmdW5jdGlvbigpIHtcbiAgLy8gZmlyc3QgZ2V0IGN1cnJlbnQgbW9udGhzIHdlIGFyZSBnb2luZyB0byBydW4sXG4gIHZhciBzdGFydCA9ICQoXCIjaW5wdXQtbWFuYWdlLURhdGVQbGFudGVkXCIpLnZhbCgpO1xuXG4gIHZhciBlbmQgPSAkKFwiI2lucHV0LW1hbmFnZS1EYXRlRmluYWxIYXJ2ZXN0XCIpLnZhbCgpLnNwbGl0KFwiLVwiKTtcbiAgdmFyIGVNb250aCA9IHBhcnNlSW50KGVuZFsxXSk7XG4gIHZhciBlWWVhciA9IHBhcnNlSW50KGVuZFswXSk7XG5cbiAgdmFyIGNEYXRlID0gbmV3IERhdGUoc3RhcnQpO1xuXG4gIC8vIG5vdyBzZWUgaWYgd2UgaGF2ZSBjdXN0b20gd2VhdGhlciBjb3ZlcmFnZVxuICB2YXIgaGFzQ292ZXJhZ2UgPSB0cnVlO1xuICB2YXIgY291bnQgPSAwO1xuICB3aGlsZSggY291bnQgPCAxMDAwMCApIHtcbiAgICAgIGlmKCAhd2luZG93LmN1c3RvbV93ZWF0aGVyICkge1xuICAgICAgICAgIGhhc0NvdmVyYWdlID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHZhciBtID0gKGNEYXRlLmdldE1vbnRoKCkrMSkrJyc7XG4gICAgICB2YXIgeSA9IGNEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICBpZiggbS5sZW5ndGggPT0gMSApIG0gPSAnMCcrbTtcblxuICAgICAgaWYoIGNEYXRlLmdldE1vbnRoKCkrMSA9PSBlTW9udGggJiYgeSA9PSBlWWVhciApIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSBpZiggIXdpbmRvdy5jdXN0b21fd2VhdGhlclt5KyctJyttXSApIHtcbiAgICAgICAgICBoYXNDb3ZlcmFnZSA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjRGF0ZS5zZXRNb250aChjRGF0ZS5nZXRNb250aCgpKzEpO1xuICAgICAgY291bnQrKztcbiAgfVxuXG4gIGlmKCBoYXNDb3ZlcmFnZSApIHJldHVybiB0cnVlO1xuXG4gIC8vIGlmIG5vdCBtYWtlIHN1cmUgd2UgaGF2ZSBhdmVyYWdlcyBzZWxlY3RlZFxuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICBmb3IgKCB2YXIgaiA9IDE7IGogPCBpbnB1dHMud2VhdGhlci5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHZhciBjID0gaW5wdXRzLndlYXRoZXJbal07XG4gICAgICAgICAgdmFyIHZhbCA9IHBhcnNlRmxvYXQoJChcIiNpbnB1dC13ZWF0aGVyLVwiICsgYyArIFwiLVwiICsgaSkudmFsKCkpO1xuICAgICAgICAgIGlmKCAhdmFsICYmIHZhbCAhPSAwICkge1xuICAgICAgICAgICAgICBhbGVydChcIk1pc3Npbmcgd2VhdGhlciBkYXRhOiBcIitjK1wiIGZvciBtb250aCBcIitpK1wiXFxuXFxuXCIrXG4gICAgICAgICAgICAgICAgICAgIFwiRGlkIHlvdSBzZWxlY3QgYSBsb2NhdGlvbiAoU2V0dXApIGFuZC9vciBhcmUgYWxsIHdlYXRoZXIvc29pbCBmaWVsZHMgZmlsbGVkIG91dD9cIik7XG4gICAgICAgICAgICAgICQoXCIjcnVuYnRuLCAjcnVuYnRuLXNtXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIjxpIGNsYXNzPSdpY29uLXBsYXknPjwvaT4gUnVuXCIpO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbnZhciBzZXRXZWF0aGVyID0gZnVuY3Rpb24oZGF0YSkge1xuICBpZiggIXdpbmRvdy5jdXN0b21fd2VhdGhlciApIHdpbmRvdy5jdXN0b21fd2VhdGhlciA9IHt9O1xuXG4gIGlmKCBkYXRhICkge1xuICAgICAgZm9yKCB2YXIga2V5IGluIGRhdGEgKSB7XG5cbiAgICAgICAgICAvLyBjbGVhbiB1cCBkYXRlIGZvcm1hdFxuICAgICAgICAgIHZhciBkYXRlID0ga2V5LnJlcGxhY2UoL1teXFxkLV0vLCcnKTtcbiAgICAgICAgICB2YXIgcGFydHMgPSBkYXRlLnNwbGl0KCctJyk7XG5cbiAgICAgICAgICBpZiggcGFydHMubGVuZ3RoIDwgMiApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGFsZXJ0KCdJbnZhbGlkIERhdGUgRm9ybWF0LiAgRGF0ZXMgc2hvdWxkIGJlIGluIFlZWVktTU0gZm9ybWF0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICggcGFydHNbMV0ubGVuZ3RoICE9IDIgKSB7XG4gICAgICAgICAgICAgIGRhdGUgPSBwYXJ0c1swXStcIi0wXCIrcGFydHNbMV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgd2luZG93LmN1c3RvbV93ZWF0aGVyW2RhdGVdID0gZGF0YVtrZXldO1xuICAgICAgfVxuICB9XG5cbiAgLy8gY3JlYXRlIGFycmF5IHNvIHdlIGNhbiBzb3J0XG4gIHZhciBhcnIgPSBbXTtcbiAgdmFyIGhlYWRlcnMgPSBbJ2RhdGUnXTtcbiAgZm9yKCB2YXIgZGF0ZSBpbiB3aW5kb3cuY3VzdG9tX3dlYXRoZXIgKSB7XG5cbiAgICAgIHZhciB0ID0gW2RhdGVdO1xuICAgICAgZm9yKCB2YXIga2V5IGluIHdpbmRvdy5jdXN0b21fd2VhdGhlcltkYXRlXSApIHtcbiAgICAgICAgICBpZigga2V5ID09ICducmVsJyApIGNvbnRpbnVlO1xuICAgICAgICAgIGlmKCBhcnIubGVuZ3RoID09IDAgKSBoZWFkZXJzLnB1c2goa2V5KTtcbiAgICAgICAgICB0LnB1c2god2luZG93LmN1c3RvbV93ZWF0aGVyW2RhdGVdW2tleV0pO1xuICAgICAgfVxuXG4gICAgICBhcnIucHVzaCh0KTtcbiAgfVxuXG4gIGlmKCBhcnIubGVuZ3RoID09IDAgKSB7XG4gICAgICAkKCcjY3VzdG9tLXdlYXRoZXItcGFuZWwnKS5odG1sKFwiTm8gd2VhdGhlciBkYXRhIGhhcyBiZWVuIHVwbG9hZGVkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBodG1sID0gJzxkaXYgc3R5bGU9XCJvdmVyZmxvdzphdXRvO21heC1oZWlnaHQ6NjAwcHhcIj48dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkXCI+PHRyPic7XG5cbiAgYXJyLnNvcnQoZnVuY3Rpb24oYSwgYil7XG4gICAgICB2YXIgZDEgPSBuZXcgRGF0ZShhWzBdK1wiLTAxXCIpLmdldFRpbWUoKTtcbiAgICAgIHZhciBkMiA9IG5ldyBEYXRlKGJbMF0rXCItMDFcIikuZ2V0VGltZSgpO1xuXG4gICAgICBpZiggZDEgPCBkMiApIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgIH0gZWxzZSBpZiggZDEgPiBkMiApIHtcbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZygzKTtcbiAgICAgIHJldHVybiAwO1xuICB9KTtcblxuICBmb3IoIHZhciBpID0gMDsgaSA8IGhlYWRlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBodG1sICs9ICc8dGg+JytoZWFkZXJzW2ldKyc8L3RoPic7XG4gIH1cbiAgaHRtbCArPSAnPC90cj4nO1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrICkge1xuICAgICAgaHRtbCArPSAnPHRyPjx0ZD4nK2FycltpXS5qb2luKCc8L3RkPjx0ZD4nKSsnPC90ZD48L3RyPic7XG4gIH1cblxuICAkKCcjY3VzdG9tLXdlYXRoZXItcGFuZWwnKS5odG1sKGh0bWwrJzwvdGFibGU+PC9kaXY+PGRpdiBpZD1cImN1c3RvbS13ZWF0aGVyLWNoYXJ0XCI+PC9kaXY+Jyk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgd2VhdGhlckN1c3RvbUNoYXJ0ID0gY2hhcnRzLmNyZWF0ZVdlYXRoZXJDaGFydCgkKCcjY3VzdG9tLXdlYXRoZXItY2hhcnQnKVswXSwgd2luZG93LmN1c3RvbV93ZWF0aGVyKTtcbiAgfSwgMTAwMCk7XG5cbn1cblxudmFyIHNob3dSYXdPdXRwdXQgPSBmdW5jdGlvbihyZXN1bHRzKSB7XG5cbiAgLy8gc2VsZWN0ZWQgaW4gdGhlIGNoYXJ0cyBvdXRwdXRcbiAgdmFyIHZhcnMgPSAkKFwiI2NoYXJ0VHlwZUlucHV0XCIpLnZhbCgpO1xuXG4gIC8vIGZpbmQgdGhlIHJvd3Mgd2UgY2FyZSBhYm91dFxuICB2YXIgY2hhcnRSb3dzID0ge307XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgcmVzdWx0c1swXS5vdXRwdXRbMF0ubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggdmFycy5pbmRleE9mKHJlc3VsdHNbMF0ub3V0cHV0WzBdW2ldKSA+IC0xICkgY2hhcnRSb3dzW3Jlc3VsdHNbMF0ub3V0cHV0WzBdW2ldXSA9IGk7XG4gIH1cblxuICB2YXIgdGFicyA9ICQoJzx1bCBjbGFzcz1cIm5hdiBuYXYtcGlsbHNcIiBpZD1cInJhd091dHB1dFRhYnNcIiAgZGF0YS10YWJzPVwicGlsbFwiPjwvdWw+Jyk7XG4gIHZhciBjb250ZW50cyA9ICQoJzxkaXYgY2xhc3M9XCJwaWxsLWNvbnRlbnRcIiBzdHlsZT1cIm92ZXJmbG93OmF1dG87bWFyZ2luLXRvcDoxNXB4XCI+PC9kaXY+Jyk7XG5cbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgdmFycy5sZW5ndGg7IGkrKykge1xuICAgICAgdGFicy5hcHBlbmQoJCgnPGxpICcrKGkgPT0gMCA/ICdjbGFzcz1cImFjdGl2ZVwiJyA6IFwiXCIpKyc+PGEgaHJlZj1cIiNyYXdvdXQnXG4gICAgICAgICAgK3ZhcnNbaV0rJ1wiIGRhdGEtdG9nZ2xlPVwidGFiXCI+Jyt2YXJzW2ldKyc8L2E+PC9saT4nKSk7XG5cbiAgICAgIGNvbnRlbnRzLmFwcGVuZCgkKCc8ZGl2IGNsYXNzPVwicGlsbC1wYW5lICcgKyAoaSA9PSAwID8gJ2FjdGl2ZScgOiBcIlwiKVxuICAgICAgICAgICsgJ1wiIGlkPVwicmF3b3V0JyArIHZhcnNbaV0gKyAnXCI+PC9kaXY+JykpO1xuICB9XG5cbiAgJChcIiNvdXRwdXQtY29udGVudFwiKS5odG1sKFwiXCIpLmFwcGVuZCh0YWJzKS5hcHBlbmQoY29udGVudHMpO1xuICAkKFwiI3Jhd091dHB1dFRhYnNcIikudGFiKCk7XG5cbiAgY3N2UmVzdWx0cyA9IHtcbiAgICAgIGNvbmZpZyA6IG0zUEdJTy5leHBvcnRTZXR1cCgpLFxuICAgICAgZGF0YSA6IHt9XG4gIH07XG5cbiAgLy8gc29tZSByb3dzIGhhdmUgc3RyaW5ncywgd2UgZG9uJ3Qgd2FudCB0aGVzZVxuICAvLyBpZ25vcmUgc3RyaW5nIHJvd3NcbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrICkge1xuICAgICAgdmFyIGNsZWFuID0gW3Jlc3VsdHNbaV0ub3V0cHV0WzBdXTtcbiAgICAgIGZvciggdmFyIGogPSAxOyBqIDwgcmVzdWx0c1tpXS5vdXRwdXQubGVuZ3RoOyBqKysgKSB7XG4gICAgICAgICAgaWYoIHR5cGVvZiByZXN1bHRzW2ldLm91dHB1dFtqXVswXSAhPSAnc3RyaW5nJyApIGNsZWFuLnB1c2gocmVzdWx0c1tpXS5vdXRwdXRbal0pO1xuICAgICAgfVxuICAgICAgcmVzdWx0c1tpXS5vdXRwdXQgPSBjbGVhbjtcbiAgfVxuXG4gIHZhciBjRGF0ZSA9IG5ldyBEYXRlKCQoXCIjaW5wdXQtbWFuYWdlLURhdGVQbGFudGVkXCIpLnZhbCgpKTtcblxuICB2YXIgdGFibGUsIHJvdztcbiAgZm9yKCB2YXIga2V5IGluIGNoYXJ0Um93cyApIHtcbiAgICAgIHRhYmxlID0gXCI8dGFibGUgY2xhc3M9J3RhYmxlIHRhYmxlLXN0cmlwZWQnPlwiO1xuXG4gICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XSA9IFtdO1xuXG4gICAgICBmb3IoIHZhciBqID0gMDsgaiA8IHJlc3VsdHNbMF0ub3V0cHV0Lmxlbmd0aDsgaisrICl7XG4gICAgICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV1bal0gPSBbXTtcblxuICAgICAgICAgIC8vIHNldCBoZWFkZXIgcm93XG4gICAgICAgICAgaWYoIGogPT0gMCApIHtcbiAgICAgICAgICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV1bal0ucHVzaCgnbW9udGgnKTtcbiAgICAgICAgICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV1bal0ucHVzaCgnZGF0ZScpO1xuXG4gICAgICAgICAgICAgIHRhYmxlICs9IFwiPHRyPjx0aD5Nb250aDwvdGg+PHRoPkRhdGU8L3RoPlwiO1xuICAgICAgICAgICAgICBmb3IoIHZhciB6ID0gMDsgeiA8IHJlc3VsdHMubGVuZ3RoOyB6KysgKSB7XG4gICAgICAgICAgICAgICAgICB0YWJsZSArPSBcIjx0aD5cIjtcbiAgICAgICAgICAgICAgICAgIHZhciB0bXAgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgZm9yKCB2YXIgbVR5cGUgaW4gcmVzdWx0c1t6XS5pbnB1dHMgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdG1wLnB1c2gobVR5cGUrXCI9XCIrcmVzdWx0c1t6XS5pbnB1dHNbbVR5cGVdKTtcbiAgICAgICAgICAgICAgICAgICAgICB0YWJsZSArPSBcIjxkaXY+XCIrbVR5cGUrXCI9XCIrcmVzdWx0c1t6XS5pbnB1dHNbbVR5cGVdK1wiPC9kaXY+XCI7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmKCB0bXAubGVuZ3RoID09IDAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV1bal0ucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgIHRhYmxlICs9IGtleTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV1bal0ucHVzaCh0bXAuam9pbihcIiBcIikpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8L3RoPlwiO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGFibGUgKz0gXCI8L3RyPlwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoY0RhdGUuZ2V0WWVhcigpKzE5MDAsIGNEYXRlLmdldE1vbnRoKCkraiwgY0RhdGUuZ2V0RGF0ZSgpKTtcbiAgICAgICAgICAgICAgdmFyIG0gPSBkYXRlLmdldE1vbnRoKCkrMTtcbiAgICAgICAgICAgICAgaWYoIG0gPCAxMCApIG0gPSAnMCcrbTtcblxuICAgICAgICAgICAgICB0YWJsZSArPSBcIjx0cj48dGQ+XCIraitcIjwvdGQ+PHRkPlwiK2RhdGUuZ2V0RnVsbFllYXIoKSsnLScrbStcIjwvdGQ+XCI7XG5cbiAgICAgICAgICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV1bal0ucHVzaChqKTtcbiAgICAgICAgICAgICAgY3N2UmVzdWx0cy5kYXRhW2tleV1bal0ucHVzaChkYXRlLmdldEZ1bGxZZWFyKCkrJy0nK20pO1xuXG4gICAgICAgICAgICAgIHZhciB2O1xuICAgICAgICAgICAgICBmb3IoIHZhciB6ID0gMDsgeiA8IHJlc3VsdHMubGVuZ3RoOyB6KysgKSB7XG4gICAgICAgICAgICAgICAgICB2ID0gcmVzdWx0c1t6XS5vdXRwdXRbal1bY2hhcnRSb3dzW2tleV1dO1xuICAgICAgICAgICAgICAgICAgdGFibGUgKz0gXCI8dGQ+XCIrditcIjwvdGQ+XCI7XG4gICAgICAgICAgICAgICAgICBjc3ZSZXN1bHRzLmRhdGFba2V5XVtqXS5wdXNoKHYpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRhYmxlICs9IFwiPC90cj5cIjtcbiAgICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgICQoXCIjcmF3b3V0XCIgKyBrZXkpLmh0bWwodGFibGUrXCI8L3RhYmxlPlwiKTtcbiAgfVxuXG4gIC8vIG1ha2Ugc3VyZSB3ZSBjYW4gc2VlIHRoZSBleHBvcnQgYnRuXG4gIGlmKCAhb2ZmbGluZU1vZGUgKSAkKFwiI3Nob3ctZXhwb3J0LWNzdlwiKS5zaG93KCk7XG59XG5cblxuLy8gU3BlY2lhbCBTYXVjZS4uLlxuLy8gYmFzaWNhbGx5IHRoZSBjb2RlIGxvYWRlZCBmcm9tIEdpdEh1YiBleHBlY3RzIHRoZSBmb2xsb3dpbmcgdG8gZXhpc3RzIGluIHRoZSB3aW5kb3cgc2NvcGVcbi8vICAgbTNQR0lPXG4vLyAgICAgLSByZWFkQWxsQ29udGFudHNcbi8vICAgICAtIHJlYWRXZWF0aGVyXG4vLyAgICAgLSBkdW1wXG4vLyAgICAgLSByZWFkRnJvbUlucHV0c1xuLy8gU28gd2UgaW5qZWN0IGZ1bmN0aW9ucyB0aGF0IGludGVyYWN0IHcvIG91ciBVSSwgbW9kZWwgaW4gbm8gd2F5IGNhcmVzXG5tM1BHSU8gPSB7XG4gIHJlYWRBbGxDb25zdGFudHMgOiBmdW5jdGlvbihwbGFudGF0aW9uKSB7XG4gICAgICB0aGlzLnJlYWRGcm9tSW5wdXRzKCk7XG5cbiAgICAgIGZvciAoIHZhciBrZXkgaW4gd2luZG93LnBsYW50YXRpb24pXG4gICAgICAgICAgcGxhbnRhdGlvbltrZXldID0gd2luZG93LnBsYW50YXRpb25ba2V5XTtcbiAgICAgIHBsYW50YXRpb24uY29wcGljZWRUcmVlID0gd2luZG93LnRyZWU7XG5cbiAgICAgIC8vIHNldHVwIHNlZWRsaW5nIFRyZWVcbiAgICAgIC8vIFRPRE86IGhhcmRjb2RlZCBmb3Igbm93LCB0aGlzIHNob3VsZG4ndCBiZVxuICAgICAgcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUgPSAkLmV4dGVuZCh0cnVlLCB7fSwgd2luZG93LnRyZWUpO1xuICAgICAgcGxhbnRhdGlvbi5zZWVkbGluZ1RyZWUuc3RlbXNQZXJTdHVtcCA9IDE7XG4gICAgICBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZS5wZnMuc3RlbUNudCA9IDE7XG4gICAgICBwbGFudGF0aW9uLnNlZWRsaW5nVHJlZS5yb290UCA9IHtcbiAgICAgICAgICBMQUlUYXJnZXQgOiAxMCxcbiAgICAgICAgICBlZmZpY2llbmN5IDogMC42LFxuICAgICAgICAgIGZyYWMgOiAwLjAxXG4gICAgICB9XG5cbiAgfSxcbiAgcmVhZFdlYXRoZXIgOiBmdW5jdGlvbih3ZWF0aGVyTWFwLCBwbGFudGluZ1BhcmFtcywgY3VzdG9tV2VhdGhlck1hcCkge1xuICAgICAgdmFyIGRhdGVQbGFudGVkID0gJChcIiNpbnB1dC1tYW5hZ2UtRGF0ZVBsYW50ZWRcIikudmFsKCk7XG4gICAgICBpZiAoZGF0ZVBsYW50ZWQgJiYgZGF0ZVBsYW50ZWQgIT0gXCJcIikge1xuICAgICAgICAgIHBsYW50aW5nUGFyYW1zLmRhdGVQbGFudGVkID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtRGF0ZVBsYW50ZWRcIikudmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwbGFudGluZ1BhcmFtcy5kYXRlUGxhbnRlZCA9IG5ldyBEYXRlKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBkYXRlQ29wcGljZWQgPSAkKFwiI2lucHV0LW1hbmFnZS1EYXRlQ29wcGljZWRcIikudmFsKCk7XG4gICAgICBpZiAoZGF0ZUNvcHBpY2VkICYmIGRhdGVDb3BwaWNlZCAhPSBcIlwiKSB7XG4gICAgICAgICAgcGxhbnRpbmdQYXJhbXMuZGF0ZUNvcHBpY2VkID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtRGF0ZUNvcHBpY2VkXCIpLnZhbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAvLyBzZXQgZXJyb3IgY29uZGl0aW9uIDogVE9ET1xuICAgICAgfVxuXG4gICAgICB2YXIgRGF0ZUZpbmFsSGFydmVzdCA9ICQoXCIjaW5wdXQtbWFuYWdlLURhdGVGaW5hbEhhcnZlc3RcIikudmFsKCk7XG4gICAgICBpZiAoRGF0ZUZpbmFsSGFydmVzdCAmJiBEYXRlRmluYWxIYXJ2ZXN0ICE9IFwiXCIpIHtcbiAgICAgICAgICBwbGFudGluZ1BhcmFtcy5EYXRlRmluYWxIYXJ2ZXN0ID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtRGF0ZUZpbmFsSGFydmVzdFwiKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgLy8gc2V0IGVycm9yIGNvbmRpdGlvbiA6IFRPRE9cbiAgICAgIH1cblxuICAgICAgdmFyIHllYXJzUGVyQ29wcGljZSA9ICQoXCIjaW5wdXQtbWFuYWdlLUNvcHBpY2VJbnRlcnZhbFwiKS52YWwoKTtcbiAgICAgIGlmICh5ZWFyc1BlckNvcHBpY2UgJiYgeWVhcnNQZXJDb3BwaWNlICE9IFwiXCIpIHtcbiAgICAgICAgICBwbGFudGluZ1BhcmFtcy55ZWFyc1BlckNvcHBpY2UgPSBwYXJzZUludCgkKFwiI2lucHV0LW1hbmFnZS1Db3BwaWNlSW50ZXJ2YWxcIikudmFsKCkpO1xuICAgICAgfVxuXG4gICAgICB3aW5kb3cucGxhbnRpbmdQYXJhbXMgPSBwbGFudGluZ1BhcmFtcztcblxuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgIHZhciBpdGVtID0ge1xuICAgICAgICAgICAgICBtb250aCA6IChpICsgMSlcbiAgICAgICAgICB9O1xuICAgICAgICAgIGZvciAoIHZhciBqID0gMTsgaiA8IGlucHV0cy53ZWF0aGVyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgIHZhciBjID0gaW5wdXRzLndlYXRoZXJbal07XG4gICAgICAgICAgICAgIGl0ZW1bY10gPSB0aGlzLl9yZWFkVmFsKCQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGMgKyBcIi1cIiArIGkpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaXRlbS5ucmVsID0gaXRlbS5yYWQgLyAwLjAwMzY7XG5cbiAgICAgICAgICB3ZWF0aGVyTWFwW2ldID0gaXRlbTtcbiAgICAgIH1cblxuICAgICAgd2luZG93LndlYXRoZXIgPSB3ZWF0aGVyTWFwO1xuXG4gICAgICBpZiggd2luZG93LmN1c3RvbV93ZWF0aGVyICkge1xuICAgICAgICAgIGZvciggdmFyIGRhdGUgaW4gd2luZG93LmN1c3RvbV93ZWF0aGVyICkge1xuICAgICAgICAgICAgICB3aW5kb3cuY3VzdG9tX3dlYXRoZXJbZGF0ZV0ubnJlbCA9IHdpbmRvdy5jdXN0b21fd2VhdGhlcltkYXRlXS5yYWQgLyAwLjAwMzY7XG4gICAgICAgICAgICAgIGN1c3RvbVdlYXRoZXJNYXBbZGF0ZV0gPSB3aW5kb3cuY3VzdG9tX3dlYXRoZXJbZGF0ZV07XG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gd2VhdGhlck1hcDtcbiAgfSxcbiAgZHVtcCA6IGZ1bmN0aW9uKHJvd3MsIHNoZWV0KSB7XG4gICAgICAvLyBzZXQgdGhlIHJhdyBvdXRwdXRcbiAgICAgIHJ1bkNvbXBsZXRlKHJvd3MpO1xuICB9LFxuICAvLyByZWFkIGEgdmFsdWUgZnJvbSB0aGUgaW5wdXRcbiAgLy8gaXQgaGFzIGEgJywnIGlzIHNldCBmb3IgdmFyaWF0aW9uXG4gIF9yZWFkVmFsIDogZnVuY3Rpb24oZWxlKSB7XG4gICAgICB2YXIgdmFsID0gZWxlLnZhbCgpO1xuICAgICAgaWYoIHZhbC5tYXRjaCgvXFxkKi1cXGQqLVxcZCokLykgKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH0gZWxzZSBpZiggdmFsLm1hdGNoKC8uKiwuKi8pICkge1xuICAgICAgICAgIHZhbCA9IHZhbC5yZXBsYWNlKC9cXHMvZywnJykuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgIHZhciBpZCA9IGVsZS5hdHRyKFwiaWRcIikucmVwbGFjZSgvXmlucHV0LS8sJycpLnJlcGxhY2UoLy0vZywnLicpO1xuICAgICAgICAgIHdpbmRvdy52YXJpYXRpb25zW2lkXSA9IFtdO1xuICAgICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgICB3aW5kb3cudmFyaWF0aW9uc1tpZF0ucHVzaChwYXJzZUZsb2F0KHZhbFtpXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gd2luZG93LnZhcmlhdGlvbnNbaWRdWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsKTtcbiAgfSxcbiAgcmVhZEZyb21JbnB1dHMgOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIHJlYWQgc29pbFxuICAgICAgd2luZG93LnNvaWwgPSB7fTtcbiAgICAgIHdpbmRvdy5zb2lsLm1heEFXUyA9IHRoaXMuX3JlYWRWYWwoJChcIiNpbnB1dC1zb2lsLW1heGF3c1wiKSk7XG4gICAgICB3aW5kb3cuc29pbC5zd3Bvd2VyID0gdGhpcy5fcmVhZFZhbCgkKFwiI2lucHV0LXNvaWwtc3dwb3dlclwiKSk7XG4gICAgICB3aW5kb3cuc29pbC5zd2NvbnN0ID0gdGhpcy5fcmVhZFZhbCgkKFwiI2lucHV0LXNvaWwtc3djb25zdFwiKSk7XG5cbiAgICAgIC8vIHJlYWQgbWFuYWdlXG4gICAgICB3aW5kb3cubWFuYWdlID0ge1xuICAgICAgICAgIGNvcHBpY2UgOiBmYWxzZVxuICAgICAgfTtcbiAgICAgIHZhciBlbGVzID0gJChcIi5tYW5hZ2VcIik7XG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGVsZSA9ICQoZWxlc1tpXSk7XG4gICAgICAgICAgd2luZG93Lm1hbmFnZVtlbGUuYXR0cihcImlkXCIpLnJlcGxhY2UoXCJpbnB1dC1tYW5hZ2UtXCIsIFwiXCIpXSA9IHRoaXMuX3JlYWRWYWwoZWxlKTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVhZCBwbGFudGF0aW9uXG4gICAgICB3aW5kb3cucGxhbnRhdGlvbiA9IHt9O1xuICAgICAgZWxlcyA9ICQoXCIucGxhbnRhdGlvblwiKTtcbiAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgZWxlID0gJChlbGVzW2ldKTtcbiAgICAgICAgICB3aW5kb3cucGxhbnRhdGlvbltlbGUuYXR0cihcImlkXCIpLnJlcGxhY2UoXCJpbnB1dC1wbGFudGF0aW9uLVwiLCBcIlwiKV0gPSB0aGlzLl9yZWFkVmFsKGVsZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlYWQgdHJlZVxuICAgICAgdmFyIHRyZWVJbnB1dHMgPSAkKFwiLnRyZWVcIik7XG4gICAgICB3aW5kb3cudHJlZSA9IHt9O1xuICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgdHJlZUlucHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBlbGUgPSAkKHRyZWVJbnB1dHNbaV0pO1xuXG4gICAgICAgICAgdmFyIHBhcnRzID0gZWxlLmF0dHIoXCJpZFwiKS5yZXBsYWNlKFwiaW5wdXQtdHJlZS1cIiwgXCJcIikuc3BsaXQoXCItXCIpO1xuICAgICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICB3aW5kb3cudHJlZVtwYXJ0c1swXV0gPSB0aGlzLl9yZWFkVmFsKGVsZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCF3aW5kb3cudHJlZVtwYXJ0c1swXV0pXG4gICAgICAgICAgICAgICAgICB3aW5kb3cudHJlZVtwYXJ0c1swXV0gPSB7fTtcbiAgICAgICAgICAgICAgd2luZG93LnRyZWVbcGFydHNbMF1dW3BhcnRzWzFdXSA9IHRoaXMuX3JlYWRWYWwoZWxlKTtcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHJlYWQgcGxhbnRhdGlvbiBzdGF0ZVxuICAgICAgd2luZG93LnBsYW50YXRpb25fc3RhdGUgPSB7fTtcbiAgICAgIGZvciAoIHZhciBrZXkgaW4gXzNwZ01vZGVsLnBsYW50YXRpb25fc3RhdGUudmFsdWUpIHtcbiAgICAgICAgICB3aW5kb3cucGxhbnRhdGlvbl9zdGF0ZVtrZXldID0gLTE7XG4gICAgICB9XG5cbiAgfSxcbiAgZXhwb3J0U2V0dXAgOiBmdW5jdGlvbigpIHtcbiAgICAgIHdpbmRvdy52YXJpYXRpb25zID0ge307XG4gICAgICB0aGlzLnJlYWRGcm9tSW5wdXRzKCk7XG4gICAgICB0aGlzLnJlYWRXZWF0aGVyKFtdLCB7fSwge30pO1xuXG4gICAgICB2YXIgZXggPSB7XG4gICAgICAgICAgd2VhdGhlciA6IHdpbmRvdy53ZWF0aGVyLFxuICAgICAgICAgIGN1c3RvbV93ZWF0aGVyIDogd2luZG93LmN1c3RvbV93ZWF0aGVyLFxuICAgICAgICAgIHRyZWUgOiB3aW5kb3cudHJlZSxcbiAgICAgICAgICBwbGFudGF0aW9uIDogd2luZG93LnBsYW50YXRpb24sXG4gICAgICAgICAgbWFuYWdlIDogd2luZG93Lm1hbmFnZSxcbiAgICAgICAgICBzb2lsIDogd2luZG93LnNvaWwsXG4gICAgICAgICAgcGxhbnRpbmdQYXJhbXMgOiB3aW5kb3cucGxhbnRpbmdQYXJhbXMsXG4gICAgICAgICAgcGxhbnRhdGlvbl9zdGF0ZSA6IHdpbmRvdy5wbGFudGF0aW9uX3N0YXRlLFxuICAgICAgICAgIGNvbmZpZyA6IHtcbiAgICAgICAgICAgICAgY2hhcnRUeXBlSW5wdXQgOiAkKFwiI2NoYXJ0VHlwZUlucHV0XCIpLnZhbCgpLFxuICAgICAgICAgICAgICBtb250aHNUb1J1biA6IG1vbnRoc1RvUnVuKCksXG4gICAgICAgICAgICAgIGN1cnJlbnRMb2NhdGlvbiA6ICQoXCIjY3VycmVudC1sb2NhdGlvblwiKS5odG1sKCksXG4gICAgICAgICAgICAgIGxvYWRlZFRyZWUgOiAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbCgpLFxuICAgICAgICAgICAgICB2ZXJzaW9uIDogcXMoXCJ2ZXJzaW9uXCIpID8gcXMoXCJ2ZXJzaW9uXCIpIDogXCJtYXN0ZXJcIlxuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gYnkgZGVmYXVsdCB0aGUgcmVhZCBmdW5jdGlvbiBzZXQgdGhlIHZhcmlhdGlvbnMgdmFyaWFibGVzIGJ1dCBvbmx5XG4gICAgICAvLyByZXR1cm5zIHRoZSBmaXJzdCwgc2V0IHRoZSB2YXJpYXRpb24gcGFyYW1zIHRvIHRoZWlyIGNvcnJlY3QgdmFsdWVzXG4gICAgICBmb3IoIHZhciBrZXkgaW4gd2luZG93LnZhcmlhdGlvbnMgKSB7XG4gICAgICAgICAgdmFyIHBhcnRzID0ga2V5LnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICB2YXIgcGFyYW0gPSBleDtcbiAgICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aC0xOyBpKysgKSB7XG4gICAgICAgICAgICAgIHBhcmFtID0gcGFyYW1bcGFydHNbaV1dO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwYXJhbVtwYXJ0c1twYXJ0cy5sZW5ndGgtMV1dID0gd2luZG93LnZhcmlhdGlvbnNba2V5XS5qb2luKFwiLCBcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBleDtcbiAgfSxcbiAgbG9hZFRyZWUgOiBmdW5jdGlvbih0cmVlKSB7XG4gICAgICBmb3IgKCB2YXIgcm9vdEtleSBpbiB0cmVlKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB0cmVlW3Jvb3RLZXldICE9ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICQoXCIjaW5wdXQtdHJlZS1cIiArIHJvb3RLZXkpLnZhbCh0cmVlW3Jvb3RLZXldKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmb3IgKCB2YXIgY2hpbGRLZXkgaW4gdHJlZVtyb290S2V5XSkge1xuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC10cmVlLVwiICsgcm9vdEtleSArIFwiLVwiICsgY2hpbGRLZXkpLnZhbCh0cmVlW3Jvb3RLZXldW2NoaWxkS2V5XSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gIH0sXG4gIGxvYWRTZXR1cCA6IGZ1bmN0aW9uKGZpbGVpZCwgc2V0dXAsIGlzUnQpIHtcblxuICAgICAgLy8gZmlyc3QsIGlmIHRoZSB2ZXJzaW9uIGlzIG9mZiwgd2UgbmVlZCB0byByZWxvYWQgdGhlIGVudGlyZSBhcHBcbiAgICAgIGlmIChzZXR1cC5jb25maWcudmVyc2lvbikge1xuICAgICAgICAgIHZhciBjdmVyc2lvbiA9IHFzKFwidmVyc2lvblwiKSA/IHFzKFwidmVyc2lvblwiKSA6IFwibWFzdGVyXCI7XG4gICAgICAgICAgaWYgKGN2ZXJzaW9uICE9IHNldHVwLmNvbmZpZy52ZXJzaW9uKSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoLyMuKi8sICcnKVxuICAgICAgICAgICAgICAgICAgICAgICsgXCI/dmVyc2lvbj1cIiArIHNldHVwLmNvbmZpZy52ZXJzaW9uICsgXCImZmlsZT1cIlxuICAgICAgICAgICAgICAgICAgICAgICsgZmlsZWlkO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gbG9hZCBjb25maWdcbiAgICAgIGlmIChzZXR1cC5jb25maWcuY2hhcnRUeXBlSW5wdXQpIHtcbiAgICAgICAgICBjaGFydHMudW5zZWxlY3RBbGwoKTtcbiAgICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBzZXR1cC5jb25maWcuY2hhcnRUeXBlSW5wdXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgY2hhcnRzLnNlbGVjdChzZXR1cC5jb25maWcuY2hhcnRUeXBlSW5wdXRbaV0pO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzZXR1cC5jb25maWcuY3VycmVudExvY2F0aW9uKSB7XG4gICAgICAgICAgJChcIiNjdXJyZW50LWxvY2F0aW9uXCIpLmh0bWwoc2V0dXAuY29uZmlnLmN1cnJlbnRMb2NhdGlvbik7XG4gICAgICB9XG4gICAgICBpZiggc2V0dXAuY29uZmlnLmxvYWRlZFRyZWUgKSB7XG4gICAgICAgICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwoc2V0dXAuY29uZmlnLmxvYWRlZFRyZWUpLnBhcmVudCgpLnNob3coKTtcbiAgICAgIH1cblxuICAgICAgLy8gbG9hZCB3ZWF0aGVyXG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBzZXR1cC53ZWF0aGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgZm9yICggdmFyIGtleSBpbiBzZXR1cC53ZWF0aGVyW2ldKSB7XG4gICAgICAgICAgICAgIGlmIChrZXkgPT0gJ21vbnRoJylcbiAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICBpZiAoc2V0dXAud2VhdGhlcltpXVtrZXldICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIgKyBrZXkgKyBcIi1cIiArIGkpLnZhbChzZXR1cC53ZWF0aGVyW2ldW2tleV0pXG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIiArIGtleSArIFwiLVwiICsgaSkudmFsKFwiXCIpO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYoIHNldHVwLmN1c3RvbV93ZWF0aGVyICkge1xuICAgICAgICAgIHdpbmRvdy5jdXN0b21fd2VhdGhlciA9IHNldHVwLmN1c3RvbV93ZWF0aGVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cuY3VzdG9tX3dlYXRoZXIgPSB7fTtcbiAgICAgIH1cblxuICAgICAgLy8gY3JlYXRlIHRoZSBjaGFydFxuICAgICAgaW5wdXRGb3JtLnVwZGF0ZUF2ZXJhZ2VDaGFydCgpO1xuXG4gICAgICAvLyBsb2FkIHRyZWVcbiAgICAgIHRoaXMubG9hZFRyZWUoc2V0dXAudHJlZSk7XG5cbiAgICAgIC8vIGxvYWQgcGxhbnRpbmcgcGFyYW1zXG4gICAgICAvLyBOb3cgcGFydCBvZiBtYW5hZ2UuLi4uXG4gICAgICAvLyBmb1xuICAgICAgaWYgKHNldHVwLnBsYW50aW5nUGFyYW1zKSB7XG4gICAgICAgICAgdmFyIG1hcCA9IHtcbiAgICAgICAgICAgICAgXCJkYXRlUGxhbnRlZFwiIDogXCJEYXRlUGxhbnRlZFwiLFxuICAgICAgICAgICAgICBcImRhdGVDb3BwaWNlZFwiIDogXCJEYXRlQ29wcGljZWRcIixcbiAgICAgICAgICAgICAgXCJ5ZWFyc1BlckNvcHBpY2VcIiA6IFwiQ29wcGljZUludGVydmFsXCJcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3IgKCB2YXIga2V5IGluIHNldHVwLnBsYW50aW5nUGFyYW1zKSB7XG4gICAgICAgICAgICAgIHZhciBuZXdLZXkgPSBrZXk7XG4gICAgICAgICAgICAgIGlmKCBtYXBba2V5XSApIG5ld0tleSA9IG1hcFtrZXldO1xuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2V0dXAucGxhbnRpbmdQYXJhbXNba2V5XSA9PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICQoXCIjaW5wdXQtbWFuYWdlLVwiICsgbmV3S2V5KS52YWwoc2V0dXAucGxhbnRpbmdQYXJhbXNba2V5XS5yZXBsYWNlKC9ULiovLCAnJykpO1xuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LW1hbmFnZS1cIiArIG5ld0tleSkudmFsKHNldHVwLnBsYW50aW5nUGFyYW1zW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gdGhpcyB2YWx1ZSBpcyBkZXByZWNhdGVkLCBzZXQgdG8gbmV3IGlucHV0XG4gICAgICBpZiggc2V0dXAuY29uZmlnLm1vbnRoc1RvUnVuICkge1xuICAgICAgICAgIHZhciBkID0gbmV3IERhdGUoc2V0dXAucGxhbnRpbmdQYXJhbXMuZGF0ZVBsYW50ZWQpO1xuICAgICAgICAgIGQgPSBuZXcgRGF0ZShuZXcgRGF0ZShkKS5zZXRNb250aChkLmdldE1vbnRoKCkrcGFyc2VJbnQoc2V0dXAuY29uZmlnLm1vbnRoc1RvUnVuKSkpO1xuICAgICAgICAgICQoXCIjaW5wdXQtbWFuYWdlLURhdGVGaW5hbEhhcnZlc3RcIikudmFsKGQudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULiovLCAnJykpO1xuICAgICAgfVxuXG5cbiAgICAgIC8vIGxvYWQgcmVzdFxuICAgICAgdmFyIGlucHV0cyA9IFsgXCJwbGFudGF0aW9uXCIsIFwic29pbFwiLCBcIm1hbmFnZVwiIF07XG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBmb3IgKCB2YXIga2V5IGluIHNldHVwW2lucHV0c1tpXV0pIHtcbiAgICAgICAgICAgICAgaWYgKGtleSA9PSAnbWF4QVdTJykge1xuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC1zb2lsLW1heGF3c1wiKS52YWwoc2V0dXAuc29pbC5tYXhBV1MpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2Ygc2V0dXBbaW5wdXRzW2ldXVtrZXldID09ICdzdHJpbmcnICYmIHNldHVwW2lucHV0c1tpXV1ba2V5XS5tYXRjaCgvLipULipaJC8pICkge1xuICAgICAgICAgICAgICAgICAgJChcIiNpbnB1dC1cIiArIGlucHV0c1tpXSArIFwiLVwiICsga2V5KS52YWwoc2V0dXBbaW5wdXRzW2ldXVtrZXldLnJlcGxhY2UoL1QuKi8sICcnKSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAkKFwiI2lucHV0LVwiICsgaW5wdXRzW2ldICsgXCItXCIgKyBrZXkpLnZhbChzZXR1cFtpbnB1dHNbaV1dW2tleV0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBydW5Nb2RlbChpc1J0KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXQgOiBpbml0LFxuICBvdXRwdXRzIDogb3V0cHV0cyxcbiAgZ2V0TW9kZWwgOiBnZXRNb2RlbCxcbiAgcnVuTW9kZWwgOiBydW5Nb2RlbCxcbiAgc2hvd1Jhd091dHB1dCA6IHNob3dSYXdPdXRwdXQsXG4gIG91dHB1dERlZmluaXRpb25zIDogb3V0cHV0RGVmaW5pdGlvbnMsXG4gIHFzIDogcXMsXG4gIGxvYWRNb2RlbENvZGUgOiBsb2FkTW9kZWxDb2RlLFxuICBzZXRXZWF0aGVyIDogc2V0V2VhdGhlcixcblx0Z2RyaXZlIDogZ2RyaXZlXG59O1xuIiwidmFyIGFwcDtcblxuLy8gb25seSBkcmF3IGNoYXJ0cyBpZiB3aWR0aCBoYXMgY2hhbmdlZFxudmFyIGNXaWR0aCA9IDA7XG5cbi8vIHRoZXJlIGlzIG5vIHdheSB0byBnZXQgdGhlIGNvbG9ycyBmb3IgdGhlIGxlZ2VuZHMgKHRvIG1ha2UgeW91ciBvd24pXG4vLyB0aGlzIHBvc3Q6XG4vLyBnaXZlcyB0aGVzZSB2YWx1ZXMuICBUaGlzIGlzIGEgSEFDSywgaWYgdGhleSBldmVyIGNoYW5nZSwgd2UgbmVlZCB0byB1cGRhdGVcbnZhciBnb29nbGVDaGFydENvbG9ycyA9IFtcIiMzMzY2Y2NcIixcIiNkYzM5MTJcIixcIiNmZjk5MDBcIixcIiMxMDk2MThcIixcIiM5OTAwOTlcIixcIiMwMDk5YzZcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIiNkZDQ0NzdcIixcIiM2NmFhMDBcIixcIiNiODJlMmVcIixcIiMzMTYzOTVcIixcIiM5OTQ0OTlcIixcIiMyMmFhOTlcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIiNhYWFhMTFcIixcIiM2NjMzY2NcIixcIiNlNjczMDBcIixcIiM4YjA3MDdcIixcIiM2NTEwNjdcIixcIiMzMjkyNjJcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIiM1NTc0YTZcIixcIiMzYjNlYWNcIixcIiNiNzczMjJcIixcIiMxNmQ2MjBcIixcIiNiOTEzODNcIixcIiNmNDM1OWVcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIiM5YzU5MzVcIixcIiNhOWM0MTNcIixcIiMyYTc3OGRcIixcIiM2NjhkMWNcIixcIiNiZWE0MTNcIixcIiMwYzU5MjJcIlxuICAgICAgICAgICAgICAgICAgICAgICxcIiM3NDM0MTFcIl07XG5cbnZhciB3ZWF0aGVyQ2hhcnRPcHRpb25zID0ge1xuICB0aXRsZSA6ICdXZWF0aGVyJyxcbiAgaGVpZ2h0IDogMzAwLFxuICB2QXhlczogW3tcbiAgICAgICAgICB0aXRsZTogXCJSYWRpYXRpb24gKE1KL2RheSk7IFRlbXBlcmF0dXJlICheQyk7IERldyBQb2ludCAoXkMpOyBEYXlsaWdodCAoaClcIixcbiAgICAgICAgICBtaW5WYWx1ZSA6IC01LFxuICAgICAgICAgIG1heFZhbHVlIDogMzVcbiAgICAgICAgfSx7XG4gICAgICAgICAgdGl0bGU6IFwiUHJlY2lwaXRhdGlvbiAobW0pXCIsXG4gICAgICAgICAgbWluVmFsdWUgOiAtNTAsXG4gICAgICAgICAgbWF4VmFsdWUgOiAzNTBcbiAgICAgICAgfV0sXG4gIGhBeGlzOiB7dGl0bGU6IFwiTW9udGhcIn0sXG4gIHNlcmllc1R5cGU6IFwiYmFyc1wiLFxuICBzZXJpZXM6IHtcbiAgICAgIDA6IHt0eXBlOiBcImxpbmVcIiwgdGFyZ2V0QXhpc0luZGV4OjB9LFxuICAgICAgMToge3R5cGU6IFwibGluZVwiLCB0YXJnZXRBeGlzSW5kZXg6MH0sXG4gICAgICAyOiB7dHlwZTogXCJsaW5lXCIsIHRhcmdldEF4aXNJbmRleDowfSxcbiAgICAgIDM6IHt0eXBlOiBcImFyZWFcIiwgdGFyZ2V0QXhpc0luZGV4OjF9LFxuICAgICAgNDoge3RhcmdldEF4aXNJbmRleDowfVxuICB9XG59XG5cbi8vIHRlbXBsYXRlIGZvciB0aGUgcG9wdXBcbnZhciBzbGlkZXJQb3B1cCA9ICQoXG4gICAgICBcIjxkaXYgY2xhc3M9J3NsaWRlLXBvcHVwJz5cIiArXG4gICAgICAgICAgXCI8aSBjbGFzcz0naWNvbi1yZW1vdmUtY2lyY2xlIHB1bGwtcmlnaHQgc2xpZGUtcG9wdXAtY2xvc2UnPjwvaT5cIitcbiAgICAgICAgICBcIjxkaXYgaWQ9J2Nhcm91c2VsJyBjbGFzcz0nb3dsLWNhcm91c2VsIG93bC10aGVtZScgc3R5bGU9J21hcmdpbi10b3A6MTVweCc+PC9kaXY+XCIgK1xuXHRcIjwvZGl2PlwiKTtcblxudmFyIHNsaWRlclBvcHVwQmcgPSAkKFwiPGRpdiBjbGFzcz0nc2xpZGUtcG9wdXAtYmcnPiZuYnNwOzwvZGl2PlwiKTtcblxuLy8gb25seSBkcmF3IGNoYXJ0cyBpZiBzb21lb25lIGhhcyBjbGljayBhIGNoZWNrYm94XG52YXIgY2hhbmdlcyA9IGZhbHNlO1xuXG4vLyB3aGVuIHNpemluZywgd2FpdCBhIH4zMDBtcyBiZWZvcmUgdHJpZ2dlcmluZyByZWRyYXdcbnZhciByZXNpemVUaW1lciA9IC0xO1xuXG52YXIgY2hhcnRUeXBlU2VsZWN0b3IsIGNoYXJ0Q2hlY2tib3hlcywgY0RhdGE7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG5cbiAgJChcIiNzaG93LWNoYXJ0c3BvcHVwLWJ0blwiKS5vbignY2xpY2snLGZ1bmN0aW9uKCkge1xuICAgICAgc2hvd1BvcHVwKCk7XG4gIH0pO1xuXG4gIC8vIHNldHVwIGNoYXJ0IHNlbGVjdG9yc1xuICAkKFwiI2NoYXJ0LW1vZGFsXCIpLm1vZGFsKHtzaG93OmZhbHNlfSk7XG5cbiAgLy8gc2V0IHBvcHVwIGNsaWNrIGhhbmRsZXJzXG4gICQoXCIjY2hhcnRUeXBlLXNlbGVjdEFsbFwiKS5vbignY2xpY2snLHNlbGVjdEFsbCk7XG4gICQoXCIjY2hhcnRUeXBlLXVuc2VsZWN0QWxsXCIpLm9uKCdjbGljaycsdW5zZWxlY3RBbGwpO1xuXG4gIGNoYXJ0VHlwZVNlbGVjdG9yID0gJChcIiNjaGFydFR5cGVJbnB1dFwiKTtcbiAgY2hhcnRDaGVja2JveGVzID0gJChcIiNjaGFydFNlbGVjdGlvbnNcIik7XG5cbiAgdmFyIGMxID0gJChcIiNjaGFydFNlbGVjdGlvbnMtYzFcIik7XG4gIHZhciBjMiA9ICQoXCIjY2hhcnRTZWxlY3Rpb25zLWMyXCIpO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGFwcC5vdXRwdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdmFsID0gYXBwLm91dHB1dHNbaV07XG4gICAgICBjaGFydFR5cGVTZWxlY3Rvci5hcHBlbmQoJChcIjxvcHRpb24gdmFsdWU9J1wiICsgdmFsICsgXCInIFwiXG4gICAgICAgICAgICAgICsgKHZhbCA9PSAnV1InIHx8IHZhbCA9PSAnV1MnIHx8IHZhbCA9PSAnV0YnID8gJ3NlbGVjdGVkJyA6ICcnKVxuICAgICAgICAgICAgICArIFwiPlwiICsgdmFsICsgXCI8L29wdGlvbj5cIikpO1xuXG4gICAgICBpZiggaSAlIDIgPT0gMCApIHtcbiAgICAgICAgICBjMS5hcHBlbmQoJCgnPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+PGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIidcbiAgICAgICAgICAgICAgICAgICsgKHZhbCA9PSAnV1InIHx8IHZhbCA9PSAnV1MnIHx8IHZhbCA9PSAnV0YnID8gJ2NoZWNrZWQ9XCJjaGVja2VkXCInIDogJycpXG4gICAgICAgICAgICAgICAgICArICcgdmFsdWU9XCInK3ZhbCsnXCI+ICcrX2NyZWF0ZURlc2NyaXB0aW9uKHZhbCkrJzwvZGl2PicpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYzIuYXBwZW5kKCQoJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCInXG4gICAgICAgICAgICAgICAgICArICh2YWwgPT0gJ1dSJyB8fCB2YWwgPT0gJ1dTJyB8fCB2YWwgPT0gJ1dGJyA/ICdjaGVja2VkPVwiY2hlY2tlZFwiJyA6ICcnKVxuICAgICAgICAgICAgICAgICAgKyAnIHZhbHVlPVwiJyt2YWwrJ1wiPiAnK19jcmVhdGVEZXNjcmlwdGlvbih2YWwpKyc8L2Rpdj4nKSk7XG4gICAgICB9XG4gIH1cblxuICBjaGFydENoZWNrYm94ZXMuZmluZChcIi5mbi10b2dnbGVcIikub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgJChcIiNcIiskKHRoaXMpLmF0dHIoXCJkYXRhdGFyZ2V0XCIpKS50b2dnbGUoJ3Nsb3cnKTtcbiAgfSk7XG5cbiAgY2hhcnRDaGVja2JveGVzLmZpbmQoXCJpbnB1dFt0eXBlPWNoZWNrYm94XVwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgIGlmKCAkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikgKSBzZWxlY3QoJCh0aGlzKS5hdHRyKFwidmFsdWVcIikpO1xuICAgICAgZWxzZSB1bnNlbGVjdCgkKHRoaXMpLmF0dHIoXCJ2YWx1ZVwiKSk7XG4gIH0pO1xuXG4gICQoXCIjc2VsZWN0LWNoYXJ0cy1idG4sICNzZWxlY3QtY2hhcnRzLXRpdGxlLWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgJChcIiNjaGFydC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICAgICAgY2hhbmdlcyA9IGZhbHNlO1xuICB9KTtcblxuICAkKFwiLmNoYXJ0LW1vZGFsLWNsb3NlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAkKFwiI2NoYXJ0LW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICBpZiggY2hhbmdlcyAmJiBjRGF0YSApIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIHVwZGF0ZUNoYXJ0cygpO1xuICAgICAgICAgICAgICAvLyB1cGRhdGUgcmF3IGRhdGEgYXMgd2VsbFxuICAgICAgICAgICAgICBhcHAuc2hvd1Jhd091dHB1dChjRGF0YSk7XG4gICAgICAgICAgfSw0MDApO1xuXG4gICAgICB9XG4gIH0pO1xuXG4gICQoXCIuY2hhcnQtdHlwZS10b2dnbGVcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIGlmKCAhJCh0aGlzKS5oYXNDbGFzcyhcImFjdGl2ZVwiKSApIHtcbiAgICAgICAgICAkKFwiLmNoYXJ0LXR5cGUtdG9nZ2xlLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAgIHVwZGF0ZUNoYXJ0cygpO1xuICAgICAgfVxuICB9KTtcbn1cblxuLy8gbWFrZSBzdXJlIGFuZCBlbmQgbGFiZWwgdGFnXG5mdW5jdGlvbiBfY3JlYXRlRGVzY3JpcHRpb24odmFsKSB7XG4gIGlmKCAhYXBwLm91dHB1dERlZmluaXRpb25zW3ZhbF0gKSByZXR1cm4gXCI8Yj5cIit2YWwrXCI8L2I+PC9sYWJlbD5cIjtcblxuICB2YXIgZGVzYyA9IGFwcC5vdXRwdXREZWZpbml0aW9uc1t2YWxdO1xuICB2YXIgbGFiZWwgPSBkZXNjLmxhYmVsICYmIGRlc2MubGFiZWwubGVuZ3RoID4gMCA/IFwiIC0gXCIrZGVzYy5sYWJlbCA6IFwiXCI7XG4gIHZhciB1bml0cyA9IGRlc2MudW5pdHMgJiYgZGVzYy51bml0cy5sZW5ndGggPiAwID8gXCIgW1wiK2Rlc2MudW5pdHMrXCJdXCIgOiBcIlwiO1xuXG4gIHZhciBsYWJlbCA9IFwiPGI+XCIrdmFsK1wiPC9iPjxzcGFuIHN0eWxlPSdmb250LXNpemU6MTJweCc+XCIrbGFiZWwrdW5pdHMrXCI8L3NwYW4+PC9sYWJlbD5cIjtcbiAgdmFyIGhhc0Rlc2MgPSBkZXNjLmRlc2NyaXB0aW9uICYmIGRlc2MuZGVzY3JpcHRpb24ubGVuZ3RoID4gMDtcbiAgaWYoIGhhc0Rlc2MgKSB7XG4gICAgICBsYWJlbCArPSBcIjxkaXYgc3R5bGU9J2ZvbnQtc2l6ZToxMXB4O2NvbG9yOiM4ODg7Zm9udC1zdHlsZTppdGFsaWMnPlwiK2Rlc2MuZGVzY3JpcHRpb247XG4gIH1cblxuICB2YXIgZk5hbWUgPSBkZXNjLmFsdEZuTmFtZSB8fCB2YWw7XG4gIGlmKCBtM1BHRnVuY1tmTmFtZV0gfHwgbTNQR0Z1bmMuY29wcGljZVtmTmFtZV0gfHwgZGVzYy5mbiApIHtcbiAgICAgIGlmKCAhaGFzRGVzYyApIGxhYmVsICs9IFwiPGRpdiBzdHlsZT0nZm9udC1zaXplOjExcHgnPlwiO1xuICAgICAgbGFiZWwgKz0gXCIgPGEgc3R5bGU9J2ZvbnQtc3R5bGU6bm9ybWFsO2N1cnNvcjpwb2ludGVyJyBkYXRhdGFyZ2V0PSdmbi1kZXNjLVwiK3ZhbCtcIicgY2xhc3M9J2ZuLXRvZ2dsZSc+Zm4oKTwvYT48L2Rpdj5cIjtcblxuICAgICAgbGFiZWwgKz0gXCI8ZGl2IGlkPSdmbi1kZXNjLVwiK3ZhbCtcIicgc3R5bGU9J2Rpc3BsYXk6bm9uZTtmb250LXNpemU6MTFweDtvdmVyZmxvdzphdXRvJyBjbGFzcz0nd2VsbCB3ZWxsLXNtJz5cIitcbiAgICAgICAgICAgICAgICAgIChtM1BHRnVuY1tmTmFtZV18fG0zUEdGdW5jLmNvcHBpY2VbZk5hbWVdfHxkZXNjLmZuKS50b1N0cmluZygpLnJlcGxhY2UoLyAvZywnJm5ic3A7JykucmVwbGFjZSgvXFxuL2csJzxiciAvPicpK1wiPC9kaXY+XCI7XG4gIH0gZWxzZSBpZiAoIGhhc0Rlc2MgKSB7XG4gICAgICBsYWJlbCArPSBcIjwvZGl2PlwiXG4gIH1cblxuICAvLyBUT0RPOiBhZGQgZm4gd2VsbFxuICByZXR1cm4gbGFiZWwrXCI8YnIgLz5cIlxufVxuXG5mdW5jdGlvbiBzZWxlY3QodmFsKSB7XG4gIGNoYXJ0VHlwZVNlbGVjdG9yLmZpbmQoXCJvcHRpb25bdmFsdWU9XCIrdmFsK1wiXVwiKS5hdHRyKFwic2VsZWN0ZWRcIixcInNlbGVjdGVkXCIpO1xuICBjaGFydENoZWNrYm94ZXMuZmluZChcImlucHV0W3ZhbHVlPVwiK3ZhbCtcIl1cIikucHJvcChcImNoZWNrZWRcIix0cnVlKTtcbiAgY2hhbmdlcyA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIHVuc2VsZWN0KHZhbCkge1xuICBjaGFydFR5cGVTZWxlY3Rvci5maW5kKFwib3B0aW9uW3ZhbHVlPVwiK3ZhbCtcIl1cIikucmVtb3ZlQXR0cihcInNlbGVjdGVkXCIpO1xuICBjaGFydENoZWNrYm94ZXMuZmluZChcImlucHV0W3ZhbHVlPVwiK3ZhbCtcIl1cIikucHJvcChcImNoZWNrZWRcIixmYWxzZSk7XG4gIGNoYW5nZXMgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBzZWxlY3RBbGwoKSB7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgYXBwLm91dHB1dHMubGVuZ3RoOyBpKyspIHNlbGVjdChhcHAub3V0cHV0c1tpXSk7XG59XG5cbmZ1bmN0aW9uIHVuc2VsZWN0QWxsKCkge1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGFwcC5vdXRwdXRzLmxlbmd0aDsgaSsrKSB1bnNlbGVjdChhcHAub3V0cHV0c1tpXSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZShlbGUpIHtcbiAgZWxlLnBhcmVudCgpLmhpZGUoJ3Nsb3cnLCBmdW5jdGlvbigpe1xuICAgICAgZWxlLnBhcmVudCgpLnJlbW92ZSgpO1xuICAgICAgdW5zZWxlY3QoZWxlLmF0dHIoJ3R5cGUnKSk7XG4gIH0pO1xuXG59XG5cbmZ1bmN0aW9uIHByaW50KGNoYXJ0Q29udGFpbmVyKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3ByaW50LWNoYXJ0JywgMSk7XG5cblxudmFyIGRpc3Bfc2V0dGluZz1cInRvb2xiYXI9eWVzLGxvY2F0aW9uPW5vLGRpcmVjdG9yaWVzPXllcyxtZW51YmFyPXllcyxcIjtcbiAgZGlzcF9zZXR0aW5nKz1cInNjcm9sbGJhcnM9eWVzLHdpZHRoPTgwMCwgaGVpZ2h0PTYwMCwgbGVmdD0yNSwgdG9wPTI1XCI7XG5cbiAgdmFyIHN2ZyA9IGNoYXJ0Q29udGFpbmVyLmZpbmQoXCJzdmdcIik7XG4gIHZhciBodG1sID0gY2hhcnRDb250YWluZXIuZmluZChcImRpdlwiKS5odG1sKCk7XG5cbiAgdmFyIGRvY3ByaW50PXdpbmRvdy5vcGVuKFwiXCIsXCJcIixkaXNwX3NldHRpbmcpO1xuICBkb2NwcmludC5kb2N1bWVudC5vcGVuKCk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKCc8aHRtbD48aGVhZD48dGl0bGU+PC90aXRsZT4nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQud3JpdGUoJzwvaGVhZD48Ym9keSBtYXJnaW53aWR0aD1cIjBcIiBtYXJnaW5oZWlnaHQ9XCIwXCIgb25Mb2FkPVwic2VsZi5wcmludCgpXCI+PGNlbnRlcj4nKTtcbiAgZG9jcHJpbnQuZG9jdW1lbnQud3JpdGUoaHRtbCk7XG4gIGRvY3ByaW50LmRvY3VtZW50LndyaXRlKCc8L2NlbnRlcj48L2JvZHk+PC9odG1sPicpO1xuICBkb2NwcmludC5kb2N1bWVudC5jbG9zZSgpO1xuICBkb2NwcmludC5mb2N1cygpO1xuXG59XG5cblxuZnVuY3Rpb24gc2V0RGF0YShkYXRhKSB7XG4gIGNEYXRhID0gZGF0YTtcbn1cblxuLy8gYmFzaWNhbGx5IHJlZHJhdyBldmVyeXRoaW5nXG5mdW5jdGlvbiByZXNpemUoKSB7XG4gIC8vIHJlcXVpcmUgbW9yZSB0aGFuIGEgMzAgcGl4ZWwgd2lkdGggY2hhbmdlIChzbyB3ZSBkb24ndCByZWRyYXcgdy8gc2Nyb2xsIGJhcnMgYWRkZWQpXG4gIHZhciB3aW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuICBpZiggY1dpZHRoID4gd2luV2lkdGggLSAxNSAmJiBjV2lkdGggPCB3aW5XaWR0aCArIDE1ICkgcmV0dXJuO1xuICBjV2lkdGggPSB3aW5XaWR0aDtcblxuICBpZiggcmVzaXplVGltZXIgIT0gLTEgKSBjbGVhclRpbWVvdXQocmVzaXplVGltZXIpO1xuICByZXNpemVUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICByZXNpemVUaW1lciA9IC0xO1xuICAgICAgdXBkYXRlQ2hhcnRzKCk7XG4gIH0sMzAwKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ2hhcnRzKHJlc3VsdHMsIGFuaW1hdGUpIHtcbiAgaWYoIHJlc3VsdHMgKSBzZXREYXRhKHJlc3VsdHMpO1xuICBpZiggIWNEYXRhICkgcmV0dXJuO1xuXG4gICQoXCIjc2hvdy1jaGFydHNwb3B1cC1idG5cIikuc2hvdygpO1xuXG4gIC8vIGNyZWF0ZSBhIGxlZ2VuZCBpZiB0aGVyZSBpcyBtb3JlIHRoYW4gb25lIHJ1blxuICB2YXIgbGVnZW5kID0gXCJcIjtcbiAgaWYoICFjRGF0YVswXS5zaW5nbGVSdW4gKSB7XG4gICAgICB2YXIgYzEgPSBcIlwiO1xuICAgICAgdmFyIGMyID0gXCJcIjtcbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgY0RhdGEubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgdmFyIGVsZSA9IFwiPGRpdiBzdHlsZT0nbWluLWhlaWdodDo0MHB4O21hcmdpbi1ib3R0b206MTBweCc+PGRpdiBjbGFzcz0nbGVnZW5kLXNxdWFyZScgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6XCIrZ29vZ2xlQ2hhcnRDb2xvcnNbaV0rXCInPiZuYnNwOzwvZGl2PlwiO1xuICAgICAgICAgIGZvciggdmFyIG1UeXBlIGluIGNEYXRhW2ldLmlucHV0cyApIHtcbiAgICAgICAgICAgICAgZWxlICs9IFwiPGRpdiBjbGFzcz0nbGVnZW5kLXRleHQnPlwiK21UeXBlK1wiPVwiK2NEYXRhW2ldLmlucHV0c1ttVHlwZV0rXCI8L2Rpdj5cIjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiggaSAlIDIgPT0gMCApIGMxICs9IGVsZSArIFwiPC9kaXY+XCJcbiAgICAgICAgICBlbHNlIGMyICs9IGVsZSArIFwiPC9kaXY+XCJcbiAgICAgIH1cbiAgICAgIGxlZ2VuZCA9IFwiPGRpdj48YSBpZD0nbGVnZW5kLXBhbmVsLXRvZ2dsZScgc3R5bGU9J21hcmdpbi1sZWZ0OjVweDtjdXJzb3I6cG9pbnRlcic+TGVnZW5kPC9hPjwvZGl2PlwiK1xuICAgICAgICAgICAgICAgXCI8ZGl2IHN0eWxlPSdib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZWVlO3BhZGRpbmctYm90dG9tOjVweDttYXJnaW4tYm90dG9tOjE1cHgnPlwiK1xuICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdyb3cnIGlkPSdsZWdlbmQtcGFuZWwnPjxkaXYgY2xhc3M9J2NvbC1zbS02Jz5cIitjMStcIjwvZGl2PlwiK1xuICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdjb2wtc20tNic+XCIrYzIrXCI8L2Rpdj5cIitcbiAgICAgICAgICAgICAgIFwiPC9kaXY+PC9kaXY+XCI7XG4gIH1cbiAgJChcIiNjaGFydC1jb250ZW50XCIpLmh0bWwobGVnZW5kKTtcbiAgJChcIiNsZWdlbmQtcGFuZWwtdG9nZ2xlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAkKFwiI2xlZ2VuZC1wYW5lbFwiKS50b2dnbGUoXCJzbG93XCIpO1xuICB9KTtcblxuXG4gIHZhciB0eXBlcyA9IGNoYXJ0VHlwZVNlbGVjdG9yLnZhbCgpO1xuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgX3Nob3dNYWluQ2hhcnQodHlwZXNbaV0sIGFuaW1hdGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNob3dQb3B1cCgpIHtcbiAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnc2hvdy1jaGFydC1wb3B1cCcsIDEpO1xuXG5cbiAgc2xpZGVyUG9wdXAuZmluZChcIi5vd2wtdGhlbWVcIikuaHRtbChcIlwiKTtcbiAgJCgnYm9keScpLnNjcm9sbFRvcCgwKS5jc3MoJ292ZXJmbG93JywnaGlkZGVuJykuYXBwZW5kKHNsaWRlclBvcHVwQmcpLmFwcGVuZChzbGlkZXJQb3B1cCk7XG5cbiAgLy8gdGhpcyBjb3VsZCBjYXNlIGJhZG5lc3MuLi4uICB3aHkgZG9lc24ndCBpdCBsaXZlIHdoZW4gcmVtb3ZlZCBmcm9tIERPTT9cbiAgc2xpZGVyUG9wdXAuZmluZCgnLnNsaWRlLXBvcHVwLWNsb3NlJykub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgaGlkZVBvcHVwKCk7XG4gIH0pO1xuXG4gIHZhciB0eXBlcyA9IGNoYXJ0VHlwZVNlbGVjdG9yLnZhbCgpO1xuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgX3Nob3dQb3B1cENoYXJ0KHR5cGVzW2ldKTtcbiAgfVxuXG4gICQoJyNjYXJvdXNlbCcpLm93bENhcm91c2VsKHtcbiAgICAgIG5hdmlnYXRpb24gOiB0cnVlLCAvLyBTaG93IG5leHQgYW5kIHByZXYgYnV0dG9uc1xuICAgICAgc2xpZGVTcGVlZCA6IDMwMCxcbiAgICAgIHBhZ2luYXRpb25TcGVlZCA6IDQwMCxcbiAgICAgIHNpbmdsZUl0ZW06dHJ1ZVxuICB9KTtcbn1cblxuZnVuY3Rpb24gaGlkZVBvcHVwKCkge1xuICBzbGlkZXJQb3B1cEJnLnJlbW92ZSgpO1xuICBzbGlkZXJQb3B1cC5yZW1vdmUoKTtcbiAgJCgnYm9keScpLmNzcygnb3ZlcmZsb3cnLCdhdXRvJyk7XG59XG5cbmZ1bmN0aW9uIF9zaG93TWFpbkNoYXJ0KHR5cGUsIGFuaW1hdGUpIHtcbiAgdmFyIGNoYXJ0VHlwZSA9ICQoXCIuY2hhcnQtdHlwZS10b2dnbGUuYWN0aXZlXCIpLmF0dHIoXCJ2YWx1ZVwiKTtcbiAgdmFyIHBhbmVsID0gJChcIjxkaXYgLz5cIik7XG4gIHZhciBvdXRlclBhbmVsID0gJChcIjxkaXY+XCIrXG4gIFx0XCI8YSBjbGFzcz0nYnRuIGJ0bi14cyBidG4tZGVmYXVsdCcgc3R5bGU9J1wiKyhjaGFydFR5cGUgIT0gXCJ0aW1lbGluZVwiID8gXCJwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwO21hcmdpbjowIDAgLTIwcHggMjBweFwiIDogXCJtYXJnaW4tYm90dG9tOjVweFwiKStcbiAgICAgIFwiJyB0eXBlPSdcIit0eXBlK1wiJz5cIiArXG4gIFx0XCI8aSBjbGFzcz0naWNvbi1yZW1vdmUnPjwvaT4gXCIrdHlwZStcIjwvYT48L2Rpdj5cIik7XG4gIG91dGVyUGFuZWwuZmluZChcImFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICByZW1vdmUoJCh0aGlzKSk7XG4gIH0pO1xuICBpZiggY2hhcnRUeXBlID09IFwidGltZWxpbmVcIiApIG91dGVyUGFuZWwuY3NzKFwibWFyZ2luLWJvdHRvbVwiLFwiMjBweFwiKTtcbiAgJChcIiNjaGFydC1jb250ZW50XCIpLmFwcGVuZChvdXRlclBhbmVsLmFwcGVuZChwYW5lbCkpO1xuICBfY3JlYXRlQ2hhcnQodHlwZSwgY2hhcnRUeXBlLCBwYW5lbCwgZmFsc2UsIG51bGwsIGFuaW1hdGUpO1xufVxuXG5mdW5jdGlvbiBfc2hvd1BvcHVwQ2hhcnQodHlwZSkge1xuICB2YXIgcGFuZWwgPSAkKFwiPGRpdiBjbGFzcz0naXRlbSc+PC9kaXY+XCIpO1xuXG4gIHZhciBwcmludEJ0biA9ICQoXCI8YSBjbGFzcz0nYnRuIGJ0bi1zbSBidG4tZGVmYXVsdCcgc3R5bGU9J21hcmdpbi1sZWZ0OjE2cHgnPjxpIGNsYXNzPSdpY29uLXByaW50Jz48L2k+IFByaW50PC9hPlwiKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgIHByaW50KGNoYXJ0UGFuZWwpO1xuICB9KTtcbiAgcGFuZWwuYXBwZW5kKHByaW50QnRuKTtcblxuICB2YXIgY2hhcnRQYW5lbCA9ICQoXCI8ZGl2PjwvZGl2PlwiKTtcbiAgcGFuZWwuYXBwZW5kKGNoYXJ0UGFuZWwpO1xuXG4gIHNsaWRlclBvcHVwLmZpbmQoXCIub3dsLXRoZW1lXCIpLmFwcGVuZChwYW5lbCk7XG4gIF9jcmVhdGVDaGFydCh0eXBlLCAnbGluZScsIGNoYXJ0UGFuZWwsIHRydWUsIFtNYXRoLnJvdW5kKCQod2luZG93KS53aWR0aCgpKi44OCksIE1hdGgucm91bmQoKCQod2luZG93KS5oZWlnaHQoKSouOTApLTEyNSldKTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNoYXJ0KHR5cGUsIGNoYXJ0VHlwZSwgcGFuZWwsIHNob3dMZWdlbmQsIHNpemUsIGFuaW1hdGUpIHtcbiAgdmFyIGNvbCA9IDA7XG5cbiAgdmFyIGR0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkRhdGFUYWJsZSgpO1xuXG4gIGlmKCBjaGFydFR5cGUgPT0gJ3RpbWVsaW5lJyApIHtcbiAgICAgIGR0LmFkZENvbHVtbignZGF0ZScsICdNb250aCcpO1xuICB9IGVsc2Uge1xuICAgICAgLy9kdC5hZGRDb2x1bW4oJ251bWJlcicsICdNb250aCcpO1xuICAgICAgZHQuYWRkQ29sdW1uKCdzdHJpbmcnLCAnTW9udGgnKTtcbiAgfVxuXG4gIC8vIHNldCB0aGUgZmlyc3QgY29sdW1uXG4gIGlmKCAhY0RhdGFbMF0uc2luZ2xlUnVuICkge1xuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBjRGF0YS5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICB2YXIgbGFiZWwgPSBcIlwiO1xuICAgICAgICAgIGZvciggdmFyIGtleSBpbiBjRGF0YVtpXS5pbnB1dHMgKSB7XG4gICAgICAgICAgICAgIGxhYmVsICs9IGtleS5yZXBsYWNlKC8uKlxcLi8sJycpK1wiPVwiK2NEYXRhW2ldLmlucHV0c1trZXldK1wiIFxcblwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsYWJlbCA9IGxhYmVsLnJlcGxhY2UoLyxcXHMkLywnJyk7XG4gICAgICAgICAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCBsYWJlbCk7XG4gICAgICB9XG4gIH0gZWxzZSB7XG4gICAgICBkdC5hZGRDb2x1bW4oJ251bWJlcicsIHR5cGUpO1xuICB9XG5cbiAgLy8gZmluZCB0aGUgY29sdW1uIHdlIHdhbnQgdG8gY2hhcnRcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgY0RhdGFbMF0ub3V0cHV0WzBdLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY0RhdGFbMF0ub3V0cHV0WzBdW2ldID09IHR5cGUpIHtcbiAgICAgICAgICBjb2wgPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICB9XG5cbiAgdmFyIGNEYXRlID0gbmV3IERhdGUoJChcIiNpbnB1dC1tYW5hZ2UtRGF0ZVBsYW50ZWRcIikudmFsKCkpO1xuXG4gIHZhciBkYXRhID0gW107XG4gIHZhciBtYXggPSAwO1xuICAvLyBjcmVhdGUgdGhlIFtdW10gYXJyYXkgZm9yIHRoZSBnb29nbGUgY2hhcnRcbiAgZm9yICggdmFyIGkgPSAxOyBpIDwgY0RhdGFbMF0ub3V0cHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodHlwZW9mIGNEYXRhWzBdLm91dHB1dFtpXVtjb2xdID09PSAnc3RyaW5nJykgY29udGludWU7XG5cbiAgICAgIHZhciByb3cgPSBbXTtcbiAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoY0RhdGUuZ2V0WWVhcigpKzE5MDAsIGNEYXRlLmdldE1vbnRoKCkraSwgY0RhdGUuZ2V0RGF0ZSgpKTtcbiAgICAgIGlmKCBjaGFydFR5cGUgPT0gXCJ0aW1lbGluZVwiICkge1xuICAgICAgICAgIC8vIGFkZCBvbiBtb250aFxuICAgICAgICAgIHJvdy5wdXNoKGRhdGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgbSA9IGRhdGUuZ2V0TW9udGgoKSsxO1xuICAgICAgICAgIGlmKCBtIDwgMTAgKSBtID0gJzAnK207XG4gICAgICAgICAgcm93LnB1c2goaSsnOiAnK2RhdGUuZ2V0RnVsbFllYXIoKSsnLScrbSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAoIHZhciBqID0gMDsgaiA8IGNEYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYoIGNEYXRhW2pdLm91dHB1dFtpXVtjb2xdID4gbWF4ICkgbWF4ID0gY0RhdGFbal0ub3V0cHV0W2ldW2NvbF07XG4gICAgICAgICAgcm93LnB1c2goY0RhdGFbal0ub3V0cHV0W2ldW2NvbF0pO1xuICAgICAgfVxuICAgICAgZGF0YS5wdXNoKHJvdyk7XG4gIH1cblxuICBkdC5hZGRSb3dzKGRhdGEpO1xuXG4gIGlmKCBhcHAub3V0cHV0RGVmaW5pdGlvbnNbdHlwZV0gKSB7XG4gICAgICB2YXIgZGVzYyA9IGFwcC5vdXRwdXREZWZpbml0aW9uc1t0eXBlXTtcbiAgICAgIHZhciBsYWJlbCA9IGRlc2MubGFiZWwgJiYgZGVzYy5sYWJlbC5sZW5ndGggPiAwID8gXCIgLSBcIitkZXNjLmxhYmVsIDogXCJcIjtcbiAgICAgIHZhciB1bml0cyA9IGRlc2MudW5pdHMgJiYgZGVzYy51bml0cy5sZW5ndGggPiAwID8gXCIgW1wiK2Rlc2MudW5pdHMrXCJdXCIgOiBcIlwiO1xuICAgICAgdHlwZSA9IHR5cGUrbGFiZWwrdW5pdHM7XG4gIH1cblxuXG4gIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgIHZBeGlzIDoge1xuICAgICAgICAgICAgICB0aXRsZSA6IHR5cGVcbiAgICAgICAgICB9LFxuICAgICAgICAgIGhBeGlzIDoge1xuICAgICAgICAgICAgICB0aXRsZSA6IFwiTW9udGhcIlxuICAgICAgICAgIH1cbiAgfVxuICBpZiggIXNob3dMZWdlbmQgKSBvcHRpb25zLmxlZ2VuZCA9IHtwb3NpdGlvbjpcIm5vbmVcIn07XG5cbiAgaWYoIHNpemUgKSB7XG4gICAgICBvcHRpb25zLndpZHRoID0gc2l6ZVswXTtcbiAgICAgIG9wdGlvbnMuaGVpZ2h0ID0gc2l6ZVsxXTtcbiAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMud2lkdGggPSBwYW5lbC53aWR0aCgpO1xuICAgICAgb3B0aW9ucy5oZWlnaHQgPSBvcHRpb25zLndpZHRoKi40O1xuICB9XG4gIHBhbmVsLndpZHRoKG9wdGlvbnMud2lkdGgpLmhlaWdodChvcHRpb25zLmhlaWdodCk7XG5cbiAgaWYoIGNoYXJ0VHlwZSA9PSAndGltZWxpbmUnICkge1xuICAgICAgb3B0aW9ucy5kaXNwbGF5QW5ub3RhdGlvbnMgPSB0cnVlO1xuICAgICAgdmFyIGNoYXJ0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkFubm90YXRlZFRpbWVMaW5lKHBhbmVsWzBdKTtcbiAgICAgIGNoYXJ0LmRyYXcoZHQsIG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgICAgdmFyIGNoYXJ0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkxpbmVDaGFydChwYW5lbFswXSk7XG4gICAgICBjaGFydC5kcmF3KGR0LCBvcHRpb25zKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVXZWF0aGVyQ2hhcnQocm9vdCwgZGF0YSkge1xuICAkKHJvb3QpLmh0bWwoJycpO1xuXG4gIHZhciBkdCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5EYXRhVGFibGUoKTtcbiAgZHQuYWRkQ29sdW1uKCdzdHJpbmcnLCAnTW9udGgnKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnTWluIFRlbXBlcmF0dXJlJyk7XG4gIGR0LmFkZENvbHVtbignbnVtYmVyJywgJ01heCBUZW1wZXJhdHVyZScpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdEZXcgUG9pbnQnKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnUHJlY2lwaXRhdGlvbicpO1xuICBkdC5hZGRDb2x1bW4oJ251bWJlcicsICdSYWRpYXRpb24nKTtcbiAgZHQuYWRkQ29sdW1uKCdudW1iZXInLCAnRGF5bGlnaHQnKTtcblxuICBmb3IoIHZhciBkYXRlIGluIGRhdGEgKSB7XG4gICAgICB2YXIgb2JqID0gZGF0YVtkYXRlXTtcbiAgICAgIGR0LmFkZFJvdyhbXG4gICAgICAgICAgZGF0ZSsnJyxcbiAgICAgICAgICBvYmoudG1pbiB8fCAwLFxuICAgICAgICAgIG9iai50bWF4IHx8IDAsXG4gICAgICAgICAgb2JqLnRkbWVhbiB8fCAwLFxuICAgICAgICAgIG9iai5wcHQgfHwgMCxcbiAgICAgICAgICBvYmoucmFkIHx8IDAsXG4gICAgICAgICAgb2JqLmRheWxpZ2h0IHx8IDBcbiAgICAgIF0pO1xuICB9XG5cbiAgdmFyIGNoYXJ0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkNvbWJvQ2hhcnQocm9vdCk7XG4gIGNoYXJ0LmRyYXcoZHQsIHdlYXRoZXJDaGFydE9wdGlvbnMpO1xuXG4gIHJldHVybiBjaGFydDtcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0QXBwIDogZnVuY3Rpb24oYSkge1xuICAgIGFwcCA9IGE7XG4gIH0sXG4gICAgaW5pdCA6IGluaXQsXG4gICAgc2V0RGF0YSA6IHNldERhdGEsXG4gICAgc2VsZWN0IDogc2VsZWN0LFxuICAgIHVuc2VsZWN0IDogdW5zZWxlY3QsXG4gICAgc2VsZWN0QWxsIDogc2VsZWN0QWxsLFxuICAgIHVuc2VsZWN0QWxsIDogdW5zZWxlY3RBbGwsXG4gICAgdXBkYXRlQ2hhcnRzIDogdXBkYXRlQ2hhcnRzLFxuICAgIHJlbW92ZSA6IHJlbW92ZSxcbiAgICBzaG93UG9wdXA6IHNob3dQb3B1cCxcbiAgICBoaWRlUG9wdXA6IGhpZGVQb3B1cCxcbiAgICByZXNpemUgOiByZXNpemUsXG4gICAgY3JlYXRlV2VhdGhlckNoYXJ0IDogY3JlYXRlV2VhdGhlckNoYXJ0XG59XG4iLCJ2YXIgZ2RyaXZlID0gcmVxdWlyZSgnLi9nZHJpdmUnKTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgJChcIiNleHBvcnQtbW9kYWxcIikubW9kYWwoe1xuICAgICAgICAgIHNob3cgOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgICQoXCIjc2hvdy1leHBvcnQtY3N2XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIF9zZXRNZXNzYWdlKG51bGwpO1xuXG4gICAgICAgICQoXCIjZXhwb3J0LW5hbWVcIikudmFsKFwiM1BHIE1vZGVsIFJlc3VsdHMgKFwiK25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9ULywnICcpLnJlcGxhY2UoL1xcLlxcZCpaLywnJykrXCIpXCIpO1xuICAgICAgICAgICQoXCIjZXhwb3J0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gICAgICB9KTtcbn1cblxuZnVuY3Rpb24gX3NldE1lc3NhZ2UobXNnLCB0eXBlLCBwcm9ncmVzcykge1xuICBpZiggIW1zZyApIHtcbiAgICByZXR1cm4gJChcIiNleHBvcnQtbXNnXCIpLmhpZGUoKTtcbiAgfVxuICAkKFwiI2V4cG9ydC1tc2dcIikuc2hvdygpO1xuXG4gIGlmKCBwcm9ncmVzcyApIHtcbiAgICAkKFwiI2V4cG9ydC1tc2ctcHJvZ3Jlc3NcIikuc2hvdygpO1xuICB9IGVsc2Uge1xuICAgICQoXCIjZXhwb3J0LW1zZy1wcm9ncmVzc1wiKS5oaWRlKCk7XG4gIH1cblxuICAkKCcjZXhwb3J0LW1zZycpLmF0dHIoXCJjbGFzc1wiLCdhbGVydCBhbGVydC0nK3R5cGUpO1xuICAkKCcjZXhwb3J0LW1zZy10ZXh0JykuaHRtbChtc2cpO1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlUHJvZ3Jlc3MoaW5kZXgsIHRvdGFsKSB7XG4gIHBlcmNlbnQgPSAxMDAgKiAoIGluZGV4IC8gdG90YWwgKTtcbiAgJChcIiNleHBvcnQtbXNnLXByb2dyZXNzLWJhclwiKS5hdHRyKFwiYXJpYS12YWx1ZW5vd1wiLCBwZXJjZW50KS5jc3MoXCJ3aWR0aFwiLHBlcmNlbnQrXCIlXCIpO1xufVxuXG4vLyBzZWUgaWYgYW4gZXJyb3IgZXhpc3RzLCBpZiBzbywgc2V0IHN0YXRlXG5mdW5jdGlvbiBfY2hlY2tFcnJvcihmaWxlKSB7XG4gIHZhciBlcnJvck1lc3NhZ2UgPSBudWxsO1xuICBpZiggIWZpbGUgKSBlcnJvck1lc3NhZ2UgPSBcIkVycm9yIGNyZWF0aW5nIGZpbGUgb24gR29vZ2xlIERyaXZlIDooXCI7XG4gIGlmKCBmaWxlLmVycm9yICkgZXJyb3JNZXNzYWdlID0gZmlsZS5tZXNzYWdlO1xuXG4gIGlmKCBlcnJvck1lc3NhZ2UgKSB7XG4gICAgX3NldE1lc3NhZ2UoZXJyb3JNZXNzYWdlLCBcImRhbmdlclwiKTtcbiAgICAkKFwiI2V4cG9ydC1jc3ZcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKS5odG1sKFwiRXhwb3J0XCIpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuICAvLyBleHBvcnQgYXMgY3N2XG5mdW5jdGlvbiBleHBvcnRDc3YocmVzdWx0cykge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdleHBvcnQtZHJpdmUtY3N2JywgMSk7XG5cbiAgJChcIiNleHBvcnQtY3N2XCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIkV4cG9ydGluZy4uLlwiKTtcblxuICB2YXIgbmFtZSA9ICQoXCIjZXhwb3J0LW5hbWVcIikudmFsKCk7XG4gIGlmKCBuYW1lLmxlbmd0aCA9PSAwICkge1xuICAgIF9zZXRNZXNzYWdlKFwiUGxlYXNlIHByb3ZpZGUgYSBmb2xkZXIgbmFtZVwiLCBcImRhbmdlclwiKVxuICAgICQoXCIjZXhwb3J0LWNzdlwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmh0bWwoXCJFeHBvcnRcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGRhdGEgPSByZXN1bHRzLmRhdGE7XG5cbiAgLy8gY3JlYXRlIGEgbGlzdCBzbyB3ZSBjYW4gcmVjdXJzaXZlbHkgaXRlcmF0ZVxuICB2YXIga2V5cyA9IFtdO1xuICBmb3IoIHZhciBrZXkgaW4gZGF0YSApIGtleXMucHVzaChrZXkpO1xuXG4gIC8vIGNyZWF0ZSBmb2xkZXJcbiAgX3NldE1lc3NhZ2UoXCJDcmVhdGluZyBleHBvcnQgZm9sZGVyLi4uXCIsIFwiaW5mb1wiLCB0cnVlKTtcbiAgX3VwZGF0ZVByb2dyZXNzKDEsIGtleXMubGVuZ3RoKzIpO1xuICBnZHJpdmUuc2F2ZUZpbGUobmFtZSxcIkFIQiAzUEcgTW9kZWwgUmVzdWx0c1wiLFwiYXBwbGljYXRpb24vdm5kLmdvb2dsZS1hcHBzLmZvbGRlclwiLFwiXCIsZnVuY3Rpb24oZmlsZSl7XG4gICAgaWYoIF9jaGVja0Vycm9yKGZpbGUpICkgcmV0dXJuO1xuICAgIHZhciBwYXJlbnQgPSBmaWxlLmlkO1xuICAgIF91cGRhdGVQcm9ncmVzcygyLCBrZXlzLmxlbmd0aCsyKTtcblxuICAgIC8vIGNyZWF0ZSBhIG5pY2UgZmlsZSBkZXNjcmliaW5nIHRoZSBjdXJyZW50IGV4cG9ydFxuICAgIF9zZXRNZXNzYWdlKFwiQ3JlYXRpbmcgY29uZmlnIGZpbGUuLi5cIiwgXCJpbmZvXCIsIHRydWUpO1xuICAgIGRlbGV0ZSByZXN1bHRzLmNvbmZpZy5wbGFudGF0aW9uX3N0YXRlO1xuICAgIHZhciBjb25maWcgPSBKU09OLnN0cmluZ2lmeShyZXN1bHRzLmNvbmZpZyxudWxsLFwiICBcIik7XG4gICAgZ2RyaXZlLnNhdmVGaWxlKFwiY29uZmlnLnR4dFwiLFwiQUhCIDNQRyBNb2RlbCAtIFJ1biBDb25maWd1cmF0aW9uXCIsXCJ0ZXh0L3BsYWluXCIsY29uZmlnLGZ1bmN0aW9uKGZpbGUpe1xuICAgICAgaWYoIF9jaGVja0Vycm9yKGZpbGUpICkgcmV0dXJuO1xuICAgICAgX3VwZGF0ZVByb2dyZXNzKDMsIGtleXMubGVuZ3RoKzIpO1xuXG4gICAgICBfY3JlYXRlRXhwb3J0KDAsIGtleXMsIGRhdGEsIHBhcmVudCk7XG4gICAgfSx7cGFyZW50OiBwYXJlbnR9KVxuICB9KTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUV4cG9ydChpbmRleCwga2V5cywgZGF0YSwgcGFyZW50KSB7XG5cbiAgLy8gd2UgYXJlIGFsbCBkb25lIDopXG4gIGlmKCBpbmRleCA9PSBrZXlzLmxlbmd0aCApIHtcbiAgICBfdXBkYXRlUHJvZ3Jlc3MoMSwgMSk7XG4gICAgX3NldE1lc3NhZ2UoXCJFeHBvcnQgU3VjY2Vzc2Z1bC48YnIgLz48YSBocmVmPSdodHRwczovL2RyaXZlLmdvb2dsZS5jb20vI2ZvbGRlcnMvXCIgKyBwYXJlbnQgK1xuICAgICAgICAgIFwiJyB0YXJnZXQ9J19ibGFuayc+PGkgY2xhc3M9J2ljb24tZXh0ZXJuYWwtbGluay1zaWduJz48L2k+IE9wZW4gaW4gR29vZ2xlIERyaXZlPC9hPlwiLCBcInN1Y2Nlc3NcIik7XG4gICAgJChcIiNleHBvcnQtY3N2XCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIikuaHRtbChcIkV4cG9ydFwiKTtcbiAgfSBlbHNlIHtcblxuICAgIHZhciBrZXkgPSBrZXlzW2luZGV4XTtcbiAgICB2YXIgY3N2ID0gXCJcIjtcblxuICAgIC8vIFRPRE86IGFkZCBtb250aCBhbmQgZGF0ZVxuXG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBkYXRhW2tleV0ubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggZGF0YVtrZXldW2ldLmxlbmd0aCA9PSAwICkgY29udGludWU7IC8vIGlnbm9yZSB0aGUgYmxhbmsgcm93c1xuXG4gICAgICBmb3IoIHZhciBqID0gMDsgaiA8IGRhdGFba2V5XVtpXS5sZW5ndGg7IGorKyApIGNzdiArPSBkYXRhW2tleV1baV1bal0rXCIsXCI7XG4gICAgICBjc3YgPSBjc3YucmVwbGFjZSgvLCQvLCcnKStcIlxcblwiO1xuICAgIH1cblxuICAgIF9zZXRNZXNzYWdlKFwiQ3JlYXRpbmcgXCIra2V5c1tpbmRleF0rXCIuY3N2Li4uIFwiLCBcImluZm9cIiwgdHJ1ZSk7XG4gICAgZ2RyaXZlLnNhdmVGaWxlKGtleXNbaW5kZXhdK1wiLmNzdlwiLFwiXCIsXCJ0ZXh0L2NzdlwiLGNzdixmdW5jdGlvbihmaWxlKXtcbiAgICAgIGlmKCBfY2hlY2tFcnJvcihmaWxlKSApIHJldHVybjtcblxuICAgICAgX3VwZGF0ZVByb2dyZXNzKGluZGV4KzQsIGtleXMubGVuZ3RoKzIpO1xuXG4gICAgICBpbmRleCsrO1xuICAgICAgX2NyZWF0ZUV4cG9ydChpbmRleCwga2V5cywgZGF0YSwgcGFyZW50KTtcbiAgICB9LHtjb252ZXJ0OiB0cnVlLCBwYXJlbnQ6IHBhcmVudH0pO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZXhwb3J0Q3N2IDogZXhwb3J0Q3N2LFxuICBpbml0ICAgICAgOiBpbml0XG59O1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jyb3dzZXJzdGFjay9mbGFzaGJsb2NrLWRldGVjdG9yXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY2FsbGJhY2tNZXRob2Qpe1xuICAgIHZhciByZXR1cm5fdmFsdWUgPSAwO1xuXG4gICAgaWYobmF2aWdhdG9yLnBsdWdpbnNbXCJTaG9ja3dhdmUgRmxhc2hcIl0pIHtcbiAgICAgICAgICBlbWJlZF9sZW5ndGggPSAkKCdlbWJlZCcpLmxlbmd0aDtcbiAgICAgICAgICBvYmplY3RfbGVuZ3RoID0gJCgnb2JqZWN0JykubGVuZ3RoO1xuXG4gICAgICAgICAgaWYoKGVtYmVkX2xlbmd0aCA+IDApIHx8IChvYmplY3RfbGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgICAgLyogTWFjIC8gQ2hyb21lIHVzaW5nIEZsYXNoQmxvY2sgKyBNYWMgLyBTYWZhcmkgdXNpbmcgQWRCbG9jayAqL1xuICAgICAgICAgICAgICAkKCdvYmplY3QsIGVtYmVkJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoJCh0aGlzKS5jc3MoJ2Rpc3BsYXknKSA9PT0gJ25vbmUnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybl92YWx1ZSA9IDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLyogTWFjIC8gRmlyZWZveCB1c2luZyBGbGFzaEJsb2NrICovXG4gICAgICAgICAgICAgIGlmKCAkKCdkaXZbYmdpbmFjdGl2ZV0nKS5sZW5ndGggPiAwICl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybl92YWx1ZSA9IDI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgfSBlbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignTVNJRScpID4gLTEpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBuZXcgQWN0aXZlWE9iamVjdCgnU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2gnKTtcbiAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuX3ZhbHVlID0gMjtcbiAgICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgICAvKiBJZiBmbGFzaCBpcyBub3QgaW5zdGFsbGVkICovXG4gICAgICAgICAgcmV0dXJuX3ZhbHVlID0gMTtcbiAgICB9XG5cbiAgICBpZihjYWxsYmFja01ldGhvZCAmJiB0eXBlb2YoY2FsbGJhY2tNZXRob2QpID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjYWxsYmFja01ldGhvZChyZXR1cm5fdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJldHVybl92YWx1ZTtcbiAgICB9XG59O1xuIiwidmFyIE9hdXRoID0gcmVxdWlyZSgnLi9vYXV0aCcpO1xudmFyIGdkcml2ZVJUID0gcmVxdWlyZSgnLi9nZHJpdmVSVCcpO1xuXG5cbiAgdmFyIE1JTUVfVFlQRSA9IFwiYXBwbGljYXRpb24vdm5kLmFoYi0zcGcucnVuXCI7XG4gIHZhciBUUkVFX01JTUVfVFlQRSA9IFwiYXBwbGljYXRpb24vdm5kLmFoYi0zcGcudHJlZVwiO1xuICB2YXIgRFJJVkVfQVBJX1ZFUlNJT04gPSBcInYyXCI7XG5cbiAgLy8gZ29vZ2xlIG9hdXRoIGFjY2VzcyB0b2tlblxuICB2YXIgdG9rZW4gPSBcIlwiO1xuXG4gIC8vIGN1cnJlbnRseSBsb2FkZWQgZ2RyaXZlIGZpbGUgaWRcbiAgdmFyIGxvYWRlZEZpbGUgPSBudWxsO1xuICAvLyBsaXN0IG9mIGN1cnJlbnRseSBsb2FkZWQgZmlsZXMgKG1ldGFkYXRhKVxuICB2YXIgZmlsZUxpc3QgPSBbXTtcbiAgLy8gZ29vZ2xlIGRyaXZlIHNoYXJlIGNsaWVudFxuICB2YXIgY2xpZW50ID0gbnVsbDtcblxuICAvLyBsb2FkZWQgdHJlZSBhbmQgbWFuYWdlbWVudFxuICB2YXIgbG9hZGVkVHJlZSA9IG51bGw7XG4gIC8vIGxpc3Qgb2YgY3VycmVudGx5IGxvYWRlZCB0cmVlIGZpbGVzIChtZXRhZGF0YSlcbiAgdmFyIHRyZWVMaXN0ID0gW107XG5cbiAgLy8gY3VycmVudCBNSU1FIFRZUEUgd2UgYXJlIHNhdmluZ1xuICB2YXIgc2F2ZU1pbWVUeXBlID0gXCJcIjtcblxuICAvKioqXG4gICAqICBJbml0aWFsaXplIGdvb2dsZSBkcml2ZSBwYW5lbHMsIGJ0bnMgYW5kIGxvZ2luXG4gICAqKiovXG4gIGZ1bmN0aW9uIGluaXQoY2FsbGJhY2spIHtcblxuICAgIC8vIGluaXQgYm9vdHN0cmFwIG1vZGFsXG4gICAgJChcIiNzYXZlLW1vZGFsXCIpLm1vZGFsKHtcbiAgICAgIHNob3cgOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgLy8gaW5pdCBib290c3RyYXAgbW9kYWxcbiAgICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoe1xuICAgICAgc2hvdyA6IGZhbHNlXG4gICAgfSk7XG5cbiAgICAvLyB0aGUgYWJvdXQgbW9kYWwgbGluayBpcyBjcmVhdGVkIGJlbG93LCBzbyB3aHkgbm90Li4uXG4gICAgJChcIiNhYm91dC1tb2RhbFwiKS5tb2RhbCh7XG4gICAgICBzaG93IDogZmFsc2VcbiAgICB9KTtcblxuICAgIC8vIHRoZSBhYm91dCBtb2RhbCBsaW5rIGlzIGNyZWF0ZWQgYmVsb3csIHNvIHdoeSBub3QuLi5cbiAgICAkKFwiI2hlbHAtbW9kYWxcIikubW9kYWwoe1xuICAgICAgc2hvdyA6IGZhbHNlXG4gICAgfSk7XG5cbiAgICAvLyBzZXQgdGhlICd1cGRhdGUnIGJ0biBjbGljayBoYW5kbGVyXG4gICAgJChcIiNzYXZlLXVwZGF0ZS1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBfdXBkYXRlQ3VycmVudEZpbGUoKTtcbiAgICB9KTtcblxuICAgIC8vIHNldCB0aGUgJ25ldycgYnRuIGNsaWNrIGhhbmRsZXJcbiAgICAkKFwiI3NhdmUtbmV3LWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIF9zYXZlTmV3RmlsZSgpO1xuICAgIH0pO1xuXG4gICAgLy8gY3JlYXRlIHRoZSB0b3AgcmlnaHQgbWVudVxuICAgIF9jcmVhdGVMb2dpbkJ0bigpO1xuXG4gICAgLy8gbG9hZCB0aGUgZ29vZ2xlIGF1dGggYW5kIGRyaXZlIGFwaSdzXG4gICAgX2xvYWRBcGkoZnVuY3Rpb24oKSB7XG4gICAgICAvLyBpZiB0aGUgdXNlciBpcyBhdXRob3JpemVkIGdyYWIgdGhlIHJlZnJlc2ggdG9rZW5cbiAgICAgIE9hdXRoLmlzQXV0aG9yaXplZChmdW5jdGlvbihyZWZyZXNoVG9rZW4pe1xuICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyByZWZyZXNoIHRva2VuLCBsZWF2ZSwgd2UgYXJlIGluaXRpYWxpemVkXG4gICAgICAgIGlmKCAhcmVmcmVzaFRva2VuICkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhIHJlZmVzaCB0b2tlbiwgdGhlbiB1c2VyIGlzIGFsbCBzZXQsXG4gICAgICAgIC8vIGdldCBhIG5ldyBhY2Nlc3MgdG9rZW4gc28gd2UgY2FuIHN0YXJ0IHVzaW5nIHRoZSBhcGknc1xuICAgICAgICAvLyBncmFiIHRoZWlyIGluZm9ybWF0aW9uIGFuZCBkaXNwbGF5XG4gICAgICAgIE9hdXRoLmdldEFjY2Vzc1Rva2VuKGZ1bmN0aW9uKHQpe1xuICAgICAgICAgIHRva2VuID0gdDtcbiAgICAgICAgICBpZiggdG9rZW4gKSBfc2V0VXNlckluZm8oKTtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBjaGVjayBpZiBhY2Nlc3MgdG9rZW4gaGFzIGV4cGlyZWRcbiAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBfY2hlY2tUb2tlbigpO1xuICAgICAgfSwgMTAwMCAqIDUgKiA2MCk7XG4gICAgfSk7XG5cbiAgICAvLyBzZXR1cCB0aGUgdHJlZSAnc2hhcmUnIGJ0blxuICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIC8vIHNlZSBpZiB3ZSBoYXZlIGEgc2hhcmUgY2xpZW50XG4gICAgICBpZiggY2xpZW50ID09IG51bGwgKSB7XG4gICAgICAgIC8vIG5vIGNsaWVudCwgbG9hZCBhcGlcbiAgICAgICAgZ2FwaS5sb2FkKCdkcml2ZS1zaGFyZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgLy8gb24gbG9hZCwgc2hvdyB0aGUgc2hhcmUgcG9wdXAgd2l0aCB0aGUgY3VycmVudCB0cmVlXG4gICAgICAgICAgIGNsaWVudCA9IG5ldyBnYXBpLmRyaXZlLnNoYXJlLlNoYXJlQ2xpZW50KE9hdXRoLkFQUF9JRCk7XG4gICAgICAgICAgICBjbGllbnQuc2V0SXRlbUlkcyhbbG9hZGVkVHJlZV0pO1xuICAgICAgICAgICBjbGllbnQuc2hvd1NldHRpbmdzRGlhbG9nKCk7XG4gICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHdlIGhhdmUgYSBjbGllbnQsIHNob3cgdGhlIHNoYXJlIHBvcHVwIHdpdGggY3VycmVudCB0cmVlXG4gICAgICAgIGNsaWVudC5zZXRJdGVtSWRzKFtsb2FkZWRGaWxlXSk7XG4gICAgICAgICBjbGllbnQuc2hvd1NldHRpbmdzRGlhbG9nKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qKipcbiAgICogU2F2ZSB0aGUgY3VycmVudCBtb2RlbCBhcyBhIG5ldyBnb29nbGUgZHJpdmUgZmlsZVxuICAgKioqL1xuICBmdW5jdGlvbiBfc2F2ZU5ld0ZpbGUoKSB7XG4gICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnc2F2ZS1kcml2ZS1maWxlJywgMSk7XG5cbiAgICAvLyBncmFiIHRoZSBuYW1lIG9mIHRoZSBuZXcgZmlsZVxuICAgIHZhciBuYW1lID0gJChcIiNzYXZlLW5hbWUtaW5wdXRcIikudmFsKCk7XG4gICAgaWYoIG5hbWUubGVuZ3RoID09IDAgKSB7IC8vIHdlIGFsd2F5cyB3YW50IGEgbmFtZSwgYWxlcnQgYW5kIHF1aXRcbiAgICAgIF9zZXRTYXZlTWVzc2FnZSgnUGxlYXNlIHByb3ZpZGUgYSBmaWxlbmFtZS4nLCdpbmZvJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gc2VlIHdoYXQga2luZCBvZiBmaWxlIHdlIGFyZSBjcmVhdGluZyBiYXNlZCBvbiB0aGUgc2F2ZU1pbWVUeXBlIHZhclxuICAgIGlmKCBzYXZlTWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgICAgZGF0YSA9IG0zUEdJTy5leHBvcnRTZXR1cCgpO1xuICAgIH0gZWxzZSBpZiAoIHNhdmVNaW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHtcbiAgICAgIGRhdGEgPSBtM1BHSU8uZXhwb3J0U2V0dXAoKS50cmVlO1xuICAgIH0gZWxzZSB7IC8vIGJhZG5lc3NcbiAgICAgIGFsZXJ0KFwiVW5rbm93biBNSU1FX1RZUEU6IFwiK3NhdmVNaW1lVHlwZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gc2V0IHRoZSB1c2VyIGtub3cgd2hhdCB3ZSBhcmUgZG9pbmdcbiAgICBfc2V0U2F2ZU1lc3NhZ2UoJzxpIGNsYXNzPVwiaWNvbi1zcGlubmVyIGljb24tc3BpblwiPjwvaT4gU2F2aW5nIEZpbGUuLi4nLCdpbmZvJyk7XG5cbiAgICAvLyBzYXZlIHRoZSBmaWxlXG4gICAgc2F2ZUZpbGUobmFtZSxcbiAgICAgICAgJChcIiNzYXZlLWRlc2NyaXB0aW9uLWlucHV0XCIpLnZhbCgpLFxuICAgICAgICBzYXZlTWltZVR5cGUsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGZ1bmN0aW9uKHJlc3ApIHtcbiAgICAgICAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3aGF0IGhhcHBlbmVkXG4gICAgICAgICAgaWYoIHJlc3AuZXJyb3IgKSByZXR1cm4gX3NldFNhdmVNZXNzYWdlKCdGYWlsZWQgdG8gc2F2ZSB0byBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcbiAgICAgICAgICBlbHNlIF9zZXRTYXZlTWVzc2FnZSgnU3VjZXNzZnVsbHkgc2F2ZWQuJywnc3VjY2VzcycpO1xuXG4gICAgICAgICAgLy8gd2FpdCBhIHRpY2sgdG8gaGlkZSB0aGUgcG9wdXAsIHNvIHVzZXIgc2VlcyBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKFwiI3NhdmUtbW9kYWxcIikubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgICB9LDE1MDApO1xuXG4gICAgICAgICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuXG4gICAgICAgICAgaWYoIHNhdmVNaW1lVHlwZSA9PSBNSU1FX1RZUEUgKSB7XG4gICAgICAgICAgICAvLyB3ZSBoYXZlIGEgbmV3IGZpbGUsIHVwZGF0ZSBvdXIgbGlzdFxuICAgICAgICAgICAgX3VwZGF0ZUZpbGVMaXN0KCk7XG5cbiAgICAgICAgICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0bnNcbiAgICAgICAgICAgICQoXCIjc2hhcmUtYnRuXCIpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICAgICAgICQoXCIjb3Blbi1pbi1kcml2ZVwiKS5hdHRyKFwiaHJlZlwiLFwiaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZmlsZS9kL1wiK3Jlc3AuaWQpLnBhcmVudCgpLnNob3coKTtcblxuICAgICAgICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgZmlsZSBpZFxuICAgICAgICAgICAgbG9hZGVkRmlsZSA9IHJlc3AuaWQ7XG4gICAgICAgICAgfSBlbHNlIGlmICggc2F2ZU1pbWVUeXBlID09IFRSRUVfTUlNRV9UWVBFICkge1xuICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIG5ldyB0cmVlLCB1cGRhdGUgdGhlIGxpc3RcbiAgICAgICAgICAgIF91cGRhdGVUcmVlTGlzdCgpO1xuXG4gICAgICAgICAgICAvLyBzaG93IHRoZSB0cmVlIHNoYXJlIGJ0bnNcbiAgICAgICAgICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuc2hvdygpO1xuICAgICAgICAgICAgJChcIiNsb2FkZWQtdHJlZS1uYW1lXCIpLmh0bWwobmFtZSkucGFyZW50KCkuc2hvdygpO1xuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIGxvYWRlZCB0cmVlc1xuICAgICAgICAgICAgbG9hZGVkVHJlZSA9IHJlc3AuaWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIC8qKipcbiAgICogVXBkYXRlIHRoZSBjdXJyZW50bHkgbG9hZGVkIGdvb2dsZSBkcml2ZSBmaWxlXG4gICAqKiovXG4gIGZ1bmN0aW9uIF91cGRhdGVDdXJyZW50RmlsZSgpIHtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd1cGRhdGUtZHJpdmUtZmlsZScsIDEpO1xuXG4gICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2hhdCB3ZSBhcmUgZG9pbmdcbiAgICBfc2V0U2F2ZU1lc3NhZ2UoJzxpIGNsYXNzPVwiaWNvbi1zcGlubmVyIGljb24tc3BpblwiPjwvaT4gVXBkYXRpbmcuLi4nLCdpbmZvJyk7XG5cbiAgICB2YXIgZmlsZSA9IHt9O1xuICAgIHZhciBkYXRhID0ge307XG5cbiAgICAvLyBncmFiIHRoZSBjb3JyZW50IGRhdGEgYW5kIGZpbGVpZCBiYXNlZCBvbiBtaW1lVHlwZVxuICAgIGlmKCBzYXZlTWltZVR5cGUgPT0gTUlNRV9UWVBFICkge1xuICAgICAgZmlsZSA9IGxvYWRlZEZpbGU7XG4gICAgICBkYXRhID0gbTNQR0lPLmV4cG9ydFNldHVwKCk7XG4gICAgfSBlbHNlIGlmICggc2F2ZU1pbWVUeXBlID09IFRSRUVfTUlNRV9UWVBFICkge1xuICAgICAgZmlsZSA9IGxvYWRlZFRyZWU7XG4gICAgICBkYXRhID0gbTNQR0lPLmV4cG9ydFNldHVwKCkudHJlZTtcbiAgICB9IGVsc2UgeyAvLyBiYWRuZXNzXG4gICAgICBhbGVydChcIlVua25vd24gTUlNRV9UWVBFOiBcIitzYXZlTWltZVR5cGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSB0aGUgZ29vZ2xlIGRyaXZlIGZpbGVcbiAgICB1cGRhdGVGaWxlKGZpbGUsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGZ1bmN0aW9uKHJlc3Ape1xuICAgICAgICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgaGFwcGVuZWRcbiAgICAgICAgICBpZiggcmVzcC5lcnJvciApIHJldHVybiBfc2V0U2F2ZU1lc3NhZ2UoJ0ZhaWxlZCB0byB1cGRhdGUgb24gR29vZ2xlIERyaXZlIDooJywnZGFuZ2VyJyk7XG4gICAgICAgICAgZWxzZSBfc2V0U2F2ZU1lc3NhZ2UoJ1VwZGF0ZSBTdWNjZXNzZnVsLicsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAgIC8vIHdhaXQgYSB0aWNrIHNvIHRoZSB1c2VyIGtub3dzIHVwZGF0ZSB3YXMgc3VjY2Vzc1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoXCIjc2F2ZS1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICAgIH0sMTUwMCk7XG5cbiAgICAgICAgICAvLyB1cGRhdGUgdGhlIGxpc3QgZm9yIHdoYXRldmVyIHR5cGUgd2FzIHVwZGF0ZWRcbiAgICAgICAgICBpZiggc2F2ZU1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICAgICAgICAgIF91cGRhdGVGaWxlTGlzdCgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIHNhdmVNaW1lVHlwZSA9PSBUUkVFX01JTUVfVFlQRSApIHtcbiAgICAgICAgICAgIF91cGRhdGVUcmVlTGlzdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICk7XG4gIH1cblxuICAvKioqXG4gICAqIHNldCBhIG1lc3NhZ2UgZm9yIHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwb3B1cC5cbiAgICogIHR5cGUgLSBib29zdHJhcCBhbGVydCB0eXBlXG4gICAqKiovXG4gIGZ1bmN0aW9uIF9zZXRMb2FkTWVzc2FnZShtc2csIHR5cGUpIHtcbiAgICBpZiggIW1zZyApIHJldHVybiAkKFwiI2dkcml2ZS1maWxlLW1zZ1wiKS5odG1sKFwiXCIpO1xuICAgICQoJyNnZHJpdmUtZmlsZS1tc2cnKS5odG1sKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtJyt0eXBlKydcIj4nK21zZysnPC9kaXY+Jyk7XG4gIH1cblxuICAvKioqXG4gICAqIHNldCBhIG1lc3NhZ2UgZm9yIHRoZSAnc2F2ZSB0byBkcml2ZScgcG9wdXBcbiAgICogdHlwZSAtIGJvb3N0cmFwIGFsZXJ0IHR5cGVcbiAgICoqKi9cbiAgZnVuY3Rpb24gX3NldFNhdmVNZXNzYWdlKG1zZywgdHlwZSkge1xuICAgIGlmKCAhbXNnICkgcmV0dXJuICQoXCIjZ2RyaXZlLXNhdmUtbXNnXCIpLmh0bWwoXCJcIik7XG4gICAgJCgnI2dkcml2ZS1zYXZlLW1zZycpLmh0bWwoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC0nK3R5cGUrJ1wiPicrbXNnKyc8L2Rpdj4nKTtcbiAgfVxuXG4gIC8qKipcbiAgICogY3JlYXRlIHRoZSB0b3AgcmlnaHQgbWVudS4gVGhpcyBtZW51IGlzIGZvciB3aGVuIHRoZSB1c2VyIGlzIG5vdCBsb2dnZWQgaW5cbiAgICoqKi9cbiAgZnVuY3Rpb24gX2NyZWF0ZUxvZ2luQnRuKCkge1xuICAgIHZhciBidG4gPSAkKCc8bGkgY2xhc3M9XCJkcm9wZG93blwiPidcbiAgICAgICAgKyAnPGEgY2xhc3M9XCJkcm9wZG93bi10b2dnbGVcIiBzdHlsZT1cImN1cnNvcjpwb2ludGVyXCI+TG9naW48YiBjbGFzcz1cImNhcmV0XCI+PC9iPjwvYT4nXG4gICAgICAgICsgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nXG4gICAgICAgICsgJzxsaT48YSBpZD1cImhlbHBcIj48aSBjbGFzcz1cImljb24tcXVlc3Rpb24tc2lnblwiPjwvaT4gSGVscDwvYT48L2xpPidcbiAgICAgICAgKyAnPGxpPjxhIGlkPVwiYWJvdXRcIj48aSBjbGFzcz1cImljb24taW5mby1zaWduXCI+PC9pPiBBYm91dDwvYT48L2xpPidcbiAgICAgICAgKyAnPGxpPjxhIGlkPVwibG9naW4td2l0aC1nb29nbGVcIj48aSBjbGFzcz1cImljb24tc2lnbmluXCI+PC9pPiBMb2dpbiB3aXRoIEdvb2dsZTwvYT48L2xpPidcbiAgICAgICAgKyAnPC91bD48L2xpPicpO1xuXG4gICAgLy8gc2V0IGNsaWNrIGhhbmRsZXJzIGZvciBwb3B1cFxuICAgIGJ0bi5maW5kKCdhLmRyb3Bkb3duLXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgfSk7XG5cbiAgICAvLyBhYm91dCBjbGljayBoYW5kbGVyXG4gICAgYnRuLmZpbmQoJyNhYm91dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gICAgfSk7XG5cbiAgICBidG4uZmluZCgnI2hlbHAnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICAgc2hvd0hlbHAoKTtcbiAgICB9KTtcblxuICAgIC8vIGxvZ2luIGNsaWNrIGhhbmRsZXJcbiAgICBidG4uZmluZCgnI2xvZ2luLXdpdGgtZ29vZ2xlJykub24oJ2NsaWNrJyxmdW5jdGlvbigpIHtcbiAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3VzZXItbG9naW4nLCAxKTtcbiAgICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICAgc2lnbkluKGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgIF9zZXRVc2VySW5mbygpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBhZGQgbWVudVxuICAgICQoXCIjbG9naW4taGVhZGVyXCIpLmh0bWwoXCJcIikuYXBwZW5kKGJ0bik7XG4gIH07XG5cbiAgLyoqKlxuICAgKiBDcmVhdGUgdGhlIHRvcCByaWdodCBtZW51IGZvciB3aGVuIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICAgKioqL1xuICBmdW5jdGlvbiBfY3JlYXRlTG9nb3V0QnRuKHVzZXJkYXRhKSB7XG4gICAgLy8gc2V0IGJ0biBodG1sXG4gICAgdmFyIGJ0biA9ICQoJzxsaSBjbGFzcz1cImRyb3Bkb3duXCI+J1xuICAgICAgICArICc8YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZVwiIHN0eWxlPVwiY3Vyc29yOnBvaW50ZXJcIj48aW1nIGNsYXNzPVwiaW1nLXJvdW5kZWRcIiBzcmM9XCInK3VzZXJkYXRhLnBpY3R1cmVcbiAgICAgICAgKyAnXCIgc3R5bGU9XCJtYXJnaW46LTVweCA1cHggLTVweCAwO3dpZHRoOjI4cHg7aGVpZ2h0OjI4cHg7Ym9yZGVyOjFweCBzb2xpZCB3aGl0ZVwiIC8+ICcgKyB1c2VyZGF0YS5uYW1lXG4gICAgICAgICsgJzxiIGNsYXNzPVwiY2FyZXRcIj48L2I+PC9hPicgKyAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPidcbiAgICAgICAgKyAnPGxpPjxhIGlkPVwic2F2ZVwiPjxpIGNsYXNzPVwiaWNvbi1jbG91ZC11cGxvYWRcIj48L2k+IFNhdmUgTW9kZWw8L2E+PC9saT4nXG4gICAgICAgICsgJzxsaSBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjxhIGlkPVwic2hhcmUtYnRuXCI+PGkgY2xhc3M9XCJpY29uLXNoYXJlXCI+PC9pPiBTaGFyZSBNb2RlbDwvYT48L2xpPidcbiAgICAgICAgKyAnPGxpIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PGEgaWQ9XCJvcGVuLWluLWRyaXZlXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGkgY2xhc3M9XCJpY29uLWV4dGVybmFsLWxpbmstc2lnblwiPjwvaT4gT3BlbiBpbiBHb29nbGUgRHJpdmU8L2E+PC9saT4nXG4gICAgICAgICsgJzxsaT48YSBpZD1cImxvYWRcIj48aSBjbGFzcz1cImljb24tY2xvdWQtZG93bmxvYWRcIj48L2k+IExvYWQgTW9kZWw8L2E+PC9saT4nXG4gICAgICAgICsgJzxsaT48YSBpZD1cImhlbHBcIj48aSBjbGFzcz1cImljb24tcXVlc3Rpb24tc2lnblwiPjwvaT4gSGVscDwvYT48L2xpPidcbiAgICAgICAgKyAnPGxpPjxhIGlkPVwiYWJvdXRcIj48aSBjbGFzcz1cImljb24taW5mby1zaWduXCI+PC9pPiBBYm91dDwvYT48L2xpPidcbiAgICAgICAgKyAnPGxpPjxhIGlkPVwibG9nb3V0XCI+PGkgY2xhc3M9XCJpY29uLXNpZ25vdXRcIj48L2k+IExvZ291dDwvYT48L2xpPidcbiAgICAgICAgKyAnPC91bD48L2xpPicpO1xuXG4gICAgLy8gYWRkIGNsaWNrIGhhbmRsZXIgdG8gc2hvdyBtZW51XG4gICAgYnRuLmZpbmQoJ2EuZHJvcGRvd24tdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICB9KTtcblxuICAgIC8vIHNob3cgdGhlIHNhdmUgcG9wdXBcbiAgICBidG4uZmluZCgnI3NhdmUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIC8vIHNldCB0aGUgY3VycmVudCBzYXZlIG1pbWVUeXBlXG4gICAgICBzYXZlTWltZVR5cGUgPSBNSU1FX1RZUEU7XG5cbiAgICAgIC8vIGxldCB0aGUgdXNlciBrbm93IHdoYXQgdHlwIHRoZXkgYXJlIHNhdmluZ1xuICAgICAgJChcIiNnZHJpdmUtc2F2ZS1zdWJoZWFkZXJcIikuaHRtbChcIjxoNT5TYXZlIE1vZGVsPC9oNT5cIik7XG5cbiAgICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuXG4gICAgICAvLyBpZiB0aGUgZmlsZSBpcyBsb2FkZWQsIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICAgICAgaWYoIGxvYWRlZEZpbGUgIT0gbnVsbCkge1xuICAgICAgICAvLyBncmFiIHRoZSBjdXJyZW50IGZpbGVzIG1ldGFkYXRhXG4gICAgICAgIHZhciBmaWxlID0ge307XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZmlsZUxpc3QubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgaWYoIGZpbGVMaXN0W2ldLmlkID09IGxvYWRlZEZpbGUpIHtcbiAgICAgICAgICAgIGZpbGUgPSBmaWxlTGlzdFtpXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICAgICAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsXCIpLnNob3coKTtcblxuICAgICAgICAvLyByZW5kZXIgdGhlIGZpbGVzIG1ldGFkYXRhIGluIHRoZSB1cGRhdGUgcGFuZWxcbiAgICAgICAgdmFyIGQgPSBuZXcgRGF0ZShmaWxlLm1vZGlmaWVkRGF0ZSk7XG4gICAgICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWwtaW5uZXJcIikuaHRtbChcIjxiPlwiK2ZpbGUudGl0bGUrXCI8L2I+PGJyIC8+XCIgK1xuICAgICAgICAgICAgXCI8c3BhbiBzdHlsZT0nY29sb3I6Izg4OCc+XCIrZmlsZS5kZXNjcmlwdGlvbitcIjwvc3Bhbj48YnIgLz5cIitcbiAgICAgICAgICAgIFwiPHNwYW4gc3R5bGU9J2ZvbnQtc3R5bGU6aXRhbGljO2ZvbnQtc2l6ZToxMXB4Oyc+TGFzdCBNb2RpZmllZDogXCIgK1xuICAgICAgICAgICAgZC50b0RhdGVTdHJpbmcoKStcIiBcIitkLnRvTG9jYWxlVGltZVN0cmluZygpK1wiIGJ5IFwiK2ZpbGUubGFzdE1vZGlmeWluZ1VzZXJOYW1lK1wiPC9zcGFuPjxiciAvPlwiK1xuICAgICAgICAgICAgXCI8YSBocmVmPSdodHRwczovL2RyaXZlLmdvb2dsZS5jb20vZmlsZS9kL1wiK2ZpbGUuaWQrXCInJyB0YXJnZXQ9J19ibGFuayc+PGkgY2xhc3M9J2ljb24tbGluayc+PC9pPiBcIiArXG4gICAgICAgICAgICBcIkxpbmsgdG8gU2hhcmU8L2E+IDxzcGFuIHN0eWxlPSdjb2xvcjojODg4Jz4obXVzdCBoYXZlIHBlcm1pc3Npb24pPC9zcGFuPjxiciAvPjxiciAvPlwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuaGlkZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBjbGVhciBhbnkgbWVzc2FnZVxuICAgICAgX3NldFNhdmVNZXNzYWdlKG51bGwpO1xuXG4gICAgICAvLyBzaG93IHRoZSBzYXZlIHBvcHVwXG4gICAgICAkKFwiI3NhdmUtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgICB9KTtcblxuICAgIC8vIGNsaWNrIGhhbmRsZXIgZm9yIHNoYXJlIGJ0blxuICAgIGJ0bi5maW5kKFwiI3NoYXJlLWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnb3Blbi1kcml2ZS1zaGFyZScsIDEpO1xuXG4gICAgICAvLyBoYXMgdGhlIHNoYXJlIGNsaWVudCBiZWVuIGxvYWRlZFxuICAgICAgaWYoIGNsaWVudCA9PSBudWxsICkge1xuICAgICAgICAvLyBsb2FkIHRoZSBzaGFyZSBwb3B1cFxuICAgICAgICBnYXBpLmxvYWQoJ2RyaXZlLXNoYXJlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAvLyBjcmVhdGUgYW5kIHNob3cgdGhlIHNoYXJlIHBvcHVwXG4gICAgICAgICAgIGNsaWVudCA9IG5ldyBnYXBpLmRyaXZlLnNoYXJlLlNoYXJlQ2xpZW50KE9hdXRoLkFQUF9JRCk7XG4gICAgICAgICAgICBjbGllbnQuc2V0SXRlbUlkcyhbbG9hZGVkRmlsZV0pO1xuICAgICAgICAgICBjbGllbnQuc2hvd1NldHRpbmdzRGlhbG9nKCk7XG4gICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHNob3cgdGhlIHNoYXJlIHBvcHVwXG4gICAgICAgIGNsaWVudC5zZXRJdGVtSWRzKFtsb2FkZWRGaWxlXSk7XG4gICAgICAgICBjbGllbnQuc2hvd1NldHRpbmdzRGlhbG9nKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBzaG93IGFib3V0IHBhbmVsXG4gICAgYnRuLmZpbmQoJyNhYm91dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG4gICAgfSk7XG5cbiAgICBidG4uZmluZCgnI2hlbHAnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICAgc2hvd0hlbHAoKTtcbiAgICB9KTtcblxuICAgIC8vIHNob3cgdGhlICdsb2FkIGZyb20gZHJpdmUnIHBhbmVsXG4gICAgYnRuLmZpbmQoJyNsb2FkJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBidG4udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcblxuICAgICAgLy8gaGlkZSBhbnkgZXhpc3RpbmcgbWVzc2FnZVxuICAgICAgX3NldExvYWRNZXNzYWdlKG51bGwpO1xuXG4gICAgICAvLyByZW5kZXIgdGhlIG1vZGVsIGZpbGVzIGluIHRoZSBwb3B1cCBmaWxlc1xuICAgICAgX3Nob3dEcml2ZUZpbGVzKCk7XG5cbiAgICAgIC8vIHNob3cgdGhlIG1vZGFsXG4gICAgICAkKFwiI2xvYWQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgICB9KTtcblxuICAgIC8vIGxvYWQgdGhlIHVzZXIgb3V0XG4gICAgYnRuLmZpbmQoJyNsb2dvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3VzZXItbG9nb3V0JywgMSk7XG5cbiAgICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuXG4gICAgICAvLyBraWxsIHRoZSBhY2Nlc3MgdG9rZW5cbiAgICAgIHRva2VuID0gbnVsbDtcblxuICAgICAgLy8gdXBkYXRlIHRoZSBtZW51IHBhbmVsXG4gICAgICBfY3JlYXRlTG9naW5CdG4oKTtcbiAgICB9KTtcblxuICAgIC8vIGF0dGFjaCB0aGUgbWVudVxuICAgICQoXCIjbG9naW4taGVhZGVyXCIpLmh0bWwoXCJcIikuYXBwZW5kKGJ0bik7XG4gIH07XG5cbiAgLyoqKlxuICAgKiAgUmVxdWVzdCB0aGUgdXNlcidzIGluZm9ybWF0aW9uLiAgV2hlbiBsb2FkZWQsIHVwZGF0ZSB0aGUgdG9wIHJpZ2h0IG1lbnVcbiAgICoqKi9cbiAgZnVuY3Rpb24gX3NldFVzZXJJbmZvKCkge1xuICAgIC8vIGxvYWQgdXNlciBuYW1lXG4gICAgJC5hamF4KHtcbiAgICAgIHVybCA6IFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vb2F1dGgyL3YxL3VzZXJpbmZvXCIsXG4gICAgICBiZWZvcmVTZW5kIDogZnVuY3Rpb24ocmVxdWVzdCkge1xuICAgICAgICAvLyBhbHdheXMgc2V0IHlvdXIgYWNjZXNzIHN0b2tlblxuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsJ0JlYXJlciAnKyB0b2tlbi5hY2Nlc3NfdG9rZW4pO1xuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbihkYXRhLCBzdGF0dXMseGhyKSB7XG4gICAgICAgIC8vIHBhcnNlIHlvdXIganNvbiByZXNwb25zZVxuICAgICAgICB0cnkge1xuICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICAgIC8vIHVwZGF0ZSB0b3AgcmlnaHQgbWVudVxuICAgICAgICBfY3JlYXRlTG9nb3V0QnRuKGRhdGEpO1xuXG4gICAgICAgIC8vIHNldCB0byB3aW5kb3cgc2NvcGVcbiAgICAgICAgd2luZG93LnVzZXJpbmZvID0gZGF0YTtcbiAgICAgIH0sXG4gICAgICBlcnJvciA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBUT0RPOiBzaG91bGQgd2UgYWxlcnQgdGhpcz9cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGxvYWQgdXNlciBmaWxlcywgdHJlZXNcbiAgICBfdXBkYXRlRmlsZUxpc3QoKTtcbiAgICBfdXBkYXRlVHJlZUxpc3QoKTtcbiAgfVxuXG4gIC8qKipcbiAgICogIFNlYXJjaCBmb3IgdGhlIHVzZXJzIG1vZGVsc1xuICAgKlxuICAgKiBUT0RPOiBhZGQgc2VhcmNoIHRvIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zLFxuICAgKiAgbGltaXQgdG8gMTAgcmVzdWx0c1xuICAgKioqL1xuICBmdW5jdGlvbiBfdXBkYXRlRmlsZUxpc3QoKSB7XG4gICAgbGlzdEZpbGVzKFwibWltZVR5cGUgPSAnXCIrTUlNRV9UWVBFK1wiJ1wiLCBmdW5jdGlvbihyZXNwKXtcbiAgICAgIGZpbGVMaXN0ID0gcmVzcC5yZXN1bHQuaXRlbXM7XG4gICAgfSk7XG4gIH1cblxuICAvKioqXG4gICAqICBTZWFyY2ggZm9yIHRoZSB1c2VycyB0cmVlc1xuICAgKlxuICAgKiBUT0RPOiBhZGQgc2VhcmNoIHRvIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zLFxuICAgKiAgbGltaXQgdG8gMTAgcmVzdWx0c1xuICAgKioqL1xuICBmdW5jdGlvbiBfdXBkYXRlVHJlZUxpc3QoKSB7XG4gICAgbGlzdEZpbGVzKFwibWltZVR5cGUgPSAnXCIrVFJFRV9NSU1FX1RZUEUrXCInXCIsIGZ1bmN0aW9uKHJlc3Ape1xuICAgICAgdHJlZUxpc3QgPSByZXNwLnJlc3VsdC5pdGVtcztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKipcbiAgICogIFJlbmRlciB0aGUgdXNlcnMgY3VycmVudCBtb2RlbHMgb250byB0aGUgJ2xvYWQgZnJvbSBkcml2ZScgcG9wdXBcbiAgICoqKi9cbiAgZnVuY3Rpb24gX3Nob3dEcml2ZUZpbGVzKCkge1xuICAgIC8vIGlmIHRoZXkgaGF2ZSBubyBmaWxlcywgc2F5IHNvIGFuZCBnZXQgb3V0IG9mIGhlcmVcbiAgICBpZiggIWZpbGVMaXN0ICkgcmV0dXJuICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5odG1sKFwiPGxpPk5vIEZpbGVzPC9saT5cIik7XG4gICAgaWYoIGZpbGVMaXN0Lmxlbmd0aCA9PSAwICkgcmV0dXJuICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5odG1sKFwiPGxpPk5vIEZpbGVzPC9saT5cIik7XG5cbiAgICAvLyBzaG93IGEgdGl0bGUsIHRoZXJlIGFyZSBtdWx0aXBsZSB0eXBlcyB0aGF0IGNhbiBiZSBsb2FkZWQgZnJvbSBkcml2ZVxuICAgICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5odG1sKFwiPGg0PlNlbGVjdCBGaWxlPC9oND5cIik7XG5cbiAgICAvLyBjcmVhdGUgdGhlIGxpc3QgZWxlbWVudHMgZm9yIGVhY2ggZmlsZXMgbWV0YWRhdGFcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgdmFyIGl0ZW0gPSBmaWxlTGlzdFtpXTtcbiAgICAgIHZhciBkID0gbmV3IERhdGUoaXRlbS5tb2RpZmllZERhdGUpO1xuICAgICAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZChcbiAgICAgICAgJChcIjxsaSBjbGFzcz0nbGlzdC1ncm91cC1pdGVtJz48YSBpZD0nXCIraXRlbS5pZCtcIicgdXJsPSdcIitpdGVtLmRvd25sb2FkVXJsK1wiJyBzdHlsZT0nY3Vyc29yOnBvaW50ZXInPjxpIGNsYXNzPSdpY29uLWZpbGUnPjwvaT4gXCIraXRlbS50aXRsZStcIjwvYT5cIiArXG4gICAgICAgICAgXCI8ZGl2IHN0eWxlPSdjb2xvcjojODg4O3BhZGRpbmc6IDVweCAwIDAgMTBweCc+XCIraXRlbS5kZXNjcmlwdGlvbitcIjwvZGl2PlwiK1xuICAgICAgICAgIFwiPGRpdiBzdHlsZT0nZm9udC1zdHlsZTppdGFsaWM7Zm9udC1zaXplOjExcHg7cGFkZGluZy1sZWZ0OjEwcHgnPkxhc3QgTW9kaWZpZWQ6IFwiK2QudG9EYXRlU3RyaW5nKCkrXCIgXCIrZC50b0xvY2FsZVRpbWVTdHJpbmcoKStcIiBieSBcIitpdGVtLmxhc3RNb2RpZnlpbmdVc2VyTmFtZStcIjxkaXY+PC9saT5cIlxuICAgICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gYWRkIGNsaWNrIGhhbmRsZXIgZm9yIGVhY2ggZmlsZVxuICAgICQoXCIjZ2RyaXZlLWZpbGUtbGlzdCBhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLWRyaXZlLW1vZGVsJywgMSk7XG5cbiAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xuXG4gICAgICAvLyBsZXQgdGhlIHVzZXIga25vdyB3aGF0IHdlIGFyZSBkb2luZ1xuICAgICAgX3NldExvYWRNZXNzYWdlKCc8aSBjbGFzcz1cImljb24tc3Bpbm5lciBpY29uLXNwaW5cIj48L2k+IExvYWRpbmcgRmlsZS4uLicsJ2luZm8nKTtcblxuICAgICAgLy8gZ3JhYiB0aGUgZml2ZSBmcm9tIGRyaXZlXG4gICAgICBnZXRGaWxlKGlkLCAkKHRoaXMpLmF0dHIoXCJ1cmxcIiksIGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgLy8gaWYgYmFkbmVzcywgbGV0IHRoZSB1c2VyIGtub3dcbiAgICAgICAgaWYoICFmaWxlICApIHJldHVybiBfc2V0TG9hZE1lc3NhZ2UoJ0ZhaWxlZCB0byBsb2FkIGZpbGUgZnJvbSBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcbiAgICAgICAgaWYoIGZpbGUuZXJyb3IgICkgcmV0dXJuIF9zZXRMb2FkTWVzc2FnZSgnRmFpbGVkIHRvIGxvYWQgZmlsZSBmcm9tIEdvb2dsZSBEcml2ZSA6KCcsJ2RhbmdlcicpO1xuXG4gICAgICAgIC8vIGhpZGUgYW55IGxvYWRlZCB0cmVlcyxcbiAgICAgICAgJChcIiNzaGFyZS10cmVlLWJ0blwiKS5oaWRlKCk7XG4gICAgICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKFwiXCIpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgbG9hZGVkVHJlZSA9IG51bGw7XG5cbiAgICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2UgYXJlIGFsbCBnb29kXG4gICAgICAgIF9zZXRMb2FkTWVzc2FnZSgnRmlsZSBMb2FkZWQuJywnc3VjY2VzcycpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgbG9hZGVkIGZpbGUgaWRcbiAgICAgICAgbG9hZGVkRmlsZSA9IGlkO1xuXG4gICAgICAgIC8vIHNldCB0aGUgbG9hZGVkIGZpbGUgbmFtZVxuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgIGlmKCBpZCA9PSBmaWxlTGlzdFtpXS5pZCApIHtcbiAgICAgICAgICAgICQoXCIjbG9hZGVkLW1vZGVsLXRpdGxlXCIpLmh0bWwoXCI8c3BhbiBzdHlsZT0nY29sb3I6IzMzMyc+TG9hZGVkIE1vZGVsIDwvc3Bhbj4gXCIrZmlsZUxpc3RbaV0udGl0bGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0blxuICAgICAgICAkKFwiI3NoYXJlLWJ0blwiKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgICQoXCIjb3Blbi1pbi1kcml2ZVwiKS5hdHRyKFwiaHJlZlwiLFwiaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZmlsZS9kL1wiK2lkKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAgICAgLy8gc2V0dXAgbW9kZWxcbiAgICAgICAgbTNQR0lPLmxvYWRTZXR1cChpZCwgZmlsZSk7XG5cbiAgICAgICAgLy8gc2V0dXAgcmVhbHRpbWUgZXZlbnRzXG4gICAgICAgIGdkcml2ZVJULmluaXRSdEFwaShsb2FkZWRGaWxlKTtcblxuICAgICAgICAvLyB3YWl0IGEgdGljayBzbyB1c2VyIGNhbiBzZWUgc3VjY2VzcyBtZXNzYWdlXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAvLyBoaWRlIHRoZSBtb2RhbFxuICAgICAgICAgICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICB9LDE1MDApO1xuXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKipcbiAgICogIFJlbmRlciB0aGUgdXNlcnMgY3VycmVudCB0cmVlcyBvbnRvIHRoZSAnbG9hZCBmcm9tIGRyaXZlJyBwb3B1cFxuICAgKioqL1xuICBmdW5jdGlvbiBfc2hvd1RyZWVGaWxlcygpIHtcbiAgICAvLyB1cGRhdGUgdGhlIGxpc3QgaGVhZGVyLCBsZXQgdXNlciBrbm93IHdoYXQgdGhleSBhcmUgc2VsZWN0aW5nXG4gICAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmh0bWwoXCJcIik7XG4gICAgJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZCgkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPjxoNT5TZWxlY3QgVHJlZTwvaDU+PC9saT5cIikpO1xuXG4gICAgLy8gaWYgdGhlcmUgYXJlIG5vIHRyZWVzLCBzYXkgc28gYW5kIGdldCBvdXQgb2YgaGVyZVxuICAgIGlmKCAhdHJlZUxpc3QgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZCgkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPk5vIFRyZWVzIEF2YWlsYWJsZTwvbGk+XCIpKTtcbiAgICBpZiggdHJlZUxpc3QubGVuZ3RoID09IDAgKSByZXR1cm4gJChcIiNnZHJpdmUtZmlsZS1saXN0XCIpLmFwcGVuZCgkKFwiPGxpIGNsYXNzPSdsaXN0LWdyb3VwLWl0ZW0nPk5vIFRyZWVzIEF2YWlsYWJsZTwvbGk+XCIpKTtcblxuICAgIC8vIGNyZWF0ZSB0aGUgdHJlZSBsaXN0IGVsZW1lbnRzXG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB0cmVlTGlzdC5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBpdGVtID0gdHJlZUxpc3RbaV07XG4gICAgICB2YXIgZCA9IG5ldyBEYXRlKGl0ZW0ubW9kaWZpZWREYXRlKTtcbiAgICAgICQoXCIjZ2RyaXZlLWZpbGUtbGlzdFwiKS5hcHBlbmQoXG4gICAgICAgICQoXCI8bGkgY2xhc3M9J2xpc3QtZ3JvdXAtaXRlbSc+PGEgaWQ9J1wiK2l0ZW0uaWQrXCInIG5hbWU9J1wiK2l0ZW0udGl0bGUrXCInIHVybD0nXCIraXRlbS5kb3dubG9hZFVybCtcIicgc3R5bGU9J2N1cnNvcjpwb2ludGVyJz48aSBjbGFzcz0naWNvbi1sZWFmJz48L2k+IFwiK2l0ZW0udGl0bGUrXCI8L2E+XCIgK1xuICAgICAgICAgIFwiPGRpdiBzdHlsZT0nY29sb3I6Izg4ODtwYWRkaW5nOiA1cHggMCAwIDEwcHgnPlwiK2l0ZW0uZGVzY3JpcHRpb24rXCI8L2Rpdj5cIitcbiAgICAgICAgICBcIjxkaXYgc3R5bGU9J2ZvbnQtc3R5bGU6aXRhbGljO2ZvbnQtc2l6ZToxMXB4O3BhZGRpbmctbGVmdDoxMHB4Jz5MYXN0IE1vZGlmaWVkOiBcIitkLnRvRGF0ZVN0cmluZygpK1wiIFwiK2QudG9Mb2NhbGVUaW1lU3RyaW5nKCkrXCIgYnkgXCIraXRlbS5sYXN0TW9kaWZ5aW5nVXNlck5hbWUrXCI8ZGl2PjwvbGk+XCJcbiAgICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGFkZCBjbGljayBoYW5kbGVyIGZvciB0aXRsZXNcbiAgICAkKFwiI2dkcml2ZS1maWxlLWxpc3QgYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCAndWknLCAnaW50ZXJhY3Rpb24nLCAnbG9hZC1kcml2ZS10cmVlJywgMSk7XG5cbiAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xuICAgICAgdmFyIG5hbWUgPSAkKHRoaXMpLmF0dHIoXCJuYW1lXCIpO1xuXG4gICAgICAvLyB0ZWxsIHRoZSB1c2VyIHdlIGFyZSBsb2FkaW5nXG4gICAgICBfc2V0TG9hZE1lc3NhZ2UoJzxpIGNsYXNzPVwiaWNvbi1zcGlubmVyIGljb24tc3BpblwiPjwvaT4gTG9hZGluZyBUcmVlLi4uJywnaW5mbycpO1xuXG4gICAgICAvLyBsb2FkIGZpbGUgZnJvbSBkcml2ZVxuICAgICAgZ2V0RmlsZShpZCwgJCh0aGlzKS5hdHRyKFwidXJsXCIpLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgIC8vIGlmIGJhZG5lc3MsIGxldCB1c2VyIGtub3dcbiAgICAgICAgaWYoICFmaWxlICApIHJldHVybiBfc2V0TG9hZE1lc3NhZ2UoJ0ZhaWxlZCB0byBsb2FkIHRyZWUgZnJvbSBHb29nbGUgRHJpdmUgOignLCdkYW5nZXInKTtcbiAgICAgICAgaWYoIGZpbGUuZXJyb3IgICkgcmV0dXJuIF9zZXRMb2FkTWVzc2FnZSgnRmFpbGVkIHRvIGxvYWQgdHJlZSBmcm9tIEdvb2dsZSBEcml2ZSA6KCcsJ2RhbmdlcicpO1xuXG4gICAgICAgIC8vIHNob3cgdGhlIHRyZWUgc2hhcmluZyBidG5zXG4gICAgICAgICQoXCIjc2hhcmUtdHJlZS1idG5cIikuc2hvdygpO1xuICAgICAgICAkKFwiI2xvYWRlZC10cmVlLW5hbWVcIikuaHRtbChuYW1lKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAgICAgLy8gbGV0IHRoZSB1c2VyIGtub3cgd2UgYXJlIHN1Y2Nlc2Z1bGxcbiAgICAgICAgX3NldExvYWRNZXNzYWdlKCdUcmVlIExvYWRlZC4nLCdzdWNjZXNzJyk7XG5cbiAgICAgICAgLy8gc2V0IHRoZSBsb2FkZWQgdHJlZSBpZFxuICAgICAgICBsb2FkZWRUcmVlID0gaWQ7XG5cbiAgICAgICAgLy8gbG9hZGVkIHRyZWUgaW50byBtb2RlbCAvIFVJXG4gICAgICAgIG0zUEdJTy5sb2FkVHJlZShmaWxlKTtcblxuICAgICAgICAvLyB3YWl0IGEgc2VjIHNvIHVzZXIgY2FuIHNlZSBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICB9LDE1MDApO1xuXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKipcbiAgICogIHNob3cgdGhlIHVzZXIgdGhlIGxvYWQgdHJlZSBwb3B1cFxuICAgKioqL1xuICBmdW5jdGlvbiBzaG93TG9hZFRyZWVQYW5lbCgpIHtcbiAgICAvLyByZW5kZXIgdGhlIHRyZWVzIGludG8gdGhlIHBvcHVwIGxpc3RcbiAgICBfc2hvd1RyZWVGaWxlcygpO1xuICAgIC8vIGNsZWFyIGFueSBtZXNzYWdlc1xuICAgIF9zZXRMb2FkTWVzc2FnZShudWxsKTtcbiAgICAvLyBzaG93IHRoZSBwb3B1cFxuICAgICQoXCIjbG9hZC1tb2RhbFwiKS5tb2RhbCgnc2hvdycpO1xuICB9XG5cbiAgLyoqKlxuICAgKiAgc2hvdyB0aGUgdXNlciB0aGUgc2F2ZSB0cmVlIHBvcHVwXG4gICAqKiovXG4gIGZ1bmN0aW9uIHNob3dTYXZlVHJlZVBhbmVsKCkge1xuICAgIC8vIHNldCB0aGUgY3VycmVudCBtaW1lVHlwZSB3ZSBhcmUgc2F2aW5nXG4gICAgc2F2ZU1pbWVUeXBlID0gVFJFRV9NSU1FX1RZUEU7XG5cbiAgICAvLyBzZXQgdGhlIGhlYWRlciBzbyB1c2VyIGtub3dzIHdoYXQgdHlwZSB0aGV5IGFyZSBzYXZpbmdcbiAgICAkKFwiI2dkcml2ZS1zYXZlLXN1YmhlYWRlclwiKS5odG1sKFwiPGg1PlNhdmUgVHJlZTwvaDU+XCIpO1xuXG4gICAgLy8gaWYgdGhlcmUgaXMgYSBjdXJyZW50IHRyZWUsIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICAgIGlmKCBsb2FkZWRUcmVlICE9IG51bGwpIHtcbiAgICAgIC8vIGZpbmQgdGhlIGN1cnJlbnQgdHJlZSBiYXNlZCBvbiBpZFxuICAgICAgdmFyIHRyZWUgPSB7fTtcbiAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdHJlZUxpc3QubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIGlmKCB0cmVlTGlzdFtpXS5pZCA9PSBsb2FkZWRUcmVlKSB7XG4gICAgICAgICAgdHJlZSA9IHRyZWVMaXN0W2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHNob3cgdGhlIHVwZGF0ZSBwYW5lbFxuICAgICAgJChcIiNzYXZlLXVwZGF0ZS1wYW5lbFwiKS5zaG93KCk7XG5cbiAgICAgIC8vIHJlbmRlciB0cmVlIG1ldGFkYXRhIG9uIHVwZGF0ZSBwYW5lbFxuICAgICAgdmFyIGQgPSBuZXcgRGF0ZSh0cmVlLm1vZGlmaWVkRGF0ZSk7XG4gICAgICAkKFwiI3NhdmUtdXBkYXRlLXBhbmVsLWlubmVyXCIpLmh0bWwoXCI8Yj5cIit0cmVlLnRpdGxlK1wiPC9iPjxiciAvPlwiICtcbiAgICAgICAgICBcIjxzcGFuIHN0eWxlPSdjb2xvcjojODg4Jz5cIit0cmVlLmRlc2NyaXB0aW9uK1wiPC9zcGFuPjxiciAvPlwiK1xuICAgICAgICAgIFwiPHNwYW4gc3R5bGU9J2ZvbnQtc3R5bGU6aXRhbGljO2ZvbnQtc2l6ZToxMXB4Oyc+TGFzdCBNb2RpZmllZDogXCIgK1xuICAgICAgICAgIGQudG9EYXRlU3RyaW5nKCkrXCIgXCIrZC50b0xvY2FsZVRpbWVTdHJpbmcoKStcIiBieSBcIit0cmVlLmxhc3RNb2RpZnlpbmdVc2VyTmFtZStcIjwvc3Bhbj48YnIgLz5cIitcbiAgICAgICAgICBcIjxhIGhyZWY9J2h0dHBzOi8vZHJpdmUuZ29vZ2xlLmNvbS9maWxlL2QvXCIrdHJlZS5pZCtcIicnIHRhcmdldD0nX2JsYW5rJz48aSBjbGFzcz0naWNvbi1saW5rJz48L2k+IE9wZW4gaW4gR29vZ2xlIERyaXZlPC9hPlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZG9uJ3Qgc2hvdyB0aGUgdXBkYXRlIHBhbmVsLCB0aGlzIGlzIGEgbmV3IHRyZWVcbiAgICAgICQoXCIjc2F2ZS11cGRhdGUtcGFuZWxcIikuaGlkZSgpO1xuICAgIH1cblxuICAgIC8vIGNsZWFyIGFueSBtZXNzYWdlXG4gICAgX3NldFNhdmVNZXNzYWdlKG51bGwpO1xuXG4gICAgLy8gc2hvdyB0aGUgcG9wdXBcbiAgICAkKFwiI3NhdmUtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgfVxuXG4gIC8qKipcbiAgICogTG9hZCBhIG1vZGVsIGJhc2VkIG9uIHBhc3NlZCBpZC4gIFRoaXMgZnVuY3Rpb24gaXMgcmVhbGx5IG9ubHkgZm9yIGxvYWRpbmcgbW9kZWwgb24gc3RhcnQsIHdoZW4gYSBmaWxlIGlkXG4gICAqIGhhcyBiZWVuIHBhc3NlZCBpbiB0aGUgdXJsIGVpdGhlciBmcm9tIGdvb2dsZSBkcml2ZSBvciBmcm9tIHRoZSA/ZmlsZT1pZCB1cmwuXG4gICAqKiovXG4gIHZhciBsb2dpbk1vZGFsSW5pdCA9IGZhbHNlO1xuICBmdW5jdGlvbiBsb2FkKGlkLCBsb2FkRm4pIHtcbiAgICAvLyBpZiB3ZSBkb24ndCBoYXZlIGFuIGFjY2VzcyB0b2tlbiwgd2UgbmVlZCB0byBzaWduIGluIGZpcnN0XG4gICAgLy8gVE9ETzogaWYgdGhpcyBpcyBhIHB1YmxpYyBmaWxlLCB0aGVyZSBpcyBubyByZWFzb24gdG8gc2lnbiBpbi4uLiBzb2x1dGlvbj9cbiAgICBpZiggIXRva2VuICkge1xuXG4gICAgICBpZiggIWxvZ2luTW9kYWxJbml0ICkge1xuICAgICAgICAkKCcjZ29vZ2xlLW1vZGFsLWxvZ2luJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAvLyBzaWduIHRoZSB1c2VyIGluIChmb3JjZSBvYXV0aCBwb3B1cClcbiAgICAgICAgICBzaWduSW4oZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICQoJyNsb2dpbi1tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgdXNlciBpbmZvcm1hdGlvbiBpbiB0b3AgbGVmdFxuICAgICAgICAgICAgX3NldFVzZXJJbmZvKCk7XG5cbiAgICAgICAgICAgIGlmKCBsb2FkRm4gKSBsb2FkRm4oKTtcblxuICAgICAgICAgICAgZ2V0RmlsZU1ldGFkYXRhKGlkLCBmdW5jdGlvbihtZXRhZGF0YSl7XG4gICAgICAgICAgICAgIGdldEZpbGUoaWQsIG1ldGFkYXRhLmRvd25sb2FkVXJsLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgICAgICAgICAgX29uSW5pdEZpbGVMb2FkZWQobWV0YWRhdGEsZmlsZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnI2xvZ2luLW1vZGFsJykubW9kYWwoKTtcbiAgICAgICAgbG9naW5Nb2RhbEluaXQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCgnI2xvZ2luLW1vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICBpZiggbG9hZEZuICkgbG9hZEZuKCk7XG5cbiAgICAgIGdldEZpbGVNZXRhZGF0YShpZCwgZnVuY3Rpb24obWV0YWRhdGEpe1xuICAgICAgICBnZXRGaWxlKGlkLCBtZXRhZGF0YS5kb3dubG9hZFVybCwgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICAgIF9vbkluaXRGaWxlTG9hZGVkKG1ldGFkYXRhLGZpbGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKipcbiAgICogSW5pdGlhbGl6ZSBVSSAvIG1vZGVsIHdoZW4gYSBmaWxlIGlzIGxvYWRlZCBhdCBzdGFydFxuICAgKioqL1xuICBmdW5jdGlvbiBfb25Jbml0RmlsZUxvYWRlZChtZXRhZGF0YSwgZmlsZSkge1xuICAgIC8vIGJhZGRuZXNzLCBsZXQgdGhlIHVzZXIga25vd1xuICAgIGlmKCAhZmlsZSApIHtcbiAgICAgIGlmKCBoaWRlSW5pdExvYWRpbmcgKSBoaWRlSW5pdExvYWRpbmcoKTtcbiAgICAgIHJldHVybiBhbGVydChcIkZhaWxlZCB0byBsb2FkIGZyb20gR29vZ2xlIERyaXZlIDovXCIpO1xuICAgIH1cblxuICAgIC8vIG1ldGFkYXRhIGZhaWxlZCB0byBsb2FkLCBtb3JlIGJhZG5lc3NcbiAgICBpZiggbWV0YWRhdGEuY29kZSA9PSA0MDQgKSB7XG4gICAgICBpZiggaGlkZUluaXRMb2FkaW5nICkgaGlkZUluaXRMb2FkaW5nKCk7XG4gICAgICByZXR1cm4gYWxlcnQoXCJHb29nbGUgRHJpdmU6IFwiK21ldGFkYXRhLm1lc3NhZ2UpO1xuICAgIH1cblxuICAgIC8vIHdlIGxvYWRlZCBhIG1vZGVsLCBzZXR1cCBhbmQgcnVuXG4gICAgaWYoIG1ldGFkYXRhLm1pbWVUeXBlID09IE1JTUVfVFlQRSApIHtcbiAgICAgIC8vIHNldCB0aGUgY3VycmVudGx5IGxvYWRlZCBmaWxlIGlkXG4gICAgICBsb2FkZWRGaWxlID0gbWV0YWRhdGEuaWQ7XG5cbiAgICAgIC8vIHNob3cgdGhlIHNoYXJlIGJ0blxuICAgICAgJChcIiNzaGFyZS1idG5cIikucGFyZW50KCkuc2hvdygpO1xuICAgICAgJChcIiNvcGVuLWluLWRyaXZlXCIpLmF0dHIoXCJocmVmXCIsXCJodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9maWxlL2QvXCIrbWV0YWRhdGEuaWQpLnBhcmVudCgpLnNob3coKTtcblxuICAgICAgLy8gc2hvdyB0aXRsZVxuICAgICAgJChcIiNsb2FkZWQtbW9kZWwtdGl0bGVcIikuaHRtbChcIjxzcGFuIHN0eWxlPSdjb2xvcjojMzMzJz5Mb2FkZWQgTW9kZWwgPC9zcGFuPiBcIittZXRhZGF0YS50aXRsZSk7XG5cbiAgICAgIC8vIHNldHVwIG1vZGVsXG4gICAgICBtM1BHSU8ubG9hZFNldHVwKG1ldGFkYXRhLmlkLCBmaWxlKTtcblxuICAgICAgLy8gc2V0dXAgcmVhbHRpbWUgZXZlbnRzXG4gICAgICBnZHJpdmVSVC5pbml0UnRBcGkobG9hZGVkRmlsZSk7XG4gICAgfSBlbHNlIGlmICggbWV0YWRhdGEubWltZVR5cGUgPT0gVFJFRV9NSU1FX1RZUEUgKSB7IC8vIHdlIGxvYWRlZCBhIHRyZWVcbiAgICAgIC8vIHNldCB0aGUgbG9hZGVkIHRyZWUgaWRcbiAgICAgIGxvYWRlZFRyZWUgPSBtZXRhZGF0YS5pZDtcblxuICAgICAgLy8gc2hvdyB0aGUgc2hhcmUgYnRuXG4gICAgICAkKFwiI3NoYXJlLXRyZWUtYnRuXCIpLnNob3coKTtcbiAgICAgICQoXCIjbG9hZGVkLXRyZWUtbmFtZVwiKS5odG1sKG1ldGFkYXRhLnRpdGxlKS5wYXJlbnQoKS5zaG93KCk7XG5cbiAgICAgIC8vIHNldCB0aGUgbG9hZGVkIHRyZWVcbiAgICAgIG0zUEdJTy5sb2FkVHJlZShmaWxlKTtcblxuICAgICAgLy8gaGlkZSB0aGUgbG9hZGluZyBwb3B1cFxuICAgICAgaWYoIGhpZGVJbml0TG9hZGluZyApIGhpZGVJbml0TG9hZGluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChcIkxvYWRlZCB1bmtub3duIGZpbGUgdHlwZSBmcm9tIEdvb2dsZSBEcml2ZTogXCIrbWV0YWRhdGEubWltZVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKipcbiAgICogdG9rZW5zIGV4cGlyZSwgZXZlcnkgb25jZSBpbiBhd2hpbGUgY2hlY2sgdGhlIGN1cnJlbnQgdG9rZW4gaGFzbid0XG4gICAqIGlmIGl0IGhhcywgdGhlbiB1cGRhdGVcbiAgICoqKi9cbiAgZnVuY3Rpb24gX2NoZWNrVG9rZW4oKSB7XG4gICAgLy8gaWdub3JlIGlmIHRoZXJlIGlzIG5vIHRva2VuXG4gICAgaWYgKCF0b2tlbikgcmV0dXJuO1xuXG4gICAgLy8gb3RoZXJ3aXNlLCBsb29rIHRvIHVwZGF0ZSB0aGUgYWNjZXNzIHRva2VuXG4gICAgT2F1dGguZ2V0QWNjZXNzVG9rZW4oZnVuY3Rpb24odCkge1xuICAgICAgaWYoIHQgIT0gbnVsbCApIHRva2VuID0gdDtcbiAgICB9KTtcbiAgfTtcblxuICAvKioqXG4gICAqIGlzIHRoZSBjdXJyZW50IHVzZXIgc2lnbmVkIGluP1xuICAgKioqL1xuICBmdW5jdGlvbiBjaGVja1NpZ25lZEluKGNhbGxiYWNrKSB7XG4gICAgLy8gaWYgaXNBdXRoZXJpemVkIHJldHVybnMgYSB0b2tlbiwgdXNlciBpcyBsb2dnZWQgaW5cbiAgICBPYXV0aC5pc0F1dGhvcml6ZWQoZnVuY3Rpb24odG9rZW4pe1xuICAgICAgaWYgKHRva2VuICE9IG51bGwpIGNhbGxiYWNrKHRydWUpO1xuICAgICAgZWxzZSBjYWxsYmFjayhmYWxzZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqKlxuICAgKiBTaWduIGEgdXNlciBpbiB1c2luZyB0aGUgT2F1dGggY2xhc3NcbiAgICoqKi9cbiAgZnVuY3Rpb24gc2lnbkluKGNhbGxiYWNrKSB7XG4gICAgT2F1dGguYXV0aG9yaXplKGZ1bmN0aW9uKHQpe1xuICAgICAgdG9rZW4gPSB0O1xuICAgICAgaWYgKHRva2VuICE9IG51bGwpIHtcbiAgICAgICAgaWYoIHQuZXJyb3IgKSByZXR1cm4gY2FsbGJhY2soZmFsc2UpO1xuICAgICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KVxuICB9O1xuXG4gIC8qKipcbiAgICogQWNjZXNzIG1ldGhvZCBmb3IgdG9rZW5cbiAgICoqKi9cbiAgZnVuY3Rpb24gZ2V0VG9rZW4oKSB7XG4gICAgcmV0dXJuIHRva2VuO1xuICB9O1xuXG4gIC8qKipcbiAgICogTG9hZCB0aGUgZ29vZ2xlIGRyaXZlIGFwaSBjb2RlXG4gICAqKiovXG4gIGZ1bmN0aW9uIF9sb2FkQXBpKGNhbGxiYWNrKSB7XG4gICAgZ2FwaS5jbGllbnQubG9hZChcImRyaXZlXCIsIERSSVZFX0FQSV9WRVJTSU9OLCBmdW5jdGlvbigpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqKlxuICAgKiBHZXQgYSBsaXN0IG9mIGZpbGUgbWV0YWRhdGEgZnJvbSBnb29nbGUgZHJpdmUgYmFzZWQgb24gcXVlcnlcbiAgICoqKi9cbiAgZnVuY3Rpb24gbGlzdEZpbGVzKHF1ZXJ5LCBjYWxsYmFjaykge1xuICAgIGdhcGkuY2xpZW50LmRyaXZlLmZpbGVzLmxpc3Qoe1xuICAgICAgcSA6IHF1ZXJ5ICsgXCIgYW5kIHRyYXNoZWQgPSBmYWxzZVwiXG4gICAgfSkuZXhlY3V0ZShmdW5jdGlvbihyZXNwKSB7XG4gICAgICBjYWxsYmFjayhyZXNwKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKioqXG4gICAqIEdldCBhIHNpbmdsZSBmaWxlcyBtZXRhZGF0YSBiYXNlZCBvbiBpZFxuICAgKioqL1xuICBmdW5jdGlvbiBnZXRGaWxlTWV0YWRhdGEoaWQsIGNhbGxiYWNrKSB7XG4gICAgZ2FwaS5jbGllbnQuZHJpdmUuZmlsZXMuZ2V0KHtcbiAgICAgICdmaWxlSWQnIDogaWRcbiAgICB9KS5leGVjdXRlKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICAgIGNhbGxiYWNrKHJlc3ApO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKipcbiAgICogIEFjdHVhbGx5IGxvYWQgYSBmaWxlcyBkYXRhLiAgVGhlIHVybCB0byBkbyB0aGlzIGlzIHByb3ZpZGVkIGluIGEgZmlsZXMgbWV0YWRhdGEuXG4gICAqKiovXG4gIGZ1bmN0aW9uIGdldEZpbGUoaWQsIGRvd25sb2FkVXJsLCBjYWxsYmFjaykge1xuICAgICQuYWpheCh7XG4gICAgICB1cmwgOiBkb3dubG9hZFVybCxcbiAgICAgIGJlZm9yZVNlbmQgOiBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgICAgIC8vIHNldCBhY2Nlc3MgdG9rZW4gaW4gaGVhZGVyXG4gICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgJ0JlYXJlciAnKyB0b2tlbi5hY2Nlc3NfdG9rZW4pO1xuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbihkYXRhLCBzdGF0dXMsIHhocikge1xuICAgICAgICAvLyBwYXJzZSB0aGUgcmVzcG9uc2UgKHdlIG9ubHkgc3RvcmUganNvbiBpbiB0aGUgZ29vZ2xlIGRyaXZlKVxuICAgICAgICB0cnkge1xuICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICAgIGNhbGxiYWNrKGRhdGEsIGlkKTtcbiAgICAgIH0sXG4gICAgICBlcnJvciA6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgZXJyb3IgOiB0cnVlLFxuICAgICAgICAgIG1lc3NhZ2UgOiBcIkZhaWxlZCB0byBsb2FkIGZpbGUgZnJvbSBHb29nbGUgRHJpdmVcIlxuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIC8qKipcbiAgICogU2F2ZSBqc29uIHRvIGdvb2dsZSBkcml2ZVxuICAgKioqL1xuICBmdW5jdGlvbiBzYXZlRmlsZShuYW1lLCBkZXNjcmlwdGlvbiwgbWltZVR5cGUsIGpzb24sIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgaWYoICFvcHRpb25zICkgb3B0aW9ucyA9IHt9XG5cbiAgICB2YXIgYm91bmRhcnkgPSAnLS0tLS0tLTMxNDE1OTI2NTM1ODk3OTMyMzg0Nic7XG4gICAgdmFyIGRlbGltaXRlciA9IFwiXFxyXFxuLS1cIiArIGJvdW5kYXJ5ICsgXCJcXHJcXG5cIjtcbiAgICB2YXIgY2xvc2VfZGVsaW0gPSBcIlxcclxcbi0tXCIgKyBib3VuZGFyeSArIFwiLS1cIjtcblxuICAgIHZhciBtZXRhZGF0YSA9IHtcbiAgICAgICd0aXRsZScgOiBuYW1lLFxuICAgICAgJ2Rlc2NyaXB0aW9uJyA6IGRlc2NyaXB0aW9uLFxuICAgICAgJ21pbWVUeXBlJyA6IG1pbWVUeXBlXG4gICAgfTtcblxuICAgIC8vIGlmIHdlIHdhbnQgdG8gc2F2ZSB0aGUgZmlsZSB0byBhIHNwZWNpZmllZCBmb2xkZXJcbiAgICBpZiggb3B0aW9ucy5wYXJlbnQgKSB7XG4gICAgICBtZXRhZGF0YS5wYXJlbnRzID0gW3tpZDogb3B0aW9ucy5wYXJlbnR9XTtcbiAgICB9XG5cbiAgICAvLyBpZiB0aGUganNvbiBpcyByZWFsbHkgYW4gb2JqZWN0LCB0dXJuIGl0IHRvIGEgc3RyaW5nXG4gICAgaWYgKHR5cGVvZiBqc29uID09ICdvYmplY3QnKSBqc29uID0gSlNPTi5zdHJpbmdpZnkoanNvbik7XG5cbiAgICAvLyBkYXRhIG5lZWRzIHRvIGJlIGJhc2U2NCBlbmNvZGVkIGZvciB0aGUgUE9TVFxuICAgIHZhciBiYXNlNjREYXRhID0gYnRvYShqc29uKTtcblxuICAgIC8vIGNyZWF0ZSBvdXIgbXVsdGlwYXJ0IFBPU1QgcmVxdWVzdFxuICAgIHZhciBtdWx0aXBhcnRSZXF1ZXN0Qm9keSA9IGRlbGltaXRlclxuICAgICAgICArICdDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cXHJcXG5cXHJcXG4nXG4gICAgICAgICsgSlNPTi5zdHJpbmdpZnkobWV0YWRhdGEpO1xuXG4gICAgaWYoIGpzb24ubGVuZ3RoID4gMCApIHtcbiAgICAgIG11bHRpcGFydFJlcXVlc3RCb2R5ICs9IGRlbGltaXRlciArICdDb250ZW50LVR5cGU6ICdcbiAgICAgICAgKyBtaW1lVHlwZSArICdcXHJcXG4nICsgJ0NvbnRlbnQtVHJhbnNmZXItRW5jb2Rpbmc6IGJhc2U2NFxcclxcbidcbiAgICAgICAgKyAnXFxyXFxuJyArIGJhc2U2NERhdGE7XG4gICAgfVxuICAgIG11bHRpcGFydFJlcXVlc3RCb2R5ICs9IGNsb3NlX2RlbGltO1xuXG4gICAgICAgLy8gc2V0dXAgUE9TVCByZXF1ZXN0XG4gICAgICAgLy8gaWYgdGhlIG9wdGlvbnMuY29udmVyPXRydWUgZmxhZyBpcyBzZXQsIGdvb2dsZSBhdHRlbXB0cyB0byBjb252ZXJ0IHRoZSBmaWxlIHRvXG4gICAgICAgLy8gYSBnb29nbGUgZG9jIGZpbGUuICBNb3N0bHksIHdlIHVzZSB0aGlzIGZvciBleHBvcnRpbmcgY3N2IC0+IEdvb2dsZSBTcHJlYWRzaGVldHNcbiAgICB2YXIgcmVxdWVzdCA9IGdhcGkuY2xpZW50LnJlcXVlc3Qoe1xuICAgICAgJ3BhdGgnIDogJy91cGxvYWQvZHJpdmUvdjIvZmlsZXMnICsgKCBvcHRpb25zLmNvbnZlcnQgPyAnP2NvbnZlcnQ9dHJ1ZScgOiAnJyksXG4gICAgICAnbWV0aG9kJyA6ICdQT1NUJyxcbiAgICAgICdwYXJhbXMnIDoge1xuICAgICAgICAndXBsb2FkVHlwZScgOiAnbXVsdGlwYXJ0J1xuICAgICAgfSxcbiAgICAgICdoZWFkZXJzJyA6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZScgOiAnbXVsdGlwYXJ0L21peGVkOyBib3VuZGFyeT1cIicgKyBib3VuZGFyeSArICdcIidcbiAgICAgIH0sXG4gICAgICAnYm9keScgOiBtdWx0aXBhcnRSZXF1ZXN0Qm9keVxuICAgIH0pO1xuXG4gICAgLy8gc2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3QuZXhlY3V0ZShmdW5jdGlvbihyZXNwKSB7XG4gICAgICBpZiAocmVzcC5pZClcbiAgICAgICAgY2FsbGJhY2socmVzcCk7XG4gICAgICBlbHNlXG4gICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICBlcnJvciA6IHRydWUsXG4gICAgICAgICAgbWVzc2FnZSA6IFwiRmFpbGVkIHRvIHNhdmVcIlxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvKioqXG4gICAqIFVwZGF0ZSBhIGZpbGUgYmFzZWQgb24gaWQgYW5kIGdpdmVuIGpzb24gZGF0YVxuICAgKioqL1xuICBmdW5jdGlvbiB1cGRhdGVGaWxlKGZpbGVJZCwganNvbiwgY2FsbGJhY2spIHtcbiAgICAvLyBzdGFydCBjcmVhdGluZyB0aGUgbXVsdGlwYXJ0IFBPU1QgcmVxdWVzdFxuICAgIHZhciBib3VuZGFyeSA9ICctLS0tLS0tMzE0MTU5MjY1MzU4OTc5MzIzODQ2JztcbiAgICB2YXIgZGVsaW1pdGVyID0gXCJcXHJcXG4tLVwiICsgYm91bmRhcnkgKyBcIlxcclxcblwiO1xuICAgIHZhciBjbG9zZV9kZWxpbSA9IFwiXFxyXFxuLS1cIiArIGJvdW5kYXJ5ICsgXCItLVwiO1xuXG4gICAgdmFyIG1ldGFkYXRhID0ge307XG5cbiAgICAvLyBzdHJpbmlmeSB0aGVuIGJhc2U2NCBlbmNvZGUgdGhlbiBvYmplY3RcbiAgICAgIHZhciBiYXNlNjREYXRhID0gYnRvYShKU09OLnN0cmluZ2lmeShqc29uKSk7XG5cbiAgICAgIC8vIHNldCB1cCB0aGUgUE9TVCBib2R5XG4gICAgICB2YXIgbXVsdGlwYXJ0UmVxdWVzdEJvZHkgPVxuICAgICAgICBkZWxpbWl0ZXIgK1xuICAgICAgICAgICdDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cXHJcXG5cXHJcXG4nICtcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShtZXRhZGF0YSkgK1xuICAgICAgICAgIGRlbGltaXRlciArXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZTogJyArIE1JTUVfVFlQRSArICdcXHJcXG4nICtcbiAgICAgICAgICAnQ29udGVudC1UcmFuc2Zlci1FbmNvZGluZzogYmFzZTY0XFxyXFxuJyArXG4gICAgICAgICAgJ1xcclxcbicgK1xuICAgICAgICAgIGJhc2U2NERhdGEgK1xuICAgICAgICAgIGNsb3NlX2RlbGltO1xuXG4gICAgLy8gc2V0dXAgUE9TVCByZXF1ZXN0XG4gICAgICB2YXIgcmVxdWVzdCA9IGdhcGkuY2xpZW50LnJlcXVlc3Qoe1xuICAgICAgICAgICdwYXRoJzogJy91cGxvYWQvZHJpdmUvdjIvZmlsZXMvJytmaWxlSWQsXG4gICAgICAgICAgJ21ldGhvZCc6ICdQVVQnLFxuICAgICAgICAgICdwYXJhbXMnOiB7J3VwbG9hZFR5cGUnOiAnbXVsdGlwYXJ0J30sXG4gICAgICAgICAgJ2hlYWRlcnMnOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9taXhlZDsgYm91bmRhcnk9XCInICsgYm91bmRhcnkgKyAnXCInXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnYm9keSc6IG11bHRpcGFydFJlcXVlc3RCb2R5fSk7XG5cbiAgICAgIC8vIHNldCByZXF1ZXN0XG4gICAgICByZXF1ZXN0LmV4ZWN1dGUoZnVuY3Rpb24ocmVzcCl7XG4gICAgICAgIGlmKCByZXNwLmlkICkge1xuICAgICAgICAgIGNhbGxiYWNrKHJlc3ApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICBlcnJvciA6IHRydWUsXG4gICAgICAgICAgbWVzc2FnZSA6IFwiRmFpbGVkIHRvIHVwZGF0ZVwiXG4gICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bk1vZGVsUnQoKSB7XG4gICAgaWYoIG9mZmxpbmVNb2RlICkgcmV0dXJuO1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3J1bi1tb2RlbC1yZW1vdGUnLCAxKTtcbiAgICBnZHJpdmVSVC5ydW5Nb2RlbFJ0KCk7XG4gIH1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXQgOiBpbml0LFxuICBjaGVja1NpZ25lZEluIDogY2hlY2tTaWduZWRJbixcbiAgc2lnbkluIDogc2lnbkluLFxuICBnZXRUb2tlbiA6IGdldFRva2VuLFxuICBsaXN0RmlsZXMgOiBsaXN0RmlsZXMsXG4gIGdldEZpbGVNZXRhZGF0YSA6IGdldEZpbGVNZXRhZGF0YSxcbiAgbG9hZCA6IGxvYWQsXG4gIHNhdmVGaWxlOiBzYXZlRmlsZSxcbiAgc2hvd0xvYWRUcmVlUGFuZWwgOiBzaG93TG9hZFRyZWVQYW5lbCxcbiAgc2hvd1NhdmVUcmVlUGFuZWwgOiBzaG93U2F2ZVRyZWVQYW5lbCxcbiAgcnVuTW9kZWxSdCA6IHJ1bk1vZGVsUnQsXG5cbiAgTUlNRV9UWVBFIDogTUlNRV9UWVBFXG59XG4iLCIgIC8vIFJFQUxUSU1FIChydCkgT2JqZWN0c1xuICAvLyBydCBqc29uIGZpZWxkLCB1c2VkIHRvIHNlbmQgdXBkYXRlcyB0byBwZWVyc1xuICB2YXIgcnRKc29uID0gbnVsbDtcbiAgLy8gcnQgZG9jdW1lbnRcbiAgdmFyIHJ0RG9jID0gbnVsbDtcbiAgLy8gaGFzIHRoZSBydCBhcGkgYmVlbiBsb2FkZWQ/XG4gIHZhciBfcnRMb2FkZWQgPSBmYWxzZTtcbiAgLy8gdGltZXIgdG8gYnVmZmVyIHRoZSBmaXJpbmcgb2YgdXBkYXRlcyBmcm9tIHJ0IGV2ZW50c1xuICB2YXIgX3J0VGltZXIgPSAtMTtcblxuICAvLyBsaXN0IG9mIGN1cnJlbnQgcnQgZWRpdHMgdG8gaW5wdXQgZmlsZXNcbiAgdmFyIHJ0RWRpdHMgPSB7fTtcbiAgLy8gZ29vZ2xlIGRyaXZlIHJ0IG1vZGVsIC0gbWFwXG4gIHZhciBsaXZlRWRpdHMgPSBudWxsO1xuICAvLyBsb2NhbCBsb2NrIG9uIGFuIGVsZW1lbnRcbiAgdmFyIGxvY2sgPSB7fTtcblxuICAvLyBsb2FkZWQgZmlsZSBpZFxuICB2YXIgbG9hZGVkRmlsZTtcblxuICAvKioqXG4gICAqIFNldHVwIHRoZSBydCBhcGkgZm9yIHRoZSBjdXJyZW50IGZpbGUuICBUaGlzIHdpbGwgYWN0dWFsbHkgbG9hZCB0aGUgYXBpIGlmIG5lZWRlZFxuICAgKioqL1xuICBmdW5jdGlvbiBpbml0UnRBcGkoZmlsZSkge1xuICAgIHJ0SnNvbiA9IG51bGw7IC8vIGtpbGwgb2ZmIGFueSBvbGQgbGlzdG5lcnNcbiAgICBsb2FkZWRGaWxlID0gZmlsZTtcblxuICAgIC8vIGNsb3NlIGFueSBvbGQgY29ubmVjdGlvblxuICAgIGlmKCBydERvYyApIHJ0RG9jLmNsb3NlKCk7XG5cbiAgICAvLyBnZXQgb3V0IG9mIGhlcmUgaWYgd2UgZG9uJ3QgaGF2ZSBhIGxvYWRlZCBmaWxlXG4gICAgaWYoIGxvYWRlZEZpbGUgPT0gbnVsbCApIHJldHVybjtcblxuICAgIC8vIGxvYWQgYXBpIGlmIG5lZWRlZFxuICAgIGlmKCAhX3J0TG9hZGVkICkge1xuICAgICAgZ2FwaS5sb2FkKCdkcml2ZS1yZWFsdGltZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIHNldHVwIHJ0IGhvb2tzXG4gICAgICAgIF9ydExvYWRlZCA9IHRydWU7XG4gICAgICAgIF9sb2FkUnRGaWxlKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2V0dXAgcnQgaG9va3NcbiAgICAgIF9sb2FkUnRGaWxlKCk7XG4gICAgfVxuXG4gICAgLy8gc2V0dXAgaW5wdXQgaGFuZGxlcnNcbiAgICAkKCcjaW5wdXRzIGlucHV0Jykub24oJ2ZvY3VzJyxmdW5jdGlvbihlKXtcbiAgICAgIHZhciBlbGUgPSAkKGUudGFyZ2V0KTtcbiAgICAgIF9zZXRMb2NhbExvY2soe1xuICAgICAgICBpZCAgICAgICAgOiBlbGUuYXR0cihcImlkXCIpLFxuICAgICAgICB2YWx1ZSAgICAgOiBlbGUudmFsKCksXG4gICAgICAgIHRpbWVzdGFtcCA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICB1c2VyICAgICAgOiB3aW5kb3cudXNlcmluZm8gPyB3aW5kb3cudXNlcmluZm8ubmFtZSA6IFwidW5rbm93blwiXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAkKCcjaW5wdXRzIGlucHV0Jykub24oJ2JsdXInLGZ1bmN0aW9uKGUpe1xuICAgICAgX3JlbW92ZUxvY2FsTG9jaygkKGUudGFyZ2V0KS5hdHRyKFwiaWRcIikpO1xuICAgIH0pO1xuICAgICQoJyNpbnB1dHMgaW5wdXQnKS5vbigna2V5dXAnLGZ1bmN0aW9uKGUpe1xuICAgICAgaWYoIGUud2hpY2ggPT0gMTMgKSByZXR1cm47XG4gICAgICB2YXIgZWxlID0gJChlLnRhcmdldCk7XG4gICAgICBfdXBkYXRlTG9jYWxMb2NrKGVsZS5hdHRyKFwiaWRcIiksIGVsZS52YWwoKSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBfc2V0TG9jYWxMb2NrKGxvY2spIHtcbiAgICAvLyBUT0RPOiB0aGlzIHNob3VsZCBtYXJrIHRoZSBjdXJyZW50IGxvY2tcbiAgICBpZiggbGl2ZUVkaXRzLmhhc1tsb2NrLmlkXSApIHJldHVybjtcbiAgICBsaXZlRWRpdHMuc2V0KGxvY2suaWQsIGxvY2spO1xuICB9XG5cbiAgZnVuY3Rpb24gX3VwZGF0ZUxvY2FsTG9jayhpZCwgdmFsKSB7XG4gICAgdmFyIGxvY2sgPSB7XG4gICAgICBpZCA6IGlkLFxuICAgICAgdmFsdWUgOiB2YWwsXG4gICAgICB0aW1lc3RhbXAgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgIHVzZXIgICAgICA6IHdpbmRvdy51c2VyaW5mbyA/IHdpbmRvdy51c2VyaW5mby5uYW1lIDogXCJ1bmtub3duXCJcbiAgICB9XG5cbiAgICBsaXZlRWRpdHMuc2V0KGlkLCBsb2NrKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9yZW1vdmVMb2NhbExvY2soaWQpIHtcbiAgICBsaXZlRWRpdHMuZGVsZXRlKGlkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9yZW1vdmVSZW1vdGVMb2NrKGxvY2spIHtcbiAgICAkKFwiI1wiK2xvY2suaWQpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgICAkKFwiI1wiK2xvY2suaWQrXCItZWRpdGluZ1wiKS5yZW1vdmUoKTtcbiAgICBkZWxldGUgcnRFZGl0c1tsb2NrLmlkXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF91cGRhdGVMb2NrKGxvY2spIHtcbiAgICAkKFwiI1wiK2xvY2suaWQpLnZhbChsb2NrLnZhbHVlKS5hdHRyKFwiZGlzYWJsZWRcIixcImRpc2FibGVkXCIpO1xuICAgIGlmKCAkKFwiI1wiK2xvY2suaWQrXCItZWRpdGluZ1wiKS5sZW5ndGggPT0gMCApIHtcbiAgICAgICQoXCIjXCIrbG9jay5pZCkucGFyZW50KCkuYWZ0ZXIoXCI8c3BhbiBpZD0nXCIrbG9jay5pZCtcIi1lZGl0aW5nJyBjbGFzcz0nbGFiZWwgbGFiZWwtd2FybmluZyc+PC9zcGFuPlwiKTtcbiAgICB9XG4gICAgJChcIiNcIitsb2NrLmlkK1wiLWVkaXRpbmdcIikuaHRtbChsb2NrLnVzZXIpO1xuICAgIHJ0RWRpdHNbbG9jay5pZF0gPSBsb2NrO1xuICB9XG5cbiAgLyoqKlxuICAgKiBVcGRhdGUgdGhlIGxpc3Qgb2YgcmVhbHRpbWUgZWRpdHMgYXMgd2VsbCBhcyB0aGUgaW5wdXQgVUkgYmFzZWQgb24gdGhlIHJ0RG9jIGV2ZW50XG4gICAqIFRPRE86IHRoaXMgaXMgYSBiaXQgbmFzdHkgcmlnaHQgbm93XG4gICAqKi9cbiAgZnVuY3Rpb24gX3VwZGF0ZVJ0RWRpdHMoZSkge1xuICAgIGlmKCBlLmlzTG9jYWwgKSByZXR1cm47XG5cbiAgICB2YXIga2V5cyA9IGxpdmVFZGl0cy5rZXlzKCk7XG5cbiAgICAvLyByZW1vdmUgb2xkIHRpbWVzdGFtcHMgVE9ET1xuICAgIC8qZm9yKCB2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggbm93IC0gdmFsdWVzW2ldLnRpbWVzdGFtcCA+IDEwMDAgKiA2MCApIHtcbiAgICAgICAgX3JlbW92ZUxvY2sodmFsdWVzW2ldKTsgLy8gZG9lcyB0aGlzIGZpcmUgdXBkYXRlcz9cbiAgICAgIH1cbiAgICB9Ki9cblxuXG4gICAgLy8gc2V0IG5ldyBlZGl0c1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIF91cGRhdGVMb2NrKGxpdmVFZGl0cy5nZXQoa2V5c1tpXSkpO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBvbGQgZWRpdHNcbiAgICBmb3IoIHZhciBrZXkgaW4gcnRFZGl0cyApIHtcbiAgICAgIGlmKCBrZXlzLmluZGV4T2Yoa2V5KSA9PSAtMSApIHtcbiAgICAgICAgX3JlbW92ZVJlbW90ZUxvY2socnRFZGl0c1trZXldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKioqXG4gICAqICBTZXR1cCB0aGUgcnQgaG9va3MgZm9yIHRoZSBjdXJyZW50IGZpbGUuICBUaGUgYXBpIG5lZWRzIHRvIGFscmVhZHkgYmUgbG9hZGVkXG4gICAqKiovXG4gIGZ1bmN0aW9uIF9sb2FkUnRGaWxlKCkge1xuICAgIC8vIGdldCB0aGUgcnQgZG9jXG4gICAgZ2FwaS5kcml2ZS5yZWFsdGltZS5sb2FkKGxvYWRlZEZpbGUsXG4gICAgICAvLyBydCBkb2MgbG9hZGVkXG4gICAgICBmdW5jdGlvbihmaWxlKXtcbiAgICAgICAgcnREb2MgPSBmaWxlO1xuXG4gICAgICAgIC8vIGdldCBvdXIgcnQgYXR0cmlidXRlLiAgVHJpZ2dlcmluZyBjaGFuZ2VzIG9uIHJ0SnNvbiB3aWxsIHB1c2ggZXZlbnRzXG4gICAgICAgIC8vIHRvIGFsbCBsaXN0ZW5pbmcgY2xpZW50c1xuICAgICAgICB2YXIganNvbiA9IGZpbGUuZ2V0TW9kZWwoKS5nZXRSb290KCkuZ2V0KFwianNvblwiKTtcbiAgICAgICAgbGl2ZUVkaXRzID0gZmlsZS5nZXRNb2RlbCgpLmdldFJvb3QoKS5nZXQoXCJsaXZlRWRpdHNcIik7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8ganNvbiBhdHRyLCB3ZSBuZWVkIHRvIGluaXRpYWxpemUgdGhlIG1vZGVsXG4gICAgICAgIGlmKCBqc29uID09IG51bGwgfHwgbGl2ZUVkaXRzID09IG51bGwpIHtcbiAgICAgICAgICAvLyBpbml0aWFsaXplIG91ciBydCBtb2RlbFxuICAgICAgICAgIF9vblJ0TW9kZWxMb2FkKGZpbGUuZ2V0TW9kZWwoKSk7XG4gICAgICAgICAgLy8gZ3JhYiBydCBqc29uIGF0dHIgbm93IHRoYXQgd2UgYXJlIGluaXRpYWxpemVkXG4gICAgICAgICAganNvbiA9IGZpbGUuZ2V0TW9kZWwoKS5nZXRSb290KCkuZ2V0KFwianNvblwiKTtcbiAgICAgICAgICBsaXZlRWRpdHMgPSBmaWxlLmdldE1vZGVsKCkuZ2V0Um9vdCgpLmdldChcImxpdmVFZGl0c1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGJhZG5lc3MgaGFwcGVuZWQgOihcbiAgICAgICAgaWYoICFqc29uICkgcmV0dXJuIGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIGNvbm5lY3QgdG8gcnQganNvblwiKTtcbiAgICAgICAgLy8gc2V0IHRoYXQgYXR0ciBnbG9iYWwgdG8gY2xhc3NcbiAgICAgICAgcnRKc29uID0ganNvbjtcblxuICAgICAgICAvLyBnZXQgY3VycmVudCBsaXN0IG9mIHVzZXJzXG4gICAgICAgIHZhciB1c2VycyA9IGZpbGUuZ2V0Q29sbGFib3JhdG9ycygpO1xuXG4gICAgICAgIC8vIFRPRE86IHRoaXMgbmVlZHMgd29ya3MgLi4uXG4gICAgICAgIC8vIHNlZSBpZiB0aGVyZSBhcmUgYWN0aXZlIGNoYW5nZXMgdG8gdGhlIG1vZGVsXG4gICAgICAgIC8qaWYoIHVzZXJzLmxlbmd0aCA+IDAgJiYgSlNPTi5zdHJpbmdpZnkobTNQR0lPLmV4cG9ydFNldHVwKCkpICE9IHJ0SnNvbi5nZXRUZXh0KCkgKSB7XG4gICAgICAgICAgLy8gbGV0IHRoaW5ncyBzZXR0bGVcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZiggY29uZmlybShcIlRoZXJlIGFyZSBhY3RpdmUgY2hhbmdlcyB0byB0aGlzIG1vZGVsLCB3b3VsZCB5b3UgbGlrZSB0byBsb2FkIHRoZW0/XCIpICkge1xuICAgICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocnRKc29uLmdldFRleHQoKSk7XG4gICAgICAgICAgICAgIG0zUEdJTy5sb2FkU2V0dXAobG9hZGVkRmlsZSwgZGF0YSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH0qL1xuXG4gICAgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIHdoZW4gcGVvcGxlIGNvbWUgYW5kIGdvXG4gICAgICAgIGZpbGUuYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5DT0xMQUJPUkFUT1JfSk9JTkVELCBmdW5jdGlvbihlKXtcbiAgICAgICAgICB1c2VycyA9IGZpbGUuZ2V0Q29sbGFib3JhdG9ycygpO1xuICAgICAgICAgIF91cGRhdGVBY3RpdmVVc2Vycyh1c2Vycyk7XG4gICAgICAgIH0pO1xuICAgICAgICBmaWxlLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuQ09MTEFCT1JBVE9SX0xFRlQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgIHVzZXJzID0gZmlsZS5nZXRDb2xsYWJvcmF0b3JzKCk7XG4gICAgICAgICAgX3VwZGF0ZUFjdGl2ZVVzZXJzKHVzZXJzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHJ0SnNvbiBvYmplY3RcbiAgICAgICAgLy8gd2hlbiB0aGlzIHVwZGF0ZXMsIHdlIHdhbnQgdG8gcmUtcnVuIHRoZSBtb2RlbFxuICAgICAgICBqc29uLmFkZEV2ZW50TGlzdGVuZXIoZ2FwaS5kcml2ZS5yZWFsdGltZS5FdmVudFR5cGUuVEVYVF9JTlNFUlRFRCwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgaWYoIGUuaXNMb2NhbCApIHJldHVybjtcbiAgICAgICAgICBfcmVydW5SdCh1c2VycywgZS51c2VySWQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGpzb24uYWRkRXZlbnRMaXN0ZW5lcihnYXBpLmRyaXZlLnJlYWx0aW1lLkV2ZW50VHlwZS5URVhUX0RFTEVURUQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYoIGUuaXNMb2NhbCApIHJldHVybjtcbiAgICAgICAgICAgIF9yZXJ1blJ0KHVzZXJzLCBlLnVzZXJJZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBsaXZlIGVkaXQgdXBkYXRlc1xuICAgICAgICAgICAgICAgIGxpdmVFZGl0cy5hZGRFdmVudExpc3RlbmVyKGdhcGkuZHJpdmUucmVhbHRpbWUuRXZlbnRUeXBlLlZBTFVFX0NIQU5HRUQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICAgX3VwZGF0ZVJ0RWRpdHMoZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBzaG93IHdobyBpcyBsaXN0ZW5pbmdcbiAgICAgICAgICBfdXBkYXRlQWN0aXZlVXNlcnModXNlcnMpO1xuXG4gICAgICAgICAgLy8gc2V0IGlucHV0IGhhbmRsZXJzIGZvciBydCBldmVudHNcbiAgICAgIH0sXG4gICAgICAvLyBtb2RlbCBsb2FkZWRcbiAgICAgIGZ1bmN0aW9uKG1vZGVsKXtcbiAgICAgICAgX29uUnRNb2RlbExvYWQobW9kZWwpO1xuICAgICAgfSxcbiAgICAgIC8vIGVycm9yc1xuICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUlQgRVJST1JTOiBcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG5cbiAgLyoqKlxuICAgKiBVcGRhdGUgdGhlIGRpc3BsYXkgb2YgYWN0aXZlIHVzZXJzIGZvciB0aGUgbW9kZWwuXG4gICAqKiovXG4gIGZ1bmN0aW9uIF91cGRhdGVBY3RpdmVVc2Vycyh1c2Vycykge1xuICAgIC8vIGlmIGl0J3MganVzdCB1cywgZG9uJ3Qgc2hvdyBhbnl0aGluZ1xuICAgIGlmKCAhdXNlcnMgKSByZXR1cm4gJChcIiNhY3RpdmUtdXNlcnNcIikuaHRtbChcIlwiKTtcbiAgICBpZiggdXNlcnMubGVuZ3RoIDw9IDEgKSByZXR1cm4gJChcIiNhY3RpdmUtdXNlcnNcIikuaHRtbChcIlwiKTtcblxuICAgIC8vIHdlIG9ubHkgd2FudCB1bmlxdWUgdXNlcnNcbiAgICB2YXIgdW5pcXVlID0gW107XG4gICAgdmFyIHV1c2VycyA9IFtdO1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdXNlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggdW5pcXVlLmluZGV4T2YodXNlcnNbaV0udXNlcklkKSA9PSAtMSApIHtcbiAgICAgICAgdW5pcXVlLnB1c2godXNlcnNbaV0udXNlcklkKTtcbiAgICAgICAgdXVzZXJzLnB1c2godXNlcnNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiggdXVzZXJzLmxlbmd0aCA8PSAxICkgcmV0dXJuICQoXCIjYWN0aXZlLXVzZXJzXCIpLmh0bWwoXCJcIik7XG5cbiAgICAvLyBhZGQgcGljIG9mIHVzZXIgdG8gZGlzcGxheSBwYW5lbFxuICAgIHZhciBodG1sID0gXCJBY3RpdmUgVXNlcnMgXCI7XG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB1dXNlcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggdXVzZXJzW2ldLnBob3RvVXJsICkge1xuICAgICAgICBodG1sICs9IFwiPGltZyBzcmM9J1wiK3V1c2Vyc1tpXS5waG90b1VybCtcIicgdGl0bGU9J1wiK3V1c2Vyc1tpXS5kaXNwbGF5TmFtZStcIicgc3R5bGU9J21hcmdpbjowIDVweDt3aWR0aDozMnB4O2hlaWdodDozMnB4JyBjbGFzcz0naW1nLXJvdW5kZWQnIC8+IFwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaHRtbCArPSBcIjxzcGFuIHN0eWxlPSd3aWR0aDozMnB4O2hlaWdodDozMnB4O21hcmdpbjowIDVweDtiYWNrZ3JvdW5kLWNvbG9yOlwiK3V1c2Vyc1tpXS5jb2xvcitcIicgdGl0bGU9J1wiK3V1c2Vyc1tpXS5kaXNwbGF5TmFtZStcIicgPjwvc3Bhbj4gXCI7XG4gICAgICB9XG4gICAgfVxuICAgICQoXCIjYWN0aXZlLXVzZXJzXCIpLmh0bWwoaHRtbCk7XG4gIH1cblxuICAvKioqXG4gICAgICogIFJlLXJ1biB0aGUgbW9kZWwuICBFdmVudHMgY2FuIGNvbWUgaW4gcXVpY2tseSBpbiBtYW55IHBhcnRzLiAgQnVmZmVyIHRoZSBldmVudHMgc28gd2UgZG9uJ3QgcmUtcnVuIHRoZSBtb2RlbCB0b28gbWFueSB0aW1lcy5cbiAgICAgKioqL1xuICBmdW5jdGlvbiBfcmVydW5SdCh1c2VycywgdXNlcklkKSB7XG4gICAgLy8gdGhpcyBpcyBiYWRuZXNzXG4gICAgaWYoICFydEpzb24gKSByZXR1cm47XG5cbiAgICAvLyBjbGVhciBhbnkgcXVldWVkIHJ1blxuICAgIGlmKCBfcnRUaW1lciAhPSAtMSApIGNsZWFyVGltZW91dChfcnRUaW1lcik7XG5cbiAgICAvLyBxdWV1ZSB1cCBhIHJ1biBhbmQgd2FpdCB0byBtYWtlIHN1cmUgdGhlcmUgYXJlIG5vIHVwZGF0ZXNcbiAgICBfcnRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIF9ydFRpbWVyID0gLTE7XG5cbiAgICAgIC8vIGZpbmQgdGhlIHVzZXIgd2hvIGlzIHJ1bm5pbmcgdGhlIG1vZGVsIGFuZCBkaXBsYXkgcG9wdXAgb2YgdGhhdCB1c2VycyBpbmZvcm1hdGlvblxuICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB1c2Vycy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgaWYoIHVzZXJzW2ldLnVzZXJJZCA9PSB1c2VySWQgKSB7XG4gICAgICAgICAgdmFyIHBhbmVsID0gJChcIjxkaXYgY2xhc3M9J2luaXQtbG9hZGluZy1vdXRlcicgPjxkaXYgY2xhc3M9J2luaXQtbG9hZGluZycgc3R5bGU9J3dpZHRoOjQwMHB4Jz4gXCIrXG4gICAgICAgICAgICAgICAgICAodXNlcnNbaV0ucGhvdG9VcmwgPyBcIjxpbWcgc3JjPSdcIit1c2Vyc1tpXS5waG90b1VybCtcIicgLz4gXCIgOiBcIlwiKSt1c2Vyc1tpXS5kaXNwbGF5TmFtZStcIiBpcyB1cGRhdGluZyB0aGUgbW9kZWwuLi48L2Rpdj48L2Rpdj5cIik7XG4gICAgICAgICAgICAgICQoXCJib2R5XCIpLmFwcGVuZChwYW5lbCk7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgIHBhbmVsLmNzcyhcIm9wYWNpdHlcIixcIi45XCIpO1xuICAgICAgICAgICAgICB9LDUwKTtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgcGFuZWwucmVtb3ZlKCk7XG4gICAgICAgICAgICAgIH0sIDM1MDApO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBwYXJzZSB0aGUgbmV3IG1vZGVsIGRhdGEgYW5kIGxvYWQgaXQgYXMgb3VyIGN1cnJlbnQgc2V0dXBcbiAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShydEpzb24uZ2V0VGV4dCgpKTtcbiAgICAgIG0zUEdJTy5sb2FkU2V0dXAobG9hZGVkRmlsZSwgZGF0YSwgdHJ1ZSk7XG4gICAgfSwgMzAwKTtcbiAgfVxuXG4gIC8qKipcbiAgICogaW5pdGlhbGl6ZSBhIG5ldyBydCBtb2RlbFxuICAgKioqL1xuICBmdW5jdGlvbiBfb25SdE1vZGVsTG9hZChtb2RlbCkge1xuICAgIC8vIGN1cnJlbnRseSB3ZSBqdXN0IHdhbnQgdG8gdXNlIHRoaXMgc2luZ2xlIGF0dHJpYnV0ZSB0byBicm9hZGNhc3QgZXZlbnRzXG4gICAgdmFyIGpzb24gPSBtb2RlbC5nZXRSb290KCkuZ2V0KFwianNvblwiKTtcbiAgICBpZigganNvbiA9PSBudWxsICkge1xuICAgICAgdmFyIHN0cmluZyA9IG1vZGVsLmNyZWF0ZVN0cmluZyhcInt9XCIpO1xuICAgICAgbW9kZWwuZ2V0Um9vdCgpLnNldChcImpzb25cIiwgc3RyaW5nKTtcbiAgICB9XG5cbiAgICB2YXIgbGl2ZUVkaXRzID0gbW9kZWwuZ2V0Um9vdCgpLmdldChcImxpdmVFZGl0c1wiKTtcbiAgICBpZiggbGl2ZUVkaXRzID09IG51bGwgKSB7XG4gICAgICB2YXIgZmllbGQgPSBtb2RlbC5jcmVhdGVNYXAoKTtcbiAgICAgIG1vZGVsLmdldFJvb3QoKS5zZXQoXCJsaXZlRWRpdHNcIiwgZmllbGQpO1xuICAgIH1cblxuICB9XG5cbiAgLyoqKlxuICAgKiBsZXQgdGhlIHdvcmxkIGtub3cgd2hhdCB3ZSBhcmUgZG9pbmcgOilcbiAgICogVGhpcyBzaG91bGQgYmUgY2FsbGVkIHdoZW4gYSBsb2NhbCB1c2VyIHJ1bnMgdGhlIG1vZGVsLiAgSXQgdXBkYXRlcyB0aGUgJ2pzb24nXG4gICAqIGF0dHJpYnV0ZSB3aGljaCBpcyB0aGVuIGJyb2FkY2FzdCB0byBhbGwgbGlzdGVuaW5nIHBhcnRpZXNcbiAgICoqKi9cbiAgZnVuY3Rpb24gcnVuTW9kZWxSdCgpIHtcbiAgICBpZiggcnRKc29uICkgcnRKc29uLnNldFRleHQoSlNPTi5zdHJpbmdpZnkoIG0zUEdJTy5leHBvcnRTZXR1cCgpICkpO1xuICB9XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBydW5Nb2RlbFJ0IDogcnVuTW9kZWxSdCxcbiAgaW5pdFJ0QXBpICA6IGluaXRSdEFwaVxufTtcbiIsInZhciBvZmZsaW5lID0gcmVxdWlyZSgnLi9vZmZsaW5lJyk7XG52YXIgZ2RyaXZlID0gcmVxdWlyZSgnLi9nZHJpdmUnKTtcbnZhciBjaGFydHMgPSByZXF1aXJlKCcuL2NoYXJ0cycpO1xudmFyIHdlYXRoZXJGaWxlUmVhZGVyID0gcmVxdWlyZSgnLi93ZWF0aGVyRmlsZVJlYWRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFwcCkge1xuXG52YXIgd2VhdGhlckF2ZXJhZ2VDaGFydCA9IG51bGw7XG52YXIgd2VhdGhlckF2ZXJhZ2VDaGFydERhdGEgPSB7fTtcblxudmFyIFNFVFVQX1RFTVBMQVRFID1cbiAgJzxkaXY+JytcbiAgJzxoND5DaGFydCBPcHRpb25zPC9oND4nK1xuICAnPGRpdj4nK1xuICAgICAgJzx0YWJsZSBjbGFzcz1cInRhYmxlXCI+JytcbiAgICAgICAgICAnPHRyPicrXG4gICAgICAgICAgICAgICc8dGQgc3R5bGU9XCJ3aWR0aDo1MCVcIj5PdXRwdXQgdmFyaWFibGUocykgdG8gY2hhcnQgPC90ZD4nK1xuICAgICAgICAgICAgICAnPHRkPiA8YSBpZD1cInNlbGVjdC1jaGFydHMtYnRuXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5TZWxlY3QgQ2hhcnRzPC9hPjwvdGQ+JytcbiAgICAgICAgICAnPC90cj4nK1xuICAgICAgICAgICc8dHI+JytcbiAgICAgICAgICAgICAgJzx0ZCBzdHlsZT1cIndpZHRoOjUwJVwiPlZhcmlhdGlvbiBhbmFseXNpcyBwYXJhbWV0ZXIocykgPC90ZD4nK1xuICAgICAgICAgICAgICAnPHRkPjxkaXYgaWQ9XCJ2YXJpYXRpb25BbmFseXNpc1N0YXR1c1wiPk5vbmU8L2Rpdj48L3RkPicrXG4gICAgICAgICAgJzwvdHI+JytcbiAgICAgICc8L3RhYmxlPicrXG4gICc8L2Rpdj4nK1xuICAnPGg0PkxvY2F0aW9uPC9oND4nK1xuICAgJzxkaXYgc3R5bGU9XCJib3JkZXItdG9wOjFweCBzb2xpZCAjZGRkO3BhZGRpbmc6OHB4O2hlaWdodDo2MHB4XCI+JytcbiAgICAgJzxzcGFuIGlkPVwiY3VycmVudC1sb2NhdGlvblwiIHN0eWxlPVwiY29sb3I6Izg4OFwiPjwvc3Bhbj4nK1xuICAgICAnPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcHVsbC1yaWdodCBzZWxlY3Qtd2VhdGhlci1sb2NhdGlvblwiPjxpIGNsYXNzPVwiaWNvbi1tYXAtbWFya2VyXCI+PC9pPiBTZWxlY3QgTG9jYXRpb248L2E+JytcbiAgICAgJzwvZGl2PicrXG4gICAgICc8ZGl2Pic7XG5cbnZhciBHT09MRURSSVZFX1RSRUVfVEVNUExBVEUgPVxuICAnPGRpdiBzdHlsZT1cInBhZGRpbmc6MTVweCAwIDVweCAwO21hcmdpbi1ib3R0b206NXB4O2hlaWdodDogNTBweFwiPicrXG4gICAgJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXAgcHVsbC1yaWdodFwiIGlkPVwidHJlZS1zdWItbWVudVwiPicrXG4gICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgZHJvcGRvd24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiPicrXG4gICAgICAgICc8c3BhbiBpZD1cImxvYWRlZC10cmVlLW5hbWVcIj5EZWZhdWx0IFRyZWU8L3NwYW4+IDxzcGFuIGNsYXNzPVwiY2FyZXRcIj48L3NwYW4+JytcbiAgICAgICc8L2J1dHRvbj4nK1xuICAgICAgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiByb2xlPVwibWVudVwiPicrXG4gICAgICAgICc8bGk+PGEgaWQ9XCJnZHJpdmUtdHJlZXBhbmVsLWxvYWRcIj48aSBjbGFzcz1cImljb24tY2xvdWQtZG93bmxvYWRcIj48L2k+IExvYWQgVHJlZTwvYT48L2xpPicrXG4gICAgICAgICc8bGk+PGEgaWQ9XCJnZHJpdmUtdHJlZXBhbmVsLXNhdmVcIj48aSBjbGFzcz1cImljb24tY2xvdWQtdXBsb2FkXCI+PC9pPiBTYXZlIFRyZWU8L2E+PC9saT4nK1xuICAgICAgICAnPGxpIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PGEgaWQ9XCJzaGFyZS10cmVlLWJ0blwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7bWFyZ2luLWxlZnQ6MTBweFwiPjxpIGNsYXNzPVwiaWNvbi1zaGFyZVwiPjwvaT4gU2hhcmUgVHJlZTwvYT48L2xpPicrXG4gICAgICAnPC91bD4nK1xuICAnPC9kaXY+JytcbiAgJzxkaXYgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjb21wYXJlLXRyZWVzXCIgLz4gQ29tcGFyZSBUcmVlczwvZGl2PicrXG4nPC9kaXY+JztcblxudmFyIElOUFVUX1RFTVBMQVRFID1cbiAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JytcbiAgICAnPGxhYmVsIGZvcj1cInt7aWR9fVwiIGNsYXNzPVwiY29sLWxnLTQgY29udHJvbC1sYWJlbFwiPnt7bGFiZWx9fTwvbGFiZWw+JytcbiAgICAnPGRpdiBjbGFzcz1cImNvbC1sZy04XCI+JytcbiAgICAgICc8aW5wdXQgdHlwZT1cInt7dHlwZX19XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cInt7aWR9fVwiIHN0eWxlPVwid2lkdGg6MjAwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2tcIiB2YWx1ZT1cInt7dmFsdWV9fVwiPiZuYnNwOyZuYnNwO3t7dW5pdHN9fScrXG4gICAgICAnPHAgY2xhc3M9XCJoZWxwLWJsb2NrXCI+e3tkZXNjcmlwdGlvbn19PC9wPicgK1xuICAgICc8L2Rpdj4nK1xuICAnPC9kaXY+JztcblxudmFyIEFSUkFZX0lOUFVUX1RFTVBMQVRFID1cbiAgJzxkaXYgY2xhc3M9XCJjb2wtbGctNlwiPjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JytcbiAgICAnPGxhYmVsIGZvcj1cInt7aWR9fVwiIGNsYXNzPVwiY29sLWxnLTQgY29udHJvbC1sYWJlbFwiPnt7bGFiZWx9fTwvbGFiZWw+JytcbiAgICAnPGRpdiBjbGFzcz1cImNvbC1sZy04XCI+JytcbiAgICAgICd7e2lucHV0c319JytcbiAgICAgICc8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj57e2Rlc2NyaXB0aW9ufX08L3A+JyArXG4gICAgJzwvZGl2PicrXG4gICc8L2Rpdj48L2Rpdj4nO1xuXG52YXIgdGFiSGVhZGVyID0gJzx1bCBjbGFzcz1cIm5hdiBuYXYtcGlsbHNcIiBpZD1cImlucHV0X3BpbGxzXCI+JztcbnZhciBjb250ZW50ID0gJzxkaXYgY2xhc3M9XCJwaWxsLWNvbnRlbnRcIj4nO1xuXG52YXIgdHJlZUhlYWRlciA9ICc8ZGl2IGNsYXNzPVwicGFuZWwtZ3JvdXBcIiBpZD1cInRyZWUtYWNjb3JkaW9uXCI+JztcbnZhciBUUkVFX1BBTkVMX1RFTVBMQVRFID0gJzxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+JytcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+JytcbiAgICAgICAgICAgICc8aDQgY2xhc3M9XCJwYW5lbC10aXRsZVwiPicrXG4gICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiYWNjb3JkaW9uLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXBhcmVudD1cIiN0cmVlLWFjY29yZGlvblwiIGhyZWY9XCIjY29sbGFwc2V7e2lkfX1cIj4nK1xuICAgICAgICAgICAgICAgICAgICAne3t0aXRsZX19JytcbiAgICAgICAgICAgICAgICAnPC9hPicrXG4gICAgICAgICAgICAnPC9oND4nK1xuICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzxkaXYgaWQ9XCJjb2xsYXBzZXt7aWR9fVwiIGNsYXNzPVwicGFuZWwtY29sbGFwc2UgY29sbGFwc2VcIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+e3tib2R5fX08L2Rpdj4nK1xuICAgICAgICAnPC9kaXY+JytcbiAgICAgJzwvZGl2Pic7XG5cbnZhciBpbnB1dHMgPSB7fTtcblxuLy8gZm9yIHdlYXRoZXIgZGF0YVxudmFyIGNvbHMgPSBbXTtcblxudmFyIG1hcCA9IG51bGw7XG5cbi8qKlxuICogT3B0aW9ucyA6XG4gKiAgIG1vZGVsIC0gdHlwZSBvZiBtb2RlbCB0byBhcHBlbmQgdG9cbiAqICAgbGFiZWwgLSBhdHRyaWJ1dGUgbGFiZWxcbiAqICAgdmFsdWUgLSBkZWZhdWx0IHZhbHVlXG4gKiAgIGRlc2NyaXB0aW9uIC0gZGVzY3JpcHRpb24gb2YgYXR0cmlidXRlXG4gKiAgIHVuaXRzIC0gYXR0cmlidXRlIHVuaXRzXG4gKi9cbmZ1bmN0aW9uIF9hZGRJbnB1dChvcHRpb25zKSB7XG4gIGlmKCAhaW5wdXRzW29wdGlvbnMubW9kZWxdICkgaW5wdXRzW29wdGlvbnMubW9kZWxdID0gW107XG4gIGlucHV0c1tvcHRpb25zLm1vZGVsXS5wdXNoKG9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlV2VhdGhlcklucHV0cygpIHtcbiAgZm9yKCB2YXIgYXR0ciBpbiBhcHAuZ2V0TW9kZWwoKS53ZWF0aGVyICkge1xuICAgIGlmKCBhdHRyICE9IFwibnJlbFwiICkgY29scy5wdXNoKGF0dHIpO1xuICB9XG5cbiAgdmFyIHRhYmxlID0gJzxkaXYgc3R5bGU9XCJwYWRkaW5nLXRvcDoyNXB4XCI+PGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgcHVsbC1yaWdodFwiIGlkPVwibG9hZC13ZWF0aGVyLWJ0blwiPjxpIGNsYXNzPVwiaWNvbi11cGxvYWQtYWx0XCI+PC9pPiBVcGxvYWQ8L2E+JytcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiBpZD1cIndlYXRoZXItaW5wdXQtdG9nZ2xlXCI+JytcbiAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYWN0aXZlXCI+QXZlcmFnZXM8L2J1dHRvbj4nK1xuICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiPkFjdHVhbDwvYnV0dG9uPicrXG4gICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzxkaXYgaWQ9XCJjdXN0b20td2VhdGhlci1wYW5lbFwiIHN0eWxlPVwiZGlzcGxheTpub25lO21hcmdpbi10b3A6MjBweFwiPjwvZGl2PicrXG4gICAgICAgICc8ZGl2IGlkPVwiYXZlcmFnZS13ZWF0aGVyLXBhbmVsXCI+JytcbiAgICAgICAgJzxkaXYgc3R5bGU9XCJwYWRkaW5nOjEwcHg7Y29sb3I6Izg4OFwiPlNlbGVjdCBsb2NhdGlvbiB0byBzZXQgdGhlIGF2ZXJhZ2Ugd2VhdGhlciBkYXRhPC9kaXY+JytcbiAgICAgICAgJzx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtY29uZGVuc2VkIHdlYXRoZXItdGFibGVcIiBzdHlsZT1cIm1hcmdpbi10b3A6MjBweFwiPic7XG5cbiAgdGFibGUgKz0gXCI8dHI+XCI7XG4gIGZvciggdmFyIGkgPSAwOyBpIDwgY29scy5sZW5ndGg7IGkrKyApIHtcbiAgICB0YWJsZSArPSBcIjx0ZD5cIitjb2xzW2ldK1wiPC90ZD5cIjtcbiAgfVxuICB0YWJsZSArPSBcIjwvdHI+XCI7XG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCAxMjsgaSsrICkge1xuICAgIHRhYmxlICs9IFwiPHRyPlwiO1xuICAgIGZvciggdmFyIGogPSAwOyBqIDwgY29scy5sZW5ndGg7IGorKyApIHtcbiAgICAgIGlmKCBqID09IDAgKSB7XG4gICAgICAgIHRhYmxlICs9IFwiPHRkPlwiKyhpKzEpK1wiPC90ZD5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhYmxlICs9IFwiPHRkPjxpbnB1dCBjbGFzcz0nZm9ybS1jb250cm9sJyBpZD0naW5wdXQtd2VhdGhlci1cIitjb2xzW2pdK1wiLVwiK2krXCInIHR5cGU9J3RleHQnIC8+PC90ZD5cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGFibGUgKz0gXCI8L3RyPlwiO1xuICB9XG4gIHJldHVybiB0YWJsZSsnPC90YWJsZT48ZGl2IGlkPVwiYXZlcmFnZS13ZWF0aGVyLWNoYXJ0XCI+PC9kaXY+PC9kaXY+JztcblxufVxuXG5mdW5jdGlvbiBfc2V0V2VhdGhlckRhdGEoKSB7XG4gIHZhciBsbCA9IGFwcC5xcyhcImxsXCIpO1xuICBpZiggbGwgKSB7XG4gICAgbGwgPSBsbC5zcGxpdChcIixcIik7XG4gICAgX3F1ZXJ5V2VhdGhlckRhdGEobGxbMF0sIGxsWzFdLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYXBwLnJ1bk1vZGVsKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgJChcIiNjdXJyZW50LWxvY2F0aW9uXCIpLmh0bWwoXCJOb3QgU2V0XCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9xdWVyeVdlYXRoZXJEYXRhKGxuZywgbGF0LCBjYWxsYmFjaykge1xuICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICd3ZWF0aGVyLWRhdGEtcXVlcnknLCAxKTtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vYWxkZXIuYmlvZW5lcmd5LmNhc2lsLnVjZGF2aXMuZWR1OjgwODAvdml6c291cmNlL3Jlc3Q/dmlldz1wb2ludFRvV2VhdGhlcihcIitsbmcrXCIsXCIrbGF0K1wiLDgxOTIpXCJcbiAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgdmFyIHJlc3BzID0gMDtcblxuICBmdW5jdGlvbiBjaGVja0RvbmUoKSB7XG4gICAgICByZXNwcysrO1xuICAgICAgaWYoIHJlc3BzID09IDIgJiYgY2FsbGJhY2sgKSBjYWxsYmFjaygpO1xuICB9XG5cbiAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICB2YXIgdGFibGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmdldERhdGFUYWJsZSgpLnRvSlNPTigpKTtcblxuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgdGFibGUucm93cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBtID0gaSsnJztcbiAgICAgIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhW21dID0ge307XG4gICAgICBmb3IoIHZhciBqID0gMTsgaiA8IHRhYmxlLmNvbHMubGVuZ3RoOyBqKysgKSB7XG4gICAgICAgICQoXCIjaW5wdXQtd2VhdGhlci1cIitjb2xzW2pdK1wiLVwiK2kpLnZhbCh0YWJsZS5yb3dzW2ldLmNbal0gPyB0YWJsZS5yb3dzW2ldLmNbal0udiA6IFwiXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUF2ZXJhZ2VDaGFydCgpO1xuICAgIGNoZWNrRG9uZSgpO1xuICB9KTtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vYWxkZXIuYmlvZW5lcmd5LmNhc2lsLnVjZGF2aXMuZWR1OjgwODAvdml6c291cmNlL3Jlc3Q/dmlldz1wb2ludFRvU09JTChcIitsbmcrXCIsXCIrbGF0K1wiLDgxOTIpXCJcbiAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICB2YXIgZXJyb3IgPSBmYWxzZTtcbiAgICB2YXIgdGFibGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmdldERhdGFUYWJsZSgpLnRvSlNPTigpKTtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRhYmxlLmNvbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggdGFibGUucm93c1swXSA9PSBudWxsICkge1xuICAgICAgICBlcnJvciA9IHRydWU7XG4gICAgICAgIGFsZXJ0KFwiSW52YWxpZCBsb2NhdGlvbiBzZWxlY3RlZFwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICAkKFwiI2lucHV0LXNvaWwtXCIrdGFibGUuY29sc1tpXS5pZCkudmFsKHRhYmxlLnJvd3NbMF0uY1tpXS52KTtcbiAgICB9XG5cbiAgICBpZiggIWVycm9yICkgY2hlY2tEb25lKCk7XG4gIH0pO1xuXG4gICQoXCIjY3VycmVudC1sb2NhdGlvblwiKS5odG1sKGxuZytcIiwgXCIrbGF0K1wiIDxhIGhyZWY9J1wiK3dpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoLyMuKi8sJycpK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI/bGw9XCIrbG5nK1wiLFwiK2xhdCtcIicgdGFyZ2V0PSdfYmxhbmsnPjxpIGNsYXNzPSdpY29uLWxpbmsnPjwvaT48L2E+XCIpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBdmVyYWdlQ2hhcnQoKSB7XG4gIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhID0ge307XG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCAxMjsgaSsrICkge1xuICAgIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhW2krJyddID0ge307XG4gICAgZm9yKCB2YXIgaiA9IDE7IGogPCBjb2xzLmxlbmd0aDsgaisrICkge1xuICAgICAgdmFyIHZhbCA9ICQoXCIjaW5wdXQtd2VhdGhlci1cIitjb2xzW2pdK1wiLVwiK2kpLnZhbCgpO1xuICAgICAgaWYoIHZhbCAmJiB2YWwubGVuZ3RoID4gMCApIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhW2krJyddW2NvbHNbal1dID0gcGFyc2VJbnQodmFsKTtcbiAgICAgIGVsc2Ugd2VhdGhlckF2ZXJhZ2VDaGFydERhdGFbaSsnJ11bY29sc1tqXV0gPSAwO1xuICAgIH1cbiAgfVxuICB3ZWF0aGVyQXZlcmFnZUNoYXJ0ID0gY2hhcnRzLmNyZWF0ZVdlYXRoZXJDaGFydCgkKCcjYXZlcmFnZS13ZWF0aGVyLWNoYXJ0JylbMF0sIHdlYXRoZXJBdmVyYWdlQ2hhcnREYXRhKTtcbn1cblxuZnVuY3Rpb24gX3NlbGVjdFdlYXRoZXJMb2NhdGlvbigpIHtcbiAgaWYoICFtYXAgKSB7XG4gICAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCh7fSk7XG5cbiAgICAkKFwiI2xvY2F0ZS1idXR0b25cIikub24oJ2NsaWNrJywgX2dldExvY2F0aW9uKTtcblxuXG4gICAgLy8gd2FpdCBmb3IgdGhlIG1vZGFsIHRvIGluaXRcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBpZiggb2ZmbGluZU1vZGUgKSByZXR1cm47XG5cbiAgICAgIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoJChcIiNnbWFwXCIpWzBdLCB7XG4gICAgICAgIGNlbnRlciA6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoMzUsIC0xMjEpLFxuICAgICAgICB6b29tOiA1LFxuICAgICAgICBtYXBUeXBlSWQgOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUFxuICAgICAgfSk7XG5cbiAgICAgIHZhciBkZWZhdWx0U3R5bGUgPSB7XG4gICAgICAgICAgICBwb2x5Z29uT3B0aW9uczoge1xuICAgICAgICAgICAgICBzdHJva2VDb2xvciAgIDogXCIjMDAwMEZGXCIsXG4gICAgICAgICAgICAgIHN0cm9rZU9wYWNpdHkgOiAwLjUsXG4gICAgICAgICAgICAgIGZpbGxDb2xvciAgICAgOiAnI0ZFRkVGRScsXG4gICAgICAgICAgICAgIGZpbGxPcGFjaXR5ICAgOiAwLjJcbiAgICAgICAgICAgIH0sXG4gICAgICB9O1xuXG5cbiAgICAgIHZhciBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgc2VsZWN0OiAnYm91bmRhcnknLFxuICAgICAgICAgICAgZnJvbTogJzFoVjl2UUczU2MwSkxQZHVGcFdKenRmTEstZXg2Y2N5TWdfcHRFX3MnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdHlsZXM6IFtkZWZhdWx0U3R5bGVdLFxuICAgICAgICAgIHN1cHByZXNzSW5mb1dpbmRvd3MgOiB0cnVlXG4gICAgICB9O1xuXG4gICAgICB2YXIgZnVzaW9uTGF5ZXIgPSBuZXcgZ29vZ2xlLm1hcHMuRnVzaW9uVGFibGVzTGF5ZXIoZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgZnVzaW9uTGF5ZXIub3BhY2l0eSA9IC44O1xuICAgICAgZnVzaW9uTGF5ZXIuc2V0TWFwKG1hcCk7XG5cbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcCwgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiggJCgnI2xvY2F0ZS1jYWNoZS1tb2RlJykuaXMoJzpjaGVja2VkJykgKSB7XG4gICAgICAgICAgYWxlcnQoJ1lvdSBtdXN0IGNsaWNrIG9uIGEgZ2VvbWV0cnkgdG8gY2FjaGUnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfcXVlcnlXZWF0aGVyRGF0YShlLmxhdExuZy5sbmcoKSwgZS5sYXRMbmcubGF0KCksIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgYXBwLnJ1bk1vZGVsKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG4gICAgICB9KTtcbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKGZ1c2lvbkxheWVyLCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmKCAkKCcjbG9jYXRlLWNhY2hlLW1vZGUnKS5pcygnOmNoZWNrZWQnKSApIHtcbiAgICAgICAgICBvZmZsaW5lLmNhY2hlVGlsZShlLCBmdXNpb25MYXllciwgZGVmYXVsdE9wdGlvbnMsIGRlZmF1bHRTdHlsZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgX3F1ZXJ5V2VhdGhlckRhdGEoZS5sYXRMbmcubG5nKCksIGUubGF0TG5nLmxhdCgpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGFwcC5ydW5Nb2RlbCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgJChcIiNzZWxlY3Qtd2VhdGhlci1tb2RhbFwiKS5tb2RhbCgnaGlkZScpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHNldHVwIGlucHV0IGZvciBjbGVhcmluZyBjYWNoZVxuICAgICAgICAgICQoJyNjbGVhci1jYWNoZWQtdGlsZXMnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICBvZmZsaW5lLmNsZWFyQ2FjaGUoKTtcbiAgICAgICAgICAgICAgb2ZmbGluZS5yZW5kZXJDYWNoZWRUaWxlc09uTWFwKGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgb2ZmbGluZS5yZW5kZXJDYWNoZWRUaWxlc09uTWFwKGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKTtcblxuICAgIH0sNTAwKTtcbiAgfSBlbHNlIHtcbiAgICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKCdzaG93Jyk7XG5cbiAgICAvLyB3ZSBzZWVtIHRvIGJlIGhhbmdpbmcgc29tZXRpbWVzLi4uLlxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFwLCBcInJlc2l6ZVwiKTtcbiAgICB9LCA1MDApO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9nZXRMb2NhdGlvbigpIHtcbiAgaWYgKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oc2hvd1Bvc2l0aW9uKTtcbiAgICAkKFwiI2xvY2F0ZS1idXR0b25cIikuYWRkQ2xhc3MoXCJidG4td2FybmluZ1wiKTtcbiAgfSBlbHNle1xuICAgIHdpbmRvdy5hbGVydChcIkdlb2xvY2F0aW9uIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBicm93c2VyLlwiKTtcbiAgfVxuICBmdW5jdGlvbiBzaG93UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAkKFwiI2xvY2F0ZS1idXR0b25cIikucmVtb3ZlQ2xhc3MoXCJidG4td2FyblwiKS5hZGRDbGFzcyhcImJ0bi1zdWNjZXNzXCIpO1xuICAgIG1hcC5zZXRab29tKDEwKTtcbiAgICBtYXAuc2V0Q2VudGVyKG5ldyBnb29nbGUubWFwcy5MYXRMbmcocG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLCBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKSk7XG4gICAgLy9fcXVlcnlXZWF0aGVyRGF0YShwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9nZW5lcmF0ZUlucHV0cyhpLCB0eXBlLCBwcmVmaXgsIG5hbWUsIGF0dHJzKSB7XG4gIHZhciBpZCA9IHByZWZpeC5sZW5ndGggPiAwID8gcHJlZml4KyctJytuYW1lIDogJ2lucHV0LScrbmFtZTtcbiAgdmFyIGlucHV0ID0gJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJtYXJnaW4tbGVmdDonKyhpKjIwKSsncHg7bWFyZ2luLXRvcDowcHg7bWFyZ2luLXJpZ2h0OjVweFwiPic7XG5cbiAgdmFyIHRyZWVib2R5ID0gXCJcIjtcblxuICBpZiggIShpID09IDEpICkge1xuICAgICAgaWYoIGkgIT0gMCApIGlucHV0ICs9ICc8bGFiZWwgZm9yPVwiJytpZCsnXCIgY2xhc3M9XCJjb250cm9sLWxhYmVsXCI+JytuYW1lICsnPC9sYWJlbD4nO1xuICAgICAgaW5wdXQgKz0gJzxkaXY+JztcbiAgfVxuXG5cbiAgICAgIGlmICggdHlwZW9mIGF0dHJzLnZhbHVlID09ICdvYmplY3QnICYmIGkgPT0gMSAgKSB7IC8vICYmIHR5cGUgPT0gJ3RyZWUnICkge1xuICAgICAgZm9yKCB2YXIga2V5IGluIGF0dHJzLnZhbHVlICkge1xuICAgICAgICAgICAgICB0cmVlYm9keSArPSBfZ2VuZXJhdGVJbnB1dHMoaSsxLCB0eXBlLCBpZCwga2V5LCBhdHRycy52YWx1ZVtrZXldKTtcbiAgICAgICAgICB9XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnb2JqZWN0JyApIHtcbiAgICAgIGlmKCBhdHRycy5kZXNjcmlwdGlvbiApIGlucHV0ICs9ICc8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj4nK2F0dHJzLmRlc2NyaXB0aW9uKyc8L3A+JztcbiAgICAgICAgICBmb3IoIHZhciBrZXkgaW4gYXR0cnMudmFsdWUgKSB7XG4gICAgICAgICAgICAgIGlucHV0ICs9IF9nZW5lcmF0ZUlucHV0cyhpKzEsIHR5cGUsIGlkLCBrZXksIGF0dHJzLnZhbHVlW2tleV0pO1xuICAgICAgICAgIH1cbiAgfSBlbHNlIGlmICggKHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnbnVtYmVyJyB8fCB0eXBlb2YgYXR0cnMudmFsdWUgPT0gJ3N0cmluZycpICYmIGkgPT0gMSApIHsgLy8gJiYgdHlwZSA9PSAndHJlZScgKSB7XG5cbiAgICAgIHRyZWVib2R5ICs9XG4gICAgICAgICAgJzxkaXY+PGlucHV0IHR5cGU9XCInKyhhdHRycy52YWx1ZSA9PSAnX2RhdGVfJyA/ICdkYXRlJyA6ICd0ZXh0JykrJ1wiICcrXG4gICAgICAgICAgKHR5cGU9PSdjb25zdGFudHMnPydkaXNhYmxlZCc6JycpKycgY2xhc3M9XCJmb3JtLWNvbnRyb2wgJyt0eXBlKydcIiBpZD1cIicrXG4gICAgICAgICAgaWQrJ1wiIHN0eWxlPVwid2lkdGg6MjAwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2tcIiB2YWx1ZT1cIidcbiAgICAgICAgICAgICAgKyhhdHRycy52YWx1ZSA9PSAnX2RhdGVfJyA/ICcnIDogYXR0cnMudmFsdWUpKydcIj4mbmJzcDsmbmJzcDsnXG4gICAgICAgICAgICAgICsoYXR0cnMudW5pdHMgPyBhdHRycy51bml0cyA6ICcnKSsnPC9kaXY+JztcblxuICB9IGVsc2UgaWYgKCAgdHlwZW9mIGF0dHJzLnZhbHVlID09ICdzdHJpbmcnIHx8IHR5cGVvZiBhdHRycy52YWx1ZSA9PSAnbnVtYmVyJyApIHtcblxuICAgIGlucHV0ICs9ICc8ZGl2PjxpbnB1dCB0eXBlPVwiJysoYXR0cnMudmFsdWUgPT0gJ19kYXRlXycgPyAnZGF0ZScgOiAndGV4dCcpKydcIiAnXG4gICAgICAgICAgKyh0eXBlPT0nY29uc3RhbnRzJz8nZGlzYWJsZWQnOicnKSsnIGNsYXNzPVwiZm9ybS1jb250cm9sICcrdHlwZStcbiAgICAgICAgICAgJ1wiIGlkPVwiJytpZCsnXCIgc3R5bGU9XCJ3aWR0aDoyMDBweDtkaXNwbGF5OmlubGluZS1ibG9ja1wiIHZhbHVlPVwiJ1xuICAgICAgICAgICsoYXR0cnMudmFsdWUgPT0gJ19kYXRlXycgPyAnJyA6IGF0dHJzLnZhbHVlKSsnXCI+Jm5ic3A7Jm5ic3A7J1xuICAgICAgICAgICsoYXR0cnMudW5pdHMgPyBhdHRycy51bml0cyA6ICcnKSsnPC9kaXY+JztcblxuICAgIGlmKCBhdHRycy5kZXNjcmlwdGlvbiApIGlucHV0ICs9ICc8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj4nK2F0dHJzLmRlc2NyaXB0aW9uKyc8L3A+JztcbiAgfVxuXG4gIGlmKCAhKGkgPT0gMSAvKiYmIHR5cGUgPT0gJ3RyZWUnKi8pICkge1xuICAgICAgaW5wdXQgKz0gJzwvZGl2PjwvZGl2Pic7XG4gIH0gZWxzZSB7XG4gICAgICBpbnB1dCArPSBUUkVFX1BBTkVMX1RFTVBMQVRFXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgve3tpZH19L2csaWQpXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgne3t0aXRsZX19JyxuYW1lK1wiIDxzcGFuIHN0eWxlPSdjb2xvcjojODg4O2ZvbnQtc2l6ZToxMnB4Jz4gLSBcIithdHRycy5kZXNjcmlwdGlvbitcIjwvc3Bhbj5cIilcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7e2JvZHl9fScsdHJlZWJvZHkpKyc8L2Rpdj4nXG4gIH1cblxuICByZXR1cm4gaW5wdXQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZShlbGUpIHtcblxuXG4gICAgICB3ZWF0aGVyRmlsZVJlYWRlci5pbml0KCk7XG5cblxuICB2YXIgbW9kZWwsIG0sIGF0dHIsIGNvbmZpZztcblxuICAgICAgdmFyIGlucHV0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBhcHAuZ2V0TW9kZWwoKSk7XG5cbiAgICAgIGlucHV0c1snc2V0dXAnXSA9IHt9O1xuICBmb3IoIG1vZGVsIGluIGlucHV0cyApIHtcbiAgICBtID0gaW5wdXRzW21vZGVsXTtcbiAgICBmb3IoIGF0dHIgaW4gbSApIHtcbiAgICAgIGNvbmZpZyA9IG1bYXR0cl07XG5cbiAgICAgIGlmKCB0eXBlb2YgY29uZmlnID09ICdvYmplY3QnICkge1xuICAgICAgICBfYWRkSW5wdXQoe1xuICAgICAgICAgIG1vZGVsICAgICAgIDogbW9kZWwsXG4gICAgICAgICAgbGFiZWwgICAgICAgOiBhdHRyLFxuICAgICAgICAgIGRlc2NyaXB0aW9uIDogY29uZmlnLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIHZhbHVlICAgICAgIDogY29uZmlnLnZhbHVlLFxuICAgICAgICAgIHVuaXRzICAgICAgIDogY29uZmlnLnVuaXRzXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2FkZElucHV0KHtcbiAgICAgICAgICBtb2RlbCAgICAgICA6IG1vZGVsLFxuICAgICAgICAgIGxhYmVsICAgICAgIDogYXR0clxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIGZvciggbW9kZWwgaW4gaW5wdXRzICkge1xuICAgIGlmKCBtb2RlbCA9PSBcInBsYW50YXRpb25fc3RhdGVcIiApIGNvbnRpbnVlO1xuXG4gICAgdGFiSGVhZGVyICs9ICc8bGk+PGEgaHJlZj1cIiNpbnB1dHNfJyttb2RlbCsnXCIgaWQ9XCJ0YWJfaW5wdXRzXycrbW9kZWwrJ1wiIGRhdGEtdG9nZ2xlPVwicGlsbFwiPidcbiAgICAgICAgICAgICAgICArbW9kZWwuc3Vic3RyKDAsMSkudG9VcHBlckNhc2UoKSttb2RlbC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKSsnPC9hPjwvbGk+JztcbiAgICB2YXIgYXR0cmlidXRlcyA9IGlucHV0c1ttb2RlbF07XG5cbiAgICBjb250ZW50ICs9ICcgPGRpdiBjbGFzcz1cInBpbGwtcGFuZVwiIGlkPVwiaW5wdXRzXycrbW9kZWwrJ1wiPic7XG5cbiAgICB2YXIgcm93MSA9IFwiXCI7XG4gICAgdmFyIHJvdzIgPSBcIjxkaXYgY2xhc3M9J2NvbC1sZy02PlwiO1xuXG4gICAgaWYoIG1vZGVsID09ICd3ZWF0aGVyJyApIHtcbiAgICAgIGNvbnRlbnQgKz0gX2NyZWF0ZVdlYXRoZXJJbnB1dHMoKTtcbiAgICB9IGVsc2UgaWYoIG1vZGVsID09ICdzZXR1cCcgKSB7XG4gICAgICBjb250ZW50ICs9IFNFVFVQX1RFTVBMQVRFO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRlbnQgKz0gdHJlZUhlYWRlcjtcblxuICAgICAgICAvLyBhZGQgdGhlIGdvb2dsZSBkcml2ZSBidG4gZnJvbSB0cmVlc1xuICAgICAgICBpZiggbW9kZWwgPT0ndHJlZScgKSB7XG4gICAgICAgICAgY29udGVudCArPSBfY3JlYXRlVHJlZUlucHV0KG1vZGVsLCBpbnB1dHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnRlbnQgKz0gX2dlbmVyYXRlSW5wdXRzKDAsIG1vZGVsLCAnJywgbW9kZWwsIGlucHV0c1ttb2RlbF0pO1xuICAgICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gJzwvZGl2Pic7XG4gICAgfVxuXG5cbiAgICBjb250ZW50ICs9ICc8L2Rpdj4nO1xuICB9XG4gIGNvbnRlbnQgKz0gJzwvZGl2Pic7XG4gIHRhYkhlYWRlciArPSBcIjwvdWw+XCI7XG5cbiAgZWxlLmh0bWwodGFiSGVhZGVyK1wiPGRpdiBjbGFzcz0nZm9ybS1ob3Jpem9udGFsJz5cIitjb250ZW50K1wiPC9kaXY+XCIpO1xuXG4gIC8vIHJ1biB0aGUgbW9kZWwgd2hlbmV2ZXIgc29tZSBoaXRzICdlbnRlcidcbiAgZWxlLmZpbmQoJ2lucHV0Jykub24oJ2tleXVwJyxmdW5jdGlvbihlKXtcbiAgICBpZiggZS53aGljaCA9PSAxMyApIGFwcC5ydW5Nb2RlbCgpO1xuICB9KTtcblxuICAvLyBhZGQgY2xpY2sgaGFuZGxlciBmb3IgbG9hZGluZyBhIHRyZWVcbiAgZWxlLmZpbmQoXCIjZ2RyaXZlLXRyZWVwYW5lbC1sb2FkXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgZ2RyaXZlLnNob3dMb2FkVHJlZVBhbmVsKCk7XG4gIH0pO1xuICBlbGUuZmluZChcIiNnZHJpdmUtdHJlZXBhbmVsLXNhdmVcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBnZHJpdmUuc2hvd1NhdmVUcmVlUGFuZWwoKTtcbiAgfSk7XG5cbiAgLy8gc2V0IHRyZWUgaW5wdXQgaGFuZGxlcnNcbiAgJChcIiNjb21wYXJlLXRyZWVzXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgaWYoICQodGhpcykuaXMoJzpjaGVja2VkJykgKSB7XG4gICAgICAkKFwiI3NpbmdsZS10cmVlLWNvbnRlbnRcIikuaGlkZSgpO1xuICAgICAgJChcIiNjb21wYXJlLXRyZWUtY29udGVudFwiKS5zaG93KCk7XG4gICAgICAkKFwiI3RyZWUtc3ViLW1lbnVcIikuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiI3NpbmdsZS10cmVlLWNvbnRlbnRcIikuc2hvdygpO1xuICAgICAgJChcIiNjb21wYXJlLXRyZWUtY29udGVudFwiKS5oaWRlKCk7XG4gICAgICAkKFwiI3RyZWUtc3ViLW1lbnVcIikuc2hvdygpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gc2V0IHBpbGwgY2xpY2sgaGFuZGxlcnNcbiAgJCgnI2lucHV0X3RhYnMgYScpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICQodGhpcykudGFiKCdzaG93JylcbiAgfSk7XG4gICQoJyN0YWJfaW5wdXRzX3dlYXRoZXInKS50YWIoJ3Nob3cnKTtcblxuICAkKCcuc2VsZWN0LXdlYXRoZXItbG9jYXRpb24nKS5vbignY2xpY2snLCBfc2VsZWN0V2VhdGhlckxvY2F0aW9uKTtcblxuXG4gICQoJyN3ZWF0aGVyUmVhZGVyLW1vZGFsJykubW9kYWwoe3Nob3c6ZmFsc2V9KTtcbiAgJCgnI2xvYWQtd2VhdGhlci1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICQoJyN3ZWF0aGVyUmVhZGVyLW1vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgJChcIiN3ZWF0aGVyLWlucHV0LXRvZ2dsZSAuYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCgnI3dlYXRoZXItaW5wdXQtdG9nZ2xlIC5idG4uYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgaWYoICQodGhpcykuaHRtbCgpID09ICdBdmVyYWdlcycgKSB7XG4gICAgICAkKCcjYXZlcmFnZS13ZWF0aGVyLXBhbmVsJykuc2hvdygpO1xuICAgICAgJCgnI2N1c3RvbS13ZWF0aGVyLXBhbmVsJykuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHAuc2V0V2VhdGhlcigpO1xuICAgICAgJCgnI2F2ZXJhZ2Utd2VhdGhlci1wYW5lbCcpLmhpZGUoKTtcbiAgICAgICQoJyNjdXN0b20td2VhdGhlci1wYW5lbCcpLnNob3coKTtcbiAgICB9XG4gIH0pO1xuXG4gICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24oKXtcbiAgICBpZiggd2VhdGhlckF2ZXJhZ2VDaGFydCApe1xuICAgICAgd2VhdGhlckF2ZXJhZ2VDaGFydCA9IGNoYXJ0cy5jcmVhdGVXZWF0aGVyQ2hhcnQoJCgnI2F2ZXJhZ2Utd2VhdGhlci1jaGFydCcpWzBdLCB3ZWF0aGVyQXZlcmFnZUNoYXJ0RGF0YSk7XG4gICAgfVxuICB9KTtcblxuICBfc2V0V2VhdGhlckRhdGEoKTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZVRyZWVJbnB1dChtb2RlbCwgaW5wdXRzKSB7XG4gIHZhciBjb250ZW50ID0gXCJcIjtcbiAgY29udGVudCArPSBHT09MRURSSVZFX1RSRUVfVEVNUExBVEU7XG5cbiAgY29udGVudCArPSAnPGRpdiBpZD1cInNpbmdsZS10cmVlLWNvbnRlbnRcIj4nO1xuICBjb250ZW50ICs9IF9nZW5lcmF0ZUlucHV0cygwLCBtb2RlbCwgJycsIG1vZGVsLCBpbnB1dHNbbW9kZWxdKTtcbiAgY29udGVudCArPSAnPC9kaXY+JztcblxuICBjb250ZW50ICs9ICc8ZGl2IGlkPVwiY29tcGFyZS10cmVlLWNvbnRlbnRcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPicrXG4gICAgICAgICc8dWwgY2xhc3M9XCJuYXYgbmF2LXRhYnNcIj4nK1xuICAgICAgICAgICc8bGkgY2xhc3M9XCJhY3RpdmVcIj48YSBocmVmPVwiI3RyZWUxXCIgZGF0YS10b2dnbGU9XCJ0YWJcIj5UcmVlIDE8L2E+PC9saT4nK1xuICAgICAgICAgICAgJzxsaT48YSBocmVmPVwiI3RyZWUyXCIgZGF0YS10b2dnbGU9XCJ0YWJcIj5UcmVlIDI8L2E+PC9saT4nK1xuICAgICAgICAnPC91bD4nK1xuICAgICAgICAnPGRpdiBjbGFzcz1cInRhYi1jb250ZW50XCI+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidGFiLXBhbmUgYWN0aXZlXCIgaWQ9XCJ0cmVlMVwiPicrXG4gICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwid2VsbFwiIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luLXRvcDoxMHB4XCI+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPicrXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGFjdGl2ZVwiPkN1c3RvbTwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+U2VsZWN0IFRyZWU8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgIF9nZW5lcmF0ZUlucHV0cygwLCBtb2RlbCwgJ3QxJywgbW9kZWwsIGlucHV0c1ttb2RlbF0pK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInRhYi1wYW5lIGFjdGl2ZVwiIGlkPVwidHJlZTJcIj4nK1xuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIndlbGxcIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO21hcmdpbi10b3A6MTBweFwiID4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+JytcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYWN0aXZlXCI+Q3VzdG9tPC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5TZWxlY3QgVHJlZTwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgX2dlbmVyYXRlSW5wdXRzKDAsIG1vZGVsLCAndDInLCBtb2RlbCwgaW5wdXRzW21vZGVsXSkrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICc8L2Rpdj4nO1xuXG4gIHJldHVybiBjb250ZW50O1xufVxuXG5cbnJldHVybiB7XG4gIGNyZWF0ZSA6IGNyZWF0ZSxcbiAgdXBkYXRlQXZlcmFnZUNoYXJ0OiB1cGRhdGVBdmVyYWdlQ2hhcnRcbn07XG5cbn07XG4iLCJcbiAgLy8gbXVzdCBpbnN0YWxsIHRoaXMgZm9yIG5hdGl2ZSBwaG9uZWdhcCBzdXBwb3J0OlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vcGhvbmVnYXAtYnVpbGQvQ2hpbGRCcm93c2VyXG5cbnZhciB3aW4gPSBudWxsO1xuXG4vKiB0aGUga2V5IGZvciByZWZyZXNoIFRva2VuIGluIGxvY2FsIFN0b3JhZ2UgKi9cbnZhciB0b2tlbktleSA9ICdyZWZyZXNoX3Rva2VuJztcblxuLyogc3RvcmVzIHRoZSBhY2Nlc3NUb2tlbiBhZnRlciByZXRyaWV2YWwgZnJvbSBnb29nbGUgc2VydmVyICovXG52YXIgYWNjZXNzVG9rZW4gPSBudWxsO1xuXG4vKiBzdG9yZXMgdGhlIFRpbWUgd2hlbiBhY2Nlc3MgdG9rZW4gd2FzIGxhc3QgcmVjZWl2ZWQgZnJvbSBzZXJ2ZXIgKi9cbnZhciBhY2Nlc3NUb2tlblRpbWUgPSBudWxsO1xuXG4vKiBzdG9yZXMgYWNjZXNzIFRva2VuJ3MgRXhwaXJ5IExpbWl0LiBVc2VzIDU4IG1pbi4gaW5zdGVhZCBvZiA2MCBtaW4uICovXG52YXIgYWNjZXNzVG9rZW5FeHBpcnlMaW1pdCA9IDU4ICogNjAgKiAxMDAwO1xuXG4vKiBBIHRlbXBvcmFyeSB2YXJpYWJsZSBzdG9yaW5nIGNhbGxiYWNrIGZ1bmN0aW9uICovXG52YXIgY2FsbGJhY2tGdW5jID0gZmFsc2U7XG5cbi8vIGFyZSB3ZSBydW5uaW5nIG5hdGl2ZSBvciBicm93c2VyIG1vZGU/XG52YXIgaXNOYXRpdmUgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvXmZpbGUuKi8pID8gdHJ1ZSA6IGZhbHNlO1xuXG52YXIgQ0xJRU5UX0lEID0gaXNOYXRpdmUgP1xuICAgICAgICBcIjM0NDE5MDcxMzQ2NS1kaWltdGZlcmg0dGpiMDMxNjlia2w5bWtvcXZxMnJ1OS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwiIDpcbiAgICAgICAgIFwiMzQ0MTkwNzEzNDY1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tXCI7XG5cbnZhciBBUFBfSUQgPSBcIjM0NDE5MDcxMzQ2NVwiO1xuXG52YXIgT0FVVEhfU0NPUEVTID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUuZmlsZSAnXG4gICsgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUuaW5zdGFsbCAnXG4gICsgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8ucHJvZmlsZSc7XG5cbi8qIGNvbmZpZyB2YWx1ZXMgZm9yIEdvb2dsZSBBUEkgKGdhcGkpICovXG52YXIgZ2FwaUNvbmZpZyA9IHtcbiAgZW5kcG9pbnQ6IFwiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGhcIixcbiAgZW5kdG9rZW46IFwiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL3Rva2VuXCIsIC8vIHRva2VuIGVuZHBvaW50XG4gIHJlZGlyZWN0X3VyaSA6IFwiaHR0cDovL2xvY2FsaG9zdFwiLFxuICBjbGllbnRfc2VjcmV0IDogJzZyT1E5bDBmeW5oMTM3TVJYR0stR19aZycsXG4gIHJlc3BvbnNlX3R5cGUgOiBcImNvZGVcIixcbiAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICBzdGF0ZSA6IFwiZ2RyaXZlaW5pdFwiLFxuICBhY2Nlc3NfdHlwZSA6IFwib2ZmbGluZVwiLFxuICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcblxuICAvKiBBcyBkZWZpbmVkIGluIHRoZSBPQXV0aCAyLjAgc3BlY2lmaWNhdGlvbiwgdGhpcyBmaWVsZCBtdXN0IGNvbnRhaW4gYSB2YWx1ZVxuICAgICAqIG9mIFwiYXV0aG9yaXphdGlvbl9jb2RlXCIgb3IgXCJyZWZyZXNoX3Rva2VuXCIgKi9cbiAgICBncmFudFR5cGVzOiB7IEFVVEhPUklaRTogXCJhdXRob3JpemF0aW9uX2NvZGVcIiwgUkVGUkVTSDogXCJyZWZyZXNoX3Rva2VuXCIgfSxcbiB9O1xuXG4vKipcbiAqIEVudW0gZm9yIFN0YXR1cyB2YWx1ZXNcbiAqXG4gKiBAZW51bSB7bnVtYmVyfVxuICpcbiAqIFNVQ0NFU1MgLSBTdWNjZXNzZnVsbHkgZGF0YSByZWNlaXZlZCBmcm9tIHNlcnZlclxuICogRVJST1IgLSBFcnJvciBvY2N1cnJlZCB3aGVuIHRyeWluZyB0byByZWNlaXZlIGZyb20gc2VydmVyXG4gKiBOT1RfREVURVJNSU5FRCAtIHVuZGV0ZXJtaW5lZFxuICovXG52YXIgc3RhdHVzID0ge1xuICAgICAgICBTVUNFU1M6IDEsXG4gICAgICAgIEVSUk9SOiAtMSxcbiAgICAgICAgTk9UX0RFVEVSTUlORUQ6IDBcbn1cblxucmVxdWVzdFN0YXR1cyA9IDA7XG5cbi8qIHN0b3JlcyB0aGUgYXV0aG9yaXphdGlvbiBDb2RlIGludGVybmFsbHkgKi9cbmF1dGhDb2RlID0gZmFsc2U7XG5cbi8qIHN0b3JlcyB0aGUgZXJyb3IgbWVzc2FnZSB3aGVuIGFuIGVycm9yIGhhcHBlbnMgZnJvbSBnb29nbGUgc2VydmVyICovXG5lcnJvck1lc3NhZ2UgPSBmYWxzZTtcblxudmFyIGxvZyA9IGZ1bmN0aW9uKG1zZykge1xuICBjb25zb2xlLmxvZyhcIioqKk9BVVRIKioqOiBcIittc2cpO1xufVxuXG4vKipcbiAqIEF0dGVtcHRzIHRvIGF1dGhvcml6ZSB1c2VyIHVzaW5nIE9BdXRoXG4gKiBPcGVucyB1cCBBbm90aGVyIHdpbmRvdyB3aGVyZSB1c2VyIGFsbG93cyBhY2Nlc3Mgb3IgZGVuaWVzIGl0LlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxCYWNrICAgQSBjYWxsYmFjayBmdW5jdGlvbiB3aGljaCBpcyBpbnZva2VkXG4gKi9cbnZhciBhdXRob3JpemUgPSBmdW5jdGlvbihjYWxsQmFjaykge1xuICBsb2coXCJhdHRlbXB0aW5nIHRvIGF1dGhvcml6ZVwiKTtcblxuICAgIHZhciBhdXRoVXJpID0gZ2FwaUNvbmZpZy5lbmRwb2ludCArICc/J1xuICAgICsgJ3Njb3BlPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5zY29wZSlcbiAgICArICcmJyArICdyZWRpcmVjdF91cmk9JyArIGVuY29kZVVSSUNvbXBvbmVudChnYXBpQ29uZmlnLnJlZGlyZWN0X3VyaSlcbiAgICArICcmJyArICdyZXNwb25zZV90eXBlPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5yZXNwb25zZV90eXBlKVxuICAgICsgJyYnICsgJ2NsaWVudF9pZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGdhcGlDb25maWcuY2xpZW50X2lkKTtcbiAgICAvLysgJyYnICsgJ3N0YXRlPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5zdGF0ZSlcbiAgICAvLysgJyYnICsgJ2FjY2Vzc190eXBlPScgKyBlbmNvZGVVUklDb21wb25lbnQoZ2FwaUNvbmZpZy5hY2Nlc3NfdHlwZSlcbiAgICAvLysgJyYnICsgJ2FwcHJvdmFsX3Byb21wdD1mb3JjZSc7IC8vIEBUT0RPIC0gY2hlY2sgaWYgd2UgcmVhbGx5IG5lZWQgdGhpcyBwYXJhbVxuXG4gICAgY2FsbGJhY2tGdW5jID0gY2FsbEJhY2s7XG4gICAgcmVxdWVzdFN0YXR1cyA9IHN0YXR1cy5OT1RfREVURVJNSU5FRDtcblxuXG5cblxuICAgIGxvZyhcIm9wZW5pbmcgSW5BcHBCcm93c2VyXCIpO1xuXG4gICAgdHJ5IHtcblxuICAgICAgLy8gTm93IG9wZW4gbmV3IGJyb3dzZXJcbiAgICAgIHdpbiA9IHdpbmRvdy5vcGVuKGF1dGhVcmksICdfYmxhbmsnLCAnbG9jYXRpb249bm8sdG9vbGJhcj1ubycpO1xuXG4gICAgICAkKHdpbikub24oJ2xvYWRzdGFydCcsZnVuY3Rpb24oZSl7XG4gICAgICAgIGxvZyhcIkluQXBwQnJvd3NlciBsb2Fkc3RhcnRcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGUub3JpZ2luYWxFdmVudC51cmwpO1xuICAgICAgICBvbkF1dGhVcmxDaGFuZ2UoZS5vcmlnaW5hbEV2ZW50LnVybCk7XG4gICAgICB9KTtcblxuICAgICAgLy93aW5kb3cucGx1Z2lucy5jaGlsZEJyb3dzZXIuc2hvd1dlYlBhZ2UoYXV0aFVyaSwge3Nob3dMb2NhdGlvbkJhciA6IHRydWV9KTtcbiAgICAgIC8vd2luZG93LnBsdWdpbnMuY2hpbGRCcm93c2VyLm9uQ2xvc2UgPSBvbkF1dGhDbG9zZTtcbiAgICAgIC8vd2luZG93LnBsdWdpbnMuY2hpbGRCcm93c2VyLm9uTG9jYXRpb25DaGFuZ2UgPSBvbkF1dGhVcmxDaGFuZ2U7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBsb2coXCJFcnJvciBvcGVuaW5nIEluQXBwQnJvd3NlclwiKTtcbiAgICAgIGxvZyhlKTtcbiAgICB9XG5cbn07XG5cbmlmKCAhaXNOYXRpdmUgKSB7XG4gIGF1dGhvcml6ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBpbW1lZGlhdGUpIHtcbiAgZ2FwaS5hdXRoLmF1dGhvcml6ZSh7XG4gICAgY2xpZW50X2lkIDogQ0xJRU5UX0lELFxuICAgIHNjb3BlIDogT0FVVEhfU0NPUEVTLFxuICAgIGltbWVkaWF0ZSA6IGltbWVkaWF0ZVxuICB9LCBmdW5jdGlvbigpIHtcbiAgICBhdXRoQ29kZSA9IGdhcGkuYXV0aC5nZXRUb2tlbigpO1xuICAgIGNhbGxiYWNrKGF1dGhDb2RlKTtcbiAgfSk7XG5cbiAgfVxufVxuXG4vKiBBdXRoIFdpbmRvdyBjbG9zZWQgKi9cbnZhciBvbkF1dGhDbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQXV0aCB3aW5kb3cgY2xvc2VkXCIpO1xufTtcblxuLyogT0F1dGggU3VjY2Vzc2Z1bGx5IGRvbmUgKi9cbnZhciBvbkF1dGhTdWNjZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ0F1dGggU3VjY2Vzcz8nKTtcbn07XG5cbi8qKlxuICogR2V0cyBJbnZva2VkIHdoZW4gdGhlIFVSTCBjaGFuZ2VzIG9uIE9BdXRoIGF1dGhvcml6YXRpb24gcHJvY2Vzc1xuICpcbiAqIFN1Y2Nlc3MgVVJMIFBhdHRlcm46XG4gKiBcInJlZGlyZWN0X3VyaVwiICsgXCI/Y29kZT1cIiBbc2VjcmV0IGNvZGUgdmFsXVxuICpcbiAqIFN1Y2Nlc3MgU2FtcGxlIFVSTDpcbiAqIGh0dHA6Ly9sb2NhbGhvc3QvP2NvZGU9NC9XT3BSTFFmdnZoSEUwdHVNVUREcW5uNzZsQ1RULjhuWEM0SWViTUVBVXVKSlZuTDQ5Q2M4QVFHcjhjUUlcbiAqXG4gKiBEZW5pZWQgQWNjZXNzIFVSTCBQYXR0ZXJuOiBcInJlZGlyZWN0X3VyaVwiICsgP2Vycm9yPWFjY2Vzc19kZW5pZWRcbiAqIERlbmllZCBBY2Nlc3MgU2FtcGxlOiBodHRwOi8vbG9jYWxob3N0Lz9lcnJvcj1hY2Nlc3NfZGVuaWVkXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVyaUxvY2F0aW9uIFRoZSBVUkkgTG9jYXRpb25cbiAqL1xudmFyIG9uQXV0aFVybENoYW5nZSA9IGZ1bmN0aW9uKHVyaUxvY2F0aW9uKSB7XG4gICAgY29uc29sZS5sb2coXCJJbkFwcEJyb3dzZXIgdXJsIGNoYW5nZWQgXCIrdXJpTG9jYXRpb24pO1xuICAgIGlmKHVyaUxvY2F0aW9uLmluZGV4T2YoXCJjb2RlPVwiKSAhPSAtMSkge1xuICAgICAgICByZXF1ZXN0U3RhdHVzID0gc3RhdHVzLlNVQ0NFU1M7XG5cbiAgICAgICAgLyogU3RvcmUgdGhlIGF1dGhDb2RlIHRlbXBvcmFyaWx5ICovXG4gICAgICAgIGF1dGhDb2RlID0gZ2V0UGFyYW1ldGVyQnlOYW1lKFwiY29kZVwiLCB1cmlMb2NhdGlvbik7XG4gICAgICAgIGxvZyhcIkZvdW5kIGF1dGggY29kZTogXCIrYXV0aENvZGUpO1xuXG4gICAgICAgIGdldFJlZnJlc2hUb2tlbihjYWxsYmFja0Z1bmMpO1xuXG4gICAgICAgIC8vIGNsb3NlIHRoZSBjaGlsZEJyb3dzZXJcbiAgICAgICAgd2luLmNsb3NlKCk7XG4gICAgfSBlbHNlIGlmKHVyaUxvY2F0aW9uLmluZGV4T2YoXCJlcnJvcj1cIikgIT0gLTEpICB7XG4gICAgICAgIHJlcXVlc3RTdGF0dXMgPSBzdGF0dXMuRVJST1I7XG4gICAgICAgIGVycm9yTWVzc2FnZSA9IGdldFBhcmFtZXRlckJ5TmFtZShcImVycm9yXCIsIHVyaUxvY2F0aW9uKTtcbiAgICAgICAgY2FsbGJhY2tGdW5jKCk7XG4gICAgICAgIHdpbi5jbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcXVlc3RTdGF0dXMgPSBzdGF0dXMuTk9UX0RFVEVSTUlORUQ7XG4gICAgICAgIC8vY2FsbGJhY2tGdW5jKCk7XG4gICAgfVxufTtcblxuXG4vKipcbiogR2V0cyB0aGUgUmVmcmVzaCBmcm9tIEFjY2VzcyBUb2tlbi4gVGhpcyBtZXRob2QgaXMgb25seSBjYWxsZWQgaW50ZXJuYWxseSxcbiogYW5kIG9uY2UsIG9ubHkgYWZ0ZXIgd2hlbiBhdXRob3JpemF0aW9uIG9mIEFwcGxpY2F0aW9uIGhhcHBlbnMuXG4qXG4qIEBwYXJhbSBwYXJhbU9iaiBBbiBPYmplY3QgY29udGFpbmluZyBhdXRob3JpemF0aW9uIGNvZGVcbiogQHBhcmFtIHBhcmFtT2JqLmF1dGhfY29kZSBUaGUgQXV0aG9yaXphdGlvbiBDb2RlIGZvciBnZXR0aW5nIFJlZnJlc2ggVG9rZW5cbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgY2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgdG8gYmUgaW52b2tlZCBhZnRlclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzZnVsIHJldHJpZXZhbCBvZiBkYXRhIGZyb20gZ29vZ2xlJ3Mgc2VydmVyXG4qXG4qL1xudmFyIGdldFJlZnJlc2hUb2tlbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIGNvbnNvbGUubG9nKFwiYWNjZXNzIHJlZnJlc2ggdG9rZW5cIik7XG4gICAkLmFqYXgoe1xuICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgIHVybDogZ2FwaUNvbmZpZy5lbmR0b2tlbixcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgY2xpZW50X2lkICAgIDogZ2FwaUNvbmZpZy5jbGllbnRfaWQsXG4gICAgICAgICAgICAgICAgICAgY2xpZW50X3NlY3JldDogZ2FwaUNvbmZpZy5jbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgICAgICAgIGNvZGUgICAgICAgICA6IGF1dGhDb2RlLFxuICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0X3VyaSA6IGdhcGlDb25maWcucmVkaXJlY3RfdXJpLFxuICAgICAgICAgICAgICAgICAgIGdyYW50X3R5cGUgICA6IGdhcGlDb25maWcuZ3JhbnRUeXBlcy5BVVRIT1JJWkVcbiAgICAgICAgICAgfVxuICAgIH0pXG4gICAgLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3MgZ2V0dGluZyByZWZyZXNoIHRva2VuXCIpO1xuXG4gICAgICAgIC8qIHVwb24gc3VjZXNzLCBkbyBhIGNhbGxiYWNrIHdpdGggdGhlIGRhdGEgcmVjZWl2ZWQgKi9cbiAgICAgICAgLy8gdGVtcG9yYXJ5IHN0b3JpbmcgYWNjZXNzIHRva2VuXG4gICAgICAgIGFjY2Vzc1Rva2VuICAgICA9IGRhdGEuYWNjZXNzX3Rva2VuO1xuICAgICAgICBhY2Nlc3NUb2tlblRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgdG9rZW4gZm9yIHRoZSBqcyBhcGlcbiAgICAgICAgZ2FwaS5hdXRoLnNldFRva2VuKGRhdGEpO1xuXG4gICAgICAgIC8qIHNldCB0aGUgZXJyb3Igb2YgZGF0YSB0byBmYWxzZSwgYXMgaXQgd2FzIHN1Y2Nlc3NmdWwgKi9cbiAgICAgICAgZGF0YS5lcnJvciA9IGZhbHNlO1xuXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0b2tlbktleSwgZGF0YS5yZWZyZXNoX3Rva2VuKTtcblxuICAgICAgICAvKiBub3cgaW52b2tlIHRoZSBjYWxsYmFjayAqL1xuICAgICAgICBjYWxsYmFjayh7YWNjZXNzX3Rva2VuOiBhY2Nlc3NUb2tlbn0pO1xuICAgIH0pXG4gICAgLmZhaWwoZnVuY3Rpb24oeGhyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICB9KTtcbiAgICB9KVxuICAgIC5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVG9rZW4gcmVxdWVzdCBjb21wbGV0ZVwiKTtcbiAgICB9KTtcbn07XG5cbmlmKCAhaXNOYXRpdmUgKSB7XG4gIGdldFJlZnJlc2hUb2tlbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIGdhcGkuYXV0aC5hdXRob3JpemUoe1xuICAgIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcbiAgICBpbW1lZGlhdGUgOiB0cnVlXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIHRva2VuID0gZ2FwaS5hdXRoLmdldFRva2VuKCk7XG4gICAgaWYoIGNhbGxiYWNrICkgY2FsbGJhY2sodG9rZW4pO1xuICB9KTtcbiAgfVxufVxuXG5cbi8qKlxuKiBUaGlzIG1ldGhvZCBzaG91bGQgT05MWSBiZSBjYWxsZWQgbG9jYWxseSBmcm9tIHdpdGhpbiB0aGlzIGNsYXNzLlxuKiBSZXR1cm5zIHRoZSBSZWZyZXNoIFRva2VuIGZyb20gdGhlIGxvY2FsIGRhdGFiYXNlLlxuKlxuKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSByZWZyZXNoIFRva2VuXG4qXG4qL1xudmFyIGdldFRva2VuID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0b2tlbktleSk7XG59O1xuXG5cbi8qKlxuKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGV4dGVybmFsbHkuIEl0IHJldHJpZXZlcyB0aGUgQWNjZXNzIFRva2VuIGJ5IGF0IGZpcnN0XG4qIGNoZWNraW5nIGlmIGN1cnJlbnQgYWNjZXNzIHRva2VuIGhhcyBleHBpcmVkIG9yIG5vdC4gSWYgaXRzIG5vdCBleHBpcmVkLCBpdFxuKiBzaW1wbHkgcmV0dXJucyB0aGF0LCBvdGhlcndpc2UsIGl0IGdldHMgdGhlIHJlZnJlc2ggVG9rZW4gZnJvbSB0aGUgbG9jYWwgZGF0YWJhc2VcbiogKGJ5IGludm9raW5nIGdldFRva2VuKSBhbmQgdGhlbiBjb25uZWN0aW5nIHdpdGggR29vZ2xlJ3MgU2VydmVyICh1c2luZyBPQXV0aClcbiogdG8gZ2V0IHRoZSBBY2Nlc3MgVG9rZW4uXG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrICAgQSBjYWxsQmFjayBmdW5jdGlvbiB3aGljaCBpcyB0byBiZSBpbnZva2VkIGFmdGVyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhIGlzIHJldHJpZXZlZCBmcm9tIHRoZSBnb29nbGUncyBzZXJ2ZXIuIFRoZSBkYXRhXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIGdvb2dsZSBzZXJ2ZXIgaXMgcGFzc2VkIHRvIGNhbGxiYWNrIGFzIGFyZ3MuXG4qXG4qL1xudmFyIGdldEFjY2Vzc1Rva2VuID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgIHZhciBjdXJyZW50VGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cbiAgIGNvbnNvbGUubG9nKFwiZ2V0dGluZyBhY2Nlc3MgdG9rZW5cIik7XG5cbiAgIC8qIGNoZWNrIGlmIGN1cnJlbnQgVG9rZW4gaGFzIG5vdCBleHBpcmVkIChzdGlsbCB2YWxpZCkgKi9cbiAgIGlmIChhY2Nlc3NUb2tlbiAmJiBhY2Nlc3NUb2tlbiAhPSBmYWxzZSAmJlxuICAgICAgICAgICBjdXJyZW50VGltZSA8IChhY2Nlc3NUb2tlblRpbWUgKyBhY2Nlc3NUb2tlbkV4cGlyeUxpbWl0KSkge1xuICAgICAgICAgICBjYWxsYmFjayh7IGFjY2Vzc190b2tlbjogYWNjZXNzVG9rZW4gfSk7XG5cbiAgICAgICAgICAgcmV0dXJuO1xuICAgfVxuXG4gICBjb25zb2xlLmxvZyhcIkFDQ0VTUyBUT0tFTiBQQVJBTVM6IFwiK2FjY2Vzc1Rva2VuK1wiIFwiK2FjY2Vzc1Rva2VuVGltZStcIiBcIithY2Nlc3NUb2tlbkV4cGlyeUxpbWl0KTtcblxuICAgLyogZWxzZSwgZ2V0IHRoZSByZWZyZXNoVG9rZW4gZnJvbSBsb2NhbCBzdG9yYWdlIGFuZCBnZXQgYSBuZXcgYWNjZXNzIFRva2VuICovXG4gICB2YXIgcmVmcmVzaFRva2VuID0gZ2V0VG9rZW4oKTtcblxuICAgLy8gICBjb25zb2xlLmxvZyhcIlJlZnJlc2ggVG9rZW4gPj4gXCIgKyByZWZyZXNoVG9rZW4pO1xuICAgJC5hamF4KHtcbiAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICB1cmw6IGdhcGlDb25maWcuZW5kdG9rZW4sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgY2xpZW50X2lkICAgIDogZ2FwaUNvbmZpZy5jbGllbnRfaWQsXG4gICAgICAgICAgICAgICAgICBjbGllbnRfc2VjcmV0OiBnYXBpQ29uZmlnLmNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW4sXG4gICAgICAgICAgICAgICAgICBncmFudF90eXBlICAgOiBnYXBpQ29uZmlnLmdyYW50VHlwZXMuUkVGUkVTSCxcbiAgICAgICAgICB9XG4gICAgfSlcbiAgICAuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAvKiB1cG9uIHN1Y2VzcywgZG8gYSBjYWxsYmFjayB3aXRoIHRoZSBkYXRhIHJlY2VpdmVkICovXG4gICAgICAgICAgICAvLyB0ZW1wb3Jhcnkgc3RvcmluZyBhY2Nlc3MgdG9rZW5cbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuID0gZGF0YS5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICBhY2Nlc3NUb2tlblRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIHRva2VuIGZvciB0aGUganMgYXBpXG4gICAgICAgICAgICBnYXBpLmF1dGguc2V0VG9rZW4oZGF0YSk7XG5cbiAgICAgICAgICAgIC8qIHNldCB0aGUgZXJyb3IgdG8gZmFsc2UgKi9cbiAgICAgICAgICAgIGRhdGEuZXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICB9KVxuICAgIC5mYWlsKGZ1bmN0aW9uKHhociwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUb2tlbiByZXF1ZXN0IGVycm9yID8/ID4+XCIgKyB4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgIH0pO1xuICAgIH0pXG4gICAgLmFsd2F5cyhmdW5jdGlvbigpIHsgLy9jb25zb2xlLmxvZyhcIlRva2VuIHJlcXVlc3QgY29tcGxldGVcIik7XG4gICAgfSk7XG59O1xuXG5pZiggIWlzTmF0aXZlICkge1xuICBnZXRBY2Nlc3NUb2tlbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgIHZhciBjdXJyZW50VGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cbiAgICAgaWYgKGFjY2Vzc1Rva2VuICYmXG4gICAgICAgICAgICAgY3VycmVudFRpbWUgPCAoYWNjZXNzVG9rZW5UaW1lICsgYWNjZXNzVG9rZW5FeHBpcnlMaW1pdCkpIHtcbiAgICAgICAgICAgICBjYWxsYmFjayhhY2Nlc3NUb2tlbik7XG5cbiAgICAgICAgICAgICByZXR1cm47XG4gICAgIH1cblxuICAgIGdhcGkuYXV0aC5hdXRob3JpemUoe1xuICAgIGNsaWVudF9pZCA6IENMSUVOVF9JRCxcbiAgICBzY29wZSA6IE9BVVRIX1NDT1BFUyxcbiAgICBpbW1lZGlhdGUgOiB0cnVlXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIHRva2VuID0gZ2FwaS5hdXRoLmdldFRva2VuKCk7XG4gICAgYWNjZXNzVG9rZW4gPSB0b2tlbjtcbiAgICBhY2Nlc3NUb2tlblRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgIGlmKCBjYWxsYmFjayApIGNhbGxiYWNrKHRva2VuKTtcbiAgfSk7XG4gIH1cbn1cblxuXG5cbi8qKlxuKiBTYXZlcyB0aGUgUmVmcmVzaCBUb2tlbiBpbiBhIGxvY2FsIGRhdGFiYXNlIG9yIGxvY2FsU3RvcmFnZVxuKiBUaGlzIG1ldGhvZCBzaGFsbCBiZSBpbnZva2VkIGZyb20gZXh0ZXJuYWxseSBvbmx5IDxiPm9uY2U8L2I+IGFmdGVyIGFuXG4qIGF1dGhvcml6YXRpb24gY29kZSBpcyByZWNlaXZlZCBmcm9tIGdvb2dsZSdzIHNlcnZlci4gVGhpcyBtZXRob2RcbiogY2FsbHMgdGhlIG90aGVyIG1ldGhvZCAoZ2V0UmVmcmVzaFRva2VuKSB0byBnZXQgdGhlIHJlZnJlc2ggVG9rZW4gYW5kXG4qIHRoZW4gc2F2ZXMgaXQgbG9jYWxseSBvbiBkYXRhYmFzZSBhbmQgaW52b2tlcyBhIGNhbGxiYWNrIGZ1bmN0aW9uXG4qXG4qIEBwYXJhbSB0b2tlbk9iaiBBIE9iamVjdCBjb250YWluaW5nIGF1dGhvcml6YXRpb24gY29kZVxuKiBAcGFyYW0ge1N0cmluZ30gdG9rZW5PYmouYXV0aF9jb2RlIFRoZSBhdXRob3JpemF0aW9uIGNvZGUgZnJvbSBnb29nbGUncyBzZXJ2ZXJcbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2l0aCBwYXJhbWV0ZXJzXG4qL1xudmFyIHNhdmVSZWZyZXNoVG9rZW4gPSBmdW5jdGlvbih0b2tlbk9iaiwgY2FsbGJhY2spIHtcbiAgICAgZ2V0UmVmcmVzaFRva2VuKHRva2VuT2JqLCBmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgICAgICAgICAvKiBpZiB0aGVyZSdzIG5vIGVycm9yICovXG4gICAgICAgICAgICAgaWYgKCFkYXRhLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEBUT0RPOiBtYWtlIGFub3RoZXIgbWV0aG9kIHNhdmVUb2tlbiB0byBhYnN0cmFjdCB0aGUgc3RvcmluZyBvZiB0b2tlblxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0b2tlbktleSwgZGF0YS5yZWZyZXNoX3Rva2VuKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgIH0pO1xufTtcblxuXG5cbi8qKlxuKiBDaGVja3MgaWYgdXNlciBoYXMgYXV0aG9yaXplZCB0aGUgQXBwIG9yIG5vdFxuKiBJdCBkb2VzIHNvIGJ5IGNoZWNraW5nIGlmIHRoZXJlJ3MgYSByZWZyZXNoX3Rva2VuXG4qIGF2YWlsYWJsZSBvbiB0aGUgY3VycmVudCBkYXRhYmFzZSB0YWJsZS5cbipcbiogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBhdXRob3JpemVkLCBmYWxzZSBvdGhlcndpc2VcbiovXG52YXIgaXNBdXRob3JpemVkID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgIHZhciB0b2tlblZhbHVlID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKHRva2VuS2V5KTtcblxuICAgICAgY2FsbGJhY2soKCh0b2tlblZhbHVlICE9PSBudWxsKSAmJiAodHlwZW9mIHRva2VuVmFsdWUgIT09ICd1bmRlZmluZWQnKSkpO1xufTtcblxuaWYoICFpc05hdGl2ZSApIHtcbiAgaXNBdXRob3JpemVkID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICBnYXBpLmF1dGguYXV0aG9yaXplKHtcbiAgICBjbGllbnRfaWQgOiBDTElFTlRfSUQsXG4gICAgc2NvcGUgOiBPQVVUSF9TQ09QRVMsXG4gICAgaW1tZWRpYXRlIDogdHJ1ZVxuICB9LCBmdW5jdGlvbigpIHtcbiAgICB0b2tlbiA9IGdhcGkuYXV0aC5nZXRUb2tlbigpO1xuICAgIGlmKCBjYWxsYmFjayApIGNhbGxiYWNrKHRva2VuKTtcbiAgfSk7XG4gIH1cbn1cblxuXG4vKipcbiogRXh0cmFjdHMgdGhlIGNvZGUgZnJvbSB0aGUgdXJsLiBDb3BpZWQgZnJvbSBvbmxpbmVcbiogQFRPRE8gbmVlZHMgdG8gYmUgc2ltcGxpZmllZC5cbipcbiogQHBhcmFtIG5hbWUgVGhlIHBhcmFtZXRlciB3aG9zZSB2YWx1ZSBpcyB0byBiZSBncmFiYmVkIGZyb20gdXJsXG4qIEBwYXJhbSB1cmwgIFRoZSB1cmwgdG8gYmUgZ3JhYmJlZCBmcm9tLlxuKlxuKiBAcmV0dXJuIFJldHVybnMgdGhlIFZhbHVlIGNvcnJlc3BvbmRpbmcgdG8gdGhlIG5hbWUgcGFzc2VkXG4qL1xudmFyIGdldFBhcmFtZXRlckJ5TmFtZSA9IGZ1bmN0aW9uKG5hbWUsIHVybCkge1xuICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXS8sIFwiXFxcXFxcW1wiKS5yZXBsYWNlKC9bXFxdXS8sIFwiXFxcXFxcXVwiKTtcbiAgdmFyIHJlZ2V4UyA9IFwiW1xcXFw/Jl1cIiArIG5hbWUgKyBcIj0oW14mI10qKVwiO1xuICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKHJlZ2V4Uyk7XG4gIHZhciByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xuXG4gIGlmKHJlc3VsdHMgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBlbHNlXG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzFdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXV0aG9yaXplIDogYXV0aG9yaXplLFxuICBpc0F1dGhvcml6ZWQgOiBpc0F1dGhvcml6ZWQsXG4gIGdldEFjY2Vzc1Rva2VuIDogZ2V0QWNjZXNzVG9rZW4sXG4gIEFQUF9JRCA6IEFQUF9JRFxufTtcbiIsInZhciBhcHAgPSByZXF1aXJlKCcuL2FwcCcpO1xuXG52YXIgY2FjaGVkVGlsZVN0eWxlID0ge1xuICB3aGVyZTogXCJwaWQgaW4gKClcIixcbiAgcG9seWdvbk9wdGlvbnM6IHtcbiAgICBmaWxsQ29sb3I6IFwiIzAwMDAwMFwiLFxuICAgIHN0cm9rZUNvbG9yOiBcIiNGRjAwMDBcIixcbiAgICBzdHJva2VXZWlnaHQ6IDNcbiAgfVxufVxuXG52YXIgY2FjaGVkVGlsZXMgPSBbXTtcbnZhciBjYWNoZWRUaWxlc0xvYWRlZCA9IGZhbHNlO1xudmFyIGNhY2hlZFRpbGVQcmVmaXggPSAnY2FjaGVkX3RpdGxlXyc7XG52YXIgY2FjaGluZyA9IGZhbHNlO1xudmFyIHNhdmVDYWNoZU9uQ2xpY2tTZXQgPSBmYWxzZTtcbnZhciBjTWFwRGF0YSA9IHt9O1xuXG52YXIgY29scyA9IFtdO1xudmFyIGFwcCA9IG51bGw7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIF9sb2FkRnJvbUNhY2hlKCk7XG4gIF9sb2FkQ2FjaGVkVGlsZXMoKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgaWYoICFjb25maXJtKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2xlYXIgYWxsIHRpbGUgZGF0YSBmcm9tIHRoZSBjYWNoZT8nKSApIHJldHVybjtcblxuICBmb3IoIHZhciBrZXkgaW4gd2luZG93LmxvY2FsU3RvcmFnZSApIHtcbiAgICBpZigga2V5LmluZGV4T2YoY2FjaGVkVGlsZVByZWZpeCkgPiAtMSApIHtcbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgIH1cbiAgfVxuICBjYWNoZWRUaWxlcyA9IFtdO1xufVxuXG4vLyBlIGlzIHRoZSBldmVudCBvYmplY3QgZnJvbSBnb29nbGUgbWFwc1xuZnVuY3Rpb24gY2FjaGVUaWxlKGUsIGZ1c2lvbkxheWVyLCBkZWZhdWx0T3B0aW9ucywgZGVmYXVsdFN0eWxlKSB7XG4gIGlmKCAhc2F2ZUNhY2hlT25DbGlja1NldCApIHtcbiAgICBzYXZlQ2FjaGVPbkNsaWNrU2V0ID0gdHJ1ZTtcbiAgICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgIF9zYXZlVGlsZSgpO1xuICAgIH0pO1xuICAgICQoJyNsb2NhdGUtY2FjaGUtbW9kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICBpZiggISQodGhpcykuaXMoJ2NoZWNrZWQnKSApICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1wYW5lbCcpLmhpZGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmKCBjYWNoaW5nICkgcmV0dXJuO1xuICBjYWNoaW5nID0gdHJ1ZTtcblxuICBjTWFwRGF0YSA9IHtcbiAgICBmdXNpb25MYXllciA6IGZ1c2lvbkxheWVyLFxuICAgIGRlZmF1bHRPcHRpb25zIDogZGVmYXVsdE9wdGlvbnMsXG4gICAgZGVmYXVsdFN0eWxlIDogZGVmYXVsdFN0eWxlLFxuICAgIHBpZCA6ICBlLnJvdy5waWQudmFsdWVcbiAgfVxuXG4gICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1uYW1lJykudmFsKCcnKTtcbiAgJCgnI2xvY2F0ZS1jYWNoZS1tb2RlLWxvYWRpbmcnKS5zaG93KCk7XG4gICQoJyNsb2NhdGUtY2FjaGUtc2F2ZS1wYW5lbCcpLmhpZGUoKTtcblxuICBfbG9hZFRpbGUoZS5sYXRMbmcubG5nKCksIGUubGF0TG5nLmxhdCgpLCBmdW5jdGlvbihkYXRhKXtcbiAgICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGFuZWwnKS5zaG93KCk7XG4gICAgJCgnI2xvY2F0ZS1jYWNoZS1tb2RlLWxvYWRpbmcnKS5oaWRlKCk7XG5cbiAgICAkKCcjbG9jYXRlLWNhY2hlLXNhdmUtcGlkJykuaHRtbChjTWFwRGF0YS5waWQpO1xuICAgIGNNYXBEYXRhLmRhdGEgPSBkYXRhO1xuICAgIGNhY2hpbmcgPSBmYWxzZTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgZm9yKCB2YXIgYXR0ciBpbiBhcHAuZ2V0TW9kZWwoKS53ZWF0aGVyICkge1xuICAgIGlmKCBhdHRyICE9IFwibnJlbFwiICkgY29scy5wdXNoKGF0dHIpO1xuICB9XG5cbiAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAkKFwiI2Fib3V0LW1vZGFsXCIpLm1vZGFsKHtcbiAgICBzaG93IDogZmFsc2VcbiAgfSk7XG5cbiAgLy8gdGhlIGFib3V0IG1vZGFsIGxpbmsgaXMgY3JlYXRlZCBiZWxvdywgc28gd2h5IG5vdC4uLlxuICAkKFwiI2hlbHAtbW9kYWxcIikubW9kYWwoe1xuICAgIHNob3cgOiBmYWxzZVxuICB9KTtcblxuICBfY3JlYXRlTmF2TWVudSgpO1xuXG4gIC8vIGhpZGUgdGhlIHNlbGVjdCB0cmVlIGJ1dHRvblxuICAkKCcjdHJlZS1zdWItbWVudScpLnBhcmVudCgpLmhpZGUoKTtcblxuICAvLyBoaWRlIHRoZSBzZWxlY3RvciBmb3IgdXBsb2FkaW5nIHdlYXRoZXIgZGF0YSBmcm9tIGEgZ29vZ2xlIHNwcmVhZHNoZWV0XG4gICQoJyN3ZWF0aGVyUmVhZGVyLXNwcmVhZHNoZWV0JykucGFyZW50KCkuaGlkZSgpO1xuXG4gIC8vIHNob3cgdGhlIGNhY2hlIHZlcnNpb24gb2YgdGhlIGxvY2F0aW9uIHNlbGVjdG9yXG4gICQoJyNzZWxlY3QtbG9jYXRpb24tb25saW5lJykuaGlkZSgpO1xuICAkKCcjc2VsZWN0LWxvY2F0aW9uLW9mZmxpbmUnKS5zaG93KCk7XG5cbiAgLy8gc2V0IHRoZSBsb2NhdGlvbiBzZWxlY3RvciB1aSBsaXN0IGJhc2VkIG9uIGNhY2hlZCB0aWxlc1xuICBfdXBkYXRlQ2FjaGVUaWxlVWlMaXN0KCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNhY2hlZFRpbGVzT25NYXAoZnVzaW9uTGF5ZXIsIGRlZmF1bHRPcHRpb25zLCBkZWZhdWx0U3R5bGUpIHtcbiAgaWYoICFjYWNoZWRUaWxlc0xvYWRlZCApIF9sb2FkQ2FjaGVkVGlsZXMoKTtcblxuICBkZWZhdWx0T3B0aW9ucy5zdHlsZXMgPSBbZGVmYXVsdFN0eWxlXTtcblxuICBpZiggY2FjaGVkVGlsZXMubGVuZ3RoID4gMCApIHtcbiAgICBjYWNoZWRUaWxlU3R5bGUud2hlcmUgPSAncGlkIGluICgnK2NhY2hlZFRpbGVzLmpvaW4oJywnKSsnKSc7XG4gICAgZGVmYXVsdE9wdGlvbnMuc3R5bGVzLnB1c2goY2FjaGVkVGlsZVN0eWxlKTtcbiAgfVxuXG4gIGZ1c2lvbkxheWVyLnNldE9wdGlvbnMoZGVmYXVsdE9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBfc2F2ZVRpbGUoKSB7XG4gIHZhciBuYW1lID0gJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLW5hbWUnKS52YWwoKTtcbiAgaWYoIG5hbWUubGVuZ3RoID09IDAgKSByZXR1cm4gYWxlcnQoJ1BsZWFzZSBwcm92aWRlIGEgbmFtZScpO1xuXG4gIGNNYXBEYXRhLmRhdGEubmFtZSA9IG5hbWU7XG5cbiAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGNhY2hlZFRpbGVQcmVmaXgrY01hcERhdGEucGlkLCBKU09OLnN0cmluZ2lmeShjTWFwRGF0YS5kYXRhKSk7XG5cbiAgY2FjaGVkVGlsZXMucHVzaChjTWFwRGF0YS5waWQpO1xuICByZW5kZXJDYWNoZWRUaWxlc09uTWFwKGNNYXBEYXRhLmZ1c2lvbkxheWVyLCBjTWFwRGF0YS5kZWZhdWx0T3B0aW9ucywgY01hcERhdGEuZGVmYXVsdFN0eWxlKTtcbiAgJCgnI2xvY2F0ZS1jYWNoZS1zYXZlLXBhbmVsJykuaGlkZSgpO1xufVxuXG5mdW5jdGlvbiBfbG9hZFRpbGUobG5nLCBsYXQsIGNhbGxiYWNrKSB7XG4gIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ3RpbGUtZGF0YS1jYWNoZScsIDEpO1xuXG4gIHZhciB1cmwgPSBcImh0dHA6Ly9hbGRlci5iaW9lbmVyZ3kuY2FzaWwudWNkYXZpcy5lZHU6ODA4MC92aXpzb3VyY2UvcmVzdD92aWV3PXBvaW50VG9XZWF0aGVyKFwiK2xuZytcIixcIitsYXQrXCIsODE5MilcIlxuICB2YXIgcSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5RdWVyeSh1cmwpO1xuICB2YXIgcmVzcHMgPSAwO1xuICB2YXIgd2VhdGhlclRhYmxlID0ge307XG4gIHZhciBzb2lsVGFibGUgPSB7fTtcblxuICBmdW5jdGlvbiBjaGVja0RvbmUoKSB7XG4gICAgICByZXNwcysrO1xuICAgICAgaWYoIHJlc3BzID09IDIgJiYgY2FsbGJhY2sgKSBjYWxsYmFjayh7d2VhdGhlcjp3ZWF0aGVyVGFibGUsIHNvaWw6c29pbFRhYmxlfSk7XG4gIH1cblxuICBxLnNldFF1ZXJ5KCdTRUxFQ1QgKicpO1xuICBxLnNlbmQoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgIHdlYXRoZXJUYWJsZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuZ2V0RGF0YVRhYmxlKCkudG9KU09OKCkpO1xuICAgIGNoZWNrRG9uZSgpO1xuICB9KTtcblxuICB2YXIgdXJsID0gXCJodHRwOi8vYWxkZXIuYmlvZW5lcmd5LmNhc2lsLnVjZGF2aXMuZWR1OjgwODAvdml6c291cmNlL3Jlc3Q/dmlldz1wb2ludFRvU09JTChcIitsbmcrXCIsXCIrbGF0K1wiLDgxOTIpXCJcbiAgdmFyIHEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uUXVlcnkodXJsKTtcbiAgcS5zZXRRdWVyeSgnU0VMRUNUIConKTtcbiAgcS5zZW5kKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICBzb2lsVGFibGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmdldERhdGFUYWJsZSgpLnRvSlNPTigpKTtcbiAgICBjaGVja0RvbmUoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVDYWNoZVRpbGVVaUxpc3QoKSB7XG4gIGlmKCBjYWNoZWRUaWxlcy5sZW5ndGggPT0gMCApIHtcbiAgICAkKCcjc2VsZWN0LWxvY2F0aW9uLW9mZmxpbmUtbm9uZScpLnNob3coKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgbGlzdEVsZSA9ICQoJyNzZWxlY3QtbG9jYXRpb24tb2ZmbGluZS1saXN0JykuaHRtbCgnPGRpdj5TZWxlY3QgQ2FjaGVkIFRpbGU8L2Rpdj4nKSwgZWxlO1xuICAkKCcjc2VsZWN0LWxvY2F0aW9uLW9mZmxpbmUtbm9uZScpO1xuICBmb3IoIHZhciBpID0gMDsgaSA8IGNhY2hlZFRpbGVzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBqc29uID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGNhY2hlZFRpbGVQcmVmaXgrY2FjaGVkVGlsZXNbaV0pO1xuICAgIGpzb24gPSBKU09OLnBhcnNlKGpzb24pO1xuXG4gICAgZWxlID0gJCgnPGRpdj48YSBjYWNoZWlkPVwiJytpKydcIiBzdHlsZT1cImN1cnNvcjpwb2ludGVyXCI+JytjYWNoZWRUaWxlc1tpXSsnOiAnK2pzb24ubmFtZSsnPC9hPjwvZGl2PicpO1xuICAgIGVsZS5maW5kKCdhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBfcnVuQ2FjaGVkVGlsZShwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2NhY2hlaWQnKSkpO1xuICAgIH0pO1xuICAgIGxpc3RFbGUuYXBwZW5kKGVsZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBfcnVuQ2FjaGVkVGlsZShpbmRleCkge1xuICB2YXIganNvbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShjYWNoZWRUaWxlUHJlZml4K2NhY2hlZFRpbGVzW2luZGV4XSk7XG4gIGpzb24gPSBKU09OLnBhcnNlKGpzb24pO1xuXG4gIGZvciggdmFyIGkgPSAwOyBpIDwganNvbi53ZWF0aGVyLnJvd3MubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIG0gPSBpKycnO1xuICAgIGZvciggdmFyIGogPSAxOyBqIDwganNvbi53ZWF0aGVyLmNvbHMubGVuZ3RoOyBqKysgKSB7XG4gICAgICAkKFwiI2lucHV0LXdlYXRoZXItXCIrY29sc1tqXStcIi1cIitpKS52YWwoanNvbi53ZWF0aGVyLnJvd3NbaV0uY1tqXSA/IGpzb24ud2VhdGhlci5yb3dzW2ldLmNbal0udiA6IFwiXCIpO1xuICAgIH1cbiAgfVxuXG5cbiAgZm9yKCB2YXIgaSA9IDA7IGkgPCBqc29uLnNvaWwuY29scy5sZW5ndGg7IGkrKyApIHtcbiAgICBpZigganNvbi5zb2lsLnJvd3NbMF0gPT0gbnVsbCApIGNvbnRpbnVlO1xuICAgICQoXCIjaW5wdXQtc29pbC1cIitqc29uLnNvaWwuY29sc1tpXS5pZCkudmFsKGpzb24uc29pbC5yb3dzWzBdLmNbaV0udik7XG4gIH1cblxuICAkKFwiI3NlbGVjdC13ZWF0aGVyLW1vZGFsXCIpLm1vZGFsKCdoaWRlJyk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgIGFwcC5ydW5Nb2RlbCgpO1xuICB9LCA1MDApO1xufVxuXG5mdW5jdGlvbiBfbG9hZENhY2hlZFRpbGVzKCkge1xuICBjYWNoZWRUaWxlcyA9IFtdO1xuICBmb3IoIHZhciBrZXkgaW4gd2luZG93LmxvY2FsU3RvcmFnZSApIHtcbiAgICBpZigga2V5LmluZGV4T2YoY2FjaGVkVGlsZVByZWZpeCkgPiAtMSApIHtcbiAgICAgIGNhY2hlZFRpbGVzLnB1c2goa2V5LnJlcGxhY2UoY2FjaGVkVGlsZVByZWZpeCwnJykpO1xuICAgIH1cbiAgfVxuICBjYWNoZWRUaWxlc0xvYWRlZCA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVOYXZNZW51KCkge1xuICB2YXIgYnRuID0gJCgnPGxpIGNsYXNzPVwiZHJvcGRvd25cIj4nXG4gICAgICArICc8YSBjbGFzcz1cImRyb3Bkb3duLXRvZ2dsZVwiPk9GRkxJTkUgTU9ERTxiIGNsYXNzPVwiY2FyZXRcIj48L2I+PC9hPidcbiAgICAgICsgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJoZWxwXCI+PGkgY2xhc3M9XCJpY29uLXF1ZXN0aW9uLXNpZ25cIj48L2k+IEhlbHA8L2E+PC9saT4nXG4gICAgICArICc8bGk+PGEgaWQ9XCJhYm91dFwiPjxpIGNsYXNzPVwiaWNvbi1pbmZvLXNpZ25cIj48L2k+IEFib3V0PC9hPjwvbGk+J1xuICAgICAgKyAnPC91bD48L2xpPicpO1xuXG4gIC8vIHNldCBjbGljayBoYW5kbGVycyBmb3IgcG9wdXBcbiAgYnRuLmZpbmQoJ2EuZHJvcGRvd24tdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gIH0pO1xuXG4gIC8vIGFib3V0IGNsaWNrIGhhbmRsZXJcbiAgYnRuLmZpbmQoJyNhYm91dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGJ0bi50b2dnbGVDbGFzcygnb3BlbicpO1xuICAgICQoXCIjYWJvdXQtbW9kYWxcIikubW9kYWwoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgYnRuLmZpbmQoJyNoZWxwJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgYnRuLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgc2hvd0hlbHAoKTtcbiAgfSk7XG5cbiAgLy8gYWRkIG1lbnVcbiAgJChcIiNsb2dpbi1oZWFkZXJcIikuaHRtbChcIlwiKS5hcHBlbmQoYnRuKTtcbn07XG5cbmZ1bmN0aW9uIF9sb2FkRnJvbUNhY2hlKCkge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnY2FjaGUvanNhcGknLFxuICAgICAgICBkYXRhVHlwZTogXCJzY3JpcHRcIixcbiAgICAgICAgY2FjaGUgOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xuICAgICAgICAgICQoJ2hlYWQnKS5hcHBlbmQoICQoJzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiAvPicpLmF0dHIoJ2hyZWYnLCAnY2FjaGUvY2hhcnQuY3NzJykgKTtcbiAgICAgICAgICAkKCdoZWFkJykuYXBwZW5kKCAkKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgLz4nKS5hdHRyKCdocmVmJywgJ2NhY2hlL2Fubm90YXRlZHRpbWVsaW5lLmNzcycpICk7XG4gICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogJ2NhY2hlL2NoYXJ0LmpzJyxcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcInNjcmlwdFwiLFxuICAgICAgICAgICAgY2FjaGUgOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgY2hhcnRzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaWYoIGNoYXJ0c0NhbGxiYWNrICkgY2hhcnRzQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0IDogaW5pdCxcbiAgcmVuZGVyIDogcmVuZGVyLFxuICBjYWNoZVRpbGUgOiBjYWNoZVRpbGUsXG4gIHJlbmRlckNhY2hlZFRpbGVzT25NYXAgOiByZW5kZXJDYWNoZWRUaWxlc09uTWFwLFxuICBjbGVhckNhY2hlIDogY2xlYXJDYWNoZVxufTtcbiIsInZhciBhcHAgPSByZXF1aXJlKCcuL2FwcCcpO1xuXG4vLyBhZGQgc3ByZWFkc2hlZXQgdml6IHNvdXJjZVxuLy8gaHR0cHM6Ly9zcHJlYWRzaGVldHMuZ29vZ2xlLmNvbS90cT90cT1zZWxlY3QlMjAqJmtleT0wQXY3Y1VWLW8yUVFZZEhaRllXSk5OV3BSUzFoSVZXaEdRVGhsTFdad1pXYyZ1c3A9ZHJpdmVfd2ViI2dpZD0wXG5cbmZ1bmN0aW9uIGluaXQoKSB7XG52YXIgZHJvcFpvbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJvcF96b25lJyk7XG5kcm9wWm9uZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIF9oYW5kbGVEcmFnT3ZlciwgZmFsc2UpO1xuZHJvcFpvbmUuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIF9oYW5kbGVGaWxlU2VsZWN0LCBmYWxzZSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlcycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIF9oYW5kbGVGaWxlU2VsZWN0LCBmYWxzZSk7XG5cbiAgICAkKCcjc3ByZWFkc2hlZXQtd2VhdGhlci1pbnB1dC1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICBfaGFuZGxlR29vZ2xlU3ByZWFkc2hlZXQoKTtcbiAgICB9KTtcbiAgICAkKCcjc3ByZWFkc2hlZXQtd2VhdGhlci1pbnB1dCcpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpZiggZS53aGljaCA9PSAxMyApIF9oYW5kbGVHb29nbGVTcHJlYWRzaGVldCgpO1xuICAgIH0pO1xuXG4gICAgJCgnI3dlYXRoZXJSZWFkZXItbG9jYWxmaWxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnI3dlYXRoZXJSZWFkZXItbG9jYWxmaWxlLXBhbmVsJykudG9nZ2xlKCdzbG93Jyk7XG4gICAgfSk7XG4gICAgJCgnI3dlYXRoZXJSZWFkZXItc3ByZWFkc2hlZXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAkKCcjd2VhdGhlclJlYWRlci1zcHJlYWRzaGVldC1wYW5lbCcpLnRvZ2dsZSgnc2xvdycpO1xuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIF9oYW5kbGVHb29nbGVTcHJlYWRzaGVldCgpIHtcbiAgICBnYSgnc2VuZCcsICdldmVudCcsICd1aScsICdpbnRlcmFjdGlvbicsICdsb2FkLXdlYXRoZXItZHJpdmUtZmlsZScsIDEpO1xuXG4gICAgdmFyIHZhbCA9ICQoJyNzcHJlYWRzaGVldC13ZWF0aGVyLWlucHV0JykudmFsKCk7XG4gICAgaWYoIHZhbC5sZW5ndGggPT0gMCApIHJldHVybjtcblxuICAgIGlmKCAhdmFsLm1hdGNoKC9eaHR0cC4qLyApICkgdmFsID0gJ2h0dHBzOi8vJyt2YWw7XG5cbiAgICB2YXIgZmlsZVBhbmVsID0gbmV3IFdlYXRoZXJGaWxlKCk7XG4gICAgdmFyIHJvb3QgPSAkKFwiI2ZpbGVfbGlzdFwiKTtcbiAgICBmaWxlUGFuZWwuaW5pdEZyb21VcmwodmFsLCByb290KTtcbiAgICAkKCcjc3ByZWFkc2hlZXQtd2VhdGhlci1pbnB1dCcpLnZhbCgnJyk7XG59XG5cbmZ1bmN0aW9uIF9oYW5kbGVGaWxlU2VsZWN0KGV2dCkge1xuICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ3VpJywgJ2ludGVyYWN0aW9uJywgJ2xvYWQtd2VhdGhlci1sb2NhbC1maWxlJywgMSk7XG5cbiAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICB2YXIgZmlsZXMgPSBldnQuZGF0YVRyYW5zZmVyID8gZXZ0LmRhdGFUcmFuc2Zlci5maWxlcyA6IGV2dC50YXJnZXQuZmlsZXM7IC8vIEZpbGVMaXN0IG9iamVjdC5cblxuICAvLyBmaWxlcyBpcyBhIEZpbGVMaXN0IG9mIEZpbGUgb2JqZWN0cy4gTGlzdCBzb21lIHByb3BlcnRpZXMuXG4gIHZhciByb290ID0gJChcIiNmaWxlX2xpc3RcIik7XG4gIGZvciAodmFyIGkgPSAwLCBmOyBmID0gZmlsZXNbaV07IGkrKykge1xuICAgIHZhciBmaWxlUGFuZWwgPSBuZXcgV2VhdGhlckZpbGUoKTtcbiAgICBmaWxlUGFuZWwuaW5pdChmLCByb290KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfaGFuZGxlRHJhZ092ZXIoZXZ0KSB7XG5ldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5ldnQucHJldmVudERlZmF1bHQoKTtcbmV2dC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JzsgLy8gRXhwbGljaXRseSBzaG93IHRoaXMgaXMgYSBjb3B5LlxufVxuXG4vLyBvbiBhZGQsIGlmIHRoZSBsaXN0IGlzIGVtcHR5LCBsZXQncyBjbG9zZSB0aGUgcG9wdXBcbmZ1bmN0aW9uIF9vbkNvbXBsZXRlKCkge1xuICAgIGlmKCAkKFwiI2ZpbGVfbGlzdFwiKS5jaGlsZHJlbigpLmxlbmd0aCA9PSAwICkge1xuICAgICAgICAkKCcjd2VhdGhlclJlYWRlci1tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XG4gICAgfVxufVxuXG52YXIgV2VhdGhlckZpbGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGhlYWRlcnMgPSB7XG4gICAgICAgIGRhdGUgICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnRGF0ZScsXG4gICAgICAgICAgICB1bml0cyA6ICdEYXRlJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfSxcbiAgICAgICAgdG1pbiAgICAgOiB7XG4gICAgICAgICAgICBsYWJlbCA6ICdNaW4gVGVtcGVyYXR1cmUnLFxuICAgICAgICAgICAgdW5pdHMgOiAnQycsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHRtYXggICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnTWF4IFRlbXBlcmF0dXJlJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ0MnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICB0ZG1lYW4gICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ01lYW4gVGVtcGVyYXR1cmUnLFxuICAgICAgICAgICAgdW5pdHMgOiAnQycsXG4gICAgICAgICAgICBjb2wgICA6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIHBwdCAgICAgIDoge1xuICAgICAgICAgICAgbGFiZWwgOiAnUHJlY2lwaXRpb24nLFxuICAgICAgICAgICAgdW5pdHMgOiAnbW0nLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICByYWQgICAgICA6IHtcbiAgICAgICAgICAgIGxhYmVsIDogJ1JhZGlhdGlvbicsXG4gICAgICAgICAgICB1bml0cyA6ICdNSiBtLTIgZGF5LTEnLFxuICAgICAgICAgICAgY29sICAgOiAtMVxuICAgICAgICB9LFxuICAgICAgICBkYXlsaWdodCA6IHtcbiAgICAgICAgICAgIGxhbmVsIDogJ0RheWxpZ2h0IEhvdXJzJyxcbiAgICAgICAgICAgIHVuaXRzIDogJ2hvdXJzJyxcbiAgICAgICAgICAgIGNvbCAgIDogLTFcbiAgICAgICAgfVxuICAgIH07XG5cblxuICB2YXIgZWxlID0gJCgnPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGxlZnRcIj4nK1xuICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9idXR0b24+JytcbiAgICAgICc8ZGl2IGNsYXNzPVwiZmlsZW5hbWVcIj48L2Rpdj4nK1xuICAgICAgJzxkaXYgY2xhc3M9XCJwcm9ncmVzc1wiPicrXG4gICAgICAnPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhclwiIHJvbGU9XCJwcm9ncmVzc2JhclwiIGFyaWEtdmFsdWVub3c9XCIwXCIgYXJpYS12YWx1ZW1pbj1cIjBcIiBhcmlhLXZhbHVlbWF4PVwiMTAwXCIgc3R5bGU9XCJ3aWR0aDogMCU7XCI+JytcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwic3Itb25seVwiPjAlIENvbXBsZXRlPC9zcGFuPicrXG4gICAgICAnPC9kaXY+JytcbiAgICAnPC9kaXY+JytcbiAgICAgICc8ZGl2IGNsYXNzPVwic3RhdHVzXCI+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGUtcmFuZ2VcIj48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicHJldmlldy1kYXRhXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdj48YSBjbGFzcz1cImJ0biBidG4tbGluayBwcmV2aWV3LWRhdGEtYnRuXCI+UHJldmlldyBEYXRhPC9hPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicHJldmlldy1kYXRhLXRhYmxlXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY29sLXN0YXR1c1wiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBzdHlsZT1cImhlaWdodDo1MHB4XCI+JytcbiAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiYnRuIGJ0bi1saW5rIG1hcC1kYXRhLWJ0blwiPk1hcCBDU1YgQ29sdW1uczwvYT4nK1xuICAgICAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgZGlzYWJsZWQgcHVsbC1yaWdodFwiPkFkZCBEYXRhPC9hPicrXG4gICAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAnPC9kaXY+Jyk7XG5cbiAgdmFyIGRhdGEgPSB7fTtcbiAgICB2YXIgY3N2VGFibGUgPSBbXTtcblxuICAgIC8vIG9ubHkgYXV0byBoaWRlIHRoZSBmaXJzdCB0aW1lXG4gICAgdmFyIGF1dG9IaWRlID0gdHJ1ZTtcblxuICAvLyB0aGUgZmlsZSByZWFkZXIgb2JqZWN0IGFuZCB0aGUgZWxlbWVudFxuICBmdW5jdGlvbiBpbml0KGZpbGUsIHJvb3RFbGUpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICByZWFkZXIub25lcnJvciA9IGVycm9ySGFuZGxlcjtcbiAgICByZWFkZXIub25wcm9ncmVzcyA9IHVwZGF0ZVByb2dyZXNzO1xuICAgIHJlYWRlci5vbmxvYWRzdGFydCA9IGZ1bmN0aW9uKGUpIHt9O1xuICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XG4gICAgICBlbGUuZmluZCgnLnByb2dyZXNzJykucmVtb3ZlKCk7XG4gICAgICBwYXJzZShlLnRhcmdldC5yZXN1bHQpO1xuICAgIH1cbiAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlKVxuXG4gICAgZWxlLmZpbmQoJy5maWxlbmFtZScpLmh0bWwoZ2V0TmFtZShmaWxlKSk7XG4gICAgcm9vdEVsZS5hcHBlbmQoZWxlKTtcblxuICAgICAgICBfc2V0SGFuZGxlcnMoKTtcbiAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdEZyb21VcmwodXJsLCByb290RWxlKSB7XG4gICAgICAgIHZhciBxID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLlF1ZXJ5KHVybCk7XG4gICAgICAgIGVsZS5maW5kKCcucHJvZ3Jlc3MnKS5odG1sKCdRdWVyeWluZyBzcHJlYWRzaGVldC4uLicpO1xuXG4gICAgICAgIHZhciBrZXkgPSBnZXRLZXkodXJsKTtcbiAgICAgICAgZWxlLmZpbmQoJy5maWxlbmFtZScpLmh0bWwoJzxoMyBzdHlsZT1cImJvcmRlci1ib3R0b206MXB4IHNvbGlkICNlZWU7cGFkZGluZzoxNXB4IDAgNHB4IDBcIj48aSBjbGFzcz1cImljb24tdGludFwiPjwvaT4gJytcbiAgICAgICAgICAgICdHb29nbGUgU3ByZWFkc2hlZXQnKyhrZXkubGVuZ3RoID4gMCA/ICc8YnIgLz48c3BhbiBzdHlsZT1cImNvbG9yOiM4ODg7Zm9udC1zaXplOjE0cHhcIj4nK2tleSsnPC9zcGFuPicgOiAnJykrJzwvaDM+Jyk7XG5cbiAgICAgICAgcm9vdEVsZS5hcHBlbmQoZWxlKTtcblxuICAgICAgICBxLnNldFF1ZXJ5KCdTRUxFQ1QgKicpO1xuICAgICAgICBxLnNlbmQoZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5wcm9ncmVzcycpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuaXNFcnJvcigpKSB7XG4gICAgICAgICAgICAgICAgc2V0RXJyb3IoJ0Vycm9yIGluIHF1ZXJ5OiAnICsgcmVzcG9uc2UuZ2V0TWVzc2FnZSgpICsgJyAnICsgcmVzcG9uc2UuZ2V0RGV0YWlsZWRNZXNzYWdlKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGFyc2UoZHRUb0NzdihyZXNwb25zZS5nZXREYXRhVGFibGUoKSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBfc2V0SGFuZGxlcnMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfc2V0SGFuZGxlcnMoKSB7XG4gICAgICAgIGVsZS5maW5kKCcubWFwLWRhdGEtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVsZS5maW5kKCcuY29sLXN0YXR1cycpLnRvZ2dsZSgnc2xvdycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlbGUuZmluZCgnLnByZXZpZXctZGF0YS1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEtdGFibGUnKS50b2dnbGUoJ3Nsb3cnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlLmZpbmQoJy5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBlbGUucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsZS5maW5kKCcuYnRuLXN1Y2Nlc3MnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgYXBwLnNldFdlYXRoZXIoZGF0YSk7XG4gICAgICAgICAgICBlbGUucmVtb3ZlKCk7XG4gICAgICAgICAgICBfb25Db21wbGV0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkdFRvQ3N2KGR0KSB7XG4gICAgICAgIHZhciBhcnIgPSBbW11dO1xuXG4gICAgICAgIGR0ID0gSlNPTi5wYXJzZShkdC50b0pTT04oKSk7XG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZHQuY29scy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGFyclswXS5wdXNoKGR0LmNvbHNbaV0ubGFiZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBkdC5yb3dzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgYXJyLnB1c2goW10pO1xuICAgICAgICAgICAgZm9yKCB2YXIgaiA9IDA7IGogPCBkdC5yb3dzW2ldLmMubGVuZ3RoOyBqKysgKSB7XG4gICAgICAgICAgICAgICAgaWYoICFkdC5yb3dzW2ldLmNbal0gKSBhcnJbaSsxXS5wdXNoKCcnKTtcbiAgICAgICAgICAgICAgICBlbHNlIGFycltpKzFdLnB1c2goZHQucm93c1tpXS5jW2pdLnYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNzdiA9ICcnO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGNzdiArPSBhcnJbaV0uam9pbignLCcpKydcXG4nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNzdjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRLZXkodXJsKSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IHVybC5zcGxpdCgnPycpO1xuICAgICAgICBpZiggcGFydHMubGVuZ3RoID09IDEgKSByZXR1cm4gJyc7XG5cbiAgICAgICAgcGFydHMgPSBwYXJ0c1sxXS5zcGxpdCgnJicpO1xuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgaWYoIHBhcnRzW2ldLnNwbGl0KCc9JylbMF0gPT0gJ2tleScgKSByZXR1cm4gcGFydHNbaV0uc3BsaXQoJz0nKVsxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gIGZ1bmN0aW9uIGdldE5hbWUoZikge1xuICAgIHJldHVybiBbJzxoMyBzdHlsZT1cImJvcmRlci1ib3R0b206MXB4IHNvbGlkICNlZWU7cGFkZGluZzoxNXB4IDAgNHB4IDBcIj48aSBjbGFzcz1cImljb24tdGludFwiPjwvaT4gJywgZi5uYW1lLFxuICAgICAgICAgICAgICAgICcgPHNwYW4gc3R5bGU9XCJjb2xvcjojODg4O2ZvbnQtc2l6ZToxNnB4XCI+KCcsIGYudHlwZSB8fCAnbi9hJyxcbiAgICAgICAgICAgICAgICAnKTwvc3Bhbj4gLSA8c3BhbiBzdHlsZT1cImZvbnQtc2l6ZToxNnB4XCI+JywgZi5zaXplLCAnIGJ5dGVzPC9zcGFuPicsICc8L2gzPiddLmpvaW4oJycpO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2UoZGF0YSkge1xuICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UoL15cXHMqXFxuL2csJycpLnNwbGl0KCdcXG4nKTtcblxuICAgIHZhciB0YWJsZSA9IFtdO1xuICAgIGZvciggdmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHRhYmxlLnB1c2goZGF0YVtpXS5zcGxpdCgnLCcpKTtcbiAgICB9XG5cbiAgICAgICAgaWYoIHRhYmxlLmxlbmd0aCA9PSAwICkgcmV0dXJuIHNldEVycm9yKCdGaWxlIGRpZCBub3QgY29udGFpbiBhbnkgaW5mb3JtYXRpb24uJyk7XG4gICAgICAgIGNzdlRhYmxlID0gdGFibGU7XG5cbiAgICAgICAgcGFyc2VIZWFkZXIodGFibGVbMF0pO1xuICAgICAgICBnZXREYXRlUmFuZ2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXRlUmFuZ2UoKSB7XG4gICAgICAgIGVsZS5maW5kKCcuZGF0ZS1yYW5nZScpLmh0bWwoJycpO1xuICAgICAgICBpZiggaGVhZGVycy5kYXRlLmNvbCA9PSAtMSApIHJldHVybiBlbGUuZmluZCgnLmRhdGUtcmFuZ2UnKS5odG1sKCdEYXRlIGNvbHVtbiBuZWVkcyB0byBiZSBtYXRjaGVkLicpO1xuICAgICAgICBpZiggdHlwZW9mIGhlYWRlcnMuZGF0ZS5jb2wgPT0gJ3N0cmluZycgKSBoZWFkZXJzLmRhdGUuY29sID0gcGFyc2VJbnQoaGVhZGVycy5kYXRlLmNvbCk7XG5cbiAgICAgICAgdmFyIGRhdGVzID0ge307XG4gICAgICAgIHZhciBkaXNwbGF5RGF0ZXMgPSBbXTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDE7IGkgPCBjc3ZUYWJsZS5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGlmKCBoZWFkZXJzLmRhdGUuY29sIDwgY3N2VGFibGVbaV0ubGVuZ3RoICYmIGNzdlRhYmxlW2ldLmxlbmd0aCA+PSA3ICnCoHtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IGNzdlRhYmxlW2ldW2hlYWRlcnMuZGF0ZS5jb2xdLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgICAgICAgICBpZiggcC5sZW5ndGggIT0gMyAmJiBwLmxlbmd0aCAhPSAyICkgcmV0dXJuIHNldEVycm9yKFwiRGF0ZTogXCIrY3N2VGFibGVbaV1baGVhZGVycy5kYXRlLmNvbF0rXCIgaXMgbm90IGEgdmFsaWQgZm9ybWF0ICh5eXl5LW1tLWRkIG9yIHl5eXktbW0pXCIpO1xuXG4gICAgICAgICAgICAgICAgaWYoICFkYXRlc1twWzBdXSApIGRhdGVzW3BbMF1dID0gW107XG4gICAgICAgICAgICAgICAgdmFyIG1tZGQgPSBwWzFdO1xuXG4gICAgICAgICAgICAgICAgaWYoIGRhdGVzW3BbMF1dLmluZGV4T2YobW1kZCkgIT0gLTEgKSByZXR1cm4gc2V0RXJyb3IoXCJEYXRlOiBcIitjc3ZUYWJsZVtpXVtoZWFkZXJzLmRhdGUuY29sXStcIiBpcyBpbiBkYXRhc2V0IHR3aWNlXCIpO1xuICAgICAgICAgICAgICAgIGRhdGVzW3BbMF1dLnB1c2gobW1kZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoIHZhciB5ZWFyIGluIGRhdGVzICkge1xuICAgICAgICAgICAgaWYoIGRhdGVzW3llYXJdLmxlbmd0aCA9PSAxMikge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRlcy5wdXNoKHllYXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0ZXMucHVzaCh5ZWFyKycgWycrZGF0ZXNbeWVhcl0uam9pbignLCAnKSsnXScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWxlLmZpbmQoJy5kYXRlLXJhbmdlJykuaHRtbCgnPGI+RGF0ZSBSYW5nZTo8L2I+ICcrZGlzcGxheURhdGVzLmpvaW4oJywgJykpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlSGVhZGVyKGhlYWRlclJvdykge1xuICAgICAgICB2YXIgbWF0Y2hlZCA9IFtdO1xuXG4gICAgICAgIHZhciBodG1sID0gJzx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIj4nO1xuICAgICAgICBodG1sICs9ICc8dHI+PHRoPktleTwvdGg+PHRoPkNvbHVtbiAjPC90aD48L3RyPic7XG5cbiAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKSB7XG4gICAgICAgICAgICBpZiggaGVhZGVyUm93LmluZGV4T2Yoa2V5KSAhPSAtMSApIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzW2tleV0uY29sID0gaGVhZGVyUm93LmluZGV4T2Yoa2V5KTtcbiAgICAgICAgICAgICAgICBtYXRjaGVkLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+PHRkPicra2V5Kyc8L3RkPjx0ZD48c3BhbiBjbGFzcz1cImxhYmVsIGxhYmVsLXN1Y2Nlc3NcIj4nK2hlYWRlcnNba2V5XS5jb2wrJyA8aSBjbGFzcz1cImljb24tb2tcIj48L2k+PC9zcGFuPjwvdGQ+PC90cj4nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+PHRkPicra2V5Kyc8L3RkPjx0ZD48c2VsZWN0IGNsYXNzPVwic2VsZWN0LScra2V5KydcIlwiPjwvc2VsZWN0PjwvdGQ+PC90cj4nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsZS5maW5kKCcuY29sLXN0YXR1cycpLmh0bWwoaHRtbCsnPC90YWJsZT4nKTtcblxuXG4gICAgICAgIGlmKCBtYXRjaGVkLmxlbmd0aCAhPSA3ICkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHNlbGVjdCBlbGVtZW50IGZvciBtaXNzaW5nIGNvbCdzXG4gICAgICAgICAgICBlbGUuZmluZCgnLnN0YXR1cyBzZWxlY3QnKS5hcHBlbmQoJCgnPG9wdGlvbiB2YWx1ZT1cIlwiPltTZWxlY3QgQ29sdW1uXTwvb3B0aW9uPicpKTtcblxuICAgICAgICAgICAgLy8gaWYgaXQncyByYWRpYXRpb24sIGFkZCBvcHRpb24gZm9yIGNhbGN1bGF0aW5nXG4gICAgICAgICAgICAvLyBUT0RPXG5cbiAgICAgICAgICAgIC8vIGFwcGVuZCBtaXNzaW5nIGNvbHNcbiAgICAgICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgaGVhZGVyUm93Lmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgICAgIGlmKCBtYXRjaGVkLmluZGV4T2YoaGVhZGVyUm93W2ldKSA9PSAtMSApIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlLmZpbmQoJy5zdGF0dXMgc2VsZWN0JykuYXBwZW5kKCQoJzxvcHRpb24gdmFsdWU9XCInK2krJ1wiPicraSsnIC0gJytoZWFkZXJSb3dbaV0rJzwvb3B0aW9uPicpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgY2hhbmdlIGhhbmRsZXJzIGZvciB0aGUgc2VsZWN0b3JzXG4gICAgICAgICAgICBlbGUuZmluZCgnLnN0YXR1cyBzZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykuYXR0cigndmFsdWUnKTtcbiAgICAgICAgICAgICAgICBpZiggdmFsICE9ICcnICkgaGVhZGVyc1t0aGlzLmNsYXNzTmFtZS5yZXBsYWNlKC9zZWxlY3QtLywnJyldLmNvbCA9IHZhbDtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGFsbCBjb2x1bW5zIGFyZSBzZXQsIHJlbW92ZSBkaXNhYmxlZCBmcm9tIGJ0blxuICAgICAgICAgICAgICAgIHZhciByZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9yKCB2YXIga2V5IGluIGhlYWRlcnMgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBoZWFkZXJzW2tleV0uY29sID09IC0xICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoIHJlYWR5ICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggYXV0b0hpZGUgKSBlbGUuZmluZCgnLmNvbC1zdGF0dXMnKS5oaWRlKCdzbG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIG9uUmVhZHkoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0ge307XG4gICAgICAgICAgICAgICAgICAgIGVsZS5maW5kKCcuYnRuLXN1Y2Nlc3MnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHNob3cgdGhlIHRhYmxlXG4gICAgICAgICAgICBlbGUuZmluZCgnLmNvbC1zdGF0dXMnKS5zaG93KCdzbG93Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvblJlYWR5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblJlYWR5KCkge1xuICAgICAgICBhdXRvSGlkZSA9IGZhbHNlO1xuICAgICAgICBlbGUuZmluZCgnLmJ0bi1zdWNjZXNzJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgIHNldERhdGEoKTtcbiAgICAgICAgc2V0UHJldmlldygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFByZXZpZXcoKSB7XG4gICAgICAgIGVsZS5maW5kKCcucHJldmlldy1kYXRhJykuc2hvdygpO1xuXG4gICAgICAgIHZhciBodG1sID0gJzx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIj48dHI+PHRoPmRhdGU8L3RoPic7XG4gICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICl7XG4gICAgICAgICAgICBpZigga2V5ID09ICdkYXRlJyApIGNvbnRpbnVlO1xuICAgICAgICAgICAgaHRtbCArPSAnPHRoPicra2V5Kyc8L3RoPic7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYyA9IDA7XG4gICAgICAgIGZvciggdmFyIGRhdGUgaW4gZGF0YSApe1xuICAgICAgICAgICAgaWYoIGMgPT0gMTAgKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZCBjb2xzcGFuPVwiN1wiIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXJcIj4uLi48L3RkPjwvdHI+JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZD4nK2RhdGUrJzwvdGQ+JztcbiAgICAgICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICl7XG4gICAgICAgICAgICAgICAgaWYoIGtleSA9PSAnZGF0ZScgKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dGQ+JytkYXRhW2RhdGVdW2tleV0rJzwvdGQ+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGh0bWwgKz0gJzwvdHI+JztcblxuICAgICAgICAgICAgYysrO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlLmZpbmQoJy5wcmV2aWV3LWRhdGEtdGFibGUnKS5odG1sKGh0bWwpO1xuICAgIH1cblxuICAvLyBzZXQgdGhlIG1hcCBvZiBjc3YgaGVhZGVyc1xuICBmdW5jdGlvbiBzZXREYXRhKCkge1xuICAgICAgICBkYXRhID0ge307XG4gICAgICAgIGZvciggdmFyIGkgPSAxOyBpIDwgY3N2VGFibGUubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBpZiggY3N2VGFibGVbaV0ubGVuZ3RoIDwgNyApIGNvbnRpbnVlOyAvLyBiYWQgcm93XG5cbiAgICAgICAgICAgIHZhciBkYXRlID0gY3N2VGFibGVbaV1baGVhZGVycy5kYXRlLmNvbF07XG5cbiAgICAgICAgICAgIGlmKCAhZGF0ZSApIGNvbnRpbnVlOyAvLyBiYWQgcm93XG5cbiAgICAgICAgICAgIGlmKCBkYXRlLnNwbGl0KCctJykubGVuZ3RoID09IDMgKSBkYXRlID0gZGF0ZS5zcGxpdChcIi1cIikuc3BsaWNlKDAsMikuam9pbihcIi1cIik7XG4gICAgICAgICAgICBkYXRhW2RhdGVdID0ge307XG5cbiAgICAgICAgICAgIGZvciggdmFyIGtleSBpbiBoZWFkZXJzICkge1xuICAgICAgICAgICAgICAgIGlmKCBrZXkgPT0gJ2RhdGUnICkgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBkYXRhW2RhdGVdW2tleV0gPSBwYXJzZUZsb2F0KGNzdlRhYmxlW2ldW2hlYWRlcnNba2V5XS5jb2xdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlUHJvZ3Jlc3MoZXZ0KSB7XG4gICAgLy8gZXZ0IGlzIGFuIFByb2dyZXNzRXZlbnQuXG4gICAgaWYgKGV2dC5sZW5ndGhDb21wdXRhYmxlKSB7XG4gICAgICAgIHZhciBwZXJjZW50TG9hZGVkID0gTWF0aC5yb3VuZCgoZXZ0LmxvYWRlZCAvIGV2dC50b3RhbCkgKiAxMDApO1xuICAgICAgICBlbGUuZmluZCgnLnByb2dyZXNzLWJhcicpLmF0dHIoJ2FyaWEtdmFsdWVub3cnLHBlcmNlbnRMb2FkZWQpLndpZHRoKHBlcmNlbnRMb2FkZWQrXCIlXCIpO1xuICAgICAgICBlbGUuZmluZCgnLnNyLW9ubHknKS5odG1sKE1hdGguY2VpbChwZXJjZW50TG9hZGVkKSsnJSBDb21wbGV0ZScpO1xuICAgIH1cbn1cblxuICBmdW5jdGlvbiBlcnJvckhhbmRsZXIoZXZ0KSB7XG4gICAgc3dpdGNoKGV2dC50YXJnZXQuZXJyb3IuY29kZSkge1xuICAgICAgY2FzZSBldnQudGFyZ2V0LmVycm9yLk5PVF9GT1VORF9FUlI6XG4gICAgICAgIHNldEVycm9yKCdGaWxlIE5vdCBGb3VuZCEnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGV2dC50YXJnZXQuZXJyb3IuTk9UX1JFQURBQkxFX0VSUjpcbiAgICAgICAgc2V0RXJyb3IoJ0ZpbGUgaXMgbm90IHJlYWRhYmxlJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBldnQudGFyZ2V0LmVycm9yLkFCT1JUX0VSUjpcbiAgICAgICAgYnJlYWs7IC8vIG5vb3BcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHNldEVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCByZWFkaW5nIHRoaXMgZmlsZS4nKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0RXJyb3IobXNnKSB7XG4gICAgICBlbGUuZmluZCgnLnN0YXR1cycpLmh0bWwoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXJcIj4nK21zZysnPC9kaXY+Jyk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXQgOiBpbml0LFxuICAgIGluaXRGcm9tVXJsIDogaW5pdEZyb21VcmxcbiAgfTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXQgOiBpbml0XG59O1xuIl19
