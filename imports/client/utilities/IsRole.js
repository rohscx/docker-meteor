import React, { PropTypes} from 'react';

const IsRole = ({role, children}) => {
  console.log("typeof",typeOf(children))
  if (Roles.userIsInRole(Meteor.userId(), role)) {
    return children;
  }
  return null;
}

// checks type, throws and error
IsRole.propTypes = {
  role: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired,

};

export default IsRole;
