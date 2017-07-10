import React, {Component} from 'react';
import { Session } from 'meteor/session';
import {Accordion, AccordionSection}  from 'redux-accordion';
// WORK IN PROGRESS
export default class Trace extends Component {

  traceData(){
    return (
      <div className="row">
        <div className="col-sm-12" style={divStyleTrace}>
          {this.props.flowItem}
        </div>
      </div>
    );
  }
  trace(){
    return (
      <div className="row">
        <div className="col-sm-12" style={divStyleTrace}>
          {this.props.flowItem}
        </div>
      </div>
    );
  }

  render() {
    const divStyleTrace = {
      backgroundColor: "lavender"
    };
    const divStyleLavTraceData = {
      textAlign: "center",
      borderBottomColor: "black",
      borderBottomWidth: 10
    };

    return(
      <div>
        <Accordion
          {...this.props}
          uniqId={this.props.flowIndex}>
          <AccordionSection
             title={this.props.flowIndex}>
              <div style={divStyleLavBlush}>
                {this.traceData.bind(this)}
              </div>
          </AccordionSection>
        </Accordion>
        <br/>
      </div>
    )
  }
}
