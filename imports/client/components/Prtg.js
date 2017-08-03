import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import {Accordion, AccordionSection}  from 'redux-accordion';
import { setName }from '../actions/userActions';
import { Form, FormGroup, FormControl, ControlLabel, Col, Button } from 'react-bootstrap';
import { addNumber } from '../actions/prtgActions'
import { validateMac } from '../actions/utilActions'

class Prtg extends Component {
  handleSearchFormInput(event) {
    this.props.validateMac(event.target.value);
  }

  prtgSearchForm(){
    const btnEnabled = () => {
      return (
        <Col smOffset={2} sm={10}><Button type="button" bsStyle="primary" block>Submit</Button></Col>
      );
    };
    const btnDisabled = () => {
      return (
        <Col smOffset={2} sm={10}><Button  type="button" disabled block> <b> . . . </b></Button></Col>
      );
    };
    const macAddress = () => {
      return (
        this.props.util.macValidation.macAddress
      );
    };
    const fromInput = () => {
      return (
        this.handleSearchFormInput.bind(this)
      );
    };
    const validationStatus = () => {
      return (
        this.props.util.macValidation.validationStatus
      );
    };

    const divStyles = {
      width: "40%"
    };

    return (
      <div style={divStyles}>
        <Form horizontal>
          <FormGroup controlId="formHorizontalMac" validationState={validationStatus()}>
            <Col componentClass={ControlLabel} sm={2}>
              MAC
            </Col>
            <Col sm={10}>
              <FormControl type="email" value={macAddress()} placeholder="Host MAC ADDRESS" onChange={fromInput()} />
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup>
            {this.props.util.macValidation.btnStyle ? btnEnabled() : btnDisabled()}
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
        {this.prtgSearchForm()}
      </div>
    )
  }
}

const mapSateToProps = (state) => {
  return {
    prtg: state.prtgReducer,
    util: state.utilReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNumber: (number) => {
      dispatch(setName(number));
    },
    validateHostName: (mac) => {
      dispatch(validateMac(mac));
    }
  };
};
export default connect(mapSateToProps, mapDispatchToProps) (Prtg);
