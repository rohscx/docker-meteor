import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class List extends Component {
  render() {
    console.log(this);
      return(
      <div>
        <span>{this.props.itemList.hostType}</span>
        <h3>{Object.entries(this.props.itemList).map(([key,value])=>{
          return (
            <h3>{key} : {value}</h3>
          );
        })}
        </h3>
      </div>
      )
  }
}
