var http = require('http')
  , request = require('request')
  , url = require('url')
  , port = process.env.PORT || 3000 ;

http.createServer(function (req, res) {

  request.get('http://localhost:3001' + req.url).on('error', function(error) {
    request.get('http://localhost:3002' + req.url).pipe(res);
  }).pipe(res);

}).listen(port);

console.log('Starting on http://localhost:' + port);