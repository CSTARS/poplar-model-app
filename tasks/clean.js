'use strict';


module.exports = function(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Options
    return {
      dist: [
        '.tmp',
        './phonegap/3pg-model/www/dist',
        'dist'
      ]
    };
};
