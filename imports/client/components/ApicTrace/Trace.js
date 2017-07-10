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
        uniqId={'testAccordion'}>
        <div style={divStyleLavBlush}>
          <AccordionSection
            singleOpen={true} title={this.props.flowIndex}>
             {this.trace()}
          </AccordionSection>
        </div>

      </Accordion>
    )
  }
}
