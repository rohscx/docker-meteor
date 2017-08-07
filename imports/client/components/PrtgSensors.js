import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import {Accordion, AccordionSection}  from 'redux-accordion';
import { setName } from '../actions/userActions';
import Select from 'react-select';
import { hostName, getDevices } from '../actions/prtgActions';
import Table from './Prtg/Table';

class PrtgSensors extends Component {
    constructor(props) {
    super(props);

    this.state = {
      submitFormOnEnter: true,
    };
  }
  handleSearchFormInput(event) {
    this.props.hostName(event.target.value);
  }

  getDevices(){
    this.props.getDevices();
  }

  getDeviceNames(){
    let namesData = this.props.prtgDeviceNames;
    let namesDataArray = [];
    namesData.map((data, key)=>{
      let listItem = {value: key, label: data};
      namesDataArray.push(listItem);
    })
    return namesDataArray;
  }

  render() {
    const divStyles = {
      paddingTop: "5%",
      paddingBottom:"5%"
    };
    console.log(this);
    var options = this.getDeviceNames();

function logChange(val) {
  console.log("Selected: " + val);
}
    return(

<div className="section">
      <Select
        name="form-field-name"
        value="one"
        options={options}
        onChange={logChange}
      />
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
