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

  render() {
    const divStyles = {
      paddingBottom:"5%"
    };
    console.log(this);
    return(
      <div style={divStyles}>
        <ViewGenerator {... this.props} />
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
