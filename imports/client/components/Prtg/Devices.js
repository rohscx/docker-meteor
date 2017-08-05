import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class Devices extends Component {
  handClick(){
  return (
    <div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Modal Header</h4>
      </div>
      <div class="modal-body">
        <p>Some text in the modal.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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
          <table className = "table table-striped table-hover table-responsive">
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
