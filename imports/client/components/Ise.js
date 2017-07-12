import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import {Accordion, AccordionSection}  from 'redux-accordion';
import { setName }from '../actions/userActions';
import { Form, FieldGroup,ControlLable, Button } from 'react-bootstrap';
import { addNumber } from '../actions/iseActions'

class Ise extends Component {
  iseSearchForm(){
    return (
      <Form inline>
        <FormGroup controlId="formInlineName">
          <ControlLable>NAME</ControlLable>
          {''}
          <FormControl type="text" placeholder="Jimmy me Jules" />
        </FormGroup>
      </Form>
    );
  }

  render() {
    console.log(this);
    const divStyles = {
      paddingTop: "5%",
      paddingBottom:"5%"
    };
    return(
      <div style={divStyles}>
        {this.iseSearchForm()}
      </div>
    )
  }
}

const mapSateToProps = (state) => {
  return {
    ise: state.iseReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNumber: (number) => {
      dispatch(setName(number));
    }
  };
};
export default connect(mapSateToProps, mapDispatchToProps) (Ise);
