import React, {Component} from 'react';
import { Session } from 'meteor/session';
import {Accordion, AccordionSection}  from 'redux-accordion';
// WORK IN PROGRESS
export default class Trace extends Component {

  traceData(){
    const divStyleLavTraceData = {
      textAlign: "center",
      borderBottomColor: "black",
      borderBottomWidth: 10
    };
    return (
      <div className="row">
        <div className="col-sm-12" style={divStyleLavTraceData}>
          {this.props.flowItem}
        </div>
      </div>
    );
  }
  trace(){
    const divStyleTrace = {
      backgroundColor: "blue",
      color: "white"
    };
    return (
      <div className="row">
        <div className="col-sm-12" style={divStyleTrace}>
          {this.props.flowIndex}
        </div>
      </div>
    );
  }

  render() {



    return(
      <div>
        <Accordion
          {...this.props}
          uniqId={this.props.flowIndex}>
          <AccordionSection
             title={this.trace()}>

                {this.traceData()}

          </AccordionSection>
        </Accordion>
        <br/>
      </div>
    )
  }
}
