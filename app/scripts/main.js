window.hideInitLoading = null;
function initLoading() {
    var panel = $("<div class='init-loading-outer'><div class='init-loading'><i class='icon-spinner icon-spin'></i> Initializing from Google Drive...</div></div>");
    $("body").append(panel);
    setTimeout(function(){
        panel.css("opacity",".9");
    },50);

    window.hideInitLoading = function() {
        $(".init-loading-outer").css("opacity","0");
        setTimeout(function(){
            $(".init-loading-outer").remove();
            window.hideInitLoading = null;
        },500);
    }
}

onChartsLoadedFired = false;
function onChartsLoaded() {
    if( onChartsLoadedFired ) return;
    onChartsLoadedFired = true;

  $("#status").html("3pg model");

  var version = PoplarApp.qs("version");
  var devmode = PoplarApp.qs("devmode");

        // TODO
        //if( devmode ) app.devmode = true;

  $("#status").html("3pg data");
  $("body").html("").load("app.html", function(){
    PoplarApp.init(function(){
        if( offlineMode ) {
            offline.render();
        } else {
            PoplarApp.gdrive.init(function(){
                var file = PoplarApp.qs("file");
                if( file ) {
                    PoplarApp.gdrive.load(file, initLoading);
                }
                // see if we are loading for google drive
                var state = PoplarApp.qs("state");
                if( state ) {
                    state = JSON.parse(state);
                    initLoading();
                    PoplarApp.gdrive.load(state.ids[0], initLoading);
                }
            });
        }
    });
  });

}

if( chartsLoaded ) {
    onChartsLoaded();
} else {
    chartsCallback = onChartsLoaded;
}

window.showAbout = function(){
    $("#about-modal").modal('show');
};

window.showHelpInit = false;
window.showHelp = function() {
  $("#help-modal").modal('show');
  if( !showHelpInit ) {
      showHelpInit = true;
      setTimeout(function(){
          $("#videoRoot").html('<iframe width="560" height="315" src="//www.youtube.com/embed/CjMs8lDPqbw" frameborder="0" allowfullscreen></iframe>');
      }, 500);
  }
};

// override the log function
window.log = function(msg) {
  if( app.debug ) console.log(msg);
};

if( offlineMode ) offline.init();
