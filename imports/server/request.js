var http = require("https");

var options = {
  "method": "POST",
  "hostname": "devnetapi.cisco.com",
  "port": null,
  "path": "/sandbox/apic_em/api/v1/ticket",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
    "postman-token": "25808d6f-9e3e-4430-13a7-f91e4d0d2689"
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
