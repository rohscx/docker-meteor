import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl, DropdownButton, MenuItem } from 'react-bootstrap';
import { hostName, getDevices } from '../actions/prtgActions';
import Table from './TransferRate/Table';
import { bandwidthCalc, sortBy } from '../actions/utilActions'

class TransferRate extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  handleSearchFormInput(event) {
    let value = event.target.value;
    let byteType = this.props.util.bandwidthCalcData.byteType;
    this.props.bandwidthCalc(value,byteType,null);
  }

  preventDefault(e){
    e.preventDefault();
  }

  getDevices(){
    this.props.getDevices();
  }

  setByteType(data){
    let value = this.props.util.bandwidthCalcData.number;
    let byteType = data;
    this.props.bandwidthCalc(value,byteType,null);
  }

  setSortBy(){
    this.props.sortBy()
    this.props.dbReturnSort("aca", (result)=>{
      console.log("HITTTTT",result)

    })
  }

  preventDefault(e){
    e.preventDefault();
  }

  getDevices(){
    this.props.getDevices();
  }

  form(){
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
      let dataReturn = this.props.util.bandwidthCalcData.number;
      let dataReady = this.props.util.bandwidthCalcData.validationStatus;
      let dataValueCheck = dataReturn ? 10 : ""
      if(dataValueCheck.length <= 0){
        return null;
      } else if (isNaN(dataReturn) == true){
        return "error";
      } else {
        return "success";
      }
    };

    const divStyles = {
      margin: "auto",
      width: "40%"
    };
    let byteType = this.props.util.bandwidthCalcData.byteType;
    return (
      <div style={divStyles}>
        <form onSubmit= {e =>{this.preventDefault(e)}}>
          <FormGroup validationState={validationStatus()}>
             <InputGroup>
               <FormControl placeholder="Enter Data Size..." type="text" onChange={formInput()}/>
               <DropdownButton
                 componentClass={InputGroup.Button}
                 id="input-dropdown-addon"
                 title={byteType}
               >
                 <MenuItem key="1" onSelect= {()=>{this.setByteType("MB")}}>MB</MenuItem>
                 <MenuItem key="2" onSelect= {()=>{this.setByteType("GB")}}>GB</MenuItem>
                 <MenuItem key="3" onSelect= {()=>{this.setByteType("TB")}}>TB</MenuItem>
                 <MenuItem key="4" onSelect= {()=>{this.setByteType("PB")}}>PB</MenuItem>
                 <MenuItem key="5" onSelect= {()=>{this.setByteType("ZB")}}>ZB</MenuItem>
               </DropdownButton>
             </InputGroup>
           </FormGroup>
        </form>
      </div>
    );
  }



  render() {
    const divStyles = {
      paddingBottom:"5%"
    };
    console.log(this);

    return(
      <div style={divStyles}>
        {this.form()}
        <Table {... this.props}/>
        {this.props.sortBy("bbb")}
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
    bandwidthCalc: (number,byteType,cdase) => {
      dispatch(bandwidthCalc(number,byteType,cdase));
    },
    sortBy: (blob) => {
      dispatch(sortBy(blob));
    },
  };
};
export default connect(mapSateToProps, mapDispatchToProps) (TransferRate);
