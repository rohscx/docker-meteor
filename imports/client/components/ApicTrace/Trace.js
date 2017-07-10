import React, {Component} from 'react';
import { Session } from 'meteor/session';
import {Accordion, AccordionSection}  from 'redux-accordion';
// WORK IN PROGRESS
export default class Trace extends Component {

  render() {
    let setting = {
"headerBackgroundColor": "red",
"headerBackgroundColorActive": 'pink',
"headerColor": "black",
"contentBackgroundColor": "blue",
"borderBottom": "2px solid yellow"
"round": "4px"};
    return(
      <Accordion
        {...this.props}
        uniqId={'testAccordion'} singleOpen={true} openByDefault={true}   settings={setting}>

        <AccordionSection
         title="Section 1">
         {"OLD1"}
        </AccordionSection>

        <AccordionSection
         title="Section 2">
         {"OLD2"}
        </AccordionSection>

      </Accordion>
    )
  }
}
