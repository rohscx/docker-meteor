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
        <div className="col-sm-12" >
          {this.props.flowItem}
        </div>
      </div>
    );
  }
  trace(){
    const divStyleTrace = {
      backgroundColor: "lavender"
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
             title={this.props.flowIndex}>

                {this.traceData.bind(this)}

          </AccordionSection>
        </Accordion>
        <br/>
      </div>
    )
  }
}
