import React, { PropTypes} from 'react';

const IsRole = ({role, children}) => {
  // debug
  //console.log(children,)
  //typeof(children)
  if (Roles.userIsInRole(Meteor.userId(), role)) {
    return children;
  }
  return null;
}

// checks type, throws and error. children should be simple object in a div
IsRole.propTypes = {
  role: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired,
  children: PropTypes.object.isRequired
};

export default IsRole;
