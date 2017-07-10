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
    const ransom = ["<div><li>adfasf</li><li>adfasf</li><li>adfasf</li><li>adfasf</li><li>adfasf</li></div>","<li>1231f</li><li>1231231</li></div>"];
    return (
      <div className="row">
        <div className="col-sm-12" style={divStyleLavTraceData}>

            {ransome.join("")}

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
          {"ddd"}
        </div>
      </div>
    );
  }

  render() {



    return(
      <div>
          <Accordion
            {...this.props}
            uniqId={"dddd"}>
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
