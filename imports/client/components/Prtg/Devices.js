import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class Devices extends Component {
  render() {
    returnList = Object.entries(this.props.prtgItems).map(([key,value])=>{
      console.log(key);
        return (
          <div className='two-a' key={key}><sup>{key}</sup><p >{value}</p></div>
      );
    console.log(this)
    return(
      <div>
        {returnList}
      </div>
    )
  }
}
