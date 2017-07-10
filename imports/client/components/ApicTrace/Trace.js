import React, {Component} from 'react';
import { Session } from 'meteor/session';
import {Accordion, AccordionSection}  from 'redux-accordion';
// WORK IN PROGRESS
export default class Trace extends Component {

  render() {

    return(
      <Accordion
        {...this.props}
        uniqId={'testAccordion'}
        singleOpen={true}>

        {"asdfasdf"}

      </Accordion>
    )
  }
}
