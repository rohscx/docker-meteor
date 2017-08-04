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

export function getDevices() {
  return dispatch => {
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
          console.log("RESPONSE",res);	// debug
          console.log("ERROR",err);	// debug
          //console.log(this); // debug
          //this.makeFlowID();
          //flowId = res.data.response.flowAnalysisId;
          //dispatch(getFlowStatus(ticket, flowId))
          return dispatch(setDevices(res));
        }
    })
  }
}
