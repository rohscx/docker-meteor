import React, {Component} from 'react';
import { Session } from 'meteor/session';
// WORK IN PROGRESS
export default class Trace extends Component {

  loopThrough(){
    let item = props.traceObj;
    Object.keys(item).map(function(key,index){
      console.log(item[key]);
      return (
        item[key]
      );
    })
  }


  render() {
    return(
      {this.loopThrough()}
    )
  }
}
