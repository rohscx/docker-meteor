import React, {Component} from 'react';
import { Session } from 'meteor/session';
// WORK IN PROGRESS
export default class Trace extends Component {
  constructor(props) {
  super(props);
  this.state = {
    isLoading: true
  }
}

componentDidMount() {
  let url = 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/flow-analysis';
  let data = { sourceIP: '10.2.1.22', destIP: '10.1.12.20'};

  fetch(url, {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": "ST-16203-DuWxkyMgGnDDJw0iqtRB-cas",
    'Access-Control-Allow-Origin: *'
  },
  credentials: "same-origin"
}).then(function(response) {
  console.log(response.status);     //=> number 100–599
  console.log(response.statusText); //=> String
  console.log(response.headers);    //=> Headers
  console.log(response.url);       //=> String

  console.log(response.text());
}, function(error) {
  error.message //=> String
})
}

  render() {
    if (this.state.isLoading) {
      return (
        <p>Loading Trace data!!!!....!!!</p>
      );
    }
    return(
      <p>Apic Trace Complete</p>
    )
  }
}
