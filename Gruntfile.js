module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
      babel: {
          options: {
              sourceMap: true,
              presets: ['es2015']
          },
          dist: {
              files: {
                  'js/app.js': ['src/**/*.js']
              }
          }
      },
      watch: {
        files: ['src/**/*.js'],
        tasks: ['build']
      }
  });

  grunt.registerTask('build', ['babel']);
}
