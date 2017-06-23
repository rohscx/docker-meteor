import React, {Component} from 'react';

import restRequest from '../api/Apic';

import { Session } from 'meteor/session';


let da = Session.get("apicResponse");
let blah = JSON.parse(JSON.stringify(da));


export default class ItemApic extends Component {
   render() {
     return (
       <div className='ItemApic'>
         <div className='apic-list' onClick={console.log('List Clicked')}>
         <span>CATS</span>
         <h3>DOGS={blah}</h3>
       </div>
       </div>
     )
   }
 }
