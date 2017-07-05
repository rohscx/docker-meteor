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
  return fetch('https://devnetapi.cisco.com/sandbox/apic_em/api/v1/flow-analysis', {
    method: 'POST',
    headers: {
      'x-auth-token': 'ST-16107-dceuVqK762QDjBDcRfXh-cas',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sourceIP: '10.2.1.22',
      destIP: '10.1.12.20'
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    this.setState({
      isLoading: false,
      //dataSource: ds.cloneWithRows(responseJson.movies),
    }, function() {
   // do something with new state
      });
  })
  .catch((error) => {
    console.log(error);
  });
}

  render() {
    if (this.state.isLoading) {
      return (
        <p>Loading Trace data!!!!....!!!</p>
      );
    }
    return(
      <p>Apic Trace Complet</p>
    )
  }
}
