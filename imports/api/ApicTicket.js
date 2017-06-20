import { HTTP } from 'meteor/http'

export default Meteor.methods({
    score_app:  function(){
        var test = HTTP.call("POST", "https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket",
            {   headers:  {     
                        "Content-Type": "application/json"             
        },
        // This is where the problem is.  Have tried multiple syntax versions and tried using the `params`options for the HTTP call instead of `data`
        data: {'username': 'devnetuser',
               'password': 'Cisco123!'
        }
        },
    function (error, result) {

    // The syntax below should be if not an error, log the result (for testing etc, otherwise, log "http post error".  I may have incorrectly switched this around, but the original version I got from an online example had it the console.log statements in the reverse order.
    if (!error) {
        console.log(result);
    } else{

        console.log("http post error");
    };
    });
    }
});
