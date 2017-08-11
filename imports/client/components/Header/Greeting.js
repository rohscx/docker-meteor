import React, {Component} from 'react';
import { Session } from 'meteor/session';
// WORK IN PROGRESS
export default class Greeting extends Component {

  render() {
    const pStyles = {
      width:"90%",
      paddingLeft:"2%"
    };
    return(
      <div>
        <p style={pStyles}>{this.props.greeting}</p>
      </div>
    )
  }
}
