import React, {Component} from 'react';
import Modalfrom 'react-modal';
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

    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>


    )
  }

  render() {
    returnList = this.props.prtgItems.map((data)=>{
      let newData = data.prtgData.dataObj;
      // debug
      //console.log(data.prtgData.dataObj);
      //console.log("DB_ID",data["_id"])
      return (
        <div key={data._id}>
          <table className = "table table-striped table-hover table-responsive" onClick={()=>{this.handleClick}}>
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
      </div>
    )
  }
}
