import React, {Component} from 'react';

import Apic from '../Apic';
import ItemsApic from '../../api/request'
import List from './ItemApic/List'

import { Session } from 'meteor/session';

export default class ItemApic extends Component {

 expiredCheck() {
   let nowTime = Math.round(new Date().getTime() / 1000);
   let ticketTime = this.props.item.apicData.requestTime;
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
     console.log(this);
     return (
       <div className='itemApic'>
         <div className='one' >
         {this.expiredCheck()}
         <h3>{this.props.item.apicData.text}</h3>
       </div>
       <span>Return</span>
       {this.props.item.apicData.dataObj.response.map((item, index) => {
         console.log(item);
         return <List itemList={item} key={index}/>
       })}
     </div>
     )
   }
 }
