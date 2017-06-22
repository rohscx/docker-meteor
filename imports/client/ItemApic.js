import React, {Component} from 'react';
import Apic from '../api/Apic'

import {createContainer} from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import IsRole from './utilities/IsRole';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';



 export default class ItemApic extends Component {
         
// creates NEW Object for the rest request
let object = new restRequest('GET', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/host', {
        headers: { 'conten-type': 'application/json'}
});
// console.log(object); // debug

// Requests NEW ticket from APIC
object.makeTicket(); 

// console.log(object); // debug

         
   render() {
     return (
       <div className='apic'>
         <div className='apic-list' onClick={console.log('List Clicked')}>
         <span>{this.props.object.statusCode.value}</span>
         <h3>{this.props.object.statusCode.text}</h3>
       </div>
       </div>
     )
   }
 }
