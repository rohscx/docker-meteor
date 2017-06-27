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
   let expiredText = "This ticket Expired: ";
   let activeText = "This ticket is Acative: ";
   if (nowTime - ticketTime < expireTime) {
     return <span><font color="green">{activeText} {ticketTime}</font></span>;
   } else {
     return <span><font color="red">{expiredText} {ticketTime} </font></span>;
   }
 }

//onClick={this.voteOne.bind(this)}
   render() {
     return (
       <div className='itemApic'>
         <div className='vote-one' >
         {this.expiredCheck()}
         <h3>{this.props.item.apicData.text}</h3>
       </div>
       <span>Return</span>
       <div className='vote-two'>
         <span>{this.props.item.apicData.dataObj.response["0"].hostType}</span>
         <h3>{Object.keys(this.props.item.apicData.dataObj.response["0"]).map(function(key, index) {
           return <li>{key}</li>
         })};
        </h3>
       </div>
     </div>
     )
   }
 }
