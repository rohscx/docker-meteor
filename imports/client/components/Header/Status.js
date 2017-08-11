import React, {Component} from 'react';
import { Session } from 'meteor/session';
// WORK IN PROGRESS
export default class Status extends Component {

  render() {
    const pStyles = {
      width:"90%",
      paddingLeft:"2%"
    };
    return(
      <div>
        <p style={pStyles}>{this.props.status}</p>
      </div>
    )
  }
}
