var http = require('http')
  , httpProxy = require('http-proxy');

var proxy = new httpProxy.RoutingProxy();

http.createServer(function (req, res) {

  proxy.proxyRequest(req, res, {
    host: 'localhost',
    port: 3001
  });

}).listen(8001);