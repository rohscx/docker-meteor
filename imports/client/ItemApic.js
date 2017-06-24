import React, {Component} from 'react';

import restRequest from '../api/Apic';

import { Session } from 'meteor/session';








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
