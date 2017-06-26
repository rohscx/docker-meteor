import React, {Component} from 'react';
import { Session } from 'meteor/session';


export default class Title extends Component {
  render() {
    return(
      <div>
        <h1>Welcome: The Page has loaded</h1>
      </div>
    )
  }
}
