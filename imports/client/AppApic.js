import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import restRequest from '../api/Apic';

import IsRole from './utilities/IsRole';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

import ItemApic from './ItemApic';







@autobind
 class AppApic extends Component {

   getItems() {
     let object = new restRequest('GET', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/host', {
             headers: { 'conten-type': 'application/json'}
     });
     // console.log(object); // debug

     // Requests NEW ticket from APIC
     object.makeTicket();

     console.log(object); // debug
   }

   showAll() {
     if(this.props.showAll) {
       Session.set('showAll', false);
     } else {
       Session.set('showAll', true);
     }

   }

  render() {
    if (!this.props.ready) {
      return <div>Loading APIC...</div>
    }

    return (
        <main>
          <IsRole role={['admin']} {... this.props}>
            <button onClick={this.showAll}>
              Show {this.props.showAll ? 'One': 'All'}
            </button>
          </IsRole>
        <h1>Page loaded place holder... and son...</h1>
            <p>Current Ticket:  {Session.get("apicTicket")}</p>
             <ItemApic/>
             <ReactCSSTransitionGroup
               transitionName='item'
               transitionEnterTimeout={600}
               transitionLeaveTimeout={600}
               transitionAppear={true}
               transistionAppearTimeout={600}>

           </ReactCSSTransitionGroup>
        </main>
    );
  }
}

export default createContainer(({params}) => {
  let itemsSub = Meteor.subscribe('allItems');
  let userSub = Meteor.subscribe('currentUser');
  let showAll = Session.get('showAll');
  let itemsArray;

  return {
    showAll,
    ready: userSub.ready()
  }
}, AppApic);
