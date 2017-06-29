import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class List extends Component {
  render() {
    returnList = Object.entries(this.props.itemList).map(([key,value])=>{
        return (
          <div className='two-a' key={key.id}><sup>{key}</sup><p >{value}</p></div>
      );
    });
      return(
      <div className='two'>
        <span>
          <h3>
          {this.props.itemList.hostType}
          </h3>
        </span>
        {returnList}
      </div>
      )
  }
}
