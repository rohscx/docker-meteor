import React, {Component} from 'react';

import restRequest from '../api/Apic';

let object = new restRequest('GET', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/host', {
        headers: { 'conten-type': 'application/json'}
});
// console.log(object); // debug

// Requests NEW ticket from APIC
object.makeTicket(); 

// console.log(object); // debug


let mark = object.map(getFullName => getFullName(item) {
        let fullname = [item.response]
        return fullname;
)};


export default class ItemApic extends Component {
         
   render() {
     return (
       <div className='ItemApic'>
         <div className='apic-list' onClick={console.log('List Clicked')}>
         <span>CATS {object.typeTicket}</span>
         <h3>DOGS={mark);object.response }</h3>
       </div>
       </div>
     )
   }
 }
