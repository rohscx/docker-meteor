import React, {Component} from 'react';

import restRequest from '../api/Apic';
// creates NEW Object for the rest request

export default class ItemApic extends Component {
         
   render() {
     return (
       <div className='ItemApic'>
         <div className='apic-list' onClick={console.log('List Clicked')}>
         <span>CATS{this.props.object.statusCode.value}</span>
         <h3>DOGS{this.props.object.statusCode.text}</h3>
       </div>
       </div>
     )
   }
 }
