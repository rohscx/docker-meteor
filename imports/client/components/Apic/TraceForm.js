import React, {Component} from 'react';

export default class TraceForm extends Component {
  render() {
    return(
      <div>
        {this.props.traceFrom()}
      </div>
    )
  }
}
