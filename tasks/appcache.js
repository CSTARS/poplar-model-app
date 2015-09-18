'use strict';


module.exports = function(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-appcache');

    // Options
    return {
        options: {
          basePath: 'dist'
        },
        all: {
          dest: 'dist/manifest.appcache',
          cache: {
            patterns : [
                'dist/scripts/*',
                'dist/styles/*',
                'dist/images/*',
                'dist/*.png',
                'dist/cache/*'
            ],
            literals : [
                'app.html',
                'bower_components/requirejs/require.js',
                'bower_components/font-awesome/css/font-awesome.min.css',
                'bower_components/font-awesome/font/fontawesome-webfont.svg?v=3.2.1',
                'bower_components/font-awesome/font/fontawesome-webfont.ttf?v=3.2.1',
                'bower_components/font-awesome/font/fontawesome-webfont.woff?v=3.2.1',
            ]
          },
          network : [
            'https://www.google.com/jsapi',
            'https://www.google.com/',
            'https://apis.google.com/',
            '*'
          ]
        }
    };
};
