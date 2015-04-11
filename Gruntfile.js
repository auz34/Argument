'use strict';

module.exports = function (grunt) {

    /*
     Load npm tasks here.
     */
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jasmine-node');

    var userConfig = require( './grunt.settings.js' );
    userConfig.pkg = grunt.file.readJSON('package.json');


    var taskConfig = require( './grunt.tasks.js' );
    grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

    /*
     Register tasks here
     */

    grunt.registerTask('checkAll',
        ['jshint', 'jasmine_node'/*,test-runner*/]);


    grunt.registerTask('buildAll', [
        /*'clean',*/
        'checkAll'
        /*concat, minify, etc*/
    ]);
};
