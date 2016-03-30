module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);


  // Config
  var merge = require('merge'),
      config = {};

  config.path = {
    'static': 'static',
    'src': 'src',
    'node': 'node_modules'
  };

  [
    require('./grunt/development.js'),
    require('./grunt/production.js')
  ].forEach(function(settings) {
    config = merge.recursive(true, config, settings);
  });

  grunt.initConfig(config);


  // Tasks
  grunt.registerTask('development', [
    'less:development'
  ]);

  grunt.registerTask('production', [
    'less:production',
    'postcss'
  ]);

  grunt.registerTask('default', [
    'development',
    'watch'
  ]);
};
