import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import IsRole from './utilities/IsRole';
import { Session } from 'meteor/session';


const cats = Meteor.call('checkApic', (err, res) => {
  if (err) {
    alert(err);
  } else {
    // success!
    alert(res.statusCode);
    Session.set('currentList', res.statusCode);
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
        <h1>Page loaded place holder... and son...{Session.get('currentList')}</h1>
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
