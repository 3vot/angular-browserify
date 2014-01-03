'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically.
  require('load-grunt-tasks')(grunt);

  // Time grunt tasks.
  require('time-grunt')(grunt);

  grunt.initConfig({

    // Browseriy app code.
    browserify: {
      app: {
        src  : 'app/js/bootstrap.js',
        dest : '.tmp/js/app.js'
      }
    },

    // Copy files to build.
    copy: {
      index: {
        src  : 'app/index.html',
        dest : 'dist/index.html'
      },
      app: {
        src  : '.tmp/js/app.js',
        dest : 'dist/js/app.js'
      }
    },

    // Concatenate inlined templates with app code.
    concat: {
      app: {
        src  : [ '.tmp/js/app.js', '.tmp/js/templates.js' ],
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
      build: {
        options: {
          open : true,
          base : 'dist'
        }
      },
      livereload: {
        options: {
          open : true,
          base : [ '.tmp', 'app' ]
        }
      }
    },

    // Concatenate angular templates.
    ngtemplates: {
      app: {
        options: {
          module : '3votApp',
        },
        cwd  : 'app',
        src  : 'templates/**/*.html',
        dest : '.tmp/js/templates.js'
      }
    },

    // Watch files for changes and run tasks.
    watch: {
      browserify: {
        files : [ 'app/js/**/*.js' ],
        tasks : [ 'browserify' ]
      },
      ngtemplates: {
        files : [ 'app/<%= ngtemplates.app.src %>' ],
        tasks : [ 'browserify', 'templates' ]
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

  // Minify templates.
  grunt.registerTask('templates', [
    'ngtemplates',
    'concat'
  ]);

  // Start development server.
  grunt.registerTask('serve', function (target) {

    if (target === 'build') {
      return grunt.task.run([ 'build', 'connect:build:keepalive' ]);
    }

    grunt.task.run([
      'browserify',
      'templates',
      'connect:livereload',
      'watch'
    ]);
  });

  // Build application.
  grunt.registerTask('build', [
    'browserify',
    'templates',
  ]);
};