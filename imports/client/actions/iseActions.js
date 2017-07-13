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

export function getRestIse(path,options,destIp) {
  return dispatch => {
    iseAPI = 'https://agaisepr01.fpicore.fpir.pvt/admin/API/mnt';
    apicTicket = '/api/v1/ticket';
    iseApiPath = path;
    iseApiOptions= options;
    iseApiRequest = iseAPI + iseApiPath + iseApiOptions;
    encodedSecrets = btoa(Meteor.settings.private.iseRest.uname + Meteor.settings.private.iseRest.uPass);
    apicFlowURL = this.apicAPI + this.apicFlow;
    apicFlowAnalysisIdURL= this.apicAPI + this.apicFlowAnalysisId;
    apicOptions = {
      headers: {
        'authorization': 'Basic ' + encodedSecrets
      },
      data: {
     }
    };
    return Meteor.call('checkApic', 'GET', iseApiRequest, iseApiOptions, (err, res) => {
      if (err) {
        alert(err);
      } else {
          // success!
          //this.ticket = res.data.response.serviceTicket;
          //this.apicFlowOptions.headers['x-auth-token'] = res.data.response.serviceTicket;
          //Session.set("apicTicket", res.data.response.serviceTicket);
          console.log(res);	// debug
          console.log(this); // debug
          //this.makeFlowID();
          //flowId = res.data.response.flowAnalysisId;
          //dispatch(getFlowStatus(ticket, flowId))
          //return dispatch(setFlowId(flowId));
        }
    })
  }
}
