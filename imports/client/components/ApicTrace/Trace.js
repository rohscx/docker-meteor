import React, {Component} from 'react';
import { Session } from 'meteor/session';
import {Accordion, AccordionSection}  from 'redux-accordion';
// WORK IN PROGRESS
export default class Trace extends Component {
  trace(){
    const divStyleTrace = {
      backgroundColor: "#337ab7",
      fontFamily: "Sans-Serif",
      color: "#fff",
      fontWeight: "bold",
      textIndent: "50px"
    };
    return (
      <div className="row">
        <div className="col-sm-12" style={divStyleTrace}>
          {this.props.flowItemName + " " + this.props.flowItemType}
        </div>
      </div>
    );
  }
  
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

  render() {
    const styleData = {
      width: "80%",
      margin: "auto",
      fontFamily: "Sans-Serif",
      color: "#fff"
    };


    return(
      <div style = {styleData}>
        <Accordion
          {...this.props}
          uniqId={"this.props.flowIndex"}>
          <AccordionSection
             title={this.trace()}>

                {this.traceData()}

          </AccordionSection>
        </Accordion>
      </div>
    )
  }
}
