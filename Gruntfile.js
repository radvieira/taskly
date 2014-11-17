
var grunt = require('grunt');

grunt.initConfig({
  connect: {
    'default': {
      port: 9000,
      base: './public'
    }
  }
});

grunt.loadNpmTasks('grunt-connect');

grunt.registerTask('serve', 'connect');
