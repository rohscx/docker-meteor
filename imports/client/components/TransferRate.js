import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import { Form, FormGroup, FormControl, ControlLabel, Col, Button } from 'react-bootstrap';
import { hostName, getDevices } from '../actions/prtgActions';

//import {ItemsPrtg} from '../../api/prtg';

class TransferRate extends Component {
  handleSearchFormInput(event) {
    let value = event.target.value
    console.log(value)
    this.props.dbSearch(value);
    this.props.hostName(value);
  }

  preventDefault(e){
    e.preventDefault();
  }

  getDevices(){
    this.props.getDevices();
  }

  handleSearchFormInput(event) {
    let value = event.target.value
    console.log(value)
    this.props.dbSearch(value);
    this.props.hostName(value);
  }

  preventDefault(e){
    e.preventDefault();
  }

  getDevices(){
    this.props.getDevices();
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
      let dataCount = this.props.dbReturn.length;
      let dataReady = this.props.dbReturnRdy;
      if(dataReady === false){
        return null;
      } else if(dataReady === true && dataCount <= 0){
        return "error";
      } else{
        return "success";
      }
      /*
      return (
        this.props.util.hostName.validationStatus
      );*/
    };

    const divStyles = {
      margin: "auto",
      width: "40%"
    };

    return (
      <div style={divStyles}>
        <form onSubmit= {e =>{this.preventDefault(e)}}>
          <FormGroup controlId="formHorizontalHost" validationState={validationStatus()}>
            <Col componentClass={ControlLabel} sm={2}>
              Search
            </Col>
            <Col sm={10}>
              <FormControl type="text" value={hostName()} placeholder="Host Name" onChange={formInput()} />
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup>

          </FormGroup>
        </form>
      </div>
    );
  }


  render() {
    const divStyles = {
      paddingTop: "1%",
      paddingBottom:"5%"
    };
    console.log(this);

    return(
      <div style={divStyles}>

      </div>
    )
  }
}

const mapSateToProps = (state) => {
  return {
    util: state.utilReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hostName: (name) => {
      dispatch(hostName(name));
    },
  };
};
export default connect(mapSateToProps, mapDispatchToProps) (TransferRate);
