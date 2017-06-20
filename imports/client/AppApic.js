import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import IsRole from './utilities/IsRole';

import ApicTicket from '../api/ApicTicket'

let cats = Meteor.methods({
    rat:  function(){
        var test = HTTP.call("POST", "https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket",
            {   headers:  {     
                        "Content-Type": "application/json"             
        },
        // This is where the problem is.  Have tried multiple syntax versions and tried using the `params`options for the HTTP call instead of `data`
        data: {'username': 'devnetuser',
               'password': 'Cisco123!'
        }
        },
    function (error, result) {

    // The syntax below should be if not an error, log the result (for testing etc, otherwise, log "http post error".  I may have incorrectly switched this around, but the original version I got from an online example had it the console.log statements in the reverse order.
    if (!error) {
        console.log(result);
        return result;
    } else{

        console.log("http post error");
        return 'http post error';
    };
    });
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
        <h1>Page loaded place holder... and son... {cats}</h1>
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
