import React, {Component} from 'react';

import Apic from './Apic';
import ItemsApic from '../api/request'

import { Session } from 'meteor/session';

export default class ItemApic extends Component {
  voteOne() {
   Meteor.call('voteOnItem', this.props.item, 'itemOne');
 }
 expiredCheck() {
   let nowTime = Math.round(new Date().getTime() / 1000);
   let ticketTime = this.props.item.apicData.requestDate;
   let expireTime = 1800;
   if (nowTime - ticketTime > expireTime) {
     return "EXPIRED";
   } else {
     return "Not Expired";
   }
 }


//onClick={this.voteOne.bind(this)}
   render() {
     return (
       <div className='itemApic'>
         <div className='vote-one' >
         <span>{this.expiredCheck()}</span>
         <h3>{this.props.item.apicData.text}</h3>
       </div>
       <span>Return</span>
       <div className='vote-two'>
         <span>{this.props.item.apicData.dataObj.response["0"].hostType}</span>
         <h3>{JSON.stringify(this.props.item.apicData.dataObj.response, null, 2)}</h3>
       </div>
     </div>
     )
   }
 }
