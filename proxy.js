var http = require('http')
  , httpProxy = require('http-proxy')
  , request = require('request')
  ;

var proxy = new httpProxy.RoutingProxy();

proxy.on('proxyError', function(error, req, res) {
  request.get('http://localhost:3002' + req.url).on('error', function() {
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });

    res.end('Something went wrong. And we are reporting a custom error message.');
  }).pipe(res);
});

http.createServer(function (req, res) {

  proxy.proxyRequest(req, res, {
    host: 'localhost',
    port: 3001
  });

}).listen(process.env.PORT || 80);