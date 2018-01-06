process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { HTTP } from 'meteor/http'
import { Meteor } from 'meteor/meteor'



// generic HTTPreqest to consolidate requests under a consistant method
function GenericRequest (method,url,uri,options) {
  this.method = method;   // e.g. GET,POST,DELETE,UPDATE
  this.url = url;         // e.g. "http://jsonplaceholder.typicode.com"
  this.uri = uri;         // e.g. "/posts/1"
  this.options = options; // e.g. {'content-type': 'application/json'}
  this.httpRequest = () => {
    this.response = HTTP.call(this.method, this.url + this.uri ,this.options);
    return this.response;
  };
};


export default GenericRequest;
