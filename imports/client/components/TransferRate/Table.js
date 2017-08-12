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
    let anothertest = this.props.dbReturn("wPortSpeed");
    let test = anothertest.map((data)=>{
      let transTimeSeconds = (dataSize, dataType, portSpeed)=>{
        let inSeconds, NaNCheck
        switch(dataType){
          case "MB":
            // debug
            //console.log(dataSize,"  ",portSpeed)
            inSeconds = dataSize / portSpeed;
            NaNCheck = isNaN(inSeconds);
            if (inSeconds <= 60){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds)} {NaNCheck ? "/a" : " Seconds"}</td>)
            } else if (inSeconds >= 60 && inSeconds < 3600){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/60)}{NaNCheck ? "/a" : " Minutes"}</td>)
            } else if (inSeconds >= 3600 && inSeconds < 86400){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/3600)}{NaNCheck ? "/a" : " Hours"}</td>)
            } else if (inSeconds >= 86400 && inSeconds < 604800){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/86400)}{NaNCheck ? "/a" : " Days"}</td>)
            } else if (inSeconds >= 604800 && inSeconds < 2628000){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/604800)}{NaNCheck ? "/a" : " Weeks"}</td>)
            } else if (inSeconds >= 2628000 && inSeconds < 31540000){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/2628000)}{NaNCheck ? "/a" : " Months"}</td>)
            } else {
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/31540000)}{NaNCheck ? "/a" : " Years"}</td>)
            }
            break;
          case "GB":
            // debug
            //console.log(dataSize,"  ",portSpeed)
            inSeconds = ((dataSize * 1024) / portSpeed);
            NaNCheck = isNaN(inSeconds);
            if (inSeconds <= 60){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds)} {NaNCheck ? "/a" : " Seconds"}</td>)
            } else if (inSeconds >= 60 && inSeconds < 3600){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/60)}{NaNCheck ? "/a" : " Minutes"}</td>)
            } else if (inSeconds >= 3600 && inSeconds < 86400){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/3600)}{NaNCheck ? "/a" : " Hours"}</td>)
            } else if (inSeconds >= 86400 && inSeconds < 604800){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/86400)}{NaNCheck ? "/a" : " Days"}</td>)
            } else if (inSeconds >= 604800 && inSeconds < 2628000){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/604800)}{NaNCheck ? "/a" : " Weeks"}</td>)
            } else if (inSeconds >= 2628000 && inSeconds < 31540000){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/2628000)}{NaNCheck ? "/a" : " Months"}</td>)
            } else {
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/31540000)}{NaNCheck ? "/a" : " Years"}</td>)
            }
            break;
          case "TB":
            // debug
            //console.log(dataSize,"  ",portSpeed)
            inSeconds = (((dataSize * 1024)*1024) / portSpeed);
            NaNCheck = isNaN(inSeconds);
            if (inSeconds <= 60){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds)} {NaNCheck ? "/a" : " Seconds"}</td>)
            } else if (inSeconds >= 60 && inSeconds < 3600){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/60)}{NaNCheck ? "/a" : " Minutes"}</td>)
            } else if (inSeconds >= 3600 && inSeconds < 86400){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/3600)}{NaNCheck ? "/a" : " Hours"}</td>)
            } else if (inSeconds >= 86400 && inSeconds < 604800){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/86400)}{NaNCheck ? "/a" : " Days"}</td>)
            } else if (inSeconds >= 604800 && inSeconds < 2628000){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/604800)}{NaNCheck ? "/a" : " Weeks"}</td>)
            } else if (inSeconds >= 2628000 && inSeconds < 31540000){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/2628000)}{NaNCheck ? "/a" : " Months"}</td>)
            } else {
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/31540000)}{NaNCheck ? "/a" : " Years"}</td>)
            }
            break;
          case "PB":
            // debug
            //console.log(dataSize,"  ",portSpeed)
            inSeconds = ((((dataSize * 1024)*1024)*1024) / portSpeed);
            NaNCheck = isNaN(inSeconds);
            if (inSeconds <= 60){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds)} {NaNCheck ? "/a" : " Seconds"}</td>)
            } else if (inSeconds >= 60 && inSeconds < 3600){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/60)}{NaNCheck ? "/a" : " Minutes"}</td>)
            } else if (inSeconds >= 3600 && inSeconds < 86400){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/3600)}{NaNCheck ? "/a" : " Hours"}</td>)
            } else if (inSeconds >= 86400 && inSeconds < 604800){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/86400)}{NaNCheck ? "/a" : " Days"}</td>)
            } else if (inSeconds >= 604800 && inSeconds < 2628000){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/604800)}{NaNCheck ? "/a" : " Weeks"}</td>)
            } else if (inSeconds >= 2628000 && inSeconds < 31540000){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/2628000)}{NaNCheck ? "/a" : " Months"}</td>)
            } else {
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/31540000)}{NaNCheck ? "/a" : " Years"}</td>)
            }
            break;
          case "ZB":
            // debug
            //console.log(dataSize,"  ",portSpeed)
            inSeconds = (((((dataSize * 1024)*1024)*1024)*1024) / portSpeed);
            NaNCheck = isNaN(inSeconds);
            if (inSeconds <= 60){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds)} {NaNCheck ? "/a" : " Seconds"}</td>)
            } else if (inSeconds >= 60 && inSeconds < 3600){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/60)}{NaNCheck ? "/a" : " Minutes"}</td>)
            } else if (inSeconds >= 3600 && inSeconds < 86400){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/3600)}{NaNCheck ? "/a" : " Hours"}</td>)
            } else if (inSeconds >= 86400 && inSeconds < 604800){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/86400)}{NaNCheck ? "/a" : " Days"}</td>)
            } else if (inSeconds >= 604800 && inSeconds < 2628000){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/604800)}{NaNCheck ? "/a" : " Weeks"}</td>)
            } else if (inSeconds >= 2628000 && inSeconds < 31540000){
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/2628000)}{NaNCheck ? "/a" : " Months"}</td>)
            } else {
              return (<td className={statusDanger(Math.round(inSeconds))}>{NaNCheck ? "n" : Math.round(inSeconds/31540000)}{NaNCheck ? "/a" : " Years"}</td>)
            }
            break;
          default:
        }
      }
      let newData = data.siteData.dataObj;
      let statusDanger = (time) =>{
        if(isNaN(time)){
          return null;
        } else if(time >=212400) {
          return 'danger';
        } else {
          return 'success';
        }
      }
      return (
        <tr key={data._id} onClick={()=>{this.openModal({newData})}}>
        <td>{newData.aca}</td>
        <td>{newData.branch}</td>
        <td>{newData.wPortSpeed}</td>
        <td>{newData.wPortType}</td>
        <td>{newData.iSpeedUp +"/"+ newData.iSpeedDown}</td>
        <td>{newData.iPortType}</td>
        {inBits ? transTimeSeconds(inBits,byteType,newData.wPortSpeed) : null}
        {inBits ? transTimeSeconds(inBits,byteType,newData.iSpeedUp) : null}
        {inBits ? transTimeSeconds(inBits,byteType,newData.iSpeedDown) : null}
      </tr>
      )
    })
    return (
      <div key={12}>
        <table className = "table table-striped table-hover table-responsive">
          <thead className="thead-default">
            <tr>
              <th onClick={()=>{setMan(this.props.dbReturnSort("aca"))}}>ACA</th>
              <th onClick={()=>{setMan(this.props.dbReturnSort("branch"))}}>Branch</th>
              <th onClick={()=>{setMan(this.props.dbReturnSort("wPortSpeed"))}}>WAN Speed</th>
              <th onClick={()=>{setMan(this.props.dbReturnSort("wPortType"))}}>WAN TYPE</th>
              <th onClick={()=>{setMan(this.props.dbReturnSort("iSpeedUp"))}}>INET Speed Down/Up</th>
              <th onClick={()=>{setMan(this.props.dbReturnSort("iPortType"))}}>INET TYPE</th>
              {inBits ? <th>R1 WAN Speed Down/Up Time</th> : null}
              {inBits ? <th>R2 INET Speed Down Time</th> : null}
              {inBits ? <th>R2 INET Speed Up Time</th> : null}
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
