import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class List extends Component {
  render() {
    console.log(this);
      return(
      <div className='vote-two'>
        <span>
          <h3>
          {this.props.itemList.hostType}
          </h3>
        </span>
        {Object.entries(this.props.itemList).map(([key,value])=>{
          return (
            <p><sup>{key}</sup>{value}</p>
          );
        })}
      </div>
      )
  }
}
