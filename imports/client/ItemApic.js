import React, {Component} from 'react';

import restRequest from '../api/Apic';

import { Session } from 'meteor/session';





export default class ItemApic extends Component {
   render() {
     return (
       <div className='ItemApic'>
         <div className='apic-list' onClick={console.log('List Clicked')}>
         <span>CATS</span>
         <h3>DOGS={JSON.parse(JSON.stringify(Session.get("apicResponse")))}</h3>
       </div>
       </div>
     )
   }
 }
