import React, {Component} from 'react';

let hello = 'Rick Hunter';
/*
let headingClick = function () {
  console.log('hello');
}
*/

export default class App extends Component {
  headingClick() {
    console.log('hello');
  }
  render() {
    return (
      <h1 onClick={this.headingClick}>Hello {hello}!</h1>
    );
  }
}
