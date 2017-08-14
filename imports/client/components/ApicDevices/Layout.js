import React, {Component} from 'react';
import Modal from 'react-modal';
import { Session } from 'meteor/session';
import {Row,Col} from 'react-bootstrap';
export default class Table extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      modalLink: {newData:{graph:false}}
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }



  openModal(link) {
    this.setState({modalIsOpen: true});
    this.setState({modalLink: link});
    // debug
    //console.log(this.state.modalLink);
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  returnLayout() {
    return (
      <Row className="show-grid">
      <Col xs={6} xsOffset={6}><code>&lt;{'Col xs={6} xsOffset={6}'} /&gt;</code></Col>
      </Row>
    )
  }



  render() {
    const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    height                : '300px',
    width                 : '920px',
    transform             : 'translate(-50%, -50%)',
    background            : `url(${this.state.modalLink.newData.graph})`,
    backgroundSize        : 'contain',
    opacity               : '100'
  }

};


    //tableDiv = this.props.dbReturnRdy ? this.returnList() : "";
    tableDiv = this.props.dbReturnRdy ? this.returnLayout() : "";
    console.log(this)
    return(
      <div>
        {tableDiv}
      </div>
    )
  }
}
