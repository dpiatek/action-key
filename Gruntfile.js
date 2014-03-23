module.exports = function(grunt) {

  // Config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      src: {
        files: ['js/**/*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      }
    },

    jshint: {
      src: [
        'js/**/*.js',
        'Gruntfile.js'
      ]
    },

    preprocess: {
      build: {
        src: 'index.html',
        options: {
          inline: true,
          context: {
            APP_DEV: false
          }
        }
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    copy: {
      main: {
        src: ['index.html'],
        dest: 'build/'
      },
      js: {
        expand: true,
        flatten: true,
        src: [
          'bower_components/jquery/jquery.min.js'
        ],
        dest: 'build/js/vendor/'
      }
    },

    clean: ['build']

  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Tasks
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('build', [
    'clean',
    'copy',
    'preprocess:build',
    'concat'
  ]);

};
