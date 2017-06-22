import React, {Component} from 'react';

import restRequest from '../api/Apic';





export default class ItemApic extends Component {
   render() {
     return (
       <div className='ItemApic'>
         <div className='apic-list' onClick={console.log('List Clicked')}>
         <span>CATS {object.typeTicket}</span>
         <h3>DOGS={object.response.content}</h3>
       </div>
       </div>
     )
   }
 }
