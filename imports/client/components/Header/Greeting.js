import React, {Component} from 'react';
import { Session } from 'meteor/session';
import {PageHeader} from 'react-bootstrap';
// WORK IN PROGRESS
export default class Greeting extends Component {

  render() {
    const divStylesGenerator = ()=>{
      // debug
      console.log("Mobile Device Connected",/Mobi/.test(navigator.userAgent))
      let divStyles = (widthPercent)=>{
        return {
          width: widthPercent
        };
      };
      // dynamically set the the width of the primary div. Mobile devices are 100%
      if (/Mobi/.test(navigator.userAgent) === true) {
        return divStyles("90%");
      } else {
        return divStyles("100%");
      }
    };
    
    return(
      <div {divStylesGenerator()}>
        <PageHeader><p><small>{this.props.greeting}</small></p></PageHeader>
      </div>
    )
  }
}
