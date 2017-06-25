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

import { Tracker } from 'meteor/tracker';






@autobind
 class AppApic extends Component {
   constructor() {
     super();
     this.state = {ticket: 'Not received'};
     this.getItems = this.getItems.bind(this);
   }

   componentDidMout () {
     this.getItems().done()
   }

   async getItems() {


     console.log('LOOK');
     console.log(this);
     console.log('LOOK');
     let object = new restRequest('GET', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/host', {
           headers: { 'conten-type': 'application/json'}
   });

   const test = await fetch(object.makeTicket())


   //this.setState({ticket: Session.get("apicTicket")});
   let count = new ReactiveVar(Session.get("apicTicket"));

   this.setState({ticket: count.get()});

   var doSomething = function() {
// Do something when the session value changes
console.log(Session.get("apicTicket"));
count.set(Session.get("apicTicket"))
this.setState({ticket: Session.get("apicTicket")});

}

Tracker.autorun(function() {
var sessionVal = Session.get("apicTicket");
console.log("The session value has changed");
doSomething();
});

var anotherFunction = function() {
Session.set("yourSessionVariable", "foo");
}


 // 1
   // console.log(object); // debug

   // Requests NEW ticket from APIC
   /*
   object.makeTicket(function (err, data) {
     if (err) {
       console.log('aadfasdfasdfsfasdf');
       console.log(err)
     }
     console.log('WOWOWOWOWOW');

     //console.log(object); // debug
     //console.log('CATS ON EVERYTHING'); // debug
     //this.setState({ticket: Session.get("apicTicket")});
     //this.setState({ticket: 'lkjhjkhjkhlkj'});

   });
   */

}

   showAll() {
     if(this.props.showAll) {
       Session.set('showAll', false);
     } else {
       Session.set('showAll', true);
     }
   }

   changeTicket(ticket){
     this.setState({ticket: 'UPDATED'});
   }

  render() {
    //console.log(Session.get("apicResponse")[0]);
    //console.log(this);
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
            <p>Current Ticket: {this.state.ticket}</p>
            <button onClick={this.getItems}>
              apicGet {this.props.showAll ? 'One': 'All'}
            </button>
            <ItemApic />

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
