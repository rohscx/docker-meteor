import React, {Component} from 'react';
import Modal from 'react-modal';
import { Session } from 'meteor/session';

export default class Devices extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }




  handleClick(){


  }

  render() {
    const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
    returnList = this.props.prtgItems.map((data)=>{
      let newData = data.prtgData.dataObj;
      // debug
      //console.log(data.prtgData.dataObj);
      //console.log("DB_ID",data["_id"])
      return (
        <div key={data._id}>
          <table className = "table table-striped table-hover table-responsive" onClick={()=>{this.openModal()}}>
            <thead>
              <tr>
                <th>ACA</th>
                <th>Device Name</th>
                <th>Status</th>
                <th>Sensor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{newData.group}</td>
                <td>{newData.device}</td>
                <td>{newData.status}</td>
                <td>{newData.sensor}</td>
              </tr>
            </tbody>
          </table>
        </div>

      );
    })
    console.log(this)
    return(
      <div>
        {returnList}
        <div className="modal-content">
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
          >
            <div id="myModal" className="modal fade" role="dialog">
              <div class="modal-dialog">

                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" class="close" dataDismiss="modal">&times;</button>
                    <h4 className="modal-title">Modal Header</h4>
                  </div>
                  <div className="modal-body">
                    <p>Some text in the modal.</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" dataDismiss="modal">Close</button>
                  </div>
                </div>

              </div>
            </div>
            </Modal>
        </div>
      </div>
    )
  }
}
