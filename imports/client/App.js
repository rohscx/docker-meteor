import React, {Component} from 'react';

export default class App extends Component {
  contructor() {
    super();
    this.state = {
      count: 0
    }
  }
  headingClick() {
    console.log('hello');
  }

  render() {
    return (
      <h1 onClick={this.headingClick}>Hello {this.state.count}!</h1>
    );
  }
}
