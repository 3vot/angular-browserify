'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically.
  require('load-grunt-tasks')(grunt);

  // Time grunt tasks.
  require('time-grunt')(grunt);

  grunt.initConfig({

    // Browseriy app code.
    browserify: {
      options: {
        transform: [ 'brfs' ]
      },
      app: {
        src  : 'app/js/bootstrap.js',
        dest : '.tmp/js/app.js'
      }
    },

    // Launch web server/
    connect: {
      options: {
        port       : 1717,
        hostname   : 'localhost',
        livereload : 35729
      },
      livereload: {
        options: {
          open : true,
          base : [ '.tmp', 'app' ]
        }
      }
    },

    // Watch files for changes and run tasks.
    watch: {
      browserify: {
        files : [ 'app/js/**/*.js' ],
        tasks : [ 'browserify' ]
      },
      livereload: {
        options: {
          livereload : '<%= connect.options.livereload %>'
        },
        files: [
          '<%= browserify.app.dest %>',
          'app/**/*.html'
        ]
      }
    }
  });

  // Start development server.
  grunt.registerTask('serve', [
    'browserify',
    'connect:livereload',
    'watch'
  ]);
};