import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class Title extends Component {

  render() {
      const divStyles = {paddingButtom: "5%"};
    return(
      <div sytle={divStyles}>
        <h1>{this.props.greeting}</h1>

      </div>
    )
  }
}
