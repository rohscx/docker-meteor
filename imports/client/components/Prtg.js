import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import {Accordion, AccordionSection}  from 'redux-accordion';
import { setName }from '../actions/userActions';
import { Form, FormGroup, FormControl, ControlLabel, Col, Button } from 'react-bootstrap';
import { addNumber } from '../actions/prtgActions'
import { hostName } from '../actions/utilActions'

class Prtg extends Component {
  handleSearchFormInput(event) {
    this.props.hostName(event.target.value);
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
    const hostName = () => {
      return (
        this.props.util.hostName.name
      );
    };
    const formInput = () => {
      return (
        this.handleSearchFormInput.bind(this)
      );
    };
    const validationStatus = () => {
      return (
        this.props.util.hostName.validationStatus
      );
    };

    const divStyles = {
      width: "40%"
    };

    return (
      <div style={divStyles}>
        <Form horizontal>
          <FormGroup controlId="formHorizontalHost" validationState={validationStatus()}>
            <Col componentClass={ControlLabel} sm={2}>
              MAC
            </Col>
            <Col sm={10}>
              <FormControl type="email" value={hostName()} placeholder="Host Name" onChange={formInput()} />
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup>
            {this.props.util.hostName.btnStyle ? btnEnabled() : btnDisabled()}
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
    hostName: (hostName) => {
      dispatch(setHostName(hostName));
    }
  };
};
export default connect(mapSateToProps, mapDispatchToProps) (Prtg);
