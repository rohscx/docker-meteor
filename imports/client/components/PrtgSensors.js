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


  render() {
    const divStyles = {
      paddingTop: "5%",
      paddingBottom:"5%"
    };
    console.log(this);
          var options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
];
 
function logChange(val) {
  console.log("Selected: " + val);
}
    return(

 
<Select
  name="form-field-name"
  value="one"
  options={options}
  onChange={logChange}
/>
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
