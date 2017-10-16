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
    dbData.map((data)=>{
      console.log(data)
      return (

      )
    })
  }

  render() {
    const divStyles = {
      paddingBottom:"5%"
    };
    console.log(this);
    return(
      <div style={divStyles}>
        <ViewGenerator {... this.props} handleData={this.handleData.bind(this)} />
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
