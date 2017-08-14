import React, {Component} from 'react';
import { Session } from 'meteor/session';
import {PageHeader} from 'react-bootstrap';
export default class Title extends Component {

  render() {
    const h1Styles = {
      fontSize: "2em",
      margin: "0.67em 0"
    };
    return(
      <div>
        <PageHeader><small>{this.props.title}</small></PageHeader>
      </div>
    )
  }
}
