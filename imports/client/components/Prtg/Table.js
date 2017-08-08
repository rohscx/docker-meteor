import React, {Component} from 'react';
import Modal from 'react-modal';
import { Session } from 'meteor/session';

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

  returnList() {
    let test = this.props.dbReturn.map((data)=>{
      let newData = data.prtgData.dataObj;
      let statusDanger = () =>{
        if(newData.status.toLowerCase() == 'unusual'){
          return 'danger';
        } else {
          return 'success';
        }
      }
      return (
        <tr key={data._id} onClick={()=>{this.openModal({newData})}}>
        <td>{newData.group}</td>
        <td>{newData.device}</td>
        <td className={statusDanger()}> {newData.status}</td>
        <td>{newData.sensor}</td>
      </tr>
      )
    })
    return (
      <div key={12}>
        <table className = "table table-striped table-hover table-responsive">
          <thead className="thead-default">
            <tr>
              <th>ACA</th>
              <th>Device Name</th>
              <th>Status</th>
              <th>Sensor</th>
            </tr>
          </thead>
          <tbody>
            {test}
          </tbody>
        </table>
      </div>
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


    tableDiv = this.props.dbReturnRdy ? this.returnList() : "";
    console.log(this)
    return(
      <div>
        {tableDiv}
        <div className="modal modal-content modal-responsive">
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="PRTG Modal"
          >
          </Modal>
        </div>
      </div>
    )
  }
}
