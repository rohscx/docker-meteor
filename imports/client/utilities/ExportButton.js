import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import {  Button } from 'react-bootstrap';
import FileDownload from './FileDownload'
// note: THis does not provide true secuirty, it simply obfuscates

const ExportButton = createReactClass({
  getInitialState() {
    return {
      isLoading: false,
    };
  },

  render() {
    let isLoading = this.state.isLoading;
    return (
      <Button
        bsStyle={!isLoading ? "primary" : "danger"}
        bsSize="xsmall"
        disabled={isLoading}
        onClick={!isLoading ? this.handleClick : null}
      >
        {isLoading ? 'Generating...' : this.props.fileName}
      </Button>
    );
  },

  handleClick() {
    this.setState({ isLoading: true });
    // This probably where you would have an `ajax` call
    setTimeout(() => {
      // Debug
      //console.log(this)
      FileDownload(this.props.fileName,this.props.fileData.getData());
      this.setState({ isLoading: false });
    }, 2000);
  },
});


// checks type, throws and error. children should be simple object in a div
/*
IsRole.propTypes = {
  role: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired
};
*/
export default ExportButton;
