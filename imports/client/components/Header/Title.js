import React, {Component} from 'react';
import { Session } from 'meteor/session';
import {Jumbotron} from 'react-bootstrap';
export default class Title extends Component {

  render() {
    const h1Styles = {
      fontSize: "2em",
      margin: "0.67em 0"
    };
    return(
      <div>
        <Jumbotron><h1>{this.props.title}</h1></Jumbotron>
      </div>
    )
  }
}
