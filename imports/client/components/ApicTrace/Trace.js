import React, {Component} from 'react';
import { Session } from 'meteor/session';
import {Accordion, AccordionSection}  from 'redux-accordion';
// WORK IN PROGRESS
export default class Trace extends Component {

  render() {

    return(
      <Accordion
        uniqId={'testAccordion'}
        settings={
          headerBackgroundColor: "red",
          headerBackgroundColorActive: 'pink',
          headerColor: "black",
          contentBackgroundColor: "blue",
          borderBottom: "2px solid yellow"
          round: "4px"
        }
        >

        {"DKSJFLSDFL:SDJ"}

      </Accordion>
    )
  }
}
