import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import {Accordion, AccordionSection}  from 'redux-accordion';
import { setName }from '../actions/userActions';
import { Form, FormGroup, FormControl, ControlLabel, Col, Button, Typeahead, Checkbox } from 'react-bootstrap';
import { hostName, getDevices } from '../actions/prtgActions';
import Table from './Prtg/Table';

class PrtgSensors extends Component {
  handleSearchFormInput(event) {
    this.props.hostName(event.target.value);
  }

  getDevices(){
    this.props.getDevices();
  }


  render() {
    const divStyles = {
      paddingTop: "5%",
      paddingBottom:"5%"
    };
    console.log(this);
    const {multiple} = {multiple: false};

    return(
      <div style={divStyles}>
        <Typeahead
          labelKey={option => `${option.firstName} ${option.lastName}`}
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
        <Table />
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
