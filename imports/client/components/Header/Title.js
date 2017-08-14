import React, {Component} from 'react';
import { Session } from 'meteor/session';
import {Jumbotron} from 'react-bootstrap';
export default class Title extends Component {

  render() {
    const pageHeaderStyles = {
      textAlign:"center"
    };
    return(
      <div>
        <Jumbotron style={pageHeaderStyles}><h1>{this.props.title}</h1></Jumbotron>
      </div>
    )
  }
}
