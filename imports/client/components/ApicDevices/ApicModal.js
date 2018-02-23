import React, {Component} from 'react';
import createReactClass from 'create-react-class';
import {Row,Col,Clearfix,Popover,ButtonToolbar,OverlayTrigger,Button,Tooltip,Modal} from 'react-bootstrap';
import FileDownload from '../../utilities/FileDownload';
import ExportButton from '../../utilities/ExportButton';
import CreateCSV from '../../utilities/CreateCSV';

const ApicModal = createReactClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );
    //console.log(this)
    return (
      <div>

        <Button
          bsSize="xsmall"
          onClick={this.open}
        >
          {this.props.buttonName}
        </Button>

        <Modal show={this.state.showModal} onHide={this.close} bsSize="large" aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">{this.props.hostName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{align:"left"}}>
              {this.props.search}
              {this.props.download}
            </div>
            <div ref={node => this.node = node} style={{fontSize:"78%"}}>
              {this.props.modalData}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
});

export default ApicModal;
