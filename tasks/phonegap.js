'use strict';


module.exports = function(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-phonegap');

    // Options
    return {
        config: {
          root: 'phonegap/3pg-model/www',
          config: 'phonegap/3pg-model/www/config.xml',
          cordova: 'phonegap/3pg-model/.cordova',
          path: 'phonegap_build',
          //plugins: ['/local/path/to/plugin', 'http://example.com/path/to/plugin.git'],
          plugins: ['org.apache.cordova.inappbrowser'],
          platforms: ['android'],
          verbose: true
        }
    };
};
