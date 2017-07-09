import React, {Component} from 'react';
import { Session } from 'meteor/session';
import Trace from './ApicTrace/Trace';
import { connect } from 'react-redux';
import { setName }from '../actions/userActions'
import { setTicket, setDevices, setTrace, setFlowId, setFlow, setShowTrace, setTraceIp, getTicket, getFlowId, getFlowStatus, getFlow }from '../actions/apicActions'

class ApicTrace extends Component {
  constructor(props) {
  super(props);

  this.handleChangeSourceIP = this.handleChangeSourceIP.bind(this);
  this.handleChangeDestinationIP = this.handleChangeDestinationIP.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeSourceIP(event) {
    this.props.setTraceIp({
      source:event.target.value,
      destination:this.props.apic.traceIp.destination
    });
  }
  handleChangeDestinationIP(event) {
    this.props.setTraceIp({
      source: this.props.apic.traceIp.source,
      destination: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }



  static defaultProps = {
    categories: ['Web Design', 'Web Development', 'Mobile Development']
  }


  traceForm(){
      if(this.props.apic.showTrace){
        return (
          <form onSubmit={this.handleSubmit}>
            <div className='trace'>
              <div className='source'>
                <label> Source </label>
                <input type="text" value={this.props.apic.traceIp.source} onChange={this.handleChangeSourceIP} />
            </div>
            <div className='destination'>
              <label> Destination </label>
              <input type="text" value={this.props.apic.traceIp.destination} onChange={this.handleChangeDestinationIP}/>
            </div>
            </div>
            <input type="submit" value="Submit" className="btn"/>
          </form>

        );
      } else {
        return (
          <div/>
        );
      }
  }

  loopThrough(flowArray){
    return flowArray.map(item => {
      console.log("LENGTH",Object.getOwnPropertyNames(item).length);
      console.log("PROP STATUS",this.props.apic.traceStatus.status);
      if(Object.getOwnPropertyNames(item).length == 1){
        if(this.props.apic.traceStatus.status == "INPROGRESS"){
          console.log("STATUS OF REQUEST : ", this.props.apic.traceStatus.status)
          setTimeout(this.props.getFlowStatus(this.props.apic.ticket, this.props.apic.flowId), 1000);
        }
      }else{
        console.log("REAL RESULT WAS RUN");
        return Object.keys(item).map(function(key,index){
          console.log("item[key]: ",item[key]);
          console.log("key: ",key);
          console.log("index: ",index);
          console.log("item: ", item);
          console.log("typeof item: ",typeof item);
          console.log("typeof item[key]: ",typeof item[key]);
          console.log("typeof key: ",typeof key);
          console.log("typeof index: ",typeof index);
          if(typeof item[key] === 'object'){
            console.log("item[key].physicalInterface.name: ",key,item[key].physicalInterface.name);
            return <Trace flowItem={item[key].physicalInterface.name} flowIndex={key} key={index} />;
          } else {
            return <Trace flowItem={item[key]} flowIndex={key} key={index} />;
          }
        })
      }
    })
  }


  render() {
    console.log(this);
    return(
      <div>
      {this.props.apic.ticket} <br/>
      {this.props.apic.flowId} <br/>
      {this.props.apic.traceStatus.status ? this.props.apic.traceStatus.status : "NO STATUS"} <br/>

      <button type="button" className="btn btn-primary" onClick={
        () => this.props.apic.showTrace ? this.props.setShowTrace(false) : this.props.setShowTrace(true)
      }>Path Trace Form {this.props.apic.showTrace ? 'Shown': 'Hidden'}</button>

      <button type="button" className="btn btn-primary" onClick={
        () => this.props.getTicket()
      }>GET TICKET</button>

      <button type="button" className="btn btn-primary" onClick={
        () => this.props.getFlowId(
          this.props.apic.ticket,
          this.props.apic.traceIp.source,
          this.props.apic.traceIp.destination
        )
      }>GET FLOW ID</button>

      <button type="button" className="btn btn-primary" onClick={
        () => this.props.getFlowStatus(this.props.apic.ticket, this.props.apic.flowId)
      }>GET FLOW STATUS</button>

      <button type="button" className="btn btn-primary" onClick={
        () => this.props.getFlow(this.props.apic.ticket, this.props.apic.flowId)
      }>GET FLOW</button>

      <button type="button" className="btn btn-primary" onClick={
        () => console.log(this.props)
      }> LOG PROPS</button>

      {this.loopThrough(this.props.apic.flow)}

      {this.traceForm()}
    </div>
    )
  }
}

const mapSateToProps = (state) => {
  return {
    user: state.userReducer,
    math: state.mathReducer,
    apic: state.apicReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => {
      dispatch(setName(name));
    },
    setTicket: (ticket) => {
      dispatch(setTicket(ticket));
    },
    setDevices: (devices) => {
      dispatch(setDevices(devices));
    },
    setTrace: (trace) => {
      dispatch(setTrace(trace));
    },
    setTraceIp: (traceIp) => {
      dispatch(setTraceIp(traceIp));
    },
    setFlowId: (flowId) => {
      dispatch(setTrace(trace));
    },
    setShowTrace: (showTrace) => {
      dispatch(setShowTrace(showTrace));
    },
    getTicket: () => {
      dispatch(getTicket());
    },
    getFlowId: (ticket, sourceIp, destIp) => {
      dispatch(getFlowId(ticket, sourceIp, destIp));
    },
    getFlowStatus: (ticket,flowId) => {
      dispatch(getFlowStatus(ticket,flowId));
    },
    getFlow: (ticket,flowId) => {
      dispatch(getFlow(ticket,flowId));
    }
  };
};
export default connect(mapSateToProps, mapDispatchToProps) (ApicTrace);
