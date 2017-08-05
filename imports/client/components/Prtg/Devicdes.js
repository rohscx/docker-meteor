import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class Devices extends Component {
  deviceList(){
    this.props.prtgItems.map((data)=>{
      return data
    })
  }
  render() {
    return(
      <div>
        <h1>{deviceList()}</h1>

      </div>
    )
  }
}
