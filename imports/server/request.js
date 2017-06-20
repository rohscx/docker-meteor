Meteor.methods({
  ok:function () {
    var http = require("https");

    var options = {
      "method": "POST",
      "hostname": "devnetapi.cisco.com",
      "port": null,
      "path": "/sandbox/apic_em/api/v1/ticket",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "5210b0cf-3524-230d-f3b4-0a1d1dd9e258"
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
    }
  }
});
