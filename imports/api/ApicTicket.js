var http = require("https");

var options = {
  "method": "POST",
  "hostname": "devnetapi.cisco.com",
  "port": null,
  "path": "/sandbox/apic_em/api/v1/ticket",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
    "postman-token": "19088f21-a360-dc0b-d452-a2da93f86f0a"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body);
  });
});

req.write(JSON.stringify({ username: 'devnetuser', password: 'Cisco123!' }));
req.end();
