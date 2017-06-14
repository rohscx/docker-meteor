import React, {Component} from 'react';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      count: 0
    }
  }

  headingClick() {
    this.setState({count: this.state.count +1});
  }

  render() {
    return (
      <h1 onClick={this.headingClick.bind(this)}>{this.state.count}</h1>
    );
  }
}
