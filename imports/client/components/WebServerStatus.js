import React, {Component} from 'react';
import { Session } from 'meteor/session';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl, DropdownButton, MenuItem } from 'react-bootstrap';
import ViewGenerator from './WebServerStatus/ViewGenerator';

class WebServerStatus extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  handleData () {
    let findField = ".";
    let sortField = "name";
    let sortOrderField = -1;
    let findLimit =  this.props.dbFindLimit;
    let dbData = this.props.dbReturn(findField,sortField,sortOrderField,findLimit);
    dbData.map((data,key)=>{
      // debug
      //console.log(key+" : "+data)
      return data
    })
  }

  handleAdminStatus (dbId,statusData) {
    if (statusData == 1) {
      Meteor.call('updateItemsWebServerStatus', dbId, 0)
    } else {
      Meteor.call('updateItemsWebServerStatus', dbId, 1)
    }
  }

  render() {
    const divStylesGenerator = ()=>{
      // debug
      //console.log("Mobile Device Connected",/Mobi/.test(navigator.userAgent))
      let divStyles = (widthPercent)=>{
        return {
          paddingBottom:"5%",
          width: widthPercent
        };
      };
      // dynamically set the the width of the primary div. Mobile devices are 100%
      if (/Mobi/.test(navigator.userAgent) === true) {
        return divStyles("100%");
      } else {
        return divStyles("100%");
      }
    };
    // debug
    //console.log(this);
    return(
      <div style={divStylesGenerator()} className="container-fluid">
        <ViewGenerator {... this.props} setAdminStatus = {this.handleAdminStatus.bind(this)}/>
      </div>
    )
  }
}

const mapSateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapSateToProps, mapDispatchToProps) (WebServerStatus);
