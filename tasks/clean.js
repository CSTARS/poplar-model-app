'use strict';


module.exports = function(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Options
    return {
      dist: {
        files: [{
            dot: true,
            src: [
                '.tmp',
                './phonegap/3pg-model/www/dist',
                '<%= yeoman.dist %>/*',
                '!<%= yeoman.dist %>/.git*'
            ]
        }]
      },
      server: '.tmp'
    };
};
