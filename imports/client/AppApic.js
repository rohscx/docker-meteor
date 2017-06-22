import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import restRequest from '../api/Apic'

import IsRole from './utilities/IsRole';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

const type = 'POST';
const url = 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket';
const options = {
        headers: { contentType: 'application/json' },
	data: {username: 'devnetuser', password: 'Cisco123!'}
};

const cats = Meteor.call('checkApic', type, url, options, (err, res) => {
  if (err) {
    alert(err);
  } else {
    // success!
    Session.set("data", res.data.response.serviceTicket);
  }
});


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
        <h1>Page loaded place holder... and son...{Session.get("data")}</h1>
       
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
