import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import {Accordion, AccordionSection}  from 'redux-accordion';
import { setName }from '../actions/userActions';
import { Form, FormGroup,FormControl,ControlLabel, Button } from 'react-bootstrap';
import { addNumber } from '../actions/iseActions'

class Ise extends Component {
  iseSearchForm(){
    const divStyles = {
      width: "20%"
    };
    return (
      <div style={divStyles}>
        <Form horizontal>
          <FormGroup controlId="formInlineName">
            <ControlLabel>Host MAC</ControlLabel>
            {' '}
            <FormControl type="text" placeholder="34:17:eb:a6:28:e5" />
          </FormGroup>
          {' '}
          <Button type="submit">
            Send invitation
          </Button>
        </Form>
      </div>
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
