import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import {Accordion, AccordionSection}  from 'redux-accordion';
import { setName }from '../actions/userActions';
import { Form, FormGroup, FormControl, ControlLabel, Col, Button, ListGroup } from 'react-bootstrap';
import { hostName, getDevices } from '../actions/prtgActions';
import Table from './Prtg/Table';

class PrtgSensors extends Component {
  handleSearchFormInput(event) {
    this.props.hostName(event.target.value);
  }

  getDevices(){
    this.props.getDevices();
  }


  prtgSearchForm(){
    const options = () => {
      this.props.prtgDeviceNames.map((data)=>{

        return (
          <option value="select">{data}</option>
        )
      })
    };

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
              Search
            </Col>
            <Col sm={10}>
              <FormControl type="email" value={hostName()} placeholder="Host Name" onChange={formInput()}>
                <option value="select">adsfasd</option>
              </FormControl>
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
    const divStyles = {
      paddingTop: "5%",
      paddingBottom:"5%"
    };
    console.log(this);
    return(
      <div style={divStyles}>
        {this.prtgSearchForm()}
        <Table {... this.props}/>
      </div>
    )
  }
}

const mapSateToProps = (state) => {
  return {
    util: state.utilReducer,
    prtg: state.prtgReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hostName: (name) => {
      dispatch(hostName(name));
    },
    getDevices: () => {
      dispatch(getDevices());
    }
  };
};
export default connect(mapSateToProps, mapDispatchToProps) (PrtgSensors);
