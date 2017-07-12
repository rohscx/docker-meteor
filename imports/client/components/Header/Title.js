import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class Title extends Component {

  render() {
      const divStyles = {
        paddingTop: "10%",
        paddingBottom:"10%"
      };
    return(
      <div sytle={divStyles}>
        <h1>{this.props.greeting}</h1>

      </div>
    )
  }
}
