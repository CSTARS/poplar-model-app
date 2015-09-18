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
                cwd: 'app',
                dest: 'dist/',
                src: [
                    '*.{ico,png,txt,html}',
                    '.htaccess',
                    'cache/*',
                    'images/*.*',
                ]
            },{
                expand: true,
                dot: true,
                cwd: 'app/bower_components/font-awesome/',
                dest: 'dist/',
                src: [
                    'font/*.*'
                ]
            }]
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
