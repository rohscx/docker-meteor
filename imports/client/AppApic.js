import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import IsRole from './utilities/IsRole';

import ApicTicket from '../api/ApicTicket';
import { HTTP } from 'meteor/http';

Meteor.http.post(
    "https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket"
    params:
        "USER": "sdk-three_api1.sdk.com"
        "PWD": "QFZCWN5HZM8VBG7Q"
        "SIGNATURE": "A-IzJhZZjhg29XQ2qnhapuwxIDzyAZQ92FRP5dqBzVesOkzbdUONzmOU"
        "VERSION": "64.0"
        "PAYMENTREQUEST_0_PAYMENTACTION": "Sale"
        "PAYMENTREQUEST_0_AMT": "19.95"
        "RETURNURL": "https://www.YourReturnURL.com"
        "CANCELURL": "https://www.YourCancelURL.com"
        "METHOD": "SetExpressCheckout"
    (error, result) -> console.log(result)
)


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
