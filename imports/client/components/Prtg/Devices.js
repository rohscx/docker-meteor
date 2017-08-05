import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class Devices extends Component {
   state = {
    modalVisible: false,
  }

 setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleClick2(){
      return (
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>

    );
  }

  handleClick(){
    return (
      <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" dataDismiss="modal">&times;</button>
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
          <table className = "table table-striped table-hover table-responsive" onClick={()=>{this.handleClick2()}}>
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
