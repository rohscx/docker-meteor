import { Meteor } from 'meteor/meteor';

export function addNumber(number) {
  return {
    type: "ADD",
    payload: number
  };
}

export function subtractNumber(number) {
  return {
    type: "SUBTRACT",
    payload: number
  };
}

export function setDevices(devices) {
  return {
    type: "SET_DEVICES",
    payload: devices
  };
}

export function setDeviceNameList(namesObj) {
  return {
    type: "SET_DEVICE_NAME_LIST",
    payload: devices
  };
}

export function setHostName(status) {
  return {
    type: "SET_HOSTNAME",
    payload: status
  };
}

export function getDevices() {
  return dispatch => {
    console.log(Meteor.settings)
    prtgBase = Meteor.settings.private.prtgRest.baseUrl
    prtgAPI = "/api/table.json";
    prtgDevices = "?content=sensors&output=json&columns=objid,probe,group,device,sensor,status,message,lastvalue,priority,favorite";
    prtgCreds = "&username="+Meteor.settings.private.prtgRest.uName+"&passhash="+Meteor.settings.private.prtgRest.uPass;;
    prtgApiPath = prtgBase+prtgAPI+prtgDevices+prtgCreds;
    prtgApiOptions= options;
    prtgApiRequest = prtgAPI + prtgApiPath + prtgApiOptions;
    // serverside secrets
    encodedSecrets = btoa(Meteor.settings.private.prtgRest.uname + Meteor.settings.private.prtgRest.uPass);

    prtgFlowURL = this.prtgAPI + this.prtgFlow;
    prtgFlowAnalysisIdURL= this.prtgAPI + this.prtgFlowAnalysisId;
    prtgOptions = {
      headers: {
        'authorization': 'Basic ' + encodedSecrets
      },
      data: {
     }
    };
    return Meteor.call('checkApic', 'GET', prtgApiRequest, prtgApiOptions, (err, res) => {
      if (err) {
        alert(err);
      } else {
          // success!
          //this.ticket = res.data.response.serviceTicket;
          //this.prtgFlowOptions.headers['x-auth-token'] = res.data.response.serviceTicket;
          //Session.set("prtgTicket", res.data.response.serviceTicket);
          //console.log("RESPONSE",res);	// debug
          alert(res);
          //console.log(this); // debug
          //this.makeFlowID();
          //flowId = res.data.response.flowAnalysisId;
          //dispatch(getFlowStatus(ticket, flowId))
          return dispatch(setDevices(res));
        }
    })
  }
}

export function hostName(hostName) {
  return dispatch => {
    let newHostName = hostName.trim().toLowerCase()
    if(hostName.length <= 0 ){
      return dispatch(setHostName({
        name: newHostName,
        validationStatus: null,
        btnStyle: false
      }));
    } else {
      let newHostName = hostName.trim().toLowerCase()
      return dispatch(setHostName({
        name: newHostName,
        validationStatus: "success",
        btnStyle: true
      }));
    }
  }
}

export function DeviceNameList(usrInput) {
  return dispatch => {
    let newHostName = hostName.trim().toLowerCase()
    if(hostName.length <= 0 ){
      return dispatch(setDeviceNameList({
        name: newHostName,
        validationStatus: null,
        btnStyle: false
      }));
    } else {
      let newHostName = hostName.trim().toLowerCase()
      return dispatch(setDeviceNameList({
        name: newHostName,
        validationStatus: "success",
        btnStyle: true
      }));
    }
  }
}
