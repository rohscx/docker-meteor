import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import {Accordion, AccordionSection}  from 'redux-accordion';
import { setName }from '../actions/userActions';
import { Form, FormGroup, FormControl, ControlLabel, Col, Button, Typeahead, Checkbox} from 'react-bootstrap';
import { hostName, getDevices } from '../actions/prtgActions';
import Table from './Prtg/Table';

class PrtgSensors extends Component {
      constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      dropup: false,
      minLength: 0,
    };
  }

  render() {
    const {disabled, dropup, emptyLabel, minLength} = this.state;
    let options = () =>{
      let list = ["cats","dogs"];
      return list
    }
    return (
      <div>
        <Typeahead
          {...this.state}
          emptyLabel={emptyLabel ? '' : undefined}
          labelKey="name"
          multiple
          options={options}
          placeholder="Choose a state..."
        />
        <FormGroup>
        </FormGroup>
      </div>
    );
  }

  _handleChange = e => {
    const {checked, name} = e.target;
    const newState = {[name]: checked};

    if (name === 'minLength') {
      newState.minLength = checked ? 2 : 0;
    }

    this.setState(newState);
  }
}
export default connect() (PrtgSensors);
