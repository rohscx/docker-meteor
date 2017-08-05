import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class Devices extends Component {
  render() {
    returnList = this.props.prtgItems.map((data)=>{
      console.log(data);
      for (let [key, value] of Object.entries(data)) {
        return (
          <div className='two-a' key={data._id}><sup>{key}</sup><p >{value}</p></div>
        );
      }
    })
    console.log(this)
    return(
      <div>
        {returnList}
      </div>
    )
  }
}
