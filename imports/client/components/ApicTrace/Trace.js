import React, {Component} from 'react';
import { Session } from 'meteor/session';
// WORK IN PROGRESS
export default class Trace extends Component {


  render() {
    return(
      Object.keys(this.props.traceObj).map(function(key,index){
        console.log(item[key]);
        return (
          {key}
        );
      })
    )
  }
}
