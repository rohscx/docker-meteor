var http = require("https");

function getJSON(options, cb){
var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    cb(null, result);
    console.log(body.toString());
  });
  res.on('error', cb)
});

req.write(JSON.stringify({ username: 'devnetuser', password: 'Cisco123!' }));
req
.on('error', cb)
.end();
}

var options = {
  "method": "GET",
  "hostname": "devnetapi.cisco.com",
  "port": null,
  "path": "/sandbox/apic_em/api/v1/host",
  "headers": {
    "content-type": "application/json",
    "x-auth-token": "ST-15-QHrXeIL6CWTF1Xu6dSSQ-cas",
    "cache-control": "no-cache",
    "postman-token": "7e1ab28c-68e1-e3e3-bf2c-880eebc13136"
  }
};

getJSON(options, function(err, result){
  if(err){
  return console.log('Error while trying to get REST result: ',err);
  }
  console.log(result);
});
