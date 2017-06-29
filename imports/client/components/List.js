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
            <div className='two-a'><p key={key.id}><sup>{key}</sup>{value}</p></div>
          );
        })}
      </div>
      )
  }
}
