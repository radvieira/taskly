
var grunt = require('grunt');

grunt.initConfig({
  connect: {
    server: {
      options: {
        port: 9000,
        base: 'public',
        keepalive: true,
        middleware: function(connect, options) {
          return [
            connect.static(options.base[0]),
            function(req, res, next) {

              if (req.url === '/api/tasks') {

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify([
                  { name: 'Get some milk!' }
                ]));
                return res.end();
              }

              return next();
            }
          ]
        }
      }

    }
  }
});

grunt.loadNpmTasks('grunt-contrib-connect');
