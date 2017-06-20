import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import IsRole from './utilities/IsRole';

import ApicTicket from '../api/ApicTicket';
import { HTTP } from 'meteor/http';

const cats => (){
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
};


@autobind
 class AppApic extends Component {

  render() {

    if (!this.props.ready) {
      return <div>Loading APIC...</div>
    }

    // inline conditional test. If true the conditional will be displayed
    const test = false;
    return (
        <main>
        <h1>Page loaded place holder... and son...</h1>
        </main>
    );
  }
}

export default createContainer(({params}) => {
  let userSub = Meteor.subscribe('currentUser');
  let showAll = Session.get('showAll');
  return {
    showAll,
    ready: userSub.ready(),
  }
}, AppApic);
