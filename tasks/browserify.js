'use strict';


module.exports = function browserify(grunt) {
  // Load task
  grunt.loadNpmTasks('grunt-browserify');

  var files = {
    'app/scripts/app.js': ['jslib/app.js']
  };

  var browserifyOptions = {
    debug : true, // include source maps
    standalone : 'PoplarApp'
  };

  // Options
  return {
    build: {
      files: files,
      options: {
        browserifyOptions : browserifyOptions
      }
    },
    watch : {
      files: files,
      options: {
        browserifyOptions : browserifyOptions,
        keepAlive : true,
        watch : true,
        debug : true
      }
    }
  };
};
