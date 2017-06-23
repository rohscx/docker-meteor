import React, {Component} from 'react';

import restRequest from '../api/Apic';

import { Session } from 'meteor/session';

export default class ItemApic extends Component {
   render() {
     return (
       <div className='item'>
         <div className='vote-one' onClick={this.voteOne.bind(this)}>
         <span>{this.props.item.itemOne.value}</span>
         <h3>{this.props.item.itemOne.text}</h3>
       </div>
       <div className='ItemApic'>
         <div className='apic-list' onClick={console.log('List Clicked')}>
           <p>{this.getItems}</p>
         <span>CATS</span>
         <h3>DOGS=</h3>
       </div>
       </div>
     )
   }
 }
