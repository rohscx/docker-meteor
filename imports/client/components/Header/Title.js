import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class Title extends Component {

  render() {
    const divStyles = {
      fontSize: "2em",
      margin: "0.67em 0"
    };
    return(
      <div style={divStyles}>
        <h1>{this.props.greeting}</h1>

      </div>
    )
  }
}
