'use strict';


module.exports = function(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-appcache');

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
                'dist/cache/*',
                'dist/font/*',
            ],
            literals : [
                'app.html'
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
