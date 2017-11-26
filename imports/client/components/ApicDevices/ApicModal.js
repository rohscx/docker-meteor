import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import {Row,Col,Clearfix,Popover,ButtonToolbar,OverlayTrigger,Button,Tooltip,Modal} from 'react-bootstrap';

class ApicModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    that = this;
  };
  getInitialState() {
    return { showModal: false };
  };

  close() {
    that.setState({ showModal: false });
  };

  open() {
    that.setState({ showModal: true });
  };

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
    console.log(that)
    return (
      <div>

        <Button
          bsSize="xsmall"
          onClick={that.open}
        >
          {that.props.modalName}
        </Button>

        <Modal show={that.state.showModal} onHide={that.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

            <h4>Popover in a modal</h4>
            <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

            <h4>Tooltips in a modal</h4>
            <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            {that.props.modalData}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={that.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default ApicModal;