import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class List extends Component {
  render() {
      return(
      <div className='two'>
        <span>
          <h3>
          {this.props.itemList.hostType}
          </h3>
        </span>
        {Object.entries(this.props.itemList).map(([key,value])=>{
          return (
            <p><div className='two-a'><sup>{key}</sup></div>{value}</p>
          );
        })}
      </div>
      )
  }
}
