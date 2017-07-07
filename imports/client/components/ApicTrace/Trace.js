import React, {Component} from 'react';
import { Session } from 'meteor/session';
// WORK IN PROGRESS
export default class Trace extends Component {

  loopThrough(item){
    Object.keys(item).map(function(key,index){
      console.log(item[key]);
      return (
        <div>HELLLO</div>
      );
    })
  }


  render() {
    return(
      <div>
      {this.loopThrough(this.props.traceObj)}
    </div>
    )
  }
}
