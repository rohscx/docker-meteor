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
      backgroundColor: "#428bca",
      color: "white",
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

  render() {
    const demo = {backgroud:"red"};


    return(
      <div>
        <Accordion
          {...this.props}
          uniqId={"this.props.flowIndex"}>
          <AccordionSection
            style={demo}
             title={this.trace()}>

                {this.traceData()}

          </AccordionSection>
        </Accordion>
        <br/>
      </div>
    )
  }
}
