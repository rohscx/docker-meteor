var http = require("https");

var options = {
  "method": "GET",
  "hostname": "devnetapi.cisco.com",
  "port": null,
  "path": "/sandbox/apic_em/api/v1/host",
  "headers": {
    "content-type": "application/json",
    "x-auth-token": "ST-15-QHrXeIL6CWTF1Xu6dSSQ-cas",
    "cache-control": "no-cache",
    "postman-token": "90d322cc-4ccb-4e04-6191-da79e1d77e42"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ username: 'devnetuser', password: 'Cisco123!' }));
req.end();
