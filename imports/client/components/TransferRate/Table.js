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
    let byteType = this.props.util.bandwidthCalcData.byteType;
    let test = this.props.dbReturn.map((data)=>{
      let transTimeSeconds = (dataSize, dataType, portSpeed)=>{
        let inSeconds, NaNCheck
        switch(dataType){
          case "MB":
            // debug
            //console.log(dataSize,"  ",portSpeed)
            inSeconds = dataSize / portSpeed;
            NaNCheck = isNaN(inSeconds);
            if (inSeconds <= 60){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n/a" : Math.round(inSeconds)} {NaNCheck ? "n/a" : " Seconds"}</td>)
            } else if (inSeconds > 60 && inSeconds < 3600){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n/a" : Math.round(inSeconds/60)}{NaNCheck ? "n/a" : " Minutes"}</td>)
            } else if (inSeconds > 3600 && inSeconds < 86400){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n/a" : Math.round(inSeconds/3600)}{NaNCheck ? "n/a" : " Hours"}</td>)
            } else if (inSeconds >= 86400){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n/a" : Math.round(inSeconds/86400)}{NaNCheck ? "n/a" : " Days"}</td>)
            }
            break;
          case "GB":
            // debug
            //console.log(dataSize,"  ",portSpeed)
            inSeconds = ((dataSize * 1024) / portSpeed);
            NaNCheck = isNaN(inSeconds);
            if (inSeconds <= 60){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n/a" : Math.round(inSeconds)} {NaNCheck ? "n/a" : " Seconds"}</td>)
            } else if (inSeconds > 60 && inSeconds < 3600){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n/a" : Math.round(inSeconds/60)}{NaNCheck ? "n/a" : " Minutes"}</td>)
            } else if (inSeconds > 3600 && inSeconds < 86400){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n/a" : Math.round(inSeconds/3600)}{NaNCheck ? "n/a" : " Hours"}</td>)
            } else if (inSeconds >= 86400){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n/a" : Math.round(inSeconds/86400)}{NaNCheck ? "n/a" : " Days"}</td>)
            }
            break;
          case "TB":
            // debug
            //console.log(dataSize,"  ",portSpeed)
            inSeconds = (((dataSize * 1024)*1024) / portSpeed);
            NaNCheck = isNaN(inSeconds);
            if (inSeconds <= 60){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n/a" : Math.round(inSeconds)} {NaNCheck ? "n/a" : " Seconds"}</td>)
            } else if (inSeconds > 60 && inSeconds < 3600){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n/a" : Math.round(inSeconds/60)}{NaNCheck ? "n/a" : " Minutes"}</td>)
            } else if (inSeconds > 3600 && inSeconds < 86400){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n/a" : Math.round(inSeconds/3600)}{NaNCheck ? "n/a" : " Hours"}</td>)
            } else if (inSeconds >= 86400){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n/a" : Math.round(inSeconds/86400)}{NaNCheck ? "n/a" : " Days"}</td>)
            }
            break;
          case "PB":
            // debug
            //console.log(dataSize,"  ",portSpeed)
            inSeconds = ((((dataSize * 1024)*1024)*1024) / portSpeed);
            NaNCheck = isNaN(inSeconds);
            if (inSeconds <= 60){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n/a" : Math.round(inSeconds)} {NaNCheck ? "n/a" : " Seconds"}</td>)
            } else if (inSeconds > 60 && inSeconds < 3600){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n/a" : Math.round(inSeconds/60)}{NaNCheck ? "n/a" : " Minutes"}</td>)
            } else if (inSeconds > 3600 && inSeconds < 86400){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n/a" : Math.round(inSeconds/3600)}{NaNCheck ? "n/a" : " Hours"}</td>)
            } else if (inSeconds >= 86400){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n/a" : Math.round(inSeconds/86400)}{NaNCheck ? "n/a" : " Days"}</td>)
            }
            break;
          case "ZB":
            // debug
            //console.log(dataSize,"  ",portSpeed)
            inSeconds = (((((dataSize * 1024)*1024)*1024)*1024) / portSpeed);
            NaNCheck = isNaN(inSeconds);
            if (inSeconds <= 60){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n/a" : Math.round(inSeconds)} {NaNCheck ? "n/a" : " Seconds"}</td>)
            } else if (inSeconds > 60 && inSeconds < 3600){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n/a" : Math.round(inSeconds/60)}{NaNCheck ? "n/a" : " Minutes"}</td>)
            } else if (inSeconds > 3600 && inSeconds < 86400){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n/a" : Math.round(inSeconds/3600)}{NaNCheck ? "n/a" : " Hours"}</td>)
            } else if (inSeconds >= 86400){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n/a" : Math.round(inSeconds/86400)}{NaNCheck ? "n/a" : " Days"}</td>)
            }
            break;
          default:
        }
      }
      let newData = data.siteData.dataObj;
      let statusDanger = (time) =>{
        if(time >=216000){
          return 'danger';
        } else {
          return 'success';
        }
      }
      return (
        <tr key={data._id} onClick={()=>{this.openModal({newData})}}>
        <td>{newData.aca}</td>
        <td>{newData.branch}</td>
        <td> {newData.wPortSpeed}</td>
        <td>{newData.wPortType}</td>
        <td>{newData.iPortSpeedUp}/{newData.iPortSpeedDown}</td>
        <td>{newData.iPortType}</td>
        {inBits ? transTimeSeconds(inBits,byteType,newData.wPortSpeed) : null}
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
              <th>INET Speed Up/Down</th>
              <th>INET TYPE</th>
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
