'use strict';

module.exports = {
    // Watches files for changes and runs tasks based on the changed files
    watch: {
        /**
         * When our JavaScript source files change, we want to run lint them and
         * run our unit tests.
         */
        jssrc: {
            files: ['<%= lib_files.js %>'],
            tasks: [ 'jshint:src']
        },

        jsTest: {
            files: ['<%= lib_files.jsunit %>'],
            tasks: ['jshint:test'/*, 'test-runner'*/]
        }
    },
    jshint: {
        src: {
            src: ['<%= lib_files.js %>'],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },
        test: {
            src: ['<%= lib_files.jsunit %>'],
            options: {
                jshintrc: 'test/.jshintrc',
                reporter: require('jshint-stylish')
            }
        },
        grunt: {
            src: ['Gruntfile.js', 'grunt.settings.js', 'grunt.tasks.js'],
            options: {
                node: true,
                esnext: true,
                bitwise: true,
                camelcase: false,
                curly: true,
                eqeqeq: true,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                quotmark: 'single',
                regexp: true,
                undef: true,
                strict: true,
                trailing: true,
                smarttabs: true,
                globals: {}
            }
        }
    },
    jasmine_node: {
        options: {
            forceExit: true,
            match: '.',
            matchall: false,
            extensions: 'js',
            specNameMatcher: 'spec'
        },
        all: {}
    }
};
