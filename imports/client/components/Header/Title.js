import React, {Component} from 'react';
import { Session } from 'meteor/session';


export default class Title extends Component {
console.log(this);
  render() {
    return(
      <div>
        <h1>{this.props.greeting}</h1>
      </div>
    )
  }
}
