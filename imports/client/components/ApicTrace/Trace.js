import React, {Component} from 'react';
import { Session } from 'meteor/session';
// WORK IN PROGRESS
export default class Trace extends Component {

  render() {
    return(
      <div className="row">
        <div className="col-sm-4" style="background-color:lavender;">
          {this.props.flowIndex}
        </div>
        <div className="col-sm-4" style="background-color:lavenderblush;">
          {this.props.flowItem}
        </div>
      </div>
    )
  }
}
