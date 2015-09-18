'use strict';


module.exports = function(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Options
    return {
        dist: {
            files: [{
                expand: true,
                dot: true,
                cwd: '<%= yeoman.app %>',
                dest: '<%= yeoman.dist %>',
                src: [
                    '*.{ico,png,txt}',
                    '.htaccess',
                    'cache/*',
                    'images/{,*/}*.{webp,gif}',
                    'styles/fonts/{,*/}*.*',
                    'bower_components/sass-bootstrap/fonts/*.*',
                    'bower_components/font-awesome/css/*.*',
                    'bower_components/font-awesome/font/*.*'
                ]
            }]
        },
        styles: {
            expand: true,
            cwd: '<%= yeoman.app %>',
            dest: '.tmp/styles/',
            src: [
                    'styles/{,*/}*.css',
                 ]
        },
        phonegap : {
            files: [{
                expand : true,
                cwd: '.',
                dest: './phonegap/3pg-model/www',
                src : [
                    './dist/**'
                ]
            }]
        },
        // phonegap doesn't handle icons for local builds, this is a hack to fix
        phonegapIcons : {
            files: [{
                expand : true,
                cwd: './phonegap/3pg-model/icons/android',
                dest: './phonegap_build/platforms/android',
                src : [
                    'res/{,*/}/*.*',
                ]
            }]
        }
    };
};
