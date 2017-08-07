import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import {Accordion, AccordionSection}  from 'redux-accordion';
import { setName }from '../actions/userActions';
import { Form, FormGroup, FormControl, ControlLabel, Col, Button, Typeahead, Checkbox } from 'react-bootstrap';
import { hostName, getDevices } from '../actions/prtgActions';
import Table from './Prtg/Table';

class PrtgSensors extends Component {
    constructor(props) {
    super(props);

    this.state = {
      multiple: false,
    };
  }
  handleSearchFormInput(event) {
    this.props.hostName(event.target.value);
  }

  getDevices(){
    this.props.getDevices();
  }


  prtgSearchForm(){
    const options = () => {
      this.props.prtgDeviceNames.map((data)=>{

        return data
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
const {multiple} = this.state;

    return (
      <div style={divStyles}>
        <Typeahead
          labelKey="name"
          multiple={multiple}
            options={[
    {firstName: 'Art', lastName: 'Blakey'},
    {firstName: 'Jimmy', lastName: 'Cobb'},
    {firstName: 'Elvin', lastName: 'Jones'},
    {firstName: 'Max', lastName: 'Roach'},
    {firstName: 'Tony', lastName: 'Williams'},
  ]}
          placeholder="Choose a state..."
        />
        <Checkbox
          checked={multiple}
          onChange={console.log("Cats")}>
          Multi-Select
        </Checkbox>
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
        <Typeahead
          labelKey="name"
          multiple={multiple}
            options={[
    {firstName: 'Art', lastName: 'Blakey'},
    {firstName: 'Jimmy', lastName: 'Cobb'},
    {firstName: 'Elvin', lastName: 'Jones'},
    {firstName: 'Max', lastName: 'Roach'},
    {firstName: 'Tony', lastName: 'Williams'},
  ]}
          placeholder="Choose a state..."
        />
        <Checkbox
          checked={multiple}
          onChange={console.log("Cats")}>
          Multi-Select
        </Checkbox>
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
