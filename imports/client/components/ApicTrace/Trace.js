import React, {Component} from 'react';
import { Session } from 'meteor/session';
// WORK IN PROGRESS
export default class Trace extends Component {

  render() {
    const divStyleLav = {
      backgroundColor:"lavender"
    };
    const divStyleLavBlush = {
      backgroundColor:"lavenderblush"
    };
    return(
      <div className="row">
        <div className="col-sm-4" style={divStyleLav}>
          {this.props.flowIndex}
          <div class="row">
            <div className="col-sm-4" style={divStyleLavBlush}>
              {this.props.flowItem}
            </div>
          <div/>
        </div>
      </div>
    )
  }
}
