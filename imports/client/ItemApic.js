import React, {Component} from 'react';
import Apic from '../api/Apic'

 export default class ItemApic extends Component {
         
// creates NEW Object for the rest request
object = new restRequest('GET', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/host', {
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
