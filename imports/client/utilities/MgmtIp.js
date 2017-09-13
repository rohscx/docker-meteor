import React, { PropTypes} from 'react';

const MgmtIp = ({role, children}) => {
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
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object
  ])
};

export default MgmtIp;
