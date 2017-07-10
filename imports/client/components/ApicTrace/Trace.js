import React, {Component} from 'react';
import { Session } from 'meteor/session';
import {Accordion, AccordionSection}  from 'redux-accordion';
// WORK IN PROGRESS
export default class Trace extends Component {

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
        <AccordionSection
          title={this.props.flowIndex}>
          {this.props.flowItem}
        </AccordionSection>
      </Accordion>
    )
  }
}
