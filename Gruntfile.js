// Generated on 2013-10-17 using generator-webapp 0.4.3
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load the project's grunt tasks from a directory
    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve('tasks')
    });


    // grunt-config-dir does not play nice with usemin
    // so manually loading usemin lib's and setting config here
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.config.merge({
        useminPrepare: {
            html: ['app/index.html'],
            options: {
              dest: 'dist',
              verbose: true
            }
        },
        usemin: {
            html: ['dist/index.html'],
            options: {
              assetsDirs: ['dist']
            }
        }
    });


    grunt.registerTask('build', [
        'clean:dist',
        'copy:dist',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'usemin',
        'appcache:all'
    ]);

    grunt.registerTask('buildphone', [
        'build',
        'copy:phonegap',
        'phonegap:build',
        // if this is your first time building, you will need to run
        // build again or icons will not show :/
        'copy:phonegapIcons'
    ]);
};
