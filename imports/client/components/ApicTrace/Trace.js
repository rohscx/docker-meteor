import React, {Component} from 'react';
import { Session } from 'meteor/session';
import {Accordion, AccordionSection}  from 'redux-accordion';
// WORK IN PROGRESS
export default class Trace extends Component {

  trace(){
    return (
      <div className="row">
        <div className="col-sm-12">
          {this.props.flowItem}
        </div>
      </div>
    );
  }

  render() {
    const divStyleLav = {
      backgroundColor: "lavender"
    };
    const divStyleLavBlush = {
      backgroundColor: "lavenderblush",
      textAlign: "center"
    };

    return(
      <Accordion
        {...this.props}
        uniqId={this.props.flowIndex}>
        <AccordionSection
           title={this.props.flowIndex}>
            <div style={divStyleLavBlush}>
              {this.trace()}
            </div>
        </AccordionSection>


      </Accordion>
    )
  }
}
