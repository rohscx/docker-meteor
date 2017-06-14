import React, {Component} from 'react';

let hello = 'Rick Hunter';

let headingClick = function () {
  console.log('helo');
}


export default class App extends Component {
  render() {
    return (
      <h1 onClick={headingClick}>Hello {hello}!</h1>
    );
  }
}
