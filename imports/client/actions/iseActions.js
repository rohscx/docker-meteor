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

export function getRestIse(ticket,sourceIp,destIp) {
  return dispatch => {
    apicAPI = 'https://devnetapi.cisco.com/sandbox/apic_em';
    apicTicket = '/api/v1/ticket';
    apicFlow = '/api/v1/flow-analysis';
    apicFlowAnalysisId= '';
    apicTicketURL = this.apicAPI + this.apicTicket;
    apicFlowURL = this.apicAPI + this.apicFlow;
    apicFlowAnalysisIdURL= this.apicAPI + this.apicFlowAnalysisId;
    apicOptions = {
      headers: {
        'content-type': 'application/json',
        'x-auth-token': ticket
      },
      data: {
        'sourceIP': sourceIp,
       'destIP': destIp
     }
    };
    return Meteor.call('checkApic', 'POST', apicFlowURL, apicOptions, (err, res) => {
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
          flowId = res.data.response.flowAnalysisId;
          dispatch(getFlowStatus(ticket, flowId))
          return dispatch(setFlowId(flowId));
        }
    })
  }
}
