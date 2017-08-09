import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { Mongo } from 'meteor/mongo';
import { connect } from 'react-redux';
import { setName }from '../actions/userActions';
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



  render() {
    const divStyles = {
      paddingTop: "1%",
      paddingBottom:"5%"
    };
    console.log(this);

    return(
      <div style={divStyles}>
        <Table {... this.props}/>
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
