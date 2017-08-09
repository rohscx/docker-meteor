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
    let inBits = this.props.util.bandwidthCalcData.numberToBits;
    let byteType = this.props.byteType;
    let test = this.props.dbReturn.map((data)=>{
      let transTimeSeconds = (dataSize, dataType, portSpeed)=>{
        switch(dataType){
          case "MB":
            // debug
            //console.log(dataSize,"  ",portSpeed)
            let inSeconds = dataSize / portSpeed;
            let NaNCheck = isNaN(inSeconds);
            console.log(NaNCheck)
            if (inSeconds <= 60){
              return (<td>{NaNCheck ? "n/a" : Math.round(inSeconds)} {NaNCheck ? "n/a" : " Seconds"}</td>)
            } else if (inSeconds > 60 && inSeconds < 3600){
              return (<td>{NaNCheck ? "n/a" : Math.round(inSeconds/60)}{NaNCheck ? "n/a" : " Minutes"}</td>)
            } else if (inSeconds > 3600 && inSeconds < 86400){
              return (<td>{NaNCheck ? "n/a" : Math.round(inSeconds/3600)}{NaNCheck ? "n/a" : " Hours"}</td>)
            } else if (inSeconds >= 86400){
              return (<td>{NaNCheck ? "n/a" : Math.round(inSeconds/86400)}{NaNCheck ? "n/a" : " Days"}</td>)
            }
            break;
          default:
        }
      }
      let newData = data.siteData.dataObj;
      let statusDanger = () =>{
        if(!newData){
          return 'danger';
        } else {
          return 'success';
        }
      }
      return (
        <tr key={data._id} onClick={()=>{this.openModal({newData})}}>
        <td>{newData.aca}</td>
        <td>{newData.branch}</td>
        <td className={statusDanger()}> {newData.wPortSpeed}</td>
        <td>{newData.wPortType}</td>
        {inBits ? transTimeSeconds(inBits,byteType,newData.wPortSpeed) : "null"}
      </tr>
      )
    })
    return (
      <div key={12}>
        <table className = "table table-striped table-hover table-responsive">
          <thead className="thead-default">
            <tr>
              <th>ACA</th>
              <th>Branch</th>
              <th>WAN Speed</th>
              <th>WAN TYPE</th>
              {inBits ? <th>Time</th> : null}
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
      </div>
    )
  }
}
