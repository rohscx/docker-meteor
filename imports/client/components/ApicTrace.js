import React, {Component} from 'react';
import { Session } from 'meteor/session';
import Trace from './ApicTrace/Trace';
import { connect } from 'react-redux';
import {Accordion, AccordionSection}  from 'redux-accordion';
import { setName }from '../actions/userActions';
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


  tracePath(){
    const sourceIp = this.props.apic.traceIp.source;
    const destIp = this.props.apic.traceIp.destination;
    this.props.getTicket(sourceIp,destIp);

    function resolveAfter2Seconds(x,status) {
        return new Promise(resolve => {
          setTimeout(() => {
            if(status == "INPROGRESS"){
              console.log("INPROGRESS");
              resolve(x);
            }
            console.log("NOT INPROGRESS");
            resolve(x);
          }, 2000);
        });
      }

      async function add1(x) {
        var a = resolveAfter2Seconds(20);
        var b = resolveAfter2Seconds(30);
        return x + await a + await b;
      }

      add1(10,this.props.apic.traceStatus.status).then(v => {
        console.log(v);  // prints 60 after 2 seconds.
      });
    //var myVar = setInterval(myTimer ,1000);

  }

  getFlow(){
    this.props.getFlow(this.props.apic.ticket, this.props.apic.flowId)
  }

  traceForm(){

    const mainDiv = {
      "borderRadius": "5%",
      width: "40%"
    };
      if(this.props.apic.showTrace){
        return (
          <form onSubmit={this.handleSubmit}>
            <div style={mainDiv}>
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
            <div className='footer' onClick={this.props.apic.traceStatus.dataReady ? ()=>this.getFlow() : ()=>this.tracePath()}>
              {this.props.apic.traceStatus.dataReady ? "Trace Complete" : "Submit"}
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

  loopThrough(){
    let flowArray = this.props.apic.flow;
    return flowArray.map(item => {
      let deviceInfo = [];
      let deviceType = [];
      let deviceName = [];
      if(Object.getOwnPropertyNames(item).length == 0){
        console.log("THIS IS SOME PROP",Object.getOwnPropertyNames(item).length);
        if(this.props.apic.traceStatus.status == "INPROGRESS"){
          console.log("STATUS OF REQUEST : ", this.props.apic.traceStatus.status)
          setTimeout(this.props.getFlowStatus(this.props.apic.ticket, this.props.apic.flowId), 20000);
        } else if (this.props.apic.traceStatus.status === "false" && Object.getOwnPropertyNames(item).length != 0){
          this.props.setTrace({});
        }
        return <div></div>
      }else{
        let rickets = Object.keys(item).map(function(key,index){
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
            deviceInfo.push(key);
            deviceInfo.push(item[key].physicalInterface.name);
          } else {
            deviceInfo.push(key);
            deviceInfo.push(item[key]);
            if (item.hasOwnProperty('name') && deviceName.length == 0){
              deviceName.push(item.name)
            }else if(deviceType.length == 0){
              deviceType.push(item.type);
              deviceType.push(item.ip);
            }
          }
        })
      }

      return (
        <div>
          <Trace
            flowItem={deviceInfo.join(" : <==> : ")}
            flowItemType={deviceType.join(" : <==> : ")}
            flowItemName={deviceName.join(" : <==> : ")}
          />
      </div>
      );
    })}


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
      {this.traceForm()}

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
      }>GET FLOW STATUS <span className={
        this.props.apic.traceStatus.isReady ? "" : "glyphicon glyphicon-refresh glyphicon-refresh-animate"
      }></span></button>

      <button type="button" className="btn btn-primary" onClick={
        () => this.props.getFlow(this.props.apic.ticket, this.props.apic.flowId)
      }>GET FLOW</button>

      <button type="button" className="btn btn-primary" onClick={
        () => console.log(this.props)
      }> LOG PROPS</button>


      {this.loopThrough()}



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
    getTicket: (sourceIp,destIp) => {
      dispatch(getTicket(sourceIp,destIp));
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
