import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class Title extends Component {

  render() {
    const h1Styles = {
      fontSize: "2em",
      margin: "0.67em 0"
    };
    return(
      <div>
        <h1 style={h1Styles}>{this.props.greeting}</h1>

      </div>
    )
  }
}
