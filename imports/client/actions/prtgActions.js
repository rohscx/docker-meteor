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
    prtgAPI = 'https://agaprtgpr01.fpicore.fpir.pvt/admin/API/mnt';
    prtgTicket = '/api/v1/ticket';
    prtgApiPath = path;
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
