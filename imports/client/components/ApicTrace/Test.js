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
    let ransom = "<li>adfasf</li><li>adfasf</li><li>adfasf</li><li>adfasf</li><li>adfasf</li></div>";
    //ransom = ransom.join("");
    ransom = "<ul>" + ransom + "</ul>";
    return (
      <div className="row">
        <div className="col-sm-12" style={divStyleLavTraceData} dangerouslySetInnerHTML={{__html: ransom}}>


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
