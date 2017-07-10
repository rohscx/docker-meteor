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
    const ransom = this.props.listTest;
    //ransom = ransom.join("");
    const listItems = ransom.map((ransom) =>
    <li>{ransom}</li>
    );
    return (
      <div className="row">
        <div className="col-sm-12" style={divStyleLavTraceData} >
          {listItems}

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
