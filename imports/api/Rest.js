var http = require('http');

var options = {
host: 'api-sandbox.oanda.com',
port: '80',
path: '/v1/quote?instument=USD_ZAR',
method: 'GET'
}

http.request(options, function() {
  var body= '';
  
  res.on('data', function(chunk) {
    body+= chunk;
  });
  res.on('end', function(){
    var price = JSON.parse(body);
    console.log(price);
  });
}).end();
