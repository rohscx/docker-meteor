import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import {Accordion, AccordionSection}  from 'redux-accordion';
import { setName }from '../actions/userActions';
import { Form, FormGroup, FormControl, ControlLabel, Col, Button, Typeahead, Checkbox, InputGroup } from 'react-bootstrap';
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
    const {submitFormOnEnter} = this.state;

    return(
            <form onSubmit={e => alert('Form submitted!')}>
        <InputGroup>
          <Typeahead
            labelKey="name"
            options={options}
            placeholder="Choose a state..."
            submitFormOnEnter={submitFormOnEnter}
          />
          <InputGroup.Button>
            <Button type="submit">Submit</Button>
          </InputGroup.Button>
        </InputGroup>
        <Checkbox
          checked={submitFormOnEnter}
          onChange={e => this.setState({submitFormOnEnter: e.target.checked})}>
          Allow form submission
        </Checkbox>
      </form>
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
