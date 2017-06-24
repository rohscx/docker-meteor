import React, {Component} from 'react';

import restRequest from '../api/Apic';

import { Session } from 'meteor/session';



  let object = new restRequest('GET', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/host', {
          headers: { 'conten-type': 'application/json'}
  });
  // console.log(object); // debug

  // Requests NEW ticket from APIC
  object.makeTicket(function (err, content) {
    if (err) {
      return console.log(err)
    }

    // console.log(object); // debug
    //console.log(this); // debug
    return (
  <div className={fancyClass} onClick={this.props.onClick}>
    {this.props.children}
  </div>
);

  });




export default class ItemApic extends Component {

   render() {
     return (
       <div className='item'>
         <div className='vote-one' onClick={this.getItems}>
         <span>CATS</span>
         <h3>DOGS=</h3>
       </div>
       </div>
     )
   }
 }
