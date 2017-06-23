import React, {Component} from 'react';

import restRequest from '../api/Apic';





export default class ItemApic extends Component {
   render() {
     return (
       <div className='ItemApic'>
         <div className='apic-list' onClick={console.log('List Clicked')}>
         <span>CATS</span>
         <h3>DOGS={Session.get("apicResponse")}</h3>
       </div>
       </div>
     )
   }
 }
