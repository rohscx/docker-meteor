import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class MakeList extends Component {
  handleChange(){
    console.log(this);
  }
  render() {
    console.log(this);
      return(
        <div>
          {this.props.key2}
        </div>
      )
  }
}
