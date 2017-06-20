const Items = {var http = require("https");

var options = {
  "method": "POST",
  "hostname": "devnetapi.cisco.com",
  "port": null,
  "path": "/sandbox/apic_em/api/v1/ticket",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
    "postman-token": "9352ca0b-ffcc-ec4e-eddb-07f6de0130b9"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(JSON.parse(body.toString()));
    return body.toString();
  });
});

req.write(JSON.stringify({ username: 'devnetuser', password: 'Cisco123!' }));
req.end();};


export default Items;
