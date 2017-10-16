import React, {Component} from 'react';
import Modal from 'react-modal';
import { Session } from 'meteor/session';

export default class ViewGenerator extends Component {
  constructor() {
    super();

    this.state = {
    };

  }

  returnLayout() {

    let handleData = this.props.handleData;
    //console.log(findLimit)
    let passStyle = {
      backgroundColor:"#5cb85c"
    }
    let failStyle = {
      backgroundColor:"#d9534f"
    }
    const divStyles = {
      paddingTop: '5%',
      paddingButtom: '5%'
    }
    const rowStylesMain = {
      fontWeight: "bold"
    }

    /*
    let dbData = this.props.dbReturn(findField,sortField,sortOrderField,findLimit);
    let colData = dbData.map((data)=>{
      return (
        <div key={data["_id"]} style= {divStyles}>
          <Row className="show-grid" style={rowStylesMain}>
            <Col xs={8} sm={6} md={3}>{data}</Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} sm={6} md={2}>{data}</Col>
          </Row>
        </div>
      )
    })

    //this.props.apicDbReady(true)
    return colData;
    */
    console.log("handleDataMan!",this.props.handleData)
    return (
      <div key={handleData["_id"]} style= {divStyles}>
        <Row className="show-grid" style={rowStylesMain}>
          <Col xs={8} sm={6} md={3}>{handleData._id}</Col>
        </Row>
        <Row className="show-grid">
          <Col xs={6} sm={6} md={2}>{data.webServerData.dataObj.name}</Col>
        </Row>
      </div>
    )
  }

render() {
    //console.log(this)
    return(
      <div>
        {this.returnLayout()}
      </div>
    )
  }
}
