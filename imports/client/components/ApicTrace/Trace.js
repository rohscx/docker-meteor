import React, {Component} from 'react';
import { Session } from 'meteor/session';
import {Accordion, AccordionSection}  from 'redux-accordion';
// WORK IN PROGRESS
export default class Trace extends Component {

  render() {

    return(
      <Accordion
        {...this.props} contentBackgroundColor="blue"
        uniqId={this.props.flowIndex}>
        <AccordionSection
           title={this.props.flowIndex}>
            {this.props.flowItem}
        </AccordionSection>


      </Accordion>
    )
  }
}
