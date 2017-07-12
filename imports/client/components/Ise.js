import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import {Accordion, AccordionSection}  from 'redux-accordion';
import { setName }from '../actions/userActions';
import { FieldGroup, Button } from 'react-bootstrap';
import { addNumber } from '../actions/iseActions'

class Ise extends Component {
  iseSearchForm(){
    return (
      <form>
        <FieldGroup
          id="formContolsText"
          type="text"
          label="Text"
          placeholder="Enter Text"
        />
        <Button type="submit">
          Submit
        </Button>
      </form>
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
