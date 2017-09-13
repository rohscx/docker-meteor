import React, { PropTypes} from 'react';

const MgmtIp = ({role}) => {
  if (Roles.userIsInRole(Meteor.userId(), role)) {
    return children;
  }
  return null;
}

// checks type, throws and error
MgmtIp.propTypes = {
  role: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired
};

export default IsRole;
