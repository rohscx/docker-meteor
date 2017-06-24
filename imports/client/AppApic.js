import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import restRequest from '../api/Apic';

import IsRole from './utilities/IsRole';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

import {ItemApic} from './ItemApic';






@autobind
 class AppApic extends Component {

   getFullName(item) {
    var fullname = [item.firstname,item.lastname].join(" ");

    for (var prop in item) {
        // skip loop if the property is from prototype
        if(!obj.hasOwnProperty(prop)) continue;

        // your code
        return prop + " = " + obj[prop];
    }
  }


   showAll() {
     if(this.props.showAll) {
       Session.set('showAll', false);
     } else {
       Session.set('showAll', true);
     }
   }

  render() {
    console.log(Session.get("apicResponse")[0])
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
            <button onClick={this.getItems}>
              apicGet {this.props.showAll ? 'One': 'All'}
            </button>
            {Session.get("apicResponse").map((this.getFullName) => {

              return <Item item={item} key={item._id}/>
            })}
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
