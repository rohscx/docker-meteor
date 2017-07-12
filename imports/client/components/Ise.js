import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import {Accordion, AccordionSection}  from 'redux-accordion';
import { setName }from '../actions/userActions';
import { Form, FormGroup, FormControl, ControlLabel, Col, Button } from 'react-bootstrap';
import { addNumber } from '../actions/iseActions'
import { validateMac } from '../actions/utilActions'

class Ise extends Component {
  handleSearchFormInput(event) {
    this.props.validateMac(event.target.value);
  }

  iseSearchForm(){
    const divStyles = {
      width: "40%"
    };
    return (
      <div style={divStyles}>
        <Form horizontal>
          <FormGroup controlId="formHorizontalMac" validationState={this.props.util.macValidation.validationStatus}>
            <Col componentClass={ControlLabel} sm={2}>
              MAC
            </Col>
            <Col sm={10}>
              <FormControl type="email" value={this.props.util.macValidation.macAddress} placeholder="Host MAC ADDRESS" onChange={this.handleSearchFormInput.bind(this)} />
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup>
            {this.props.util.macValidation.btnStyle ? <Col smOffset={2} sm={10}><Button type="button" bsStyle="primary" block>Submit</Button></Col> : <Col smOffset={2} sm={10}><Button  type="button" disabled block> <b> . . . </b></Button></Col>}
          </FormGroup>
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
    console.log(this);
    return(
      <div style={divStyles}>
        {this.iseSearchForm()}
      </div>
    )
  }
}

const mapSateToProps = (state) => {
  return {
    ise: state.iseReducer,
    util: state.utilReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNumber: (number) => {
      dispatch(setName(number));
    },
    validateMac: (mac) => {
      dispatch(validateMac(mac));
    }
  };
};
export default connect(mapSateToProps, mapDispatchToProps) (Ise);
