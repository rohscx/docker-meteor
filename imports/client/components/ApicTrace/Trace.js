import React, {Component} from 'react';
import { Session } from 'meteor/session';
// WORK IN PROGRESS
export default class Trace extends Component {

  loopThrough(item){
    let myReturn = Object.keys(item).map(function(key,index){
      console.log("item[key]: ",item[key]);
      console.log("key: ",key);
      console.log("index: ",index);
      return (
        <div key={index}>{key} {item[key]}</div>
      );
    })
    return myReturn;
  }


  render() {
    return(
      <div>
      {this.loopThrough(this.props.traceObj)}
      <button onClick={
        () => console.log(this)
      }>LOG PROPS TRACE</button>
    </div>
    )
  }
}
