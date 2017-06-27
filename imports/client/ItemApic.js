import React, {Component} from 'react';

import Apic from './Apic';

import { Session } from 'meteor/session';

export default class ItemApic extends Component {
  voteOne() {
   Meteor.call('voteOnItem', this.props.item, 'itemOne');
 }
//onClick={this.voteOne.bind(this)}
   render() {
     return (
       <div className='item'>
         <div className='vote-one' >
         <span>{this.props.item.itemOne.value}</span>
         <h3>{this.props.item.itemOne.text}</h3>
       </div>
     </div>
     )
   }
 }
