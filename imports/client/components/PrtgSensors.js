import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import {Accordion, AccordionSection}  from 'redux-accordion';
import { setName }from '../actions/userActions';
import { Form, FormGroup, FormControl, ControlLabel, Col, Button} from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';
import { hostName, getDevices } from '../actions/prtgActions';
import Table from './Prtg/Table';
import Autosuggest, { ItemAdapter } from 'react-bootstrap-autosuggest'

class PrtgSensors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value:''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value})
  }

  handleSearchFormInput(event) {
    console.log(event.target.value)
    this.props.hostName(event.target.value);
  }

  getDevices(){
    this.props.getDevices();
  }

  logTest(e){
    console.log(e);
  }

  getDeviceNames(){
    let namesArray = [];
    this.props.prtgDeviceNames.map((data)=>{
      namesArray.push(data);
    })
    return namesArray;
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

    return (
      <div style={divStyles}>
        <FormGroup>
        </FormGroup>
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
      <div>
        <FormGroup controlId="browserInput"
  >
  <ControlLabel>Browser</ControlLabel>
  <Autosuggest
    datalist={['Chrome', 'Firefox', 'Internet Explorer', 'Opera', 'Safari']}
    placeholder="What browser do you use?"
    value={browser}
    onChange={onChange}
 />
  {validationState && <FormControl.Feedback />}
  {validationState && <HelpBlock>Please select a browser</HelpBlock>}
</FormGroup>
        <div style={divStyles}>
          {this.prtgSearchForm()}
          <Table {... this.props}/>
        </div>
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
