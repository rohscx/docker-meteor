import React, {Component} from 'react';

import restRequest from '../api/Apic';

import { Session } from 'meteor/session';

export default class ItemApic extends Component {
  getItems() {

    let object = new restRequest('GET', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/host', {
            headers: { 'conten-type': 'application/json'}
    });
    // console.log(object); // debug

    // Requests NEW ticket from APIC
    object.makeTicket();

    // console.log(object); // debug
    console.log(this); // debug

      return (
        <div className="cssClass">
          hello
        </div>
      );
    }
   render() {
     return (
       <div className='item'>
         <div className='vote-one' onClick={this.getItems}>
         <span>CATS</span>
         {this.getItems}
         {console.log(this)}
         <h3>DOGS=</h3>
       </div>
       </div>
     )
   }
 }
